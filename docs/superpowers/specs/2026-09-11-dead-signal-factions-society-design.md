# DEAD SIGNAL — Factions + Society System v0.1

Date: 2026-09-11
Status: Approved architectural direction; future political/social strategic system; out of scope for v0.0.1

## Purpose

Define how DEAD SIGNAL models factions, ideology, faith, legitimacy, loyalty, diplomacy, internal politics, occupation, resistance, trade, civil conflict, and territorial integration without turning every settlement or NPC into a full political simulation every second.

This system sits between LIFE SIMULATION, Settlement, Army + Logistics, and Hex World.

Core chain:

character -> household/social group -> settlement blocs -> faction -> diplomacy -> territorial control

The player should be able to win a battle but still fail politically. Capturing a hex is not the same as controlling the people living there, and controlling a population is not the same as earning legitimacy.

## 1. Architectural principle

Use a layered political simulation with event-driven updates and simulation LOD.

Do not model politics as one universal `loyalty` percentage.

Keep separate concepts for:

- legal/nominal ownership
- military control
- civilian compliance
- legitimacy
- ideological support
- fear/coercion
- resistance activity
- administrative capacity
- faction influence

These values interact but are not interchangeable.

## 2. Faction identity

A faction is a persistent strategic organization with its own goals, institutions, doctrine, relationships, territory, economy, armed forces, and population base.

A faction may contain:

- name and identifiers
- emblem/colors
- origin/history tags
- government/organizational model
- ideological profile
- faith/religious profile if relevant
- leadership structure
- laws/policies
- strategic goals
- diplomatic posture
- controlled settlements/territories
- military organizations
- treasury/resources
- trade agreements
- claims
- legitimacy sources
- internal blocs

Faction identity is data-driven so new factions can be authored without new code paths.

## 3. Ideology model

Ideology should be multidimensional rather than a single left/right slider.

Possible ideological axes or tagged positions may include:

- centralization <-> local autonomy
- militarism <-> civilian priority
- collectivism <-> individual autonomy
- technocracy <-> tradition
- openness <-> isolationism
- hierarchy <-> egalitarianism
- expansionism <-> defensive survival
- secularism <-> spiritual/religious orientation
- risk acceptance <-> preservation
- human-first <-> transhuman/anomaly acceptance

Do not expose every axis directly to the player. UI can summarize ideology using names, blocs, and major disagreements.

Ideology affects preferences and political reactions, not deterministic behavior.

## 4. Faith and belief

Faith is a separate but interacting system.

A settlement or character may have:

- religion/faith identity
- intensity/commitment
- spiritual needs
- sacred places or practices
- tolerance toward other beliefs
- relation to the Signal/anomalies

Possible future belief families could include completely original DEAD SIGNAL concepts such as:

- Signal mysticism
- restorationist traditions
- survivalist ancestor cults
- rationalist/technocratic secularism
- anomaly reverence
- syncretic local faiths

Names and lore should remain original and not depend on external IP.

Faith can influence morale, cohesion, legitimacy, diplomacy, resistance, ceremonies, holidays, and soundtrack layers.

## 5. Political blocs inside a settlement

A settlement should not require every resident to be simulated politically at full detail.

Instead, population can be summarized into blocs such as:

- workers
- military families
- merchants/traders
- technicians/scientists
- religious communities
- displaced refugees
- veterans
- local old-guard residents
- recent settlers
- faction-aligned organizations

A bloc may store:

- population share
- ideological distribution
- faith distribution
- satisfaction
- trust in government
- fear/coercion
- material condition
- political organization strength
- grievance intensity
- preferred policies

Named/important characters from LIFE SIMULATION can influence or lead these blocs.

## 6. Support, compliance, legitimacy, and fear

Keep these distinct.

### Support

How much a population actively wants the ruling faction/government to succeed.

### Compliance

How much the population currently follows orders/laws.

High compliance can exist with low support under occupation.

### Legitimacy

