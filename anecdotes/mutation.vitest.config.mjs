import { defineConfig, mergeConfig } from "vitest/config"
import base from "./vite.config.js"

export default mergeConfig(
  base,
  defineConfig({ test: { setupFiles: ["./mutation.setup.mjs"] } }),
)
