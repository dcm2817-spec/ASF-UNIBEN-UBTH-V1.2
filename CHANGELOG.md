# Changelog — ASF UNIBEN/UBTH Website

A running record of what changed and why, for whoever maintains this site next.
Each entry corresponds to a numbered SQL file in `supabase-updates/` (where a
database change was involved) plus whatever frontend files shipped alongside it.

## v1.10 — Code organization: shared nav partial + this changelog
- Added `nav-links.js`: the site's entire nav menu now lives in one array
  instead of being hand-written into 13 separate HTML pages. Adding, removing,
  or reordering a link is now a one-file edit.
- `nav.js` can now auto-build a page's menu and footer when that page opts in
  (`<nav data-nav-menu></nav>` / `<footer data-auto-footer></footer>`).
  Backward compatible on purpose: pages not yet migrated keep working exactly
  as before, untouched.
- Migrated all 13 full-menu pages. Left Attendance, Follow-Ups, and the
  password reset page on their intentionally minimal navs.

## v1.9 — Real relational group membership
- Added a proper `group_members` join table and `members.led_group_id`,
  kept in sync automatically by two database triggers whenever a member's
  ministry group or a leader's assigned group changes.
- Replaced text-column comparisons (`ministry_group = led_group`, etc.) inside
  the scoping functions with real relational joins — same function names,
  smarter internals. No frontend changes required.
- Known remaining soft spot: Hall Rep matching still falls back to comparing
  the free-text `location` field, since there's no dedicated hall-picker field
  yet.

## v1.8 — Second ministry group + satellite groups
- Members can now register with up to two ministry groups
  (`ministry_group_2`), with duplicate-selection validated on both Register
  and My Profile.
- Fixed a real bug: the registration trigger was silently dropping a second
  group even after the frontend started collecting it.
- Added BDPA, Ekosodin, UBTH, and Ekhuewan to the validated `groups` list so
  those coordinators can be assigned properly.

## v1.7 — Groups table + server-side attendance aggregation
- Added a validated `groups` reference table. "Make leader" in Admin switched
  from a free-text prompt to a dropdown pulled from this table — a typo can
  no longer silently break a leader's group scoping or message delivery.
- Added `member_core_attendance` and `core_event_count` database views, so
  Dashboard/My Group/Attendance no longer download every attendance row ever
  recorded just to compute a percentage. This is the main fix that let the
  system comfortably support meaningfully more members than before.

## v1.6 — Delegated permissions, member tags, songs list
- Added a `permissions` array on members, independent of role — admins can
  grant specific powers (e.g. `mark_attendance`) to any individual without
  making them a full admin.
- Added `member_tags` (admin/appointee-only, never visible to the tagged
  member or other members) and a `songs` table (viewable by everyone,
  editable by admins or whoever holds `manage_songs`).
- My Group narrowed to show leaders only their group's *flagged* (inactive)
  members, not the full roster.

## v1.5 — Internal messaging
- Admins can message all members or a specific group; leaders can only
  message the one group they lead (enforced by RLS, not just hidden UI).
- Members are read-only recipients.

## v1.4 — Follow-up system
- Detect (Dashboard's Top 5 Inactive) → Assign (admin picks a leader) →
  Track (Follow-Ups page) → Complete.
- One pending follow-up per member at a time, enforced by a database
  constraint, not just application logic.

## v1.3 — Three-tier roles
- Introduced `member` / `leader` / `admin`, with `led_group` scoping a
  leader's visibility to read-only access over their own group.

## v1.2 — Attendance system
- `events` + `attendance` tables. Absence isn't stored as data — a member is
  "present" only if an attendance row exists linking them to that event.

## v1.1 — First round of self-service features
- Self-service password reset, My Profile (self-edit), Admin search/filter
  and one-click role promotion, birthdays-this-month.

## v1.0 — Initial build
- Registration, sign-in, About, Leadership, Ministry Groups, FAQ chatbot
  (keyword-matched), Admin (member list + CSV export + announcements).
- Rebuilt from an original React/Vite version to plain HTML/CSS/JS partway
  through, specifically so every file could be edited and deployed from a
  phone via GitHub's web uploader without a build step to break.
