/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly UNIVERSITIES_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
