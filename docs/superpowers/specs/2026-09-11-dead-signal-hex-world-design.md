# DEAD SIGNAL — Hex World System v0.1

Date: 2026-09-11
Status: Approved architectural direction; future strategic system; only a minimal preview belongs in v0.0.1

## Purpose

Define the global strategic map for DEAD SIGNAL as a scalable axial hex grid that can support terrain, armies, supply, control, fortifications, intelligence, environmental hazards, settlements, faction warfare, and transitions into separate settlement/tactical scenes without requiring the client or backend to fully simulate or render the entire world every frame.

The hex world is the strategic layer, not the settlement interior and not the tactical combat map.

## Core design choice

Use a layered, chunked, event-driven axial hex grid.

Rejected alternatives:

- A fully live simulation of every hex every second is easy to understand but will scale poorly as worlds, factions, armies, weather, and population systems grow.
- A fully hierarchical multi-resolution hex system from day one is powerful but adds unnecessary complexity before the strategic loop is proven.

The chosen architecture keeps one canonical strategic hex grid per world, supports configurable physical scale, streams chunks around relevant areas, and applies higher simulation detail only to active regions.

## 1. Coordinate system

Use axial hex coordinates `(q, r)` as the canonical map coordinate system.

Derived cube coordinate:

`x = q`
`z = r`
`y = -x - z`

This gives deterministic neighbor lookup, distance calculations, rings, ranges, pathfinding, influence propagation, and chunk addressing.

Each world has a unique `worldId`. A hex is uniquely addressed by `(worldId, q, r)`.

Rendering orientation may be pointy-top by default, but the domain model must not depend on screen orientation.

## 2. Strategic scale

Do not hard-code one universal real-world size for every campaign/world.

World configuration contains:

- `metersPerHex`
- world bounds or procedural generation rules
- climate profile
- world seed
- simulation cadence profile

Recommended default for the first large strategic world: approximately 1,000–2,000 meters across a hex.

This is large enough that a hex represents strategically meaningful terrain, roads, districts, forests, industrial areas, and battle positions, while settlement interiors and close combat still belong in separate scenes.

The physical scale is metadata. Rules should use game movement cost and travel time, not assume a fixed kilometer value in every subsystem.

## 3. Chunk model

Hexes are grouped into addressable chunks for storage, streaming, caching, and simulation scheduling.

Recommended initial chunk size: 16 x 16 axial coordinate cells in a parallelogram addressing scheme.

A chunk has:

- `chunkId`
- chunk coordinates
- revision/version
- last simulation timestamp
- compact list of hex dynamic states
- optional strategic summaries for distant simulation

The client requests only chunks relevant to the current camera, selected army, route, or strategic overlay.

Typical client behavior:

- current visible chunks: full strategic visual state
- one ring beyond visible: prefetched compact state
- distant world: no rendered hex objects

Backend behavior when online/shared simulation is introduced:

- active chunks receive frequent updates
- inactive chunks remain event-driven or coarse-tick
- remote unchanged chunks require no per-second work

## 4. Hex data layers

A hex is composed of independent layers so one subsystem can change without rewriting the others.

### 4.1 Identity and geometry

- `q`
- `r`
- `chunkId`
- optional region/biome identifiers

### 4.2 Base terrain layer

Mostly static or rarely changed.

Fields may include:

- terrain type
- elevation band
- roughness
- vegetation density
- water/ground condition
- natural cover
- baseline movement cost
- baseline sight modifier
- baseline concealment modifier

Initial terrain categories may include:

- open ground
- forest
- dense forest
- hills
- ridge/high ground
- swamp/wetland
- urban ruins
- dense urban ruins
- industrial zone
- agricultural zone
- contaminated wasteland
- underground entrance
- anomaly region
- impassable terrain

Terrain definitions are data-driven, not hard-coded into army logic.

### 4.3 Edge features

Some geography belongs on the boundary between two hexes rather than inside either hex.

Hex edges may contain:

- river
- ravine
- wall
- bridge
- road connection
- rail connection
- tunnel connection
- destroyed crossing
- checkpoint

This matters because crossing a river is fundamentally an edge action, not just a property of the destination hex.

### 4.4 Infrastructure layer

- road quality
- railway access
- power connection
- communications link
- depot/outpost
- bridge state
- tunnel state
- fortification structures
- observation post
- strategic resource site
- special point of interest

Infrastructure can be damaged and repaired independently of base terrain.

### 4.5 Environment layer

Dynamic but normally slower than combat updates.

Future fields:

- temperature
- radiation level
- contamination type/intensity
- precipitation/weather state
- visibility
- wind
- fire/smoke
- seasonal modifier
- anomaly activity

Environmental values should normally be stored in coarse integer/fixed-point formats rather than high-precision floating values.

