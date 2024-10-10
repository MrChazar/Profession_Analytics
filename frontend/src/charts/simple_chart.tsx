import * as d3 from 'd3';

export function setupD3(container: HTMLElement) {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;


  async function render_line_chart_from_csv(filepath: string) {
    let response = await d3.csv(filepath, function(data) {
      const date = d3.timeParse("%Y-%m-%d")(data.date);
      if (date === null) {
        throw new Error(`Invalid date ${data.date}`);
      }
      return {
        date: date,
        close: +data.close
      }
    });

    render_data(response);
  }

  render_line_chart_from_csv("./aapl.csv");

  interface Datapoint {
    date: Date,
    close: number
  }

  function render_data(data: Datapoint[]) {
    // Declare the x (horizontal position) scale.

    const x = d3.scaleUtc()
      .domain((d3.extent(data, function(d: Datapoint) { return d.date })) as [Date, Date])
      .range([marginLeft, width - marginRight]);


    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.close)] as number[])
      .range([height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line<Datapoint>()
      .x(d => x(d.date))
      .y(d => y(d.close));

    // Create the SVG container.
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Add the x-axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"));

    // Append a path for the line.
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    container.append(svg.node()!);
  }
  return container;
}