# DEAD SIGNAL — Foundation Design v0.1

Date: 2026-09-11
Status: User-approved foundation, pending spec review before implementation plan

## 1. Product identity

DEAD SIGNAL is a web-first modular post-apocalyptic strategy game that combines settlement management, expedition gameplay, layered music, territorial warfare, and a future 4X-style global hex map. It must feel like an original IP, not a clone of existing games. Inspiration may come from survival city builders, 4X strategy, colony sims, and music-creation games, but all names, lore, factions, visuals, audio, systems presentation, and content should be original or properly licensed.

Core differentiator: the player can hear the state of their settlement and later their territory through a dynamic layered soundtrack. Buildings, factions, radiation, morale, weather, ideology, military pressure, and other systems can contribute separate audio stems that may be muted, soloed, or mixed.

## 2. Product principles

1. One world, multiple simulation layers.
2. Web-first for rapid iteration and Quest 2 accessibility.
3. Client renders only the currently relevant scene. v0.0.1 may keep state locally; once cloud/online simulation is enabled, the backend becomes authoritative for persistent shared state.
4. Systems are modular and data-driven so future mechanics do not require rewriting the foundation.
5. The first playable version proves the core loop before adding PvP, alliances, large-scale live ops, or monetization complexity.
6. Performance is protected through scene isolation, chunk/hex streaming, caching, LOD, and compact server state.
7. Monetization must never be the core gameplay loop. Fun, retention, and strategic depth are validated first.

## 3. Simulation layers

### 3.1 Global World Map

The future global map uses hexagonal cells.

Each hex may store:
- coordinates
- terrain type
- elevation
- temperature
- radiation
- weather
- owner faction
- control percentage
- fortification level
- supply level
- road/rail condition
- resource deposits
- visibility / intelligence state
- structures or strategic points
- occupying army references

Terrain affects movement, combat, sight, concealment, logistics, and attrition. Example categories include urban ruins, forest, hills, open ground, swamp, industrial zones, underground entrances, contaminated zones, and special anomaly regions.

The global map is not rendered in full. The client receives only visible or nearby chunks plus selected strategic overlays. The full world remains server-side data once the persistent world backend is introduced.

### 3.2 Settlement View

A settlement is a separate scene/window from the global map.

The settlement scene may render:
- central shelter
- generator
- workshop
- barracks
- radio station
- research facility
- food production
- storage
- population activity
- local effects such as smoke, lamps, weather, sound, and NPC activity

When the player enters a settlement, the global world does not need to remain graphically active. Once online simulation exists, global state continues on the backend while the client loads settlement-specific assets and data.

### 3.3 Expedition / Tactical / Special Maps

Special locations are separate small scenes, such as:
- abandoned laboratory
- metro station
- tunnel network
- ruined block
- anomaly site
- military bunker

These scenes can support exploration, choices, combat, loot, traps, narrative events, and environmental hazards. They are loaded on demand and unloaded on exit.

## 4. v0.0.1 scope

The first playable build intentionally excludes the global strategic war layer while preserving data structures that can support it later.

### Included

- one settlement scene
- four primary resources: Metal, Food, Power, People
- Central Shelter
- at least one buildable Generator
- build cost and resource deduction
- local persistence / save state
- one minimal hex preview or adjacent-cell representation to validate future world-map coordinates
- first dynamic audio layer tied to a building or settlement state
- audio controls for mute and volume; solo may be included if inexpensive
- minimal responsive UI suitable for Meta Quest 2 browser, iPhone, and desktop

### Explicitly excluded from v0.0.1

- PvP
- alliances
- global multiplayer world
- crypto/token economy
- real-money monetization
- full faction diplomacy
- army combat
- logistics simulation
- faith/ideology simulation
- radiation damage simulation
- temperature survival simulation
- live events
- large hero roster
- app-store packaging

These are future modules, not launch blockers for the prototype.

## 5. Core loop for v0.0.1

1. Player opens the settlement.
2. Current resources are displayed.
3. Player selects an available building action.
4. The game validates cost.
5. Resources are deducted.
6. The building appears / changes state.
7. The settlement audio mix changes.
8. State is saved.
9. The player sees a clear next objective.

Success criterion: a new player can understand and complete this loop without explanation.

## 6. Future strategic systems

The architecture must leave room for the following without implementing them yet.

### Survival
- temperature
- radiation
- health
- equipment protection
- fuel
- medicine
- contamination

### Society
- morale
- fear
- stability
- faith
- ideology
- political influence
- population groups
- civil unrest

### Factions
- faction identity
- relations
- diplomacy
- reputation
- trade
- war status
- doctrine
- territory ownership

### War and territory
- armies
- unit composition
- movement points
- terrain modifiers
- line of sight
- supply lines
- fortifications / cell shields
- siege
- occupation
- control percentage
- encirclement
- strategic points

### Strategic points
Examples:
- radio towers
- power plants
- metro hubs
- warehouses
- bridges
- laboratories
- religious/cultural sites
- factories

Strategic points should change gameplay, not merely add a flat percentage bonus.

## 7. Hex cell concept

A hex is a persistent strategic object rather than a visual tile only.