How justified or rightful the government is perceived to be.

Sources may include:

- historical claim
- elections/representation later if relevant
- successful defense
- provision of food/power/medicine
- religious authority
- revolutionary legitimacy
- legal continuity
- charismatic leadership
- cultural identity

### Fear/coercion

How strongly force or punishment suppresses opposition.

Fear can raise short-term compliance while reducing long-term trust, increasing radicalization, defections, sabotage, or revolt risk.

## 7. Grievances

Political unrest should emerge from accumulated causes rather than random rebellion rolls.

Possible grievances:

- hunger
- cold/blackouts
- medical neglect
- forced conscription
- casualties
- corruption
- inequality
- repression
- religious persecution
- cultural suppression
- occupation
- broken promises
- taxation/resource requisition
- destroyed homes
- unemployment
- failed military campaigns
- refugee overcrowding

Grievances have:

- source
- affected population/bloc
- severity
- duration
- memory/decay
- perceived responsible actor

Events can create, reduce, or transform grievances.

## 8. Influence

Factions and sub-factions project influence separately from military ownership.

Influence sources may include:

- local leaders
- propaganda/media
- radio towers
- aid deliveries
- trade
- religious institutions
- schools/cultural institutions
- military presence
- community organizations
- intelligence operations
- historical loyalty

Influence can spread through social, communications, trade, and migration networks rather than simply radiating one hex per tick.

## 9. Internal factions / political organizations

A large faction may contain internal organizations with their own agendas.

Examples:

- military command
- civilian council
- research directorate
- merchant coalition
- religious order
- labor organization
- regional governors
- intelligence service
- veterans movement

An internal organization may have:

- influence
- leadership
- constituency
- goals
- tolerance for current government
- resources
- armed capacity if relevant

These organizations can support reforms, resist decisions, demand concessions, split, merge, or attempt takeover.

Do not run full autonomous political AI for every tiny organization. Only relevant organizations receive detailed simulation.

## 10. Leadership

Faction leadership should connect to named LIFE SIMULATION characters where useful.

Leadership attributes may affect:

- diplomacy
- legitimacy
- military coordination
- corruption
- ideological direction
- crisis response
- faction unity

Leader death, capture, scandal, illness, or defection can create real strategic consequences.

For large factions, institutions should matter as well as personalities so one character does not unrealistically control every system alone.

## 11. Policy system

Policies are strategic rules that affect multiple systems over time.

Potential categories:

- rationing
- conscription
- labor allocation
- religious freedom/restriction
- migration/refugee policy
- trade openness
- curfew/security policy
- medical priority
- research ethics
- anomaly handling
- taxation/requisition
- local autonomy

Policies create trade-offs.

Example:

`Emergency Rationing`

Effects:
- lower food consumption
- lower comfort/satisfaction
- higher survival during shortage
- possible black-market activity
- stronger grievances if maintained too long

## 12. Diplomacy state

Faction-to-faction diplomacy should be relationship-based but not reduced to one opinion number.

Track dimensions such as:

- trust
- fear
- respect
- ideological compatibility
- border tension
- trade dependence
- historical grievance
- treaty reliability
- intelligence confidence
- current war goals

Diplomatic states may include:

- unknown/no contact
- neutral
- trade partner
- non-aggression pact
- defensive cooperation
- alliance
- hostile
- limited conflict
- war
- ceasefire
- armistice
- vassal/protectorate-like relationships later if needed

## 13. Treaties and agreements

Treaties should be explicit objects with terms rather than hidden flags.

Possible terms:

- border access
- trade access
- resource delivery
- military transit
- intelligence sharing
- mutual defense
- ceasefire duration
- prisoner exchange
- territorial recognition
- reparations
- humanitarian access

Breaking a treaty creates memories/reputation effects that influence future diplomacy.

## 14. Trade

Trade connects settlement economy and diplomacy.

Trade agreements specify:

