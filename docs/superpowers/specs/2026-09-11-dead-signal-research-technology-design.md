# DEAD SIGNAL — Research + Technology System v0.1

Date: 2026-09-11
Status: Approved architectural direction; future research/progression system; out of scope for v0.0.1

## Purpose

Define a research and technology system for DEAD SIGNAL that turns laboratories, expeditions, recovered artifacts, engineers, doctors, industrial capacity, faction doctrine, and Signal/anomaly study into meaningful progression.

Research should not be a passive timer that grants abstract percentage bonuses. The system must create decisions, dependencies, risks, prototypes, strategic trade-offs, and consequences that connect directly to Settlement, LIFE SIMULATION, Army + Logistics, Hex World, Expeditions, and Factions + Society.

Core chain:

observation -> sample/data -> hypothesis/project -> experiment/prototype -> validation -> doctrine/deployment -> world consequences

## 1. Architectural principle

Use a project-based, data-driven research system with multiple knowledge domains and staged discovery.

Do not use one universal `science points` bar as the only research currency.

Separate at least:

- knowledge
- evidence/data
- personnel expertise
- laboratory capacity
- material/sample requirements
- risk
- prototype state
- field validation
- deployment/manufacturing readiness

The player can know how something works without yet being able to manufacture or deploy it at scale.

## 2. Knowledge domains

Recommended top-level domains:

- Survival Engineering
- Energy Systems
- Civil Infrastructure
- Medicine & Biology
- Materials & Manufacturing
- Communications & Sensors
- Military Engineering
- Logistics & Mobility
- Radiation & Contamination Science
- Signal Studies
- Anomaly Research
- Human Factors / Psychology
- Social Systems / Administration

Domains are data-driven and extensible.

A technology/project may belong to multiple domains.

## 3. Research objects

Research is organized around `projects`, not only tech-tree nodes.

A research project may contain:

- project id
- title
- description
- domain tags
- prerequisites
- discovery conditions
- required evidence categories
- required facilities
- minimum expertise
- material/sample inputs
- power requirements
- expected duration/work
- uncertainty
- risk profile
- possible outcomes
- prototype outputs
- doctrine/unlock outputs
- repeatable follow-up variants

Projects can be authored as content without hard-coding bespoke logic for every one.

## 4. Discovery vs development

Separate discovering a possibility from engineering it into usable technology.

Example:

1. Expedition recovers unusual shielding material.
2. Analysis reveals a new radiation-resistant structure.
3. Research project unlocks.
4. Scientists characterize the material.
5. Engineers produce a prototype filter/armor insert.
6. Field test confirms performance.
7. Manufacturing process is developed.
8. Settlement can now produce the item at scale.

This prevents exploration rewards from instantly becoming finished technology.

## 5. Evidence and research inputs

Projects may require evidence rather than generic points.

Evidence categories may include:

- field observations
- recovered documents
- sensor logs
- medical case data
- biological samples
- radiation samples
- anomaly samples
- machine components
- Signal recordings
- enemy equipment
- historical infrastructure plans
- captured technical manuals

Evidence can have quality, provenance, contamination, reliability, and freshness.

Poor evidence increases uncertainty or risk.

## 6. Facilities

Research capacity comes from real Settlement buildings/services.

Potential facilities:

- basic workshop
- engineering lab
- medical laboratory
- quarantine lab
- materials lab
- electronics lab
- signal analysis room
- radiation laboratory
- anomaly containment chamber
- weapons testing range
- computing/analysis center
- prototype workshop

Facility state affects what can be done safely and efficiently.

Relevant attributes may include:

- power availability
- equipment tier
- cleanliness
- containment rating
- staffing
- maintenance
- damage
- contamination
- security

A damaged or underpowered lab should not perform identically to a fully equipped one.

## 7. Research personnel

Researchers are connected to LIFE SIMULATION where useful.

Named personnel may have expertise such as:

- medicine
- mechanical engineering
- electronics
- chemistry
- physics
- biology
- psychology
- signal analysis
- anomaly studies
- field operations

They may also have traits affecting:

- caution
- creativity
- discipline
- ethics
- risk tolerance
- teamwork
- ideological bias

Do not require every lab worker to be fully simulated at all times. Background staff can be aggregated while important specialists remain named characters.

## 8. Expertise and institutional knowledge

Separate individual skill from institutional knowledge.

A settlement/faction may preserve knowledge through:

- research archives
- manuals
- blueprints
- training programs
- universities/schools later
- digital databases
- experienced personnel

