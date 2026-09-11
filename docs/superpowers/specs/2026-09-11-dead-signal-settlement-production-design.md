# DEAD SIGNAL — Settlement + Production System v0.1

Date: 2026-09-11
Status: Approved architectural direction; future settlement/economy system; only the minimal resource/building loop belongs in v0.0.1

## Purpose

Define how DEAD SIGNAL settlements grow from a small shelter into a district, town, and eventually city while remaining connected to the same strategic world, population, logistics, political, military, medical, survival, and audio systems.

A settlement is not a disconnected minigame. It is the detailed local simulation of a strategic entity that also exists on the Hex World layer.

Core chain:

world inputs -> settlement networks -> buildings/jobs -> goods/services -> population outcomes -> strategic exports

The detailed settlement scene may be unloaded graphically while its important production/service state continues as compact simulation data.

## 1. Architectural principle

Use modular building instances connected through shared local networks and production graphs.

Do not model every resource as a magical global pool available instantly to every building.

Keep separate concepts for:

- stored goods
- utility flow/capacity
- production rate
- workforce availability
- building condition
- service capacity
- local distribution
- strategic exports/imports

The first prototype may simplify these concepts visually, but data boundaries should leave room for them.

## 2. Settlement identity

A settlement is a persistent entity anchored to one or more strategic hexes.

A settlement may store compact strategic state such as:

- settlementId
- name
- owner/controller
- anchor hex(es)
- population summary
- settlement tier
- strategic storage summary
- power balance
- food security
- water security
- heating status
- housing pressure
- medical capacity
- industrial output
- repair capacity
- communications status
- defense contribution
- administrative capacity
- damage state
- political stability summary

Detailed building/layout state is owned by the Settlement system, not duplicated into Hex World.

## 3. Settlement scale progression

Suggested conceptual tiers:

1. Shelter / Camp
2. Outpost
3. Settlement
4. District / Town
5. City
6. Major Hub

Tiers are descriptive summaries, not arbitrary level gates.

A settlement grows because it gains population, infrastructure, production, services, territory, and administrative complexity.

Avoid a design where clicking `Upgrade City Hall` magically transforms every system at once.

## 4. Spatial model

The detailed settlement scene may use zones, lots, local tiles, free placement, or a hybrid layout depending on final presentation.

The domain model must not depend tightly on visual placement.

Each building instance needs:

- building definition id
- instance id
- local position/zone reference
- level/configuration
- condition
- construction state
- operational state
- staffing state
- utility connections
- input/output inventory references if required
- active modifiers
- damage/contamination/fire state

This allows the visual representation to evolve later without rewriting the economy.

## 5. Building definition vs building instance

Static building definitions store authoring data such as:

- name/category
- construction cost
- construction time
- required technology
- workforce requirement
- utility demand/output
- production recipes
- service capacity
- storage capacity
- maintenance demand
- audio layer contribution
- visual tags

Building instances store runtime state such as:

- constructed/not constructed
- current level
- condition
- staffing
- current recipe
- connected/disconnected
- power availability
- current inventory
- current damage
- active status

Never mutate global building definitions to represent one player's damaged building.

## 6. Core resource families

v0.0.1 keeps only:

- Metal
- Food
- Power
- People

Future detailed settlement simulation may expand into families.

### Bulk materials

- scrap metal
- processed metal
- concrete/stone
- timber/polymers
- machine parts
- electronics

### Consumables

- food
- clean water
- medicine
- filters
- fuel
- ammunition

### Strategic/advanced materials

- chemicals
- rare components
- research samples
- anomaly-related materials

Do not introduce every resource immediately. Each resource must justify a distinct gameplay decision.

## 7. Utilities are flows, not ordinary inventory

Utilities behave differently from stored goods.

Potential local utility networks:

- electricity
- water
- heat/steam
- communications/data
- sewage/waste later if useful

Electricity example:

`generation capacity -> grid -> demand -> priority -> outage`

A Generator produces capacity over time; it does not create physical `Power crates` unless the fiction explicitly uses batteries/fuel storage.

The UI may still summarize power with a simple number in early builds.

## 8. Power network

Power is a foundational settlement system.

Power producers may include:

- generators
- recovered grid links
- solar/wind later
- fuel plants
- advanced/anomaly systems later

Power consumers may include:

- workshops
- hospitals
- heating
- pumps
- radio
- research
- defenses
- lighting

Power priority allows the player to choose which systems survive shortage.

Example priority order:

1. Hospital
2. Water pumps
3. Heating
4. Communications
5. Food preservation
6. Industry
7. Comfort/nonessential loads

Blackouts should create consequences in connected systems rather than only a red icon.

