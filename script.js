/* =========================================================
   BRICK CLICK
   CURRENT FULL SCRIPT
   ========================================================= */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


/* =========================================================
   MOBILE VIEWPORT
   ========================================================= */

let viewportMeta =
  document.querySelector('meta[name="viewport"]');

if (!viewportMeta) {
  viewportMeta = document.createElement("meta");
  viewportMeta.name = "viewport";
  document.head.appendChild(viewportMeta);
}

viewportMeta.content =
  "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";


/* =========================================================
   RUNTIME CSS
   ========================================================= */

const runtimeStyle = document.createElement("style");

runtimeStyle.textContent = `
  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    border: 0 !important;
    outline: 0 !important;
    background: #7fb6dc !important;
    overscroll-behavior: none !important;
  }

  #gameViewport {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100dvh !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
    background: #7fb6dc !important;
  }

  #game {
    position: absolute !important;
    inset: 0 !important;
    display: block !important;
    width: 100vw !important;
    height: 100dvh !important;
    max-width: none !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
    image-rendering: pixelated !important;
    image-rendering: crisp-edges !important;
    touch-action: none !important;
  }

  button,
  input {
    touch-action: manipulation;
  }

  #closeUpgrades {
    display: none !important;
  }

  .upgrade-drawer {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    width: min(540px, 94vw) !important;
    height: 100% !important;
    padding: 16px !important;
    display: flex !important;
    flex-direction: column !important;
    background: #211b17 !important;
    border: 3px solid #786044 !important;
    border-right: 0 !important;
    border-radius: 0 !important;
    box-shadow:
      inset 2px 0 0 #9e805a,
      -4px 0 0 rgba(0,0,0,.22) !important;
    transition: none !important;
    z-index: 70 !important;
  }

  #upgradeTab {
    position: absolute !important;
    top: 50% !important;
    width: 27px !important;
    height: 118px !important;
    padding: 0 !important;
    transform: translateY(-50%) !important;
    transition: none !important;
    background: #3b2d21 !important;
    color: #f4e7d1 !important;
    border: 3px solid #806046 !important;
    border-radius: 0 !important;
    font-size: 19px !important;
    cursor: ew-resize !important;
    user-select: none !important;
    touch-action: none !important;
    z-index: 80 !important;
  }

  .drawer-header h2 {
    font-size: 26px !important;
    color: #f0c985 !important;
    text-shadow: 2px 2px 0 #4c3926 !important;
  }

  #upgradeCount {
    font-size: 14px !important;
    color: #d1b88e !important;
  }

  .drawer-tabs {
    gap: 6px !important;
  }

  .drawer-filter {
    min-height: 44px !important;
    border-radius: 0 !important;
    border: 3px solid #745a3f !important;
    background: #6e5942 !important;
    color: #f2e1c4 !important;
    font-family: "Courier New", monospace !important;
    font-weight: bold !important;
    font-size: 13px !important;
    box-shadow: inset 1px 1px 0 #9b7c58 !important;
  }

  .drawer-filter.active {
    background: #c79a5e !important;
    color: #2a1c11 !important;
    border-color: #e1bc83 !important;
  }

  .upgrade-card {
    padding: 14px !important;
    margin-bottom: 11px !important;
    border: 3px solid #71563c !important;
    border-radius: 0 !important;
    background: #382d24 !important;
    box-shadow: inset 1px 1px 0 #4e3d30 !important;
  }

  .upgrade-card.blueprint {
    background: #26363a !important;
    border-color: #547b84 !important;
  }

  .upgrade-card h4 {
    font-size: 18px !important;
    color: #f2d7aa !important;
  }

  .upgrade-card p {
    font-size: 15px !important;
    line-height: 1.45 !important;
    color: #d2c0aa !important;
  }

  .upgrade-level {
    font-size: 14px !important;
    color: #e2c89c !important;
  }

  .upgrade-card button {
    min-height: 47px !important;
    border-radius: 0 !important;
    border: 3px solid #7d674e !important;
    font-family: "Courier New", monospace !important;
    font-size: 14px !important;
    font-weight: bold !important;
  }

  #rebirthButton {
    border-radius: 0 !important;
    border: 3px solid #65858a !important;
  }

  #saveButton {
    min-height: 42px !important;
    background: #729b50 !important;
    color: #17200f !important;
    border: 3px solid #3e5e2d !important;
    border-radius: 0 !important;
    box-shadow:
      inset 2px 2px 0 #9fc77b,
      inset -2px -2px 0 #506d39 !important;
    font-family: "Courier New", monospace !important;
    font-size: 14px !important;
    font-weight: bold !important;
  }

  #saveButton:hover {
    background: #83ae5d !important;
  }

  #saveButton:active {
    box-shadow: inset 2px 2px 0 #4f6e39 !important;
    transform: translate(1px,1px) !important;
  }

  .upgrade-list {
    scrollbar-width: thin !important;
    scrollbar-color: #8c6e4f #241c16 !important;
  }

  .upgrade-list::-webkit-scrollbar {
    width: 12px !important;
  }

  .upgrade-list::-webkit-scrollbar-track {
    background: #241c16 !important;
    border-left: 2px solid #4d3a2b !important;
  }

  .upgrade-list::-webkit-scrollbar-thumb {
    background: #8c6e4f !important;
    border: 2px solid #241c16 !important;
    border-radius: 0 !important;
  }

  .upgrade-list::-webkit-scrollbar-thumb:hover {
    background: #a47f59 !important;
  }

  .upgrade-list::-webkit-scrollbar-button {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  #orientationBlocker {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: none;
    align-items: center;
    justify-content: center;
    background: #17130f;
    color: #f3ddbb;
    font-family: "Courier New", monospace;
    text-align: center;
    padding: 24px;
    touch-action: manipulation;
  }

  #orientationBlocker.show {
    display: flex;
  }

  #orientationBlocker .orientation-card {
    width: min(420px, calc(100vw - 30px));
    padding: 22px;
    background: #30261d;
    border: 4px solid #846545;
    box-shadow: inset 2px 2px 0 #ad865d;
  }

  #orientationBlocker h2 {
    margin: 0 0 12px;
    font-size: 24px;
    color: #f2c980;
  }

  #orientationBlocker p {
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.45;
  }

  #orientationLandscapeButton {
    min-height: 50px;
    padding: 8px 16px;
    background: #729b50;
    color: #17200f;
    border: 3px solid #9fc77b;
    border-radius: 0;
    font: bold 14px "Courier New", monospace;
  }

  @media (pointer: coarse) and (orientation: landscape) {
    .top-hud {
      left: 58px !important;
      right: 34px !important;
      width: auto !important;
      transform: none !important;
      grid-template-columns:
        repeat(5, minmax(0,1fr)) !important;
      gap: 4px !important;
    }

    .stat {
      height: 48px !important;
      padding: 4px 3px !important;
    }

    .stat span {
      font-size: 8px !important;
    }

    .stat strong {
      font-size: 13px !important;
    }

    .settings-button {
      top: 7px !important;
      left: 7px !important;
      width: 42px !important;
      height: 42px !important;
    }

    .pile-ui {
      left: 8px !important;
      bottom: 8px !important;
      width: 185px !important;
      padding: 8px !important;
    }

    .pile-ui strong {
      font-size: 13px !important;
    }

    .pile-ui > span {
      font-size: 9px !important;
    }

    .upgrade-drawer {
      width: min(520px, 87vw) !important;
    }

    .settings-panel {
      max-height: calc(100dvh - 16px) !important;
      overflow-y: auto !important;
    }
  }

  @media (pointer: coarse) and (orientation: portrait) {
    #gameViewport {
      pointer-events: none !important;
    }
  }
`;

document.head.appendChild(runtimeStyle);


/* =========================================================
   ORIENTATION BLOCKER
   ========================================================= */

const orientationBlocker =
  document.createElement("div");

orientationBlocker.id =
  "orientationBlocker";

orientationBlocker.innerHTML = `
  <div class="orientation-card">
    <h2>LANDSCAPE MODE</h2>
    <p>
      BRICK CLICK is built for landscape.
      Turn your phone sideways.
    </p>
    <button
      id="orientationLandscapeButton"
      type="button"
    >
      ENTER LANDSCAPE
    </button>
  </div>
`;

document.body.appendChild(
  orientationBlocker
);

const orientationLandscapeButton =
  document.getElementById(
    "orientationLandscapeButton"
  );


function isMobileLike() {
  return (
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
    ||
    navigator.maxTouchPoints > 0
  );
}


function isPortrait() {
  return (
    window.innerHeight >
    window.innerWidth
  );
}


async function attemptLandscapeLock() {
  if (!isMobileLike()) {
    return;
  }

  try {
    if (
      screen.orientation &&
      screen.orientation.lock
    ) {
      await screen.orientation.lock(
        "landscape"
      );
    }
  }

  catch {}
}


async function requestMobileLandscape() {
  if (!isMobileLike()) {
    return;
  }

  try {
    if (
      document.documentElement
        .requestFullscreen
      &&
      !document.fullscreenElement
    ) {
      await document
        .documentElement
        .requestFullscreen();
    }
  }

  catch {}

  await attemptLandscapeLock();

  updateOrientationBlocker();
}


function updateOrientationBlocker() {
  orientationBlocker.classList.toggle(
    "show",
    isMobileLike() &&
    isPortrait()
  );
}


orientationLandscapeButton.addEventListener(
  "click",

  async event => {
    event.stopPropagation();

    await startMusicFromUserGesture();

    await requestMobileLandscape();
  }
);


window.addEventListener(
  "resize",
  updateOrientationBlocker
);


window.addEventListener(
  "orientationchange",

  () => {
    setTimeout(
      updateOrientationBlocker,
      100
    );
  }
);


/* =========================================================
   CONSTANTS
   ========================================================= */

const W = 360;
const H = 180;

const BRICK_W = 10;
const BRICK_H = 5;

const TOWER_COLUMNS = 7;

const GROUND_Y = 136;

const BUILD_LINE_OFFSET = 12;

const FOUNDATION_H = 5;


/* =========================================================
   POSITION

   YOUR CURRENT SETTING = -8
   ========================================================= */

const FOUNDATION_Y_OFFSET = -8;
const TOWER_Y_OFFSET = 0;
const PILE_Y_OFFSET = -8;

const FLOAT_PLATFORM_Y = 148;


/* =========================================================
   SAVE
   ========================================================= */

const SAVE_KEY =
  "brick-click-v15";

const OLD_SAVE_KEYS = [
  "brick-click-v14",
  "brick-click-v13",
  "brick-click-v12",
  "brick-click-v11",
  "brick-click-v10",
  "brick-click-v9",
  "brick-click-v1"
];


/* =========================================================
   UI
   ========================================================= */

const ui = {
  money:
    document.getElementById("money"),

  height:
    document.getElementById("height"),

  bricks:
    document.getElementById("bricks"),

  multiplier:
    document.getElementById("multiplier"),

  blueprints:
    document.getElementById("blueprints"),

  cooldownText:
    document.getElementById("cooldownText"),

  cooldownFill:
    document.getElementById("cooldownFill"),

  upgradeTab:
    document.getElementById("upgradeTab"),

  upgradeDrawer:
    document.getElementById("upgradeDrawer"),

  upgradeList:
    document.getElementById("upgradeList"),

  upgradeCount:
    document.getElementById("upgradeCount"),

  rebirthButton:
    document.getElementById("rebirthButton"),

  rebirthInfo:
    document.getElementById("rebirthInfo"),

  saveButton:
    document.getElementById("saveButton"),

  saveStatus:
    document.getElementById("saveStatus"),

  settingsButton:
    document.getElementById("settingsButton"),

  settingsPanel:
    document.getElementById("settingsPanel"),

  closeSettings:
    document.getElementById("closeSettings"),

  masterVolume:
    document.getElementById("masterVolume"),

  musicVolume:
    document.getElementById("musicVolume"),

  sfxVolume:
    document.getElementById("sfxVolume"),

  masterVolumeText:
    document.getElementById(
      "masterVolumeText"
    ),

  musicVolumeText:
    document.getElementById(
      "musicVolumeText"
    ),

  sfxVolumeText:
    document.getElementById(
      "sfxVolumeText"
    ),

  musicToggle:
    document.getElementById("musicToggle"),

  sfxToggle:
    document.getElementById("sfxToggle"),

  windowGame:
    document.getElementById("windowGame"),

  windowSuccessZone:
    document.getElementById(
      "windowSuccessZone"
    ),

  windowMarker:
    document.getElementById("windowMarker"),

  windowPlaceButton:
    document.getElementById(
      "windowPlaceButton"
    ),

  windowResult:
    document.getElementById("windowResult"),

  popupLayer:
    document.getElementById("popupLayer")
};