Example logical fields:

- id
- q / r axial coordinates
- terrain
- elevation
- ownerFactionId
- control
- fortification
- supply
- temperature
- radiation
- weatherState
- intelState
- strategicPointId
- armyIds
- modifiers

Axial coordinates are preferred for reliable neighbor, distance, pathfinding, range, and ring calculations.

The first prototype only needs enough hex support to validate coordinates and UI representation; large-scale pathfinding is deferred.

## 8. Scene and performance architecture

### Client responsibilities
- render the active scene
- manage input and camera
- play local audio
- cache reusable assets
- display only relevant world chunks
- interpolate visual state where appropriate

### Backend responsibilities when introduced
- persistent player state
- persistent settlement state
- authoritative strategic state for shared/online simulation
- account identity
- cloud saves
- future world simulation

### Performance strategy
- isolated scenes
- lazy asset loading
- cached assets
- chunked hex retrieval
- LOD at different zoom levels
- no rendering of interiors while viewing the world map
- no rendering of the world map while a detailed settlement scene is active unless a lightweight background snapshot is desired
- compact JSON/database state rather than transmitting full rendered detail

## 9. Initial technology direction

### Prototype
- web-first React/browser app created through Replit
- responsive layout for Quest 2 browser, mobile, desktop
- local state first for v0.0.1 where practical

### Source control
- GitHub is the long-term canonical source repository once a dedicated DEAD-SIGNAL repository exists

### Hosting
- Vercel for web preview/production experiments when useful

### Backend
- Supabase for authentication, PostgreSQL state, storage, realtime features, and server functions when the prototype graduates beyond local-only persistence

The first build should not depend on Supabase unless cloud persistence is needed to validate the core loop.

## 10. Data boundaries

Gameplay definitions should be data-driven wherever reasonable.

Examples:
- building definitions
- unit definitions
- resource definitions
- terrain definitions
- faction definitions
- audio layer definitions

Runtime state and static definitions must be separate. A Generator definition may state its cost and effects; a player's Generator instance stores whether it exists, level, damage, and runtime status.

## 11. Audio system foundation

Audio is a first-class system.

Each eligible entity can contribute an audio layer with metadata such as:
- layer id
- source category
- activation condition
- gain
- mute state
- solo state
- fade duration
- priority

For v0.0.1, one building-driven loop is enough to prove the system.

Long-term examples:
- generator = bass/drone
- workshop = percussion
- radio = static/voices
- anomaly = ambient texture
- religion = choir
- military pressure = rhythmic/march elements
- high radiation = Geiger-like texture
- low morale = reduced instrumentation

## 12. Error handling and resilience

The prototype must fail safely.

- Invalid build actions do not deduct resources.
- Missing audio does not break gameplay.
- Corrupt local save falls back to a clean state with a visible reset option.
- Network/backend failure later should preserve the last safe local UI state and clearly indicate sync status.

## 13. Testing strategy

v0.0.1 testing focuses on deterministic core behavior.

Required checks:
- resource deduction is correct
- insufficient resources block construction
- duplicate construction follows the building rule
- save/load reproduces the same state
- reset works
- audio layer activates/deactivates correctly
- UI remains usable at Quest/browser, phone, and desktop dimensions
- no significant console/runtime error during normal loop

Future modules receive their own isolated tests rather than growing one monolithic simulation test suite.

## 14. Future backend entities

Likely Supabase entities later include:
- players
- profiles
- settlements
- buildings
- inventories
- world_hexes
- factions
- armies
- army_units
- strategic_points
- expeditions
- relationships
- world_events
- audio_preferences

These tables are not all created in v0.0.1.

## 15. Development sequence

Phase A — prototype core loop
- settlement shell
- resources
- generator construction
- persistence
- audio layer
- responsive UI

Phase B — survival
- temperature
- radiation
- health/protection

Phase C — society
- morale
- faith / ideology
- population groups

Phase D — world
- real hex map
- terrain
- exploration
- strategic points

Phase E — war
- armies
- supply
- fortifications / shields
- capture and control

Phase F — factions / online systems
- diplomacy
- multiplayer world
- alliances
- live operations

## 16. Definition of done for v0.0.1

The build is considered playable when:

1. It opens in a modern browser.
2. The player sees a settlement and resource panel.
3. The player can construct at least one Generator using Metal.
4. The resource change is reflected immediately.
5. The constructed state survives reload.
6. Construction changes at least one audio layer.
7. The UI is usable from Meta Quest 2 browser and mobile-sized screens.
8. There are no blocking runtime errors during the core loop.
9. The code/data boundaries leave room for future hex, faction, survival, and army systems without replacing the core state model.

## 17. Architectural decision summary

Approved direction:

- Original DEAD SIGNAL IP
- web-first
- multi-scene simulation
- future global hex map
- separate settlement/tactical scenes
- local persistence for v0.0.1, backend authority when shared/online simulation is introduced
- cache/streaming/LOD for performance
- modular future survival, society, faction, and war systems
- dynamic layered music as a signature mechanic
- minimal v0.0.1 before large-scale systems

This document is the foundation spec. Implementation planning begins only after user review and approval of this written specification.
