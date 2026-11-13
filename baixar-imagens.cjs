/* Baixa todas as imagens do app, já com o nome certo, na pasta assets/.

   Uso:
     npm install genshin-db
     node baixar-imagens.cjs            baixa o que faltar
     node baixar-imagens.cjs --forcar   rebaixa tudo
     node baixar-imagens.cjs armas      só uma categoria (personagens, skins,
                                        armas ou artefatos)

   A logo não existe na base: ponha à mão em assets/logo/logo.png.

   Pula o que já está na pasta, então pode interromper e rodar de novo.
   Lê o próprio .jsx para saber quais personagens, armas, conjuntos e skins
   existem, e assim os nomes de arquivo batem sempre com o que o app procura.

   Cada imagem tem uma lista de fontes, tentadas em ordem: primeiro a URL que a
   base traz e, se ela der erro, o nome interno do arquivo do jogo nos espelhos
   do Enka.Network e do Yatta. As URLs antigas da miHoYo (upload-os-bbs) estão
   saindo do ar, e as skins só existem nos espelhos, porque a base não traz URL
   nenhuma para elas, só o nome interno. */

const db = require('genshin-db');
const fs = require('fs');
const path = require('path');

const JSX = 'analisador_times_genshin.jsx';
const RAIZ = 'assets';
const RELATORIO = 'falhas-download.txt';
const FORCAR = process.argv.includes('--forcar');
const SO = process.argv.slice(2).find(a => !a.startsWith('--'));
const CATEGORIAS = ['personagens', 'skins', 'armas', 'artefatos'];

if (SO && !CATEGORIAS.includes(SO)) {
  console.error(`categoria desconhecida: ${SO}. Use uma destas: ${CATEGORIAS.join(', ')}.`);
  process.exit(1);
}
if (!fs.existsSync(JSX)) {
  console.error(`não achei ${JSX} nesta pasta. Rode o script ao lado dele.`);
  process.exit(1);
}
const src = fs.readFileSync(JSX, 'utf8');

