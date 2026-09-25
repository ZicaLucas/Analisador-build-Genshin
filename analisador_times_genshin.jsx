import React, { useState, useMemo, useEffect } from "react";

function slug(s) {
  return String(s).toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ASSETS = {
  base: "assets",
  logo: () => `${ASSETS.base}/logo/logo.png`,
  avatar: (id) => `${ASSETS.base}/personagens/avatar/${id}.png`,
  splash: (id) => `${ASSETS.base}/personagens/splash/${id}.png`,
  weapon: (name) => `${ASSETS.base}/armas/${slug(name)}.png`,
  piece: (setName, slotKey) => `${ASSETS.base}/artefatos/${slug(setName)}/${slotKey}.png`,
  pieceAny: (setName) => `${ASSETS.base}/artefatos/${slug(setName)}/set.png`,
};

/* Imagem com cadeia de fallback. Quando tudo falha, não renderiza nada
   e o espaço reservado do container fica visível. */
function Img({ src, fallback, alt, className }) {
  const [step, setStep] = useState(0);
  const chain = [src, fallback].filter(Boolean);
  useEffect(() => { setStep(0); }, [src, fallback]);
  if (step >= chain.length) return null;
  return (
    <img className={className} src={chain[step]} alt={alt} loading="lazy"
      onError={() => setStep((s) => s + 1)} />
  );
}

/* Tabelas de referência */

const EL = {
  pyro:    { n: "Pyro",    c: "#F0793B" },
  hydro:   { n: "Hydro",   c: "#4CC2F1" },
  anemo:   { n: "Anemo",   c: "#6FC7A8" },
  electro: { n: "Electro", c: "#B08FE0" },
  dendro:  { n: "Dendro",  c: "#A5C83B" },
  cryo:    { n: "Cryo",    c: "#8FD3E8" },
  geo:     { n: "Geo",     c: "#E0AA3E" },
};

// Substats: rolagem máxima em artefato 5★
const MAXROLL = {
  hp: 298.75, atk: 19.45, def: 23.15,
  hpp: 5.83, atkp: 5.83, defp: 7.29,
  em: 23.31, er: 6.48, cr: 3.89, cd: 7.77,
};

// Status principal no +20 (5★)
const MAINMAX = {
  hp: 4780, atk: 311, hpp: 46.6, atkp: 46.6, defp: 58.3,
  em: 187, er: 51.8, cr: 31.1, cd: 62.2, dmg: 46.6, phys: 58.3, heal: 35.9,
};

const SUB_LABEL = {
  hp: "HP", atk: "ATQ", def: "DEF",
  hpp: "HP%", atkp: "ATQ%", defp: "DEF%",
  em: "Proficiência", er: "Recarga%", cr: "Crítico%", cd: "Dano Crít%", phys: "Físico%",
};

const MAIN_LABEL = {
  ...SUB_LABEL,
  dmg: "Bônus de Dano Elemental%",
  phys: "Dano Físico%",
  heal: "Bônus de Cura%",
};

const SUB_KEYS = ["hp", "atk", "def", "hpp", "atkp", "defp", "em", "er", "cr", "cd"];

const SLOTS = [
  { k: "flower",  n: "Flor",      fixed: "hp",  mains: ["hp"] },
  { k: "plume",   n: "Pluma",     fixed: "atk", mains: ["atk"] },
  { k: "sands",   n: "Ampulheta", mains: ["hpp", "atkp", "defp", "em", "er"] },
  { k: "goblet",  n: "Cálice",    mains: ["hpp", "atkp", "defp", "em", "dmg", "phys"] },
  { k: "circlet", n: "Coroa",     mains: ["hpp", "atkp", "defp", "em", "cr", "cd", "heal"] },
];

const TAL = { na: "Ataque Normal", skill: "Habilidade (E)", burst: "Supremo (Q)" };

const SETS = [
  "Gladiator's Finale", "Wanderer's Troupe", "Noblesse Oblige", "Bloodstained Chivalry",
  "Viridescent Venerer", "Archaic Petra", "Crimson Witch of Flames", "Lavawalker",
  "Thundersoother", "Thundering Fury", "Blizzard Strayer", "Heart of Depth",
  "Tenacity of the Millelith", "Pale Flame", "Shimenawa's Reminiscence",
  "Emblem of Severed Fate", "Husk of Opulent Dreams", "Ocean-Hued Clam",
  "Vermillion Hereafter", "Echoes of an Offering", "Deepwood Memories", "Gilded Dreams",
  "Desert Pavilion Chronicle", "Flower of Paradise Lost", "Nymph's Dream",
  "Vourukasha's Glow", "Marechaussee Hunter", "Golden Troupe", "Song of Days Past",
  "Nighttime Whispers in the Echoing Woods", "Fragment of Harmonic Whimsy",
  "Unfinished Reverie", "Scroll of the Hero of Cinder City", "Obsidian Codex",
  "Long Night's Oath", "Finale of the Deep Galleries",
];

/* Armas: ATQ base no 90 e status secundário */
const WEAPONS = [
  // Espadas
  { n: "Mistsplitter Reforged", t: "sword", r: 5, atk: 674, s: ["cd", 44.1] },
  { n: "Haran Geppaku Futsu", t: "sword", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "Primordial Jade Cutter", t: "sword", r: 5, atk: 542, s: ["cr", 44.1] },
  { n: "Light of Foliar Incision", t: "sword", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Freedom-Sworn", t: "sword", r: 5, atk: 608, s: ["em", 198] },
  { n: "Key of Khaj-Nisut", t: "sword", r: 5, atk: 542, s: ["hpp", 66.2] },
  { n: "Absolution", t: "sword", r: 5, atk: 674, s: ["cd", 44.1] },
  { n: "Uraku Misugiri", t: "sword", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Splendor of Tranquil Waters", t: "sword", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "The Black Sword", t: "sword", r: 4, atk: 510, s: ["cr", 27.6] },
  { n: "Iron Sting", t: "sword", r: 4, atk: 510, s: ["em", 165] },
  { n: "Xiphos' Moonlight", t: "sword", r: 4, atk: 510, s: ["em", 165] },
  { n: "Sacrificial Sword", t: "sword", r: 4, atk: 454, s: ["er", 61.3] },
  { n: "Favonius Sword", t: "sword", r: 4, atk: 454, s: ["er", 61.3] },
  { n: "Sapwood Blade", t: "sword", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Amenoma Kageuchi", t: "sword", r: 4, atk: 454, s: ["atkp", 55.1] },
  { n: "Harbinger of Dawn", t: "sword", r: 3, atk: 401, s: ["cd", 46.9] },
  { n: "Peak Patrol Song", t: "sword", r: 5, atk: 542, s: ["defp", 82.7] },
  { n: "Cinnabar Spindle", t: "sword", r: 4, atk: 454, s: ["defp", 69] },
  // Espadas grandes
  { n: "Wolf's Gravestone", t: "claymore", r: 5, atk: 608, s: ["atkp", 49.6] },
  { n: "Redhorn Stonethresher", t: "claymore", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Serpent Spine", t: "claymore", r: 4, atk: 510, s: ["cr", 27.6] },
  { n: "Verdict", t: "claymore", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Fang of the Mountain King", t: "claymore", r: 5, atk: 741, s: ["cr", 11] },
  { n: "Sacrificial Greatsword", t: "claymore", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Favonius Greatsword", t: "claymore", r: 4, atk: 454, s: ["er", 61.3] },
  { n: "Ultimate Overlord's Mega Magic Sword", t: "claymore", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Whiteblind", t: "claymore", r: 4, atk: 510, s: ["defp", 51.7] },
  // Lanças
  { n: "Staff of Homa", t: "polearm", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "Primordial Jade Winged-Spear", t: "polearm", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Engulfing Lightning", t: "polearm", r: 5, atk: 608, s: ["er", 55.1] },
  { n: "Calamity Queller", t: "polearm", r: 5, atk: 741, s: ["atkp", 16.5] },
  { n: "Staff of the Scarlet Sands", t: "polearm", r: 5, atk: 542, s: ["cr", 44.1] },
  { n: "Crimson Moon's Semblance", t: "polearm", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Lumidouce Elegy", t: "polearm", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "The Catch", t: "polearm", r: 4, atk: 510, s: ["er", 45.9] },
  { n: "Deathmatch", t: "polearm", r: 4, atk: 454, s: ["cr", 36.8] },
  { n: "Favonius Lance", t: "polearm", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Dragon's Bane", t: "polearm", r: 4, atk: 454, s: ["em", 221] },
  { n: "Wavebreaker's Fin", t: "polearm", r: 4, atk: 620, s: ["atkp", 13.8] },
  { n: "Prospector's Drill", t: "polearm", r: 4, atk: 565, s: ["atkp", 27.6] },
  { n: "Symphonist of Scents", t: "polearm", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "Black Tassel", t: "polearm", r: 3, atk: 354, s: ["hpp", 46.9] },
  // Arcos
  { n: "Polar Star", t: "bow", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "Aqua Simulacra", t: "bow", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Thundering Pulse", t: "bow", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "Amos' Bow", t: "bow", r: 5, atk: 608, s: ["atkp", 49.6] },
  { n: "The First Great Magic", t: "bow", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "Elegy for the End", t: "bow", r: 5, atk: 608, s: ["er", 55.1] },
  { n: "Silvershower Heartstrings", t: "bow", r: 5, atk: 542, s: ["hpp", 66.2] },
  { n: "Favonius Warbow", t: "bow", r: 4, atk: 454, s: ["er", 61.3] },
  { n: "Sacrificial Bow", t: "bow", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Stringless", t: "bow", r: 4, atk: 510, s: ["em", 165] },
  { n: "Alley Hunter", t: "bow", r: 4, atk: 565, s: ["atkp", 27.6] },
  { n: "Scion of the Blazing Sun", t: "bow", r: 4, atk: 565, s: ["cr", 18.4] },
  { n: "Hunter's Path", t: "bow", r: 5, atk: 542, s: ["cr", 44.1] },
  { n: "Prototype Crescent", t: "bow", r: 4, atk: 510, s: ["atkp", 41.3] },
  // Catalisadores
  { n: "Lost Prayer to the Sacred Winds", t: "catalyst", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "Kagura's Verity", t: "catalyst", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "Tome of the Eternal Flow", t: "catalyst", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Memory of Dust", t: "catalyst", r: 5, atk: 608, s: ["atkp", 49.6] },
  { n: "Everlasting Moonglow", t: "catalyst", r: 5, atk: 608, s: ["hpp", 49.6] },
  { n: "Jadefall's Splendor", t: "catalyst", r: 5, atk: 608, s: ["hpp", 49.6] },
  { n: "Crane's Echoing Call", t: "catalyst", r: 5, atk: 741, s: ["atkp", 16.5] },
  { n: "Thrilling Tales of Dragon Slayers", t: "catalyst", r: 3, atk: 401, s: ["hpp", 35.2] },
  { n: "Tulaytullah's Remembrance", t: "catalyst", r: 5, atk: 674, s: ["cd", 44.1] },
  { n: "A Thousand Floating Dreams", t: "catalyst", r: 5, atk: 542, s: ["em", 265] },
  { n: "Cashflow Supervision", t: "catalyst", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Surf's Up", t: "catalyst", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Prototype Amber", t: "catalyst", r: 4, atk: 510, s: ["hpp", 41.3] },
  { n: "Sacrificial Fragments", t: "catalyst", r: 4, atk: 454, s: ["em", 221] },
  { n: "Favonius Codex", t: "catalyst", r: 4, atk: 510, s: ["er", 45.9] },
  { n: "The Widsith", t: "catalyst", r: 4, atk: 510, s: ["cd", 55.1] },
  { n: "Wine and Song", t: "catalyst", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Flowing Purity", t: "catalyst", r: 4, atk: 565, s: ["atkp", 27.6] },
  { n: "Ballad of the Boundless Blue", t: "catalyst", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Beacon of the Reed Sea", t: "claymore", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "Skyward Blade", t: "sword", r: 5, atk: 608, s: ["er", 55.1] },
  { n: "Skyward Pride", t: "claymore", r: 5, atk: 674, s: ["er", 36.8] },
  { n: "Skyward Spine", t: "polearm", r: 5, atk: 674, s: ["er", 36.8] },
  { n: "Skyward Harp", t: "bow", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Skyward Atlas", t: "catalyst", r: 5, atk: 674, s: ["atkp", 33.1] },
  { n: "Aquila Favonia", t: "sword", r: 5, atk: 674, s: ["phys", 41.3] },
  { n: "Lion's Roar", t: "sword", r: 4, atk: 510, s: ["atkp", 41.3] },
  { n: "Rainslasher", t: "claymore", r: 4, atk: 510, s: ["em", 165] },
  { n: "Makhaira Aquamarine", t: "claymore", r: 4, atk: 510, s: ["em", 165] },
  { n: "Katsuragikiri Nagamasa", t: "claymore", r: 4, atk: 510, s: ["er", 45.9] },
  { n: "Rust", t: "bow", r: 4, atk: 510, s: ["atkp", 41.3] },
  { n: "Fading Twilight", t: "bow", r: 4, atk: 565, s: ["er", 30.6] },
  { n: "Missive Windspear", t: "polearm", r: 4, atk: 510, s: ["atkp", 41.3] },
  { n: "Kitain Cross Spear", t: "polearm", r: 4, atk: 565, s: ["em", 110] },
  { n: "Moonpiercer", t: "polearm", r: 4, atk: 565, s: ["em", 110] },
  { n: "Solar Pearl", t: "catalyst", r: 4, atk: 510, s: ["cr", 27.6] },
  { n: "Mappa Mare", t: "catalyst", r: 4, atk: 565, s: ["em", 110] },
  { n: "Wandering Evenstar", t: "catalyst", r: 4, atk: 510, s: ["em", 165] },
  { n: "Fruit of Fulfillment", t: "catalyst", r: 4, atk: 510, s: ["er", 45.9] },
  { n: "Oathsworn Eye", t: "catalyst", r: 4, atk: 565, s: ["atkp", 27.6] },
  { n: "Ballad of the Fjords", t: "polearm", r: 4, atk: 510, s: ["cr", 27.6] },
  { n: "Song of Broken Pines", t: "claymore", r: 5, atk: 741, s: ["phys", 20.7] },
  { n: "Astral Vulture's Crimson Plumage", t: "bow", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "Prototype Archaic", t: "claymore", r: 4, atk: 565, s: ["atkp", 27.6] },
  { n: "Festering Desire", t: "sword", r: 4, atk: 510, s: ["er", 45.9] },
  { n: "A Thousand Blazing Suns", t: "claymore", r: 5, atk: 741, s: ["cr", 11] },
  { n: "Vortex Vanquisher", t: "polearm", r: 5, atk: 608, s: ["atkp", 49.6] },
  { n: "Summit Shaper", t: "sword", r: 5, atk: 608, s: ["atkp", 49.6] },
  { n: "The Unforged", t: "claymore", r: 5, atk: 608, s: ["atkp", 49.6] },
  { n: "Azurelight", t: "sword", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Starcaller's Watch", t: "catalyst", r: 5, atk: 542, s: ["em", 265] },
  { n: "Sunny Morning Sleep-In", t: "catalyst", r: 5, atk: 542, s: ["em", 265] },
  { n: "Vivid Notions", t: "catalyst", r: 5, atk: 674, s: ["cd", 44.1] },
  { n: "Nocturne's Curtain Call", t: "catalyst", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Athame Artis", t: "sword", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "Bloodsoaked Ruins", t: "polearm", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Fractured Halo", t: "polearm", r: 5, atk: 608, s: ["cd", 66.2] },
  { n: "The Daybreak Chronicles", t: "bow", r: 5, atk: 674, s: ["cd", 44.1] },
  { n: "Nightweaver's Looking Glass", t: "catalyst", r: 5, atk: 542, s: ["em", 265] },
  { n: "Golden Frostbound Oath", t: "bow", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Disaster and Remorse", t: "polearm", r: 5, atk: 674, s: ["cr", 22.1] },
  { n: "Reliquary of Truth", t: "catalyst", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "Angelos' Heptades", t: "catalyst", r: 5, atk: 741, s: ["atkp", 16.5] },
  { n: "Gest of the Mighty Wolf", t: "claymore", r: 5, atk: 608, s: ["cr", 33.1] },
  { n: "Lightbearing Moonshard", t: "sword", r: 5, atk: 542, s: ["cd", 88.2] },
  { n: "A Teaspoon of Transcendence", t: "claymore", r: 5, atk: 674, s: ["cd", 44.1] },
];

//Personagens
const C = (o) => o;
const CHARS = [
  // PYRO
  C({ id:"hutao", n:"Hu Tao", el:"pyro", wt:"polearm", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Crimson Witch of Flames",p:4},{n:"Shimenawa's Reminiscence",p:4}],
      main:{sands:["hpp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","em","hpp"], er:1.15,
      tal:["na","skill","burst"], wpns:["Staff of Homa","Crimson Moon's Semblance","Deathmatch","Dragon's Bane"],
      note:"Escala com HP, mas ATQ% ainda contribui pouco — priorize HP% e crítico." }),
  C({ id:"arlecchino", n:"Arlecchino", el:"pyro", wt:"polearm", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Fragment of Harmonic Whimsy",p:4},{n:"Crimson Witch of Flames",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.05,
      tal:["na","skill","burst"], wpns:["Crimson Moon's Semblance","Staff of Homa","Deathmatch"],
      note:"Quase não usa o Supremo. Recarga baixa é aceitável." }),
  C({ id:"lyney", n:"Lyney", el:"pyro", wt:"bow", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Marechaussee Hunter",p:4},{n:"Crimson Witch of Flames",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.1,
      tal:["na","burst","skill"], wpns:["The First Great Magic","Amos' Bow","Scion of the Blazing Sun"] }),
  C({ id:"yoimiya", n:"Yoimiya", el:"pyro", wt:"bow", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Shimenawa's Reminiscence",p:4},{n:"Crimson Witch of Flames",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.2,
      tal:["na","burst","skill"], wpns:["Thundering Pulse","Amos' Bow","Alley Hunter"] }),
  C({ id:"diluc", n:"Diluc", el:"pyro", wt:"claymore", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Crimson Witch of Flames",p:4},{n:"Gladiator's Finale",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.4,
      tal:["skill","burst","na"], wpns:["Wolf's Gravestone","Redhorn Stonethresher","Serpent Spine"] }),
  C({ id:"klee", n:"Klee", el:"pyro", wt:"catalyst", asc:["dmg",28.8], role:"DPS principal", tags:["dps"],
      sets:[{n:"Crimson Witch of Flames",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.3,
      tal:["na","skill","burst"], wpns:["Lost Prayer to the Sacred Winds","The Widsith","Kagura's Verity"] }),
  C({ id:"mavuika", n:"Mavuika", el:"pyro", wt:"claymore", asc:["cd",88.4], role:"DPS / suporte", tags:["dps","buffer"],
      sets:[{n:"Obsidian Codex",p:4},{n:"Crimson Witch of Flames",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.0,
      tal:["burst","skill","na"], wpns:["Beacon of the Reed Sea","Redhorn Stonethresher","Serpent Spine","Verdict"],
      note:"Usa Fervor da Luta em vez de energia — Recarga tem valor muito baixo. A arma-assinatura dela não está na lista; adicione em WEAPONS se quiser." }),
  C({ id:"xiangling", n:"Xiangling", el:"pyro", wt:"polearm", asc:["em",96], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Emblem of Severed Fate",p:4},{n:"Crimson Witch of Flames",p:4}],
      main:{sands:["atkp","em","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em","er"], er:1.8,
      tal:["burst","skill","na"], wpns:["Engulfing Lightning","The Catch","Dragon's Bane","Favonius Lance"],
      note:"Pyronado é 100% do dano dela. Recarga alta não é opcional." }),
  C({ id:"bennett", n:"Bennett", el:"pyro", wt:"sword", asc:["er",26.7], role:"Buffer / cura", tags:["healer","buffer"],
      sets:[{n:"Noblesse Oblige",p:4},{n:"Emblem of Severed Fate",p:4}],
      main:{sands:["er","atkp"],goblet:["atkp","dmg"],circlet:["heal","cr","cd"]}, subs:["er","atkp","cr","cd","hpp"], er:2.0,
      tal:["burst","skill","na"], wpns:["Mistsplitter Reforged","Favonius Sword","Sacrificial Sword","Primordial Jade Cutter"],
      note:"O buff de ATQ escala com o ATQ BASE dele — ATQ% de artefato não aumenta o buff, só o dano dele." }),
  // HYDRO
  C({ id:"neuvillette", n:"Neuvillette", el:"hydro", wt:"catalyst", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Marechaussee Hunter",p:4},{n:"Golden Troupe",p:4}],
      main:{sands:["hpp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","hpp"], er:1.05,
      tal:["na","burst","skill"], wpns:["Tome of the Eternal Flow","Cashflow Supervision","Prototype Amber"],
      note:"Dano vem do Ataque Carregado (talento de Ataque Normal). Ignore ATQ%." }),
  C({ id:"furina", n:"Furina", el:"hydro", wt:"sword", asc:["cr",24.2], role:"Buffer / sub-DPS", tags:["subdps","buffer"],
      sets:[{n:"Golden Troupe",p:4},{n:"Tenacity of the Millelith",p:4}],
      main:{sands:["hpp"],goblet:["hpp","dmg"],circlet:["cd","cr","hpp"]}, subs:["hpp","cd","cr","er"], er:1.3,
      tal:["skill","burst","na"], wpns:["Splendor of Tranquil Waters","Key of Khaj-Nisut","Favonius Sword","Sacrificial Sword"] }),
  C({ id:"xingqiu", n:"Xingqiu", el:"hydro", wt:"sword", asc:["atkp",24], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Emblem of Severed Fate",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["er","atkp"],goblet:["dmg","atkp"],circlet:["cd","cr"]}, subs:["er","cd","cr","atkp"], er:2.0,
      tal:["burst","skill","na"], wpns:["Sacrificial Sword","Favonius Sword","The Black Sword","Primordial Jade Cutter"] }),
  C({ id:"yelan", n:"Yelan", el:"hydro", wt:"bow", asc:["cr",24.2], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Emblem of Severed Fate",p:4}],
      main:{sands:["hpp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","hpp","er"], er:1.8,
      tal:["burst","skill","na"], wpns:["Aqua Simulacra","Favonius Warbow","Sacrificial Bow","Silvershower Heartstrings"] }),
  C({ id:"kokomi", n:"Sangonomiya Kokomi", el:"hydro", wt:"catalyst", asc:["dmg",28.8], role:"Cura / aplicação", tags:["healer"],
      sets:[{n:"Ocean-Hued Clam",p:4},{n:"Tenacity of the Millelith",p:4}],
      main:{sands:["hpp"],goblet:["hpp","dmg"],circlet:["heal","hpp"]}, subs:["hpp","er","em"], er:1.6,
      tal:["skill","burst","na"], wpns:["Everlasting Moonglow","Thrilling Tales of Dragon Slayers","Prototype Amber","Sacrificial Fragments"],
      note:"Tem -100% de Crítico por passiva. Crítico% e Dano Crít% são status MORTOS nela." }),
  C({ id:"mona", n:"Mona", el:"hydro", wt:"catalyst", asc:["er",32], role:"Buffer / sub-DPS", tags:["subdps","buffer"],
      sets:[{n:"Emblem of Severed Fate",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["er","em"],goblet:["dmg","em"],circlet:["cd","cr","em"]}, subs:["er","cd","cr","em"], er:2.0,
      tal:["burst","skill","na"], wpns:["The Widsith","Sacrificial Fragments","Favonius Codex"] }),
  C({ id:"nilou", n:"Nilou", el:"hydro", wt:"sword", asc:["hpp",28.8], role:"Habilitador Bloom", tags:["subdps","buffer"],
      sets:[{n:"Flower of Paradise Lost",p:4},{n:"Tenacity of the Millelith",p:4}],
      main:{sands:["hpp"],goblet:["hpp"],circlet:["hpp"]}, subs:["hpp","em","er"], er:1.2,
      tal:["skill","burst","na"], wpns:["Key of Khaj-Nisut","Xiphos' Moonlight","Sacrificial Sword"],
      note:"Time só de Hydro+Dendro. Crítico é irrelevante: Bloom não crita." }),
  C({ id:"childe", n:"Tartaglia", el:"hydro", wt:"bow", asc:["dmg",28.8], role:"DPS principal", tags:["dps"],
      sets:[{n:"Heart of Depth",p:4},{n:"Echoes of an Offering",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.3,
      tal:["na","burst","skill"], wpns:["Polar Star","Thundering Pulse","Aqua Simulacra","Alley Hunter"] }),
  // ANEMO
  C({ id:"kazuha", n:"Kaedehara Kazuha", el:"anemo", wt:"sword", asc:["em",115.2], role:"Buffer / agrupador", tags:["buffer"],
      sets:[{n:"Viridescent Venerer",p:4}],
      main:{sands:["em"],goblet:["em"],circlet:["em","cd"]}, subs:["em","er","cd","cr"], er:1.4,
      tal:["burst","skill","na"], wpns:["Freedom-Sworn","Iron Sting","Xiphos' Moonlight","Favonius Sword"],
      note:"Cada 1000 de Proficiência vira buff elemental pro time. Proficiência triplo é o padrão." }),
  C({ id:"venti", n:"Venti", el:"anemo", wt:"bow", asc:["er",32], role:"Buffer / controle", tags:["buffer"],
      sets:[{n:"Viridescent Venerer",p:4}],
      main:{sands:["em","er"],goblet:["em","dmg"],circlet:["em","cd"]}, subs:["em","er","cd","cr"], er:1.4,
      tal:["burst","skill","na"], wpns:["Elegy for the End","Favonius Warbow","Stringless"] }),
  C({ id:"sucrose", n:"Sucrose", el:"anemo", wt:"catalyst", asc:["dmg",24], role:"Buffer / agrupador", tags:["buffer"],
      sets:[{n:"Viridescent Venerer",p:4}],
      main:{sands:["em"],goblet:["em"],circlet:["em"]}, subs:["em","er"], er:1.8,
      tal:["burst","skill","na"], wpns:["Sacrificial Fragments","Thrilling Tales of Dragon Slayers","Favonius Codex"],
      note:"Passiva compartilha 20% da Proficiência dela com o time. Crítico é desperdício." }),
  C({ id:"xianyun", n:"Xianyun", el:"anemo", wt:"catalyst", asc:["atkp",28.8], role:"Cura / buffer de queda", tags:["healer","buffer"],
      sets:[{n:"Song of Days Past",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["atkp"],goblet:["atkp"],circlet:["heal","atkp"]}, subs:["atkp","er","hpp"], er:1.6,
      tal:["skill","burst","na"], wpns:["Crane's Echoing Call","Sacrificial Fragments","Favonius Codex"] }),
  C({ id:"jean", n:"Jean", el:"anemo", wt:"sword", asc:["heal",22.1], role:"Cura / buffer", tags:["healer","buffer"],
      sets:[{n:"Viridescent Venerer",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["atkp","er"],goblet:["dmg","atkp"],circlet:["heal"]}, subs:["er","atkp","cr","cd"], er:1.5,
      tal:["burst","skill","na"], wpns:["Freedom-Sworn","Favonius Sword","Sacrificial Sword"] }),
  C({ id:"wanderer", n:"Wanderer", el:"anemo", wt:"catalyst", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Desert Pavilion Chronicle",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.1,
      tal:["na","skill","burst"], wpns:["Tulaytullah's Remembrance","Lost Prayer to the Sacred Winds","The Widsith"] }),
  C({ id:"xiao", n:"Xiao", el:"anemo", wt:"polearm", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Vermillion Hereafter",p:4},{n:"Viridescent Venerer",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.4,
      tal:["na","burst","skill"], wpns:["Primordial Jade Winged-Spear","Staff of Homa","Calamity Queller"],
      note:"Queda de mergulho escala com o talento de Ataque Normal, não com o Supremo." }),
  C({ id:"faruzan", n:"Faruzan", el:"anemo", wt:"bow", asc:["atkp",24], role:"Buffer de Anemo", tags:["buffer"],
      sets:[{n:"Noblesse Oblige",p:4}],
      main:{sands:["atkp","er"],goblet:["atkp","dmg"],circlet:["cd","cr"]}, subs:["er","cd","cr","atkp"], er:1.9,
      tal:["skill","burst","na"], wpns:["Elegy for the End","Favonius Warbow","Sacrificial Bow","Scion of the Blazing Sun"],
      note:"Precisa de C6 pra valer a pena. O buff de Dano Crít exige que ela mesma tenha crítico." }),
  // ELECTRO
  C({ id:"raiden", n:"Raiden Shogun", el:"electro", wt:"polearm", asc:["er",32], role:"DPS / bateria", tags:["dps","battery"],
      sets:[{n:"Emblem of Severed Fate",p:4}],
      main:{sands:["atkp","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["er","cd","cr","atkp"], er:2.2,
      tal:["burst","skill","na"], wpns:["Engulfing Lightning","The Catch","Calamity Queller"],
      note:"Recarga acima de 100% vira dano direto (passiva). 220–260% é o ideal." }),
  C({ id:"yae", n:"Yae Miko", el:"electro", wt:"catalyst", asc:["cr",24.2], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Gilded Dreams",p:4},{n:"Thundering Fury",p:4}],
      main:{sands:["atkp","em"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.2,
      tal:["skill","burst","na"], wpns:["Kagura's Verity","The Widsith","Lost Prayer to the Sacred Winds"] }),
  C({ id:"fischl", n:"Fischl", el:"electro", wt:"bow", asc:["atkp",24], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Golden Troupe",p:4},{n:"Gilded Dreams",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.2,
      tal:["skill","burst","na"], wpns:["Polar Star","Thundering Pulse","Stringless","Alley Hunter"] }),
  C({ id:"keqing", n:"Keqing", el:"electro", wt:"sword", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Thundering Fury",p:4},{n:"Gladiator's Finale",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.3,
      tal:["skill","na","burst"], wpns:["Mistsplitter Reforged","Light of Foliar Incision","The Black Sword"] }),
  C({ id:"cyno", n:"Cyno", el:"electro", wt:"polearm", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Gilded Dreams",p:4},{n:"Thundering Fury",p:4}],
      main:{sands:["em","atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","em","atkp"], er:1.3,
      tal:["na","skill","burst"], wpns:["Staff of the Scarlet Sands","Primordial Jade Winged-Spear","The Catch"] }),
  C({ id:"clorinde", n:"Clorinde", el:"electro", wt:"sword", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Fragment of Harmonic Whimsy",p:4},{n:"Thundering Fury",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.15,
      tal:["skill","burst","na"], wpns:["Absolution","Mistsplitter Reforged","The Black Sword"],
      note:"Os golpes no estado da Habilidade escalam com o talento de Habilidade Elemental." }),
  C({ id:"kuki", n:"Kuki Shinobu", el:"electro", wt:"sword", asc:["hpp",24], role:"Cura / Hyperbloom", tags:["healer","subdps"],
      sets:[{n:"Flower of Paradise Lost",p:4},{n:"Gilded Dreams",p:4}],
      main:{sands:["em","hpp"],goblet:["em"],circlet:["em","hpp"]}, subs:["em","hpp","er"], er:1.3,
      tal:["skill","burst","na"], wpns:["Xiphos' Moonlight","Iron Sting","Freedom-Sworn","Key of Khaj-Nisut"],
      note:"Em Hyperbloom, Proficiência é tudo. Ignore crítico completamente." }),
  // CRYO
  C({ id:"ayaka", n:"Kamisato Ayaka", el:"cryo", wt:"sword", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Blizzard Strayer",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","atkp","cr"], er:1.2,
      tal:["na","burst","skill"], wpns:["Mistsplitter Reforged","Amenoma Kageuchi","Haran Geppaku Futsu"],
      note:"Com 4pc Blizzard Strayer + Cryo no inimigo você ganha ~40% de Crítico grátis. Vá de Dano Crít." }),
  C({ id:"ganyu", n:"Ganyu", el:"cryo", wt:"bow", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Blizzard Strayer",p:4},{n:"Wanderer's Troupe",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","atkp","cr","em"], er:1.2,
      tal:["na","burst","skill"], wpns:["Amos' Bow","Polar Star","Stringless","Prototype Crescent"] }),
  C({ id:"wriothesley", n:"Wriothesley", el:"cryo", wt:"catalyst", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Marechaussee Hunter",p:4},{n:"Blizzard Strayer",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.1,
      tal:["na","skill","burst"], wpns:["Tulaytullah's Remembrance","Cashflow Supervision","The Widsith"] }),
  C({ id:"shenhe", n:"Shenhe", el:"cryo", wt:"polearm", asc:["atkp",28.8], role:"Buffer de Cryo", tags:["buffer"],
      sets:[{n:"Noblesse Oblige",p:4},{n:"Emblem of Severed Fate",p:4}],
      main:{sands:["atkp","er"],goblet:["atkp"],circlet:["cr","cd"]}, subs:["atkp","er","cr","cd"], er:1.6,
      tal:["skill","burst","na"], wpns:["Calamity Queller","Favonius Lance","The Catch"],
      note:"O buff escala com o ATQ dela — ATQ% aqui vale mais que crítico." }),
  C({ id:"escoffier", n:"Escoffier", el:"cryo", wt:"polearm", asc:["cr",24.2], role:"Sub-DPS / cura", tags:["healer","subdps"],
      sets:[{n:"Scroll of the Hero of Cinder City",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["atkp","er"],goblet:["dmg","atkp"],circlet:["cd","cr","heal"]}, subs:["cd","cr","atkp","er"], er:1.6,
      tal:["skill","burst","na"], wpns:["Symphonist of Scents","Favonius Lance","The Catch"] }),
  C({ id:"rosaria", n:"Rosaria", el:"cryo", wt:"polearm", asc:["atkp",24], role:"Sub-DPS / buffer", tags:["subdps","buffer"],
      sets:[{n:"Blizzard Strayer",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["atkp","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.4,
      tal:["skill","burst","na"], wpns:["Deathmatch","The Catch","Favonius Lance"] }),
  C({ id:"diona", n:"Diona", el:"cryo", wt:"bow", asc:["dmg",24], role:"Cura / escudo", tags:["healer","shielder"],
      sets:[{n:"Noblesse Oblige",p:4},{n:"Tenacity of the Millelith",p:4}],
      main:{sands:["er","hpp"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["er","hpp","em"], er:1.8,
      tal:["skill","burst","na"], wpns:["Sacrificial Bow","Favonius Warbow","Elegy for the End"] }),
  C({ id:"layla", n:"Layla", el:"cryo", wt:"sword", asc:["hpp",24], role:"Escudo / sub-DPS", tags:["shielder","subdps"],
      sets:[{n:"Tenacity of the Millelith",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["hpp"],goblet:["hpp"],circlet:["hpp"]}, subs:["hpp","er","em"], er:1.5,
      tal:["skill","burst","na"], wpns:["Key of Khaj-Nisut","Favonius Sword","Sacrificial Sword"] }),
  // GEO
  C({ id:"zhongli", n:"Zhongli", el:"geo", wt:"polearm", asc:["dmg",28.8], role:"Escudo / redutor de RES", tags:["shielder","buffer"],
      sets:[{n:"Tenacity of the Millelith",p:4},{n:"Archaic Petra",p:4}],
      main:{sands:["hpp"],goblet:["hpp","dmg"],circlet:["hpp","cd"]}, subs:["hpp","er","cd","cr"], er:1.2,
      tal:["skill","burst","na"], wpns:["Black Tassel","Favonius Lance","Staff of Homa"],
      note:"O escudo escala 100% com HP. ATQ% é status morto." }),
  C({ id:"navia", n:"Navia", el:"geo", wt:"claymore", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Nymph's Dream",p:4},{n:"Archaic Petra",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.3,
      tal:["skill","burst","na"], wpns:["Verdict","Serpent Spine","Wolf's Gravestone"] }),
  C({ id:"itto", n:"Arataki Itto", el:"geo", wt:"claymore", asc:["cr",24.2], role:"DPS principal", tags:["dps"],
      sets:[{n:"Husk of Opulent Dreams",p:4}],
      main:{sands:["defp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","defp"], er:1.2,
      tal:["na","skill","burst"], wpns:["Redhorn Stonethresher","Serpent Spine","Verdict"],
      note:"Escala com DEF. ATQ% e HP% são status mortos." }),
  C({ id:"noelle", n:"Noelle", el:"geo", wt:"claymore", asc:["defp",30], role:"DPS / escudo", tags:["dps","shielder","healer"],
      sets:[{n:"Husk of Opulent Dreams",p:4},{n:"Archaic Petra",p:4}],
      main:{sands:["defp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","defp"], er:1.4,
      tal:["na","burst","skill"], wpns:["Redhorn Stonethresher","Whiteblind","Serpent Spine"] }),
  C({ id:"xilonen", n:"Xilonen", el:"geo", wt:"sword", asc:["defp",36], role:"Buffer / redutor de RES", tags:["buffer","healer"],
      sets:[{n:"Scroll of the Hero of Cinder City",p:4},{n:"Archaic Petra",p:4}],
      main:{sands:["defp"],goblet:["defp"],circlet:["defp","heal"]}, subs:["defp","er","hpp"], er:1.2,
      tal:["skill","burst","na"], wpns:["Peak Patrol Song","Uraku Misugiri","Favonius Sword"],
      note:"Escala com DEF. Crítico e ATQ% são desperdício." }),
  C({ id:"chiori", n:"Chiori", el:"geo", wt:"sword", asc:["cr",24.2], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Golden Troupe",p:4},{n:"Husk of Opulent Dreams",p:4}],
      main:{sands:["defp","atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","defp","atkp"], er:1.2,
      tal:["skill","burst","na"], wpns:["Uraku Misugiri","Mistsplitter Reforged","Amenoma Kageuchi"] }),
  C({ id:"albedo", n:"Albedo", el:"geo", wt:"sword", asc:["dmg",28.8], role:"Sub-DPS fora de campo", tags:["subdps"],
      sets:[{n:"Husk of Opulent Dreams",p:4},{n:"Deepwood Memories",p:4}],
      main:{sands:["defp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","defp"], er:1.2,
      tal:["skill","burst","na"], wpns:["Cinnabar Spindle","Harbinger of Dawn","Favonius Sword"] }),
  C({ id:"yunjin", n:"Yun Jin", el:"geo", wt:"polearm", asc:["er",26.7], role:"Buffer de Ataque Normal", tags:["buffer"],
      sets:[{n:"Husk of Opulent Dreams",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["defp","er"],goblet:["defp"],circlet:["defp"]}, subs:["defp","er"], er:1.8,
      tal:["burst","skill","na"], wpns:["Favonius Lance","The Catch","Prospector's Drill"],
      note:"O buff escala com DEF. Crítico e ATQ% não fazem nada aqui." }),
  // DENDRO
  C({ id:"nahida", n:"Nahida", el:"dendro", wt:"catalyst", asc:["em",115.2], role:"Sub-DPS / buffer", tags:["subdps","buffer"],
      sets:[{n:"Deepwood Memories",p:4},{n:"Gilded Dreams",p:4}],
      main:{sands:["em"],goblet:["em","dmg"],circlet:["em","cd","cr"]}, subs:["em","cd","cr","atkp"], er:1.3,
      tal:["skill","burst","na"], wpns:["A Thousand Floating Dreams","Sacrificial Fragments","The Widsith"],
      note:"Proficiência acima de 200 tem retorno decrescente, mas o 1º cálice de Proficiência vale mais que Dendro%." }),
  C({ id:"alhaitham", n:"Alhaitham", el:"dendro", wt:"sword", asc:["dmg",28.8], role:"DPS principal", tags:["dps"],
      sets:[{n:"Gilded Dreams",p:4},{n:"Deepwood Memories",p:4}],
      main:{sands:["em"],goblet:["dmg","em"],circlet:["cd","cr"]}, subs:["em","cd","cr","atkp"], er:1.2,
      tal:["skill","na","burst"], wpns:["Light of Foliar Incision","Freedom-Sworn","Xiphos' Moonlight"] }),
  C({ id:"kinich", n:"Kinich", el:"dendro", wt:"claymore", asc:["cd",88.4], role:"DPS principal", tags:["dps"],
      sets:[{n:"Obsidian Codex",p:4},{n:"Gilded Dreams",p:4}],
      main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.05,
      tal:["skill","burst","na"], wpns:["Fang of the Mountain King","Verdict","Serpent Spine"] }),
  C({ id:"baizhu", n:"Baizhu", el:"dendro", wt:"catalyst", asc:["hpp",28.8], role:"Cura / Deepwood", tags:["healer"],
      sets:[{n:"Deepwood Memories",p:4},{n:"Ocean-Hued Clam",p:4}],
      main:{sands:["hpp"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["hpp","er","em"], er:1.6,
      tal:["skill","burst","na"], wpns:["Jadefall's Splendor","Prototype Amber","Favonius Codex"] }),
  C({ id:"yaoyao", n:"Yaoyao", el:"dendro", wt:"polearm", asc:["hpp",24], role:"Cura / aplicação", tags:["healer"],
      sets:[{n:"Deepwood Memories",p:4},{n:"Noblesse Oblige",p:4}],
      main:{sands:["hpp"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["hpp","er","em"], er:1.6,
      tal:["skill","burst","na"], wpns:["Favonius Lance","The Catch","Black Tassel"] }),
  C({ id:"tighnari", n:"Tighnari", el:"dendro", wt:"bow", asc:["dmg",28.8], role:"DPS principal", tags:["dps"],
      sets:[{n:"Wanderer's Troupe",p:4},{n:"Deepwood Memories",p:4}],
      main:{sands:["em","atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["em","cd","cr","atkp"], er:1.2,
      tal:["na","burst","skill"], wpns:["Hunter's Path","Amos' Bow","Stringless"] }),
  C({ id:"amber", n:"Amber", el:"pyro", wt:"bow", asc:["atkp",24], role:"Sub-DPS / utilidade", tags:["subdps"], sets:[{n:"Crimson Witch of Flames",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.5, tal:["burst","skill","na"], wpns:["Prototype Crescent","Alley Hunter","Sacrificial Bow","Fading Twilight"] }),
  C({ id:"yanfei", n:"Yanfei", el:"pyro", wt:"catalyst", asc:["dmg",24], role:"DPS principal", tags:["dps"], sets:[{n:"Crimson Witch of Flames",p:4},{n:"Shimenawa's Reminiscence",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.2, tal:["na","skill","burst"], wpns:["Lost Prayer to the Sacred Winds","Kagura's Verity","The Widsith","Solar Pearl"], note:"O dano vem do Ataque Carregado — o talento de Ataque Normal é o que importa." }),
  C({ id:"xinyan", n:"Xinyan", el:"pyro", wt:"claymore", asc:["atkp",24], role:"Sub-DPS / escudo", tags:["subdps","shielder"], sets:[{n:"Bloodstained Chivalry",p:4},{n:"Crimson Witch of Flames",p:4}], main:{sands:["atkp","defp"],goblet:["dmg","phys"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","defp","er"], er:1.6, tal:["burst","skill","na"], wpns:["Serpent Spine","Wolf's Gravestone","Whiteblind","Rainslasher"], note:"O escudo escala com DEF, o dano com ATQ. Escolha um dos dois papéis e vá até o fim." }),
  C({ id:"thoma", n:"Thoma", el:"pyro", wt:"polearm", asc:["atkp",24], role:"Escudo", tags:["shielder"], sets:[{n:"Noblesse Oblige",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp","er"],goblet:["hpp"],circlet:["hpp"]}, subs:["hpp","er"], er:2.0, tal:["burst","skill","na"], wpns:["Favonius Lance","Black Tassel","Kitain Cross Spear","Engulfing Lightning"], note:"Escudo 100% HP. Crítico e ATQ% são status mortos." }),
  C({ id:"dehya", n:"Dehya", el:"pyro", wt:"claymore", asc:["hpp",28.8], role:"Sub-DPS / sustentação", tags:["subdps","healer"], sets:[{n:"Vermillion Hereafter",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp","atkp"],goblet:["hpp","dmg"],circlet:["cd","cr","hpp"]}, subs:["hpp","cd","cr","atkp","er"], er:1.4, tal:["skill","burst","na"], wpns:["Beacon of the Reed Sea","Serpent Spine","Whiteblind"] }),
  C({ id:"gaming", n:"Gaming", el:"pyro", wt:"claymore", asc:["atkp",24], role:"DPS principal", tags:["dps"], sets:[{n:"Marechaussee Hunter",p:4},{n:"Crimson Witch of Flames",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","hpp"], er:1.4, tal:["skill","burst","na"], wpns:["Serpent Spine","Redhorn Stonethresher","Ultimate Overlord's Mega Magic Sword"] }),
  C({ id:"chevreuse", n:"Chevreuse", el:"pyro", wt:"polearm", asc:["hpp",24], role:"Buffer / cura", tags:["healer","buffer"], sets:[{n:"Noblesse Oblige",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp","er"],goblet:["hpp"],circlet:["hpp","heal"]}, subs:["hpp","er"], er:2.0, tal:["burst","skill","na"], wpns:["Favonius Lance","The Catch","Black Tassel","Engulfing Lightning"], note:"O buff só ativa em time exclusivamente Pyro + Electro. Fora disso ela é só uma curandeira." }),
  C({ id:"barbara", n:"Barbara", el:"hydro", wt:"catalyst", asc:["hpp",24], role:"Cura", tags:["healer"], sets:[{n:"Ocean-Hued Clam",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["hpp"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["hpp","er","em"], er:1.6, tal:["skill","burst","na"], wpns:["Thrilling Tales of Dragon Slayers","Prototype Amber","Sacrificial Fragments","Fruit of Fulfillment"] }),
  C({ id:"ayato", n:"Kamisato Ayato", el:"hydro", wt:"sword", asc:["cd",88.4], role:"DPS principal", tags:["dps"], sets:[{n:"Echoes of an Offering",p:4},{n:"Heart of Depth",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.3, tal:["skill","burst","na"], wpns:["Haran Geppaku Futsu","Mistsplitter Reforged","Amenoma Kageuchi","The Black Sword"] }),
  C({ id:"candace", n:"Candace", el:"hydro", wt:"polearm", asc:["hpp",24], role:"Buffer / escudo", tags:["shielder","buffer"], sets:[{n:"Noblesse Oblige",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp","er"],goblet:["hpp"],circlet:["hpp"]}, subs:["hpp","er"], er:2.0, tal:["burst","skill","na"], wpns:["Favonius Lance","Black Tassel","Engulfing Lightning","Skyward Spine"] }),
  C({ id:"mualani", n:"Mualani", el:"hydro", wt:"catalyst", asc:["cr",24.2], role:"DPS principal", tags:["dps"], sets:[{n:"Heart of Depth",p:4},{n:"Nymph's Dream",p:4}], main:{sands:["hpp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","hpp"], er:1.1, tal:["skill","burst","na"], wpns:["Surf's Up","Prototype Amber","Sacrificial Fragments"], note:"Escala com HP, não com ATQ. Precisa de Nahida ou Dendro para as marcas." }),
  C({ id:"sigewinne", n:"Sigewinne", el:"hydro", wt:"bow", asc:["hpp",28.8], role:"Cura", tags:["healer"], sets:[{n:"Ocean-Hued Clam",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["hpp","er","cr","cd"], er:1.4, tal:["skill","burst","na"], wpns:["Silvershower Heartstrings","Sacrificial Bow","Favonius Warbow","Prototype Crescent"] }),
  C({ id:"dahlia", n:"Dahlia", el:"hydro", wt:"sword", asc:["hpp",24], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"sayu", n:"Sayu", el:"anemo", wt:"claymore", asc:["hpp",24], role:"Cura / agrupador", tags:["healer","buffer"], sets:[{n:"Viridescent Venerer",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["em","atkp"],goblet:["em","dmg"],circlet:["heal","em"]}, subs:["em","er","hpp"], er:1.6, tal:["skill","burst","na"], wpns:["Sacrificial Greatsword","Favonius Greatsword","Makhaira Aquamarine","Katsuragikiri Nagamasa"] }),
  C({ id:"heizou", n:"Shikanoin Heizou", el:"anemo", wt:"catalyst", asc:["dmg",24], role:"DPS / sub-DPS", tags:["dps"], sets:[{n:"Viridescent Venerer",p:4},{n:"Desert Pavilion Chronicle",p:4}], main:{sands:["atkp","em"],goblet:["dmg","em"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.2, tal:["skill","na","burst"], wpns:["Lost Prayer to the Sacred Winds","The Widsith","Solar Pearl","Mappa Mare"] }),
  C({ id:"lynette", n:"Lynette", el:"anemo", wt:"sword", asc:["dmg",24], role:"Suporte / agrupador", tags:["buffer"], sets:[{n:"Viridescent Venerer",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["atkp","er"],goblet:["dmg","atkp"],circlet:["cd","cr"]}, subs:["er","atkp","cd","cr"], er:1.6, tal:["burst","skill","na"], wpns:["Favonius Sword","Sacrificial Sword","Iron Sting","Xiphos' Moonlight"] }),
  C({ id:"lanyan", n:"Lan Yan", el:"anemo", wt:"catalyst", asc:["atkp",24], role:"Escudo / agrupador", tags:["shielder","buffer"], sets:[{n:"Viridescent Venerer",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["em","er"],goblet:["em"],circlet:["em"]}, subs:["em","er","hpp"], er:1.8, tal:["skill","burst","na"], wpns:["Sacrificial Fragments","Wandering Evenstar","Favonius Codex","Fruit of Fulfillment"] }),
  C({ id:"mizuki", n:"Yumemizuki Mizuki", el:"anemo", wt:"catalyst", asc:["em",115.2], role:"Buffer / Swirl", tags:["buffer","healer"], sets:[{n:"Viridescent Venerer",p:4},{n:"Song of Days Past",p:4}], main:{sands:["em"],goblet:["em"],circlet:["em","heal"]}, subs:["em","er"], er:1.5, tal:["skill","burst","na"], wpns:["Sacrificial Fragments","Wandering Evenstar","Mappa Mare","Favonius Codex"], note:"Todo o kit gira em torno de Proficiência. Crítico é desperdício." }),
  C({ id:"ifa", n:"Ifa", el:"anemo", wt:"catalyst", asc:["em",96], role:"Cura / suporte", tags:["healer","buffer"], sets:[{n:"Viridescent Venerer",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["atkp","er"],goblet:["atkp","em"],circlet:["heal","atkp"]}, subs:["er","atkp","em","hpp"], er:1.7, tal:["skill","burst","na"], wpns:["Sacrificial Fragments","Favonius Codex","Wandering Evenstar"] }),
  C({ id:"chasca", n:"Chasca", el:"anemo", wt:"bow", asc:["cr",24.2], role:"DPS principal", tags:["dps"], sets:[{n:"Marechaussee Hunter",p:4},{n:"Obsidian Codex",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.1, tal:["na","skill","burst"], wpns:["Astral Vulture's Crimson Plumage","Polar Star","Rust","Alley Hunter"], note:"Precisa de aliados de três elementos diferentes (não-Anemo) para converter os tiros." }),
  C({ id:"lisa", n:"Lisa", el:"electro", wt:"catalyst", asc:["em",96], role:"Sub-DPS / redutora de DEF", tags:["subdps"], sets:[{n:"Thundering Fury",p:4},{n:"Gilded Dreams",p:4}], main:{sands:["em","atkp"],goblet:["dmg","em"],circlet:["cd","cr","em"]}, subs:["em","cd","cr","atkp","er"], er:1.5, tal:["burst","skill","na"], wpns:["Kagura's Verity","Sacrificial Fragments","Mappa Mare","The Widsith"] }),
  C({ id:"beidou", n:"Beidou", el:"electro", wt:"claymore", asc:["dmg",24], role:"Sub-DPS fora de campo", tags:["subdps"], sets:[{n:"Emblem of Severed Fate",p:4},{n:"Thundering Fury",p:4}], main:{sands:["atkp","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er","em"], er:1.8, tal:["burst","skill","na"], wpns:["Serpent Spine","Wolf's Gravestone","Katsuragikiri Nagamasa","Sacrificial Greatsword"] }),
  C({ id:"razor", n:"Razor", el:"electro", wt:"claymore", asc:["phys",30], role:"DPS principal", tags:["dps"], sets:[{n:"Pale Flame",p:4},{n:"Bloodstained Chivalry",p:4}], main:{sands:["atkp"],goblet:["phys"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.4, tal:["na","skill","burst"], wpns:["Wolf's Gravestone","Redhorn Stonethresher","Serpent Spine","Rainslasher"], note:"Dano físico: o cálice é de Dano Físico%, não de Electro%." }),
  C({ id:"kujousara", n:"Kujou Sara", el:"electro", wt:"bow", asc:["atkp",24], role:"Buffer de Electro", tags:["buffer"], sets:[{n:"Noblesse Oblige",p:4},{n:"Emblem of Severed Fate",p:4}], main:{sands:["atkp","er"],goblet:["atkp","dmg"],circlet:["cd","cr"]}, subs:["er","atkp","cd","cr"], er:1.8, tal:["skill","burst","na"], wpns:["Elegy for the End","Favonius Warbow","Sacrificial Bow","Fading Twilight"], note:"O buff de ATQ escala com o ATQ BASE dela — ATQ% de artefato não aumenta o buff." }),
  C({ id:"dori", n:"Dori", el:"electro", wt:"claymore", asc:["hpp",24], role:"Cura / bateria", tags:["healer","battery"], sets:[{n:"Noblesse Oblige",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp","er"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["hpp","er"], er:2.0, tal:["burst","skill","na"], wpns:["Sacrificial Greatsword","Favonius Greatsword","Prototype Archaic"] }),
  C({ id:"sethos", n:"Sethos", el:"electro", wt:"bow", asc:["em",96], role:"DPS principal", tags:["dps"], sets:[{n:"Gilded Dreams",p:4},{n:"Thundering Fury",p:4}], main:{sands:["em","atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["em","cd","cr","atkp"], er:1.2, tal:["na","skill","burst"], wpns:["Skyward Harp","Stringless","Hunter's Path","Prototype Crescent"], note:"O dano vem do Ataque Carregado carregado pela Habilidade — talento de Ataque Normal." }),
  C({ id:"ororon", n:"Ororon", el:"electro", wt:"bow", asc:["atkp",24], role:"Sub-DPS fora de campo", tags:["subdps"], sets:[{n:"Gilded Dreams",p:4},{n:"Thundering Fury",p:4}], main:{sands:["em","atkp"],goblet:["dmg"],circlet:["cd","cr","em"]}, subs:["em","cd","cr","atkp","er"], er:1.5, tal:["skill","burst","na"], wpns:["Stringless","Favonius Warbow","Fading Twilight","Alley Hunter"] }),
  C({ id:"iansan", n:"Iansan", el:"electro", wt:"polearm", asc:["atkp",24], role:"Buffer de ATQ", tags:["buffer"], sets:[{n:"Noblesse Oblige",p:4},{n:"Emblem of Severed Fate",p:4}], main:{sands:["atkp","er"],goblet:["atkp"],circlet:["cr","cd","atkp"]}, subs:["er","atkp"], er:1.8, tal:["skill","burst","na"], wpns:["Favonius Lance","The Catch","Prospector's Drill","Ballad of the Fjords"], note:"O buff escala com o ATQ BASE dela; use ATQ% só pelo dano próprio." }),
  C({ id:"varesa", n:"Varesa", el:"electro", wt:"catalyst", asc:["cr",24.2], role:"DPS principal", tags:["dps"], sets:[{n:"Obsidian Codex",p:4},{n:"Thundering Fury",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.1, tal:["na","skill","burst"], wpns:["Lost Prayer to the Sacred Winds","Tulaytullah's Remembrance","The Widsith","Solar Pearl"], note:"Dano de queda: escala com o talento de Ataque Normal." }),
  C({ id:"kaeya", n:"Kaeya", el:"cryo", wt:"sword", asc:["er",26.7], role:"Sub-DPS / bateria", tags:["subdps","battery"], sets:[{n:"Blizzard Strayer",p:4},{n:"Emblem of Severed Fate",p:4}], main:{sands:["atkp","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.5, tal:["skill","burst","na"], wpns:["Mistsplitter Reforged","The Black Sword","Sacrificial Sword","Festering Desire"] }),
  C({ id:"chongyun", n:"Chongyun", el:"cryo", wt:"claymore", asc:["atkp",24], role:"Sub-DPS / infusor", tags:["subdps"], sets:[{n:"Blizzard Strayer",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["atkp","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.6, tal:["skill","burst","na"], wpns:["Serpent Spine","Wolf's Gravestone","Sacrificial Greatsword","Katsuragikiri Nagamasa"], note:"A Habilidade infunde Cryo nas espadas de aliados — o valor dele é isso, não o dano." }),
  C({ id:"qiqi", n:"Qiqi", el:"cryo", wt:"sword", asc:["heal",22.1], role:"Cura", tags:["healer"], sets:[{n:"Ocean-Hued Clam",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["atkp","hpp"],goblet:["atkp","hpp"],circlet:["heal"]}, subs:["hpp","er","atkp"], er:1.5, tal:["skill","burst","na"], wpns:["Sacrificial Sword","Favonius Sword","Festering Desire","Primordial Jade Cutter"], note:"A cura escala com ATQ, não com HP. Caso raro no jogo." }),
  C({ id:"eula", n:"Eula", el:"cryo", wt:"claymore", asc:["cd",88.4], role:"DPS principal", tags:["dps"], sets:[{n:"Pale Flame",p:4},{n:"Bloodstained Chivalry",p:4}], main:{sands:["atkp"],goblet:["phys"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.3, tal:["burst","skill","na"], wpns:["Song of Broken Pines","Wolf's Gravestone","Serpent Spine","Redhorn Stonethresher"], note:"Dano físico: cálice de Dano Físico%. O Lightfall Sword vem do Supremo." }),
  C({ id:"mika", n:"Mika", el:"cryo", wt:"polearm", asc:["hpp",24], role:"Cura / buffer", tags:["healer","buffer"], sets:[{n:"Noblesse Oblige",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp","er"],goblet:["hpp"],circlet:["heal","hpp"]}, subs:["hpp","er"], er:1.8, tal:["skill","burst","na"], wpns:["Favonius Lance","Engulfing Lightning","Black Tassel","Kitain Cross Spear"] }),
  C({ id:"charlotte", n:"Charlotte", el:"cryo", wt:"catalyst", asc:["atkp",24], role:"Cura / sub-DPS", tags:["healer","subdps"], sets:[{n:"Ocean-Hued Clam",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["hpp","atkp"],goblet:["hpp","dmg"],circlet:["heal","hpp"]}, subs:["hpp","er","atkp"], er:1.6, tal:["skill","burst","na"], wpns:["Thrilling Tales of Dragon Slayers","Prototype Amber","Favonius Codex","Sacrificial Fragments"] }),
  C({ id:"freminet", n:"Freminet", el:"cryo", wt:"claymore", asc:["atkp",24], role:"Sub-DPS", tags:["subdps"], sets:[{n:"Blizzard Strayer",p:4},{n:"Pale Flame",p:4}], main:{sands:["atkp"],goblet:["dmg","phys"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.3, tal:["skill","na","burst"], wpns:["Serpent Spine","Redhorn Stonethresher","Whiteblind","Makhaira Aquamarine"] }),
  C({ id:"citlali", n:"Citlali", el:"cryo", wt:"catalyst", asc:["em",115.2], role:"Buffer / escudo", tags:["shielder","buffer"], sets:[{n:"Scroll of the Hero of Cinder City",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["em"],goblet:["em"],circlet:["em"]}, subs:["em","er","hpp"], er:1.6, tal:["skill","burst","na"], wpns:["A Thousand Floating Dreams","Sacrificial Fragments","Wandering Evenstar","Mappa Mare"], note:"Reduz RES e dá escudo. Proficiência é o único status que importa." }),
  C({ id:"ningguang", n:"Ningguang", el:"geo", wt:"catalyst", asc:["dmg",24], role:"DPS principal", tags:["dps"], sets:[{n:"Archaic Petra",p:4},{n:"Gladiator's Finale",p:4}], main:{sands:["atkp"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp"], er:1.2, tal:["na","skill","burst"], wpns:["Lost Prayer to the Sacred Winds","Skyward Atlas","The Widsith","Solar Pearl"], note:"Dano do Ataque Carregado — talento de Ataque Normal." }),
  C({ id:"gorou", n:"Gorou", el:"geo", wt:"bow", asc:["dmg",24], role:"Buffer de DEF", tags:["buffer"], sets:[{n:"Noblesse Oblige",p:4},{n:"Deepwood Memories",p:4}], main:{sands:["defp","er"],goblet:["defp"],circlet:["defp","heal"]}, subs:["defp","er"], er:1.8, tal:["skill","burst","na"], wpns:["Favonius Warbow","Sacrificial Bow","Elegy for the End","Fading Twilight"], note:"Escala com DEF e só vale a pena em time com 2+ Geo." }),
  C({ id:"kachina", n:"Kachina", el:"geo", wt:"polearm", asc:["dmg",24], role:"Sub-DPS / bateria", tags:["subdps","battery"], sets:[{n:"Husk of Opulent Dreams",p:4},{n:"Archaic Petra",p:4}], main:{sands:["defp"],goblet:["dmg","defp"],circlet:["cd","cr","defp"]}, subs:["defp","cd","cr","er"], er:1.6, tal:["skill","burst","na"], wpns:["Favonius Lance","Prospector's Drill","Black Tassel","Missive Windspear"] }),
  C({ id:"collei", n:"Collei", el:"dendro", wt:"bow", asc:["atkp",24], role:"Sub-DPS / aplicação", tags:["subdps"], sets:[{n:"Deepwood Memories",p:4},{n:"Gilded Dreams",p:4}], main:{sands:["em","atkp"],goblet:["em","dmg"],circlet:["em","cd","cr"]}, subs:["em","er","atkp"], er:1.6, tal:["burst","skill","na"], wpns:["Sacrificial Bow","Favonius Warbow","Stringless","Fading Twilight"] }),
  C({ id:"kaveh", n:"Kaveh", el:"dendro", wt:"claymore", asc:["em",96], role:"DPS de Bloom", tags:["dps"], sets:[{n:"Flower of Paradise Lost",p:4},{n:"Gilded Dreams",p:4}], main:{sands:["em"],goblet:["em","dmg"],circlet:["em","cd"]}, subs:["em","cd","cr","er"], er:1.4, tal:["na","skill","burst"], wpns:["Makhaira Aquamarine","Rainslasher","Serpent Spine","Katsuragikiri Nagamasa"], note:"Ele mesmo detona os Dendro Cores — Proficiência acima de tudo." }),
  C({ id:"kirara", n:"Kirara", el:"dendro", wt:"sword", asc:["hpp",24], role:"Escudo / aplicação", tags:["shielder"], sets:[{n:"Deepwood Memories",p:4},{n:"Tenacity of the Millelith",p:4}], main:{sands:["hpp"],goblet:["hpp"],circlet:["hpp"]}, subs:["hpp","er","em"], er:1.6, tal:["skill","burst","na"], wpns:["Key of Khaj-Nisut","Favonius Sword","Sacrificial Sword","Sapwood Blade"] }),
  C({ id:"emilie", n:"Emilie", el:"dendro", wt:"polearm", asc:["cd",88.4], role:"Sub-DPS fora de campo", tags:["subdps"], sets:[{n:"Golden Troupe",p:4},{n:"Deepwood Memories",p:4}], main:{sands:["atkp","em"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","em"], er:1.3, tal:["skill","burst","na"], wpns:["Lumidouce Elegy","Staff of the Scarlet Sands","The Catch","Moonpiercer"], note:"Funciona melhor com Pyro no time para gerar Fumaça Perfumada." }),
  C({ id:"travelerdendro", n:"Viajante (Dendro)", el:"dendro", wt:"sword", asc:["atkp",24], role:"Sub-DPS / aplicação", tags:["subdps"], sets:[{n:"Deepwood Memories",p:4},{n:"Gilded Dreams",p:4}], main:{sands:["em"],goblet:["em"],circlet:["em"]}, subs:["em","er"], er:1.5, tal:["burst","skill","na"], wpns:["Freedom-Sworn","Iron Sting","Xiphos' Moonlight","Sapwood Blade"], note:"O Supremo é uma das melhores aplicações de Dendro do jogo. Proficiência e Recarga." }),
  C({ id:"travelerpyro", n:"Viajante (Pyro)", el:"pyro", wt:"sword", asc:["atkp",24], role:"Sub-DPS", tags:["subdps"], sets:[{n:"Crimson Witch of Flames",p:4},{n:"Noblesse Oblige",p:4}], main:{sands:["atkp","er"],goblet:["dmg"],circlet:["cd","cr"]}, subs:["cd","cr","atkp","er"], er:1.6, tal:["burst","skill","na"], wpns:["Festering Desire","Sacrificial Sword","Iron Sting","The Black Sword"] }),
  C({ id:"aino", n:"Aino", el:"hydro", wt:"claymore", asc:["em",96], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"aloy", n:"Aloy", el:"cryo", wt:"bow", asc:["dmg",28.8], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"columbina", n:"Columbina", el:"hydro", wt:"catalyst", asc:["cr",24.2], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"durin", n:"Durin", el:"pyro", wt:"sword", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"flins", n:"Flins", el:"electro", wt:"polearm", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"illuga", n:"Illuga", el:"geo", wt:"polearm", asc:["em",96], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"ineffa", n:"Ineffa", el:"electro", wt:"polearm", asc:["cr",24.2], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"jahoda", n:"Jahoda", el:"anemo", wt:"bow", asc:["heal",18.5], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"lauma", n:"Lauma", el:"dendro", wt:"catalyst", asc:["em",115.2], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"linnea", n:"Linnea", el:"geo", wt:"bow", asc:["cr",24.2], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"lohen", n:"Lohen", el:"cryo", wt:"polearm", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"nefer", n:"Nefer", el:"dendro", wt:"catalyst", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"nicole", n:"Nicole", el:"pyro", wt:"catalyst", asc:["atkp",28.8], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"prune", n:"Prune", el:"anemo", wt:"catalyst", asc:["atkp",24], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"skirk", n:"Skirk", el:"cryo", wt:"sword", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"varka", n:"Varka", el:"anemo", wt:"claymore", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"manekin", n:"Manekin", el:"anemo", wt:"sword", asc:["atkp",24], role:"Elemento adaptável", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true, note:"Elemento adaptável, como o Viajante — o elemento aqui é só um marcador. Crie uma entrada por forma que você usa." }),
  C({ id:"zibai", n:"Zibai", el:"geo", wt:"sword", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"sandrone", n:"Sandrone", el:"cryo", wt:"claymore", asc:["cr",24.2], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"odette", n:"Odette", el:"cryo", wt:"sword", asc:["cd",88.4], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
  C({ id:"alyosha", n:"Alyosha", el:"electro", wt:"polearm", asc:["er",26.7], role:"Dados a confirmar", tags:[], sets:[], main:{sands:[],goblet:[],circlet:[]}, subs:[], er:1.4, tal:["skill","burst","na"], wpns:[], revisar:true }),
];

const CHAR_BY_ID = Object.fromEntries(CHARS.map((c) => [c.id, c]));

// Constelações: qual talento cada uma eleva em +3, e os nomes.
const CONS = {
  hutao: { t3:"skill", t5:"burst", nomes:["Crimson Bouquet","Ominous Rainfall","Lingering Carmine","Garden of Eternal Rest","Floral Incense","Butterfly's Embrace"] },
  arlecchino: { t3:null, t5:"burst", nomes:["\"All Reprisals and Arrears, Mine to Bear...\"","\"All Rewards and Retribution, Mine to Bestow...\"","\"You Shall Become a New Member of Our Family...\"","\"You Shall Love and Protect Each Other Henceforth...\"","\"For Alone, We Are as Good as Dead...\"","\"From This Day On, We Shall Delight in New Life Together.\""] },
  lyney: { t3:null, t5:"burst", nomes:["Whimsical Wonders","Loquacious Cajoling","Prestidigitation","Well-Versed, Well-Rehearsed","To Pierce Enigmas","Guarded Smile"] },
  yoimiya: { t3:"skill", t5:"burst", nomes:["Agate Ryuukin","A Procession of Bonfires","Trickster's Flare","Pyrotechnic Professional","A Summer Festival's Eve","Naganohara Meteor Swarm"] },
  diluc: { t3:"skill", t5:"burst", nomes:["Conviction","Searing Ember","Fire and Steel","Flowing Flame","Phoenix, Harbinger of Dawn","Flaming Sword, Nemesis of the Dark"] },
  klee: { t3:"skill", t5:"burst", nomes:["Chained Reactions","Explosive Frags","Exquisite Compound","Sparkly Explosion","Nova Burst","Blazing Delight"] },
  mavuika: { t3:"burst", t5:"skill", nomes:["The Night-Lord's Explication","The Ashen Price","The Burning Sun","The Leader's Resolve","The Meaning of Truth","\"Humanity's Name\" Unfettered"] },
  xiangling: { t3:"burst", t5:"skill", nomes:["Crispy Outside, Tender Inside","Oil Meets Fire","Deepfry","Slowbake","Guoba Mad","Condensed Pyronado"] },
  bennett: { t3:"skill", t5:"burst", nomes:["Grand Expectation","Impasse Conqueror","Unstoppable Fervor","Unexpected Odyssey","True Explorer","Fire Ventures With Me"] },
  neuvillette: { t3:null, t5:"burst", nomes:["Venerable Institution","Juridical Exhortation","Ancient Postulation","Crown of Commiseration","Axiomatic Judgment","Wrathful Recompense"] },
  furina: { t3:"burst", t5:"skill", nomes:["\"Love Is a Rebellious Bird That None Can Tame\"","\"A Woman Adapts Like Duckweed in Water\"","\"My Secret Is Hidden Within Me, No One Will Know My Name\"","\"They Know Not Life, Who Dwelt in the Netherworld Not!\"","\"His Name I Now Know, It Is...!\"","\"Hear Me — Let Us Raise the Chalice of Love!\""] },
  xingqiu: { t3:"burst", t5:"skill", nomes:["The Scent Remained","Rainbow Upon the Azure Sky","Weaver of Verses","Evilsoother","Embrace of Rain","Hence, Call Them My Own Verses"] },
  yelan: { t3:"burst", t5:"skill", nomes:["Enter the Plotters","Taking All Comers","Beware the Trickster's Dice","Bait-and-Switch","Dealer's Sleight","Winner Takes All"] },
  kokomi: { t3:"burst", t5:"skill", nomes:["At Water's Edge","The Clouds Like Waves Rippling","The Moon, A Ship O'er the Seas","The Moon Overlooks the Waters","All Streams Flow to the Sea","Sango Isshin"] },
  mona: { t3:"burst", t5:"skill", nomes:["Prophecy of Submersion","Lunar Chain","Restless Revolution","Prophecy of Oblivion","Mockery of Fortuna","Rhetorics of Calamitas"] },
  nilou: { t3:"burst", t5:"skill", nomes:["Dance of the Waning Moon","The Starry Skies Their Flowers Rain","Beguiling Shadowstep","Fricative Pulse","Twirling Light","Frostbreaker's Melody"] },
  childe: { t3:"skill", t5:"burst", nomes:["Foul Legacy: Tide Withholder","Foul Legacy: Understream","Abyssal Mayhem: Vortex of Turmoil","Abyssal Mayhem: Hydrospout","Havoc: Formless Blade","Havoc: Annihilation"] },
  kazuha: { t3:"skill", t5:"burst", nomes:["Scarlet Hills","Yamaarashi Tailwind","Maple Monogatari","Oozora Genpou","Wisdom of Bansei","Crimson Momiji"] },
  venti: { t3:"burst", t5:"skill", nomes:["Splitting Gales","Breeze of Reminiscence","Ode to Thousand Winds","Hurricane of Freedom","Concerto dal Cielo","Storm of Defiance"] },
  sucrose: { t3:"skill", t5:"burst", nomes:["Clustered Vacuum Field","Beth: Unbound Form","Flawless Alchemistress","Alchemania","Caution: Standard Flask","Chaotic Entropy"] },
  xianyun: { t3:"burst", t5:"skill", nomes:["Purifying Wind","Aloof From the World","Creations of Star and Moon","Mystery Millet Gourmet","Astride Rose-Colored Clouds","They Call Her Cloud Retainer"] },
  jean: { t3:"burst", t5:"skill", nomes:["Spiraling Tempest","People's Aegis","When the West Wind Arises","Lands of Dandelion","Outbursting Gust","Lion's Fang, Fair Protector of Mondstadt"] },
  wanderer: { t3:"burst", t5:"skill", nomes:["Shoban: Ostentatious Plumage","Niban: Isle Amidst White Waves","Sanban: Moonflower Kusemai","Yonban: Set Adrift into Spring","Matsuban: Ancient Illuminator From Abroad","Shugen: The Curtains' Melancholic Sway"] },
  xiao: { t3:"skill", t5:"burst", nomes:["Dissolution Eon: Destroyer of Worlds","Annihilation Eon: Blossom of Kaleidos","Conqueror of Evil: Wrath Deity","Transcension: Extinction of Suffering","Evolution Eon: Origin of Ignorance","Conqueror of Evil: Guardian Yaksha"] },
  faruzan: { t3:"skill", t5:"burst", nomes:["Truth by Any Means","Overzealous Intellect","Spirit-Orchard Stroll","Divine Comprehension","Wonderland of Rumination","The Wondrous Path of Truth"] },
  raiden: { t3:"burst", t5:"skill", nomes:["Ominous Inscription","Steelbreaker","Shinkage Bygones","Pledge of Propriety","Shogun's Descent","Wishbearer"] },
  yae: { t3:"skill", t5:"burst", nomes:["Yakan Offering","Fox's Mooncall","The Seven Glamours","Sakura Channeling","Mischievous Teasing","Forbidden Art: Daisesshou"] },
  fischl: { t3:"skill", t5:"burst", nomes:["Gaze of the Deep","Devourer of All Sins","Wings of Nightmare","Her Pilgrimage of Bleak","Against the Fleeing Light","Evernight Raven"] },
  keqing: { t3:"burst", t5:"skill", nomes:["Thundering Might","Keen Extraction","Foreseen Reformation","Attunement","Beckoning Stars","Tenacious Star"] },
  cyno: { t3:"burst", t5:"skill", nomes:["Ordinance: Unceasing Vigil","Ceremony: Homecoming of Spirits","Precept: Lawful Enforcer","Austerity: Forbidding Guard","Funerary Rite: The Passing of Starlight","Raiment: Just Scales"] },
  clorinde: { t3:"skill", t5:"burst", nomes:["\"From This Day, I Pass the Candle's Shadow-Veil\"","\"Now, As We Face the Perils of the Long Night\"","\"I Pledge to Remember the Oath of Daylight\"","\"To Enshrine Tears, Life, and Love\"","\"Holding Dawn's Coming as My Votive\"","\"And So Shall I Never Despair\""] },
  kuki: { t3:"skill", t5:"burst", nomes:["To Cloister Compassion","To Forsake Fortune","To Sequester Sorrow","To Sever Sealing","To Cease Courtesies","To Ward Weakness"] },
  ayaka: { t3:"burst", t5:"skill", nomes:["Snowswept Sakura","Blizzard Blade Seki no To","Frostbloom Kamifubuki","Ebb and Flow","Blossom Cloud Irutsuki","Dance of Suigetsu"] },
  ganyu: { t3:"burst", t5:"skill", nomes:["Dew-Drinker","The Auspicious","Cloud-Strider","Westward Sojourn","The Merciful","The Clement"] },
  wriothesley: { t3:null, t5:"burst", nomes:["Terror for the Evildoers","Shackles for the Arrogant","Punishment for the Frauds","Redemption for the Suffering","Mercy for the Wronged","Esteem for the Innocent"] },
  shenhe: { t3:"skill", t5:"burst", nomes:["Clarity of Heart","Centered Spirit","Seclusion","Insight","Divine Attainment","Mystical Abandon"] },
  escoffier: { t3:"skill", t5:"burst", nomes:["Pre-Dinner Dance for Your Taste Buds","Fresh, Fragrant Stew Is an Art","The Bakery Magic of Caramel Browning","Secret Rosemary Recipe","Symphony of a Thousand Sauces","Tea Parties Bursting With Color"] },
  rosaria: { t3:"skill", t5:"burst", nomes:["Unholy Revelation","Land Without Promise","The Wages of Sin","Painful Grace","Last Rites","Divine Retribution"] },
  diona: { t3:"burst", t5:"skill", nomes:["A Lingering Flavor","Shaken, Not Purred","A—Another Round?","Wine Industry Slayer","Double Shot, on the Rocks","Cat's Tail Closing Time"] },
  layla: { t3:"skill", t5:"burst", nomes:["Fortress of Fantasy","Light's Remit","Secrets of the Night","Starry Illumination","Stream of Consciousness","Radiant Soulfire"] },
  zhongli: { t3:"skill", t5:"burst", nomes:["Rock, the Backbone of Earth","Stone, the Cradle of Jade","Jade, Shimmering through Darkness","Topaz, Unbreakable and Fearless","Lazuli, Herald of the Order","Chrysos, Bounty of Dominator"] },
  navia: { t3:"skill", t5:"burst", nomes:["A Lady's Rules for Keeping a Courteous Distance","The President's Pursuit of Victory","Businesswoman's Broad Vision","The Oathsworn Never Capitulate","Negotiator's Resolute Negotiations","The Flexible Finesse of the Spina's President"] },
  itto: { t3:"skill", t5:"burst", nomes:["Stay a While and Listen Up","Gather 'Round, It's a Brawl!","Horns Lowered, Coming Through","Jailhouse Bread and Butter","10 Years of Hanamizaka Fame","Arataki Itto, Present!"] },
  noelle: { t3:"skill", t5:"burst", nomes:["I Got Your Back","Combat Maid","Invulnerable Maid","To Be Cleaned","Favonius Sweeper Master","Must Be Spotless"] },
  xilonen: { t3:"skill", t5:"burst", nomes:["Sabbatical Phrase","Chiucue Mix","Tonalpohualli's Loop","Suchitl's Trance","Tlaltecuhtli's Crossfade","Imperishable Night Carnival"] },
  chiori: { t3:"skill", t5:"burst", nomes:["Six Paths of Sage Silkcraft","In Five Colors Dyed","Four Brocade Embellishments","A Tailor's Three Courtesies","Two Silken Plumules","Sole Principle Pursuit"] },
  albedo: { t3:"skill", t5:"burst", nomes:["Flower of Eden","Opening of Phanerozoic","Grace of Helios","Descent of Divinity","Tide of Hadean","Dust of Purification"] },
  yunjin: { t3:"burst", t5:"skill", nomes:["Thespian Gallop","Myriad Mise-En-Scène","Seafaring General","Flower and a Fighter","Famed Throughout the Land","Decorous Harmony"] },
  nahida: { t3:"skill", t5:"burst", nomes:["The Seed of Stored Knowledge","The Root of All Fullness","The Shoot of Conscious Attainment","The Stem of Manifest Inference","The Leaves of Enlightening Speech","The Fruit of Reason's Culmination"] },
  alhaitham: { t3:"skill", t5:"burst", nomes:["Intuition","Debate","Negation","Elucidation","Sagacity","Structuration"] },
  kinich: { t3:"skill", t5:"burst", nomes:["Parrot's Beak","Tiger Beetle's Palm","Protosuchian's Claw","Hummingbird's Feather","Howler Monkey's Tail","Auspicious Beast's Shape"] },
  baizhu: { t3:"burst", t5:"skill", nomes:["Attentive Observation","Incisive Discernment","All Aspects Stabilized","Ancient Art of Perception","The Hidden Ebb and Flow","Elimination of Malicious Qi"] },
  yaoyao: { t3:"skill", t5:"burst", nomes:["Adeptus' Tutelage","Innocent","Loyal and Kind","Winsome","Compassionate","Beneficent"] },
  tighnari: { t3:"burst", t5:"skill", nomes:["Beginnings Determined at the Roots","Origins Known From the Stem","Fortunes Read Amongst the Branches","Withering Glimpsed in the Leaves","Comprehension Amidst the Flowers","Karma Adjudged From the Leaden Fruit"] },
  amber: { t3:"burst", t5:"skill", nomes:["One Arrow to Rule Them All","Bunny Triggered","It Burns!","It's Not Just Any Doll...","It's Baron Bunny!","Wildfire"] },
  yanfei: { t3:"skill", t5:"burst", nomes:["The Law Knows No Kindness","Right of Final Interpretation","Samadhi Fire-Forged","Supreme Amnesty","Abiding Affidavit","Extra Clause"] },
  xinyan: { t3:"skill", t5:"burst", nomes:["Fatal Acceleration","Impromptu Opening","Double-Stop","Wildfire Rhythm","Screamin' for an Encore","Rockin' in a Flaming World"] },
  thoma: { t3:"skill", t5:"burst", nomes:["A Comrade's Duty","A Subordinate's Skills","Fortified Resolve","Long-Term Planning","Raging Wildfire","Burning Heart"] },
  dehya: { t3:"burst", t5:"skill", nomes:["The Flame Incandescent","The Sand-Blades Glittering","A Rage Swift as Fire","An Oath Abiding","The Alpha Unleashed","The Burning Claws Cleaving"] },
  gaming: { t3:"skill", t5:"burst", nomes:["Bringer of Blessing","Plum Blossoms Underfoot","Awakening Spirit","Soar Across Mountains","Evil-Daunting Roar","To Tame All Beasts"] },
  chevreuse: { t3:"skill", t5:"burst", nomes:["Stable Front Line's Resolve","Sniper Induced Explosion","Practiced Field Stripping Technique","The Secret to Rapid-Fire Multishots","Enhanced Incendiary Firepower","In Pursuit of Ending Evil"] },
  barbara: { t3:"burst", t5:"skill", nomes:["Gleeful Songs","Vitality Burst","Star of Tomorrow","Attentiveness Be My Power","The Purest Companionship","Dedicating Everything to You"] },
  ayato: { t3:"skill", t5:"burst", nomes:["Kyouka Fuushi","World Source","To Admire the Flowers","Endless Flow","Bansui Ichiro","Boundless Origin"] },
  candace: { t3:"burst", t5:"skill", nomes:["Returning Heiress of the Scarlet Sands","Moon-Piercing Brilliance","Hunter's Supplication","Sentinel Oath","Heterochromatic Gaze","The Overflow"] },
  mualani: { t3:"skill", t5:"burst", nomes:["The Leisurely \"Meztli\"...","Mualani, Going All Out!","Surfing Atop Joyous Seas","Sharky Eats Puffies","Same Style of Surfboard on Sale!","Spirit of the Springs' People"] },
  sigewinne: { t3:"skill", t5:"burst", nomes:["\"Can the Happiest of Spirits Understand Anxiety?\"","\"Can the Most Merciful of Spirits Defeat Its Foes?\"","\"Can the Healthiest of Spirits Cure Fevers?\"","\"Can the Loveliest of Spirits Keep Decay at Bay?\"","\"Can the Most Joyful of Spirits Alleviate Agony?\"","\"Can the Most Radiant of Spirits Pray For Me?\""] },
  dahlia: { t3:"burst", t5:"skill", nomes:["Infallible Procession","Revelation of Mercy","Windblume Offertory","Collect of the Assembly","Let It Be Subtly So","You Shall Go Out With Joy"] },
  sayu: { t3:"burst", t5:"skill", nomes:["Multi-Task no Jutsu","Egress Prep","Eh, the Bunshin Can Handle It","Skiving: New and Improved","Speed Comes First","Sleep O'Clock"] },
  heizou: { t3:"skill", t5:"burst", nomes:["Named Juvenile Casebook","Investigative Collection","Esoteric Puzzle Book","Tome of Lies","Secret Archive","Curious Casefiles"] },
  lynette: { t3:"burst", t5:"skill", nomes:["A Cold Blade Like a Shadow","Endless Mysteries","Cognition-Inverting Gaze","Tacit Coordination","Obscuring Ambiguity","Watchful Eye"] },
  lanyan: { t3:"skill", t5:"burst", nomes:["\"As One Might Stride Betwixt the Clouds\"","\"Dance Vestments Billow Like Rainbow Jade\"","\"On White Wings Pierce Through Cloud and Fog\"","\"With Drakefalcon's Blood-Pearls Adorned\"","\"Having Met You, My Heart is Gladdened\"","\"Let Us Away on Sylphic Wing, the Silvered Ornaments to Ring\""] },
  mizuki: { t3:"skill", t5:"burst", nomes:["In Mist-Like Waters","Your Echo I Meet in Dreams","Till Dawn's Moon Ends Night","Buds Warm Lucid Springs","As Setting Moon Brings Year's End","The Heart Lingers Long"] },
  ifa: { t3:"skill", t5:"burst", nomes:["Vitiferous Elixir's Concoction","Guiding Spirit of Ballistic Prayer","Rebuttal in Negotiations With the Night","Decayed Vessel's Permutation","Vow of Universal Coexistence","Oath on a Feathered Knot"] },
  chasca: { t3:"skill", t5:"burst", nomes:["Cylinder, the Restless Roulette","Muzzle, the Searing Smoke","Reins, Her Careful Control","Sparks, the Sudden Shot","Brim, the Sandshadow's Silhouette","Showdown, the Glory of Battle"] },
  lisa: { t3:"burst", t5:"skill", nomes:["Infinite Circuit","Electromagnetic Field","Resonant Thunder","Plasma Eruption","Electrocute","Pulsating Witch"] },
  beidou: { t3:"skill", t5:"burst", nomes:["Sea Beast's Scourge","Upon the Turbulent Sea, the Thunder Arises","Summoner of Storm","Stunning Revenge","Crimson Tidewalker","Bane of Evil"] },
  razor: { t3:"burst", t5:"skill", nomes:["Wolf's Instinct","Suppression","Soul Companion","Bite","Sharpened Claws","Lupus Fulguris"] },
  kujousara: { t3:"burst", t5:"skill", nomes:["Crow's Eye","Dark Wings","The War Within","Conclusive Proof","Spellsinger","Sin of Pride"] },
  dori: { t3:"burst", t5:"skill", nomes:["Additional Investment","Special Franchise","Wonders Never Cease","Discretionary Supplement","Value for Mora","Sprinkling Weight"] },
  sethos: { t3:null, t5:"burst", nomes:["Sealed Shrine's Spiritsong","Papyrus Scripture of Silent Secrets","Ode to the Moonrise Sage","Beneficent Plumage","Record of the Desolate God's Burning Sands","Pylon of the Sojourning Sun Temple"] },
  ororon: { t3:"burst", t5:"skill", nomes:["Trails Amidst the Forest Fog","King Bee of the Hidden Honeyed Wine","Roosting Bat's Spiritcage","As the Mysteries of the Night Wind","A Gift For the Soul","Ode to Deep Springs"] },
  iansan: { t3:"skill", t5:"burst", nomes:["Starting's Never Easy","Laziness is the Enemy!","Scientific Diet Planning","Slow and Steady Wins the Race","We Can Push It Further!","Teachings of the Collective of Plenty"] },
  varesa: { t3:"burst", t5:null, nomes:["Undying Passion","Beyond the Edge of Light","Unbowed Resolve","The Courage to Press On","Thoughts Floating on the Warm Breeze","A Hero of Justice's Triumph"] },
  kaeya: { t3:"skill", t5:"burst", nomes:["Excellent Blood","Never-Ending Performance","Dance of Frost","Frozen Kiss","Frostbiting Embrace","Glacial Whirlwind"] },
  chongyun: { t3:"burst", t5:"skill", nomes:["Ice Unleashed","Atmospheric Revolution","Cloudburst","Frozen Skies","The True Path","Rally of Four Blades"] },
  qiqi: { t3:"burst", t5:"skill", nomes:["Ascetics of Frost","Frozen to the Bone","Ascendant Praise","Divine Suppression","Crimson Lotus Bloom","Rite of Resurrection"] },
  eula: { t3:"burst", t5:"skill", nomes:["Tidal Illusion","Lady of Seafoam","Lawrence Pedigree","The Obstinacy of One's Inferiors","Chivalric Quality","Noble Obligation"] },
  mika: { t3:"burst", t5:"skill", nomes:["Factor Confluence","Companion's Ingress","Reconnaissance Experience","Sunfrost Encomium","Signal Arrow","Companion's Counsel"] },
  charlotte: { t3:"burst", t5:"skill", nomes:["A Need to Verify Facts","A Duty to Pursue Truth","An Imperative to Independence","A Responsibility to Oversee","A Principle of Conscience","A Summation of Interest"] },
  freminet: { t3:null, t5:"skill", nomes:["Dreams of the Foamy Deep","Penguins and the Land of Plenty","Song of the Eddies and Bleached Sands","Dance of the Snowy Moon and Flute","Nights of Hearth and Happiness","Moment of Waking and Resolve"] },
  citlali: { t3:"skill", t5:"burst", nomes:["Radiant Blades of Centzon Mimixcoah","Heart Devourer's Travail","Cloud Serpent's Feathered Crown","Death Defier's Spirit Skull","Nemontemi's Hex","Teoiztac's Secret Pact"] },
  ningguang: { t3:"burst", t5:"skill", nomes:["Piercing Fragments","Shock Effect","Majesty Be the Array of Stars","Exquisite be the Jade, Outshining All Beneath","Invincible Be the Jade Screen","Grandeur Be the Seven Stars"] },
  gorou: { t3:"skill", t5:"burst", nomes:["Rushing Hound: Swift as the Wind","Sitting Hound: Steady as a Clock","Mauling Hound: Fierce as Fire","Lapping Hound: Warm as Water","Striking Hound: Thunderous Force","Valiant Hound: Mountainous Fealty"] },
  kachina: { t3:"skill", t5:"burst", nomes:["Shards Are Gems Too","Never Leave Home Without... Turbo Twirly","Improved Stabilizer","More Foes, More Caution","All I've Collected Till Now","This Time, I've Gotta Win"] },
  collei: { t3:"skill", t5:"burst", nomes:["Deepwood Patrol","Through Hill and Copse","Scent of Summer","Gift of the Woods","All Embers","Forest of Falling Arrows"] },
  kaveh: { t3:"burst", t5:"skill", nomes:["Sublime Salutations","Grace of Royal Roads","Profferings of Dur Untash","Feast of Apadana","Treasures of Bonkhanak","Pairidaeza's Dreams"] },
  kirara: { t3:"skill", t5:"burst", nomes:["Material Circulation","Perfectly Packaged","Universal Recognition","Steed of Skanda","A Thousand Miles in a Day","Countless Sights to See"] },
  emilie: { t3:"skill", t5:"burst", nomes:["Light Fragrance Leaching","Lakelight Top Note","Exquisite Essence","Lumidouce Heart Note","Puredew Aroma","Marcotte Sillage"] },
  aino: { t3:"burst", t5:"skill", nomes:["The Theory of Ash—Field Equilibrium","The Principle of Transference in Gear Differentials","Cake and the Art of Mechanism Repair","Butter and Cats and the Law of Energy Supply","Perpetual Turbine of Metal and Light","The Burden of Creative Genius"] },
  aloy: { t3:null, t5:null, nomes:["Star of Another World","Star of Another World","Star of Another World","Star of Another World","Star of Another World","Star of Another World"] },
  columbina: { t3:"skill", t5:"burst", nomes:["Radiance Over Blossoms and Peaks","Not in Lone Splendor","Dreamlike Glow Across Tranquil Waters","Cloudveiled Ridges in Floral Mists","Silence Tending One Lone Song","Through Darkness Led by Moonlight"] },
  durin: { t3:"burst", t5:"skill", nomes:["Adamah's Redemption","Unground Visions","Flame Mirror's Revelation","Emanare's Source","Scouring Flame's Sundering","Dual Birth"] },
  flins: { t3:"burst", t5:"skill", nomes:["Part the Veil of Snow","The Devil's Wall","Stranger in the Night","Night on Bald Mountain","Exile's Shadow","Songs and Dances of Death"] },
  illuga: { t3:"burst", t5:"skill", nomes:["Vigilant Sentinel","Elk With Fanged Antlers","Earthshaking Maw","Solarhunting Wolf","Hurricane Steed","Nightmare Orioles"] },
  ineffa: { t3:"skill", t5:"burst", nomes:["Rectifying Processor","Support Cleaning Module","Enhanced Emotion Emulator","The Edictless Path","Mirror's Dream Transcension","A Dawning Morn for You"] },
  jahoda: { t3:"burst", t5:"skill", nomes:["One More Flask!","Rogue's Quick Thinking","Desperate Gamble","Wild Berry Amid the Dust","The Greatest Treasure","The Littlest Luck"] },
  lauma: { t3:"burst", t5:"skill", nomes:["\"O Lips, Weave Me Songs and Psalms\"","\"Twine Warnings and Tales From the North\"","\"Seek Not to Tread the Sly Fox's Path\"","\"Nor Yearn for the Great Bear's Might\"","\"If Truth May Be Subject to Witness\"","\"I Offer Blood and Tears to the Moonlight\""] },
  linnea: { t3:"skill", t5:null, nomes:["Provisional Classification","Tidings of Joy and Sorrow","Eventful Log Page","Expert Instinct","Fairyland's Farewell Gift","Golden Beagle's Dream"] },
  lohen: { t3:"skill", t5:"burst", nomes:["O Breezes, That So Oft Bear Sorrowful Lament","In Flight, I Strike Whatever Flies","Only the Spear That Wounds Can Heal","Radiant Love, Laughing Death","Never Ask, Nor Trouble You to Know","To Drown, to Sink, Unconscious — Supreme Joy"] },
  nefer: { t3:"skill", t5:"burst", nomes:["Planning Breeds Success","Observation Feeds Strategy","Deceit Cloaks the Truth","Delusion Ensnares Reason","Opportunity Hides in the Margins","Victory Flows from the Turning of Tides"] },
  nicole: { t3:"skill", t5:"burst", nomes:["\"Do Not Be Afraid, Child Who Is Loved\"","\"I Will Guide You and Show You the Path You Should Tread\"","\"A Lamp by Your Side, A Light to Shine the Way\"","\"Whether Left or Right, No Matter Which Way You Turn\"","\"You Will Hear My Voice Beside You\"","\"This Is the Path, Walk It Without Delay\""] },
  prune: { t3:"burst", t5:"skill", nomes:["With a Vow to Rescue, the Journey Begins","Useful for Cleaning Messy Baggage, Elemental Powers Are Indeed","The Caravan Exits the Mountain Pass, the Scenery Once More Changed","Looking Back Following the Wind, One's Shadow Still Halved","100 Defeats? No Problem, Tomorrow, We Go Again","And That's the Story! Share It With Your Friends!"] },
  skirk: { t3:"burst", t5:"skill", nomes:["Far to Fall","Into the Abyss","Serendipitous Sin","Fractured Flow","End of Wishes","To the Source"] },
  varka: { t3:null, t5:null, nomes:["\"Come, Friend, Let Us Dance Beneath the Moon's Soft Glow\"","\"When Dawn Breaks, Our Journey Shall Take Flight\"","\"O Friend, Quaff Not the Bitter Wine That Brings Tears of Woe\"","\"For None May Take From Us Our Freedom of Song\"","\"Fill High the Cup With Fine Wine, for Tyrants Come and Go\"","\"Beloved Mondstadt, Steadfast You Shall Shine\""] },
  zibai: { t3:"skill", t5:"burst", nomes:["Burst Forth With Vigor, But Enter in Silence","At Birth Are Souls Born, and in Death Leave But Husks","Free From Constraints and Worldly Ties","The Spirit Passes, Then Form Follows","Perceive the Worthless and Debate It Not","The World, A Journey in Passing"] },
  sandrone: { t3:null, t5:"burst", nomes:["Morrow After the Golden Dusk","An Heiress Gazed Into the Looking-Glass","Refuse the Wake of Dusk, the Moonlit Yoke","In Knowledge Lies the World's True Ground","Of All Beside, She Takes No Part","Narcissus Wakes, Her Eyes Upon the Dawn"] },
  odette: { t3:"skill", t5:"burst", nomes:["\"On This Danceless Morn, She Gazes at Her Reflection\"","\"I Must See the Snow Swan's Unseen Dream for Myself, She Thought\"","\"I'll Chase the Shouting Wind Along, Climbing Alone As I Go\"","\"Up, Up the Long, Delirious, Burning Blue\"","\"Oh! I Have Slipped the Surly Bonds of Earth\"","\"Put Out My Hand, and Touched the Face of the Divine\""] },
  alyosha: { t3:null, t5:null, nomes:["Frostvale Thunderclap","Howl From Afar","Friendly Call","Harvest the Spoils","When the Nightbird Falls Silent","Standard Reclaimed"] },
};

const consDe = (id) => CONS[id] || { t3: null, t5: null, nomes: [] };

const WPN_BY_NAME = Object.fromEntries(WEAPONS.map((w) => [w.n, w]));

const RESONANCE = {
  pyro: "Ardor Ardente: +25% ATQ.",
  hydro: "Cura Abundante: +25% HP máximo.",
  cryo: "Gelo Rachante: +15% Crítico contra alvos congelados ou afetados por Cryo.",
  electro: "Condução Poderosa: partículas extras de energia a cada 5s.",
  geo: "Pedra Inquebrável: +15% Dano e RES a interrupção com escudo Geo ativo.",
  dendro: "Prosperidade Exuberante: +50 Proficiência (e mais com reações ativas).",
  anemo: "Vento Impetuoso: -5s de recarga, -15% de resistência.",
};

//Estado

const blankPiece = (fixed) => ({
  lvl: 20,
  main: fixed || "",
  subs: [
    { s: "", v: "" }, { s: "", v: "" }, { s: "", v: "" }, { s: "", v: "" },
  ],
});

const blankBuild = () => ({
  charId: "",
  weapon: "",
  cons: 0,
  ajustes: { dmg: 0, atkp: 0, cr: 0, cd: 0, em: 0 },
  talents: { na: 9, skill: 9, burst: 9 },
  setA: "", setAn: 4, setB: "",
  pieces: {
    flower: blankPiece("hp"),
    plume: blankPiece("atk"),
    sands: blankPiece(),
    goblet: blankPiece(),
    circlet: blankPiece(),
  },
});

//Cálculos

function mainValue(key, lvl) {
  const max = MAINMAX[key];
  if (!max) return 0;
  const l = Math.max(0, Math.min(20, Number(lvl) || 0));
  return max * (0.125 + 0.875 * (l / 20));
}

function computeTotals(b) {
  const ch = CHAR_BY_ID[b.charId];
  const w = WPN_BY_NAME[b.weapon];
  const t = { cr: 5, cd: 50, er: 100, em: 0, hpp: 0, atkp: 0, defp: 0 };
  const bump = (k, v) => { if (k in t) t[k] += v; };

  if (ch && ch.asc) bump(ch.asc[0], ch.asc[1]);
  if (w) bump(w.s[0], w.s[1]);

  Object.entries(b.pieces).forEach(([, p]) => {
    if (p.main && p.main in t) bump(p.main, mainValue(p.main, p.lvl));
    p.subs.forEach((s) => {
      if (s.s && s.v !== "" && !Number.isNaN(Number(s.v))) bump(s.s, Number(s.v));
    });
  });
  return t;
}

// Quantas rolagens (aproximado) e quanto delas é útil
function pieceRolls(p, useful) {
  let total = 0, good = 0;
  p.subs.forEach((s) => {
    if (!s.s || s.v === "") return;
    const n = Number(s.v);
    if (Number.isNaN(n) || n <= 0) return;
    const r = n / MAXROLL[s.s];
    total += r;
    if (useful.includes(s.s)) good += r;
  });
  return { total, good, ratio: total > 0 ? good / total : 0 };
}

const SEV = { crit: 3, warn: 2, tip: 1, ok: 0 };

const lvAll = (b) => b.talents;

// Níveis efetivos: C3 e C5 dão +3 no talento correspondente.
// O usuário digita o nível BASE (1–10); aqui somamos o bônus.

function niveisEfetivos(b) {
  const c = consDe(b.charId);
  const n = Number(b.cons) || 0;
  const bonus = { na: 0, skill: 0, burst: 0 };
  if (n >= 3 && c.t3) bonus[c.t3] += 3;
  if (n >= 5 && c.t5) bonus[c.t5] += 3;
  return {
    na: Number(b.talents.na) + bonus.na,
    skill: Number(b.talents.skill) + bonus.skill,
    burst: Number(b.talents.burst) + bonus.burst,
    bonus,
  };
}

function analyzeChar(b) {
  const ch = CHAR_BY_ID[b.charId];
  if (!ch) return null;
  const w = WPN_BY_NAME[b.weapon];
  const t = computeTotals(b);
  const issues = [];
  const push = (sev, area, msg) => issues.push({ sev, area, msg });

  // Personagens sem dados de build verificados: só o que dá para medir sem opinião.
  if (ch.revisar) {
    push("crit", "Atenção",
      `Ainda não tenho dados de build conferidos para ${ch.n}. Os campos funcionam e as contas de Recarga, crítico e nível de peça continuam valendo, mas eu não vou opinar sobre conjunto, status principal ou substats aqui — preencha o objeto dele no topo do arquivo com um guia atualizado.`);
    SLOTS.forEach((slot) => {
      const p = b.pieces[slot.k];
      if (p.main && Number(p.lvl) < 20) {
        push("tip", "Artefatos", `${slot.n} está no +${p.lvl}. Subir até +20 dá mais rolagens e o status principal cheio.`);
      }
    });
    const efr = niveisEfetivos(b);
    const low = Math.min(efr.na, efr.skill, efr.burst);
    if (low < 8) push("warn", "Talentos", `Talento efetivo mais baixo em nível ${low}. Independente da build, 8+ nos talentos que você usa é o ganho mais barato.`);
    return { ch, w, totals: t, issues, score: null };
  }

  // Recarga de energia
  const target = ch.er * 100;
  if (t.er < target - 12) {
    push("crit", "Energia",
      `Recarga em ${t.er.toFixed(0)}%, alvo ~${target.toFixed(0)}%. Faltam ~${(target - t.er).toFixed(0)} pontos — troque um substat morto por Recarga ou passe a Ampulheta para Recarga.`);
  } else if (t.er < target) {
    push("warn", "Energia", `Recarga em ${t.er.toFixed(0)}%, um pouco abaixo do alvo (~${target.toFixed(0)}%). Uma rolagem resolve.`);
  } else if (t.er > target + 45 && !["raiden", "xingqiu"].includes(ch.id)) {
    push("tip", "Energia", `Recarga em ${t.er.toFixed(0)}% — bem acima do alvo (~${target.toFixed(0)}%). Você está pagando dano por energia que não usa.`);
  }

  // Crítico
  const critRelevant = ch.subs.includes("cr") || ch.subs.includes("cd");
  if (critRelevant) {
    const ratio = t.cr > 0 ? t.cd / t.cr : 0;
    if (t.cr < 50) {
      push("crit", "Crítico", `Só ${t.cr.toFixed(1)}% de Crítico. Abaixo de 50% o dano fica instável demais. Suba Crítico% antes de qualquer outra coisa.`);
    } else if (t.cr < 65) {
      push("warn", "Crítico", `Crítico em ${t.cr.toFixed(1)}%. Mire 70%+ (ou 60% se o time tiver Crítico de conjunto/arma).`);
    }
    if (t.cr >= 40) {
      if (ratio > 2.8) push("warn", "Crítico", `Proporção ${t.cr.toFixed(0)}:${t.cd.toFixed(0)} (1:${ratio.toFixed(1)}). Excesso de Dano Crít — troque uma peça de Dano Crít por Crítico%.`);
      else if (ratio < 1.5) push("warn", "Crítico", `Proporção ${t.cr.toFixed(0)}:${t.cd.toFixed(0)} (1:${ratio.toFixed(1)}). Excesso de Crítico% — a Coroa deveria ser de Dano Crít.`);
      else push("ok", "Crítico", `Proporção ${t.cr.toFixed(0)}:${t.cd.toFixed(0)} está saudável (1:${ratio.toFixed(1)}).`);
    }
  } else {
    // status morto
    const critInvest = (t.cr - 5) + (t.cd - 50) / 2;
    if (critInvest > 25) {
      push("warn", "Crítico", `Esse personagem não usa crítico, e você tem ${(t.cr).toFixed(0)}% / ${(t.cd).toFixed(0)}% investidos. São rolagens jogadas fora.`);
    }
  }

  // Conjuntos
  const recNames = ch.sets.map((s) => s.n);
  const has4 = b.setA && b.setAn === 4;
  if (!b.setA) {
    push("warn", "Conjunto", "Nenhum conjunto informado.");
  } else if (has4) {
    if (recNames.includes(b.setA)) {
      push("ok", "Conjunto", `4pc ${b.setA} — é o conjunto ${b.setA === recNames[0] ? "ideal" : "alternativo recomendado"}.`);
    } else {
      push("warn", "Conjunto", `4pc ${b.setA} não é padrão para ${ch.n}. Recomendado: ${recNames.join(" ou ")}.`);
    }
  } else {
    const combo = [b.setA, b.setB].filter(Boolean);
    if (combo.some((s) => recNames.includes(s))) {
      push("tip", "Conjunto", `2pc+2pc funciona, mas o bônus de 4 peças de ${recNames[0]} costuma render mais.`);
    } else {
      push("warn", "Conjunto", `2pc+2pc genérico. Vale montar 4pc ${recNames[0]}.`);
    }
  }

  // Status principal por slot
  SLOTS.forEach((slot) => {
    if (slot.fixed) return;
    const p = b.pieces[slot.k];
    const want = ch.main[slot.k];
    if (!p.main) { push("warn", "Artefatos", `${slot.n} sem status principal informado.`); return; }
    const wantLabel = want.map((k) => (k === "dmg" ? `Dano de ${EL[ch.el].n}%` : MAIN_LABEL[k])).join(" ou ");
    if (want.includes(p.main)) {
      if (p.main !== want[0]) {
        push("tip", "Artefatos", `${slot.n}: ${MAIN_LABEL[p.main]} é aceitável, mas ${want[0] === "dmg" ? `Dano de ${EL[ch.el].n}%` : MAIN_LABEL[want[0]]} é a primeira escolha.`);
      }
    } else {
      push("crit", "Artefatos", `${slot.n} errada: você tem ${p.main === "dmg" ? "Dano Elemental%" : MAIN_LABEL[p.main]}, deveria ser ${wantLabel}.`);
    }
    if (p.main === "phys" && ch.id !== "noelle") {
      push("crit", "Artefatos", `${slot.n} de Dano Físico não serve para ${ch.n}.`);
    }
  });

  // Nível das peças
  SLOTS.forEach((slot) => {
    const p = b.pieces[slot.k];
    if (p.main && Number(p.lvl) < 20) {
      push(Number(p.lvl) < 12 ? "warn" : "tip", "Artefatos",
        `${slot.n} está no +${p.lvl}. Subir até +20 ainda dá ${20 - Number(p.lvl) > 4 ? "várias" : "mais"} rolagens e o status principal cheio.`);
    }
  });

  // Substats
  const dead = {};
  SLOTS.forEach((slot) => {
    const p = b.pieces[slot.k];
    const filled = p.subs.filter((s) => s.s).length;
    if (!p.main && filled === 0) return;
    const r = pieceRolls(p, ch.subs);
    p.subs.forEach((s) => {
      if (!s.s) return;
      if (!ch.subs.includes(s.s)) {
        dead[s.s] = (dead[s.s] || 0) + 1;
      }
    });
    if (r.total >= 3 && r.ratio < 0.35) {
      push("warn", "Substats", `${slot.n}: só ~${Math.round(r.ratio * 100)}% das rolagens são úteis. Essa peça é a primeira candidata a ser substituída.`);
    } else if (r.total >= 4 && r.ratio >= 0.75) {
      push("ok", "Substats", `${slot.n}: ~${Math.round(r.ratio * 100)}% de rolagens úteis. Boa peça, mantenha.`);
    }
  });
  const deadList = Object.keys(dead);
  if (deadList.length) {
    push("tip", "Substats",
      `Substats sem função nessa build: ${deadList.map((k) => SUB_LABEL[k]).join(", ")}. Prioridade real: ${ch.subs.map((k) => SUB_LABEL[k]).join(" > ")}.`);
  }

  // Talentos — o usuário informa o nível base; C3/C5 somam +3
  const order = ch.tal;
  const lvBase = b.talents;
  const ef = niveisEfetivos(b);
  const cinfo = consDe(ch.id);

  ["na", "skill", "burst"].forEach((k) => {
    if (Number(lvBase[k]) > 10) {
      push("warn", "Talentos", `${TAL[k]} está em ${lvBase[k]}. Informe o nível BASE (1–10) — o bônus de C3/C5 o app soma sozinho.`);
    }
  });

  const lowest = Math.min(ef.na, ef.skill, ef.burst);
  if (lowest < 6) push("crit", "Talentos", `Talento efetivo em nível ${lowest}. Suba pelo menos o principal (${TAL[order[0]]}) para 8+ — é o ganho de dano mais barato que existe.`);
  else if (ef[order[0]] < 8) push("warn", "Talentos", `${TAL[order[0]]} está em ${ef[order[0]]} efetivo. É o talento mais importante de ${ch.n}: leve para 9–10.`);

  for (let i = 0; i < order.length - 1; i++) {
    for (let j = i + 1; j < order.length; j++) {
      if (ef[order[j]] > ef[order[i]] + 1) {
        const nota = ef.bonus[order[j]] ? " (já contando o +3 da constelação)" : "";
        push("warn", "Talentos", `Prioridade invertida: ${TAL[order[j]]} (${ef[order[j]]}) está acima de ${TAL[order[i]]} (${ef[order[i]]})${nota}. A ordem certa é ${order.map((k) => TAL[k]).join(" > ")}.`);
      }
    }
  }

  if (Number(b.cons) >= 3 && (cinfo.t3 || cinfo.t5)) {
    const partes = [];
    if (Number(b.cons) >= 3 && cinfo.t3) partes.push(`C3 dá +3 em ${TAL[cinfo.t3]}`);
    if (Number(b.cons) >= 5 && cinfo.t5) partes.push(`C5 dá +3 em ${TAL[cinfo.t5]}`);
    push("ok", "Constelação", `${partes.join(" e ")}. Não gaste livros além do nível 10 nesses.`);
  }
  if (Number(b.cons) === 0 && cinfo.t3) {
    push("tip", "Constelação", `Em C0 você depende só de livros. A primeira constelação que muda dano de verdade aqui é C3 (+3 em ${TAL[cinfo.t3]}).`);
  }

  // Arma
  if (!b.weapon) {
    push("tip", "Arma", `Nenhuma arma informada. Boas opções: ${ch.wpns.slice(0, 3).join(", ")}.`);
  } else if (w && w.t !== ch.wt) {
    push("crit", "Arma", `${b.weapon} não é do tipo que ${ch.n} usa.`);
  } else if (ch.wpns.includes(b.weapon)) {
    push("ok", "Arma", `${b.weapon} é uma escolha sólida para ${ch.n}.`);
  } else if (w) {
    const relevant = w.s[0] === "er" ? (ch.er >= 1.5) : ch.subs.includes(w.s[0]);
    push(relevant ? "tip" : "warn", "Arma",
      relevant
        ? `${b.weapon} funciona (o secundário de ${SUB_LABEL[w.s[0]]} é útil aqui), mas dá uma olhada em ${ch.wpns[0]}.`
        : `${b.weapon} tem secundário de ${SUB_LABEL[w.s[0]]}, que não ajuda ${ch.n}. Melhores: ${ch.wpns.slice(0, 3).join(", ")}.`);
  }

  // Nota do personagem
  if (ch.note) push("tip", "Nota", ch.note);

  const penalty = issues.reduce((a, i) => a + (i.sev === "crit" ? 14 : i.sev === "warn" ? 6 : 0), 0);
  const score = Math.max(5, 100 - penalty);
  return { ch, w, totals: t, issues, score };
}

function analyzeTeam(team) {
  const built = team.map((b) => CHAR_BY_ID[b.charId]).filter(Boolean);
  const out = [];
  if (built.length < 2) return out;

  const els = built.map((c) => c.el);
  const count = {};
  els.forEach((e) => (count[e] = (count[e] || 0) + 1));
  Object.entries(count).forEach(([e, n]) => {
    if (n >= 2) out.push({ sev: "ok", area: "Ressonância", msg: `${EL[e].n} x${n} — ${RESONANCE[e]}` });
  });
  if (Object.values(count).every((n) => n === 1) && built.length === 4) {
    out.push({ sev: "tip", area: "Ressonância", msg: "Quatro elementos diferentes: nenhuma ressonância ativa. Duplicar um elemento normalmente rende mais." });
  }

  const tags = built.flatMap((c) => c.tags);
  const anyUnknown = built.some((c) => c.revisar);
  if (!tags.includes("healer") && !tags.includes("shielder") && !anyUnknown) {
    out.push({ sev: "warn", area: "Sustentação", msg: "Nenhum curandeiro nem escudeiro. Em Abismo ou Teatro Imaginário isso costuma ser o motivo real do time falhar." });
  }
  if (!tags.includes("dps") && !anyUnknown) {
    out.push({ sev: "warn", area: "Papéis", msg: "Nenhum DPS principal claro. Alguém precisa ficar em campo dando dano." });
  }
  if (anyUnknown) {
    out.push({ sev: "tip", area: "Papéis", msg: `Um ou mais membros estão sem dados conferidos (${built.filter((c) => c.revisar).map((c) => c.n).join(", ")}), então a análise de papéis e sustentação do time está incompleta.` });
  }

  // Viridescent Venerer
  const anemos = team.filter((b) => CHAR_BY_ID[b.charId]?.el === "anemo");
  if (anemos.length) {
    const hasVV = anemos.some((b) => b.setA === "Viridescent Venerer" && b.setAn === 4);
    if (!hasVV) out.push({ sev: "warn", area: "Sinergia", msg: "Você tem Anemo no time mas ninguém com 4pc Viridescent Venerer. É -40% de resistência elemental no inimigo — normalmente o maior buff disponível." });
  } else if (new Set(els).size >= 2) {
    out.push({ sev: "tip", area: "Sinergia", msg: "Sem Anemo no time: você perde o agrupamento e o -40% de RES do Viridescent Venerer." });
  }

  // Deepwood
  if (els.includes("dendro")) {
    const hasDeep = team.some((b) => b.setA === "Deepwood Memories" && b.setAn === 4);
    if (!hasDeep) out.push({ sev: "tip", area: "Sinergia", msg: "Time com Dendro sem 4pc Deepwood Memories (-30% de RES Dendro). Vale em qualquer curandeiro ou suporte do time." });
  }

  // Reações
  const set = new Set(els);
  const rx = [];
  if (set.has("pyro") && set.has("hydro")) rx.push("Vaporizar");
  if (set.has("pyro") && set.has("cryo")) rx.push("Derreter");
  if (set.has("hydro") && set.has("cryo")) rx.push("Congelar");
  if (set.has("electro") && set.has("hydro")) rx.push("Eletrocarregado");
  if (set.has("dendro") && set.has("hydro")) rx.push("Florescer");
  if (set.has("dendro") && set.has("hydro") && set.has("electro")) rx.push("Hiperflorescer");
  if (set.has("dendro") && set.has("hydro") && set.has("pyro")) rx.push("Explosão de Brotos");
  if (set.has("dendro") && set.has("electro")) rx.push("Agravar");
  if (set.has("dendro") && set.has("pyro")) rx.push("Queimar");
  if (rx.length) out.push({ sev: "ok", area: "Reações", msg: `Disponíveis: ${rx.join(", ")}.` });
  else if (built.length >= 3) out.push({ sev: "tip", area: "Reações", msg: "Nenhuma reação forte entre esses elementos. Dano puro exige builds bem melhores para compensar." });

  // Bateria de energia
  team.forEach((b) => {
    const c = CHAR_BY_ID[b.charId];
    if (!c || c.revisar || c.er < 1.6) return;
    const t = computeTotals(b);
    if (t.er < c.er * 100) {
      const sameEl = built.filter((x) => x.el === c.el).length >= 2;
      out.push({
        sev: "tip", area: "Energia",
        msg: `${c.n} depende muito do Supremo e está com Recarga baixa. ${sameEl ? "Ter outro do mesmo elemento já ajuda — considere uma arma Favonius no time." : `Adicionar um ${EL[c.el].n} de apoio ou uma arma Favonius resolveria sem gastar substats.`}`,
      });
    }
  });

  return out;
}

// Status base no nível 90: [HP, ATQ, DEF]. Gerado por genbase.cjs. 
const BASE = {
  hutao: [15552,106.4,876],
  arlecchino: [13103,342.0,765],
  lyney: [11021,318.1,538],
  yoimiya: [10164,322.9,615],
  diluc: [12981,334.8,784],
  klee: [10287,310.9,615],
  mavuika: [12552,358.8,792],
  xiangling: [10875,225.1,669],
  bennett: [12397,191.2,771],
  neuvillette: [14695,208.3,576],
  furina: [15307,244.0,696],
  xingqiu: [10222,201.8,758],
  yelan: [14450,244.0,548],
  kokomi: [13471,234.4,657],
  mona: [10409,287.0,653],
  nilou: [15185,229.6,729],
  childe: [13103,301.4,815],
  kazuha: [13348,296.6,807],
  venti: [10531,263.1,669],
  sucrose: [9244,169.9,703],
  xianyun: [10409,334.8,573],
  jean: [14695,239.2,769],
  wanderer: [10164,327.7,607],
  xiao: [12736,349.2,799],
  faruzan: [9570,196.5,628],
  raiden: [12907,337.2,789],
  yae: [10372,339.6,569],
  fischl: [9189,244.3,594],
  keqing: [13103,322.9,799],
  cyno: [12491,318.1,859],
  clorinde: [12956,337.2,784],
  kuki: [12289,212.4,751],
  ayaka: [12858,342.0,784],
  ganyu: [9797,334.8,630],
  wriothesley: [13593,310.9,763],
  shenhe: [12993,303.8,830],
  escoffier: [13348,346.8,732],
  rosaria: [12289,240.0,710],
  diona: [9570,212.4,601],
  layla: [11092,216.6,655],
  zhongli: [14695,251.1,738],
  navia: [12650,351.6,793],
  itto: [12858,227.2,959],
  noelle: [12071,191.2,799],
  xilonen: [12405,275.1,930],
  chiori: [11438,322.9,953],
  albedo: [13226,251.1,876],
  yunjin: [10657,191.2,734],
  nahida: [10360,299.0,630],
  alhaitham: [13348,313.3,782],
  kinich: [12858,332.5,802],
  baizhu: [13348,192.5,500],
  yaoyao: [12289,212.4,751],
  tighnari: [10850,267.9,630],
  amber: [9461,223.0,601],
  yanfei: [9352,240.0,587],
  xinyan: [11201,248.5,799],
  thoma: [10331,201.8,751],
  dehya: [15675,265.5,628],
  gaming: [11419,301.6,703],
  chevreuse: [11962,193.3,605],
  barbara: [9787,159.3,669],
  ayato: [13715,299.0,769],
  candace: [10875,212.4,683],
  mualani: [15185,181.8,570],
  sigewinne: [13348,192.5,500],
  dahlia: [12506,189.0,560],
  sayu: [11854,244.3,745],
  heizou: [10657,225.1,684],
  lynette: [12397,231.5,712],
  lanyan: [9244,250.6,580],
  mizuki: [12736,215.3,757],
  ifa: [10081,178.4,605],
  chasca: [9797,346.8,615],
  lisa: [9570,231.5,573],
  beidou: [13050,225.1,648],
  razor: [11962,233.6,751],
  kujousara: [9570,195.4,628],
  dori: [12397,223.0,723],
  sethos: [9787,227.3,560],
  ororon: [9244,244.3,587],
  iansan: [10657,257.0,638],
  varesa: [12699,356.4,782],
  kaeya: [11636,223.0,792],
  chongyun: [10984,223.0,648],
  qiqi: [12368,287.0,922],
  eula: [13226,342.0,751],
  mika: [12506,223.0,713],
  charlotte: [10766,173.1,546],
  freminet: [12071,254.9,708],
  citlali: [11634,126.8,763],
  ningguang: [9787,212.4,573],
  gorou: [9570,182.7,648],
  kachina: [11799,216.6,792],
  collei: [9787,199.7,601],
  kaveh: [11962,233.6,751],
  kirara: [12180,223.0,546],
  emilie: [13568,334.8,730],
  travelerdendro: [10875,212.4,683],
  travelerpyro: [10875,212.4,683],
  aino: [11201,242.1,607],
  aloy: [10899,233.9,676],
  columbina: [14695,95.7,515],
  durin: [12430,346.8,822],
  flins: [12491,351.6,809],
  illuga: [11962,191.2,814],
  ineffa: [12613,330.1,828],
  jahoda: [9646,223.0,580],
  lauma: [10654,255.0,669],
  linnea: [9895,143.5,907],
  lohen: [12858,344.4,784],
  nefer: [12704,344.4,799],
  nicole: [10409,342.0,563],
  prune: [9679,220.9,580],
  skirk: [12417,358.8,806],
  varka: [12613,352.8,795],
  manekin: [10875,212.4,683],
  zibai: [12919,224.8,957],
  sandrone: [13226,342.0,752],
  odette: [12981,334.8,787],
  alyosha: [11962,265.5,703],
};

// Arma-assinatura: 5★ do mesmo tipo lançada na versão do personagem. 
const ASSINATURA = {
  hutao: "Staff of Homa",
  arlecchino: "Crimson Moon's Semblance",
  lyney: "The First Great Magic",
  yoimiya: "Thundering Pulse",
  mavuika: "A Thousand Blazing Suns",
  neuvillette: "Tome of the Eternal Flow",
  furina: "Splendor of Tranquil Waters",
  yelan: "Aqua Simulacra",
  kokomi: "Everlasting Moonglow",
  nilou: "Key of Khaj-Nisut",
  kazuha: "Freedom-Sworn",
  xianyun: "Crane's Echoing Call",
  wanderer: "Tulaytullah's Remembrance",
  xiao: "Staff of Homa",
  raiden: "Engulfing Lightning",
  yae: "Kagura's Verity",
  cyno: "Staff of the Scarlet Sands",
  clorinde: "Absolution",
  ayaka: "Mistsplitter Reforged",
  wriothesley: "Cashflow Supervision",
  shenhe: "Calamity Queller",
  escoffier: "Symphonist of Scents",
  zhongli: "Vortex Vanquisher",
  navia: "Verdict",
  itto: "Redhorn Stonethresher",
  xilonen: "Peak Patrol Song",
  chiori: "Uraku Misugiri",
  albedo: "Summit Shaper",
  yunjin: "Calamity Queller",
  nahida: "A Thousand Floating Dreams",
  alhaitham: "Light of Foliar Incision",
  kinich: "Fang of the Mountain King",
  baizhu: "Jadefall's Splendor",
  tighnari: "Hunter's Path",
  xinyan: "The Unforged",
  dehya: "Beacon of the Reed Sea",
  ayato: "Haran Geppaku Futsu",
  candace: "Staff of the Scarlet Sands",
  mualani: "Surf's Up",
  sigewinne: "Silvershower Heartstrings",
  dahlia: "Azurelight",
  lanyan: "Starcaller's Watch",
  mizuki: "Sunny Morning Sleep-In",
  chasca: "Astral Vulture's Crimson Plumage",
  sethos: "Silvershower Heartstrings",
  ororon: "Astral Vulture's Crimson Plumage",
  varesa: "Vivid Notions",
  eula: "Song of Broken Pines",
  citlali: "Starcaller's Watch",
  collei: "Hunter's Path",
  emilie: "Lumidouce Elegy",
  columbina: "Nocturne's Curtain Call",
  durin: "Athame Artis",
  flins: "Bloodsoaked Ruins",
  ineffa: "Fractured Halo",
  jahoda: "The Daybreak Chronicles",
  lauma: "Nightweaver's Looking Glass",
  linnea: "Golden Frostbound Oath",
  lohen: "Disaster and Remorse",
  nefer: "Reliquary of Truth",
  nicole: "Angelos' Heptades",
  prune: "Angelos' Heptades",
  skirk: "Azurelight",
  varka: "Gest of the Mighty Wolf",
  zibai: "Lightbearing Moonshard",
  sandrone: "A Teaspoon of Transcendence",
};

// Conjuntos: bônus de 2 peças estruturado + textos oficiais.
// Gerado por gensets.cjs a partir do genshin-db — não editar à mão.
// p2 aplica automaticamente. el != null significa que o bônus só vale
// se o elemento do personagem for esse. O 4pc fica como texto: é
// condicional demais para automatizar, então vai nos ajustes manuais.

const CONJUNTOS = {
  "Gladiator's Finale": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
  "Wanderer's Troupe": { p2: [["em",80]], el: null, t2: "Increases Elemental Mastery by 80.", t4: "Increases Charged Attack DMG by 35% if the character uses a Catalyst or a Bow." },
  "Noblesse Oblige": { p2: [["dmg",20,"burst"]], el: null, t2: "Elemental Burst DMG +20%", t4: "Using an Elemental Burst increases all party members' ATK by 20% for 12s. This effect cannot stack." },
  "Bloodstained Chivalry": { p2: [["phys",25]], el: null, t2: "Physical DMG +25%", t4: "After defeating an opponent, increases Charged Attack DMG by 50%, and reduces its Stamina cost to 0 for 10s." },
  "Viridescent Venerer": { p2: [["dmg",15]], el: "anemo", t2: "Anemo DMG Bonus +15%", t4: "Increases Swirl reaction DMG dealt by 60%, and Stellar Swirl reaction DMG dealt by 20%. Decreases opponent's Elemental RES to the element infused in the Swirl by 40% for 10s. Upon triggering a Stellar Swirl in the opponent, will also decrease their Cryo RES by 40%. RES debuffs of the same elemental type do not stack." },
  "Archaic Petra": { p2: [["dmg",15]], el: "geo", t2: "Gain a 15% Geo DMG Bonus.", t4: "Upon obtaining an Elemental Shard created through Crystallize or triggering a Lunar-Crystallize reaction, all party members gain a 35% DMG Bonus for that particular element for 10s. Only one form of Elemental DMG Bonus can be gained in this manner at any one time." },
  "Crimson Witch of Flames": { p2: [["dmg",15]], el: "pyro", t2: "Pyro DMG Bonus +15%", t4: "Increases Overloaded, Burning, and Burgeon DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using Elemental Skill increases the 2-Piece Set Bonus by 50% of its starting value for 10s. Max 3 stacks." },
  "Lavawalker": { p2: [], el: null, t2: "Pyro RES increased by 40%.", t4: "Increases DMG against opponents affected by Pyro by 35%." },
  "Thundersoother": { p2: [], el: null, t2: "Electro RES increased by 40%.", t4: "Increases DMG against opponents affected by Electro by 35%." },
  "Thundering Fury": { p2: [["dmg",15]], el: "electro", t2: "Electro DMG Bonus +15%", t4: "Increases the DMG caused by Overloaded, Electro-Charged, Superconduct, and Hyperbloom by 40%, the DMG Bonus conferred by Aggravate by 20%, and the DMG caused by Lunar-Charged and Stellar-Conduct by 20%. When Quicken or the aforementioned Elemental Reactions are triggered, Elemental Skill CD is decreased by 1s. Can only occur once every 0.8s." },
  "Blizzard Strayer": { p2: [["dmg",15]], el: "cryo", t2: "Cryo DMG Bonus +15%", t4: "When a character attacks an opponent affected by Cryo, their CRIT Rate is increased by 20%. If the opponent is Frozen, CRIT Rate is increased by an additional 20%." },
  "Heart of Depth": { p2: [["dmg",15]], el: "hydro", t2: "Hydro DMG Bonus +15%", t4: "After using Elemental Skill, increases Normal Attack and Charged Attack DMG by 30% for 15s." },
  "Tenacity of the Millelith": { p2: [["hpp",20]], el: null, t2: "HP +20%", t4: "When an Elemental Skill hits an opponent, the ATK of all nearby party members is increased by 20% and their Shield Strength is increased by 30% for 3s. This effect can be triggered once every 0.5s. This effect can still be triggered even when the character who is using this artifact set is not on the field." },
  "Pale Flame": { p2: [["phys",25]], el: null, t2: "Physical DMG is increased by 25%.", t4: "When an Elemental Skill hits an opponent, ATK is increased by 9% for 7s. This effect stacks up to 2 times and can be triggered once every 0.3s. Once 2 stacks are reached, the 2-set effect is increased by 100%." },
  "Shimenawa's Reminiscence": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "When casting an Elemental Skill, if the character has 15 or more Energy, they lose 15 Energy and Normal/Charged/Plunging Attack DMG is increased by 50% for 10s. This effect will not trigger again during that duration." },
  "Emblem of Severed Fate": { p2: [["er",20]], el: null, t2: "Energy Recharge +20%", t4: "Increases Elemental Burst DMG by 25% of Energy Recharge. A maximum of 75% bonus DMG can be obtained in this way." },
  "Husk of Opulent Dreams": { p2: [["defp",30]], el: null, t2: "DEF +30%", t4: "A character equipped with this Artifact set will obtain the Curiosity effect in the following conditions: When on the field, the character gains 1 stack after hitting an opponent with a Geo attack, triggering a maximum of once every 0.3s. When off the field, the character gains 1 stack every 3s. Curiosity can stack up to 4 times, each providing 6% DEF and a 6% Geo DMG Bonus. When 6 seconds pass without gaining a Curiosity stack, 1 stack is lost." },
  "Ocean-Hued Clam": { p2: [["heal",15]], el: null, t2: "Healing Bonus +15%.", t4: "When the character equipping this artifact set heals a character in the party, a Sea-Dyed Foam will appear for 3 seconds, accumulating the amount of HP recovered from healing (including overflow healing). At the end of the duration, the Sea-Dyed Foam will explode, dealing DMG to nearby opponents based on 90% of the accumulated healing. (This DMG is calculated similarly to Reactions such as Electro-Charged, and Superconduct, but is not affected by Elemental Mastery, Character Levels, or Reaction DMG Bonuses). Only one Sea-Dyed Foam can be produced every 3.5 seconds. Each Sea-Dyed Foam can accumulate up to 30,000 HP (including overflow healing). There can be no more than one Sea-Dyed Foam active at any given time. This effect can still be triggered even when the character who is using this artifact set is not on the field." },
  "Vermillion Hereafter": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "After using an Elemental Burst, this character will gain the Nascent Light effect, increasing their ATK by 8% for 16s. When the character's HP decreases, their ATK will further increase by 10%. This further increase can occur this way a maximum of 4 times. This effect can be triggered once every 0.8s. Nascent Light will be dispelled when the character leaves the field. If an Elemental Burst is used again during the duration of Nascent Light, the original Nascent Light will be dispelled." },
  "Echoes of an Offering": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "When Normal Attacks hit opponents, there is a 36% chance that it will trigger Valley Rite, which will increase Normal Attack DMG by 70% of ATK. This effect will be dispelled 0.05s after a Normal Attack deals DMG. If a Normal Attack fails to trigger Valley Rite, the odds of it triggering the next time will increase by 20%. This trigger can occur once every 0.2s." },
  "Deepwood Memories": { p2: [["dmg",15]], el: "dendro", t2: "Dendro DMG Bonus +15%.", t4: "After Elemental Skills or Bursts hit opponents, the targets' Dendro RES will be decreased by 30% for 8s. This effect can be triggered even if the equipping character is not on the field." },
  "Gilded Dreams": { p2: [["em",80]], el: null, t2: "Increases Elemental Mastery by 80.", t4: "Within 8s of triggering an Elemental Reaction, the character equipping this will obtain buffs based on the Elemental Type of the other party members. ATK is increased by 14% for each party member whose Elemental Type is the same as the equipping character, and Elemental Mastery is increased by 50 for every party member with a different Elemental Type. Each of the aforementioned buffs will count up to 3 characters. This effect can be triggered once every 8s. The character who equips this can still trigger its effects when not on the field." },
  "Desert Pavilion Chronicle": { p2: [["dmg",15]], el: "anemo", t2: "Anemo DMG Bonus +15%", t4: "When Charged Attacks hit opponents, the equipping character's Normal Attack SPD will increase by 10% while Normal, Charged, and Plunging Attack DMG will increase by 40% for 15s." },
  "Flower of Paradise Lost": { p2: [["em",80]], el: null, t2: "Increases Elemental Mastery by 80.", t4: "The equipping character's Bloom, Hyperbloom, and Burgeon reaction DMG are increased by 40%, and their Lunar-Bloom reaction DMG is increased by 10%. Additionally, after the equipping character triggers Bloom, Hyperbloom, Lunar-Bloom, or Burgeon, they will gain another 25% bonus to the effects mentioned prior. Each stack of this lasts 10s. Max 4 stacks simultaneously. This effect can only be triggered once per second. The character who equips this can still trigger its effects when not on the field." },
  "Nymph's Dream": { p2: [["dmg",15]], el: "hydro", t2: "Hydro DMG Bonus +15%", t4: "After Normal, Charged, and Plunging Attacks, Elemental Skills, and Elemental Bursts hit opponents, 1 stack of Mirrored Nymph will be triggered, lasting 8s. When under the effect of 1, 2, or 3 or more Mirrored Nymph stacks, ATK will be increased by 7%/16%/25%, and Hydro DMG Bonus will be increased by 4%/9%/15%. Mirrored Nymph stacks created by Normal, Charged, and Plunging Attacks, Elemental Skills, and Elemental Bursts exist independently." },
  "Vourukasha's Glow": { p2: [["hpp",20]], el: null, t2: "HP +20%", t4: "Elemental Skill and Elemental Burst DMG will be increased by 10%. After the equipping character takes DMG, the aforementioned DMG Bonus is increased by 80% for 5s. This effect increase can have 5 stacks. The duration of each stack is counted independently. These effects can be triggered even when the equipping character is not on the field." },
  "Marechaussee Hunter": { p2: [["dmg",15,"na"]], el: null, t2: "Normal and Charged Attack DMG +15%", t4: "When current HP increases or decreases, CRIT Rate will be increased by 12% for 5s. Max 3 stacks." },
  "Golden Troupe": { p2: [["dmg",20,"skill"]], el: null, t2: "Increases Elemental Skill DMG by 20%.", t4: "Increases Elemental Skill DMG by 25%. Additionally, when not on the field, Elemental Skill DMG will be further increased by 25%. This effect will be cleared 2s after taking the field." },
  "Song of Days Past": { p2: [["heal",15]], el: null, t2: "Healing Bonus +15%.", t4: "When the equipping character heals a party member, the Yearning effect will be created for 6s, which records the total amount of healing provided (including overflow healing). When the duration expires, the Yearning effect will be transformed into the \"Waves of Days Past\" effect: When your active party member hits an opponent with a Normal Attack, Charged Attack, Plunging Attack, Elemental Skill, or Elemental Burst, the DMG dealt will be increased by 8% of the total healing amount recorded by the Yearning effect. The \"Waves of Days Past\" effect is removed after it has taken effect 5 times or after 10s. A single instance of the Yearning effect can record up to 15,000 healing, and only a single instance can exist at once, but it can record the healing from multiple equipping characters. Equipping characters on standby can still trigger this effect." },
  "Nighttime Whispers in the Echoing Woods": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "After using an Elemental Skill, gain a 20% Geo DMG Bonus for 10s. When under a shield granted by the Crystallize reaction, or when Moondrifts formed by Lunar-Crystallize reactions are nearby, the above effect is increased by 150%. When these conditions are no longer met, this additional increase disappears after 1s." },
  "Fragment of Harmonic Whimsy": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "When the value of a Bond of Life increases or decreases, this character deals 18% increased DMG for 6s. Max 3 stacks." },
  "Unfinished Reverie": { p2: [["atkp",18]], el: null, t2: "ATK +18%.", t4: "After leaving combat for 3s, DMG dealt increased by 50%. In combat, if no Burning opponents are nearby for more than 6s, this DMG Bonus will decrease by 10% per second until it reaches 0%. When a Burning opponent exists, it will increase by 10% instead until it reaches 50%. This effect still triggers if the equipping character is off-field." },
  "Scroll of the Hero of Cinder City": { p2: [], el: null, t2: "When a nearby party member triggers a Nightsoul Burst, the equipping character regenerates 6 Elemental Energy.", t4: "After the equipping character triggers a reaction related to their Elemental Type, all nearby party members gain a 12% Elemental DMG Bonus for the Elemental Types involved in the elemental reaction for 15s. If the equipping character is in the Nightsoul's Blessing state when triggering this effect, all nearby party members gain an additional 28% Elemental DMG Bonus for the Elemental Types involved in the elemental reaction for 20s. The equipping character can trigger this effect while off-field, and the DMG bonus from Artifact Sets with the same name do not stack." },
  "Obsidian Codex": { p2: [], el: null, t2: "While the equipping character is in Nightsoul's Blessing and is on the field, their DMG dealt is increased by 15%.", t4: "After the equipping character consumes 1 Nightsoul point while on the field, CRIT Rate increases by 40% for 6s. This effect can trigger once every second." },
  "Long Night's Oath": { p2: [["dmg",25,"na"]], el: null, t2: "Plunging Attack DMG increased by 25%.", t4: "After the equipping character's Plunging Attack/Charged Attack/Elemental Skill hits an opponent, they will gain 1/2/2 stack(s) of \"Radiance Everlasting.\" Plunging Attacks, Charged Attacks, or Elemental Skills can each trigger this effect once every 1s. Radiance Everlasting: Plunging Attacks deal 15% increased DMG for 6s. Max 5 stacks. Each stack's duration is counted independently." },
  "Finale of the Deep Galleries": { p2: [["dmg",15]], el: "cryo", t2: "Cryo DMG Bonus +15%", t4: "When the equipping character has 0 Elemental Energy, Normal Attack DMG is increased by 60% and Elemental Burst DMG is increased by 60%. After the equipping character deals Normal Attack DMG, the aforementioned Elemental Burst effect will stop applying for 6s. After the equipping character deals Elemental Burst DMG, the aforementioned Normal Attack effect will stop applying for 6s. This effect can trigger even if the equipping character is off the field." },
};

/*
   DPS DA COMPOSIÇÃO
   Rotações são SUAS. Defina abaixo e rode `node gerar-dados.cjs`
   para o app buscar os multiplicadores de talento na base oficial.
   Quem não tiver rotação aqui simplesmente não entra na tabela.
*/

const ROTACOES = {
  hutao: {
    dbNome: "Hu Tao",
    tempo: 12,                 // segundos de um ciclo completo
    nota: "E, 5 cargados, Q no fim",
    golpes: [
      { rotulo: "Ataque Carregado", talento: "combat1", param: "param8", nivel: "na",    escala: "atk", qtd: 5 },
      { rotulo: "Supremo",          talento: "combat3", param: "param1", nivel: "burst", escala: "atk", qtd: 1 },
    ],
    // Paramita: converte HP em ATQ, com teto de 400% do ATQ base
    passiva: (st, ctx) => ({ ...st, atk: st.atk + Math.min(st.hp * 0.0596, ctx.atkBase * 4) }),
  },
};
//FIM ROTACOES

// INICIO DANO — gerado por gerar-dados.cjs, nao editar 
const DANO = {
  hutao: { base: { hp: 15552, atk: 106.4, def: 876 }, mult: {
    "combat1.param8": [1.3596,1.4523,1.545,1.6686,1.7613,1.86945,2.0085,2.14755,2.2866,2.42565,2.5647,2.70375,2.8428,2.98185,3.1209],
    "combat3.param1": [3.03272,3.21432,3.39592,3.632,3.8136,3.9952,4.23128,4.46736,4.70344,4.93952,5.1756,5.41168,5.64776,5.88384,6.11992]
  } },
};
//FIM DANO

//motor de dano 

const defMult = (nivelInimigo) => 190 / (190 + (nivelInimigo + 100));
const resMult = (res) => (res < 0 ? 1 - res / 2 : res < 0.75 ? 1 - res : 1 / (1 + 4 * res));

/* Status completos: bases, peças, conjuntos e ajustes manuais.
   Devolve também `escopo`, com os bônus que valem só para certos golpes. */
function statsCompletos(b) {
  const bs = BASE[b.charId];
  if (!bs) return null;
  const base = { hp: bs[0], atk: bs[1], def: bs[2] };
  const ch = CHAR_BY_ID[b.charId];
  const w = WPN_BY_NAME[b.weapon];

  const a = { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 0, cr: 5, cd: 50, dmg: 0 };
  const escopo = { na: 0, skill: 0, burst: 0 };
  const add = (k, v) => { if (k in a) a[k] += v; };

  if (ch && ch.asc) add(ch.asc[0], ch.asc[1]);
  if (w) add(w.s[0], w.s[1]);

  Object.values(b.pieces).forEach((p) => {
    if (p.main) add(p.main === "phys" ? "dmg" : p.main, mainValue(p.main, p.lvl));
    (p.subs || []).forEach((sb) => {
      if (sb.s && sb.v !== "" && !Number.isNaN(Number(sb.v))) add(sb.s, Number(sb.v));
    });
  });

  // Bônus de 2 peças. Um 4pc também concede o de 2. Bônus elemental só
  // conta se o elemento do conjunto for o do personagem.
  const aplicar2pc = (nome) => {
    const c = CONJUNTOS[nome];
    if (!c) return;
    for (const ef of c.p2) {
      const [k, v, esc] = ef;
      if (k === "dmg" && c.el && ch && c.el !== ch.el) continue;
      if (esc) escopo[esc] += v;
      else add(k === "phys" ? "dmg" : k, v);
    }
  };
  if (b.setA) aplicar2pc(b.setA);
  if (b.setAn === 2 && b.setB) aplicar2pc(b.setB);

  // Ajustes manuais (4pc condicional, buffs de time, comida)
  const aj = b.ajustes || {};
  ["dmg", "atkp", "cr", "cd", "em"].forEach((k) => add(k, Number(aj[k]) || 0));

  const atkBase = base.atk + (w ? w.atk : 0);
  return {
    atk: atkBase * (1 + a.atkp / 100) + a.atk,
    hp: base.hp * (1 + a.hpp / 100) + a.hp,
    def: base.def * (1 + a.defp / 100) + a.def,
    cr: a.cr / 100, cd: a.cd / 100, em: a.em,
    bonusDano: a.dmg / 100,
    escopo, atkBase,
  };
}

/* DPS de um membro. Devolve null se não houver rotação/dados. */
function dpsDoMembro(b, janela, inimigo) {
  const rot = ROTACOES[b.charId];
  const d = DANO[b.charId];
  if (!rot || !d) return null;

  const st = statsCompletos(b);
  if (!st) return null;
  const ctx = { atkBase: st.atkBase, cons: Number(b.cons) || 0 };
  const stats = rot.passiva ? rot.passiva(st, ctx) : st;
  const ef = niveisEfetivos(b);

  const critM = 1 + Math.min(1, stats.cr) * stats.cd;
  const dm = defMult(inimigo.nivel) * resMult(inimigo.res / 100);

  let porCiclo = 0;
  const detalhe = [];
  for (const g of rot.golpes) {
    const serie = d.mult[`${g.talento}.${g.param}`];
    if (!serie) continue;
    const nv = Math.max(1, Math.min(15, ef[g.nivel]));
    const bonusEsc = (stats.escopo && stats.escopo[g.nivel]) || 0;
    const dano = serie[nv - 1] * stats[g.escala] * (1 + stats.bonusDano + bonusEsc / 100) * critM * dm;
    porCiclo += dano * g.qtd;
    detalhe.push({ rotulo: g.rotulo, qtd: g.qtd, unitario: dano });
  }

  const ciclos = janela / rot.tempo;
  const total = porCiclo * ciclos;
  return { total, dps: total / janela, porCiclo, ciclos, tempo: rot.tempo, nota: rot.nota, detalhe };
}

//Exemplo pronto
function exampleTeam() {
  const t = [blankBuild(), blankBuild(), blankBuild(), blankBuild()];
  t[0] = {
    ...blankBuild(), charId: "hutao", weapon: "Staff of Homa",
    talents: { na: 9, skill: 8, burst: 6 }, setA: "Crimson Witch of Flames", setAn: 4, setB: "",
    pieces: {
      flower: { lvl: 20, main: "hp", subs: [{ s: "cd", v: 14.8 }, { s: "cr", v: 7.4 }, { s: "atkp", v: 9.9 }, { s: "def", v: 23 }] },
      plume:  { lvl: 20, main: "atk", subs: [{ s: "cd", v: 21.8 }, { s: "hpp", v: 4.7 }, { s: "er", v: 6.5 }, { s: "def", v: 19 }] },
      sands:  { lvl: 20, main: "hpp", subs: [{ s: "cd", v: 13.2 }, { s: "cr", v: 3.5 }, { s: "em", v: 40 }, { s: "atk", v: 18 }] },
      goblet: { lvl: 16, main: "dmg", subs: [{ s: "cr", v: 10.5 }, { s: "hpp", v: 9.3 }, { s: "def", v: 39 }, { s: "defp", v: 7.3 }] },
      circlet:{ lvl: 20, main: "cd", subs: [{ s: "cr", v: 7.0 }, { s: "hpp", v: 5.2 }, { s: "atk", v: 33 }, { s: "er", v: 5.2 }] },
    },
  };
  t[1] = {
    ...blankBuild(), charId: "xingqiu", weapon: "Sacrificial Sword",
    talents: { na: 1, skill: 8, burst: 9 }, setA: "Emblem of Severed Fate", setAn: 4, setB: "",
    pieces: {
      flower: { lvl: 20, main: "hp", subs: [{ s: "er", v: 16.8 }, { s: "cd", v: 14.0 }, { s: "atkp", v: 5.8 }, { s: "def", v: 21 }] },
      plume:  { lvl: 20, main: "atk", subs: [{ s: "er", v: 11.7 }, { s: "cr", v: 6.6 }, { s: "cd", v: 7.8 }, { s: "hp", v: 269 }] },
      sands:  { lvl: 20, main: "er", subs: [{ s: "cd", v: 15.5 }, { s: "atkp", v: 9.3 }, { s: "em", v: 21 }, { s: "def", v: 44 }] },
      goblet: { lvl: 20, main: "dmg", subs: [{ s: "cd", v: 12.4 }, { s: "er", v: 5.8 }, { s: "hpp", v: 4.7 }, { s: "atk", v: 16 }] },
      circlet:{ lvl: 20, main: "cd", subs: [{ s: "cr", v: 9.7 }, { s: "er", v: 6.5 }, { s: "atkp", v: 5.3 }, { s: "hp", v: 448 }] },
    },
  };
  t[2] = {
    ...blankBuild(), charId: "kazuha", weapon: "Iron Sting",
    talents: { na: 1, skill: 6, burst: 8 }, setA: "Viridescent Venerer", setAn: 4, setB: "",
    pieces: {
      flower: { lvl: 20, main: "hp", subs: [{ s: "em", v: 63 }, { s: "er", v: 11.0 }, { s: "atkp", v: 4.7 }, { s: "def", v: 23 }] },
      plume:  { lvl: 20, main: "atk", subs: [{ s: "em", v: 40 }, { s: "er", v: 12.3 }, { s: "cd", v: 7.0 }, { s: "hpp", v: 4.1 }] },
      sands:  { lvl: 20, main: "em", subs: [{ s: "er", v: 16.2 }, { s: "cr", v: 6.2 }, { s: "atk", v: 31 }, { s: "hp", v: 508 }] },
      goblet: { lvl: 20, main: "em", subs: [{ s: "em", v: 21 }, { s: "er", v: 10.4 }, { s: "defp", v: 13.1 }, { s: "atkp", v: 5.3 }] },
      circlet:{ lvl: 12, main: "em", subs: [{ s: "cr", v: 5.8 }, { s: "cd", v: 7.8 }, { s: "hp", v: 209 }, { s: "def", v: 32 }] },
    },
  };
  t[3] = {
    ...blankBuild(), charId: "bennett", weapon: "Favonius Sword",
    talents: { na: 1, skill: 6, burst: 9 }, setA: "Noblesse Oblige", setAn: 4, setB: "",
    pieces: {
      flower: { lvl: 20, main: "hp", subs: [{ s: "er", v: 18.1 }, { s: "hpp", v: 9.9 }, { s: "atk", v: 35 }, { s: "def", v: 19 }] },
      plume:  { lvl: 20, main: "atk", subs: [{ s: "er", v: 13.0 }, { s: "cr", v: 7.4 }, { s: "em", v: 19 }, { s: "def", v: 44 }] },
      sands:  { lvl: 20, main: "er", subs: [{ s: "hpp", v: 10.5 }, { s: "atkp", v: 8.2 }, { s: "cd", v: 7.0 }, { s: "def", v: 23 }] },
      goblet: { lvl: 20, main: "atkp", subs: [{ s: "er", v: 11.7 }, { s: "hpp", v: 5.2 }, { s: "cr", v: 3.5 }, { s: "atk", v: 27 }] },
      circlet:{ lvl: 20, main: "heal", subs: [{ s: "er", v: 12.3 }, { s: "hpp", v: 4.7 }, { s: "cd", v: 6.2 }, { s: "def", v: 37 }] },
    },
  };
  return t;
}

// Componentes 

function Beam({ cr, cd }) {
  const ratio = cr > 0 ? cd / cr : 0;
  const tilt = Math.max(-15, Math.min(15, (ratio - 2) * 7));
  return (
    <div className="beam">
      <div className="beam-lbl"><span>Crítico {cr.toFixed(1)}%</span><span>Dano Crít {cd.toFixed(1)}%</span></div>
      <svg viewBox="0 0 240 46" className="beam-svg" aria-hidden="true">
        <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "120px 22px", transition: "transform .5s cubic-bezier(.2,.8,.2,1)" }}>
          <line x1="24" y1="22" x2="216" y2="22" stroke="var(--brass)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="22" r="7" fill="var(--brass)" opacity=".85" />
          <circle cx="216" cy="22" r="7" fill="var(--brass)" opacity=".85" />
        </g>
        <path d="M120 22 L112 40 L128 40 Z" fill="var(--muted)" />
      </svg>
      <p className="beam-note">
        {cr < 40 ? "Sem dados suficientes para julgar a proporção."
          : ratio > 2.8 ? "Pendendo para Dano Crítico — falta Crítico%."
          : ratio < 1.5 ? "Pendendo para Crítico% — falta Dano Crítico."
          : "Equilibrado. Proporção próxima de 1:2."}
      </p>
    </div>
  );
}

function Issue({ i }) {
  const label = { crit: "Corrigir", warn: "Ajustar", tip: "Nota", ok: "Certo" }[i.sev];
  return (
    <li className={`iss iss-${i.sev}`}>
      <span className="iss-tag">{label}</span>
      <span className="iss-area">{i.area}</span>
      <span className="iss-msg">{i.msg}</span>
    </li>
  );
}

function Sel({ value, onChange, children, ...r }) {
  return <select className="fld" value={value} onChange={(e) => onChange(e.target.value)} {...r}>{children}</select>;
}

function PieceEditor({ slot, p, onChange, char, setName }) {
  const want = char && !slot.fixed ? char.main[slot.k] : null;
  const set = (patch) => onChange({ ...p, ...patch });
  const setSub = (idx, patch) => {
    const subs = p.subs.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    onChange({ ...p, subs });
  };
  const r = char ? pieceRolls(p, char.subs) : null;
  const usedSubs = p.subs.map((s) => s.s).filter(Boolean);

  return (
    <section className="piece">
      <header className="piece-head">
        <span className="icon icon-art" data-ph={slot.n.slice(0, 2)}
          title={setName ? ASSETS.piece(setName, slot.k) : "Escolha um conjunto para carregar a arte"}>
          {setName && (
            <Img src={ASSETS.piece(setName, slot.k)} fallback={ASSETS.pieceAny(setName)}
              alt={`${slot.n} de ${setName}`} />
          )}
        </span>
        <h4>{slot.n}</h4>
        {r && r.total > 0 && (
          <div className="rv" title="Proporção de rolagens úteis">
            <div className="rv-bar"><i style={{ width: `${Math.round(r.ratio * 100)}%` }} /></div>
            <span>{Math.round(r.ratio * 100)}% úteis</span>
          </div>
        )}
      </header>

      <div className="piece-top">
        <label className="lab">
          <span>Status principal</span>
          {slot.fixed ? (
            <output className="fld fld-static">{MAIN_LABEL[slot.fixed]} (fixo)</output>
          ) : (
            <Sel value={p.main} onChange={(v) => set({ main: v })}>
              <option value="">—</option>
              {slot.mains.map((k) => (
                <option key={k} value={k}>
                  {k === "dmg" ? "Bônus de Dano Elemental%" : MAIN_LABEL[k]}
                  {want && want[0] === k ? "  ·  recomendado" : ""}
                </option>
              ))}
            </Sel>
          )}
        </label>
        <label className="lab lab-sm">
          <span>Nível</span>
          <input className="fld" type="number" min="0" max="20" value={p.lvl}
            onChange={(e) => set({ lvl: e.target.value })} />
        </label>
      </div>

      <div className="subs">
        {p.subs.map((s, i) => (
          <div className="sub" key={i}>
            <Sel value={s.s} onChange={(v) => setSub(i, { s: v })}>
              <option value="">substat {i + 1}</option>
              {SUB_KEYS.filter((k) => k === s.s || !usedSubs.includes(k)).map((k) => (
                <option key={k} value={k}>{SUB_LABEL[k]}</option>
              ))}
            </Sel>
            <input className="fld fld-num" type="number" step="0.1" placeholder="valor" value={s.v}
              onChange={(e) => setSub(i, { v: e.target.value })} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [team, setTeam] = useState(() => [blankBuild(), blankBuild(), blankBuild(), blankBuild()]);
  const [active, setActive] = useState(0);
  const [saveMsg, setSaveMsg] = useState("");
  const [janela, setJanela] = useState(20);
  const [inimigo, setInimigo] = useState({ nivel: 100, res: 10 });

  const dps = useMemo(() => {
    const comRotacao = [], semRotacao = [];
    team.forEach((b) => {
      const ch = CHAR_BY_ID[b.charId];
      if (!ch) return;
      const r = dpsDoMembro(b, janela, inimigo);
      if (r) comRotacao.push({ ...r, id: ch.id, nome: ch.n, el: ch.el });
      else semRotacao.push(ch.n);
    });
    comRotacao.sort((a, z) => z.dps - a.dps);
    return {
      comRotacao, semRotacao,
      totalDps: comRotacao.reduce((a, r) => a + r.dps, 0),
      maxDps: Math.max(1, ...comRotacao.map((r) => r.dps)),
    };
  }, [team, janela, inimigo]);

  const b = team[active];
  const char = CHAR_BY_ID[b.charId];
  const report = useMemo(() => analyzeChar(b), [b]);
  const teamReport = useMemo(() => analyzeTeam(team), [team]);

  const update = (patch) => setTeam((t) => t.map((x, i) => (i === active ? { ...x, ...patch } : x)));
  const updatePiece = (k, p) => update({ pieces: { ...b.pieces, [k]: p } });

  /* Persistência: usa a API do Claude quando existe, senão localStorage.
     Assim o mesmo arquivo funciona publicado aqui e no seu próprio host. */
  const armazenar = {
    async ler() {
      if (typeof window !== "undefined" && window.storage) {
        const r = await window.storage.get("time-salvo");
        return r?.value ?? null;
      }
      return localStorage.getItem("time-salvo");
    },
    async gravar(v) {
      if (typeof window !== "undefined" && window.storage) return window.storage.set("time-salvo", v);
      localStorage.setItem("time-salvo", v);
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const v = await armazenar.ler();
        if (v) setTeam(JSON.parse(v));
      } catch { /* nada salvo ainda */ }
    })();
  }, []);

  const save = async () => {
    try {
      await armazenar.gravar(JSON.stringify(team));
      setSaveMsg("Time salvo.");
    } catch {
      setSaveMsg("Não foi possível salvar agora.");
    }
    setTimeout(() => setSaveMsg(""), 2500);
  };

  const sorted = report ? [...report.issues].sort((x, y) => SEV[y.sev] - SEV[x.sev]) : [];
  const counts = report ? report.issues.reduce((a, i) => ({ ...a, [i.sev]: (a[i.sev] || 0) + 1 }), {}) : {};

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .app{
          --abyss:#151A2B; --slate:#1E2540; --slate2:#28304F;
          --vellum:#EDE4CF; --vellum2:#E2D6BC;
          --brass:#C9A227; --brass-dim:#8B7223;
          --ink:#1B1C22; --muted:#7C86A6; --ink-soft:#4E4A42;
          --red:#C2412D; --amber:#C98A1E; --jade:#3F8E70;
          --el:#C9A227;
          font-family:'IBM Plex Sans',system-ui,sans-serif;
          background:var(--abyss); color:#E8EAF2; min-height:100vh;
          padding:22px 18px 48px; line-height:1.5;
        }
        .app *{box-sizing:border-box}
        .wrap{max-width:1180px;margin:0 auto}

        h1{font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:clamp(26px,4vw,40px);
           letter-spacing:-.02em;margin:0;color:var(--vellum)}
        .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.22em;
           text-transform:uppercase;color:var(--brass);margin:0 0 6px}
        .sub{color:var(--muted);font-size:14px;margin:8px 0 0;max-width:62ch}
        .top{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;
             border-bottom:1px solid var(--slate2);padding-bottom:20px;margin-bottom:22px}
        .tools{display:flex;gap:8px;flex-wrap:wrap}
        .btn{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
             background:transparent;color:var(--brass);border:1px solid var(--brass-dim);
             padding:9px 13px;border-radius:2px;cursor:pointer;transition:.18s}
        .btn:hover{background:var(--brass);color:var(--abyss);border-color:var(--brass)}
        .btn:focus-visible,.fld:focus-visible,.slot:focus-visible{outline:2px solid var(--brass);outline-offset:2px}
        .saved{font-size:12px;color:var(--jade);align-self:center;font-family:'IBM Plex Mono',monospace}

        /* ---- LOGO ---- */
        .logo{display:inline-flex;align-items:center;height:52px;margin-bottom:12px}
        .logo img{height:52px;width:auto;object-fit:contain;display:block}
        .logo:not(:has(img))::before{
          content:attr(data-ph);display:flex;align-items:center;padding:0 16px;height:100%;
          font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;color:var(--brass-dim);
          border:1px dashed var(--brass-dim);border-radius:2px}

        /* ---- CAIXAS DE ÍCONE (artefato / arma) ---- */
        .icon{position:relative;display:grid;place-items:center;flex:none;
              width:46px;height:46px;border-radius:3px;overflow:hidden;
              background:rgba(27,28,34,.055);border:1px solid rgba(27,28,34,.14)}
        .icon::after{content:attr(data-ph);font-family:'Fraunces',serif;font-size:17px;
              color:rgba(27,28,34,.24)}
        .icon img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
              background:#FBF7EC;padding:2px}
        .icon-wpn{width:40px;height:40px}
        .lab-wpn{display:grid;grid-template-columns:40px 1fr;grid-template-areas:"t t" "i s";
              gap:4px 8px;align-items:center}
        .lab-wpn>span:first-child{grid-area:t}
        .lab-wpn>.icon-wpn{grid-area:i}
        .lab-wpn>.fld{grid-area:s}

        .slots{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:22px}
        .slot{position:relative;text-align:left;background:var(--slate);border:1px solid var(--slate2);
              border-radius:3px;padding:13px 14px;cursor:pointer;transition:.18s;color:inherit;
              border-top:3px solid transparent;font:inherit}
        .slot:hover{background:var(--slate2)}
        .slot[data-on="1"]{background:var(--slate2);border-top-color:var(--el)}
        .slot-n{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;color:var(--muted);
                display:block;margin-bottom:5px}
        .slot-c{font-family:'Fraunces',serif;font-weight:600;font-size:16px;display:block;line-height:1.2}
        .slot-r{font-size:11px;color:var(--muted);display:block;margin-top:3px}
        .slot-s{position:absolute;top:11px;right:13px;font-family:'IBM Plex Mono',monospace;font-size:14px;font-weight:500}
        .slot{overflow:hidden}
        .slot-art{position:absolute;right:-8px;bottom:-10px;height:78px;width:auto;
                  object-fit:contain;opacity:.2;pointer-events:none;z-index:0;
                  -webkit-mask-image:linear-gradient(200deg,transparent,#000 60%);
                  mask-image:linear-gradient(200deg,transparent,#000 60%)}
        .slot[data-on="1"] .slot-art{opacity:.42}
        .slot>*:not(.slot-art){position:relative;z-index:1}

        .cols{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}

        .sheet{background:var(--vellum);color:var(--ink);border-radius:3px;padding:20px;
               box-shadow:0 12px 34px rgba(0,0,0,.34);position:relative;overflow:hidden}
        .sheet-art{position:absolute;top:0;right:0;height:100%;width:66%;object-fit:cover;
                   object-position:top center;z-index:0;pointer-events:none;
                   filter:saturate(.82)}
        .sheet-veil{position:absolute;inset:0;z-index:0;pointer-events:none;
          background:
            linear-gradient(96deg,var(--vellum) 30%,rgba(237,228,207,.94) 52%,rgba(237,228,207,.80) 100%),
            linear-gradient(to top,var(--vellum) 2%,transparent 26%)}
        .sheet>*:not(.sheet-art):not(.sheet-veil){position:relative;z-index:1}
        .sheet h2,.panel h2{font-family:'Fraunces',serif;font-size:13px;font-weight:600;letter-spacing:.14em;
               text-transform:uppercase;margin:0 0 16px;padding-bottom:9px;border-bottom:1px solid rgba(27,28,34,.16)}
        .panel h2{border-bottom-color:var(--slate2);color:var(--vellum)}

        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .grid3{display:grid;grid-template-columns:1.3fr 1.3fr .9fr;gap:10px;align-items:end}
        .bon{font-style:normal;color:var(--brass);font-weight:700}
        .ef{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--ink-soft);
            text-transform:none;letter-spacing:0;margin-top:2px}
        .lab{display:flex;flex-direction:column;gap:4px;font-size:11px;font-weight:600;
             letter-spacing:.07em;text-transform:uppercase;color:var(--ink-soft)}
        .lab-sm{max-width:88px}
        .fld{font-family:'IBM Plex Sans',sans-serif;font-size:13px;padding:7px 8px;border-radius:2px;
             border:1px solid rgba(27,28,34,.22);background:#FBF7EC;color:var(--ink);width:100%;
             text-transform:none;letter-spacing:0;font-weight:400}
        .fld-static{background:rgba(27,28,34,.05);color:var(--ink-soft)}
        .fld-num{max-width:78px}
        .tal{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}

        .piece{border-top:1px solid rgba(27,28,34,.14);padding-top:13px;margin-top:14px}
        .piece-head{display:flex;align-items:center;gap:11px;margin-bottom:9px}
        .piece-head h4{font-family:'Fraunces',serif;font-size:15px;font-weight:600;margin:0;margin-right:auto}
        .rv{display:flex;align-items:center;gap:7px;font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--ink-soft)}
        .rv-bar{width:64px;height:5px;background:rgba(27,28,34,.14);border-radius:3px;overflow:hidden}
        .rv-bar i{display:block;height:100%;background:var(--el);transition:width .3s}
        .piece-top{display:flex;gap:10px;align-items:flex-end}
        .piece-top .lab:first-child{flex:1}
        .subs{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:9px}
        .sub{display:flex;gap:5px}

        .panel{background:var(--slate);border:1px solid var(--slate2);border-radius:3px;padding:20px;
               position:sticky;top:18px}
        .score{display:flex;align-items:baseline;gap:12px;margin-bottom:4px}
        .score b{font-family:'Fraunces',serif;font-size:52px;font-weight:900;line-height:.9;color:var(--vellum)}
        .score small{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);letter-spacing:.1em}
        .tally{display:flex;gap:14px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);
               margin:10px 0 18px;flex-wrap:wrap}
        .tally b{color:var(--vellum);font-weight:500}

        .beam{margin:0 0 18px;padding:14px;background:rgba(0,0,0,.18);border-radius:3px}
        .beam-lbl{display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;
                  font-size:11px;color:var(--brass)}
        .beam-svg{width:100%;height:46px;display:block}
        .beam-note{font-size:12px;color:var(--muted);margin:2px 0 0;text-align:center}

        .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(84px,1fr));gap:9px;margin-bottom:18px}
        .stat{background:rgba(0,0,0,.18);padding:9px 10px;border-radius:2px}
        .stat span{display:block;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.13em;
                   text-transform:uppercase;color:var(--muted)}
        .stat b{font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:500;color:var(--vellum)}

        .iss-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
        .iss{display:grid;grid-template-columns:74px 92px 1fr;gap:11px;align-items:start;
             padding:11px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:13px}
        .iss-tag{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.13em;text-transform:uppercase;
                 padding:3px 0;border-left:3px solid;padding-left:8px}
        .iss-crit .iss-tag{border-color:var(--red);color:#EE8873}
        .iss-warn .iss-tag{border-color:var(--amber);color:#E5B455}
        .iss-tip .iss-tag{border-color:var(--muted);color:var(--muted)}
        .iss-ok .iss-tag{border-color:var(--jade);color:#63BE9C}
        .iss-area{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);padding-top:2px}
        .iss-msg{color:#D6DAE8}

        .empty{color:var(--muted);font-size:14px;padding:22px 0;text-align:center;
               border:1px dashed var(--slate2);border-radius:3px}
        .teamsec{margin-top:20px}
        .rec{font-size:12px;color:var(--ink-soft);margin:10px 0 0;padding:10px 12px;
             background:rgba(201,162,39,.13);border-left:2px solid var(--brass);border-radius:2px}
        .rec-warn{background:rgba(194,65,45,.11);border-left-color:var(--red)}
        .rec code{font-family:'IBM Plex Mono',monospace;font-size:11px;
             background:rgba(27,28,34,.09);padding:1px 4px;border-radius:2px}
        .dpssec{margin-top:22px;background:var(--slate);border:1px solid var(--slate2);
                border-radius:3px;padding:20px}
        .dpshead{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;flex-wrap:wrap}
        .dpshead h2{margin:0 0 6px;border:0;padding:0}
        .dpsctl{display:flex;gap:10px;margin-bottom:8px}
        .dpsctl .lab{color:var(--muted);max-width:92px}
        .dpsctl .fld{background:rgba(0,0,0,.25);color:var(--vellum);border-color:var(--slate2)}
        .dpstab{width:100%;border-collapse:collapse;margin-top:14px;font-size:13px}
        .dpstab th{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.13em;
                   text-transform:uppercase;color:var(--muted);text-align:left;font-weight:400;
                   padding:0 10px 8px 0;border-bottom:1px solid var(--slate2)}
        .dpstab td{padding:10px 10px 10px 0;border-bottom:1px solid rgba(255,255,255,.05);
                   color:#D6DAE8;vertical-align:middle}
        .dpstab .mono{font-family:'IBM Plex Mono',monospace;text-align:right}
        .dpstab .dim{color:var(--muted);text-align:left;font-size:11px}
        .dpstab .forte{color:var(--vellum);font-size:15px}
        .barcell{width:26%;padding-right:0!important}
        .barcell i{display:block;height:6px;border-radius:3px;min-width:2px;opacity:.75}
        .totrow td{border-bottom:0;padding-top:14px;color:var(--brass);
                   font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.1em;
                   text-transform:uppercase}
        .totrow .forte{color:var(--brass);font-size:17px;letter-spacing:0;text-transform:none}
        .dpsnote{font-size:12px;color:var(--muted);margin:12px 0 0;max-width:76ch}
        .dpssec code{font-family:'IBM Plex Mono',monospace;font-size:11px;
                     background:rgba(0,0,0,.3);padding:1px 5px;border-radius:2px;color:var(--brass)}
        @media (max-width:900px){
          .dpstab .barcell{display:none}
          .dpsctl{flex-wrap:wrap}
        }
        .setbox{margin-top:12px;padding:11px 13px;background:rgba(27,28,34,.055);
                border-left:2px solid var(--el);border-radius:2px}
        .setlbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.11em;
                text-transform:uppercase;color:var(--ink-soft);margin:0 0 6px}
        .setwarn{font-style:normal;color:var(--red);text-transform:none;letter-spacing:0}
        .settxt{font-size:12px;color:var(--ink-soft);margin:3px 0;line-height:1.45}
        .settxt b{font-weight:600}
        .settxt em{color:var(--jade);font-style:normal;font-size:11px}
        .ajbox{margin-top:12px;padding:12px 13px;background:rgba(201,162,39,.09);
               border:1px dashed var(--brass-dim);border-radius:2px}
        .ajlbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.11em;
               text-transform:uppercase;color:var(--ink-soft);margin:0 0 9px}
        .ajgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}
        .ajgrid .lab span{font-size:9px;letter-spacing:.04em}
        .ajnota{font-size:11px;color:var(--ink-soft);margin:9px 0 0;line-height:1.5;opacity:.85}
        @media (max-width:900px){ .ajgrid{grid-template-columns:repeat(2,1fr)} }
        .foot{margin-top:26px;padding-top:16px;border-top:1px solid var(--slate2);
              font-size:12px;color:var(--muted);max-width:74ch}
              font-size:12px;color:var(--muted);max-width:74ch}

        @media (max-width:900px){
          .grid3{grid-template-columns:1fr}
          .cols{grid-template-columns:1fr}
          .panel{position:static}
          .slots{grid-template-columns:repeat(2,1fr)}
          .iss{grid-template-columns:1fr;gap:4px}
          .subs{grid-template-columns:1fr}
        }
        @media (prefers-reduced-motion:reduce){
          .app *{transition:none!important;animation:none!important}
        }
      `}</style>

      <div className="wrap" style={{ "--el": char ? EL[char.el].c : "#C9A227" }}>
        <div className="top">
          <div>
            <span className="logo" data-ph="assets/logo/logo.png" title={ASSETS.logo()}>
              <Img src={ASSETS.logo()} alt="Logo do jogo" />
            </span>
            <p className="eyebrow">Ficha de campo · análise de equipe</p>
            <h1>O que consertar na sua build</h1>
            <p className="sub">
              Preencha arma, talentos e as cinco peças de cada membro. A ficha aponta status principal errado,
              substats desperdiçados, recarga insuficiente e o que falta na sinergia do time.
            </p>
          </div>
          <div className="tools">
            <button className="btn" onClick={() => setTeam(exampleTeam())}>Carregar exemplo</button>
            <button className="btn" onClick={save}>Salvar time</button>
            <button className="btn" onClick={() => setTeam([blankBuild(), blankBuild(), blankBuild(), blankBuild()])}>Limpar tudo</button>
            {saveMsg && <span className="saved">{saveMsg}</span>}
          </div>
        </div>

        <div className="slots">
          {team.map((x, i) => {
            const c = CHAR_BY_ID[x.charId];
            const rep = c ? analyzeChar(x) : null;
            return (
              <button key={i} className="slot" data-on={i === active ? "1" : "0"}
                style={{ "--el": c ? EL[c.el].c : "var(--brass)" }}
                onClick={() => setActive(i)} aria-pressed={i === active}>
                {c && <Img className="slot-art" src={ASSETS.avatar(c.id)} alt="" />}
                <span className="slot-n">Membro {i + 1}</span>
                <span className="slot-c" style={{ color: c ? EL[c.el].c : "var(--muted)" }}>
                  {c ? c.n : "vazio"}
                </span>
                <span className="slot-r">{c ? c.role : "escolher personagem"}</span>
                {rep && <span className="slot-s" style={{ color: rep.score === null ? "var(--muted)" : rep.score >= 80 ? "#63BE9C" : rep.score >= 55 ? "#E5B455" : "#EE8873" }}>{rep.score === null ? "?" : rep.score}</span>}
              </button>
            );
          })}
        </div>

        <div className="cols">
          {/* EDITOR */}
          <div className="sheet">
            {char && (
              <>
                <Img className="sheet-art" src={ASSETS.splash(char.id)} alt="" />
                <div className="sheet-veil" aria-hidden="true" />
              </>
            )}
            <h2>Membro {active + 1}</h2>
            <div className="grid3">
              <label className="lab">
                <span>Personagem</span>
                <Sel value={b.charId} onChange={(v) => update({ charId: v, weapon: "" })}>
                  <option value="">— escolher —</option>
                  {Object.keys(EL).map((el) => (
                    <optgroup key={el} label={EL[el].n}>
                      {CHARS.filter((c) => c.el === el)
                        .sort((a, z) => a.n.localeCompare(z.n))
                        .map((c) => (
                          <option key={c.id} value={c.id}>{c.n}{c.revisar ? "  (a confirmar)" : ""}</option>
                        ))}
                    </optgroup>
                  ))}
                </Sel>
              </label>
              <label className="lab lab-wpn">
                <span>Arma</span>
                <span className="icon icon-wpn" data-ph="⚔"
                  title={b.weapon ? ASSETS.weapon(b.weapon) : "Escolha uma arma para carregar a arte"}>
                  {b.weapon && <Img src={ASSETS.weapon(b.weapon)} alt={b.weapon} />}
                </span>
                <Sel value={b.weapon} onChange={(v) => update({ weapon: v })} disabled={!char}>
                  <option value="">{char ? "— escolher —" : "escolha o personagem"}</option>
                  {WEAPONS.filter((w) => !char || w.t === char.wt)
                    .sort((a, z) => {
                      const sg = char ? ASSINATURA[char.id] : null;
                      if (a.n === sg) return -1;
                      if (z.n === sg) return 1;
                      return z.r - a.r || a.n.localeCompare(z.n);
                    })
                    .map((w) => (
                      <option key={w.n} value={w.n}>
                        {char && ASSINATURA[char.id] === w.n ? "★ assinatura · " : ""}
                        {w.n} · {SUB_LABEL[w.s[0]]}
                      </option>
                    ))}
                </Sel>
              </label>
              <label className="lab">
                <span>Constelação</span>
                <Sel value={String(b.cons || 0)} onChange={(v) => update({ cons: Number(v) })} disabled={!char}>
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>
                      C{n}{n > 0 && consDe(b.charId).nomes[n - 1] ? ` · ${consDe(b.charId).nomes[n - 1]}` : ""}
                    </option>
                  ))}
                </Sel>
              </label>
            </div>

            <div className="tal">
              {["na", "skill", "burst"].map((k) => {
                const ef = char ? niveisEfetivos(b) : null;
                const bon = ef ? ef.bonus[k] : 0;
                return (
                  <label className="lab" key={k}>
                    <span>{TAL[k]}{bon ? <em className="bon"> +{bon}</em> : null}</span>
                    <input className="fld" type="number" min="1" max="10" value={b.talents[k]}
                      onChange={(e) => update({ talents: { ...b.talents, [k]: e.target.value } })} />
                    {bon ? <small className="ef">efetivo {ef[k]}</small> : null}
                  </label>
                );
              })}
            </div>

            <div className="grid2" style={{ marginTop: 12 }}>
              <label className="lab">
                <span>Conjunto principal</span>
                <Sel value={b.setA} onChange={(v) => update({ setA: v })}>
                  <option value="">— escolher —</option>
                  {SETS.map((s) => <option key={s} value={s}>{s}</option>)}
                </Sel>
              </label>
              <label className="lab">
                <span>Peças</span>
                <Sel value={String(b.setAn)} onChange={(v) => update({ setAn: Number(v) })}>
                  <option value="4">4 peças</option>
                  <option value="2">2 peças</option>
                </Sel>
              </label>
            </div>
            {b.setAn === 2 && (
              <label className="lab" style={{ marginTop: 10 }}>
                <span>Segundo conjunto (2 peças)</span>
                <Sel value={b.setB} onChange={(v) => update({ setB: v })}>
                  <option value="">— escolher —</option>
                  {SETS.map((s) => <option key={s} value={s}>{s}</option>)}
                </Sel>
              </label>
            )}

            {char && char.revisar && (
              <p className="rec rec-warn">
                Build de <b>{char.n}</b> ainda sem dados conferidos aqui. Os campos e as contas de
                Recarga e crítico funcionam, mas não vou recomendar conjunto nem status principal
                às cegas. Preencha o objeto <code>{char.id}</code> no array <code>CHARS</code>.
              </p>
            )}

            {char && !char.revisar && (
              <p className="rec">
                Alvo para {char.n}: Ampulheta <b>{char.main.sands.map((k) => MAIN_LABEL[k]).join("/")}</b> ·
                Cálice <b>{char.main.goblet.map((k) => (k === "dmg" ? `Dano de ${EL[char.el].n}%` : MAIN_LABEL[k])).join("/")}</b> ·
                Coroa <b>{char.main.circlet.map((k) => MAIN_LABEL[k]).join("/")}</b> ·
                Substats <b>{char.subs.map((k) => SUB_LABEL[k]).join(" > ")}</b> ·
                Recarga <b>~{Math.round(char.er * 100)}%</b>
              </p>
            )}

            {char && b.setA && CONJUNTOS[b.setA] && (
              <div className="setbox">
                <p className="setlbl">
                  {b.setAn === 4 ? "4 peças" : "2 peças"} · {b.setA}
                  {CONJUNTOS[b.setA].el && CONJUNTOS[b.setA].el !== char.el && (
                    <em className="setwarn"> bônus de {EL[CONJUNTOS[b.setA].el].n} não vale para {char.n}</em>
                  )}
                </p>
                <p className="settxt"><b>2pc:</b> {CONJUNTOS[b.setA].t2} <em>— já entra na conta</em></p>
                {b.setAn === 4 && (
                  <p className="settxt"><b>4pc:</b> {CONJUNTOS[b.setA].t4}</p>
                )}
              </div>
            )}

            {char && DANO[b.charId] && (
              <div className="ajbox">
                <p className="ajlbl">Ajustes manuais — 4 peças condicional, buffs de time, comida</p>
                <div className="ajgrid">
                  {[["dmg", "Bônus dano %"], ["atkp", "ATQ %"], ["cr", "Crítico %"],
                    ["cd", "Dano Crít %"], ["em", "Proficiência"]].map(([k, lbl]) => (
                    <label className="lab" key={k}>
                      <span>{lbl}</span>
                      <input className="fld" type="number" step="1"
                        value={(b.ajustes || {})[k] ?? 0}
                        onChange={(e) => update({ ajustes: { ...(b.ajustes || {}), [k]: Number(e.target.value) || 0 } })} />
                    </label>
                  ))}
                </div>
                <p className="ajnota">
                  Leia o 4pc acima e some aqui o que estiver ativo na sua rotação. Eu não
                  automatizo isso porque quase todo 4pc tem condição, e só você sabe se ela
                  está de pé no seu jogo.
                </p>
              </div>
            )}

            {SLOTS.map((s) => (
              <PieceEditor key={s.k} slot={s} p={b.pieces[s.k]} char={char}
                setName={b.setA} onChange={(p) => updatePiece(s.k, p)} />
            ))}
          </div>

          {/* DIAGNÓSTICO */}
          <div className="panel">
            <h2>Diagnóstico</h2>
            {!report ? (
              <p className="empty">Escolha um personagem para começar a análise.</p>
            ) : (
              <>
                <div className="score">
                  <b>{report.score === null ? "—" : report.score}</b>
                  <small>{report.score === null ? `sem nota · ${report.ch.n}` : `de 100 · ${report.ch.n}`}</small>
                </div>
                <div className="tally">
                  <span><b>{counts.crit || 0}</b> para corrigir</span>
                  <span><b>{counts.warn || 0}</b> para ajustar</span>
                  <span><b>{counts.tip || 0}</b> notas</span>
                </div>

                {(report.ch.subs.includes("cr") || report.ch.subs.includes("cd")) &&
                  <Beam cr={report.totals.cr} cd={report.totals.cd} />}

                <div className="stats">
                  <div className="stat"><span>Recarga</span><b>{report.totals.er.toFixed(0)}%</b></div>
                  <div className="stat"><span>Proficiência</span><b>{report.totals.em.toFixed(0)}</b></div>
                  <div className="stat"><span>HP%</span><b>{report.totals.hpp.toFixed(0)}</b></div>
                  <div className="stat"><span>ATQ%</span><b>{report.totals.atkp.toFixed(0)}</b></div>
                  <div className="stat"><span>DEF%</span><b>{report.totals.defp.toFixed(0)}</b></div>
                </div>

                <ul className="iss-list">
                  {sorted.map((i, k) => <Issue key={k} i={i} />)}
                </ul>
              </>
            )}

            <div className="teamsec">
              <h2>Sinergia do time</h2>
              {teamReport.length === 0 ? (
                <p className="empty">Preencha pelo menos dois membros.</p>
              ) : (
                <ul className="iss-list">
                  {[...teamReport].sort((x, y) => SEV[y.sev] - SEV[x.sev]).map((i, k) => <Issue key={k} i={i} />)}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="dpssec">
          <div className="dpshead">
            <h2>DPS da composição</h2>
            <div className="dpsctl">
              <label className="lab lab-sm">
                <span>Janela (s)</span>
                <input className="fld" type="number" min="1" max="600" value={janela}
                  onChange={(e) => setJanela(Math.max(1, Number(e.target.value) || 1))} />
              </label>
              <label className="lab lab-sm">
                <span>Nível inimigo</span>
                <input className="fld" type="number" min="1" max="110" value={inimigo.nivel}
                  onChange={(e) => setInimigo({ ...inimigo, nivel: Number(e.target.value) || 0 })} />
              </label>
              <label className="lab lab-sm">
                <span>RES (%)</span>
                <input className="fld" type="number" min="-100" max="90" value={inimigo.res}
                  onChange={(e) => setInimigo({ ...inimigo, res: Number(e.target.value) || 0 })} />
              </label>
            </div>
          </div>

          {dps.comRotacao.length === 0 ? (
            <p className="empty">
              Nenhum membro do time tem rotação definida ainda. Rotações ficam em{" "}
              <code>ROTACOES</code>, no topo do arquivo — hoje só a Hu Tao está lá, como exemplo.
              Depois de adicionar, rode <code>node gerar-dados.cjs</code>.
            </p>
          ) : (
            <>
              <table className="dpstab">
                <thead>
                  <tr><th>Membro</th><th>Rotação</th><th>Dano/ciclo</th><th>Total na janela</th><th>DPS</th><th></th></tr>
                </thead>
                <tbody>
                  {dps.comRotacao.map((r) => (
                    <tr key={r.id}>
                      <td><b style={{ color: EL[r.el].c }}>{r.nome}</b></td>
                      <td className="mono dim">{r.tempo}s · {r.nota || "—"}</td>
                      <td className="mono">{Math.round(r.porCiclo).toLocaleString("pt-BR")}</td>
                      <td className="mono">{Math.round(r.total).toLocaleString("pt-BR")}</td>
                      <td className="mono forte">{Math.round(r.dps).toLocaleString("pt-BR")}</td>
                      <td className="barcell">
                        <i style={{ width: `${(r.dps / dps.maxDps) * 100}%`, background: EL[r.el].c }} />
                      </td>
                    </tr>
                  ))}
                  <tr className="totrow">
                    <td colSpan={4}>Total do time</td>
                    <td className="mono forte">{Math.round(dps.totalDps).toLocaleString("pt-BR")}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

              {dps.semRotacao.length > 0 && (
                <p className="dpsnote">
                  Fora da conta por não ter rotação definida: {dps.semRotacao.join(", ")}.
                </p>
              )}
              <p className="dpsnote">
                Média de crítico. Não inclui bônus de conjunto, buffs de time nem reações. Serve para comparar
                builds do mesmo personagem, não para prever dano real em combate.
              </p>
            </>
          )}
        </div>

        <p className="foot">
          Os valores de status principal são calculados para artefatos 5★ no nível informado. A análise cobre
          arquétipos consolidados: times muito específicos (Nilou Bloom, Hyperbloom, Mono Geo) mudam algumas
          prioridades, e as notas por personagem apontam isso quando é o caso.
        </p>
      </div>
    </div>
  );
}
