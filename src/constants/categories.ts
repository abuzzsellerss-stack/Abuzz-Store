export interface SubCategory {
  name: string;
  items: string[];
  targetAudience: string;
  filters: string[];
}

export interface Category {
  name: string;
  subcategories: SubCategory[];
}

export const CATEGORIES_DATA: Category[] = [
  {
    name: 'Hand Tools',
    subcategories: [
      {
        name: 'Wrenches & Spanners',
        items: ['Adjustable Wrenches', 'Ring & Combination Spanners', 'Socket Sets', 'Ratchets'],
        targetAudience: 'Industrial & DIY',
        filters: ['Brand', 'Material', 'Size (mm)', 'Drive Size']
      },
      {
        name: 'Screwdrivers & Fastening',
        items: ['Phillips & Slotted Drivers', 'Torx Drivers', 'Precision Sets', 'Nut Drivers'],
        targetAudience: 'DIY & Professional',
        filters: ['Tip Type', 'Handle Grip', 'Set Size', 'Magnetic']
      },
      {
        name: 'Pliers & Cutters',
        items: ['Combination Pliers', 'Long Nose', 'Wire Strippers', 'Locking Pliers'],
        targetAudience: 'Electrical & General',
        filters: ['Length (Inch)', 'Insulated Voltage', 'Material']
      },
      {
        name: 'Hammers & Demolition',
        items: ['Claw Hammers', 'Sledgehammers', 'Mallets', 'Cold Chisels', 'Wrecking Bars'],
        targetAudience: 'Construction & DIY',
        filters: ['Weight (Grams/Lbs)', 'Handle Material']
      }
    ]
  },
  {
    name: 'Power Tools & Accessories',
    subcategories: [
      {
        name: 'Drills & Drivers',
        items: ['Cordless Drill Drivers', 'Impact Drivers', 'Rotary Hammers', 'SDS Drills'],
        targetAudience: 'Professional & DIY',
        filters: ['Voltage', 'Power Source', 'Chuck Size']
      },
      {
        name: 'Saws & Cutting Tools',
        items: ['Circular Saws', 'Jigsaws', 'Miter Saws', 'Reciprocating Saws'],
        targetAudience: 'Woodworking & Masonry',
        filters: ['Blade Diameter', 'Max Cutting Depth', 'Wattage', 'RPM']
      },
      {
        name: 'Grinders & Sanders',
        items: ['Angle Grinders', 'Bench Grinders', 'Orbital Sanders', 'Detail Sanders'],
        targetAudience: 'Metalworking & Finishing',
        filters: ['Disc Size', 'Switch Type', 'Sanding Pad Type']
      },
      {
        name: 'Power Tool Accessories',
        items: ['Drill Bit Sets', 'Diamond Blades', 'Abrasive Discs', 'Router Bits', 'Sandpaper Sheets'],
        targetAudience: 'Consumables',
        filters: ['Compatibility', 'Application Material']
      }
    ]
  },
  {
    name: 'Safety Gears & PPE',
    subcategories: [
      {
        name: 'Body Protection',
        items: ['High-Visibility Reflective Jackets', 'Boiler Suits', 'Chemical Resistant Aprons'],
        targetAudience: 'Industrial Workers',
        filters: ['Size', 'Hazard Type', 'Reflective Strip']
      },
      {
        name: 'Head & Face Protection',
        items: ['Industrial Safety Helmets', 'Welding Shields', 'Face Shields', 'Safety Goggles'],
        targetAudience: 'Construction & Welders',
        filters: ['Color Code', 'Impact Resistance', 'Ventilation']
      },
      {
        name: 'Hand & Footwear Safety',
        items: ['Steel-Toe Safety Shoes', 'Heat-Resistant Gloves', 'Nitrile Chemical Gloves', 'Anti-Cut Gloves'],
        targetAudience: 'Logistics & Manufacturing',
        filters: ['Shoe Size', 'Coating Material', 'Cut Resistance']
      },
      {
        name: 'Respiratory & Fall Protection',
        items: ['N95 Dust Masks', 'Double-Cartridge Gas Masks', 'Full-Body Safety Harnesses', 'Fall Arrest Lanyards'],
        targetAudience: 'Height Workers & Chemical',
        filters: ['Filter Rating', 'Harness Points', 'Lanyard Length']
      }
    ]
  },
  {
    name: 'Building Materials',
    subcategories: [
      {
        name: 'Cement & Structural Bindings',
        items: ['Ordinary Portland Cement (OPC)', 'Portland Pozzolana Cement (PPC)', 'White Cement', 'Ready-Mix Mortar'],
        targetAudience: 'Builders & Masonry',
        filters: ['Grade', 'Pack Weight', 'Setting Time']
      },
      {
        name: 'Bricks & Blocks',
        items: ['Fly Ash Bricks', 'Red Clay Bricks', 'Autoclaved Aerated Concrete (AAC) Blocks'],
        targetAudience: 'Infrastructure Projects',
        filters: ['Dimensions', 'Compressive Strength', 'Block Weight']
      },
      {
        name: 'Waterproofing & Chemicals',
        items: ['Waterproofing Compounds', 'Concrete Admixtures', 'Wall Putty', 'Tile Adhesives'],
        targetAudience: 'Civil Contractors',
        filters: ['Application Area', 'Packaging Size', 'Base Type']
      },
      {
        name: 'Reinforcement & TMT Bars',
        items: ['TMT Steel Bars', 'Binding Wire', 'Welded Wire Mesh'],
        targetAudience: 'Structural Engineering',
        filters: ['Diameter', 'Steel Grade', 'Length']
      }
    ]
  },
  {
    name: 'Fasteners & Hardware',
    subcategories: [
      {
        name: 'Screws & Bolts',
        items: ['Wood Screws', 'Machine Screws', 'Hex Bolts', 'Drywall Screws', 'Washers & Nuts'],
        targetAudience: 'Industrial & Retail',
        filters: ['Thread Pitch', 'Head Type', 'Material Finish', 'Length']
      },
      {
        name: 'Anchors & Wall Plugs',
        items: ['Nylon Wall Plugs', 'Expansion Anchors', 'Toggle Bolts', 'Concrete Anchors'],
        targetAudience: 'Construction',
        filters: ['Drill Hole Diameter', 'Load Capacity', 'Wall Type']
      },
      {
        name: 'Architectural Hardware',
        items: ['Butt Hinges', 'Drawer Slides', 'Cabinet Handles', 'L-Brackets'],
        targetAudience: 'Furniture & Interior',
        filters: ['Finish', 'Load Capacity', 'Length', 'Mechanism Type']
      }
    ]
  },
  {
    name: 'Plumbing Supplies',
    subcategories: [
      {
        name: 'Pipes & Fittings',
        items: ['PVC & CPVC Pipes', 'Brass Fittings', 'Elbows', 'Tees', 'Couplings & Unions'],
        targetAudience: 'Contractors & Plumbers',
        filters: ['Pipe Diameter', 'Schedule', 'Connection Type']
      },
      {
        name: 'Valves & Flow Control',
        items: ['Ball Valves', 'Gate Valves', 'Check Valves', 'Non-Return Valves'],
        targetAudience: 'Residential & Commercial',
        filters: ['Pressure Rating', 'Handle Type', 'Material']
      }
    ]
  },
  {
    name: 'Electrical Infrastructure',
    subcategories: [
      {
        name: 'Wiring & Containment',
        items: ['Copper House Wires', 'PVC Conduits & Bends', 'Switch Boxes', 'Cable Ties'],
        targetAudience: 'Electrical Contractors',
        filters: ['Wire Gauge', 'Core Count', 'Conduit Diameter', 'Color']
      },
      {
        name: 'Switchgear & Distribution',
        items: ['Modular Switches & Sockets', 'MCBs', 'Distribution Boards', 'RCCBs'],
        targetAudience: 'Residential & Commercial',
        filters: ['Current Rating', 'Number of Poles', 'Module Count']
      }
    ]
  }
];