If a key scientist dies, the faction should lose some capability but not necessarily forget an entire technology if documentation exists.

Conversely, a blueprint without skilled technicians may still be difficult to manufacture.

## 9. Research work model

Projects accumulate `work` through eligible facilities and staff rather than only elapsed real time.

Work rate may depend on:

- researcher expertise
- facility quality
- staffing
- power
- evidence quality
- project familiarity
- morale/stress
- interruptions
- collaboration bonuses

Research should be deterministic enough for planning while still allowing bounded uncertainty for genuinely experimental projects.

## 10. Risk and uncertainty

Not every project should be risky.

Use risk primarily where it creates meaningful gameplay, especially for:

- unstable anomaly samples
- high-radiation experiments
- experimental medicine
- prototype reactors
- Signal interaction
- containment research
- untested weapons/energy systems

Possible risk dimensions:

- personnel injury
- contamination
- equipment damage
- fire
- data loss
- sample loss
- false conclusion
- psychological effect
- political scandal
- containment breach

Risk should be visible/estimable rather than arbitrary hidden punishment.

## 11. Safety controls

Players can trade speed/cost for safety.

Possible controls:

- conservative protocol
- standard protocol
- accelerated protocol
- emergency/high-risk protocol

Higher-risk approaches may reduce time or evidence requirements but increase failure probability or consequences.

Facilities, expertise, maintenance, and containment can reduce risk.

## 12. Failure model

Failure should rarely mean `project resets to 0%`.

More interesting outcomes:

- partial data gained
- prototype damaged
- new side-project discovered
- sample consumed
- researcher injured
- facility contaminated
- wrong hypothesis identified and eliminated
- project branches to safer alternative

Even failed experiments can move knowledge forward.

## 13. Breakthroughs

Breakthroughs are contextual discoveries, not random loot-box jackpots.

They may occur when:

- high-quality evidence is combined
- experts from different domains collaborate
- field observations contradict current models
- rare samples are studied
- a failed prototype reveals a new mechanism

Breakthroughs may unlock optional branches, improved methods, or reduced future uncertainty.

## 14. Prototypes

Many technologies should require a prototype stage.

Prototype states may include:

- conceptual
- lab prototype
- engineering prototype
- field prototype
- validated design
- production-ready

A prototype can have temporary/per-unit stats different from the final product.

Players may choose to field unvalidated prototypes during crisis.

That can produce strong short-term advantages with reliability/safety risks.

## 15. Field testing

Some technologies require real-world validation.

Examples:

- radiation suit tested in contaminated zone
- new radio tested across difficult terrain
- medical treatment used on real patients
- vehicle suspension tested on hills/swamp
- armor tested under combat conditions

Field tests connect Research to Expeditions, Hex World, LIFE SIMULATION, and Army + Logistics.

## 16. Deployment and manufacturing

Research completion does not automatically create infinite equipment.

A completed technology may unlock:

- new building definition
- new recipe
- upgrade
- doctrine
- unit equipment option
- medical procedure
- infrastructure capability
- sensor type
- policy option

Manufacturing still requires Settlement production capacity, materials, workers, power, tooling, and logistics.

## 17. Technology readiness levels

Use a readable readiness model internally/for advanced UI.

Suggested stages:

1. Observed
2. Characterized
3. Experimental
4. Prototype
5. Field-tested
6. Production-ready
7. Mature

Not every technology must pass all seven stages.

## 18. Research branches

Avoid one giant linear tree.

Use a graph where discoveries can come from multiple paths.

Examples:

`Radiation Detection`
may lead toward:
- personal dosimeters
- area monitoring
- convoy route planning
- medical exposure tracking

`Signal Analysis`
may branch toward:
- improved communications
- anomaly forecasting
- psychological countermeasures
- risky interaction technologies

The player should be able to specialize.

## 19. Prerequisites

Prerequisites may include more than technologies:

- previous project
- discovered location
- specific sample
- faction contact
- specialist skill
- facility tier
- policy/ethical permission
- strategic event

This allows the world to shape the research path.

## 20. Reverse engineering

Recovered foreign or pre-collapse equipment can be reverse engineered.

Possible outputs:

- understanding component
- repair capability
- partial blueprint
- local substitute design
- full reproduction
- countermeasure

Reverse engineering depends on equipment condition, expertise, facilities, and documentation.

A captured advanced weapon should not always instantly unlock mass production.

## 21. Medical research

Medicine integrates tightly with LIFE SIMULATION.

Possible projects:

