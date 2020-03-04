const margin = { top: 25, right: 20, bottom: 35, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

const svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


data = d3.csv("data/student-mat.csv")
  .then(data => {
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => Number(d.age))).nice()
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => Number(d.Walc) + Number(d.Dalc))).nice()
      .range([height - margin.bottom, margin.top]);

    console.log('DATA ARRAY\n', data);
    // Add the x-axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom + 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text('Age'));

    // Add the y-axis.
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -margin.left)
        .attr("x", -height / 2 + margin.left)
        .attr("fill", "currentColor")
        .attr("transform", "rotate(-90)")
        .text("Alcohol Consumption"));

    // Add the points!
    svg.append("g")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(Number(d.age)))
      .attr("cy", d => y(Number(d.Walc) + Number(d.Dalc)))
      .attr("r", 3);
  });
