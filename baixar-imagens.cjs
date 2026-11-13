/* Baixa todas as imagens do app, já com o nome certo, na pasta assets/.

   Uso:
     npm install genshin-db
     node baixar-imagens.cjs                   baixa tudo que faltar
     node baixar-imagens.cjs armas artefatos   só essas categorias
     node baixar-imagens.cjs --forcar          rebaixa o que já existe

   Categorias: personagens, armas, artefatos.
   A logo não vem daqui: ponha à mão em assets/logo/logo.png.

   Pula o que já está na pasta, então pode interromper e rodar de novo.
   Lê o próprio .jsx para saber quais personagens, armas e conjuntos existem,
   e assim os nomes de arquivo batem sempre com o que o app procura. */

const db = require('genshin-db');
const fs = require('fs');
const path = require('path');

const JSX = 'analisador_times_genshin.jsx';
const RAIZ = 'assets';
const FORCAR = process.argv.includes('--forcar');
const CATS = process.argv.slice(2).filter(a => !a.startsWith('--'));
const quer = (c) => CATS.length === 0 || CATS.includes(c);

if (!fs.existsSync(JSX)) {
  console.error(`não achei ${JSX} nesta pasta. Rode o script ao lado dele.`);
  process.exit(1);
}
const src = fs.readFileSync(JSX, 'utf8');

const slug = (x) => x.toLowerCase().replace(/['\u2019]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* personagens: um por base, não por variante de papel */
const blk = src.slice(src.indexOf('const CHARS = ['), src.indexOf('const CHAR_BY_ID'));
const chars = {};
for (const m of blk.matchAll(/id:"([a-z-]+)", base:"([a-z-]+)", n:"([^"]+)"/g))
  if (!chars[m[2]]) chars[m[2]] = m[3].split(' — ')[0];
for (const m of blk.matchAll(/C\(\{ id:"([a-z-]+)", n:"([^"]+)"/g))
  if (!chars[m[1]]) chars[m[1]] = m[2];

const armas = [...new Set([...src.matchAll(/\{ n: "((?:[^"\\]|\\.)+)", t: "\w+"/g)]
  .map(m => m[1].replace(/\\"/g, '"')))];

const sets = [...src.slice(src.indexOf('const SETS = ['),
  src.indexOf('];', src.indexOf('const SETS = ['))).matchAll(/"([^"]+)"/g)].map(m => m[1]);

/* aparências alternativas declaradas no app */
const apBlk = src.slice(src.indexOf('const APARENCIAS = {'), src.indexOf('const aparenciasDe'));
const aparencias = {};
for (const m of apBlk.matchAll(/^  ([a-z-]+): \[(.*)\],$/gm))
  aparencias[m[1]] = [...m[2].matchAll(/k: "([^"]+)", rot: "([^"]+)"/g)].map(x => ({ k: x[1], rot: x[2] }));
for (const id of Object.keys(chars))
  if (id.startsWith('traveler')) aparencias[id] = [{ k: 'aether', rot: 'Aether' }, { k: 'lumine', rot: 'Lumine' }];

let baixadas = 0, puladas = 0, falhas = [];

async function baixar(url, destino) {
  if (!url) return;
  if (!FORCAR && fs.existsSync(destino)) { puladas++; return; }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 500) throw new Error('arquivo vazio');
    fs.writeFileSync(destino, buf);
    baixadas++;
    process.stdout.write('.');
    if (baixadas % 60 === 0) process.stdout.write(' ' + baixadas + '\n');
  } catch (e) {
    falhas.push(destino + '  (' + e.message + ')');
  }
}

/* a base entrega .png e .jpg; o app pede .png, então gravamos tudo como .png.
   O navegador lê pelo conteúdo, não pela extensão, então funciona. */

async function personagens() {
  console.log(`\npersonagens (${Object.keys(chars).length})`);
  for (const [id, nome] of Object.entries(chars)) {
    const variantes = aparencias[id] || [{ k: '', rot: '' }];
    for (const v of variantes) {
      /* Viajante: a base guarda sob Aether e Lumine */
      let busca = nome;
      if (id.startsWith('traveler')) busca = v.k === 'lumine' ? 'Lumine' : 'Aether';
      else if (v.k) {
        const o = db.outfits(v.rot);
        if (o && o.images) {
          const sufixo = '-' + v.k;
          await baixar(o.images.card || o.images.portrait,
            `${RAIZ}/personagens/avatar/${id}${sufixo}.png`);
          await baixar(o.images.portrait || o.images.card,
            `${RAIZ}/personagens/splash/${id}${sufixo}.png`);
          continue;
        }
      }
      const c = db.characters(busca);
      if (!c || !c.images) { falhas.push('personagem ' + nome); continue; }
      const sufixo = id.startsWith('traveler') ? '-' + v.k : (v.k ? '-' + v.k : '');
      await baixar(c.images.card || c.images['hoyolab-avatar'],
        `${RAIZ}/personagens/avatar/${id}${sufixo}.png`);
      await baixar(c.images.cover1 || c.images.portrait || c.images.card,
        `${RAIZ}/personagens/splash/${id}${sufixo}.png`);
    }
  }
}

async function armasF() {
  console.log(`\n\narmas (${armas.length})`);
  for (const nome of armas) {
    const w = db.weapons(nome);
    if (!w || !w.images) { falhas.push('arma ' + nome); continue; }
    await baixar(w.images.icon || w.images.mihoyo_icon || w.images.awakenicon,
      `${RAIZ}/armas/${slug(nome)}.png`);
  }
}

async function artefatos() {
  console.log(`\n\nartefatos (${sets.length} conjuntos x 5 peças)`);
  const SLOTS = ['flower', 'plume', 'sands', 'goblet', 'circlet'];
  for (const nome of sets) {
    const a = db.artifacts(nome);
    if (!a || !a.images) { falhas.push('conjunto ' + nome); continue; }
    for (const s of SLOTS) {
      const url = a.images[s] || a.images[s === 'circlet' ? 'circlet' : s];
      await baixar(url, `${RAIZ}/artefatos/${slug(nome)}/${s}.png`);
    }
    /* coringa: usa a flor */
    await baixar(a.images.flower, `${RAIZ}/artefatos/${slug(nome)}/set.png`);
  }
}

(async () => {
  const t0 = Date.now();
  if (quer('personagens')) await personagens();
  if (quer('armas')) await armasF();
  if (quer('artefatos')) await artefatos();

  console.log('\n');
  console.log('baixadas:', baixadas, '| já existiam:', puladas, '| falhas:', falhas.length);
  console.log('tempo:', Math.round((Date.now() - t0) / 1000) + 's');
  if (falhas.length) {
    console.log('\nfalhas:');
    falhas.slice(0, 40).forEach(f => console.log('  ' + f));
    if (falhas.length > 40) console.log('  ... e mais ' + (falhas.length - 40));
    console.log('\nRode de novo: ele só tenta o que faltou.');
  }
  console.log('\nFalta só a logo, em assets/logo/logo.png.');
})();
