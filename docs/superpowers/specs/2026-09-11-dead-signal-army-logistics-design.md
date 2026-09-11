# DEAD SIGNAL — Army + Logistics System v0.1

Date: 2026-09-11
Status: Approved architectural direction; future war layer; out of scope for v0.0.1

## Purpose

Define how military formations, transport, supplies, casualties, readiness, command, reinforcement, retreat, and encirclement interact with the DEAD SIGNAL Hex World and LIFE SIMULATION layers.

The core principle is that armies are strategic aggregates on the world map, but they are not abstract numbers disconnected from real people, equipment, ammunition, fuel, medicine, morale, and supply routes.

## 1. Scale model

DEAD SIGNAL uses layered military simulation.

### Strategic formation layer

The global map stores compact formation state:

- formation id
- faction
- current hex
- order/state
- manpower summary
- equipment summary
- readiness
- morale
- fatigue
- supply state
- fuel state
- ammunition state
- medical burden
- command quality
- movement capability
- attached support elements
- known intelligence level

### Detailed personnel layer

Named or currently relevant characters may retain full LIFE SIMULATION state inside a formation.

Background personnel remain aggregated until promoted to active/relevant character status.

This keeps large armies affordable to simulate while preserving the ability for individual people to matter.

## 2. Formation hierarchy

The game should support hierarchical organizations without forcing one real-world doctrine.

Possible formation levels:

- fireteam / small group
- squad
- platoon
- company
- battalion
- regiment / battle group
- brigade
- larger field command

Factions may rename or reorganize these levels.

The rules depend on capabilities and command relationships, not on the label itself.

A formation may contain:

- subordinate formations
- personnel pools
- equipment pools
- support units
- commanders
- logistics assets

## 3. Formation identity and role

Each formation has a role profile rather than one universal combat score.

Examples:

- light infantry
- mechanized infantry
- armored
- reconnaissance
- artillery
- engineering
- logistics
- medical
- security/garrison
- militia
- special operations
- contaminated-zone specialist
- underground specialist

Role affects movement, supply demand, detection, combat behavior, terrain suitability, and mission options.

## 4. Equipment model

Equipment is grouped by capability where full per-item tracking would be wasteful.

Possible strategic categories:

- small arms
- crew-served weapons
- anti-armor weapons
- indirect fire systems
- wheeled vehicles
- tracked vehicles
- armored vehicles
- transport capacity
- engineering equipment
- communications equipment
- protective/environmental equipment
- medical equipment

Important or unique vehicles/items may become individually tracked assets.

Common equipment remains aggregated by count, condition band, and serviceability.

## 5. Core readiness model

Readiness is derived, not a permanent magic number.

Inputs may include:

- available personnel
- trained personnel
- equipment serviceability
- ammunition availability
- fuel availability
- fatigue
- morale
- command effectiveness
- communication status
- medical burden
- supply continuity
- recent combat losses

The UI may show a single readiness percentage or band, but the underlying components remain separate.

Suggested UI bands:

- Combat Ready
- Effective
- Degraded
- Critical
- Broken

## 6. Supply categories

Do not use one generic `Supply` resource internally.

A formation may consume separate categories:

- food
- water
- ammunition
- fuel
- medicine
- spare parts
- batteries/power cells
- protective filters / contamination supplies

The UI can collapse these into a summary when needed.

Different formation types have different consumption signatures.

Example:

- foot infantry: high food/water, moderate ammunition, low fuel
- mechanized group: moderate food/water, high fuel, high spare-parts demand
- artillery: very high ammunition, moderate fuel
- medical unit: high medicine, low ammunition

## 7. Supply source model

Supply originates from physical or strategic sources.

Examples:

- settlements
- warehouses
- depots
- field depots
- railheads
- factories
- farms/water facilities
- hospitals/medical stores
- mobile logistics units

Supply is not instantly available everywhere because the faction owns it globally.

Resources must move through the network.

## 8. Logistics network

The logistics network is a graph layered on top of controlled hexes and infrastructure.

A valid supply path may use:

- road edges
- rail edges
- tunnel links
- bridges
- safe controlled hexes
- allied access agreements
- temporary convoy routes

Each segment has:

- throughput
- travel time
- risk
- control requirement
- infrastructure condition

