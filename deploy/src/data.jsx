// UW model extracted from Milana Reserve - Investors Model (Projections + Exit Scenarios sheets)
window.UW = {
  years: ["T12","Y1","Y2","Y3","Y4","Y5","Y6","Y7","Y8","Y9","Y10"],
  calYears: ["T12","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034"],
  // Gross Potential Rent & revenue line (Projections sheet)
  gpr:   [4109818,4211214,4439204,4626837,4788776,4956383,5105075,5258227,5415974,5578453,5745807],
  egi:   [4474291,4523020,4808738,5004326,5176260,5354115,5514738,5680180,5850586,6026103,6206886],
  opex:  [1876619,2080369,2144992,2208839,2278490,2345552,2414004,2484510,2557132,2631932,2708976],
  noi:   [2597672,2442651,2663746,2795487,2897770,3008563,3100734,3195670,3293454,3394171,3497910],
  ds:    [0,1270596,1386104,1386104,1733512,1733512,1748916,1748916,1748916,2243661,2243661],
  cf:    [0,329394,379632,454823,154937,202607,0,0,0,0,0],
  coc:   [0, 0.0546, 0.0629, 0.0754, 0.0257, 0.0336, 0.0352, 0.0392, 0.0429, -0.0357, 0],
  // Capitalization — from Summary sheet
  purchasePrice: 37100000,
  pricePerUnit: 159914,
  closingCosts: 2457355,
  capexUnit: 2233000,
  capexCommon: 334004,
  allIn: 42124359,
  senior: 25812000,
  commonEquity: 6035573,
  instEquity: 10276786,
  totalEquity: 16312359,
  ltc: 0.6128,
  equityPct: 0.3872,
  rateInitial: 0.0537,
  rateRefi: 0.0505,
  capGoingIn: 0.0700, // T-12
  capY1: 0.0658,
  // Exit Scenarios — IRR/EM sensitivity table
  reference: {
    3: { irr: 0.2742, em: 2.0177, cap: 0.0600 },
    5: { irr: 0.2670, em: 3.0610, cap: 0.0600 },
    7: { irr: 0.2901, em: 3.6848, cap: 0.0600 },
  },
  // Year-5 exit proceeds detail (Exit Scenarios sheet, base case)
  exit5: { value: 52825343, closingCost: 528253, instRepay: 10263227, loanRepay: 25080226, netCommon: 16953637 },
};