## 9. Fuel and generation

Many generators require fuel.

This creates a chain:

fuel source/import -> storage -> generator -> electricity -> powered buildings

Running out of fuel can cause cascading failure:

power loss -> heating loss -> medical degradation -> food spoilage -> political grievances

Fuel is therefore strategically important without needing to be a v0.0.1 resource.

## 10. Water network

Future water system may include:

- source/intake
- purification
- pumping
- storage
- distribution
- contamination risk

Water shortage affects:

- health
- food production
- hygiene
- hospital effectiveness
- industry
- firefighting
- morale

Detailed pipe simulation is unnecessary unless it creates meaningful gameplay. Use network connectivity/capacity rather than fluid physics.

## 11. Heating and temperature

Heating connects Settlement to the future Survival system.

Heat sources may include:

- generators/waste heat
- furnaces
- district heating plants
- local heaters

Buildings can have insulation/heat demand profiles.

During severe cold, heating priority becomes a strategic resource allocation decision.

Temperature consequences can affect:

- illness
- comfort
- productivity
- water systems
- equipment reliability
- food storage

## 12. Food system

Food should eventually be more than one passive production rate.

Possible sources:

- farms/greenhouses
- hunting/scavenging
- livestock later
- imports/trade
- stored rations

Food chain:

production/import -> processing -> storage -> distribution -> consumption

Important strategic concepts:

- daily demand
- reserve days
- spoilage
- rationing
- nutrition quality later if useful

Do not simulate individual meals for background population.

## 13. Storage and warehouses

Storage is physical capacity and location at settlement scale.

Warehouses may store categories such as:

- food
- fuel
- medicine
- industrial materials
- ammunition

Storage can be:

- full
- damaged
- contaminated
- looted
- destroyed
- disconnected from logistics

Strategic UI can summarize stockpiles while detailed settlement view may show which storage facilities are responsible.

## 14. Production recipes

Production uses data-driven recipes.

A recipe may define:

- input goods
- output goods
- cycle time
- workforce
- power demand
- building type
- skill requirement
- maintenance wear
- waste/byproduct if relevant

Example conceptual chain:

Scrap -> Workshop -> Machine Parts -> Repair Depot -> Vehicle Readiness

Production logic should use deterministic elapsed-time calculations where practical.

## 15. Workforce

`People` is not infinite labor.

Future workforce categories may include:

- available workers
- assigned workers
- specialists
- injured/unavailable
- children/dependents if later represented
- soldiers
- administrators

Jobs may require skills such as:

- engineering
- medicine
- agriculture
- logistics
- research
- security

LIFE SIMULATION owns detailed named-character capability; Settlement consumes aggregate labor/skill availability plus specific named assignments where important.

## 16. Jobs and shifts

Buildings can expose job slots.

A job slot may specify:

- role
- skill preference
- shift
- danger level
- required equipment

Do not schedule every background worker minute-by-minute.

Use aggregated shift/workforce assignment for background population and detailed tasks only for named/active characters.

## 17. Housing

Housing is a capacity/service system, not cosmetic only.

Housing can influence:

- population cap/pressure
- comfort
- health
- privacy
- family formation
- social stress
- political satisfaction

Possible states:

- adequate
- crowded
- severely overcrowded
- damaged
- unheated
- contaminated

Housing quality may vary, creating political/economic consequences if inequality becomes relevant later.

## 18. Medical services

Settlement owns medical infrastructure and capacity.

Facilities may provide:

- beds
- triage capacity
- surgery capacity
- quarantine
- rehabilitation
- medicine storage

LIFE SIMULATION owns individual injuries/illnesses.

Settlement converts buildings/staff/supplies into service capacity.

Army + Logistics sends wounded into the settlement and may request evacuation capacity.

## 19. Repair and maintenance

Buildings and equipment degrade through:

- normal wear
- overuse
- poor maintenance
- combat damage
- weather
- contamination
- accidents

Maintenance requires some combination of:

- labor
- machine parts
- materials
- power
- downtime

Ignoring maintenance lowers efficiency and eventually creates failures.

This prevents one-time construction from solving production permanently.

## 20. Construction

Construction is a process, not instant state replacement in mature versions.

Construction may require:

- materials
- workforce
- time
- access to site
- power/equipment for advanced builds

Possible stages:

1. planned
2. materials reserved
3. under construction
4. commissioning
5. operational

v0.0.1 intentionally collapses this to a simple build action for the Generator.

## 21. Damage, fire, contamination, and disasters

Buildings may have condition and temporary hazard states.

Potential hazards:

- structural damage
- fire
- flooding
- contamination
- radiation hotspot
- sabotage
- equipment failure

These should interact with real services:

fire -> power outage -> production stop -> food loss

rather than exist only as random debuffs.

## 22. Efficiency model

Building output should derive from a small set of understandable factors.

Conceptual form:

`effectiveOutput = baseOutput × staffing × utilities × condition × inputAvailability × environment × policy`

Do not expose a giant hidden multiplier stack.

UI should explain the largest limiting factors.

Example:

`Workshop — 43% output`

- Power: 100%
- Staff: 75%
- Parts input: 80%
- Condition: 72%

## 23. Bottlenecks

The economy should create visible bottlenecks rather than require spreadsheet guesswork.

Possible bottlenecks:

- no input resources
- insufficient power
- insufficient workers
- storage full
- logistics route broken
- building damaged
- missing specialist
- policy restriction

The player should be able to answer `why is this not producing?` from the UI.

## 24. Local logistics

Do not initially simulate every worker carrying every crate.

Use local distribution capacity and connectivity summaries.

Possible later detail:

- roads
- loading capacity
- transport vehicles
- warehouse zones

Local logistics becomes detailed only when settlement scale proves it creates useful strategic decisions.

## 25. Strategic import/export boundary

Hex World / Army + Logistics own inter-settlement transport routes.

Settlement owns:

- what is available to export
- import demand
- loading/unloading capacity
- storage
- local production/consumption

Example:

Settlement A produces fuel.

Army + Logistics determines whether a route can carry it to Settlement B.

Settlement B determines whether it has storage and how the delivered fuel is consumed.

## 26. Communications

Radio/communications buildings can provide:

- strategic contact
- command support
- intel distribution
- propaganda/broadcast reach
- trade coordination
- emergency alerts

Communications status feeds Factions + Society and Army + Logistics without duplicating their internal logic.

## 27. Research boundary

Research facilities are settlement buildings, but the detailed technology system belongs in a separate future Research/Technology module.

Settlement provides:

- lab capacity
- researchers
- power
- samples/equipment

Research module owns:

- projects
- discoveries
- technology unlocks
- experimentation risk

## 28. Defense boundary

Settlement may contain:

- walls
- gates
- bunkers
- observation posts
- defensive power systems
- shelters

Settlement exports a defense summary and strategic structures to Hex World/Army systems.

Detailed tactical combat is not owned by the settlement production simulation.

## 29. Population/service feedback

Settlement sends material/service conditions to LIFE SIMULATION and Factions + Society.

Examples:

- food availability
- water quality
- housing pressure
- heating
- medical access
- employment
- blackout frequency
- safety

Those systems return effects such as:

- productivity modifiers
- absenteeism
- unrest/strikes
- migration
- morale/stress context
- recruitment willingness

## 30. Politics/economy feedback

Factions + Society may impose policies such as:

- rationing
- labor mobilization
- requisition
- medical priority
- trade restrictions
- local autonomy

Settlement calculates material consequences.

Example:

Emergency Rationing lowers food consumption but may reduce satisfaction and increase black-market activity.

## 31. Settlement audio system

Buildings/services may contribute audio stems.

Examples:

- generator -> low mechanical drone/bass
- workshop -> industrial percussion
- radio -> static/voice fragments
- market -> crowd texture
- hospital overload -> sparse medical alarms
- faith center -> choir/ritual texture
- blackout -> layers disappear or thin out

Audio layers react to actual state.

A broken Generator should not keep contributing a full healthy Generator stem unless intentionally designed as a damaged variation.

## 32. Scene loading and cache

When entering Settlement View:

- load layout/state for this settlement
- instantiate only visible/relevant scene objects
- load/cached building assets as needed
- activate local audio mix

When leaving:

- unload/suspend scene objects
- keep reusable assets cached where beneficial
- preserve compact settlement simulation state

Global Hex World visuals do not need to remain active underneath.

## 33. Settlement simulation LOD

### Tier A — currently viewed / crisis

Detailed building/network/service evaluation.

Used for:

- player's active settlement
- siege/fire/blackout/epidemic
- major scripted event

### Tier B — important off-screen

Periodic production/service updates with building-level state.

### Tier C — stable remote settlement

Aggregate production, consumption, maintenance, and service summaries.

Do not update every building every second.

### Tier D — dormant

Advance using elapsed-time/event calculations only when required.

## 34. Event-driven settlement simulation

Prefer events and elapsed-time evaluation.

Examples:

- Generator built
- fuel exhausted
- power capacity crossed demand threshold
- warehouse became full
- hospital exceeded capacity
- building damaged
- repair completed
- shipment arrived
- workforce changed
- policy enacted
- temperature crisis began

