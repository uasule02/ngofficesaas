
# NGOFFICE SaaS Platform

## 🚀 Overview
NGOFFICE is a high-performance, multi-tenant SaaS frontend built for modular organizational management. It provides a robust **Platform Control Center** for global administrators and a tailored **Tenant Workspace** for individual organizations.

This repository is specifically architected to interface with the [Project Monitoring SaaS Backend](https://github.com/Rahza-Technology-Limited/project_monitoring_saas.git).

---

## 🛠 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm / yarn / pnpm**
- **Gemini API Key**: Required for AI-driven management insights.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rahza-Technology-Limited/ngofficeplatform.git
   cd ngofficeplatform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

### Running the Project
To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🏗 Architecture
- **Frontend**: React 19 (ESM based)
- **UI/UX**: Tailwind CSS with a "High-Fidelity" design language.
- **State Management**: React Hooks + Contextual URL routing.
- **Intelligence**: Integrated Gemini-3-Flash for automated business insights.
- **Multitenancy**: Dynamic module provisioning system with daily prorated billing logic.

## 📂 Project Structure
- `/views/PlatformAdmin`: Global governance, tenant lifecycle, and module marketplace.
- `/views/Tenant`: Staff management, finance tracking, and local workspace.
- `/services`: Gemini AI integration and `backendService.ts` API connectors.
- `/components`: Reusable high-fidelity UI modules (StatCards, Tables, etc).

## 🔗 Backend Integration
The frontend is built to be stateless. To connect your live `project_monitoring_saas` instances:
1. Open `services/backendService.ts`.
2. Update the `BASE_URL` to point to your deployed backend API.
3. Uncomment the fetch calls in the `backendApi` object.

## 📦 Deployment
To create an optimized production build:
```bash
npm run build
```
The static assets will be generated in the `/dist` folder, ready for deployment to Vercel, Netlify, or AWS S3.

---
*Maintained by Rahza Technology Limited.*
