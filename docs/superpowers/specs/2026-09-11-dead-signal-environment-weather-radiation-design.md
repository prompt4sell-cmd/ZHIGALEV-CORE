# DEAD SIGNAL — Environment + Weather + Radiation System v0.1

Date: 2026-09-11
Status: User-approved architectural direction; future environment/survival layer; out of scope for v0.0.1
Recorded at: 2026-09-11T05:19:11-04:00 (America/New_York)

## Purpose

Define how DEAD SIGNAL represents climate, regional weather, temperature, wind, precipitation, visibility, radiation fields, contamination, fire, smoke, flooding, environmental hazards, and Signal-linked atmospheric anomalies without duplicating health, settlement, combat, logistics, or intelligence state.

Core chain:

`World climate -> Regional field -> Hex exposure -> Entity protection -> System consequence`

The Environment system owns the physical environmental truth. Other systems consume exposure/context and own their own consequences.

## 1. Architectural choice

Use **regional fields + local sources + event-driven propagation**.

Do not run a separate independent weather simulation for every hex.
Do not attempt full atmospheric/fluid physics.
Do not write character injuries, settlement outages, or army readiness directly from Environment.

Regional weather provides broad continuous conditions. Local sources add hazards such as radiation hotspots, fire, smoke, contamination, flooding, and anomaly effects.

## 2. Ownership boundaries

### Environment owns

- world climate configuration
- seasonal baseline
- regional weather fields
- ambient temperature
- wind vector
- precipitation
- visibility modifiers caused by environment
- storm intensity
- environmental radiation fields / dose rates
- air/ground/water contamination fields
- active fire state
- smoke fields
- flood/water hazard state
- anomaly environmental fields
- hazard propagation and decay rules
- timestamps required for lazy simulation

### Hex World owns

- coordinates
- terrain
- elevation
- vegetation/roughness
- roads/bridges/tunnels
- strategic infrastructure location/state
- territorial control

Environment reads terrain/elevation/infrastructure as physical context but does not duplicate them.

### LIFE SIMULATION owns

- accumulated personal radiation dose
- carried contamination on body/clothing/equipment where individually tracked
- hypothermia/frostbite/heat injury
- breathing/health consequences
- illness and wound effects

Environment emits exposure; LIFE resolves the body.

### Settlement owns

- insulation
- heating demand/capacity
- utility failures
- firefighting capacity
- decontamination facilities
- local building damage and service consequences
- storage/production impacts

Environment supplies outside conditions and hazards.

### Army + Logistics owns

- formation fuel/water/filter stocks
- weather-driven logistics demand
- route throughput consequences after receiving environment context
- aggregate formation exposure state where required

### Combat owns

- battle consequences from visibility, wind, precipitation, smoke, temperature, radiation and terrain context

### Intelligence owns

- what each faction knows or estimates about weather/hazards
- confidence/precision/freshness of those assessments

Environment owns truth; Intelligence owns faction-relative knowledge.

## 3. World climate configuration

Each world/campaign may define:

- climate zones/regions
- annual/seasonal temperature curves
- day length / daylight cycle
- prevailing wind tendencies
- precipitation profile
- storm frequency/intensity profile
- regional humidity/dryness abstraction if useful
- persistent contamination/radiation baselines
- world seed

Rules must not assume one Earth-like climate for every future world/scenario.

## 4. Regional weather fields

Weather is simulated at a coarser regional resolution than strategic hexes.

A regional weather field may contain:

- field id
- covered region/cells
- temperature baseline
- pressure/front category
- wind direction/vector
- wind speed
- precipitation type/intensity
- cloud/visibility modifier
- storm intensity
- movement vector
- creation/update timestamp

Hexes sample/interpolate relevant fields rather than owning independent random weather rolls.

This produces coherent fronts instead of checkerboard weather.

## 5. Weather front movement

Regional weather may advance in scheduled/coarse steps.

A front can:

- enter/leave regions
- change intensity
- merge/split only if the implementation later needs it
- alter temperature, wind, precipitation and visibility

Do not require per-frame atmospheric motion.

Important event examples:

- cold front enters region
- snow intensity crosses threshold
- storm reaches settlement
- wind direction changes around active smoke/contamination source

## 6. Ambient temperature

Environment owns **ambient external temperature**.

Do not store `felt temperature` as universal truth because effective exposure depends on the entity.

Entity-specific effective exposure may consider:

- ambient temperature
- wind
- precipitation/wetness context
- shelter
- clothing/protection
- activity
- insulation

LIFE or Settlement resolves those entity-specific details.

## 7. Wind

Wind is a directional regional/environment variable with gameplay effects.

Possible effects:

- smoke transport
- airborne contamination transport
- fire spread direction/rate
- effective cold exposure
- observation quality
- ballistic/support modifiers only if Combat later justifies them
- drone/aviation constraints later

Use a vector/direction + intensity representation rather than only `windy = true`.

## 8. Precipitation

Potential categories:

- none
- rain
- heavy rain
- snow
- heavy snow/blizzard
- freezing precipitation
- anomaly precipitation later

Precipitation may affect:

- visibility
- road throughput
- terrain wetness/mud abstraction
- fire suppression
- cold exposure
- flooding risk
- equipment reliability

Do not make precipitation one generic global combat penalty.

## 9. Visibility

Environment provides environmental visibility context derived from:

- darkness/daylight if relevant
- precipitation
- fog/mist if introduced
- smoke
- dust/contamination cloud
- storm intensity

Terrain/cover remains Hex World truth.
Sensors and observer capability remain Intelligence/Army/Research capability.
Combat and Intelligence combine these inputs.

## 10. Seasons

Seasonal architecture exists from the start even if early gameplay uses a simplified cycle.

A season can modify regional baselines for:

- temperature
- daylight
- precipitation probability
- storm profile
- road/ground conditions
- agriculture later

Avoid hard coding four named seasons into every world; the world config may define its own cycle.

## 11. Radiation field vs accumulated dose

Keep these concepts strictly separate.

### Environment owns radiation field / dose rate

Example:

`Dose rate: 1.8 mSv/h`

### LIFE owns accumulated personal dose

Exposure event conceptual form:

`doseRate × duration × protection/transmission factor`

Environment does not permanently store an individual's dose.

Army-scale background personnel may use aggregate exposure summaries owned by the military/life integration layer.

## 12. Radiation sources

Potential sources:

- damaged reactor/facility
- fallout deposit
- contaminated wreck/storage
- anomaly/Signal source
- active research accident
- weapon/event source if future fiction requires it

A source may define:

- source id
- source type
- location
- emission intensity
- spatial falloff model
- active/inactive state
- start time
- decay/change model
- shielding/containment context if relevant

Do not require every stable source to tick continuously.

## 13. Persistent radiation hotspots

Stable hotspots can be represented compactly using:

- source parameters
- last evaluated timestamp
- deterministic decay/evolution function

When queried later, current intensity can be derived from elapsed time.

This is preferable to updating unchanged remote hotspots every second.

## 14. Contamination is not radiation dose

Keep separate environmental contamination media:

- airborne contamination
- ground/surface contamination
- water contamination

Contamination may be radioactive, chemical, biological later, or anomaly-specific, but only introduce types that create distinct gameplay.

Being exposed to radiation does not automatically mean an entity carries contamination home.

## 15. Carried contamination boundary

Environment owns external contamination fields.

When an entity crosses/occupies a contaminated area, Environment can emit exposure/deposition information.

Then:

- LIFE may store individual carried contamination
- Army/Expedition inventory/equipment state may store aggregate contaminated gear/cargo
- Settlement may store contamination on specific local facilities/cargo after transfer

This allows an expedition to leave a dangerous zone yet still bring contamination into a settlement.

## 16. Airborne contamination propagation

