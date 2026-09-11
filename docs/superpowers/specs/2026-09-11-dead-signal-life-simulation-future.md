# DEAD SIGNAL — Future Life Simulation Module

Date: 2026-09-11
Status: Approved future direction; explicitly out of scope for v0.0.1

## Purpose

Add RimWorld-like depth to individual characters without copying RimWorld content or presentation. DEAD SIGNAL characters should become strategically meaningful people whose needs, relationships, injuries, illnesses, beliefs, and memories can affect squads, settlements, factions, and eventually the global war layer.

## Simulation scaling principle

Do not simulate every distant NPC at full detail every tick. Use simulation levels:

1. **Active characters** — full needs, health, relationships, memories, current tasks, and injuries.
2. **Relevant off-screen characters** — reduced-frequency detailed simulation.
3. **Background population** — aggregated demographic/statistical simulation.
4. Promote/demote characters between levels when they become strategically or narratively relevant.

This is required to keep large settlements and persistent worlds performant.

## Needs and desires

Potential individual drives include:
- hunger
- sleep
- comfort
- safety
- social contact
- solitude
- recreation
- intimacy / romantic interest / flirting
- respect
- status
- purpose / faith
- autonomy

Needs are weighted by personality rather than identical for every character.

## Personality

Characters may have stable traits/preferences that influence:
- social desire
- risk tolerance
- aggression
- empathy
- loyalty
- ambition
- religiosity / ideological receptiveness
- stress tolerance
- jealousy
- discipline
- curiosity

Personality changes probabilities and thresholds; it should not hard-script every action.

## Social and relationship model

Potential relationship dimensions:
- opinion
- trust
- respect
- fear
- friendship
- romantic attraction
- relationship commitment
- rivalry
- grief attachment
- ideological compatibility

Relationships should evolve primarily through events and shared history. Examples:
- surviving a dangerous expedition together can increase trust;
- abandoning an injured ally can create resentment or hatred;
- rescuing someone can create gratitude and loyalty;
- incompatible ideology can increase conflict probability;
- death of a close relation can create grief and behavioral effects.

## Health model

Health should eventually be body-part/state based rather than a single HP bar.

Possible concepts:
- body parts and organs
- bleeding
- blood loss
- fractures
- burns
- gunshot/shrapnel wounds
- infection
- disease
- radiation exposure/damage
- contamination
- pain
- consciousness
- mobility
- manipulation/working capacity
- breathing
- temperature-related injury
- treatment quality
- medicines
- prosthetics/implants in later phases

A health condition can modify combat ability, movement, work speed, morale, and survival probability.

## Medical gameplay

Future medical layer may include:
- triage
- hospital/clinic capacity
- doctor skill
- medicine stock
- treatment priority
- surgery
- quarantine
- infection control
- rehabilitation
- evacuation of wounded squads

Strategic consequence example: a costly victory can return many wounded soldiers, overload the clinic, consume medicine, reduce available workers, lower morale, and create political anger at leadership.

## Memories and trauma

Important events can create memories with duration/intensity. Examples:
- witnessed death
- lost friend/partner
- severe injury
- successful rescue
- starvation
- isolation
- victory
- betrayal

Memories can affect mood, trust, fear, relationships, ideology, and combat willingness.

## Strategic integration

The life simulation must connect upward:

character -> relationship -> squad -> settlement -> faction -> global strategy

Examples:
- a squad leader may resist abandoning a close companion;
- wounded veterans reduce immediate combat power but may become valuable instructors later;
- ideological divisions inside a settlement can affect stability;
- casualties can change morale, political support, recruitment, and music;
- epidemics can reduce production and force strategic quarantine decisions.

## Audio integration

Life-simulation state may contribute to DEAD SIGNAL's layered soundtrack without exposing every mechanic as sound. Examples:
- overcrowded medical wards add sparse alarm/medical ambience;
- epidemic states add tense sparse layers;
- high social stability can add harmonic layers;
- civil conflict can introduce dissonant layers;
- grief/casualty pressure can thin instrumentation.

## Scope boundary

None of this is implemented in v0.0.1. The current milestone remains: resources, Generator construction, local persistence, dynamic generator audio layer, minimal axial hex preview, responsive settlement UI, and QA.
