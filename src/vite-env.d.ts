/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_UNIVERSITIES_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
