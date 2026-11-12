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
| Armas | 123 |
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

## Armas (123)

| arquivo | Arma | Tipo |
| --- | --- | --- |
| `alley-hunter.png` | Alley Hunter | Arco ★★★★ |
| `amos-bow.png` | Amos' Bow | Arco ★★★★★ |
| `aqua-simulacra.png` | Aqua Simulacra | Arco ★★★★★ |
| `astral-vultures-crimson-plumage.png` | Astral Vulture's Crimson Plumage | Arco ★★★★★ |
| `elegy-for-the-end.png` | Elegy for the End | Arco ★★★★★ |
| `fading-twilight.png` | Fading Twilight | Arco ★★★★ |
| `favonius-warbow.png` | Favonius Warbow | Arco ★★★★ |
| `golden-frostbound-oath.png` | Golden Frostbound Oath | Arco ★★★★★ |
| `hunters-path.png` | Hunter's Path | Arco ★★★★★ |
| `polar-star.png` | Polar Star | Arco ★★★★★ |
| `prototype-crescent.png` | Prototype Crescent | Arco ★★★★ |
| `rust.png` | Rust | Arco ★★★★ |
| `sacrificial-bow.png` | Sacrificial Bow | Arco ★★★★ |
| `scion-of-the-blazing-sun.png` | Scion of the Blazing Sun | Arco ★★★★ |
| `silvershower-heartstrings.png` | Silvershower Heartstrings | Arco ★★★★★ |
| `skyward-harp.png` | Skyward Harp | Arco ★★★★★ |
| `stringless.png` | Stringless | Arco ★★★★ |
| `the-daybreak-chronicles.png` | The Daybreak Chronicles | Arco ★★★★★ |
| `the-first-great-magic.png` | The First Great Magic | Arco ★★★★★ |
| `thundering-pulse.png` | Thundering Pulse | Arco ★★★★★ |
| `a-thousand-floating-dreams.png` | A Thousand Floating Dreams | Catalisador ★★★★★ |
| `angelos-heptades.png` | Angelos' Heptades | Catalisador ★★★★★ |
| `ballad-of-the-boundless-blue.png` | Ballad of the Boundless Blue | Catalisador ★★★★ |
| `cashflow-supervision.png` | Cashflow Supervision | Catalisador ★★★★★ |
| `cranes-echoing-call.png` | Crane's Echoing Call | Catalisador ★★★★★ |
| `everlasting-moonglow.png` | Everlasting Moonglow | Catalisador ★★★★★ |
| `favonius-codex.png` | Favonius Codex | Catalisador ★★★★ |
| `flowing-purity.png` | Flowing Purity | Catalisador ★★★★ |
| `fruit-of-fulfillment.png` | Fruit of Fulfillment | Catalisador ★★★★ |
| `jadefalls-splendor.png` | Jadefall's Splendor | Catalisador ★★★★★ |
| `kaguras-verity.png` | Kagura's Verity | Catalisador ★★★★★ |
| `lost-prayer-to-the-sacred-winds.png` | Lost Prayer to the Sacred Winds | Catalisador ★★★★★ |
| `mappa-mare.png` | Mappa Mare | Catalisador ★★★★ |
| `memory-of-dust.png` | Memory of Dust | Catalisador ★★★★★ |
| `nightweavers-looking-glass.png` | Nightweaver's Looking Glass | Catalisador ★★★★★ |
| `nocturnes-curtain-call.png` | Nocturne's Curtain Call | Catalisador ★★★★★ |
| `oathsworn-eye.png` | Oathsworn Eye | Catalisador ★★★★ |
| `prototype-amber.png` | Prototype Amber | Catalisador ★★★★ |
| `reliquary-of-truth.png` | Reliquary of Truth | Catalisador ★★★★★ |
| `sacrificial-fragments.png` | Sacrificial Fragments | Catalisador ★★★★ |
| `skyward-atlas.png` | Skyward Atlas | Catalisador ★★★★★ |
| `solar-pearl.png` | Solar Pearl | Catalisador ★★★★ |
| `starcallers-watch.png` | Starcaller's Watch | Catalisador ★★★★★ |
| `sunny-morning-sleep-in.png` | Sunny Morning Sleep-In | Catalisador ★★★★★ |
| `surfs-up.png` | Surf's Up | Catalisador ★★★★★ |
| `the-widsith.png` | The Widsith | Catalisador ★★★★ |
| `thrilling-tales-of-dragon-slayers.png` | Thrilling Tales of Dragon Slayers | Catalisador ★★★ |
| `tome-of-the-eternal-flow.png` | Tome of the Eternal Flow | Catalisador ★★★★★ |
| `tulaytullahs-remembrance.png` | Tulaytullah's Remembrance | Catalisador ★★★★★ |
| `vivid-notions.png` | Vivid Notions | Catalisador ★★★★★ |
| `wandering-evenstar.png` | Wandering Evenstar | Catalisador ★★★★ |
| `wine-and-song.png` | Wine and Song | Catalisador ★★★★ |
| `a-teaspoon-of-transcendence.png` | A Teaspoon of Transcendence | Espada grande ★★★★★ |
| `a-thousand-blazing-suns.png` | A Thousand Blazing Suns | Espada grande ★★★★★ |
| `beacon-of-the-reed-sea.png` | Beacon of the Reed Sea | Espada grande ★★★★★ |
| `fang-of-the-mountain-king.png` | Fang of the Mountain King | Espada grande ★★★★★ |
| `favonius-greatsword.png` | Favonius Greatsword | Espada grande ★★★★ |
| `gest-of-the-mighty-wolf.png` | Gest of the Mighty Wolf | Espada grande ★★★★★ |
| `katsuragikiri-nagamasa.png` | Katsuragikiri Nagamasa | Espada grande ★★★★ |
| `makhaira-aquamarine.png` | Makhaira Aquamarine | Espada grande ★★★★ |
| `prototype-archaic.png` | Prototype Archaic | Espada grande ★★★★ |
| `rainslasher.png` | Rainslasher | Espada grande ★★★★ |
| `redhorn-stonethresher.png` | Redhorn Stonethresher | Espada grande ★★★★★ |
| `sacrificial-greatsword.png` | Sacrificial Greatsword | Espada grande ★★★★ |
| `serpent-spine.png` | Serpent Spine | Espada grande ★★★★ |
| `skyward-pride.png` | Skyward Pride | Espada grande ★★★★★ |
| `song-of-broken-pines.png` | Song of Broken Pines | Espada grande ★★★★★ |
| `the-unforged.png` | The Unforged | Espada grande ★★★★★ |
| `ultimate-overlords-mega-magic-sword.png` | Ultimate Overlord's Mega Magic Sword | Espada grande ★★★★ |
| `verdict.png` | Verdict | Espada grande ★★★★★ |
| `whiteblind.png` | Whiteblind | Espada grande ★★★★ |
| `wolfs-gravestone.png` | Wolf's Gravestone | Espada grande ★★★★★ |
| `ballad-of-the-fjords.png` | Ballad of the Fjords | Lança ★★★★ |
| `black-tassel.png` | Black Tassel | Lança ★★★ |
| `bloodsoaked-ruins.png` | Bloodsoaked Ruins | Lança ★★★★★ |
| `calamity-queller.png` | Calamity Queller | Lança ★★★★★ |
| `crimson-moons-semblance.png` | Crimson Moon's Semblance | Lança ★★★★★ |
| `deathmatch.png` | Deathmatch | Lança ★★★★ |
| `disaster-and-remorse.png` | Disaster and Remorse | Lança ★★★★★ |
| `dragons-bane.png` | Dragon's Bane | Lança ★★★★ |
| `engulfing-lightning.png` | Engulfing Lightning | Lança ★★★★★ |
| `favonius-lance.png` | Favonius Lance | Lança ★★★★ |
| `fractured-halo.png` | Fractured Halo | Lança ★★★★★ |
| `kitain-cross-spear.png` | Kitain Cross Spear | Lança ★★★★ |
| `lumidouce-elegy.png` | Lumidouce Elegy | Lança ★★★★★ |
| `missive-windspear.png` | Missive Windspear | Lança ★★★★ |
| `moonpiercer.png` | Moonpiercer | Lança ★★★★ |
| `primordial-jade-winged-spear.png` | Primordial Jade Winged-Spear | Lança ★★★★★ |
| `prospectors-drill.png` | Prospector's Drill | Lança ★★★★ |
| `skyward-spine.png` | Skyward Spine | Lança ★★★★★ |
| `staff-of-homa.png` | Staff of Homa | Lança ★★★★★ |
| `staff-of-the-scarlet-sands.png` | Staff of the Scarlet Sands | Lança ★★★★★ |
| `symphonist-of-scents.png` | Symphonist of Scents | Lança ★★★★★ |
| `the-catch.png` | The Catch | Lança ★★★★ |
| `vortex-vanquisher.png` | Vortex Vanquisher | Lança ★★★★★ |
| `wavebreakers-fin.png` | Wavebreaker's Fin | Lança ★★★★ |
| `absolution.png` | Absolution | Espada ★★★★★ |
| `amenoma-kageuchi.png` | Amenoma Kageuchi | Espada ★★★★ |
| `aquila-favonia.png` | Aquila Favonia | Espada ★★★★★ |
| `athame-artis.png` | Athame Artis | Espada ★★★★★ |
| `azurelight.png` | Azurelight | Espada ★★★★★ |
| `cinnabar-spindle.png` | Cinnabar Spindle | Espada ★★★★ |
| `favonius-sword.png` | Favonius Sword | Espada ★★★★ |
| `festering-desire.png` | Festering Desire | Espada ★★★★ |
| `freedom-sworn.png` | Freedom-Sworn | Espada ★★★★★ |
| `haran-geppaku-futsu.png` | Haran Geppaku Futsu | Espada ★★★★★ |
| `harbinger-of-dawn.png` | Harbinger of Dawn | Espada ★★★ |
| `iron-sting.png` | Iron Sting | Espada ★★★★ |
| `key-of-khaj-nisut.png` | Key of Khaj-Nisut | Espada ★★★★★ |
| `light-of-foliar-incision.png` | Light of Foliar Incision | Espada ★★★★★ |
| `lightbearing-moonshard.png` | Lightbearing Moonshard | Espada ★★★★★ |
| `lions-roar.png` | Lion's Roar | Espada ★★★★ |
| `mistsplitter-reforged.png` | Mistsplitter Reforged | Espada ★★★★★ |
| `peak-patrol-song.png` | Peak Patrol Song | Espada ★★★★★ |
| `primordial-jade-cutter.png` | Primordial Jade Cutter | Espada ★★★★★ |
| `sacrificial-sword.png` | Sacrificial Sword | Espada ★★★★ |
| `sapwood-blade.png` | Sapwood Blade | Espada ★★★★ |
| `skyward-blade.png` | Skyward Blade | Espada ★★★★★ |
| `splendor-of-tranquil-waters.png` | Splendor of Tranquil Waters | Espada ★★★★★ |
| `summit-shaper.png` | Summit Shaper | Espada ★★★★★ |
| `the-black-sword.png` | The Black Sword | Espada ★★★★ |
| `uraku-misugiri.png` | Uraku Misugiri | Espada ★★★★★ |
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