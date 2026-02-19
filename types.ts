
export interface Mod {
  id: string;
  name: string;
  version: string;
  loader: 'Forge' | 'Fabric' | 'Ambos';
  description: string;
  downloadUrl: string;
  imageUrl: string;
  isLocalFile?: boolean;
  buttonText?: string;
}

export type Step = {
  title: string;
  description: string;
  image: string;
};

export interface SiteSettings {
  profileImage: string;
  installSteps: Step[];
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}
