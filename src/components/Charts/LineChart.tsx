import React, { useEffect } from "react";
import * as d3 from "d3";

type TData = {
  episode: number;
  sentiment: number;
};
// chart to analyse the emotional growth in the episodes using sentiment analysis
export default function LineChart() {
  const [chartData, setChartData] = React.useState<TData[]>([]);
  const dimensions = React.useMemo(
    () => ({
      width: 800,
      height: 500,
      margin: { top: 20, right: 30, bottom: 30, left: 40 },
    }),
    []
  );

  useEffect(() => {
    d3.csv("/assets/episode-emotion-sentiment.csv").then((data) => {
      console.log({ data });
      const processedData = data.map((item) => {
        const episode = Number(item?.Episode);
        const sentiment = item?.Sentiment;

        return {
          episode: Number(episode) || 0,
          sentiment: Number(sentiment) || 0,
        };
      });
      setChartData(processedData);
    });
  }, []);

  useEffect(() => {
    d3.select("#wrapper").selectAll("*").remove(); // clear the svg before drawing

    // x and y axis accessors
    const xAccessor = (d: TData) => d.episode;
    const yAccessor = (d: TData) => d.sentiment;

    const minMaxEpisodes = d3.extent(chartData, (d) => d.episode) || [1, 16];
    const minMaxSentiment = d3.extent(chartData, (d) => d.sentiment) || [
      -30, 30,
    ];

    console.log({ minMaxEpisodes, minMaxSentiment });

    // d3 scales
    // x scales
    const xScale = d3
      .scaleLinear()
      .domain(minMaxEpisodes as [number, number])
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ]);

    // y scale
    const yScale = d3
      .scaleLinear()
      .domain(minMaxSentiment as [number, number])
      .range([
        dimensions.height - dimensions.margin.bottom,
        dimensions.margin.top,
      ]);

    const lineGenerator = d3
      .line<TData>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    const wrapper = d3
      .select("#wrapper")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr(
        "style",
        "max-width: 100%; height: 100%; height: intrinsic; background:#EADFCF; padding:12"
      )
      .append("g");
    // .attr(
    //   "transform",
    //   `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    // );

    // draw the x axis
    const xAxis = wrapper
      .append("g")
      .attr(
        "transform",
        `translate(0, ${dimensions.height - dimensions.margin.bottom})`
      )
      .call(d3.axisBottom(xScale));

    xAxis.selectAll("text").attr("fill", "black").style("font-size", "12px");

    xAxis.selectAll("path").attr("stroke", "black"); // For the axis line

    // draw the y axis
    const yAxis = wrapper
      .append("g")
      .attr("transform", `translate(${dimensions.margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));

    yAxis.selectAll("path").attr("stroke", "black"); // For the axis line
    yAxis
      .selectAll("text") // Select all tick labels
      .attr("fill", "black") // Set the text color
      .style("font-size", "12px"); // Optional: Set font size

    // draw the line
    wrapper
      .append("path")
      .attr("d", lineGenerator(chartData))
      .attr("fill", "none")
      .attr("stroke", "#BF894C")
      .attr("stroke-width", 3)
      .attr("class", "animated-line");

    const zeroY = yScale(0);

    // Draw the zero line
    if (!isNaN(zeroY)) {
      wrapper
        .append("line")
        .attr("x1", dimensions.margin.left || 0)
        .attr("x2", dimensions.width - (dimensions.margin.right || 0))
        .attr("y1", zeroY)
        .attr("y2", zeroY)
        .attr("stroke", "#3D5A6C")
        .attr("stroke-dasharray", "4 4")
        .attr("stroke-width", 2);
    }

    // Draw the x axis label
    wrapper
      .append("text")
      .attr("x", dimensions.width - dimensions.margin.right - 20)
      .attr("y", dimensions.height - dimensions.margin.bottom - 20)
      .attr("text-anchor", "middle")
      .text("Episodes")
      .style("font-size", "16px");

    // Draw the y axis label
    wrapper
      .append("text")
      .attr("x", dimensions.margin.left + 10)
      .attr("y", dimensions.margin.top - 10)
      .attr("text-anchor", "middle")
      // .attr("transform", `translate(${0}, ${dimensions.height / 2}) rotate(0)`)
      .text("Sentiments")
      .style("font-size", "16px");
    // Tooltip creation
    const tooltip = d3
      .select("#wrapper")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "6px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("display", "none")
      .style("z-index", "10");

    // Add circles for each data point
    wrapper
      .selectAll("circle")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.episode))
      .attr("cy", (d) => yScale(d.sentiment))
      .attr("r", 5)
      .attr("fill", "#BF894C")
      .on("mouseover", function (event, d) {
        console.log(event);
        tooltip
          .style("display", "block")
          .html(
            `<div class="text-black"><strong >Episode:</strong> ${
              d.episode
            }<br/><strong">Sentiment:</strong> ${d.sentiment.toFixed(2)}</div>`
          );
      })
      .on("mousemove", function (event) {
        const [mouseX, mouseY] = d3.pointer(event);

        const bisect = d3.bisector((d: TData) => d.episode).right;
        const index = bisect(chartData, mouseX);
        const closestDataPoint = chartData[index];

        const tooltipWidth = 120;
        const tooltipHeight = 50;

        // Calculate initial position
        let left = mouseX + 10;
        let top = mouseY - tooltipHeight - 10;

        // Adjust if tooltip goes beyond the right edge
        if (left + tooltipWidth > dimensions.width - 10) {
          left = mouseX - tooltipWidth - 20;
        }

        // Adjust if tooltip goes above the top edge
        if (top < 0) {
          top = mouseY + 40;
        }

        tooltip
          .style("left", `${left}px`)
          .style("top", `${top}px`)
          .style("display", "block")
          .html(
            `<strong>Episode:</strong> ${closestDataPoint.episode}<br/>
             <strong>Sentiment:</strong> ${closestDataPoint.sentiment.toFixed(
               2
             )}`
          );
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

    const path = d3.select(".animated-line").node() as SVGPathElement;
    if (!path) return;

    const pathLength = path.getTotalLength();

    // Initial state: hidden
    d3.select(path)
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const wrapper = document.getElementById("wrapper");
      if (!wrapper) return;

      const { top, height } = wrapper.getBoundingClientRect();
      const start = top + scrollTop - windowHeight; // start animating when half the wrapper is in view
      const end = start + height;

      const scrollPercent = Math.min(
        1,
        Math.max(0, (scrollTop - start) / (end - start))
      );

      const drawLength = pathLength * scrollPercent;
      d3.select(path).attr("stroke-dashoffset", pathLength - drawLength);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chartData, dimensions]);

  return (
    <div
      id="wrapper"
      className="relative w-full md:w-1/2 h-screen overflow-hidden"
    ></div>
  );
}
