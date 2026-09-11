# ZHIGALEV REWARD NETWORK — Cross-Project Rewards, Mini-Games & Monetization v0.1

Date: 2026-09-11
Status: Approved future architectural direction; not part of DEAD SIGNAL v0.0.1

## 1. Purpose

Create one reusable reward/monetization layer for DEAD SIGNAL, HAZY96/HZ96, and future projects while keeping each game's core economy independent and avoiding accidental real-money-gaming behavior.

Required capabilities:

- optional short mini-games attached to ordinary game actions;
- extra in-game rewards for mini-game completion/performance;
- optional rewarded advertising;
- unobtrusive native/in-world sponsored placements;
- shared cross-project earned reward points;
- future gift-card/cash redemption where legally and platform-permitted;
- tax/identity/eligibility/fraud accounting around real-value redemption;
- future HZ96 token integration only as a distinct, later, legally reviewed layer.

## 2. Reconciliation with existing projects

### DEAD SIGNAL

DEAD SIGNAL keeps its own simulation economy. v0.0.1 resources are:

- Metal
- Food
- Power
- People

Future simulation resources include physical goods, utilities, medicine, fuel, ammunition, settlement production, logistics, etc. These are strategic simulation values and are never redeemable for cash/gift cards.

A future DEAD SIGNAL soft/premium currency may exist, but any purchased balance must remain non-redeemable.

### HAZY96 / HZ96

Preserve the existing roadmap:

- Telegram Mini App first;
- off-chain HZ96 Points for MVP;
- Telegram Stars monetization;
- marketplace/social/referral mechanics;
- free offline/local version;
- optional TON/HZ96 token economy only after demand, legal design, and sustainable economics are validated;
- future HZ96 token may become externally tradable, but is not the same thing as ordinary HZ96 Points or Reward Points.

## 3. Canonical value layers

Use separate ledgers and provenance.

### Layer A — Simulation Resources

Examples: Metal, Food, fuel, medicine, ammunition.

Rules:
- game simulation only;
- never cash-redeemable;
- never transferred to an external financial wallet.

### Layer B — Project Game Currency

Examples: future DEAD SIGNAL Credits, project-specific paid/earned currency.

Rules:
- may be earned and/or purchased depending on project;
- used only inside that project unless a later explicit cross-project use is approved;
- purchased amounts cannot convert to Reward Points, cash, gift cards, or HZ96 token;
- if UI combines earned and purchased balances, backend ledger still preserves source provenance separately.

### Layer C — Project Earned Participation Points

HAZY96 HZ96 Points fit here when earned through play/participation.

Rules for points eligible to feed external rewards:
- earned, not bought;
- source event recorded;
- server validated for redeemable paths;
- non-transferable by default;
- campaign/region/account limits can apply.

If HZ96 Points ever become purchasable with Stars or money, purchased and earned HZ96 Points must be ledger-separated and purchased points cannot feed redemption.

### Layer D — Cross-Project Reward Points

Shared off-chain reward unit across eligible ZHIGALEV projects.

Rules:
- cannot be purchased;
- cannot be wagered;
- cannot be freely transferred user-to-user by default;
- issued only by server-authoritative eligible events/campaigns;
- may be disabled by project, platform, jurisdiction, age, campaign, or risk state;
- can be redeemed only through the separate redemption system.

### Layer E — Prize / Redemption Wallet

Separate ledger for external-value fulfillment.

Possible fulfillment:
- gift cards;
- cash payouts;
- sponsor merchandise;
- other legally permitted rewards.

It is not a gameplay inventory and cannot be used as a stake/wager inside gameplay.

## 4. Forbidden default conversion paths

Architecture blocks these unless a future legal/platform design explicitly replaces this spec:

- purchased game currency -> Reward Points;
- Telegram Stars -> Reward Points;
- purchased HZ96 Points -> Reward Points;
- simulation resources -> cash/gift cards;
- paid entry/wager -> randomized cash/gift-card result;
- Reward Points -> guaranteed HZ96 token at a fixed exchange rate;
- HZ96 token -> guaranteed project cash-out promise;
- local/offline save -> real Reward Points without server verification.

## 5. Intended reward paths

Examples:

`game action -> optional mini-game -> extra in-game reward`

`game action -> optional mini-game -> eligible earned participation points`

`optional disclosed rewarded ad -> fixed in-game reward`

`optional disclosed rewarded ad -> fixed Reward Points when campaign/platform rules allow`

`eligible earned-only project points -> Reward Points under a published campaign rule`

`Reward Points -> redemption request -> eligibility/verification -> gift card/cash when allowed`

A player must not have to spend money to qualify for ordinary sponsor-funded rewards.

## 6. Mini-games as an action-linked retention layer

Mini-games appear as optional bonus opportunities under normal actions.

DEAD SIGNAL examples:
- original minesweeper-inspired mine-clearing challenge;
- paddle/signal interception arcade challenge;
- original night-watch/camera survival-horror challenge without copying protected FNaF characters, story, UI, locations, audio, names, or branding;
- circuit repair;
- signal decoding;
- target practice;
- breach/lock puzzle;
- medical stabilization later.

Core gameplay action remains functional if the mini-game is skipped unless a separate mode explicitly defines the mini-game as part of the core challenge.

## 7. BonusOpportunity model

An eligible gameplay action can emit a `BonusOpportunity` concept containing:

- opportunity id;
- project id;
- source action type/id;
- mini-game id;
- base in-game bonus definition;
- sponsored bonus availability;
- reward campaign id;
- expiration;
- account/daily caps;
- server validation policy.

