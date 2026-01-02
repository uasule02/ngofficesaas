
# NGOFFICE SaaS Platform

## Overview
NGOFFICE is a high-performance, multi-tenant SaaS frontend built for modular organizational management. It provides a robust **Platform Control Center** for global administrators and a tailored **Tenant Workspace** for individual organizations.

This repository is designed to interface with the [Project Monitoring SaaS Backend](https://github.com/Rahza-Technology-Limited/project_monitoring_saas.git).

## Architecture
- **Frontend**: React 19 (ESM based)
- **UI/UX**: Tailwind CSS with a "High-Fidelity" design language.
- **State Management**: React Hooks + Contextual URL routing.
- **Intelligence**: Integrated Gemini-3-Flash for automated business insights and governance auditing.
- **Multitenancy**: Dynamic module provisioning system with daily prorated billing logic.

## Project Structure
- `/views/PlatformAdmin`: Global governance, tenant lifecycle, and module marketplace management.
- `/views/Tenant`: Staff management, finance tracking, and module subscription interface.
- `/services`: Gemini AI integration and Mock/Live API connectors.

## Deployment & Integration
The frontend is built to be stateless, relying on the `API_KEY` environment variable for AI features and the `backendService.ts` for organizational data. To connect your live backend, update the `BASE_URL` in `services/backendService.ts`.

---
*Maintained by Rahza Technology Limited.*