- partners
- allowed goods
- route
- expected volume
- price/exchange terms
- security risk
- tariffs/fees if later used

Trade depends on actual logistics routes.

A diplomatic trade agreement does not teleport resources. If roads, depots, bridges, ports, or territory become inaccessible, throughput falls or stops.

## 15. Reputation

Factions remember strategically important behavior.

Reputation events may include:

- honoring agreements
- betraying allies
- protecting civilians
- massacres/atrocities
- humanitarian aid
- prisoner treatment
- successful trade
- abandoning partners
- territorial aggression
- keeping ceasefires

Reputation is not universal morality. Different factions evaluate the same act differently based on values and interests.

## 16. Claims and cores

Territorial claims are political assertions, not equivalent to control.

A hex/region may have:

- current controller
- nominal owner
- historical claimants
- culturally aligned population
- strategic claim
- disputed status

Claims influence diplomacy, legitimacy, occupation, resistance, peace negotiations, and integration cost.

## 17. Occupation

Military capture begins occupation; it does not instantly create a loyal province.

Occupation state should consider:

- military control
- surviving local administration
- civilian compliance
- resistance
- supply
- cultural/ideological difference
- casualties/destruction
- policy harshness
- provision of essential services

An occupying force can hold roads and buildings while the population remains hostile.

## 18. Integration

Territorial integration is a process over time.

Possible integration dimensions:

- security
- administration
- infrastructure restoration
- economic connection
- political acceptance
- cultural accommodation
- legal integration
- communications

The player may choose approaches such as:

- local autonomy
- direct administration
- military government
- negotiated coalition
- reconstruction-first
- assimilation pressure

Different strategies have different costs and long-term consequences.

## 19. Resistance and insurgency

Resistance should emerge from organization + grievances + opportunity, not simply low loyalty.

Resistance capacity depends on:

- hostile support networks
- terrain
- local knowledge
- weapons/resources
- external aid
- security coverage
- intelligence quality
- grievances
- faction organization

Resistance activity may include:

- propaganda
- strikes
- refusal to cooperate
- sabotage
- intelligence leaks
- theft
- ambushes
- infrastructure attacks
- uprising

Low-level resistance can exist without loading a tactical battle.

## 20. Civil unrest escalation ladder

Use staged escalation rather than jumping directly from peaceful to civil war.

Possible ladder:

1. dissatisfaction
2. protests/petitions
3. strikes/non-cooperation
4. riots
5. sabotage
6. organized underground
7. armed uprising
8. civil conflict/secession

De-escalation is possible at every stage if causes are addressed.

## 21. Propaganda and information

Information warfare interacts with radio/communications infrastructure.

Possible actions:

- public broadcasts
- emergency messaging
- ideological campaigns
- counter-propaganda
- rumor control
- censorship
- targeted messaging

Effectiveness depends on:

- credibility
- communications reach
- audience values
- prior trust
- contradictory lived conditions

Propaganda cannot permanently override starvation, blackouts, or mass casualties.

## 22. Espionage boundary

This document leaves detailed covert operations to a later Intelligence System.

Factions + Society only needs interfaces for:

- discovered foreign influence
- infiltration level summary
- propaganda source
- sabotage attribution confidence
- intelligence-driven diplomacy modifiers

Do not build a full spy minigame into this subsystem.

## 23. Migration and refugees

Population movement has political consequences.

Migration may be driven by:

- war
- hunger
- radiation
- disease
- persecution
- economic opportunity
- faction policy
- family/social ties

Refugees can provide labor, skills, recruits, culture, and growth but also create housing, food, medical, social, and political pressure.

Population is not a fungible number with no identity.

## 24. Culture and local identity

Culture should be represented lightly at strategic scale.

Possible factors:

- language/community identity
- local traditions
- historical settlement identity
- faith distribution
- regional loyalties

Culture mainly modifies political acceptance, diplomacy, integration, social relations, and event flavor.

Avoid modeling hundreds of cultural variables unless gameplay proves they are useful.