Stable buildings should not create unnecessary per-frame backend work.

## 35. Offline progression

For local/single-player phases:

- save authoritative state plus timestamps
- on resume, evaluate elapsed production/consumption within safe limits
- process scheduled completions/events deterministically

Do not replay every missed second individually.

Later shared worlds use backend authority and scheduled/event processing.

## 36. Failure propagation

The settlement system should support cascading failures, but keep them legible.

Example:

bridge destroyed outside city
-> fuel shipment stops
-> Generator reserves drop
-> blackout
-> water pumping weakens
-> hospital capacity falls
-> illness/civil dissatisfaction rises

The player should see the chain rather than receive unexplained penalties.

## 37. Recovery gameplay

Failure must create recovery decisions, not only punishment.

Possible recovery actions:

- ration fuel
- shut down low-priority industry
- import emergency supplies
- repair infrastructure
- reassign workers
- use backup generators
- evacuate wounded
- negotiate aid

This creates strategy during crisis.

## 38. Economy UX

Settlement UI should answer three questions quickly:

1. What do I have?
2. What am I producing/consuming?
3. What is limiting me?

Useful panels:

- top resources
- power balance
- storage reserves/days
- workforce
- services
- production queues
- alerts/bottlenecks

Avoid presenting every internal variable at once.

## 39. Growth and specialization

Settlements can specialize based on geography, infrastructure, population, and strategic role.

Examples:

- industrial hub
- agricultural settlement
- research enclave
- military fortress
- logistics depot
- trade city
- medical center
- mining/recovery outpost

Specialization should emerge from investments and local advantages rather than one permanent class selection.

## 40. Multi-settlement economy

Later gameplay may allow a network of settlements.

Each settlement keeps its own:

- stockpiles
- utility situation
- population/services
- production capabilities

Strategic logistics connects them.

This prevents one distant outpost from magically using the capital's warehouse contents.

## 41. Scaling to city level

Large cities must not require simulating every apartment, resident, and workshop at full detail.

Use aggregation by district/service zone when scale grows.

A city can contain detailed landmark/critical buildings plus aggregated residential/industrial blocks.

Promote specific buildings/characters into detailed simulation when they become relevant.

## 42. Data ownership boundaries

### Settlement owns

- local building instances
- local inventories/storage
- utility capacities/connectivity
- production/service capacity
- housing
- maintenance/repair
- local workforce allocation

### LIFE SIMULATION owns

- individual needs
- relationships
- injuries/illnesses
- personality/memories

### Factions + Society owns

- support/legitimacy
- political blocs
- policy state
- unrest/resistance

### Army + Logistics owns

- inter-settlement movement
- military formations
- strategic supply routes
- convoys

### Hex World owns

- strategic geography
- roads/rail/terrain
- military control
- strategic infrastructure position

Avoid duplicating authoritative state across systems.

## 43. Minimal v0.0.1 bridge

The first playable uses only the smallest slice of this design:

- resources: Metal, Food, Power, People
- Central Shelter presentation
- buildable Generator
- Generator cost: 50 Metal
- safe resource deduction
- local save/load
- Generator construction changes the settlement audio mix

No fuel, pipes, workforce shifts, production chains, maintenance, medical simulation, or city networks are required yet.

## 44. Future testing strategy

Test subsystems independently.

Examples:

- production recipe never creates output without required inputs
- insufficient power reduces/disables correct consumers
- priority load shedding preserves higher-priority systems first
- warehouse capacity prevents impossible storage
- damaged building output matches condition rules
- elapsed-time/offline production is deterministic
- importing goods does not duplicate them
- building destruction removes its service capacity
- settlement summary matches detailed authoritative state

Integration tests cover cross-system chains such as:

fuel shortage -> power failure -> hospital degradation

without requiring full-world simulation.

## 45. Success criteria for the mature settlement system

The design succeeds when:

- a player understands why production changed
- settlement failures have causal explanations
- geography/logistics matter
- buildings connect to people and politics
- military damage has economic consequences
- settlements can specialize
- one settlement can scale into a network of cities without rewriting core rules
- the active scene feels alive without requiring full-detail simulation everywhere
- settlement state meaningfully changes DEAD SIGNAL's music

## 46. Scope boundary

This document defines future architecture.

The current v0.0.1 implementation remains intentionally narrow.

Do not block the first playable on:

- water network
- heating
- fuel logistics
- advanced production
- detailed workforce
- housing simulation
- medical capacity
- maintenance
- multi-settlement trade
- research
- city districts

Those systems enter later vertical slices after the Generator/resource/audio loop is stable.
