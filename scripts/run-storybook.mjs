import { spawn } from "node:child_process";
import { storybookPort } from "./ports.mjs";

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["storybook", "dev", "-p", String(storybookPort)],
  {
    stdio: "inherit",
    shell: false,
  },
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
