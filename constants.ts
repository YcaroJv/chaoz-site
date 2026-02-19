
import { Mod, Step } from './types';

// Atualizado para uma URL funcional do personagem Porco Rosso
export const PROFILE_IMAGE = "https://i.pinimg.com/736x/8a/a5/63/8aa56306561e1b7f0e9b46e8c755359a.jpg";

export const INITIAL_MODS: Mod[] = [
  {
    id: '1',
    name: 'Better Animations',
    version: '1.20.1',
    loader: 'Forge',
    buttonText: 'BAIXAR AGORA',
    description: 'Sabe aquele movimento de "filme" que vocês sempre me perguntam nos vídeos? É esse mod aqui! Ele deixa os bichos e o personagem com animações muito mais reais. É INSANO!',
    downloadUrl: 'https://www.curseforge.com/minecraft/mc-mods/better-animations-collection',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Sodium / Iris (FPS Infinito)',
    version: '1.20.1',
    loader: 'Fabric',
    buttonText: 'PEGAR MOD',
    description: 'Se o seu PC é uma batata, esse combo é OBRIGATÓRIO! Ele faz o Mine rodar liso, liso, e ainda deixa você colocar aqueles Shaders pesados sem travar nada. Melhor mod de otimização que existe!',
    downloadUrl: 'https://modrinth.com/mod/sodium',
    imageUrl: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Physics Mod Pro',
    version: '1.20.1',
    loader: 'Forge',
    buttonText: 'TESTAR FÍSICA',
    description: 'Esse aqui apareceu naquele meu vídeo viral! Os blocos quebram de verdade e caem no chão com física. Deixa o jogo com uma cara totalmente diferente. Testa aí e me diz o que achou!',
    downloadUrl: 'https://www.curseforge.com/minecraft/mc-mods/physics-mod',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
  }
];

export const INSTALL_STEPS: Step[] = [
  {
    title: 'Pega o Loader Certo',
    description: 'Primeiro de tudo: você precisa do Forge ou do Fabric. Vê lá no card do mod qual ele pede e baixa o instalador. É só clicar e instalar, sem erro!',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Acha a Pasta Sagrada',
    description: 'Aperta as teclas "Windows + R" e digita %appdata%. Entra na pasta .minecraft e procura pela pasta "mods". Se não tiver, cria uma com esse nome e pronto.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Joga Tudo Lá Dentro!',
    description: 'Agora é só arrastar os arquivos .jar que você baixou direto pra dentro dessa pasta. Abre o seu launcher, escolhe o perfil do mod e bora jogar!',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'
  }
];
