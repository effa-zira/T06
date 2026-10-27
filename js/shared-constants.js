// Dimensions and margins (from instructions)
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 880;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Colors (from instructions)
const barColor = "#606464";
const bodyBackgroundColor = "#fdfaf0";

// Scales (from instructions)
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Create a bin generator using d3.bin (from instructions)
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // Accessor for energyConsumption

// Filter options (from instructions)
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];