The route can be degraded by:

- damaged roads/bridges
- enemy ZOC
- raids
- weather
- radiation/contamination
- traffic overload
- distance
- poor command/communications

## 9. Throughput and bottlenecks

Supply routes have limited capacity.

The smallest-capacity segment can become a bottleneck.

A heavily mechanized army should not be sustainably supported by one damaged dirt road simply because a path technically exists.

Throughput must account for:

- infrastructure quality
- available transport assets
- route length
- congestion
- weather
- security
- loading/unloading capacity at depots

This creates meaningful reasons to capture railway yards, bridges, tunnels, ports, fuel sites, and major roads.

## 10. Local stocks

Every major formation carries local stocks.

Examples:

- food days
- water days
- ammunition stock
- fuel stock
- medical stock
- spare-part stock

A severed army does not instantly collapse.

It survives on carried stocks and local scavenging/requisition where appropriate.

The UI can expose simplified estimates such as:

`Food: 4.2 days`
`Fuel: 38%`
`Ammo: 61%`
`Medicine: Critical`

## 11. Consumption model

Consumption is activity-sensitive.

Examples:

- resting consumes food/water but little ammunition/fuel
- marching increases food, water, and fuel demand
- combat sharply increases ammunition and medical demand
- cold increases heating/fuel/food demand
- contamination increases filter/protective supply demand
- repairing vehicles consumes spare parts

Do not calculate every soldier's meal every simulation tick at strategic scale.

Use deterministic aggregate rates and only expand to individual detail when narratively or tactically relevant.

## 12. Convoys and transport

Supply movement can be represented as either:

1. abstract scheduled throughput on secure routes, or
2. explicit convoy entities when risk or player interaction makes them important.

Routine rear-area logistics should remain abstract.

A convoy becomes explicit when:

- crossing contested territory
- carrying critical/rare cargo
- escort decisions matter
- the player can raid/interdict it
- a story/event requires it

This avoids flooding the world map with thousands of truck icons.

## 13. Command and control

A formation's effectiveness depends on command links.

Possible inputs:

- commander skill
- staff capability
- radio/communications quality
- distance from higher command
- jamming/interference
- damaged relay infrastructure
- doctrine
- fatigue/stress

Poor command can cause:

- delayed orders
- slower reaction
- reduced coordination
- worse retreat behavior
- inefficient supply use
- slower consolidation after capture

## 14. Orders

Strategic formations receive explicit orders rather than moving with no intent.

Initial future order types:

- Move
- Hold
- Defend
- Fortify
- Recon
- Patrol
- Attack
- Assault
- Withdraw
- Retreat
- Resupply
- Recover
- Escort
- Interdict
- Secure POI
- Support adjacent formation

An order has:

- target
- priority
- stance
- route preference
- acceptable risk
- optional timing/synchronization

## 15. Stance

Stance modifies behavior without creating entirely separate unit types.

Examples:

- cautious
- normal
- aggressive
- stealth/recon
- forced march
- defensive
- emergency withdrawal

Stance affects speed, detection, fatigue, supply consumption, and combat behavior.

## 16. Fatigue

Fatigue accumulates from:

- marching
- forced marches
- combat
- lack of sleep
- poor food/water
- cold/heat
- radiation stress
- repeated alerts

Fatigue reduces:

- movement efficiency
- combat performance
- command responsiveness
- morale recovery
- injury recovery

Resting in a secure supplied hex recovers fatigue faster than resting under threat.

## 17. Morale and cohesion

Morale and cohesion are distinct.

### Morale

Willingness to continue fighting.

Affected by:

- casualties
- leadership
- victories/defeats
- ideology/faith
- supply
- encirclement
- nearby friendly support
- civilian/home settlement events

### Cohesion

Ability to act as an organized formation.

Affected by:

- command disruption
- rapid movement
- retreat
- terrain
- communication loss
- mixed/undertrained replacements
- severe casualties

A formation may have high morale but low cohesion after a chaotic fight.

## 18. Casualties

Casualties should not collapse into only `dead`.

Strategic outcomes include:

- killed
- wounded
- missing
- captured
- temporarily incapacitated
- equipment damaged
- equipment destroyed

Wounded personnel feed directly into LIFE SIMULATION and medical logistics.

