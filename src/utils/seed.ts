import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { db, isMock } from '../lib/firebase';
import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    "id": "ABBPS10",
    "title": "Suman Steel Block Carpenter Plane 10-inch",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 799,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 10-inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABBPS10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPS10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPS10_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img2.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img3.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img4.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img5.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img6.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img7.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 15
  },
  {
    "id": "AZGTIJP10",
    "title": "GTI Steel Block Carpenter Plane 10-inch",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial GTI Steel Block Carpenter Plane 10-inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGTIJP10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPS10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPS10_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPS10_img2.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 16
  },
  {
    "id": "ABBPS14",
    "title": "Suman Steel Block Carpenter Plane 14-inch",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 14-inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABBPS14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPS14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPS14_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPS14_img2.jpg",
      "https://cdn.abuzz.store/products/ABBPS14_img3.jpg",
      "https://cdn.abuzz.store/products/ABBPS14_img4.jpg",
      "https://cdn.abuzz.store/products/ABBPS14_img5.jpg",
      "https://cdn.abuzz.store/products/ABBPS14_img6.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 17
  },
  {
    "id": "ABBPS5",
    "title": "Suman Steel Block Carpenter Plane 5-inch",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 5-inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABBPS5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPS5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPS5_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPS5_img2.jpg",
      "https://cdn.abuzz.store/products/ABBPS5_img3.jpg",
      "https://cdn.abuzz.store/products/ABBPS5_img4.jpg",
      "https://cdn.abuzz.store/products/ABBPS5_img5.jpg",
      "https://cdn.abuzz.store/products/ABBPS5_img6.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 18
  },
  {
    "id": "ABBPS7",
    "title": "Suman Steel Block Carpenter Plane 7-inch",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 7-inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABBPS7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPS7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPS7_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPS7_img2.jpg",
      "https://cdn.abuzz.store/products/ABBPS7_img3.jpg",
      "https://cdn.abuzz.store/products/ABBPS7_img4.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 19
  },
  {
    "id": "ABBPSC5",
    "title": "Suman Steel Block Carpenter Plane 5-inch with Blade",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 5-inch with Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABBPSC5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPSC5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPSC5_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPSC5_img2.jpg",
      "https://cdn.abuzz.store/products/ABBPSC5_img3.jpg",
      "https://cdn.abuzz.store/products/ABBPSC5_img4.jpg",
      "https://cdn.abuzz.store/products/ABBPSC5_img5.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 20
  },
  {
    "id": "ABBPSC7",
    "title": "Suman Steel Block Carpenter Plane 7-inch with Blade",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 7-inch with Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABBPSC7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABBPSC7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABBPSC7_img1.jpg",
      "https://cdn.abuzz.store/products/ABBPSC7_img2.jpg",
      "https://cdn.abuzz.store/products/ABBPSC7_img3.jpg",
      "https://cdn.abuzz.store/products/ABBPSC7_img4.jpg",
      "https://cdn.abuzz.store/products/ABBPSC7_img5.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 21
  },
  {
    "id": "ABPSC10",
    "title": "Suman Steel Block Carpenter Plane 10-inch with Blade",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 1199,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 10-inch with Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABPSC10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABPSC10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABPSC10_img1.jpg",
      "https://cdn.abuzz.store/products/ABPSC10_img2.jpg",
      "https://cdn.abuzz.store/products/ABPSC10_img3.jpg",
      "https://cdn.abuzz.store/products/ABPSC10_img4.jpg",
      "https://cdn.abuzz.store/products/ABPSC10_img5.jpg",
      "https://cdn.abuzz.store/products/ABPSC10_img6.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 22
  },
  {
    "id": "AZGTIJPB10",
    "title": "GTI Steel Block Carpenter Plane 10-inch with Blade",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 1199,
    "stockStatus": "in_stock",
    "description": "High-grade industrial GTI Steel Block Carpenter Plane 10-inch with Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGTIJPB10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABPSC10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABPSC10_img1.jpg",
      "https://cdn.abuzz.store/products/ABPSC10_img2.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 23
  },
  {
    "id": "ABPSC14",
    "title": "Suman Steel Block Carpenter Plane 14-inch with Blade",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 1399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Suman Steel Block Carpenter Plane 14-inch with Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABPSC14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABPSC14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABPSC14_img1.jpg",
      "https://cdn.abuzz.store/products/ABPSC14_img2.jpg",
      "https://cdn.abuzz.store/products/ABPSC14_img3.jpg",
      "https://cdn.abuzz.store/products/ABPSC14_img4.jpg",
      "https://cdn.abuzz.store/products/ABPSC14_img5.jpg",
      "https://cdn.abuzz.store/products/ABPSC14_img6.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 24
  },
  {
    "id": "ABHK1",
    "title": "MK Super Allen Hex Key Set of 9 Pieces - From 1.5 to10 mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Allen Hex Key Set of 9 Pieces - From 1.5 to10 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "ABHK1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/ABHK1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/ABHK1_img1.jpg",
      "https://cdn.abuzz.store/products/ABHK1_img2.jpg",
      "https://cdn.abuzz.store/products/ABHK1_img3.jpg",
      "https://cdn.abuzz.store/products/ABHK1_img4.jpg",
      "https://cdn.abuzz.store/products/ABHK1_img5.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 25
  },
  {
    "id": "AZBBC12",
    "title": "Bevellee 12mm Bevelled Edge Chisel With PVC Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 12mm Bevelled Edge Chisel With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBBC12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBBC12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBBC12_img1.jpg",
      "https://cdn.abuzz.store/products/AZBBC12_img2.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 26
  },
  {
    "id": "AZBBC19",
    "title": "Bevellee 19mm Bevelled Edge Chisel With PVC Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 369,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Bevellee 19mm Bevelled Edge Chisel With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBBC19",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBBC19_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBBC19_img1.jpg",
      "https://cdn.abuzz.store/products/AZBBC19_img2.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 27
  },
  {
    "id": "AZBBC25",
    "title": "Bevellee 25mm Bevelled Edge Chisel With PVC Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 25mm Bevelled Edge Chisel With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBBC25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBBC25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBBC25_img1.jpg",
      "https://cdn.abuzz.store/products/AZBBC25_img2.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 28
  },
  {
    "id": "AZBBC32",
    "title": "Bevellee 32mm Bevelled Edge Chisel With PVC Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 32mm Bevelled Edge Chisel With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBBC32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBBC32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBBC32_img1.jpg",
      "https://cdn.abuzz.store/products/AZBBC32_img2.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 29
  },
  {
    "id": "AZBBC38",
    "title": "Bevellee 38mm Bevelled Edge Chisel With PVC Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 38mm Bevelled Edge Chisel With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBBC38",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBBC38_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBBC38_img1.jpg",
      "https://cdn.abuzz.store/products/AZBBC38_img2.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 30
  },
  {
    "id": "AZWBBC12",
    "title": "Bevellee 12mm Bevelled Edge Chisel With Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 12mm Bevelled Edge Chisel With Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWBBC12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWBBC12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWBBC12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWBBC12_img2.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 31
  },
  {
    "id": "AZWBBC19",
    "title": "Bevellee 19mm Bevelled Edge Chisel With Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 19mm Bevelled Edge Chisel With Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWBBC19",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWBBC19_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWBBC19_img1.jpg",
      "https://cdn.abuzz.store/products/AZWBBC19_img2.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 32
  },
  {
    "id": "AZWBBC25",
    "title": "Bevellee 25mm Bevelled Edge Chisel With Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 25mm Bevelled Edge Chisel With Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWBBC25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWBBC25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWBBC25_img1.jpg",
      "https://cdn.abuzz.store/products/AZWBBC25_img2.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 33
  },
  {
    "id": "AZWBBC32",
    "title": "Bevellee 32mm Bevelled Edge Chisel With Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 32mm Bevelled Edge Chisel With Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWBBC32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWBBC32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWBBC32_img1.jpg",
      "https://cdn.abuzz.store/products/AZWBBC32_img2.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 34
  },
  {
    "id": "AZWBBC38",
    "title": "Bevellee 38mm Bevelled Edge Chisel With Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Bevellee 38mm Bevelled Edge Chisel With Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWBBC38",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWBBC38_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWBBC38_img1.jpg",
      "https://cdn.abuzz.store/products/AZWBBC38_img2.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 35
  },
  {
    "id": "AZCDH14-250",
    "title": "Flat Chisel for Demolition Hammer 14x250 mm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Chisel for Demolition Hammer 14x250 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCDH14-250",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCDH14-250_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCDH14-250_img1.jpg",
      "https://cdn.abuzz.store/products/AZCDH14-250_img2.jpg",
      "https://cdn.abuzz.store/products/AZCDH14-250_img3.jpg",
      "https://cdn.abuzz.store/products/AZCDH14-250_img4.jpg",
      "https://cdn.abuzz.store/products/AZCDH14-250_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 36
  },
  {
    "id": "AZCDH17-280",
    "title": "Flat Chisel for Demolition Hammer 17x280 mm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Chisel for Demolition Hammer 17x280 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCDH17-280",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCDH17-280_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCDH17-280_img1.jpg",
      "https://cdn.abuzz.store/products/AZCDH17-280_img2.jpg",
      "https://cdn.abuzz.store/products/AZCDH17-280_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 37
  },
  {
    "id": "AZCDH17-400",
    "title": "Flat Chisel for Demolition Hammer 17x400 mm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Chisel for Demolition Hammer 17x400 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCDH17-400",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCDH17-400_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCDH17-400_img1.jpg",
      "https://cdn.abuzz.store/products/AZCDH17-400_img2.jpg",
      "https://cdn.abuzz.store/products/AZCDH17-400_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 38
  },
  {
    "id": "AZCDH18-400",
    "title": "Flat Chisel for Demolition Hammer 18x400 mm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Flat Chisel for Demolition Hammer 18x400 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCDH18-400",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCDH18-400_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCDH18-400_img1.jpg",
      "https://cdn.abuzz.store/products/AZCDH18-400_img2.jpg",
      "https://cdn.abuzz.store/products/AZCDH18-400_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 39
  },
  {
    "id": "AZCG1",
    "title": "Chemical Dispenser Rebaring Caulking Gun",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Chemical Dispenser Rebaring Caulking Gun. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCG1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCG1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCG1_img1.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 40
  },
  {
    "id": "AZCSC1",
    "title": "Cumi Combination Stone",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Cumi Combination Stone. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCSC1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCSC1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCSC1_img1.jpg",
      "https://cdn.abuzz.store/products/AZCSC1_img2.jpg",
      "https://cdn.abuzz.store/products/AZCSC1_img3.jpg",
      "https://cdn.abuzz.store/products/AZCSC1_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 41
  },
  {
    "id": "AZDCO10",
    "title": "10mm Drill Chuck",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 10mm Drill Chuck. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDCO10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDCO10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDCO10_img1.jpg",
      "https://cdn.abuzz.store/products/AZDCO10_img2.jpg",
      "https://cdn.abuzz.store/products/AZDCO10_img3.jpg",
      "https://cdn.abuzz.store/products/AZDCO10_img4.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 42
  },
  {
    "id": "AZDCP13",
    "title": "13mm Drill Chuck",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 13mm Drill Chuck. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDCP13",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDCP13_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDCP13_img1.jpg",
      "https://cdn.abuzz.store/products/AZDCP13_img2.jpg",
      "https://cdn.abuzz.store/products/AZDCP13_img3.jpg",
      "https://cdn.abuzz.store/products/AZDCP13_img4.jpg",
      "https://cdn.abuzz.store/products/AZDCP13_img5.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 43
  },
  {
    "id": "AZDCS1",
    "title": "SLZ Polishing Tuning Diamond Files Whetstone Plate Mini Diamond Coarse Stone Extra Fine 6 inch x 2 inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SLZ Polishing Tuning Diamond Files Whetstone Plate Mini Diamond Coarse Stone Extra Fine 6 inch x 2 inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDCS1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDCS1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDCS1_img1.jpg",
      "https://cdn.abuzz.store/products/AZDCS1_img2.jpg",
      "https://cdn.abuzz.store/products/AZDCS1_img3.jpg",
      "https://cdn.abuzz.store/products/AZDCS1_img4.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 44
  },
  {
    "id": "AZDMM01",
    "title": "Mercury MC-2310 10mm Drill Machine",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 1899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Mercury MC-2310 10mm Drill Machine. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDMM01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDMM01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDMM01_img1.jpg",
      "https://cdn.abuzz.store/products/AZDMM01_img2.jpg",
      "https://cdn.abuzz.store/products/AZDMM01_img3.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 45
  },
  {
    "id": "AZDMMRF",
    "title": "Mercury MC-10R/F 10mm Drill Machine",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 1999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Mercury MC-10R/F 10mm Drill Machine. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDMMRF",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDMMRF_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDMMRF_img1.jpg",
      "https://cdn.abuzz.store/products/AZDMMRF_img2.jpg",
      "https://cdn.abuzz.store/products/AZDMMRF_img3.jpg",
      "https://cdn.abuzz.store/products/AZDMMRF_img4.jpg",
      "https://cdn.abuzz.store/products/AZDMMRF_img5.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 46
  },
  {
    "id": "AZDMP01",
    "title": "Panther Plus 10MM Drill Machine",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 1899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther Plus 10MM Drill Machine. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDMP01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDMP01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDMP01_img1.jpg",
      "https://cdn.abuzz.store/products/AZDMP01_img2.jpg",
      "https://cdn.abuzz.store/products/AZDMP01_img3.jpg",
      "https://cdn.abuzz.store/products/AZDMP01_img4.jpg",
      "https://cdn.abuzz.store/products/AZDMP01_img5.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 47
  },
  {
    "id": "AZDMPP13",
    "title": "Panther Plus 13mm Power Impact Reverse Forward Rotation Drill Machine with Speed Regulator",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 2499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther Plus 13mm Power Impact Reverse Forward Rotation Drill Machine with Speed Regulator. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDMPP13",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDMPP13_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDMPP13_img1.jpg",
      "https://cdn.abuzz.store/products/AZDMPP13_img2.jpg",
      "https://cdn.abuzz.store/products/AZDMPP13_img3.jpg",
      "https://cdn.abuzz.store/products/AZDMPP13_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 48
  },
  {
    "id": "AZEBP1",
    "title": "Panther Electric Blower P-EB25",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 1899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther Electric Blower P-EB25. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZEBP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZEBP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZEBP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZEBP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZEBP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZEBP1_img4.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 49
  },
  {
    "id": "AZFF006",
    "title": "Flat File Tool 6 Inch With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat File Tool 6 Inch With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFF006",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFF006_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFF006_img1.jpg",
      "https://cdn.abuzz.store/products/AZFF006_img2.jpg",
      "https://cdn.abuzz.store/products/AZFF006_img3.jpg",
      "https://cdn.abuzz.store/products/AZFF006_img4.jpg",
      "https://cdn.abuzz.store/products/AZFF006_img5.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 50
  },
  {
    "id": "AZFF008",
    "title": "Flat File Tool 8 Inch With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Flat File Tool 8 Inch With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFF008",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFF008_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFF008_img1.jpg",
      "https://cdn.abuzz.store/products/AZFF008_img2.jpg",
      "https://cdn.abuzz.store/products/AZFF008_img3.jpg",
      "https://cdn.abuzz.store/products/AZFF008_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 51
  },
  {
    "id": "AZFF010",
    "title": "Flat File Tool 10 Inch With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat File Tool 10 Inch With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFF010",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFF010_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFF010_img1.jpg",
      "https://cdn.abuzz.store/products/AZFF010_img2.jpg",
      "https://cdn.abuzz.store/products/AZFF010_img3.jpg",
      "https://cdn.abuzz.store/products/AZFF010_img4.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 52
  },
  {
    "id": "AZFF012",
    "title": "Flat File Tool 12 Inch With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat File Tool 12 Inch With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFF012",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFF012_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFF012_img1.jpg",
      "https://cdn.abuzz.store/products/AZFF012_img2.jpg",
      "https://cdn.abuzz.store/products/AZFF012_img3.jpg",
      "https://cdn.abuzz.store/products/AZFF012_img4.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 53
  },
  {
    "id": "AZHF006",
    "title": "Half Round File 6 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round File 6 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHF006",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHF006_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHF006_img1.jpg",
      "https://cdn.abuzz.store/products/AZHF006_img2.jpg",
      "https://cdn.abuzz.store/products/AZHF006_img3.jpg",
      "https://cdn.abuzz.store/products/AZHF006_img4.jpg",
      "https://cdn.abuzz.store/products/AZHF006_img5.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 54
  },
  {
    "id": "AZHF008",
    "title": "Half Round File 8 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round File 8 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHF008",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHF008_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHF008_img1.jpg",
      "https://cdn.abuzz.store/products/AZHF008_img2.jpg",
      "https://cdn.abuzz.store/products/AZHF008_img3.jpg",
      "https://cdn.abuzz.store/products/AZHF008_img4.jpg",
      "https://cdn.abuzz.store/products/AZHF008_img5.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 55
  },
  {
    "id": "AZHF010",
    "title": "Half Round File 10 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round File 10 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHF010",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHF010_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHF010_img1.jpg",
      "https://cdn.abuzz.store/products/AZHF010_img2.jpg",
      "https://cdn.abuzz.store/products/AZHF010_img3.jpg",
      "https://cdn.abuzz.store/products/AZHF010_img4.jpg",
      "https://cdn.abuzz.store/products/AZHF010_img5.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 56
  },
  {
    "id": "AZHF012",
    "title": "Half Round File 12 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round File 12 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHF012",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHF012_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHF012_img1.jpg",
      "https://cdn.abuzz.store/products/AZHF012_img2.jpg",
      "https://cdn.abuzz.store/products/AZHF012_img3.jpg",
      "https://cdn.abuzz.store/products/AZHF012_img4.jpg",
      "https://cdn.abuzz.store/products/AZHF012_img5.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 57
  },
  {
    "id": "AZRF006",
    "title": "Round File 6 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round File 6 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRF006",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRF006_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRF006_img1.jpg",
      "https://cdn.abuzz.store/products/AZRF006_img2.jpg",
      "https://cdn.abuzz.store/products/AZRF006_img3.jpg",
      "https://cdn.abuzz.store/products/AZRF006_img4.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 58
  },
  {
    "id": "AZRF008",
    "title": "Round File 8 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round File 8 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRF008",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRF008_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRF008_img1.jpg",
      "https://cdn.abuzz.store/products/AZRF008_img2.jpg",
      "https://cdn.abuzz.store/products/AZRF008_img3.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 59
  },
  {
    "id": "AZRF010",
    "title": "Round File 10 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round File 10 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRF010",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRF010_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRF010_img1.jpg",
      "https://cdn.abuzz.store/products/AZRF010_img2.jpg",
      "https://cdn.abuzz.store/products/AZRF010_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 60
  },
  {
    "id": "AZRF012",
    "title": "Round File 12 Inches With PVC Handle",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round File 12 Inches With PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRF012",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRF012_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRF012_img1.jpg",
      "https://cdn.abuzz.store/products/AZRF012_img2.jpg",
      "https://cdn.abuzz.store/products/AZRF012_img3.jpg",
      "https://cdn.abuzz.store/products/AZRF012_img4.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 61
  },
  {
    "id": "AZWFF6",
    "title": "Wooden Handle Flat File Tool 6 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Flat File Tool 6 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFF6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFF6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFF6_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFF6_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFF6_img3.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 62
  },
  {
    "id": "AZWFF8",
    "title": "Wooden Handle Flat File Tool 8 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Wooden Handle Flat File Tool 8 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFF8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFF8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFF8_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFF8_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFF8_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 63
  },
  {
    "id": "AZWFF10",
    "title": "Wooden Handle Flat File Tool 10 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Flat File Tool 10 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFF10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFF10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFF10_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFF10_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFF10_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 64
  },
  {
    "id": "AZWFF12",
    "title": "Wooden Handle Flat File Tool 12 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Flat File Tool 12 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFF12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFF12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFF12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFF12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFF12_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 65
  },
  {
    "id": "AZWHF6",
    "title": "Wooden Handle Steel Cut Half Round File 6 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Half Round File 6 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF6_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF6_img2.jpg",
      "https://cdn.abuzz.store/products/AZWHF6_img3.jpg",
      "https://cdn.abuzz.store/products/AZWHF6_img4.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 66
  },
  {
    "id": "AZWHF8",
    "title": "Wooden Handle Steel Cut Half Round File 8 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Half Round File 8 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF8_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF8_img2.jpg",
      "https://cdn.abuzz.store/products/AZWHF8_img3.jpg",
      "https://cdn.abuzz.store/products/AZWHF8_img4.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 67
  },
  {
    "id": "AZWHF10",
    "title": "Wooden Handle Steel Cut Half Round File 10 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Half Round File 10 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF10_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF10_img2.jpg",
      "https://cdn.abuzz.store/products/AZWHF10_img3.jpg",
      "https://cdn.abuzz.store/products/AZWHF10_img4.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 68
  },
  {
    "id": "AZWHF12",
    "title": "Wooden Handle Steel Cut Half Round File 12 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Half Round File 12 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWHF12_img3.jpg",
      "https://cdn.abuzz.store/products/AZWHF12_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 69
  },
  {
    "id": "AZWRF6",
    "title": "Wooden Handle Steel Cut Round File 6 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Round File 6 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWRF6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWRF6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWRF6_img1.jpg",
      "https://cdn.abuzz.store/products/AZWRF6_img2.jpg",
      "https://cdn.abuzz.store/products/AZWRF6_img3.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 70
  },
  {
    "id": "AZWRF8",
    "title": "Wooden Handle Steel Cut Round File",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Round File. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWRF8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWRF8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWRF8_img1.jpg",
      "https://cdn.abuzz.store/products/AZWRF8_img2.jpg",
      "https://cdn.abuzz.store/products/AZWRF8_img3.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 71
  },
  {
    "id": "AZWRF10",
    "title": "Wooden Handle Steel Cut Round File 10 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Round File 10 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWRF10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWRF10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWRF10_img1.jpg",
      "https://cdn.abuzz.store/products/AZWRF10_img2.jpg",
      "https://cdn.abuzz.store/products/AZWRF10_img3.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 72
  },
  {
    "id": "AZWRF12",
    "title": "Wooden Handle Steel Cut Round File 12 Inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Steel Cut Round File 12 Inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWRF12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWRF12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWRF12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWRF12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWRF12_img3.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 73
  },
  {
    "id": "AZFHR06",
    "title": "PVC Handle Set of 3 File Flat, Half Round, Round 6 Inches",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Handle Set of 3 File Flat, Half Round, Round 6 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFHR06",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFHR06_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFHR06_img1.jpg",
      "https://cdn.abuzz.store/products/AZFHR06_img2.jpg",
      "https://cdn.abuzz.store/products/AZFHR06_img3.jpg",
      "https://cdn.abuzz.store/products/AZFHR06_img4.jpg",
      "https://cdn.abuzz.store/products/AZFHR06_img5.jpg",
      "https://cdn.abuzz.store/products/AZFHR06_img6.jpg",
      "https://cdn.abuzz.store/products/AZFHR06_img7.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 74
  },
  {
    "id": "AZFHR08",
    "title": "PVC Handle Set of 3 File Flat, Half Round, Round 8 Inches",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 599,
    "stockStatus": "low_stock",
    "description": "High-grade industrial PVC Handle Set of 3 File Flat, Half Round, Round 8 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFHR08",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFHR08_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFHR08_img1.jpg",
      "https://cdn.abuzz.store/products/AZFHR08_img2.jpg",
      "https://cdn.abuzz.store/products/AZFHR08_img3.jpg",
      "https://cdn.abuzz.store/products/AZFHR08_img4.jpg",
      "https://cdn.abuzz.store/products/AZFHR08_img5.jpg",
      "https://cdn.abuzz.store/products/AZFHR08_img6.jpg",
      "https://cdn.abuzz.store/products/AZFHR08_img7.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 75
  },
  {
    "id": "AZFHR10",
    "title": "PVC Handle Set of 3 File Flat, Half Round, Round 10 Inches",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Handle Set of 3 File Flat, Half Round, Round 10 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFHR10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFHR10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFHR10_img1.jpg",
      "https://cdn.abuzz.store/products/AZFHR10_img2.jpg",
      "https://cdn.abuzz.store/products/AZFHR10_img3.jpg",
      "https://cdn.abuzz.store/products/AZFHR10_img4.jpg",
      "https://cdn.abuzz.store/products/AZFHR10_img5.jpg",
      "https://cdn.abuzz.store/products/AZFHR10_img6.jpg",
      "https://cdn.abuzz.store/products/AZFHR10_img7.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 76
  },
  {
    "id": "AZFHR12",
    "title": "PVC Handle Set of 3 File Flat, Half Round, Round 12 Inches",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Handle Set of 3 File Flat, Half Round, Round 12 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFHR12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFHR12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFHR12_img1.jpg",
      "https://cdn.abuzz.store/products/AZFHR12_img2.jpg",
      "https://cdn.abuzz.store/products/AZFHR12_img3.jpg",
      "https://cdn.abuzz.store/products/AZFHR12_img4.jpg",
      "https://cdn.abuzz.store/products/AZFHR12_img5.jpg",
      "https://cdn.abuzz.store/products/AZFHR12_img6.jpg",
      "https://cdn.abuzz.store/products/AZFHR12_img7.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 77
  },
  {
    "id": "AZWFHR6",
    "title": "Wooden Handle Set of 3 File Flat, Half Round, Round 6 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Set of 3 File Flat, Half Round, Round 6 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFHR6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFHR6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFHR6_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFHR6_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFHR6_img3.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 78
  },
  {
    "id": "AZWFHR8",
    "title": "Wooden Handle Set of 3 File Flat, Half Round, Round 8 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Set of 3 File Flat, Half Round, Round 8 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFHR8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFHR8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFHR8_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFHR8_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFHR8_img3.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 79
  },
  {
    "id": "AZWFHR10",
    "title": "Wooden Handle Set of 3 File Flat, Half Round, Round 10 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Set of 3 File Flat, Half Round, Round 10 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFHR10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFHR10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFHR10_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFHR10_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFHR10_img3.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 80
  },
  {
    "id": "AZWFHR12",
    "title": "Wooden Handle Set of 3 File Flat, Half Round, Round 12 Inches",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Handle Set of 3 File Flat, Half Round, Round 12 Inches. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWFHR12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWFHR12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWFHR12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWFHR12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWFHR12_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 81
  },
  {
    "id": "AZGCBMK10",
    "title": "Super MK 10mm Granite Core Bit (Pack of 2)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 10mm Granite Core Bit (Pack of 2). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK10_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK10_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK10_img3.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 82
  },
  {
    "id": "AZGCBMK12",
    "title": "Super MK 12mm Granite Core Bit (Pack of 2)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 12mm Granite Core Bit (Pack of 2). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK12_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK12_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK12_img3.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK12_img4.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 83
  },
  {
    "id": "AZGCBMK14",
    "title": "Super MK 14mm Granite Core Bit",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 14mm Granite Core Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK14_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK14_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK14_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 84
  },
  {
    "id": "AZGCBMK16",
    "title": "Super MK 16mm Granite Core Bit",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 16mm Granite Core Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK16_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK16_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK16_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 85
  },
  {
    "id": "AZGCBMK18",
    "title": "Super MK 18mm Granite Core Bit",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 18mm Granite Core Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK18",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK18_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK18_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK18_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK18_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 86
  },
  {
    "id": "AZGCBMK20",
    "title": "Super MK 20mm Granite Core Bit",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Super MK 20mm Granite Core Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK20_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK20_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK20_img3.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 87
  },
  {
    "id": "AZGCBMK25",
    "title": "Super MK 25mm Granite Core Bit",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 25mm Granite Core Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCBMK25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCBMK25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCBMK25_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK25_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCBMK25_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 88
  },
  {
    "id": "AZDB10-31",
    "title": "Laxmi (10 x 310mm) Concrete Drill bit (Silver) Masonry Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi (10 x 310mm) Concrete Drill bit (Silver) Masonry Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDB10-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDB10-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDB10-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZDB10-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZDB10-31_img3.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 89
  },
  {
    "id": "AZDB12-31",
    "title": "Laxmi (12 x 310mm) Concrete Drill bit (Silver) Masonry Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi (12 x 310mm) Concrete Drill bit (Silver) Masonry Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDB12-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDB12-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDB12-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZDB12-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZDB12-31_img3.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 90
  },
  {
    "id": "AZSHDB10-31",
    "title": "S4 Steel (10 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (10 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB10-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB10-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB10-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB10-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB10-31_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 91
  },
  {
    "id": "AZHDB12-31",
    "title": "S4 Steel (12 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (12 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB12-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB12-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB12-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB12-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB12-31_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 92
  },
  {
    "id": "AZHDB14-31",
    "title": "S4 Steel (14 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (14 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB14-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB14-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB14-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB14-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB14-31_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 93
  },
  {
    "id": "AZHDB16-31",
    "title": "S4 Steel (16 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (16 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB16-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB16-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB16-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB16-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB16-31_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 94
  },
  {
    "id": "AZHDB18-31",
    "title": "S4 Steel (18 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 489,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (18 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB18-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB18-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB18-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB18-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB18-31_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 95
  },
  {
    "id": "AZHDB20-31",
    "title": "S4 Steel (20 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 529,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (20 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB20-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB20-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB20-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB20-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB20-31_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 96
  },
  {
    "id": "AZHDB25-31",
    "title": "S4 Steel (25 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (25 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB25-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB25-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB25-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB25-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB25-31_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 97
  },
  {
    "id": "AZHDB0012",
    "title": "S4 Steel (12 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (12 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB0012",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB0012_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB0012_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB0012_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB0012_img3.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 98
  },
  {
    "id": "AZHDB0014",
    "title": "S4 Steel (14 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 429,
    "stockStatus": "low_stock",
    "description": "High-grade industrial S4 Steel (14 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB0014",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB0014_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB0014_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB0014_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB0014_img3.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 99
  },
  {
    "id": "AZHDB0016",
    "title": "S4 Steel (16 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (16 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB0016",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB0016_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB0016_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB0016_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB0016_img3.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 100
  },
  {
    "id": "AZHDB0018",
    "title": "S4 Steel (18 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 469,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (18 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB0018",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB0018_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB0018_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB0018_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB0018_img3.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 101
  },
  {
    "id": "AZHDB0020",
    "title": "S4 Steel (20 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 489,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (20 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB0020",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB0020_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB0020_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB0020_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB0020_img3.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 102
  },
  {
    "id": "AZSHDB22-45",
    "title": "S4 Steel (22 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 529,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (22 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB22-45",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB22-45_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB22-45_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB22-45_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB22-45_img3.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 103
  },
  {
    "id": "AZHDB0025",
    "title": "S4 Steel (25 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 Steel (25 x 450mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB0025",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB0025_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB0025_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB0025_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB0025_img3.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 104
  },
  {
    "id": "AZHDB3-85",
    "title": "SDS Plus (3x85) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (3x85) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB3-85",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB3-85_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB3-85_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB3-85_img2.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 105
  },
  {
    "id": "AZHDB5-16",
    "title": "SDS Plus (5x160) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (5x160) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB5-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB5-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB5-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB5-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB5-16_img3.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 106
  },
  {
    "id": "AZHDB6-16",
    "title": "SDS Plus (6x160) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 359,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (6x160) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB6-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB6-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB6-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB6-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB6-16_img3.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 107
  },
  {
    "id": "AZHDB8-16",
    "title": "SDS Plus (8x160) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (8x160) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB8-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB8-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB8-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB8-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB8-16_img3.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 108
  },
  {
    "id": "AZHDB10-16",
    "title": "SDS Plus (10x160) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 379,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (10x160) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB10-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB10-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB10-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB10-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB10-16_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 109
  },
  {
    "id": "AZHDB12-16",
    "title": "SDS Plus (12x160) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (12x160) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB12-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB12-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB12-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB12-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB12-16_img3.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 110
  },
  {
    "id": "AZHDB8-21",
    "title": "SDS Plus (8x210) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial SDS Plus (8x210) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB8-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB8-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB8-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB8-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB8-21_img3.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 111
  },
  {
    "id": "AZHDB10-21",
    "title": "SDS Plus (10x210) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 359,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (10x210) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB10-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB10-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB10-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB10-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB10-21_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 112
  },
  {
    "id": "AZHDB12-21",
    "title": "SDS Plus (12x210) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (12x210) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB12-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB12-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB12-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB12-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB12-21_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 113
  },
  {
    "id": "AZHDB14-21",
    "title": "SDS Plus (14x210) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 379,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (14x210) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB14-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB14-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB14-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB14-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB14-21_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDB14-21_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDB14-21_img5.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 114
  },
  {
    "id": "AZHDB20-21",
    "title": "SDS Plus (20x210) Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial SDS Plus (20x210) Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB20-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB20-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB20-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB20-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB20-21_img3.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 115
  },
  {
    "id": "AZHGPP1",
    "title": "Panter Plus Hot Air Gun P-HG2000",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panter Plus Hot Air Gun P-HG2000. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHGPP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHGPP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHGPP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZHGPP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZHGPP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZHGPP1_img4.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 116
  },
  {
    "id": "AZHS6",
    "title": "6pcs Hole Saw Set",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 6pcs Hole Saw Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHS6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHS6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHS6_img1.jpg",
      "https://cdn.abuzz.store/products/AZHS6_img2.jpg",
      "https://cdn.abuzz.store/products/AZHS6_img3.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 117
  },
  {
    "id": "AZHSMK11",
    "title": "MK Super 11Pcs Hole Saw Set",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super 11Pcs Hole Saw Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSMK11",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSMK11_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSMK11_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSMK11_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSMK11_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSMK11_img4.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 118
  },
  {
    "id": "AZHSK16",
    "title": "16Pcs Hole Saw kit",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 16Pcs Hole Saw kit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSK16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSK16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSK16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSK16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSK16_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSK16_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSK16_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSK16_img6.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 119
  },
  {
    "id": "AZMG110",
    "title": "A.D.S Plus Turbo Marble Wall Granite Thin Cutting Blade (4 Inch or 110mm)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial A.D.S Plus Turbo Marble Wall Granite Thin Cutting Blade (4 Inch or 110mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMG110",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMG110_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMG110_img1.jpg",
      "https://cdn.abuzz.store/products/AZMG110_img2.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 120
  },
  {
    "id": "AZMGC110",
    "title": "A.D.S Plus Cutting Marble Wall Granite Thin Blade (4 Inch or 110mm)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial A.D.S Plus Cutting Marble Wall Granite Thin Blade (4 Inch or 110mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMGC110",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMGC110_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMGC110_img1.jpg",
      "https://cdn.abuzz.store/products/AZMGC110_img2.jpg",
      "https://cdn.abuzz.store/products/AZMGC110_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 121
  },
  {
    "id": "AZMGP110",
    "title": "A.D.S Plus Plane Marble Wall Granite Thin Cutting Blade (4 Inch or 110mm)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial A.D.S Plus Plane Marble Wall Granite Thin Cutting Blade (4 Inch or 110mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMGP110",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMGP110_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMGP110_img1.jpg",
      "https://cdn.abuzz.store/products/AZMGP110_img2.jpg",
      "https://cdn.abuzz.store/products/AZMGP110_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 122
  },
  {
    "id": "AZMGCPC110",
    "title": "A.D.S Plus Plane ,Cutting ,Turbo Marble Wall Granite Thin Blade (4 Inch or 110mm) Plane , Ceramic & Cutting Pack of 3",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "low_stock",
    "description": "High-grade industrial A.D.S Plus Plane ,Cutting ,Turbo Marble Wall Granite Thin Blade (4 Inch or 110mm) Plane , Ceramic & Cutting Pack of 3. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMGCPC110",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMGCPC110_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMGCPC110_img1.jpg",
      "https://cdn.abuzz.store/products/AZMGCPC110_img2.jpg",
      "https://cdn.abuzz.store/products/AZMGCPC110_img3.jpg",
      "https://cdn.abuzz.store/products/AZMGCPC110_img4.jpg",
      "https://cdn.abuzz.store/products/AZMGCPC110_img5.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 123
  },
  {
    "id": "AZMKBC8",
    "title": "Super MK 8 inch mini Bolt Cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Super MK 8 inch mini Bolt Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKBC8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKBC8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKBC8_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKBC8_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKBC8_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKBC8_img4.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 124
  },
  {
    "id": "AZMTP15",
    "title": "Panther 15m Measuring Tape",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther 15m Measuring Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTP15",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTP15_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTP15_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTP15_img2.jpg",
      "https://cdn.abuzz.store/products/AZMTP15_img3.jpg",
      "https://cdn.abuzz.store/products/AZMTP15_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 125
  },
  {
    "id": "AZMTP30",
    "title": "Panther 30m Measuring Tape",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther 30m Measuring Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTP30",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTP30_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTP30_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTP30_img2.jpg",
      "https://cdn.abuzz.store/products/AZMTP30_img3.jpg",
      "https://cdn.abuzz.store/products/AZMTP30_img4.jpg",
      "https://cdn.abuzz.store/products/AZMTP30_img5.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 126
  },
  {
    "id": "AZMTO30",
    "title": "Omxe (Measuring Distances Up to 30 Meters) Manual Measuring Tape",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Omxe (Measuring Distances Up to 30 Meters) Manual Measuring Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTO30",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTO30_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTO30_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTO30_img2.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 127
  },
  {
    "id": "AZPMDC10",
    "title": "PM Tools & Abrasives 10 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 10 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC10_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC10_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC10_img3.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 128
  },
  {
    "id": "AZPMDC12",
    "title": "PM Tools & Abrasives 12 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 12 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC12_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC12_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC12_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC12_img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 129
  },
  {
    "id": "AZPMDC14",
    "title": "PM Tools & Abrasives 14 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 14 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC14_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC14_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC14_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC14_img4.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 130
  },
  {
    "id": "AZPMDC16",
    "title": "PM Tools & Abrasives 16 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 469,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 16 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC16_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC16_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC16_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC16_img4.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 131
  },
  {
    "id": "AZPMDC18",
    "title": "PM Tools & Abrasives 18 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 18 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC18",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC18_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC18_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC18_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC18_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC18_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 132
  },
  {
    "id": "AZPMDC20",
    "title": "PM Tools & Abrasives 20 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 20 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC20_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC20_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC20_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC20_img4.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 133
  },
  {
    "id": "AZPMDC22",
    "title": "PM Tools & Abrasives 22 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 589,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 22 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC22_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC22_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC22_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC22_img4.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 134
  },
  {
    "id": "AZPMDC26",
    "title": "PM Tools & Abrasives 26 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 529,
    "stockStatus": "low_stock",
    "description": "High-grade industrial PM Tools & Abrasives 26 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC26_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC26_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC26_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC26_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 135
  },
  {
    "id": "AZPMDC33",
    "title": "PM Tools & Abrasives 33 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 33 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC33",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC33_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC33_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC33_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC33_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC33_img4.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 136
  },
  {
    "id": "AZPMDC37",
    "title": "PM Tools & Abrasives 37 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 37 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC37",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC37_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC37_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC37_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC37_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC37_img4.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 137
  },
  {
    "id": "AZPMDC40",
    "title": "PM Tools & Abrasives 40 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 40 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC40_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC40_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC40_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC40_img4.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 138
  },
  {
    "id": "AZPMDC42",
    "title": "PM Tools & Abrasives 42 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 42 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC42",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC42_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC42_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC42_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC42_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC42_img4.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 139
  },
  {
    "id": "AZPMDC45",
    "title": "PM Tools & Abrasives 45 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1199,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 45 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC45",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC45_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC45_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC45_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC45_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC45_img4.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 140
  },
  {
    "id": "AZPMDC50",
    "title": "PM Tools & Abrasives 50 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PM Tools & Abrasives 50 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC50_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC50_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC50_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC50_img4.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 141
  },
  {
    "id": "AZPPDH5",
    "title": "Panther Plus Demolition Hammer P-0810 5 KG",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 5999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther Plus Demolition Hammer P-0810 5 KG. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPPDH5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPPDH5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPPDH5_img1.jpg",
      "https://cdn.abuzz.store/products/AZPPDH5_img2.jpg",
      "https://cdn.abuzz.store/products/AZPPDH5_img3.jpg",
      "https://cdn.abuzz.store/products/AZPPDH5_img4.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 142
  },
  {
    "id": "AZPPPP01",
    "title": "Panther Plus Paint Putty Machine",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 4999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther Plus Paint Putty Machine. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPPPP01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPPPP01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPPPP01_img1.jpg",
      "https://cdn.abuzz.store/products/AZPPPP01_img2.jpg",
      "https://cdn.abuzz.store/products/AZPPPP01_img3.jpg",
      "https://cdn.abuzz.store/products/AZPPPP01_img4.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 143
  },
  {
    "id": "AZRGCD100",
    "title": "RG Gold 100mm Cutting Grinding Wheel Diamond Grind Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold 100mm Cutting Grinding Wheel Diamond Grind Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGCD100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGCD100_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGCD100_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGCD100_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGCD100_img3.jpg",
      "https://cdn.abuzz.store/products/AZRGCD100_img4.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 144
  },
  {
    "id": "AZRGPCD100",
    "title": "RG Gold 100mm Plane Grinding Wheel Diamond Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold 100mm Plane Grinding Wheel Diamond Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGPCD100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGPCD100_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGPCD100_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGPCD100_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGPCD100_img3.jpg",
      "https://cdn.abuzz.store/products/AZRGPCD100_img4.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 145
  },
  {
    "id": "AZRGTCD100",
    "title": "RG Gold 100mm Turbo Rim Grinding Wheel Diamond Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold 100mm Turbo Rim Grinding Wheel Diamond Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGTCD100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGTCD100_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGTCD100_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGTCD100_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGTCD100_img3.jpg",
      "https://cdn.abuzz.store/products/AZRGTCD100_img4.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 146
  },
  {
    "id": "AZRGCTD100",
    "title": "RG Gold 100mm Grinding Wheel Diamond Grind Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking cutting, segmented & Turbo Pack of 3",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "low_stock",
    "description": "High-grade industrial RG Gold 100mm Grinding Wheel Diamond Grind Cup Disc Concrete Granite Stone Grinder DIY Power Tool Ceramics Metalworking cutting, segmented & Turbo Pack of 3. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGCTD100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGCTD100_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGCTD100_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGCTD100_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGCTD100_img3.jpg",
      "https://cdn.abuzz.store/products/AZRGCTD100_img4.jpg",
      "https://cdn.abuzz.store/products/AZRGCTD100_img5.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 147
  },
  {
    "id": "AZRGEH",
    "title": "RG Gold 500A Heavy Duty Earth Clamp Electrode Holder",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold 500A Heavy Duty Earth Clamp Electrode Holder. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGEH",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGEH_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGEH_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGEH_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGEH_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 148
  },
  {
    "id": "AZRGHDB10-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 10X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 10X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB10-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB10-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB10-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB10-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB10-31_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 149
  },
  {
    "id": "AZRGHDB12-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 12X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 12X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB12-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB12-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB12-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB12-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB12-31_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 150
  },
  {
    "id": "AZRGHDB14-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 14X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 14X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB14-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB14-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB14-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB14-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB14-31_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 151
  },
  {
    "id": "AZRGHDB16-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 16X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 16X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB16-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB16-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB16-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB16-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB16-31_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 152
  },
  {
    "id": "AZRGHDB18-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 18X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 489,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 18X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB18-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB18-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB18-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB18-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB18-31_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 153
  },
  {
    "id": "AZRGHDB20-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 20X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 529,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 20X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB20-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB20-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB20-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB20-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB20-31_img3.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 154
  },
  {
    "id": "AZRGHDB25-31",
    "title": "RG Gold Cross Tip Plus Hammer Drill Bit 25X310mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Cross Tip Plus Hammer Drill Bit 25X310mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGHDB25-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGHDB25-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGHDB25-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB25-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGHDB25-31_img3.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 155
  },
  {
    "id": "AZRHP1",
    "title": "Panther 20mm Reversible Rotary Hammer Drill machine SDS Plus with 3 Hammers Bits",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 4999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther 20mm Reversible Rotary Hammer Drill machine SDS Plus with 3 Hammers Bits. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRHP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRHP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRHP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZRHP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZRHP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZRHP1_img4.jpg",
      "https://cdn.abuzz.store/products/AZRHP1_img5.jpg",
      "https://cdn.abuzz.store/products/AZRHP1_img6.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 156
  },
  {
    "id": "AZSD20",
    "title": "HSS Step Drill 4mm to 20mm",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial HSS Step Drill 4mm to 20mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSD20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSD20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSD20_img1.jpg",
      "https://cdn.abuzz.store/products/AZSD20_img2.jpg",
      "https://cdn.abuzz.store/products/AZSD20_img3.jpg",
      "https://cdn.abuzz.store/products/AZSD20_img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 157
  },
  {
    "id": "AZSPD4-32",
    "title": "LAXMI Step Drill 4-32",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Step Drill 4-32. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSPD4-32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSPD4-32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSPD4-32_img1.jpg",
      "https://cdn.abuzz.store/products/AZSPD4-32_img2.jpg",
      "https://cdn.abuzz.store/products/AZSPD4-32_img3.jpg",
      "https://cdn.abuzz.store/products/AZSPD4-32_img4.jpg",
      "https://cdn.abuzz.store/products/AZSPD4-32_img5.jpg",
      "https://cdn.abuzz.store/products/AZSPD4-32_img6.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 158
  },
  {
    "id": "AZSHCSG12",
    "title": "Sun100 Men's and Women's Safety Goggles (Pack of 12) Glasses for Biking, Riding, Welding, Laboratory, Blowtorch, Wood-Working, Power Tool Protective Eyewear, Clear Hard Coat Lens",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 599,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Sun100 Men's and Women's Safety Goggles (Pack of 12) Glasses for Biking, Riding, Welding, Laboratory, Blowtorch, Wood-Working, Power Tool Protective Eyewear, Clear Hard Coat Lens. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHCSG12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3926",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHCSG12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHCSG12_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHCSG12_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHCSG12_img3.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 159
  },
  {
    "id": "AZSMPP1",
    "title": "Panther Plus Electric Screwdriver Drill Machine P-SD1013A",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 1899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Panther Plus Electric Screwdriver Drill Machine P-SD1013A. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSMPP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSMPP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSMPP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZSMPP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZSMPP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZSMPP1_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 160
  },
  {
    "id": "AZSKSS3",
    "title": "Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali (Size-3) Silver",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali (Size-3) Silver. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSKSS3",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSKSS3_img1.jpeg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSKSS3_img1.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3_img2.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3_img3.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3_img4.jpeg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 161
  },
  {
    "id": "AZSKSS2",
    "title": "Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali (Size-2) Silver",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali (Size-2) Silver. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSKSS2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSKSS2_img1.jpeg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSKSS2_img1.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2_img2.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2_img3.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2_img4.jpeg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 162
  },
  {
    "id": "AZSKSS3-2",
    "title": "Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali - (Size-3) Silver Pack of 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali - (Size-3) Silver Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSKSS3-2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSKSS3-2_img1.jpeg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSKSS3-2_img1.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3-2_img2.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3-2_img3.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3-2_img4.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3-2_img5.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS3-2_img6.jpeg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 163
  },
  {
    "id": "AZSKSS2-2",
    "title": "Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali (Size-2) Silver Pack of 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Shree Krishna Stainless Steel Sink Strainer Kitchen Drain Net Basin Basket Filter Stopper Drainer/Jali (Size-2) Silver Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSKSS2-2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSKSS2-2_img1.jpeg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSKSS2-2_img1.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2-2_img2.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2-2_img3.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2-2_img4.jpeg",
      "https://cdn.abuzz.store/products/AZSKSS2-2_img5.jpeg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 164
  },
  {
    "id": "AZDPP7",
    "title": "Diamond Polishing Pads for Glass Granite Marble Concrete Stone WetDry Grit 0-6 7Pc Glass Grinding Tools Glass Polisher (4 inch)",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Diamond Polishing Pads for Glass Granite Marble Concrete Stone WetDry Grit 0-6 7Pc Glass Grinding Tools Glass Polisher (4 inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDPP7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDPP7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDPP7_img1.jpg",
      "https://cdn.abuzz.store/products/AZDPP7_img2.jpg",
      "https://cdn.abuzz.store/products/AZDPP7_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 15
  },
  {
    "id": "AZLBK1",
    "title": "Laxmi Bearing Kada",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Bearing Kada. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLBK1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLBK1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLBK1_img1.jpg",
      "https://cdn.abuzz.store/products/AZLBK1_img2.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 16
  },
  {
    "id": "AZLBK2",
    "title": "Laxmi Bearing Kada (Pack of 2)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Bearing Kada (Pack of 2). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLBK2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLBK2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLBK2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLBK2_img2.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 17
  },
  {
    "id": "AZLJC12",
    "title": "Laxmi Jhula Swing Chain (Pack of 12)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Jhula Swing Chain (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLJC12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLJC12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLJC12_img1.jpg",
      "https://cdn.abuzz.store/products/AZLJC12_img2.jpg",
      "https://cdn.abuzz.store/products/AZLJC12_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 18
  },
  {
    "id": "AZLRH6",
    "title": "6pcs Garden Jhula Swing Accessories,Jhula Rod (Pack of 6)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 6pcs Garden Jhula Swing Accessories,Jhula Rod (Pack of 6). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLRH6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLRH6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLRH6_img1.jpg",
      "https://cdn.abuzz.store/products/AZLRH6_img2.jpg",
      "https://cdn.abuzz.store/products/AZLRH6_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 19
  },
  {
    "id": "AZLRH12",
    "title": "12pcs Garden Jhula Swing Accessories,Jhula Rod (Pack of 12)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 12pcs Garden Jhula Swing Accessories,Jhula Rod (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLRH12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLRH12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLRH12_img1.jpg",
      "https://cdn.abuzz.store/products/AZLRH12_img2.jpg",
      "https://cdn.abuzz.store/products/AZLRH12_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 20
  },
  {
    "id": "AZLSH12",
    "title": "Laxmi Garden Jhula Swing S Hook (Pack of 12)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Laxmi Garden Jhula Swing S Hook (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLSH12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLSH12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLSH12_img1.jpg",
      "https://cdn.abuzz.store/products/AZLSH12_img2.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 21
  },
  {
    "id": "AZLSH1",
    "title": "Lotus 1 Lbs Sledge Hammer with Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Lotus 1 Lbs Sledge Hammer with Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLSH1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLSH1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLSH1_img1.jpg",
      "https://cdn.abuzz.store/products/AZLSH1_img2.jpg",
      "https://cdn.abuzz.store/products/AZLSH1_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 22
  },
  {
    "id": "AZLSH1.5",
    "title": "Lotus 1.5 Lbs Sledge Hammer with Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Lotus 1.5 Lbs Sledge Hammer with Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLSH1.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLSH1_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLSH1_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZLSH1_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZLSH1_5_img3.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 23
  },
  {
    "id": "AZLSH2",
    "title": "Lotus 2 Lbs Sledge Hammer with Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Lotus 2 Lbs Sledge Hammer with Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLSH2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLSH2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLSH2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLSH2_img2.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 24
  },
  {
    "id": "AZSGP12",
    "title": "Sun100 Black Men's and Women's Safety Goggles (Pack of 12) Glasses for Biking, Riding, Welding, Laboratory, Blowtorch, Wood-Working, Power Tool Protective Eyewear, Clear Hard Coat Lens",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Sun100 Black Men's and Women's Safety Goggles (Pack of 12) Glasses for Biking, Riding, Welding, Laboratory, Blowtorch, Wood-Working, Power Tool Protective Eyewear, Clear Hard Coat Lens. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSGP12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3926",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSGP12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSGP12_img1.jpg",
      "https://cdn.abuzz.store/products/AZSGP12_img2.jpg",
      "https://cdn.abuzz.store/products/AZSGP12_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 25
  },
  {
    "id": "AZMAG4",
    "title": "Mercury MC-801 4 Inch Heavy Duty Angle Grinder",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 2499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Mercury MC-801 4 Inch Heavy Duty Angle Grinder. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMAG4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMAG4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMAG4_img1.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_img2.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_img3.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_img4.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 26
  },
  {
    "id": "AZICPL52",
    "title": "Inaya Captain 52mm 7 Lever Pad Lock",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Inaya Captain 52mm 7 Lever Pad Lock. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZICPL52",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZICPL52_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZICPL52_img1.jpg",
      "https://cdn.abuzz.store/products/AZICPL52_img2.jpg",
      "https://cdn.abuzz.store/products/AZICPL52_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 27
  },
  {
    "id": "AZIPPL62",
    "title": "Inaya Proud 62mm 8 Levers Padlock",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Inaya Proud 62mm 8 Levers Padlock. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZIPPL62",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZIPPL62_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZIPPL62_img1.jpg",
      "https://cdn.abuzz.store/products/AZIPPL62_img2.jpg",
      "https://cdn.abuzz.store/products/AZIPPL62_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 28
  },
  {
    "id": "AZSSSL75",
    "title": "Shrill Speed 75mm 7 Lever Shutter Lock",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Shrill Speed 75mm 7 Lever Shutter Lock. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSSSL75",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSSSL75_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSSSL75_img1.jpg",
      "https://cdn.abuzz.store/products/AZSSSL75_img2.jpg",
      "https://cdn.abuzz.store/products/AZSSSL75_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 29
  },
  {
    "id": "AZRYN75",
    "title": "RYAN 75mm 7 Lever Shutter Lock",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RYAN 75mm 7 Lever Shutter Lock. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRYN75",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRYN75_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRYN75_img1.jpg",
      "https://cdn.abuzz.store/products/AZRYN75_img2.jpg",
      "https://cdn.abuzz.store/products/AZRYN75_img3.jpg",
      "https://cdn.abuzz.store/products/AZRYN75_img4.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 30
  },
  {
    "id": "AZSSSL90",
    "title": "Shrill Speed 90mm 9 Lever Shutter Lock",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Shrill Speed 90mm 9 Lever Shutter Lock. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSSSL90",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSSSL90_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSSSL90_img1.jpg",
      "https://cdn.abuzz.store/products/AZSSSL90_img2.jpg",
      "https://cdn.abuzz.store/products/AZSSSL90_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 31
  },
  {
    "id": "AZCNBT03P10",
    "title": "LAXMI 3mm Concrete Drill Bit (pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 3mm Concrete Drill Bit (pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNBT03P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNBT03P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNBT03P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNBT03P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNBT03P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNBT03P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNBT03P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZCNBT03P10_img6.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 32
  },
  {
    "id": "AZCNBT04P10",
    "title": "LAXMI 4mm Concrete Drill Bit (pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LAXMI 4mm Concrete Drill Bit (pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNBT04P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNBT04P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNBT04P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNBT04P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNBT04P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNBT04P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNBT04P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZCNBT04P10_img6.jpg",
      "https://cdn.abuzz.store/products/AZCNBT04P10_img7.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 33
  },
  {
    "id": "AZCNBT05P10",
    "title": "LAXMI 5mm Concrete Drill Bit (pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 5mm Concrete Drill Bit (pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNBT05P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNBT05P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNBT05P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNBT05P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNBT05P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNBT05P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNBT05P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZCNBT05P10_img6.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 34
  },
  {
    "id": "AZCNBT06P10",
    "title": "LAXMI 6mm Concrete Drill Bit (pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 6mm Concrete Drill Bit (pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNBT06P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNBT06P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNBT06P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNBT06P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNBT06P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNBT06P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNBT06P10_img5.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 35
  },
  {
    "id": "AZCNDB8P10",
    "title": "LAXMI 8mm Concrete Drill Bit pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 8mm Concrete Drill Bit pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNDB8P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNDB8P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNDB8P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNDB8P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNDB8P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNDB8P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNDB8P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZCNDB8P10_img6.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 36
  },
  {
    "id": "AZCNDB10P10",
    "title": "LAXMI 10mm Concrete Drill Bit pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 10mm Concrete Drill Bit pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNDB10P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNDB10P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNDB10P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNDB10P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNDB10P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNDB10P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNDB10P10_img5.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 37
  },
  {
    "id": "AZCNDB12P10",
    "title": "LAXMI 12mm Concrete Drill Bit pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 12mm Concrete Drill Bit pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCNDB12P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCNDB12P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCNDB12P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZCNDB12P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZCNDB12P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZCNDB12P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZCNDB12P10_img5.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 38
  },
  {
    "id": "AZGCTR01",
    "title": "LAXMI Glass Cutter Tool Anti-Slip Professional Glass Cutting Tool - 5mm-12 mm Metal Handle Pencil Style Glass Cutter Tool",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Glass Cutter Tool Anti-Slip Professional Glass Cutting Tool - 5mm-12 mm Metal Handle Pencil Style Glass Cutter Tool. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGCTR01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGCTR01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGCTR01_img1.jpg",
      "https://cdn.abuzz.store/products/AZGCTR01_img2.jpg",
      "https://cdn.abuzz.store/products/AZGCTR01_img3.jpg",
      "https://cdn.abuzz.store/products/AZGCTR01_img4.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 39
  },
  {
    "id": "AZHDB04-11P10",
    "title": "RG GOLD (04x110) Hammer Drill Bit (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG GOLD (04x110) Hammer Drill Bit (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB04-11P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB04-11P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB04-11P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB04-11P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB04-11P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDB04-11P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDB04-11P10_img5.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 40
  },
  {
    "id": "AZHDB05-11P10",
    "title": "RG GOLD (05x110) Hammer Drill Bit Pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG GOLD (05x110) Hammer Drill Bit Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB05-11P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB05-11P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB05-11P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB05-11P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB05-11P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDB05-11P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDB05-11P10_img5.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 41
  },
  {
    "id": "AZHDB06-11P10",
    "title": "RG GOLD (06x110) Hammer Drill Bit Pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG GOLD (06x110) Hammer Drill Bit Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB06-11P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB06-11P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB06-11P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDB06-11P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDB06-11P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDB06-11P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDB06-11P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZHDB06-11P10_img6.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 42
  },
  {
    "id": "AZHGETS04P2",
    "title": "LAXMI Metal High Grade Engineering Try Square 4inch(Silver)PACK OF 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Metal High Grade Engineering Try Square 4inch(Silver)PACK OF 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHGETS04P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHGETS04P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHGETS04P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZHGETS04P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZHGETS04P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZHGETS04P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZHGETS04P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZHGETS04P2_img6.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 43
  },
  {
    "id": "AZHGETS06P2",
    "title": "LAXMI Metal High Grade Engineering Try Square 6inch(Silver)PACK OF 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Metal High Grade Engineering Try Square 6inch(Silver)PACK OF 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHGETS06P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHGETS06P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHGETS06P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZHGETS06P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZHGETS06P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZHGETS06P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZHGETS06P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZHGETS06P2_img6.jpg",
      "https://cdn.abuzz.store/products/AZHGETS06P2_img7.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 44
  },
  {
    "id": "AZHGETS08P2",
    "title": "LAXMI Metal High Grade Engineering Try Square 8inch(Silver)PACK OF 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LAXMI Metal High Grade Engineering Try Square 8inch(Silver)PACK OF 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHGETS08P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHGETS08P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHGETS08P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZHGETS08P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZHGETS08P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZHGETS08P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZHGETS08P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZHGETS08P2_img6.jpg",
      "https://cdn.abuzz.store/products/AZHGETS08P2_img7.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 45
  },
  {
    "id": "AZHGETS10P2",
    "title": "LAXMI Metal High Grade Engineering Try Square 10inch(Silver)PACK OF 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Metal High Grade Engineering Try Square 10inch(Silver)PACK OF 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHGETS10P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHGETS10P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHGETS10P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZHGETS10P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZHGETS10P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZHGETS10P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZHGETS10P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZHGETS10P2_img6.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 46
  },
  {
    "id": "AZHGETS12P2",
    "title": "LAXMI Metal High Grade Engineering Try Square 12inch(Silver)PACK OF 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Metal High Grade Engineering Try Square 12inch(Silver)PACK OF 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHGETS12P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHGETS12P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHGETS12P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZHGETS12P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZHGETS12P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZHGETS12P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZHGETS12P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZHGETS12P2_img6.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 47
  },
  {
    "id": "AZJCTH150",
    "title": "J555 Cut Type Hammer Without Handle 150gm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J555 Cut Type Hammer Without Handle 150gm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJCTH150",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJCTH150_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJCTH150_img1.jpg",
      "https://cdn.abuzz.store/products/AZJCTH150_img2.jpg",
      "https://cdn.abuzz.store/products/AZJCTH150_img3.jpg",
      "https://cdn.abuzz.store/products/AZJCTH150_img4.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 48
  },
  {
    "id": "AZJCTH200",
    "title": "J555 Cut Type Hammer Without Handle 200gm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J555 Cut Type Hammer Without Handle 200gm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJCTH200",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJCTH200_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJCTH200_img1.jpg",
      "https://cdn.abuzz.store/products/AZJCTH200_img2.jpg",
      "https://cdn.abuzz.store/products/AZJCTH200_img3.jpg",
      "https://cdn.abuzz.store/products/AZJCTH200_img4.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 49
  },
  {
    "id": "AZJCTH250",
    "title": "J555 Cut Type Hammer Without Handle 250gm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J555 Cut Type Hammer Without Handle 250gm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJCTH250",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJCTH250_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJCTH250_img1.jpg",
      "https://cdn.abuzz.store/products/AZJCTH250_img2.jpg",
      "https://cdn.abuzz.store/products/AZJCTH250_img3.jpg",
      "https://cdn.abuzz.store/products/AZJCTH250_img4.jpg",
      "https://cdn.abuzz.store/products/AZJCTH250_img5.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 50
  },
  {
    "id": "AZJCTH300",
    "title": "J555 Cut Type Hammer Without Handle 300gm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J555 Cut Type Hammer Without Handle 300gm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJCTH300",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJCTH300_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJCTH300_img1.jpg",
      "https://cdn.abuzz.store/products/AZJCTH300_img2.jpg",
      "https://cdn.abuzz.store/products/AZJCTH300_img3.jpg",
      "https://cdn.abuzz.store/products/AZJCTH300_img4.jpg",
      "https://cdn.abuzz.store/products/AZJCTH300_img5.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 51
  },
  {
    "id": "AZLCUBH3",
    "title": "LAXMI twisted wire Cup Brush 3inch",
    "category": "Electrical Infrastructure",
    "subcategory": "Wiring & Containment",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI twisted wire Cup Brush 3inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLCUBH3",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8544",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLCUBH3_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLCUBH3_img1.jpg",
      "https://cdn.abuzz.store/products/AZLCUBH3_img2.jpg",
      "https://cdn.abuzz.store/products/AZLCUBH3_img3.jpg",
      "https://cdn.abuzz.store/products/AZLCUBH3_img4.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 52
  },
  {
    "id": "AZMGST10",
    "title": "LAXMI 8mm Magnetic Socket Set (Pack of 10)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI 8mm Magnetic Socket Set (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMGST10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMGST10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMGST10_img1.jpg",
      "https://cdn.abuzz.store/products/AZMGST10_img2.jpg",
      "https://cdn.abuzz.store/products/AZMGST10_img3.jpg",
      "https://cdn.abuzz.store/products/AZMGST10_img4.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 53
  },
  {
    "id": "AZMKWDB25",
    "title": "MK SUPER High Quality Hinge Boring wood Drill Bit 25mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK SUPER High Quality Hinge Boring wood Drill Bit 25mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKWDB25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKWDB25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKWDB25_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB25_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB25_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB25_img4.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 54
  },
  {
    "id": "AZMKWDB32",
    "title": "MK SUPER High Quality Hinge Boring wood Drill Bit 32mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK SUPER High Quality Hinge Boring wood Drill Bit 32mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKWDB32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKWDB32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKWDB32_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img4.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img5.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img6.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img7.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB32_img8.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 55
  },
  {
    "id": "AZMKWDB35",
    "title": "MK SUPER High Quality Hinge Boring wood Drill Bit 35mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK SUPER High Quality Hinge Boring wood Drill Bit 35mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKWDB35",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKWDB35_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKWDB35_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB35_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB35_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB35_img4.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB35_img5.jpg",
      "https://cdn.abuzz.store/products/AZMKWDB35_img6.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 56
  },
  {
    "id": "AZMKSTS7",
    "title": "MK Super Stainless Steel T Type Spanners 7mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 7mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS7_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS7_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS7_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS7_img4.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 57
  },
  {
    "id": "AZMKSTS8",
    "title": "MK Super Stainless Steel T Type Spanners 8mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 8mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS8_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS8_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS8_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS8_img4.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 58
  },
  {
    "id": "AZMKSTS9",
    "title": "MK Super Stainless Steel T Type Spanners 9mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 9mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS9_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS9_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS9_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS9_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 59
  },
  {
    "id": "AZMKSTS10",
    "title": "MK Super Stainless Steel T Type Spanners 10mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 10mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS10_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS10_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS10_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS10_img4.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 60
  },
  {
    "id": "AZMKSTS11",
    "title": "MK Super Stainless Steel T Type Spanners 11mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 11mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS11",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS11_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS11_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS11_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS11_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS11_img4.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 61
  },
  {
    "id": "AZMKSTS12",
    "title": "MK Super Stainless Steel T Type Spanners 12mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 12mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS12_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS12_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS12_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS12_img4.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 62
  },
  {
    "id": "AZMKSTS13",
    "title": "MK Super Stainless Steel T Type Spanners 13mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 13mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS13",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS13_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS13_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS13_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS13_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS13_img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 63
  },
  {
    "id": "AZMKSTS14",
    "title": "MK Super Stainless Steel T Type Spanners 14mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK Super Stainless Steel T Type Spanners 14mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMKSTS14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMKSTS14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMKSTS14_img1.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS14_img2.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS14_img3.jpg",
      "https://cdn.abuzz.store/products/AZMKSTS14_img4.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 64
  },
  {
    "id": "AZPCB9",
    "title": "LAXMI Paper Cutter Blade 9mm",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Paper Cutter Blade 9mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPCB9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPCB9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPCB9_img1.jpg",
      "https://cdn.abuzz.store/products/AZPCB9_img2.jpg",
      "https://cdn.abuzz.store/products/AZPCB9_img3.jpg",
      "https://cdn.abuzz.store/products/AZPCB9_img4.jpg",
      "https://cdn.abuzz.store/products/AZPCB9_img5.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 65
  },
  {
    "id": "AZPCB18",
    "title": "LAXMI Paper Cutter Blade 18mm",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Paper Cutter Blade 18mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPCB18",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPCB18_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPCB18_img1.jpg",
      "https://cdn.abuzz.store/products/AZPCB18_img2.jpg",
      "https://cdn.abuzz.store/products/AZPCB18_img3.jpg",
      "https://cdn.abuzz.store/products/AZPCB18_img4.jpg",
      "https://cdn.abuzz.store/products/AZPCB18_img5.jpg",
      "https://cdn.abuzz.store/products/AZPCB18_img6.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 66
  },
  {
    "id": "AZSGHDS01",
    "title": "LAXMI Silicon Gun Heavy Duty (SILVER)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Silicon Gun Heavy Duty (SILVER). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSGHDS01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSGHDS01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSGHDS01_img1.jpg",
      "https://cdn.abuzz.store/products/AZSGHDS01_img2.jpg",
      "https://cdn.abuzz.store/products/AZSGHDS01_img3.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 67
  },
  {
    "id": "AZSHDB12-26",
    "title": "S4 12x260 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 12x260 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB12-26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB12-26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB12-26_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB12-26_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB12-26_img3.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 68
  },
  {
    "id": "AZSHDB14-16",
    "title": "S4 14x160 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 369,
    "stockStatus": "low_stock",
    "description": "High-grade industrial S4 14x160 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB14-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB14-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB14-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB14-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB14-16_img3.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 69
  },
  {
    "id": "AZSHDB14-26",
    "title": "S4 14x260 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 14x260 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB14-26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB14-26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB14-26_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB14-26_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB14-26_img3.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 70
  },
  {
    "id": "AZSHDB16-160",
    "title": "S4 16x160 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 16x160 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB16-160",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB16-160_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB16-160_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB16-160_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB16-160_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 71
  },
  {
    "id": "AZSHDB16-21",
    "title": "S4 16x210 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 16x210 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB16-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB16-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB16-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB16-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB16-21_img3.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 72
  },
  {
    "id": "AZSHDB16-26",
    "title": "S4 16x260 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 419,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 16x260 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB16-26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB16-26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB16-26_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB16-26_img2.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 73
  },
  {
    "id": "AZSHDB18-16",
    "title": "S4 18x160 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 18x160 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB18-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB18-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB18-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-16_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 74
  },
  {
    "id": "AZSHDB18-21",
    "title": "S4 18x210 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 419,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 18x210 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB18-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB18-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB18-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-21_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 75
  },
  {
    "id": "AZSHDB18-26",
    "title": "S4 18x260 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 18x260 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB18-26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB18-26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB18-26_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-26_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-26_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 76
  },
  {
    "id": "AZSHDB20-16",
    "title": "S4 20x160 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 419,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 20x160 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB20-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB20-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB20-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB20-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB20-16_img3.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 77
  },
  {
    "id": "AZSHDB20-26",
    "title": "S4 20x260 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 20x260 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB20-26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB20-26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB20-26_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB20-26_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB20-26_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 78
  },
  {
    "id": "AZSHDB22-31",
    "title": "S4 22x310 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 439,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 22x310 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB22-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB22-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB22-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB22-31_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB22-31_img3.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 79
  },
  {
    "id": "AZSHDB25-21",
    "title": "S4 25x210 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial S4 25x210 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB25-21",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB25-21_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB25-21_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB25-21_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB25-21_img3.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 80
  },
  {
    "id": "AZSHDB25-26",
    "title": "S4 25x260 Hammer Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "low_stock",
    "description": "High-grade industrial S4 25x260 Hammer Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB25-26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB25-26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB25-26_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB25-26_img2.jpg",
      "https://cdn.abuzz.store/products/AZSHDB25-26_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 81
  },
  {
    "id": "AZSJOR25",
    "title": "LAXMI Safety Jacket Orange Pack of 25",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Safety Jacket Orange Pack of 25. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSJOR25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSJOR25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSJOR25_img1.jpg",
      "https://cdn.abuzz.store/products/AZSJOR25_img2.jpeg",
      "https://cdn.abuzz.store/products/AZSJOR25_img3.jpeg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 82
  },
  {
    "id": "AZSJOR50",
    "title": "LAXMI Safety Jacket Orange Pack of 50",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 2499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Safety Jacket Orange Pack of 50. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSJOR50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSJOR50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSJOR50_img1.jpg",
      "https://cdn.abuzz.store/products/AZSJOR50_img2.jpeg",
      "https://cdn.abuzz.store/products/AZSJOR50_img3.jpeg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 83
  },
  {
    "id": "AZSJGR25",
    "title": "LAXMI Safety Jacket Green Pack of 25",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Safety Jacket Green Pack of 25. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSJGR25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSJGR25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSJGR25_img1.jpg",
      "https://cdn.abuzz.store/products/AZSJGR25_img2.jpg",
      "https://cdn.abuzz.store/products/AZSJGR25_img3.jpg",
      "https://cdn.abuzz.store/products/AZSJGR25_img4.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 84
  },
  {
    "id": "AZSJGR50",
    "title": "LAXMI Safety Jacket Green Pack of 50",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 2499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Safety Jacket Green Pack of 50. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSJGR50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSJGR50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSJGR50_img1.jpg",
      "https://cdn.abuzz.store/products/AZSJGR50_img2.jpg",
      "https://cdn.abuzz.store/products/AZSJGR50_img3.jpg",
      "https://cdn.abuzz.store/products/AZSJGR50_img4.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 85
  },
  {
    "id": "AZWCTB04",
    "title": "MK SUPER 4\"/110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MK SUPER 4\"/110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWCTB04",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWCTB04_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWCTB04_img1.jpg",
      "https://cdn.abuzz.store/products/AZWCTB04_img2.jpg",
      "https://cdn.abuzz.store/products/AZWCTB04_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 86
  },
  {
    "id": "AZWCTB05",
    "title": "BOSHICHI Wood cutting Blade 05x30",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial BOSHICHI Wood cutting Blade 05x30. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWCTB05",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWCTB05_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWCTB05_img1.jpg",
      "https://cdn.abuzz.store/products/AZWCTB05_img2.jpg",
      "https://cdn.abuzz.store/products/AZWCTB05_img3.jpg",
      "https://cdn.abuzz.store/products/AZWCTB05_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 87
  },
  {
    "id": "AZWGHG12",
    "title": "LAXMI White&Grey Nitrile Coated Hand Gloves (Pack of 12)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI White&Grey Nitrile Coated Hand Gloves (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWGHG12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWGHG12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWGHG12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWGHG12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWGHG12_img3.jpg",
      "https://cdn.abuzz.store/products/AZWGHG12_img4.jpg",
      "https://cdn.abuzz.store/products/AZWGHG12_img5.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 88,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZYOGP12",
    "title": "LAXMI Premium Quality Nylon Anti Cut Resistance Yellow Orange Hand Gloves (Pack of 12)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Premium Quality Nylon Anti Cut Resistance Yellow Orange Hand Gloves (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZYOGP12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZYOGP12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZYOGP12_img1.jpg",
      "https://cdn.abuzz.store/products/AZYOGP12_img2.jpg",
      "https://cdn.abuzz.store/products/AZYOGP12_img3.jpg",
      "https://cdn.abuzz.store/products/AZYOGP12_img4.jpg",
      "https://cdn.abuzz.store/products/AZYOGP12_img5.jpg",
      "https://cdn.abuzz.store/products/AZYOGP12_img6.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 89,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZRBGP12",
    "title": "LAXMI Premium Quality Nylon Anti Cut Resistance Red Black Hand Gloves (Pack of 12)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI Premium Quality Nylon Anti Cut Resistance Red Black Hand Gloves (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRBGP12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRBGP12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRBGP12_img1.jpg",
      "https://cdn.abuzz.store/products/AZRBGP12_img2.jpg",
      "https://cdn.abuzz.store/products/AZRBGP12_img3.jpg",
      "https://cdn.abuzz.store/products/AZRBGP12_img4.jpg",
      "https://cdn.abuzz.store/products/AZRBGP12_img5.jpg",
      "https://cdn.abuzz.store/products/AZRBGP12_img6.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 90,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZ24X27TBS",
    "title": "24x27 Steel Tubular Box Spanner",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 24x27 Steel Tubular Box Spanner. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ24X27TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ24X27TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ24X27TBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ24X27TBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ24X27TBS_img3.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 91
  },
  {
    "id": "AZSPGM4",
    "title": "Laxmi 1.4 mm Spray Paint Machine Gun 600 ml Nylon Cup with Tool Kits",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 1.4 mm Spray Paint Machine Gun 600 ml Nylon Cup with Tool Kits. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSPGM4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSPGM4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSPGM4_img1.jpg",
      "https://cdn.abuzz.store/products/AZSPGM4_img2.jpg",
      "https://cdn.abuzz.store/products/AZSPGM4_img3.jpg",
      "https://cdn.abuzz.store/products/AZSPGM4_img4.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 92
  },
  {
    "id": "AZMC-0810",
    "title": "Mercury MC-0810 Metal Box 5kg Demolition Hammer Machine Hammer Drill (17 mm Chuck Size, 900 W)",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 6999,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Mercury MC-0810 Metal Box 5kg Demolition Hammer Machine Hammer Drill (17 mm Chuck Size, 900 W). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMC-0810",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 93
  },
  {
    "id": "AZMDCW1",
    "title": "Megumi Double NA Caution Tape (Manual) (White)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Megumi Double NA Caution Tape (Manual) (White). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMDCW1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMDCW1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMDCW1_img1.jpg",
      "https://cdn.abuzz.store/products/AZMDCW1_img2.jpg",
      "https://cdn.abuzz.store/products/AZMDCW1_img3.jpg",
      "https://cdn.abuzz.store/products/AZMDCW1_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 94
  },
  {
    "id": "AZPCDBW10",
    "title": "Premium Quality PVC Coated Cloth Drying Black Wire (10mtr)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Premium Quality PVC Coated Cloth Drying Black Wire (10mtr). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPCDBW10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPCDBW10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPCDBW10_img1.jpg",
      "https://cdn.abuzz.store/products/AZPCDBW10_img2.jpg",
      "https://cdn.abuzz.store/products/AZPCDBW10_img3.jpg",
      "https://cdn.abuzz.store/products/AZPCDBW10_img4.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 95
  },
  {
    "id": "AZPCDBW20",
    "title": "Premium Quality PVC Coated Cloth Drying Black Wire (20mtr)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Premium Quality PVC Coated Cloth Drying Black Wire (20mtr). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPCDBW20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPCDBW20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPCDBW20_img1.jpg",
      "https://cdn.abuzz.store/products/AZPCDBW20_img2.jpg",
      "https://cdn.abuzz.store/products/AZPCDBW20_img3.jpg",
      "https://cdn.abuzz.store/products/AZPCDBW20_img4.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 96
  },
  {
    "id": "AZLGC2P2",
    "title": "Laxmi 2\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 2\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC2P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC2P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC2P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC2P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC2P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC2P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZLGC2P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZLGC2P2_img6.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 97
  },
  {
    "id": "AZLGC3P2",
    "title": "Laxmi 3\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 3\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC3P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC3P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC3P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC3P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC3P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC3P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZLGC3P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZLGC3P2_img6.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 98
  },
  {
    "id": "AZLGC4P2",
    "title": "Laxmi 4\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 4\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC4P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC4P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC4P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC4P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC4P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC4P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZLGC4P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZLGC4P2_img6.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 99
  },
  {
    "id": "AZLGC6P2",
    "title": "Laxmi 6\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 6\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC6P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC6P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC6P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC6P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC6P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC6P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZLGC6P2_img5.jpg",
      "https://cdn.abuzz.store/products/AZLGC6P2_img6.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 100
  },
  {
    "id": "AZLGC8P2",
    "title": "Laxmi 8\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 8\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC8P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC8P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC8P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC8P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC8P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC8P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZLGC8P2_img5.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 101
  },
  {
    "id": "AZLGC10P2",
    "title": "Laxmi 10\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 10\" Inch Heavy Duty G Clamp (Pack of 2) For Holding Products Tools Items. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC10P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC10P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC10P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC10P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC10P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC10P2_img4.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 102
  },
  {
    "id": "AZFAD430T",
    "title": "FAD 4\"/110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial FAD 4\"/110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFAD430T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFAD430T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFAD430T_img1.jpg",
      "https://cdn.abuzz.store/products/AZFAD430T_img2.jpg",
      "https://cdn.abuzz.store/products/AZFAD430T_img3.jpg",
      "https://cdn.abuzz.store/products/AZFAD430T_img4.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 103
  },
  {
    "id": "AZFAD440T",
    "title": "FAD 4\"/110MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial FAD 4\"/110MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFAD440T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFAD440T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFAD440T_img1.jpg",
      "https://cdn.abuzz.store/products/AZFAD440T_img2.jpg",
      "https://cdn.abuzz.store/products/AZFAD440T_img3.jpg",
      "https://cdn.abuzz.store/products/AZFAD440T_img4.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 104
  },
  {
    "id": "AZBCHS24",
    "title": "Laxmi 24\" 600mm Concrete/Siporex Hand Saw for Cutting Bricks Aerated Concrete Blocks, Cement Cutter Blade with PVC Handle",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 1499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Laxmi 24\" 600mm Concrete/Siporex Hand Saw for Cutting Bricks Aerated Concrete Blocks, Cement Cutter Blade with PVC Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBCHS24",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBCHS24_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBCHS24_img1.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img2.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img3.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img4.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img5.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img6.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img7.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img8.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img9.jpg",
      "https://cdn.abuzz.store/products/AZBCHS24_img10.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 105
  },
  {
    "id": "AZCSBA14",
    "title": "RG Gold 14 inch 120T TCT Circular Saw Blade For Aluminium Cutting",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 2299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold 14 inch 120T TCT Circular Saw Blade For Aluminium Cutting. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCSBA14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCSBA14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCSBA14_img1.jpg",
      "https://cdn.abuzz.store/products/AZCSBA14_img2.jpg",
      "https://cdn.abuzz.store/products/AZCSBA14_img3.jpg",
      "https://cdn.abuzz.store/products/AZCSBA14_img4.jpg",
      "https://cdn.abuzz.store/products/AZCSBA14_img5.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 106
  },
  {
    "id": "AZRGDSB14",
    "title": "RG Gold Diamond Saw Blade 14 Inch Cutting Blade for Granite Marble Stone Concrete",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 2299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RG Gold Diamond Saw Blade 14 Inch Cutting Blade for Granite Marble Stone Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRGDSB14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRGDSB14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRGDSB14_img1.jpg",
      "https://cdn.abuzz.store/products/AZRGDSB14_img2.jpg",
      "https://cdn.abuzz.store/products/AZRGDSB14_img3.jpg",
      "https://cdn.abuzz.store/products/AZRGDSB14_img4.jpg",
      "https://cdn.abuzz.store/products/AZRGDSB14_img5.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 107
  },
  {
    "id": "AZGRSC18",
    "title": "Laxmi Premium Indian Made Hedge Shears/Cutter/Garden Cutter/Plant Cutter 18\" Scissor Home Gardening Scissor",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Premium Indian Made Hedge Shears/Cutter/Garden Cutter/Plant Cutter 18\" Scissor Home Gardening Scissor. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGRSC18",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGRSC18_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGRSC18_img1.jpg",
      "https://cdn.abuzz.store/products/AZGRSC18_img2.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 108
  },
  {
    "id": "AZWH600",
    "title": "Laxmi Extra Power Electrode Welding Holder Heavy Duty Fully Insulated 600 AMPS",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Extra Power Electrode Welding Holder Heavy Duty Fully Insulated 600 AMPS. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWH600",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWH600_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWH600_img1.jpg",
      "https://cdn.abuzz.store/products/AZWH600_img2.jpg",
      "https://cdn.abuzz.store/products/AZWH600_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 109
  },
  {
    "id": "AZUWH1000",
    "title": "UNICOR KD 1000 Electrode Welding Holder Heavy Duty Fully Insulated 1000 AMPS",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial UNICOR KD 1000 Electrode Welding Holder Heavy Duty Fully Insulated 1000 AMPS. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZUWH1000",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZUWH1000_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZUWH1000_img1.jpg",
      "https://cdn.abuzz.store/products/AZUWH1000_img2.jpg",
      "https://cdn.abuzz.store/products/AZUWH1000_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 110
  },
  {
    "id": "AZJGSTR2P3Y",
    "title": "JGARD Star 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6AMP, 240V) 2.75mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial JGARD Star 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6AMP, 240V) 2.75mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGSTR2P3Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGSTR2P3Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGSTR2P3Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGSTR2P3Y_img2.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 111
  },
  {
    "id": "AZJGDZR2P4Y",
    "title": "JGARD Dzire 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial JGARD Dzire 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGDZR2P4Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGDZR2P4Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGDZR2P4Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR2P4Y_img2.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR2P4Y_img3.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR2P4Y_img4.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 112
  },
  {
    "id": "AZJGDZR2P8Y",
    "title": "JGARD Dzire 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 7.3mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial JGARD Dzire 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 7.3mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGDZR2P8Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGDZR2P8Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGDZR2P8Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR2P8Y_img2.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR2P8Y_img3.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR2P8Y_img4.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 113
  },
  {
    "id": "AZJGDZR3P4Y",
    "title": "JGARD Dzire 3 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial JGARD Dzire 3 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGDZR3P4Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGDZR3P4Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGDZR3P4Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGDZR3P4Y_img2.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 114
  },
  {
    "id": "AZJGTRB2P4Y",
    "title": "JGARD TURBO 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial JGARD TURBO 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGTRB2P4Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGTRB2P4Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGTRB2P4Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB2P4Y_img2.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB2P4Y_img3.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB2P4Y_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 115
  },
  {
    "id": "AZJGTRB2P8Y",
    "title": "JGARD TURBO 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 7.3mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial JGARD TURBO 2 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 7.3mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGTRB2P8Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGTRB2P8Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGTRB2P8Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB2P8Y_img2.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB2P8Y_img3.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB2P8Y_img4.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 116
  },
  {
    "id": "AZJGTRB3P4Y",
    "title": "JGARD TURBO 3 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 449,
    "stockStatus": "low_stock",
    "description": "High-grade industrial JGARD TURBO 3 Pin FLEX BOX With Switch & Indicartor Extension Board (6Amp, 240V) 3.65mt. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJGTRB3P4Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJGTRB3P4Y_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJGTRB3P4Y_img1.jpg",
      "https://cdn.abuzz.store/products/AZJGTRB3P4Y_img2.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 117
  },
  {
    "id": "AZSMKWHS50",
    "title": "super MK 50mm Wood Hole Saw Cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial super MK 50mm Wood Hole Saw Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSMKWHS50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSMKWHS50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSMKWHS50_img1.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS50_img2.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS50_img3.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS50_img4.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS50_img5.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS50_img6.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 118
  },
  {
    "id": "AZSMKWHS57",
    "title": "super MK 57mm Wood Hole Saw Cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial super MK 57mm Wood Hole Saw Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSMKWHS57",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSMKWHS57_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSMKWHS57_img1.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS57_img2.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS57_img3.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS57_img4.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS57_img5.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS57_img6.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 119
  },
  {
    "id": "AZSMKWHS64",
    "title": "super MK 64mm Wood Hole Saw Cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 439,
    "stockStatus": "in_stock",
    "description": "High-grade industrial super MK 64mm Wood Hole Saw Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSMKWHS64",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSMKWHS64_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSMKWHS64_img1.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS64_img2.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS64_img3.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 120
  },
  {
    "id": "AZSMKWHS75",
    "title": "super MK 75mm Wood Hole Saw Cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial super MK 75mm Wood Hole Saw Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSMKWHS75",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSMKWHS75_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSMKWHS75_img1.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS75_img2.jpg",
      "https://cdn.abuzz.store/products/AZSMKWHS75_img3.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 121
  },
  {
    "id": "AZCTW150X2.5",
    "title": "Teeth Grip Nylon Self Locking Cable Ties, White (150 mm x 2.5 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Teeth Grip Nylon Self Locking Cable Ties, White (150 mm x 2.5 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCTW150X2.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCTW150X2_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCTW150X2_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZCTW150X2_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZCTW150X2_5_img3.jpg",
      "https://cdn.abuzz.store/products/AZCTW150X2_5_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 122
  },
  {
    "id": "AZCTW200X3.6",
    "title": "Teeth Grip Nylon Self Locking Cable Ties, White (200 mm x 3.6 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 329,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Teeth Grip Nylon Self Locking Cable Ties, White (200 mm x 3.6 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCTW200X3.6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCTW200X3_6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCTW200X3_6_img1.jpg",
      "https://cdn.abuzz.store/products/AZCTW200X3_6_img2.jpg",
      "https://cdn.abuzz.store/products/AZCTW200X3_6_img3.jpg",
      "https://cdn.abuzz.store/products/AZCTW200X3_6_img4.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 123
  },
  {
    "id": "AZCTW250X3.6",
    "title": "Teeth Grip Nylon Self Locking Cable Ties, White (250 mm x 3.6 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Teeth Grip Nylon Self Locking Cable Ties, White (250 mm x 3.6 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCTW250X3.6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCTW250X3_6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCTW250X3_6_img1.jpg",
      "https://cdn.abuzz.store/products/AZCTW250X3_6_img2.jpg",
      "https://cdn.abuzz.store/products/AZCTW250X3_6_img3.jpg",
      "https://cdn.abuzz.store/products/AZCTW250X3_6_img4.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 124
  },
  {
    "id": "AZCTW300X4",
    "title": "Teeth Grip Nylon Self Locking Cable Ties, White (300 mm x 4 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Teeth Grip Nylon Self Locking Cable Ties, White (300 mm x 4 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCTW300X4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCTW300X4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCTW300X4_img1.jpg",
      "https://cdn.abuzz.store/products/AZCTW300X4_img2.jpg",
      "https://cdn.abuzz.store/products/AZCTW300X4_img3.jpg",
      "https://cdn.abuzz.store/products/AZCTW300X4_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 125
  },
  {
    "id": "AZCTW350X3.6",
    "title": "Teeth Grip Nylon Self Locking Cable Ties, White (350 mm x 3.6 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Teeth Grip Nylon Self Locking Cable Ties, White (350 mm x 3.6 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCTW350X3.6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCTW350X3_6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCTW350X3_6_img1.jpg",
      "https://cdn.abuzz.store/products/AZCTW350X3_6_img2.jpg",
      "https://cdn.abuzz.store/products/AZCTW350X3_6_img3.jpg",
      "https://cdn.abuzz.store/products/AZCTW350X3_6_img4.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 126
  },
  {
    "id": "AZCTW400X4",
    "title": "Teeth Grip Nylon Self Locking Cable Ties, White (400 mm x 4 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Teeth Grip Nylon Self Locking Cable Ties, White (400 mm x 4 mm, Pack of 100) - Heavy Duty Strong Zip Wire Fastener Organizer Tie. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCTW400X4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCTW400X4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCTW400X4_img1.jpg",
      "https://cdn.abuzz.store/products/AZCTW400X4_img2.jpg",
      "https://cdn.abuzz.store/products/AZCTW400X4_img3.jpg",
      "https://cdn.abuzz.store/products/AZCTW400X4_img4.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 127
  },
  {
    "id": "AZWLML12",
    "title": "12 inch water level Indicator magnetic aluminium scale Carpenter's Level",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 12 inch water level Indicator magnetic aluminium scale Carpenter's Level. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWLML12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWLML12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWLML12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWLML12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWLML12_img3.jpg",
      "https://cdn.abuzz.store/products/AZWLML12_img4.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 128
  },
  {
    "id": "AZWLML9",
    "title": "9 inch water level magnetic aluminium scale(red)",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 329,
    "stockStatus": "low_stock",
    "description": "High-grade industrial 9 inch water level magnetic aluminium scale(red). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWLML9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWLML9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWLML9_img1.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 129
  },
  {
    "id": "AZWLML8",
    "title": "8 inch water level magnetic aluminium scale(yellow)",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 329,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 8 inch water level magnetic aluminium scale(yellow). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWLML8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWLML8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWLML8_img1.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 130
  },
  {
    "id": "AZCCHMR",
    "title": "High Quality Durable Construction Metalworking Household Curved Claw Hammer",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial High Quality Durable Construction Metalworking Household Curved Claw Hammer. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCCHMR",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCCHMR_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCCHMR_img1.jpg",
      "https://cdn.abuzz.store/products/AZCCHMR_img2.jpg",
      "https://cdn.abuzz.store/products/AZCCHMR_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 131
  },
  {
    "id": "AZVPTSD5IN",
    "title": "5INCH Velcro Pad Suitable for Sanding Polishing Disc Pad Thread Sticky Disc",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 5INCH Velcro Pad Suitable for Sanding Polishing Disc Pad Thread Sticky Disc. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZVPTSD5IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZVPTSD5IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZVPTSD5IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZVPTSD5IN_img2.jpg",
      "https://cdn.abuzz.store/products/AZVPTSD5IN_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 132
  },
  {
    "id": "AZVP6812P30",
    "title": "5inch Velcro Pad + 60/80/120 Grit Sanding Disc Paper(Pack of 30) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 5inch Velcro Pad + 60/80/120 Grit Sanding Disc Paper(Pack of 30) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZVP6812P30",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZVP6812P30_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZVP6812P30_img1.jpg",
      "https://cdn.abuzz.store/products/AZVP6812P30_img2.jpg",
      "https://cdn.abuzz.store/products/AZVP6812P30_img3.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 133
  },
  {
    "id": "AZVP60GP1005IN",
    "title": "5inch Velcro Sanding Disc Paper 60Grit Sanding Disc Paper(Pack of 100) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 5inch Velcro Sanding Disc Paper 60Grit Sanding Disc Paper(Pack of 100) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZVP60GP1005IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 134
  },
  {
    "id": "AZVP80GP1005IN",
    "title": "5inch Velcro Sanding Disc Paper 80Grit Sanding Disc Paper(Pack of 100) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 5inch Velcro Sanding Disc Paper 80Grit Sanding Disc Paper(Pack of 100) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZVP80GP1005IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZVP80GP1005IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZVP80GP1005IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZVP80GP1005IN_img2.jpg",
      "https://cdn.abuzz.store/products/AZVP80GP1005IN_img3.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 135
  },
  {
    "id": "AZVP120GP1005IN",
    "title": "5inch Velcro Sanding Disc Paper 120Grit Sanding Disc Paper(Pack of 100) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 5inch Velcro Sanding Disc Paper 120Grit Sanding Disc Paper(Pack of 100) Suitable for Sanding Polishing Disc Pad Thread Sticky Disc. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZVP120GP1005IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZVP120GP1005IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZVP120GP1005IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZVP120GP1005IN_img2.jpg",
      "https://cdn.abuzz.store/products/AZVP120GP1005IN_img3.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 136
  },
  {
    "id": "AZPOLOTAB",
    "title": "White PVC Plastic Bibcock/Water Tap for Kitchen,Wash Basins,Bathroom",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial White PVC Plastic Bibcock/Water Tap for Kitchen,Wash Basins,Bathroom. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPOLOTAB",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPOLOTAB_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPOLOTAB_img1.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTAB_img2.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTAB_img3.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTAB_img4.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 137
  },
  {
    "id": "AZBLHTAPP5",
    "title": "PVC Outdoor Tap, Plastic Bibcock/Water Tap for Kitchen, Bathroom Wash Basins,Outdoor,Garden (PACK OF 5)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Outdoor Tap, Plastic Bibcock/Water Tap for Kitchen, Bathroom Wash Basins,Outdoor,Garden (PACK OF 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBLHTAPP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBLHTAPP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBLHTAPP5_img1.jpg",
      "https://cdn.abuzz.store/products/AZBLHTAPP5_img2.jpg",
      "https://cdn.abuzz.store/products/AZBLHTAPP5_img3.jpg",
      "https://cdn.abuzz.store/products/AZBLHTAPP5_img4.jpg",
      "https://cdn.abuzz.store/products/AZBLHTAPP5_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 138
  },
  {
    "id": "AZPOLOTABP5",
    "title": "White PVC Plastic Bibcock/Water Tap for Kitchen,Wash Basins,Bathroom (PACK OF 5)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial White PVC Plastic Bibcock/Water Tap for Kitchen,Wash Basins,Bathroom (PACK OF 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPOLOTABP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPOLOTABP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPOLOTABP5_img1.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTABP5_img2.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTABP5_img3.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTABP5_img4.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTABP5_img5.jpg",
      "https://cdn.abuzz.store/products/AZPOLOTABP5_img6.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 139
  },
  {
    "id": "AZROTAPP5",
    "title": "Tap for All RO/UV System Tap Mount Water Filter in PVC White Colour (PACK OF 5)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Tap for All RO/UV System Tap Mount Water Filter in PVC White Colour (PACK OF 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZROTAPP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZROTAPP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZROTAPP5_img1.jpg",
      "https://cdn.abuzz.store/products/AZROTAPP5_img2.jpg",
      "https://cdn.abuzz.store/products/AZROTAPP5_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 140
  },
  {
    "id": "AZBHTAPP5",
    "title": "Water Tap Plastic Candle Filter Cartridge (PACK OF 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Water Tap Plastic Candle Filter Cartridge (PACK OF 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBHTAPP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBHTAPP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBHTAPP5_img1.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img2.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img3.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img4.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img5.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img6.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img7.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img8.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img9.jpg",
      "https://cdn.abuzz.store/products/AZBHTAPP5_img10.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 141
  },
  {
    "id": "AZFLTYLLWP5",
    "title": "Water Softner Filter/Tap Shower Sprinkler head/Direct Ration Kitchen and Bathroom Tap Sprinkler Plastic Shower Head (PACK OF 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Water Softner Filter/Tap Shower Sprinkler head/Direct Ration Kitchen and Bathroom Tap Sprinkler Plastic Shower Head (PACK OF 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFLTYLLWP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFLTYLLWP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img2.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img3.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img4.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img5.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img6.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img7.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img8.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img9.jpg",
      "https://cdn.abuzz.store/products/AZFLTYLLWP5_img10.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 142
  },
  {
    "id": "AZGJSSP2",
    "title": "Laxmi Garden Jhula Swing Accessories- 2 Spring Hook 2",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Garden Jhula Swing Accessories- 2 Spring Hook 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGJSSP2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGJSSP2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGJSSP2_img1.jpg",
      "https://cdn.abuzz.store/products/AZGJSSP2_img2.jpg",
      "https://cdn.abuzz.store/products/AZGJSSP2_img3.jpg",
      "https://cdn.abuzz.store/products/AZGJSSP2_img4.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 143
  },
  {
    "id": "AZJNX3WSWC",
    "title": "J-NX TYPE-213 IP44 3-WAY 16A-8H/220-250V Splitter Plug Socket 3 Pin Waterproof Electrical Connector Industrial Plug Socket Wire Connector",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J-NX TYPE-213 IP44 3-WAY 16A-8H/220-250V Splitter Plug Socket 3 Pin Waterproof Electrical Connector Industrial Plug Socket Wire Connector. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNX3WSWC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNX3WSWC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNX3WSWC_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNX3WSWC_img2.jpg",
      "https://cdn.abuzz.store/products/AZJNX3WSWC_img3.jpg",
      "https://cdn.abuzz.store/products/AZJNX3WSWC_img4.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 144
  },
  {
    "id": "AZJNXMLEWC",
    "title": "J-NX TYPE-213 IP44 16A-8H/220-250V Waterproof Socket Male Industrial Socket and Plug",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J-NX TYPE-213 IP44 16A-8H/220-250V Waterproof Socket Male Industrial Socket and Plug. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNXMLEWC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNXMLEWC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img2.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img3.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img4.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img5.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img6.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLEWC_img7.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 145
  },
  {
    "id": "AZJNXMALEWC",
    "title": "J-NX TYPE-213 IP44 16A-8H/220-250V Waterproof Socket Female Industrial Socket and Plug",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J-NX TYPE-213 IP44 16A-8H/220-250V Waterproof Socket Female Industrial Socket and Plug. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNXMALEWC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNXMALEWC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNXMALEWC_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNXMALEWC_img2.jpg",
      "https://cdn.abuzz.store/products/AZJNXMALEWC_img3.jpg",
      "https://cdn.abuzz.store/products/AZJNXMALEWC_img4.jpg",
      "https://cdn.abuzz.store/products/AZJNXMALEWC_img5.jpg",
      "https://cdn.abuzz.store/products/AZJNXMALEWC_img6.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 146
  },
  {
    "id": "AZJNXMLFLWC",
    "title": "J-NX TYPE-213 IP44 16A-8H/220-250V Waterproof Socket Male and Female Industrial Socket and Plug",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J-NX TYPE-213 IP44 16A-8H/220-250V Waterproof Socket Male and Female Industrial Socket and Plug. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNXMLFLWC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNXMLFLWC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNXMLFLWC_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLFLWC_img2.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLFLWC_img3.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLFLWC_img4.jpg",
      "https://cdn.abuzz.store/products/AZJNXMLFLWC_img5.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 147
  },
  {
    "id": "AZJNX3WMFLWC",
    "title": "J-NX TYPE-213 Triple Outlet Socket Multi Splitter with Male and Female Industrial Socket and Plug",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial J-NX TYPE-213 Triple Outlet Socket Multi Splitter with Male and Female Industrial Socket and Plug. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNX3WMFLWC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNX3WMFLWC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNX3WMFLWC_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNX3WMFLWC_img2.jpg",
      "https://cdn.abuzz.store/products/AZJNX3WMFLWC_img3.jpg",
      "https://cdn.abuzz.store/products/AZJNX3WMFLWC_img4.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 148
  },
  {
    "id": "AZLHVSVBJP1",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 1) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 1) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHVSVBJP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHVSVBJP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHVSVBJP1_img4.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 149
  },
  {
    "id": "AZLHVSVBJP2",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 2) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 2) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP2_img1.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 150
  },
  {
    "id": "AZLHVSVBJP3",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 3) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 3) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP3",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP3_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP3_img1.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 151
  },
  {
    "id": "AZLHVSVBJP4",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 4) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 4) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP4_img1.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 152
  },
  {
    "id": "AZLHVSVBJP5",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 5) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 5) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP5_img1.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 153
  },
  {
    "id": "AZLHVSVBJP6",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 6) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 6) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP6_img1.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 154
  },
  {
    "id": "AZLHVSVBJP7",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 7) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 7) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP7_img1.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 155
  },
  {
    "id": "AZLHVSVBJP8",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 8) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1099,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 8) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP8_img1.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 156
  },
  {
    "id": "AZLHVSVBJP9",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 9) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1199,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 9) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP9_img1.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 157
  },
  {
    "id": "AZLHVSVBJP10",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 10) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 10) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Green). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJP10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJP10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJP10_img1.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 158
  },
  {
    "id": "AZLHVSVBJOP1",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 1) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 1) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHVSVBJOP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHVSVBJOP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHVSVBJOP1_img4.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 159
  },
  {
    "id": "AZLHVSVBJOP2",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 2) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 2) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP2_img1.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 160
  },
  {
    "id": "AZLHVSVBJOP3",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 3) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 3) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP3",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP3_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP3_img1.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 161
  },
  {
    "id": "AZLHVSVBJOP4",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 4) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 4) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP4_img1.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 162
  },
  {
    "id": "AZLHVSVBJOP5",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 5) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 5) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP5_img1.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 163
  },
  {
    "id": "AZLHVSVBJOP6",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 6) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 6) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP6_img1.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 164
  },
  {
    "id": "AZLHVSVBJOP7",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 7) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 7) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP7_img1.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 15
  },
  {
    "id": "AZLHVSVBJOP8",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 8) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1099,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 8) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP8_img1.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 16
  },
  {
    "id": "AZLHVSVBJOP9",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 9) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1199,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 9) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP9_img1.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 17
  },
  {
    "id": "AZLHVSVBJOP10",
    "title": "Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 10) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi Polyester High Visibility Protective Safety Reflective Vest Belt Jacket(Pack 10) Night Cycling Reflector Strips Cross Belt Stripes Adjustable Vest (Orange). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHVSVBJOP10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHVSVBJOP10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHVSVBJOP10_img1.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 18
  },
  {
    "id": "AZGMBTB12-10",
    "title": "Gumboot protect from rain and mud, 10inch, anti-slip gumboot For Men (Black)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Gumboot protect from rain and mud, 10inch, anti-slip gumboot For Men (Black). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGMBTB12-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGMBTB12-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGMBTB12-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZGMBTB12-10_img2.jpg",
      "https://cdn.abuzz.store/products/AZGMBTB12-10_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 19,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZGMBTB12-9",
    "title": "Gumboot protect from rain and mud, 9inch, anti-slip gumboot For Men (Black)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Gumboot protect from rain and mud, 9inch, anti-slip gumboot For Men (Black). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGMBTB12-9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGMBTB12-9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGMBTB12-9_img1.jpg",
      "https://cdn.abuzz.store/products/AZGMBTB12-9_img2.jpg",
      "https://cdn.abuzz.store/products/AZGMBTB12-9_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 20,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZGMBTB12-8",
    "title": "Gumboot protect from rain and mud, 8inch, anti-slip gumboot For Men (Black)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Gumboot protect from rain and mud, 8inch, anti-slip gumboot For Men (Black). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGMBTB12-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGMBTB12-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGMBTB12-8_img1.jpg",
      "https://cdn.abuzz.store/products/AZGMBTB12-8_img2.jpg",
      "https://cdn.abuzz.store/products/AZGMBTB12-8_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 21,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZSJKRP1",
    "title": "Laxmi 1 Pcs Swing Jhula Bearing Kada Ring",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 1 Pcs Swing Jhula Bearing Kada Ring. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSJKRP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSJKRP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSJKRP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZSJKRP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZSJKRP1_img3.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 22
  },
  {
    "id": "AZHVRSZJP1",
    "title": "High Visibility Reflective Safety Zipper Jacket with Pockets ( PACK OF 1)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial High Visibility Reflective Safety Zipper Jacket with Pockets ( PACK OF 1). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHVRSZJP1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHVRSZJP1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHVRSZJP1_img1.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP1_img2.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP1_img3.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP1_img4.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 23
  },
  {
    "id": "AZHVRSZJP5",
    "title": "High Visibility Reflective Safety Zipper Jacket with Pockets ( PACK OF 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial High Visibility Reflective Safety Zipper Jacket with Pockets ( PACK OF 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHVRSZJP5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHVRSZJP5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHVRSZJP5_img1.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP5_img2.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP5_img3.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP5_img4.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP5_img5.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 24
  },
  {
    "id": "AZHVRSZJP10",
    "title": "High Visibility Reflective Safety Zipper Jacket with Pockets ( PACK OF 10)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 2999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial High Visibility Reflective Safety Zipper Jacket with Pockets ( PACK OF 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHVRSZJP10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHVRSZJP10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHVRSZJP10_img1.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP10_img2.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP10_img3.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP10_img4.jpg",
      "https://cdn.abuzz.store/products/AZHVRSZJP10_img5.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 25
  },
  {
    "id": "AZDOES6X7",
    "title": "Double Sided Open End Spanner-Matte Finish 6x7mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 309,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 6x7mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES6X7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES6X7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES6X7_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES6X7_img2.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 26
  },
  {
    "id": "AZDOES8X9",
    "title": "Double Sided Open End Spanner-Matte Finish 8x9mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 319,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 8x9mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES8X9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES8X9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES8X9_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES8X9_img2.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 27
  },
  {
    "id": "AZDOES10X11",
    "title": "Double Sided Open End Spanner-Matte Finish 10x11mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 329,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 10x11mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES10X11",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES10X11_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES10X11_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES10X11_img2.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 28
  },
  {
    "id": "AZDOES12X13",
    "title": "Double Sided Open End Spanner-Matte Finish 12x13mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 339,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 12x13mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES12X13",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES12X13_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES12X13_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES12X13_img2.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 29
  },
  {
    "id": "AZDOES14X15",
    "title": "Double Sided Open End Spanner-Matte Finish 14x15mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 14x15mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES14X15",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES14X15_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES14X15_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES14X15_img2.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 30
  },
  {
    "id": "AZDOES16X17",
    "title": "Double Sided Open End Spanner-Matte Finish 16x17mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 359,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 16x17mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES16X17",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES16X17_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES16X17_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES16X17_img2.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 31
  },
  {
    "id": "AZDOES18X19",
    "title": "Double Sided Open End Spanner-Matte Finish 18x19mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 18x19mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES18X19",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES18X19_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES18X19_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES18X19_img2.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 32
  },
  {
    "id": "AZDOES20X22",
    "title": "Double Sided Open End Spanner-Matte Finish 20x22mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 20x22mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES20X22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES20X22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES20X22_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES20X22_img2.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 33
  },
  {
    "id": "AZDOES21X23",
    "title": "Double Sided Open End Spanner-Matte Finish 21x23mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 21x23mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES21X23",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES21X23_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES21X23_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES21X23_img2.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 34
  },
  {
    "id": "AZDOES24X26",
    "title": "Double Sided Open End Spanner-Matte Finish 24x26mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 24x26mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES24X26",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES24X26_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES24X26_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES24X26_img2.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 35
  },
  {
    "id": "AZDOES24X27",
    "title": "Double Sided Open End Spanner-Matte Finish 24x27mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Spanner-Matte Finish 24x27mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOES24X27",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOES24X27_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOES24X27_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOES24X27_img2.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 36
  },
  {
    "id": "AZDSEW6T22",
    "title": "Double Sided Open End Wrench Size: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Open End Wrench Size: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDSEW6T22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDSEW6T22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDSEW6T22_img1.jpg",
      "https://cdn.abuzz.store/products/AZDSEW6T22_img2.jpg",
      "https://cdn.abuzz.store/products/AZDSEW6T22_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 37
  },
  {
    "id": "AZMTL430T",
    "title": "MITTAL 4\"/110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MITTAL 4\"/110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTL430T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTL430T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTL430T_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTL430T_img2.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 38
  },
  {
    "id": "AZMTL440T",
    "title": "MITTAL 4\"/110MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial MITTAL 4\"/110MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTL440T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTL440T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTL440T_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTL440T_img2.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 39
  },
  {
    "id": "AZMTL530T",
    "title": "MITTAL 5\"/125MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MITTAL 5\"/125MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTL530T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTL530T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTL530T_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTL530T_img2.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 40
  },
  {
    "id": "AZMTL540T",
    "title": "MITTAL 5\"/125MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial MITTAL 5\"/125MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMTL540T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMTL540T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMTL540T_img1.jpg",
      "https://cdn.abuzz.store/products/AZMTL540T_img2.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 41
  },
  {
    "id": "AZSPMGSC",
    "title": "Laxmi 1.4 mm Spray Paint Machine Gun 500ml with Steel Cup",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Laxmi 1.4 mm Spray Paint Machine Gun 500ml with Steel Cup. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSPMGSC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSPMGSC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSPMGSC_img1.jpg",
      "https://cdn.abuzz.store/products/AZSPMGSC_img2.jpg",
      "https://cdn.abuzz.store/products/AZSPMGSC_img3.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 42
  },
  {
    "id": "AZRSL70",
    "title": "RYAN Stainless Steel Shutter Lock 70 MM With 3 Key",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RYAN Stainless Steel Shutter Lock 70 MM With 3 Key. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRSL70",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRSL70_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRSL70_img1.jpg",
      "https://cdn.abuzz.store/products/AZRSL70_img2.jpg",
      "https://cdn.abuzz.store/products/AZRSL70_img3.jpg",
      "https://cdn.abuzz.store/products/AZRSL70_img4.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 43
  },
  {
    "id": "AZRSL90",
    "title": "RYAN Stainless Steel Shutter Lock 90 MM With 3 Key",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial RYAN Stainless Steel Shutter Lock 90 MM With 3 Key. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRSL90",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRSL90_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRSL90_img1.jpg",
      "https://cdn.abuzz.store/products/AZRSL90_img2.jpg",
      "https://cdn.abuzz.store/products/AZRSL90_img3.jpg",
      "https://cdn.abuzz.store/products/AZRSL90_img4.jpg",
      "https://cdn.abuzz.store/products/AZRSL90_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 44
  },
  {
    "id": "AZSSTGCS08",
    "title": "Scissors for Sewing-Tailoring 8 inches - Gold Sharp Cloth Cutting Scissor",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Scissors for Sewing-Tailoring 8 inches - Gold Sharp Cloth Cutting Scissor. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSSTGCS08",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSSTGCS08_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSSTGCS08_img1.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS08_img2.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS08_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 45
  },
  {
    "id": "AZSSTGCS09",
    "title": "Scissors for Sewing-Tailoring 9 inches - Gold Sharp Cloth Cutting Scissor",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Scissors for Sewing-Tailoring 9 inches - Gold Sharp Cloth Cutting Scissor. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSSTGCS09",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSSTGCS09_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSSTGCS09_img1.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS09_img2.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS09_img3.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS09_img4.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 46
  },
  {
    "id": "AZSSTGCS010",
    "title": "Scissors for Sewing-Tailoring 10 inches - Gold Sharp Cloth Cutting Scissor",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Scissors for Sewing-Tailoring 10 inches - Gold Sharp Cloth Cutting Scissor. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSSTGCS010",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSSTGCS010_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSSTGCS010_img1.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS010_img2.jpg",
      "https://cdn.abuzz.store/products/AZSSTGCS010_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 47
  },
  {
    "id": "AZWSC01",
    "title": "wire stripper and cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial wire stripper and cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWSC01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWSC01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWSC01_img1.jpg",
      "https://cdn.abuzz.store/products/AZWSC01_img2.jpg",
      "https://cdn.abuzz.store/products/AZWSC01_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 48
  },
  {
    "id": "AZAVT01",
    "title": "Analog Voltage Tester",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Analog Voltage Tester. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZAVT01",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZAVT01_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZAVT01_img1.jpg",
      "https://cdn.abuzz.store/products/AZAVT01_img2.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 49
  },
  {
    "id": "AZRRTY2x40",
    "title": "Yellow Reflective Radium Waterproof Warning Tape For road safety",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Yellow Reflective Radium Waterproof Warning Tape For road safety. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRRTY2x40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRRTY2x40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRRTY2x40_img1.jpg",
      "https://cdn.abuzz.store/products/AZRRTY2x40_img2.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 50
  },
  {
    "id": "AZRRTR2x40",
    "title": "Red Reflective Radium Waterproof Warning Tape For road safety",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 999,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Red Reflective Radium Waterproof Warning Tape For road safety. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRRTR2x40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRRTR2x40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRRTR2x40_img1.jpg",
      "https://cdn.abuzz.store/products/AZRRTR2x40_img2.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 51
  },
  {
    "id": "AZRRTW2x40",
    "title": "White Reflective Radium Waterproof Warning Tape For road safety",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial White Reflective Radium Waterproof Warning Tape For road safety. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRRTW2x40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRRTW2x40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRRTW2x40_img1.jpg",
      "https://cdn.abuzz.store/products/AZRRTW2x40_img2.jpg",
      "https://cdn.abuzz.store/products/AZRRTW2x40_img3.jpg",
      "https://cdn.abuzz.store/products/AZRRTW2x40_img4.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 52
  },
  {
    "id": "AZ2in1SCW4",
    "title": "2in1 4inch Reversible Phillips/Slotted Standard Screwdriver",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 2in1 4inch Reversible Phillips/Slotted Standard Screwdriver. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ2in1SCW4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ2in1SCW4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ2in1SCW4_img1.jpg",
      "https://cdn.abuzz.store/products/AZ2in1SCW4_img2.jpg",
      "https://cdn.abuzz.store/products/AZ2in1SCW4_img3.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 53
  },
  {
    "id": "AZ2IN1SCW6",
    "title": "2in1 6inch Reversible Phillips/Slotted Standard Screwdriver",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 2in1 6inch Reversible Phillips/Slotted Standard Screwdriver. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ2IN1SCW6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 54
  },
  {
    "id": "AZ2IN1SCW8",
    "title": "2in1 8inch Reversible Phillips/Slotted Standard Screwdriver",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 2in1 8inch Reversible Phillips/Slotted Standard Screwdriver. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ2IN1SCW8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ2IN1SCW8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ2IN1SCW8_img1.jpg",
      "https://cdn.abuzz.store/products/AZ2IN1SCW8_img2.jpg",
      "https://cdn.abuzz.store/products/AZ2IN1SCW8_img3.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 55
  },
  {
    "id": "AZWOODCHP12",
    "title": "Wooden Chisel & File Handle (PACK OF 12)",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Chisel & File Handle (PACK OF 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWOODCHP12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWOODCHP12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWOODCHP12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWOODCHP12_img2.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 56
  },
  {
    "id": "AZWOODCHP06",
    "title": "Wooden Chisel & File Handle (PACK OF 6)",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Wooden Chisel & File Handle (PACK OF 6). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWOODCHP06",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWOODCHP06_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWOODCHP06_img1.jpg",
      "https://cdn.abuzz.store/products/AZWOODCHP06_img2.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 57
  },
  {
    "id": "AZPVCCHP06",
    "title": "PVC Chisel & File Handle (PACK OF 6)",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Chisel & File Handle (PACK OF 6). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPVCCHP06",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPVCCHP06_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPVCCHP06_img1.jpg",
      "https://cdn.abuzz.store/products/AZPVCCHP06_img2.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 58
  },
  {
    "id": "AZPVCCHP12",
    "title": "PVC Chisel & File Handle (PACK OF 12)",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Chisel & File Handle (PACK OF 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPVCCHP12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPVCCHP12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPVCCHP12_img1.jpg",
      "https://cdn.abuzz.store/products/AZPVCCHP12_img2.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 59
  },
  {
    "id": "AZDRGS6X7",
    "title": "Double Sided Ring Spanner-Matte Finish 6x7mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 6x7mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS6X7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS6X7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS6X7_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS6X7_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS6X7_img3.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 60
  },
  {
    "id": "AZDRGS8X9",
    "title": "Double Sided Ring Spanner-Matte Finish 8x9mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 359,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 8x9mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS8X9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS8X9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS8X9_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS8X9_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS8X9_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 61
  },
  {
    "id": "AZDRGS10X11",
    "title": "Double Sided Ring Spanner-Matte Finish 10x11mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 10x11mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS10X11",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS10X11_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS10X11_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS10X11_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS10X11_img3.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 62
  },
  {
    "id": "AZDRGS12X13",
    "title": "Double Sided Ring Spanner-Matte Finish 12x13mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 12x13mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS12X13",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS12X13_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS12X13_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS12X13_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS12X13_img3.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 63
  },
  {
    "id": "AZDRGS14X15",
    "title": "Double Sided Ring Spanner-Matte Finish 14x15mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 14x15mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS14X15",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS14X15_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS14X15_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS14X15_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS14X15_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 64
  },
  {
    "id": "AZDRGS16X17",
    "title": "Double Sided Ring Spanner-Matte Finish 16x17mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 16x17mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS16X17",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS16X17_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS16X17_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS16X17_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS16X17_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 65
  },
  {
    "id": "AZDRGS18X19",
    "title": "Double Sided Ring Spanner-Matte Finish 18x19mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 18x19mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS18X19",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS18X19_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS18X19_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS18X19_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS18X19_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 66
  },
  {
    "id": "AZDRGS20X22",
    "title": "Double Sided Ring Spanner-Matte Finish 20x22mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner-Matte Finish 20x22mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS20X22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS20X22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS20X22_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS20X22_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRGS20X22_img3.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 67
  },
  {
    "id": "AZDRGS06X22",
    "title": "Double Sided Ring Spanner Size: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22.",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Double Sided Ring Spanner Size: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22.. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRGS06X22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRGS06X22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRGS06X22_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRGS06X22_img2.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 68
  },
  {
    "id": "AZFGRDJT2x50",
    "title": "Fiberglass Roll For Wall Cracks & Repairs – Drywall Joint Tape (50m L X 2-Inch W)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Fiberglass Roll For Wall Cracks & Repairs – Drywall Joint Tape (50m L X 2-Inch W). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFGRDJT2x50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFGRDJT2x50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img1.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img2.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img3.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img4.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img5.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img6.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img7.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img8.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT2x50_img9.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 69
  },
  {
    "id": "AZFGRDJT6x50",
    "title": "Fiberglass Roll For Wall Cracks & Repairs – Drywall Joint Tape (50m L X 6-Inch W)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Fiberglass Roll For Wall Cracks & Repairs – Drywall Joint Tape (50m L X 6-Inch W). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFGRDJT6x50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFGRDJT6x50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFGRDJT6x50_img1.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT6x50_img2.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT6x50_img3.jpg",
      "https://cdn.abuzz.store/products/AZFGRDJT6x50_img4.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 70
  },
  {
    "id": "AZFHPRMH1.5",
    "title": "Fibreglass Handle PVC Rubber Mallets Hammer 1.5inch",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Fibreglass Handle PVC Rubber Mallets Hammer 1.5inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFHPRMH1.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFHPRMH1_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFHPRMH1_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFHPRMH1_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZFHPRMH1_5_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 71
  },
  {
    "id": "AZFHPRMH2",
    "title": "Fibreglass Handle PVC Rubber Mallets Hammer 2inch",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Fibreglass Handle PVC Rubber Mallets Hammer 2inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFHPRMH2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFHPRMH2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFHPRMH2_img1.jpg",
      "https://cdn.abuzz.store/products/AZFHPRMH2_img2.jpg",
      "https://cdn.abuzz.store/products/AZFHPRMH2_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 72
  },
  {
    "id": "AZWHSH",
    "title": "welding-hand-shield Welding Helmet",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial welding-hand-shield Welding Helmet. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHSH",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6506",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHSH_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHSH_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHSH_img2.jpg",
      "https://cdn.abuzz.store/products/AZWHSH_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 73
  },
  {
    "id": "AZFFWHFW",
    "title": "Full Face Welding Helmet With A Flip Front Window",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Full Face Welding Helmet With A Flip Front Window. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFFWHFW",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6506",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFFWHFW_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFFWHFW_img1.jpg",
      "https://cdn.abuzz.store/products/AZFFWHFW_img2.jpg",
      "https://cdn.abuzz.store/products/AZFFWHFW_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 74
  },
  {
    "id": "AZTEFT4p12",
    "title": "Triangular Engineer's File Tool 4 Inch (100mm) (Pack Of 12)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Triangular Engineer's File Tool 4 Inch (100mm) (Pack Of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTEFT4p12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTEFT4p12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTEFT4p12_img1.jpg",
      "https://cdn.abuzz.store/products/AZTEFT4p12_img2.jpg",
      "https://cdn.abuzz.store/products/AZTEFT4p12_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 75
  },
  {
    "id": "AZTEFT6p12",
    "title": "Triangular Engineer's File Tool 6 Inch (125mm) (Pack Of 12)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Triangular Engineer's File Tool 6 Inch (125mm) (Pack Of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTEFT6p12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTEFT6p12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTEFT6p12_img1.jpg",
      "https://cdn.abuzz.store/products/AZTEFT6p12_img2.jpg",
      "https://cdn.abuzz.store/products/AZTEFT6p12_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 76
  },
  {
    "id": "AZFEFT6P5",
    "title": "Flat Engineer's File Tool 6Inch (125mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Engineer's File Tool 6Inch (125mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEFT6P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEFT6P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEFT6P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEFT6P5_img2.jpg",
      "https://cdn.abuzz.store/products/AZFEFT6P5_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 77
  },
  {
    "id": "AZFEHRT6P5",
    "title": "Half Round Engineer's File Tool 6Inch (125mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round Engineer's File Tool 6Inch (125mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEHRT6P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEHRT6P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEHRT6P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEHRT6P5_img2.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 78
  },
  {
    "id": "AZFERT6P5",
    "title": "Round Engineer's File Tool 6Inch (125mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round Engineer's File Tool 6Inch (125mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFERT6P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFERT6P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFERT6P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFERT6P5_img2.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 79
  },
  {
    "id": "AZFEFT8P5",
    "title": "Flat Engineer's File Tool 8Inch (200mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Engineer's File Tool 8Inch (200mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEFT8P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEFT8P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEFT8P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEFT8P5_img2.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 80
  },
  {
    "id": "AZFEHRT8P5",
    "title": "Half Round Engineer's File Tool 8Inch (200mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round Engineer's File Tool 8Inch (200mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEHRT8P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEHRT8P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEHRT8P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEHRT8P5_img2.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 81
  },
  {
    "id": "AZFERT8P5",
    "title": "Round Engineer's File Tool 8Inch (200mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round Engineer's File Tool 8Inch (200mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFERT8P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFERT8P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFERT8P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFERT8P5_img2.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 82
  },
  {
    "id": "AZFEFT10P5",
    "title": "Flat Engineer's File Tool 10Inch (250mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Engineer's File Tool 10Inch (250mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEFT10P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEFT10P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEFT10P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEFT10P5_img2.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 83
  },
  {
    "id": "AZFEHRT10P5",
    "title": "Half Round Engineer's File Tool 10Inch (250mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Half Round Engineer's File Tool 10Inch (250mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEHRT10P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEHRT10P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEHRT10P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEHRT10P5_img2.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 84
  },
  {
    "id": "AZFERT10P5",
    "title": "Round Engineer's File Tool 10Inch (250mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round Engineer's File Tool 10Inch (250mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFERT10P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFERT10P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFERT10P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFERT10P5_img2.jpg",
      "https://cdn.abuzz.store/products/AZFERT10P5_img3.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 85
  },
  {
    "id": "AZFEFT12P5",
    "title": "Flat Engineer's File Tool 12Inch (300mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Flat Engineer's File Tool 12Inch (300mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEFT12P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEFT12P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEFT12P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEFT12P5_img2.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 86
  },
  {
    "id": "AZFEHRT12P5",
    "title": "Half Round Engineer's File Tool 12Inch (300mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 1299,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Half Round Engineer's File Tool 12Inch (300mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFEHRT12P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFEHRT12P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFEHRT12P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFEHRT12P5_img2.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 87
  },
  {
    "id": "AZFERT12P5",
    "title": "Round Engineer's File Tool 12Inch (300mm) (Pack Of 5)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Round Engineer's File Tool 12Inch (300mm) (Pack Of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFERT12P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFERT12P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFERT12P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZFERT12P5_img2.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 88
  },
  {
    "id": "AZMCW4P25",
    "title": "LXMI 4 inch 107x1.2x16mm Metal Cutting Wheel (PACK OF 25)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 inch 107x1.2x16mm Metal Cutting Wheel (PACK OF 25). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCW4P25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCW4P25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCW4P25_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCW4P25_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCW4P25_img3.jpg",
      "https://cdn.abuzz.store/products/AZMCW4P25_img4.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 89
  },
  {
    "id": "AZMCW4P50",
    "title": "LXMI 4 inch 107x1.2x16mm Metal Cutting Wheel (PACK OF 50)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 inch 107x1.2x16mm Metal Cutting Wheel (PACK OF 50). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCW4P50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCW4P50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCW4P50_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCW4P50_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCW4P50_img3.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 90
  },
  {
    "id": "AZMCW5P25",
    "title": "LXMI 5 inch 125x1.2x22mm Metal Cutting Wheel (PACK OF 25)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 5 inch 125x1.2x22mm Metal Cutting Wheel (PACK OF 25). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCW5P25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCW5P25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCW5P25_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCW5P25_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCW5P25_img3.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 91
  },
  {
    "id": "AZMCW5P50",
    "title": "LXMI 5 inch 125x1.2x22mm Metal Cutting Wheel (PACK OF 50)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 1899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 5 inch 125x1.2x22mm Metal Cutting Wheel (PACK OF 50). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCW5P50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCW5P50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCW5P50_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCW5P50_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCW5P50_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 92
  },
  {
    "id": "AZMCW7P25",
    "title": "LXMI 7 inch 180x1.2x22mm Metal Cutting Wheel (PACK OF 25)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 1499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 7 inch 180x1.2x22mm Metal Cutting Wheel (PACK OF 25). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCW7P25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCW7P25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCW7P25_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCW7P25_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCW7P25_img3.jpg",
      "https://cdn.abuzz.store/products/AZMCW7P25_img4.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 93
  },
  {
    "id": "AZMCW7P50",
    "title": "LXMI 7 inch 180x1.2x22mm Metal Cutting Wheel (PACK OF 50) 7inch Sharp Iron, Steel and Other Metal Cutting Wheel (PACK OF 50)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 2499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 7 inch 180x1.2x22mm Metal Cutting Wheel (PACK OF 50) 7inch Sharp Iron, Steel and Other Metal Cutting Wheel (PACK OF 50). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCW7P50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCW7P50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCW7P50_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCW7P50_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCW7P50_img3.jpg",
      "https://cdn.abuzz.store/products/AZMCW7P50_img4.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 94
  },
  {
    "id": "AZSCBP",
    "title": "LXMI Gas Cutting Blow Pipe",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 2999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Gas Cutting Blow Pipe. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSCBP",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSCBP_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSCBP_img1.jpg",
      "https://cdn.abuzz.store/products/AZSCBP_img2.jpg",
      "https://cdn.abuzz.store/products/AZSCBP_img3.jpg",
      "https://cdn.abuzz.store/products/AZSCBP_img4.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 95
  },
  {
    "id": "AZCLTGG500",
    "title": "LXMI Hand operated heavy duty Lever type grease gun",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Hand operated heavy duty Lever type grease gun. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCLTGG500",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCLTGG500_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCLTGG500_img1.jpg",
      "https://cdn.abuzz.store/products/AZCLTGG500_img2.jpg",
      "https://cdn.abuzz.store/products/AZCLTGG500_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 96
  },
  {
    "id": "AZCPH1LB",
    "title": "1 LB Premium Quality -Wood Handle HAMMER",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 1 LB Premium Quality -Wood Handle HAMMER. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCPH1LB",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCPH1LB_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCPH1LB_img1.jpg",
      "https://cdn.abuzz.store/products/AZCPH1LB_img2.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 97
  },
  {
    "id": "AZCPH1/2LB",
    "title": "1/2 LB Premium Quality -Wood Handle HAMMER",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 1/2 LB Premium Quality -Wood Handle HAMMER. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCPH1/2LB",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCPH1_2LB_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCPH1_2LB_img1.jpg",
      "https://cdn.abuzz.store/products/AZCPH1_2LB_img2.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 98
  },
  {
    "id": "AZCPH3/4LB",
    "title": "3/4 LB Premium Quality -Wood Handle HAMMER",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 389,
    "stockStatus": "low_stock",
    "description": "High-grade industrial 3/4 LB Premium Quality -Wood Handle HAMMER. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCPH3/4LB",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCPH3_4LB_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCPH3_4LB_img1.jpg",
      "https://cdn.abuzz.store/products/AZCPH3_4LB_img2.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 99
  },
  {
    "id": "AZDRDGW7",
    "title": "7 Inch Double Row Diamond Grinding Wheel - Concrete Stone Ceramic Turbo Grinding Cup Wheel",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 7 Inch Double Row Diamond Grinding Wheel - Concrete Stone Ceramic Turbo Grinding Cup Wheel. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRDGW7",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRDGW7_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRDGW7_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW7_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW7_img3.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW7_img4.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW7_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 100
  },
  {
    "id": "AZDRDGW5",
    "title": "5 Inch Double Row Diamond Grinding Wheel - Concrete Stone Ceramic Turbo Grinding Cup Wheel",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 5 Inch Double Row Diamond Grinding Wheel - Concrete Stone Ceramic Turbo Grinding Cup Wheel. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDRDGW5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDRDGW5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDRDGW5_img1.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW5_img2.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW5_img3.jpg",
      "https://cdn.abuzz.store/products/AZDRDGW5_img4.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 101
  },
  {
    "id": "AZFD4-120",
    "title": "LXMI Flap Disc 100mm 4 Inch 120 Grid Pack of 10",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Flap Disc 100mm 4 Inch 120 Grid Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFD4-120",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFD4-120_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFD4-120_img1.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img2.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img3.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img4.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img5.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img6.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img7.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img8.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img9.jpg",
      "https://cdn.abuzz.store/products/AZFD4-120_img10.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 102
  },
  {
    "id": "AZFD4-60",
    "title": "LXMI Flap Disc 100mm 4 Inch 60 Grid Pack of 10",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Flap Disc 100mm 4 Inch 60 Grid Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFD4-60",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFD4-60_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFD4-60_img1.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img2.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img3.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img4.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img5.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img6.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img7.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img8.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img9.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img10.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img11.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img12.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img13.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img14.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img15.jpg",
      "https://cdn.abuzz.store/products/AZFD4-60_img16.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 103
  },
  {
    "id": "AZFD4-80",
    "title": "LXMI Flap Disc 100mm 4 Inch 80 Grid Pack of 10",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Flap Disc 100mm 4 Inch 80 Grid Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFD4-80",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFD4-80_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFD4-80_img1.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img2.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img3.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img4.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img5.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img6.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img7.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img8.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img9.jpg",
      "https://cdn.abuzz.store/products/AZFD4-80_img10.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 104
  },
  {
    "id": "AZLGC",
    "title": "LXMI Pruning Shears Stainless Steel Gardening Hand Pruner Secateurs Cutter Plants Tool Branch Shears Fruit Branch Scissors Hand Tools",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Pruning Shears Stainless Steel Gardening Hand Pruner Secateurs Cutter Plants Tool Branch Shears Fruit Branch Scissors Hand Tools. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLGC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLGC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLGC_img1.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img2.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img3.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img4.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img5.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img6.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img7.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img8.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img9.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img10.jpg",
      "https://cdn.abuzz.store/products/AZLGC_img11.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 105
  },
  {
    "id": "AZLHC1.2-4",
    "title": "LXMI 1/2” Hand Tools Flat Chisel, 4 inch Long, Hex Shank",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 1/2” Hand Tools Flat Chisel, 4 inch Long, Hex Shank. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHC1.2-4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHC1_2-4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHC1_2-4_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHC1_2-4_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHC1_2-4_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHC1_2-4_img4.jpg",
      "https://cdn.abuzz.store/products/AZLHC1_2-4_img5.jpg",
      "https://cdn.abuzz.store/products/AZLHC1_2-4_img6.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 106
  },
  {
    "id": "AZLHC3.4-10",
    "title": "LXMI 3/4” Hand Tools Flat Chisel, 10 inch Long, Hex Shank",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3/4” Hand Tools Flat Chisel, 10 inch Long, Hex Shank. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHC3.4-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHC3_4-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHC3_4-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-10_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-10_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-10_img4.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-10_img5.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-10_img6.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 107
  },
  {
    "id": "AZLHC3.4-12",
    "title": "LXMI 3/4” Hand Tools Flat Chisel, 12 inch Long, Hex Shank",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3/4” Hand Tools Flat Chisel, 12 inch Long, Hex Shank. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHC3.4-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHC3_4-12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHC3_4-12_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-12_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-12_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-12_img4.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-12_img5.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-12_img6.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 108
  },
  {
    "id": "AZLHC3.4-6",
    "title": "LXMI 3/4” Hand Tools Flat Chisel, 6 inch Long, Hex Shank",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3/4” Hand Tools Flat Chisel, 6 inch Long, Hex Shank. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHC3.4-6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHC3_4-6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHC3_4-6_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-6_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-6_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-6_img4.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-6_img5.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-6_img6.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 109
  },
  {
    "id": "AZLHC3.4-8",
    "title": "LXMI 3/4” Hand Tools Flat Chisel, 8 inch Long, Hex Shank",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3/4” Hand Tools Flat Chisel, 8 inch Long, Hex Shank. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHC3.4-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHC3_4-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHC3_4-8_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-8_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHC3_4-8_img3.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 110
  },
  {
    "id": "AZLHF12",
    "title": "LXMI Hacksaw Frame 12 Inch with blade",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Hacksaw Frame 12 Inch with blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHF12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHF12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHF12_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img4.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img5.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img6.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img7.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img8.jpg",
      "https://cdn.abuzz.store/products/AZLHF12_img9.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 111
  },
  {
    "id": "AZLHLV20-25",
    "title": "LXMI 20mm Hook & Loop Fastening Velcro Tape 25m",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 20mm Hook & Loop Fastening Velcro Tape 25m. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLHLV20-25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLHLV20-25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLHLV20-25_img1.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img2.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img3.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img4.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img5.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img6.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img7.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img8.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img9.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img10.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img11.jpg",
      "https://cdn.abuzz.store/products/AZLHLV20-25_img12.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 112
  },
  {
    "id": "AZLPC32",
    "title": "LXMI High Quality Aluminum Plastic Pipe Water Tube Tubing Hose Cutter Scissor Knife Cut Ratchet Plumbing Tool 32mm",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI High Quality Aluminum Plastic Pipe Water Tube Tubing Hose Cutter Scissor Knife Cut Ratchet Plumbing Tool 32mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLPC32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLPC32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLPC32_img1.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img2.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img3.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img4.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img5.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img6.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img7.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img8.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img9.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img10.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img11.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img12.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img13.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img14.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img15.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img16.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img17.jpg",
      "https://cdn.abuzz.store/products/AZLPC32_img18.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 113
  },
  {
    "id": "AZPMDC6.5",
    "title": "LXMI HD Gold 6.5 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HD Gold 6.5 mm Diamond Core Drill for Making Hole in Granite, Marble & Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMDC6.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMDC6_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMDC6_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img3.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img4.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img5.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img6.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img7.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img8.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img9.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img10.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img11.jpg",
      "https://cdn.abuzz.store/products/AZPMDC6_5_img12.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 114
  },
  {
    "id": "AZSGWH1000",
    "title": "LXMI Spark Gold Heavy Duty 1000Amps Fully Insulated Electrode Welding Holder",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Spark Gold Heavy Duty 1000Amps Fully Insulated Electrode Welding Holder. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSGWH1000",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSGWH1000_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSGWH1000_img1.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img2.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img3.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img4.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img5.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img6.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img7.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img8.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img9.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img10.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img11.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img12.jpg",
      "https://cdn.abuzz.store/products/AZSGWH1000_img13.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 115
  },
  {
    "id": "AZHSS12",
    "title": "LXMI HSS 12mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 12mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS12_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img6.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img7.jpg",
      "https://cdn.abuzz.store/products/AZHSS12_img8.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 116
  },
  {
    "id": "AZHSS14",
    "title": "LXMI HSS 14mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 14mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS14_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS14_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS14_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS14_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS14_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS14_img6.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 117
  },
  {
    "id": "AZHSS16",
    "title": "LXMI HSS 16mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 16mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS16_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS16_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS16_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS16_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS16_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS16_img6.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 118
  },
  {
    "id": "AZHSS19",
    "title": "LXMI HSS 19mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 419,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 19mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS19",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS19_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS19_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS19_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS19_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS19_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS19_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS19_img6.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 119
  },
  {
    "id": "AZHSS22",
    "title": "LXMI HSS 22mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 439,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 22mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS22_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS22_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS22_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS22_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS22_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS22_img6.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 120
  },
  {
    "id": "AZHSS25",
    "title": "LXMI HSS 25mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 459,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 25mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS25_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS25_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS25_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS25_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS25_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS25_img6.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 121
  },
  {
    "id": "AZHSS32",
    "title": "LXMI HSS 32mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 479,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 32mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS32_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS32_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS32_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS32_img4.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 122
  },
  {
    "id": "AZHSS38",
    "title": "LXMI HSS 38mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI HSS 38mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS38",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS38_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS38_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS38_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS38_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS38_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS38_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS38_img6.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 123
  },
  {
    "id": "AZHSS40",
    "title": "LXMI HSS 40mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 529,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 40mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS40_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS40_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS40_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS40_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS40_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS40_img6.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 124
  },
  {
    "id": "AZHSS45",
    "title": "LXMI HSS 45mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 45mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS45",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS45_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS45_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS45_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS45_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS45_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS45_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS45_img6.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 125
  },
  {
    "id": "AZHSS50",
    "title": "LXMI HSS 50mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 50mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS50_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS50_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS50_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS50_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS50_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS50_img6.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 126
  },
  {
    "id": "AZHSS63",
    "title": "LXMI HSS 63mm Hole Saw Cutter Drill Bit",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI HSS 63mm Hole Saw Cutter Drill Bit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSS63",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSS63_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSS63_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img5.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img6.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img7.jpg",
      "https://cdn.abuzz.store/products/AZHSS63_img8.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 127
  },
  {
    "id": "AZBPMT-C",
    "title": "LXMI Box Packing Strapping Sealer tool Machine KIT Crimper, Tightener Manual Hand Tool (Red)",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 1399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Box Packing Strapping Sealer tool Machine KIT Crimper, Tightener Manual Hand Tool (Red). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBPMT-C",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBPMT-C_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBPMT-C_img1.jpg",
      "https://cdn.abuzz.store/products/AZBPMT-C_img2.jpg",
      "https://cdn.abuzz.store/products/AZBPMT-C_img3.jpg",
      "https://cdn.abuzz.store/products/AZBPMT-C_img4.jpg",
      "https://cdn.abuzz.store/products/AZBPMT-C_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 128
  },
  {
    "id": "AZPMH-40MM",
    "title": "LXMI Plastic Mallet Hammer Set Of 1Pcs, 40 Mm, Alloy Steel With Better Gripping Hand Tools For Professionals",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Plastic Mallet Hammer Set Of 1Pcs, 40 Mm, Alloy Steel With Better Gripping Hand Tools For Professionals. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMH-40MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMH-40MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMH-40MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMH-40MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMH-40MM_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 129
  },
  {
    "id": "AZPMH-50MM",
    "title": "LXMI Plastic Mallet Hammer Set Of 1Pcs, 50 Mm, Alloy Steel With Better Gripping Hand Tools For Professionals",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Plastic Mallet Hammer Set Of 1Pcs, 50 Mm, Alloy Steel With Better Gripping Hand Tools For Professionals. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMH-50MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMH-50MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMH-50MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMH-50MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZPMH-50MM_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 130
  },
  {
    "id": "AZACPVGC4-10-6T-20",
    "title": "LXMI ACP V Groove Cutter D-4inch X 10mm X 6T X 20mm Bore",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI ACP V Groove Cutter D-4inch X 10mm X 6T X 20mm Bore. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZACPVGC4-10-6T-20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZACPVGC4-10-6T-20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZACPVGC4-10-6T-20_img1.jpg",
      "https://cdn.abuzz.store/products/AZACPVGC4-10-6T-20_img2.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 131
  },
  {
    "id": "AZACPVGC4-6-6T-20",
    "title": "LXMI ACP V Groove Cutter D-4inch X 6mm X 6T X 20mm Bore",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI ACP V Groove Cutter D-4inch X 6mm X 6T X 20mm Bore. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZACPVGC4-6-6T-20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZACPVGC4-6-6T-20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZACPVGC4-6-6T-20_img1.jpg",
      "https://cdn.abuzz.store/products/AZACPVGC4-6-6T-20_img2.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 132
  },
  {
    "id": "AZACPVGC4-8-6T-20",
    "title": "LXMI ACP V Groove Cutter D-4inch X 8mm X 6T X 20mm Bore",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI ACP V Groove Cutter D-4inch X 8mm X 6T X 20mm Bore. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZACPVGC4-8-6T-20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZACPVGC4-8-6T-20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZACPVGC4-8-6T-20_img1.jpg",
      "https://cdn.abuzz.store/products/AZACPVGC4-8-6T-20_img2.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 133
  },
  {
    "id": "AZCMD-5MM",
    "title": "LXMI 5mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 5mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-5MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-5MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-5MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-5MM_img2.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 134
  },
  {
    "id": "AZCMD-6MM",
    "title": "LXMI 6mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 6mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-6MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-6MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-6MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-6MM_img2.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 135
  },
  {
    "id": "AZCSD-12V",
    "title": "LXMI 12V Li-ion Dual Speed Keyless Chuck Drill Cordless Drill Drill Driver Screwdriver with 2 Batteries, LED Torch Variable Speed and Torque Setting (18+1). (With Batteries)",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 2999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12V Li-ion Dual Speed Keyless Chuck Drill Cordless Drill Drill Driver Screwdriver with 2 Batteries, LED Torch Variable Speed and Torque Setting (18+1). (With Batteries). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCSD-12V",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCSD-12V_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCSD-12V_img1.jpg",
      "https://cdn.abuzz.store/products/AZCSD-12V_img2.jpg",
      "https://cdn.abuzz.store/products/AZCSD-12V_img3.jpg",
      "https://cdn.abuzz.store/products/AZCSD-12V_img4.jpg",
      "https://cdn.abuzz.store/products/AZCSD-12V_img5.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 136
  },
  {
    "id": "AZCW100X6X16-P5",
    "title": "LXMI 4 Inch Cutting wheel steel or stainless steel 100 X 6 X 16MM Grit WA 36SBF (Pack of 5)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 Inch Cutting wheel steel or stainless steel 100 X 6 X 16MM Grit WA 36SBF (Pack of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCW100X6X16-P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCW100X6X16-P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCW100X6X16-P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZCW100X6X16-P5_img2.jpg",
      "https://cdn.abuzz.store/products/AZCW100X6X16-P5_img3.jpg",
      "https://cdn.abuzz.store/products/AZCW100X6X16-P5_img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 137
  },
  {
    "id": "AZGC120-P10",
    "title": "LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 120) (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 120) (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGC120-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGC120-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGC120-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZGC120-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZGC120-P10_img3.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 138
  },
  {
    "id": "AZGC46-P10",
    "title": "LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 46) (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 46) (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGC46-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGC46-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGC46-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZGC46-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZGC46-P10_img3.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 139
  },
  {
    "id": "AZGC60-P10",
    "title": "LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 60) (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 60) (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGC60-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGC60-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGC60-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZGC60-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZGC60-P10_img3.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 140
  },
  {
    "id": "AZGC80-P10",
    "title": "LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 80) (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch GC Stone Cutting Wheel 100 X 3 X 16mm (Grit 80) (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGC80-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGC80-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGC80-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZGC80-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZGC80-P10_img3.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 141
  },
  {
    "id": "AZGSC-D",
    "title": "LXMI Double Head Professional glass suction cup Handle Material ABS Diameter 120mm",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Double Head Professional glass suction cup Handle Material ABS Diameter 120mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGSC-D",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGSC-D_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGSC-D_img1.jpg",
      "https://cdn.abuzz.store/products/AZGSC-D_img2.jpg",
      "https://cdn.abuzz.store/products/AZGSC-D_img3.jpg",
      "https://cdn.abuzz.store/products/AZGSC-D_img4.jpg",
      "https://cdn.abuzz.store/products/AZGSC-D_img5.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 142
  },
  {
    "id": "AZGSC-S",
    "title": "LXMI Single Head Professional glass suction cup Handle Material ABS Diameter 120mm",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Single Head Professional glass suction cup Handle Material ABS Diameter 120mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGSC-S",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGSC-S_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGSC-S_img1.jpg",
      "https://cdn.abuzz.store/products/AZGSC-S_img2.jpg",
      "https://cdn.abuzz.store/products/AZGSC-S_img3.jpg",
      "https://cdn.abuzz.store/products/AZGSC-S_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 143
  },
  {
    "id": "AZGSC-T",
    "title": "LXMI Triple Head Professional glass suction cup Handle Material ABS Diameter 120mm",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Triple Head Professional glass suction cup Handle Material ABS Diameter 120mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGSC-T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGSC-T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGSC-T_img1.jpg",
      "https://cdn.abuzz.store/products/AZGSC-T_img2.jpg",
      "https://cdn.abuzz.store/products/AZGSC-T_img3.jpg",
      "https://cdn.abuzz.store/products/AZGSC-T_img4.jpg",
      "https://cdn.abuzz.store/products/AZGSC-T_img5.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 144
  },
  {
    "id": "AZSCG-9.5",
    "title": "LXMI Silicone Caulking Gun, Manual Cartridge Rod Cradle Suitable for 9.5 Inch tube cartridge (Caulking gun only)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Silicone Caulking Gun, Manual Cartridge Rod Cradle Suitable for 9.5 Inch tube cartridge (Caulking gun only). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSCG-9.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSCG-9_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSCG-9_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZSCG-9_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZSCG-9_5_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 145
  },
  {
    "id": "AZSG(L-L)-P12",
    "title": "LXMI Black Frame Clear Glass Welding, Laboratory, Wood-working, Blowtorch Safety Goggle (L-L)",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Black Frame Clear Glass Welding, Laboratory, Wood-working, Blowtorch Safety Goggle (L-L). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSG(L-L)-P12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3926",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSG_L-L_-P12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSG_L-L_-P12_img1.jpg",
      "https://cdn.abuzz.store/products/AZSG_L-L_-P12_img2.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 146
  },
  {
    "id": "AZWG-P12",
    "title": "LXMI Welding Safety Goggles-Glasses for Men & Women (Free Size) (Pack of 12)",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Welding Safety Goggles-Glasses for Men & Women (Free Size) (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWG-P12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3926",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWG-P12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWG-P12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWG-P12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWG-P12_img3.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 147
  },
  {
    "id": "AZBJ-P4",
    "title": "LXMI Bed Rail L Brackets for Joining Woods, Bed Frame Hardware , Bed Rail Socket Accessories, Set of 4 Wooden Bed Brackets Bed Rail Fittings, headboard and Footboard Fixing Accessories(4 Sets)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Bed Rail L Brackets for Joining Woods, Bed Frame Hardware , Bed Rail Socket Accessories, Set of 4 Wooden Bed Brackets Bed Rail Fittings, headboard and Footboard Fixing Accessories(4 Sets). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBJ-P4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBJ-P4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBJ-P4_img1.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img2.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img3.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img4.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img5.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img6.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img7.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img8.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img9.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img10.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img11.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img12.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img13.jpg",
      "https://cdn.abuzz.store/products/AZBJ-P4_img14.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 148
  },
  {
    "id": "AZBOSCHSD-P10",
    "title": "LXMI Professional Extra Hard, Double Ended Star Screwdriver Bits, Type Ph2-Ph2, Length 45mm, Gold (Pack Of 10)",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Professional Extra Hard, Double Ended Star Screwdriver Bits, Type Ph2-Ph2, Length 45mm, Gold (Pack Of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBOSCHSD-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZBOSCHSD-P10_img6.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 149
  },
  {
    "id": "AZCB-DU10-EID13-P2",
    "title": "LXMI DU10/EID13 DRILL MACHINE CARBON BRUSH -DU10 CARBON BRUSH FOR DRILL MACHINES -(SET OF 2) (4 PIECES)",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI DU10/EID13 DRILL MACHINE CARBON BRUSH -DU10 CARBON BRUSH FOR DRILL MACHINES -(SET OF 2) (4 PIECES). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCB-DU10-EID13-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCB-DU10-EID13-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCB-DU10-EID13-P2_img1.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 150
  },
  {
    "id": "AZCB2-20-P4",
    "title": "LXMI Carbon Brush for 2-20 Hammer 20mm",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Carbon Brush for 2-20 Hammer 20mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCB2-20-P4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCB2-20-P4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCB2-20-P4_img1.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 151
  },
  {
    "id": "AZCB6-100-P2",
    "title": "LXMI Carbon Brush for 4inch Angle Grinder GWS 6-100",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Carbon Brush for 4inch Angle Grinder GWS 6-100. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCB6-100-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCB6-100-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCB6-100-P2_img1.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 152
  },
  {
    "id": "AZCB801-P2",
    "title": "LXMI 4-Inch 100MM Angle Grinder Machine Carbon Brush 801 Model. (Carbon brush) (Pack of 2)(4 Piece)",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4-Inch 100MM Angle Grinder Machine Carbon Brush 801 Model. (Carbon brush) (Pack of 2)(4 Piece). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCB801-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCB801-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCB801-P2_img1.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 153
  },
  {
    "id": "AZCB810T-P2",
    "title": "LXMI 810T Carbon Brushes for Rotary Hammer (Carbon brush) (Pack of 2)(4 Piece)",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 810T Carbon Brushes for Rotary Hammer (Carbon brush) (Pack of 2)(4 Piece). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCB810T-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCB810T-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCB810T-P2_img1.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 154
  },
  {
    "id": "AZJKSD-P10",
    "title": "LXMI Professional Extra Hard, Double Ended Star Screwdriver Bits, Type Ph2-Ph2, Length 45mm, Grey (Pack Of 10)",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Professional Extra Hard, Double Ended Star Screwdriver Bits, Type Ph2-Ph2, Length 45mm, Grey (Pack Of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJKSD-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJKSD-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJKSD-P10_img1.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 155
  },
  {
    "id": "AZLH-10",
    "title": "LXMI L-Handle 1/2 (10 inch), CRV Steel Fully Polished, Fully Hardened and Tempered, Heavy-Duty, Car Extension Handle Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI L-Handle 1/2 (10 inch), CRV Steel Fully Polished, Fully Hardened and Tempered, Heavy-Duty, Car Extension Handle Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLH-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLH-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLH-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZLH-10_img2.jpg",
      "https://cdn.abuzz.store/products/AZLH-10_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 156
  },
  {
    "id": "AZLH-12",
    "title": "LXMI L-Handle 1/2 (12 inch), CRV Steel Fully Polished, Fully Hardened and Tempered, Heavy-Duty, Car Extension Handle Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI L-Handle 1/2 (12 inch), CRV Steel Fully Polished, Fully Hardened and Tempered, Heavy-Duty, Car Extension Handle Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLH-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLH-12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLH-12_img1.jpg",
      "https://cdn.abuzz.store/products/AZLH-12_img2.jpg",
      "https://cdn.abuzz.store/products/AZLH-12_img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 157
  },
  {
    "id": "AZLH-8",
    "title": "LXMI L-Handle 1/2 (8 inch), CRV Steel Fully Polished, Fully Hardened and Tempered, Heavy-Duty, Car Extension Handle Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI L-Handle 1/2 (8 inch), CRV Steel Fully Polished, Fully Hardened and Tempered, Heavy-Duty, Car Extension Handle Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZLH-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZLH-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZLH-8_img1.jpg",
      "https://cdn.abuzz.store/products/AZLH-8_img2.jpg",
      "https://cdn.abuzz.store/products/AZLH-8_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 158
  },
  {
    "id": "AZMT-3M",
    "title": "LXMI 3 Meter Plastic Short Measuring Tape for Home, DIY, Professional & Industrial",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 299,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 3 Meter Plastic Short Measuring Tape for Home, DIY, Professional & Industrial. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMT-3M",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMT-3M_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMT-3M_img1.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 159
  },
  {
    "id": "AZMT-5M",
    "title": "LXMI 5 Meter Plastic Short Measuring Tape for Home, DIY, Professional & Industrial",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 5 Meter Plastic Short Measuring Tape for Home, DIY, Professional & Industrial. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMT-5M",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMT-5M_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMT-5M_img1.jpg",
      "https://cdn.abuzz.store/products/AZMT-5M_img2.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 160
  },
  {
    "id": "AZPS-2",
    "title": "LXMI 2 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 2 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPS-2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPS-2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPS-2_img1.jpg",
      "https://cdn.abuzz.store/products/AZPS-2_img2.jpg",
      "https://cdn.abuzz.store/products/AZPS-2_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 161
  },
  {
    "id": "AZPS-3",
    "title": "LXMI 3 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPS-3",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPS-3_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPS-3_img1.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img2.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img3.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img4.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img5.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img6.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img7.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img8.jpg",
      "https://cdn.abuzz.store/products/AZPS-3_img9.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 162
  },
  {
    "id": "AZPS-4",
    "title": "LXMI 4 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPS-4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPS-4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPS-4_img1.jpg",
      "https://cdn.abuzz.store/products/AZPS-4_img2.jpg",
      "https://cdn.abuzz.store/products/AZPS-4_img3.jpg",
      "https://cdn.abuzz.store/products/AZPS-4_img4.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 163
  },
  {
    "id": "AZPS-6",
    "title": "LXMI 6 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPS-6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPS-6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPS-6_img1.jpg",
      "https://cdn.abuzz.store/products/AZPS-6_img2.jpg",
      "https://cdn.abuzz.store/products/AZPS-6_img3.jpg",
      "https://cdn.abuzz.store/products/AZPS-6_img4.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 164
  },
  {
    "id": "AZPS-8",
    "title": "LXMI 8 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 8 Inch Stainless Steel Paint Scraper, Taping Knife Tool for Repairing Drywall, Removing Wallpaper, Applying Putty, Plaster, Cement, Adhesive (Pack of 24). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPS-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPS-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPS-8_img1.jpg",
      "https://cdn.abuzz.store/products/AZPS-8_img2.jpg",
      "https://cdn.abuzz.store/products/AZPS-8_img3.jpg",
      "https://cdn.abuzz.store/products/AZPS-8_img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 15
  },
  {
    "id": "AZRHG-P5",
    "title": "LXMI Heavy Duty Rubber Hand gloves (5 Pairs) for Dishwashing, gardening, kitchen cleaning",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty Rubber Hand gloves (5 Pairs) for Dishwashing, gardening, kitchen cleaning. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRHG-P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRHG-P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRHG-P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZRHG-P5_img2.jpg",
      "https://cdn.abuzz.store/products/AZRHG-P5_img3.jpg",
      "https://cdn.abuzz.store/products/AZRHG-P5_img4.jpg",
      "https://cdn.abuzz.store/products/AZRHG-P5_img5.jpg",
      "https://cdn.abuzz.store/products/AZRHG-P5_img6.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 16,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZWC4-12T",
    "title": "LXMI Wood Cutting TCT Saw Blade 4inch 100 mm 12 Teeth 110X20X12T",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Wood Cutting TCT Saw Blade 4inch 100 mm 12 Teeth 110X20X12T. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWC4-12T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWC4-12T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWC4-12T_img1.jpg",
      "https://cdn.abuzz.store/products/AZWC4-12T_img2.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 17
  },
  {
    "id": "AZPC-5IN",
    "title": "LXMI Heavy Duty Plant Cutter, Garden Scissors, Pruner Cutter, Flower Cutter For Home Gardening Tool Bypass Pruner",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty Plant Cutter, Garden Scissors, Pruner Cutter, Flower Cutter For Home Gardening Tool Bypass Pruner. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPC-5IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPC-5IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPC-5IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZPC-5IN_img2.jpg",
      "https://cdn.abuzz.store/products/AZPC-5IN_img3.jpg",
      "https://cdn.abuzz.store/products/AZPC-5IN_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 18
  },
  {
    "id": "AZ10X11TBS",
    "title": "LXMI 10X11 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 10X11 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ10X11TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ10X11TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ10X11TBS_img1.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 19
  },
  {
    "id": "AZ12X13TBS",
    "title": "LXMI 12X13 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12X13 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ12X13TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ12X13TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ12X13TBS_img1.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 20
  },
  {
    "id": "AZ14X15TBS",
    "title": "LXMI 14X15 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 389,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 14X15 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ14X15TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ14X15TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ14X15TBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ14X15TBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ14X15TBS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ14X15TBS_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 21
  },
  {
    "id": "AZ16X17TBS",
    "title": "LXMI 16X17 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 16X17 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ16X17TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ16X17TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ16X17TBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ16X17TBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ16X17TBS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ16X17TBS_img4.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 22
  },
  {
    "id": "AZ18X19TBS",
    "title": "LXMI 18X19 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 18X19 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ18X19TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ18X19TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ18X19TBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ18X19TBS_img2.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 23
  },
  {
    "id": "AZ20X22TBS",
    "title": "LXMI 20X22 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 20X22 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ20X22TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ20X22TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ20X22TBS_img1.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 24
  },
  {
    "id": "AZ21X23TBS",
    "title": "LXMI 21X23 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 21X23 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ21X23TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ21X23TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ21X23TBS_img1.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 25
  },
  {
    "id": "AZ8X9TBS",
    "title": "LXMI 8X9 Steel Tubular Box Spanner Double Sided Box End Wrench",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 8X9 Steel Tubular Box Spanner Double Sided Box End Wrench. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ8X9TBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ8X9TBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ8X9TBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ8X9TBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ8X9TBS_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 26
  },
  {
    "id": "AZDT-B-P6",
    "title": "LXMI Heavy Duty Black Duct Tape - 6 Roll Multi Pack Industrial Lot – 25 m x 2 inch Wide – Large Bulk Value Pack of Black Original Extra Strength, No Residue, All Weather. Tear by Hand",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty Black Duct Tape - 6 Roll Multi Pack Industrial Lot – 25 m x 2 inch Wide – Large Bulk Value Pack of Black Original Extra Strength, No Residue, All Weather. Tear by Hand. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDT-B-P6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDT-B-P6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDT-B-P6_img1.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img2.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img3.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img4.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img5.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img6.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img7.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img8.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img9.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img10.jpg",
      "https://cdn.abuzz.store/products/AZDT-B-P6_img11.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 27
  },
  {
    "id": "AZDT-G-P6",
    "title": "LXMI Heavy Duty Silver Duct Tape - 6 Roll Multi Pack Industrial Lot – 25 m x 2 inch Wide – Large Bulk Value Pack of Grey Original Extra Strength, No Residue, All Weather. Tear by Hand",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty Silver Duct Tape - 6 Roll Multi Pack Industrial Lot – 25 m x 2 inch Wide – Large Bulk Value Pack of Grey Original Extra Strength, No Residue, All Weather. Tear by Hand. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDT-G-P6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDT-G-P6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDT-G-P6_img1.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img2.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img3.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img4.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img5.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img6.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img7.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img8.jpg",
      "https://cdn.abuzz.store/products/AZDT-G-P6_img9.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 28
  },
  {
    "id": "AZPP-8in",
    "title": "LXMI Hand Tools, Tower Pincer Plier, Multifunction Carpenter Pincer, Carpenter Cobbler Pincer Tools Plier For Home Industrial Tools Nickel Finish Home Tools Combination Plier (8 Inch)",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Hand Tools, Tower Pincer Plier, Multifunction Carpenter Pincer, Carpenter Cobbler Pincer Tools Plier For Home Industrial Tools Nickel Finish Home Tools Combination Plier (8 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPP-8in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPP-8in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPP-8in_img1.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img2.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img3.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img4.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img5.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img6.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img7.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img8.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img9.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img10.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img11.jpg",
      "https://cdn.abuzz.store/products/AZPP-8in_img12.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 29
  },
  {
    "id": "AZPW-10in",
    "title": "LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (10 Inch)(250mm)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 439,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (10 Inch)(250mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPW-10in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPW-10in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPW-10in_img1.jpg",
      "https://cdn.abuzz.store/products/AZPW-10in_img2.jpg",
      "https://cdn.abuzz.store/products/AZPW-10in_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 30
  },
  {
    "id": "AZPW-12in",
    "title": "LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (12 Inch)(300mm)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 469,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (12 Inch)(300mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPW-12in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPW-12in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPW-12in_img1.jpg",
      "https://cdn.abuzz.store/products/AZPW-12in_img2.jpg",
      "https://cdn.abuzz.store/products/AZPW-12in_img3.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 31
  },
  {
    "id": "AZPW-14in",
    "title": "LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (14 Inch)(350mm)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (14 Inch)(350mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPW-14in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPW-14in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPW-14in_img1.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img2.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img3.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img4.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img5.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img6.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img7.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img8.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img9.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img10.jpg",
      "https://cdn.abuzz.store/products/AZPW-14in_img11.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 32
  },
  {
    "id": "AZPW-18in",
    "title": "LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (18 Inch)(450mm)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 699,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (18 Inch)(450mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPW-18in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPW-18in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPW-18in_img1.jpg",
      "https://cdn.abuzz.store/products/AZPW-18in_img2.jpg",
      "https://cdn.abuzz.store/products/AZPW-18in_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 33
  },
  {
    "id": "AZTS-10In",
    "title": "LXMI Try Square Carbon Steel Angle Cut Trysquare (10 Inch 250mm, Carpenter - With Marked Scale)",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Try Square Carbon Steel Angle Cut Trysquare (10 Inch 250mm, Carpenter - With Marked Scale). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTS-10In",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTS-10In_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTS-10In_img1.jpg",
      "https://cdn.abuzz.store/products/AZTS-10In_img2.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 34
  },
  {
    "id": "AZTS-12In",
    "title": "LXMI Try Square Carbon Steel Angle Cut Trysquare (12 Inch 300mm, Carpenter - With Marked Scale)",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Try Square Carbon Steel Angle Cut Trysquare (12 Inch 300mm, Carpenter - With Marked Scale). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTS-12In",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTS-12In_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTS-12In_img1.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img2.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img3.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img4.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img5.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img6.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img7.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img8.jpg",
      "https://cdn.abuzz.store/products/AZTS-12In_img9.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 35
  },
  {
    "id": "AZTS-6In",
    "title": "LXMI Try Square Carbon Steel Angle Cut Trysquare (6 Inch 150mm, Carpenter - With Marked Scale)",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Try Square Carbon Steel Angle Cut Trysquare (6 Inch 150mm, Carpenter - With Marked Scale). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTS-6In",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTS-6In_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTS-6In_img1.jpg",
      "https://cdn.abuzz.store/products/AZTS-6In_img2.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 36
  },
  {
    "id": "AZWB-P",
    "title": "LXMI Plastic Handle Steel Wire Scratch Brush for Cleaning Welding Slag, Rust and Outdoor Grills Multipurpose Hand Brush DIY Metal Cleaner Scourer Rust Paint Removing Tool",
    "category": "Electrical Infrastructure",
    "subcategory": "Wiring & Containment",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Plastic Handle Steel Wire Scratch Brush for Cleaning Welding Slag, Rust and Outdoor Grills Multipurpose Hand Brush DIY Metal Cleaner Scourer Rust Paint Removing Tool. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWB-P",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8544",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWB-P_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWB-P_img1.jpg",
      "https://cdn.abuzz.store/products/AZWB-P_img2.jpg",
      "https://cdn.abuzz.store/products/AZWB-P_img3.jpg",
      "https://cdn.abuzz.store/products/AZWB-P_img4.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 37
  },
  {
    "id": "AZWB-W",
    "title": "LXMI Wood Handle Steel Wire Scratch Brush for Cleaning Welding Slag, Rust and Outdoor Grills Multipurpose Hand Brush DIY Metal Cleaner Scourer Rust Paint Removing Tool",
    "category": "Electrical Infrastructure",
    "subcategory": "Wiring & Containment",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Wood Handle Steel Wire Scratch Brush for Cleaning Welding Slag, Rust and Outdoor Grills Multipurpose Hand Brush DIY Metal Cleaner Scourer Rust Paint Removing Tool. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWB-W",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8544",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWB-W_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWB-W_img1.jpg",
      "https://cdn.abuzz.store/products/AZWB-W_img2.jpg",
      "https://cdn.abuzz.store/products/AZWB-W_img3.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 38
  },
  {
    "id": "AZHDM",
    "title": "Heavy Duty Hand Drill Machine with 1/4\" Chuck for Professional & Home Use Multipurpose for Drilling",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Heavy Duty Hand Drill Machine with 1/4\" Chuck for Professional & Home Use Multipurpose for Drilling. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDM_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img5.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img6.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img7.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img8.jpg",
      "https://cdn.abuzz.store/products/AZHDM_img9.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 39
  },
  {
    "id": "AZSGD-P12",
    "title": "LXMI Cotton Polyester String Knit Shell Safety Protection Work Gloves for Painter Mechanic Industrial Warehouse Gardening Construction Men & Women 12 Pairs, With one Side Dots, L Size",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Cotton Polyester String Knit Shell Safety Protection Work Gloves for Painter Mechanic Industrial Warehouse Gardening Construction Men & Women 12 Pairs, With one Side Dots, L Size. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSGD-P12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSGD-P12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSGD-P12_img1.jpg",
      "https://cdn.abuzz.store/products/AZSGD-P12_img2.jpg",
      "https://cdn.abuzz.store/products/AZSGD-P12_img3.jpg",
      "https://cdn.abuzz.store/products/AZSGD-P12_img4.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 40,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZGGSP36",
    "title": "Hot Glue Sticks 36 Pcs Full Size Clear for Big Hot Glue Guns 6\" Long 0.43\" Diameter",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Hot Glue Sticks 36 Pcs Full Size Clear for Big Hot Glue Guns 6\" Long 0.43\" Diameter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGGSP36",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGGSP36_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGGSP36_img1.jpg",
      "https://cdn.abuzz.store/products/AZGGSP36_img2.jpg",
      "https://cdn.abuzz.store/products/AZGGSP36_img3.jpg",
      "https://cdn.abuzz.store/products/AZGGSP36_img4.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 41
  },
  {
    "id": "AZYHGG60",
    "title": "60 Watt Hot Melt Glue Gun with On/Off Switch Heavy Duty High Temp Glue Gun Kit for DIY Art and Craft Projects(11 mm)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 60 Watt Hot Melt Glue Gun with On/Off Switch Heavy Duty High Temp Glue Gun Kit for DIY Art and Craft Projects(11 mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZYHGG60",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZYHGG60_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZYHGG60_img1.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img2.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img3.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img4.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img5.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img6.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img7.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img8.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img9.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img10.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img11.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img12.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img13.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img14.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60_img15.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 42
  },
  {
    "id": "AZYHGG60P5",
    "title": "60 Watt Hot Melt Glue Gun with On/Off Switch Includes 5 Transparent Glue Sticks Heavy Duty High Temp Glue Gun Kit for DIY Art and Craft Projects(11 mm)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 60 Watt Hot Melt Glue Gun with On/Off Switch Includes 5 Transparent Glue Sticks Heavy Duty High Temp Glue Gun Kit for DIY Art and Craft Projects(11 mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZYHGG60P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZYHGG60P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZYHGG60P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img2.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img3.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img4.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img5.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img6.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img7.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img8.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img9.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img10.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img11.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img12.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img13.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img14.jpg",
      "https://cdn.abuzz.store/products/AZYHGG60P5_img15.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 43
  },
  {
    "id": "AZBHGG40",
    "title": "40 Watt Hot Melt Glue Gun for DIY Art and Craft Projects(11 mm)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 40 Watt Hot Melt Glue Gun for DIY Art and Craft Projects(11 mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBHGG40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBHGG40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBHGG40_img1.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img2.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img3.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img4.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img5.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img6.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img7.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img8.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40_img9.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 44
  },
  {
    "id": "AZBHGG40S6",
    "title": "40 Watt Hot Melt Glue Gun Includes cutter & 6 Transparent Glue Sticks(11 mm)",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial 40 Watt Hot Melt Glue Gun Includes cutter & 6 Transparent Glue Sticks(11 mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBHGG40S6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBHGG40S6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBHGG40S6_img1.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img2.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img3.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img4.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img5.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img6.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img7.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img8.jpg",
      "https://cdn.abuzz.store/products/AZBHGG40S6_img9.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 45
  },
  {
    "id": "AZSLGT",
    "title": "Stone SINGLE FLINT SPARK LIGHTER SUITABLE FOR LIGHTING GAS TORCHES",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Stone SINGLE FLINT SPARK LIGHTER SUITABLE FOR LIGHTING GAS TORCHES. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSLGT",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSLGT_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSLGT_img1.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img2.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img3.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img4.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img5.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img6.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img7.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img8.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img9.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img10.jpg",
      "https://cdn.abuzz.store/products/AZSLGT_img11.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 46
  },
  {
    "id": "AZORFG144",
    "title": "White orange Rubber Latex Finger Sleeve {pack of 144}",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial White orange Rubber Latex Finger Sleeve {pack of 144}. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZORFG144",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZORFG144_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZORFG144_img1.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img2.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img3.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img4.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img5.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img6.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img7.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img8.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img9.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img10.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img11.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img12.jpg",
      "https://cdn.abuzz.store/products/AZORFG144_img13.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 47
  },
  {
    "id": "AZTCP",
    "title": "Tile Cutter Silver Color Snapper Pencil/Pen Made of Solid Metal bar with Brass Brazing Carbide Tipped Sharp/Ceramic Floor or Wall Tile Scorer Cutter",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Tile Cutter Silver Color Snapper Pencil/Pen Made of Solid Metal bar with Brass Brazing Carbide Tipped Sharp/Ceramic Floor or Wall Tile Scorer Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTCP",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTCP_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTCP_img1.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img2.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img3.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img4.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img5.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img6.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img7.jpg",
      "https://cdn.abuzz.store/products/AZTCP_img8.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 48
  },
  {
    "id": "AZJBH-10",
    "title": "LXMI Alloy Steel Jumper Holder with Bit 10 inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Alloy Steel Jumper Holder with Bit 10 inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJBH-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJBH-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJBH-10_img1.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 49
  },
  {
    "id": "AZJBH-8",
    "title": "LXMI Alloy Steel Jumper Holder with Bit 8 inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Alloy Steel Jumper Holder with Bit 8 inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJBH-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJBH-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJBH-8_img1.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 50
  },
  {
    "id": "AZJNX-F",
    "title": "LXMI Female Incustrial Socket With IP67 Waterproof rating",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Female Incustrial Socket With IP67 Waterproof rating. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNX-F",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNX-F_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNX-F_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNX-F_img2.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 51
  },
  {
    "id": "AZJNX-M",
    "title": "LXMI Male Incustrial Socket With IP67 Waterproof rating",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Male Incustrial Socket With IP67 Waterproof rating. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNX-M",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNX-M_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNX-M_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNX-M_img2.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 52
  },
  {
    "id": "AZJNX-MF",
    "title": "LXMI Male & Female Incustrial Socket With IP67 Waterproof rating",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Male & Female Incustrial Socket With IP67 Waterproof rating. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJNX-MF",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJNX-MF_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJNX-MF_img1.jpg",
      "https://cdn.abuzz.store/products/AZJNX-MF_img2.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 53
  },
  {
    "id": "AZTC-10",
    "title": "LXMI Dropped Forged Metal TIN Cutter 10 inch",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Dropped Forged Metal TIN Cutter 10 inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTC-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTC-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTC-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZTC-10_img2.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 54
  },
  {
    "id": "AZWH600A",
    "title": "LXMI Electrode Welding Holder Heavy Duty Fully Insulated 600 AMPS One-handed Clamp",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Electrode Welding Holder Heavy Duty Fully Insulated 600 AMPS One-handed Clamp. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWH600A",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWH600A_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWH600A_img1.jpg",
      "https://cdn.abuzz.store/products/AZWH600A_img2.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 55
  },
  {
    "id": "AZZC110",
    "title": "LXMI High Grade 4 inch(110mm) Zero Chipping Diamond Saw Blade Tile-Marble-Metal Cutter blade",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI High Grade 4 inch(110mm) Zero Chipping Diamond Saw Blade Tile-Marble-Metal Cutter blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZZC110",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZZC110_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZZC110_img1.jpg",
      "https://cdn.abuzz.store/products/AZZC110_img2.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 56
  },
  {
    "id": "AZMCH6NO53P200",
    "title": "53mm 6no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 200)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial 53mm 6no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 200). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCH6NO53P200",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 57
  },
  {
    "id": "AZMCH8NO64P200",
    "title": "64mm 8no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 200)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 64mm 8no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 200). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCH8NO64P200",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCH8NO64P200_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCH8NO64P200_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCH8NO64P200_img2.jpg",
      "https://cdn.abuzz.store/products/AZMCH8NO64P200_img3.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 58
  },
  {
    "id": "AZMCH10NO70P100",
    "title": "70mm 10no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 70mm 10no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCH10NO70P100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMCH10NO70P100_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMCH10NO70P100_img1.jpg",
      "https://cdn.abuzz.store/products/AZMCH10NO70P100_img2.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 59
  },
  {
    "id": "AZMCH12NO72P100",
    "title": "72mm 12no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 469,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 72mm 12no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCH12NO72P100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 60
  },
  {
    "id": "AZMCH14NO82P100",
    "title": "82mm 14no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 82mm 14no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCH14NO82P100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 61
  },
  {
    "id": "AZMCH16NO95P100",
    "title": "95mm 16no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 95mm 16no Metal Cup Ceiling Hooks for Curtain, Arts & Jewelry Hooks (pack of 100). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMCH16NO95P100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 62
  },
  {
    "id": "AZCMSS(T+AB)",
    "title": "LXMI CM4 Cutter Machine L Bolt Spanner 'T' & AB Washer Flat Spanner Set (T&Pana Set)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI CM4 Cutter Machine L Bolt Spanner 'T' & AB Washer Flat Spanner Set (T&Pana Set). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMSS(T+AB)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMSS_T_AB__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMSS_T_AB__img1.jpg",
      "https://cdn.abuzz.store/products/AZCMSS_T_AB__img2.jpg",
      "https://cdn.abuzz.store/products/AZCMSS_T_AB__img3.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 63
  },
  {
    "id": "AZCMWS(A+B)",
    "title": "LXMI Cutter Machine 4 AB WASHER SET CM 4 A+B Washer",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Cutter Machine 4 AB WASHER SET CM 4 A+B Washer. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMWS(A+B)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMWS_A_B__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMWS_A_B__img1.jpg",
      "https://cdn.abuzz.store/products/AZCMWS_A_B__img2.jpg",
      "https://cdn.abuzz.store/products/AZCMWS_A_B__img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 64
  },
  {
    "id": "AZET-P30",
    "title": "LXMI Self Adhesive PVC Electrical Insulation Tape 18mm X 8m X 0.125mm (Pack of 30)",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Self Adhesive PVC Electrical Insulation Tape 18mm X 8m X 0.125mm (Pack of 30). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZET-P30",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZET-P30_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZET-P30_img1.jpg",
      "https://cdn.abuzz.store/products/AZET-P30_img2.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 65
  },
  {
    "id": "AZGMS",
    "title": "LXMI Metal Adjustable Angle Grinder Key Wrench Pin Spanner Nuts Tool Single Sided Speciality",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Metal Adjustable Angle Grinder Key Wrench Pin Spanner Nuts Tool Single Sided Speciality. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGMS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGMS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGMS_img1.jpg",
      "https://cdn.abuzz.store/products/AZGMS_img2.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 66
  },
  {
    "id": "AZGMWS(A+B)",
    "title": "LXMI 4 Inch 6-100 Angle Grinder AB Washer Set. (Pack of 2 Sets) 10mm Thread Size Wich is Compatible Also For DW801 4 Inch Angle Grinder Machines",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 Inch 6-100 Angle Grinder AB Washer Set. (Pack of 2 Sets) 10mm Thread Size Wich is Compatible Also For DW801 4 Inch Angle Grinder Machines. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGMWS(A+B)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGMWS_A_B__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGMWS_A_B__img1.jpg",
      "https://cdn.abuzz.store/products/AZGMWS_A_B__img2.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 67
  },
  {
    "id": "AZHR16in(400mm)",
    "title": "LXMI High Quality 16inch (400mm) Hand Riveter Tool",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI High Quality 16inch (400mm) Hand Riveter Tool. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHR16in(400mm)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHR16in_400mm__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHR16in_400mm__img1.jpg",
      "https://cdn.abuzz.store/products/AZHR16in_400mm__img2.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 68
  },
  {
    "id": "AZJHF-6in",
    "title": "Junior Hacksaw Frame, 6inch",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Junior Hacksaw Frame, 6inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZJHF-6in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZJHF-6in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZJHF-6in_img1.jpg",
      "https://cdn.abuzz.store/products/AZJHF-6in_img2.jpg",
      "https://cdn.abuzz.store/products/AZJHF-6in_img3.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 69
  },
  {
    "id": "AZPVC-4-P10",
    "title": "LXMI 4inch PVC DISC PLASTIC BACKING PADPVC PAD With more Flexibility. 10 Pcs Packing Set",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch PVC DISC PLASTIC BACKING PADPVC PAD With more Flexibility. 10 Pcs Packing Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPVC-4-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPVC-4-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPVC-4-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZPVC-4-P10_img2.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 70
  },
  {
    "id": "AZPVC-5-P10",
    "title": "LXMI 5inch PVC DISC PLASTIC BACKING PADPVC PAD With more Flexibility. 10 Pcs Packing Set",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 5inch PVC DISC PLASTIC BACKING PADPVC PAD With more Flexibility. 10 Pcs Packing Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPVC-5-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPVC-5-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPVC-5-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZPVC-5-P10_img2.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 71
  },
  {
    "id": "AZRP-3X85",
    "title": "LXMI 35mm Wall Plug with Screw - 35X8 (1.5 inches) - Combo of Screw and Gitti for Easy Wall Hanging (1250 Pieces)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 35mm Wall Plug with Screw - 35X8 (1.5 inches) - Combo of Screw and Gitti for Easy Wall Hanging (1250 Pieces). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRP-3X85",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRP-3X85_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRP-3X85_img1.jpg",
      "https://cdn.abuzz.store/products/AZRP-3X85_img2.jpg",
      "https://cdn.abuzz.store/products/AZRP-3X85_img3.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 72
  },
  {
    "id": "AZSC-P2",
    "title": "LXMI PVC Cutter Acrelic Cutter Board Cutter Sunmica Cutter with Sharp Edge Pack of 2",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI PVC Cutter Acrelic Cutter Board Cutter Sunmica Cutter with Sharp Edge Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSC-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSC-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSC-P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZSC-P2_img2.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 73
  },
  {
    "id": "AZWC-12",
    "title": "LXMI 12mm Forged Steel Polypropylene Handle Wood Chisel",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12mm Forged Steel Polypropylene Handle Wood Chisel. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWC-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWC-12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWC-12_img1.jpg",
      "https://cdn.abuzz.store/products/AZWC-12_img2.jpg",
      "https://cdn.abuzz.store/products/AZWC-12_img3.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 74
  },
  {
    "id": "AZWC-20",
    "title": "LXMI 20mm Forged Steel Polypropylene Handle Wood Chisel",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 20mm Forged Steel Polypropylene Handle Wood Chisel. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWC-20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWC-20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWC-20_img1.jpg",
      "https://cdn.abuzz.store/products/AZWC-20_img2.jpg",
      "https://cdn.abuzz.store/products/AZWC-20_img3.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 75
  },
  {
    "id": "AZWC-32",
    "title": "LXMI 32mm Forged Steel Polypropylene Handle Wood Chisel",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 32mm Forged Steel Polypropylene Handle Wood Chisel. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWC-32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWC-32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWC-32_img1.jpg",
      "https://cdn.abuzz.store/products/AZWC-32_img2.jpg",
      "https://cdn.abuzz.store/products/AZWC-32_img3.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 76
  },
  {
    "id": "AZWC-38",
    "title": "LXMI 38mm Forged Steel Polypropylene Handle Wood Chisel",
    "category": "Hand Tools",
    "subcategory": "Masonry & Woodworking Tools",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 38mm Forged Steel Polypropylene Handle Wood Chisel. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWC-38",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWC-38_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWC-38_img1.jpg",
      "https://cdn.abuzz.store/products/AZWC-38_img2.jpg",
      "https://cdn.abuzz.store/products/AZWC-38_img3.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 77
  },
  {
    "id": "AZWHF(L)-12in",
    "title": "LXMI 12inch (300mm) Wooden Handle HACKSAW FRAME",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12inch (300mm) Wooden Handle HACKSAW FRAME. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF(L)-12in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF_L_-12in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF_L_-12in_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF_L_-12in_img2.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 78
  },
  {
    "id": "AZGTKPAG",
    "title": "Heavy Duty Gardening Tools Kit Kudal , Garden Pick Axe/Grub Axe Double",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Heavy Duty Gardening Tools Kit Kudal , Garden Pick Axe/Grub Axe Double. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGTKPAG",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGTKPAG_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGTKPAG_img1.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img2.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img3.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img4.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img5.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img6.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img7.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img8.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img9.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img10.jpg",
      "https://cdn.abuzz.store/products/AZGTKPAG_img11.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 79
  },
  {
    "id": "AZHDHWSP",
    "title": "Heavy Duty Gardening Garden Hoe with Single Prong Ergonomic Handle with Hang-up Hole",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Heavy Duty Gardening Garden Hoe with Single Prong Ergonomic Handle with Hang-up Hole. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDHWSP",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDHWSP_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDHWSP_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDHWSP_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDHWSP_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDHWSP_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDHWSP_img5.jpg",
      "https://cdn.abuzz.store/products/AZHDHWSP_img6.jpg",
      "https://cdn.abuzz.store/products/AZHDHWSP_img7.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 80
  },
  {
    "id": "AZHDH",
    "title": "Heavy Duty Gardening Garden Hoe Ergonomic Handle with Hang-up Hole",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Heavy Duty Gardening Garden Hoe Ergonomic Handle with Hang-up Hole. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDH",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDH_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDH_img1.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 81
  },
  {
    "id": "AZHDHW3P",
    "title": "Heavy Duty Gardening Garden Hoe With 3 Prong Ergonomic Handle with Hang-up Hole",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Heavy Duty Gardening Garden Hoe With 3 Prong Ergonomic Handle with Hang-up Hole. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDHW3P",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDHW3P_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDHW3P_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img5.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img6.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img7.jpg",
      "https://cdn.abuzz.store/products/AZHDHW3P_img8.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 82
  },
  {
    "id": "AZHDR6T",
    "title": "Heavy Duty Gardening Garden Rake 6 teeth Ergonomic Handle with Hang-up Hole",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Heavy Duty Gardening Garden Rake 6 teeth Ergonomic Handle with Hang-up Hole. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDR6T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDR6T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDR6T_img1.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img2.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img3.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img4.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img5.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img6.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img7.jpg",
      "https://cdn.abuzz.store/products/AZHDR6T_img8.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 83
  },
  {
    "id": "AZFB-1_1.2X1_1.2",
    "title": "LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 45 x 45 mm (1 1/2 X 1 1/2) (Pack of 24)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 45 x 45 mm (1 1/2 X 1 1/2) (Pack of 24). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFB-1_1.2X1_1.2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFB-1_1_2X1_1_2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFB-1_1_2X1_1_2_img1.jpg",
      "https://cdn.abuzz.store/products/AZFB-1_1_2X1_1_2_img2.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 84
  },
  {
    "id": "AZFB-1X2",
    "title": "LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 30 x 60 mm (1 X 2) (Pack of 36)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 30 x 60 mm (1 X 2) (Pack of 36). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFB-1X2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFB-1X2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFB-1X2_img1.jpg",
      "https://cdn.abuzz.store/products/AZFB-1X2_img2.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 85
  },
  {
    "id": "AZFB-2X2",
    "title": "LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 60 x 60 mm (2 X 2) (Pack of 12)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 60 x 60 mm (2 X 2) (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFB-2X2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFB-2X2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFB-2X2_img1.jpg",
      "https://cdn.abuzz.store/products/AZFB-2X2_img2.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 86
  },
  {
    "id": "AZFB-3.4X3.4",
    "title": "LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 30 x 30 mm (3/4 X 3/4) (Pack of 36)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Floor Protector Square Rubber CapBush for Furniture Chair Table 30 x 30 mm (3/4 X 3/4) (Pack of 36). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFB-3.4X3.4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFB-3_4X3_4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFB-3_4X3_4_img1.jpg",
      "https://cdn.abuzz.store/products/AZFB-3_4X3_4_img2.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 87
  },
  {
    "id": "AZWLT2_50",
    "title": "LXMI 2 inch*5 mtr Leakage Repair Waterproof Tape for Pipe Leakage Solution Tape for Surface Crack Repairs",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 2 inch*5 mtr Leakage Repair Waterproof Tape for Pipe Leakage Solution Tape for Surface Crack Repairs. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWLT2_50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWLT2_50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWLT2_50_img1.jpg",
      "https://cdn.abuzz.store/products/AZWLT2_50_img2.jpg",
      "https://cdn.abuzz.store/products/AZWLT2_50_img3.jpg",
      "https://cdn.abuzz.store/products/AZWLT2_50_img4.jpg",
      "https://cdn.abuzz.store/products/AZWLT2_50_img5.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 88
  },
  {
    "id": "AZPVCPBCp12",
    "title": "PVC Pan Bib Cock , For Bathroom and Kitchen, Size: 15 mm (Pack of 12)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Pan Bib Cock , For Bathroom and Kitchen, Size: 15 mm (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPVCPBCp12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPVCPBCp12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPVCPBCp12_img1.jpg",
      "https://cdn.abuzz.store/products/AZPVCPBCp12_img2.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 89
  },
  {
    "id": "AZPVCREDTp12",
    "title": "PVC Red Bib Cock , For Bathroom and Kitchen, Size: 15mm (Pack of 12)",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial PVC Red Bib Cock , For Bathroom and Kitchen, Size: 15mm (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPVCREDTp12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPVCREDTp12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPVCREDTp12_img1.jpg",
      "https://cdn.abuzz.store/products/AZPVCREDTp12_img2.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 90
  },
  {
    "id": "AZHRG9.5",
    "title": "9.5inch (240mm) Hand Riveter 2.4mm, 3.2mm, 4.0mm, 4.8mm Rivet Gun",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 9.5inch (240mm) Hand Riveter 2.4mm, 3.2mm, 4.0mm, 4.8mm Rivet Gun. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHRG9.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHRG9_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHRG9_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZHRG9_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZHRG9_5_img3.jpg",
      "https://cdn.abuzz.store/products/AZHRG9_5_img4.jpg",
      "https://cdn.abuzz.store/products/AZHRG9_5_img5.jpg",
      "https://cdn.abuzz.store/products/AZHRG9_5_img6.jpg",
      "https://cdn.abuzz.store/products/AZHRG9_5_img7.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 91
  },
  {
    "id": "AZDOGC4no",
    "title": "Silver Grind No.4 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Silver Grind No.4 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOGC4no",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOGC4no_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOGC4no_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOGC4no_img2.jpg",
      "https://cdn.abuzz.store/products/AZDOGC4no_img3.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 92
  },
  {
    "id": "AZDOGC6no",
    "title": "Silver Grind No.6 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial Silver Grind No.6 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOGC6no",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOGC6no_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOGC6no_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOGC6no_img2.jpg",
      "https://cdn.abuzz.store/products/AZDOGC6no_img3.jpg",
      "https://cdn.abuzz.store/products/AZDOGC6no_img4.jpg",
      "https://cdn.abuzz.store/products/AZDOGC6no_img5.jpg",
      "https://cdn.abuzz.store/products/AZDOGC6no_img6.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 93
  },
  {
    "id": "AZDOGC8no",
    "title": "Silver Grind No.8 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Silver Grind No.8 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOGC8no",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOGC8no_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOGC8no_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img2.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img3.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img4.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img5.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img6.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img7.jpg",
      "https://cdn.abuzz.store/products/AZDOGC8no_img8.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 94
  },
  {
    "id": "AZDOGC10no",
    "title": "Silver Grind No.10 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 469,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Silver Grind No.10 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOGC10no",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOGC10no_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOGC10no_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOGC10no_img2.jpg",
      "https://cdn.abuzz.store/products/AZDOGC10no_img3.jpg",
      "https://cdn.abuzz.store/products/AZDOGC10no_img4.jpg",
      "https://cdn.abuzz.store/products/AZDOGC10no_img5.jpg",
      "https://cdn.abuzz.store/products/AZDOGC10no_img6.jpg",
      "https://cdn.abuzz.store/products/AZDOGC10no_img7.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 95
  },
  {
    "id": "AZDOGC12no",
    "title": "Silver Grind No.12 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Silver Grind No.12 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOGC12no",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOGC12no_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOGC12no_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOGC12no_img2.jpg",
      "https://cdn.abuzz.store/products/AZDOGC12no_img3.jpg",
      "https://cdn.abuzz.store/products/AZDOGC12no_img4.jpg",
      "https://cdn.abuzz.store/products/AZDOGC12no_img5.jpg",
      "https://cdn.abuzz.store/products/AZDOGC12no_img6.jpg",
      "https://cdn.abuzz.store/products/AZDOGC12no_img7.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 96
  },
  {
    "id": "AZDOGC14no",
    "title": "Silver Grind No.14 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Silver Grind No.14 Dogs Leash Heavy Duty Dog Chain with Heavy Hook (L - 60 Inch). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZDOGC14no",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZDOGC14no_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZDOGC14no_img1.jpg",
      "https://cdn.abuzz.store/products/AZDOGC14no_img2.jpg",
      "https://cdn.abuzz.store/products/AZDOGC14no_img3.jpg",
      "https://cdn.abuzz.store/products/AZDOGC14no_img4.jpg",
      "https://cdn.abuzz.store/products/AZDOGC14no_img5.jpg",
      "https://cdn.abuzz.store/products/AZDOGC14no_img6.jpg",
      "https://cdn.abuzz.store/products/AZDOGC14no_img7.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 97
  },
  {
    "id": "AZ(STB)AK-10PC",
    "title": "LXMI STB Hex allen key set of 10pcs black 1.5mm to 10mm Pack of 10",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI STB Hex allen key set of 10pcs black 1.5mm to 10mm Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ(STB)AK-10PC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ_STB_AK-10PC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ_STB_AK-10PC_img1.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 98
  },
  {
    "id": "AZ(STB)AK-9(B)",
    "title": "LXMI STB 1.50 to 10 mm Short Allen Key Set of 9pcs Set Box Packing",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI STB 1.50 to 10 mm Short Allen Key Set of 9pcs Set Box Packing. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ(STB)AK-9(B)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ_STB_AK-9_B__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ_STB_AK-9_B__img1.jpg",
      "https://cdn.abuzz.store/products/AZ_STB_AK-9_B__img2.jpg",
      "https://cdn.abuzz.store/products/AZ_STB_AK-9_B__img3.jpg",
      "https://cdn.abuzz.store/products/AZ_STB_AK-9_B__img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 99
  },
  {
    "id": "AZGC-12",
    "title": "LXMI Heavy Duty 12 Inch Manual Sickle with Fibre Handle",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty 12 Inch Manual Sickle with Fibre Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZGC-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZGC-12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZGC-12_img1.jpg",
      "https://cdn.abuzz.store/products/AZGC-12_img2.jpg",
      "https://cdn.abuzz.store/products/AZGC-12_img3.jpg",
      "https://cdn.abuzz.store/products/AZGC-12_img4.jpg",
      "https://cdn.abuzz.store/products/AZGC-12_img5.jpg",
      "https://cdn.abuzz.store/products/AZGC-12_img6.jpg",
      "https://cdn.abuzz.store/products/AZGC-12_img7.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 100
  },
  {
    "id": "AZPMR-P1",
    "title": "LXMI Heavy Duty Putty Mixing Rod Pack of 1",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty Putty Mixing Rod Pack of 1. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMR-P1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 101
  },
  {
    "id": "AZPMR-P2",
    "title": "LXMI Heavy Duty Putty Mixing Rod Pack of 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Heavy Duty Putty Mixing Rod Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPMR-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPMR-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPMR-P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZPMR-P2_img2.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 102
  },
  {
    "id": "AZPW-24in",
    "title": "LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (24 Inch)(600mm)",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Pipe Wrench, Stilson Type Pipe Wrenches, Pipe Wrench for Plumbing (24 Inch)(600mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPW-24in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPW-24in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPW-24in_img1.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img2.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img3.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img4.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img5.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img6.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img7.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img8.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img9.jpg",
      "https://cdn.abuzz.store/products/AZPW-24in_img10.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 103
  },
  {
    "id": "AZRTB-6PCS",
    "title": "LXMI Premium Router Trimmer Bit Specially Designed for Wood Working (6pc Router trimmer bit 6.35mm)",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Premium Router Trimmer Bit Specially Designed for Wood Working (6pc Router trimmer bit 6.35mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRTB-6PCS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRTB-6PCS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRTB-6PCS_img1.jpg",
      "https://cdn.abuzz.store/products/AZRTB-6PCS_img2.jpg",
      "https://cdn.abuzz.store/products/AZRTB-6PCS_img3.jpg",
      "https://cdn.abuzz.store/products/AZRTB-6PCS_img4.jpg",
      "https://cdn.abuzz.store/products/AZRTB-6PCS_img5.jpg",
      "https://cdn.abuzz.store/products/AZRTB-6PCS_img6.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 104
  },
  {
    "id": "AZSC-10",
    "title": "LXMI 10inch Straight Nose Aviation Tinman Snippers 255 mm",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 10inch Straight Nose Aviation Tinman Snippers 255 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSC-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSC-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSC-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZSC-10_img2.jpg",
      "https://cdn.abuzz.store/products/AZSC-10_img3.jpg",
      "https://cdn.abuzz.store/products/AZSC-10_img4.jpg",
      "https://cdn.abuzz.store/products/AZSC-10_img5.jpg",
      "https://cdn.abuzz.store/products/AZSC-10_img6.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 105
  },
  {
    "id": "AZSHDB12-60",
    "title": "LXMI Steel (12 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Steel (12 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB12-60",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB12-60_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB12-60_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB12-60_img2.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 106
  },
  {
    "id": "AZSHDB16-60",
    "title": "LXMI Steel (16 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Steel (16 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB16-60",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB16-60_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB16-60_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB16-60_img2.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 107
  },
  {
    "id": "AZSHDB18-60",
    "title": "LXMI Steel (18 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Steel (18 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB18-60",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB18-60_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB18-60_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB18-60_img2.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 108
  },
  {
    "id": "AZSHDB25-60",
    "title": "LXMI Steel (25 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Steel (25 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB25-60",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB25-60_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB25-60_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB25-60_img2.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 109
  },
  {
    "id": "AZWHF(H)-12in",
    "title": "LXMI 12inch (300mm) Heavy Duty Hacksaw Frame With Wooden Handle",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12inch (300mm) Heavy Duty Hacksaw Frame With Wooden Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF(H)-12in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF_H_-12in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF_H_-12in_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF_H_-12in_img2.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 110
  },
  {
    "id": "AZWHF(M)-12in",
    "title": "LXMI 12inch (300mm) Hacksaw Frame With Wooden Handle (M)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12inch (300mm) Hacksaw Frame With Wooden Handle (M). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWHF(M)-12in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWHF_M_-12in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWHF_M_-12in_img1.jpg",
      "https://cdn.abuzz.store/products/AZWHF_M_-12in_img2.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 111
  },
  {
    "id": "AZYRHG-P5",
    "title": "LXMI Yellow Cleaning Reusable Rubber Hand Gloves for Washing Cleaning Kitchen Garden (5 Pairs)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Yellow Cleaning Reusable Rubber Hand Gloves for Washing Cleaning Kitchen Garden (5 Pairs). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZYRHG-P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZYRHG-P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZYRHG-P5_img1.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 112,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZTC-8in",
    "title": "LXMI Dropped Forged Metal TIN Cutter 8 inch",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Dropped Forged Metal TIN Cutter 8 inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTC-8in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 113
  },
  {
    "id": "AZTC-12in",
    "title": "LXMI Dropped Forged Metal TIN Cutter 12 inch",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Dropped Forged Metal TIN Cutter 12 inch. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTC-12in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 114
  },
  {
    "id": "AZ32PCSWSET",
    "title": "32Pcs 1/2 inch Socket Set - Ratchet Wrench Spanner Tool Goti Pana Set with Carry Box, for Automobiles, Bike, Car Repair Tool Kit",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 2499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 32Pcs 1/2 inch Socket Set - Ratchet Wrench Spanner Tool Goti Pana Set with Carry Box, for Automobiles, Bike, Car Repair Tool Kit. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ32PCSWSET",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 115
  },
  {
    "id": "AZ12PCSWSET",
    "title": "12pcs 1/2 Inch Ratchet Socket Wrench Set, Drive Socket Set with 10 Sockets 10-15,17,19,21,22mm and 2 Way Quick Released Ratchet Handle and Extension Bar",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 12pcs 1/2 Inch Ratchet Socket Wrench Set, Drive Socket Set with 10 Sockets 10-15,17,19,21,22mm and 2 Way Quick Released Ratchet Handle and Extension Bar. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ12PCSWSET",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ12PCSWSET_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ12PCSWSET_img1.jpg",
      "https://cdn.abuzz.store/products/AZ12PCSWSET_img2.jpg",
      "https://cdn.abuzz.store/products/AZ12PCSWSET_img3.jpg",
      "https://cdn.abuzz.store/products/AZ12PCSWSET_img4.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 116
  },
  {
    "id": "AZBW4in-P10",
    "title": "LXMI 4inch Buffing Wheel Non woven Fabric Disc for debarring, cleaning, matt Angle Grinder",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 499,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 4inch Buffing Wheel Non woven Fabric Disc for debarring, cleaning, matt Angle Grinder. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZBW4in-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZBW4in-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZBW4in-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZBW4in-P10_img2.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 117
  },
  {
    "id": "AZCH-WH",
    "title": "LXMI High Quality Durable Construction Metalworking Household Curved Claw Hammer without Handle",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI High Quality Durable Construction Metalworking Household Curved Claw Hammer without Handle. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCH-WH",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCH-WH_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCH-WH_img1.jpg",
      "https://cdn.abuzz.store/products/AZCH-WH_img2.jpg",
      "https://cdn.abuzz.store/products/AZCH-WH_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 118
  },
  {
    "id": "AZCP-6in",
    "title": "LXMI Combination Plier 6 inch Chrome Vanadium Steel, Anti-Slip and Ergonomic Grips",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Combination Plier 6 inch Chrome Vanadium Steel, Anti-Slip and Ergonomic Grips. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCP-6in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCP-6in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCP-6in_img1.jpg",
      "https://cdn.abuzz.store/products/AZCP-6in_img2.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 119
  },
  {
    "id": "AZCP-8in",
    "title": "LXMI Combination Plier 8 inch Chrome Vanadium Steel, Anti-Slip and Ergonomic Grips",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Combination Plier 8 inch Chrome Vanadium Steel, Anti-Slip and Ergonomic Grips. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCP-8in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCP-8in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCP-8in_img1.jpg",
      "https://cdn.abuzz.store/products/AZCP-8in_img2.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 120
  },
  {
    "id": "AZFW4in-P10",
    "title": "LXMI 4inch 10pc Felt Wheel Buffing Pad Disc for Metal Polisher",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch 10pc Felt Wheel Buffing Pad Disc for Metal Polisher. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZFW4in-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZFW4in-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZFW4in-P10_img1.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 121
  },
  {
    "id": "AZNWPW4in-G220-P10",
    "title": "LXMI 4 x 1 Inch Grit 220 Non Woven Polishing Wheel Pack of 10",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 x 1 Inch Grit 220 Non Woven Polishing Wheel Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZNWPW4in-G220-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZNWPW4in-G220-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZNWPW4in-G220-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZNWPW4in-G220-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZNWPW4in-G220-P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZNWPW4in-G220-P10_img4.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 122
  },
  {
    "id": "AZNWPW4in-G320-P10",
    "title": "LXMI 4 x 1 Inch Grit 320 Non Woven Polishing Wheel Pack of 10",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 x 1 Inch Grit 320 Non Woven Polishing Wheel Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZNWPW4in-G320-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZNWPW4in-G320-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZNWPW4in-G320-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZNWPW4in-G320-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZNWPW4in-G320-P10_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 123
  },
  {
    "id": "AZRH-26mm",
    "title": "LXMI 26mm Rotary Hammer Drill with 3 Modes, 800W, Copper Armature, SDS Plus Chuck 26 mm, 900 RPM, with Vibration Control",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 4499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 26mm Rotary Hammer Drill with 3 Modes, 800W, Copper Armature, SDS Plus Chuck 26 mm, 900 RPM, with Vibration Control. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRH-26mm",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRH-26mm_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRH-26mm_img1.jpg",
      "https://cdn.abuzz.store/products/AZRH-26mm_img2.jpg",
      "https://cdn.abuzz.store/products/AZRH-26mm_img3.jpg",
      "https://cdn.abuzz.store/products/AZRH-26mm_img4.jpg",
      "https://cdn.abuzz.store/products/AZRH-26mm_img5.jpg",
      "https://cdn.abuzz.store/products/AZRH-26mm_img6.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 124
  },
  {
    "id": "AZRLB50mm-10m",
    "title": "LXMI Robustt Lashing Belt - Pack of 1 Heavy Duty Ratchet Belt 50mm x 10mtrs Material Double J Hooks Luggage Straps Wear and Tear Resistant",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Robustt Lashing Belt - Pack of 1 Heavy Duty Ratchet Belt 50mm x 10mtrs Material Double J Hooks Luggage Straps Wear and Tear Resistant. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRLB50mm-10m",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRLB50mm-10m_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRLB50mm-10m_img1.jpg",
      "https://cdn.abuzz.store/products/AZRLB50mm-10m_img2.jpg",
      "https://cdn.abuzz.store/products/AZRLB50mm-10m_img3.jpg",
      "https://cdn.abuzz.store/products/AZRLB50mm-10m_img4.jpg",
      "https://cdn.abuzz.store/products/AZRLB50mm-10m_img5.jpg",
      "https://cdn.abuzz.store/products/AZRLB50mm-10m_img6.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 125
  },
  {
    "id": "AZRS(B)-4IN",
    "title": "LXMI 4inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRS(B)-4IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRS_B_-4IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRS_B_-4IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZRS_B_-4IN_img2.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 126
  },
  {
    "id": "AZRS(B)-6IN",
    "title": "LXMI 6inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 369,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRS(B)-6IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRS_B_-6IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRS_B_-6IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZRS_B_-6IN_img2.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 127
  },
  {
    "id": "AZRS(B)-8IN",
    "title": "LXMI 8inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 8inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRS(B)-8IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRS_B_-8IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRS_B_-8IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZRS_B_-8IN_img2.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 128
  },
  {
    "id": "AZRS(B)-10IN",
    "title": "LXMI 10inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves",
    "category": "Hand Tools",
    "subcategory": "Screwdrivers & Bits",
    "price": 409,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 10inch Multitech Reversible Magnetic screwdriver 2 in 1 with sleeves. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZRS(B)-10IN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZRS_B_-10IN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZRS_B_-10IN_img1.jpg",
      "https://cdn.abuzz.store/products/AZRS_B_-10IN_img2.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 129
  },
  {
    "id": "AZTP-P10",
    "title": "LXMI PTFE (Teflon) Seal Tape (12mm × 0.1mm × 12m) Pack of 10 for Plumbing Pipe Seal Tape",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI PTFE (Teflon) Seal Tape (12mm × 0.1mm × 12m) Pack of 10 for Plumbing Pipe Seal Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZTP-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZTP-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZTP-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img2.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img3.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img4.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img5.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img6.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img7.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img8.jpg",
      "https://cdn.abuzz.store/products/AZTP-P10_img9.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 130
  },
  {
    "id": "AZWLT4_50",
    "title": "LXMI 4inch 5 mtr Leakage Repair Waterproof Tape for Pipe Leakage Solution Tape for Surface Crack Repairs",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4inch 5 mtr Leakage Repair Waterproof Tape for Pipe Leakage Solution Tape for Surface Crack Repairs. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWLT4_50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWLT4_50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWLT4_50_img1.jpg",
      "https://cdn.abuzz.store/products/AZWLT4_50_img2.jpg",
      "https://cdn.abuzz.store/products/AZWLT4_50_img3.jpg",
      "https://cdn.abuzz.store/products/AZWLT4_50_img4.jpg",
      "https://cdn.abuzz.store/products/AZWLT4_50_img5.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 131
  },
  {
    "id": "AZWPP-10in",
    "title": "LXMI 10inch water pump plier",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 10inch water pump plier. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWPP-10in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWPP-10in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWPP-10in_img1.jpg",
      "https://cdn.abuzz.store/products/AZWPP-10in_img2.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 132
  },
  {
    "id": "AZ-STAPLER",
    "title": "LXMI Tackle or Stapler Gun for wood, Textile, Leather, Canvas, Iron Board, Upholstery",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Tackle or Stapler Gun for wood, Textile, Leather, Canvas, Iron Board, Upholstery. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-STAPLER",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-STAPLER_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-STAPLER_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 133
  },
  {
    "id": "AZ-STAPLER-COMBO",
    "title": "LXMI Tackle or Stapler Gun Combo with Stapler Pin for wood, Textile, Leather, Canvas, Iron Board, Upholstery",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Tackle or Stapler Gun Combo with Stapler Pin for wood, Textile, Leather, Canvas, Iron Board, Upholstery. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-STAPLER-COMBO",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-STAPLER-COMBO_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-STAPLER-COMBO_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER-COMBO_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER-COMBO_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER-COMBO_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-STAPLER-COMBO_img5.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 134
  },
  {
    "id": "AZCMD-3MM",
    "title": "LXMI 3mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-3MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-3MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-3MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-3MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZCMD-3MM_img3.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 135
  },
  {
    "id": "AZCMD-4MM",
    "title": "LXMI 4mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-4MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-4MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-4MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-4MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZCMD-4MM_img3.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 136
  },
  {
    "id": "AZCMD-5MM-CROSS_TIP",
    "title": "LXMI 5mm (Cross Tip) Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 5mm (Cross Tip) Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-5MM-CROSS_TIP",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-5MM-CROSS_TIP_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-5MM-CROSS_TIP_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-5MM-CROSS_TIP_img2.jpg",
      "https://cdn.abuzz.store/products/AZCMD-5MM-CROSS_TIP_img3.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 137
  },
  {
    "id": "AZCMD-6MM-CROSS_TIP",
    "title": "LXMI 6mm (Cross Tip) Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6mm (Cross Tip) Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-6MM-CROSS_TIP",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-6MM-CROSS_TIP_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-6MM-CROSS_TIP_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-6MM-CROSS_TIP_img2.jpg",
      "https://cdn.abuzz.store/products/AZCMD-6MM-CROSS_TIP_img3.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 138
  },
  {
    "id": "AZCMD-8MM",
    "title": "LXMI 8mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 899,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 8mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 10). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-8MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-8MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-8MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-8MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZCMD-8MM_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 139
  },
  {
    "id": "AZCMD-10MM-P5",
    "title": "LXMI 10mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 5)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 10mm Ceramic Multipurpose Drill Bit for Glass, Tile, Wood, Concrete, Stone (Pack of 5). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCMD-10MM-P5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCMD-10MM-P5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCMD-10MM-P5_img1.jpg",
      "https://cdn.abuzz.store/products/AZCMD-10MM-P5_img2.jpg",
      "https://cdn.abuzz.store/products/AZCMD-10MM-P5_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 140
  },
  {
    "id": "AZHSB-12.5mm-100Pcs",
    "title": "LAXMI High Speed Hacksaw Blade 12.5X300X24 T.P.I. Teeth (Pack of 100)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LAXMI High Speed Hacksaw Blade 12.5X300X24 T.P.I. Teeth (Pack of 100). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSB-12.5mm-100Pcs",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSB-12_5mm-100Pcs_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSB-12_5mm-100Pcs_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSB-12_5mm-100Pcs_img2.jpg",
      "https://cdn.abuzz.store/products/AZHSB-12_5mm-100Pcs_img3.jpg",
      "https://cdn.abuzz.store/products/AZHSB-12_5mm-100Pcs_img4.jpg",
      "https://cdn.abuzz.store/products/AZHSB-12_5mm-100Pcs_img5.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 141
  },
  {
    "id": "AZHSB-25mm-100Pcs",
    "title": "LAXMI High Speed Hacksaw Blade 25X300X24 T.P.I. Teeth (Pack of 100)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LAXMI High Speed Hacksaw Blade 25X300X24 T.P.I. Teeth (Pack of 100). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHSB-25mm-100Pcs",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHSB-25mm-100Pcs_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHSB-25mm-100Pcs_img1.jpg",
      "https://cdn.abuzz.store/products/AZHSB-25mm-100Pcs_img2.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 142
  },
  {
    "id": "AZMAG4(MC3007)",
    "title": "LXMI Mercury MC-3007 4 Inch Heavy Duty Angle Grinder",
    "category": "Power Tools & Accessories",
    "subcategory": "Drills & Drivers",
    "price": 2999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Mercury MC-3007 4 Inch Heavy Duty Angle Grinder. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZMAG4(MC3007)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8467",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZMAG4_MC3007__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img1.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img2.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img3.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img4.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img5.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img6.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img7.jpg",
      "https://cdn.abuzz.store/products/AZMAG4_MC3007__img8.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 143
  },
  {
    "id": "AZSHDB32-31",
    "title": "LXMI Steel (32 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Steel (32 x 310mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB32-31",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB32-31_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB32-31_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB32-31_img2.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 144
  },
  {
    "id": "AZSHDB32-600",
    "title": "LXMI Steel (32 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 1499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Steel (32 x 600mm) Cross Tip Plus Hammer Drill Bit (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZSHDB32-600",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZSHDB32-600_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZSHDB32-600_img1.jpg",
      "https://cdn.abuzz.store/products/AZSHDB32-600_img2.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 145
  },
  {
    "id": "AZ-SNT-4-30T",
    "title": "LXMI SNT 4inch 110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI SNT 4inch 110MM 30 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SNT-4-30T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SNT-4-30T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SNT-4-30T_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SNT-4-30T_img2.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 146
  },
  {
    "id": "AZ-SNT-4-40T",
    "title": "LXMI SNT 4inch 110MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI SNT 4inch 110MM 40 Teeth TCT CIRCULAR SAW BLADE FOR WOOD CUTTING PREMIUM QUALITY Best For Wood, PLY Wood,MDF & Solid Wood. Wood Cutter. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SNT-4-40T",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SNT-4-40T_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SNT-4-40T_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SNT-4-40T_img2.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 147
  },
  {
    "id": "AZNGTBCRG10N",
    "title": "Nail Gun Tool for Brick and Concrete Walls, Mini Steel Rivet Gun (With 10 Nails)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Nail Gun Tool for Brick and Concrete Walls, Mini Steel Rivet Gun (With 10 Nails). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZNGTBCRG10N",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZNGTBCRG10N_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZNGTBCRG10N_img1.jpg",
      "https://cdn.abuzz.store/products/AZNGTBCRG10N_img2.jpg",
      "https://cdn.abuzz.store/products/AZNGTBCRG10N_img3.jpg",
      "https://cdn.abuzz.store/products/AZNGTBCRG10N_img4.jpg",
      "https://cdn.abuzz.store/products/AZNGTBCRG10N_img5.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 148
  },
  {
    "id": "AZ360R3MWS",
    "title": "Automatic 360° Rotating Adjustable Round 3 Arm Lawn Water Sprinkler for Garden",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Automatic 360° Rotating Adjustable Round 3 Arm Lawn Water Sprinkler for Garden. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ360R3MWS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ360R3MWS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ360R3MWS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ360R3MWS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ360R3MWS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ360R3MWS_img4.jpg",
      "https://cdn.abuzz.store/products/AZ360R3MWS_img5.jpg",
      "https://cdn.abuzz.store/products/AZ360R3MWS_img6.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 149
  },
  {
    "id": "AZ7PGSGN",
    "title": "7 Pattern Garden Hose Nozzle, High Pressure Water Spray Gun, With Multi Adjustable Watering Patterns, Nozzles for Garden, Lawn, Car Wash",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 7 Pattern Garden Hose Nozzle, High Pressure Water Spray Gun, With Multi Adjustable Watering Patterns, Nozzles for Garden, Lawn, Car Wash. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ7PGSGN",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8424",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ7PGSGN_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ7PGSGN_img1.jpg",
      "https://cdn.abuzz.store/products/AZ7PGSGN_img2.jpg",
      "https://cdn.abuzz.store/products/AZ7PGSGN_img3.jpg",
      "https://cdn.abuzz.store/products/AZ7PGSGN_img4.jpg",
      "https://cdn.abuzz.store/products/AZ7PGSGN_img5.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 150
  },
  {
    "id": "AZ3PHPWG",
    "title": "3 Piece Set yellow & black High Pressure Washing Water Gun Spray for Your Garden",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial 3 Piece Set yellow & black High Pressure Washing Water Gun Spray for Your Garden. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ3PHPWG",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ3PHPWG_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ3PHPWG_img1.jpg",
      "https://cdn.abuzz.store/products/AZ3PHPWG_img2.jpg",
      "https://cdn.abuzz.store/products/AZ3PHPWG_img3.jpg",
      "https://cdn.abuzz.store/products/AZ3PHPWG_img4.jpg",
      "https://cdn.abuzz.store/products/AZ3PHPWG_img5.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 151
  },
  {
    "id": "AZWSGPTBNG",
    "title": "Water Spray Gun - Plastic Trigger and Brass Nozzle High Pressure Water Gun",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Water Spray Gun - Plastic Trigger and Brass Nozzle High Pressure Water Gun. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWSGPTBNG",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8424",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWSGPTBNG_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWSGPTBNG_img1.jpg",
      "https://cdn.abuzz.store/products/AZWSGPTBNG_img2.jpg",
      "https://cdn.abuzz.store/products/AZWSGPTBNG_img3.jpg",
      "https://cdn.abuzz.store/products/AZWSGPTBNG_img4.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 152
  },
  {
    "id": "AZ4PBHPWG",
    "title": "4 Piece Set Blue High Pressure Washing Water Gun Spray for Your Garden,Lawn,Flower Beds and Washing Your Car",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "low_stock",
    "description": "High-grade industrial 4 Piece Set Blue High Pressure Washing Water Gun Spray for Your Garden,Lawn,Flower Beds and Washing Your Car. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ4PBHPWG",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ4PBHPWG_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img1.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img2.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img3.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img4.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img5.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img6.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img7.jpg",
      "https://cdn.abuzz.store/products/AZ4PBHPWG_img8.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 153
  },
  {
    "id": "AZPSHP8.6FC",
    "title": "Pruning Shears, Hand Pruner with Stainless SK5 Steel Blades 8.6\" Tree Trimmers Secateurs, Garden Shears Tools, Clippers for The Garden-Black",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Pruning Shears, Hand Pruner with Stainless SK5 Steel Blades 8.6\" Tree Trimmers Secateurs, Garden Shears Tools, Clippers for The Garden-Black. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPSHP8.6FC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPSHP8_6FC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img1.jpg",
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img2.jpg",
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img3.jpg",
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img4.jpg",
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img5.jpg",
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img6.jpg",
      "https://cdn.abuzz.store/products/AZPSHP8_6FC_img7.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 154
  },
  {
    "id": "AZCWWG3p",
    "title": "Car Washing Water Gun Set Brass High Pressure Hose Black 3 Piece Set",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Car Washing Water Gun Set Brass High Pressure Hose Black 3 Piece Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZCWWG3p",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZCWWG3p_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZCWWG3p_img1.jpg",
      "https://cdn.abuzz.store/products/AZCWWG3p_img2.jpg",
      "https://cdn.abuzz.store/products/AZCWWG3p_img3.jpg",
      "https://cdn.abuzz.store/products/AZCWWG3p_img4.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 155
  },
  {
    "id": "AZPBTMWSG",
    "title": "Pistol Black Trigger Metal Water Spray Gun, Car Washing Water Gun",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Pistol Black Trigger Metal Water Spray Gun, Car Washing Water Gun. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPBTMWSG",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8424",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPBTMWSG_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPBTMWSG_img1.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img2.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img3.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img4.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img5.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img6.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img7.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG_img8.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 156
  },
  {
    "id": "AZPBTMWSG3PS",
    "title": "Pistol Black Trigger Metal Water Spray Gun, Car Washing Water Gun 3 Piece Set",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Pistol Black Trigger Metal Water Spray Gun, Car Washing Water Gun 3 Piece Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZPBTMWSG3PS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8424",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img1.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img2.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img3.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img4.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img5.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img6.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img7.jpg",
      "https://cdn.abuzz.store/products/AZPBTMWSG3PS_img8.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 157
  },
  {
    "id": "AZWGHSHPTNCS",
    "title": "Water Gun Head Suit Hose Pipe Tap Nozzle Connector Set",
    "category": "Plumbing Supplies",
    "subcategory": "Pipes & Fittings",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Water Gun Head Suit Hose Pipe Tap Nozzle Connector Set. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZWGHSHPTNCS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3917",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZWGHSHPTNCS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZWGHSHPTNCS_img1.jpg",
      "https://cdn.abuzz.store/products/AZWGHSHPTNCS_img2.jpg",
      "https://cdn.abuzz.store/products/AZWGHSHPTNCS_img3.jpg",
      "https://cdn.abuzz.store/products/AZWGHSHPTNCS_img4.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 158
  },
  {
    "id": "AZ-NG-BIG-BOX-SET",
    "title": "LXMI Manual Steel Gun Tool, Portable Mini Nail Shooting Machine With 10 Nails, Wall Fixing Tool for Cement and Concrete",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Manual Steel Gun Tool, Portable Mini Nail Shooting Machine With 10 Nails, Wall Fixing Tool for Cement and Concrete. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-NG-BIG-BOX-SET",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-BIG-BOX-SET_img8.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 159
  },
  {
    "id": "AZ-NG-SMALL-BOX-SET",
    "title": "LXMI Nail Machine Portable Home Fit Up Metal Plate Nailer Multi-function Wall Fastening Tool Labor-Saving Nail Machine Wall NailsShooting Machine",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Nail Machine Portable Home Fit Up Metal Plate Nailer Multi-function Wall Fastening Tool Labor-Saving Nail Machine Wall NailsShooting Machine. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-NG-SMALL-BOX-SET",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-NG-SMALL-BOX-SET_img8.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 160
  },
  {
    "id": "AZ-IS-SS",
    "title": "LXMI iSafe Heavy Duty Industrial Steel Toe Synthetic Leather Safety Shoe",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI iSafe Heavy Duty Industrial Steel Toe Synthetic Leather Safety Shoe. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-IS-SS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-IS-SS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-IS-SS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-IS-SS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-IS-SS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-IS-SS_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-IS-SS_img5.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 161,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZ-PRIME-SS",
    "title": "LXMI PRIME Heavy Duty Industrial Steel Toe Synthetic Leather Safety Shoe",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI PRIME Heavy Duty Industrial Steel Toe Synthetic Leather Safety Shoe. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-PRIME-SS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-PRIME-SS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-PRIME-SS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-SS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-SS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-SS_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-SS_img5.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 162,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZ-PRIME-HI_SAFE-SS",
    "title": "LXMI PRIME Hi Safe Heavy Duty Industrial Steel Toe Synthetic Leather Safety Shoe",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI PRIME Hi Safe Heavy Duty Industrial Steel Toe Synthetic Leather Safety Shoe. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-PRIME-HI_SAFE-SS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img8.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img9.jpg",
      "https://cdn.abuzz.store/products/AZ-PRIME-HI_SAFE-SS_img10.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 163,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZ-AR-PSG(STEEL)",
    "title": "LXMI Artist Painter Spray Gun Silver (1.4mm)",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Artist Painter Spray Gun Silver (1.4mm). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-AR-PSG(STEEL)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8424",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-AR-PSG_STEEL__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-AR-PSG_STEEL__img1.jpg",
      "https://cdn.abuzz.store/products/AZ-AR-PSG_STEEL__img2.jpg",
      "https://cdn.abuzz.store/products/AZ-AR-PSG_STEEL__img3.jpg",
      "https://cdn.abuzz.store/products/AZ-AR-PSG_STEEL__img4.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 164
  },
  {
    "id": "AZ-CL-24in",
    "title": "LXMI Lock 24in Long x 38 Diameter Combination Cable Bike Lock",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Lock 24in Long x 38 Diameter Combination Cable Bike Lock. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-CL-24in",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-CL-24in_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-CL-24in_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-CL-24in_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-CL-24in_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-CL-24in_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-CL-24in_img5.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 15
  },
  {
    "id": "AZ-DB-5X85-P10",
    "title": "LXMI Masonry drill bit 5 x 85 mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Masonry drill bit 5 x 85 mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-DB-5X85-P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-DB-5X85-P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-DB-5X85-P10_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-DB-5X85-P10_img2.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 16
  },
  {
    "id": "AZ-GL-KNIFE",
    "title": "LXMI Stainless Steel Gas Lighter with Smart Knife Free",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Stainless Steel Gas Lighter with Smart Knife Free. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-GL-KNIFE",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-GL-KNIFE_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-GL-KNIFE_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-KNIFE_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-KNIFE_img3.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 17
  },
  {
    "id": "AZ-GL-P1",
    "title": "LXMI Gas Lighter Reguler Piezo (Silver, Pack of 1)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Gas Lighter Reguler Piezo (Silver, Pack of 1). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-GL-P1",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-GL-P1_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-GL-P1_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-P1_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-P1_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-P1_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-P1_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-GL-P1_img6.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 18
  },
  {
    "id": "AZ-PS-350MM",
    "title": "LXMI Pruning Saw 350mm with Cover Steel Blade, Triple-Cut Teeth, Ergonomic Grip Heavy Duty Manual Saw for Gardening, Tree Trimming, Branch Cutting & Woodworking",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Pruning Saw 350mm with Cover Steel Blade, Triple-Cut Teeth, Ergonomic Grip Heavy Duty Manual Saw for Gardening, Tree Trimming, Branch Cutting & Woodworking. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-PS-350MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-PS-350MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img8.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-350MM_img9.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 19
  },
  {
    "id": "AZ-S-WG-B-P12",
    "title": "LXMI SUNNY Black Plastic Glass Welding Safety Goggles with Universal Fit (Pack of 12)",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI SUNNY Black Plastic Glass Welding Safety Goggles with Universal Fit (Pack of 12). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-S-WG-B-P12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3926",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-S-WG-B-P12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-S-WG-B-P12_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-S-WG-B-P12_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-S-WG-B-P12_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-S-WG-B-P12_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-S-WG-B-P12_img5.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 20
  },
  {
    "id": "AZ-SC-4.5",
    "title": "LXMI Small Sharp Scissor for home office Craft Multi Purpose Use Travel Accessory (4.5 inches Long)",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Small Sharp Scissor for home office Craft Multi Purpose Use Travel Accessory (4.5 inches Long). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SC-4.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SC-4_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SC-4_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-4_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-4_5_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-4_5_img4.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 21
  },
  {
    "id": "AZ-SC-6.5",
    "title": "LXMI STAINLESS STEEL SCISSORS -MULTIPURPOSE SCISSORS 6.5 166mm",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI STAINLESS STEEL SCISSORS -MULTIPURPOSE SCISSORS 6.5 166mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SC-6.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SC-6_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SC-6_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-6_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-6_5_img3.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 22
  },
  {
    "id": "AZ-SC-8-5.3(COMBO)",
    "title": "LXMI Scissors COMBO 8in and 5.3in Pack of 2 Scissors Multipurpose Easy-Clean, Non-Stick Blades Ergonomic Handles for Fabric, Crafts, Tapes, General use",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Scissors COMBO 8in and 5.3in Pack of 2 Scissors Multipurpose Easy-Clean, Non-Stick Blades Ergonomic Handles for Fabric, Crafts, Tapes, General use. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SC-8-5.3(COMBO)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SC-8-5_3_COMBO__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SC-8-5_3_COMBO__img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-8-5_3_COMBO__img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-8-5_3_COMBO__img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 23
  },
  {
    "id": "AZ-SC-8.5",
    "title": "LXMI STAINLESS STEEL SCISSORS -MULTIPURPOSE SCISSORS 8.5",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI STAINLESS STEEL SCISSORS -MULTIPURPOSE SCISSORS 8.5. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SC-8.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SC-8_5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SC-8_5_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-8_5_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SC-8_5_img3.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 24
  },
  {
    "id": "AZ-TCT-12",
    "title": "LXMI 12mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 12-150mm",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 12-150mm. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-12_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-12_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-12_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-12_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-12_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-12_img6.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 25
  },
  {
    "id": "AZ-TCT-14",
    "title": "LXMI 14mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 14",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 429,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 14mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 14. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-14",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-14_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-14_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-14_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-14_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-14_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-14_img5.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 26
  },
  {
    "id": "AZ-TCT-16",
    "title": "LXMI 16mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 16",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 449,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 16mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 16. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-16",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-16_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-16_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-16_img8.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 27
  },
  {
    "id": "AZ-TCT-18",
    "title": "LXMI 18mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 18",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 469,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 18mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 18. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-18",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-18_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-18_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-18_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-18_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-18_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-18_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-18_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-18_img7.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 28
  },
  {
    "id": "AZ-TCT-20",
    "title": "LXMI 20mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 20",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 489,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 20mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 20. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-20",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-20_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-20_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-20_img8.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 29
  },
  {
    "id": "AZ-TCT-22",
    "title": "LXMI 22mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 22",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 22mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 22. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-22",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-22_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-22_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img8.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-22_img9.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 30
  },
  {
    "id": "AZ-TCT-25",
    "title": "LXMI 25mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 25",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 519,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 25mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 25. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-25",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-25_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-25_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-25_img8.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 31
  },
  {
    "id": "AZ-TCT-28",
    "title": "LXMI 28mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 28",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 529,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 28mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 28. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-28",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-28_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-28_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-28_img8.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 32
  },
  {
    "id": "AZ-TCT-30",
    "title": "LXMI 30mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 30",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 539,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 30mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 30. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-30",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-30_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-30_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-30_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-30_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-30_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-30_img5.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 33
  },
  {
    "id": "AZ-TCT-32",
    "title": "LXMI 32mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 32",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 549,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 32mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 32. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-32",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-32_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-32_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-32_img8.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 34
  },
  {
    "id": "AZ-TCT-35",
    "title": "LXMI 35mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 35",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 559,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 35mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 35. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-35",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-35_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-35_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-35_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-35_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-35_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-35_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-35_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-35_img7.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 35
  },
  {
    "id": "AZ-TCT-38",
    "title": "LXMI 38mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 38",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 569,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 38mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 38. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-38",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-38_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-38_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-38_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-38_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-38_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-38_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-38_img6.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 36
  },
  {
    "id": "AZ-TCT-40",
    "title": "LXMI 40mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 40",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 579,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 40mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 40. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-40",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-40_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-40_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-40_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-40_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-40_img4.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 37
  },
  {
    "id": "AZ-TCT-42",
    "title": "LXMI 42mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 42",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 589,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 42mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 42. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-42",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-42_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-42_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-42_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-42_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-42_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-42_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-42_img6.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 38
  },
  {
    "id": "AZ-TCT-45",
    "title": "LXMI 45mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 45",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 599,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI 45mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 45. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-45",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-45_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-45_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-45_img8.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 39
  },
  {
    "id": "AZ-TCT-50",
    "title": "LXMI 50mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 50",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 649,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 50mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 50. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-50_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-50_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-50_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-50_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-50_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-50_img5.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 40
  },
  {
    "id": "AZ-TCT-55",
    "title": "LXMI 55mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 55",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 55mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 55. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-55",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-55_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-55_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-55_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-55_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-55_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-55_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-55_img6.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 41
  },
  {
    "id": "AZ-TCT-63",
    "title": "LXMI 63mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 63",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 63mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 63. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-63",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-63_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-63_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img8.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-63_img9.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 42
  },
  {
    "id": "AZ-TCT-75",
    "title": "LXMI 75mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 75",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 849,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 75mm TCT Core Drill Bit – Carbide Hole Saw for Stainless Steel, Mild Steel, Cast Iron, Aluminium & Metals – Industrial Drill Cutter – Choice of Sizes 75. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TCT-75",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TCT-75_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TCT-75_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img8.jpg",
      "https://cdn.abuzz.store/products/AZ-TCT-75_img9.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 43
  },
  {
    "id": "AZ-PS-4in-P2",
    "title": "LXMI 4 inch Paint Scrapers Taping Putty Scrapers Drywall Scrapers for Home DIY Tools (Pack of 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 inch Paint Scrapers Taping Putty Scrapers Drywall Scrapers for Home DIY Tools (Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-PS-4in-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-PS-4in-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-PS-4in-P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-4in-P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-4in-P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-4in-P2_img4.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 44
  },
  {
    "id": "AZ-PS-3in-P2",
    "title": "LXMI 3 inch Paint Scrapers Taping Putty Scrapers Drywall Scrapers for Home DIY Tools (Pack of 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3 inch Paint Scrapers Taping Putty Scrapers Drywall Scrapers for Home DIY Tools (Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-PS-3in-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-PS-3in-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-PS-3in-P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-3in-P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-3in-P2_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-3in-P2_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-3in-P2_img5.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 45
  },
  {
    "id": "AZ-PS-2in-P2",
    "title": "LXMI 2 inch Paint Scrapers Taping Putty Scrapers Drywall Scrapers for Home DIY Tools (Pack of 2",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 2 inch Paint Scrapers Taping Putty Scrapers Drywall Scrapers for Home DIY Tools (Pack of 2. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-PS-2in-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-PS-2in-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-PS-2in-P2_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-2in-P2_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-PS-2in-P2_img3.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 46
  },
  {
    "id": "AZ-KH-P9",
    "title": "LXMI Adhesive Hooks Kitchen Wall Hooks-Heavy Duty 10Kg(Max) Nail Free Sticky Hangers with Stainless Hooks Reusable Utility Towel Bath Ceiling Hooks, Plastic (9",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Adhesive Hooks Kitchen Wall Hooks-Heavy Duty 10Kg(Max) Nail Free Sticky Hangers with Stainless Hooks Reusable Utility Towel Bath Ceiling Hooks, Plastic (9. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-KH-P9",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-KH-P9_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-KH-P9_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-KH-P9_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-KH-P9_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-KH-P9_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-KH-P9_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-KH-P9_img6.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 47
  },
  {
    "id": "AZ-DH-DH-P2",
    "title": "LXMI D-Hook Double Hole Hanger for Hanging Ceiling Fan or Jhoomer swing Hook (Pack of 2)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI D-Hook Double Hole Hanger for Hanging Ceiling Fan or Jhoomer swing Hook (Pack of 2). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-DH-DH-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-DH-DH-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-DH-DH-P2_img1.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 48
  },
  {
    "id": "AZ-DH-SH-P2",
    "title": "LXMI D-Hook Single Hole Hanger for Hanging Ceiling Fan or Jhoomer swing Hook (Pack of 2)",
    "category": "Fasteners & Hardware",
    "subcategory": "Screws & Bolts",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI D-Hook Single Hole Hanger for Hanging Ceiling Fan or Jhoomer swing Hook (Pack of 2). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-DH-SH-P2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "7318",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-DH-SH-P2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-DH-SH-P2_img1.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 49
  },
  {
    "id": "AZ-HARNESS-3M",
    "title": "LXMI Full Body Safety Harness with Double Lanyard and Shock Absorber Safety Belt and Harness Safety Harness with Belt Safety Body Harness (Double Hook & Rope)",
    "category": "Safety Gears & PPE",
    "subcategory": "Respiratory & Fall Protection",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Full Body Safety Harness with Double Lanyard and Shock Absorber Safety Belt and Harness Safety Harness with Belt Safety Body Harness (Double Hook & Rope). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-HARNESS-3M",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6307",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-HARNESS-3M_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-HARNESS-3M_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-HARNESS-3M_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-HARNESS-3M_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-HARNESS-3M_img4.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 50
  },
  {
    "id": "AZ-HARNESS-HEAVY-3M",
    "title": "LXMI Full Body Safety Harness with Double Lanyard and Shock Absorber Safety Belt and Harness Safety Harness with Belt Safety Body Harness (Double Hook & Rope)",
    "category": "Safety Gears & PPE",
    "subcategory": "Respiratory & Fall Protection",
    "price": 999,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Full Body Safety Harness with Double Lanyard and Shock Absorber Safety Belt and Harness Safety Harness with Belt Safety Body Harness (Double Hook & Rope). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-HARNESS-HEAVY-3M",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6307",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-HARNESS-HEAVY-3M_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-HARNESS-HEAVY-3M_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-HARNESS-HEAVY-3M_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-HARNESS-HEAVY-3M_img3.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 51
  },
  {
    "id": "AZ-S-LS-PL-40MM",
    "title": "LXMI Sainik 40mm Round Padlock with Long Shackle – Stainless Steel Body, Iron Lever, Double Locking Mechanism, Includes 3 Silver Keys",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Sainik 40mm Round Padlock with Long Shackle – Stainless Steel Body, Iron Lever, Double Locking Mechanism, Includes 3 Silver Keys. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-S-LS-PL-40MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-S-LS-PL-40MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-40MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-40MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-40MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-40MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-40MM_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 52
  },
  {
    "id": "AZ-S-LS-PL-50MM",
    "title": "LXMI Sainik 50mm Round Padlock with Long Shackle – Stainless Steel Body, Iron Lever, Double Locking Mechanism, Includes 3 Silver Keys",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Sainik 50mm Round Padlock with Long Shackle – Stainless Steel Body, Iron Lever, Double Locking Mechanism, Includes 3 Silver Keys. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-S-LS-PL-50MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-S-LS-PL-50MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-50MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-50MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-50MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-50MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-50MM_img5.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 53
  },
  {
    "id": "AZ-S-LS-PL-65MM",
    "title": "LXMI Sainik 65mm Round Padlock with Long Shackle – Stainless Steel Body, Iron Lever, Double Locking Mechanism, Includes 3 Silver Keys",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Sainik 65mm Round Padlock with Long Shackle – Stainless Steel Body, Iron Lever, Double Locking Mechanism, Includes 3 Silver Keys. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-S-LS-PL-65MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-S-LS-PL-65MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-65MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-65MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-65MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-65MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-S-LS-PL-65MM_img5.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 54
  },
  {
    "id": "AZ-SH-2.5LBS",
    "title": "LXMI 2.5LBS Heavy Duty Sledge Hammers Wood Handle Octagonal Hammers Round Head Antimagnetic Octagonal Hammer",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 2.5LBS Heavy Duty Sledge Hammers Wood Handle Octagonal Hammers Round Head Antimagnetic Octagonal Hammer. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SH-2.5LBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SH-2_5LBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SH-2_5LBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-2_5LBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-2_5LBS_img3.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 55
  },
  {
    "id": "AZ-SH-2LBS",
    "title": "LXMI 2LBS Heavy Duty Sledge Hammers Wood Handle Octagonal Hammers Round Head Antimagnetic Octagonal Hammer",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 2LBS Heavy Duty Sledge Hammers Wood Handle Octagonal Hammers Round Head Antimagnetic Octagonal Hammer. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SH-2LBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SH-2LBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SH-2LBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-2LBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-2LBS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-2LBS_img4.jpg"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 56
  },
  {
    "id": "AZ-SH-3LBS",
    "title": "LXMI 3LBS Heavy Duty Sledge Hammers Wood Handle Octagonal Hammers Round Head Antimagnetic Octagonal Hammer",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3LBS Heavy Duty Sledge Hammers Wood Handle Octagonal Hammers Round Head Antimagnetic Octagonal Hammer. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SH-3LBS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SH-3LBS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SH-3LBS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-3LBS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SH-3LBS_img3.jpg"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 57
  },
  {
    "id": "AZ-SL-CH",
    "title": "LXMI Sea Lord Heavy Duty Rip Claw Hammer with Polished Face and Comfort Grip Handle for Construction and DIY",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Sea Lord Heavy Duty Rip Claw Hammer with Polished Face and Comfort Grip Handle for Construction and DIY. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SL-CH",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SL-CH_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SL-CH_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-CH_img2.jpg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 58
  },
  {
    "id": "AZ-SL-TCT-4(30)",
    "title": "LXMI Sea Lord 4 Inch 30T Wood Circular Cutting TCT Alloy Saw Blade Wood Working Cutter Blade",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Sea Lord 4 Inch 30T Wood Circular Cutting TCT Alloy Saw Blade Wood Working Cutter Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SL-TCT-4(30)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SL-TCT-4_30__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_30__img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_30__img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_30__img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_30__img4.jpg"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 59
  },
  {
    "id": "AZ-SL-TCT-4(40)",
    "title": "LXMI Sea Lord 4 Inch 40T Wood Circular Cutting TCT Alloy Saw Blade Wood Working Cutter Blade",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Sea Lord 4 Inch 40T Wood Circular Cutting TCT Alloy Saw Blade Wood Working Cutter Blade. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SL-TCT-4(40)",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SL-TCT-4_40__img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_40__img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_40__img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_40__img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SL-TCT-4_40__img4.jpg"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 60
  },
  {
    "id": "AZ-SS-B",
    "title": "LXMI Fiber Toe Safety Shoes PVC Sole",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Fiber Toe Safety Shoes PVC Sole. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SS-B",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SS-B_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SS-B_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img8.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img9.jpg",
      "https://cdn.abuzz.store/products/AZ-SS-B_img10.jpg"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 61,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZ-SX-PL-40MM",
    "title": "LXMI SafeX 40mm Round Padlock – 6 Levers, Hardened Shackle, 50,000 Key Combinations, Steel Body, 3 Silver Keys (Silver)",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI SafeX 40mm Round Padlock – 6 Levers, Hardened Shackle, 50,000 Key Combinations, Steel Body, 3 Silver Keys (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SX-PL-40MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-40MM_img6.jpg"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 62
  },
  {
    "id": "AZ-SX-PL-50MM",
    "title": "LXMI SafeX 50mm Round Padlock – 7 Levers, Hardened Shackle, 50,000 Key Combinations, Steel Body, 3 Silver Keys (Silver)",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI SafeX 50mm Round Padlock – 7 Levers, Hardened Shackle, 50,000 Key Combinations, Steel Body, 3 Silver Keys (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SX-PL-50MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-50MM_img6.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 63
  },
  {
    "id": "AZ-SX-PL-65MM",
    "title": "LXMI SafeX 65mm Round Padlock – 8 Levers, Hardened Shackle, 50,000 Key Combinations, Steel Body, 3 Silver Keys (Silver)",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI SafeX 65mm Round Padlock – 8 Levers, Hardened Shackle, 50,000 Key Combinations, Steel Body, 3 Silver Keys (Silver). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SX-PL-65MM",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-SX-PL-65MM_img6.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 64
  },
  {
    "id": "AZ-EP-SS",
    "title": "LXMI Extra Power Mesh Steel Toe Industrial Safety Shoes for ManSafety Shoes for Men Light Weight Construction, Outdoor",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Extra Power Mesh Steel Toe Industrial Safety Shoes for ManSafety Shoes for Men Light Weight Construction, Outdoor. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-EP-SS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6403",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-EP-SS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-EP-SS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-EP-SS_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-EP-SS_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-EP-SS_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-EP-SS_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-EP-SS_img6.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 65,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZADDF-10",
    "title": "LXMI Aldrop for Door Fittings Kit, Door Accessories",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Aldrop for Door Fittings Kit, Door Accessories. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZADDF-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZADDF-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZADDF-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZADDF-10_img2.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 66
  },
  {
    "id": "AZADDF-8",
    "title": "LXMI Aldrop for Door Fittings Kit, Door Accessories",
    "category": "Fasteners & Hardware",
    "subcategory": "Locks & Safes",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Aldrop for Door Fittings Kit, Door Accessories. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZADDF-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8301",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZADDF-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZADDF-8_img1.jpg",
      "https://cdn.abuzz.store/products/AZADDF-8_img2.jpg",
      "https://cdn.abuzz.store/products/AZADDF-8_img3.jpg",
      "https://cdn.abuzz.store/products/AZADDF-8_img4.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 67
  },
  {
    "id": "AZHDB10-11P10",
    "title": "LXMI (10x110) Hammer Drill Bit Pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI (10x110) Hammer Drill Bit Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB10-11P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB10-11P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB10-11P10_img1.jpg"
    ],
    "popularity": 79,
    "rating": 4.5,
    "reviewsCount": 68
  },
  {
    "id": "AZHDB12-11P10",
    "title": "LXMI (12x110) Hammer Drill Bit Pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 999,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI (12x110) Hammer Drill Bit Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB12-11P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB12-11P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB12-11P10_img1.jpg"
    ],
    "popularity": 80,
    "rating": 4.6,
    "reviewsCount": 69
  },
  {
    "id": "AZHDB8-11P10",
    "title": "LXMI (8x110) Hammer Drill Bit Pack of 10",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI (8x110) Hammer Drill Bit Pack of 10. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZHDB8-11P10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8207",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZHDB8-11P10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZHDB8-11P10_img1.jpg"
    ],
    "popularity": 81,
    "rating": 4.7,
    "reviewsCount": 70
  },
  {
    "id": "AZ-2in1-GW",
    "title": "LXMI Diamond Saw Blade 4-105mm, 15000 RPM Flat Wheel Used For Stone Grinding",
    "category": "Power Tools & Accessories",
    "subcategory": "Power Tool Accessories",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Diamond Saw Blade 4-105mm, 15000 RPM Flat Wheel Used For Stone Grinding. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-2in1-GW",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8202",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-2in1-GW_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-2in1-GW_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-2in1-GW_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-2in1-GW_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-2in1-GW_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-2in1-GW_img5.jpg"
    ],
    "popularity": 82,
    "rating": 4.8,
    "reviewsCount": 71
  },
  {
    "id": "AZ-BFT-2",
    "title": "LXMI 2 inch x 10 m Bitumen Flashing Tape",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 699,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 2 inch x 10 m Bitumen Flashing Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-BFT-2",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-BFT-2_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-BFT-2_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-2_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-2_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-2_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-2_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-2_img6.jpg"
    ],
    "popularity": 83,
    "rating": 4.9,
    "reviewsCount": 72
  },
  {
    "id": "AZ-BFT-4",
    "title": "LXMI 4 inch x 10 m Bitumen Flashing Tape",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 1299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 4 inch x 10 m Bitumen Flashing Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-BFT-4",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-BFT-4_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-BFT-4_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-4_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-4_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-4_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-4_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-4_img6.jpg"
    ],
    "popularity": 84,
    "rating": 4.3,
    "reviewsCount": 73
  },
  {
    "id": "AZ-BFT-6",
    "title": "LXMI 6 inch x 10 m Bitumen Flashing Tape",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 1799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6 inch x 10 m Bitumen Flashing Tape. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-BFT-6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-BFT-6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-BFT-6_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-6_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-6_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-6_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-6_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-6_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-BFT-6_img7.jpg"
    ],
    "popularity": 85,
    "rating": 4.4,
    "reviewsCount": 74
  },
  {
    "id": "AZ-CC-10mm",
    "title": "LXMI Multifunction Metal Cable Pliers Wire Stripper Crimper Adjustable Hand Tools",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Multifunction Metal Cable Pliers Wire Stripper Crimper Adjustable Hand Tools. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-CC-10mm",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-CC-10mm_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-CC-10mm_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-CC-10mm_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-CC-10mm_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-CC-10mm_img4.jpg"
    ],
    "popularity": 86,
    "rating": 4.5,
    "reviewsCount": 75
  },
  {
    "id": "AZ-GTS-5PC",
    "title": "LXMI Gardening Tools Kit for Home 5-Piece Garden Tools for Home Gardening",
    "category": "Hand Tools",
    "subcategory": "General Tools",
    "price": 799,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Gardening Tools Kit for Home 5-Piece Garden Tools for Home Gardening. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-GTS-5PC",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-GTS-5PC_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-GTS-5PC_img7.jpg"
    ],
    "popularity": 87,
    "rating": 4.6,
    "reviewsCount": 76
  },
  {
    "id": "AZ-HTS-10",
    "title": "LXMI 10inch Hammer Type 2in1 Screw Drivers-Pechkas",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 10inch Hammer Type 2in1 Screw Drivers-Pechkas. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-HTS-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-HTS-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-HTS-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-10_img2.jpg"
    ],
    "popularity": 88,
    "rating": 4.7,
    "reviewsCount": 77
  },
  {
    "id": "AZ-HTS-6",
    "title": "LXMI 6inch Hammer Type 2in1 Screw Drivers-Pechkas",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6inch Hammer Type 2in1 Screw Drivers-Pechkas. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-HTS-6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-HTS-6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-HTS-6_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-6_img2.jpg"
    ],
    "popularity": 89,
    "rating": 4.8,
    "reviewsCount": 78
  },
  {
    "id": "AZ-HTS-8",
    "title": "LXMI 8inch Hammer Type 2in1 Screw Drivers-Pechkas",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 8inch Hammer Type 2in1 Screw Drivers-Pechkas. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-HTS-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-HTS-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-HTS-8_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-8_img2.jpg"
    ],
    "popularity": 90,
    "rating": 4.9,
    "reviewsCount": 79
  },
  {
    "id": "AZ-HTS-COMBO-6_8_10",
    "title": "LXMI 6, 8 & 10inch Hammer Type 2in1 Screw Drivers Pechkas combo",
    "category": "Hand Tools",
    "subcategory": "Hammers & Demolition",
    "price": 499,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6, 8 & 10inch Hammer Type 2in1 Screw Drivers Pechkas combo. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-HTS-COMBO-6_8_10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-HTS-COMBO-6_8_10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-HTS-COMBO-6_8_10_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-COMBO-6_8_10_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-COMBO-6_8_10_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-COMBO-6_8_10_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-HTS-COMBO-6_8_10_img5.jpg"
    ],
    "popularity": 91,
    "rating": 4.3,
    "reviewsCount": 80
  },
  {
    "id": "AZ-N",
    "title": "Hand Nipper Cutter for Wire Cutting Sharp Cutter Tool for Multipurpose Use",
    "category": "Hand Tools",
    "subcategory": "Pliers & Cutters",
    "price": 299,
    "stockStatus": "in_stock",
    "description": "High-grade industrial Hand Nipper Cutter for Wire Cutting Sharp Cutter Tool for Multipurpose Use. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-N",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8203",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-N_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-N_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-N_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-N_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-N_img4.jpg"
    ],
    "popularity": 92,
    "rating": 4.4,
    "reviewsCount": 81
  },
  {
    "id": "AZ-TWA-300",
    "title": "LXMI Transparent Waterproof Adhesive, 300g, High Viscosity Strong Glue with Brush for Roof Leakage and Crack Sealing",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Transparent Waterproof Adhesive, 300g, High Viscosity Strong Glue with Brush for Roof Leakage and Crack Sealing. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TWA-300",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TWA-300_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TWA-300_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-300_img8.jpg"
    ],
    "popularity": 93,
    "rating": 4.5,
    "reviewsCount": 82
  },
  {
    "id": "AZ-TWA-500",
    "title": "LXMI Transparent Waterproof Adhesive, 500g, High Viscosity Strong Glue with Brush for Roof Leakage and Crack Sealing",
    "category": "Building Materials",
    "subcategory": "Building Tapes & Sealants",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Transparent Waterproof Adhesive, 500g, High Viscosity Strong Glue with Brush for Roof Leakage and Crack Sealing. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TWA-500",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6807",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TWA-500_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TWA-500_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TWA-500_img8.jpg"
    ],
    "popularity": 94,
    "rating": 4.6,
    "reviewsCount": 83
  },
  {
    "id": "AZ-AW-10",
    "title": "LXMI 10-Inch (250mm) Adjustable Spanner - Forged Chrome Vanadium Steel with Precision Jaws and Insulated Grip, 35mm Jaw Opening for Tightening, Loosening, and Plumbing",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 10-Inch (250mm) Adjustable Spanner - Forged Chrome Vanadium Steel with Precision Jaws and Insulated Grip, 35mm Jaw Opening for Tightening, Loosening, and Plumbing. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-AW-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 95,
    "rating": 4.7,
    "reviewsCount": 84
  },
  {
    "id": "AZ-AW-12",
    "title": "LXMI 12-Inch (300mm) Adjustable Spanner - Forged Chrome Vanadium Steel with Precision Jaws and Insulated Grip, 35mm Jaw Opening for Tightening, Loosening, and Plumbing",
    "category": "Hand Tools",
    "subcategory": "Wrenches & Spanners",
    "price": 449,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12-Inch (300mm) Adjustable Spanner - Forged Chrome Vanadium Steel with Precision Jaws and Insulated Grip, 35mm Jaw Opening for Tightening, Loosening, and Plumbing. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-AW-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8204",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 96,
    "rating": 4.8,
    "reviewsCount": 85
  },
  {
    "id": "AZ-FS",
    "title": "LXMI Face Shield Anti Scratch High-Impact Resistant Polycarbonate Visor Comfortable Adjustable Elastic Band with Replaceable Polycarbonate Visor",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Face Shield Anti Scratch High-Impact Resistant Polycarbonate Visor Comfortable Adjustable Elastic Band with Replaceable Polycarbonate Visor. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-FS",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "3926",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-FS_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-FS_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-FS_img2.jpeg"
    ],
    "popularity": 97,
    "rating": 4.9,
    "reviewsCount": 86
  },
  {
    "id": "AZ-KCG-10P",
    "title": "LXMI Cotton Knitted Hand Gloves 100% Cotton, Navy Blue colour Washable & Reusable Men & Women Safety 80 GM (10 Pairs)",
    "category": "Safety Gears & PPE",
    "subcategory": "Hand & Footwear Safety",
    "price": 349,
    "stockStatus": "low_stock",
    "description": "High-grade industrial LXMI Cotton Knitted Hand Gloves 100% Cotton, Navy Blue colour Washable & Reusable Men & Women Safety 80 GM (10 Pairs). Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-KCG-10P",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6116",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)",
      "Available UK/IND Sizes": "7, 8, 9, 10 (Standard Fit)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 70,
    "rating": 4.3,
    "reviewsCount": 87,
    "sizes": [
      "7",
      "8",
      "9",
      "10"
    ]
  },
  {
    "id": "AZ-MPS-100",
    "title": "LXMI Mechanical pocket spring balance 100 kg maximum weight capacity",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Mechanical pocket spring balance 100 kg maximum weight capacity. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-MPS-100",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 71,
    "rating": 4.4,
    "reviewsCount": 88
  },
  {
    "id": "AZ-MPS-50",
    "title": "LXMI Mechanical pocket spring balance 50 kg maximum weight capacity",
    "category": "Hand Tools",
    "subcategory": "Measuring & Inspection",
    "price": 399,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Mechanical pocket spring balance 50 kg maximum weight capacity. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-MPS-50",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8423",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 72,
    "rating": 4.5,
    "reviewsCount": 89
  },
  {
    "id": "AZ-SH-Y",
    "title": "LXMI Safety Helmet for Men Construction Helmet Ratchet Type Adjustment with Adjustable Chin Strap Work Helmet with Side Slot for Attachment",
    "category": "Safety Gears & PPE",
    "subcategory": "Head & Face Protection",
    "price": 349,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI Safety Helmet for Men Construction Helmet Ratchet Type Adjustment with Adjustable Chin Strap Work Helmet with Side Slot for Attachment. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-SH-Y",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "6506",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
    ],
    "popularity": 73,
    "rating": 4.6,
    "reviewsCount": 90
  },
  {
    "id": "AZ-TH-10",
    "title": "LXMI 10 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA",
    "category": "Hand Tools",
    "subcategory": "Masonry & Concrete Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 10 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TH-10",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TH-10_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TH-10_img1.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img2.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img3.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img4.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img5.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img6.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img7.jpg",
      "https://cdn.abuzz.store/products/AZ-TH-10_img8.jpg"
    ],
    "popularity": 74,
    "rating": 4.7,
    "reviewsCount": 91
  },
  {
    "id": "AZ-TH-12",
    "title": "LXMI 12 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA",
    "category": "Hand Tools",
    "subcategory": "Masonry & Concrete Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 12 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TH-12",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TH-12_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TH-12_img1.jpg"
    ],
    "popularity": 75,
    "rating": 4.8,
    "reviewsCount": 92
  },
  {
    "id": "AZ-TH-3.5",
    "title": "LXMI 3.5 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA",
    "category": "Hand Tools",
    "subcategory": "Masonry & Concrete Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 3.5 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TH-3.5",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TH-3.5_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TH-3.5_img1.jpg"
    ],
    "popularity": 76,
    "rating": 4.9,
    "reviewsCount": 93
  },
  {
    "id": "AZ-TH-6",
    "title": "LXMI 6 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA",
    "category": "Hand Tools",
    "subcategory": "Masonry & Concrete Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 6 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TH-6",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TH-6_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TH-6_img1.jpg"
    ],
    "popularity": 77,
    "rating": 4.3,
    "reviewsCount": 94
  },
  {
    "id": "AZ-TH-8",
    "title": "LXMI 8 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA",
    "category": "Hand Tools",
    "subcategory": "Masonry & Concrete Tools",
    "price": 389,
    "stockStatus": "in_stock",
    "description": "High-grade industrial LXMI 8 Inch Trowel with Strong Metal Blade for CONSTRUCTON METALAND Wooden Trowel GARENA Cement Scrapper KARNITHAPIGURMALA. Precision manufactured for extreme durability, long service life, and BIS quality compliance in Indian hardware and construction operations.",
    "specifications": {
      "SKU Code": "AZ-TH-8",
      "MOQ": "1 Unit(s)",
      "Material": "High-Grade Industrial Steel / Alloy",
      "Warranty": "6 Months Brand Warranty",
      "BIS Standard": "ISO 9001:2015 Compliant",
      "HSN Code": "8205",
      "GST Tax Rate": "18% (9% CGST + 9% SGST)"
    },
    "imageUrl": "https://cdn.abuzz.store/products/AZ-TH-8_img1.jpg",
    "galleryImages": [
      "https://cdn.abuzz.store/products/AZ-TH-8_img1.jpg"
    ],
    "popularity": 78,
    "rating": 4.4,
    "reviewsCount": 95
  }
];

export async function seedDatabase() {
  if (isMock) {
    console.log("Firebase is running in MOCK mode. Skipping Firestore seeding.");
    return;
  }

  try {
    const productsCollectionRef = collection(db, 'products');
    const existingDocs = await getDocs(productsCollectionRef);
    
    if (!existingDocs.empty) {
      console.log(`Firestore already populated with ${existingDocs.size} products. Skipping seed.`);
      return;
    }

    const batch = writeBatch(db);
    MOCK_PRODUCTS.slice(0, 500).forEach((product) => {
      const safeId = product.id.replace(/\//g, '_');
      const docRef = doc(db, 'products', safeId);
      batch.set(docRef, product);
    });

    await batch.commit();
    console.log("Firestore successfully populated with mock hardware items.");
  } catch (error) {
    console.error("Error seeding Firestore database:", error);
  }
}