Use coarse/event-driven transport.

Conceptual chain:

`source emission -> wind transport -> dispersion -> deposition -> decay/cleanup`

Inputs may include:

- source intensity
- wind vector
- regional precipitation
- terrain shielding only at coarse level if useful
- particle/type-specific decay/settling rules

Avoid computational fluid dynamics.

## 17. Ground contamination

Ground contamination is comparatively persistent.

It can change through:

- deposition
- decay
- cleanup/decontamination
- excavation/disturbance if later useful
- flooding/water transport
- major destruction

It may alter route safety, settlement site quality, expedition risk and local resource usability.

## 18. Water contamination

Water contamination may affect:

- rivers/water sources
- settlement intake
- agriculture later
- expedition drinking-water access

Propagation should use explicit water-network/river relationships where available rather than radiating through hex adjacency arbitrarily.

Settlement owns purification and distribution consequences.

## 19. Fire

Fire is an active local environmental hazard.

A fire instance/field may track:

- location/area
- intensity
- available fuel abstraction
- spread potential
- smoke output
- ignition time
- suppression pressure
- last update timestamp

Potential ignition sources:

- combat
- damaged building/infrastructure
- industrial accident
- lightning/weather if desired
- sabotage
- anomaly event

## 20. Fire spread

Spread depends on understandable physical/contextual inputs:

- adjacent combustible terrain/structures
- wind
- dryness/weather
- barriers
- suppression/firefighting
- precipitation

Fire does not need per-object flame physics.

At strategic scale, spread can be evaluated by affected cells/regions and scheduled events.

At settlement/tactical scale, the scene may use finer visual/local resolution while returning the same authoritative hazard consequences.

## 21. Smoke

Smoke is a separate field from fire.

Smoke may persist/move after ignition location changes.

Effects may include:

- reduced visual observation
- reduced target acquisition
- health/breathing exposure
- air-quality impact
- concealment
- evacuation/route risk

Wind transports smoke.

Combat and Intelligence consume smoke context rather than Environment directly modifying their state.

## 22. Flooding and water hazard

Future flooding may come from:

- extreme precipitation
- river rise
- damaged dam/infrastructure
- broken water systems locally
- coastal/storm event if a world requires it

Strategic effects may include:

- impassable/degraded routes
- bridge/crossing stress
- building/infrastructure damage event
- contamination transport
- displacement/migration pressure

Use event/region models rather than full hydrodynamics.

## 23. Environmental hazard contract

New hazards should use a common high-level contract where practical:

- hazard id
- type
- source
- affected geometry/region
- intensity
- start time
- propagation rule
- decay rule
- exposure channels
- last evaluated timestamp

This makes hazards data-driven and keeps later anomaly types from requiring an entirely separate simulation architecture.

## 24. Signal/anomaly environment

Signal-driven environmental phenomena use the same environmental interfaces but can have unusual source/rule definitions.

Potential observable effects:

- radio interference
- electrical instability
- localized radiation spike
- temperature inversion
- abnormal fog/smoke-like field
- unusual wind/pressure behavior
- sensor disagreement

Crucially, Environment stores physical/anomalous truth but does not tell the player the causal explanation.

Research + Technology owns hypotheses/interpretation.
Intelligence owns observations and confidence.

## 25. Signal Storm concept

A future `Signal Storm` may be represented as a regional anomaly hazard/event with components such as:

- interference intensity
- environmental radiation modifier
- electrical disturbance
- visibility effect
- temperature/wind anomaly

Different components may have different spatial extents and timing.

Do not make `Signal Storm` a single arbitrary global debuff.

## 26. Environment -> Hex World

Hex World consumes current environment overlays for rendering/path context but does not duplicate authoritative environment fields permanently when derivable.

Useful displayed overlays:

- temperature
- storm
- radiation
- contamination
- fire/smoke
- flooding
- anomaly activity

The player may see faction-relative estimates through Intelligence rather than true values.

