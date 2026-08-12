# Implementation Guide: Indian Hardware & Tools E-commerce Admin Panel

This document outlines the detailed architectural, functional, and operational requirements for building a robust B2B/B2C Admin Panel tailored specifically for the Indian Hardware & Tools e-commerce market (e.g., power tools, hand tools, safety gear, industrial fasteners, electricals).

---

## 1. Architectural Overview & Technical Stack

### Recommended Stack
*   **Frontend Framework:** React.js / Next.js (SPA or SSR depending on internal security needs) with Tailwind CSS + Shadcn UI or Ant Design (excellent for heavy data tables).
*   **State Management:** Redux Toolkit or TanStack Query (React Query) for robust server-state caching.
*   **Backend API:** Node.js (Express/NestJS) or Python (Django/FastAPI) to handle complex relational queries.
*   **Database:** PostgreSQL (for relational transactional data) + MongoDB (for dynamic, highly variable product attributes across distinct tool categories).
*   **Caching & Queues:** Redis for session caching, rate limiting, and managing background tasks (e.g., bulk invoice generation).

---

## 2. Core Modules & Indian E-commerce Specific Panels

### Module 1: Indian Taxation & Compliance Panel (GST Ready)
Operating an e-commerce platform in India requires strict adherence to the Goods and Services Tax (GST) framework and TCS (Tax Collected at Source) regulations.

*   **HSN Code Management:** 
    *   Map 4, 6, or 8-digit **Harmonized System of Nomenclature (HSN)** codes natively to specific tool categories (e.g., Hand tools: HSN 8201-8208; Power tools: HSN 8467).
    *   Maintain an editable master registry of HSN codes with respective CGST, SGST, and IGST percentages.
*   **Automated GST Split Calculations:**
    *   System must auto-detect Interstate vs. Intrastate transactions based on the warehouse origin GSTIN and customer shipping address GSTIN/State Code.
    *   **Intrastate:** Split tax evenly into **CGST** and **SGST** (e.g., 9% + 9% for an 18% slab).
    *   **Interstate:** Apply full **IGST** (e.g., 18%).
*   **B2B GSTIN Validation:**
    *   Integration with APIs (e.g., ClearTax, Sandbox, or Karza) to validate customer/vendor GSTINs instantly during onboarding or order checkout.
    *   Capture and store legal company names as per GST registration for clean tax compliance.
*   **E-Way Bill & E-Invoicing Triggers:**
    *   Automated flags for any single consignment exceeding **₹50,000** (or state-specific limits like ₹1,00,000 in Maharashtra/Delhi) to prompt admins to generate/upload an E-Way Bill before scheduling pickup.
    *   One-click API integration to generate IRN (Invoice Reference Number) and QR codes for E-Invoicing compliance.

### Module 2: Vendor & Supplier Marketplace Management (B2B Hub)
Hardware distribution in India heavily relies on a fragmented ecosystem of regional distributors, local manufacturers (e.g., hubs in Ludhiana, Jalandhar, Ahmedabad), and authorized brand dealers.

*   **Vendor Onboarding Workflow:**
    *   Document upload repository: GSTIN, PAN, Cancelled Cheque, MSME Certificate (Udyam Registration), and Brand Authorization Letters.
    *   Approval dashboard allowing admins to verify credentials, toggle active/inactive status, and define custom commission structures per vendor.
*   **Payout & Commission Engine:**
    *   Configurable settlement cycles (e.g., T+3, T+7 days post-delivery) factoring in return windows.
    *   Automated computation of Marketplace Commission, Shipping Fees, Payment Gateway (PG) charges, and **1% TCS (Tax Collected at Source)** deduction under Section 52 of CGST Act.
*   **Vendor Ledger & Escrow Monitoring:**
    *   A comprehensive ledger displaying gross sales, returns, dynamic deductions, and net payable balances per vendor.