### 4.6 Political/control layer

- nominal owner faction
- effective control
- contested state
- occupation state
- local resistance/hostility
- influence sources
- claim/core information if needed later

Ownership and control are separate.

A faction may nominally own a hex while effective control is weak because of enemy forces, rebellion, isolation, or broken supply.

### 4.7 Military layer

- occupying/garrison references
- temporary army presence
- fortification level
- defensive preparation
- zone-of-control contribution
- recent battle state
- minefield/hazard state if introduced later

### 4.8 Intelligence layer

Intel is player/faction-relative, not one universal truth value.

Possible levels:

0. Unknown
1. Discovered
2. Surveyed
3. Recently observed
4. Tracked
5. Live/reliable intelligence

Different overlays may have different freshness timestamps.

The player may know terrain permanently but have stale information about enemy armies.

## 5. Movement model

Armies move from hex center to neighboring hex center through one of six edges.

Movement cost is derived from components rather than one giant rule table:

`movementCost = terrainBase × weatherModifier × unitTerrainModifier × hazardModifier × infrastructureModifier × edgeCrossingModifier`

The exact production formula may later use fixed-point/integer math for determinism.

Important principles:

- roads reduce movement cost when the connection exists across the traversed edge
- rivers increase cost or block movement unless a bridge/fording rule allows crossing
- hills/ridges affect wheeled and tracked units differently from infantry
- contamination/radiation may not slow movement much but can increase attrition/exposure
- severe weather can change otherwise safe routes
- destroyed infrastructure changes routing immediately

Each army template defines mobility capabilities rather than every terrain knowing every unit type.

Example mobility tags:

- foot
- wheeled
- tracked
- heavy
- amphibious
- underground-capable
- protected-environment

## 6. Army occupancy and stacking

Do not allow unlimited forces to occupy one hex without consequence.

Each terrain has a frontage/capacity profile.

Armies may coexist in one friendly hex up to soft capacity. Exceeding it can cause:

- movement delay
- supply consumption penalty
- combat coordination penalty
- increased detection
- vulnerability to area attacks

Hard stacking limits can be introduced only where required for gameplay clarity.

A strategic `army` is a formation reference and aggregate state, not every individual soldier simulated at full detail on the world map.

Detailed characters are linked upward through formations when relevant.

## 7. Zone of control

Combat-capable formations can project a zone of control (ZOC) into neighboring hexes.

ZOC can:

- increase enemy movement cost
- prevent unrestricted retreat
- slow capture
- reveal or contest neighboring positions
- protect supply routes

ZOC strength depends on army type, readiness, terrain, supply, and doctrine.

A small scouting unit should not lock an entire front exactly like a fortified brigade.

## 8. Control and capture

Use continuous control rather than a binary flag only.

Recommended canonical control range: integer 0–1000 internally, displayed as 0–100% to the player.

A hex may have:

- controller faction
- control strength
- contesting faction(s)
- occupation pressure
- resistance pressure

Capture is pressure over time, not instant ownership transfer merely because a unit entered an empty tile.

Capture pressure may depend on:

- friendly force presence
- enemy force presence
- fortification state
- local population resistance/support
- adjacency to controlled territory
- command/communications
- supply status
- special infrastructure

A completely isolated army can seize ground temporarily but should struggle to consolidate it.

## 9. Cell shield / defense indicator

The hex shield shown in UI is primarily a strategic defense indicator, not necessarily a science-fiction energy shield.

Display example:

`Shield 74%`

Derived defense may combine:

- terrain defensive value
- fortification
- garrison strength/readiness
- supply
- entrenchment
- command/communications
- environmental advantage

Internally these remain separate values. The UI shield is a readable summary.

This preserves room for future literal energy/barrier shield technologies without confusing them with normal fortification.

Potential later UI distinction:

- shield icon = effective defense/fortification summary
- energy icon = actual powered defensive field technology

## 10. Fortification

Fortification is persistent strategic preparation attached to the hex, not just temporary unit HP.

Possible levels:

0. None
1. Field positions
2. Prepared positions
3. Fortified position
4. Strongpoint
5. Major fortress complex

Fortifications can provide:

- defense bonus
- slower enemy capture
- reduced bombardment damage
- protected supply/storage
- observation benefits
- better retreat/reinforcement behavior

Construction requires time, materials, engineers/workforce, and supply.

Fortifications can be damaged separately from the occupying army and repaired later.

## 11. Supply network

Supply is a graph over strategic infrastructure and controlled territory, not a flat global resource pool magically available everywhere.

Supply sources may include:

- settlements
- major bases
- depots
- railheads
- ports/landing facilities if later introduced
- mobile logistics formations

Supply travels through valid controlled or permitted connections.

A route has throughput and risk.

Throughput is influenced by:

- road/rail quality
- bridges/tunnels
- distance
- terrain
- weather
- control strength
- enemy ZOC/interdiction
- damage
- logistics technology

Army supply state may be summarized as:

- full
- adequate
- strained
- critical
- isolated

Internally use numeric stocks/throughput so these labels remain presentation only.

Supply shortage can affect:

- movement
- readiness
- ammunition availability
- fuel
- medical support
- morale
- attrition
- capture/consolidation ability

## 12. Strategic resources and points of interest

Some hexes contain points that matter beyond terrain.

Examples:

- power plant
- radio tower
- water treatment facility
- hospital
- fuel depot
- research laboratory
- underground station
- bridge hub
- railway yard
- industrial plant
- anomaly research site

A point of interest has its own state and may open a separate settlement/special scene.

Controlling a hex is not always enough to receive full benefit from its POI. The facility may need to be secured, repaired, staffed, powered, or connected to supply.

## 13. Reconnaissance and fog of war

Terrain discovery and enemy intelligence are separate.

Sources of intel may include:

- army sight
- scouts
- observation posts
- radio intercepts
- drones later
- allied intelligence
- settlements
- special anomalies/technology

Enemy army data should decay with time.

Example progression:

`Exact: 420 infantry, 18 vehicles`

later becomes:

`Estimated battalion-sized force`

later becomes:

`Enemy activity previously observed`

This makes reconnaissance strategically valuable without requiring artificial total blindness.

## 14. Weather and environmental overlays

Weather is preferably simulated in coarse regional cells or fronts and projected onto strategic hexes rather than every hex running its own independent weather system.

Radiation/contamination can use a similar hybrid model:

- persistent local sources on specific hexes
- regional spread fields for dynamic events

This supports storms, fallout, fires, anomaly surges, and temperature waves without requiring expensive independent simulation per hex.

## 15. Combat boundary

The global hex system decides where forces meet, strategic positioning, terrain context, supply, readiness, reinforcement access, retreat routes, and high-level battle state.

It does not require every battle to load a tactical map.

Three battle modes can coexist later:

1. strategic auto-resolution for routine/large background conflicts
2. focused strategic battle UI for important fights
3. separate tactical/special map for selected encounters, story sites, or high-value operations

Tactical scenes receive a snapshot/context package from the world layer and return consequences such as casualties, damage, control changes, consumed resources, and destroyed infrastructure.

## 16. Settlement boundary

A settlement appears on the strategic map as a strategic entity anchored to one or more hexes.

The world layer stores compact strategic state:

- owner/controller
- population summary
- defense summary
- production/supply outputs
- strategic damage
- strategic services

The settlement interior scene loads detailed buildings, NPC presentation, local audio, effects, and interactions only when needed.

Changes inside the settlement are converted into strategic outputs when they matter to the world layer.

## 17. Simulation level of detail

The world uses simulation LOD, not only graphical LOD.

### Tier A — active/visible conflict

Used for visible player region, selected armies, current battles, active captures.

- high-frequency event processing
- fresh movement/control/intel
- detailed routing where needed

### Tier B — nearby/relevant

Used for neighboring regions, approaching enemies, active supply networks.

- reduced tick frequency
- aggregated routine calculations

### Tier C — distant strategic

Used for remote factions and quiet territory.

- event-driven changes
- coarse summaries
- no per-second hex updates

### Tier D — dormant

No events and no dependent active systems.

- persist last known state
- advance only when a scheduled event, player query, or dependency requires evaluation

This is a core scaling requirement.

## 18. Event-driven simulation

Prefer scheduled events and delta updates over scanning every hex each frame/tick.

Examples of events:

- army entered hex
- route crossed edge
- capture state changed
- fortification construction completed
- bridge destroyed
- supply route invalidated
- radiation source activated
- weather front entered region
- intel observation created/expired

When no event affects a hex, it should be cheap to leave it unchanged.

## 19. Offline progression

For single-player/local phases, do not simulate each missed second while the app is closed.

Store timestamps and deterministic state sufficient to compute elapsed production/movement/event progress when the game resumes.

For later shared persistent worlds, backend scheduled/event simulation becomes authoritative.

## 20. Rendering and caching

The client receives data; it decides how to render it.

Far zoom:

- simple hex color/terrain category
- faction border/control
- major icons only

Medium zoom:

- roads/rivers
- terrain detail
- armies
- supply/control/intel overlays

Near strategic zoom:

- richer terrain decoration
- fortification indicators
- local labels
- movement arrows
- detailed POI state

Do not keep settlement interiors or tactical maps graphically alive behind the global world.

Assets may remain cached, but scene objects should be unloaded/suspended.

## 21. Determinism

Strategic simulation should prefer deterministic rules where practical.

