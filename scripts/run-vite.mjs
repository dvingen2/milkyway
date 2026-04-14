import { spawn } from "node:child_process";
import { vitePort } from "./ports.mjs";

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["vite", "--port", String(vitePort), "--strictPort"],
  {
    stdio: "inherit",
    shell: false,
  },
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
