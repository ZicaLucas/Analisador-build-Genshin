const db=require('genshin-db'), fs=require('fs');
const src=fs.readFileSync('/mnt/user-data/outputs/analisador_times_genshin.jsx','utf8');
const SETS=[...src.slice(src.indexOf('const SETS = ['),src.indexOf('];',src.indexOf('const SETS = ['))).matchAll(/"([^"]+)"/g)].map(m=>m[1]);

const ELS=['Pyro','Hydro','Anemo','Electro','Dendro','Cryo','Geo'];
function parse2(t){
  const out=[]; let el=null; const naoLido=[];
  // varias clausulas podem coexistir
  const partes=t.split(/\.\s+/).filter(Boolean);
  for(const p of partes){
    let m;
    if((m=p.match(/^(Pyro|Hydro|Anemo|Electro|Dendro|Cryo|Geo) DMG Bonus \+([\d.]+)%/))){ out.push(['dmg',+m[2]]); el=m[1].toLowerCase(); continue; }
    if((m=p.match(/^ATK \+([\d.]+)%/))){ out.push(['atkp',+m[1]]); continue; }
    if((m=p.match(/^HP \+([\d.]+)%/))){ out.push(['hpp',+m[1]]); continue; }
    if((m=p.match(/^DEF \+([\d.]+)%/))){ out.push(['defp',+m[1]]); continue; }
    if((m=p.match(/^Energy Recharge \+([\d.]+)%/))){ out.push(['er',+m[1]]); continue; }
    if((m=p.match(/Increases Elemental Mastery by ([\d.]+)/))){ out.push(['em',+m[1]]); continue; }
    if((m=p.match(/^CRIT Rate \+([\d.]+)%/))){ out.push(['cr',+m[1]]); continue; }
    if((m=p.match(/^CRIT DMG \+([\d.]+)%/))){ out.push(['cd',+m[1]]); continue; }
    if((m=p.match(/^Healing Bonus \+([\d.]+)%/))){ out.push(['heal',+m[1]]); continue; }
    if((m=p.match(/^Physical DMG (?:Bonus )?\+([\d.]+)%/))){ out.push(['phys',+m[1]]); continue; }
    // variacoes de escrita do mesmo efeito
    if((m=p.match(/Gain a ([\d.]+)% (Pyro|Hydro|Anemo|Electro|Dendro|Cryo|Geo) DMG Bonus/))){ out.push(['dmg',+m[1]]); el=m[2].toLowerCase(); continue; }
    if((m=p.match(/Physical DMG is increased by ([\d.]+)%/))){ out.push(['phys',+m[1]]); continue; }
    // escopados por tipo de golpe: 3o elemento = escopo
    if((m=p.match(/Elemental Burst DMG \+([\d.]+)%/))){ out.push(['dmg',+m[1],'burst']); continue; }
    if((m=p.match(/Increases Elemental Skill DMG by ([\d.]+)%/))){ out.push(['dmg',+m[1],'skill']); continue; }
    if((m=p.match(/Normal and Charged Attack DMG \+([\d.]+)%/))){ out.push(['dmg',+m[1],'na']); continue; }
    if((m=p.match(/Plunging Attack DMG increased by ([\d.]+)%/))){ out.push(['dmg',+m[1],'na']); continue; }
    naoLido.push(p.trim());
  }
  return {out,el,naoLido};
}

const linhas=[], avisos=[];
for(const nome of SETS){
  const a=db.artifacts(nome);
  if(!a||a.name.toLowerCase()!==nome.toLowerCase()){ avisos.push([nome,'nao encontrado na base']); continue; }
  const {out,el,naoLido}=parse2(a.effect2Pc||'');
  if(naoLido.length) avisos.push([nome,'2pc nao estruturado: '+naoLido.join(' | ').slice(0,90)]);
  const p2='['+out.map(x=>x.length>2?`["${x[0]}",${x[1]},"${x[2]}"]`:`["${x[0]}",${x[1]}]`).join(',')+']';
  const t4=(a.effect4Pc||'').replace(/\s+/g,' ').trim();
  linhas.push(`  ${JSON.stringify(nome)}: { p2: ${p2}, el: ${el?JSON.stringify(el):'null'}, `+
    `t2: ${JSON.stringify((a.effect2Pc||'').replace(/\s+/g,' ').trim())}, t4: ${JSON.stringify(t4)} },`);
}
fs.writeFileSync('sets.js.txt','/* Conjuntos: bônus de 2 peças estruturado + textos oficiais.\n'+
 '   Gerado por gensets.cjs a partir do genshin-db — não editar à mão.\n'+
 '   p2 aplica automaticamente. el != null significa que o bônus só vale\n'+
 '   se o elemento do personagem for esse. O 4pc fica como texto: é\n'+
 '   condicional demais para automatizar, então vai nos ajustes manuais. */\n'+
 'const CONJUNTOS = {\n'+linhas.join('\n')+'\n};\n');
console.log('conjuntos:',linhas.length,'de',SETS.length);
console.log('\navisos ('+avisos.length+'):');
avisos.forEach(a=>console.log('  ',a[0],'->',a[1]));
