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
  assert.match(html, /Building a Unity project by building the tools it needs\./);
  assert.match(html, /independent, systems-driven simulation project in Unity/);
  assert.match(html, /One Unity project, designed in layers/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("explains how each tool supports the Unity project", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /common-sense hotkeys/);
  assert.match(html, /road types that can be swapped/);
  assert.match(html, /batch-create paper-like or voxel-style 3D assets/);
  assert.match(html, /keeping pixel sizes consistent/);
  assert.match(html, /respond to scene lighting and cast dynamic shadows/);
  assert.match(html, /One project, built from connected systems\./);
});
