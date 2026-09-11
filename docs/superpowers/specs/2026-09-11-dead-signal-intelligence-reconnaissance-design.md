# DEAD SIGNAL — Intelligence + Reconnaissance System v0.1

Date: 2026-09-11
Status: User-approved architectural direction; future intelligence layer; out of scope for v0.0.1

## Purpose

Define how DEAD SIGNAL represents observation, uncertainty, reconnaissance, intelligence freshness, deception, counterintelligence, covert access, attribution, information warfare, and faction-specific knowledge without exposing the true world state directly to every player or AI faction.

Core principle:

`Reality != Knowledge`

The world systems own what is true. Intelligence owns what a specific faction currently believes, how that belief was formed, how precise it is, how old it is, and how confident the faction is in it.

This system sits between Hex World, Army + Logistics, Combat, Expeditions + Discovery, Factions + Society, Research + Technology, Settlement, and future AI decision systems.

## 1. Architectural choice

Use layered, event-driven, faction-relative intelligence with explicit source, timestamp, confidence, precision, and provenance.

Do not use a universal fog-of-war boolean only.

Do not make every faction recalculate line-of-sight for every entity across the entire world every tick.

The system should react to meaningful events such as movement, observation, radio activity, reconnaissance missions, sensor activation, terrain changes, captured documents, informant reports, and intelligence expiry.

## 2. Ownership boundaries

### Hex World owns

- true terrain
- true infrastructure state
- true environment/weather/radiation
- true control and physical positions
- true road/bridge/tunnel state

### Army + Logistics owns

- true formation composition
- true readiness
- true ammo/fuel/medical stocks
- true movement and supply status
- communications capability

### Combat owns

- transient battle state
- surprise/initiative consequences derived from available intelligence
- combat-generated observations/events

### Factions + Society owns

- political support/compliance/legitimacy
- propaganda reaction
- trust/reputation/political effects
- internal blocs and grievances

### Research + Technology owns

- scientific knowledge
- hypotheses
- sensor/recon technology unlocks
- Signal/anomaly interpretation models

### Intelligence owns

- observations
- intelligence assessments
- confidence
- precision
- freshness
- provenance/source chain
- deception markers and suspicion
- counterintelligence/infiltration summaries
- attribution confidence
- faction-relative known/unknown state

## 3. Faction-relative knowledge

Every faction may hold a different intelligence picture of the same world entity.

Example true state:

`Enemy formation: 642 personnel, 21 vehicles, ammo 38%, moving east`

Faction A may know:

`Estimated 500-700 personnel`
`Armored vehicles confirmed`
`Last observed 18 min ago`
`Confidence 88%`

Faction B may know only:

`Enemy activity reported in region`
`Strength unknown`
`Last credible report 2 days ago`

The UI must never accidentally reveal true values through hidden tooltips, sorting, combat previews, or metadata when intelligence quality is insufficient.

## 4. Observation object

An observation is a raw or semi-processed report created by a source.

Recommended fields:

- observation id
- observing faction
- source type
- source entity id if applicable
- target entity/hex/region/reference
- timestamp
- location accuracy
- observed attributes
- raw precision
- source reliability
- environmental quality
- detection context
- whether source identity is secret

Observations are evidence, not final truth.

Examples:

- scout sees vehicle tracks
- observation post spots artillery flashes
- radio intercept detects repeated transmissions
- trader reports troops near a town
- prisoner gives a depot location
- drone imagery shows bridge damage
- anomaly sensor records a pulse

## 5. Intelligence assessment object

An intelligence assessment fuses one or more observations into a usable belief.

Recommended fields:

- assessment id
- owning faction
- subject
- assessed value/range/category
- confidence
- precision
- freshness
- last updated
- contributing observations
- contradictory evidence count
- deception suspicion
- analyst/model provenance if needed

Assessments can be wrong.

## 6. Confidence

Confidence expresses how strongly the faction believes an assessment is correct.