/* =========================================================
   STATE
   ========================================================= */

const state = {
  money: 0,
  bricks: 7,

  cooldownMs: 2000,
  nextManualAt: 0,

  brickValue: 1,

  autoRate: 0,
  autoAccumulator: 0,
  pendingAuto: 0,

  blueprints: 0,
  rebirths: 0,

  runMultiplier: 1,

  goldChance: 0.01,

  windows: [],
  attemptedWindowRows: [],
  goldenBricks: [],

  purchasedUpgrades: {},

  pileSeed:
    Math.floor(
      Math.random() *
      999999999
    ),

  settings: {
    masterVolume: 0.82,
    musicVolume: 0.78,
    sfxVolume: 0.8,

    musicEnabled: true,
    sfxEnabled: true
  }
};


/* =========================================================
   HELPERS
   ========================================================= */

function clamp(
  value,
  min,
  max
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}


function lerp(
  a,
  b,
  amount
) {
  return (
    a +
    (b - a) *
    amount
  );
}


function smoothstep(value) {
  return (
    value *
    value *
    (3 - 2 * value)
  );
}


function easeOutCubic(value) {
  return (
    1 -
    Math.pow(
      1 - value,
      3
    )
  );
}


function seededRandom(seed) {
  let value =
    seed >>> 0;

  return function() {
    value +=
      0x6D2B79F5;

    let t =
      value;

    t =
      Math.imul(
        t ^ t >>> 15,
        t | 1
      );

    t ^=
      t +
      Math.imul(
        t ^ t >>> 7,
        t | 61
      );

    return (
      (
        t ^ t >>> 14
      ) >>> 0
    ) /
    4294967296;
  };
}


function formatNumber(value) {
  if (value >= 1e15) {
    return (
      value / 1e15
    ).toFixed(2) + "Qa";
  }

  if (value >= 1e12) {
    return (
      value / 1e12
    ).toFixed(2) + "T";
  }

  if (value >= 1e9) {
    return (
      value / 1e9
    ).toFixed(2) + "B";
  }

  if (value >= 1e6) {
    return (
      value / 1e6
    ).toFixed(2) + "M";
  }

  if (value >= 1000) {
    return (
      value / 1000
    ).toFixed(1) + "K";
  }

  return Math.floor(
    value
  ).toString();
}


function towerRows() {
  return Math.ceil(
    state.bricks /
    TOWER_COLUMNS
  );
}


function completedTowerRows() {
  return Math.floor(
    state.bricks /
    TOWER_COLUMNS
  );
}


function towerHeightMeters() {
  return towerRows();
}


function currentBrickValue() {
  return (
    state.brickValue *
    state.runMultiplier
  );
}


/* =========================================================
   CAMERA
   ========================================================= */

let cameraRow = 0;

let cameraFollowingTop = true;


function maximumCameraRow() {
  return Math.max(
    0,
    towerRows() - 22
  );
}


function updateCamera() {
  const max =
    maximumCameraRow();

  if (cameraFollowingTop) {
    cameraRow = max;
  }

  cameraRow =
    clamp(
      cameraRow,
      0,
      max
    );
}


canvas.addEventListener(
  "wheel",

  event => {
    event.preventDefault();

    const max =
      maximumCameraRow();

    cameraRow +=
      -event.deltaY *
      0.012;

    cameraRow =
      clamp(
        cameraRow,
        0,
        max
      );

    cameraFollowingTop =
      Math.abs(
        cameraRow -
        max
      ) < 0.2;
  },

  {
    passive: false
  }
);


/* =========================================================
   MOBILE CAMERA
   ========================================================= */

let touchCameraDrag = false;

let touchStartX = 0;
let touchStartY = 0;
let touchLastY = 0;

let touchMoved = false;


function eventCanvasPosition(event) {
  const rect =
    canvas.getBoundingClientRect();

  return {
    x:
      (
        event.clientX -
        rect.left
      ) *
      W /
      rect.width,

    y:
      (
        event.clientY -
        rect.top
      ) *
      H /
      rect.height
  };
}


canvas.addEventListener(
  "pointerdown",

  event => {
    if (
      event.pointerType !==
      "touch"
    ) {
      return;
    }

    touchCameraDrag = true;
    touchMoved = false;

    touchStartX =
      event.clientX;

    touchStartY =
      event.clientY;

    touchLastY =
      event.clientY;

    try {
      canvas.setPointerCapture(
        event.pointerId
      );
    }

    catch {}
  }
);


canvas.addEventListener(
  "pointermove",

  event => {
    if (
      event.pointerType !==
      "touch"
      ||
      !touchCameraDrag
    ) {
      return;
    }

    const totalX =
      event.clientX -
      touchStartX;

    const totalY =
      event.clientY -
      touchStartY;

    if (
      Math.abs(totalX) > 7
      ||
      Math.abs(totalY) > 7
    ) {
      touchMoved = true;
    }

    if (touchMoved) {
      event.preventDefault();

      const deltaY =
        event.clientY -
        touchLastY;

      const max =
        maximumCameraRow();

      cameraRow +=
        -deltaY *
        0.06;

      cameraRow =
        clamp(
          cameraRow,
          0,
          max
        );

      cameraFollowingTop =
        Math.abs(
          cameraRow -
          max
        ) < 0.2;
    }

    touchLastY =
      event.clientY;
  }
);


/* =========================================================
   GEOMETRY
   ========================================================= */

function groundScreenY() {
  return (
    GROUND_Y +
    cameraRow *
    BRICK_H
  );
}


function buildLineY() {
  return (
    groundScreenY() +
    BUILD_LINE_OFFSET
  );
}


function foundationBottomY() {
  return (
    buildLineY() +
    FOUNDATION_Y_OFFSET
  );
}


function foundationTopY() {
  return (
    foundationBottomY() -
    FOUNDATION_H
  );
}


function towerStartX() {
  return Math.floor(
    (
      W -
      TOWER_COLUMNS *
      BRICK_W
    ) /
    2
  );
}


function brickPosition(index) {
  const row =
    Math.floor(
      index /
      TOWER_COLUMNS
    );

  const column =
    index %
    TOWER_COLUMNS;

  return {
    x:
      towerStartX() +
      column *
      BRICK_W,

    y:
      foundationTopY() +
      TOWER_Y_OFFSET -
      (
        row + 1
      ) *
      BRICK_H
  };
}


/* =========================================================
   50 UPGRADES
   ========================================================= */

const upgradeDefinitions = [];


for (
  let i = 1;
  i <= 10;
  i++
) {
  upgradeDefinitions.push({
    id:
      `hands_${i}`,

    name:
      `FASTER HANDS ${i}`,

    category:
      "build",

    currency:
      "money",

    cost:
      Math.floor(
        25 *
        Math.pow(
          1.8,
          i - 1
        )
      ),

    description:
      `Manual cooldown -${75 + i * 10}ms.`,

    apply() {
      state.cooldownMs =
        Math.max(
          180,
          state.cooldownMs -
          (
            75 +
            i * 10
          )
        );
    }
  });
}


for (
  let i = 1;
  i <= 10;
  i++
) {
  upgradeDefinitions.push({
    id:
      `value_${i}`,

    name:
      `STRONGER BRICKS ${i}`,

    category:
      "cash",

    currency:
      "money",

    cost:
      Math.floor(
        40 *
        Math.pow(
          1.92,
          i - 1
        )
      ),

    description:
      `Each brick earns +${i}.`,

    apply() {
      state.brickValue += i;
    }
  });
}


for (
  let i = 1;
  i <= 10;
  i++
) {
  upgradeDefinitions.push({
    id:
      `auto_${i}`,

    name:
      `MASON ENGINE ${i}`,

    category:
      "auto",

    currency:
      "money",

    cost:
      Math.floor(
        100 *
        Math.pow(
          2,
          i - 1
        )
      ),

    description:
      `Auto Mason +${(
        0.1 +
        i * 0.03
      ).toFixed(2)} bricks/sec.`,

    apply() {
      state.autoRate +=
        0.1 +
        i * 0.03;
    }
  });
}


for (
  let i = 1;
  i <= 5;
  i++
) {
  upgradeDefinitions.push({
    id:
      `profit_${i}`,

    name:
      `PROFIT PLAN ${i}`,

    category:
      "cash",

    currency:
      "money",

    cost:
      Math.floor(
        400 *
        Math.pow(
          3,
          i - 1
        )
      ),

    description:
      "+0.1x cash this run.",

    apply() {
      state.runMultiplier +=
        0.1;
    }
  });
}


for (
  let i = 1;
  i <= 5;
  i++
) {
  upgradeDefinitions.push({
    id:
      `gold_${i}`,

    name:
      `GOLD DETECTOR ${i}`,

    category:
      "cash",

    currency:
      "money",

    cost:
      Math.floor(
        750 *
        Math.pow(
          2.8,
          i - 1
        )
      ),

    description:
      "Gold brick chance +0.2%.",

    apply() {
      state.goldChance +=
        0.002;
    }
  });
}


const blueprintNames = [
  "MASTER PLANS I",
  "MASTER PLANS II",
  "MASTER PLANS III",
  "GOLDEN TOUCH I",
  "GOLDEN TOUCH II",
  "ROBOT ENGINEERING I",
  "ROBOT ENGINEERING II",
  "QUICK START I",
  "QUICK START II",
  "ARCHITECT PRIME"
];


const blueprintDescriptions = [
  "+20% permanent cash.",
  "+20% additional permanent cash.",
  "+25% additional permanent cash.",
  "+0.5% permanent gold chance.",
  "+0.75% permanent gold chance.",
  "Robot animations 15% faster.",
  "Robot animations another 20% faster.",
  "Start rebirths with -150ms cooldown.",
  "Start rebirths with another -200ms cooldown.",
  "+50% cash, +1% gold chance, faster robot."
];


for (
  let i = 0;
  i < 10;
  i++
) {
  upgradeDefinitions.push({
    id:
      `bp_${i}`,

    name:
      blueprintNames[i],

    category:
      "blueprint",

    currency:
      "blueprint",

    cost:
      1 +
      Math.floor(
        i * 1.5
      ),

    description:
      blueprintDescriptions[i],

    apply() {
      applyBlueprintEffect(i);
    }
  });
}


/* =========================================================
   BLUEPRINT EFFECTS
   ========================================================= */

let robotAnimationSpeed = 1;

let rebirthCooldownBonus = 0;


function applyBlueprintEffect(index) {
  if (index === 0) {
    state.runMultiplier += 0.2;
  }

  if (index === 1) {
    state.runMultiplier += 0.2;
  }

  if (index === 2) {
    state.runMultiplier += 0.25;
  }

  if (index === 3) {
    state.goldChance += 0.005;
  }

  if (index === 4) {
    state.goldChance += 0.0075;
  }

  if (index === 5) {
    robotAnimationSpeed += 0.15;
  }

  if (index === 6) {
    robotAnimationSpeed += 0.2;
  }

  if (index === 7) {
    rebirthCooldownBonus += 150;
  }

  if (index === 8) {
    rebirthCooldownBonus += 200;
  }

  if (index === 9) {
    state.runMultiplier += 0.5;
    state.goldChance += 0.01;
    robotAnimationSpeed += 0.2;
  }
}


function upgradePurchased(id) {
  return (
    state.purchasedUpgrades[id] ===
    true
  );
}


function upgradesInCategory(category) {
  return upgradeDefinitions.filter(
    upgrade =>
      upgrade.category ===
      category
  );
}


function previousUpgradeFor(definition) {
  const group =
    upgradesInCategory(
      definition.category
    );

  const index =
    group.findIndex(
      upgrade =>
        upgrade.id ===
        definition.id
    );

  if (index <= 0) {
    return null;
  }

  return group[index - 1];
}


function upgradeUnlocked(definition) {
  const previous =
    previousUpgradeFor(definition);

  if (!previous) {
    return true;
  }

  return upgradePurchased(
    previous.id
  );
}


function rebuildUpgradeEffects() {
  state.brickValue = 1;
  state.autoRate = 0;
  state.runMultiplier = 1;
  state.goldChance = 0.01;
  state.cooldownMs = 2000;

  robotAnimationSpeed = 1;
  rebirthCooldownBonus = 0;

  for (
    const definition
    of upgradeDefinitions
  ) {
    if (
      definition.currency ===
      "blueprint"
      &&
      upgradePurchased(
        definition.id
      )
    ) {
      definition.apply();
    }
  }

  state.cooldownMs =
    Math.max(
      250,
      2000 -
      rebirthCooldownBonus
    );

  for (
    const definition
    of upgradeDefinitions
  ) {
    if (
      definition.currency ===
      "money"
      &&
      upgradePurchased(
        definition.id
      )
    ) {
      definition.apply();
    }
  }

  state.runMultiplier +=
    state.windows.length *
    0.1;
}


