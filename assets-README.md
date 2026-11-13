# assets/ — onde colocar as imagens

Esta pasta fica **ao lado do `index.html`**, na raiz do repositório.
Formato `.png`. Imagem que faltar vira espaço reservado; nada quebra.

```
repositorio/
├── index.html
└── assets/
    ├── logo/logo.png
    ├── personagens/
    │   ├── avatar/<id>.png     ícone nas abas dos 4 membros
    │   └── splash/<id>.png     arte grande, atrás do texto da ficha
    ├── armas/<slug>.png
    └── artefatos/<slug-conjunto>/
        ├── flower.png  plume.png  sands.png  goblet.png  circlet.png
        └── set.png     coringa, usado quando a peça específica falta
```

## Quantas imagens

| O quê | Quantas |
| --- | --- |
| Logo | 1 |
| Avatares | 129 |
| Splashes | 129 |
| Armas | 246 |
| Artefatos usando só `set.png` | 46 |
| **Total mínimo** | **428** |
| Artefatos recortando as 5 peças | 230 (total 612) |

Comece pelos avatares: são os que mais aparecem na tela.
Os artefatos com `set.png` só cortam 4 imagens por conjunto sem perda visível.

## Regra do nome

Minúsculas, apóstrofo removido, resto vira hífen.
`Wolf's Gravestone` → `wolfs-gravestone.png`

**Personagem com várias builds usa UMA imagem só.** "Amber Dps" e
"Amber Buff Support" são a mesma Amber, então o arquivo é `amber.png`.

## Personagens (129)