const slug = (x) => x.toLowerCase().replace(/['\u2019]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* Personagens: um por base, não por variante de papel. */
const blk = src.slice(src.indexOf('const CHARS = ['), src.indexOf('const CHAR_BY_ID'));
const chars = {};
for (const m of blk.matchAll(/id:"([a-z0-9-]+)", base:"([a-z0-9-]+)", n:"([^"]+)"/g))
  if (!chars[m[2]]) chars[m[2]] = m[3].split(' — ')[0];
for (const m of blk.matchAll(/C\(\{ id:"([a-z0-9-]+)", n:"([^"]+)"/g))
  if (!chars[m[1]]) chars[m[1]] = m[2];

const armas = [...new Set([...src.matchAll(/\{ n: "((?:[^"\\]|\\.)+)", t: "\w+"/g)]
  .map(m => m[1].replace(/\\"/g, '"')))];

const sets = [...src.slice(src.indexOf('const SETS = ['),
  src.indexOf('];', src.indexOf('const SETS = ['))).matchAll(/"([^"]+)"/g)].map(m => m[1]);

/* Skins declaradas no app. O rótulo (rot) é o nome oficial do traje na base,
   e pode ter aspas escapadas, por isso a leitura passa pelo JSON. */
const apBlk = src.slice(src.indexOf('const APARENCIAS = {'), src.indexOf('const aparenciasDe'));
const skins = [];
for (const m of apBlk.matchAll(/^ {2}([a-z0-9-]+): \[(.*)\],$/gm))
  for (const x of m[2].matchAll(/k: "([^"]+)", rot: ("(?:[^"\\]|\\.)*")/g))
    skins.push({ id: m[1], k: x[1], rot: JSON.parse(x[2]) });

let baixadas = 0, puladas = 0;
const falhas = [];

/* A base traz uma URL com espaço (hoyowiki_icon); o encodeURI resolve sem
   estragar as que já vêm codificadas. */
const limpa = (u) => (u.includes(' ') ? encodeURI(u) : u);

/* Monta a lista de fontes para um tipo de imagem. Para cada chave, entra a URL
   direta da base, depois a versão mihoyo_ do mesmo campo e, por fim, o nome
   interno (filename_) nos dois espelhos. A ordem das chaves é a ordem de
   preferência. */
function fontes(images, chaves) {
  const urls = [];
  const http = (v) => typeof v === 'string' && v.startsWith('http');
  for (const k of chaves) {
    if (http(images[k])) urls.push(limpa(images[k]));
    if (http(images['mihoyo_' + k])) urls.push(limpa(images['mihoyo_' + k]));
  }
  for (const k of chaves) {
    const fn = images['filename_' + k];
    if (typeof fn === 'string' && fn) {
      urls.push(`https://enka.network/ui/${fn}.png`);
      urls.push(`https://gi.yatta.moe/assets/UI/${fn}.png`);
    }
  }
  return [...new Set(urls)];
}

/* Tenta cada fonte em ordem e para na primeira que responder com uma imagem.
   Só conta falha quando todas dão erro, e guarda o erro de cada uma. */
async function baixar(urls, destino, rotulo) {
  if (!FORCAR && fs.existsSync(destino)) { puladas++; return; }
  if (!urls.length) { falhas.push(`${rotulo} -> ${destino}\n    sem nenhuma fonte na base`); return; }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  const erros = [];
  for (const url of urls) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (baixar-imagens; analisador de times)' },
        signal: AbortSignal.timeout(20000),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const tipo = r.headers.get('content-type') || '';
      if (tipo && !tipo.startsWith('image/')) throw new Error('não é imagem (' + tipo + ')');
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 500) throw new Error('arquivo vazio');
      fs.writeFileSync(destino, buf);
      baixadas++;
      process.stdout.write('.');
      if (baixadas % 60 === 0) process.stdout.write(' ' + baixadas + '\n');
      return;
    } catch (e) {
      erros.push(`${e.name === 'TimeoutError' ? 'tempo esgotado' : e.message}  ${url}`);
    }
  }
  falhas.push(`${rotulo} -> ${destino}\n    ${erros.join('\n    ')}`);
}

/* A base entrega .png e .jpg misturados; o app pede .png, então gravamos tudo
   como .png. O navegador lê pelo conteúdo, não pela extensão. */

async function personagens() {
  const ids = Object.keys(chars);
  console.log(`\npersonagens (${ids.length})`);
  for (const id of ids) {
    const nome = chars[id];
    /* Os Viajantes não têm arte padrão: o app sempre pede Aether ou Lumine. */
    const variantes = id.startsWith('traveler')
      ? [{ busca: 'Aether', sufixo: '-aether' }, { busca: 'Lumine', sufixo: '-lumine' }]
      : [{ busca: nome, sufixo: '' }];
    for (const v of variantes) {
      const c = db.characters(v.busca);
      if (!c || !c.images) { falhas.push(`personagem ${nome}: não encontrado na base`); continue; }
      await baixar(fontes(c.images, ['card', 'hoyolab-avatar', 'iconCard', 'icon']),
        `${RAIZ}/personagens/avatar/${id}${v.sufixo}.png`, `avatar de ${nome}`);
      await baixar(fontes(c.images, ['cover1', 'portrait', 'gachaSplash', 'card']),
        `${RAIZ}/personagens/splash/${id}${v.sufixo}.png`, `splash de ${nome}`);
    }
  }
}

async function skinsF() {
  console.log(`\n\nskins (${skins.length})`);
  for (const s of skins) {
    const o = db.outfits(s.rot);
    /* Se o traje não for achado, registra a falha em vez de gravar a arte
       padrão do personagem com o nome da skin. */
    if (!o || !o.images) { falhas.push(`skin "${s.rot}" (${s.id}): não encontrada na base`); continue; }
    await baixar(fontes(o.images, ['card', 'iconCircle', 'icon']),
      `${RAIZ}/personagens/avatar/${s.id}-${s.k}.png`, `avatar da skin ${s.rot}`);
    await baixar(fontes(o.images, ['splash', 'portrait', 'card']),
      `${RAIZ}/personagens/splash/${s.id}-${s.k}.png`, `splash da skin ${s.rot}`);
  }
}

async function armasF() {
  console.log(`\n\narmas (${armas.length})`);
  for (const nome of armas) {
    const w = db.weapons(nome);
    if (!w || !w.images) { falhas.push(`arma ${nome}: não encontrada na base`); continue; }
    await baixar(fontes(w.images, ['icon', 'awakenIcon', 'awakenicon']),
      `${RAIZ}/armas/${slug(nome)}.png`, `arma ${nome}`);
  }
}

async function artefatos() {
  console.log(`\n\nartefatos (${sets.length} conjuntos x 5 peças)`);
  const SLOTS = ['flower', 'plume', 'sands', 'goblet', 'circlet'];
  for (const nome of sets) {
    const a = db.artifacts(nome);
    if (!a || !a.images) { falhas.push(`conjunto ${nome}: não encontrado na base`); continue; }
    /* Conjuntos de peça única (os de 1 peça, como Prayers for Wisdom) só têm a
       tiara: peça sem nenhuma fonte na base não existe e não conta como falha. */
    for (const s of SLOTS) {
      const f = fontes(a.images, [s]);
      if (f.length) await baixar(f, `${RAIZ}/artefatos/${slug(nome)}/${s}.png`, `${nome} (${s})`);
    }
    /* Coringa do conjunto: usa a flor. Algumas peças únicas só têm o
       circlet, por isso ele entra como segunda opção. */
    await baixar(fontes(a.images, ['flower', 'circlet']),
      `${RAIZ}/artefatos/${slug(nome)}/set.png`, `${nome} (set)`);
  }
}

(async () => {
  const t0 = Date.now();
  if (!SO || SO === 'personagens') await personagens();
  if (!SO || SO === 'skins') await skinsF();
  if (!SO || SO === 'armas') await armasF();
  if (!SO || SO === 'artefatos') await artefatos();

  console.log('\n');
  console.log('baixadas:', baixadas, '| já existiam:', puladas, '| falhas:', falhas.length);
  console.log('tempo:', Math.round((Date.now() - t0) / 1000) + 's');
  if (falhas.length) {
    fs.writeFileSync(RELATORIO, falhas.join('\n\n') + '\n');
    console.log(`\nAs falhas, com cada fonte tentada e o erro de cada uma, estão em ${RELATORIO}.`);
    console.log('Rode de novo quando quiser: ele só tenta o que faltou.');
  } else if (fs.existsSync(RELATORIO)) {
    fs.unlinkSync(RELATORIO);
  }
  console.log('\nFalta só a logo, em assets/logo/logo.png.');
})();
