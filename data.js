const margin = ({ top: 10, right: 10, bottom: 20, left: 40 });

const height = 600;

const xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).tickSizeOuter(0))
  .call(g => g.selectAll(".domain").remove());

const yAxis = g => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y).ticks(null, "s"))
  .call(g => g.selectAll(".domain").remove());

const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, height]);

svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .join("rect")
  .attr("x", (d, i) => x(d.data.name))
  .attr("y", d => y(d[1]))
  .attr("height", d => y(d[0]) - y(d[1]))
  .attr("width", x.bandwidth())
  .append("title")
  .text(d => `${d.data.name} ${d.key}
${formatValue(d.data[d.key])}`);

svg.append("g")
  .call(xAxis);

svg.append("g")
  .call(yAxis);
