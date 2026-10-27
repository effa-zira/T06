const drawHistogram = (data) => {
    // 6.1 Set up the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Responsive SVG
        
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // 6.2 Generate the bins
    const bins = binGenerator(data);
    
    // 6.3 Define the Scales
    const minEng = bins[0].x0; // Lower bound of first bin
    const maxEng = bins[bins.length - 1].x1; // Upper bound of last bin
    const binsMaxLength = d3.max(bins, d => d.length); // Get max length of bins

    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // Round the y-axis values

    // 6.4 Draw the bars of the histogram
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) // Gap between bars
        .attr("stroke-width", 2);

    // 6.5 Add bottom axis
    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    svg
        .append("text")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // 6.6 Add left axis
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .call(leftAxis);

    svg
        .append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
};