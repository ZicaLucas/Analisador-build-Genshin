/* Gera o bloco DANO dentro do .jsx do app, para os personagens que
   tiverem rotação definida. Rode: node gerar-dados.cjs            */
const db = require('genshin-db'), fs = require('fs');
const P = process.argv[2] || '/mnt/user-data/outputs/analisador_times_genshin.jsx';
let s = fs.readFileSync(P, 'utf8');

// lê quem tem rotação definida e quais params são usados
const rot = s.slice(s.indexOf('const ROTACOES = {'), s.indexOf('/* FIM ROTACOES */'));
const alvos = {};
for (const m of rot.matchAll(/(\w+):\s*\{\s*dbNome:\s*"([^"]+)"([\s\S]*?)\n  \},/g)) {
  const [, id, dbNome, corpo] = m;
  const params = [...corpo.matchAll(/talento:\s*"(\w+)",\s*param:\s*"(\w+)"/g)]
    .map(x => `${x[1]}.${x[2]}`);
  alvos[id] = { dbNome, params: [...new Set(params)] };
}

const out = [];
for (const [id, { dbNome, params }] of Object.entries(alvos)) {
  const c = db.characters(dbNome), t = db.talents(dbNome);
  if (!c || !t) { console.log('  ! nao achei', dbNome); continue; }
  const st = c.stats(90);
  const mult = {};
  for (const p of params) {
    const [tal, par] = p.split('.');
    const serie = t[tal]?.attributes?.parameters?.[par];
    if (!serie) { console.log(`  ! ${dbNome}: ${p} nao existe`); continue; }
    mult[p] = serie.map(v => +v.toFixed(5));
  }
  out.push(`  ${id}: { base: { hp: ${st.hp.toFixed(0)}, atk: ${st.attack.toFixed(1)}, ` +
    `def: ${st.defense.toFixed(0)} }, mult: {\n` +
    Object.entries(mult).map(([k, v]) => `    "${k}": [${v.join(',')}]`).join(',\n') +
    `\n  } },`);
  console.log('  ok', dbNome, '-', params.length, 'parametros');
}

const bloco = '/* INICIO DANO — gerado por gerar-dados.cjs, nao editar */\nconst DANO = {\n' +
  out.join('\n') + '\n};\n/* FIM DANO */';
const ini = s.indexOf('/* INICIO DANO'), fim = s.indexOf('/* FIM DANO */');
if (ini < 0) { console.log('marcadores nao encontrados'); process.exit(1); }
s = s.slice(0, ini) + bloco + s.slice(fim + '/* FIM DANO */'.length);
fs.writeFileSync(P, s);
console.log('bloco DANO regravado:', out.length, 'personagens');