| arquivo | Personagem | Elemento |
| --- | --- | --- |
| `aino.png` | Aino | Hydro |
| `albedo.png` | Albedo | Geo |
| `alhaitham.png` | Alhaitham | Dendro |
| `aloy.png` | Aloy | Cryo |
| `alyosha.png` | Alyosha | Electro |
| `amber.png` | Amber | Pyro |
| `traveleranemo.png` | Anemo Traveler | Anemo |
| `itto.png` | Arataki Itto | Geo |
| `arlecchino.png` | Arlecchino | Pyro |
| `baizhu.png` | Baizhu | Dendro |
| `barbara.png` | Barbara | Hydro |
| `beidou.png` | Beidou | Electro |
| `bennett.png` | Bennett | Pyro |
| `candace.png` | Candace | Hydro |
| `charlotte.png` | Charlotte | Cryo |
| `chasca.png` | Chasca | Anemo |
| `chevreuse.png` | Chevreuse | Pyro |
| `chiori.png` | Chiori | Geo |
| `chongyun.png` | Chongyun | Cryo |
| `citlali.png` | Citlali | Cryo |
| `clorinde.png` | Clorinde | Electro |
| `collei.png` | Collei | Dendro |
| `columbina.png` | Columbina | Hydro |
| `travelercryo.png` | Cryo Traveler | Cryo |
| `cyno.png` | Cyno | Electro |
| `dahlia.png` | Dahlia | Hydro |
| `dehya.png` | Dehya | Pyro |
| `diluc.png` | Diluc | Pyro |
| `diona.png` | Diona | Cryo |
| `dori.png` | Dori | Electro |
| `durin.png` | Durin | Pyro |
| `travelerelectro.png` | Electro Traveler | Electro |
| `emilie.png` | Emilie | Dendro |
| `escoffier.png` | Escoffier | Cryo |
| `eula.png` | Eula | Cryo |
| `faruzan.png` | Faruzan | Anemo |
| `fischl.png` | Fischl | Electro |
| `flins.png` | Flins | Electro |
| `freminet.png` | Freminet | Cryo |
| `furina.png` | Furina | Hydro |
| `gaming.png` | Gaming | Pyro |
| `ganyu.png` | Ganyu | Cryo |
| `travelergeo.png` | Geo Traveler | Geo |
| `gorou.png` | Gorou | Geo |
| `hutao.png` | Hu Tao | Pyro |
| `travelerhydro.png` | Hydro Traveler | Hydro |
| `iansan.png` | Iansan | Electro |
| `ifa.png` | Ifa | Anemo |
| `illuga.png` | Illuga | Geo |
| `ineffa.png` | Ineffa | Electro |
| `jahoda.png` | Jahoda | Anemo |
| `jean.png` | Jean | Anemo |
| `kachina.png` | Kachina | Geo |
| `kazuha.png` | Kaedehara Kazuha | Anemo |
| `kaeya.png` | Kaeya | Cryo |
| `ayaka.png` | Kamisato Ayaka | Cryo |
| `ayato.png` | Kamisato Ayato | Hydro |
| `kaveh.png` | Kaveh | Dendro |
| `keqing.png` | Keqing | Electro |
| `kinich.png` | Kinich | Dendro |
| `kirara.png` | Kirara | Dendro |
| `klee.png` | Klee | Pyro |
| `kujousara.png` | Kujou Sara | Electro |
| `kuki.png` | Kuki Shinobu | Electro |
| `lanyan.png` | Lan Yan | Anemo |
| `lauma.png` | Lauma | Dendro |
| `layla.png` | Layla | Cryo |
| `linnea.png` | Linnea | Geo |
| `lisa.png` | Lisa | Electro |
| `lohen.png` | Lohen | Cryo |
| `lynette.png` | Lynette | Anemo |
| `lyney.png` | Lyney | Pyro |
| `manekin.png` | Manekin | Anemo |
| `mavuika.png` | Mavuika | Pyro |
| `mika.png` | Mika | Cryo |
| `mitya.png` | Mitya | Electro |
| `mona.png` | Mona | Hydro |
| `mualani.png` | Mualani | Hydro |
| `nahida.png` | Nahida | Dendro |
| `navia.png` | Navia | Geo |
| `nefer.png` | Nefer | Dendro |
| `neuvillette.png` | Neuvillette | Hydro |
| `nicole.png` | Nicole | Pyro |
| `nilou.png` | Nilou | Hydro |
| `ningguang.png` | Ningguang | Geo |
| `noelle.png` | Noelle | Geo |
| `odette.png` | Odette | Cryo |
| `ororon.png` | Ororon | Electro |
| `prune.png` | Prune | Anemo |
| `qiqi.png` | Qiqi | Cryo |
| `raiden.png` | Raiden Shogun | Electro |
| `razor.png` | Razor | Electro |
| `rosaria.png` | Rosaria | Cryo |
| `sandrone.png` | Sandrone | Cryo |
| `kokomi.png` | Sangonomiya Kokomi | Hydro |
| `sayu.png` | Sayu | Anemo |
| `sethos.png` | Sethos | Electro |
| `shenhe.png` | Shenhe | Cryo |
| `heizou.png` | Shikanoin Heizou | Anemo |
| `sigewinne.png` | Sigewinne | Hydro |
| `skirk.png` | Skirk | Cryo |
| `sucrose.png` | Sucrose | Anemo |
| `childe.png` | Tartaglia | Hydro |
| `thoma.png` | Thoma | Pyro |
| `tighnari.png` | Tighnari | Dendro |
| `varesa.png` | Varesa | Electro |
| `varka.png` | Varka | Anemo |
| `venti.png` | Venti | Anemo |
| `vesna.png` | Vesna | Anemo |
| `travelerdendro.png` | Viajante (Dendro) | Dendro |
| `travelerpyro.png` | Viajante (Pyro) | Pyro |
| `vodyanitsa.png` | Vodyanitsa | Hydro |
| `wanderer.png` | Wanderer | Anemo |
| `wriothesley.png` | Wriothesley | Cryo |
| `xiangling.png` | Xiangling | Pyro |
| `xianyun.png` | Xianyun | Anemo |
| `xiao.png` | Xiao | Anemo |
| `xilonen.png` | Xilonen | Geo |
| `xingqiu.png` | Xingqiu | Hydro |
| `xinyan.png` | Xinyan | Pyro |
| `yae.png` | Yae Miko | Electro |
| `yanfei.png` | Yanfei | Pyro |
| `yaoyao.png` | Yaoyao | Dendro |
| `yelan.png` | Yelan | Hydro |
| `yoimiya.png` | Yoimiya | Pyro |
| `mizuki.png` | Yumemizuki Mizuki | Anemo |
| `yunjin.png` | Yun Jin | Geo |
| `zhongli.png` | Zhongli | Geo |
| `zibai.png` | Zibai | Geo |

## Armas (246)

