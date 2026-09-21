const db=require('genshin-db'), fs=require('fs');
const P='/mnt/user-data/outputs/analisador_times_genshin.jsx';
const src=fs.readFileSync(P,'utf8');
const block=src.slice(src.indexOf('const CHARS = ['), src.indexOf('const CHAR_BY_ID'));
const ents=block.split('\n  C({ ').slice(1);

// Viajante usa as bases do Aether
const APELIDO={travelerdendro:'Aether', travelerpyro:'Aether'};
const WT={sword:'Sword',claymore:'Claymore',polearm:'Polearm',bow:'Bow',catalyst:'Catalyst'};

const base=[], assin=[], semAssin=[], ambiguo=[];
for(const e of ents){
  const m=e.match(/id:"([a-z-]+)", n:"([^"]+)", el:"(\w+)", wt:"(\w+)"/); if(!m) continue;
  const [,id,nome,,wt]=m;
  const c=db.characters(APELIDO[id]||nome);
  if(!c||!c.stats){ console.log('  ! sem base:',nome); continue; }
  const st=c.stats(90);
  base.push(`  ${id}: [${st.hp.toFixed(0)},${st.attack.toFixed(1)},${st.defense.toFixed(0)}],`);

  // assinatura: arma 5* do mesmo tipo e mesma versao
  const cands=db.weapons('names',{matchCategories:true})
    .map(n=>db.weapons(n))
    .filter(w=>w&&w.rarity===5&&w.weaponText===WT[wt]&&w.version===c.version);
  // 1.0 = elenco de lancamento, nenhum tem assinatura
  const MANUAL={ neuvillette:'Tome of the Eternal Flow', wriothesley:'Cashflow Supervision' };
  if(MANUAL[id]) assin.push(`  ${id}: ${JSON.stringify(MANUAL[id])},`);
  else if(c.version==='1.0') semAssin.push(nome);
  else if(cands.length===1) assin.push(`  ${id}: ${JSON.stringify(cands[0].name)},`);
  else if(cands.length===0) semAssin.push(nome);
  else ambiguo.push(nome+': '+cands.map(w=>w.name).join(' / '));
}
fs.writeFileSync('base.js.txt',
 '/* Status base no nível 90: [HP, ATQ, DEF]. Gerado por genbase.cjs. */\nconst BASE = {\n'+base.join('\n')+'\n};\n\n'+
 '/* Arma-assinatura: 5★ do mesmo tipo lançada na versão do personagem. */\nconst ASSINATURA = {\n'+assin.join('\n')+'\n};\n');
console.log('bases:',base.length,'| assinaturas:',assin.length);
console.log('\nsem assinatura ('+semAssin.length+'):',semAssin.join(', '));
console.log('\nAMBIGUOS ('+ambiguo.length+'):'); ambiguo.forEach(a=>console.log('  ',a));