### Module 3: Advanced Catalog & Technical Attributes Engine
Hardware products cannot be cataloged like fashion items; they require rigorous structural data, technical specifications, and bulk unit measurements.

*   **Dynamic Attribute Schemas by Category:**
    *   *Power Tools (Drills, Grinders):* Voltage, Wattage, RPM, Chuck Size, Battery Capacity, Brushless (Yes/No).
    *   *Fasteners (Screws, Bolts):* Thread Size (M3, M6, etc.), Material Grade (SS 304, SS 316, Carbon Steel), Pitch, Length, Finish.
    *   *Hand Tools (Wrenches, Spanners):* Jaw capacity, Length, Material (Chrome Vanadium), Torque Rating.
*   **B2B Tiered Pricing & Bulk Discounts:**
    *   **MOQ (Minimum Order Quantity)** controls per SKU.
    *   Volume-based slab pricing tables:
        *   1–10 Units: ₹5,000 / unit
        *   11–50 Units: ₹4,500 / unit
        *   51+ Units: ₹4,100 / unit
    *   Custom contract pricing visible only to specifically mapped verified B2B customer accounts.
*   **Weight & Volumetric Dimensions Master:**
    *   Deadweight (kg) and dimensions (L x B x H in cm) configuration per SKU—crucial for real-time logistics API calculations.

### Module 4: Hyper-Local Inventory & Multi-Warehouse Control
Industrial tools are heavy and expensive to ship across long distances. Effective inventory allocation saves substantial freight margins.

*   **Multi-Fulfillment Center Management:**
    *   Map inventory counts across physical nodes (e.g., Bhiwandi Warehouse, Chennai Hub, Delhi NCR Hub).
    *   Admin controls to set regional routing rules (e.g., if a customer orders from Mumbai, fulfill first from Bhiwandi; if stock out, route to nearest fallback).
*   **Stock Thresholds & Auto-Replenishment:**
    *   Low-stock trigger thresholds tailored per item velocity.
    *   Automated generation of Purchase Orders (POs) sent directly to mapped vendors when stock breaches safety thresholds.
*   **Serialized Inventory Tracking:**
    *   For high-value power tools (e.g., Bosch, Makita, Dewalt), the admin panel must mandate scanning/inputting unique **Serial Numbers** during the inwarding (GRN) and outwarding (packing) steps to handle warranty claims accurately.

### Module 5: Logistics, Pin-Code Serviceability & COD Controls
Indian logistics require tight integrations with national third-party logistics (3PL) aggregators and traditional freight operators, alongside rigid controls on Cash on Delivery (COD).

*   **Pin-Code Matrix & ODA Management:**
    *   Import/Export master spreadsheet of Indian pin codes mapped to serviceability classes: Delivery, Blue Dart, Delhivery, Shadowfax, Xpressbees.
    *   Tagging of **ODA (Out of Delivery Area)** zones or Tier-3/Tier-4 rural pin codes to append automated surcharge fees or disable specific payment modes.
*   **COD RTO (Return to Origin) Risk Assessment Engine:**
    *   Historical tracking of customer COD profiles. If a profile exhibits high previous RTO rates (>20%), the admin dashboard should flags the order, allowing operations to execute a "Verification Call" or automatically prompt the user to pay a partial advance online.
*   **Logistics Carrier Aggregator Dashboard:**
    *   One-click generation of manifest files, shipping labels, and API webhooks for continuous real-time tracking updates (Dispatched -> In Transit -> Out for Delivery -> Delivered).

### Module 6: B2B Credits, Quotations (RFQs) & Ledger Management
Unlike strict retail B2C, Indian industrial sales revolve around credit cycles, formal price negotiation via quotations, and purchase orders.

*   **RFQ (Request for Quote) Negotiation Workspace:**
    *   Interface to view custom requests submitted by MSMEs/corporates.
    *   Admins can adjust item quotes, suggest structural substitutes, attach custom freight quotes, and issue a formalized PDF quotation valid for 'X' days.