| arquivo | Arma | Tipo |
| --- | --- | --- |
| `alley-hunter.png` | Alley Hunter | Arco ★★★★ |
| `amos-bow.png` | Amos' Bow | Arco ★★★★★ |
| `aqua-simulacra.png` | Aqua Simulacra | Arco ★★★★★ |
| `astral-vultures-crimson-plumage.png` | Astral Vulture's Crimson Plumage | Arco ★★★★★ |
| `blackcliff-warbow.png` | Blackcliff Warbow | Arco ★★★★ |
| `breezeborne-refrain.png` | Breezeborne Refrain | Arco ★★★★ |
| `chain-breaker.png` | Chain Breaker | Arco ★★★★ |
| `cloudforged.png` | Cloudforged | Arco ★★★★ |
| `compound-bow.png` | Compound Bow | Arco ★★★★ |
| `covenant-of-frost-and-snow.png` | Covenant of Frost and Snow | Arco ★★★★ |
| `elegy-for-the-end.png` | Elegy for the End | Arco ★★★★★ |
| `end-of-the-line.png` | End of the Line | Arco ★★★★ |
| `fading-twilight.png` | Fading Twilight | Arco ★★★★ |
| `favonius-warbow.png` | Favonius Warbow | Arco ★★★★ |
| `flower-wreathed-feathers.png` | Flower-Wreathed Feathers | Arco ★★★★ |
| `golden-frostbound-oath.png` | Golden Frostbound Oath | Arco ★★★★★ |
| `hamayumi.png` | Hamayumi | Arco ★★★★ |
| `hunters-path.png` | Hunter's Path | Arco ★★★★★ |
| `ibis-piercer.png` | Ibis Piercer | Arco ★★★★ |
| `jade-vista.png` | Jade Vista | Arco ★★★★ |
| `kings-squire.png` | King's Squire | Arco ★★★★ |
| `messenger.png` | Messenger | Arco ★★★ |
| `mitternachts-waltz.png` | Mitternachts Waltz | Arco ★★★★ |
| `mouuns-moon.png` | Mouun's Moon | Arco ★★★★ |
| `polar-star.png` | Polar Star | Arco ★★★★★ |
| `predator.png` | Predator | Arco ★★★★ |
| `prototype-crescent.png` | Prototype Crescent | Arco ★★★★ |
| `rainbow-serpents-rain-bow.png` | Rainbow Serpent's Rain Bow | Arco ★★★★ |
| `range-gauge.png` | Range Gauge | Arco ★★★★ |
| `raven-bow.png` | Raven Bow | Arco ★★★ |
| `recurve-bow.png` | Recurve Bow | Arco ★★★ |
| `royal-bow.png` | Royal Bow | Arco ★★★★ |
| `rust.png` | Rust | Arco ★★★★ |
| `sacrificial-bow.png` | Sacrificial Bow | Arco ★★★★ |
| `scion-of-the-blazing-sun.png` | Scion of the Blazing Sun | Arco ★★★★ |
| `sequence-of-solitude.png` | Sequence of Solitude | Arco ★★★★ |
| `sharpshooters-oath.png` | Sharpshooter's Oath | Arco ★★★ |
| `silvershower-heartstrings.png` | Silvershower Heartstrings | Arco ★★★★★ |
| `skyward-harp.png` | Skyward Harp | Arco ★★★★★ |
| `slingshot.png` | Slingshot | Arco ★★★ |
| `snare-hook.png` | Snare Hook | Arco ★★★★ |
| `song-of-stillness.png` | Song of Stillness | Arco ★★★★ |
| `the-daybreak-chronicles.png` | The Daybreak Chronicles | Arco ★★★★★ |
| `the-first-great-magic.png` | The First Great Magic | Arco ★★★★★ |
| `the-stringless.png` | The Stringless | Arco ★★★★ |
| `the-viridescent-hunt.png` | The Viridescent Hunt | Arco ★★★★ |
| `thundering-pulse.png` | Thundering Pulse | Arco ★★★★★ |
| `windblume-ode.png` | Windblume Ode | Arco ★★★★ |
| `a-thousand-floating-dreams.png` | A Thousand Floating Dreams | Catalisador ★★★★★ |
| `angelos-heptades.png` | Angelos' Heptades | Catalisador ★★★★★ |
| `ash-graven-drinking-horn.png` | Ash-Graven Drinking Horn | Catalisador ★★★★ |
| `ballad-of-the-boundless-blue.png` | Ballad of the Boundless Blue | Catalisador ★★★★ |
| `blackcliff-agate.png` | Blackcliff Agate | Catalisador ★★★★ |
| `blackmarrow-lantern.png` | Blackmarrow Lantern | Catalisador ★★★★ |
| `cashflow-supervision.png` | Cashflow Supervision | Catalisador ★★★★★ |
| `clash-of-kings.png` | Clash of Kings | Catalisador ★★★★ |
| `cranes-echoing-call.png` | Crane's Echoing Call | Catalisador ★★★★★ |
| `dawning-frost.png` | Dawning Frost | Catalisador ★★★★ |
| `dodoco-tales.png` | Dodoco Tales | Catalisador ★★★★ |
| `echoes-of-the-heart.png` | Echoes of the Heart | Catalisador ★★★★ |
| `emerald-orb.png` | Emerald Orb | Catalisador ★★★ |
| `etherlight-spindlelute.png` | Etherlight Spindlelute | Catalisador ★★★★ |
| `everlasting-moonglow.png` | Everlasting Moonglow | Catalisador ★★★★★ |
| `eye-of-perception.png` | Eye of Perception | Catalisador ★★★★ |
| `favonius-codex.png` | Favonius Codex | Catalisador ★★★★ |
| `flowing-purity.png` | Flowing Purity | Catalisador ★★★★ |
| `frostbearer.png` | Frostbearer | Catalisador ★★★★ |
| `fruit-of-fulfillment.png` | Fruit of Fulfillment | Catalisador ★★★★ |
| `hakushin-ring.png` | Hakushin Ring | Catalisador ★★★★ |
| `hymn-of-the-maelstrom.png` | Hymn of the Maelstrom | Catalisador ★★★★★ |
| `jadefalls-splendor.png` | Jadefall's Splendor | Catalisador ★★★★★ |
| `kaguras-verity.png` | Kagura's Verity | Catalisador ★★★★★ |
| `lost-prayer-to-the-sacred-winds.png` | Lost Prayer to the Sacred Winds | Catalisador ★★★★★ |
| `magic-guide.png` | Magic Guide | Catalisador ★★★ |
| `mappa-mare.png` | Mappa Mare | Catalisador ★★★★ |
| `memory-of-dust.png` | Memory of Dust | Catalisador ★★★★★ |
| `nightweavers-looking-glass.png` | Nightweaver's Looking Glass | Catalisador ★★★★★ |
| `nocturnes-curtain-call.png` | Nocturne's Curtain Call | Catalisador ★★★★★ |
| `oathsworn-eye.png` | Oathsworn Eye | Catalisador ★★★★ |
| `otherworldly-story.png` | Otherworldly Story | Catalisador ★★★ |
| `prototype-amber.png` | Prototype Amber | Catalisador ★★★★ |
| `reliquary-of-truth.png` | Reliquary of Truth | Catalisador ★★★★★ |
| `ring-of-yaxche.png` | Ring of Yaxche | Catalisador ★★★★ |
| `royal-grimoire.png` | Royal Grimoire | Catalisador ★★★★ |
| `sacrificial-fragments.png` | Sacrificial Fragments | Catalisador ★★★★ |
| `sacrificial-jade.png` | Sacrificial Jade | Catalisador ★★★★ |
| `skyward-atlas.png` | Skyward Atlas | Catalisador ★★★★★ |
| `solar-pearl.png` | Solar Pearl | Catalisador ★★★★ |
| `starcallers-watch.png` | Starcaller's Watch | Catalisador ★★★★★ |
| `starsealed-edict.png` | Starsealed Edict | Catalisador ★★★★★ |
| `sunny-morning-sleep-in.png` | Sunny Morning Sleep-In | Catalisador ★★★★★ |
| `surfs-up.png` | Surf's Up | Catalisador ★★★★★ |
| `the-widsith.png` | The Widsith | Catalisador ★★★★ |
| `thrilling-tales-of-dragon-slayers.png` | Thrilling Tales of Dragon Slayers | Catalisador ★★★ |
| `tome-of-the-eternal-flow.png` | Tome of the Eternal Flow | Catalisador ★★★★★ |
| `tulaytullahs-remembrance.png` | Tulaytullah's Remembrance | Catalisador ★★★★★ |
| `twin-nephrite.png` | Twin Nephrite | Catalisador ★★★ |
| `vivid-notions.png` | Vivid Notions | Catalisador ★★★★★ |
| `wandering-evenstar.png` | Wandering Evenstar | Catalisador ★★★★ |
| `waveriding-whirl.png` | Waveriding Whirl | Catalisador ★★★★ |
| `wine-and-song.png` | Wine and Song | Catalisador ★★★★ |
| `winters-heavy-heart.png` | Winter's Heavy Heart | Catalisador ★★★★ |
| `ultimate-overlords-mega-magic-sword.png` | "Ultimate Overlord's Mega Magic Sword" | Espada grande ★★★★ |
| `a-teaspoon-of-transcendence.png` | A Teaspoon of Transcendence | Espada grande ★★★★★ |
| `a-thousand-blazing-suns.png` | A Thousand Blazing Suns | Espada grande ★★★★★ |
| `akuoumaru.png` | Akuoumaru | Espada grande ★★★★ |
| `beacon-of-the-reed-sea.png` | Beacon of the Reed Sea | Espada grande ★★★★★ |
| `blackcliff-slasher.png` | Blackcliff Slasher | Espada grande ★★★★ |
| `blade-of-atonement.png` | Blade of Atonement | Espada grande ★★★★ |
| `bloodtainted-greatsword.png` | Bloodtainted Greatsword | Espada grande ★★★ |
| `debate-club.png` | Debate Club | Espada grande ★★★ |
| `earth-shaker.png` | Earth Shaker | Espada grande ★★★★ |
| `fang-of-the-mountain-king.png` | Fang of the Mountain King | Espada grande ★★★★★ |
| `favonius-greatsword.png` | Favonius Greatsword | Espada grande ★★★★ |
| `ferrous-shadow.png` | Ferrous Shadow | Espada grande ★★★ |
| `flame-forged-insight.png` | Flame-Forged Insight | Espada grande ★★★★ |
| `forest-regalia.png` | Forest Regalia | Espada grande ★★★★ |
| `forged-by-the-golden-melody.png` | Forged by the Golden Melody | Espada grande ★★★★ |
| `fruitful-hook.png` | Fruitful Hook | Espada grande ★★★★ |
| `gest-of-the-mighty-wolf.png` | Gest of the Mighty Wolf | Espada grande ★★★★★ |
| `katsuragikiri-nagamasa.png` | Katsuragikiri Nagamasa | Espada grande ★★★★ |
| `lithic-blade.png` | Lithic Blade | Espada grande ★★★★ |
| `luxurious-sea-lord.png` | Luxurious Sea-Lord | Espada grande ★★★★ |
| `mailed-flower.png` | Mailed Flower | Espada grande ★★★★ |
| `makhaira-aquamarine.png` | Makhaira Aquamarine | Espada grande ★★★★ |
| `master-key.png` | Master Key | Espada grande ★★★★ |
| `portable-power-saw.png` | Portable Power Saw | Espada grande ★★★★ |
| `prototype-archaic.png` | Prototype Archaic | Espada grande ★★★★ |
| `rainslasher.png` | Rainslasher | Espada grande ★★★★ |
| `redhorn-stonethresher.png` | Redhorn Stonethresher | Espada grande ★★★★★ |
| `royal-greatsword.png` | Royal Greatsword | Espada grande ★★★★ |
| `sacrificial-greatsword.png` | Sacrificial Greatsword | Espada grande ★★★★ |
| `serpent-spine.png` | Serpent Spine | Espada grande ★★★★ |
| `skyrider-greatsword.png` | Skyrider Greatsword | Espada grande ★★★ |
| `skyward-pride.png` | Skyward Pride | Espada grande ★★★★★ |
| `snow-tombed-starsilver.png` | Snow-Tombed Starsilver | Espada grande ★★★★ |
| `song-of-broken-pines.png` | Song of Broken Pines | Espada grande ★★★★★ |
| `talking-stick.png` | Talking Stick | Espada grande ★★★★ |
| `the-bell.png` | The Bell | Espada grande ★★★★ |
| `the-unforged.png` | The Unforged | Espada grande ★★★★★ |
| `tidal-shadow.png` | Tidal Shadow | Espada grande ★★★★ |
| `verdict.png` | Verdict | Espada grande ★★★★★ |
| `white-iron-greatsword.png` | White Iron Greatsword | Espada grande ★★★ |
| `whiteblind.png` | Whiteblind | Espada grande ★★★★ |
| `wolfs-gravestone.png` | Wolf's Gravestone | Espada grande ★★★★★ |
| `the-catch.png` | "The Catch" | Lança ★★★★ |
| `ballad-of-the-fjords.png` | Ballad of the Fjords | Lança ★★★★ |
| `black-tassel.png` | Black Tassel | Lança ★★★ |
| `blackcliff-pole.png` | Blackcliff Pole | Lança ★★★★ |
| `bloodsoaked-ruins.png` | Bloodsoaked Ruins | Lança ★★★★★ |
| `calamity-queller.png` | Calamity Queller | Lança ★★★★★ |
| `crescent-pike.png` | Crescent Pike | Lança ★★★★ |
| `crimson-moons-semblance.png` | Crimson Moon's Semblance | Lança ★★★★★ |
| `deathmatch.png` | Deathmatch | Lança ★★★★ |
| `dialogues-of-the-desert-sages.png` | Dialogues of the Desert Sages | Lança ★★★★ |
| `disaster-and-remorse.png` | Disaster and Remorse | Lança ★★★★★ |
| `dragons-bane.png` | Dragon's Bane | Lança ★★★★ |
| `dragonspine-spear.png` | Dragonspine Spear | Lança ★★★★ |
| `engulfing-lightning.png` | Engulfing Lightning | Lança ★★★★★ |
| `favonius-lance.png` | Favonius Lance | Lança ★★★★ |
| `footprint-of-the-rainbow.png` | Footprint of the Rainbow | Lança ★★★★ |
| `fractured-halo.png` | Fractured Halo | Lança ★★★★★ |
| `frostbreath.png` | Frostbreath | Lança ★★★★ |
| `halberd.png` | Halberd | Lança ★★★ |
| `kitain-cross-spear.png` | Kitain Cross Spear | Lança ★★★★ |
| `lithic-spear.png` | Lithic Spear | Lança ★★★★ |
| `lumidouce-elegy.png` | Lumidouce Elegy | Lança ★★★★★ |
| `missive-windspear.png` | Missive Windspear | Lança ★★★★ |
| `moonpiercer.png` | Moonpiercer | Lança ★★★★ |
| `mountain-bracing-bolt.png` | Mountain-Bracing Bolt | Lança ★★★★ |
| `primordial-jade-winged-spear.png` | Primordial Jade Winged-Spear | Lança ★★★★★ |
| `prospectors-drill.png` | Prospector's Drill | Lança ★★★★ |
| `prospectors-shovel.png` | Prospector's Shovel | Lança ★★★★ |
| `prototype-starglitter.png` | Prototype Starglitter | Lança ★★★★ |
| `rightful-reward.png` | Rightful Reward | Lança ★★★★ |
| `royal-spear.png` | Royal Spear | Lança ★★★★ |
| `sacrificers-staff.png` | Sacrificer's Staff | Lança ★★★★ |
| `skyward-spine.png` | Skyward Spine | Lança ★★★★★ |
| `song-of-the-vigil.png` | Song of the Vigil | Lança ★★★★ |
| `staff-of-homa.png` | Staff of Homa | Lança ★★★★★ |
| `staff-of-the-scarlet-sands.png` | Staff of the Scarlet Sands | Lança ★★★★★ |
| `symphonist-of-scents.png` | Symphonist of Scents | Lança ★★★★★ |
| `tamayuratei-no-ohanashi.png` | Tamayuratei no Ohanashi | Lança ★★★★ |
| `vortex-vanquisher.png` | Vortex Vanquisher | Lança ★★★★★ |
| `wavebreakers-fin.png` | Wavebreaker's Fin | Lança ★★★★ |
| `white-tassel.png` | White Tassel | Lança ★★★ |
| `absolution.png` | Absolution | Espada ★★★★★ |
| `amenoma-kageuchi.png` | Amenoma Kageuchi | Espada ★★★★ |
| `aquila-favonia.png` | Aquila Favonia | Espada ★★★★★ |
| `athame-artis.png` | Athame Artis | Espada ★★★★★ |
| `azurelight.png` | Azurelight | Espada ★★★★★ |
| `beyond-the-chrysalis.png` | Beyond the Chrysalis | Espada ★★★★★ |
| `blackcliff-longsword.png` | Blackcliff Longsword | Espada ★★★★ |
| `calamity-of-eshu.png` | Calamity of Eshu | Espada ★★★★ |
| `cinnabar-spindle.png` | Cinnabar Spindle | Espada ★★★★ |
| `cool-steel.png` | Cool Steel | Espada ★★★ |
| `dark-iron-sword.png` | Dark Iron Sword | Espada ★★★ |
| `emberwell.png` | Emberwell | Espada ★★★★ |
| `exaiphanes-blade.png` | Exaiphanes Blade | Espada ★★★★★ |
| `favonius-sword.png` | Favonius Sword | Espada ★★★★ |
| `festering-desire.png` | Festering Desire | Espada ★★★★ |
| `fillet-blade.png` | Fillet Blade | Espada ★★★ |
| `finale-of-the-deep.png` | Finale of the Deep | Espada ★★★★ |
| `fleuve-cendre-ferryman.png` | Fleuve Cendre Ferryman | Espada ★★★★ |
| `flute-of-ezpitzal.png` | Flute of Ezpitzal | Espada ★★★★ |
| `freedom-sworn.png` | Freedom-Sworn | Espada ★★★★★ |
| `haran-geppaku-futsu.png` | Haran Geppaku Futsu | Espada ★★★★★ |
| `harbinger-of-dawn.png` | Harbinger of Dawn | Espada ★★★ |
| `heretics-molten-blade.png` | Heretic's Molten Blade | Espada ★★★★ |
| `iron-sting.png` | Iron Sting | Espada ★★★★ |
| `kagotsurube-isshin.png` | Kagotsurube Isshin | Espada ★★★★ |
| `key-of-khaj-nisut.png` | Key of Khaj-Nisut | Espada ★★★★★ |
| `light-of-foliar-incision.png` | Light of Foliar Incision | Espada ★★★★★ |
| `lightbearing-moonshard.png` | Lightbearing Moonshard | Espada ★★★★★ |
| `lions-roar.png` | Lion's Roar | Espada ★★★★ |
| `mistsplitter-reforged.png` | Mistsplitter Reforged | Espada ★★★★★ |
| `moonweavers-dawn.png` | Moonweaver's Dawn | Espada ★★★★ |
| `new-bough.png` | New Bough | Espada ★★★★ |
| `peak-patrol-song.png` | Peak Patrol Song | Espada ★★★★★ |
| `primordial-jade-cutter.png` | Primordial Jade Cutter | Espada ★★★★★ |
| `prized-isshin-blade.png` | Prized Isshin Blade | Espada ★★★★ |
| `prized-isshin-blade.png` | Prized Isshin Blade | Espada ★★★★ |
| `prized-isshin-blade.png` | Prized Isshin Blade | Espada ★★★★ |
| `prototype-rancour.png` | Prototype Rancour | Espada ★★★★ |
| `royal-longsword.png` | Royal Longsword | Espada ★★★★ |
| `sacrificial-sword.png` | Sacrificial Sword | Espada ★★★★ |
| `sapwood-blade.png` | Sapwood Blade | Espada ★★★★ |
| `serenitys-call.png` | Serenity's Call | Espada ★★★★ |
| `silver-light.png` | Silver Light | Espada ★★★★ |
| `skyrider-sword.png` | Skyrider Sword | Espada ★★★ |
| `skyward-blade.png` | Skyward Blade | Espada ★★★★★ |
| `splendor-of-tranquil-waters.png` | Splendor of Tranquil Waters | Espada ★★★★★ |
| `sturdy-bone.png` | Sturdy Bone | Espada ★★★★ |
| `summit-shaper.png` | Summit Shaper | Espada ★★★★★ |
| `sword-of-descension.png` | Sword of Descension | Espada ★★★★ |
| `sword-of-narzissenkreuz.png` | Sword of Narzissenkreuz | Espada ★★★★ |
| `the-alley-flash.png` | The Alley Flash | Espada ★★★★ |
| `the-black-sword.png` | The Black Sword | Espada ★★★★ |
| `the-dockhands-assistant.png` | The Dockhand's Assistant | Espada ★★★★ |
| `the-flute.png` | The Flute | Espada ★★★★ |
| `toukabou-shigure.png` | Toukabou Shigure | Espada ★★★★ |
| `travelers-handy-sword.png` | Traveler's Handy Sword | Espada ★★★ |
| `uraku-misugiri.png` | Uraku Misugiri | Espada ★★★★★ |
| `whitelake-frostfeather.png` | Whitelake Frostfeather | Espada ★★★★★ |
| `wolf-fang.png` | Wolf-Fang | Espada ★★★★ |
| `xiphos-moonlight.png` | Xiphos' Moonlight | Espada ★★★★ |

