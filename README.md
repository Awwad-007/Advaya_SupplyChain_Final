# ADVAYA PRO v3.5 🚜🛡️
### *Decentralized Agricultural Supply Chain & Provenance System*

**Advaya** (Sanskrit for "Unique/Unified") is an enterprise-grade dApp designed to eliminate information asymmetry in the agricultural supply chain. Built on the **Ethereum Virtual Machine (EVM)**, it provides an immutable ledger for tracking crops from the farm plot to the consumer's plate.

## 🌟 Key Features
* **Role-Based Access Control (RBAC):** Integrated state-machine logic for Farmers, Quality Inspectors, and Distributors.
* **Off-Chain Media Persistence:** Optimized handling of high-resolution crop evidence using LocalStorage mapping to bypass Gas Limit bottlenecks.
* **Fleet Intelligence Hub:** Real-time driver assignment, vehicle verification, and live telemetry simulation using **Leaflet.js**.
* **Cryptographic Audit Trail:** Every batch contains a unique hash of weight, origin, and quality certifications.
* **Geospatial Tracking:** Interactive mapping of shipment routes using OpenStreetMap.

---

## 🛠️ Tech Stack
* **Smart Contracts:** Solidity ^0.8.0 (Hardhat Environment)
* **Frontend:** HTML5, Advanced CSS3 (Glassmorphism), JavaScript (ES6+)
* **Blockchain Library:** Ethers.js v5.7
* **Maps & UI:** Leaflet.js, Rajdhani Google Fonts
* **Local Node:** Hardhat Network (8545)

---

## 📂 Project Structure
```text
Advaya_Final/
├── contracts/           # Solidity Smart Contracts (Advaya.sol)
├── frontend/            # Web Interface (HTML, CSS, JS)
├── ignition/            # Hardhat Deployment Modules
├── scripts/             # Deployment & Interaction Scripts
└── README.md            # Project Documentation