function buySpecialUpgrade(definition) {
  if (
    upgradePurchased(
      definition.id
    )
    ||
    !upgradeUnlocked(
      definition
    )
  ) {
    return;
  }

  if (
    definition.currency ===
    "money"
  ) {
    if (
      state.money <
      definition.cost
    ) {
      return;
    }

    state.money -=
      definition.cost;
  }

  else {
    if (
      state.blueprints <
      definition.cost
    ) {
      return;
    }

    state.blueprints -=
      definition.cost;
  }

  state.purchasedUpgrades[
    definition.id
  ] = true;

  rebuildUpgradeEffects();

  playUpgradeSound();

  spawnUIParticles();

  saveGame();

  renderUpgradeDrawer();
}


/* =========================================================
   UPGRADE DRAWER
   ========================================================= */

let currentUpgradeFilter =
  "all";


function renderUpgradeDrawer() {
  if (!ui.upgradeList) {
    return;
  }

  ui.upgradeList.innerHTML = "";

  const purchased =
    upgradeDefinitions.filter(
      definition =>
        upgradePurchased(
          definition.id
        )
    ).length;

  if (ui.upgradeCount) {
    ui.upgradeCount.textContent =
      `${purchased} / 50 PURCHASED`;
  }

  for (
    const definition
    of upgradeDefinitions
  ) {
    if (
      currentUpgradeFilter !==
      "all"
      &&
      definition.category !==
      currentUpgradeFilter
    ) {
      continue;
    }

    const unlocked =
      upgradeUnlocked(definition);

    const owned =
      upgradePurchased(
        definition.id
      );

    const card =
      document.createElement("div");

    card.className =
      "upgrade-card";

    if (
      definition.currency ===
      "blueprint"
    ) {
      card.classList.add(
        "blueprint"
      );
    }

    const top =
      document.createElement("div");

    top.className =
      "upgrade-card-top";

    const title =
      document.createElement("h4");

    const level =
      document.createElement("span");

    level.className =
      "upgrade-level";

    const description =
      document.createElement("p");

    const button =
      document.createElement("button");

    button.type = "button";

    button.dataset.upgradeId =
      definition.id;

    if (!unlocked) {
      title.textContent = "???";
      level.textContent = "LOCKED";

      description.textContent =
        "Purchase the previous upgrade to reveal this.";

      button.textContent = "???";
      button.disabled = true;
    }

    else {
      title.textContent =
        definition.name;

      level.textContent =
        owned
          ? "OWNED"
          : definition.currency ===
            "blueprint"
          ? `${definition.cost} BP`
          : `$${formatNumber(
              definition.cost
            )}`;

      description.textContent =
        definition.description;

      button.textContent =
        owned
          ? "PURCHASED"
          : "BUY";

      button.disabled = owned;

      if (!owned) {
        button.addEventListener(
          "click",

          () => {
            buySpecialUpgrade(
              definition
            );
          }
        );
      }
    }

    top.append(
      title,
      level
    );

    card.append(
      top,
      description,
      button
    );

    ui.upgradeList.appendChild(
      card
    );
  }

  refreshUpgradeAffordability();
}


function refreshUpgradeAffordability() {
  if (!ui.upgradeList) {
    return;
  }

  for (
    const definition
    of upgradeDefinitions
  ) {
    const button =
      ui.upgradeList.querySelector(
        `[data-upgrade-id="${definition.id}"]`
      );

    if (
      !button
      ||
      upgradePurchased(
        definition.id
      )
      ||
      !upgradeUnlocked(
        definition
      )
    ) {
      continue;
    }

    if (
      definition.currency ===
      "money"
    ) {
      button.disabled =
        state.money <
        definition.cost;
    }

    else {
      button.disabled =
        state.blueprints <
        definition.cost;
    }
  }
}


/* =========================================================
   DRAWER DRAG
   ========================================================= */

let drawerOffset = 0;
let drawerDragging = false;

let drawerStartX = 0;
let drawerStartOffset = 0;


function drawerWidth() {
  if (!ui.upgradeDrawer) {
    return 0;
  }

  return ui.upgradeDrawer
    .getBoundingClientRect()
    .width;
}


function applyDrawerOffset(offset) {
  if (
    !ui.upgradeDrawer
    ||
    !ui.upgradeTab
  ) {
    return;
  }

  const width =
    drawerWidth();

  drawerOffset =
    clamp(
      offset,
      0,
      width
    );

  ui.upgradeDrawer.style.transform =
    `translateX(${drawerOffset}px)`;

  ui.upgradeTab.style.right =
    `${width - drawerOffset}px`;

  const amountOpen =
    1 -
    drawerOffset /
    Math.max(
      width,
      1
    );

  ui.upgradeTab.textContent =
    amountOpen > 0.5
      ? "▶"
      : "◀";
}


function snapDrawer(open) {
  const width =
    drawerWidth();

  applyDrawerOffset(
    open
      ? 0
      : width
  );

  if (open) {
    renderUpgradeDrawer();
  }
}


if (ui.upgradeTab) {
  ui.upgradeTab.addEventListener(
    "pointerdown",

    event => {
      event.preventDefault();

      drawerDragging = true;

      drawerStartX =
        event.clientX;

      drawerStartOffset =
        drawerOffset;

      try {
        ui.upgradeTab
          .setPointerCapture(
            event.pointerId
          );
      }

      catch {}
    }
  );

  ui.upgradeTab.addEventListener(
    "click",

    event => {
      event.preventDefault();
    }
  );
}


window.addEventListener(
  "pointermove",

  event => {
    if (!drawerDragging) {
      return;
    }

    const delta =
      event.clientX -
      drawerStartX;

    applyDrawerOffset(
      drawerStartOffset +
      delta
    );
  }
);


window.addEventListener(
  "pointerup",

  () => {
    if (!drawerDragging) {
      return;
    }

    drawerDragging = false;

    snapDrawer(
      drawerOffset <
      drawerWidth() /
      2
    );
  }
);


window.addEventListener(
  "pointercancel",

  () => {
    if (!drawerDragging) {
      return;
    }

    drawerDragging = false;

    snapDrawer(
      drawerOffset <
      drawerWidth() /
      2
    );
  }
);


window.addEventListener(
  "resize",

  () => {
    const open =
      drawerOffset <
      drawerWidth() /
      2;

    requestAnimationFrame(
      () => {
        snapDrawer(open);
      }
    );
  }
);


document
  .querySelectorAll(
    ".drawer-filter"
  )
  .forEach(
    button => {
      button.addEventListener(
        "click",

        () => {
          document
            .querySelectorAll(
              ".drawer-filter"
            )
            .forEach(
              other => {
                other.classList.remove(
                  "active"
                );
              }
            );

          button.classList.add(
            "active"
          );

          currentUpgradeFilter =
            button.dataset.filter;

          renderUpgradeDrawer();
        }
      );
    }
  );


/* =========================================================
   BRICK PILE

   NEW RULES:
   - 3 to 5 columns wide
   - at least 3 bricks tall overall
   - maximum 12 bricks total
   - no floating bricks
   ========================================================= */

let pileLayout = [];

let pileBounds = {
  minX: 0,
  maxX: 0,
  minTop: 0,
  maxBottom: 0
};


function generatePileLayout() {
  const random =
    seededRandom(
      state.pileSeed
    );

  /*
    Width = 3, 4 or 5 bricks.
  */

  const columns =
    3 +
    Math.floor(
      random() * 3
    );


  /*
    Total pile size.

    Minimum chosen so it still looks
    like an actual pile.

    Absolute maximum = 12.
  */

  const minimumTotal =
    Math.max(
      columns + 2,
      7
    );

  const maximumTotal = 12;

  const totalBricks =
    minimumTotal +
    Math.floor(
      random() *
      (
        maximumTotal -
        minimumTotal +
        1
      )
    );


  /*
    Every column starts with one grounded brick.
  */

  const heights =
    new Array(columns).fill(1);


  /*
    Guarantee overall pile reaches
    AT LEAST 3 bricks tall.
  */

  const peakColumn =
    Math.floor(
      random() *
      columns
    );

  heights[peakColumn] = 3;

  let placed =
    columns + 2;


  /*
    Add remaining bricks to existing columns.

    Each column grows from the ground upward,
    therefore nothing floats.
  */

  while (
    placed <
    totalBricks
  ) {
    const column =
      Math.floor(
        random() *
        columns
      );

    /*
      Keep it pile-shaped rather than
      accidentally making a ridiculous tower.
    */

    if (
      heights[column] >= 4
    ) {
      continue;
    }

    heights[column]++;

    placed++;
  }


  /*
    Center the smaller pile roughly where
    the old pile lived on the left.
  */

  const pileStartX = 20;


  pileLayout = [];


  for (
    let column = 0;
    column < columns;
    column++
  ) {
    for (
      let row = 0;
      row <
      heights[column];
      row++
    ) {
      pileLayout.push({
        x:
          pileStartX +
          column *
          BRICK_W,

        localY:
          -row *
          BRICK_H,

        index:
          90000 +
          column * 10 +
          row
      });
    }
  }


  pileBounds.minX =
    Math.min(
      ...pileLayout.map(
        brick => brick.x
      )
    );


  pileBounds.maxX =
    Math.max(
      ...pileLayout.map(
        brick =>
          brick.x +
          BRICK_W
      )
    );


  pileBounds.minTop =
    Math.min(
      ...pileLayout.map(
        brick =>
          brick.localY
      )
    );


  pileBounds.maxBottom =
    Math.max(
      ...pileLayout.map(
        brick =>
          brick.localY +
          BRICK_H
      )
    );
}


/* =========================================================
   BRICK ART
   ========================================================= */

function isGoldenBrick(index) {
  return state.goldenBricks.includes(
    index
  );
}


function crackPattern(index) {
  return Math.abs(
    (
      index * 7 +
      3
    ) %
    10
  );
}


const crackPatterns = [
  [[4,1],[4,2],[3,3]],
  [[2,1],[3,2],[3,3]],
  [[6,1],[6,2],[5,3]],
  [[2,2],[3,2],[4,3]],
  [[6,2],[5,3],[4,3]],
  [[7,1],[6,2],[6,3]],
  [[3,1],[4,2],[5,2]],
  [[6,1],[5,2],[4,3]],
  [[2,3],[3,2],[4,1]],
  [[7,3],[6,2],[5,1]]
];


function drawDetailedCrack(
  x,
  y,
  pattern
) {
  ctx.fillStyle =
    "#4b2217";

  for (
    const pixel
    of crackPatterns[pattern]
  ) {
    ctx.fillRect(
      x + pixel[0],
      y + pixel[1],
      1,
      1
    );
  }
}


function drawBrick(
  x,
  y,
  index = 0,
  forceGold = false
) {
  const gold =
    forceGold ||
    isGoldenBrick(index);

  const variation =
    Math.abs(
      index * 31
    ) %
    100;

  ctx.fillStyle =
    gold
      ? "#725914"
      : "#512719";

  ctx.fillRect(
    x,
    y,
    BRICK_W,
    BRICK_H
  );

  let body =
    "#a44d2e";

  let top =
    "#bc5d38";

  let shadow =
    "#78321f";


  if (variation < 8) {
    body = "#874029";
    top = "#a44b30";
    shadow = "#642b1e";
  }

  else if (variation < 16) {
    body = "#b15b36";
    top = "#ca6a43";
    shadow = "#843c25";
  }

  else if (variation < 21) {
    body = "#93513b";
    top = "#ad6548";
    shadow = "#6f392b";
  }


  if (gold) {
    body = "#cfa422";
    top = "#e9c143";
    shadow = "#95720f";
  }


  ctx.fillStyle = body;

  ctx.fillRect(
    x + 1,
    y + 1,
    8,
    3
  );


  ctx.fillStyle = top;

  ctx.fillRect(
    x + 1,
    y + 1,
    7,
    1
  );


  ctx.fillStyle = shadow;

  ctx.fillRect(
    x + 7,
    y + 3,
    2,
    1
  );


  if (!gold) {
    ctx.fillStyle =
      "#903f27";

    const texture =
      Math.abs(
        index * 13
      ) %
      6;

    if (texture === 0) {
      ctx.fillRect(
        x + 2,
        y + 3,
        2,
        1
      );
    }

    else if (texture === 1) {
      ctx.fillRect(
        x + 5,
        y + 2,
        1,
        1
      );
    }

    else if (texture === 2) {
      ctx.fillRect(
        x + 3,
        y + 3,
        1,
        1
      );

      ctx.fillRect(
        x + 6,
        y + 2,
        1,
        1
      );
    }

    else if (texture === 3) {
      ctx.fillRect(
        x + 2,
        y + 2,
        1,
        1
      );

      ctx.fillRect(
        x + 7,
        y + 2,
        1,
        1
      );
    }
  }


  if (
    variation >= 21
    &&
    variation < 41
    &&
    !gold
  ) {
    drawDetailedCrack(
      x,
      y,
      crackPattern(index)
    );
  }


  if (gold) {
    ctx.fillStyle =
      "#fff1a4";

    ctx.fillRect(
      x + 2,
      y + 2,
      2,
      1
    );

    ctx.fillRect(
      x + 6,
      y + 3,
      1,
      1
    );
  }
}