Suggested internal range: 0–1000, displayed as 0–100% or bands.

Confidence increases with:

- multiple independent sources
- high-reliability sensors
- recent observation
- consistent evidence
- direct visual confirmation
- captured authoritative records

Confidence decreases with:

- old data
- source contradiction
- poor visibility
- known enemy deception capability
- unreliable informants
- Signal/anomaly interference
- indirect hearsay

Confidence is not the same as precision.

## 7. Precision

Precision defines how specific the information is.

Example military progression:

1. `activity detected`
2. `possible vehicle presence`
3. `armored force`
4. `company/battalion-sized armored force`
5. `approximately 18-24 armored vehicles`
6. `likely identified formation`

A report can be high-confidence but low-precision.

Example:

`Confidence 95%: enemy forces are present`

while strength remains unknown.

## 8. Freshness and decay

Intel ages over time.

Different fields decay differently.

### Long-lived knowledge

- terrain type
- major road alignment
- city location
- permanent tunnel entrance

### Medium-lived knowledge

- bridge condition
- fortification level
- industrial activity
- political unrest

### Fast-decaying knowledge

- army position
- convoy location
- ammo state
- readiness
- temporary command post

Old intelligence should normally degrade in precision before disappearing entirely.

Example:

`Exact: 3rd Mechanized Group at Hex 14,-8`

becomes:

`Mechanized group last observed in region`

later:

`Historic enemy activity`

## 9. Intel layers

Maintain independent knowledge layers.

### Terrain intelligence

- terrain
- elevation
- passability
- routes
- crossings
- tunnels

### Infrastructure intelligence

- bridges
- depots
- power facilities
- radio towers
- hospitals
- factories
- fortifications

### Military intelligence

- formation presence
- estimated strength
- role/type
- equipment
- readiness estimate
- movement
- support assets
- supply activity

### Economic intelligence

- production patterns
- shortages
- trade flows
- strategic resources
- depot throughput

### Political intelligence

- unrest
- local support
- resistance activity
- leadership conflicts
- faction influence

### Scientific/anomaly intelligence

- Signal events
- anomaly behavior
- radiation patterns
- unexplained emissions
- research-site activity

Each layer has its own precision and freshness.

## 10. Detection vs identification

Detection and identification are separate.

Possible stages:

- no contact
- anomaly/contact detected
- category suspected
- category confirmed
- type identified
- identity identified
- composition estimated
- exact current state known

A faction may detect something without knowing what it is.

This applies to armies, convoys, radio emitters, anomaly sources, and covert infrastructure.

## 11. Reconnaissance roles

Army and expedition systems may expose missions such as:

- scout
- screen
- observe
- route recon
- probe
- deep recon
- target acquisition
- combat reconnaissance

Recon should discover useful operational information rather than merely add a flat vision radius.

Possible outputs:

- route condition
- enemy movement
- bridge damage
- minefield suspicion
- supply traffic
- hidden approaches
- fortification layout
- artillery location
- radio emissions
- safe extraction route

## 12. Observation quality

Observation quality is affected by:

- distance
- line of sight
- terrain
- weather
- darkness
- concealment
- camouflage
- sensor quality
- observer skill
- communications
- Signal/anomaly interference

Do not represent all observation with one generic sight stat.

## 13. Sensor and source types

Potential sources include:

- human scouts
- expedition teams
- observation posts
- civilians/traders
- local resistance
- prisoners/deserters
- allied intelligence
- radio intercepts
- signal direction finding
- cameras/sensors
- drones later
- captured devices/documents
- scientific instruments

Sources have different strengths, weaknesses, and reliability profiles.

## 14. HUMINT-style reports

Human reports are valuable but imperfect.

They may include:

- bias
- fear
- misunderstanding
- deliberate lying
- outdated information
- local knowledge unavailable to sensors

Important reports should preserve source history so analysts can judge repeated reliability over time.

Do not expose a magical truth-rating to the player if the faction would not know it.

