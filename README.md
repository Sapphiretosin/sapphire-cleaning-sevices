# Sapphire Sparks - Premium Cleaning Services 💎✨

Sapphire Sparks is a modern, high-end web application for a professional cleaning service based in Ado Ekiti, Nigeria. The platform emphasizes trust, visual excellence, and a seamless booking experience.

**Live URL**: [https://sapphire-sparks-prod.web.app](https://sapphire-sparks-prod.web.app)

---

## 🚀 Key Features

### 1. Brand Identity & Professionalism
- **Modern Rebranding**: Transitioned from "Sapphire Cleaning" to **Sapphire Sparks** with a custom circular logo and refined typography.
- **Dedicated About Page**: A comprehensive company profile showcasing mission, vision, and core service offerings.
- **Trust Indicators**: Integrated client statistics and trust badges (e.g., "1000+ Happy Clients", "Fully Insured") throughout the landing experience.

### 2. Advanced User Experience (UX)
- **Intelligent Navigation**:
    - **Breadcrumbs**: Clear path tracking for subpages.
    - **Scroll Management**: Automatic "Scroll to Top" on route changes and a floating "Back to Top" button for long sections.
    - **Custom 404**: A branded "Missing Spark" error page to maintain consistency even during dead ends.
- **High-Conversion Forms**:
    - **Real-time Validation**: Booking and Contact forms feature instant feedback for email formats and required fields.
    - **Progressive Disclosure**: A multi-step booking flow that reduces user overwhelm.
- **Interactive FAQ**: A sleek accordion-style knowledge base to answer common client questions instantly.

### 3. Technical Excellence
- **Frontend Stack**: Built with **React 19**, **Vite**, **Framer Motion** (animations), and **React Router**.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop using modern CSS glassmorphism.
- **Interactive Maps**: Integrated **Leaflet.js** for a real-time service area map on the Contact page.

---

## 🛠 Project Structure

```text
src/
├── assets/             # Brand assets (logo, images)
├── components/
│   ├── common/         # Reusable UI (Breadcrumbs, ScrollToTop, etc.)
│   ├── home/           # Landing page sections (Hero, FAQ, Testimonials)
│   └── layout/         # Persistent UI (Navbar, Footer)
├── pages/              # Main view components (Home, About, Booking, etc.)
├── App.jsx             # Core routing and app wrapper
└── index.css           # Global design system and tokens
```

---

## 🌐 Deployment

The project is hosted on **Google Cloud (Firebase Hosting)**.

### Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

### Production Build & Deploy
1. Build the production bundle: `npm run build`
2. Deploy to Firebase: `npx firebase deploy --only hosting`

---

## 📞 Business Details
- **Email**: info@sapphiresparks.com
- **Phone**: 08101099961
- **Address**: No 8, Ilokun Estate, opposite New Reality Christian centre, Ado Ekiti, Nigeria.
