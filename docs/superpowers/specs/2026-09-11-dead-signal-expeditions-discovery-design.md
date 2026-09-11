# DEAD SIGNAL — Expeditions + Discovery System v0.1

Date: 2026-09-11
Status: Approved architectural direction; future exploration/discovery system; out of scope for v0.0.1

## Purpose

Define how DEAD SIGNAL turns the global strategic world into playable expeditions that connect Hex World, Settlement, LIFE SIMULATION, Research + Technology, Army + Logistics, and future tactical/special scenes.

Core loop:

world intel -> expedition objective -> team selection -> loadout -> route -> travel/events -> site exploration -> extraction -> return -> consequences

The system should make exploration feel like a meaningful operation rather than a passive loot timer.

## 1. Architectural principle

An expedition is a persistent operation object, not merely a button that resolves into random rewards.

The operation stores enough state to survive scene changes and, later, backend persistence.

Keep separate:

- strategic planning state
- traveling state
- site/local scene state
- extraction/return state
- post-expedition consequences

The global map owns geography and route context. Expedition owns the mission. Tactical/special scenes own local moment-to-moment interaction when loaded.

## 2. Expedition object

Possible fields:

- expeditionId
- ownerFactionId
- originSettlementId
- objectiveType
- targetHexId / targetSiteId
- teamMemberIds
- vehicleIds
- cargo/loadout
- departureTime
- currentState
- plannedRoute
- actualRoute
- riskProfile
- intelConfidence
- supplies
- discoveries
- casualties
- recoveredItems
- samples
- rescuedPeople
- prisoners if applicable later
- currentLocation
- returnDestination
- eventLog

## 3. Expedition objectives

Operations should be objective-driven.

Examples:

- reconnaissance
- salvage
- rescue
- medical evacuation
- recover missing expedition
- secure scientific sample
- investigate Signal transmission
- survey anomaly
- recover equipment
- establish observation post
- repair remote infrastructure
- escort specialists
- retrieve data archive
- map tunnel/metro access
- contact unknown group
- deliver aid
- stealth observation

One expedition may have one primary objective and optional secondary objectives.

## 4. Team composition

The player selects people because individuals matter.

Useful roles may include:

- expedition leader
- scout
- medic
- engineer
- scientist
- security/combat specialist
- driver
- radio/operator
- carrier/logistics specialist
- negotiator/interpreter where relevant

Characters may fill multiple roles depending on skills.

Team quality depends on composition, not only headcount.

Examples:

- no medic increases consequences of injury;
- no engineer may block repairs or safe entry;
- no scientist may cause samples to be collected poorly;
- no scout raises ambush/navigation risk;
- low social compatibility may reduce cohesion during long operations.

## 5. Named characters and LIFE SIMULATION

Expedition members use real character state from LIFE SIMULATION.

Relevant inputs:

- health
- fatigue
- hunger/thirst
- stress
- fear
- injuries
- traits
- relationships
- morale
- beliefs
- skills
- memories

Expeditions create new memories and relationship events.

Examples:

- one character saves another;
- leader abandons a wounded member;
- team survives a radiation surge;
- scientist insists on retrieving dangerous evidence;
- a betrayal or cowardice event changes trust.

The expedition system should not duplicate health or relationship data; it references LIFE SIMULATION.

## 6. Loadout

Expeditions need meaningful preparation without inventory micromanagement becoming tedious.

Loadout categories:

- food/water
- medical supplies
- ammunition
- protective gear
- radiation/chemical protection
- tools
- climbing/breaching equipment
- batteries/power cells
- lights
- communication equipment
- scientific instruments
- storage containers
- spare parts
- navigation/recon equipment
- trade/aid goods

Use templates/presets so routine expeditions can be prepared quickly.

## 7. Carry capacity

Capacity depends on:

- character carrying ability
- injuries/fatigue
- backpacks/equipment
- vehicles
- terrain
- mission length

Recovered loot competes with supplies and wounded evacuees for capacity.

