# DEAD SIGNAL — Combat + Battle Resolution System v0.1

Date: 2026-09-11
Status: User-approved architectural direction; future combat layer; out of scope for v0.0.1

## Purpose

Define how DEAD SIGNAL resolves armed conflict across the strategic hex world without reducing combat to a single army-power number and without simulating every projectile or soldier at full detail in every battle.

Combat sits between Hex World, Army + Logistics, LIFE SIMULATION, Expedition, Settlement, and future tactical scenes.

Core principle:

`Combat Outcome = Situation × Capability × Decisions × Friction`

The battle system consumes authoritative state from neighboring systems and returns consequences. It must not duplicate terrain, supply, health, or political state that already belongs elsewhere.

## 1. Architectural choice

Use a multi-resolution battle model with three compatible resolution modes:

1. **Background strategic resolution** — deterministic/seeded aggregate simulation for routine or distant conflicts.
2. **Focused strategic battle** — same underlying battle state, but with player-visible frontage, reserves, objectives, support, and orders.
3. **Tactical instance** — optional separate detailed scene for selected important encounters.

All three modes share one authoritative battle contract. Tactical mode is not a different universe; it receives a strategic snapshot and returns consequences into the same battle/world state.

Rejected alternatives:

- one-number power-score autoresolve: too shallow and makes terrain/supply/command largely cosmetic;
- fully detailed tactical simulation for every conflict: does not scale to persistent fronts or many simultaneous battles.

## 2. Ownership boundaries

### Hex World owns

- battle location
- terrain
- elevation
- cover/concealment baseline
- weather/environment
- fortifications
- edge features such as rivers, bridges, walls, roads, tunnels
- neighboring hexes
- ZOC and strategic retreat routes
- effective control consequences after battle

### Army + Logistics owns

- participating formations
- manpower/equipment pools
- ammo/fuel/medicine/spare parts
- readiness
- morale
- fatigue
- command/communications
- local stocks
- reinforcement availability
- transport and movement capability

### LIFE SIMULATION owns

- named-character health
- body-part injuries
- stress/trauma/memories
- relationships
- important commander/personnel consequences

### Settlement owns

- hospitals, depots, repair capacity, industrial replacement capacity

### Battle system owns only transient combat state

- battle instance identity
- participating sides/formations
- current battle phase
- frontage assignment
- engaged/support/reserve status
- local suppression/cohesion pressure
- objectives
- initiative/tempo
- local combat events
- pending retreat/pursuit state
- battle result ledger before consequences are committed outward

## 3. Battle creation

A Battle Instance is created when hostile formations enter meaningful combat contact.

Possible triggers:

- hostile formations attempt to occupy/contest the same strategic position;
- a formation attacks across an edge into defended territory;
- interception occurs because of ZOC or mission order;
- ambush/raid/escalated resistance creates a combat engagement;
- a focused expedition transitions into an armed encounter that exceeds expedition-level resolution.

A battle stores references, not deep copies, to authoritative formations and hex state. A compact immutable snapshot of relevant starting conditions may be recorded for deterministic replay/debugging.

## 4. Battle phases

Recommended phase model:

1. **Detection** — forces may know little or a lot about the enemy.
2. **Contact** — first effective engagement, probing, skirmish, ambush, or artillery contact.
3. **Engagement** — primary combat power becomes committed.
4. **Escalation** — reserves/support/reinforcements enter, tempo rises.
5. **Decision** — breakthrough, hold, stalemate, withdrawal, rout, or surrender becomes likely.
6. **Retreat / Pursuit / Consolidation** — forces disengage, pursue, capture prisoners/equipment, occupy ground.
7. **Aftermath** — casualties, damaged equipment, ammunition use, medical burden, morale effects, control changes, and political/logistics events are emitted.

Phases are descriptive state bands, not mandatory fixed-duration timers.

## 5. Frontage

Not all troops in a hex can fight effectively at once.

Frontage is determined from:

- terrain
- attack direction/edge
- fortification layout
- road/bridge/tunnel width where relevant
- formation doctrine and organization
- congestion