/* =========================================================
   TERRAIN DATA
   ========================================================= */

const groundRandom =
  seededRandom(
    771923
  );

const detailedGrass = [];
const detailedDirt = [];


for (
  let i = 0;
  i < 260;
  i++
) {
  detailedGrass.push({
    x:
      Math.floor(
        groundRandom() *
        W
      ),

    height:
      1 +
      Math.floor(
        groundRandom() *
        5
      ),

    shade:
      Math.floor(
        groundRandom() *
        6
      ),

    tuft:
      groundRandom() >
      0.68
  });
}


for (
  let i = 0;
  i < 300;
  i++
) {
  detailedDirt.push({
    x:
      Math.floor(
        groundRandom() *
        W
      ),

    y:
      Math.floor(
        groundRandom() *
        65
      ),

    shade:
      Math.floor(
        groundRandom() *
        6
      ),

    size:
      groundRandom() >
      0.86
        ? 2
        : 1
  });
}


/* =========================================================
   SKY
   ========================================================= */

function drawSky() {
  const amount =
    clamp(
      cameraRow /
      300,
      0,
      1
    );

  const r =
    Math.round(
      lerp(
        130,
        35,
        amount
      )
    );

  const g =
    Math.round(
      lerp(
        188,
        65,
        amount
      )
    );

  const b =
    Math.round(
      lerp(
        226,
        105,
        amount
      )
    );

  ctx.fillStyle =
    `rgb(${r},${g},${b})`;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );
}


/* =========================================================
   SPACE DECOR
   ========================================================= */

const starRandom =
  seededRandom(
    920417
  );

const spaceStars = [];


for (
  let i = 0;
  i < 120;
  i++
) {
  spaceStars.push({
    x:
      Math.floor(
        starRandom() *
        W
      ),

    y:
      Math.floor(
        starRandom() *
        H
      ),

    size:
      starRandom() >
      0.87
        ? 2
        : 1,

    brightness:
      starRandom(),

    speed:
      0.01 +
      starRandom() *
      0.025
  });
}


function drawPixelCircle(
  cx,
  cy,
  radius,
  color
) {
  ctx.fillStyle = color;

  for (
    let y = -radius;
    y <= radius;
    y++
  ) {
    const width =
      Math.floor(
        Math.sqrt(
          radius * radius -
          y * y
        )
      );

    ctx.fillRect(
      Math.round(
        cx - width
      ),

      Math.round(
        cy + y
      ),

      width * 2 + 1,
      1
    );
  }
}


function drawMoon(
  x,
  y,
  radius
) {
  drawPixelCircle(
    x,
    y,
    radius,
    "#c7c9c4"
  );

  ctx.fillStyle =
    "#9da09c";

  ctx.fillRect(
    x - 4,
    y - 2,
    3,
    2
  );

  ctx.fillRect(
    x + 3,
    y + 2,
    3,
    2
  );

  ctx.fillRect(
    x - 1,
    y + 4,
    2,
    1
  );

  ctx.fillStyle =
    "#e0e2dd";

  ctx.fillRect(
    x - 3,
    y - 5,
    3,
    1
  );
}


function drawMars(
  x,
  y,
  radius
) {
  drawPixelCircle(
    x,
    y,
    radius,
    "#a84f35"
  );

  ctx.fillStyle =
    "#7e3829";

  ctx.fillRect(
    x - 5,
    y + 1,
    5,
    2
  );

  ctx.fillRect(
    x + 2,
    y - 3,
    4,
    1
  );

  ctx.fillStyle =
    "#c86d48";

  ctx.fillRect(
    x - 4,
    y - 5,
    5,
    1
  );
}


function drawJupiter(
  x,
  y,
  radius
) {
  drawPixelCircle(
    x,
    y,
    radius,
    "#c4a278"
  );

  ctx.fillStyle =
    "#a87858";

  ctx.fillRect(
    x - radius + 2,
    y - 4,
    radius * 2 - 4,
    2
  );

  ctx.fillStyle =
    "#e0c59a";

  ctx.fillRect(
    x - radius + 1,
    y + 1,
    radius * 2 - 2,
    2
  );

  ctx.fillStyle =
    "#925542";

  ctx.fillRect(
    x + 4,
    y + 4,
    5,
    2
  );
}


function drawSaturn(
  x,
  y,
  radius
) {
  ctx.fillStyle =
    "#917b59";

  ctx.fillRect(
    x - radius - 8,
    y - 1,
    radius * 2 + 16,
    3
  );

  ctx.fillStyle =
    "#cbb889";

  ctx.fillRect(
    x - radius - 5,
    y,
    radius * 2 + 10,
    1
  );

  drawPixelCircle(
    x,
    y,
    radius,
    "#c7a96f"
  );

  ctx.fillStyle =
    "#9c784c";

  ctx.fillRect(
    x - radius + 2,
    y + 2,
    radius * 2 - 4,
    2
  );
}


function drawPlanetAtAltitude(
  targetAltitude,
  span,
  x,
  radius,
  type
) {
  const difference =
    cameraRow -
    targetAltitude;

  if (
    Math.abs(difference) >
    span
  ) {
    return;
  }

  const visibility =
    1 -
    Math.abs(difference) /
    span;

  const y =
    72 +
    difference *
    0.18;

  ctx.globalAlpha =
    smoothstep(
      clamp(
        visibility,
        0,
        1
      )
    );

  if (type === "moon") {
    drawMoon(
      x,
      y,
      radius
    );
  }

  else if (type === "mars") {
    drawMars(
      x,
      y,
      radius
    );
  }

  else if (type === "jupiter") {
    drawJupiter(
      x,
      y,
      radius
    );
  }

  else if (type === "saturn") {
    drawSaturn(
      x,
      y,
      radius
    );
  }

  ctx.globalAlpha = 1;
}


function drawSpaceDecor() {
  const starAmount =
    clamp(
      (
        cameraRow -
        120
      ) /
      260,
      0,
      1
    );

  if (starAmount > 0) {
    for (
      const star
      of spaceStars
    ) {
      const y =
        (
          star.y +
          cameraRow *
          star.speed
        ) %
        H;

      ctx.globalAlpha =
        starAmount *
        (
          0.45 +
          star.brightness *
          0.55
        );

      ctx.fillStyle =
        "#f4f3e7";

      ctx.fillRect(
        star.x,
        Math.floor(y),
        star.size,
        star.size
      );
    }

    ctx.globalAlpha = 1;
  }


  drawPlanetAtAltitude(
    800,
    180,
    292,
    9,
    "moon"
  );

  drawPlanetAtAltitude(
    2200,
    260,
    61,
    11,
    "mars"
  );

  drawPlanetAtAltitude(
    5500,
    500,
    287,
    20,
    "jupiter"
  );

  drawPlanetAtAltitude(
    9000,
    550,
    72,
    15,
    "saturn"
  );
}


/* =========================================================
   GROUND
   ========================================================= */

function drawGround() {
  const y =
    groundScreenY();

  if (
    y >
    H + 75
  ) {
    return;
  }


  ctx.fillStyle =
    "#69a33a";

  ctx.fillRect(
    0,
    y,
    W,
    6
  );


  ctx.fillStyle =
    "#416f29";

  ctx.fillRect(
    0,
    y + 5,
    W,
    7
  );


  const grassColors = [
    "#315f23",
    "#41772a",
    "#548d30",
    "#69a73a",
    "#7db748",
    "#91c95a"
  ];


  for (
    const blade
    of detailedGrass
  ) {
    ctx.fillStyle =
      grassColors[
        blade.shade
      ];

    ctx.fillRect(
      blade.x,
      y -
      blade.height,
      1,
      blade.height + 1
    );

    if (blade.tuft) {
      ctx.fillRect(
        blade.x + 1,
        y - 1,
        1,
        2
      );
    }
  }


  ctx.fillStyle =
    "#89bf4c";

  for (
    let x = 3;
    x < W;
    x += 17
  ) {
    ctx.fillRect(
      x,
      y,
      4,
      1
    );
  }


  const dirtStart =
    y +
    BUILD_LINE_OFFSET;


  ctx.fillStyle =
    "#895633";

  ctx.fillRect(
    0,
    dirtStart,
    W,
    Math.max(
      0,
      H -
      dirtStart
    )
  );


  ctx.fillStyle =
    "#a4673a";

  ctx.fillRect(
    0,
    dirtStart,
    W,
    4
  );


  ctx.fillStyle =
    "#70442e";

  ctx.fillRect(
    0,
    dirtStart + 34,
    W,
    Math.max(
      0,
      H -
      (
        dirtStart + 34
      )
    )
  );


  const dirtColors = [
    "#5b3827",
    "#70422a",
    "#7d4a2c",
    "#98603a",
    "#af7041",
    "#c0834c"
  ];


  for (
    const bit
    of detailedDirt
  ) {
    const drawY =
      dirtStart +
      3 +
      bit.y;

    if (drawY >= H) {
      continue;
    }

    ctx.fillStyle =
      dirtColors[
        bit.shade
      ];

    ctx.fillRect(
      bit.x,
      drawY,
      bit.size,
      bit.size
    );
  }


  ctx.fillStyle =
    "#67635b";

  for (
    let x = 19;
    x < W;
    x += 53
  ) {
    const rockY =
      dirtStart +
      9 +
      (x % 19);

    if (rockY < H) {
      ctx.fillRect(
        x,
        rockY,
        2,
        1
      );
    }
  }
}


/* =========================================================
   FOUNDATION
   ========================================================= */

function drawFoundation() {
  const top =
    foundationTopY();

  if (
    top >
    H + 30
  ) {
    return;
  }

  const left =
    towerStartX() - 4;

  const width =
    TOWER_COLUMNS *
    BRICK_W +
    8;

  ctx.fillStyle =
    "#4f585a";

  ctx.fillRect(
    left,
    top,
    width,
    FOUNDATION_H
  );

  ctx.fillStyle =
    "#929a99";

  ctx.fillRect(
    left,
    top,
    width,
    2
  );

  ctx.fillStyle =
    "#687174";

  ctx.fillRect(
    left + 7,
    top + 3,
    5,
    1
  );

  ctx.fillRect(
    left + 29,
    top + 3,
    4,
    1
  );

  ctx.fillRect(
    left +
    width -
    17,
    top + 3,
    6,
    1
  );
}


/* =========================================================
   PILE POSITION
   ========================================================= */

let flameTime = 0;


function pileFloating() {
  return (
    buildLineY() >
    H + 6
  );
}


function pileBaseOffset() {
  const targetBottom =
    pileFloating()
      ? FLOAT_PLATFORM_Y
      : buildLineY() +
        PILE_Y_OFFSET;

  return (
    targetBottom -
    pileBounds.maxBottom
  );
}


function pileY(brick) {
  return (
    brick.localY +
    pileBaseOffset()
  );
}


/* =========================================================
   FLOATING PLATFORM
   ========================================================= */

function drawBlueFlame(
  x,
  y,
  seed
) {
  const flicker =
    Math.floor(
      (
        Math.sin(
          flameTime * 17 +
          seed
        ) +
        1
      ) *
      1.6
    );

  ctx.fillStyle =
    "#10598d";

  ctx.fillRect(
    x - 2,
    y,
    5,
    3 + flicker
  );

  ctx.fillStyle =
    "#258fd0";

  ctx.fillRect(
    x - 1,
    y,
    3,
    5 + flicker
  );

  ctx.fillStyle =
    "#55cafa";

  ctx.fillRect(
    x,
    y,
    1,
    5 + flicker
  );

  ctx.fillStyle =
    "#c4f6ff";

  ctx.fillRect(
    x,
    y,
    1,
    2
  );
}


