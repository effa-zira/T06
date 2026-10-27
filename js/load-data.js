// Load the CSV file with a row conversion function
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert to number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert to number
    star: +d.star // Convert to number
})).then(data => {
    console.log(data); // Check the console to ensure data is loaded

    // Call functions after data is loaded
    drawHistogram(data);
    drawScatterplot(data);
    populateFilters(data);

    // Call tooltip functions
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});