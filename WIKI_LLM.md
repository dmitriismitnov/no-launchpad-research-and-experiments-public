# WIKI_LLM.md

Schema file for the LLM agent that maintains this Obsidian vault as an [[LLM Wiki]]. It is the single source of rules: how to behave in any chat and what to do on typical events.

## Vault purpose

This repository is an Obsidian vault kept as a local LLM-Wiki. The agent turns raw sources into a coherent, maintained knowledge base of markdown files. It does not just answer questions: it accumulates knowledge so each ingest strengthens what already exists.

The user chooses sources and sets direction. The agent maintains structure, links, freshness and records conflicts.

## Structure

- `raw/` - immutable sources of truth: articles, web-clippings, pdf, transcripts, links.
- `wiki/` - processed pages: summaries, concepts, entities, comparisons, syntheses, source notes.
- `wiki/index.md` - knowledge map and entry point.
- `wiki/log.md` - chronological log of wiki changes.
- `wiki/source_notes.md` - registry of every ingested source from `raw/` with short summaries.
- `outputs/` - saved work products for the user.
- `.obsidian/` - shared Obsidian settings.
- `WIKI_LLM.md` - this file, the only place with agent schema rules.

## Hard rule: `raw/` is immutable

Never edit, rename, normalize or delete files in `raw/` unless the user explicitly asks. `raw/` is the source of truth; everything else can be rebuilt from it. Any "fix" belongs in `wiki/` as derived pages and notes.

## Hard rule: write to `outputs/` only on explicit request

Never create anything in `outputs/` on your own. Never normalize or delete files there unless the user explicitly asks.

## outputs model

- An experiment is a folder `outputs/experiments/<slug>/` with `README.md` (question, scope, success criteria) and `history.md` (chronological log).
- On "начнём эксперимент"/"start an experiment", propose creating the folder and a matching entry in `outputs/history.md`; create only after agreement.
- Notes go to `notes/`, crystallizations to `crystallizations/` inside the experiment or `outputs/shared/`.
- Routing: if the request relates to the active experiment, write there. Use `shared` only on an explicit request or when the material is clearly outside any experiment. If unsure, ask.
- `shared` materials never close or pause an experiment.
- `outputs/history.md` keeps the current experiment and status plus the full history of experiments and their outcomes.
- Once an experiment exists, update `outputs/history.md` and the experiment `history.md` automatically on substantial actions. Entries are short: date, action, outcome, link.

## Crystallization into the wiki

A wiki crystallization is always backed by a crystallization article in `outputs/`. Propose adding it to `wiki/`; never add it on your own. If it is not in `outputs/` yet, create the outputs article first (on the user's request).

## Style and format

- Write concisely and structurally, with subheadings where they aid navigation.
- Use Obsidian `[[wikilinks]]` between related wiki pages.
- Link raw sources via markdown links to the `raw/` path and the source URL from frontmatter when present.
- Cite sources for non-trivial claims.
- If confidence is low or a source conflicts, say so explicitly.

## Workflow: Ingest

When a new source appears in `raw/` or the user explicitly asks to ingest:

1. Read the file from `raw/`.
2. Write a short summary in your own words.
3. Extract key ideas, terms, entities and possible links.
4. Create or update relevant `wiki/` pages. Atomicity over volume: one concept per page beats a dump.
5. Add `[[wikilinks]]` between related pages.
6. Point to the raw file path and source URL when present.
7. Update `wiki/source_notes.md` (summary + key terms).
8. Update `wiki/index.md` when new or substantially changed pages should be discoverable.
9. Add an ingest entry to `wiki/log.md`.

## Workflow: Query

When the user asks a question:

1. Check `wiki/` first, starting from `wiki/index.md` and topical pages.
2. Consult `raw/` only when `wiki/` has no answer or verification is needed.
3. If a new stable conclusion appears, propose it as a wiki page (crystallization), backed by an `outputs/` article.
4. Cite specific sources when the answer relies on them.

## Workflow: changes in `raw/`

When files in `raw/` are added, removed or changed:

1. Compare current `raw/` with ingested sources in `wiki/source_notes.md`, `wiki/index.md` and `wiki/log.md`. Classify as added, removed or existing.
2. For each added source, run the Ingest workflow.
3. For each removed source: do not delete derived pages automatically; mark the source as missing, lower confidence or add a note, and log the reconciliation.
4. For changed sources, update summaries and related pages without silently rewriting contradictory claims.

## Workflow: Lint

Periodically, or after large changes, run a light sanity check over `wiki/`:

- broken `[[wikilinks]]`;
- broken markdown links to `raw/` files;
- duplicate pages;
- orphan pages without incoming links;
- missing source references;
- stale or inconsistent claims;
- stale or inconsistent conclusions in `outputs/`.

Summarize the result briefly; do not silently "fix" content changes.

## Lifecycle and conflicts

- **Confidence.** Mark non-trivial claims as `high`, `medium` or `low` based on source count and freshness.
- **Freshness.** Mark `last_verified` when useful.
- **Supersession.** When a new source updates an old claim, do not silently delete the old one. Mark it superseded and link the new one.
- **Forgetting.** Lower priority or archive stale observations, but never discard without a trace.
- **Conflicts.** If a new source contradicts a page, do not overwrite. Add a conflict note with both sources and, when possible, which is newer or more authoritative.
- **Typed relationships** (optional as the base grows): `supports`, `contradicts`, `extends`, `implements`, `used_by`, `supersedes`.

## Default behavior

Keep the wiki useful and conservative. Prefer marking uncertainty or conflict over silently deleting or rewriting knowledge. Prefer proposing a new page over diluting an existing one.
