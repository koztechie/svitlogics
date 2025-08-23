# SVITLOGICS CONTRIBUTION DIRECTIVE

# DOCUMENT ID: CONTR-V3.0 ("THE GAUNTLET")

# AUTHORIZED PERSONNEL ONLY

## I. DECLARATION OF OPERATIONAL SOVEREIGNTY

This is not a community document. This is an operational directive governing all interaction protocols with the Svitlogics source code repository. Svitlogics is a sovereign, solo-developed instrument. It was forged—not merely "built"—in Kyiv, Ukraine, under the explicit duress of sustained information warfare. It has one function: to provide an instrument for the deconstruction of weaponized narratives. It serves no other purpose.

Engagement with this project is not a right; it is a privilege granted only to those who demonstrate absolute comprehension of and adherence to its core axioms. This directive is designed to repel casual contributors and filter for professionals who understand that in this domain, imprecision is a catastrophic failure.

**If you are seeking validation, community kudos, or a friendly open-source environment, you are in the wrong repository. Terminate your session now.**

If you are here to contribute to a serious instrument under exacting standards, you may proceed to the next article.

---

## II. THE AXIOMS (NON-NEGOTIABLE)

All potential contributions—bug reports, proposals, code—will be algorithmically and manually evaluated against three immutable axioms. Failure to comply with any single axiom will result in the immediate and permanent rejection of the contribution without further review.

1.  **AXIOM OF MISSION ALIGNMENT**: The contribution must enhance the instrument's capacity for narrative deconstruction. It must add clarity, improve analytical precision, or harden security. Features introducing aesthetic embellishment, unnecessary user engagement mechanics, or any form of "softening" are considered mission-hostile and will be rejected on sight.
2.  **AXIOM OF ARCHITECTURAL PURITY**: The system's stateless, serverless, zero-trust architecture is non-negotiable. Any contribution proposing data persistence for user-submitted content, introducing stateful logic to the backend, or otherwise compromising the privacy-first model will be classified as a system vulnerability and rejected.
3.  **AXIOM OF SYSTEMIC COHERENCE**: The contribution must integrate flawlessly with the **[Svitlogics Design System](svitlogics-design-system-pure-minimalist-brutalist-light-theme.md)** and **[Svitlogics Writing System](svitlogics-writing-system-tone-voice.md)**. These are not guidelines; they are the operational physics of this project. `border-radius` is zero. `font-family` is mono. The voice is analytical. There is no alternative.

---

## III. INTERACTION PROTOCOLS

### PROTOCOL 3.1: ANOMALY REPORTING (BUG REPORTS)

Anomalies are fractures in the instrument's integrity. They are to be reported with clinical precision.

1.  **PRE-ACTION SEARCH**: Execute a comprehensive search of the [Issues database](https://github.com/koztechie/svitlogics/issues) to verify the anomaly is not a known artifact. Redundant reports will be closed.
2.  **REPORTING FORMAT**: Submissions must be structured as a formal anomaly report.
    - **CLASSIFICATION**: `[BUG] <Precise description of failure>`
    - **REPLICATION VECTOR**: A deterministic, numbered sequence of actions to reproduce the system failure. If the anomaly is not 100% reproducible with the provided vector, the report is invalid.
    - **STATE DEVIATION ANALYSIS**: A clear comparison of the documented `Expected State` versus the observed `Failed State`.
    - **DIAGNOSTIC TELEMETRY**: Full, unedited console logs, network request/response headers and bodies, browser/version, and OS/version are mandatory. UI anomalies require high-resolution, uncropped screenshots or screen recordings.

Submissions failing to meet these criteria are not considered bug reports; they are considered system noise and will be purged.

### PROTOCOL 3.2: STRATEGIC PROPOSALS (FEATURE REQUESTS)

All modifications to the instrument's core capabilities require a formal proposal.

1.  **INITIATION**: Proposals are initiated exclusively via a new Issue.
2.  **PROPOSAL FORMAT**: The proposal must be structured as a strategic brief.
    - **CLASSIFICATION**: `[PROPOSAL] <Name of proposed module or function>`
    - **THREAT/OPPORTUNITY ANALYSIS**: A concise definition of the strategic gap the proposal addresses. What current limitation makes the instrument less effective?
    - **MISSION ALIGNMENT JUSTIFICATION**: A logical proof demonstrating how the proposal directly aligns with the Axioms in Article II. This is the primary evaluation criterion.
    - **SYSTEM INTEGRATION BLUEPRINT**: A high-level architectural diagram or description of how the new module integrates with the existing stateless, serverless architecture without compromising it.

Proposals that are tactical (minor UI tweaks) rather than strategic will be rejected.

### PROTOCOL 3.3: CODE SUBMISSION (PULL REQUESTS)

Code is the final, executed form of an approved proposal. Unsolicited code submissions will be rejected without review.

1.  **BRANCHING DISCIPLINE**: Originate all branches from `dev`. Naming convention is `type/scope/short-description` (e.g., `feat/api/rate-limiter-v2`).
2.  **CODE INTEGRITY**: All code must be formatted (`npm run format`) and pass all linting checks (`npm run lint`). The build must be clean. There is no tolerance for deviation.
3.  **COMMIT HYGIENE**: Commits must be atomic and adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification with military precision. A well-curated commit history is a non-negotiable aspect of this project's quality.
4.  **SUBMISSION BRIEF**: The Pull Request description is a formal document. It must reference the originating proposal issue and provide a clear, technical changelog.
5.  **PEER REVIEW GAUNTLET**: Your code will be subjected to an unforgiving review process. Be prepared to defend every line, every choice, and every architectural trade-off. The burden of proof for the code's correctness, security, and performance rests solely with the contributor.

## IV. TECHNICAL DECREES

- **STATE**: Shall not be persisted on the server.
- **SECURITY**: Client-side API key exposure is a critical failure. All sensitive operations are proxied.
- **AESTHETICS**: Governed by the Design System. No deviation.
- **TYPOGRAPHY**: `IBM Plex Mono`. No other fonts.
- **GEOMETRY**: `border-radius` is forbidden.
- **LANGUAGE**: `TypeScript`. `any` is forbidden except in cases of extreme, well-justified technical necessity.

## V. INDEMNIFICATION AND WAIVER OF CLAIMS

By contributing, you affirm that your contribution is your own original work and that you have the legal right to grant all licenses contained herein. You agree to indemnify and hold harmless the Author from any and all claims, damages, and legal actions arising from your contribution. You acknowledge that your contribution is provided voluntarily and that you expect no compensation.

## VI. LICENSE

All contributions to this project are irrevocably licensed under the project's own license, the **Svitlogics Software License Agreement v3.0 ("The Uncompromising")**. By submitting a contribution, you agree to these terms.

---

<div align-center>
  <strong>FAILURE TO ADHERE TO THIS PROTOCOL WILL RESULT IN REJECTION. NO APPEALS.</strong>
</div>
