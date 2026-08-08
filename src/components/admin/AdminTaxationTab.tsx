'use client';

import React, { useState } from 'react';
import { HsnCodeMaster, calculateGstSplit, INITIAL_HSN_CODES } from '../../utils/adminMockData';
import { Save, RefreshCw, AlertTriangle, FileSpreadsheet, ShieldAlert, Download, Calendar, CheckCircle2, Sparkles, FileText, RotateCcw, Plus, X } from 'lucide-react';
import * as XLSX from 'xlsx';

interface AdminTaxationTabProps {
  hsnCodes: HsnCodeMaster[];
  onSaveHsnCodes: (updatedCodes: HsnCodeMaster[]) => void;
  userRole?: string;
}

export const AdminTaxationTab: React.FC<AdminTaxationTabProps> = ({ hsnCodes, onSaveHsnCodes, userRole }) => {
  const isReadOnly = userRole === 'employee';
  // Editing state for HSN Master Slabs
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCgst, setEditCgst] = useState(0);
  const [editSgst, setEditSgst] = useState(0);
  const [editIgst, setEditIgst] = useState(0);

  // New HSN Creation Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHsnCode, setNewHsnCode] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCgst, setNewCgst] = useState(9);
  const [newSgst, setNewSgst] = useState(9);

  // Persistent Reset State initialized from localStorage (Defaults to TRUE = All Data Zero)
  const [isResetZero, setIsResetZero] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('abuzz_taxation_is_reset');
      if (saved === null) return true;
      return saved === 'true';
    }
    return true;
  });

  // GST Compliance Split Simulator States
  const [simPrice, setSimPrice] = useState(15000);
  const [simQty, setSimQty] = useState(4);
  const [simHsn, setSimHsn] = useState('8467');
  const [originState, setOriginState] = useState('Punjab');
  const [destinationState, setDestinationState] = useState('Maharashtra');

  // Monthly GST Report Download States
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [toastMsg, setToastMsg] = useState('');

  const handleAddNewHsn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHsnCode.trim()) return;

    const exists = hsnCodes.some(h => h.code.trim() === newHsnCode.trim());
    if (exists) {
      setToastMsg(`HSN Code ${newHsnCode.trim()} already exists in registry!`);
      setTimeout(() => setToastMsg(''), 3500);
      return;
    }

    const updated: HsnCodeMaster[] = [
      ...hsnCodes,
      {
        code: newHsnCode.trim(),
        category: newCategory.trim() || 'General Hardware',
        cgst: Number(newCgst) || 0,
        sgst: Number(newSgst) || 0,
        igst: (Number(newCgst) || 0) + (Number(newSgst) || 0),
        description: newDescription.trim() || 'Industrial equipment and hardware category'
      }
    ];

    onSaveHsnCodes(updated);
    setIsAddModalOpen(false);
    setNewHsnCode('');
    setNewCategory('');
    setNewDescription('');
    setNewCgst(9);
    setNewSgst(9);
    setToastMsg(`HSN Code ${newHsnCode.trim()} added successfully!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleResetTaxationData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('abuzz_admin_hsn_codes');
      localStorage.setItem('abuzz_taxation_is_reset', 'true');
    }
    onSaveHsnCodes(INITIAL_HSN_CODES);
    setIsResetZero(true);
    setToastMsg('All Taxation, GST returns & HSN metrics reset to ZERO!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleRestoreBaseline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('abuzz_taxation_is_reset', 'false');
    }
    setIsResetZero(false);
    setToastMsg('Sample demo tax data re-loaded.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Perform active calculations
  const simSubtotal = simPrice * simQty;
  const splitResult = calculateGstSplit(simPrice, simQty, simHsn, originState, destinationState, hsnCodes);
  const simTotal = simSubtotal + splitResult.totalTax;

  const statesList = [
    'Punjab', 'Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Uttar Pradesh'
  ];

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const yearsList = ['2026', '2025', '2024'];

  const handleEditHsn = (idx: number, master: HsnCodeMaster) => {
    setEditingIndex(idx);
    setEditCgst(master.cgst);
    setEditSgst(master.sgst);
    setEditIgst(master.igst);
  };

  const handleSaveHsn = (idx: number) => {
    const updated = [...hsnCodes];
    updated[idx] = {
      ...updated[idx],
      cgst: editCgst,
      sgst: editSgst,
      igst: editIgst
    };
    onSaveHsnCodes(updated);
    setEditingIndex(null);
  };

  // Mock Monthly GST Transactions Data Generator
  const generateMonthlyGstData = () => {
    const monthNum = (monthsList.indexOf(selectedMonth) + 1).toString().padStart(2, '0');
    
    return [
      {
        'Invoice Number': `INV-${selectedYear}-${monthNum}-001`,
        'Invoice Date': `${selectedYear}-${monthNum}-04`,
        'Buyer Name': 'Larsen & Toubro Infrastructure Ltd',
        'Buyer GSTIN': '03AAACL1234A1Z1',
        'HSN Code': '8467',
        'Category': 'Power Tools & Accessories',
        'Place of Supply': 'Maharashtra',
        'Supply Type': 'Interstate (IGST)',
        'Taxable Subtotal (INR)': 544950.00,
        'CGST Rate': '0%',
        'CGST (INR)': 0.00,
        'SGST Rate': '0%',
        'SGST (INR)': 0.00,
        'IGST Rate': '18%',
        'IGST (INR)': 98091.00,
        'Section 52 TCS (1%)': 5449.50,
        'Total Invoice Value (INR)': 643041.00
      },
      {
        'Invoice Number': `INV-${selectedYear}-${monthNum}-002`,
        'Invoice Date': `${selectedYear}-${monthNum}-08`,
        'Buyer Name': 'Tata Projects Infrastructure Pvt Ltd',
        'Buyer GSTIN': '03AAACT5678B1Z2',
        'HSN Code': '2523',
        'Category': 'Building Materials (Cement)',
        'Place of Supply': 'Punjab',
        'Supply Type': 'Intrastate (CGST+SGST)',
        'Taxable Subtotal (INR)': 350000.00,
        'CGST Rate': '14%',
        'CGST (INR)': 49000.00,
        'SGST Rate': '14%',
        'SGST (INR)': 49000.00,
        'IGST Rate': '0%',
        'IGST (INR)': 0.00,
        'Section 52 TCS (1%)': 3500.00,
        'Total Invoice Value (INR)': 448000.00
      },
      {
        'Invoice Number': `INV-${selectedYear}-${monthNum}-003`,
        'Invoice Date': `${selectedYear}-${monthNum}-12`,
        'Buyer Name': 'Godrej Construction Corp',
        'Buyer GSTIN': '27AACCG9999C1Z9',
        'HSN Code': '8201',
        'Category': 'Hand Tools & Spanners',
        'Place of Supply': 'Gujarat',
        'Supply Type': 'Interstate (IGST)',
        'Taxable Subtotal (INR)': 185000.00,
        'CGST Rate': '0%',
        'CGST (INR)': 0.00,
        'SGST Rate': '0%',
        'SGST (INR)': 0.00,
        'IGST Rate': '18%',
        'IGST (INR)': 33300.00,
        'Section 52 TCS (1%)': 1850.00,
        'Total Invoice Value (INR)': 218300.00
      },
      {
        'Invoice Number': `INV-${selectedYear}-${monthNum}-004`,
        'Invoice Date': `${selectedYear}-${monthNum}-19`,
        'Buyer Name': 'Shapoorji Pallonji Engineering',
        'Buyer GSTIN': '03AACCS4444D1Z4',
        'HSN Code': '7318',
        'Category': 'Fasteners & Hardware Bolts',
        'Place of Supply': 'Punjab',
        'Supply Type': 'Intrastate (CGST+SGST)',
        'Taxable Subtotal (INR)': 220000.00,
        'CGST Rate': '9%',
        'CGST (INR)': 19800.00,
        'SGST Rate': '9%',
        'SGST (INR)': 19800.00,
        'IGST Rate': '0%',
        'IGST (INR)': 0.00,
        'Section 52 TCS (1%)': 2200.00,
        'Total Invoice Value (INR)': 259600.00
      },
      {
        'Invoice Number': `INV-${selectedYear}-${monthNum}-005`,
        'Invoice Date': `${selectedYear}-${monthNum}-25`,
        'Buyer Name': 'Reliable Electrical Enterprises',
        'Buyer GSTIN': '07AACCR1111E1Z0',
        'HSN Code': '8544',
        'Category': 'Electrical Cables & Wiring',
        'Place of Supply': 'Delhi',
        'Supply Type': 'Interstate (IGST)',
        'Taxable Subtotal (INR)': 145000.00,
        'CGST Rate': '0%',
        'CGST (INR)': 0.00,
        'SGST Rate': '0%',
        'SGST (INR)': 0.00,
        'IGST Rate': '18%',
        'IGST (INR)': 26100.00,
        'Section 52 TCS (1%)': 1450.00,
        'Total Invoice Value (INR)': 171100.00
      }
    ];
  };

  // Download Monthly GST Report (.xlsx)
  const handleDownloadExcelReport = () => {
    const reportRows = generateMonthlyGstData();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(reportRows);

    // Set column widths for clean readability
    ws['!cols'] = [
      { wch: 20 }, // Invoice Number
      { wch: 14 }, // Invoice Date
      { wch: 36 }, // Buyer Name
      { wch: 18 }, // Buyer GSTIN
      { wch: 12 }, // HSN Code
      { wch: 28 }, // Category
      { wch: 16 }, // Place of Supply
      { wch: 24 }, // Supply Type
      { wch: 22 }, // Taxable Subtotal
      { wch: 12 }, // CGST Rate
      { wch: 14 }, // CGST
      { wch: 12 }, // SGST Rate
      { wch: 14 }, // SGST
      { wch: 12 }, // IGST Rate
      { wch: 14 }, // IGST
      { wch: 20 }, // TCS
      { wch: 24 }  // Total Invoice Value
    ];

    XLSX.utils.book_append_sheet(wb, ws, `GST Audit ${selectedMonth} ${selectedYear}`);
    const fileName = `Abuzz_GST_Report_${selectedMonth}_${selectedYear}.xlsx`;
    XLSX.writeFile(wb, fileName);

    setToastMsg(`GST Report for ${selectedMonth} ${selectedYear} successfully downloaded!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Download Monthly GST Report (.csv)
  const handleDownloadCsvReport = () => {
    const reportRows = generateMonthlyGstData();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(reportRows);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
    const fileName = `Abuzz_GST_Report_${selectedMonth}_${selectedYear}.csv`;
    XLSX.writeFile(wb, fileName, { bookType: 'csv' });

    setToastMsg(`GST CSV Summary for ${selectedMonth} ${selectedYear} downloaded!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Calculate Monthly Summary Stats
  const currentMonthData = isResetZero ? [] : generateMonthlyGstData();
  const totalTaxableSales = currentMonthData.reduce((acc, r) => acc + r['Taxable Subtotal (INR)'], 0);
  const totalCgst = currentMonthData.reduce((acc, r) => acc + r['CGST (INR)'], 0);
  const totalSgst = currentMonthData.reduce((acc, r) => acc + r['SGST (INR)'], 0);
  const totalIgst = currentMonthData.reduce((acc, r) => acc + r['IGST (INR)'], 0);
  const totalTcs = currentMonthData.reduce((acc, r) => acc + r['Section 52 TCS (1%)'], 0);
  const grossInvoiceTotal = currentMonthData.reduce((acc, r) => acc + r['Total Invoice Value (INR)'], 0);

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to edit HSN rates.</p>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 inset-x-6 z-50 p-3 rounded-xl bg-primary text-white text-center font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3 max-w-lg mx-auto">
          <Sparkles className="h-4.5 w-4.5 animate-spin" />
          <span>{toastMsg}</span>
        </div>
      )}
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">Indian Taxation & GST Slabs</h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">Map HSN registries to items, audit interstate vs. intrastate splits, and export monthly GSTR tax returns.</p>
        </div>

        <button
          onClick={handleResetTaxationData}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold self-start sm:self-auto cursor-pointer shadow-xs"
          title="Reset HSN Master Slabs and clear taxation metrics"
        >
          <RotateCcw className="h-4 w-4" /> Reset Taxation & HSN Data
        </button>
      </div>

      {/* Monthly GST Compliance & Report Download Card */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm glass relative overflow-hidden space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" /> Monthly GST Return & Audit Reports
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Generate and download consolidated monthly GSTR-1 & GSTR-3B audit spreadsheets with HSN splits and TCS (Section 52) deductions.
            </p>
          </div>

          {/* Month & Year Selectors + Download Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-background/50 border border-border rounded-xl px-3 py-1.5">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
              >
                {monthsList.map(m => (
                  <option key={m} value={m} className="bg-card text-foreground">{m}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-background/50 border border-border rounded-xl px-3 py-1.5">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
              >
                {yearsList.map(y => (
                  <option key={y} value={y} className="bg-card text-foreground">{y}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleDownloadExcelReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download Excel (.xlsx)
            </button>

            <button
              onClick={handleDownloadCsvReport}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 text-xs font-bold text-foreground transition-all cursor-pointer"
              title="Download CSV Format"
            >
              <FileText className="h-4 w-4 text-muted-foreground" /> CSV
            </button>

            {isResetZero && (
              <button
                onClick={handleRestoreBaseline}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" /> Restore Baseline Data
              </button>
            )}
          </div>
        </div>

        {/* Monthly Tax Summary KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/40">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Taxable Sales</span>
            <span className="text-sm font-black text-foreground mt-0.5 block">₹{totalTaxableSales.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/40">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">CGST Collected</span>
            <span className="text-sm font-black text-foreground mt-0.5 block">₹{totalCgst.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/40">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">SGST Collected</span>
            <span className="text-sm font-black text-foreground mt-0.5 block">₹{totalSgst.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20">
            <span className="text-[9px] font-bold text-primary uppercase block">IGST Collected</span>
            <span className="text-sm font-black text-primary mt-0.5 block">₹{totalIgst.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[9px] font-bold text-amber-500 uppercase block">TCS Sec 52 (1%)</span>
            <span className="text-sm font-black text-amber-500 mt-0.5 block">₹{totalTcs.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[9px] font-bold text-emerald-500 uppercase block">Gross Invoice Value</span>
            <span className="text-sm font-black text-emerald-500 mt-0.5 block">₹{grossInvoiceTotal.toLocaleString('en-IN')}</span>
          </div>

        </div>
      </div>

      {/* Grid: GST Master Slabs & GST Split Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GST Master Slabs Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="h-4.5 w-4.5 text-primary" /> HSN Master Tax Registry ({hsnCodes.length})
            </h3>

            {!isReadOnly && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add HSN Code
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold">
                  <th className="p-3">HSN Code</th>
                  <th className="p-3">Category Map</th>
                  <th className="p-3 text-center">CGST</th>
                  <th className="p-3 text-center">SGST</th>
                  <th className="p-3 text-center">IGST</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {hsnCodes.map((h, idx) => {
                  const isEditing = editingIndex === idx;
                  return (
                    <tr key={h.code} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3 font-mono font-bold text-primary">{h.code}</td>
                      <td className="p-3">
                        <span className="font-semibold text-foreground block">{h.category}</span>
                        <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{h.description}</span>
                      </td>
                      
                      {/* CGST */}
                      <td className="p-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editCgst}
                            onChange={(e) => setEditCgst(Number(e.target.value))}
                            className="w-12 text-center rounded border border-border bg-background"
                          />
                        ) : (
                          <span className="font-bold">{h.cgst}%</span>
                        )}
                      </td>

                      {/* SGST */}
                      <td className="p-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editSgst}
                            onChange={(e) => setEditSgst(Number(e.target.value))}
                            className="w-12 text-center rounded border border-border bg-background"
                          />
                        ) : (
                          <span className="font-bold">{h.sgst}%</span>
                        )}
                      </td>

                      {/* IGST */}
                      <td className="p-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editIgst}
                            onChange={(e) => setEditIgst(Number(e.target.value))}
                            className="w-12 text-center rounded border border-border bg-background"
                          />
                        ) : (
                          <span className="font-bold text-primary">{h.igst}%</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-center">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveHsn(idx)}
                            className="p-1 rounded bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 cursor-pointer"
                            title="Save"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                        ) : (
                          !isReadOnly && (
                            <button
                              onClick={() => handleEditHsn(idx, h)}
                              className="text-primary hover:underline font-bold cursor-pointer"
                            >
                              Edit
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* GST Split & E-Way Bill Simulator */}
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <RefreshCw className="h-4.5 w-4.5 text-primary" /> Tax Split Simulator
          </h3>

          <div className="space-y-3.5">
            
            {/* Input Price & Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Item Unit Price (₹)</label>
                <input
                  type="number"
                  value={simPrice}
                  onChange={(e) => setSimPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Item Quantity</label>
                <input
                  type="number"
                  value={simQty}
                  onChange={(e) => setSimQty(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-center"
                />
              </div>
            </div>

            {/* Input HSN Code */}
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Active HSN Category</label>
              <select
                value={simHsn}
                onChange={(e) => setSimHsn(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 min-h-[44px]"
              >
                {hsnCodes.map(h => (
                  <option key={h.code} value={h.code}>{h.code} ({h.category})</option>
                ))}
              </select>
            </div>

            {/* Warehouse State vs Customer Shipping State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Warehouse Origin</label>
                <select
                  value={originState}
                  onChange={(e) => setOriginState(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 min-h-[44px]"
                >
                  {statesList.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Shipping Destination</label>
                <select
                  value={destinationState}
                  onChange={(e) => setDestinationState(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 min-h-[44px]"
                >
                  {statesList.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invoice Computation Summary */}
            <div className="border-t border-border/40 pt-4 space-y-2.5">
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Taxable Value (Subtotal)</span>
                <span className="text-foreground">₹{simSubtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center text-[10px] bg-foreground/5 p-2.5 rounded-xl border border-border/40">
                <span className="text-muted-foreground uppercase tracking-wider font-bold">Transaction Type</span>
                <span className={`font-bold ${splitResult.isInterstate ? 'text-primary' : 'text-emerald-500'}`}>
                  {splitResult.isInterstate ? 'INTERSTATE (IGST)' : 'INTRASTATE (CGST + SGST)'}
                </span>
              </div>

              {splitResult.isInterstate ? (
                <div className="flex justify-between font-semibold text-primary">
                  <span>IGST ({splitResult.igstRate}%)</span>
                  <span>₹{splitResult.igstAmount.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between font-semibold">
                    <span>CGST ({splitResult.cgstRate}%)</span>
                    <span>₹{splitResult.cgstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>SGST ({splitResult.sgstRate}%)</span>
                    <span>₹{splitResult.sgstAmount.toLocaleString('en-IN')}</span>
                  </div>
                </>
              )}

              <div className="border-t border-border pt-2.5 flex justify-between font-extrabold text-sm">
                <span className="text-foreground">Simulated Invoice Total</span>
                <span className="text-primary text-base">₹{simTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* E-way bill warning box */}
            {simTotal >= 50000 && (
              <div className="flex gap-2.5 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-[10px] leading-relaxed text-amber-600 dark:text-amber-400">
                <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Mandatory E-Way Bill Consignment Threshold:</strong>
                  <p className="mt-0.5">This transaction exceeds the ₹50,000 regulatory limit. The admin panel requires completing an E-Way Bill docket generation before generating package cargo barcodes.</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ADD NEW HSN CODE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl glass space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Plus className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-extrabold uppercase text-foreground">Add New HSN Code</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-foreground/10 text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewHsn} className="space-y-4">
              <div>
                <label className="block text-[10.5px] font-extrabold uppercase text-muted-foreground mb-1">
                  HSN Code (4 to 8 Digits) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8205"
                  value={newHsnCode}
                  onChange={(e) => setNewHsnCode(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:border-primary focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-extrabold uppercase text-muted-foreground mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Measuring Tools & Calipers"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:border-primary focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-extrabold uppercase text-muted-foreground mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Precision vernier calipers, micrometers, dial gauges"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-none min-h-[42px]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-foreground/5 border border-border/50">
                <div>
                  <label className="block text-[9.5px] font-extrabold uppercase text-muted-foreground mb-1">
                    CGST (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="28"
                    required
                    value={newCgst}
                    onChange={(e) => setNewCgst(Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background p-1.5 text-center text-xs font-black text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-extrabold uppercase text-muted-foreground mb-1">
                    SGST (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="28"
                    required
                    value={newSgst}
                    onChange={(e) => setNewSgst(Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background p-1.5 text-center text-xs font-black text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-extrabold uppercase text-primary mb-1">
                    IGST (%)
                  </label>
                  <div className="w-full rounded-lg bg-primary/10 border border-primary/20 p-1.5 text-center text-xs font-black text-primary">
                    {(Number(newCgst) || 0) + (Number(newSgst) || 0)}%
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 text-xs font-bold text-muted-foreground hover:bg-foreground/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary text-white py-2.5 text-xs font-extrabold shadow-md hover:bg-primary/95 cursor-pointer"
                >
                  Add HSN Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTaxationTab;
