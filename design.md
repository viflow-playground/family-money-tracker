# Family Money Tracker — Mobile Design Plan

## Product Intent

Family Money Tracker helps two parents guide their children through everyday money choices. The experience is designed for portrait phones and one-handed use: children see an encouraging, simple view of what they have, while parents have a compact family overview and can review decisions together. The first version stores the shared sample family on the device so it works without sign-in or a connection.

## Screen List

| Screen | Primary Content and Functionality |
|---|---|
| **Family Dashboard** | A parent-oriented overview with combined family savings, each child’s balance, progress toward goals, pocket-money timing, and a concise activity feed. A segmented family-member control changes whose details are foregrounded. |
| **Money Activity** | A chronological decision ledger. Each record identifies whether money was saved, spent, invested, or received, includes its amount, and shows the parent-review state. Users can filter the feed by decision type. |
| **Goals** | Individual saving targets, current progress, an estimated progress percentage, and a prominent action to add money toward a goal. |
| **Pocket Money** | Recurring income rules for each child, including amount, cadence, and the next expected payment. It also gives parents a small control surface to record a payment. |
| **Add Decision Sheet** | A short, focused form to record a spending, saving, or investment choice. It accepts an amount, category, and note, and supplies an immediate confirmation after recording. |
| **Family Settings** | A simple local family profile with parent and child labels, explanatory privacy copy, and a reset option reserved for future use. |

## Primary Roles and Data Model

Parents are the primary administrators and reviewers. Children are represented by individual profiles and money decisions that parents can discuss and record with them. The initial local data model uses the following vocabulary so that a later shared cloud version can preserve the same concepts.

| Entity | Key Fields | Purpose |
|---|---|---|
| **FamilyMember** | `id`, `name`, `role`, `color`, `balance` | Represents a parent or child and supplies a recognizable personal color. |
| **PocketMoneyRule** | `id`, `memberId`, `amount`, `cadence`, `nextPayment` | Defines periodic pocket money for an individual child. |
| **MoneyDecision** | `id`, `memberId`, `type`, `amount`, `title`, `category`, `date`, `reviewStatus` | Records an income, spending, saving, or investment decision and its review state. |
| **SavingsGoal** | `id`, `memberId`, `title`, `target`, `saved`, `deadline` | Tracks the purpose and progress of a saving goal. |

## Key User Flows

| Flow | Steps |
|---|---|
| **Understand the family position** | Parent opens the app → sees combined family total and child account cards → taps a child card or member control → sees that child’s balance, next pocket money, goal progress, and latest decision. |
| **Record a decision together** | Parent opens the decision action → chooses spend, save, or invest → enters amount, category, and note → records it → ledger and balance update and the entry receives a parent-reviewed state. |
| **Set aside money for a goal** | Parent opens Goals → selects a goal → records a saving decision for that goal → goal progress and child balance update. |
| **Manage pocket money** | Parent opens Pocket Money → reviews weekly payment rules → records a payment when due → the child’s balance and activity history update. |

## Visual Language

The visual style borrows from calm first-party iOS finance surfaces rather than gamified banking. The foundation is warm cream **#F7F6F2**, with ink **#1D2C3A**, card white **#FFFFFF**, and soft borders **#E6E4DD**. The core brand color is deep teal **#176B73**, which signals confidence and is used for primary actions. Each child has a distinct, accessible marker color: coral **#E98163** and lavender **#7761B8**. Positive saving uses emerald **#2C8C6A**, while investment uses navy **#355C9A**. Rounded 20–24 point cards, a generous vertical rhythm, readable 17 point body text, and large 44 point tap targets support quick use by parents and legible co-viewing with children.

## Interaction Principles

Each screen has one clear primary action placed within thumb reach. Decisions use plain-language labels and visual type chips rather than finance jargon. Confirmation states are explicit, and money movements stay visible in the ledger. Buttons use gentle opacity and scale feedback, with restrained haptics on meaningful record and review actions.