For each side, formations/elements may be assigned to:

- `engaged`
- `supporting`
- `reserve`
- `disengaging`

Only engaged elements contribute full direct combat capability. Supporting elements contribute appropriate indirect/support effects. Reserves can replace depleted units, counterattack, protect flanks, or exploit breakthroughs.

This prevents unrealistic stacking and makes narrow crossings, urban approaches, tunnels, ridges, and multi-direction attacks strategically meaningful.

## 6. Capability model

Avoid one universal combat stat.

A formation contributes capability vectors such as:

- direct anti-personnel fire
- anti-armor
- armor/protection
- indirect fire
- reconnaissance/target acquisition
- engineering/breaching
- mobility
- air/drone capability later if introduced
- electronic/communications support
- medical support
- recovery/repair support

Capability is context-sensitive. Terrain, visibility, ammo, fatigue, command, suppression, fortification, and enemy composition modify how much capability can actually be brought to bear.

## 7. Terrain and positioning

Terrain modifies combat through distinct channels rather than one generic percentage.

Possible effects:

- line of sight
- concealment
- exposure
- movement speed
- firing opportunities
- armor maneuver space
- infantry cover
- engineering difficulty
- frontage
- retreat options
- reinforcement access

Examples:

- open ground favors observation, maneuver, and vehicle employment but offers little infantry cover;
- dense urban ruins reduce sight lines, create high cover, constrain vehicles, and favor infantry/engineering;
- forests improve concealment but reduce long-range fire and vehicle mobility;
- hills/ridges create observation and defensive advantages but may concentrate approaches;
- bridges/tunnels produce severe frontage constraints.

## 8. Initiative and tempo

Battle initiative is not a permanent faction stat.

It may be derived from:

- detection advantage
- commander quality
- readiness
- communications
- mobility
- surprise
- planned attack preparation
- terrain position
- recent success/failure

Initiative influences who can impose tempo, commit reserves effectively, disengage cleanly, or exploit a breakthrough.

## 9. Suppression, cohesion, and morale

These are separate concepts.

### Suppression

Immediate combat pressure that reduces ability to observe, move, fire, communicate, and coordinate.

Suppression can be caused by:

- direct fire
- indirect fire
- shock/ambush
- nearby casualties
- overwhelming armored presence
- explosions/environmental hazards

Suppression can decay when pressure is removed and command/cover are good.

### Cohesion

How well a formation remains organized and able to execute coordinated action.

Cohesion falls through:

- casualties
- disrupted command
- rapid movement under fire
- isolation
- chaotic retreat
- repeated suppression
- loss of key leaders

A formation can have high morale but low cohesion.

### Morale

Willingness to continue fighting.

Morale is influenced by:

- casualties
- perceived chance of success
- fatigue
- supply
- leader behavior
- encirclement
- ideology/faith and unit culture
- prior memories/events
- ability to retreat

A formation may remain organized while deciding it no longer wants to continue the fight.

## 10. Damage and casualties

Firepower should not translate directly into kills.

A combat event can produce:

- suppression
- cohesion damage
- personnel casualties
- equipment damage
- command disruption
- mobility damage
- ammunition expenditure
- morale shock

Personnel outcomes are categorized at strategic scale as:

- killed
- wounded
- missing
- captured
- temporarily combat ineffective

Named/relevant characters receive detailed LIFE SIMULATION injury resolution when required.

Background personnel remain aggregated.

## 11. Equipment states

Do not model strategic vehicles as one HP bar only.

Common equipment can use condition/serviceability pools, while important assets may be individually tracked.

Useful states for individually relevant equipment:

- operational
- weapon damaged
- mobility damaged
- sensors/comms damaged
- crew impaired
- disabled
- abandoned
- destroyed

Disabled equipment is not automatically destroyed. Recovery depends on control of the battlefield, engineering/recovery assets, time, transport, and threat.

## 12. Ammunition and combat consumption

Battle consumes real Army + Logistics stocks.

Consumption depends on:

- intensity
- weapon/capability type
- duration
- doctrine/orders
- target type
- suppression needs

Low ammunition should not simply apply one flat damage debuff. It can change behavior:

- reduced indirect fire
- fewer suppression fires
- inability to sustain attack tempo
- conserved anti-armor ammunition
- forced withdrawal or defensive posture

Fuel, medicine, batteries, and spare parts can also matter during prolonged operations.

## 13. Support fires and adjacent support

Not every supporting formation must occupy the same front-line hex.

Support may come from:

- artillery/indirect fire
- reconnaissance/observation
- engineering
- communications relay
- medical assets
- logistics
- later electronic warfare/drone systems

Eligibility depends on:

- range
- line/area access
- communications
- ammunition
- target information
- route safety
- doctrine/order

Destroying a relay, observation post, road, bridge, or ammo depot can therefore change battle effectiveness without directly killing front-line troops.

## 14. Orders and posture

A commander/player should influence battle through meaningful orders rather than direct control of every soldier at strategic scale.

Possible battle postures:

- probe
- hold
- prepared defense
- deliberate attack
- assault
- breakthrough
- delay
- fighting withdrawal
- disengage
- counterattack

Orders influence:

- commitment of reserves
- acceptable ammo expenditure
- risk tolerance
- casualty tolerance
- retreat thresholds
- tempo
- pursuit behavior

Orders do not override physical constraints or broken formations.

## 15. Reserves

Reserves are central to the model.

They may be used to:

- replace suppressed/depleted engaged units
- counterattack a breakthrough
- protect a threatened flank
- exploit enemy collapse
- cover retreat

A force that commits everything immediately has less flexibility later.

Reserve commitment is a major source of strategic decision-making in focused battle mode.

## 16. Reinforcements

Reinforcements arrive through actual strategic access.

Arrival depends on:

- neighboring hex routes
- travel time
- command/order delay
- terrain
- enemy ZOC
- infrastructure
- battle frontage/capacity

Reinforcements cannot teleport into a surrounded position.

## 17. Breakthrough and local advantage

A breakthrough occurs when one side creates enough local advantage in a frontage sector that the defender cannot maintain an organized line.

Inputs may include:

- engaged combat capability
- cohesion
- suppression
- reserves
- terrain
- fortification damage
- command
- support

Breakthrough does not necessarily destroy the defender. It can force reserve commitment, withdrawal, loss of terrain, encirclement risk, or collapse of adjacent positions.

## 18. Stalemate

A battle can reach stalemate when neither side can generate sufficient local advantage at acceptable cost.

Stalemate should consume:

- ammunition
- fuel
- medical capacity
- time
- morale
- equipment serviceability

This makes logistics and political tolerance relevant even without territorial change.

## 19. Retreat

Retreat is a first-class battle outcome.

### Planned withdrawal

- chosen before total collapse;
- preserves more cohesion and equipment;
- requires viable route and command;
- may sacrifice terrain intentionally.

### Forced retreat

- occurs after breakthrough, cohesion collapse, or untenable position;
- causes greater equipment loss, missing personnel, and pursuit exposure.

### Rout

- severe organizational collapse;
- command effectiveness is minimal;
- losses and abandonment rise sharply.

Retreat routes are resolved through Hex World adjacency, ZOC, terrain, control, and infrastructure.

## 20. Pursuit

The victorious side may pursue a retreating enemy if it has:

- mobility
- cohesion
- fuel
- command
- route access
- remaining reserves

Aggressive pursuit can increase captures and abandoned equipment but creates risk of overextension, ambush, fatigue, and supply strain.

## 21. Encirclement and surrender

If no viable retreat/supply route exists, formations may become encircled.

Encirclement affects battle through:

- declining morale
- limited resupply
- medical overload
- reduced ability to replace losses
- increased surrender probability
- breakout decisions

Surrender is not a random roll only. It may depend on:

- morale
- casualties
- leadership
- ideology
- ammunition/food/medicine
- enemy reputation/prisoner treatment
- hope of relief
- escape probability

