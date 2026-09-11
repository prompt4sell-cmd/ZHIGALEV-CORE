# DEAD SIGNAL — LIFE SIMULATION System v0.1

Date: 2026-09-11
Status: Approved future direction; explicitly out of scope for v0.0.1

## Purpose

Give DEAD SIGNAL characters RimWorld-like systemic depth without copying RimWorld content, UI, names, or exact mechanics.

Characters should be strategically meaningful people whose needs, personalities, conversations, friendships, attraction, conflicts, beliefs, memories, wounds, diseases, treatment, and losses can propagate upward into squads, settlements, factions, and global strategy.

The design must support both a handful of richly simulated named characters and very large background populations without requiring full-detail simulation for every person every second.

## 1. Core principle: detailed people, scalable population

The simulation uses multiple detail tiers.

### Tier A — active characters

Used for characters currently visible, selected, fighting, hospitalized, involved in important social events, or otherwise narratively/strategically relevant.

Simulate:

- needs/desires
- current activity/task
- health/body-part conditions
- pain/consciousness/function
- meaningful social interactions
- relationship updates
- important memories
- local environmental exposure

### Tier B — relevant off-screen characters

Used for named squad members, settlement leaders, doctors, specialists, close relations, and characters in active missions.

Simulate the same conceptual systems at reduced frequency and with fewer micro-interactions.

### Tier C — background named population

Used for people who exist individually but are not currently important.

Simulate through scheduled events, daily summaries, sparse relationships, and aggregate work/health/social outcomes.

### Tier D — population cohorts

Used for thousands of ordinary residents or soldiers who do not need persistent individual identity.

Store demographic/work/health/morale cohorts rather than full persons.

Promote a cohort member into a named detailed character when gameplay makes them important. Demote inactive detailed characters only when identity/history can be preserved safely.

This tiering is mandatory for large settlements and persistent strategic worlds.

## 2. Character identity

A detailed character may contain:

- stable character ID
- generated/display name
- age category / adult status
- role/profession
- faction/settlement affiliation
- squad/work assignment
- skills
- personality vector
- needs state
- health state
- belief/ideology state later
- sparse relationship edges
- important memory/event history
- simulation tier
- last evaluated timestamp

Do not store every derived UI label as authoritative state. Store core values and derive labels such as `Exhausted`, `Trusted Friend`, or `Critical Blood Loss`.

## 3. Needs and desires

Use internal normalized integer values, recommended 0–1000, rather than floating UI percentages.

Initial future need families:

| Need | Meaning | Typical low-state consequence |
| --- | --- | --- |
| Hunger | food/energy need | fatigue, health risk, irritability |
| Rest | sleep/recovery | slower work, bad decisions, combat penalty |
| Comfort | physical living quality | mood/stress pressure |
| Safety | perceived physical security | fear/stress, avoidance |
| Social contact | desire for interaction | loneliness/social-seeking |
| Solitude | desire for private space | irritation from crowding |
| Recreation | mental decompression | stress accumulation |
| Intimacy/romance | adult romantic closeness | social/relationship pressure only |
| Respect | desire to be valued | resentment/status seeking |
| Status | desire for influence/position | ambition/conflict |
| Purpose/faith | need for meaning | ideological/religious seeking |
| Autonomy | control over own life | resistance, dissatisfaction |

Not every character values every need equally.

Each character has need sensitivity/preference weights so two people in identical conditions can react differently.

Needs should create pressure and action preference, not directly hard-script behavior.

## 4. Personality model

Represent personality as stable or slowly changing dimensions, preferably normalized integer vectors.

Potential dimensions:

- sociability
- introversion/solitude preference
- empathy
- aggression
- risk tolerance
- discipline
- loyalty
- ambition
- jealousy tendency
- curiosity
- stress resilience
- ideological openness
- religiosity/spiritual receptiveness
- authority preference
- altruism/self-preservation balance

Named trait labels may be derived for UI, but system behavior should use underlying values.

Personality influences:

- which needs become urgent
- social interaction choices
- relationship change magnitude
- willingness to take risks
- response to authority
- susceptibility to panic/stress
- attraction/compatibility probabilities
- conflict probability
- ideological shifts

