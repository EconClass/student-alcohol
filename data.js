const margin = ({ top: 25, right: 20, bottom: 35, left: 40 });

const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.x)).nice()
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain(d3.extent(data, d => d.y)).nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = g => {
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", width)
      .attr("y", margin.bottom - 4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text(data.x));
};

const render = async () => {
  const data = await d3.csv('data/student-mat.csv');
  console.log(data);
  // const parsed = data.filter(student => {
  //   const { G3, Walc, Dalc } = student;
  //   return G3 && Walc && Dalc;
  // });
  // console.log(parsed);

  const width = height = 200;
  const svg = d3.select('body')
    .append('svg')
    .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .call(xAxis);

  svg.append("g")
    .call(yAxis);

  svg.append("g")
    .call(grid);
};

render();