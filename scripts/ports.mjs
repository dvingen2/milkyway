import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const packageJsonPath = resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

function hashString(value) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  }
  return hash;
}

const projectKey = packageJson.name || process.cwd();
const offset = hashString(projectKey);

export const vitePort = 4100 + offset;
export const storybookPort = 6100 + offset;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify({ projectKey, vitePort, storybookPort }, null, 2));
}
