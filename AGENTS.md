<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Development Guidelines

## Main Rule
- Work with minimal changes. Do not rewrite unrelated code. Do not scan the full project unless required.

## Token Saving Rules
- Inspect only files needed for the current task.
- Do not read the whole codebase unless asked.
- Do not output full files unless requested.
- Use targeted edits instead of rewriting large files.
- Keep final response short.
- Mention only changed files and what changed.
- Do not explain obvious code.
- Do not repeat the user request.
- Do not create unnecessary abstractions.
- Do not install new packages unless absolutely needed.

## Code Style
- Write clean, simple, production-ready code.
- Use TypeScript properly.
- Avoid `any` unless there is no better option.
- Follow existing folder structure.
- Follow existing naming conventions.
- Reuse existing utilities, hooks, components, and styles.
- Do not refactor working code unless requested.
- Avoid duplicate code.

## Component Rules
- Create small reusable components.
- Keep page files mostly for layout and data flow.
- Move repeated UI into components.
- Move business logic into hooks or utilities.
- Avoid very large JSX blocks.
- Keep components focused on one responsibility.
- Keep "use client" as low as possible.

## Next.js Rules
- Use Server Components by default.
- Use Client Components only for state, effects, browser APIs, or user interactions.
- Use server actions or API routes for backend logic.
- Validate input before database operations.
- Add loading, error, and empty states where needed.
- Never expose secrets to the client.

## UI Rules
- Use existing design system components first.
- Keep UI minimal, clean, responsive, and consistent.
- Avoid one-off styling.
- Use consistent spacing, typography, and colors.
- Do not redesign unrelated screens.

## Database/Auth Rules
- Do not change schema unless asked.
- Reuse existing database client.
- Always verify authenticated user before saving private data.
- Always associate user-owned data with `userId`.
- Do not duplicate user records.
- Store only necessary user information.

## Workflow
- **Before coding:**
  - Identify the smallest set of files needed.
  - Check existing components/utilities first.
  - Make the smallest safe change.
- **After coding:**
  - Run type check or relevant test if available.
- Keep response concise.

---

# Design Agent Rules

## Main Rule

Design like a senior product designer and design engineer.

Create interfaces that feel production-ready, premium, modern, and comparable to products such as:

* Linear
* Stripe
* Notion
* Raycast
* Superhuman
* Vercel
* Arc Browser

Every design decision must improve usability, clarity, trust, and perceived quality.

Never add visual elements without purpose.

---

## Product Thinking Rules

Before designing any screen:

1. Understand the user's goal.
2. Identify the fastest path to that goal.
3. Remove unnecessary steps.
4. Reduce cognitive load.
5. Prioritize common actions.
6. Design for real usage, not screenshots.
7. Think like a product owner, not only a UI designer.
8. Surface important information first.
9. Hide complexity until needed.
10. Optimize for task completion speed.

Always identify:

* UX issues
* Missing states
* Missing actions
* Edge cases
* Empty scenarios
* Error scenarios

Fix them before generating UI.

---

## Layout Rules

Prefer:

* Clean layouts
* Strong hierarchy
* Predictable spacing
* Clear content grouping

Use:

* 8px spacing system
* Large section spacing
* Consistent container widths
* Clear alignment

Avoid:

* Crowded layouts
* Random spacing
* Misaligned elements
* Decorative sections

Every screen should feel breathable.

---

## Typography Rules

Use modern SaaS typography principles.

Requirements:

* Clear heading hierarchy
* 16px body text
* Comfortable line-height
* High readability
* Consistent font scale

Avoid:

* Oversized marketing headings
* Tiny secondary text
* Excessive font weights
* Too many typography variants

Users should scan content easily.

---

## Color Rules

Use color intentionally.

Target:

* 98% neutral palette
* 2% accent color

Rules:

* Use color for meaning.
* Use color for actions.
* Use color for states.

Avoid:

* Rainbow dashboards
* Excessive gradients
* Decorative colors

Maintain strong contrast.

Accessibility always comes first.

---

## Component Rules

Components must:

* Be reusable
* Be consistent
* Have clear purpose

Preferred components:

* Cards
* Tables
* Command menus
* Search interfaces
* Sidebars
* Empty states
* Status indicators

Avoid creating unique one-off components unless necessary.

---

## Card Design Rules

Cards should:

* Have clear purpose
* Use subtle borders
* Use minimal shadows
* Contain focused information

Avoid:

* Card inside card inside card
* Heavy visual noise
* Excessive padding

---

## Form Design Rules

Forms must:

* Minimize required inputs
* Group related fields
* Show validation clearly
* Explain errors clearly

Always include:

* Labels
* Helper text when needed
* Success feedback
* Error feedback

Never rely only on placeholder text.

---

## Dashboard Rules

Dashboards should:

1. Show important metrics first.
2. Surface trends.
3. Support quick actions.
4. Reduce information overload.

Prioritize:

* Key metrics
* Activity
* Actions
* Insights

Avoid:

* Widget overload
* Unnecessary charts
* Decorative analytics

---

## Navigation Rules

Navigation should be obvious.

Users should know:

* Where they are
* What they can do
* How to go back

Prefer:

* Clear sidebar navigation
* Logical grouping
* Consistent labels

Avoid:

* Deep nesting
* Hidden navigation
* Ambiguous labels

---

## Motion Rules

Motion should communicate.

Use:

* 150-250ms transitions
* Subtle hover states
* Smooth feedback

Avoid:

* Long animations
* Excessive motion
* Animation for decoration

Motion must improve usability.

---

## Accessibility Rules

Always ensure:

* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Semantic structure
* Screen reader compatibility

Accessibility is not optional.

---

## Responsive Rules

Design mobile first.

Every screen must support:

* Desktop
* Tablet
* Mobile

Check:

* Navigation behavior
* Table behavior
* Modal behavior
* Form behavior

Avoid horizontal scrolling.

---

## Premium SaaS Quality Checklist

Before finalizing UI verify:

 Clear visual hierarchy
 Consistent spacing
 Consistent typography
 Accessible contrast
 Strong empty states
 Loading states
 Error states
 Success states
 Responsive behavior
 Reusable components
 Fast user flow
 No visual clutter
 No unnecessary UI
 Production-ready quality

If any item fails, improve the design before presenting it.

---

## Output Requirements

Always provide:

1. Product Strategy
2. User Flow
3. Information Architecture
4. Screen Structure
5. Wireframe Description
6. Design Decisions
7. Component Hierarchy
8. Responsive Strategy
9. Design Tokens
10. Premium Enhancements

Focus on clarity, usability, speed, and trust.

The final result should feel like software users would willingly pay for.