## 22. Fortifications

Fortification effects come from Hex World but Battle resolves their combat use.

Fortifications can provide:

- reduced exposure
- better firing positions
- improved cohesion under fire
- protected command/medical areas
- narrower enemy approach
- resistance to bombardment

Fortifications may be:

- bypassed
- suppressed
- breached
- damaged
- captured

Engineers and indirect fire become strategically meaningful because of this.

## 23. Surprise and ambush

Surprise is generated from intelligence, concealment, reconnaissance failure, movement, communications, and terrain.

A surprise event may grant temporary advantages in:

- initiative
- target acquisition
- suppression
- command disruption
- first-fire effectiveness

Surprise should decay after contact rather than remain a permanent buff.

## 24. Friendly fire and combat friction

Combat includes controlled friction rather than perfectly deterministic execution.

Possible friction sources:

- poor communications
- low visibility
- unfamiliar terrain
- stress/fatigue
- inexperienced troops
- damaged command links
- Signal/anomaly interference later

Friction can create delays, miscoordination, wasted ammunition, or reduced support effectiveness.

Avoid excessive random punishment. Outcomes should remain explainable from conditions and logged events.

## 25. Tactical instance handoff

A tactical battle may be opened for selected encounters.

The strategic layer sends a snapshot containing relevant context such as:

- terrain/edge context
- weather/visibility
- participating formations/elements
- manpower/equipment available to the instance
- ammo/fuel/medical state
- fatigue/morale/cohesion baseline
- commanders
- objectives
- fortifications
- reinforcement windows

The tactical scene returns a result package such as:

- casualties
- injuries to named characters
- equipment destroyed/damaged/abandoned
- ammunition/fuel consumed
- objective control
- captured prisoners
- fortification damage
- retreat status
- discovered information

The strategic engine validates and commits the result.

## 26. Background autoresolve

Background resolution uses the same concepts but at aggregate granularity.

It should process battle windows/events rather than every shot.

Inputs:

- capability vectors
- frontage
- terrain/fortification
- current ammo/fuel/readiness/fatigue
- command
- suppression/cohesion/morale
- orders
- support
- seeded friction

Outputs:

- state transitions
- losses
- resource consumption
- positional outcome
- emitted consequences

Given the same starting snapshot, orders, and RNG seed, the result should be reproducible for debugging/replays.

## 27. Focused strategic battle UX

Focused battle mode should expose decisions, not hidden math.

Useful player-facing information:

- front sectors / attack directions
- engaged/support/reserve assignment
- suppression/cohesion bands
- ammo/fuel/medical warnings
- terrain and fortification advantages
- support availability
- reinforcement ETA
- retreat routes
- battle objective progress
- major battle events

Avoid presenting dozens of raw equations.

## 28. Battle objectives

Not every battle requires annihilation.

Objectives may include:

- hold position
- seize bridge
- break through
- delay enemy
- evacuate wounded/civilians
- destroy depot/radar/radio relay
- extract expedition
- open retreat corridor
- capture commander
- recover prototype/sample

Objective success may justify disengaging even if enemy forces remain.

## 29. Aftermath

Battle aftermath produces events for other systems.

### Army + Logistics receives

- personnel losses
- equipment losses/damage
- ammunition/fuel/medicine consumption
- fatigue/readiness/cohesion changes
- prisoners
- captured/abandoned equipment

### LIFE SIMULATION receives

- detailed injuries/deaths for relevant characters
- trauma/memories
- relationship/reputation events

### Settlement receives

- medical evacuation burden
- repair/replacement demand
- prisoner/refugee/casualty arrivals if relevant

### Factions + Society receives

- victory/defeat event
- casualties
- civilian damage/behavior events
- leader loss/capture
- political/legitimacy consequences

### Hex World receives

- control change
- fortification/infrastructure damage
- wreckage/hazard state if relevant
- altered ZOC/front state

## 30. Civilian and infrastructure damage

Combat near settlements/infrastructure may create non-military consequences.

Risk depends on:

- terrain/urban density
- weapon type
- intensity
- target discipline
- fortification location
- duration

The battle system emits damage events; Settlement/Factions systems own the persistent civilian/infrastructure consequences.

## 31. Combat LOD

### Tier A — player-focused critical battle

- frequent detailed battle events
- sectors/frontage/reserves
- optional tactical handoff

### Tier B — strategically relevant battle

- aggregate combat windows
- periodic state updates
- visible summary events

### Tier C — distant background battle

- coarser deterministic resolution
- only major state transitions emitted

Do not run projectile-level simulation outside tactical scenes.

## 32. Event model

Useful battle events include:

- enemy detected
- ambush triggered
- support fire began
- reserve committed
- fortification breached
- commander lost
- ammo critical
- local breakthrough
- retreat ordered
- retreat route blocked
- formation routed
- surrender offered/accepted/refused
- battle ended

Events should be logged compactly enough to explain outcomes and support future replay/history views.

## 33. Determinism and RNG

Use seeded RNG for uncertainty/friction.

Randomness may influence:

- exact casualty distribution
- detection timing
- equipment failure/damage distribution
- command friction
- pursuit outcomes

Randomness must not override fundamentals. A catastrophically undersupplied, surrounded force should not repeatedly defeat a superior prepared force because of lucky dice.

## 34. Explainability

The player should be able to understand why a battle went badly.

Post-battle explanation may highlight top causes such as:

- attacked across narrow bridge
- defender had prepared fortifications
- artillery support lost after relay destruction
- ammunition became critical
- reserve committed too early
- retreat route cut by enemy ZOC
- fatigue reduced combat effectiveness

Avoid opaque `Combat Power -37%` messages with no cause.

## 35. Performance principles

- no per-projectile strategic simulation;
- no full LIFE SIMULATION expansion for every soldier;
- no duplication of Hex/Army authoritative state;
- battle calculations run only for active battle instances;
- background conflicts use coarse windows/events;
- tactical scene objects are loaded only when needed;
- battle logs are event/delta based;
- derived presentation values are not persisted when they can be recomputed.

## 36. Testing strategy

Future isolated tests should cover at minimum:

- narrow frontage limits simultaneous attackers;
- reserves do not contribute as full engaged strength until committed;
- low ammo reduces sustainable combat behavior;
- planned withdrawal preserves more cohesion than rout under equivalent pressure;
- blocked retreat route changes outcome materially;
- terrain changes relative effectiveness by capability type;
- deterministic seed reproduces same aggregate result;
- tactical result package commits same categories of consequences as strategic resolution;
- no battle result can create more personnel/equipment/resources than participants started with unless explicitly captured from enemy pools.

## 37. Integration contract summary

Input contract:

`Hex context + Formation states + Orders + Support + Relevant character/commander modifiers + RNG seed`

Battle internal state:

`Phases + Frontage + Engagement assignments + Suppression + Cohesion pressure + Objectives + Event log`

Output contract:

`Losses + Consumption + Equipment state changes + Injuries + Retreat/Pursuit + Objective result + Control/Infrastructure consequences + Events`

## 38. Scope boundary

This system is not implemented in DEAD SIGNAL v0.0.1.

The current playable milestone remains:

- resources
- Generator construction
- local persistence
- dynamic audio
- minimal hex preview
- responsive UI

Combat architecture is future-facing and must not expand the current Replit prototype scope.

## 39. Architectural decision summary

Approved direction:

- multi-resolution battle system
- one shared battle contract across background/focused/tactical modes
- frontage and reserves matter
- capability vectors replace one combat-power number
- suppression, cohesion, and morale are distinct
- terrain and fortifications affect specific combat channels
- retreat/pursuit/encirclement are first-class outcomes
- logistics stocks are consumed physically
- equipment can be damaged/disabled/abandoned without automatic destruction
- named characters receive detailed LIFE consequences only when relevant
- seeded deterministic autoresolve for reproducibility
- event-driven battle logs and simulation LOD protect performance
- battle outcome remains explainable to the player