*   **Corporate Credit (Khata) Management:**
    *   Define sanctioned credit limits per buyer profile (e.g., ₹5,00,000 credit limit with a net-30 repayment timeline).
    *   Blocking mechanisms preventing new order checkouts if overdue interest-bearing invoices cross grace periods.
*   **Offline Payment Reconciliations:**
    *   A manual upload and matching screen for bank transfers via NEFT, RTGS, or IMPS, associating UTR (Unique Transaction Reference) numbers to respective outstanding customer corporate accounts.

---

## 3. Database Schema Blueprint (Critical Snippets)

### PostgreSQL: Products Table (Core Transactional & Tax Data)
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    brand_id INT REFERENCES brands(id),
    base_price NUMERIC(12, 2) NOT NULL,
    moq INT DEFAULT 1,
    hsn_code VARCHAR(8) NOT NULL,
    cgst_rate NUMERIC(4, 2) DEFAULT 0.00,
    sgst_rate NUMERIC(4, 2) DEFAULT 0.00,
    igst_rate NUMERIC(4, 2) DEFAULT 0.00,
    weight_kg NUMERIC(6, 2) NOT NULL,
    length_cm NUMERIC(6, 2),
    width_cm NUMERIC(6, 2),
    height_cm NUMERIC(6, 2),
    is_serialized BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB: Product Technical Attributes Collection
```json
{
  "_id": "ObjectId('60c72b2f9b1d8b2bad654321')",
  "sku": "BOSCH-GWS-600",
  "category_path": "Power Tools > Angle Grinders",
  "technical_specs": {
    "power_input_w": 670,
    "no_load_speed_rpm": 11000,
    "disc_diameter_mm": 100,
    "spindle_thread": "M10",
    "weight_without_cable_kg": 1.8,
    "brushless": false
  },
  "certifications": ["BIS", "CE"],
  "compatible_accessories": ["SKU-DISC-100A", "SKU-DISC-100B"]
}
```

---

## 4. UI/UX & Layout Architecture

### Main Sidebar Layout Structure
*   **Dashboard** (Sales Velocity, Active Dispatches, Low Stock Alerts)
*   **Catalog Management**
    *   Product Master
    *   Dynamic Attributes Master
    *   HSN & Tax Slabs
*   **Order Operations**
    *   All Orders
    *   B2B Corporate Orders
    *   RFQ Workspace
    *   RTO Audits
*   **Inventory Control**
    *   Warehouse Allocations
    *   Stock Inwarding (GRN)
    *   Serial Number Tracking
*   **Vendor / Marketplace Hub**
    *   Vendor Directory
    *   Verification Queue
    *   Payout & Commission Ledgers
*   **Logistics & Pin Codes**
    *   Carrier Aggregator Settings
    *   Serviceable Pin Codes Master
*   **B2B Accounts & Credit**
    *   Buyer Credit Registry
    *   Bank Reconciliations (NEFT/RTGS)

---

## 5. Phase-wise Implementation Strategy

### Phase 1: MVP Core Foundation (Weeks 1 - 4)
*   Set up relational tables for Products, Vendors, and Orders.
*   Implement standard GST tax configurations and HSN fields.
*   Build out basic Excel upload capability for catalog ingestion.

### Phase 2: Logistics & Fulfillment (Weeks 5 - 8)
*   Integrate third-party Indian logistics APIs (e.g., Shiprocket or Delhivery).
*   Add multi-warehouse logic and tracking workflows.
*   Implement COD verification mechanisms.

### Phase 3: B2B Enterprise Engine (Weeks 9 - 12)
*   Deploy the dynamic RFQ engine and workflow dashboard.
*   Incorporate Corporate Credit Tracking (Khata) and automated payment reconciliation systems.
*   Execute official security audits and end-to-end performance tuning for bulk operations.
