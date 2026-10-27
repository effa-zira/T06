const populateFilters = (data) => {
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            if (!d.isActive) {
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

                updateHistogram(d.id, data);
            }
        });
};

const updateHistogram = (filterId, data) => {
    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

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

const createTooltip = () => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            tooltip.select("text").text(`${d.screenSize} inches`);

            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            tooltip
                .interrupt()
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            tooltip
                .interrupt()
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};