function drawPilePlatform() {
  if (!pileFloating()) {
    return;
  }

  const left =
    pileBounds.minX - 5;

  const width =
    pileBounds.maxX -
    pileBounds.minX +
    10;

  const y =
    FLOAT_PLATFORM_Y;

  ctx.fillStyle =
    "#30393d";

  ctx.fillRect(
    left,
    y,
    width,
    6
  );

  ctx.fillStyle =
    "#7b878a";

  ctx.fillRect(
    left + 1,
    y,
    width - 2,
    2
  );

  ctx.fillStyle =
    "#50595c";

  ctx.fillRect(
    left + 11,
    y + 2,
    7,
    1
  );

  ctx.fillStyle =
    "#c9a535";

  for (
    let x =
      left + 3;
    x <
      left +
      width -
      3;
    x += 9
  ) {
    ctx.fillRect(
      x,
      y + 3,
      4,
      1
    );
  }

  ctx.fillStyle =
    "#20282b";

  ctx.fillRect(
    left + 4,
    y + 6,
    width - 8,
    5
  );

  const thrusters = [
    left + 12,

    left +
    Math.floor(
      width / 2
    ),

    left +
    width -
    13
  ];

  for (
    let i = 0;
    i <
    thrusters.length;
    i++
  ) {
    const x =
      thrusters[i];

    ctx.fillStyle =
      "#414a4d";

    ctx.fillRect(
      x - 3,
      y + 8,
      7,
      4
    );

    ctx.fillStyle =
      "#171f22";

    ctx.fillRect(
      x - 2,
      y + 11,
      5,
      2
    );

    drawBlueFlame(
      x,
      y + 13,
      i * 4
    );
  }
}


function drawPile() {
  drawPilePlatform();

  for (
    const brick
    of pileLayout
  ) {
    drawBrick(
      brick.x,
      pileY(brick),
      brick.index
    );
  }
}


/* =========================================================
   WINDOWS
   ========================================================= */

function drawWindows() {
  for (
    const win
    of state.windows
  ) {
    const index =
      win.row *
      TOWER_COLUMNS +
      win.column;

    if (
      index >=
      state.bricks
    ) {
      continue;
    }

    const position =
      brickPosition(index);

    if (
      position.y < -20
      ||
      position.y >
      H + 20
    ) {
      continue;
    }

    ctx.fillStyle =
      "#303a3f";

    ctx.fillRect(
      position.x,
      position.y - 5,
      20,
      11
    );

    ctx.fillStyle =
      "#447b94";

    ctx.fillRect(
      position.x + 2,
      position.y - 3,
      16,
      7
    );

    ctx.fillStyle =
      "#2f586b";

    ctx.fillRect(
      position.x + 3,
      position.y - 1,
      14,
      5
    );

    ctx.fillStyle =
      "#8bc2d5";

    ctx.fillRect(
      position.x + 3,
      position.y - 2,
      4,
      1
    );

    ctx.fillStyle =
      "#34444b";

    ctx.fillRect(
      position.x + 9,
      position.y - 3,
      2,
      7
    );
  }
}


/* =========================================================
   TOWER
   ========================================================= */

function drawTower() {
  const firstRow =
    Math.max(
      0,
      Math.floor(
        cameraRow
      ) -
      10
    );

  const lastRow =
    Math.min(
      towerRows(),
      Math.ceil(
        cameraRow +
        55
      )
    );


  for (
    let row =
      firstRow;
    row <
      lastRow;
    row++
  ) {
    for (
      let column = 0;
      column <
      TOWER_COLUMNS;
      column++
    ) {
      const index =
        row *
        TOWER_COLUMNS +
        column;

      if (
        index >=
        state.bricks
      ) {
        break;
      }

      const position =
        brickPosition(index);

      if (
        position.y < -60
        ||
        position.y >
        H + 60
      ) {
        continue;
      }

      drawBrick(
        position.x,
        position.y,
        index
      );
    }
  }

  drawWindows();
}


/* =========================================================
   PARTICLES
   ========================================================= */

const particles = [];


function spawnImpactParticles(
  x,
  y,
  gold = false,
  robot = false
) {
  const amount =
    gold
      ? 16
      : 9;

  for (
    let i = 0;
    i < amount;
    i++
  ) {
    particles.push({
      x:
        x +
        BRICK_W / 2,

      y:
        y +
        BRICK_H,

      vx:
        (
          Math.random() -
          0.5
        ) *
        (
          gold
            ? 26
            : 18
        ),

      vy:
        -4 -
        Math.random() *
        (
          gold
            ? 22
            : 13
        ),

      gravity:
        38 +
        Math.random() *
        15,

      life:
        0.35 +
        Math.random() *
        0.35,

      maxLife:
        0.7,

      size:
        Math.random() >
        0.72
          ? 2
          : 1,

      color:
        gold
          ? (
              Math.random() >
              0.5
                ? "#f4cb4c"
                : "#fff0a0"
            )
          : robot
            ? (
                Math.random() >
                0.7
                  ? "#9fa6a4"
                  : "#94613c"
              )
            : (
                Math.random() >
                0.5
                  ? "#a66a3f"
                  : "#765037"
              )
    });
  }


  if (!gold) {
    for (
      let i = 0;
      i < 4;
      i++
    ) {
      particles.push({
        x:
          x +
          BRICK_W / 2,

        y:
          y +
          BRICK_H -
          1,

        vx:
          (
            i < 2
              ? -1
              : 1
          ) *
          (
            4 +
            Math.random() *
            10
          ),

        vy:
          -1 -
          Math.random() *
          5,

        gravity: 11,

        life:
          0.25 +
          Math.random() *
          0.2,

        maxLife: 0.45,

        size: 1,

        color:
          "#b48258"
      });
    }
  }
}


function spawnGoldTrail(
  x,
  y
) {
  if (
    Math.random() >
    0.45
  ) {
    return;
  }

  particles.push({
    x:
      x +
      Math.random() *
      BRICK_W,

    y:
      y +
      Math.random() *
      BRICK_H,

    vx:
      (
        Math.random() -
        0.5
      ) * 4,

    vy:
      -5 -
      Math.random() *
      7,

    gravity: 3,

    life:
      0.2 +
      Math.random() *
      0.25,

    maxLife: 0.45,

    size: 1,

    color:
      Math.random() >
      0.5
        ? "#fff1a4"
        : "#e9c143"
  });
}


function spawnUIParticles() {
  const target =
    brickPosition(
      Math.max(
        0,
        state.bricks - 1
      )
    );

  for (
    let i = 0;
    i < 7;
    i++
  ) {
    particles.push({
      x:
        target.x +
        Math.random() *
        20,

      y:
        target.y,

      vx:
        (
          Math.random() -
          0.5
        ) *
        18,

      vy:
        -5 -
        Math.random() *
        16,

      gravity: 25,

      life:
        0.3 +
        Math.random() *
        0.3,

      maxLife: 0.6,

      size: 1,

      color:
        "#d5b276"
    });
  }
}


function updateParticles(delta) {
  for (
    let i =
      particles.length - 1;
    i >= 0;
    i--
  ) {
    const particle =
      particles[i];

    particle.life -= delta;

    if (
      particle.life <= 0
    ) {
      particles.splice(
        i,
        1
      );

      continue;
    }

    particle.vy +=
      particle.gravity *
      delta;

    particle.x +=
      particle.vx *
      delta;

    particle.y +=
      particle.vy *
      delta;
  }
}


function drawParticles() {
  for (
    const particle
    of particles
  ) {
    ctx.globalAlpha =
      clamp(
        particle.life /
        particle.maxLife,
        0,
        1
      );

    ctx.fillStyle =
      particle.color;

    ctx.fillRect(
      Math.round(
        particle.x
      ),
      Math.round(
        particle.y
      ),
      particle.size,
      particle.size
    );
  }

  ctx.globalAlpha = 1;
}


/* =========================================================
   POPUPS
   ========================================================= */

function moneyPopup(
  amount,
  gold = false
) {
  if (!ui.popupLayer) {
    return;
  }

  const popup =
    document.createElement(
      "div"
    );

  popup.className =
    "money-popup";

  popup.textContent =
    gold
      ? `GOLD +$${formatNumber(amount)}`
      : `+$${formatNumber(amount)}`;

  popup.style.left =
    "48%";

  popup.style.top =
    "58%";

  popup.style.color =
    gold
      ? "#ffe16a"
      : "#fff0bd";

  ui.popupLayer.appendChild(
    popup
  );

  popup.animate(
    [
      {
        transform:
          "translateY(0px)",
        opacity: 1
      },

      {
        transform:
          "translateY(-38px)",
        opacity: 0
      }
    ],

    {
      duration: 800,
      easing: "ease-out"
    }
  );

  setTimeout(
    () => {
      popup.remove();
    },
    810
  );
}


/* =========================================================
   FLYING BRICKS
   ========================================================= */

const flyingBricks = [];

let screenShake = 0;


function pilePickupPoint() {
  const offset =
    pileBaseOffset();

  return {
    x:
      pileBounds.minX +
      (
        pileBounds.maxX -
        pileBounds.minX
      ) /
      2,

    y:
      pileBounds.minTop +
      offset +
      5
  };
}


function manualPlace() {
  if (
    windowChallenge.active
  ) {
    return;
  }

  /*
    SFX audio may unlock here,
    but this function DOES NOT start music.
  */

  ensureAudio();

  const now =
    performance.now();

  if (
    now <
    state.nextManualAt
  ) {
    return;
  }

  state.nextManualAt =
    now +
    state.cooldownMs;

  const index =
    state.bricks;

  const target =
    brickPosition(index);

  const pickup =
    pilePickupPoint();

  const gold =
    Math.random() <
    state.goldChance;

  flyingBricks.push({
    index,
    gold,

    value:
      currentBrickValue() *
      (
        gold
          ? 3
          : 1
      ),

    startX:
      pickup.x,

    startY:
      pickup.y,

    endX:
      target.x,

    endY:
      target.y,

    time: 0,

    duration: 0.38
  });

  if (gold) {
    playGoldSound();
  }

  else {
    playLaunchSound();
  }
}


function updateFlying(delta) {
  for (
    let i =
      flyingBricks.length - 1;
    i >= 0;
    i--
  ) {
    const brick =
      flyingBricks[i];

    brick.time += delta;

    if (
      brick.index !==
      state.bricks
    ) {
      brick.index =
        state.bricks;

      const newTarget =
        brickPosition(
          brick.index
        );

      brick.endX =
        newTarget.x;

      brick.endY =
        newTarget.y;
    }

    if (
      brick.time >=
      brick.duration
    ) {
      finishPlacedBrick(
        brick,
        true
      );

      flyingBricks.splice(
        i,
        1
      );
    }
  }
}


function drawFlying() {
  for (
    const brick
    of flyingBricks
  ) {
    const t =
      clamp(
        brick.time /
        brick.duration,
        0,
        1
      );

    const amount =
      easeOutCubic(t);

    const x =
      lerp(
        brick.startX,
        brick.endX,
        amount
      );

    const y =
      lerp(
        brick.startY,
        brick.endY,
        amount
      )
      -
      Math.sin(
        t *
        Math.PI
      ) *
      24;

    drawBrick(
      Math.round(x),
      Math.round(y),
      brick.index,
      brick.gold
    );

    if (brick.gold) {
      spawnGoldTrail(
        x,
        y
      );
    }
  }
}


/* =========================================================
   COMPLETE PLACEMENT
   ========================================================= */

function finishPlacedBrick(
  brick,
  manual
) {
  brick.index =
    state.bricks;

  const actualTarget =
    brickPosition(
      brick.index
    );

  state.bricks++;

  state.money +=
    brick.value;

  if (brick.gold) {
    state.goldenBricks.push(
      brick.index
    );
  }

  if (
    robotArm &&
    robotArm.carrying
  ) {
    refreshRobotTarget();
  }

  if (manual) {
    screenShake = 0.18;
  }

  spawnImpactParticles(
    actualTarget.x,
    actualTarget.y,
    brick.gold,
    !manual
  );

  playImpactSound(
    !manual,
    brick.gold
  );

  moneyPopup(
    brick.value,
    brick.gold
  );

  checkWindowMilestone();

  if (cameraFollowingTop) {
    updateCamera();
  }
}


/* =========================================================
   ROBOT
   ========================================================= */

let robotArm = null;


function refreshRobotTarget() {
  if (!robotArm) {
    return;
  }

  robotArm.index =
    state.bricks;

  const target =
    brickPosition(
      robotArm.index
    );

  robotArm.targetX =
    target.x +
    BRICK_W / 2;

  robotArm.targetY =
    target.y;
}