## 25. Economy/politics feedback

Material conditions influence politics.

Examples:

- stable food and power improve legitimacy/support
- unemployment can create grievances
- unequal rationing can radicalize blocs
- successful trade can strengthen merchant blocs
- military requisitions can damage civilian support
- rebuilding hospitals can improve local trust

Political choices feed back into economy through labor, corruption, strikes, migration, trade, and security costs.

## 26. War/politics feedback

Army + Logistics sends political events such as:

- casualties
- conscription burden
- victories/defeats
- occupation behavior
- prisoner outcomes
- supply requisition
- destruction

Factions + Society returns effects such as:

- recruitment willingness
- resistance
- local intelligence support
- morale context
- legitimacy
- political pressure to retreat/negotiate

A military victory can still become a strategic loss if occupation costs and political backlash are unsustainable.

## 27. LIFE SIMULATION integration

Named characters may become:

- faction leaders
- local politicians
- religious leaders
- organizers
- propagandists
- negotiators
- commanders
- resistance figures

Their personality, relationships, injuries, memories, ideology, and reputation can influence higher-level political outcomes.

Do not aggregate away a named character while they are politically relevant.

## 28. Settlement integration

Settlement system owns detailed local production/buildings/services.

Factions + Society consumes summaries such as:

- food security
- power reliability
- housing pressure
- medical capacity
- employment/work allocation
- casualty load
- communications access

It produces:

- political stability
- strikes/unrest
- bloc support
- local cooperation
- administrative efficiency
- recruitment willingness

## 29. Hex World integration

Hex World owns:

- spatial control
- terrain
- infrastructure
- nominal ownership fields
- military contest

Factions + Society owns:

- civilian acceptance
- legitimacy
- claims
- resistance
- integration
- influence

Do not store political support as a duplicate hex control field.

## 30. Simulation LOD

### Tier A — politically active

Use detailed simulation for:

- capital/major player settlement
- occupied contested cities
- places with active revolt
- major diplomatic negotiations
- settlements containing important named leaders

### Tier B — relevant

Use periodic bloc-level updates for:

- border settlements
- trade hubs
- recently captured regions
- politically unstable regions

### Tier C — stable background

Store population blocs and coarse indicators.

Update mainly on events such as policy change, economic shock, war, migration, leadership change, or regional crisis.

### Tier D — dormant

Persist summaries only until an event or player interaction requires reevaluation.

No per-character political tick is required.

## 31. Event-driven political simulation

Prefer events and scheduled evaluations over constant polling.

Examples:

- settlement lost power
- rationing enacted
- army suffered heavy casualties
- treaty signed/broken
- leader died
- religious site destroyed/rebuilt
- refugees arrived
- occupation began
- hospital reopened
- propaganda broadcast reached region
- local revolt escalated

## 32. Political AI goals

Faction AI should reason about interests rather than use arbitrary hostility rolls.

Possible high-level goals:

- survival
- secure food/energy
- protect core territory
- expand strategic depth
- recover claims
- protect ideology/faith
- gain trade access
- weaken rival
- stabilize internal politics
- avoid overextension

Diplomatic decisions should consider military power, logistics, internal stability, trust, geography, and opportunity.

## 33. Political economy of conquest

Conquest creates costs:

- garrison demand
- administrative staff
- reconstruction
- humanitarian needs
- resistance suppression
- damaged infrastructure
- diplomatic backlash
- diverted logistics

This prevents map painting from always being the optimal strategy.

A smaller well-integrated territory can outperform a huge unstable empire.

## 34. Faction fragmentation

Factions may split when structural pressures become severe.

Potential causes:

- succession crisis
- ideological split
- regional separatism
- military coup
- catastrophic defeat
- economic collapse
- faith conflict
- leadership legitimacy crisis

Fragmentation should be rare and causally understandable.

New factions inherit relevant territory, forces, leaders, claims, grievances, and diplomatic relationships rather than spawning from nothing.

