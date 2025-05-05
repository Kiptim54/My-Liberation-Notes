import React, { useState, useEffect, useRef } from "react";
import { FamilyNames } from "../../types";
import * as d3 from "d3";
import { characterPathToImage, getFamilyColor } from "../../constants";
type TData = {
  character: FamilyNames;
  wordCount: number;
};

type TProps = {
  currentEpisode?: number;
};

interface SpeakerSentiment {
  positive: number;
  negative: number;
  wordcount: number;
}

interface SentimentData {
  string: SpeakerSentiment;
}
export default function VerticalBarChart({ currentEpisode = 1 }: TProps) {
  const [chartData, setChartData] = useState<TData[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
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
    d3.json("/assets/actorsentiment.json").then((data) => {
      if (!data && !currentEpisode) return;
      // console.log(data);
      const typedData = data as SentimentData[];
      const indexedData = typedData[currentEpisode - 1];

      const processedData = Object.entries(indexedData).map(([key, value]) => {
        const character = key as FamilyNames;
        const wordCount = Number(value.wordcount);

        return {
          character,
          wordCount,
        };
      });

      setChartData(processedData);
    });
  }, [currentEpisode]);

  useEffect(() => {
    // clean up the svg before drawing
    const svg = d3.select(svgRef.current);
    // d3.select("#vertical-bar-chart").selectAll("text").remove();
    // x and y axis accessors
    const yAccessor = (d: TData) => d.character;
    const xAccessor = (d: TData) => Number(d.wordCount);
    const sortedData = [...chartData].sort((a, b) => b.wordCount - a.wordCount);

    // d3 scales
    // x scales
    const yScale = d3
      .scaleBand()
      .domain(sortedData.map(yAccessor))
      .range([
        dimensions.margin.top,
        dimensions.height - dimensions.margin.bottom,
      ])
      .padding(0.1);

    const minMaxTime = d3.extent(sortedData, xAccessor);
    console.log({ minMaxTime });
    // y scale
    const xScale = d3
      .scaleLinear()
      .domain(minMaxTime as [number, number])
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ])
      .nice();

    // create the svg
    svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr(
        "style",
        "max-width: 100%; width:90%; height: 100%; height: intrinsic; background:#EADFCF; padding:12; posiytion:relative "
      );
    // create the bars

    //   add tooltip

    const bars = svg
      .selectAll("rect")
      .data(sortedData, (d) => (d as TData).character);

    bars.join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", dimensions.margin.left)
          .attr("y", (d) => yScale(d.character) || 0)
          .attr("width", () => xScale(0))
          .attr("height", yScale.bandwidth())
          .attr("z-index", 1)
          .attr("fill", (d) => {
            const color = getFamilyColor(d.character);
            return color ? color : "steelblue";
          })
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("opacity", 0.9)
          .attr("class", "bar")
          .call((enter) => {
            enter
              .transition()
              .duration(1000)
              .attr("y", (d) => yScale(d.character) || 0)
              .attr("width", (d) => xScale(xAccessor(d)))
              .attr("height", yScale.bandwidth())
              .attr("fill", (d) => {
                const color = getFamilyColor(d.character);
                return color ? color : "steelblue";
              })
              .attr("rx", 5)
              .attr("ry", 5)
              .attr("opacity", 0.9);
          }),

      (update) =>
        update
          .transition()
          .duration(1000)
          .attr("y", (d) => yScale(yAccessor(d)) || 0)
          .attr("width", (d) => xScale(xAccessor(d)))
          .attr("height", yScale.bandwidth())
          .attr("fill", (d) => {
            const color = getFamilyColor(d.character);
            return color ? color : "steelblue";
          })
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("opacity", 0.9),
      (exit) =>
        exit
          .transition()
          .duration(300)
          .attr("height", 0)
          .attr("width", () => xScale(0))
          .attr("y", xScale(0))
          .remove()
      // .remove
    );
    // update the bars

    // add tooltip
    const tooltip = d3
      .select("#vertical-bar-chart")
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
        console.log({ event });
        const data = d as TData;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${
              data.character
            }: <b>${data?.wordCount?.toLocaleString()} Words Spoken </b>`
          )
          .style("left", 0 + "px")
          .style("top", 0 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // create the y axis

    const yAxis = d3.axisLeft(yScale);
    const yAxisGroup = svg
      .selectAll<SVGGElement, null>(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${dimensions.margin.left}, 0)`);
    yAxisGroup
      .transition()
      .duration(800)
      .call(yAxis as d3.Axis<string>); // Explicitly typing yAxis to avoid 'any'

    // // create the x axis
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const xAxisGroup = svg
      .selectAll<SVGGElement, null>(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(0, ${dimensions.height - dimensions.margin.bottom})`
      );
    xAxisGroup
      .transition()
      .duration(800)
      .call(xAxis as d3.Axis<number>); // Explicitly typing xAxis to avoid 'any'

    // add image to y axis ticks

    svg
      .select(".y-axis")
      .selectAll(".tick")
      .each(function (_d, i) {
        const character = sortedData[i]?.character;
        if (!character) return;
        const imageUrl = characterPathToImage(character);
        d3.select(this).select("text").remove();

        d3.select(this)
          .selectAll("image")
          .data([imageUrl])
          .join("image")
          .attr("href", imageUrl)
          .attr("width", 60)
          .attr("height", 60)
          .attr("x", -30)
          .attr("y", -30);
      });

    //   add tooltip to tick when hovering on image

    // add labels
    svg
      .selectAll("#x-axis-label")
      .data([null])
      .join("text")
      .attr("id", "x-axis-label")
      .attr("x", dimensions.width - dimensions.margin.right - 70)
      .attr("y", dimensions.height - dimensions.margin.bottom - 20)
      .attr("text-anchor", "middle")
      .text("Number of Words Spoken")
      .attr("font-size", 10);

    yAxisGroup.raise();
  }, [chartData, dimensions]);

  return (
    <div id="vertical-bar-chart" className="mx-auto font-outfit relative">
      <svg ref={svgRef} className=""></svg>
    </div>
  );
}