## 15. Signals intelligence

Radio/communications activity can create intelligence without reading every message.

Potential outputs:

- transmitter detected
- traffic volume increased
- command network active
- formation likely nearby
- direction/source region estimated
- encryption/profile fingerprint recognized

More advanced capabilities may later allow partial content recovery.

Radio silence reduces emission intelligence but can degrade friendly command and coordination.

## 16. Intel fusion

Multiple observations can be fused into a stronger assessment.

Independent corroboration increases confidence more than duplicated reports from the same underlying source.

Example:

- scout report
- radio intercept
- civilian report

all indicate armored movement on the same corridor.

The system should track provenance enough to avoid counting copied rumors as three independent confirmations.

## 17. Contradictory intelligence

Conflicts should be visible rather than silently averaged away.

Example:

`Enemy strength: DISPUTED`

Source A:
`Estimated 200-300`

Source B:
`Estimated 700+`

This creates meaningful uncertainty and player judgment.

## 18. Deception

Deception creates misleading observable evidence rather than directly overwriting an enemy database.

Possible methods:

- camouflage
- decoy camps
- dummy vehicles
- false radio traffic
- fake convoy activity
- staged movement
- false documents
- planted rumors
- feigned withdrawal

The enemy may detect the evidence and form a wrong assessment.

Deception effectiveness depends on plausibility, enemy collection methods, prior expectations, and counterintelligence quality.

## 19. Deception suspicion

Assessments may carry a deception-suspicion value.

Example:

`Large radio network detected`
`Confidence: 82%`
`Deception suspicion: 41%`

This does not reveal whether deception is actually occurring.

It expresses analyst doubt.

## 20. Counterintelligence

Counterintelligence protects information and access.

Potential settlement/faction summaries:

- counterintel strength
- infiltration suspicion
- communications security
- leak risk
- compromised-access risk
- known hostile network activity

Counterintelligence can be improved through:

- vetting
- compartmentalization
- communications security
- patrol/security coverage
- informant investigation
- infrastructure security

Heavy-handed security can create political costs through Factions + Society.

## 21. Infiltration and access

Covert operations require plausible access.

Access vectors may include:

- trade routes
- refugee/migration flow
- diplomatic presence
- captured identities/documents
- recruited local contacts
- criminal/black-market networks
- political sympathizers
- resistance groups
- compromised infrastructure

An agent does not teleport into a protected location because a button was pressed.

## 22. Covert operations boundary

This v0.1 defines the architecture for a small set of meaningful covert actions, not a full standalone spy game.

Potential operations:

- recruit informant
- infiltrate organization
- steal research/data
- sabotage infrastructure
- plant misinformation
- identify resistance network
- exfiltrate/recover agent
- map command/logistics network

Operations require:

- access
- time
- personnel/assets
- operational security
- objective
- extraction/exit considerations

## 23. Attribution

Knowing that an event was deliberate is not the same as knowing who caused it.

Example:

`Warehouse explosion`
`Sabotage confidence: HIGH`
`Perpetrator: UNKNOWN`
`Faction A involvement: 48%`
`Local resistance: 31%`

Attribution may use:

- forensic evidence
- intercepted communications
- captured operatives
- motive/opportunity
- known tactics
- informant reports

False attribution can create diplomatic and political consequences.

## 24. Information warfare boundary

Intelligence owns information transmission, reach, origin, authenticity, and credibility evidence.

Factions + Society owns audience reaction and political effects.

Example flow:

`Broadcast transmitted`
-> Intelligence determines who received it and whether source/authenticity is believed
-> Factions + Society determines how affected blocs respond

This prevents duplicate propaganda logic.

## 25. Intelligence sharing

Treaties may permit intelligence sharing.

Shared intel should preserve:

- origin faction/source class if allowed
- age
- confidence
- precision
- restrictions

An ally may share an assessment rather than the raw source.

Trust and treaty reliability matter.

