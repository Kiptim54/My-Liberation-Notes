import React, { useState, useEffect } from "react";
import { FamilyNames } from "../../types";
import * as d3 from "d3";
import { characterPathToImage, familyList } from "../../constants";
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
    d3.select("#vertical-bar-chart").selectAll("*").remove();
    // x and y axis accessors
    const yAccessor = (d: TData) => d.character;
    const xAccessor = (d: TData) => Number(d.wordCount);
    // d3 scales
    // x scales
    const yScale = d3
      .scaleBand()
      .domain(chartData.map(yAccessor))
      .range([
        dimensions.margin.top,
        dimensions.height - dimensions.margin.bottom,
      ])
      .padding(0.1);

    const minMaxTime = d3.extent(chartData, xAccessor);
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
    const svg = d3
      .select("#vertical-bar-chart")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr(
        "style",
        "max-width: 100%; width:90%; height: 100%; height: intrinsic; background:#EADFCF; padding:12; "
      );
    // create the bars

    //   add tooltip
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
      .data(chartData, (d) => (d as TData).character)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", dimensions.margin.left)
            .attr("y", (d) => yScale(yAccessor(d)) || 0)
            .attr("width", () => xScale(0))
            .attr("height", yScale.bandwidth())
            .attr("fill", (_d, index) => {
              const color = familyList[index]?.colorHexVal;
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
                .attr("y", (d) => yScale(yAccessor(d)) || 0)
                .attr("width", (d) => xScale(xAccessor(d)))
                .attr("height", yScale.bandwidth())
                .attr("fill", (_d, index) => {
                  const color = familyList[index]?.colorHexVal;
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
            .attr("fill", (_d, index) => {
              const color = familyList[index]?.colorHexVal;
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

    // svg
    //   .selectAll("rect")
    //   .data(chartData)
    //   .enter()
    //   .append("rect")
    //   .attr("x", dimensions.margin.left)
    //   .attr("y", (d) => yScale(yAccessor(d)) || 0)
    //   .attr("width", (d) => xScale(xAccessor(d)))
    //   .attr("height", yScale.bandwidth())
    //   .attr("fill", (_d, index) => {
    //     const color = familyList[index]?.colorHexVal;
    //     return color ? color : "steelblue";
    //   })
    //   .attr("rx", 5)
    //   .attr("ry", 5)
    //   .attr("opacity", 0.9);

    svg
      .selectAll("rect")
      .on("mouseover", (event, d) => {
        const data = d as TData;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${
              data.character
            }: <b>${data.wordCount.toLocaleString()} Words Spoken </b>`
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // create the y axis
    svg
      .append("g")
      .attr("transform", `translate(${dimensions.margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

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
        .attr("width", 60)
        .attr("height", 60)
        .attr("x", -30) // adjust as needed for positioning
        .attr("y", -30); // adjust as needed for positioning
    });
    //   add tooltip to tick when hovering on image

    // create the x axis
    svg
      .append("g")
      .attr(
        "transform",
        `translate(0, ${dimensions.height - dimensions.margin.bottom})`
      )
      .call(d3.axisBottom(xScale).ticks(5));

    // add labels
    svg
      .append("text")
      .attr("x", dimensions.width - dimensions.margin.right - 70)
      .attr("y", dimensions.height - dimensions.margin.bottom - 20)
      .attr("text-anchor", "middle")
      .text("Number of Words Spoken")
      .attr("font-size", 10)
      .attr("font-weight", "bold");
  }, [chartData, dimensions]);

  return <div id="vertical-bar-chart" className="mx-auto font-outfit"></div>;
}