## Conjuntos (46)

| pasta | Conjunto |
| --- | --- |
| `a-day-carved-from-rising-winds/` | A Day Carved From Rising Winds |
| `archaic-petra/` | Archaic Petra |
| `aubade-of-morningstar-and-moon/` | Aubade of Morningstar and Moon |
| `blizzard-strayer/` | Blizzard Strayer |
| `bloodstained-chivalry/` | Bloodstained Chivalry |
| `celestial-gift/` | Celestial Gift |
| `crimson-witch-of-flames/` | Crimson Witch of Flames |
| `deepwood-memories/` | Deepwood Memories |
| `desert-pavilion-chronicle/` | Desert Pavilion Chronicle |
| `disenchantment-in-deep-shadow/` | Disenchantment in Deep Shadow |
| `echoes-of-an-offering/` | Echoes of an Offering |
| `emblem-of-severed-fate/` | Emblem of Severed Fate |
| `finale-of-the-deep-galleries/` | Finale of the Deep Galleries |
| `flower-of-paradise-lost/` | Flower of Paradise Lost |
| `fragment-of-harmonic-whimsy/` | Fragment of Harmonic Whimsy |
| `gilded-dreams/` | Gilded Dreams |
| `gladiators-finale/` | Gladiator's Finale |
| `golden-troupe/` | Golden Troupe |
| `heart-of-depth/` | Heart of Depth |
| `heart-of-the-furnace/` | Heart of the Furnace |
| `husk-of-opulent-dreams/` | Husk of Opulent Dreams |
| `instructor/` | Instructor |
| `lavawalker/` | Lavawalker |
| `long-nights-oath/` | Long Night's Oath |
| `marechaussee-hunter/` | Marechaussee Hunter |
| `night-of-the-skys-unveiling/` | Night of the Sky's Unveiling |
| `nighttime-whispers-in-the-echoing-woods/` | Nighttime Whispers in the Echoing Woods |
| `noblesse-oblige/` | Noblesse Oblige |
| `nymphs-dream/` | Nymph's Dream |
| `obsidian-codex/` | Obsidian Codex |
| `ocean-hued-clam/` | Ocean-Hued Clam |
| `pale-flame/` | Pale Flame |
| `scarlet-proof/` | Scarlet Proof |
| `scroll-of-the-hero-of-cinder-city/` | Scroll of the Hero of Cinder City |
| `shimenawas-reminiscence/` | Shimenawa's Reminiscence |
| `silken-moons-serenade/` | Silken Moon's Serenade |
| `song-of-days-past/` | Song of Days Past |
| `tenacity-of-the-millelith/` | Tenacity of the Millelith |
| `the-exile/` | The Exile |
| `thundering-fury/` | Thundering Fury |
| `thundersoother/` | Thundersoother |
| `unfinished-reverie/` | Unfinished Reverie |
| `vermillion-hereafter/` | Vermillion Hereafter |
| `viridescent-venerer/` | Viridescent Venerer |
| `vourukashas-glow/` | Vourukasha's Glow |
| `wanderers-troupe/` | Wanderer's Troupe |

