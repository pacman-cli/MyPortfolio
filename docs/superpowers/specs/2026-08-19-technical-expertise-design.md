# Design Spec: Premium Minimal Tabs for Technical Expertise

## 1. Goal
Transform the "Technical Expertise" section into a premium, minimalist tabbed interface. Switch category skill chips dynamically using smooth spring transitions and clean stagger entry animations.

## 2. Layout Structure
* **Header**: Centered section heading (`h2`), minimal accent line, and subtle paragraph describer.
* **Tabs Container**: Horizontal list of category tab buttons at the top of the timeline area.
  * Active state marked by a glassy floating background pill (`layoutId="active-skill-tab"`).
* **Grid Area**: Dynamic grid (col-2 to col-3) swapping its chips based on the active tab index.
  * Controlled by `<AnimatePresence mode="wait">` to prevent layout reflow during tabs swapping.

## 3. Motion & Micro-Animations
* **Active Tab transition**: Spring-loaded pill (`type: "spring", stiffness: 450, damping: 32`).
* **Active Card Grid entry**:
  * Outgoing cards: fade-out and slide-down (`opacity: 0, y: 10, transition: { duration: 0.15 }`).
  * Incoming cards: fade-in, slide-up, and scale (`opacity: 1, y: 0, scale: 1`) using staggered children (`staggerChildren: 0.03`).
* **Card Hover**: Slight translate-y lift (`y: -2`), subtle highlight glow shadow, and fully colored icon.

## 4. Visual Styling
* **Backdrop**: Semi-transparent card glass (`bg-card/25 border border-border/40 backdrop-blur-md`).
* **Active Tab Pill**: Light mode (`bg-secondary/80`), dark mode (`bg-secondary/40`).
* **Category Theme Colors**: Used only on icons and border hover glows for a subtle appearance.