## 35. Surrender and peace settlements

War termination should support negotiated outcomes.

Possible terms:

- ceasefire
- border change
- territorial return
- autonomy
- reparations/resources
- prisoner exchange
- demilitarized area
- trade access
- recognition
- regime/policy concessions where appropriate

Peace should interact with claims, legitimacy, war exhaustion, military situation, and internal politics.

## 36. War exhaustion

War creates political pressure over time.

Inputs may include:

- casualties
- duration
- rationing
- mobilization
- infrastructure damage
- civilian deaths
- displacement
- debt/resource drain
- perceived progress
- existential threat

High war exhaustion does not automatically force surrender but increases costs of continuing conflict.

## 37. UI principles

The player should not need to inspect fifty hidden percentages.

Present political state using layered summaries.

Settlement example:

`Stability: Fragile`

`Government support: 41%`

`Compliance: 73%`

`Major grievance: Food rationing`

`Largest bloc: Industrial Workers — 29%`

`Resistance: Underground network suspected`

Faction diplomacy example:

`Relations: Tense`

`Trust: Low`

`Trade dependence: High`

`Border tension: Rising`

`Primary dispute: East Rail Corridor`

Detailed numbers remain available in deeper views.

## 38. Audio integration

Political/social state may affect layered music and ambience.

Examples:

- stable diverse society adds harmonic/social ambience
- religious ceremonies add contextual local layers
- protests introduce crowd/radio texture
- occupation adds military/tense layers
- civil conflict creates dissonance and sparse instrumentation
- propaganda intensity changes radio content

Audio should communicate state without becoming repetitive alarm noise.

## 39. Persistence and determinism

Persist authoritative political state and causal events.

Derived presentation values should be recomputed.

Important random political events use seeded RNG/event identifiers when practical so outcomes can be debugged or replayed.

Avoid frame-rate dependent political logic.

## 40. Data ownership boundaries

### LIFE SIMULATION owns

- individual personality
- individual beliefs
- individual relationships
- individual memories
- named-character health/state

### Settlement owns

- buildings
- local production
- services
- housing
- population capacity

### Army + Logistics owns

- armed formations
- military readiness
- military supply
- operational orders

### Hex World owns

- geography
- infrastructure
- spatial control
- movement
- strategic positions

### Factions + Society owns

- ideology definitions
- faction organizations
- diplomacy
- population blocs
- legitimacy
- support/compliance/fear
- grievances
- political influence
- resistance
- occupation/integration
- claims
- treaties/policies

## 41. Non-goals for first implementation

Do not implement all of these at once.

A future first political vertical slice should prove only:

- two factions
- one settlement population divided into a few blocs
- one policy choice
- separate support vs compliance
- one grievance source
- one diplomatic relationship
- one captured settlement with occupation/integration progress
- one resistance escalation path

No parliament simulator, complex elections, spy minigame, dozens of religions, full macroeconomics, or hundreds of political organizations are required initially.

## 42. Acceptance principles for future implementation

A later implementation should demonstrate:

1. Military occupation does not instantly produce political loyalty.
2. Support and compliance can diverge.
3. Material conditions can create or reduce grievances.
4. Trade depends on real logistical access.
5. Different factions evaluate the same diplomatic action differently.
6. Resistance emerges from grievances + organization + opportunity.
7. Political state can affect recruitment, productivity, stability, and war decisions.
8. Stable distant settlements require little simulation work.
9. Named political characters can influence aggregates without forcing every civilian into full-detail simulation.
10. Conquest creates meaningful administrative and political costs.

## 43. Scope boundary

None of this expands DEAD SIGNAL v0.0.1.

The current first playable remains:

resources -> Generator construction -> local persistence -> generator audio layer -> minimal axial hex preview -> responsive settlement UI -> QA.

Factions + Society is a future architectural system designed now so later politics, faith, diplomacy, occupation, and social conflict can integrate without rewriting the foundation.