Personality changes probabilities and thresholds; it does not remove player uncertainty by making characters deterministic robots.

## 5. Decision model

Use a utility/priority model for autonomous decisions.

Candidate actions receive scores from:

- urgent physiological needs
- assigned duty/order
- personality
- relationships
- danger
- morale/stress
- belief/ideology
- health limitations
- local opportunity
- recent memory

Example:

A tired medic may still continue surgery because duty and a close relationship to the patient outweigh the rest need, while another medic may stop earlier.

Player orders can strongly influence utility but should not magically remove physical impossibility, panic, unconsciousness, or severe moral/social consequences.

## 6. Mood, stress, and emotional pressure

Do not use one permanent `happiness` stat as the entire psychology system.

Track at least:

- short-term mood
- stress load
- acute fear
- social satisfaction
- grief pressure
- exhaustion pressure

These are derived/updated from needs, environment, memories, relationships, pain, ideology, workload, and events.

Severe stress can increase probability of:

- mistakes
- arguments
- refusal/avoidance
- panic/flee behavior
- reduced work quality
- poor sleep
- relationship conflict

Avoid making mental states purely random punishment; players should usually be able to understand major causes.

## 7. Social graph

Do not create a full relationship matrix for every pair of people.

Store a sparse relationship graph only when two characters have meaningful history or current relevance.

Potential relationship dimensions:

- familiarity
- opinion/affection
- trust
- respect
- fear
- attraction
- friendship strength
- rivalry/hostility
- commitment
- grief/attachment importance
- ideological compatibility

Relationship values are directional where appropriate.

Character A may trust B more than B trusts A.

## 8. Social interactions

Important social actions can include:

- casual conversation
- work conversation
- sharing food/rest
- joking/recreation
- helping
- comforting
- arguing
- insulting
- apologizing
- thanking
- mentoring
- asking for support
- flirting
- expressing romantic interest
- forming/ending a relationship
- ideological/religious discussion
- giving orders
- refusing/challenging authority

Interactions generate relationship deltas and sometimes memories.

Routine chatter does not need permanent history; only significant events become durable memories.

## 9. Romance and flirting

Romance/flirting is a social system, not explicit sexual simulation.

Romantic interaction applies only to adult characters.

Attraction/romantic willingness may depend on:

- familiarity
- personality/preferences
- current relationship status
- attraction
- trust
- stress
- mood
- ideology/culture later
- recent interactions
- consent/willingness state

A flirt attempt can be welcomed, ignored, declined, or damage the relationship depending on context.

The player should influence conditions and social opportunities rather than directly forcing every relationship outcome.

## 10. Memories

Persist only strategically or emotionally meaningful memories.

A memory contains:

- event type
- source characters/entities
- timestamp
- intensity
- emotional tags
- decay profile
- relationship effects
- optional ideological effect

Examples:

- rescued by another character
- abandoned while wounded
- survived battle together
- witnessed death
- lost partner/friend
- severe injury
- starvation period
- successful medical treatment
- betrayal
- major victory
- humiliation
- promotion
- religious/anomalous experience

Memories decay at different rates. Some can become long-term identity events.

## 11. Health architecture

Health is body-part/state based rather than a single HP bar.

A character has a body definition containing parts/organs and functional relationships.

Initial human body abstraction may include:

- head
- brain
- eyes
- jaw
- neck
- torso
- heart
- lungs
- abdomen
- liver/kidneys as optional internal abstractions
- left/right arm
- left/right hand
- left/right leg
- left/right foot

The model should be detailed enough for strategic consequences but not a medical textbook simulation.

Species/mutants may later use different body definitions.

## 12. Functional capacities

Derive gameplay capacities from body/health state.

Recommended functions:

- consciousness
- mobility
- manipulation
- vision
- breathing
- circulation
- cognition
- pain load
- work capacity

Jobs and combat actions declare required capacities.

Examples:

- severe leg injury reduces mobility
- injured hand/arm reduces manipulation and weapon effectiveness
- damaged eyes reduce vision
- blood loss reduces consciousness/stamina
- lung injury reduces breathing/endurance
- extreme pain reduces effective work/combat performance

