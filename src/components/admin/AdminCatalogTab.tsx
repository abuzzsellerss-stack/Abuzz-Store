'use client';

import React, { useState } from 'react';
import { Product } from '../../types';
import { HsnCodeMaster, getHsnCodes, validateCatalogRow, CatalogRowValidationResult, generateMultilingualKeywords } from '../../utils/adminMockData';
import { MOCK_PRODUCTS } from '../../utils/seed';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { Edit3, Plus, X, Save, AlertCircle, Info, Download, Upload, Trash2, RefreshCw, Globe } from 'lucide-react';

interface AdminCatalogTabProps {
  products: Product[];
  onSaveProducts: (updatedProducts: Product[]) => void;
  userRole?: string;
}

export const AdminCatalogTab: React.FC<AdminCatalogTabProps> = ({ products, onSaveProducts, userRole }) => {
  const isReadOnly = userRole === 'employee';
  const [hsnCodes] = useState<HsnCodeMaster[]>(getHsnCodes());
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selection/Editing states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  
  // Bulk edit values
  const [bulkStockStatus, setBulkStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [bulkPricePercent, setBulkPricePercent] = useState('');
  
  // Bulk upload states
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [parsedRows, setParsedRows] = useState<CatalogRowValidationResult[]>([]);
  const [uploadError, setUploadError] = useState('');

  // Form states for Product Edit/Create
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Power Tools & Accessories');
  const [subcategory, setSubcategory] = useState('Drills & Drivers');
  const [price, setPrice] = useState(0);
  const [moq, setMoq] = useState(1);
  const [stockStatus, setStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Compliance & Technical Slabs
  const [selectedHsn, setSelectedHsn] = useState('8467');
  const [weightKg, setWeightKg] = useState(1.5);
  const [lengthCm, setLengthCm] = useState(20);
  const [widthCm, setWidthCm] = useState(15);
  const [heightCm, setHeightCm] = useState(10);
  const [isSerialized, setIsSerialized] = useState(false);

  // Dynamic Technical Specs State
  const [specPower, setSpecPower] = useState('');
  const [specSpeed, setSpecSpeed] = useState('');
  const [specSize, setSpecSize] = useState('');
  const [specMaterial, setSpecMaterial] = useState('');

  // Tiered Slab Pricing state
  const [slabQty1, setSlabQty1] = useState(10);
  const [slabPrice1, setSlabPrice1] = useState(0);
  const [slabQty2, setSlabQty2] = useState(50);
  const [slabPrice2, setSlabPrice2] = useState(0);

  // SEO Metadata States
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [noIndex, setNoIndex] = useState(false);

  // Search Keywords State (Catalog Search Tags / Synonyms)
  const [searchKeywords, setSearchKeywords] = useState('');

  // Gallery Multi-Angle Images State
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState('');

  // Filter products by search (SKU, title, category, subcategory, searchKeywords, metaKeywords)
  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const matchId = p.id && p.id.toLowerCase().includes(term);
    const matchTitle = p.title && p.title.toLowerCase().includes(term);
    const matchCategory = p.category && p.category.toLowerCase().includes(term);
    const matchSubcategory = p.subcategory && p.subcategory.toLowerCase().includes(term);
    const matchKeywords = p.searchKeywords && p.searchKeywords.some(kw => kw.toLowerCase().includes(term));
    const matchSeoKeywords = p.seo?.metaKeywords && p.seo.metaKeywords.some(kw => kw.toLowerCase().includes(term));
    return matchId || matchTitle || matchCategory || matchSubcategory || matchKeywords || matchSeoKeywords;
  });

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreatingNew(false);
    
    // Set basic states
    setSku(product.id || '');
    setTitle(product.title);
    setCategory(product.category);
    setSubcategory(product.subcategory);
    setPrice(product.price);
    setStockStatus(product.stockStatus);
    setDescription(product.description || '');
    setImageUrl(product.imageUrl || '');
    
    // Gallery images initialization
    const initialGallery = product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : (product.imageUrl ? [product.imageUrl] : []);
    setGalleryImages(initialGallery);
    setNewGalleryUrlInput('');

    // Volumetric specs
    setWeightKg(Number(product.specifications?.['Weight']?.replace(/[^0-9.]/g, '')) || 2.5);
    setLengthCm(Number(product.specifications?.['Length']?.replace(/[^0-9.]/g, '')) || 20);
    setWidthCm(15);
    setHeightCm(10);
    
    // HSN code and Serialization
    const resolvedHsn = hsnCodes.find(h => h.category === product.category)?.code || '8467';
    setSelectedHsn(resolvedHsn);
    setIsSerialized(product.category === 'Power Tools & Accessories');

    // Technical attributes mapping
    setSpecPower(product.specifications?.['Voltage'] || product.specifications?.['Motor'] || '');
    setSpecSpeed(product.specifications?.['Speed'] || product.specifications?.['Max Speed'] || '');
    setSpecSize(product.specifications?.['Chuck Size'] || product.specifications?.['Sizes'] || product.specifications?.['Diameter'] || '');
    setSpecMaterial(product.specifications?.['Material'] || '');

    // Setup Mock Tiered Pricing based on price
    setMoq(1);
    setSlabQty1(10);
    setSlabPrice1(Number((product.price * 0.95).toFixed(2))); // 5% discount
    setSlabQty2(50);
    setSlabPrice2(Number((product.price * 0.90).toFixed(2))); // 10% discount

    // Setup SEO Metadata & Multilingual Search Keywords
    setMetaTitle(product.seo?.metaTitle || `${product.title} - Buy Online | Abuzz Store`);
    setMetaDescription(product.seo?.metaDescription || product.description?.slice(0, 160) || '');
    setMetaKeywords(product.seo?.metaKeywords?.join(', ') || `${product.category}, ${product.subcategory}`);
    setCanonicalUrl(product.seo?.canonicalUrl || `https://abuzz-store.com/product/${product.id}`);
    setOgImage(product.seo?.ogImage || product.imageUrl || '');
    setNoIndex(product.seo?.noIndex || false);

    const activeKeywords = generateMultilingualKeywords(product);
    setSearchKeywords(activeKeywords.join(', '));
  };

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingProduct(null);
    
    // Reset Form states
    setSku('BOSCH-SKU-' + Math.floor(1000 + Math.random() * 9000).toString());
    setTitle('');
    setCategory('Power Tools & Accessories');
    setSubcategory('Drills & Drivers');
    setPrice(0);
    setMoq(5); // high default for B2B wholesale
    setStockStatus('in_stock');
    setDescription('');
    const defaultCover = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600';
    setImageUrl(defaultCover);
    setGalleryImages([defaultCover]);
    setNewGalleryUrlInput('');
    
    setSelectedHsn('8467');
    setWeightKg(2.0);
    setLengthCm(25);
    setWidthCm(18);
    setHeightCm(12);
    setIsSerialized(true);

    setSpecPower('750W');
    setSpecSpeed('0-2800 RPM');
    setSpecSize('13 mm');
    setSpecMaterial('Hardened Alloy Steel');

    setSlabQty1(10);
    setSlabPrice1(0);
    setSlabQty2(50);
    setSlabPrice2(0);

    // Reset SEO Metadata & Search Keywords
    setMetaTitle('');
    setMetaDescription('');
    setMetaKeywords('');
    setCanonicalUrl('');
    setOgImage('');
    setNoIndex(false);
    setSearchKeywords('');
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const rawResult = reader.result as string;
        if (rawResult) {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 800;
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxDim) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              }
            } else {
              if (height > maxDim) {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedUrl = canvas.toDataURL('image/jpeg', 0.8);
              setImageUrl(compressedUrl);
              setGalleryImages(prev => prev.includes(compressedUrl) ? prev : [compressedUrl, ...prev]);
            } else {
              setImageUrl(rawResult);
              setGalleryImages(prev => prev.includes(rawResult) ? prev : [rawResult, ...prev]);
            }
          };
          img.src = rawResult;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    if (isReadOnly) return;
    setGalleryImages(prev => {
      const removedUrl = prev[indexToRemove];
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (removedUrl === imageUrl) {
        setImageUrl(updated[0] || '');
      }
      return updated;
    });
  };

  const handleDownloadTemplate = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Catalog Template');
      const validationsSheet = workbook.addWorksheet('Validations');
      
      // Setup template headers
      const headers = ['SKU', 'Title', 'Category', 'Subcategory', 'Price', 'MOQ', 'Description', 'Weight_kg', 'HSN_Code', 'Is_Serialized'];
      worksheet.addRow(headers);
      
      // Styling headers for premium look
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF97316' } // Orange accent
      };
      
      // Sample Rows
      const sampleRow1 = ['DEW-DCD-777', 'DeWalt Cordless Compact Drill', 'Power Tools & Accessories', 'Drills & Drivers', 7999, 5, 'High torque brushless motor.', 1.8, '8467', 'TRUE'];
      const sampleRow2 = ['STAN-WRENCH-10', 'Stanley Adjustable Wrench 10 Inch', 'Hand Tools', 'Wrenches & Spanners', 1200, 5, 'Chrome Vanadium steel adjustable wrench', 0.8, '8204', 'FALSE'];
      worksheet.addRow(sampleRow1);
      worksheet.addRow(sampleRow2);
      
      // Dropdown validation data
      const categories = [
        'Power Tools & Accessories',
        'Hand Tools',
        'Safety Gears & PPE',
        'Building Materials',
        'Fasteners & Hardware',
        'Plumbing Supplies',
        'Electrical Infrastructure'
      ];
      
      const subcategories = [
        'Drills & Drivers', 'Saws & Cutting Tools', 'Grinders & Sanders', 'Rotary Hammers', 'Accessories',
        'Wrenches & Spanners', 'Hammers & Demolition', 'Pliers & Cutters', 'Screwdrivers', 'Measuring Tools',
        'Respiratory & Fall Protection', 'Head & Face Protection', 'Hand & Footwear Safety', 'Protective Apparel',
        'Cement & Structural Bindings', 'Waterproofing & Chemicals', 'Masonry & Blocks',
        'Screws & Bolts', 'Architectural Hardware', 'Anchors & Plugs',
        'Pipes & Fittings', 'Valves & Flow Control', 'Pumps & Accessories',
        'Wiring & Containment', 'Switches & Sockets', 'Distribution Boards'
      ];
      
      categories.forEach((cat, index) => {
        validationsSheet.getCell(index + 1, 1).value = cat;
      });
      
      subcategories.forEach((sub, index) => {
        validationsSheet.getCell(index + 1, 2).value = sub;
      });
      
      // Configure dropdown data validation on main sheet rows 2-100
      for (let i = 2; i <= 100; i++) {
        worksheet.getCell(i, 3).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [`=Validations!$A$1:$A$${categories.length}`],
          showErrorMessage: true,
          errorTitle: 'Invalid Category',
          error: 'Please pick a category from the dropdown menu list.'
        };
        
        worksheet.getCell(i, 4).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [`=Validations!$B$1:$B$${subcategories.length}`],
          showErrorMessage: true,
          errorTitle: 'Invalid Subcategory',
          error: 'Please pick a subcategory from the dropdown menu list.'
        };
      }
      
      // Size columns appropriately
      worksheet.columns.forEach(column => {
        column.width = 22;
      });
      
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "abuzz_catalog_template.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to generate template: ', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });
        
        if (jsonData.length === 0) {
          setUploadError('The uploaded file contains no rows.');
          setParsedRows([]);
          return;
        }

        const results = jsonData.map((row, index) => validateCatalogRow(row, index + 1));
        setParsedRows(results);
        setUploadError('');
      } catch (err) {
        console.error(err);
        setUploadError('Failed to parse the file. Ensure it is a valid Excel or CSV document.');
        setParsedRows([]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCommitUpload = () => {
    const validRows = parsedRows.filter(r => r.isValid).map(r => r.row);
    if (validRows.length === 0) return;

    let updatedList = [...products];

    validRows.forEach(row => {
      const specifications: Record<string, string> = {
        'Weight': `${row.weight_kg} kg`,
      };
      
      const newProduct: Product = {
        id: row.sku!,
        title: row.title!,
        category: row.category!,
        subcategory: row.subcategory || 'General',
        price: Number(row.price),
        stockStatus: 'in_stock',
        description: row.description || '',
        imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600',
        specifications,
        popularity: 50,
        rating: 4.5,
        reviewsCount: 1
      };

      (newProduct as any).hsnCode = row.hsn_code;
      (newProduct as any).isSerialized = row.is_serialized;
      (newProduct as any).moq = row.moq;

      const existsIdx = updatedList.findIndex(p => p.id === row.sku);
      if (existsIdx > -1) {
        updatedList[existsIdx] = newProduct;
      } else {
        updatedList.unshift(newProduct);
      }
    });

    onSaveProducts(updatedList);
    setIsBulkUploadOpen(false);
    setParsedRows([]);
    setUploadError('');
  };

  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const result = evt.target?.result as string;
        if (result) {
          setGalleryImages(prev => prev.includes(result) ? prev : [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddGalleryUrl = () => {
    const trimmed = newGalleryUrlInput.trim();
    if (trimmed && !galleryImages.includes(trimmed)) {
      setGalleryImages(prev => [...prev, trimmed]);
      if (!imageUrl) setImageUrl(trimmed);
      setNewGalleryUrlInput('');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build specs record dynamically
    const specifications: Record<string, string> = {
      'Weight': `${weightKg} kg`,
      'Dimensions': `${lengthCm}x${widthCm}x${heightCm} cm`
    };

    if (specPower) specifications['Power Rating'] = specPower;
    if (specSpeed) specifications['Operational Speed'] = specSpeed;
    if (specSize) specifications['Capacity Size'] = specSize;
    if (specMaterial) specifications['Material'] = specMaterial;

    const savedProduct: Product = {
      id: sku,
      title,
      category,
      subcategory,
      price,
      stockStatus,
      description,
      imageUrl,
      galleryImages: galleryImages.length > 0 ? galleryImages : [imageUrl],
      specifications,
      popularity: editingProduct ? editingProduct.popularity : 50,
      rating: editingProduct ? editingProduct.rating : 4.5,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 10,
      seo: {
        metaTitle: metaTitle || `${title} - Buy Online | Abuzz Store`,
        metaDescription: metaDescription || description?.slice(0, 160) || '',
        metaKeywords: metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : [category, subcategory],
        canonicalUrl: canonicalUrl || `https://abuzz-store.com/product/${sku}`,
        ogImage: ogImage || imageUrl,
        noIndex
      },
      searchKeywords: searchKeywords 
        ? searchKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : [category, subcategory]
    };

    // Include custom pricing tier metadata for simulation display
    (savedProduct as any).tieredPricing = [
      { minQty: 1, maxQty: slabQty1 - 1, pricePerUnit: price },
      { minQty: slabQty1, maxQty: slabQty2 - 1, pricePerUnit: slabPrice1 || price },
      { minQty: slabQty2, maxQty: 9999, pricePerUnit: slabPrice2 || price }
    ];
    (savedProduct as any).hsnCode = selectedHsn;
    (savedProduct as any).isSerialized = isSerialized;
    (savedProduct as any).moq = moq;

    let updatedList = [...products];

    if (isCreatingNew) {
      updatedList.unshift(savedProduct); // add new to top
    } else {
      const targetId = editingProduct ? editingProduct.id : sku;
      updatedList = updatedList.map(p => (p.id === targetId || p.id === sku) ? savedProduct : p);
    }

    onSaveProducts(updatedList);
    
    // Close editor modal
    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  const handleBulkStockUpdate = () => {
    if (isReadOnly || selectedProductIds.length === 0) return;
    const updated = products.map(p => 
      selectedProductIds.includes(p.id) ? { ...p, stockStatus: bulkStockStatus } : p
    );
    onSaveProducts(updated);
    setSelectedProductIds([]);
  };

  const handleBulkStatusUpdate = (active: boolean) => {
    if (isReadOnly || selectedProductIds.length === 0) return;
    const updated = products.map(p => 
      selectedProductIds.includes(p.id) ? { ...p, isActive: active } : p
    );
    onSaveProducts(updated);
    setSelectedProductIds([]);
  };

  const handleBulkPriceUpdate = () => {
    if (isReadOnly || selectedProductIds.length === 0) return;
    const percent = parseFloat(bulkPricePercent);
    if (isNaN(percent)) return;

    const updated = products.map(p => {
      if (selectedProductIds.includes(p.id)) {
        const newPrice = Number((p.price * (1 + percent / 100)).toFixed(2));
        
        // Also adjust tiered slab prices proportionally if present
        const originalTiers = (p as any).tieredPricing || [];
        const updatedTiers = originalTiers.map((tier: any) => ({
          ...tier,
          pricePerUnit: Number((tier.pricePerUnit * (1 + percent / 100)).toFixed(2))
        }));

        return {
          ...p,
          price: newPrice,
          tieredPricing: updatedTiers
        };
      }
      return p;
    });

    onSaveProducts(updated);
    setBulkPricePercent('');
    setSelectedProductIds([]);
  };

  const handleDeleteProduct = (productId: string) => {
    if (isReadOnly) return;
    if (!window.confirm('Permanently delete this product? This cannot be undone.')) return;
    const updated = products.filter(p => p.id !== productId);
    onSaveProducts(updated);
    setSelectedProductIds(prev => prev.filter(id => id !== productId));
  };

  const handleBulkDelete = () => {
    if (isReadOnly || selectedProductIds.length === 0) return;
    if (!window.confirm(`Permanently delete ${selectedProductIds.length} product(s)? This cannot be undone.`)) return;
    const updated = products.filter(p => !selectedProductIds.includes(p.id));
    onSaveProducts(updated);
    setSelectedProductIds([]);
  };

  const handleSelectAllFiltered = (checked: boolean) => {
    if (checked) {
      const allFilteredIds = filteredProducts.map(p => p.id);
      setSelectedProductIds(prev => Array.from(new Set([...prev, ...allFilteredIds])));
    } else {
      const allFilteredIds = filteredProducts.map(p => p.id);
      setSelectedProductIds(prev => prev.filter(id => !allFilteredIds.includes(id)));
    }
  };

  const handleToggleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProductIds(prev => [...prev, productId]);
    } else {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    }
  };

  return (
    <div className="space-y-6">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to modify products.</p>
          </div>
        </div>
      )}
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">Product Catalog Master</h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">Manage SKUs, physical attributes, HSN classifications, and wholesale discounts.</p>
        </div>

        {!isReadOnly && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onSaveProducts(MOCK_PRODUCTS);
                alert(`Successfully synced all ${MOCK_PRODUCTS.length} products from Excel!`);
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold px-3.5 py-2.5 transition-all cursor-pointer min-h-[44px]"
              title="Reset browser LocalStorage with all 681 Excel products"
            >
              <RefreshCw className="h-4 w-4" /> Reset/Sync 681 Excel SKUs
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete ALL catalog products? This cannot be undone.')) {
                  onSaveProducts([]);
                  setSelectedProductIds([]);
                  alert('All catalog products have been deleted.');
                }
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold px-3.5 py-2.5 transition-all cursor-pointer min-h-[44px]"
              title="Delete all catalog products"
            >
              <Trash2 className="h-4 w-4 text-red-400" /> Clear All Catalog
            </button>

            <button
              onClick={() => { setIsBulkUploadOpen(true); setParsedRows([]); setUploadError(''); }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card hover:bg-foreground/5 text-foreground text-xs font-bold px-4 py-2.5 transition-all cursor-pointer min-h-[44px]"
            >
              <Upload className="h-4.5 w-4.5 text-primary" /> Bulk Upload CSV/Excel
            </button>

            <a
              href="/admin#shiprocket"
              onClick={() => {
                const el = document.querySelector('[data-tab="shiprocket"]') as HTMLElement;
                if (el) el.click();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 text-xs font-extrabold px-4 py-2.5 transition-all cursor-pointer min-h-[44px]"
            >
              <Globe className="h-4.5 w-4.5 text-amber-500" /> Sync to Shiprocket
            </a>

            <button
              onClick={startCreate}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-primary text-white text-xs font-bold px-4 py-2.5 shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer min-h-[44px]"
            >
              <Plus className="h-4.5 w-4.5" /> Add New SKU
            </button>
          </div>
        )}
      </div>

      {/* Bulk Action Header Console */}
      {selectedProductIds.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-5 shadow-sm space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="text-foreground text-xs block font-extrabold uppercase tracking-wider">
                ⚡ Catalog Bulk Multi-Edit Panel
              </strong>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Applying updates to <span className="text-primary font-bold">{selectedProductIds.length}</span> selected product SKU(s).
              </p>
            </div>
            
            <button
              onClick={() => setSelectedProductIds([])}
              className="text-[10px] text-muted-foreground hover:text-foreground font-bold underline cursor-pointer"
            >
              Clear Selection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-primary/10 pt-4 font-sans text-xs">
            
            {/* 1. Stock Status Update */}
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-[10px] uppercase text-muted-foreground mb-1">Stock Status</strong>
                <select
                  disabled={isReadOnly}
                  value={bulkStockStatus}
                  onChange={(e) => setBulkStockStatus(e.target.value as any)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none min-h-[36px]"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              
              <button
                onClick={handleBulkStockUpdate}
                disabled={isReadOnly}
                className="px-3.5 h-9 rounded-xl bg-primary text-white text-[10px] font-bold hover:bg-primary/95 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Apply Stock
              </button>
            </div>

            {/* 2. Disabling / Enabling Status */}
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-[10px] uppercase text-muted-foreground mb-1">Catalog Status Visibility</strong>
                <span className="text-[9.5px] text-muted-foreground leading-tight block">Hide or show products on the buyer storefront.</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusUpdate(true)}
                  disabled={isReadOnly}
                  className="px-3.5 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 text-[10px] font-bold hover:bg-emerald-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Enable
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate(false)}
                  disabled={isReadOnly}
                  className="px-3.5 h-9 rounded-xl bg-red-500/15 text-red-500 text-[10px] font-bold hover:bg-red-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Disable
                </button>
              </div>
            </div>

            {/* 3. Base Price adjustments */}
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-[10px] uppercase text-muted-foreground mb-1">Price Adjuster (%)</strong>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    disabled={isReadOnly}
                    placeholder="e.g. -5 or +10"
                    value={bulkPricePercent}
                    onChange={(e) => setBulkPricePercent(e.target.value)}
                    className="w-24 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none pr-6"
                  />
                  <span className="absolute right-2 text-muted-foreground font-mono">%</span>
                </div>
              </div>
              
              <button
                onClick={handleBulkPriceUpdate}
                disabled={isReadOnly || !bulkPricePercent}
                className="px-3.5 h-9 rounded-xl bg-primary text-white text-[10px] font-bold hover:bg-primary/95 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Adjust Price
              </button>
            </div>

            {/* 4. Bulk Delete */}
            <div className="p-3.5 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-[10px] uppercase text-red-500 mb-1">Permanent Delete</strong>
                <span className="text-[9.5px] text-muted-foreground leading-tight block">Remove selected SKUs from the catalog permanently.</span>
              </div>

              <button
                onClick={handleBulkDelete}
                disabled={isReadOnly}
                className="px-3.5 h-9 rounded-xl bg-red-500/15 text-red-500 text-[10px] font-bold hover:bg-red-500/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Selected
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by SKU, title, category, or search keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-lg rounded-xl border border-border bg-background/50 px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Catalog Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold uppercase tracking-wider">
                <th className="p-4 text-center w-10">
                  <input
                    type="checkbox"
                    checked={filteredProducts.length > 0 && filteredProducts.every(p => selectedProductIds.includes(p.id))}
                    onChange={(e) => handleSelectAllFiltered(e.target.checked)}
                    className="h-4 w-4 text-primary border-border focus:ring-primary rounded cursor-pointer"
                  />
                </th>
                <th className="p-4">SKU / ID</th>
                <th className="p-4 text-center">Image</th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Unit Price</th>
                <th className="p-4 text-center">MOQ</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">SEO Meta</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-sans">
              {filteredProducts.map((p) => {
                const hsn = p.specifications?.['HSN Code'] || hsnCodes.find(h => h.category === p.category)?.code || '8205';
                return (
                  <tr key={p.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="p-4 text-center w-10">
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(p.id)}
                        onChange={(e) => handleToggleSelectProduct(p.id, e.target.checked)}
                        className="h-4 w-4 text-primary border-border focus:ring-primary rounded cursor-pointer"
                      />
                    </td>
                    <td className="p-4 font-mono font-bold text-foreground">{p.id}</td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-10 w-10 rounded-lg overflow-hidden border border-border bg-foreground/5 shrink-0 mx-auto flex items-center justify-center">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-muted-foreground font-sans">No Image</span>
                          )}
                        </div>
                        {p.galleryImages && p.galleryImages.length > 1 && (
                          <span className="text-[8.5px] font-extrabold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            {p.galleryImages.length} angles
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        {p.title}
                        {p.isActive === false && (
                          <span className="inline-block bg-red-500/10 text-red-500 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border border-red-500/20 uppercase tracking-wider">Disabled</span>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2 mt-1">
                        <span>Weight: {p.specifications?.['Weight'] || '2 kg'}</span>
                        <span>•</span>
                        <span className="bg-foreground/5 px-1.5 py-0.5 rounded font-mono">HSN: {hsn}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-semibold">{p.category}</td>
                    <td className="p-4 font-bold text-foreground">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-center font-bold text-foreground">{(p as any).moq || 1} units</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.stockStatus === 'in_stock' ? 'bg-emerald-500/10 text-emerald-500' :
                        p.stockStatus === 'low_stock' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {p.stockStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {p.seo?.metaTitle ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider" title={p.seo.metaTitle}>
                          <Globe className="h-3 w-3" /> Configured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-wider">
                          <Info className="h-3 w-3" /> Standard
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {!isReadOnly && (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => startEdit(p)}
                            className="p-2 rounded-lg bg-foreground/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                            title="Edit product configs"
                          >
                            <Edit3 className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 rounded-lg bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                            title="Delete this product"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal Overlay */}
      {(editingProduct || isCreatingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-card border border-border rounded-3xl p-6 shadow-2xl glass space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-border/40 pb-3">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-primary">
                  {isCreatingNew ? 'Create New SKU Profile' : `Modify SKU: ${editingProduct?.id}`}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Define specifications, volumetric dimensions, and B2B settings.</p>
              </div>
              <button
                onClick={() => { setEditingProduct(null); setIsCreatingNew(false); }}
                className="p-2 rounded-full hover:bg-foreground/5 text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs text-foreground font-sans">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Details Fields (left 2/3 cols) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* SKU Code */}
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">SKU identifier (Unique)</label>
                  <input
                    type="text"
                    required
                    disabled={!isCreatingNew}
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none disabled:opacity-50"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bosch Professional Angle Grinder GWS"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Market Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                  >
                    <option value="Power Tools & Accessories">Power Tools & Accessories</option>
                    <option value="Hand Tools">Hand Tools</option>
                    <option value="Fasteners & Hardware">Fasteners & Hardware</option>
                    <option value="Building Materials">Building Materials</option>
                    <option value="Plumbing Supplies">Plumbing Supplies</option>
                    <option value="Electrical Infrastructure">Electrical Infrastructure</option>
                    <option value="Safety Gears & PPE">Safety Gears & PPE</option>
                  </select>
                </div>

                {/* Base Price & MOQ */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Base Price (INR)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Wholesale MOQ</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={moq}
                      onChange={(e) => setMoq(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Stock Status & HSN Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Stock Availability</label>
                    <select
                      value={stockStatus}
                      onChange={(e) => setStockStatus(e.target.value as any)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">HSN Classification</label>
                    <select
                      value={selectedHsn}
                      onChange={(e) => setSelectedHsn(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                    >
                      {hsnCodes.map(h => (
                        <option key={h.code} value={h.code}>{h.code} - {h.category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Serialized tracking */}
                <div className="flex items-center gap-2.5 p-4 rounded-xl border border-border/60 bg-foreground/5">
                  <input
                    type="checkbox"
                    id="isSerialized"
                    checked={isSerialized}
                    onChange={(e) => setIsSerialized(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary border-border focus:ring-primary rounded"
                  />
                  <label htmlFor="isSerialized" className="cursor-pointer">
                    <strong className="block text-[11px] text-foreground">Unique Serial Identification</strong>
                    <span className="text-[9px] text-muted-foreground block">Mandates scanning serial numbers during outward scanning.</span>
                  </label>
                </div>

              </div>

              {/* Volumetric Dimensions Slabs */}
              <div className="border-t border-border/40 pt-4">
                <h4 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-1">
                  <Info className="h-4 w-4" /> Volumetrics & Shipping Dimensions
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Deadweight (kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Length (cm)</label>
                    <input
                      type="number"
                      required
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Width (cm)</label>
                    <input
                      type="number"
                      required
                      value={widthCm}
                      onChange={(e) => setWidthCm(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Height (cm)</label>
                    <input
                      type="number"
                      required
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Technical Specifications Section */}
              <div className="border-t border-border/40 pt-4">
                <h4 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">
                  Category Technical Attributes (Specifications)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {category === 'Power Tools & Accessories' ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Voltage / Wattage Rating</label>
                        <input
                          type="text"
                          placeholder="e.g. 20V Max or 750W"
                          value={specPower}
                          onChange={(e) => setSpecPower(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">No Load Speed (RPM)</label>
                        <input
                          type="text"
                          placeholder="e.g. 0-2800 RPM"
                          value={specSpeed}
                          onChange={(e) => setSpecSpeed(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                    </>
                  ) : category === 'Plumbing Supplies' || category === 'Fasteners & Hardware' ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Fastener Thread / Diameter</label>
                        <input
                          type="text"
                          placeholder="e.g. M6 or 1 Inch"
                          value={specSize}
                          onChange={(e) => setSpecSize(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Material Composition Grade</label>
                        <input
                          type="text"
                          placeholder="e.g. SS 304 Stainless or Brass"
                          value={specMaterial}
                          onChange={(e) => setSpecMaterial(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Capacity/Dimensions Size</label>
                        <input
                          type="text"
                          placeholder="e.g. 12 Pieces or Medium"
                          value={specSize}
                          onChange={(e) => setSpecSize(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Standard Material finish</label>
                        <input
                          type="text"
                          placeholder="e.g. Forged Steel Chrome Finish"
                          value={specMaterial}
                          onChange={(e) => setSpecMaterial(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* B2B Tiered Slab Discounts */}
              <div className="border-t border-border/40 pt-4">
                <h4 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-4.5 w-4.5" /> B2B wholesale pricing slabs
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Tier 1 */}
                  <div className="p-4 rounded-xl border border-border/60 bg-foreground/5 flex items-center justify-between gap-3">
                    <div>
                      <strong className="block text-[10px] uppercase text-muted-foreground">Volume Tier 1 Discount</strong>
                      <span className="text-[9px] text-muted-foreground mt-0.5">Purchases matching quantities larger than:</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="10 Qty"
                        value={slabQty1}
                        onChange={(e) => setSlabQty1(Number(e.target.value))}
                        className="w-16 rounded-lg border border-border bg-background/80 px-2 py-1 text-center"
                      />
                      <input
                        type="number"
                        placeholder="Price ₹"
                        value={slabPrice1}
                        onChange={(e) => setSlabPrice1(Number(e.target.value))}
                        className="w-24 rounded-lg border border-border bg-background/80 px-2 py-1 text-center font-bold"
                      />
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className="p-4 rounded-xl border border-border/60 bg-foreground/5 flex items-center justify-between gap-3">
                    <div>
                      <strong className="block text-[10px] uppercase text-muted-foreground">Volume Tier 2 Discount</strong>
                      <span className="text-[9px] text-muted-foreground mt-0.5">Purchases matching quantities larger than:</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="50 Qty"
                        value={slabQty2}
                        onChange={(e) => setSlabQty2(Number(e.target.value))}
                        className="w-16 rounded-lg border border-border bg-background/80 px-2 py-1 text-center"
                      />
                      <input
                        type="number"
                        placeholder="Price ₹"
                        value={slabPrice2}
                        onChange={(e) => setSlabPrice2(Number(e.target.value))}
                        className="w-24 rounded-lg border border-border bg-background/80 px-2 py-1 text-center font-bold"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* SEO & Search Engine Optimization Metadata Section */}
              <div className="border-t border-border/40 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-emerald-500" /> Search Engine Optimization (SEO) & Social Meta
                  </h4>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    SEO Metadata Engine Active
                  </span>
                </div>

                {/* Live Google Search Result Preview Box */}
                <div className="p-4 rounded-2xl bg-foreground/5 border border-border/60 space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                    Live Google Search Result Preview
                  </span>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono truncate">
                    {canonicalUrl || `https://abuzz-store.com/product/${sku || 'sample-id'}`}
                  </div>
                  <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                    {metaTitle || (title ? `${title} - Buy Online | Abuzz Store` : 'Product Title - Buy Online | Abuzz Store')}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-sans">
                    {metaDescription || (description ? description.slice(0, 160) : 'Premium industrial hardware and tools with high durability and fast delivery.')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Meta Title */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase">
                        Meta Title Tag
                      </label>
                      <span className={`text-[9px] font-mono ${metaTitle.length > 60 ? 'text-amber-500 font-bold' : 'text-muted-foreground'}`}>
                        {metaTitle.length}/60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={`${title || 'Product'} - Buy Online | Abuzz Store`}
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                      Canonical Link Tag
                    </label>
                    <input
                      type="text"
                      placeholder={`https://abuzz-store.com/product/${sku || 'id'}`}
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase">
                      Meta Description Snippet
                    </label>
                    <span className={`text-[9px] font-mono ${metaDescription.length > 160 ? 'text-amber-500 font-bold' : 'text-muted-foreground'}`}>
                      {metaDescription.length}/160 chars
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Concise 150-160 character description optimized for Google search snippets..."
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Target Keywords */}
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                      Target SEO Meta Keywords (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="power tools, angle grinder, industrial hardware"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* OpenGraph Image URL */}
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                      Social OpenGraph (OG) Image URL
                    </label>
                    <input
                      type="text"
                      placeholder={imageUrl || 'https://images.unsplash.com/...'}
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Catalog Internal Search Keywords & Synonyms Section */}
                <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-extrabold text-foreground uppercase tracking-wider">
                      🔍 Catalogue Internal Search Keywords & Synonyms
                    </label>
                    <span className="text-[9px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">
                      Storefront Search Engine
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Add alternative names, regional terminology, misspellings, or product tags separated by commas. These keywords enable instant customer search matching on both the admin panel and buyer storefront.
                  </p>
                  <input
                    type="text"
                    placeholder="e.g. grinder, cutter, portable drill, 20V combo, power tool, Ludhiana hardware"
                    value={searchKeywords}
                    onChange={(e) => setSearchKeywords(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none text-xs font-medium"
                  />
                  {searchKeywords && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {searchKeywords.split(',').map((kw, i) => kw.trim() && (
                        <span key={i} className="inline-flex items-center gap-1 bg-background border border-border/80 text-foreground text-[9.5px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                          #{kw.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Indexing Switch */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-foreground/5">
                  <input
                    type="checkbox"
                    id="noIndexToggle"
                    checked={noIndex}
                    onChange={(e) => setNoIndex(e.target.checked)}
                    className="h-4 w-4 text-primary border-border focus:ring-primary rounded cursor-pointer"
                  />
                  <label htmlFor="noIndexToggle" className="cursor-pointer">
                    <strong className="block text-[11px] text-foreground">Block Search Engines (noindex)</strong>
                    <span className="text-[9.5px] text-muted-foreground block">
                      Check this box if you want to prevent Google/Bing from indexing this specific SKU product page.
                    </span>
                  </label>
                </div>
              </div>
            </div>

                {/* Right side Image Section (1 column width) */}
                <div className="lg:col-span-1 space-y-4 border-l border-border/40 pl-0 lg:pl-6 flex flex-col justify-start">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-1">Product Image Section</h4>
                  
                  {/* Live Cover Image Box */}
                  <div>
                    <span className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Primary Cover Image</span>
                    <div className="aspect-square w-full rounded-2xl overflow-hidden border border-border bg-foreground/5 flex items-center justify-center relative group">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-muted-foreground text-[10px]">No cover image URL provided</span>
                      )}
                    </div>
                  </div>

                  {/* Upload Local File Trigger */}
                  <div>
                    <label 
                      htmlFor="catalog-image-file-upload"
                      className={`w-full flex items-center justify-center gap-1.5 h-10 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-[10px] cursor-pointer transition-colors ${
                        isReadOnly ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload className="h-4.5 w-4.5" /> Select Local Cover Image File
                    </label>
                    <input
                      type="file"
                      id="catalog-image-file-upload"
                      accept="image/*"
                      disabled={isReadOnly}
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Primary Cover Image URL</label>
                    <input
                      type="text"
                      value={imageUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setImageUrl(val);
                        if (val && !galleryImages.includes(val)) {
                          setGalleryImages(prev => [val, ...prev]);
                        }
                      }}
                      placeholder="https://images.unsplash.com/... or /products/..."
                      className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono text-[10px] focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* PRODUCT GALLERY MULTI-ANGLE IMAGES */}
                  <div className="space-y-3 border-t border-border/40 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="block text-[10px] font-bold text-foreground uppercase tracking-wider">
                        Gallery & Angles ({galleryImages.length})
                      </span>
                      <span className="text-[9px] text-muted-foreground">Click thumbnail to set cover</span>
                    </div>

                    {/* Gallery Thumbnails Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {galleryImages.map((imgUrlItem, imgIdx) => {
                        const isPrimary = imgUrlItem === imageUrl;
                        return (
                          <div 
                            key={imgIdx}
                            className={`relative aspect-square rounded-xl overflow-hidden border group transition-all ${
                              isPrimary ? 'border-primary ring-2 ring-primary/40' : 'border-border/60 hover:border-primary/50'
                            }`}
                          >
                            <img 
                              src={imgUrlItem} 
                              alt={`Angle ${imgIdx + 1}`}
                              onClick={() => setImageUrl(imgUrlItem)}
                              className="h-full w-full object-cover cursor-pointer"
                            />
                            {isPrimary && (
                              <span className="absolute top-1 left-1 bg-primary text-white text-[7px] font-extrabold px-1 rounded uppercase tracking-wider pointer-events-none">
                                Cover
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveGalleryImage(imgIdx);
                              }}
                              className="absolute top-1 right-1 z-10 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-600 shadow-md transition-all cursor-pointer"
                              title="Remove image"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Upload Extra Gallery Image File */}
                    <div>
                      <label 
                        htmlFor="catalog-gallery-file-upload"
                        className={`w-full flex items-center justify-center gap-1.5 h-9 rounded-xl border border-dashed border-border bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold text-[9.5px] cursor-pointer transition-colors mt-2 ${
                          isReadOnly ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5 text-primary" /> Upload Extra Gallery Angle
                      </label>
                      <input
                        type="file"
                        id="catalog-gallery-file-upload"
                        accept="image/*"
                        multiple
                        disabled={isReadOnly}
                        onChange={handleGalleryFileUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Add Gallery Image URL Input */}
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={newGalleryUrlInput}
                        onChange={(e) => setNewGalleryUrlInput(e.target.value)}
                        placeholder="Or paste angle image URL..."
                        className="flex-1 rounded-xl border border-border bg-background/50 px-3 py-1.5 font-mono text-[9.5px] focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-3 rounded-xl bg-primary text-white text-[9.5px] font-bold hover:bg-primary/95 transition-colors cursor-pointer shrink-0"
                      >
                        Add Angle
                      </button>
                    </div>

                  </div>
                  
                  {/* Quick Select categories mock images */}
                  <div className="space-y-2 border-t border-border/40 pt-3">
                    <span className="block text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Quick Pick Mock Image</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=300';
                          setImageUrl(url);
                          if (!galleryImages.includes(url)) setGalleryImages(prev => [...prev, url]);
                        }}
                        className="p-1.5 rounded-lg border border-border bg-background/40 hover:bg-foreground/5 text-left text-[9px] font-bold truncate cursor-pointer flex items-center gap-1.5"
                      >
                        <div className="h-6 w-6 rounded bg-muted overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=300" className="h-full w-full object-cover" />
                        </div>
                        <span>Power Grinder</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const url = 'https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&q=80&w=300';
                          setImageUrl(url);
                          if (!galleryImages.includes(url)) setGalleryImages(prev => [...prev, url]);
                        }}
                        className="p-1.5 rounded-lg border border-border bg-background/40 hover:bg-foreground/5 text-left text-[9px] font-bold truncate cursor-pointer flex items-center gap-1.5"
                      >
                        <div className="h-6 w-6 rounded bg-muted overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&q=80&w=300" className="h-full w-full object-cover" />
                        </div>
                        <span>Screws & Bolts</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const url = 'https://images.unsplash.com/photo-1598978351584-3c0f4f9f4a5a?auto=format&fit=crop&q=80&w=300';
                          setImageUrl(url);
                          if (!galleryImages.includes(url)) setGalleryImages(prev => [...prev, url]);
                        }}
                        className="p-1.5 rounded-lg border border-border bg-background/40 hover:bg-foreground/5 text-left text-[9px] font-bold truncate cursor-pointer flex items-center gap-1.5"
                      >
                        <div className="h-6 w-6 rounded bg-muted overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1598978351584-3c0f4f9f4a5a?auto=format&fit=crop&q=80&w=300" className="h-full w-full object-cover" />
                        </div>
                        <span>Safety Gear</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const url = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300';
                          setImageUrl(url);
                          if (!galleryImages.includes(url)) setGalleryImages(prev => [...prev, url]);
                        }}
                        className="p-1.5 rounded-lg border border-border bg-background/40 hover:bg-foreground/5 text-left text-[9px] font-bold truncate cursor-pointer flex items-center gap-1.5"
                      >
                        <div className="h-6 w-6 rounded bg-muted overflow-hidden shrink-0">
                          <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300" className="h-full w-full object-cover" />
                        </div>
                        <span>Hand Wrench</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="border-t border-border/40 pt-4 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsCreatingNew(false); }}
                  className="rounded-xl border border-border bg-background/50 hover:bg-foreground/5 text-muted-foreground px-5 py-2.5 font-bold transition-all min-h-[44px]"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-primary text-white px-5 py-2.5 font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all min-h-[44px]"
                >
                  <Save className="h-4.5 w-4.5" /> Save Product Config
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    {/* Bulk Catalog Upload Modal Overlay */}
      {isBulkUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-card border border-border rounded-3xl p-6 shadow-2xl glass space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-border/40 pb-3">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-primary">
                  Bulk Catalog Excel Upload
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Import multiple industrial products, associate HSN tax rates and bulk pricing brackets.</p>
              </div>
              <button
                onClick={() => { setIsBulkUploadOpen(false); setParsedRows([]); setUploadError(''); }}
                className="p-2 rounded-full hover:bg-foreground/5 text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Template & Upload Trigger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Template Download instructions */}
              <div className="p-5 rounded-2xl border border-border/60 bg-foreground/5 flex flex-col justify-between min-h-[140px] text-xs font-sans leading-relaxed">
                <div>
                  <strong className="block text-foreground text-[10px] uppercase font-bold tracking-wider mb-1.5">1. Get Catalog Excel Template</strong>
                  <p className="text-muted-foreground text-[10px]">Prepare product spreadsheets with drop-down cell validations for Categories and Subcategories.</p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background hover:bg-foreground/5 px-4 py-2 font-bold transition-all text-[10px] mt-3 cursor-pointer min-h-[44px]"
                >
                  <Download className="h-4 w-4" /> Download Excel Template
                </button>
              </div>

              {/* Excel Upload Filepicker Dropzone */}
              <div className="p-5 rounded-2xl border border-dashed border-primary/45 bg-primary/5 flex flex-col items-center justify-center min-h-[140px] text-center relative group">
                <Upload className="h-8 w-8 text-primary/60 mb-2 group-hover:scale-105 transition-transform duration-200" />
                <span className="text-[10px] font-bold text-foreground block">2. Select Spreadsheet File</span>
                <span className="text-[9px] text-muted-foreground mt-0.5">Supports CSV, XLS or XLSX up to 10MB</span>
                
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

            </div>

            {uploadError && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold">
                {uploadError}
              </div>
            )}

            {/* Parsed Rows Validation Previews */}
            {parsedRows.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Spreadsheet Parsing Preview ({parsedRows.length} Rows Detected)
                  </h4>
                  <div className="flex gap-4 text-[10px] font-bold">
                    <span>Valid: <strong className="text-emerald-500">{parsedRows.filter(r => r.isValid).length}</strong></span>
                    <span>Invalid: <strong className="text-red-500">{parsedRows.filter(r => !r.isValid).length}</strong></span>
                  </div>
                </div>

                <div className="border border-border/40 rounded-2xl overflow-hidden max-h-60 overflow-y-auto no-scrollbar">
                  <table className="w-full border-collapse text-left text-[11px] font-sans">
                    <thead>
                      <tr className="bg-foreground/5 text-muted-foreground font-bold border-b border-border/40 uppercase tracking-wider">
                        <th className="p-3 text-center">Row</th>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Item Details</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3 text-center">Audit Status / Warnings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {parsedRows.map((item, idx) => (
                        <tr 
                          key={idx} 
                          className={`hover:bg-foreground/5 transition-colors ${
                            !item.isValid ? 'bg-red-500/5' : item.warnings.length > 0 ? 'bg-amber-500/5' : ''
                          }`}
                        >
                          <td className="p-3 text-center text-muted-foreground font-bold">{item.index}</td>
                          <td className="p-3 font-mono font-bold text-foreground">{item.row.sku || 'MISSING'}</td>
                          <td className="p-3">
                            <span className="font-semibold text-foreground block">{item.row.title || 'Missing title field'}</span>
                            <span className="text-[10px] text-muted-foreground block">{item.row.category || 'Missing Category'} • {item.row.subcategory}</span>
                          </td>
                          <td className="p-3 text-right font-bold text-foreground">₹{Number(item.row.price || 0).toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <div className="space-y-1 text-[9px] font-sans">
                              {item.isValid ? (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold uppercase tracking-wider">Passed Verification</span>
                              ) : (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-bold uppercase tracking-wider">Failed verification</span>
                              )}
                              
                              {item.errors.map((err, eIdx) => (
                                <div key={eIdx} className="text-red-500 font-bold">• {err}</div>
                              ))}
                              {item.warnings.map((warn, wIdx) => (
                                <div key={wIdx} className="text-amber-500 font-bold">• {warn}</div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* Modal Actions */}
            <div className="border-t border-border/40 pt-4 flex justify-end gap-3.5">
              <button
                type="button"
                onClick={() => { setIsBulkUploadOpen(false); setParsedRows([]); setUploadError(''); }}
                className="rounded-xl border border-border bg-background/50 hover:bg-foreground/5 text-muted-foreground px-5 py-2.5 font-bold transition-all min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={parsedRows.length === 0 || parsedRows.some(r => !r.isValid)}
                onClick={handleCommitUpload}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-primary text-white px-5 py-2.5 font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all min-h-[44px] disabled:opacity-50 cursor-pointer"
              >
                <Save className="h-4.5 w-4.5" /> Commit Bulk Upload ({parsedRows.filter(r => r.isValid).length} Rows)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCatalogTab;
