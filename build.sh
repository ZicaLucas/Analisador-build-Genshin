#!/bin/sh
# Gera o index.html publicável a partir do .jsx.
# Precisa de Node. Rode na pasta onde estao os arquivos.
set -e
npx esbuild entry.jsx --bundle --format=iife \
  --alias:react=./react-shim.js --minify --outfile=bundle.js
node -e '
const fs=require("fs");
const b=fs.readFileSync("bundle.js","utf8");
const h=fs.readFileSync("index.html","utf8");
const i=h.indexOf("<script>\n",h.indexOf("react-dom"))+"<script>\n".length;
const f=h.indexOf("</script>",i);
fs.writeFileSync("index.html",h.slice(0,i)+b+"\n"+h.slice(f));
console.log("index.html atualizado:",Math.round(fs.statSync("index.html").size/1024)+"kb");
'
rm -f bundle.js