- infection control
- trauma surgery
- blood preservation
- radiation treatment
- contamination detoxification
- prosthetics
- diagnostics
- quarantine protocols
- vaccines/antimicrobials for fictional diseases

Medical advances may unlock procedures rather than generic stat bonuses.

Example:

`Advanced Hemorrhage Control`
can reduce preventable battlefield deaths if medics possess supplies and training.

## 22. Energy research

Energy is a major strategic domain.

Possible directions:

- generator efficiency
- fuel substitution
- battery storage
- microgrids
- heat recovery
- grid stabilization
- radiation-hardened electronics
- experimental energy systems later

Research should interact with real settlement networks and maintenance requirements.

## 23. Signal research

The Signal is a central mystery and should not become a conventional tech tree too early.

Signal research may advance through uncertain `understanding states` rather than simple levels.

Possible categories:

- detection
- pattern classification
- source triangulation
- physiological effects
- psychological effects
- environmental correlations
- transmission behavior
- interference/countermeasures
- controlled interaction

The system should preserve mystery by allowing conflicting hypotheses until evidence resolves them.

## 24. Hypotheses

For mysterious phenomena, the faction may maintain competing hypotheses.

A hypothesis stores:

- claim
- supporting evidence
- contradicting evidence
- confidence
- responsible research group

New observations update confidence.

The player sees uncertainty rather than omniscient truth.

This is particularly useful for Signal/anomaly lore.

## 25. Anomaly research

Anomalies require containment and field science.

Potential research areas:

- detection
- classification
- environmental effects
- safe approach distance
- shielding
- sample handling
- containment
- prediction
- exploitation

Research can unlock safer expedition protocols before it unlocks exploitation.

That ordering matters thematically.

## 26. Ethical/political boundary

Some projects create political consequences through Factions + Society.

Examples:

- human experimentation
- forced medical trials
- dangerous anomaly exposure
- surveillance technologies
- ideological conditioning
- restricted medicines

The research system records the action/project; Factions + Society determines legitimacy, bloc reaction, diplomacy, or resistance consequences.

Do not duplicate political simulation inside Research.

## 27. Secrecy and classification

Projects may have secrecy levels.

Potential reasons:

- military advantage
- dangerous knowledge
- faction politics
- panic prevention
- intelligence protection

Secrecy can reduce knowledge spread but may increase political mistrust or espionage value.

Detailed espionage belongs in a future Intelligence system.

## 28. Knowledge sharing and diplomacy

Factions may trade or share:

- blueprints
- research data
- medical protocols
- samples
- training
- licenses/production rights

Technology exchange should be an explicit diplomatic asset.

Receiving a blueprint may reduce research work but still require local manufacturing capability.

## 29. Research sabotage and disruption boundary

Research can receive events such as:

- lab damaged
- sample stolen
- scientist kidnapped
- power outage
- archive destroyed
- contamination event

The detailed cause may come from war, espionage, disaster, or settlement failure.

Research only handles project consequences.

## 30. Research queues and parallelism

Do not force one global research slot.

Parallel research capacity depends on facilities and staff.

A settlement with:

- one engineering lab
- one medical lab

can reasonably progress one engineering and one medical project simultaneously.

Large factions may distribute projects across multiple settlements.

## 31. Multi-settlement research

Large projects can involve distributed work.

Example:

- sample analysis in secure lab
- materials testing in industrial city
- field testing near anomaly zone
- manufacturing study at factory hub

Project tasks may be completed at different locations and synchronized through communications/logistics.

This creates strategic value for specialized settlements.

## 32. Research logistics

Evidence, prototypes, samples, and specialist equipment are physical where appropriate.

If a sample must travel from expedition site to lab, Army + Logistics/Settlement routes matter.

Dangerous samples may require:

- secure container
- escort
- refrigeration
- radiation shielding
- quarantine transport

Research therefore cannot ignore the physical world.

## 33. Computing and analysis

Some projects consume computation/analysis capacity rather than physical lab capacity.

Possible future resources:

- computing nodes
- archived datasets
- signal-processing capacity

Do not introduce a separate overly detailed compute economy until it affects real gameplay.

## 34. Research cost model

A project may consume:

- staff work-hours
- electricity
- consumables
- rare samples
- prototype materials
- machine time
- medical subjects/cases where ethically appropriate fictional data is used

Avoid charging arbitrary `research currency` unless it represents a meaningful abstraction.

## 35. Research UI

The player should answer four questions quickly:

1. What are we trying to learn/build?
2. Why can/can't we do it now?
3. What does it cost/risk?
4. What happens if it succeeds?