window.MR = {
  hero: {
    location: "Tampa, Florida",
    meta: [
      { v: "232", l: "Units" },
      { v: "$37.1M", l: "Acquisition" },
      { v: "27.4%", l: "Projected IRR · Yr 3" },
      { v: "2.02×", l: "Equity Multiple" },
    ],
  },

  highlights: [
    { title: "$49K/unit discount to comps",
      body: "Acquired at $159,914/unit — a 23.5% discount to the comp average of $208,920/unit and materially below replacement cost." },
    { title: "Freddie Mac fixed rate",
      body: "$25.8M senior loan at 5.37% fixed, 5-year term, 3-year IO, 30-year amortization — 61.3% LTC." },
    { title: "$170+ rent premium runway",
      body: "In-place rents trail the competitive set across every floor plan. Renovated units underwritten to a ~$170/unit blended market rent lift." },
    { title: "Zero new supply",
      body: "No new multifamily deliveries announced in the Carrollwood submarket through 2026 — reinforcing rent growth and occupancy." },
    { title: "Three-year business plan",
      body: "Projected 27.4% IRR / 2.02× EM at 6.0% exit cap in Year 3 — the base case. Extended hold scenarios: 26.7% / 3.06× at Year 5, 29.0% / 3.68× at Year 7." },
    { title: "Carrollwood address",
      body: "One of Tampa's most established submarkets — minutes from I-275, Westshore Business District, and 2,200+ hospital beds." },
  ],

  exec: [
    { label: "Projected IRR", val: "27.4%", sub: "Year 3 exit · 6.0% cap" },
    { label: "Equity Multiple", val: "2.02×", sub: "Common equity · 3-year business plan" },
    { label: "Purchase Price", val: "$37.1M", sub: "$159,914 / unit" },
    { label: "Price vs. Comps", val: "−23.5%", sub: "$49,006 / unit discount" },
    { label: "Rent Premium Target", val: "$170", sub: "Blended lift to market rent" },
    { label: "Senior Loan", val: "5.37%", sub: "Freddie Mac · 5-yr fixed · 3-yr IO" },
    { label: "Going-In Cap", val: "7.00%", sub: "T-12 NOI basis" },
    { label: "Carrollwood Supply", val: "0", sub: "New deliveries through 2026" },
  ],

  strategy: [
    { n: "01", tag: "Interiors", title: "All 232 units renovated",
      body: "A two-year unit-turn program delivering premium finishes at scale — targeting a blended ~$170/unit market rent lift vs in-place.",
      bullets: ["Quartz countertops & shaker cabinets", "Stainless appliances + LED lighting", "Luxury vinyl plank flooring", "New bath mirrors & shower surrounds"],
      kpi: { v: "$170", l: "Blended rent lift / unit" } },
    { n: "02", tag: "Amenities", title: "Hospitality-grade common areas",
      body: "Targeted capital into amenity areas to reduce turnover, lift NPS, and support premium pricing across the comp set.",
      bullets: ["Modernized fitness facility", "Updated pool furniture & cabanas", "Upgraded summer kitchen", "Lakeside trail & landscaping"],
      kpi: { v: "$25 / mo", l: "Smart Rent ancillary per unit" } },
    { n: "03", tag: "Operations", title: "Revenue management & margin",
      body: "A new management platform with revenue-management software, expense rationalization, and in-place pricing discipline.",
      bullets: ["8.45% value-add GPR growth Yrs 1–2", "3.0% p.a. market GPR thereafter", "2.75% of EGI management fee", "Valet trash, EV, renter's insurance"],
      kpi: { v: "$1,646", l: "Avg. market rent target" } },
  ],

  capStack: [
    { k: "Purchase Price", v: "$37,100,000" },
    { k: "Closing Costs", v: "$2,457,355" },
    { k: "CapEx — Unit Renovations", v: "$2,233,000" },
    { k: "CapEx — Common Areas", v: "$334,004" },
    { k: "All-In Cost", v: "$42,124,359", total: true },
    { k: "Senior Loan (61.3% LTC)", v: "$25,812,000" },
    { k: "Common Equity (37%)", v: "$6,035,573" },
    { k: "Institutional Equity (63%)", v: "$10,276,786" },
    { k: "Total Equity (38.7%)", v: "$16,312,359", total: true },
  ],

  unitMix: [
    { units: 60, type: "1BR/1BA (A1)", sf: 532, cur: 1325, mkt: 1399 },
    { units: 80, type: "1BR/1BA (A2)", sf: 648, cur: 1385, mkt: 1499 },
    { units: 20, type: "2BR/1BA (B1)", sf: 848, cur: 1585, mkt: 1850 },
    { units: 60, type: "2BR/2BA (B2)", sf: 948, cur: 1643, mkt: 1950 },
    { units: 12, type: "2BR/2BA (B3)", sf: 1110, cur: 1829, mkt: 1999 },
  ],

  rentComps: [
    { name: "Milana Reserve", yr: 1985, units: 232, avgSF: 737, rent: 1646, subject: true },
    { name: "Grande Oasis at Carrollwood", yr: 1989, units: 941, avgSF: 892, rent: 1765 },
    { name: "Tuscany Pointe at Tampa Palms", yr: 1985, units: 304, avgSF: 998, rent: 1870 },
    { name: "Haven at Waters Edge", yr: 1985, units: 393, avgSF: 901, rent: 1812 },
    { name: "Carrollwood Station", yr: 1984, units: 336, avgSF: 650, rent: 1423 },
    { name: "Coopers Pond", yr: 1979, units: 463, avgSF: 830, rent: 1722 },
    { name: "Beach Club", yr: 1979, units: 200, avgSF: 763, rent: 1731 },
    { name: "The Park on Waters", yr: 1983, units: 267, avgSF: 825, rent: 1725 },
    { name: "Essex Place", yr: 1990, units: 148, avgSF: 915, rent: 1805 },
    { name: "The Oaks of Woodland", yr: 1986, units: 404, avgSF: 975, rent: 1920 },
    { name: "Rosewood", yr: 1984, units: 66, avgSF: 858, rent: 1950 },
  ],

  salesComps: [
    { name: "Milana Reserve", yr: 1985, units: 232, price: 37_100_000, ppu: 159914, date: "Subject", subject: true },
    { name: "St. James Crossing", yr: 1986, units: 264, price: 49_295_100, ppu: 186724, date: "May-24" },
    { name: "Oak Ramble", yr: 1986, units: 256, price: 48_221_700, ppu: 188366, date: "May-24" },
    { name: "Buena Vista", yr: 1985, units: 240, price: 42_500_000, ppu: 177083, date: "Nov-23" },
    { name: "Greenbriar Apartments", yr: 1970, units: 28, price: 5_300_000, ppu: 189286, date: "Jul-25" },
    { name: "The Pointe at Clearwater", yr: 1970, units: 33, price: 6_300_000, ppu: 190909, date: "Jun-25" },
    { name: "Valencia at Westchase", yr: 1996, units: 312, price: 69_000_000, ppu: 221154, date: "Dec-25" },
    { name: "Magnolia Carillon", yr: 1998, units: 314, price: 97_000_000, ppu: 308917, date: "Oct-25" },
  ],

  noi: [
    { y: "T-12",    egi: 4474291, exp: 1876619, noi: 2597672, ds: 0,       cf: 0 },
    { y: "FY1 '25", egi: 4523020, exp: 2080369, noi: 2442651, ds: 1270596, cf: 329394 },
    { y: "FY2 '26", egi: 4808738, exp: 2144992, noi: 2663746, ds: 1386104, cf: 379632 },
    { y: "FY3 '27", egi: 5004326, exp: 2208839, noi: 2795487, ds: 1386104, cf: 454823 },
    { y: "FY4 '28", egi: 5176260, exp: 2278490, noi: 2897770, ds: 1733512, cf: 154937 },
    { y: "FY5 '29", egi: 5354115, exp: 2345552, noi: 3008563, ds: 1733512, cf: 202607 },
    { y: "FY6 '30", egi: 5514738, exp: 2414004, noi: 3100734, ds: 1748916, cf: 0 },
  ],

  coc: [5.5, 6.3, 7.5, 2.6, 3.4, 3.5],

  sectors: [
    { name: "Healthcare & Social Assistance", pct: 18 },
    { name: "Trade & Transportation", pct: 16 },
    { name: "Professional & Business Services", pct: 15 },
    { name: "Leisure & Hospitality", pct: 11 },
    { name: "Financial Activities", pct: 10 },
    { name: "Government", pct: 9 },
    { name: "Education", pct: 8 },
    { name: "Other", pct: 13 },
  ],

  rankings: [
    { rank: "#1", text: "Best Place to Live in Florida", src: "Forbes" },
    { rank: "#1", text: "Most Desirable City in the U.S.", src: "Clever Real Estate" },
    { rank: "#2", text: "Best Place to Start a Business", src: "WalletHub" },
    { rank: "#4", text: "City for Quality of Life", src: "Forbes" },
    { rank: "#4", text: "U.S. Market to Watch 2024–25", src: "PwC / ULI" },
  ],

  hospitals: [
    { name: "AdventHealth Carrollwood", mi: 1.7, min: 5, beds: 120, x: 42, y: 58 },
    { name: "St. Joseph's Hospital", mi: 4.3, min: 10, beds: 615, x: 56, y: 70 },
    { name: "Kindred Hospital Central Tampa", mi: 4.3, min: 10, beds: 102, x: 62, y: 64 },
    { name: "AdventHealth Tampa", mi: 7.7, min: 15, beds: 626, x: 70, y: 78 },
    { name: "Moffitt Cancer Center", mi: 7.6, min: 15, beds: 314, x: 32, y: 32 },
    { name: "James A. Haley VA", mi: 7.0, min: 14, beds: 500, x: 68, y: 40 },
    { name: "Johns Hopkins All Children's", mi: 6.8, min: 13, beds: 259, x: 30, y: 85 },
  ],

    photos: (function() {
      const R = (typeof window !== 'undefined' && window.resolvePhoto) ? window.resolvePhoto : (p => p);
      return {
    // Exterior / amenities
    exterior:     R("/images/photo-exterior-front.jpg"),
    exterior2:    R("/images/photo-exterior-front.jpg"),
    exteriorSide: R("/images/photo-exterior-front.jpg"),
    pool:         R("/images/photo-pool-main.jpg"),
    poolSide:     R("/images/photo-pool-side.jpg"),
    poolWide:     R("/images/photo-pool-wide.jpg"),
    outdoorKitchen: R("/images/photo-outdoor-kitchen.jpg"),
    // Interiors — all real photos
    living1:      R("/images/photo-living-styled.jpg"),
    living2:      R("/images/photo-living-airy.jpg"),
    bedroom:      R("/images/photo-bedroom-real.jpg"),
    bathroom:     R("/images/photo-bathroom-real.jpg"),
    // Aliases for any older refs.
    kitchen:      R("/images/photo-living-airy.jpg"),
    staged:       R("/images/photo-living-styled.jpg"),
    stagedWide:   R("/images/photo-living-airy.jpg"),
    fitness:      R("/images/photo-living-airy.jpg"),
    clubhouse:    R("/images/photo-pool-main.jpg"),
    leasing:      R("/images/photo-exterior-front.jpg"),
    site:         R("/images/photo-exterior-front.jpg"),
      };
    })(),
};