## 13. Wound model

A wound is attached to a body part.

Possible wound types:

- cut/laceration
- puncture
- gunshot
- shrapnel
- blunt trauma
- fracture
- burn
- crush injury
- bite
- chemical injury
- radiation tissue damage
- frostbite
- heat injury

Wound state may include:

- severity
- bleeding rate
- contamination
- infection risk
- pain
- tissue damage
- foreign object/shrapnel later
- treatment state
- healing progress

The system should support multiple simultaneous wounds.

## 14. Blood and bleeding

Track blood loss as a systemic state derived from active bleeding sources.

Bleeding wounds contribute rates; treatment can reduce/stop rates.

Blood loss affects:

- stamina
- consciousness
- shock/collapse risk
- survival probability

Do not require per-frame fluid simulation. Use scheduled health progression/event calculations.

## 15. Pain

Pain is derived from injuries/disease and modified by treatment/medication.

Pain influences:

- work efficiency
- combat accuracy/coordination
- sleep
- mood/stress
- consciousness at extreme levels

Characters can continue functioning through pain depending on severity, personality, training, medication, and adrenaline/acute state.

## 16. Infection and disease

Separate wound infection from communicable disease.

### Wound infection

Risk depends on:

- wound type
- contamination
- treatment delay
- environment
- cleanliness
- immune/health state abstraction
- medical quality

### Communicable disease

Disease definitions may include:

- exposure route
- incubation period
- contagious stage
- symptom stages
- severity
- immunity/recovery profile
- treatment modifiers

Disease spread should use contact/location aggregation where possible rather than checking every person against every other person.

## 17. Radiation and contamination

Keep radiation exposure conceptually separate from environmental contamination.

Possible states:

- current dose rate from environment
- accumulated exposure/dose
- contamination carried on clothing/body/equipment
- acute radiation effects
- long-term health modifiers later

Protective gear changes exposure rate.

Decontamination can reduce carried contamination without erasing accumulated dose.

On the global strategic layer, armies use aggregate exposure; named active characters may receive detailed individual exposure when relevant.

## 18. Temperature-related health

Future cold/heat systems can produce:

- cold stress
- hypothermia
- frostbite
- heat exhaustion
- heat injury

Risk depends on:

- ambient temperature
- wind/weather
- clothing/protection
- wetness
- shelter/heating
- activity
- duration
- health

Global map temperature remains an environment input; detailed body effects are calculated only for relevant characters.

## 19. Medical treatment model

Treatment is a resource/capacity system, not an instant button.

Treatment quality can depend on:

- doctor/medic skill
- facility quality
- medicine/equipment
- power
- cleanliness
- workload/overcrowding
- treatment delay
- patient condition

Possible actions:

- first aid
- stop bleeding
- clean/disinfect wound
- splint fracture
- pain treatment
- antibiotics/anti-infective treatment when appropriate
- surgery
- extraction/removal of foreign material later
- transfusion/advanced support later
- quarantine
- rehabilitation
- prosthetic fitting later

## 20. Triage and hospital capacity

Medical facilities have finite beds, staff time, equipment, medicine, and power.

Triage categories can be derived from urgency and survivability.

The player may set policy priorities, but medical AI can recommend ordering.

A mass-casualty event can create strategic consequences:

battle losses -> wounded return -> clinic overload -> medicine/power consumption -> reduced workforce -> deaths/disability -> morale/grief -> political/faction pressure

This chain is a key DEAD SIGNAL systemic goal.

## 21. Healing and rehabilitation

Healing uses scheduled progression rather than constant frame updates.

Healing rate may depend on:

- wound type
- treatment
- nutrition
- rest
- infection
- age/health abstraction
- facility conditions

Some injuries can leave:

- scars
- reduced function
- chronic pain
- missing limbs/parts
- long recovery
- trauma memories

Recovery can produce veterans with history rather than simply resetting a character to perfect condition.

## 22. Death and incapacity

Death should be a systemic result of critical organ/function failure, catastrophic injury, blood loss, disease, exposure, or untreated conditions, not only `HP <= 0`.

Temporary incapacity may result from:

- unconsciousness
- shock/collapse
- severe pain
- immobilizing injury
- sedation/treatment

The strategic layer may aggregate unnamed casualties, while important named characters retain explicit outcomes.

## 23. Skills and medicine/work integration

Relevant skills may include:

- medicine
- surgery
- first aid
- combat medicine
- research
- engineering
- logistics
- leadership
- social/negotiation

Skill affects probability, speed, and quality rather than guaranteeing outcomes.

A highly skilled doctor with no power/medicine should still face hard constraints.

## 24. Work capability

Each job declares capacity thresholds and skill preferences.

Example:

A construction job may require mobility + manipulation.

A sniper role may require strong vision + manipulation + consciousness.

A radio operator may tolerate low mobility but require cognition/manipulation.

This allows injuries to change what a person can still contribute instead of making every wound a binary `can/cannot work` state.

## 25. Squad integration

Detailed character states aggregate upward into squad/formation outputs.

Examples:

- injured members reduce manpower/readiness
- exhausted members slow marching
- low trust in leadership can reduce cohesion
- close relationships can improve cooperation but create emotional consequences from casualties
- experienced wounded veterans may later become instructors
- a medic's survival changes squad medical capability

The global map consumes aggregate formation values and does not individually tick every soldier.

## 26. Settlement integration

Settlement systems consume summarized LIFE SIMULATION outputs such as:

- available workforce
- sick/wounded count
- hospital occupancy
- social stability
- stress/grief pressure
- ideological tension
- relationship/family/social network effects later

Settlement policies feed back into characters:

- rationing
- work shifts
- curfew
- medical priority
- housing
- religious freedom/control
- military conscription
- recreation access

## 27. Faith and ideology integration

Faith/ideology is a future linked subsystem, not a replacement for personality.

A character can have:

- belief affiliation
- belief intensity
- ideological compatibility with others
- trust in faction leadership
- reaction to anomalous events

Beliefs can influence purpose need, relationships, political loyalty, willingness to fight, and interpretation of memories.

Important events may change beliefs gradually or dramatically depending on personality/history.

## 28. Conflict, discipline, and authority

Characters can disagree with orders without turning the game into random disobedience.

Order compliance may depend on:

- legality/policy later
- trust/respect for commander
- discipline
- fear
- ideology
- perceived danger
- relationship stakes
- current stress
- severity of order

Consequences can include hesitation, complaint, refusal, desertion, mutiny, or compliance with resentment at extreme states.

Most routine orders should remain reliable; dramatic resistance should be understandable and uncommon enough to feel meaningful.

## 29. Social event scaling

Avoid `N²` social simulation.

Use locality/opportunity:

- workplace
- squad
- housing
- recreation area
- hospital ward
- religious/social venue
- expedition group

Only characters with plausible contact generate interaction candidates.

Background cohorts generate aggregate social outcomes rather than pairwise conversations.

## 30. Simulation scheduling

Prefer event/scheduled progression.

Examples:

- hunger/rest thresholds schedule reconsideration
- wound schedules next health progression check
- bleeding schedules urgent updates
- disease stage schedules next transition
- social interaction occurs when two relevant characters share opportunity
- memory decay can be evaluated lazily from timestamp

Do not evaluate every subsystem for every character every rendered frame.

## 31. Offline progression

Single-player/local simulation stores timestamps.

When the game resumes:

- deterministic elapsed need progression can be integrated
- health progression can be resolved from scheduled events
- routine background social/work outcomes can be summarized

Do not literally replay every missed second.

Shared online worlds later use backend authority.

## 32. Determinism and debugging

Use seeded/event-based RNG for important simulation outcomes when practical.

An event should be reproducible from:

- stable IDs
- simulation time/event ID
- rule version
- seed

This supports debugging, replays, balancing, and server consistency.

## 33. Character UI concept

A detailed character screen should eventually expose understandable causes rather than raw formulas.

Primary sections:

- Overview
- Needs
- Health
- Social
- Skills
- Beliefs
- History/Memories

Example summary:

`Mobility: 62% — fractured right leg`

`Stress: High — recent battle, friend killed, poor sleep`

`Trusts Mara: 81% — rescued during Tunnel 7 expedition`