function startRobot() {
  if (
    robotArm
    ||
    state.pendingAuto <= 0
    ||
    windowChallenge.active
  ) {
    return;
  }

  state.pendingAuto--;

  const pickup =
    pilePickupPoint();

  const target =
    brickPosition(
      state.bricks
    );

  robotArm = {
    phase: "down",
    progress: 0,

    x:
      pickup.x,

    startX:
      pickup.x,

    pileY:
      pickup.y,

    targetX:
      target.x +
      BRICK_W / 2,

    targetY:
      target.y,

    index:
      state.bricks,

    carrying: false,

    clawOpen: 1,

    y: -15
  };
}


function updateRobot(delta) {
  if (!robotArm) {
    startRobot();
    return;
  }

  const robot =
    robotArm;

  robot.progress +=
    delta *
    robotAnimationSpeed;


  if (
    robot.phase ===
    "down"
  ) {
    const t =
      clamp(
        robot.progress /
        0.42,
        0,
        1
      );

    robot.y =
      lerp(
        -15,
        robot.pileY,
        smoothstep(t)
      );

    robot.clawOpen = 1;

    if (t >= 1) {
      robot.phase =
        "close";

      robot.progress = 0;
    }
  }


  else if (
    robot.phase ===
    "close"
  ) {
    const t =
      clamp(
        robot.progress /
        0.17,
        0,
        1
      );

    robot.clawOpen =
      1 - t;

    if (t >= 1) {
      robot.carrying = true;

      playRobotGrabSound();

      refreshRobotTarget();

      robot.phase =
        "rise";

      robot.progress = 0;
    }
  }


  else if (
    robot.phase ===
    "rise"
  ) {
    const t =
      clamp(
        robot.progress /
        0.32,
        0,
        1
      );

    robot.y =
      lerp(
        robot.pileY,
        22,
        smoothstep(t)
      );

    if (t >= 1) {
      refreshRobotTarget();

      robot.phase =
        "travel";

      robot.progress = 0;
    }
  }


  else if (
    robot.phase ===
    "travel"
  ) {
    refreshRobotTarget();

    const t =
      clamp(
        robot.progress /
        0.4,
        0,
        1
      );

    robot.x =
      lerp(
        robot.startX,
        robot.targetX,
        smoothstep(t)
      );

    if (t >= 1) {
      robot.phase =
        "lower";

      robot.progress = 0;
    }
  }


  else if (
    robot.phase ===
    "lower"
  ) {
    refreshRobotTarget();

    const target =
      brickPosition(
        robot.index
      );

    robot.targetY =
      target.y;

    const t =
      clamp(
        robot.progress /
        0.30,
        0,
        1
      );

    robot.y =
      lerp(
        22,
        target.y - 2,
        smoothstep(t)
      );

    if (t >= 1) {
      refreshRobotTarget();

      finishPlacedBrick(
        {
          index:
            robot.index,

          gold: false,

          value:
            currentBrickValue()
        },

        false
      );

      robot.carrying = false;

      robot.phase =
        "open";

      robot.progress = 0;
    }
  }


  else if (
    robot.phase ===
    "open"
  ) {
    const t =
      clamp(
        robot.progress /
        0.17,
        0,
        1
      );

    robot.clawOpen = t;

    if (t >= 1) {
      robot.phase =
        "leave";

      robot.progress = 0;
    }
  }


  else if (
    robot.phase ===
    "leave"
  ) {
    const t =
      clamp(
        robot.progress /
        0.3,
        0,
        1
      );

    robot.y =
      lerp(
        robot.targetY,
        -18,
        smoothstep(t)
      );

    robot.clawOpen = 1;

    if (t >= 1) {
      robotArm = null;

      startRobot();
    }
  }
}


function drawRobot() {
  if (!robotArm) {
    return;
  }

  const robot =
    robotArm;

  const x =
    Math.round(
      robot.x
    );

  const y =
    Math.round(
      robot.y
    );


  ctx.fillStyle =
    "#394245";

  ctx.fillRect(
    x - 1,
    0,
    2,
    Math.max(
      0,
      y - 4
    )
  );


  ctx.fillStyle =
    "#596367";

  ctx.fillRect(
    x - 7,
    y - 6,
    14,
    6
  );


  ctx.fillStyle =
    "#939ea1";

  ctx.fillRect(
    x - 5,
    y - 5,
    10,
    2
  );


  ctx.fillStyle =
    Math.sin(
      flameTime * 8
    ) > 0
      ? "#e5ad4f"
      : "#8d5b2d";

  ctx.fillRect(
    x + 4,
    y - 4,
    1,
    1
  );


  const spread =
    Math.round(
      2 +
      robot.clawOpen *
      4
    );


  ctx.fillStyle =
    "#2e373a";

  ctx.fillRect(
    x -
    spread -
    3,
    y,
    3,
    7
  );

  ctx.fillRect(
    x +
    spread,
    y,
    3,
    7
  );

  ctx.fillRect(
    x -
    spread -
    2,
    y + 6,
    4,
    2
  );

  ctx.fillRect(
    x +
    spread -
    1,
    y + 6,
    4,
    2
  );

  ctx.fillRect(
    x - spread,
    y,
    spread,
    2
  );

  ctx.fillRect(
    x,
    y,
    spread,
    2
  );


  if (robot.carrying) {
    drawBrick(
      x -
      BRICK_W / 2,
      y + 3,
      robot.index
    );
  }
}


/* =========================================================
   AUTOMATION
   ========================================================= */

function updateAutomation(delta) {
  if (
    state.autoRate <= 0
    ||
    windowChallenge.active
  ) {
    return;
  }

  state.autoAccumulator +=
    state.autoRate *
    delta;

  const amount =
    Math.floor(
      state.autoAccumulator
    );

  if (amount > 0) {
    state.autoAccumulator -=
      amount;

    state.pendingAuto +=
      amount;
  }

  startRobot();
}


/* =========================================================
   WINDOW MINIGAME
   ========================================================= */

const windowChallenge = {
  active: false,

  row: 0,

  column: 3,

  marker: 0,

  direction: 1,

  speed: 0.9,

  successStart: 0.38,

  successEnd: 0.58
};


function checkWindowMilestone() {
  const completedRows =
    completedTowerRows();

  const windowRow =
    completedRows - 2;

  if (windowRow < 11) {
    return;
  }

  const windowHeight =
    windowRow + 1;

  if (
    (
      windowHeight -
      12
    ) %
    10 !== 0
  ) {
    return;
  }

  const requiredBricks =
    (
      windowRow + 2
    ) *
    TOWER_COLUMNS;

  if (
    state.bricks <
    requiredBricks
  ) {
    return;
  }

  if (
    state.attemptedWindowRows.includes(
      windowHeight
    )
  ) {
    return;
  }

  state.attemptedWindowRows.push(
    windowHeight
  );

  windowChallenge.active =
    true;

  windowChallenge.row =
    windowRow;

  windowChallenge.column =
    (
      Math.floor(
        windowHeight /
        10
      ) %
      2
    ) === 0
      ? 2
      : 3;

  windowChallenge.marker = 0;
  windowChallenge.direction = 1;

  windowChallenge.successStart =
    0.38;

  windowChallenge.successEnd =
    0.58;


  if (ui.windowSuccessZone) {
    ui.windowSuccessZone.style.left =
      "38%";

    ui.windowSuccessZone.style.width =
      "20%";
  }


  if (ui.windowResult) {
    ui.windowResult.textContent =
      "SUCCESS = +0.1x MONEY";
  }


  if (ui.windowPlaceButton) {
    ui.windowPlaceButton.disabled =
      false;
  }


  if (ui.windowGame) {
    ui.windowGame.classList.remove(
      "hidden"
    );
  }

  playWindowOpenSound();
}


function updateWindowGame(delta) {
  if (
    !windowChallenge.active
  ) {
    return;
  }

  windowChallenge.marker +=
    delta *
    windowChallenge.direction *
    windowChallenge.speed;

  if (
    windowChallenge.marker >= 1
  ) {
    windowChallenge.marker = 1;
    windowChallenge.direction = -1;
  }

  if (
    windowChallenge.marker <= 0
  ) {
    windowChallenge.marker = 0;
    windowChallenge.direction = 1;
  }

  if (ui.windowMarker) {
    ui.windowMarker.style.left =
      `calc(${
        windowChallenge.marker *
        100
      }% - 3px)`;
  }
}


if (ui.windowPlaceButton) {
  ui.windowPlaceButton.addEventListener(
    "click",

    () => {
      if (
        !windowChallenge.active
      ) {
        return;
      }

      const success =
        windowChallenge.marker >=
        windowChallenge.successStart
        &&
        windowChallenge.marker <=
        windowChallenge.successEnd;

      if (success) {
        state.windows.push({
          row:
            windowChallenge.row,

          column:
            windowChallenge.column
        });

        rebuildUpgradeEffects();

        if (ui.windowResult) {
          ui.windowResult.textContent =
            "SUCCESS! +0.1x MONEY";
        }

        playWindowSuccess();
      }

      else {
        if (ui.windowResult) {
          ui.windowResult.textContent =
            "MISSED!";
        }

        playWindowFail();
      }

      ui.windowPlaceButton.disabled =
        true;

      setTimeout(
        () => {
          windowChallenge.active =
            false;

          if (ui.windowGame) {
            ui.windowGame.classList.add(
              "hidden"
            );
          }

          saveGame();
        },

        700
      );
    }
  );
}


/* =========================================================
   AUDIO
   ========================================================= */

let audioContext = null;

let masterGain = null;
let musicGain = null;
let sfxGain = null;

let musicTimer = null;
let musicStep = 0;

let musicNextTime = 0;

let musicStarted = false;


/*
  Audio look-ahead.

  Actual notes are scheduled with
  AudioContext.currentTime.

  Brick SFX therefore don't shove
  the soundtrack timing around.
*/

const MUSIC_LOOKAHEAD =
  0.18;

const MUSIC_SCHEDULER_RATE =
  25;


/* =========================================================
   AUDIO GRAPH
   ========================================================= */

function createAudioGraph() {
  if (audioContext) {
    return;
  }

  audioContext =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

  masterGain =
    audioContext.createGain();

  musicGain =
    audioContext.createGain();

  sfxGain =
    audioContext.createGain();

  musicGain.connect(
    masterGain
  );

  sfxGain.connect(
    masterGain
  );

  masterGain.connect(
    audioContext.destination
  );

  updateAudioVolumes();
}


/*
  Used by sound effects.

  IMPORTANT:

  This NEVER starts the music.

  Therefore clicking the pile to make a
  brick cannot be the thing that starts
  the soundtrack.
*/

async function ensureAudio() {
  createAudioGraph();

  if (
    audioContext.state ===
    "suspended"
  ) {
    try {
      await audioContext.resume();
    }

    catch {}
  }

  updateAudioVolumes();
}


/* =========================================================
   MUSIC STARTUP
   ========================================================= */

/*
  First try as soon as the tab/page loads.

  Browsers may reject audible autoplay.
*/

async function tryStartMusicOnTabLoad() {
  createAudioGraph();

  try {
    await audioContext.resume();
  }

  catch {}


  if (
    audioContext.state ===
    "running"
  ) {
    startMusic();

    return true;
  }

  return false;
}


/*
  Browser fallback.

  This may be called from a user gesture,
  but pile/canvas taps are deliberately
  ignored by the fallback listener below.
*/

async function startMusicFromUserGesture() {
  createAudioGraph();

  try {
    await audioContext.resume();
  }

  catch {}

  if (
    audioContext.state ===
    "running"
  ) {
    startMusic();

    return true;
  }

  return false;
}


/*
  If autoplay was blocked, wait for any
  NON-CANVAS interaction.

  So:
      click pile = brick only
      click UI / key / etc = unlock music

  The browser, tragically, remains sovereign.
*/

function installMusicAutoplayFallback() {
  const pointerFallback =
    async event => {
      if (
        event.target === canvas
        ||
        canvas.contains?.(
          event.target
        )
      ) {
        return;
      }

      const started =
        await startMusicFromUserGesture();

      if (started) {
        removeFallback();
      }
    };


  const keyboardFallback =
    async () => {
      const started =
        await startMusicFromUserGesture();

      if (started) {
        removeFallback();
      }
    };


  function removeFallback() {
    document.removeEventListener(
      "pointerdown",
      pointerFallback,
      true
    );

    document.removeEventListener(
      "keydown",
      keyboardFallback,
      true
    );
  }


  document.addEventListener(
    "pointerdown",
    pointerFallback,
    true
  );

  document.addEventListener(
    "keydown",
    keyboardFallback,
    true
  );
}


