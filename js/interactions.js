const populateFilters = (data) => {
    // 7.3 Set up buttons and event listeners
    d3.select("#filters_screen")
        .selectAll(".filter-btn")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter-btn ${d.isActive ? 'active' : ''}`)
        .text(d => d.label)
        .on("click", (event, d) => {
            // Update the state of the buttons
            filters_screen.forEach(filter => {
                filter.isActive = (filter.id === d.id);
            });

            // Update the button classes (UI)
            d3.selectAll(".filter-btn")
                .classed("active", filter => filter.isActive);

            // Call the update function
            updateHistogram(d.id, data);
        });
};

// 7.4 Update the histogram
const updateHistogram = (filterId, data) => {
    // Filter the data
    const updatedData = filterId === "all" 
        ? data 
        : data.filter(d => d.screenTech === filterId);

    // Update the bins
    const updatedBins = binGenerator(updatedData);

    // Update the y-axis scale in case the max frequency changed
    const binsMaxLength = d3.max(updatedBins, d => d.length);
    yScale.domain([0, binsMaxLength]).nice();

    // Update the y-axis
    d3.select("#histogram g").selectAll(".y-axis").remove(); // Clear old axis
    d3.select("#histogram g")
        .append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    // Draw the new bars with a nice transition
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};