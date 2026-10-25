/* Service Worker – Giddi’s Kitchen Husch
   Cache-first für Spieldateien, Netzwerk-zuerst für die Startseite (Updates).
   Diese Datei wird mit der Liste aller Spieldateien erzeugt; bei neuen Assets VERSION erhöhen. */
const VERSION = 'kuechenrallye-v0.1.4';
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./lib/three/LICENSE",
  "./lib/three/three.module.min.js",
  "./lib/three/addons/loaders/GLTFLoader.js",
  "./lib/three/addons/utils/BufferGeometryUtils.js",
  "./lib/three/addons/utils/SkeletonUtils.js",
  "./assets/ui/ArrowBrownOuline16.png",
  "./assets/ui/ArrowBrownOuline19.png",
  "./assets/ui/CardRegular1_red.png",
  "./assets/ui/CardRegular1_wood.png",
  "./assets/ui/Checkbox2_checked.png",
  "./assets/ui/Checkbox2_unchecked.png",
  "./assets/ui/Container1.png",
  "./assets/ui/Container3.png",
  "./assets/ui/IconsDefault19_128px.png",
  "./assets/ui/IconsDefault25_128px.png",
  "./assets/ui/IconsDefault38_128px.png",
  "./assets/ui/IconsDefault39_128px.png",
  "./assets/ui/IconsDefault5_128px.png",
  "./assets/ui/ItemSlot1.png",
  "./assets/ui/ItemSlotSelected1.png",
  "./assets/ui/NoteContainerSimple.png",
  "./assets/ui/RoundButton1_white.png",
  "./assets/ui/RoundButton1_wood.png",
  "./assets/ui/SquareButton2_red.png",
  "./assets/ui/SquareButton2_white.png",
  "./assets/ui/SquareButton2_wood.png",
  "./assets/ui/WoodenContainer1.png",
  "./assets/ui/logo.png",
  "./assets/restaurant/bowl.bin",
  "./assets/restaurant/bowl.gltf",
  "./assets/restaurant/chair_A.bin",
  "./assets/restaurant/chair_A.gltf",
  "./assets/restaurant/chair_stool.bin",
  "./assets/restaurant/chair_stool.gltf",
  "./assets/restaurant/crate_buns.bin",
  "./assets/restaurant/crate_buns.gltf",
  "./assets/restaurant/crate_carrots.bin",
  "./assets/restaurant/crate_carrots.gltf",
  "./assets/restaurant/crate_cheese.bin",
  "./assets/restaurant/crate_cheese.gltf",
  "./assets/restaurant/crate_ham.bin",
  "./assets/restaurant/crate_ham.gltf",
  "./assets/restaurant/crate_lettuce.bin",
  "./assets/restaurant/crate_lettuce.gltf",
  "./assets/restaurant/crate_onions.bin",
  "./assets/restaurant/crate_onions.gltf",
  "./assets/restaurant/crate_potatoes.bin",
  "./assets/restaurant/crate_potatoes.gltf",
  "./assets/restaurant/crate_steak.bin",
  "./assets/restaurant/crate_steak.gltf",
  "./assets/restaurant/crate_tomatoes.bin",
  "./assets/restaurant/crate_tomatoes.gltf",
  "./assets/restaurant/cuttingboard.bin",
  "./assets/restaurant/cuttingboard.gltf",
  "./assets/restaurant/dishrack_plates.bin",
  "./assets/restaurant/dishrack_plates.gltf",
  "./assets/restaurant/floor_kitchen.bin",
  "./assets/restaurant/floor_kitchen.gltf",
  "./assets/restaurant/food_burger.bin",
  "./assets/restaurant/food_burger.gltf",
  "./assets/restaurant/food_dinner.bin",
  "./assets/restaurant/food_dinner.gltf",
  "./assets/restaurant/food_ingredient_bun.bin",
  "./assets/restaurant/food_ingredient_bun.gltf",
  "./assets/restaurant/food_ingredient_bun_bottom.bin",
  "./assets/restaurant/food_ingredient_bun_bottom.gltf",
  "./assets/restaurant/food_ingredient_bun_top.bin",
  "./assets/restaurant/food_ingredient_bun_top.gltf",
  "./assets/restaurant/food_ingredient_burger_cooked.bin",
  "./assets/restaurant/food_ingredient_burger_cooked.gltf",
  "./assets/restaurant/food_ingredient_burger_trash.bin",
  "./assets/restaurant/food_ingredient_burger_trash.gltf",
  "./assets/restaurant/food_ingredient_burger_uncooked.bin",
  "./assets/restaurant/food_ingredient_burger_uncooked.gltf",
  "./assets/restaurant/food_ingredient_carrot.bin",
  "./assets/restaurant/food_ingredient_carrot.gltf",
  "./assets/restaurant/food_ingredient_carrot_pieces.bin",
  "./assets/restaurant/food_ingredient_carrot_pieces.gltf",
  "./assets/restaurant/food_ingredient_cheese.bin",
  "./assets/restaurant/food_ingredient_cheese.gltf",
  "./assets/restaurant/food_ingredient_cheese_chopped.bin",
  "./assets/restaurant/food_ingredient_cheese_chopped.gltf",
  "./assets/restaurant/food_ingredient_cheese_slice.bin",
  "./assets/restaurant/food_ingredient_cheese_slice.gltf",
  "./assets/restaurant/food_ingredient_ham.bin",
  "./assets/restaurant/food_ingredient_ham.gltf",
  "./assets/restaurant/food_ingredient_ham_cooked.bin",
  "./assets/restaurant/food_ingredient_ham_cooked.gltf",
  "./assets/restaurant/food_ingredient_ham_trash.bin",
  "./assets/restaurant/food_ingredient_ham_trash.gltf",
  "./assets/restaurant/food_ingredient_lettuce.bin",
  "./assets/restaurant/food_ingredient_lettuce.gltf",
  "./assets/restaurant/food_ingredient_lettuce_chopped.bin",
  "./assets/restaurant/food_ingredient_lettuce_chopped.gltf",
  "./assets/restaurant/food_ingredient_lettuce_slice.bin",
  "./assets/restaurant/food_ingredient_lettuce_slice.gltf",
  "./assets/restaurant/food_ingredient_onion.bin",
  "./assets/restaurant/food_ingredient_onion.gltf",
  "./assets/restaurant/food_ingredient_onion_chopped.bin",
  "./assets/restaurant/food_ingredient_onion_chopped.gltf",
  "./assets/restaurant/food_ingredient_onion_rings.bin",
  "./assets/restaurant/food_ingredient_onion_rings.gltf",
  "./assets/restaurant/food_ingredient_potato.bin",
  "./assets/restaurant/food_ingredient_potato.gltf",
  "./assets/restaurant/food_ingredient_potato_chopped.bin",
  "./assets/restaurant/food_ingredient_potato_chopped.gltf",
  "./assets/restaurant/food_ingredient_potato_mashed.bin",
  "./assets/restaurant/food_ingredient_potato_mashed.gltf",
  "./assets/restaurant/food_ingredient_steak.bin",
  "./assets/restaurant/food_ingredient_steak.gltf",
  "./assets/restaurant/food_ingredient_steak_pieces.bin",
  "./assets/restaurant/food_ingredient_steak_pieces.gltf",
  "./assets/restaurant/food_ingredient_tomato.bin",
  "./assets/restaurant/food_ingredient_tomato.gltf",
  "./assets/restaurant/food_ingredient_tomato_slice.bin",
  "./assets/restaurant/food_ingredient_tomato_slice.gltf",
  "./assets/restaurant/food_ingredient_tomato_slices.bin",
  "./assets/restaurant/food_ingredient_tomato_slices.gltf",
  "./assets/restaurant/food_ingredient_vegetableburger_cooked.bin",
  "./assets/restaurant/food_ingredient_vegetableburger_cooked.gltf",
  "./assets/restaurant/food_ingredient_vegetableburger_uncooked.bin",
  "./assets/restaurant/food_ingredient_vegetableburger_uncooked.gltf",
  "./assets/restaurant/food_stew.bin",
  "./assets/restaurant/food_stew.gltf",
  "./assets/restaurant/food_vegetableburger.bin",
  "./assets/restaurant/food_vegetableburger.gltf",
  "./assets/restaurant/fridge_A.bin",
  "./assets/restaurant/fridge_A.gltf",
  "./assets/restaurant/fridge_B.bin",
  "./assets/restaurant/fridge_B.gltf",
  "./assets/restaurant/jar_A_medium.bin",
  "./assets/restaurant/jar_A_medium.gltf",
  "./assets/restaurant/jar_B_small.bin",
  "./assets/restaurant/jar_B_small.gltf",
  "./assets/restaurant/jar_C_large.bin",
  "./assets/restaurant/jar_C_large.gltf",
  "./assets/restaurant/ketchup.bin",
  "./assets/restaurant/ketchup.gltf",
  "./assets/restaurant/kitchencounter_straight_A.bin",
  "./assets/restaurant/kitchencounter_straight_A.gltf",
  "./assets/restaurant/kitchencounter_straight_B.bin",
  "./assets/restaurant/kitchencounter_straight_B.gltf",
  "./assets/restaurant/kitchentable_A.bin",
  "./assets/restaurant/kitchentable_A.gltf",
  "./assets/restaurant/kitchentable_B.bin",
  "./assets/restaurant/kitchentable_B.gltf",
  "./assets/restaurant/knife.bin",
  "./assets/restaurant/knife.gltf",
  "./assets/restaurant/lid_A.bin",
  "./assets/restaurant/lid_A.gltf",
  "./assets/restaurant/menu.bin",
  "./assets/restaurant/menu.gltf",
  "./assets/restaurant/mustard.bin",
  "./assets/restaurant/mustard.gltf",
  "./assets/restaurant/oven.bin",
  "./assets/restaurant/oven.gltf",
  "./assets/restaurant/pan_A.bin",
  "./assets/restaurant/pan_A.gltf",
  "./assets/restaurant/papertowel.bin",
  "./assets/restaurant/papertowel.gltf",
  "./assets/restaurant/pillar_A.bin",
  "./assets/restaurant/pillar_A.gltf",
  "./assets/restaurant/plate.bin",
  "./assets/restaurant/plate.gltf",
  "./assets/restaurant/pot_A.bin",
  "./assets/restaurant/pot_A.gltf",
  "./assets/restaurant/restaurantbits_texture.png",
  "./assets/restaurant/stew_pot.bin",
  "./assets/restaurant/stew_pot.gltf",
  "./assets/restaurant/stove_single.bin",
  "./assets/restaurant/stove_single.gltf",
  "./assets/restaurant/table_round_A_small_decorated.bin",
  "./assets/restaurant/table_round_A_small_decorated.gltf",
  "./assets/restaurant/wall.bin",
  "./assets/restaurant/wall.gltf",
  "./assets/restaurant/wall_half.bin",
  "./assets/restaurant/wall_half.gltf",
  "./assets/restaurant/wall_window_open.bin",
  "./assets/restaurant/wall_window_open.gltf",
  "./assets/character/Mannequin_Medium.glb",
  "./assets/character/Rig_Medium_General.glb",
  "./assets/character/Rig_Medium_MovementBasic.glb",
  "./assets/character/Rig_Medium_Simulation.glb",
  "./assets/character/Rig_Medium_Tools.glb",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // einzeln laden, damit eine fehlende Datei nicht die ganze Installation abbricht
    await Promise.all(PRECACHE.map(url => cache.add(new Request(url, { cache: 'reload' })).catch(err => console.warn('SW: nicht gecacht', url, err))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('kuechenrallye-') && k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) { const cache = await caches.open(VERSION); cache.put('./index.html', res.clone()); }
        return res;
      } catch (e) {
        return (await caches.match(req)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok) { const cache = await caches.open(VERSION); cache.put(req, res.clone()); }
    return res;
  })());
});