## 19. Medical chain

The medical system operates in stages.

Possible chain:

1. buddy/self aid
2. squad/company aid
3. field medical point
4. evacuation
5. settlement hospital
6. rehabilitation

A formation has limited immediate treatment capacity.

If casualties exceed that capacity:

- death risk rises
- recovery slows
- medicine consumption spikes
- mobility may decrease because wounded require transport

Medical evacuation consumes transport and depends on route security.

## 20. Reinforcement

Reinforcement is not instant manpower teleportation.

Possible sources:

- trained reserves
- replacement pools
- militia mobilization
- recovered wounded
- transferred personnel
- new equipment from production/depots

Reinforcement effectiveness depends on:

- route availability
- training
- unit cohesion
- available equipment
- command capacity

Fresh untrained replacements may restore headcount while temporarily reducing average cohesion.

## 21. Repair and maintenance

Vehicles and heavy equipment degrade through:

- combat damage
- movement
- terrain
- weather
- poor maintenance
- contamination

Maintenance consumes:

- spare parts
- time
- trained technicians
- tools/workshop support

Some repairs can occur in the field; major repairs require a workshop/base.

This prevents equipment count from acting like permanent HP-independent power.

## 22. Retreat and withdrawal

Withdrawal is planned movement away from threat.

Retreat is a forced combat outcome.

A successful withdrawal depends on:

- available retreat hexes
- enemy ZOC
- mobility
- command
- cohesion
- terrain
- reserve/rearguard support

A disorganized retreat may produce:

- abandoned equipment
- missing personnel
- prisoners
- cohesion collapse
- route congestion

## 23. Encirclement

Encirclement is primarily a logistics and movement condition, not an instant death flag.

A formation is operationally encircled when it lacks a valid sufficiently secure supply/retreat connection to friendly logistics nodes.

Effects worsen over time as stocks fall:

- supply inflow drops
- fuel shortages restrict mobility
- ammunition shortages reduce combat capability
- medical burden rises
- morale deteriorates
- evacuation becomes difficult

Air/underground/special supply methods may later partially offset isolation where technology permits.

## 24. Pocket behavior

Encircled forces may:

- hold
- attempt breakout
- consolidate into fewer hexes
- destroy/abandon equipment
- negotiate/surrender
- wait for relief

The player should be able to create and relieve pockets rather than the game resolving them instantly.

## 25. Surrender and capture

Surrender probability may depend on:

- morale
- supply
- encirclement duration
- commander traits
- ideology/faith
- casualty level
- enemy reputation
- escape routes

Captured personnel become strategic state and may later interact with diplomacy, prisoner exchange, labor, intelligence, or humanitarian systems.

## 26. Interdiction

Players can attack logistics without directly assaulting the main formation.

Interdiction targets may include:

- roads
- bridges
- rail lines
- depots
- convoys
- communication relays

Interdiction can reduce throughput, increase route risk, or force rerouting.

This creates meaningful strategic warfare beyond frontal combat.

## 27. Recon and deception

Logistics itself creates intelligence signatures.

Large formations may be inferred through:

- traffic
- radio activity
- fuel movement
- depot usage
- visible convoys

Future deception systems may include:

- radio silence
- dummy positions
- false traffic
- hidden depots
- camouflage

## 28. Strategic combat inputs

When two hostile forces fight, the world layer provides context:

- terrain
- elevation
- fortification
- weather
- control
- supply
- readiness
- fatigue
- morale/cohesion
- intelligence quality
- reinforcement routes
- retreat routes
- support assets

Combat output returns:

- casualties
- equipment damage/loss
- ammunition/fuel spent
- fatigue
- cohesion/morale changes
- movement/retreat result
- control changes
- fortification/infrastructure damage
- prisoners/missing

The exact combat resolution model is a separate future design module.

## 29. Named character integration

Named characters inside formations can influence strategic state.

Examples:

- skilled commander improves coordination
- medic improves casualty survival
- engineer improves fortification/repair
- scout improves intel
- traumatized commander may make different risk decisions
- relationship loss may affect morale

Do not recalculate the entire army from every minor NPC relationship every tick.

Only strategically relevant character modifiers propagate upward.

## 30. Settlement integration

