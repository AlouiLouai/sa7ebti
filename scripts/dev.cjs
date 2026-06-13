const { existsSync, rmSync } = require("node:fs");
const { join } = require("node:path");
const { spawn } = require("node:child_process");

const cwd = process.cwd();
const nextDir = join(cwd, ".next");

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
}

process.env.WATCHPACK_POLLING = process.env.WATCHPACK_POLLING || "true";
process.env.CHOKIDAR_USEPOLLING = process.env.CHOKIDAR_USEPOLLING || "1";
process.env.NEXT_DISABLE_TURBOPACK = process.env.NEXT_DISABLE_TURBOPACK || "1";

const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, "dev"], {
  cwd,
  stdio: "inherit",
  env: process.env
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
