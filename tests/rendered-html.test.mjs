import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Derek Vieau \| Software Systems &amp; Tooling<\/title>/i);
  assert.match(html, /<section class="hero" id="top">/);
  assert.match(html, /<h1>[^<]+<\/h1>/);
  assert.match(html, /One Unity project, designed in layers/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("renders each featured system and its supporting media", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<section class="section" id="work">/);
  assert.match(html, /src="\/Spline-Graph\.png"/);
  assert.match(html, /id="architecture"/);
  assert.match(html, /src="\/blender-show-bounce\.mp4"/);
  assert.match(html, /src="\/Bush-Pre-Heightmap\.png"/);
  assert.match(html, /src="\/Bush-Heightmap\.png"/);
});