## 26. Captured intelligence

Combat/Expedition outcomes may produce:

- maps
- radio codes
- route schedules
- depot manifests
- research notes
- unit rosters
- communications devices

Captured intelligence can create high-value observations but may itself be outdated, incomplete, or deliberately planted.

## 27. Research integration

Research + Technology may unlock:

- improved sensors
- better signal processing
- anomaly detection
- decryption support
- counter-deception analysis
- reconnaissance equipment
- environmental sensing

Research owns the technology; Intelligence consumes its capabilities.

## 28. Combat integration

Before battle, Combat receives an intelligence snapshot for each side.

This may affect:

- surprise
- initiative
- target acquisition
- pre-planned fires
- reserve positioning
- route selection
- risk assessment

Combat does not update global intel continuously during battle. It emits combat observations/events back to Intelligence.

## 29. Expedition integration

Expeditions can:

- collect observations
- verify rumors
- survey routes
- identify sites
- recover devices/documents
- establish sensors
- discover hidden entrances

Intelligence creates the knowledge result; Expedition owns the mission execution.

## 30. Hex World integration

Hex World owns truth.

Intelligence stores faction-relative knowledge about:

- terrain
- infrastructure
- control
- hazards
- movement
- strategic points

Never store one global `intelState` as if all factions know the same thing.

## 31. Factions + Society integration

Political intelligence may reveal estimated:

- local unrest
- faction influence
- leadership divisions
- resistance strength
- likely recruitment support

These are assessments, not direct access to hidden political truth.

Counterintelligence/security actions may create grievances or fear effects in Factions + Society.

## 32. Settlement integration

Settlements may host:

- radio/intelligence center
- observation infrastructure
- archives
- secure communications
- analysis staff
- counterintelligence/security assets

Settlement owns buildings/staffing/power. Intelligence consumes their capabilities.

## 33. Analyst capacity

Large factions should not automatically process infinite raw reports perfectly.

Optional strategic capacity can represent:

- trained analysts
- communications bandwidth
- processing tools
- archive quality
- command prioritization

Low analyst capacity may cause delays, lower fusion quality, or missed contradictions.

Keep this aggregated unless gameplay proves detailed analyst management is useful.

## 34. Intelligence priorities

Players/faction AI may set priorities such as:

- enemy armor
- supply routes
- political unrest
- anomaly activity
- bridge/rail conditions
- missing expedition
- enemy command network

Priorities influence which reports are collected, fused, refreshed, and surfaced first.

## 35. AI use of intelligence

Faction AI must make decisions from its own intelligence picture, not from omniscient world state.

AI may:

- misjudge enemy strength
- overestimate a threat
- fall for deception
- act cautiously under uncertainty
- seek more reconnaissance before committing

Difficulty should not be created by secretly giving AI perfect information unless explicitly used for testing/debug modes.

## 36. Simulation LOD

### Tier A — active intelligence region

Use detailed collection/fusion for:

- current player front
- selected armies
- active operations
- major battles
- important occupied settlements
- Signal/anomaly investigations

### Tier B — relevant region

Use periodic/event-based updates for:

- borders
- supply corridors
- known enemy activity
- diplomatic hotspots

### Tier C — distant background

Store last known assessments and coarse regional reports.

Update only when events, agents, allies, trade, or strategic sensors generate new evidence.

### Tier D — dormant

No active collection. Persist historic knowledge until something reactivates the region.

## 37. Event-driven processing

Prefer events over world-wide visibility polling.

Examples:

- army moved into observation envelope
- radio transmitted
- scout entered region
- sensor activated
- weather reduced observation quality
- bridge destroyed
- convoy crossed monitored route
- report received
- source compromised
- observation expired/degraded
- captured documents processed

Only affected assessments should be recalculated.

## 38. Information expiry

Do not delete all old knowledge on a timer.

Instead:

