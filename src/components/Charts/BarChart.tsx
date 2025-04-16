import React, { useEffect, useState } from "react";
import { FamilyNames } from "../../types";
import { characterPathToImage } from "../../constants";
import * as d3 from "d3";
type TData = {
  character: FamilyNames;
  positive: number;
  negative: number;
};
export default function BarChart() {
  const [chartData, setChartData] = useState<TData[]>([]);
  const dimensions = React.useMemo(
    () => ({
      width: 800,
      // if small screen height 700 else 400
      height: window.innerWidth < 768 ? 900 : 400,
      margin: { top: 20, right: 30, bottom: 30, left: 40 },
    }),
    []
  );

  useEffect(() => {
    d3.csv("/assets/actor_sentiments.csv").then((data) => {
      console.log({ data });
      const processedData = data.map((item) => {
        const character = item?.Character as FamilyNames;
        const positive = Number(item?.Positive);
        const negative = Number(item.Negative);

        return {
          character,
          positive,
          negative,
        };
      });
      setChartData(processedData);
    });
  }, []);

  useEffect(() => {
    console.log({ chartData });
    d3.select("#bar-wrapper").selectAll("*").remove(); // clear the svg before drawing

    // x and y axis accessors
    const xAccessor = (d: TData) => d.character;
    const yAccessor = (d: TData) => d.positive;
    const yAccessor2 = (d: TData) => d.negative;

    // d3 scales
    // x scales
    const xScale = d3
      .scaleBand()
      .domain(chartData.map(xAccessor))
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ])
      .padding(0.2);

    // y scale
    const minNegative = d3.min(chartData, yAccessor2) ?? 0;
    const maxPositive = d3.max(chartData, yAccessor) ?? 0;

    const yScale = d3
      .scaleLinear()
      .domain([minNegative, maxPositive])
      .range([
        dimensions.height - dimensions.margin.bottom,
        dimensions.margin.top,
      ]);

    // console.log(
    //   chartData.map((x) => {
    //     console.log(x);
    //     console.log(yScale(x.positive), yScale(x.negative));
    //   })
    // );

    const svg = d3
      .select("#bar-wrapper")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr(
        "style",
        "max-width: 100%; width:95%; height: 100%; height: intrinsic; background:#EADFCF; padding:12; margin:auto"
      );

    // Positive bars
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.character) || 0)
      .attr("y", (d) => yScale(d.positive))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.abs(yScale(d.positive) - yScale(0)))
      .attr("fill", "orange")
      .attr("opacity", 0.8);

    // Negative bars
    svg
      .selectAll(".bar2")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", (d) => xScale(d.character) || 0)
      .attr("y", () => yScale(0))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.abs(yScale(0) - yScale(d.negative)))
      .attr("fill", "steelblue")
      .attr("opacity", 0.8);

    //   add tooltip
    const tooltip = d3
      .select("#bar-wrapper")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "#fff")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("pointer-events", "none");
    svg
      .selectAll("rect")
      .on("mouseover", function (event, d) {
        const data = d as TData;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `<b>${data.character}</b>: <br/> Positive: ${data.positive} <br/> Negative: ${data.negative}`
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });
    // x axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${yScale(0)})`)
      .call(d3.axisBottom(xScale));

    // svg
    //   .append("line")
    //   .attr("x1", dimensions.margin.left)
    //   .attr("x2", dimensions.width - dimensions.margin.right)
    //   .attr("y1", yScale(0))
    //   .attr("y2", yScale(0))
    //   .attr("stroke", "black")
    //   .attr("stroke-width", 0);

    // in the x axis instead of the name I want the photo of the character as the label
    // svg
    //   .selectAll(".tick text")
    //   .attr("transform", "translate(0, 20)")
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", "10px")
    //   .attr("fill", "black");

    svg.selectAll(".tick").each(function (_d, i) {
      const character = chartData[i]?.character;
      if (!character) return;
      const imageUrl = characterPathToImage(character);

      // Remove existing text
      d3.select(this).select("text").remove();

      // Append image instead
      d3.select(this)
        .append("image")
        .attr("href", imageUrl) // modern browsers prefer `href` over `xlink:href`
        .attr("width", 70)
        .attr("height", 70)
        .attr("x", -35) // adjust as needed for positioning
        .attr("y", -35); // adjust as needed for positioning
    });

    // add a legend
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${0}, ${dimensions.height - dimensions.margin.bottom - 10})`
      );
    legend
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "orange")
      .attr("opacity", 0.8);
    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 10)
      .text("Positive Sentiments")
      .style("font-size", "12px")
      .attr("fill", "black");
    legend
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("y", 20)
      .attr("fill", "steelblue")
      .attr("opacity", 0.8);
    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 30)
      .text("Negative Sentiments")
      .style("font-size", "12px")
      .attr("fill", "black");
  }, [chartData, dimensions]);
  return <div id="bar-wrapper" className="w-full mx-auto font-outfit"></div>;
}