A player may have to choose between:

- heavy machinery
- rare sample
- food
- injured survivor

This creates meaningful extraction decisions.

## 8. Vehicles

Expeditions may later use:

- bicycles
- motorcycles
- utility vehicles
- trucks
- armored vehicles
- boats where geography supports them
- special engineering/recon vehicles

Vehicles affect:

- speed
- cargo
- fuel
- route restrictions
- visibility/noise
- protection
- maintenance

Vehicle failure can create emergent missions rather than instant failure.

## 9. Intel and uncertainty

The target should often be partially known.

Possible intel dimensions:

- location confidence
- enemy presence confidence
- hazard confidence
- structural condition
- resource expectation
- survivor reports
- anomaly activity
- route safety

Intel ages and can be wrong.

Player-facing example:

`Hostiles: possible`
`Radiation: estimated moderate`
`Structure: partially collapsed`
`Signal activity: unverified`

Avoid showing exact hidden truth unless justified by intelligence.

## 10. Route planning

Routes use Hex World movement/infrastructure rules.

Planning considers:

- distance
- terrain
- roads/bridges/tunnels
- weather
- radiation/contamination
- faction control
- enemy activity
- supply/refuel points
- known hazards
- stealth requirement
- daylight/time if used later

The safest route may not be the fastest route.

Route changes caused by new information should be allowed during the operation.

## 11. Travel model

Do not load a detailed scene for every traversed hex.

Strategic travel uses event-driven progression.

Potential triggers:

- entering hazardous region
- reaching checkpoint
- weather change
- detection event
- mechanical problem
- finding unexpected POI
- communication loss
- injury/illness escalation
- route blockage
- encounter with civilians/traders

Routine movement remains compact.

## 12. Expedition risk

Do not reduce expedition risk to one hidden dice roll.

Risk derives from visible contributors:

- hazard exposure
- hostile presence
- route uncertainty
- team skill gaps
- equipment quality
- fatigue
- weather
- supply margin
- vehicle condition
- intel quality

UI may summarize these as Low / Moderate / High / Extreme, but the underlying causes should be inspectable.

## 13. Site types

Sites may include:

- ruined apartment block
- laboratory
- hospital
- warehouse
- power substation
- metro station
- bunker
- industrial plant
- radio facility
- crashed convoy
- underground tunnel
- flooded structure
- contaminated district
- anomaly field
- abandoned settlement
- unknown Signal-linked site

A site is a persistent entity linked to a strategic location.

## 14. Site scene boundary

Important sites can open a separate local scene.

The site scene receives context such as:

- party
- equipment
- time/weather
- known intel
- strategic threat
- current health/supplies
- site state

It returns consequences such as:

- discovered rooms/paths
- recovered items
- samples/data
- casualties
- site damage
- rescued characters
- new hazards
- changed world intel
- story flags

The scene should not directly rewrite global ownership/logistics without returning a structured outcome.

## 15. Exploration structure

Local exploration may use rooms/nodes/areas rather than requiring a giant continuous map.

Possible node states:

- unknown
- observed
- accessible
- blocked
- hazardous
- cleared
- exhausted
- secured

Actions can include:

- inspect
- search
- repair
- breach
- treat
- sample
- listen/scan
- communicate
- rest
- mark for later
- withdraw

## 16. Skill checks and decisions

Avoid binary RPG checks that ignore context.

Outcome quality can depend on:

- relevant skill
- equipment
- fatigue/injury
- time spent
- assistance
- hazard level
- prior intel

Possible outcomes:

- clean success
- success with cost
- partial result
- failure
- dangerous discovery

The player should usually understand why the result occurred.

## 17. Discovery model

Discovery is broader than loot.

Possible discoveries:

- physical items
- resources
- people
- map knowledge
- routes/tunnels
- faction information
- documents/data
- medical knowledge
- technology fragments
- environmental observations
- Signal observations
- anomaly samples
- historical/lore evidence

