import React, { useEffect } from "react";
import * as d3 from "d3";

type TData = {
  episode: number;
  sentiment: number;
};

type TRatings = {
  episode: number;
  rating: number;
};
// chart to analyse the emotional growth in the episodes using sentiment analysis
export default function LineChart() {
  const [chartData, setChartData] = React.useState<TData[]>([]);
  const [ratings, setRatings] = React.useState<TRatings[]>([]);
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
      // console.log({ data });
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

    // ratiings
    d3.csv("/assets/episode-ratings.csv").then((data) => {
      const processedData = data.map((item) => {
        const episode = Number(item?.Episode);
        const rating = item?.Ratings;

        return {
          episode: Number(episode) || 0,
          rating: Number(rating) || 0,
        };
      });
      setRatings(processedData);
    });
  }, []);

  useEffect(() => {
    d3.select("#wrapper").selectAll("*").remove(); // clear the svg before drawing

    // x and y axis accessors
    const xAccessor = (d: TData) => d.episode;
    const yAccessor = (d: TData) => d.sentiment;

    const minMaxSentiment = d3.extent(chartData, (d) => d.sentiment) || [
      -30, 30,
    ];
    const minMaxEpisodesRatings = d3.extent(ratings, (d) => d.episode) || [
      1, 16,
    ];

    // console.log({ minMaxEpisodes, minMaxSentiment });

    // d3 scales
    // x scales
    const xScale = d3
      .scaleLinear()
      .domain([1, 16])
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
    const yScaleRatings = d3
      .scaleLinear()
      .domain(minMaxEpisodesRatings as [number, number])
      .range([
        dimensions.height - dimensions.margin.bottom,
        dimensions.margin.top,
      ]);
    const lineGenerator = d3
      .line<TData>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveCardinal.tension(0.5)); // Smooth curve

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
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(d3.range(1, 17))
          .tickFormat(d3.format("d"))
      );

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
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4 4")
        .attr("stroke-width", 2);
    }

    const yAxisRatings = wrapper
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width - dimensions.margin.right}, 0)`
      )
      .call(d3.axisRight(yScaleRatings).ticks(5));

    yAxisRatings.selectAll("path").attr("stroke", "black"); // For the axis line
    yAxisRatings
      .selectAll("text") // Select all tick labels
      .attr("fill", "black") // Set the text color
      .style("font-size", "12px"); // Optional: Set font size

    // Draw the ratings line
    const lineGeneratorRatings = d3
      .line<TRatings>()
      .x((d) => xScale(d.episode))
      .y((d) => yScaleRatings(d.rating))
      .curve(d3.curveCardinal.tension(0.5)); // Smooth curve
    // draw the ratings line

    wrapper
      .append("path")
      .attr("d", lineGeneratorRatings(ratings))
      .attr("fill", "none")
      .attr("stroke", "#8E734B")
      .attr("stroke-width", 3)
      .attr("class", "animated-line-ratings");
    // Draw the x axis label
    wrapper
      .append("text")
      .attr("x", dimensions.width / 2 - dimensions.margin.right)
      .attr("y", dimensions.height + 20)
      .attr("text-anchor", "middle")
      .text("Episodes")
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Draw the y axis label
    wrapper
      .append("text")
      .attr("x", dimensions.margin.left + 10)
      .attr("y", dimensions.margin.top - 10)
      .attr("text-anchor", "middle")
      // .attr("transform", `translate(${0}, ${dimensions.height / 2}) rotate(0)`)
      .text("Sentiments")
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Draw the y axis label for ratings
    wrapper
      .append("text")
      .attr("x", dimensions.width - dimensions.margin.right + 10)
      .attr("y", dimensions.margin.top - 10)
      .attr("text-anchor", "middle")
      // .attr("transform", `translate(${0}, ${dimensions.height / 2}) rotate(0)`)
      .text("Ratings")
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Tiny dots for each episode
    wrapper
      .selectAll(".dot-sentiment")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-sentiment")
      .attr("cx", (d) => xScale(d.episode))
      .attr("cy", (d) => yScale(d.sentiment))
      .attr("r", 4)
      .attr("fill", "#BF894C");

    wrapper
      .selectAll(".dot-rating")
      .data(ratings)
      .enter()
      .append("circle")
      .attr("class", "dot-rating")
      .attr("cx", (d) => xScale(d.episode))
      .attr("cy", (d) => yScaleRatings(d.rating))
      .attr("r", 4)
      .attr("fill", "#8E734B");

    // Tooltip creation
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("padding", "6px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("font-size", "14px")
      .style("display", "none")
      .style("z-index", "9999");

    // 2) Overlay rect to capture mouse events
    wrapper
      .append("rect")
      .attr(
        "width",
        dimensions.width - dimensions.margin.left - dimensions.margin.right
      )
      .attr(
        "height",
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom
      )
      .attr(
        "transform",
        `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
      )
      .style("fill", "transparent")
      .style("pointer-events", "all")
      .on("pointermove", (event) => {
        // 1) pointer relative to <g>
        const [mx] = d3.pointer(event, wrapper.node());

        // 2) bisect and pick the nearest data point
        const x0 = xScale.invert(mx);
        const bisect = d3.bisector((d: TData) => d.episode).left;
        const i = bisect(chartData, x0);
        const d = chartData[i - 1] ?? chartData[0];
        const r = ratings.find((rt) => rt.episode === d.episode);

        // 3) position the tooltip
        tooltip
          .style("display", "block")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 30 + "px").html(`
            <strong>Episode:</strong>  ${d.episode}<br/>
            <strong>Sentiment:</strong>${d.sentiment.toFixed(2)}<br/>
            <strong>Rating:</strong>   ${r?.rating.toFixed(2) ?? "N/A"}
          `);
      })
      .on("pointerout", () => tooltip.style("display", "none"));

    const path = d3.select(".animated-line").node() as SVGPathElement;
    const pathRatings = d3
      .select(".animated-line-ratings")
      .node() as SVGPathElement;
    if (!path) return;
    if (!pathRatings) return;

    const pathLength = path.getTotalLength();
    const pathLengthRatings = pathRatings.getTotalLength();

    // Initial state: hidden
    d3.select(path)
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength);

    d3.select(pathRatings)
      .attr("stroke-dasharray", pathLengthRatings)
      .attr("stroke-dashoffset", pathLengthRatings);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const wrapper = document.getElementById("wrapper");
      if (!wrapper) return;

      const { top, height } = wrapper.getBoundingClientRect();
      const start = top + scrollTop - windowHeight * 0.9; // start animating when half the wrapper is in view
      const end = start + height;

      const scrollPercent = Math.min(
        1,
        Math.max(0, (scrollTop - start) / (end - start))
      );

      const drawLength = pathLength * scrollPercent;
      const drawLengthRatings = pathLengthRatings * scrollPercent;
      d3.select(pathRatings).attr(
        "stroke-dashoffset",
        pathLengthRatings - drawLengthRatings
      );
      d3.select(path).attr("stroke-dashoffset", pathLength - drawLength);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chartData, dimensions, ratings]);

  return <div id="wrapper" className="relative  mx-auto"></div>;
}
