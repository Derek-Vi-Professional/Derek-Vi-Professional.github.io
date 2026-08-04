import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const previewUrl = process.env.PORTFOLIO_PREVIEW_URL ?? "http://localhost:3001/";
const root = process.cwd();
const clientDirectory = resolve(root, "dist", "client");
const serverDirectory = resolve(root, "dist", "server");

const response = await fetch(previewUrl);
if (!response.ok) {
  throw new Error(`Could not render ${previewUrl}: ${response.status}`);
}

// GitHub Pages serves this portfolio as a static document. Strip the Vinext
// client router so in-page hash links remain native browser navigation.
const renderedHtml = await response.text();
const staticHtml = renderedHtml
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "");

await writeFile(resolve(clientDirectory, "index.html"), staticHtml);

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`;

const wranglerPath = resolve(serverDirectory, "wrangler.json");
const wrangler = JSON.parse(await readFile(wranglerPath, "utf8"));
wrangler.compatibility_date = "2026-08-04";
wrangler.compatibility_flags = ["no_nodejs_compat"];
wrangler.assets = {
  directory: "../client",
  binding: "ASSETS",
  run_worker_first: true,
};

for (const entry of await readdir(serverDirectory)) {
  if (entry !== "index.js" && entry !== "wrangler.json") {
    await rm(resolve(serverDirectory, entry), { recursive: true, force: true });
  }
}

await writeFile(resolve(serverDirectory, "index.js"), worker);
await writeFile(wranglerPath, `${JSON.stringify(wrangler)}\n`);