The player can inspect why a state exists.

## 34. Health UI concept

Use a readable body diagram/list with body-part conditions.

Example:

`Right leg — fracture — stabilized`

`Torso — shrapnel wound — bleeding controlled — infection risk 18%`

`Blood loss — moderate`

`Pain — high`

`Consciousness — 78%`

Avoid cluttering the main settlement UI; deep health detail belongs in the character/medical view.

## 35. Medical management UI

The medical screen may show:

- patient
- urgency
- key conditions
- assigned bed
- assigned medic/doctor
- treatment queue
- medicine/equipment requirements
- expected risk/outcome range
- quarantine status

Policy controls can prioritize soldiers, children/families later, specialists, civilians, or pure medical urgency depending on faction rules. Such policies should have social/ideological consequences.

## 36. Audio integration

LIFE SIMULATION contributes summarized signals to the layered soundtrack.

Possible signals:

- hospital overload
- epidemic pressure
- grief/casualty pressure
- social stability
- civil conflict
- faith intensity
- population celebration

Do not create an audio voice/stem for every character.

The audio system receives settlement-level summaries.

## 37. Performance invariants

1. Never maintain a full pairwise social matrix for the entire population.
2. Never update every detailed need every rendered frame.
3. Remote/background populations use cohorts and scheduled summaries.
4. Body-part simulation exists only for detailed named/relevant characters.
5. Strategic formations use aggregate health/readiness except for linked important characters.
6. Memories are sparse significant events, not a transcript of every interaction.
7. Derived values are recomputed/lazily evaluated when cheaper than persistence.
8. Relationship interactions require plausible contact/opportunity.

## 38. Data boundary with Hex World

The global hex system provides environmental/strategic inputs such as:

- location
- temperature
- radiation
- contamination
- battle state
- supply/medical access
- settlement access

LIFE SIMULATION returns summarized consequences such as:

- effective manpower
- readiness
- wounded/sick counts
- mobility constraints
- morale/stress pressure
- leadership/social effects

The global world does not need to know the internal wound list for every soldier.

## 39. Future acceptance scenarios

### Different people, same environment

Two characters kept in a crowded shelter react differently because one strongly values social contact while the other strongly values solitude.

### Relationship from history

Two characters who survive several dangerous expeditions together gain trust; if one later abandons the other while injured, the relationship changes sharply and creates a durable memory.

### Flirting

An adult character with attraction and trust may attempt flirtation during appropriate social opportunity; a declined attempt does not automatically create hostility, while repeated/contextually inappropriate behavior can reduce opinion/trust.

### Wounded soldier

A gunshot wound to the leg causes bleeding, pain, and reduced mobility. First aid stops most bleeding, treatment lowers infection risk, but mobility remains impaired until healing/rehabilitation.

### Mass casualties

A returning wounded formation overloads hospital beds and medics, increasing treatment delays and consuming medicine/power rather than resolving all casualties instantly.

### Disease outbreak

A contagious disease spreads primarily through shared locations/contact groups. Quarantine reduces spread but harms work output and can create morale/political pressure.

### Strategic scaling

A city with 20,000 residents does not create 20,000 fully ticking detailed characters. Most remain cohorts/background while a limited relevant set stays detailed.

### Character promotion

A background soldier who performs a strategically important rescue can become a named detailed character with generated history linked to the event.

## 40. Scope boundary

None of this enters DEAD SIGNAL v0.0.1.

The current milestone remains narrowly limited to:

- settlement resource display
- Generator construction
- local persistence
- dynamic Generator audio layer
- minimal axial hex preview
- responsive browser/Quest/mobile UI
- QA/tests

The LIFE SIMULATION architecture exists now so later character depth can be added without forcing a rewrite of the strategic, settlement, or persistence foundations.

## 41. Follow-up designs before implementation

Before implementing full LIFE SIMULATION, create focused designs for:

- body definitions and wound progression
- disease/epidemic model
- social utility/interaction engine
- relationship/romance state machine
- memory/stress model
- medical facility/triage queues
- population cohort promotion/demotion
- strategic casualty aggregation/de-aggregation

These should be separate implementation cycles rather than one giant feature branch.