Discoveries feed appropriate systems rather than all becoming generic currency.

## 18. Scientific samples and data

Research-relevant finds should preserve provenance.

A sample/data package may store:

- source site
- collection conditions
- contamination/hazard state
- collector skill/equipment quality
- integrity
- chain-of-custody if needed later
- related observations

Poor collection can reduce research usefulness without making the item completely worthless.

## 19. Salvage

Salvage should distinguish:

- immediately usable supplies
- repairable equipment
- components/materials
- prototypes/unique technology
- heavy objects requiring special transport
- hazardous items requiring containment

Not every object should become `Metal +5` instantly.

Settlement/Production decides how recovered salvage is processed.

## 20. Survivors and encounters

Expeditions can find living people.

Possible outcomes:

- rescue
- recruitment
- escort
- trade
- negotiation
- refusal
- hostility
- quarantine/medical concern
- political complications

Named survivors enter LIFE SIMULATION if they become relevant.

Population groups may otherwise be handled in aggregate.

## 21. Communication

Expeditions may remain in contact with home depending on equipment and terrain.

Communication quality influences:

- updated orders
- intel sharing
- emergency support
- extraction coordination
- morale
- ability to report discoveries before returning

Radio towers and communications infrastructure from Hex World/Settlement can matter.

Signal anomalies may interfere with or distort communications.

## 22. Extraction

Extraction is a gameplay phase, not an automatic teleport home.

Possible choices:

- leave immediately
- remain for secondary objective
- call vehicle/support
- split team if doctrine permits
- abandon heavy salvage
- carry wounded
- hide/cache items for later

A successful discovery can still become a failed expedition if the team cannot extract safely.

## 23. Casualties and medical evacuation

Wounded members remain real LIFE SIMULATION characters.

Expedition must decide:

- stabilize locally
- consume medicine
- reduce pace to carry them
- call evacuation
- abandon objective
- continue at higher risk

On return, casualties feed Settlement medical capacity and Army/Politics consequences where relevant.

## 24. Failure states

Avoid only two outcomes: success/death.

Possible failures:

- objective not completed
- partial information only
- lost equipment
- wounded team
- stranded vehicle
- forced retreat
- lost communication
- missing expedition
- contaminated returnees
- site made more dangerous
- rival faction obtains objective first

Some failures create future missions.

## 25. Missing expeditions

If contact is lost, expedition may become a world event.

Later missions can include:

- locate missing team
- recover bodies/equipment
- rescue survivors
- investigate last transmission

This creates continuity between operations.

## 26. Rival expeditions

Other factions may investigate the same sites.

Potential outcomes:

- arrive first
- negotiate access
- trade information
- shadow each other
- steal salvage
- compete for extraction
- fight where political state allows

Rivals should obey Factions + Society diplomacy rather than being universally hostile.

## 27. Dynamic sites

Sites can change after discovery.

Examples:

- structure collapses
- anomaly becomes active
- rival occupies site
- radiation spreads
- survivors move in
- facility gets repaired
- resources are exhausted
- site becomes an outpost

A POI therefore has persistent strategic state.

## 28. Expeditions and Research + Technology

Expeditions provide:

- samples
- observations
- prototypes
- documents
- field test opportunities

Research provides:

- improved sensors
- protection
- sampling equipment
- medical tools
- mobility
- communication
- containment

This forms a loop:

explore -> discover -> research -> improve capability -> explore deeper

## 29. Expeditions and Settlement

Settlement supplies:

- people
- equipment
- food/water
- medicine
- vehicles
- repair
- storage
- decontamination

Expeditions return:

- materials
- discoveries
- wounded
- survivors
- information
- political consequences

Preparation consumes real settlement resources.

## 30. Expeditions and Army + Logistics

Small expeditions are distinct from armies but reuse logistics concepts.

Armies may provide:

- escorts
- secured corridors
- transport
- extraction support
- forward bases

Expeditions may provide:

- reconnaissance
- target intelligence
- sabotage/repair context later
- route surveys

Do not represent every scout patrol as a full strategic army.

## 31. Expeditions and Hex World

Hex World owns:

- coordinates
- terrain
- roads/edges
- weather/environment
- control
- intel map
- POI locations

Expedition owns:

- mission state
- team
- equipment
- route plan
- discoveries
- current operation progress

The expedition references the world; it does not duplicate terrain/control data.

## 32. Audio integration

Expedition scenes can contribute their own temporary mix while preserving DEAD SIGNAL's layered-audio identity.

Examples:

- radio signal intensity
- breathing/filter sounds under contamination
- structural creaks
- distant industrial hum
- anomaly harmonic layer
- team stress reducing/altering music

Returning with a major discovery may unlock or alter settlement/world audio layers later.

## 33. Narrative integration

Narrative should emerge from systems plus authored events.

Use context-aware event templates driven by:

- location
- characters
- relationships
- faction state
- prior discoveries
- health
- faith/ideology
- world events

Avoid random text events that ignore the actual party/world state.

## 34. Simulation LOD

### Tier A — active player expedition

- detailed team state
- frequent event processing
- local site scene when needed

### Tier B — relevant remote expedition

- strategic progression
- periodic events
- aggregate encounter resolution

### Tier C — background NPC/faction expedition

- coarse mission model
- result generation from capabilities, risk, and world state

Do not run local room-by-room simulation for unseen AI expeditions.

## 35. Event-driven progression

Prefer scheduled events and route/site transitions over per-frame expedition logic.

Example events:

- departed settlement
- entered hex
- reached POI
- hazard exposure threshold crossed
- supply threshold reached
- communication lost/restored
- character injured
- objective discovered
- extraction started
- expedition returned

## 36. Offline/local progression

During local single-player phases, closed-app expedition progress can be resolved from timestamps and deterministic scheduled state.

Do not simulate every missed second.

Shared online worlds later use authoritative backend events.

## 37. Determinism and reproducibility

Use seeded event resolution where practical so expedition outcomes can be reproduced in tests/replays.

Important inputs should be recorded in the event log.

This supports debugging and future replay-as-data concepts.

## 38. Player UX

Expedition planning UI should answer:

- What are we trying to do?
- Who is going?
- What are we taking?
- What do we know?
- What can go wrong?
- How long/expensive is the route?
- How do we get home?

During expedition, UI should emphasize decisions and changing risk rather than constant clicking.

## 39. Anti-micromanagement rules

- allow loadout presets
- auto-fill routine supplies with player-defined reserves
- allow recommended team suggestions
- routine travel resolves automatically
- pause/alert only for meaningful decisions
- allow standing doctrine for repeated minor events

The player should command expeditions, not manually distribute every food packet.

## 40. Prototype progression path

Future implementation order:

1. static expedition definition
2. team selection
3. loadout/supply cost
4. route and ETA
5. deterministic travel events
6. one simple site node map
7. salvage/sample extraction
8. return and settlement consequences
9. character health/memory integration
10. deeper procedural/authored sites

## 41. Scope boundary

None of this belongs in DEAD SIGNAL v0.0.1 except perhaps the future-facing `EXPEDITION` navigation placeholder already allowed by the foundation UI concept.

Current v0.0.1 remains:

- resources
- Generator construction
- local persistence
- generator-driven audio layer
- minimal hex preview
- responsive settlement UI
- QA

Do not delay the first playable to implement expeditions.

## 42. Architectural summary

Approved direction:

- expeditions are persistent operations, not loot timers
- real named characters and health state matter
- preparation/loadout creates meaningful choices
- travel uses Hex World routes without loading every hex
- important sites can open separate local scenes
- discoveries feed different systems according to type
- extraction matters as much as entry
- failures create future missions rather than only dead ends
- AI/background expeditions use simulation LOD
- event-driven deterministic progression protects performance
- exploration and research form a reinforcing gameplay loop