Settlements support armies through:

- recruitment
- training
- production
- repair
- hospitals
- depots
- command centers
- power/fuel
- communications

A settlement under strain may not be able to support every nearby army even if resources exist globally.

This ties military expansion to actual infrastructure.

## 31. Mobilization

Future populations can be allocated between:

- civilian workforce
- militia
- trained military
- logistics
- medical
- engineering

Mobilizing too heavily may reduce settlement production, health capacity, or stability.

This prevents military manpower from being economically free.

## 32. Army creation and merging

Creating a new formation requires:

- personnel
- equipment
- command structure
- initial supply
- staging location

Formations may split or merge.

Merging mismatched formations can temporarily reduce cohesion.

Splitting requires enough command/logistics capacity for both resulting units.

## 33. Transport capacity

Movement speed is constrained by the slowest relevant mobility mode and available transport.

Examples:

- infantry with sufficient trucks may move strategically faster
- damaged vehicles reduce transport capacity
- wounded personnel consume transport slots
- fuel shortages can force mechanized troops to continue partially on foot or abandon vehicles

## 34. Strategic time

Movement, resupply, repair, recovery, and fortification require game time.

Do not tie outcomes to rendering frames.

Orders produce scheduled progress/events so simulation remains deterministic and scalable.

## 35. Simulation LOD

### Active formations

Selected, visible, fighting, moving through contested areas, or supply-critical.

Use detailed event processing.

### Relevant formations

Nearby or affecting the player's supply/front.

Use reduced-frequency updates.

### Distant background formations

Use aggregate scheduled outcomes and route summaries.

Do not simulate every soldier, truck, meal, and bullet individually.

## 36. Determinism and debugging

Strategic calculations should prefer deterministic inputs.

Random combat/logistics events use seeded RNG tied to event ids.

Important battle/logistics outcomes should be reproducible for debugging and replay systems.

## 37. Initial strategic UI

Selecting an army may eventually display:

`3rd Expeditionary Group`

`Manpower: 642 / 810`
`Readiness: 68%`
`Morale: Stable`
`Cohesion: Degraded`
`Food: 3.8 days`
`Ammo: 54%`
`Fuel: 31%`
`Medicine: Critical`
`Wounded: 84`
`Supply Route: Contested`

The player should be able to open deeper tabs for composition, logistics, health, equipment, commander, and orders.

## 38. Warning model

Critical conditions should surface proactively:

- supply route severed
- fuel below reserve threshold
- ammunition critical
- wounded exceed field medical capacity
- formation partially encircled
- retreat route threatened
- cohesion collapse risk

Warnings should explain cause and likely consequence, not only show a red icon.

## 39. Performance rules

Never:

- pathfind every formation every tick
- propagate supply across the whole world every frame
- simulate every convoy explicitly
- simulate every background soldier individually
- recompute derived readiness without an input change

Prefer:

- cached route solutions
- route invalidation events
- scheduled resupply pulses
- delta updates
- aggregate consumption
- explicit convoys only when strategically relevant

## 40. Future extensions

Potential later modules:

- artillery/fire support
- air support/drones
- naval/river transport
- electronic warfare
- engineering and minefields
- doctrine system
- officer politics
- prisoner systems
- strategic reserve system
- advanced deception
- seasonal logistics

These are not required for the first war implementation.

## 41. Cross-system contracts

### Hex World provides

- terrain
- edge infrastructure
- control
- ZOC
- route graph
- weather/environment
- fortification
- POIs

### Army + Logistics provides

- formation positions
- movement/orders
- supply demand
- readiness
- military control pressure
- logistics flows
- military casualties

### LIFE SIMULATION provides

- relevant named character state
- wounds
- commander/medic/engineer effects
- morale-relevant memories/relationships

### Settlement system provides

- manpower/recruitment
- production
- depots
- hospitals
- repair/training capacity
- strategic resources

## 42. Scope boundary

None of this belongs in DEAD SIGNAL v0.0.1 except future-compatible data boundaries where convenient.

The current prototype remains limited to:

- Metal / Food / Power / People
- Generator construction
- local persistence
- generator audio layer
- minimal axial hex preview
- responsive settlement UI
- QA

Army and logistics implementation begins only after the base/hex foundation is proven.