Example:

`Generator repair -> Circuit Repair mini-game -> small repair/material bonus -> optional sponsored transmission -> one additional fixed reward`

## 8. Recreation / Arcade hub

Projects may additionally expose a persistent Arcade/Recreation area where unlocked mini-games can be replayed.

Possible outputs:
- leaderboard scores;
- cosmetics;
- achievements;
- small capped in-game rewards;
- seasonal challenges;
- sponsor campaigns;
- social competition.

Use caps, diminishing returns, cooldowns, or score-only play after reward caps so arcade farming cannot dominate the main economy.

## 9. Advertising

### Rewarded ads

Rules:
- opt-in;
- exact reward displayed before playback;
- declining does not block the base gameplay action;
- ad-completion confirmation must come from provider/server for redeemable rewards.

Example UI concept:

`Sponsored transmission — watch to receive 1 Field Ration.`

### Native/in-world sponsored placement

Possible forms:
- radio sponsors;
- posters/billboards;
- branded vending/supply props;
- terminal splash screens;
- sponsor presence inside arcade spaces.

"Hidden" is interpreted as unobtrusive/in-world, not concealed commercial intent. Use `Sponsored`, `Ad`, or equivalent disclosure when required.

### Revenue allocation

Sponsor/ad revenue may fund:
- project revenue;
- development;
- reward reserve;
- promotional prize pools.

Do not hard-code a promised split until real ad yield, fraud, platform fees, payout fees, taxes, and retention data exist.

## 10. Server-authoritative redeemable ledger

Every real Reward Point issuance is an append-only/reversible ledger event.

Minimum event fields:
- unique event/idempotency key;
- account id;
- project id;
- campaign id;
- source type;
- source event id;
- gross point amount;
- reversal/adjustment relationship;
- timestamp;
- eligibility rules/version;
- platform/jurisdiction context;
- fraud/risk metadata.

The client proves/requests completion; it never mints redeemable value locally.

## 11. Offline/local editions

Offline/local versions can simulate local rewards for entertainment but cannot mint externally redeemable Reward Points.

Only authenticated server-verifiable events can enter the shared Reward Wallet.

This prevents edited saves, replayed events, modified clients, or duplicated offline state from draining reward reserves.

## 12. Fraud / abuse controls

Future real-value rewards require at least:
- idempotency/duplicate prevention;
- account rate limits;
- server-authoritative eligible scores/events;
- bot/automation detection where reasonable;
- impossible-score checks;
- ad-provider completion validation;
- multi-account abuse detection;
- suspicious payout review/holds;
- reversible ledger adjustments rather than silent destructive edits.

## 13. Redemption flow

Conceptual flow:

`Reward Points -> redemption request -> eligibility -> identity/age/region checks where required -> fraud review -> tax/profile requirements -> provider fulfillment -> ledger receipt`

Possible states:
- requested;
- pending eligibility;
- pending verification;
- approved;
- fulfilled;
- rejected;
- reversed.

The UI must clearly separate game balances from redeemable balances.

## 14. Tax/reporting boundary

The platform records enough information for later tax/reporting obligations, but exact obligations depend on jurisdiction, reward type, provider, and user status.

Record at minimum:
- redemption value;
- fulfillment type;
- date/time;
- account/recipient identity reference;
- jurisdiction context;
- provider transaction/receipt reference;
- fees/withholding data if returned by provider;
- reversal/refund state.

Taxes do not by themselves make a prize/reward model legally permissible; eligibility/legal classification is a separate gate.

## 15. HZ96 token boundary

Future HZ96 crypto token remains outside ordinary Reward Points.

Do not assume:
- HZ96 token is legally equity because it was conceptually described as "shares of the system";
- Reward Points have a guaranteed token exchange rate;
- gameplay rewards guarantee investment returns;
- external token liquidity can fund guaranteed user cash-outs.

Any token bridge requires its own legal/economic/security specification after MVP demand is proven.

## 16. Cross-project account architecture

Long term, one ZHIGALEV account may expose:
- project profiles;
- project currencies;
- earned participation balances;
- shared Reward Points;
- redemption history;
- eligibility/account verification state.

Each project remains playable even if Reward Network is disabled.

## 17. Performance and service separation

Reward/redemption logic must not run inside the deterministic simulation core of DEAD SIGNAL.

Treat it as a separate service/module so:
- gameplay works during reward-service outages;
- jurisdictions/platforms can disable redemption independently;
- offline editions remain functional;
- fraud/risk updates do not rewrite game simulation logic.

## 18. DEAD SIGNAL v0.0.1 boundary

None of this belongs in DEAD SIGNAL v0.0.1 runtime.

v0.0.1 remains:
- settlement shell;
- Metal/Food/Power/People;
- Generator;
- local persistence;
- generator audio layer;
- minimal axial hex preview;
- responsive browser UI;
- QA.

Mini-games, ads, Reward Points, Prize Wallet, HZ96 integration, cash, gift cards, KYC, taxes, and payouts are future modules.

## 19. Current architectural recommendation

Canonical separation:

`GAME SIMULATION`
-> local project resources/currency

`OPTIONAL MINI-GAME / SPONSORED EVENT`
-> in-game bonus and/or eligible earned points

`REWARD SERVICE`
-> Cross-Project Reward Points

`REDEMPTION SERVICE`
-> gift cards/cash where legal/platform-permitted

`HZ96 TOKEN`
-> separate later external crypto layer with its own legal/economic/security design

This structure preserves the user's long-term goal — users can eventually earn real-value rewards across projects — without making purchased game currency directly cash-convertible by default.