Random events/battle rolls use seeded RNG with event identifiers so important outcomes can be reproduced for debugging/replays.

Avoid frame-rate-dependent simulation logic.

## 22. Data format principles

Use compact enums/integers internally and human-readable definitions in data files.

Avoid duplicating derived values.

For example, do not permanently store both every component and a shield percentage if the shield percentage can be derived from authoritative defense inputs.

Persist authoritative state; derive presentation summaries.

## 23. Initial terrain rule sketch

These are relative design defaults, not final balance values.

| Terrain | Infantry movement | Wheeled movement | Defense | Concealment | Sight |
| --- | --- | --- | --- | --- | --- |
| Open ground | Fast | Fast | Low | Low | High |
| Forest | Medium | Slow | Medium | High | Low |
| Dense forest | Slow | Very slow | High | Very high | Very low |
| Hills | Medium | Slow | High | Medium | High from elevation |
| Swamp | Slow | Very slow/blocked | Medium | Medium | Medium |
| Urban ruins | Slow | Slow | Very high | High | Short/blocked |
| Industrial | Medium | Medium | High | Medium | Medium |
| Contaminated wasteland | Medium | Medium | Low | Low | High, but hazardous |

Final numerical balance belongs in a separate economy/balance pass.

## 24. Strategic UX

A selected hex should answer the player's immediate strategic questions without exposing raw backend data.

Recommended visible summary:

- terrain/elevation
- controller and control %
- shield/defense summary
- supply state
- radiation/environment warning
- known enemy presence/intel freshness
- important POI
- movement/travel estimate for selected army

Advanced details can expand on demand.

## 25. v0.0.1 boundary

The current playable v0.0.1 does not implement the strategic war system.

The only hex requirement in v0.0.1 is a minimal visual/coordinate preview sufficient to prove:

- axial coordinate generation
- deterministic hex identity
- selection/highlight
- responsive rendering on browser/Quest/mobile

No armies, supply network, capture, fortification construction, weather simulation, factions, or backend world authority are required for v0.0.1.

## 26. Future acceptance scenarios

These scenarios define desired architecture behavior, not current milestone tests.

### Terrain movement

A wheeled army chooses a longer intact-road route instead of a shorter swamp route when total movement cost is lower.

### Destroyed bridge

Destroying the only bridge across a river invalidates routes that depended on the crossing and triggers supply/path recalculation only for affected networks.

### Weak occupation

An army entering an undefended enemy hex begins occupation/capture but does not instantly produce full 100% control.

### Isolation

A fortified army cut off from its supply network remains dangerous initially but gradually loses readiness and consolidation ability.

### Intelligence decay

An enemy army observed exactly several hours ago becomes an estimate, then a stale activity marker unless refreshed by reconnaissance.

### Settlement transition

Entering a settlement unloads/suspends global rendering while strategic world state remains compact; leaving restores the world view from cached/latest strategic data.

### Large quiet world

Adding thousands of unchanged remote hexes should not linearly increase per-second simulation work.

## 27. Architectural invariants

The following rules should remain true as DEAD SIGNAL grows:

1. A hex is strategic territory, not a miniature settlement interior.
2. Terrain, infrastructure, environment, politics, military state, and intelligence remain separate layers.
3. Ownership is not identical to effective control.
4. Supply is spatial/networked.
5. Edges can carry features independently from hex centers.
6. Derived UI summaries do not replace authoritative component state.
7. Remote inactive territory must be cheap to simulate.
8. The client never needs the entire detailed world at once.
9. Detailed character simulation remains linked to but separate from aggregate strategic formations.
10. Tactical/settlement scenes exchange consequences with the world layer through explicit state boundaries.

## 28. Relationship to future LIFE SIMULATION

The global hex layer never simulates every soldier's body, romance, disease, or psychology directly.

Instead:

- army/settlement layers maintain aggregate strategic readiness/population state
- strategically relevant characters can remain detailed entities linked to those aggregates
- casualties, illness, morale, leadership, and relationships can modify formation/settlement outputs
- when entities become distant/irrelevant they may be simulated at reduced detail according to LIFE SIMULATION LOD rules

This prevents RimWorld-like character depth from making a large strategic world computationally impossible.

## 29. Relationship to audio system

Strategic state may influence music layers at high level without creating one audio source per hex.

Possible inputs:

- front-line pressure
- territory loss/gain
- isolation
- radiation storm
- faction presence
- supply crisis

The audio engine consumes summarized strategic signals, not raw global hex updates.

## 30. Next design work

Before full implementation beyond the minimal preview, create focused follow-up designs for:

- army formation/readiness model
- supply/logistics model
- strategic combat resolution
- faction/control influence model
- pathfinding/performance benchmarks
- world generation/content pipeline

These remain future modules and should not expand v0.0.1 scope.
