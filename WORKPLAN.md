# CurioKit Autopilot Work Plan

**Goal:** Evolve the landing page and dashboard autonomously every 30 minutes based on feedback and best practices.

## Status
- **Landing Page:** V1 Released (High Quality).
- **Dashboard:** V2 Released (Interactive).
- **Global Style:** "God Tier" (Teal/Dark/Grid).

## Directives (Priority Order)

### 1. Visual Polish (High Priority)
- [x] Add subtle animated particles or "data dust" to the Hero section background.
- [x] Improve mobile responsiveness (ensure grid collapses correctly on < 768px).
- [x] Add hover states to Pricing cards (scale up + glow).

### 2. Content & Copy
- [x] Refine Hero subtitle to be more punchy ("Deploy AI squads...").
- [x] Add a "Trusted By" or "Built With" logos strip near the footer.

### 3. Technical Debt
- [x] Ensure all images have explicit width/height to prevent CLS (Cumulative Layout Shift).
- [ ] Audit `globals.css` for unused variables.

### 4. Dashboard Enhancements
- [ ] Add "System Health" indicator to Dashboard Sidebar.
- [ ] Create a 404 page with style (maybe a "404: Agent Lost in Void" animation).

### 5. Experiments (Low Priority)
- [ ] Try a WebGL background effect using a lightweight library (if performance allows).
- [ ] Add a "Konami Code" easter egg.

## Execution Rules
1. **Autopilot Mode:** Every 30 mins, the agent will pick ONE task from the top uncompleted items.
2. **Safe Mode:** Do NOT change core logic or break existing features.
3. **Commit Style:** Use conventional commits (e.g., `feat: add hover effects to pricing`).

---

*Last Run: February 10, 2026, 4:06 AM (Europe/Rome)*
*Status: RUNNING*