## Se as imagens ficarem fora do repositório

Mude `ASSETS.base` no topo do `.jsx` e rode `./build.sh`:

```js
base: "https://raw.githubusercontent.com/ZicaLucas/<repo>/main/assets",
```
## Aparências alternativas (42 arquivos extras)

Opcional. Sem elas o app usa a arte padrão.

| arquivo | personagem | aparência |
| --- | --- | --- |
| `traveleranemo-aether.png` | traveleranemo | Aether |
| `traveleranemo-lumine.png` | traveleranemo | Lumine |
| `travelergeo-aether.png` | travelergeo | Aether |
| `travelergeo-lumine.png` | travelergeo | Lumine |
| `travelerelectro-aether.png` | travelerelectro | Aether |
| `travelerelectro-lumine.png` | travelerelectro | Lumine |
| `travelerdendro-aether.png` | travelerdendro | Aether |
| `travelerdendro-lumine.png` | travelerdendro | Lumine |
| `travelerhydro-aether.png` | travelerhydro | Aether |
| `travelerhydro-lumine.png` | travelerhydro | Lumine |
| `travelerpyro-aether.png` | travelerpyro | Aether |
| `travelerpyro-lumine.png` | travelerpyro | Lumine |
| `travelercryo-aether.png` | travelercryo | Aether |
| `travelercryo-lumine.png` | travelercryo | Lumine |
| `amber-100-outrider.png` | amber | 100% Outrider |
| `ayaka-springbloom-missive.png` | ayaka | Springbloom Missive |
| `barbara-summertime-sparkle.png` | barbara | Summertime Sparkle |
| `bennett-adventures-in-blazing-hue.png` | bennett | Adventures in Blazing Hue |
| `charlotte-hurlock-variations.png` | charlotte | Hurlock Variations |
| `citlali-whispers-of-stars-and-smoke.png` | citlali | Whispers of Stars and Smoke |
| `diluc-red-dead-of-night.png` | diluc | Red Dead of Night |
| `durin-toward-the-distant-horizon.png` | durin | Toward the Distant Horizon |
| `fischl-ein-immernachtstraum.png` | fischl | Ein Immernachtstraum |
| `ganyu-twilight-blossom.png` | ganyu | Twilight Blossom |
| `hutao-cherries-snow-laden.png` | hutao | Cherries Snow-Laden |
| `jean-gunnhildrs-legacy.png` | jean | Gunnhildr's Legacy |
| `jean-sea-breeze-dandelion.png` | jean | Sea Breeze Dandelion |
| `kaeya-sailwind-shadow.png` | kaeya | Sailwind Shadow |
| `keqing-opulent-splendor.png` | keqing | Opulent Splendor |
| `kirara-phantom-in-boots.png` | kirara | Phantom in Boots |
| `klee-blossoming-starlight.png` | klee | Blossoming Starlight |
| `lisa-a-sobriquet-under-shade.png` | lisa | A Sobriquet Under Shade |
| `mona-pact-of-stars-and-moon.png` | mona | Pact of Stars and Moon |
| `neuvillette-melusent-gift.png` | neuvillette | Melusent Gift |
| `nilou-breeze-of-sabaa.png` | nilou | Breeze of Sabaa |
| `ningguang-orchids-evening-gown.png` | ningguang | Orchid's Evening Gown |
| `rosaria-to-the-churchs-free-spirit.png` | rosaria | To the Church's Free Spirit |
| `shenhe-frostflower-dew.png` | shenhe | Frostflower Dew |
| `xiangling-new-years-cheer.png` | xiangling | New Year's Cheer |
| `xingqiu-bamboo-rain.png` | xingqiu | Bamboo Rain |
| `yaoyao-rainlit-bamboo-reverie.png` | yaoyao | Rainlit Bamboo Reverie |
| `yelan-tranquil-banquet.png` | yelan | Tranquil Banquet |

Vale para as duas pastas, `avatar/` e `splash/`.

Os Viajantes **não têm arte padrão**: use `-aether` e `-lumine`, porque o app
sempre pede uma das duas. Os demais mantêm `<id>.png` como padrão e a skin é extra.