Suggested project card fields:

- Project
- Stage
- Required facility
- Assigned team
- Evidence completeness
- Risk
- Estimated work
- Missing dependencies
- Expected unlocks

For mystery projects, show uncertainty explicitly.

## 36. Notifications

Important research events:

- project discovered
- project started
- missing prerequisite
- breakthrough
- prototype ready
- field test available
- accident
- validation complete
- production-ready

Avoid notification spam for routine progress ticks.

## 37. AI research prioritization

AI factions choose research based on strategic need and identity.

Inputs may include:

- shortages
- military threats
- ideology
- available experts
- territory/resources
- recent disasters
- doctrine
- access to samples

A technocratic faction may invest aggressively in Signal analysis while a conservative faction focuses on safe infrastructure and medicine.

## 38. Simulation LOD

Research does not require per-second simulation.

### Active projects

- event/work-interval updates
- exact staffing/facility dependencies

### Background faction research

- coarse progress blocks
- strategic outcome events

### Dormant factions/settlements

- no continuous calculations
- evaluate when relevant event/time checkpoint occurs

Project progress should be computed from elapsed work intervals, not browser frame rate.

## 39. Event-driven model

Relevant events include:

- evidence acquired
- lab powered/unpowered
- specialist assigned/removed
- sample arrived
- facility damaged
- project stage completed
- prototype field test completed
- research accident
- political restriction enacted

No system should scan every technology node continuously.

## 40. Determinism and RNG

Routine research work is deterministic.

Experimental uncertainty uses seeded RNG tied to project/stage/event identifiers so outcomes can be reproduced for debugging.

Visible risk estimates should match actual probability bands closely enough for player trust.

## 41. Data ownership boundaries

### Research + Technology owns

- projects
- research stages
- evidence requirements
- hypotheses
- project work/progress
- prototypes
- technology readiness
- knowledge unlocks

### Settlement owns

- facilities
- power
- workers
- production
- storage
- maintenance

### LIFE SIMULATION owns

- named researcher health
- personality
- skill/expertise
- stress/relationships

### Army + Logistics owns

- transport routes
- military field testing context
- equipment deployment state

### Hex World owns

- research site locations
- terrain/environment context
- anomaly/radiation spatial state

### Factions + Society owns

- ethics/policy
- legitimacy consequences
- knowledge diplomacy
- political reaction

Do not duplicate these authoritative states inside the research system.

## 42. Signature DEAD SIGNAL examples

### Generator Harmonic Stabilization

Inputs:
- damaged industrial generator logs
- engineering lab
- experienced technician

Outputs:
- improved grid stability
- reduced generator failure chance
- new audio stem variation for stable power state

### Adaptive Radiation Filter

Inputs:
- contaminated material sample
- medical + materials expertise
- controlled test environment

Outputs:
- new filter recipe
- improved expedition endurance in radiation zones

### Signal Phase Classification

Inputs:
- multiple Signal recordings from different regions
- signal analysis room
- computing capacity

Outputs:
- new map overlay showing correlated Signal activity
- unlocks competing hypotheses
- may alter ambient audio layers

### Anomaly Containment Frame

Inputs:
- anomaly sample
- containment lab
- engineering prototype materials

Outputs:
- safer storage/transport of certain anomaly samples
- enables higher-tier anomaly research

## 43. Progression philosophy

Technology should change what the player can do, not only numbers.

Prefer unlocks such as:

- new route through hazardous terrain
- new medical procedure
- new settlement network behavior
- new sensor overlay
- new prototype equipment
- new diplomatic trade asset
- safer anomaly access

Use flat percentage bonuses sparingly and attach them to understandable mechanisms.

## 44. Scope boundary

None of this belongs in DEAD SIGNAL v0.0.1.

The current prototype remains:

- settlement shell
- Metal / Food / Power / People
- Generator construction
- local save
- dynamic generator audio
- minimal hex preview
- responsive browser UI

Research is introduced only after the settlement/survival/exploration loops are stable enough to generate meaningful evidence, facilities, and choices.

## 45. Self-review decisions

- No universal science-points-only economy.
- Discovery, research, prototype, validation, and production are separated.
- Research consumes real settlement capability and world evidence.
- Mystery research supports uncertainty/hypotheses.
- Failure produces consequences and partial learning rather than pure reset.
- Production remains owned by Settlement.
- Politics remains owned by Factions + Society.
- Detailed personnel state remains owned by LIFE SIMULATION.
- Large worlds use event-driven/coarse research updates.
- No research mechanics added to v0.0.1.
