
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Mod, SiteSettings } from '../types';
import { INITIAL_MODS, PROFILE_IMAGE, INSTALL_STEPS } from '../constants';

// Endpoint persistente (Certifique-se de que este ID é válido no npoint)
const API_URL = `https://api.npoint.io/46e491269382103328e7`;
const STORAGE_KEY = 'chaouz_persistent_v3';

interface PersistentData {
  mods: Mod[];
  siteSettings: SiteSettings;
  updatedAt: number;
}

interface ModContextType {
  mods: Mod[];
  siteSettings: SiteSettings;
  isLoading: boolean;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  addMod: (mod: Mod) => Promise<void>;
  updateMod: (mod: Mod) => Promise<void>;
  deleteMod: (id: string) => Promise<void>;
  getMod: (id: string) => Mod | undefined;
  updateSiteSettings: (settings: SiteSettings) => Promise<void>;
  refreshData: () => Promise<void>;
  lastSynced: number;
  syncStatus: 'synced' | 'error' | 'syncing' | 'local-only';
}

const ModContext = createContext<ModContextType | undefined>(undefined);

export const ModProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    profileImage: PROFILE_IMAGE,
    installSteps: INSTALL_STEPS
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [lastSynced, setLastSynced] = useState<number>(0);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'error' | 'syncing' | 'local-only'>('synced');
  
  const isSavingRef = useRef(false);

  // 1. Carregamento Inicial (Prioridade para a Nuvem)
  useEffect(() => {
    const init = async () => {
      let dataFound: PersistentData | null = null;

      // Primeiro tenta a Nuvem (Fonte da verdade para todos)
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const cloudData = await response.json();
          // Verifica se o objeto retornado é válido e tem a nossa estrutura
          if (cloudData && cloudData.mods && Array.isArray(cloudData.mods)) {
            dataFound = cloudData;
            console.log("Dados carregados da nuvem com sucesso.");
          }
        }
      } catch (e) {
        console.warn("Servidor offline, tentando cache local...");
      }

      // Se não achou na nuvem, tenta o local storage (backup do admin)
      if (!dataFound) {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          try {
            dataFound = JSON.parse(local);
            setSyncStatus('local-only');
          } catch (e) {}
        }
      }

      // Aplica os dados encontrados ou usa o padrão inicial
      if (dataFound) {
        setMods(dataFound.mods);
        setSiteSettings(dataFound.siteSettings);
        setLastSynced(dataFound.updatedAt || Date.now());
      } else {
        setMods(INITIAL_MODS);
      }
      
      setIsLoading(false);
    };

    init();
  }, []);

  // 2. Persistência Definitiva (Local + Nuvem)
  const persistData = async (newMods: Mod[], newSettings: SiteSettings) => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setSyncStatus('syncing');
    
    const timestamp = Date.now();
    const data: PersistentData = {
      mods: newMods,
      siteSettings: newSettings,
      updatedAt: timestamp
    };

    // Salva no LocalStorage IMEDIATAMENTE (Segurança do Admin)
    setMods(newMods);
    setSiteSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Tenta sincronizar com a Nuvem (Para todos os usuários)
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(response.status === 413 ? "Payload Too Large" : "Sync Failed");
      }
      
      setLastSynced(timestamp);
      setSyncStatus('synced');
      console.log("Nuvem atualizada. Todos os usuários verão as mudanças.");
    } catch (error: any) {
      setSyncStatus('error');
      console.error("ERRO CRÍTICO: Não foi possível salvar na nuvem.", error);
      if (error.message === "Payload Too Large") {
        alert("⚠️ ATENÇÃO: O servidor recusou os dados porque estão muito pesados (fotos muito grandes). Suas mudanças foram salvas APENAS para você. Para que os outros vejam, use links de imagens em vez de subir arquivos.");
      }
    } finally {
      isSavingRef.current = false;
    }
  };

  const refreshData = useCallback(async () => {
    if (isEditing || isSavingRef.current) return;

    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const cloud: PersistentData = await response.json();
        if (cloud && cloud.updatedAt > lastSynced) {
          setMods(cloud.mods);
          setSiteSettings(cloud.siteSettings);
          setLastSynced(cloud.updatedAt);
        }
      }
    } catch (e) {}
  }, [isEditing, lastSynced]);

  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  return (
    <ModContext.Provider value={{ 
      mods, siteSettings, isLoading, isEditing, setIsEditing,
      addMod: (m) => persistData([m, ...mods], siteSettings),
      updateMod: (m) => persistData(mods.map(x => x.id === m.id ? m : x), siteSettings),
      deleteMod: (id) => persistData(mods.filter(x => x.id !== id), siteSettings),
      getMod: (id) => mods.find(m => m.id === id),
      updateSiteSettings: (s) => persistData(mods, s),
      refreshData,
      lastSynced,
      syncStatus
    }}>
      {children}
    </ModContext.Provider>
  );
};

export const useMods = () => {
  const context = useContext(ModContext);
  if (!context) throw new Error('useMods must be used within a ModProvider');
  return context;
};
