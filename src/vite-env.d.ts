/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_BACKEND_CACHE?: string;
  readonly VITE_AI_ENABLED: string;
  readonly VITE_AI_RATE_LIMIT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
