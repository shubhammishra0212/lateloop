// LateLoop hero: a low-poly 3D station town in fog.
// A train runs the loop track past local landmarks; pins mark the stops of a delay trip.
// Falls back to the SVG illustration if WebGL is unavailable.
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const host = document.getElementById("hero3d");
const hero = document.getElementById("hero");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function supportsWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

if (host && supportsWebGL()) init();

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x8ea4ff, 22, 52);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
  const camBase = new THREE.Vector3(0, 13, 27);

  // lights
  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x1a2488, 1.15));
  const sun = new THREE.DirectionalLight(0xfff1d6, 1.6);
  sun.position.set(12, 20, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 60 });
  scene.add(sun);

  const mat = (c, extra = {}) => new THREE.MeshStandardMaterial({ color: c, flatShading: true, roughness: 0.85, metalness: 0.02, ...extra });
  const M = {
    ground: mat(0x2a3fd6), top: mat(0x3d57f0), path: mat(0xc9d4ff), stone: mat(0xeef1ff), stoneDark: mat(0xb8c3f5),
    gold: mat(0xffd56a), white: mat(0xffffff), navy: mat(0x16248f), tree: mat(0x2fa37a), trunk: mat(0x5a3b2a), water: mat(0x7fb2ff, { roughness: 0.2, metalness: 0.1 })
  };
  const add = (geo, m, x, y, z, parent = world) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };

  const world = new THREE.Group();
  scene.add(world);

  // island base
  add(new THREE.CylinderGeometry(15, 13.5, 1.6, 10), M.ground, 0, -0.8, 0);
  add(new THREE.CylinderGeometry(15, 15, 0.2, 10), M.top, 0, 0.1, 0);

  // loop track
  const R = 9.5;
  const rail = add(new THREE.TorusGeometry(R, 0.09, 6, 120), M.white, 0, 0.32, 0);
  rail.rotation.x = Math.PI / 2;
  const rail2 = add(new THREE.TorusGeometry(R + 0.7, 0.09, 6, 120), M.white, 0, 0.32, 0);
  rail2.rotation.x = Math.PI / 2;
  const sleeperGeo = new THREE.BoxGeometry(1.2, 0.08, 0.22);
  for (let i = 0; i < 90; i++) {
    const a = (i / 90) * Math.PI * 2, r = R + 0.35;
    const s = add(sleeperGeo, M.stoneDark, Math.cos(a) * r, 0.24, Math.sin(a) * r);
    s.rotation.y = -a;
  }

  // ---- landmarks ----
  // station (on the track, front)
  const station = new THREE.Group(); world.add(station); station.position.set(0, 0.2, R + 3.2);
  add(new THREE.BoxGeometry(6, 2.2, 2.4), M.stone, 0, 1.1, 0, station);
  const roof = add(new THREE.ConeGeometry(4.4, 1.4, 4), M.navy, 0, 2.9, 0, station); roof.rotation.y = Math.PI / 4; roof.scale.z = 0.5;
  add(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 20), M.gold, 0, 2.6, 1.2, station).rotation.x = Math.PI / 2;
  for (const x of [-2, -0.7, 0.7, 2]) add(new THREE.BoxGeometry(0.6, 1.1, 0.05), M.navy, x, 0.9, 1.22, station);

  // church bell tower (ruin)
  const church = new THREE.Group(); world.add(church); church.position.set(-6.2, 0.2, -2.2);
  add(new THREE.BoxGeometry(1.4, 5, 1.4), M.stone, 0, 2.5, 0, church);
  add(new THREE.ConeGeometry(1.15, 2.2, 4), M.navy, 0, 6.1, 0, church).rotation.y = Math.PI / 4;
  add(new THREE.BoxGeometry(2.6, 1.6, 1.2), M.stoneDark, 1.7, 0.8, 0.2, church);
  add(new THREE.BoxGeometry(0.5, 0.8, 0.05), M.navy, 0, 3.6, 0.71, church);

  // Mughal dome tomb
  const tomb = new THREE.Group(); world.add(tomb); tomb.position.set(-2.2, 0.2, -6.4);
  add(new THREE.BoxGeometry(3.6, 1.6, 3.6), M.stone, 0, 0.8, 0, tomb);
  add(new THREE.SphereGeometry(1.45, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.white, 0, 1.6, 0, tomb);
  add(new THREE.ConeGeometry(0.12, 0.7, 6), M.gold, 0, 3.3, 0, tomb);
  for (const [x, z] of [[-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8]]) {
    add(new THREE.CylinderGeometry(0.18, 0.22, 2.4, 8), M.stone, x, 1.2, z, tomb);
    add(new THREE.SphereGeometry(0.3, 10, 8), M.white, x, 2.5, z, tomb);
  }

  // temple shikhara
  const temple = new THREE.Group(); world.add(temple); temple.position.set(3.2, 0.2, -5.6);
  add(new THREE.BoxGeometry(2.4, 1.2, 2.4), M.stoneDark, 0, 0.6, 0, temple);
  add(new THREE.ConeGeometry(1.25, 4, 8), M.gold, 0, 3.2, 0, temple);
  add(new THREE.SphereGeometry(0.28, 10, 8), M.white, 0, 5.3, 0, temple);
  add(new THREE.BoxGeometry(0.6, 0.35, 0.02), mat(0xff7a1a), 0.32, 5.9, 0, temple);
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), M.navy, 0, 5.75, 0, temple);

  // gurudwara
  const gurd = new THREE.Group(); world.add(gurd); gurd.position.set(6.4, 0.2, -1.2);
  add(new THREE.BoxGeometry(3.4, 1.8, 2.4), M.white, 0, 0.9, 0, gurd);
  add(new THREE.SphereGeometry(1, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.gold, 0, 1.8, 0, gurd);
  for (const x of [-1.5, 1.5]) add(new THREE.SphereGeometry(0.4, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.gold, x, 1.8, 0.9, gurd);

  // sacred tank (Brahma Sarovar)
  add(new THREE.BoxGeometry(4.2, 0.12, 2.6), M.stone, 1.2, 0.28, 1.6);
  add(new THREE.BoxGeometry(3.6, 0.14, 2.0), M.water, 1.2, 0.32, 1.6);

  // trees
  const treeGeo = new THREE.ConeGeometry(0.55, 1.5, 7), trunkGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.5, 6);
  for (const [x, z] of [[-3.5, 2.2], [-4.6, 3.6], [4.4, 3.4], [-8, -6], [8.2, -5.4], [-1, 3.8], [5.2, 1.8], [-6.8, 2.8], [0.6, -2.4]]) {
    add(trunkGeo, M.trunk, x, 0.45, z); add(treeGeo, M.tree, x, 1.35, z);
  }

  // pins above each stop
  const pins = [];
  const pinGeo = new THREE.SphereGeometry(0.34, 16, 12), tipGeo = new THREE.ConeGeometry(0.2, 0.5, 12);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x2747ff, emissiveIntensity: 0.35 });
  for (const [g, h] of [[church, 8], [tomb, 4.6], [temple, 7], [gurd, 3.8]]) {
    const p = new THREE.Group(); world.add(p);
    p.position.set(g.position.x, h, g.position.z);
    add(pinGeo, pinMat, 0, 0.35, 0, p); const tip = add(tipGeo, pinMat, 0, -0.05, 0, p); tip.rotation.x = Math.PI;
    p.userData.base = h; pins.push(p);
  }

  // train
  const train = [];
  const engine = new THREE.Group(); add(new THREE.BoxGeometry(1.9, 0.75, 0.62), M.gold, 0, 0.62, 0, engine); add(new THREE.BoxGeometry(0.55, 0.45, 0.64), M.navy, 0.62, 1.15, 0, engine);
  train.push(engine); world.add(engine);
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Group(); add(new THREE.BoxGeometry(1.8, 0.72, 0.62), M.white, 0, 0.6, 0, c);
    add(new THREE.BoxGeometry(1.5, 0.2, 0.64), M.navy, 0, 0.72, 0, c); world.add(c); train.push(c);
  }

  // fog banks
  const fogMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, depthWrite: false, fog: false });
  const fogs = [];
  for (let i = 0; i < 7; i++) {
    const f = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), fogMat);
    f.scale.set(6 + Math.random() * 4, 0.7 + Math.random() * 0.5, 2.5 + Math.random() * 2);
    f.position.set(-16 + i * 5.5, 1 + Math.random() * 1.5, -6 + Math.random() * 14);
    f.userData.speed = 0.25 + Math.random() * 0.3;
    scene.add(f); fogs.push(f);
  }

  // layout + interaction
  const pointer = { x: 0, y: 0 };
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the diorama in the upper/right area on wide screens, centred on phones
    const wide = w > 1040;
    world.position.set(wide ? 1.5 : 0, wide ? 2.6 : 3.2, 0);
    world.scale.setScalar(wide ? 1 : 0.82);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);

  const clock = new THREE.Clock();
  let t = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!reduce) t += dt;

    // train around the loop
    train.forEach((car, i) => {
      const a = t * 0.22 - i * 0.205, r = R + 0.35;
      car.position.set(Math.cos(a) * r, 0.2, Math.sin(a) * r);
      car.rotation.y = -a - Math.PI / 2;
    });
    pins.forEach((p, i) => { p.position.y = p.userData.base + Math.sin(t * 2 + i) * 0.25; p.rotation.y = t; });
    fogs.forEach((f) => { f.position.x += f.userData.speed * dt; if (f.position.x > 20) f.position.x = -20; });

    // gentle parallax that follows the pointer (no idle camera drift)
    camera.position.x += (camBase.x + pointer.x * 2.2 - camera.position.x) * 0.05;
    camera.position.y += (camBase.y - pointer.y * 1.2 - camera.position.y) * 0.05;
    camera.position.z = camBase.z;
    camera.lookAt(0, 1.5, 0);
    renderer.render(scene, camera);
  }
  frame();
  hero.classList.add("has-3d");
}