/* =========================================================
   AUDIO VOLUMES
   ========================================================= */

function updateAudioVolumes() {
  if (masterGain) {
    masterGain.gain.value =
      state.settings.masterVolume;
  }

  if (musicGain) {
    musicGain.gain.value =
      state.settings.musicEnabled
        ? state.settings.musicVolume
        : 0;
  }

  if (sfxGain) {
    sfxGain.gain.value =
      state.settings.sfxEnabled
        ? state.settings.sfxVolume
        : 0;
  }
}


/* =========================================================
   BASIC AUDIO
   ========================================================= */

function playTone(
  frequency,
  duration,
  volume,
  type = "square",
  output = sfxGain
) {
  if (
    !audioContext
    ||
    !output
  ) {
    return;
  }

  const now =
    audioContext.currentTime;

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    Math.max(
      25,
      frequency
    ),
    now
  );

  gain.gain.setValueAtTime(
    volume,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration
  );

  oscillator.connect(gain);

  gain.connect(output);

  oscillator.start(now);

  oscillator.stop(
    now +
    duration +
    0.02
  );
}


function playToneSweep(
  from,
  to,
  duration,
  volume,
  type = "square",
  output = sfxGain
) {
  if (
    !audioContext
    ||
    !output
  ) {
    return;
  }

  const now =
    audioContext.currentTime;

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    Math.max(
      25,
      from
    ),
    now
  );

  oscillator.frequency
    .exponentialRampToValueAtTime(
      Math.max(
        25,
        to
      ),
      now + duration
    );

  gain.gain.setValueAtTime(
    volume,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration
  );

  oscillator.connect(gain);

  gain.connect(output);

  oscillator.start(now);

  oscillator.stop(
    now +
    duration +
    0.02
  );
}


function playNoise(
  duration,
  volume,
  output = sfxGain
) {
  if (
    !audioContext
    ||
    !output
  ) {
    return;
  }

  const sampleRate =
    audioContext.sampleRate;

  const length =
    Math.max(
      1,
      Math.floor(
        sampleRate *
        duration
      )
    );

  const buffer =
    audioContext.createBuffer(
      1,
      length,
      sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (
    let i = 0;
    i < length;
    i++
  ) {
    data[i] =
      (
        Math.random() *
        2 -
        1
      ) *
      (
        1 -
        i / length
      );
  }

  const source =
    audioContext
      .createBufferSource();

  const gain =
    audioContext.createGain();

  source.buffer = buffer;

  gain.gain.value = volume;

  source.connect(gain);

  gain.connect(output);

  source.start();
}


/* =========================================================
   SFX
   ========================================================= */

function playLaunchSound() {
  ensureAudio();

  playToneSweep(
    280,
    360,
    0.045,
    0.032,
    "square"
  );
}


function playImpactSound(
  robot = false,
  gold = false
) {
  ensureAudio();

  playToneSweep(
    robot
      ? 102
      : 118,

    robot
      ? 57
      : 63,

    robot
      ? 0.14
      : 0.16,

    robot
      ? 0.05
      : 0.085,

    "triangle"
  );


  setTimeout(
    () => {
      playTone(
        robot
          ? 62
          : 72,

        0.065,

        robot
          ? 0.025
          : 0.038,

        "sine"
      );
    },

    6
  );


  setTimeout(
    () => {
      playTone(
        185,
        0.022,

        robot
          ? 0.012
          : 0.019,

        "square"
      );
    },

    3
  );


  if (gold) {
    setTimeout(
      () => {
        playTone(
          1250,
          0.055,
          0.04,
          "square"
        );
      },

      30
    );
  }
}


function playGoldSound() {
  ensureAudio();

  playToneSweep(
    720,
    1150,
    0.09,
    0.11
  );

  setTimeout(
    () => {
      playToneSweep(
        1040,
        1650,
        0.13,
        0.095
      );
    },
    55
  );

  setTimeout(
    () => {
      playToneSweep(
        1450,
        2050,
        0.12,
        0.06
      );
    },
    115
  );
}


function playRobotGrabSound() {
  ensureAudio();

  playToneSweep(
    175,
    110,
    0.08,
    0.035,
    "square"
  );

  playNoise(
    0.02,
    0.006
  );
}


function playUpgradeSound() {
  ensureAudio();

  playTone(
    392,
    0.09,
    0.06
  );

  setTimeout(
    () => {
      playTone(
        523.25,
        0.09,
        0.055
      );
    },
    55
  );

  setTimeout(
    () => {
      playTone(
        659.25,
        0.12,
        0.05
      );
    },
    110
  );
}


function playWindowOpenSound() {
  ensureAudio();

  playToneSweep(
    310,
    430,
    0.11,
    0.04,
    "triangle"
  );
}


function playWindowSuccess() {
  ensureAudio();

  playTone(
    523.25,
    0.08,
    0.065
  );

  setTimeout(
    () => {
      playTone(
        659.25,
        0.08,
        0.06
      );
    },
    55
  );

  setTimeout(
    () => {
      playTone(
        783.99,
        0.14,
        0.055
      );
    },
    110
  );
}


function playWindowFail() {
  ensureAudio();

  playToneSweep(
    190,
    78,
    0.2,
    0.06,
    "square"
  );
}


/* =========================================================
   OLD 8-BIT MUSIC
   ========================================================= */

const MUSIC_STEP_MS = 175;


const musicNotes = [
  130.81,
  146.83,
  164.81,
  174.61,
  196.00,
  220.00,
  246.94,
  261.63,
  293.66,
  329.63,
  349.23,
  392.00,
  440.00,
  493.88,
  523.25,
  587.33,
  659.25
];


const musicSections = [
  {
    melody: [
      7,9,11,9,
      8,11,12,11,
      9,8,7,-1,
      5,7,8,-1
    ],

    bass: [
      0,0,4,4,
      5,5,4,4,
      0,0,4,4,
      3,3,4,4
    ]
  },

  {
    melody: [
      9,11,14,12,
      11,9,8,9,
      11,12,14,-1,
      12,11,9,-1
    ],

    bass: [
      5,5,3,3,
      4,4,0,0,
      5,5,3,3,
      4,4,0,0
    ]
  },

  {
    melody: [
      7,-1,8,11,
      12,11,9,8,
      7,9,11,14,
      12,9,8,-1
    ],

    bass: [
      0,0,5,5,
      3,3,4,4,
      0,0,5,5,
      3,3,4,4
    ]
  },

  {
    melody: [
      12,11,9,8,
      11,14,16,14,
      12,11,9,7,
      8,9,7,-1
    ],

    bass: [
      5,5,4,4,
      3,3,0,0,
      5,5,4,4,
      3,3,0,0
    ]
  },

  {
    melody: [
      8,9,11,-1,
      14,12,11,9,
      8,11,12,14,
      11,9,8,-1
    ],

    bass: [
      3,3,5,5,
      0,0,4,4,
      3,3,5,5,
      0,0,4,4
    ]
  },

  {
    melody: [
      7,11,9,12,
      11,14,12,9,
      8,11,9,7,
      5,8,7,-1
    ],

    bass: [
      0,0,4,4,
      5,5,3,3,
      0,0,4,4,
      5,5,3,3
    ]
  },

  {
    melody: [
      9,12,14,16,
      14,12,11,9,
      11,14,12,9,
      8,7,9,-1
    ],

    bass: [
      5,5,0,0,
      3,3,4,4,
      5,5,0,0,
      3,3,4,4
    ]
  },

  {
    melody: [
      7,8,9,11,
      9,8,7,5,
      8,11,14,12,
      9,8,7,-1
    ],

    bass: [
      0,0,3,3,
      5,5,4,4,
      0,0,3,3,
      5,5,4,4
    ]
  }
];


/* =========================================================
   AUDIO-CLOCK MUSIC
   ========================================================= */

function musicToneAt(
  frequency,
  duration,
  volume,
  type,
  when
) {
  if (
    !audioContext
    ||
    !musicGain
    ||
    !state.settings.musicEnabled
  ) {
    return;
  }

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    Math.max(
      25,
      frequency
    ),
    when
  );

  gain.gain.setValueAtTime(
    volume,
    when
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    when + duration
  );

  oscillator.connect(gain);

  gain.connect(musicGain);

  oscillator.start(when);

  oscillator.stop(
    when +
    duration +
    0.02
  );
}


function scheduleMusicStep(
  stepNumber,
  when
) {
  const sectionLength = 16;

  const sectionIndex =
    Math.floor(
      stepNumber /
      sectionLength
    ) %
    musicSections.length;

  const localStep =
    stepNumber %
    sectionLength;

  const section =
    musicSections[
      sectionIndex
    ];

  const melodyIndex =
    section.melody[
      localStep
    ];


  if (melodyIndex >= 0) {
    musicToneAt(
      musicNotes[
        melodyIndex
      ],
      0.15,
      0.07,
      "square",
      when
    );
  }


  if (
    localStep %
    4 === 0
  ) {
    const bassIndex =
      section.bass[
        localStep
      ];

    musicToneAt(
      musicNotes[
        bassIndex
      ] /
      2,
      0.40,
      0.065,
      "triangle",
      when
    );
  }


  if (
    localStep === 4
    ||
    localStep === 12
  ) {
    const bassIndex =
      section.bass[
        localStep
      ];

    musicToneAt(
      musicNotes[
        bassIndex
      ],
      0.08,
      0.020,
      "square",
      when
    );
  }


  if (
    localStep === 0
    ||
    localStep === 8
  ) {
    musicToneAt(
      72,
      0.04,
      0.018,
      "square",
      when
    );
  }
}


function musicScheduler() {
  if (
    !audioContext
    ||
    !musicStarted
  ) {
    return;
  }

  const stepSeconds =
    MUSIC_STEP_MS /
    1000;

  if (
    musicNextTime <
    audioContext.currentTime -
    stepSeconds
  ) {
    musicNextTime =
      audioContext.currentTime +
      0.05;
  }

  while (
    musicNextTime <
    audioContext.currentTime +
    MUSIC_LOOKAHEAD
  ) {
    scheduleMusicStep(
      musicStep,
      musicNextTime
    );

    musicStep++;

    musicNextTime +=
      stepSeconds;
  }
}


function startMusic() {
  if (
    musicStarted
    ||
    !audioContext
    ||
    audioContext.state !==
    "running"
  ) {
    return;
  }

  musicStarted = true;

  musicNextTime =
    audioContext.currentTime +
    0.05;

  musicScheduler();

  if (!musicTimer) {
    musicTimer =
      setInterval(
        musicScheduler,
        MUSIC_SCHEDULER_RATE
      );
  }
}


/* =========================================================
   SETTINGS
   ========================================================= */

function refreshSettingsUI() {
  if (ui.masterVolume) {
    ui.masterVolume.value =
      Math.round(
        state.settings.masterVolume *
        100
      );
  }

  if (ui.musicVolume) {
    ui.musicVolume.value =
      Math.round(
        state.settings.musicVolume *
        100
      );
  }

  if (ui.sfxVolume) {
    ui.sfxVolume.value =
      Math.round(
        state.settings.sfxVolume *
        100
      );
  }

  if (ui.masterVolumeText) {
    ui.masterVolumeText.textContent =
      Math.round(
        state.settings.masterVolume *
        100
      ) + "%";
  }

  if (ui.musicVolumeText) {
    ui.musicVolumeText.textContent =
      Math.round(
        state.settings.musicVolume *
        100
      ) + "%";
  }

  if (ui.sfxVolumeText) {
    ui.sfxVolumeText.textContent =
      Math.round(
        state.settings.sfxVolume *
        100
      ) + "%";
  }

  if (ui.musicToggle) {
    ui.musicToggle.textContent =
      state.settings.musicEnabled
        ? "MUSIC: ON"
        : "MUSIC: OFF";
  }

  if (ui.sfxToggle) {
    ui.sfxToggle.textContent =
      state.settings.sfxEnabled
        ? "SFX: ON"
        : "SFX: OFF";
  }
}


if (ui.settingsButton) {
  ui.settingsButton.addEventListener(
    "click",

    async () => {
      await startMusicFromUserGesture();

      if (ui.settingsPanel) {
        ui.settingsPanel.classList.toggle(
          "hidden"
        );
      }

      refreshSettingsUI();
    }
  );
}


if (ui.closeSettings) {
  ui.closeSettings.addEventListener(
    "click",

    () => {
      if (ui.settingsPanel) {
        ui.settingsPanel.classList.add(
          "hidden"
        );
      }
    }
  );
}