## 27. Environment -> Army + Logistics

Environment can affect logistics through explicit channels.

Examples:

- snow -> lower road throughput
- flood -> crossing disabled/degraded
- heat -> higher water demand
- cold -> higher fuel/heating demand
- contamination -> filter/protective-supply demand
- storm -> delay/route risk

Army + Logistics owns inventory and actual supply state.

## 28. Environment -> Combat

Combat receives a battle-start/current environment snapshot including relevant:

- temperature
- wind
- precipitation
- visibility
- smoke
- radiation/contamination
- active fire/flood hazard

Combat translates these into operational consequences through its own model.

Avoid one hidden `Weather -20%` modifier.

## 29. Environment -> Settlement

Settlement receives:

- outside temperature
- storm load
- precipitation/flood threat
- radiation rate
- contamination fields
- air quality/smoke
- active external fire hazard

Settlement then determines:

- heating/power demand
- building protection
- utility consequences
- firefighting/decontamination response
- production/service disruption

## 30. Environment -> LIFE SIMULATION

Environment emits exposure/context such as:

- ambient temperature
- wind
- wetness/precipitation context
- radiation dose rate
- contamination contact
- smoke/air exposure
- duration

LIFE combines those inputs with shelter, clothing, protective equipment, health and activity.

Environment never writes `hypothermia`, `frostbite`, `radiation sickness`, or organ damage directly.

## 31. Environment -> Expeditions

Expeditions use environmental truth/known estimates for:

- route risk
- equipment planning
- safe exposure windows
- sample contamination
- extraction decisions
- shelter/camp choices

Missing or bad intelligence can cause an expedition to encounter conditions worse than expected.

## 32. Environment -> Intelligence

Environment truth may be unknown to a faction.

Example true state:

`Radiation rate: 472 units`

Faction knowledge may be:

`Elevated radiation suspected`

then:

`Estimated 350–600`

then after sensor deployment:

`472 ± 15`

Intelligence owns those estimates.

## 33. Environment -> Research + Technology

Research may unlock:

- improved weather sensing
- radiation detectors
- contamination identification
- filtration/protection
- decontamination methods
- storm/anomaly instrumentation
- forecasting models

Research owns technology/hypotheses; Environment exposes measurable phenomena.

## 34. Environment -> Factions + Society

Environment does not directly create political support/grievance values.

It emits events/context such as:

- prolonged cold
- flood damage
- contaminated water source
- radiation evacuation
- repeated blackouts caused by storm

Settlement/LIFE material consequences then feed Factions + Society.

## 35. Forecasting

Forecasting is distinct from true future simulation state exposed to the player.

The server/world engine may know deterministic/seeded future weather evolution for simulation purposes, but the player receives a forecast with uncertainty based on:

- sensors
- communications
- research capability
- regional observation coverage
- Signal/anomaly interference

Forecast accuracy can therefore become strategic.

## 36. Environmental alerts

Alerts should explain actionable causes.

Examples:

`BLIZZARD APPROACHING — ETA 3h — confidence 78%`

`RADIATION SPIKE — SENSOR 04 — rising`

`SMOKE PLUME — moving southeast`

`FLOOD RISK — bridge route threatened`

UI should distinguish observation/forecast from confirmed present truth where Intelligence requires it.

## 37. Simulation LOD

### Tier A — active hazard / player region

Used for:

- current settlement crisis
- active battle
- player expedition
- rapidly spreading fire/smoke/contamination
- Signal storm

Use relatively frequent scheduled/event updates.

### Tier B — relevant region

Used for:

- nearby weather fronts
- supply corridors
- neighboring settlements
- known hazardous areas

Use coarse periodic updates.

### Tier C — stable background

Use compact field/source state and elapsed-time evaluation.

### Tier D — dormant

No update until queried or affected by a scheduled event/dependency.

## 38. Event-driven processing

Important events include:

