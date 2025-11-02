/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_AI_ENABLED: string;
  readonly VITE_AI_RATE_LIMIT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