- fast-changing attributes lose precision/confidence quickly
- stable geography remains known
- source reliability history persists
- stale assessments remain visible as historical intel where useful

This helps players understand why their map contains old but potentially valuable information.

## 39. UI principles

The player should be able to distinguish:

- confirmed fact
- estimate
- rumor
- stale intel
- disputed intel
- suspected deception

Useful UI concepts:

- confidence bands
- last-confirmed time
- estimated ranges
- source count/type summary
- uncertainty shading
- stale markers
- contradiction icon

Never require the player to inspect hidden numerical formulas to understand uncertainty.

## 40. Example military intel card

`CONTACT: ARMORED FORMATION`

`Estimated strength: 400-800 personnel`
`Vehicles: 15-30`
`Direction: East / uncertain`
`Last confirmed: 34 min ago`
`Confidence: 67%`
`Sources: scout + radio intercept`
`Deception risk: LOW-MEDIUM`

## 41. Example infrastructure intel card

`BRIDGE 7A`

`Structure: confirmed`
`Passability: likely damaged`
`Heavy vehicle support: uncertain`
`Last visual observation: 2 days ago`
`Confidence: 58%`

## 42. Example Signal intel card

`UNIDENTIFIED EMISSION — REGION K-4`

`Pattern recurrence: probable`
`Source count: unknown`
`Environmental correlation: disputed`
`Scientific confidence: 43%`
`Military relevance: unknown`

This keeps the Signal mysterious without making the game arbitrary.

## 43. Determinism and debugging

Observation generation and intelligence fusion should be deterministic/seeded where practical for replay/debugging.

Given the same source state, environment, detection conditions, and RNG seed, the same observation should be reproducible.

Debug/admin tools may expose truth-vs-belief comparison, but production player UI must not.

## 44. Security and multiplayer integrity

When shared/online worlds are introduced, the backend must enforce intelligence visibility.

The client should receive only information the faction/player is permitted to know.

Do not send hidden true enemy data to the client and rely on the UI to conceal it.

This is required both for gameplay integrity and anti-cheat design.

## 45. Performance rules

- no world-wide per-frame line-of-sight scans
- no per-character visibility updates for distant population
- event-driven observation creation
- regional/sensor envelopes cached where useful
- intelligence assessments updated only when evidence changes or freshness thresholds are crossed
- use aggregate sources for distant AI factions
- persist compact assessments, not duplicated world snapshots

## 46. Testing strategy

Future isolated tests should verify:

- different factions can hold different beliefs about the same truth
- confidence changes with corroborating/contradictory evidence
- precision and confidence remain separate
- stale military intel degrades correctly
- stable terrain knowledge persists
- duplicated-source rumors do not count as independent corroboration
- deception can create misleading observations without rewriting truth
- AI consumes belief state rather than omniscient truth
- information-sharing preserves freshness/confidence
- client payload excludes unauthorized true-state fields in online mode
- event-driven updates do not require world-wide rescans

## 47. Scope boundary

This module is not part of DEAD SIGNAL v0.0.1.

Do not implement in the current prototype:

- reconnaissance missions
- spies
- counterintelligence
- faction-relative fog of war
- radio interception
- deception operations
- multiplayer intel permissions

v0.0.1 remains focused on resources, Generator construction, local persistence, dynamic audio, minimal hex preview, responsive UI, and QA.

## 48. Architectural decision summary

Approved direction:

- reality and knowledge are separate
- intelligence is faction-relative
- observations are evidence, assessments are beliefs
- source/timestamp/confidence/precision/provenance are first-class
- detection and identification are separate
- intel decays by attribute type
- deception changes observable evidence rather than truth
- covert access must be plausible
- attribution is probabilistic/uncertain
- Combat consumes intelligence snapshots
- AI must act on its own beliefs, not omniscient state
- shared worlds enforce intel permissions server-side
- simulation is event-driven and LOD-aware

This specification defines the future intelligence/reconnaissance architecture without expanding the current v0.0.1 implementation scope.