- regional weather front entered region
- precipitation crossed threshold
- wind changed near active plume
- radiation source activated/deactivated
- contamination emitted/deposited
- fire ignited/spread/extinguished
- smoke entered/leaves region
- flood closed crossing
- anomaly field activated

Do not scan every hex every server tick.

## 39. Lazy elapsed-time evaluation

Stable environmental values should store sufficient state + timestamp to advance directly when needed.

Examples:

- radioactive decay
- stable source emission
- dormant contamination decay
- slowly cooling/burning state where a closed-form/coarse update is valid

Do not replay every missed second individually after an offline period.

## 40. Determinism

Use deterministic/seeded environmental events where practical.

For debugging/replay, important events should record:

- source event id
- seed where randomness is used
- starting state
- major generated transitions

Frame rate must not influence world hazard outcomes.

## 41. Data representation

Prefer compact integers/fixed-point values for persistent simulation where practical.

Avoid storing presentation labels such as `Very Cold` as authoritative state when they can be derived from temperature/exposure thresholds.

Avoid duplicating regional values into every hex unless caching is explicitly justified and invalidated safely.

## 42. Rendering boundary

Environment simulation state is not the same as visual effects.

The client may render:

- snow/rain
- fog
- smoke
- fire
- radiation/anomaly visual cues

But gameplay truth remains authoritative simulation data.

Low-end/mobile/Quest visual settings may reduce particles without changing gameplay conditions.

## 43. Audio integration

Environmental state can contribute dynamic audio layers.

Examples:

- wind intensity
- rain/snow storm texture
- Geiger/radiation texture
- distant fire
- thunder/structural rumble
- Signal storm interference

Audio responds to real state but does not own it.

## 44. Example systemic chain

`Signal storm approaches`
-> communications quality falls
-> Intelligence freshness degrades
-> army acts on older enemy assessment
-> unexpected contact creates Combat surprise disadvantage
-> bridge becomes damaged/unsafe during storm/battle
-> Army + Logistics route throughput collapses
-> fuel shipment to settlement falls
-> Settlement shuts nonessential industry to preserve heat/hospital power
-> living conditions worsen
-> LIFE/Factions + Society receive stress/grievance consequences

No one subsystem needs a special hard-coded script for the full chain.

## 45. Design invariants

1. Environment owns environmental truth, not entity consequences.
2. Radiation field and accumulated dose are never the same state.
3. Environmental contamination and radiation exposure are never collapsed into one universal value.
4. Weather is regional/coherent, not an independent random roll per hex.
5. Stable remote hazards do not require per-second ticks.
6. Signal/anomaly weather uses the same interface but may use unusual rules.
7. Intelligence mediates player/faction knowledge of hazards in hidden-information modes.
8. Visual quality settings never change authoritative environmental gameplay state.
9. Every major environmental penalty should be traceable to understandable channels, not one opaque multiplier.
10. v0.0.1 remains unaffected except for leaving clean future data boundaries.

## 46. Explicit non-goals for v0.0.1

Do not implement in the current first playable unless separately approved:

- dynamic global weather fronts
- radiation health simulation
- contamination spread
- fire propagation
- flooding
- seasons
- Signal storms
- forecasting
- detailed protective equipment

The current prototype remains focused on resources, Generator construction, persistence, audio, responsive UI, and at most a lightweight hex preview.

## 47. Future implementation order

Recommended later sequence:

1. environment data contracts
2. static temperature/radiation per test region
3. exposure interfaces into LIFE/Army/Settlement
4. regional weather fields
5. wind/precipitation/logistics effects
6. local fire/smoke
7. contamination transport
8. forecasting + Intelligence integration
9. Signal/anomaly environment
10. optimization/LOD validation at world scale

## 48. Definition of architectural success

This design is successful if the same environmental event can affect Hex World, Logistics, Combat, Settlement, LIFE, Intelligence, Research and Factions through explicit contracts without any subsystem duplicating another subsystem's authoritative state.