if (ui.masterVolume) {
  ui.masterVolume.addEventListener(
    "input",

    () => {
      state.settings.masterVolume =
        Number(
          ui.masterVolume.value
        ) /
        100;

      updateAudioVolumes();

      refreshSettingsUI();

      saveGame();
    }
  );
}


if (ui.musicVolume) {
  ui.musicVolume.addEventListener(
    "input",

    () => {
      state.settings.musicVolume =
        Number(
          ui.musicVolume.value
        ) /
        100;

      updateAudioVolumes();

      refreshSettingsUI();

      saveGame();
    }
  );
}


if (ui.sfxVolume) {
  ui.sfxVolume.addEventListener(
    "input",

    () => {
      state.settings.sfxVolume =
        Number(
          ui.sfxVolume.value
        ) /
        100;

      updateAudioVolumes();

      refreshSettingsUI();

      saveGame();
    }
  );
}


if (ui.musicToggle) {
  ui.musicToggle.addEventListener(
    "click",

    async () => {
      await startMusicFromUserGesture();

      state.settings.musicEnabled =
        !state.settings.musicEnabled;

      updateAudioVolumes();

      refreshSettingsUI();

      saveGame();
    }
  );
}


if (ui.sfxToggle) {
  ui.sfxToggle.addEventListener(
    "click",

    () => {
      ensureAudio();

      state.settings.sfxEnabled =
        !state.settings.sfxEnabled;

      updateAudioVolumes();

      refreshSettingsUI();

      saveGame();
    }
  );
}


/* =========================================================
   REBIRTH
   ========================================================= */

function canRebirth() {
  return (
    towerHeightMeters() >= 150
    &&
    state.money >= 5000
  );
}


function rebirthGain() {
  if (!canRebirth()) {
    return 0;
  }

  return Math.max(
    1,
    Math.floor(
      towerHeightMeters() /
      150
    )
    +
    Math.floor(
      state.money /
      5000
    )
  );
}


function rebirth() {
  if (!canRebirth()) {
    return;
  }

  state.blueprints +=
    rebirthGain();

  state.rebirths++;

  state.money = 0;

  state.bricks = 7;

  state.windows = [];

  state.attemptedWindowRows = [];

  state.goldenBricks = [];

  state.nextManualAt = 0;

  state.autoAccumulator = 0;

  state.pendingAuto = 0;

  for (
    const definition
    of upgradeDefinitions
  ) {
    if (
      definition.currency ===
      "money"
    ) {
      delete state
        .purchasedUpgrades[
          definition.id
        ];
    }
  }

  state.pileSeed =
    Math.floor(
      Math.random() *
      999999999
    );

  generatePileLayout();

  cameraRow = 0;

  cameraFollowingTop = true;

  robotArm = null;

  flyingBricks.length = 0;

  particles.length = 0;

  rebuildUpgradeEffects();

  playUpgradeSound();

  saveGame();

  renderUpgradeDrawer();
}


if (ui.rebirthButton) {
  ui.rebirthButton.addEventListener(
    "click",
    rebirth
  );
}


/* =========================================================
   SAVE / LOAD
   ========================================================= */

function saveGame() {
  try {
    localStorage.setItem(
      SAVE_KEY,

      JSON.stringify({
        version: 15,

        money:
          state.money,

        bricks:
          state.bricks,

        blueprints:
          state.blueprints,

        rebirths:
          state.rebirths,

        windows:
          state.windows,

        attemptedWindowRows:
          state.attemptedWindowRows,

        goldenBricks:
          state.goldenBricks,

        purchasedUpgrades:
          state.purchasedUpgrades,

        pileSeed:
          state.pileSeed,

        settings:
          state.settings
      })
    );
  }

  catch (error) {
    console.error(
      "SAVE ERROR:",
      error
    );
  }
}


function findSave() {
  const current =
    localStorage.getItem(
      SAVE_KEY
    );

  if (current) {
    return current;
  }

  for (
    const key
    of OLD_SAVE_KEYS
  ) {
    const save =
      localStorage.getItem(key);

    if (save) {
      return save;
    }
  }

  return null;
}


function loadGame() {
  const raw =
    findSave();

  if (!raw) {
    generatePileLayout();

    rebuildUpgradeEffects();

    refreshSettingsUI();

    return;
  }

  try {
    const loaded =
      JSON.parse(raw);

    state.money =
      Number(
        loaded.money
      ) || 0;

    state.bricks =
      Math.max(
        7,
        Number(
          loaded.bricks
        ) || 7
      );

    state.blueprints =
      Math.max(
        0,
        Number(
          loaded.blueprints
        ) || 0
      );

    state.rebirths =
      Math.max(
        0,
        Number(
          loaded.rebirths
        ) || 0
      );

    state.windows =
      Array.isArray(
        loaded.windows
      )
        ? loaded.windows
        : [];

    state.attemptedWindowRows =
      Array.isArray(
        loaded.attemptedWindowRows
      )
        ? loaded.attemptedWindowRows
        : [];

    state.goldenBricks =
      Array.isArray(
        loaded.goldenBricks
      )
        ? loaded.goldenBricks
        : [];

    state.purchasedUpgrades =
      loaded.purchasedUpgrades
      || {};

    state.pileSeed =
      typeof loaded.pileSeed ===
      "number"
        ? loaded.pileSeed
        : Math.floor(
            Math.random() *
            999999999
          );

    if (loaded.settings) {
      state.settings = {
        masterVolume:
          Number(
            loaded.settings
              .masterVolume
          ) || 0.82,

        musicVolume:
          Number(
            loaded.settings
              .musicVolume
          ) || 0.78,

        sfxVolume:
          Number(
            loaded.settings
              .sfxVolume
          ) || 0.8,

        musicEnabled:
          loaded.settings
            .musicEnabled !==
          false,

        sfxEnabled:
          loaded.settings
            .sfxEnabled !==
          false
      };
    }

    state.nextManualAt = 0;

    state.autoAccumulator = 0;

    state.pendingAuto = 0;

    generatePileLayout();

    rebuildUpgradeEffects();

    refreshSettingsUI();

    saveGame();
  }

  catch (error) {
    console.error(
      "LOAD ERROR:",
      error
    );

    generatePileLayout();

    rebuildUpgradeEffects();

    refreshSettingsUI();
  }
}


if (ui.saveButton) {
  ui.saveButton.addEventListener(
    "click",

    async () => {
      await startMusicFromUserGesture();

      saveGame();

      if (ui.saveStatus) {
        ui.saveStatus.textContent =
          "SAVED!";

        setTimeout(
          () => {
            ui.saveStatus.textContent =
              "LOCAL SAVE";
          },
          1200
        );
      }
    }
  );
}


window.addEventListener(
  "beforeunload",
  saveGame
);


document.addEventListener(
  "visibilitychange",

  () => {
    if (document.hidden) {
      saveGame();
    }

    else if (
      audioContext &&
      musicStarted
    ) {
      musicNextTime =
        audioContext.currentTime +
        0.05;
    }
  }
);


/* =========================================================
   PILE HIT TEST
   ========================================================= */

function pointHitsPile(
  x,
  y
) {
  const offset =
    pileBaseOffset();

  const pileTop =
    pileBounds.minTop +
    offset;

  const pileBottom =
    pileBounds.maxBottom +
    offset;

  return (
    x >=
    pileBounds.minX - 4
    &&
    x <=
    pileBounds.maxX + 4
    &&
    y >=
    pileTop - 4
    &&
    y <=
    pileBottom + 4
  );
}


/* =========================================================
   DESKTOP PILE CLICK
   ========================================================= */

canvas.addEventListener(
  "pointerdown",

  event => {
    if (
      event.pointerType ===
      "touch"
    ) {
      return;
    }

    const position =
      eventCanvasPosition(event);

    if (
      pointHitsPile(
        position.x,
        position.y
      )
    ) {
      /*
        Intentionally DOES NOT
        start the music.
      */

      manualPlace();
    }
  }
);


/* =========================================================
   MOBILE PILE TAP
   ========================================================= */

canvas.addEventListener(
  "pointerup",

  event => {
    if (
      event.pointerType !==
      "touch"
      ||
      !touchCameraDrag
    ) {
      return;
    }

    if (!touchMoved) {
      const position =
        eventCanvasPosition(
          event
        );

      if (
        pointHitsPile(
          position.x,
          position.y
        )
      ) {
        /*
          Also does NOT start music.
        */

        manualPlace();
      }
    }

    touchCameraDrag = false;
  }
);


canvas.addEventListener(
  "pointercancel",

  event => {
    if (
      event.pointerType ===
      "touch"
    ) {
      touchCameraDrag = false;
    }
  }
);


/* =========================================================
   SPACEBAR
   ========================================================= */

window.addEventListener(
  "keydown",

  event => {
    if (
      event.code ===
      "Space"
      &&
      !event.repeat
    ) {
      event.preventDefault();

      /*
        Spacebar places brick.

        We leave music startup to the
        autoplay/fallback system.
      */

      manualPlace();
    }
  }
);


/* =========================================================
   HUD
   ========================================================= */

function renderUI() {
  const remaining =
    Math.max(
      0,
      state.nextManualAt -
      performance.now()
    );

  if (ui.money) {
    ui.money.textContent =
      "$" +
      formatNumber(
        state.money
      );
  }

  if (ui.height) {
    ui.height.textContent =
      towerHeightMeters() +
      " m";
  }

  if (ui.bricks) {
    ui.bricks.textContent =
      formatNumber(
        state.bricks
      );
  }

  if (ui.multiplier) {
    ui.multiplier.textContent =
      state.runMultiplier
        .toFixed(1) +
      "x";
  }

  if (ui.blueprints) {
    ui.blueprints.textContent =
      formatNumber(
        state.blueprints
      );
  }

  if (ui.cooldownText) {
    ui.cooldownText.textContent =
      remaining <= 0
        ? "READY"
        : (
            remaining /
            1000
          ).toFixed(1) +
          "s";
  }

  if (ui.cooldownFill) {
    ui.cooldownFill.style.width =
      `${
        clamp(
          remaining <= 0
            ? 1
            : 1 -
              remaining /
              state.cooldownMs,
          0,
          1
        ) *
        100
      }%`;
  }

  if (ui.rebirthButton) {
    ui.rebirthButton.disabled =
      !canRebirth();
  }

  if (ui.rebirthInfo) {
    ui.rebirthInfo.textContent =
      canRebirth()
        ? `GAIN ${rebirthGain()} BLUEPRINTS`
        : "REQUIRES 150 m + $5,000";
  }
}


/* =========================================================
   RENDER
   ========================================================= */

function renderGame() {
  updateCamera();

  ctx.save();

  if (screenShake > 0) {
    ctx.translate(
      (
        Math.random() -
        0.5
      ) *
      screenShake,

      (
        Math.random() -
        0.5
      ) *
      screenShake
    );
  }

  drawSky();

  drawSpaceDecor();

  drawGround();

  drawFoundation();

  drawPile();

  drawTower();

  drawFlying();

  drawRobot();

  drawParticles();

  ctx.restore();
}


/* =========================================================
   LOOP
   ========================================================= */

let previousTime =
  performance.now();

let autosaveTimer = 0;

let upgradeRefreshTimer = 0;


function loop(now) {
  const delta =
    Math.min(
      0.08,

      Math.max(
        0,

        (
          now -
          previousTime
        ) /
        1000
      )
    );

  previousTime = now;

  flameTime += delta;

  updateCamera();

  updateFlying(delta);

  updateAutomation(delta);

  updateRobot(delta);

  updateWindowGame(delta);

  updateParticles(delta);

  screenShake =
    Math.max(
      0,
      screenShake -
      delta * 3
    );

  autosaveTimer += delta;

  if (
    autosaveTimer >= 5
  ) {
    autosaveTimer = 0;

    saveGame();
  }

  upgradeRefreshTimer +=
    delta;

  if (
    upgradeRefreshTimer >=
    0.3
  ) {
    upgradeRefreshTimer = 0;

    refreshUpgradeAffordability();
  }

  renderGame();

  renderUI();

  requestAnimationFrame(loop);
}


/* =========================================================
   START
   ========================================================= */

loadGame();

updateCamera();

refreshSettingsUI();

renderUpgradeDrawer();

renderUI();

updateOrientationBlocker();


requestAnimationFrame(
  () => {
    snapDrawer(false);
  }
);


/*
  TRY TO START MUSIC IMMEDIATELY
  WHEN THE TAB/PAGE LOADS.
*/

tryStartMusicOnTabLoad()
  .then(started => {
    if (!started) {
      installMusicAutoplayFallback();
    }
  });


requestAnimationFrame(loop);