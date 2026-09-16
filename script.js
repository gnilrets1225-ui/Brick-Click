(() => {
  "use strict";

  // =========================================================
  // COLINIZATION CLICKER
  // V21 - PIXEL SPACE EDITION
  // =========================================================

  const SAVE_KEY = "colinization-clicker-v21";
  const COST_GROWTH = 1.15;

  const ART = 224;
  const CX = ART / 2;
  const CY = ART / 2;
  const PLANET_RADIUS = 100;

  const DEG = Math.PI / 180;

  const BASE_EARTH_POPULATION = 8_000_000_000;


  // =========================================================
  // WORLDS
  // =========================================================

  const worlds = [

    {
      id: "sun",
      name: "SUN",
      subtitle: "Stellar Industry",
      kind: "sun",

      unlockCost: 2e16,
      baseClick: 2e8,

      trafficBuilding: "dyson",

      automation: [

        {
          id: "collectors",
          name: "Solar Collectors",
          description:
            "Orbital collectors harvest enormous amounts of stellar energy.",

          baseCost: 4e13,
          baseCps: 1.2e12,
          population: 0,

          sprite: "solarCollector"
        },

        {
          id: "scoops",
          name: "Helium Scoops",
          description:
            "Magnetic stations harvest fusion fuel directly from the corona.",

          baseCost: 5e14,
          baseCps: 1.6e13,
          population: 0,

          sprite: "heliumScoop"
        },

        {
          id: "fusionRings",
          name: "Fusion Rings",
          description:
            "Huge orbital rings process stellar plasma.",

          baseCost: 7e15,
          baseCps: 2.6e14,
          population: 0,

          sprite: "fusionRing"
        },

        {
          id: "dyson",
          name: "Dyson Swarm",
          description:
            "Millions of collectors begin surrounding the Sun.",

          baseCost: 1e17,
          baseCps: 4e15,
          population: 0,

          sprite: "dyson"
        }
      ]
    },


    {
      id: "mercury",
      name: "MERCURY",
      subtitle: "Solar Frontier",
      kind: "mercury",

      unlockCost: 8e9,
      baseClick: 120,

      trafficBuilding: "sunshields",

      automation: [

        {
          id: "shelters",
          name: "Thermal Shelters",
          description:
            "Deep shielded settlements survive Mercury's brutal temperature swings.",

          baseCost: 6e6,
          baseCps: 1800,
          population: 40_000_000,

          sprite: "mercuryShelter"
        },

        {
          id: "stripMines",
          name: "Strip Mines",
          description:
            "Industrial mining complexes rip through the metallic crust.",

          baseCost: 4e7,
          baseCps: 12000,
          population: 8_000_000,

          sprite: "mercuryMine"
        },

        {
          id: "solarTowers",
          name: "Solar Towers",
          description:
            "Extreme sunlight makes enormous solar towers absurdly productive.",

          baseCost: 4e8,
          baseCps: 90000,
          population: 2_000_000,

          sprite: "solarTower"
        },

        {
          id: "sunshields",
          name: "Sunshield Arrays",
          description:
            "Gigantic shades protect cities and industry.",

          baseCost: 3e9,
          baseCps: 700000,
          population: 12_000_000,

          sprite: "sunshield"
        }
      ]
    },


    {
      id: "venus",
      name: "VENUS",
      subtitle: "Cloud Civilization",
      kind: "venus",

      unlockCost: 1.5e9,
      baseClick: 60,

      trafficBuilding: "skimmers",

      automation: [

        {
          id: "aerostats",
          name: "Aerostat Habitats",
          description:
            "Floating settlements occupy Venus's upper atmosphere.",

          baseCost: 1e7,
          baseCps: 4500,
          population: 60_000_000,

          sprite: "aerostat"
        },

        {
          id: "cloudRefineries",
          name: "Cloud Refineries",
          description:
            "Suspended industry processes atmospheric chemicals.",

          baseCost: 7e7,
          baseCps: 30000,
          population: 8_000_000,

          sprite: "cloudRefinery"
        },

        {
          id: "floatingCities",
          name: "Floating Cities",
          description:
            "Huge inhabited platforms drift through the Venusian clouds.",

          baseCost: 5e8,
          baseCps: 220000,
          population: 240_000_000,

          sprite: "floatingCity"
        },

        {
          id: "skimmers",
          name: "Atmospheric Skimmers",
          description:
            "Fast industrial craft harvest valuable gases.",

          baseCost: 4e9,
          baseCps: 1500000,
          population: 3_000_000,

          sprite: "venusSkimmer"
        }
      ]
    },


    {
      id: "earth",
      name: "EARTH",
      subtitle: "Homeworld",
      kind: "earth",

      unlockCost: 0,
      baseClick: 1,

      trafficBuilding: "spaceports",

      automation: [

        {
          id: "houses",
          name: "Houses",
          description:
            "Residential neighborhoods provide a small steady economy.",

          baseCost: 15,
          baseCps: 0.1,
          population: 20_000_000,

          sprite: "house"
        },

        {
          id: "towns",
          name: "Towns",
          description:
            "Towns support trade, services and local industry.",

          baseCost: 100,
          baseCps: 1,
          population: 50_000_000,

          sprite: "town"
        },

        {
          id: "cities",
          name: "Cities",
          description:
            "Large metropolitan economies generate serious Materials.",

          baseCost: 1100,
          baseCps: 8,
          population: 100_000_000,

          sprite: "city"
        },

        {
          id: "factories",
          name: "Industrial Zones",
          description:
            "Factories produce Materials continuously.",

          baseCost: 12000,
          baseCps: 47,
          population: 15_000_000,

          sprite: "factory"
        },

        {
          id: "spaceports",
          name: "Spaceports",
          description:
            "Launch infrastructure opens Earth's orbital economy.",

          baseCost: 130000,
          baseCps: 260,
          population: 5_000_000,

          sprite: "spaceport"
        },

        {
          id: "stations",
          name: "Orbital Stations",
          description:
            "Permanent stations manufacture and trade above Earth.",

          baseCost: 1400000,
          baseCps: 1400,
          population: 2_000_000,

          sprite: "station"
        }
      ]
    },


    {
      id: "moon",
      name: "MOON",
      subtitle: "Lunar Colony",
      kind: "moon",

      unlockCost: 250000,
      baseClick: 4,

      trafficBuilding: "massDrivers",

      automation: [

        {
          id: "domes",
          name: "Lunar Domes",
          description:
            "Pressurized settlements permanently house lunar colonists.",

          baseCost: 8000,
          baseCps: 5,
          population: 25_000_000,

          sprite: "moonDome"
        },

        {
          id: "excavators",
          name: "Excavators",
          description:
            "Heavy machines process mountains of lunar regolith.",

          baseCost: 45000,
          baseCps: 30,
          population: 5_000_000,

          sprite: "excavator"
        },

        {
          id: "refineries",
          name: "Lunar Refineries",
          description:
            "Industrial complexes refine lunar resources.",

          baseCost: 250000,
          baseCps: 180,
          population: 8_000_000,

          sprite: "lunarRefinery"
        },

        {
          id: "massDrivers",
          name: "Mass Drivers",
          description:
            "Electromagnetic launch systems fire cargo directly into orbit.",

          baseCost: 1400000,
          baseCps: 1000,
          population: 3_000_000,

          sprite: "massDriver"
        }
      ]
    },


    {
      id: "mars",
      name: "MARS",
      subtitle: "Frontier World",
      kind: "mars",

      unlockCost: 1.2e7,
      baseClick: 16,

      trafficBuilding: "terraformers",

      automation: [

        {
          id: "habitats",
          name: "Habitats",
          description:
            "Pressurized settlements spread across the Martian surface.",

          baseCost: 300000,
          baseCps: 100,
          population: 50_000_000,

          sprite: "marsHabitat"
        },

        {
          id: "mines",
          name: "Martian Mines",
          description:
            "Mining complexes exploit mineral-rich terrain.",

          baseCost: 1600000,
          baseCps: 600,
          population: 8_000_000,

          sprite: "marsMine"
        },

        {
          id: "arcologies",
          name: "Arcologies",
          description:
            "Huge enclosed cities dominate the landscape.",

          baseCost: 9000000,
          baseCps: 3500,
          population: 100_000_000,

          sprite: "arcology"
        },

        {
          id: "terraformers",
          name: "Terraformers",
          description:
            "Mega-machines begin modifying the Martian atmosphere.",

          baseCost: 50000000,
          baseCps: 20000,
          population: 25_000_000,

          sprite: "terraformer"
        }
      ]
    },


    {
      id: "asteroids",
      name: "ASTEROID BELT",
      subtitle: "Deep-Space Mining",
      kind: "asteroids",

      unlockCost: 2.5e8,
      baseClick: 32,

      trafficBuilding: "haulers",

      automation: [

        {
          id: "prospectors",
          name: "Prospector Camps",
          description:
            "Small crews survey useful asteroids.",

          baseCost: 5e6,
          baseCps: 1800,
          population: 3_000_000,

          sprite: "prospector"
        },

        {
          id: "rigs",
          name: "Mining Rigs",
          description:
            "Heavy rigs drill directly into metallic asteroids.",

          baseCost: 4e7,
          baseCps: 12000,
          population: 2_000_000,

          sprite: "asteroidRig"
        },

        {
          id: "haulers",
          name: "Ore Haulers",
          description:
            "Cargo ships move ore between mining sites.",

          baseCost: 3.2e8,
          baseCps: 85000,
          population: 600_000,

          sprite: "oreHauler"
        },

        {
          id: "hubs",
          name: "Refinery Hubs",
          description:
            "Zero-gravity industry processes entire asteroid clusters.",

          baseCost: 2.6e9,
          baseCps: 560000,
          population: 8_000_000,

          sprite: "beltHub"
        }
      ]
    },


    {
      id: "jupiter",
      name: "JUPITER",
      subtitle: "Gas Giant Industry",
      kind: "jupiter",

      unlockCost: 5e11,
      baseClick: 512,

      trafficBuilding: "helium",

      automation: [

        {
          id: "platforms",
          name: "Cloud Platforms",
          description:
            "Gigantic industrial platforms float in Jupiter's atmosphere.",

          baseCost: 8e9,
          baseCps: 4e6,
          population: 80_000_000,

          sprite: "gasPlatform"
        },

        {
          id: "helium",
          name: "Helium Skimmers",
          description:
            "Industrial craft harvest valuable atmospheric gases.",

          baseCost: 6e10,
          baseCps: 2.8e7,
          population: 5_000_000,

          sprite: "jupiterSkimmer"
        },

        {
          id: "cloudCities",
          name: "Floating Cities",
          description:
            "Huge inhabited cities ride Jupiter's atmosphere.",

          baseCost: 5e11,
          baseCps: 1.9e8,
          population: 500_000_000,

          sprite: "gasCity"
        },

        {
          id: "storm",
          name: "Storm Harvesters",
          description:
            "Immense systems harvest energy from Jovian storms.",

          baseCost: 4e12,
          baseCps: 1.3e9,
          population: 15_000_000,

          sprite: "stormHarvester"
        }
      ]
    },


    {
      id: "saturn",
      name: "SATURN",
      subtitle: "Ring Civilization",
      kind: "saturn",

      unlockCost: 1e13,
      baseClick: 4096,

      trafficBuilding: "ringStations",

      automation: [

        {
          id: "ringMines",
          name: "Ring Mines",
          description:
            "Mining systems harvest material from Saturn's rings.",

          baseCost: 1.5e11,
          baseCps: 8e7,
          population: 20_000_000,

          sprite: "ringMine"
        },

        {
          id: "habitats",
          name: "Cloud Habitats",
          description:
            "Floating settlements expand through the Saturn system.",

          baseCost: 1.2e12,
          baseCps: 5.5e8,
          population: 200_000_000,

          sprite: "saturnHabitat"
        },

        {
          id: "foundries",
          name: "Orbital Foundries",
          description:
            "Ring-fed factories manufacture enormous orbital structures.",

          baseCost: 9e12,
          baseCps: 3.8e9,
          population: 10_000_000,

          sprite: "orbitalFoundry"
        },

        {
          id: "ringStations",
          name: "Ring Stations",
          description:
            "Massive transit stations connect Saturn's colonies.",

          baseCost: 7e13,
          baseCps: 2.6e10,
          population: 90_000_000,

          sprite: "ringStation"
        }
      ]
    },


    {
      id: "uranus",
      name: "URANUS",
      subtitle: "Ice Giant Outpost",
      kind: "uranus",

      unlockCost: 2.5e14,
      baseClick: 32768,

      trafficBuilding: "labs",

      automation: [

        {
          id: "aerostats",
          name: "Ice Aerostats",
          description:
            "Cold-weather habitats float in the atmosphere.",

          baseCost: 4e12,
          baseCps: 2.2e9,
          population: 140_000_000,

          sprite: "iceAerostat"
        },

        {
          id: "methane",
          name: "Methane Skimmers",
          description:
            "Skimmers collect methane and hydrogen.",

          baseCost: 3e13,
          baseCps: 1.5e10,
          population: 5_000_000,

          sprite: "iceSkimmer"
        },

        {
          id: "platforms",
          name: "Ice Platforms",
          description:
            "Outer-system industrial platforms process local resources.",

          baseCost: 2.4e14,
          baseCps: 1.05e11,
          population: 40_000_000,

          sprite: "icePlatform"
        },

        {
          id: "labs",
          name: "Orbital Laboratories",
          description:
            "Remote laboratories develop advanced technology.",

          baseCost: 1.9e15,
          baseCps: 7.2e11,
          population: 20_000_000,

          sprite: "orbitalLab"
        }
      ]
    },


    {
      id: "neptune",
      name: "NEPTUNE",
      subtitle: "Outer Frontier",
      kind: "neptune",

      unlockCost: 5e15,
      baseClick: 262144,

      trafficBuilding: "stations",

      automation: [

        {
          id: "habitats",
          name: "Pressure Habitats",
          description:
            "Reinforced habitats endure Neptune's brutal winds.",

          baseCost: 8e13,
          baseCps: 4e10,
          population: 160_000_000,

          sprite: "neptuneHabitat"
        },

        {
          id: "wind",
          name: "Wind Harvesters",
          description:
            "Huge machines extract power from the atmosphere.",

          baseCost: 6e14,
          baseCps: 2.8e11,
          population: 5_000_000,

          sprite: "windHarvester"
        },

        {
          id: "refineries",
          name: "Cloud Refineries",
          description:
            "Floating refineries process atmospheric resources.",

          baseCost: 5e15,
          baseCps: 1.9e12,
          population: 30_000_000,

          sprite: "neptuneRefinery"
        },

        {
          id: "stations",
          name: "Storm Stations",
          description:
            "Massive stations operate above Neptune's storms.",

          baseCost: 4e16,
          baseCps: 1.3e13,
          population: 120_000_000,

          sprite: "neptuneStation"
        }
      ]
    }
  ];


  // =========================================================
  // GENERATED UPGRADES
  // =========================================================

  function addGeneratedUpgrades() {

    for (const currentWorld of worlds) {

      const first =
        currentWorld.automation[0];


      const second =
        currentWorld.automation[1] || first;


      currentWorld.upgrades = [

        {
          id:
            `${currentWorld.id}_player_1`,

          category:
            "player",

          name:
            `${first.name} Support`,

          description:
            "Better infrastructure improves manual harvesting.",

          effectText:
            "Manual harvesting ×2",

          cost:
            Math.max(
              100,
              first.baseCost * 8
            ),

          requires: {
            building:
              first.id,

            count:
              10
          },

          type:
            "clickMultiplier",

          value:
            2,

          iconSprite:
            first.sprite
        },


        {
          id:
            `${currentWorld.id}_player_2`,

          category:
            "player",

          name:
            `${second.name} Network`,

          description:
            "A larger network makes manual harvesting much stronger.",

          effectText:
            "Manual harvesting ×3",

          cost:
            Math.max(
              1000,
              second.baseCost * 24
            ),

          requires: {
            building:
              second.id,

            count:
              20
          },

          type:
            "clickMultiplier",

          value:
            3,

          iconSprite:
            second.sprite
        }
      ];


      for (const building of currentWorld.automation) {

        currentWorld.upgrades.push(

          {
            id:
              `${currentWorld.id}_${building.id}_u1`,

            category:
              "item",

            name:
              `Improved ${building.name}`,

            description:
              `${building.name} receive upgraded equipment and a visible redesign.`,

            effectText:
              `${building.name} output ×2`,

            cost:
              Math.max(
                250,
                building.baseCost * 18
              ),

            requires: {
              building:
                building.id,

              count:
                10
            },

            type:
              "buildingMultiplier",

            target:
              building.id,

            value:
              2,

            visualTier:
              1,

            iconSprite:
              building.sprite
          },


          {
            id:
              `${currentWorld.id}_${building.id}_u2`,

            category:
              "item",

            name:
              `Advanced ${building.name}`,

            description:
              `${building.name} receive another major redesign.`,

            effectText:
              `${building.name} output ×2 again`,

            cost:
              Math.max(
                2500,
                building.baseCost * 110
              ),

            requires: {
              building:
                building.id,

              count:
                25
            },

            type:
              "buildingMultiplier",

            target:
              building.id,

            value:
              2,

            visualTier:
              2,

            iconSprite:
              building.sprite
          }

        );
      }


      const trafficBuilding =
        currentWorld
          .automation
          .find(
            building =>
              building.id ===
              currentWorld.trafficBuilding
          );


      if (trafficBuilding) {

        currentWorld.upgrades.push({

          id:
            `${currentWorld.id}_traffic`,

          category:
            "item",

          name:
            currentWorld.id === "earth"
              ? "Orbital Shipping Lanes"
              : "Interplanetary Shipping",

          description:
            currentWorld.id === "earth"
              ? "Cargo spacecraft occasionally cross Earth orbit."
              : "Visible cargo traffic begins travelling through local space.",

          effectText:
            "Unlocks visible spacecraft traffic",

          cost:
            Math.max(
              5000,
              trafficBuilding.baseCost * 10
            ),

          requires: {
            building:
              trafficBuilding.id,

            count:
              5
          },

          type:
            "shipTraffic",

          target:
            trafficBuilding.id,

          value:
            1,

          visualTier:
            0,

          iconSprite:
            trafficBuilding.sprite
        });
      }
    }
  }


  addGeneratedUpgrades();


  // =========================================================
  // STATE
  // =========================================================

  const EARTH_INDEX =
    worlds.findIndex(
      currentWorld =>
        currentWorld.id === "earth"
    );


  const state = {

    materials: 0,

    currentWorld:
      EARTH_INDEX,

    unlocked:
      Object.fromEntries(
        worlds.map(
          currentWorld => [
            currentWorld.id,
            currentWorld.id === "earth"
          ]
        )
      ),

    buildings: {},

    upgrades: {},

    upgradeCategory:
      "player",

    theme:
      "dark"
  };


  // =========================================================
  // DOM
  // =========================================================

  const $ =
    id =>
      document.getElementById(id);


  const el = {

    materials:
      $("materials"),

    clickPower:
      $("clickPower"),

    cps:
      $("cps"),

    population:
      $("population"),

    planetName:
      $("planetName"),

    planetSubtitle:
      $("planetSubtitle"),

    previousPlanet:
      $("previousPlanet"),

    nextPlanet:
      $("nextPlanet"),

    planetScene:
      $("planetScene"),

    planetButton:
      $("planetButton"),

    planetCanvas:
      $("planetCanvas"),

    orbitCanvas:
      $("orbitCanvas"),

    clickCanvas:
      $("clickCanvas"),

    floatingNumbers:
      $("floatingNumbers"),

    lockOverlay:
      $("lockOverlay"),

    lockTitle:
      $("lockTitle"),

    lockCost:
      $("lockCost"),

    unlockButton:
      $("unlockButton"),

    worldCps:
      $("worldCps"),

    automationCount:
      $("automationCount"),

    worldClick:
      $("worldClick"),

    developmentPercent:
      $("developmentPercent"),

    developmentBar:
      $("developmentBar"),

    automationList:
      $("automationList"),

    upgradeList:
      $("upgradeList"),

    playerTab:
      $("playerTab"),

    itemTab:
      $("itemTab"),

    themeButton:
      $("themeButton"),

    musicButton:
      $("musicButton"),

    sfxButton:
      $("sfxButton"),

    saveButton:
      $("saveButton"),

    resetButton:
      $("resetButton"),

    saveStatus:
      $("saveStatus"),

    spaceBackground:
      $("spaceBackground")
  };


  el.planetCanvas.width =
    ART;

  el.planetCanvas.height =
    ART;


  el.planetCanvas.style.imageRendering =
    "pixelated";


  const planetCtx =
    el.planetCanvas.getContext("2d");


  const orbitCtx =
    el.orbitCanvas.getContext("2d");


  const clickCtx =
    el.clickCanvas.getContext("2d");


  const spaceCtx =
    el.spaceBackground.getContext("2d");


  planetCtx.imageSmoothingEnabled =
    false;


  const automationRefs =
    new Map();


  const upgradeRefs =
    new Map();


  const baseCache =
    new Map();


  // =========================================================
  // RANDOM
  // =========================================================

  function seededRandom(seed) {

    let value =
      seed >>> 0;


    return () => {

      value +=
        0x6D2B79F5;


      let result =
        value;


      result =
        Math.imul(
          result ^ result >>> 15,
          result | 1
        );


      result ^=
        result +
        Math.imul(
          result ^ result >>> 7,
          result | 61
        );


      return (
        (
          result ^
          result >>> 14
        ) >>> 0
      ) / 4294967296;
    };
  }


  // =========================================================
  // STATE HELPERS
  // =========================================================

  function world() {
    return worlds[state.currentWorld];
  }


  function buildingKey(
    worldId,
    buildingId
  ) {

    return (
      worldId +
      ":" +
      buildingId
    );
  }


  function getBuildingCount(
    worldId,
    buildingId
  ) {

    return Number(
      state.buildings[
        buildingKey(
          worldId,
          buildingId
        )
      ] || 0
    );
  }


  function setBuildingCount(
    worldId,
    buildingId,
    amount
  ) {

    state.buildings[
      buildingKey(
        worldId,
        buildingId
      )
    ] =
      amount;
  }


  function ownsUpgrade(id) {

    return Boolean(
      state.upgrades[id]
    );
  }


  function hasTrafficUpgrade(
    currentWorld
  ) {

    return ownsUpgrade(
      `${currentWorld.id}_traffic`
    );
  }


  function getBuildingVisualTier(
    currentWorld,
    buildingId
  ) {

    let tier =
      0;


    for (const upgrade of currentWorld.upgrades) {

      if (
        upgrade.type === "buildingMultiplier" &&
        upgrade.target === buildingId &&
        ownsUpgrade(upgrade.id)
      ) {

        tier =
          Math.max(
            tier,
            upgrade.visualTier || 1
          );
      }
    }


    return Math.min(
      tier,
      2
    );
  }


  // =========================================================
  // NUMBER DISPLAY
  // =========================================================

  function formatNumber(
    value,
    decimals = 1
  ) {

    if (!Number.isFinite(value)) {
      return "0";
    }


    if (Math.abs(value) < 1000) {

      return value.toFixed(
        decimals
      );
    }


    const units = [

      ["Sp", 1e24],
      ["Sx", 1e21],
      ["Qi", 1e18],
      ["Qa", 1e15],
      ["T", 1e12],
      ["B", 1e9],
      ["M", 1e6],
      ["K", 1e3]

    ];


    for (const [suffix, divisor] of units) {

      if (Math.abs(value) >= divisor) {

        const number =
          value / divisor;


        const places =
          number >= 100
            ? 0
            : number >= 10
              ? 1
              : 2;


        return (
          number.toFixed(places) +
          suffix
        );
      }
    }


    return value.toFixed(decimals);
  }


  function formatPopulation(value) {

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
      ).toFixed(1) + "M";
    }


    return value.toLocaleString();
  }


  // =========================================================
  // ECONOMY
  // =========================================================

  function getBuildingCost(
    currentWorld,
    building
  ) {

    return Math.floor(

      building.baseCost *

      Math.pow(
        COST_GROWTH,
        getBuildingCount(
          currentWorld.id,
          building.id
        )
      )

    );
  }


  function getBuildingMultiplier(
    currentWorld,
    buildingId
  ) {

    let multiplier =
      1;


    for (const upgrade of currentWorld.upgrades) {

      if (
        upgrade.type === "buildingMultiplier" &&
        upgrade.target === buildingId &&
        ownsUpgrade(upgrade.id)
      ) {

        multiplier *=
          upgrade.value;
      }
    }


    return multiplier;
  }


  function getBuildingCps(
    currentWorld,
    building
  ) {

    return (

      getBuildingCount(
        currentWorld.id,
        building.id
      )

      *

      building.baseCps

      *

      getBuildingMultiplier(
        currentWorld,
        building.id
      )

    );
  }


  function getWorldCps(
    currentWorld
  ) {

    if (!state.unlocked[currentWorld.id]) {
      return 0;
    }


    return currentWorld
      .automation
      .reduce(
        (
          total,
          building
        ) =>
          total +
          getBuildingCps(
            currentWorld,
            building
          ),
        0
      );
  }


  function getTotalCps() {

    return worlds.reduce(
      (
        total,
        currentWorld
      ) =>
        total +
        getWorldCps(
          currentWorld
        ),
      0
    );
  }


  function getClickPower(
    currentWorld = world()
  ) {

    let multiplier =
      1;


    for (const candidate of worlds) {

      for (const upgrade of candidate.upgrades) {

        if (
          upgrade.type === "clickMultiplier" &&
          ownsUpgrade(upgrade.id)
        ) {

          multiplier *=
            upgrade.value;
        }
      }
    }


    return (
      currentWorld.baseClick *
      multiplier
    );
  }


  function getPopulation() {

    let population =
      BASE_EARTH_POPULATION;


    for (const currentWorld of worlds) {

      for (const building of currentWorld.automation) {

        population +=

          getBuildingCount(
            currentWorld.id,
            building.id
          )

          *

          building.population;
      }
    }


    return population;
  }


  function getAutomationCount(
    currentWorld
  ) {

    return currentWorld
      .automation
      .reduce(
        (
          total,
          building
        ) =>
          total +
          getBuildingCount(
            currentWorld.id,
            building.id
          ),
        0
      );
  }


  function requirementMet(
    currentWorld,
    upgrade
  ) {

    if (!upgrade.requires) {
      return true;
    }


    return (
      getBuildingCount(
        currentWorld.id,
        upgrade.requires.building
      )

      >=

      upgrade.requires.count
    );
  }


  // =========================================================
  // EARTH GEOGRAPHY
  // =========================================================

  const EARTH_CENTER_LONGITUDE =
    -52;


  const EARTH_CENTER_LATITUDE =
    10;


  const EARTH_COLORS = {

    ocean:
      "#287fbc",

    coast:
      "#235c87",

    green:
      "#6c9f4e",

    forest:
      "#4f823f",

    jungle:
      "#39733c",

    plains:
      "#819d55",

    dry:
      "#9b895d",

    desert:
      "#c0a467",

    mountain:
      "#77765c",

    ice:
      "#e7eff1",

    outline:
      "#73c9ee"
  };


  const EARTH_LAND = [

    // North America
    [
      [-168,72],[-160,68],[-152,64],[-144,61],[-138,58],[-132,54],[-128,50],
      [-125,47],[-124,43],[-122,40],[-119,36],[-117,33],[-114,32],[-110,31],
      [-106,31],[-103,29],[-99,26],[-96,24],[-93,19],[-90,18],[-87,19],[-84,22],
      [-82,25],[-80,28],[-80,31],[-79,34],[-77,37],[-75,40],[-72,43],[-68,45],
      [-64,48],[-61,51],[-58,54],[-59,57],[-62,60],[-67,63],[-73,66],[-81,69],
      [-91,72],[-103,74],[-116,74],[-130,73],[-143,72],[-156,73]
    ],

    // Alaska
    [
      [-169,71],[-165,67],[-159,63],[-152,60],[-145,59],[-139,60],[-135,62],
      [-133,65],[-138,68],[-146,70],[-156,72],[-165,72]
    ],

    // Greenland
    [
      [-73,78],[-68,81],[-60,83],[-50,84],[-40,83],[-30,80],[-24,76],[-23,71],
      [-27,66],[-34,62],[-43,60],[-52,61],[-60,65],[-67,71]
    ],

    // Mexico
    [
      [-117,32],[-113,30],[-109,28],[-106,25],[-103,23],[-100,21],[-97,19],
      [-94,18],[-91,19],[-89,21],[-88,19],[-90,17],[-94,16],[-98,18],
      [-103,21],[-108,24],[-113,28]
    ],

    // Baja
    [
      [-117,32],[-115,30],[-114,27],[-113,24],[-111,22],[-110,24],[-111,28],[-113,31]
    ],

    // Central America
    [
      [-92,18],[-90,17],[-88,16],[-86,15],[-84,13],[-83,11],[-81,10],[-79,9],
      [-78,8],[-77,8],[-78,7],[-80,7],[-82,8],[-84,10],[-86,12],[-88,14],[-90,16]
    ],

    // Cuba
    [
      [-85,23],[-82,23],[-79,22],[-76,21],[-74,20],[-76,20],[-80,20],[-83,21]
    ],

    // Hispaniola
    [
      [-74,20],[-72,20],[-69,19],[-69,18],[-72,18],[-74,19]
    ],

    // South America
    [
      [-81,10],[-78,8],[-75,9],[-72,10],[-68,10],[-64,9],[-60,8],[-56,6],[-52,4],
      [-48,2],[-45,-1],[-42,-4],[-39,-7],[-37,-10],[-36,-14],[-37,-18],[-39,-22],
      [-41,-26],[-44,-30],[-47,-33],[-50,-36],[-53,-39],[-55,-43],[-58,-47],
      [-61,-50],[-65,-54],[-69,-55],[-71,-52],[-72,-48],[-73,-43],[-73,-38],
      [-72,-33],[-71,-28],[-70,-24],[-70,-19],[-71,-15],[-73,-11],[-75,-7],
      [-77,-3],[-79,2]
    ],

    // West Africa
    [
      [-18,36],[-14,37],[-10,37],[-6,36],[-2,36],[2,36],[6,35],[10,33],[13,30],
      [15,26],[14,22],[12,18],[10,14],[8,11],[5,8],[2,6],[-2,5],[-6,6],[-9,9],
      [-12,14],[-15,20],[-17,27]
    ],

    // Western Europe
    [
      [-10,36],[-9,40],[-8,43],[-6,46],[-4,49],[-1,52],[2,54],[5,57],[8,58],
      [10,56],[9,53],[7,50],[5,47],[2,44],[-2,42],[-6,40]
    ],

    // Iceland
    [
      [-24,66],[-22,67],[-19,67],[-16,66],[-15,64],[-18,63],[-22,64]
    ]
  ];


  const EARTH_WATER_HOLES = [

    [
      [-92,49],[-89,49],[-86,48],[-84,47],[-86,46],[-89,46],[-91,47]
    ],

    [
      [-88,46],[-86,45],[-86,43],[-87,42],[-88,43]
    ],

    [
      [-84,46],[-82,46],[-81,44],[-82,43],[-84,44]
    ],

    [
      [-83,42],[-80,42],[-79,41],[-82,41]
    ],

    [
      [-79,44],[-76,44],[-76,43],[-78,43]
    ]
  ];


  const EARTH_BIOMES = {

    amazon: [[
      [-76,4],[-72,5],[-67,5],[-62,4],[-57,3],[-53,1],[-49,-2],[-48,-6],
      [-50,-10],[-54,-13],[-59,-14],[-64,-13],[-69,-11],[-73,-8],[-75,-3]
    ]],

    andes: [[
      [-79,8],[-77,4],[-76,0],[-75,-5],[-74,-10],[-73,-15],[-72,-20],[-71,-26],
      [-70,-32],[-70,-38],[-69,-45],[-68,-50],[-70,-52],[-72,-48],[-73,-42],
      [-74,-34],[-75,-25],[-76,-16],[-78,-6]
    ]],

    sahara: [[
      [-16,30],[-11,34],[-3,35],[5,34],[12,30],[14,25],[12,20],[7,18],[-1,19],[-9,22]
    ]],

    westernUS: [[
      [-124,42],[-119,41],[-114,39],[-110,37],[-106,34],[-104,30],[-108,28],
      [-113,30],[-118,33],[-122,37]
    ]],

    easternUS: [[
      [-97,48],[-85,48],[-73,44],[-76,36],[-81,30],[-89,31],[-95,37]
    ]],

    canada: [[
      [-126,61],[-114,67],[-99,68],[-84,64],[-73,57],[-81,52],[-97,51],[-114,54]
    ]],

    pampas: [[
      [-64,-28],[-57,-28],[-53,-31],[-53,-36],[-56,-40],[-61,-41],[-65,-38],[-66,-33]
    ]],

    patagonia: [[
      [-72,-39],[-65,-39],[-61,-44],[-64,-50],[-67,-54],[-70,-52],[-72,-46]
    ]]
  };


  function pointInPolygon(
    longitude,
    latitude,
    polygon
  ) {

    let inside =
      false;


    for (
      let i = 0,
      j = polygon.length - 1;

      i < polygon.length;

      j = i++
    ) {

      const xi =
        polygon[i][0];

      const yi =
        polygon[i][1];

      const xj =
        polygon[j][0];

      const yj =
        polygon[j][1];


      const intersect =
        (
          yi > latitude
        ) !==
        (
          yj > latitude
        )

        &&

        longitude <
        (
          (
            xj - xi
          ) *
          (
            latitude - yi
          )
        )

        /

        (
          yj - yi ||
          0.000001
        )

        +

        xi;


      if (intersect) {
        inside = !inside;
      }
    }


    return inside;
  }


  function insideAny(
    longitude,
    latitude,
    polygons
  ) {

    return polygons.some(
      polygon =>
        pointInPolygon(
          longitude,
          latitude,
          polygon
        )
    );
  }


  function isEarthLand(
    longitude,
    latitude
  ) {

    if (
      !insideAny(
        longitude,
        latitude,
        EARTH_LAND
      )
    ) {
      return false;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_WATER_HOLES
      )
    ) {
      return false;
    }


    return true;
  }


  function inverseOrthographic(
    pixelX,
    pixelY
  ) {

    const centerLongitude =
      EARTH_CENTER_LONGITUDE *
      DEG;


    const centerLatitude =
      EARTH_CENTER_LATITUDE *
      DEG;


    const x =
      (
        pixelX - CX
      ) /
      PLANET_RADIUS;


    const y =
      (
        CY - pixelY
      ) /
      PLANET_RADIUS;


    const rho =
      Math.sqrt(
        x * x +
        y * y
      );


    if (rho > 1) {
      return null;
    }


    if (rho < 0.000001) {

      return {
        lon:
          EARTH_CENTER_LONGITUDE,

        lat:
          EARTH_CENTER_LATITUDE
      };
    }


    const c =
      Math.asin(
        rho
      );


    const sinC =
      Math.sin(
        c
      );


    const cosC =
      Math.cos(
        c
      );


    const latitude =
      Math.asin(

        cosC *
        Math.sin(
          centerLatitude
        )

        +

        (
          y *
          sinC *
          Math.cos(
            centerLatitude
          )
        )

        /
        rho
      );


    const longitude =

      centerLongitude

      +

      Math.atan2(

        x *
        sinC,

        rho *
        Math.cos(
          centerLatitude
        ) *
        cosC

        -

        y *
        Math.sin(
          centerLatitude
        ) *
        sinC
      );


    return {

      lon:
        longitude /
        DEG,

      lat:
        latitude /
        DEG
    };
  }


  function projectGeo(
    latitudeDegrees,
    longitudeDegrees
  ) {

    const latitude =
      latitudeDegrees *
      DEG;


    const longitude =
      longitudeDegrees *
      DEG;


    const centerLongitude =
      EARTH_CENTER_LONGITUDE *
      DEG;


    const centerLatitude =
      EARTH_CENTER_LATITUDE *
      DEG;


    const difference =
      longitude -
      centerLongitude;


    const visibility =

      Math.sin(
        centerLatitude
      ) *
      Math.sin(
        latitude
      )

      +

      Math.cos(
        centerLatitude
      ) *
      Math.cos(
        latitude
      ) *
      Math.cos(
        difference
      );


    if (visibility <= 0) {
      return null;
    }


    const x =
      Math.cos(
        latitude
      ) *
      Math.sin(
        difference
      );


    const y =

      Math.cos(
        centerLatitude
      ) *
      Math.sin(
        latitude
      )

      -

      Math.sin(
        centerLatitude
      ) *
      Math.cos(
        latitude
      ) *
      Math.cos(
        difference
      );


    return {

      x:
        Math.round(
          CX +
          PLANET_RADIUS *
          x
        ),

      y:
        Math.round(
          CY -
          PLANET_RADIUS *
          y
        ),

      depth:
        visibility
    };
  }


  function getEarthLandColor(
    longitude,
    latitude
  ) {

    if (latitude < -67) {
      return EARTH_COLORS.ice;
    }


    if (
      latitude > 72 &&
      longitude > -72 &&
      longitude < -20
    ) {

      return EARTH_COLORS.ice;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.andes
      )
    ) {

      return EARTH_COLORS.mountain;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.amazon
      )
    ) {

      return EARTH_COLORS.jungle;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.sahara
      )
    ) {

      return EARTH_COLORS.desert;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.westernUS
      )
    ) {

      return EARTH_COLORS.dry;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.easternUS
      )
    ) {

      return EARTH_COLORS.forest;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.canada
      )
    ) {

      return EARTH_COLORS.forest;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.pampas
      )
    ) {

      return EARTH_COLORS.plains;
    }


    if (
      insideAny(
        longitude,
        latitude,
        EARTH_BIOMES.patagonia
      )
    ) {

      return EARTH_COLORS.mountain;
    }


    return EARTH_COLORS.green;
  }


  function renderEarthBase(ctx) {

    ctx.clearRect(
      0,
      0,
      ART,
      ART
    );


    for (let y = 0; y < ART; y++) {

      for (let x = 0; x < ART; x++) {

        const dx =
          x - CX;


        const dy =
          y - CY;


        if (
          dx * dx +
          dy * dy >
          PLANET_RADIUS *
          PLANET_RADIUS
        ) {
          continue;
        }


        const geo =
          inverseOrthographic(
            x + 0.5,
            y + 0.5
          );


        if (!geo) {
          continue;
        }


        let color =
          EARTH_COLORS.ocean;


        if (
          isEarthLand(
            geo.lon,
            geo.lat
          )
        ) {

          color =
            getEarthLandColor(
              geo.lon,
              geo.lat
            );


          const coastline =

            !isEarthLand(
              geo.lon + 0.85,
              geo.lat
            )

            ||

            !isEarthLand(
              geo.lon - 0.85,
              geo.lat
            )

            ||

            !isEarthLand(
              geo.lon,
              geo.lat + 0.85
            )

            ||

            !isEarthLand(
              geo.lon,
              geo.lat - 0.85
            );


          if (coastline) {
            color =
              EARTH_COLORS.coast;
          }
        }


        ctx.fillStyle =
          color;


        ctx.fillRect(
          x,
          y,
          1,
          1
        );
      }
    }


    ctx.strokeStyle =
      EARTH_COLORS.outline;


    ctx.lineWidth =
      1;


    ctx.beginPath();


    ctx.arc(
      CX,
      CY,
      PLANET_RADIUS + 0.5,
      0,
      Math.PI * 2
    );


    ctx.stroke();
  }


  // =========================================================
  // OTHER PLANETS
  // =========================================================

  function createCraters(
    seed,
    count
  ) {

    const random =
      seededRandom(seed);


    const result =
      [];


    for (let i = 0; i < count; i++) {

      const angle =
        random() *
        Math.PI *
        2;


      const distance =
        Math.sqrt(
          random()
        ) *
        (
          PLANET_RADIUS -
          10
        );


      result.push({

        x:
          CX +
          Math.cos(angle) *
          distance,

        y:
          CY +
          Math.sin(angle) *
          distance,

        radius:
          2 +
          Math.floor(
            random() *
            5
          )
      });
    }


    return result;
  }


  const moonCraters =
    createCraters(
      101,
      25
    );


  const mercuryCraters =
    createCraters(
      102,
      32
    );


  const marsCraters =
    createCraters(
      103,
      13
    );


  function renderRockyPlanet(
    ctx,
    type
  ) {

    const configurations = {

      moon: {
        light: "#d3d3ce",
        mid: "#aaa9a4",
        dark: "#767773",
        outline: "#eeeeea",
        craters: moonCraters
      },

      mercury: {
        light: "#b9aa94",
        mid: "#93816d",
        dark: "#675c50",
        outline: "#cfbea6",
        craters: mercuryCraters
      },

      mars: {
        light: "#dd7651",
        mid: "#b74f38",
        dark: "#7d3128",
        outline: "#ee9371",
        craters: marsCraters
      }
    };


    const configuration =
      configurations[type];


    ctx.clearRect(
      0,
      0,
      ART,
      ART
    );


    for (let y = 0; y < ART; y++) {

      for (let x = 0; x < ART; x++) {

        const dx =
          x - CX;


        const dy =
          y - CY;


        if (
          dx * dx +
          dy * dy >
          PLANET_RADIUS *
          PLANET_RADIUS
        ) {
          continue;
        }


        let base =
          configuration.mid;


        if (type === "moon") {

          const region =
            Math.sin(
              x * 0.08
            )

            +

            Math.sin(
              y * 0.07
            );


          base =
            region > 0.35
              ? configuration.light
              : configuration.mid;
        }


        if (type === "mercury") {

          base =
            Math.sin(
              (x + y) *
              0.08
            ) > 0
              ? configuration.mid
              : configuration.light;
        }


        if (type === "mars") {

          base =
            Math.sin(
              y * 0.09
            ) > 0
              ? configuration.mid
              : configuration.light;


          if (
            y <
            CY - 72
          ) {

            base =
              "#e7c4ad";
          }


          if (
            Math.abs(
              y - CY
            ) < 6

            &&

            x >
            CX - 52

            &&

            x <
            CX + 44
          ) {

            base =
              "#85362c";
          }
        }


        for (const crater of configuration.craters) {

          const craterX =
            x - crater.x;


          const craterY =
            y - crater.y;


          const distance =
            Math.sqrt(
              craterX * craterX +
              craterY * craterY
            );


          if (
            distance <
            crater.radius
          ) {

            base =
              distance >
              crater.radius - 1
                ? configuration.light
                : configuration.dark;

            break;
          }
        }


        ctx.fillStyle =
          base;


        ctx.fillRect(
          x,
          y,
          1,
          1
        );
      }
    }


    ctx.strokeStyle =
      configuration.outline;


    ctx.lineWidth =
      1;


    ctx.beginPath();


    ctx.arc(
      CX,
      CY,
      PLANET_RADIUS + 0.5,
      0,
      Math.PI * 2
    );


    ctx.stroke();
  }


  function renderVenus(ctx) {

    ctx.clearRect(
      0,
      0,
      ART,
      ART
    );


    for (let y = 0; y < ART; y++) {

      for (let x = 0; x < ART; x++) {

        const dx =
          x - CX;


        const dy =
          y - CY;


        if (
          dx * dx +
          dy * dy >
          PLANET_RADIUS *
          PLANET_RADIUS
        ) {
          continue;
        }


        const band =

          Math.sin(
            y * 0.12
          )

          +

          Math.sin(
            (y + x) *
            0.04
          ) * 0.6;


        let color =
          "#cfa759";


        if (band > 0.7) {

          color =
            "#e3c36f";
        }

        else if (band < -0.7) {

          color =
            "#a97c42";
        }

        else if (band > 0) {

          color =
            "#bc934e";
        }


        ctx.fillStyle =
          color;


        ctx.fillRect(
          x,
          y,
          1,
          1
        );
      }
    }


    ctx.strokeStyle =
      "#eed998";


    ctx.lineWidth =
      1;


    ctx.beginPath();


    ctx.arc(
      CX,
      CY,
      PLANET_RADIUS + 0.5,
      0,
      Math.PI * 2
    );


    ctx.stroke();
  }


  function drawSaturnRings(
    ctx,
    front
  ) {

    for (
      let y = CY - 38;
      y <= CY + 38;
      y++
    ) {

      for (let x = 0; x < ART; x++) {

        const outer =

          (
            (
              x - CX
            )
            /
            (
              PLANET_RADIUS +
              35
            )
          ) ** 2

          +

          (
            (
              y - CY
            )
            /
            30
          ) ** 2;


        const inner =

          (
            (
              x - CX
            )
            /
            (
              PLANET_RADIUS +
              10
            )
          ) ** 2

          +

          (
            (
              y - CY
            )
            /
            16
          ) ** 2;


        if (
          outer <= 1 &&
          inner >= 1
        ) {

          const isFront =
            y >= CY;


          if (isFront !== front) {
            continue;
          }


          const stripe =

            Math.floor(
              (
                Math.abs(
                  x - CX
                )

                +

                Math.abs(
                  y - CY
                )
              )

              /

              3
            )

            %

            3;


          ctx.fillStyle =

            stripe === 0
              ? "#dfca91"
              : stripe === 1
                ? "#c4ab77"
                : "#927b53";


          ctx.fillRect(
            x,
            y,
            1,
            1
          );
        }
      }
    }
  }


  function renderGasGiant(
    ctx,
    type
  ) {

    const palettes = {

      jupiter: [
        "#d8b989",
        "#b27e5e",
        "#e5d1a9",
        "#8b584b"
      ],

      saturn: [
        "#ddc78d",
        "#c5a86c",
        "#ecd8a5",
        "#aa8958"
      ],

      uranus: [
        "#99dcde",
        "#75c6cc",
        "#b2e8e7",
        "#5eaab4"
      ],

      neptune: [
        "#4a73d2",
        "#3157b0",
        "#6589df",
        "#234486"
      ]
    };


    const palette =
      palettes[type];


    ctx.clearRect(
      0,
      0,
      ART,
      ART
    );


    if (type === "saturn") {

      drawSaturnRings(
        ctx,
        false
      );
    }


    for (let y = 0; y < ART; y++) {

      for (let x = 0; x < ART; x++) {

        const dx =
          x - CX;


        const dy =
          y - CY;


        if (
          dx * dx +
          dy * dy >
          PLANET_RADIUS *
          PLANET_RADIUS
        ) {
          continue;
        }


        const band =

          Math.sin(
            (
              y - CY
            ) *
            0.18
          )

          +

          0.4 *
          Math.sin(
            (
              y - CY
            ) *
            0.46
          );


        let index =
          1;


        if (band > 0.8) {
          index = 2;
        }

        else if (band < -0.8) {
          index = 3;
        }

        else if (band > 0.1) {
          index = 0;
        }


        let color =
          palette[index];


        if (type === "jupiter") {

          const spotX =
            (
              x -
              (
                CX + 34
              )
            ) / 16;


          const spotY =
            (
              y -
              (
                CY + 24
              )
            ) / 8;


          if (
            spotX * spotX +
            spotY * spotY <
            1
          ) {

            color =
              "#aa4e3e";
          }
        }


        if (type === "neptune") {

          const spotX =
            (
              x -
              (
                CX + 25
              )
            ) / 14;


          const spotY =
            (
              y -
              (
                CY + 18
              )
            ) / 7;


          if (
            spotX * spotX +
            spotY * spotY <
            1
          ) {

            color =
              "#203875";
          }
        }


        ctx.fillStyle =
          color;


        ctx.fillRect(
          x,
          y,
          1,
          1
        );
      }
    }


    if (type === "saturn") {

      drawSaturnRings(
        ctx,
        true
      );
    }


    ctx.strokeStyle =

      type === "uranus"
        ? "#d7ffff"
        : type === "neptune"
          ? "#91bcff"
          : "#edd39f";


    ctx.lineWidth =
      1;


    ctx.beginPath();


    ctx.arc(
      CX,
      CY,
      PLANET_RADIUS + 0.5,
      0,
      Math.PI * 2
    );


    ctx.stroke();
  }


  function renderSun(ctx) {

    ctx.clearRect(
      0,
      0,
      ART,
      ART
    );


    for (let y = 0; y < ART; y++) {

      for (let x = 0; x < ART; x++) {

        const dx =
          x - CX;


        const dy =
          y - CY;


        if (
          dx * dx +
          dy * dy >
          PLANET_RADIUS *
          PLANET_RADIUS
        ) {
          continue;
        }


        const cells =

          Math.sin(
            x * 0.2
          )

          +

          Math.sin(
            y * 0.24
          )

          +

          Math.sin(
            (
              x + y
            ) * 0.1
          );


        let color =
          "#ffc73d";


        if (cells > 1.4) {

          color =
            "#fff079";
        }

        else if (cells < -1) {

          color =
            "#cf5317";
        }

        else if (cells < -0.2) {

          color =
            "#f18b20";
        }


        ctx.fillStyle =
          color;


        ctx.fillRect(
          x,
          y,
          1,
          1
        );
      }
    }


    ctx.strokeStyle =
      "#ffe7a3";


    ctx.lineWidth =
      1;


    ctx.beginPath();


    ctx.arc(
      CX,
      CY,
      PLANET_RADIUS + 0.5,
      0,
      Math.PI * 2
    );


    ctx.stroke();
  }


  function renderAsteroidBelt(ctx) {

    ctx.clearRect(
      0,
      0,
      ART,
      ART
    );


    const random =
      seededRandom(
        808
      );


    for (let i = 0; i < 52; i++) {

      const angle =
        random() *
        Math.PI *
        2;


      const distance =
        28 +
        random() *
        70;


      const radius =
        2 +
        Math.floor(
          random() *
          7
        );


      const x =
        CX +
        Math.cos(angle) *
        distance;


      const y =
        CY +
        Math.sin(angle) *
        distance;


      ctx.fillStyle =
        "#514b48";


      ctx.fillRect(

        Math.round(
          x - radius
        ),

        Math.round(
          y -
          radius * 0.6
        ),

        radius * 2,

        Math.max(
          2,
          Math.round(
            radius * 1.2
          )
        )
      );


      ctx.fillStyle =
        "#83766b";


      ctx.fillRect(

        Math.round(
          x - radius + 1
        ),

        Math.round(
          y -
          radius * 0.6
        ),

        Math.max(
          1,
          radius
        ),

        Math.max(
          1,
          Math.round(
            radius * 0.4
          )
        )
      );
    }
  }


  function getBaseCanvas(
    currentWorld
  ) {

    if (
      baseCache.has(
        currentWorld.id
      )
    ) {

      return baseCache.get(
        currentWorld.id
      );
    }


    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.width =
      ART;


    canvas.height =
      ART;


    const context =
      canvas.getContext(
        "2d"
      );


    context.imageSmoothingEnabled =
      false;


    switch (currentWorld.kind) {

      case "earth":

        renderEarthBase(
          context
        );

        break;


      case "moon":

        renderRockyPlanet(
          context,
          "moon"
        );

        break;


      case "mercury":

        renderRockyPlanet(
          context,
          "mercury"
        );

        break;


      case "mars":

        renderRockyPlanet(
          context,
          "mars"
        );

        break;


      case "venus":

        renderVenus(
          context
        );

        break;


      case "jupiter":
      case "saturn":
      case "uranus":
      case "neptune":

        renderGasGiant(
          context,
          currentWorld.kind
        );

        break;


      case "sun":

        renderSun(
          context
        );

        break;


      case "asteroids":

        renderAsteroidBelt(
          context
        );

        break;
    }


    baseCache.set(
      currentWorld.id,
      canvas
    );


    return canvas;
  }


  // =========================================================
  // PIXEL SPRITES
  // =========================================================

  function pixelRect(
    ctx,
    x,
    y,
    width,
    height,
    color
  ) {

    ctx.fillStyle =
      color;


    ctx.fillRect(

      Math.round(x),

      Math.round(y),

      Math.max(
        1,
        Math.round(width)
      ),

      Math.max(
        1,
        Math.round(height)
      )
    );
  }


  function spriteHouse(
    ctx,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 4 * scale,
      y,
      9 * scale,
      scale,
      "rgba(0,0,0,.28)"
    );


    if (tier === 0) {

      pixelRect(
        ctx,
        x - 4 * scale,
        y - 5 * scale,
        8 * scale,
        5 * scale,
        "#d1b795"
      );


      pixelRect(
        ctx,
        x - 5 * scale,
        y - 7 * scale,
        10 * scale,
        2 * scale,
        "#9c5545"
      );


      pixelRect(
        ctx,
        x - 2 * scale,
        y - 9 * scale,
        4 * scale,
        2 * scale,
        "#9c5545"
      );


      pixelRect(
        ctx,
        x - 1 * scale,
        y - 3 * scale,
        2 * scale,
        3 * scale,
        "#60463a"
      );


      pixelRect(
        ctx,
        x - 3 * scale,
        y - 4 * scale,
        scale,
        scale,
        "#82e2f8"
      );


      pixelRect(
        ctx,
        x + 2 * scale,
        y - 4 * scale,
        scale,
        scale,
        "#82e2f8"
      );


      return;
    }


    if (tier === 1) {

      pixelRect(
        ctx,
        x - 5 * scale,
        y - 6 * scale,
        10 * scale,
        6 * scale,
        "#d8dde0"
      );


      pixelRect(
        ctx,
        x - 5 * scale,
        y - 8 * scale,
        10 * scale,
        2 * scale,
        "#526f84"
      );


      pixelRect(
        ctx,
        x - 2 * scale,
        y - 10 * scale,
        7 * scale,
        2 * scale,
        "#648297"
      );


      pixelRect(
        ctx,
        x - 4 * scale,
        y - 5 * scale,
        3 * scale,
        2 * scale,
        "#6cecff"
      );


      pixelRect(
        ctx,
        x + scale,
        y - 5 * scale,
        3 * scale,
        2 * scale,
        "#6cecff"
      );


      return;
    }


    pixelRect(
      ctx,
      x - 5 * scale,
      y - 6 * scale,
      10 * scale,
      6 * scale,
      "#e7edf0"
    );


    pixelRect(
      ctx,
      x + 5 * scale,
      y - 4 * scale,
      3 * scale,
      4 * scale,
      "#c6d2d7"
    );


    pixelRect(
      ctx,
      x - 5 * scale,
      y - 8 * scale,
      10 * scale,
      2 * scale,
      "#58798f"
    );


    pixelRect(
      ctx,
      x - 4 * scale,
      y - 10 * scale,
      4 * scale,
      2 * scale,
      "#3470b8"
    );


    pixelRect(
      ctx,
      x + scale,
      y - 10 * scale,
      4 * scale,
      2 * scale,
      "#3470b8"
    );


    pixelRect(
      ctx,
      x - 4 * scale,
      y - 5 * scale,
      3 * scale,
      2 * scale,
      "#62f1ff"
    );


    pixelRect(
      ctx,
      x + scale,
      y - 5 * scale,
      3 * scale,
      2 * scale,
      "#62f1ff"
    );
  }


  function spriteTown(
    ctx,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 10 * scale,
      y,
      20 * scale,
      2 * scale,
      tier
        ? "#45535d"
        : "#5b6165"
    );


    if (tier === 0) {

      spriteHouse(
        ctx,
        x - 6 * scale,
        y,
        scale * 0.62,
        0
      );


      spriteHouse(
        ctx,
        x + 5 * scale,
        y - scale,
        scale * 0.62,
        0
      );


      pixelRect(
        ctx,
        x - 2 * scale,
        y - 8 * scale,
        5 * scale,
        8 * scale,
        "#6e7b89"
      );


      return;
    }


    if (tier === 1) {

      spriteHouse(
        ctx,
        x - 7 * scale,
        y,
        scale * 0.58,
        1
      );


      spriteHouse(
        ctx,
        x + 7 * scale,
        y,
        scale * 0.58,
        1
      );


      spriteHouse(
        ctx,
        x,
        y - 2 * scale,
        scale * 0.54,
        1
      );


      pixelRect(
        ctx,
        x - 2 * scale,
        y - 13 * scale,
        5 * scale,
        10 * scale,
        "#607f96"
      );


      return;
    }


    spriteHouse(
      ctx,
      x - 8 * scale,
      y,
      scale * 0.56,
      2
    );


    spriteHouse(
      ctx,
      x + 8 * scale,
      y,
      scale * 0.56,
      2
    );


    spriteHouse(
      ctx,
      x - scale,
      y - 2 * scale,
      scale * 0.52,
      2
    );


    pixelRect(
      ctx,
      x - 4 * scale,
      y - 17 * scale,
      4 * scale,
      13 * scale,
      "#46677e"
    );


    pixelRect(
      ctx,
      x + scale,
      y - 14 * scale,
      4 * scale,
      10 * scale,
      "#597b93"
    );
  }


  function spriteCity(
    ctx,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    const bonus =
      tier * 2;


    const buildings = [

      [-9, 4, 13 + bonus],
      [-4, 5, 20 + bonus],
      [2, 4, 16 + bonus],
      [7, 5, 23 + bonus]

    ];


    for (let i = 0; i < buildings.length; i++) {

      const [
        offset,
        width,
        height
      ] =
        buildings[i];


      pixelRect(
        ctx,
        x + offset * scale,
        y - height * scale,
        width * scale,
        height * scale,
        i % 2
          ? "#526e93"
          : "#67849d"
      );


      for (
        let windowY = 3;
        windowY < height - 2;
        windowY += 4
      ) {

        pixelRect(
          ctx,

          x +
          (
            offset + 1
          ) * scale,

          y -
          (
            height -
            windowY
          ) * scale,

          scale,
          scale,

          tier
            ? "#61efff"
            : "#bfeeff"
        );
      }
    }
  }


  function spriteFactory(
    ctx,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 10 * scale,
      y - 7 * scale,
      20 * scale,
      7 * scale,
      "#717e87"
    );


    pixelRect(
      ctx,
      x - 7 * scale,
      y - 20 * scale,
      3 * scale,
      13 * scale,
      "#4e5c64"
    );


    pixelRect(
      ctx,
      x + 5 * scale,
      y - 23 * scale,
      3 * scale,
      16 * scale,
      "#4e5c64"
    );


    if (tier >= 1) {

      pixelRect(
        ctx,
        x - scale,
        y - 17 * scale,
        3 * scale,
        10 * scale,
        "#5c6e78"
      );
    }


    if (tier === 2) {

      pixelRect(
        ctx,
        x - 9 * scale,
        y - 25 * scale,
        5 * scale,
        2 * scale,
        "#316fb6"
      );


      pixelRect(
        ctx,
        x + 4 * scale,
        y - 28 * scale,
        5 * scale,
        2 * scale,
        "#316fb6"
      );
    }
  }


  function spriteSpaceport(
    ctx,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 10 * scale,
      y - 2 * scale,
      20 * scale,
      3 * scale,
      "#71818d"
    );


    const rockets =
      tier + 1;


    for (let i = 0; i < rockets; i++) {

      const offset =

        (
          i -
          (
            rockets - 1
          ) / 2
        )

        *

        7 *
        scale;


      pixelRect(
        ctx,
        x + offset - 2 * scale,
        y - 18 * scale,
        4 * scale,
        16 * scale,
        "#edf5f8"
      );


      pixelRect(
        ctx,
        x + offset - scale,
        y - 22 * scale,
        2 * scale,
        4 * scale,
        "#edf5f8"
      );


      pixelRect(
        ctx,
        x + offset - scale,
        y - 13 * scale,
        2 * scale,
        3 * scale,
        "#67e6ff"
      );
    }
  }


  function spriteDome(
    ctx,
    x,
    y,
    scale,
    glass,
    base,
    tier = 0
  ) {

    const width =
      16 +
      tier * 3;


    pixelRect(
      ctx,
      x - width / 2 * scale,
      y - 2 * scale,
      width * scale,
      3 * scale,
      base
    );


    pixelRect(
      ctx,
      x - (width - 3) / 2 * scale,
      y - 8 * scale,
      (width - 3) * scale,
      6 * scale,
      glass
    );


    pixelRect(
      ctx,
      x - (width - 7) / 2 * scale,
      y - 11 * scale,
      (width - 7) * scale,
      3 * scale,
      glass
    );
  }


  function spriteExcavator(
    ctx,
    x,
    y,
    scale,
    body,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 9 * scale,
      y - 6 * scale,
      11 * scale,
      6 * scale,
      body
    );


    pixelRect(
      ctx,
      x - 7 * scale,
      y - 10 * scale,
      6 * scale,
      4 * scale,
      "#6e797d"
    );


    pixelRect(
      ctx,
      x + 2 * scale,
      y - 5 * scale,
      4 * scale,
      2 * scale,
      "#87683d"
    );


    pixelRect(
      ctx,
      x + 6 * scale,
      y - 4 * scale,
      (
        7 +
        tier * 3
      ) * scale,
      2 * scale,
      "#87683d"
    );
  }


  function spriteRefinery(
    ctx,
    x,
    y,
    scale,
    tone,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 10 * scale,
      y - 9 * scale,
      20 * scale,
      9 * scale,
      tone
    );


    pixelRect(
      ctx,
      x - 8 * scale,
      y - 16 * scale,
      4 * scale,
      7 * scale,
      "#727d85"
    );


    pixelRect(
      ctx,
      x + 4 * scale,
      y - 19 * scale,
      4 * scale,
      10 * scale,
      "#727d85"
    );


    if (tier >= 1) {

      pixelRect(
        ctx,
        x - scale,
        y - 21 * scale,
        3 * scale,
        12 * scale,
        "#647680"
      );
    }


    if (tier === 2) {

      pixelRect(
        ctx,
        x - 9 * scale,
        y - 20 * scale,
        5 * scale,
        2 * scale,
        "#316fb6"
      );
    }
  }


  function spriteMassDriver(
    ctx,
    x,
    y,
    scale,
    tier = 0
  ) {

    pixelRect(
      ctx,
      x - 13 * scale,
      y - 3 * scale,
      (
        26 +
        tier * 4
      ) * scale,
      3 * scale,
      "#6b7a86"
    );


    pixelRect(
      ctx,
      x - 11 * scale,
      y - 7 * scale,
      (
        18 +
        tier * 3
      ) * scale,
      3 * scale,
      "#8999a5"
    );
  }


  function spriteAerostat(
    ctx,
    x,
    y,
    scale,
    balloon,
    city,
    tier = 0
  ) {

    const width =
      18 +
      tier * 3;


    pixelRect(
      ctx,
      x - width / 2 * scale,
      y - 18 * scale,
      width * scale,
      8 * scale,
      balloon
    );


    pixelRect(
      ctx,
      x - 7 * scale,
      y - 4 * scale,
      14 * scale,
      4 * scale,
      city
    );


    if (tier >= 1) {

      pixelRect(
        ctx,
        x - 4 * scale,
        y - 8 * scale,
        3 * scale,
        4 * scale,
        city
      );


      pixelRect(
        ctx,
        x + 2 * scale,
        y - 9 * scale,
        3 * scale,
        5 * scale,
        city
      );
    }
  }


  function spriteGasPlatform(
    ctx,
    x,
    y,
    scale,
    color,
    tier = 0
  ) {

    const width =
      22 +
      tier * 4;


    pixelRect(
      ctx,
      x - width / 2 * scale,
      y - 5 * scale,
      width * scale,
      5 * scale,
      color
    );


    pixelRect(
      ctx,
      x - 8 * scale,
      y - 10 * scale,
      5 * scale,
      5 * scale,
      "#a7b6c2"
    );


    pixelRect(
      ctx,
      x + 2 * scale,
      y - 13 * scale,
      5 * scale,
      8 * scale,
      "#94aabb"
    );
  }


  function spriteStation(
    ctx,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    const extra =
      tier * 2;


    pixelRect(
      ctx,
      x -
      (
        18 +
        extra
      ) * scale,
      y - 5 * scale,
      (
        7 +
        extra
      ) * scale,
      10 * scale,
      "#316db2"
    );


    pixelRect(
      ctx,
      x + 11 * scale,
      y - 5 * scale,
      (
        7 +
        extra
      ) * scale,
      10 * scale,
      "#316db2"
    );


    pixelRect(
      ctx,
      x - 11 * scale,
      y - scale,
      22 * scale,
      2 * scale,
      "#abbac4"
    );


    pixelRect(
      ctx,
      x - 3 * scale,
      y - 4 * scale,
      6 * scale,
      8 * scale,
      "#edf5f8"
    );
  }


  function drawSprite(
    ctx,
    key,
    x,
    y,
    scale = 1,
    tier = 0
  ) {

    switch (key) {

      case "house":

        spriteHouse(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "town":

        spriteTown(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "city":

        spriteCity(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "factory":

        spriteFactory(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "spaceport":

        spriteSpaceport(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "station":
      case "ringStation":
      case "orbitalLab":
      case "neptuneStation":
      case "beltHub":
      case "dyson":
      case "heliumScoop":

        spriteStation(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "moonDome":

        spriteDome(
          ctx,
          x,
          y,
          scale,
          "#71d7ed",
          "#adb5ba",
          tier
        );

        break;


      case "marsHabitat":

        spriteDome(
          ctx,
          x,
          y,
          scale,
          "#dd8968",
          "#8d594c",
          tier
        );

        break;


      case "mercuryShelter":

        spriteDome(
          ctx,
          x,
          y,
          scale,
          "#b7d8df",
          "#766b60",
          tier
        );

        break;


      case "prospector":

        spriteDome(
          ctx,
          x,
          y,
          scale,
          "#99d8e7",
          "#6b6864",
          tier
        );

        break;


      case "excavator":

        spriteExcavator(
          ctx,
          x,
          y,
          scale,
          "#d2a346",
          tier
        );

        break;


      case "marsMine":

        spriteExcavator(
          ctx,
          x,
          y,
          scale,
          "#bd673e",
          tier
        );

        break;


      case "mercuryMine":
      case "asteroidRig":
      case "ringMine":

        spriteExcavator(
          ctx,
          x,
          y,
          scale,
          "#bf9151",
          tier
        );

        break;


      case "lunarRefinery":
      case "terraformer":
      case "stormHarvester":
      case "orbitalFoundry":
      case "neptuneRefinery":
      case "cloudRefinery":

        spriteRefinery(
          ctx,
          x,
          y,
          scale,
          "#889198",
          tier
        );

        break;


      case "massDriver":

        spriteMassDriver(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "aerostat":

        spriteAerostat(
          ctx,
          x,
          y,
          scale,
          "#e4c46d",
          "#76828a",
          tier
        );

        break;


      case "floatingCity":
      case "gasCity":

        spriteAerostat(
          ctx,
          x,
          y,
          scale,
          "#d8bc77",
          "#637786",
          tier
        );

        break;


      case "saturnHabitat":

        spriteAerostat(
          ctx,
          x,
          y,
          scale,
          "#d9c185",
          "#687580",
          tier
        );

        break;


      case "iceAerostat":

        spriteAerostat(
          ctx,
          x,
          y,
          scale,
          "#a5e2e4",
          "#5d8891",
          tier
        );

        break;


      case "neptuneHabitat":

        spriteAerostat(
          ctx,
          x,
          y,
          scale,
          "#799ce4",
          "#4d5c87",
          tier
        );

        break;


      case "gasPlatform":
      case "jupiterSkimmer":
      case "venusSkimmer":
      case "iceSkimmer":
      case "icePlatform":

        spriteGasPlatform(
          ctx,
          x,
          y,
          scale,
          "#778996",
          tier
        );

        break;


      case "arcology":

        spriteCity(
          ctx,
          x,
          y,
          scale,
          tier
        );

        break;


      case "oreHauler":

        spriteSpaceport(
          ctx,
          x,
          y,
          scale * 0.75,
          tier
        );

        break;


      case "solarTower":

        pixelRect(
          ctx,
          x - 3 * scale,
          y - 21 * scale,
          6 * scale,
          21 * scale,
          "#c7cdd0"
        );


        pixelRect(
          ctx,
          x -
          (
            7 +
            tier * 2
          ) * scale,
          y - 24 * scale,
          (
            14 +
            tier * 4
          ) * scale,
          4 * scale,
          "#4f7fc4"
        );

        break;


      case "sunshield":

        pixelRect(
          ctx,
          x -
          (
            13 +
            tier * 3
          ) * scale,
          y - 19 * scale,
          (
            26 +
            tier * 6
          ) * scale,
          5 * scale,
          "#66798e"
        );


        pixelRect(
          ctx,
          x - 2 * scale,
          y - 14 * scale,
          4 * scale,
          14 * scale,
          "#a6afb5"
        );

        break;


      case "windHarvester":

        pixelRect(
          ctx,
          x - 2 * scale,
          y - 18 * scale,
          4 * scale,
          18 * scale,
          "#a7b6ce"
        );


        pixelRect(
          ctx,
          x -
          (
            11 +
            tier * 2
          ) * scale,
          y - 15 * scale,
          (
            22 +
            tier * 4
          ) * scale,
          3 * scale,
          "#7c8faf"
        );

        break;


      case "solarCollector":

        pixelRect(
          ctx,
          x -
          (
            11 +
            tier * 2
          ) * scale,
          y - 5 * scale,
          (
            22 +
            tier * 4
          ) * scale,
          10 * scale,
          "#3659a3"
        );

        break;


      case "fusionRing":

        ctx.strokeStyle =
          tier === 2
            ? "#72ebff"
            : "#cbd4db";


        ctx.lineWidth =
          Math.max(
            1,
            Math.round(
              scale * 2
            )
          );


        ctx.beginPath();


        ctx.ellipse(
          x,
          y,
          (
            13 +
            tier * 3
          ) * scale,
          (
            6 +
            tier
          ) * scale,
          0,
          0,
          Math.PI * 2
        );


        ctx.stroke();

        break;


      default:

        spriteHouse(
          ctx,
          x,
          y,
          scale,
          tier
        );
    }
  }


  // =========================================================
  // DEVELOPMENT POSITIONS
  // =========================================================

  const earthAnchors = {

    house: [

      [40.7,-74],
      [34,-118.2],
      [29.7,-95.3],
      [41.8,-87.6],
      [39.7,-104.9],
      [47.6,-122.3],

      [-23.5,-46.6],
      [-34.6,-58.4],
      [-12,-77],
      [4.7,-74.1],
      [-33.4,-70.6],
      [-22.9,-43.2],

      [25.7,-80.2],
      [32.8,-96.8],
      [45.5,-73.5],
      [49.2,-123.1]
    ],

    town: [

      [39,-77],
      [35,-90],
      [33.4,-112],
      [32.7,-97],
      [44.9,-93.1],

      [-22.9,-47],
      [-34.5,-59],
      [-8,-63],
      [3.4,-76.5],
      [19.4,-99.1]
    ],

    city: [

      [40.7,-74],
      [34,-118.2],
      [41.8,-87.6],
      [29.7,-95.3],
      [19.4,-99.1],

      [-23.5,-46.6],
      [-34.6,-58.4],
      [-12,-77]
    ],

    factory: [

      [30,-90],
      [41,-82],
      [42.3,-83],

      [-24,-47],
      [-34,-60],
      [-12,-76]
    ],

    spaceport: [

      [28.5,-80.6],
      [29.5,-95],
      [-2.9,-60],
      [-23,-45]
    ]
  };


  const genericSurfaceAnchors = [

    [-42,-39],
    [-23,-57],
    [0,-64],
    [24,-54],
    [43,-34],

    [-48,-7],
    [-26,8],
    [0,17],
    [27,9],
    [47,-5],

    [-38,35],
    [-13,44],
    [15,43],
    [39,31]
  ];


  function drawWorldDevelopment(
    currentWorld
  ) {

    if (currentWorld.id === "earth") {

      for (const building of currentWorld.automation) {

        const anchors =
          earthAnchors[
            building.sprite
          ];


        if (!anchors) {
          continue;
        }


        const count =
          getBuildingCount(
            currentWorld.id,
            building.id
          );


        const tier =
          getBuildingVisualTier(
            currentWorld,
            building.id
          );


        const divisor =

          building.sprite === "house"
            ? 8

            : building.sprite === "town"
              ? 6

              : 4;


        const visible =
          Math.min(
            anchors.length,
            Math.ceil(
              count / divisor
            )
          );


        const projected =
          [];


        for (let i = 0; i < visible; i++) {

          const [
            latitude,
            longitude
          ] =
            anchors[i];


          if (
            !isEarthLand(
              longitude,
              latitude
            )
          ) {
            continue;
          }


          const point =
            projectGeo(
              latitude,
              longitude
            );


          if (point) {
            projected.push(point);
          }
        }


        projected.sort(
          (
            a,
            b
          ) =>
            a.y - b.y
        );


        for (const point of projected) {

          let scale =
            0.44 +
            point.depth * 0.08;


          if (
            building.sprite === "town"
          ) {

            scale =
              0.52 +
              point.depth * 0.08;
          }


          if (
            building.sprite === "city"
          ) {

            scale =
              0.56 +
              point.depth * 0.09;
          }


          if (
            building.sprite === "factory"
          ) {

            scale =
              0.48 +
              point.depth * 0.08;
          }


          if (
            building.sprite === "spaceport"
          ) {

            scale =
              0.5 +
              point.depth * 0.08;
          }


          drawSprite(
            planetCtx,
            building.sprite,
            point.x,
            point.y,
            scale,
            tier
          );
        }
      }


      return;
    }


    if (
      currentWorld.id === "asteroids"
    ) {

      const positions = [

        [56,92],
        [78,135],
        [111,77],
        [143,126],

        [169,90],
        [65,157],
        [151,161],
        [110,169]

      ];


      let typeIndex =
        0;


      for (const building of currentWorld.automation) {

        const count =
          getBuildingCount(
            currentWorld.id,
            building.id
          );


        const tier =
          getBuildingVisualTier(
            currentWorld,
            building.id
          );


        const visible =
          Math.min(
            3,
            Math.ceil(
              count / 7
            )
          );


        for (let i = 0; i < visible; i++) {

          const [
            x,
            y
          ] =
            positions[
              (
                typeIndex * 2 +
                i
              )
              %
              positions.length
            ];


          drawSprite(
            planetCtx,
            building.sprite,
            x,
            y,
            0.66,
            tier
          );
        }


        typeIndex++;
      }


      return;
    }


    if (
      currentWorld.id === "sun"
    ) {

      const positions = [

        [43,111],
        [181,107],
        [64,54],
        [158,54],
        [67,170],
        [155,170]

      ];


      let typeIndex =
        0;


      for (const building of currentWorld.automation) {

        const count =
          getBuildingCount(
            currentWorld.id,
            building.id
          );


        const tier =
          getBuildingVisualTier(
            currentWorld,
            building.id
          );


        const visible =
          Math.min(
            2,
            Math.ceil(
              count / 9
            )
          );


        for (let i = 0; i < visible; i++) {

          const [
            x,
            y
          ] =
            positions[
              (
                typeIndex +
                i * 2
              )
              %
              positions.length
            ];


          drawSprite(
            planetCtx,
            building.sprite,
            x,
            y,
            0.62,
            tier
          );
        }


        typeIndex++;
      }


      return;
    }


    let buildingIndex =
      0;


    for (const building of currentWorld.automation) {

      const count =
        getBuildingCount(
          currentWorld.id,
          building.id
        );


      const tier =
        getBuildingVisualTier(
          currentWorld,
          building.id
        );


      const visible =
        Math.min(
          4,
          Math.ceil(
            count / 6
          )
        );


      for (let i = 0; i < visible; i++) {

        const anchor =
          genericSurfaceAnchors[
            (
              buildingIndex * 3 +
              i * 2
            )
            %
            genericSurfaceAnchors.length
          ];


        const x =
          Math.round(
            CX +
            anchor[0] * 0.88
          );


        const y =
          Math.round(
            CY +
            anchor[1] * 0.73
          );


        const dx =
          (
            x - CX
          )
          /
          PLANET_RADIUS;


        const dy =
          (
            y - CY
          )
          /
          PLANET_RADIUS;


        if (
          dx * dx +
          dy * dy >
          0.79
        ) {
          continue;
        }


        drawSprite(
          planetCtx,
          building.sprite,
          x,
          y,
          0.68,
          tier
        );
      }


      buildingIndex++;
    }
  }


  function drawCurrentPlanet() {

    const currentWorld =
      world();


    planetCtx.clearRect(
      0,
      0,
      ART,
      ART
    );


    planetCtx.drawImage(
      getBaseCanvas(
        currentWorld
      ),
      0,
      0
    );


    drawWorldDevelopment(
      currentWorld
    );
  }


  function makeSpriteIcon(
    sprite,
    tier = 0
  ) {

    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.width =
      40;


    canvas.height =
      40;


    canvas.style.width =
      "38px";


    canvas.style.height =
      "38px";


    canvas.style.imageRendering =
      "pixelated";


    const context =
      canvas.getContext(
        "2d"
      );


    context.imageSmoothingEnabled =
      false;


    drawSprite(
      context,
      sprite,
      20,
      31,
      0.82,
      tier
    );


    return canvas;
  }


  // =========================================================
  // SPACE BACKGROUND
  // =========================================================

  let backgroundDpr =
    1;


  function resizeBackground() {

    backgroundDpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );


    el.spaceBackground.width =
      Math.round(
        window.innerWidth *
        backgroundDpr
      );


    el.spaceBackground.height =
      Math.round(
        window.innerHeight *
        backgroundDpr
      );


    spaceCtx.setTransform(
      backgroundDpr,
      0,
      0,
      backgroundDpr,
      0,
      0
    );


    drawSpaceBackground();
  }


  function drawSpaceBackground() {

    const width =
      window.innerWidth;


    const height =
      window.innerHeight;


    spaceCtx.clearRect(
      0,
      0,
      width,
      height
    );


    if (
      state.theme === "light"
    ) {

      const gradient =
        spaceCtx.createLinearGradient(
          0,
          0,
          0,
          height
        );


      gradient.addColorStop(
        0,
        "#d9ecff"
      );


      gradient.addColorStop(
        1,
        "#f6faff"
      );


      spaceCtx.fillStyle =
        gradient;
    }

    else {

      const gradient =
        spaceCtx.createLinearGradient(
          0,
          0,
          0,
          height
        );


      gradient.addColorStop(
        0,
        "#050b1c"
      );


      gradient.addColorStop(
        0.55,
        "#020713"
      );


      gradient.addColorStop(
        1,
        "#01030a"
      );


      spaceCtx.fillStyle =
        gradient;
    }


    spaceCtx.fillRect(
      0,
      0,
      width,
      height
    );


    spaceCtx.save();


    spaceCtx.translate(
      width * 0.5,
      height * 0.48
    );


    spaceCtx.rotate(
      -0.24
    );


    const milkyWay =
      spaceCtx.createLinearGradient(
        0,
        -220,
        0,
        220
      );


    milkyWay.addColorStop(
      0,
      "rgba(255,255,255,0)"
    );


    milkyWay.addColorStop(
      0.36,
      state.theme === "light"
        ? "rgba(95,150,220,.05)"
        : "rgba(84,105,175,.045)"
    );


    milkyWay.addColorStop(
      0.49,
      state.theme === "light"
        ? "rgba(255,255,255,.20)"
        : "rgba(205,221,255,.11)"
    );


    milkyWay.addColorStop(
      0.52,
      state.theme === "light"
        ? "rgba(255,235,210,.13)"
        : "rgba(209,192,159,.065)"
    );


    milkyWay.addColorStop(
      0.65,
      state.theme === "light"
        ? "rgba(80,135,205,.05)"
        : "rgba(92,112,180,.04)"
    );


    milkyWay.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );


    spaceCtx.fillStyle =
      milkyWay;


    spaceCtx.fillRect(
      -width,
      -250,
      width * 2,
      500
    );


    spaceCtx.restore();


    const random =
      seededRandom(
        77
      );


    const stars =
      Math.floor(
        width *
        height /
        850
      );


    for (let i = 0; i < stars; i++) {

      const x =
        random() *
        width;


      const y =
        random() *
        height;


      const roll =
        random();


      const size =
        roll > 0.988
          ? 2
          : roll > 0.86
            ? 1
            : 0.5;


      spaceCtx.globalAlpha =
        state.theme === "light"
          ? 0.12 +
            random() *
            0.28
          : 0.25 +
            random() *
            0.7;


      const starType =
        random();


      spaceCtx.fillStyle =
        starType > 0.88
          ? "#ffd6a3"
          : starType < 0.08
            ? "#a9c7ff"
            : "#f0f6ff";


      spaceCtx.fillRect(
        Math.round(x),
        Math.round(y),
        size,
        size
      );
    }


    spaceCtx.globalAlpha =
      1;
  }


  // =========================================================
  // SCENE CANVASES
  // =========================================================

  let orbitDpr =
    1;


  function resizeSceneCanvases() {

    const rect =
      el.planetScene
        .getBoundingClientRect();


    orbitDpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );


    for (
      const canvas
      of [
        el.orbitCanvas,
        el.clickCanvas
      ]
    ) {

      canvas.width =
        Math.max(
          1,
          Math.round(
            rect.width *
            orbitDpr
          )
        );


      canvas.height =
        Math.max(
          1,
          Math.round(
            rect.height *
            orbitDpr
          )
        );
    }
  }


  // =========================================================
  // SPACECRAFT
  // =========================================================

  const transitShips =
    [];


  let nextTrafficTime =
    0;


  function scheduleNextTraffic(
    timestamp,
    currentWorld
  ) {

    let minimum =
      12000;


    let maximum =
      26000;


    if (
      currentWorld.id === "earth"
    ) {

      minimum =
        10000;


      maximum =
        24000;
    }


    nextTrafficTime =
      timestamp +
      minimum +
      Math.random() *
      (
        maximum -
        minimum
      );
  }


  function clearWrongWorldShips(
    currentWorld
  ) {

    for (
      let i =
        transitShips.length - 1;

      i >= 0;

      i--
    ) {

      if (
        transitShips[i].worldId !==
        currentWorld.id
      ) {

        transitShips.splice(
          i,
          1
        );
      }
    }
  }


  function spawnTransitShip(
    currentWorld
  ) {

    if (
      !hasTrafficUpgrade(
        currentWorld
      )
    ) {
      return;
    }


    const rect =
      el.planetScene
        .getBoundingClientRect();


    const leftToRight =
      Math.random() > 0.5;


    transitShips.push({

      worldId:
        currentWorld.id,

      progress:
        0,

      speed:
        0.09 +
        Math.random() *
        0.03,

      startX:
        leftToRight
          ? -80
          : rect.width + 80,

      startY:
        45 +
        Math.random() *
        Math.max(
          1,
          rect.height - 90
        ),

      endX:
        leftToRight
          ? rect.width + 80
          : -80,

      endY:
        45 +
        Math.random() *
        Math.max(
          1,
          rect.height - 90
        ),

      controlX:
        rect.width * 0.5 +
        (
          Math.random() *
          140 -
          70
        ),

      controlY:
        rect.height * 0.5 +
        (
          Math.random() *
          130 -
          65
        )
    });
  }


  function quadraticPoint(
    progress,
    start,
    control,
    end
  ) {

    const remaining =
      1 - progress;


    return (

      remaining *
      remaining *
      start

      +

      2 *
      remaining *
      progress *
      control

      +

      progress *
      progress *
      end
    );
  }


  function quadraticTangent(
    progress,
    start,
    control,
    end
  ) {

    return (

      2 *
      (
        1 - progress
      ) *
      (
        control - start
      )

      +

      2 *
      progress *
      (
        end - control
      )
    );
  }


  function drawSceneShip(
    ctx,
    x,
    y,
    angle
  ) {

    ctx.save();


    ctx.translate(
      Math.round(x),
      Math.round(y)
    );


    ctx.rotate(
      angle
    );


    ctx.fillStyle =
      "#e8f3f8";


    ctx.fillRect(
      -10,
      -4,
      18,
      8
    );


    ctx.fillRect(
      8,
      -2,
      4,
      4
    );


    ctx.fillStyle =
      "#5ee7ff";


    ctx.fillRect(
      4,
      -2,
      2,
      2
    );


    ctx.fillStyle =
      "#ff9c45";


    ctx.fillRect(
      -14,
      -2,
      4,
      4
    );


    ctx.fillStyle =
      "#ffe17a";


    ctx.fillRect(
      -18,
      0,
      4,
      2
    );


    ctx.restore();
  }


  function drawSceneStation(
    ctx,
    x,
    y,
    tier
  ) {

    const extra =
      tier * 3;


    ctx.fillStyle =
      "#2e70b7";


    ctx.fillRect(
      x - 24 - extra,
      y - 6,
      14 + extra,
      12
    );


    ctx.fillRect(
      x + 10,
      y - 6,
      14 + extra,
      12
    );


    ctx.fillStyle =
      "#aabcc7";


    ctx.fillRect(
      x - 10,
      y - 2,
      20,
      4
    );


    ctx.fillStyle =
      "#f0f7fa";


    ctx.fillRect(
      x - 4,
      y - 4,
      8,
      8
    );


    ctx.fillStyle =
      "#5feaff";


    ctx.fillRect(
      x - 2,
      y - 2,
      2,
      2
    );
  }


  function drawOrbitScene(
    timestamp,
    delta
  ) {

    const rect =
      el.planetScene
        .getBoundingClientRect();


    orbitCtx.setTransform(
      1,
      0,
      0,
      1,
      0,
      0
    );


    orbitCtx.clearRect(
      0,
      0,
      el.orbitCanvas.width,
      el.orbitCanvas.height
    );


    orbitCtx.setTransform(
      orbitDpr,
      0,
      0,
      orbitDpr,
      0,
      0
    );


    const currentWorld =
      world();


    if (
      !state.unlocked[
        currentWorld.id
      ]
    ) {
      return;
    }


    clearWrongWorldShips(
      currentWorld
    );


    const centerX =
      rect.width / 2;


    const centerY =
      rect.height / 2;


    if (
      currentWorld.id === "earth"
    ) {

      const stationCount =
        Math.min(
          5,
          getBuildingCount(
            "earth",
            "stations"
          )
        );


      const stationTier =
        getBuildingVisualTier(
          currentWorld,
          "stations"
        );


      for (
        let i = 0;
        i < stationCount;
        i++
      ) {

        const angle =

          timestamp *
          (
            0.00017 +
            i * 0.000007
          )

          +

          i * 1.5;


        const x =
          Math.round(

            centerX

            +

            Math.cos(angle) *
            (
              145 +
              i * 9
            )
          );


        const y =
          Math.round(

            centerY

            +

            Math.sin(angle) *
            (
              88 +
              i * 5
            )
          );


        drawSceneStation(
          orbitCtx,
          x,
          y,
          stationTier
        );
      }
    }


    if (
      hasTrafficUpgrade(
        currentWorld
      )
    ) {

      if (
        nextTrafficTime === 0
      ) {

        scheduleNextTraffic(
          timestamp,
          currentWorld
        );
      }


      if (
        timestamp >=
        nextTrafficTime
      ) {

        const active =
          transitShips
            .filter(
              ship =>
                ship.worldId ===
                currentWorld.id
            )
            .length;


        if (active < 1) {

          spawnTransitShip(
            currentWorld
          );
        }


        scheduleNextTraffic(
          timestamp,
          currentWorld
        );
      }
    }

    else {

      nextTrafficTime =
        0;


      for (
        let i =
          transitShips.length - 1;

        i >= 0;

        i--
      ) {

        if (
          transitShips[i].worldId ===
          currentWorld.id
        ) {

          transitShips.splice(
            i,
            1
          );
        }
      }
    }


    for (
      let i =
        transitShips.length - 1;

      i >= 0;

      i--
    ) {

      const ship =
        transitShips[i];


      if (
        ship.worldId !==
        currentWorld.id
      ) {
        continue;
      }


      ship.progress +=
        ship.speed *
        delta;


      if (
        ship.progress >= 1
      ) {

        transitShips.splice(
          i,
          1
        );

        continue;
      }


      const x =
        quadraticPoint(
          ship.progress,
          ship.startX,
          ship.controlX,
          ship.endX
        );


      const y =
        quadraticPoint(
          ship.progress,
          ship.startY,
          ship.controlY,
          ship.endY
        );


      const tangentX =
        quadraticTangent(
          ship.progress,
          ship.startX,
          ship.controlX,
          ship.endX
        );


      const tangentY =
        quadraticTangent(
          ship.progress,
          ship.startY,
          ship.controlY,
          ship.endY
        );


      drawSceneShip(
        orbitCtx,
        x,
        y,
        Math.atan2(
          tangentY,
          tangentX
        )
      );
    }
  }


  // =========================================================
  // CLICK EFFECTS
  // =========================================================

  const particles =
    [];


  const shockwaves =
    [];


  function createClickEffects(
    event
  ) {

    const rect =
      el.planetScene
        .getBoundingClientRect();


    const x =
      event.clientX -
      rect.left;


    const y =
      event.clientY -
      rect.top;


    const palette =
      world().id === "earth"

        ? [
            "#68e8ff",
            "#8ef0b0",
            "#ffe58c",
            "#ffffff"
          ]

        : [
            "#68e8ff",
            "#ffffff",
            "#ffd272"
          ];


    for (let i = 0; i < 24; i++) {

      const angle =
        Math.random() *
        Math.PI *
        2;


      const speed =
        40 +
        Math.random() *
        130;


      const life =
        0.3 +
        Math.random() *
        0.4;


      particles.push({

        x,
        y,

        vx:
          Math.cos(angle) *
          speed,

        vy:
          Math.sin(angle) *
          speed,

        size:
          2 +
          Math.random() *
          3,

        life,

        maxLife:
          life,

        color:
          palette[
            Math.floor(
              Math.random() *
              palette.length
            )
          ]
      });
    }


    shockwaves.push({

      x,
      y,

      radius:
        4,

      life:
        0.25,

      maxLife:
        0.25,

      color:
        palette[0]
    });
  }


  function drawClickEffects(
    delta
  ) {

    clickCtx.setTransform(
      1,
      0,
      0,
      1,
      0,
      0
    );


    clickCtx.clearRect(
      0,
      0,
      el.clickCanvas.width,
      el.clickCanvas.height
    );


    clickCtx.setTransform(
      orbitDpr,
      0,
      0,
      orbitDpr,
      0,
      0
    );


    for (
      let i =
        particles.length - 1;

      i >= 0;

      i--
    ) {

      const particle =
        particles[i];


      particle.life -=
        delta;


      if (
        particle.life <= 0
      ) {

        particles.splice(
          i,
          1
        );

        continue;
      }


      particle.x +=
        particle.vx *
        delta;


      particle.y +=
        particle.vy *
        delta;


      particle.vx *=
        0.94;


      particle.vy =
        particle.vy *
        0.94

        +

        18 *
        delta;


      const alpha =
        particle.life /
        particle.maxLife;


      clickCtx.globalAlpha =
        alpha;


      clickCtx.fillStyle =
        particle.color;


      const size =
        Math.max(
          1,
          Math.round(
            particle.size *
            alpha
          )
        );


      clickCtx.fillRect(
        Math.round(
          particle.x
        ),
        Math.round(
          particle.y
        ),
        size,
        size
      );
    }


    for (
      let i =
        shockwaves.length - 1;

      i >= 0;

      i--
    ) {

      const wave =
        shockwaves[i];


      wave.life -=
        delta;


      if (
        wave.life <= 0
      ) {

        shockwaves.splice(
          i,
          1
        );

        continue;
      }


      wave.radius +=
        140 *
        delta;


      clickCtx.globalAlpha =
        wave.life /
        wave.maxLife;


      clickCtx.strokeStyle =
        wave.color;


      clickCtx.lineWidth =
        2;


      clickCtx.strokeRect(

        Math.round(
          wave.x -
          wave.radius
        ),

        Math.round(
          wave.y -
          wave.radius
        ),

        Math.round(
          wave.radius * 2
        ),

        Math.round(
          wave.radius * 2
        )
      );
    }


    clickCtx.globalAlpha =
      1;
  }


  function createFloatingNumber(
    event,
    amount
  ) {

    const rect =
      el.planetScene
        .getBoundingClientRect();


    const node =
      document.createElement(
        "span"
      );


    node.className =
      "floating-number";


    node.style.left =
      (
        event.clientX -
        rect.left
      ) +
      "px";


    node.style.top =
      (
        event.clientY -
        rect.top
      ) +
      "px";


    node.textContent =
      "+" +
      formatNumber(
        amount,
        1
      );


    el.floatingNumbers
      .appendChild(
        node
      );


    setTimeout(
      () =>
        node.remove(),
      800
    );
  }


  // =========================================================
  // AUDIO
  //
  // ORIGINAL CINEMATIC SPACE SCORE
  //
  // Organ-like sustained chords
  // Repeating pulse
  // Bass pedal notes
  // Slowly changing harmony
  // High melody voices
  // Echo
  // No random creepy chord jumps
  // =========================================================

  let audioContext =
    null;


  let masterGain =
    null;


  let musicGain =
    null;


  let sfxGain =
    null;


  let musicBus =
    null;


  let musicFilter =
    null;


  let delayNode =
    null;


  let delayFeedback =
    null;


  let delayWet =
    null;


  let musicStarted =
    false;


  let musicEnabled =
    true;


  let sfxEnabled =
    true;


  let musicTimer =
    null;


  let nextMusicCycleTime =
    0;


  function ensureAudio() {

    if (!audioContext) {

      const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


      if (!AudioContextClass) {
        return false;
      }


      audioContext =
        new AudioContextClass();


      masterGain =
        audioContext.createGain();


      musicGain =
        audioContext.createGain();


      sfxGain =
        audioContext.createGain();


      musicBus =
        audioContext.createGain();


      musicFilter =
        audioContext.createBiquadFilter();


      delayNode =
        audioContext.createDelay(2);


      delayFeedback =
        audioContext.createGain();


      delayWet =
        audioContext.createGain();


      masterGain.gain.value =
        1;


      musicGain.gain.value =
        0.70;


      sfxGain.gain.value =
        1;


      musicBus.gain.value =
        1;


      musicFilter.type =
        "lowpass";


      musicFilter.frequency.value =
        2500;


      musicFilter.Q.value =
        0.32;


      delayNode.delayTime.value =
        0.34;


      delayFeedback.gain.value =
        0.18;


      delayWet.gain.value =
        0.17;


      delayNode.connect(
        delayFeedback
      );


      delayFeedback.connect(
        delayNode
      );


      musicBus.connect(
        musicFilter
      );


      musicFilter.connect(
        musicGain
      );


      musicFilter.connect(
        delayNode
      );


      delayNode.connect(
        delayWet
      );


      delayWet.connect(
        musicGain
      );


      musicGain.connect(
        masterGain
      );


      sfxGain.connect(
        masterGain
      );


      masterGain.connect(
        audioContext.destination
      );


      startMusic();
    }


    if (
      audioContext.state === "suspended"
    ) {

      audioContext.resume();
    }


    return true;
  }


  function playTone(
    frequency,
    duration,
    volume,
    type,
    destination,
    delay = 0
  ) {

    if (
      !audioContext ||
      !destination
    ) {
      return;
    }


    const start =
      audioContext.currentTime +
      delay;


    const oscillator =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    oscillator.type =
      type;


    oscillator.frequency
      .setValueAtTime(
        frequency,
        start
      );


    gain.gain
      .setValueAtTime(
        0.0001,
        start
      );


    gain.gain
      .exponentialRampToValueAtTime(
        Math.max(
          0.0001,
          volume
        ),
        start + 0.012
      );


    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start + duration
      );


    oscillator.connect(
      gain
    );


    gain.connect(
      destination
    );


    oscillator.start(
      start
    );


    oscillator.stop(
      start +
      duration +
      0.05
    );
  }


  function scheduleOrganNote(
    frequency,
    start,
    duration,
    volume,
    brightness = 1
  ) {

    if (!audioContext) {
      return;
    }


    const noteGain =
      audioContext.createGain();


    const noteFilter =
      audioContext.createBiquadFilter();


    noteFilter.type =
      "lowpass";


    noteFilter.frequency.value =
      1200 +
      brightness *
      1400;


    noteFilter.Q.value =
      0.25;


    noteGain.gain
      .setValueAtTime(
        0.0001,
        start
      );


    noteGain.gain
      .linearRampToValueAtTime(
        volume,
        start + 0.18
      );


    noteGain.gain
      .setValueAtTime(
        volume,
        start +
        Math.max(
          0.2,
          duration - 0.45
        )
      );


    noteGain.gain
      .linearRampToValueAtTime(
        0.0001,
        start + duration
      );


    const fundamental =
      audioContext.createOscillator();


    fundamental.type =
      "sine";


    fundamental.frequency
      .setValueAtTime(
        frequency,
        start
      );


    const harmonic =
      audioContext.createOscillator();


    harmonic.type =
      "triangle";


    harmonic.frequency
      .setValueAtTime(
        frequency * 2,
        start
      );


    const harmonicGain =
      audioContext.createGain();


    harmonicGain.gain.value =
      0.10 +
      brightness *
      0.055;


    fundamental.connect(
      noteFilter
    );


    harmonic.connect(
      harmonicGain
    );


    harmonicGain.connect(
      noteFilter
    );


    noteFilter.connect(
      noteGain
    );


    noteGain.connect(
      musicBus
    );


    fundamental.start(
      start
    );


    harmonic.start(
      start
    );


    fundamental.stop(
      start +
      duration +
      0.1
    );


    harmonic.stop(
      start +
      duration +
      0.1
    );
  }


  function schedulePulse(
    frequency,
    start,
    volume = 0.03
  ) {

    const oscillator =
      audioContext.createOscillator();


    const harmonic =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    const harmonicGain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    harmonic.type =
      "triangle";


    oscillator.frequency.value =
      frequency;


    harmonic.frequency.value =
      frequency * 2;


    harmonicGain.gain.value =
      0.12;


    gain.gain
      .setValueAtTime(
        0.0001,
        start
      );


    gain.gain
      .linearRampToValueAtTime(
        volume,
        start + 0.025
      );


    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start + 0.55
      );


    oscillator.connect(
      gain
    );


    harmonic.connect(
      harmonicGain
    );


    harmonicGain.connect(
      gain
    );


    gain.connect(
      musicBus
    );


    oscillator.start(
      start
    );


    harmonic.start(
      start
    );


    oscillator.stop(
      start + 0.6
    );


    harmonic.stop(
      start + 0.6
    );
  }


  function scheduleBell(
    frequency,
    start,
    volume = 0.008
  ) {

    const oscillator =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.value =
      frequency;


    gain.gain
      .setValueAtTime(
        volume,
        start
      );


    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start + 2.4
      );


    oscillator.connect(
      gain
    );


    gain.connect(
      musicBus
    );


    oscillator.start(
      start
    );


    oscillator.stop(
      start + 2.5
    );
  }


  const MUSIC_BARS = [

    {
      bass:
        130.81,

      chord: [
        261.63,
        329.63,
        392.00,
        493.88,
        587.33
      ],

      pulse: [
        261.63,
        392.00,
        329.63,
        392.00,
        587.33,
        392.00,
        329.63,
        392.00
      ],

      melody: [
        659.25,
        783.99
      ]
    },


    {
      bass:
        123.47,

      chord: [
        246.94,
        293.66,
        392.00,
        493.88,
        659.25
      ],

      pulse: [
        293.66,
        392.00,
        493.88,
        392.00,
        659.25,
        392.00,
        493.88,
        392.00
      ],

      melody: [
        587.33,
        659.25
      ]
    },


    {
      bass:
        110.00,

      chord: [
        220.00,
        261.63,
        329.63,
        392.00,
        493.88
      ],

      pulse: [
        261.63,
        329.63,
        392.00,
        329.63,
        493.88,
        392.00,
        329.63,
        392.00
      ],

      melody: [
        659.25,
        587.33
      ]
    },


    {
      bass:
        174.61,

      chord: [
        261.63,
        349.23,
        440.00,
        523.25,
        659.25
      ],

      pulse: [
        261.63,
        349.23,
        440.00,
        349.23,
        523.25,
        440.00,
        349.23,
        440.00
      ],

      melody: [
        698.46,
        659.25
      ]
    },


    {
      bass:
        146.83,

      chord: [
        293.66,
        349.23,
        440.00,
        523.25,
        659.25
      ],

      pulse: [
        293.66,
        440.00,
        349.23,
        440.00,
        659.25,
        440.00,
        349.23,
        440.00
      ],

      melody: [
        587.33,
        698.46
      ]
    },


    {
      bass:
        196.00,

      chord: [
        293.66,
        392.00,
        440.00,
        587.33,
        659.25
      ],

      pulse: [
        293.66,
        392.00,
        440.00,
        392.00,
        587.33,
        440.00,
        392.00,
        493.88
      ],

      melody: [
        783.99,
        659.25
      ]
    },


    {
      bass:
        164.81,

      chord: [
        329.63,
        392.00,
        493.88,
        587.33,
        659.25
      ],

      pulse: [
        329.63,
        392.00,
        493.88,
        392.00,
        659.25,
        493.88,
        392.00,
        493.88
      ],

      melody: [
        783.99,
        880.00
      ]
    },


    {
      bass:
        130.81,

      chord: [
        261.63,
        329.63,
        392.00,
        493.88,
        587.33
      ],

      pulse: [
        329.63,
        392.00,
        523.25,
        392.00,
        587.33,
        523.25,
        392.00,
        329.63
      ],

      melody: [
        783.99,
        659.25
      ]
    }

  ];


  function scheduleMusicBar(
    bar,
    start,
    barIndex
  ) {

    scheduleOrganNote(
      bar.bass,
      start,
      3.95,
      0.036,
      0.2
    );


    bar.chord.forEach(
      (
        frequency,
        index
      ) => {

        scheduleOrganNote(
          frequency,
          start +
          0.04 * index,
          3.82,
          0.0135,
          0.45 +
          index * 0.05
        );
      }
    );


    bar.pulse.forEach(
      (
        frequency,
        index
      ) => {

        schedulePulse(

          frequency,

          start +
          index * 0.5,

          index % 4 === 0
            ? 0.036
            : 0.024
        );
      }
    );


    if (
      barIndex % 2 === 0
    ) {

      scheduleOrganNote(
        bar.melody[0],
        start + 1.15,
        1.15,
        0.011,
        1
      );


      scheduleOrganNote(
        bar.melody[1],
        start + 2.75,
        1.05,
        0.010,
        1
      );
    }


    if (
      barIndex === 3 ||
      barIndex === 7
    ) {

      scheduleBell(
        bar.melody[1] * 2,
        start + 3.1,
        0.0045
      );
    }
  }


  function scheduleMusicCycle() {

    if (!audioContext) {
      return;
    }


    if (
      nextMusicCycleTime <
      audioContext.currentTime + 0.2
    ) {

      nextMusicCycleTime =
        audioContext.currentTime +
        0.15;
    }


    MUSIC_BARS.forEach(
      (
        bar,
        index
      ) => {

        scheduleMusicBar(
          bar,
          nextMusicCycleTime +
          index * 4,
          index
        );
      }
    );


    nextMusicCycleTime +=
      MUSIC_BARS.length *
      4;


    clearTimeout(
      musicTimer
    );


    musicTimer =
      setTimeout(
        scheduleMusicCycle,
        24000
      );
  }


  function startMusic() {

    if (musicStarted) {
      return;
    }


    musicStarted =
      true;


    nextMusicCycleTime =
      audioContext.currentTime +
      0.15;


    scheduleMusicCycle();
  }


  function playClickSound() {

    if (
      !sfxEnabled ||
      !ensureAudio()
    ) {
      return;
    }


    const randomPitch =
      0.90 +
      Math.random() *
      0.20;


    playTone(
      290 *
      randomPitch,
      0.065,
      0.31,
      "triangle",
      sfxGain
    );


    playTone(
      760 *
      (
        0.93 +
        Math.random() *
        0.14
      ),
      0.04,
      0.12,
      "sine",
      sfxGain,
      0.004
    );
  }


  function playBuySound() {

    if (
      !sfxEnabled ||
      !ensureAudio()
    ) {
      return;
    }


    playTone(
      523.25,
      0.16,
      0.15,
      "triangle",
      sfxGain,
      0
    );


    playTone(
      659.25,
      0.17,
      0.14,
      "triangle",
      sfxGain,
      0.045
    );


    playTone(
      783.99,
      0.19,
      0.13,
      "sine",
      sfxGain,
      0.09
    );
  }


  // =========================================================
  // HUD
  // =========================================================

  function renderHud() {

    const currentWorld =
      world();


    el.materials.textContent =
      formatNumber(
        state.materials,
        1
      );


    el.clickPower.textContent =
      formatNumber(
        getClickPower(
          currentWorld
        ),
        1
      );


    el.cps.textContent =
      formatNumber(
        getTotalCps(),
        1
      );


    el.population.textContent =
      formatPopulation(
        getPopulation()
      );


    el.worldCps.textContent =
      formatNumber(
        getWorldCps(
          currentWorld
        ),
        1
      );


    el.worldClick.textContent =
      formatNumber(
        getClickPower(
          currentWorld
        ),
        1
      );


    el.automationCount.textContent =
      getAutomationCount(
        currentWorld
      );


    const development =
      Math.min(
        100,
        getAutomationCount(
          currentWorld
        ) / 2
      );


    el.developmentPercent.textContent =
      Math.floor(
        development
      ) +
      "%";


    el.developmentBar.style.width =
      development +
      "%";
  }


  // =========================================================
  // LOCK
  // =========================================================

  function updatePlanetLock() {

    const currentWorld =
      world();


    const unlocked =
      state.unlocked[
        currentWorld.id
      ];


    el.lockOverlay
      .classList
      .toggle(
        "hidden",
        unlocked
      );


    if (!unlocked) {

      el.lockTitle.textContent =
        currentWorld.name +
        " LOCKED";


      el.lockCost.textContent =
        formatNumber(
          currentWorld.unlockCost,
          0
        ) +
        " Materials";


      el.unlockButton.disabled =
        state.materials <
        currentWorld.unlockCost;
    }
  }


  function renderWorldStatic() {

    const currentWorld =
      world();


    el.planetName.textContent =
      currentWorld.name;


    el.planetSubtitle.textContent =
      currentWorld.subtitle;


    updatePlanetLock();


    drawCurrentPlanet();


    nextTrafficTime =
      0;


    clearWrongWorldShips(
      currentWorld
    );
  }


  // =========================================================
  // AUTOMATION UI
  // =========================================================

  function buildAutomationList() {

    automationRefs.clear();


    el.automationList
      .replaceChildren();


    const currentWorld =
      world();


    if (
      !state.unlocked[
        currentWorld.id
      ]
    ) {
      return;
    }


    for (const building of currentWorld.automation) {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "store-card";


      const icon =
        document.createElement(
          "div"
        );


      icon.className =
        "store-icon";


      icon.appendChild(
        makeSpriteIcon(
          building.sprite,
          getBuildingVisualTier(
            currentWorld,
            building.id
          )
        )
      );


      const content =
        document.createElement(
          "div"
        );


      content.className =
        "store-content";


      const titleRow =
        document.createElement(
          "div"
        );


      titleRow.className =
        "store-title";


      const title =
        document.createElement(
          "strong"
        );


      title.textContent =
        building.name;


      const owned =
        document.createElement(
          "span"
        );


      owned.className =
        "owned";


      titleRow.append(
        title,
        owned
      );


      const description =
        document.createElement(
          "div"
        );


      description.className =
        "description";


      description.textContent =
        building.description;


      const effect =
        document.createElement(
          "div"
        );


      effect.className =
        "effect";


      const price =
        document.createElement(
          "div"
        );


      price.className =
        "price";


      content.append(
        titleRow,
        description,
        effect,
        price
      );


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "buy-button";


      button.textContent =
        "BUY";


      button.addEventListener(
        "click",
        () =>
          buyBuilding(
            building.id
          )
      );


      card.append(
        icon,
        content,
        button
      );


      el.automationList
        .appendChild(
          card
        );


      automationRefs.set(
        building.id,
        {
          building,
          owned,
          effect,
          price,
          button
        }
      );
    }


    updateAutomationList();
  }


  function updateAutomationList() {

    const currentWorld =
      world();


    for (
      const {
        building,
        owned,
        effect,
        price,
        button
      }
      of automationRefs.values()
    ) {

      const count =
        getBuildingCount(
          currentWorld.id,
          building.id
        );


      const cost =
        getBuildingCost(
          currentWorld,
          building
        );


      const each =
        building.baseCps *
        getBuildingMultiplier(
          currentWorld,
          building.id
        );


      owned.textContent =
        `×${count}`;


      effect.textContent =
        `${formatNumber(each, 1)}/sec each • ${formatNumber(getBuildingCps(currentWorld, building), 1)}/sec total`;


      price.textContent =
        `${formatNumber(cost, 0)} Materials`;


      button.disabled =
        state.materials <
        cost;
    }
  }


  // =========================================================
  // UPGRADES UI
  // =========================================================

  function buildUpgradeList() {

    upgradeRefs.clear();


    el.upgradeList
      .replaceChildren();


    const currentWorld =
      world();


    if (
      !state.unlocked[
        currentWorld.id
      ]
    ) {
      return;
    }


    const upgrades =
      currentWorld
        .upgrades
        .filter(
          upgrade =>
            upgrade.category ===
              state.upgradeCategory

            &&

            !ownsUpgrade(
              upgrade.id
            )
        );


    if (!upgrades.length) {

      const empty =
        document.createElement(
          "div"
        );


      empty.className =
        "empty-store";


      empty.textContent =
        "Everything here has been purchased.";


      el.upgradeList
        .appendChild(
          empty
        );


      return;
    }


    for (const upgrade of upgrades) {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "store-card upgrade-card";


      const icon =
        document.createElement(
          "div"
        );


      icon.className =
        "store-icon";


      icon.appendChild(
        makeSpriteIcon(
          upgrade.iconSprite,
          upgrade.visualTier || 0
        )
      );


      const content =
        document.createElement(
          "div"
        );


      content.className =
        "store-content";


      const titleRow =
        document.createElement(
          "div"
        );


      titleRow.className =
        "store-title";


      const title =
        document.createElement(
          "strong"
        );


      title.textContent =
        upgrade.name;


      titleRow.appendChild(
        title
      );


      const description =
        document.createElement(
          "div"
        );


      description.className =
        "description";


      description.textContent =
        upgrade.description;


      const effect =
        document.createElement(
          "div"
        );


      effect.className =
        "effect";


      effect.textContent =
        upgrade.effectText;


      const requirement =
        document.createElement(
          "div"
        );


      requirement.className =
        "requirement";


      const price =
        document.createElement(
          "div"
        );


      price.className =
        "price";


      content.append(
        titleRow,
        description,
        effect,
        requirement,
        price
      );


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "buy-button";


      button.addEventListener(
        "click",
        () =>
          buyUpgrade(
            upgrade.id
          )
      );


      card.append(
        icon,
        content,
        button
      );


      el.upgradeList
        .appendChild(
          card
        );


      upgradeRefs.set(
        upgrade.id,
        {
          card,
          upgrade,
          requirement,
          price,
          button
        }
      );
    }


    updateUpgradeList();
  }


  function updateUpgradeList() {

    const currentWorld =
      world();


    for (
      const {
        card,
        upgrade,
        requirement,
        price,
        button
      }
      of upgradeRefs.values()
    ) {

      const available =
        requirementMet(
          currentWorld,
          upgrade
        );


      const building =
        currentWorld
          .automation
          .find(
            candidate =>
              candidate.id ===
              upgrade.requires.building
          );


      requirement.textContent =
        `Requires ${upgrade.requires.count} ${building ? building.name : ""}`;


      price.textContent =
        `${formatNumber(upgrade.cost, 0)} Materials`;


      card.classList.toggle(
        "locked",
        !available
      );


      button.textContent =
        available
          ? "BUY"
          : "LOCKED";


      button.disabled =
        !available ||
        state.materials <
        upgrade.cost;
    }
  }


  // =========================================================
  // RENDER
  // =========================================================

  function renderEverything() {

    renderWorldStatic();

    buildAutomationList();

    buildUpgradeList();

    renderHud();

    requestAnimationFrame(
      resizeSceneCanvases
    );
  }


  function refreshDynamicUI() {

    renderHud();

    updateAutomationList();

    updateUpgradeList();

    updatePlanetLock();
  }


  // =========================================================
  // GAME ACTIONS
  // =========================================================

  function harvest(event) {

    const currentWorld =
      world();


    if (
      !state.unlocked[
        currentWorld.id
      ]
    ) {
      return;
    }


    playClickSound();


    const amount =
      getClickPower(
        currentWorld
      );


    state.materials +=
      amount;


    createClickEffects(
      event
    );


    createFloatingNumber(
      event,
      amount
    );


    refreshDynamicUI();
  }


  function buyBuilding(id) {

    const currentWorld =
      world();


    const building =
      currentWorld
        .automation
        .find(
          candidate =>
            candidate.id === id
        );


    if (!building) {
      return;
    }


    const cost =
      getBuildingCost(
        currentWorld,
        building
      );


    if (
      state.materials <
      cost
    ) {
      return;
    }


    state.materials -=
      cost;


    setBuildingCount(
      currentWorld.id,
      building.id,
      getBuildingCount(
        currentWorld.id,
        building.id
      ) + 1
    );


    playBuySound();


    drawCurrentPlanet();


    refreshDynamicUI();


    save(false);
  }


  function buyUpgrade(id) {

    const currentWorld =
      world();


    const upgrade =
      currentWorld
        .upgrades
        .find(
          candidate =>
            candidate.id === id
        );


    if (
      !upgrade ||
      ownsUpgrade(id) ||
      !requirementMet(
        currentWorld,
        upgrade
      ) ||
      state.materials <
      upgrade.cost
    ) {
      return;
    }


    state.materials -=
      upgrade.cost;


    state.upgrades[id] =
      true;


    playBuySound();


    if (
      upgrade.type ===
      "shipTraffic"
    ) {

      nextTrafficTime =
        performance.now() +
        7000 +
        Math.random() *
        7000;
    }


    drawCurrentPlanet();


    buildAutomationList();


    buildUpgradeList();


    renderHud();


    save(false);
  }


  function unlockPlanet() {

    const currentWorld =
      world();


    if (
      state.unlocked[
        currentWorld.id
      ]

      ||

      state.materials <
      currentWorld.unlockCost
    ) {
      return;
    }


    state.materials -=
      currentWorld.unlockCost;


    state.unlocked[
      currentWorld.id
    ] =
      true;


    playBuySound();


    renderEverything();


    save(false);
  }


  function switchPlanet(
    direction
  ) {

    state.currentWorld =

      (
        state.currentWorld +
        direction +
        worlds.length
      )

      %

      worlds.length;


    nextTrafficTime =
      0;


    renderEverything();
  }


  function setUpgradeCategory(
    category
  ) {

    state.upgradeCategory =
      category;


    el.playerTab
      .classList
      .toggle(
        "active",
        category === "player"
      );


    el.itemTab
      .classList
      .toggle(
        "active",
        category === "item"
      );


    buildUpgradeList();
  }


  function applyTheme(theme) {

    state.theme =
      theme;


    document.body
      .classList
      .toggle(
        "light-mode",
        theme === "light"
      );


    el.themeButton.textContent =
      theme === "light"
        ? "LIGHT"
        : "DARK";


    drawSpaceBackground();
  }


  // =========================================================
  // SAVE
  // =========================================================

  function save(
    showMessage = true
  ) {

    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({

        materials:
          state.materials,

        currentWorld:
          state.currentWorld,

        unlocked:
          state.unlocked,

        buildings:
          state.buildings,

        upgrades:
          state.upgrades,

        theme:
          state.theme,

        savedAt:
          Date.now()
      })
    );


    if (showMessage) {

      el.saveStatus.textContent =
        "SAVED";


      setTimeout(
        () => {

          el.saveStatus.textContent =
            "AUTOSAVE ENABLED";

        },
        1000
      );
    }
  }


  function load() {

    const raw =
      localStorage.getItem(
        SAVE_KEY
      );


    if (!raw) {
      return;
    }


    try {

      const data =
        JSON.parse(raw);


      if (
        Number.isFinite(
          data.materials
        )
      ) {

        state.materials =
          Math.max(
            0,
            data.materials
          );
      }


      if (
        Number.isInteger(
          data.currentWorld
        )
      ) {

        state.currentWorld =
          Math.max(
            0,
            Math.min(
              worlds.length - 1,
              data.currentWorld
            )
          );
      }


      if (data.unlocked) {

        for (const currentWorld of worlds) {

          state.unlocked[
            currentWorld.id
          ] =

            currentWorld.id === "earth"
              ? true
              : Boolean(
                  data.unlocked[
                    currentWorld.id
                  ]
                );
        }
      }


      if (data.buildings) {

        state.buildings =
          data.buildings;
      }


      if (data.upgrades) {

        state.upgrades =
          data.upgrades;
      }


      if (
        data.theme === "light" ||
        data.theme === "dark"
      ) {

        state.theme =
          data.theme;
      }


      if (
        Number.isFinite(
          data.savedAt
        )
      ) {

        const seconds =
          Math.min(
            21600,
            Math.max(
              0,
              (
                Date.now() -
                data.savedAt
              ) / 1000
            )
          );


        state.materials +=

          getTotalCps() *
          seconds *
          0.35;
      }
    }

    catch (error) {

      console.warn(
        "Could not load save:",
        error
      );
    }
  }


  function resetGame() {

    if (
      !window.confirm(
        "Reset all Colinization Clicker progress?"
      )
    ) {
      return;
    }


    localStorage.removeItem(
      SAVE_KEY
    );


    location.reload();
  }


  // =========================================================
  // MAIN LOOP
  // =========================================================

  let previousFrame =
    performance.now();


  let uiTimer =
    0;


  function animationLoop(
    timestamp
  ) {

    const delta =
      Math.min(
        0.1,
        (
          timestamp -
          previousFrame
        ) / 1000
      );


    previousFrame =
      timestamp;


    // Smooth continuous CPS.
    // Humans thankfully invented fractions.

    state.materials +=
      getTotalCps() *
      delta;


    uiTimer +=
      delta;


    if (
      uiTimer >
      0.1
    ) {

      uiTimer =
        0;


      refreshDynamicUI();
    }


    drawOrbitScene(
      timestamp,
      delta
    );


    drawClickEffects(
      delta
    );


    requestAnimationFrame(
      animationLoop
    );
  }


  // =========================================================
  // EVENTS
  // =========================================================

  el.planetButton
    .addEventListener(
      "click",
      harvest
    );


  el.previousPlanet
    .addEventListener(
      "click",
      () =>
        switchPlanet(-1)
    );


  el.nextPlanet
    .addEventListener(
      "click",
      () =>
        switchPlanet(1)
    );


  el.unlockButton
    .addEventListener(
      "click",
      unlockPlanet
    );


  el.playerTab
    .addEventListener(
      "click",
      () =>
        setUpgradeCategory(
          "player"
        )
    );


  el.itemTab
    .addEventListener(
      "click",
      () =>
        setUpgradeCategory(
          "item"
        )
    );


  el.saveButton
    .addEventListener(
      "click",
      () =>
        save(true)
    );


  el.resetButton
    .addEventListener(
      "click",
      resetGame
    );


  el.themeButton
    .addEventListener(
      "click",
      () => {

        applyTheme(
          state.theme === "dark"
            ? "light"
            : "dark"
        );


        save(false);
      }
    );


  el.musicButton
    .addEventListener(
      "click",
      () => {

        ensureAudio();


        musicEnabled =
          !musicEnabled;


        el.musicButton.textContent =
          musicEnabled
            ? "MUSIC"
            : "MUSIC OFF";


        el.musicButton
          .classList
          .toggle(
            "enabled",
            musicEnabled
          );


        if (
          musicGain &&
          audioContext
        ) {

          musicGain.gain
            .cancelScheduledValues(
              audioContext.currentTime
            );


          musicGain.gain
            .setTargetAtTime(

              musicEnabled
                ? 0.70
                : 0.0001,

              audioContext.currentTime,

              0.08
            );
        }
      }
    );


  el.sfxButton
    .addEventListener(
      "click",
      () => {

        sfxEnabled =
          !sfxEnabled;


        el.sfxButton.textContent =
          sfxEnabled
            ? "SFX"
            : "SFX OFF";


        el.sfxButton
          .classList
          .toggle(
            "enabled",
            sfxEnabled
          );
      }
    );


  document.addEventListener(
    "pointerdown",
    ensureAudio,
    {
      once:
        true
    }
  );


  window.addEventListener(
    "resize",
    () => {

      resizeBackground();

      resizeSceneCanvases();
    }
  );


  setInterval(
    () =>
      save(false),
    5000
  );


  window.addEventListener(
    "beforeunload",
    () =>
      save(false)
  );


  // =========================================================
  // START
  // =========================================================

  load();


  applyTheme(
    state.theme
  );


  resizeBackground();


  resizeSceneCanvases();


  setUpgradeCategory(
    state.upgradeCategory
  );


  renderEverything();


  requestAnimationFrame(
    animationLoop
  );

})();