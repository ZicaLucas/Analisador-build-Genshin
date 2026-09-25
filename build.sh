#!/bin/sh
# Gera o index.html publicável a partir do .jsx. Precisa de Node.
# Rode na pasta onde estão entry.jsx, react-shim.js e index.html.
set -e

npx esbuild entry.jsx --bundle --format=iife \
  --alias:react=./react-shim.js --minify --outfile=bundle.js

node -e '
const fs = require("fs");
const b = fs.readFileSync("bundle.js", "utf8");
const h = fs.readFileSync("index.html", "utf8");
const i = h.indexOf("<!-- BUNDLE -->");
const f = h.indexOf("<!-- /BUNDLE -->");
if (i < 0 || f < 0) {
  console.error("marcadores BUNDLE nao encontrados no index.html");
  process.exit(1);
}
fs.writeFileSync("index.html",
  h.slice(0, i) + "<!-- BUNDLE -->\n<script>\n" + b + "\n</script>\n" + h.slice(f));
console.log("index.html atualizado:", Math.round(fs.statSync("index.html").size / 1024) + "kb");
'

rm -f bundle.js
