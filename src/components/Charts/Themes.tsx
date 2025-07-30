import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export interface IKdrama {
  ID: number;
  Title: string;
  Genre: string;
  Tags: string;
  Synopsis: string;
  Rank: number;
  Popularity: number;
  Score: number;
  Episodes: number;
  Duration: number;
  Watchers: string;
  Start_date: string;
  End_date: string;
  Day_aired: string;
  "Main Role": string;
}
export default function Themes() {
  const [kdrama, setKdrama] = useState<IKdrama[]>([]);
  const [wordFrequency, setWordFrequency] = useState<Record<string, number>>(
    {}
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  //   const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    d3.csv("/assets/top100_kdrama.csv", (d) => ({
      ID: +d.ID!,
      Title: d.Title!,
      Genre: d.Genre!,
      Tags: d.Tags!,
      Synopsis: d.Synopsis!,
      Rank: +d.Rank!,
      Popularity: +d.Popularity!,
      Score: +d.Score!,
      Episodes: +d.Episodes!,
      Duration: +d.Duration!,
      Watchers: d.Watchers!,
      Start_date: d.Start_date!,
      End_date: d.End_date!,
      Day_aired: d.Day_aired!,
      "Main Role": d["Main Role"]!,
    })).then((data) => {
      setKdrama(data as IKdrama[]);
    });
  }, []);

  useEffect(() => {
    const cleanWords: string[] = [];
    // split title into words
    kdrama.map((item: IKdrama) => {
      cleanWords.push(...item.Title.split(/\s+/).filter(Boolean));
    });

    const ignoreWords = [
      "the",
      "and",
      "of",
      "to",
      "a",
      "in",
      "is",
      "for",
      "with",
      "on",
      "this",
      "that",
      "it",
      "as",
      "by",
      "at",
      "an",
      "my",
    ];
    const wordFrequency = cleanWords.reduce(
      (acc: Record<string, number>, word: string) => {
        const cleanedWord = word.toLowerCase().replace(/[^a-z]/g, "");
        if (cleanedWord && !ignoreWords.includes(cleanedWord)) {
          acc[cleanedWord] = (acc[cleanedWord] || 0) + 1;
        }
        return acc;
      },
      {}
    );

    setWordFrequency(wordFrequency);
  }, [kdrama]);

  useEffect(() => {
    const words = Object.keys(wordFrequency).map((word: string) => {
      return {
        text: `${word}`,
        size: wordFrequency[word] * 20, // Scale size for visibility
      };
    });

    cloud()
      .size([960, 500])
      .words(words)
      .padding(5)
      .rotate(() => Math.floor(Math.random() * 2) * 90)
      .font("sans-serif")
      .fontSize((d) => d.size as number)
      .on("end", (words) => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg
          .attr("width", 960)
          .attr("height", 500)
          .append("g")
          .attr("transform", "translate(480,250)")
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (d) => `${d.size}px`)
          .style(
            "fill",
            () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
          )
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`
          )
          .text((d) => `${d.text}` as string)
          .on("mouseover", function (_event, d: any) {
            const tooltip = tooltipRef.current;
            if (tooltip) {
              tooltip.style.display = "block";
              tooltip.textContent = `${d.text}: ${d.size / 20} used times`; // since you used size = freq * 20
            }
          })
          .on("mousemove", function (event) {
            const tooltip = tooltipRef.current;
            if (tooltip) {
              tooltip.style.left = event.pageX + 10 + "px";
              tooltip.style.top = event.pageY - 20 + "px";
            }
          })
          .on("mouseout", function () {
            const tooltip = tooltipRef.current;
            if (tooltip) {
              tooltip.style.display = "none";
            }
          });
      })
      .start();

    console.log(words);
  }, [wordFrequency]);

  return (
    <div className='flex flex-col items-center justify-center p-6'>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          pointerEvents: "none",
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "14px",
          zIndex: 100,
        }}
      ></div>
      {/* <pre>{JSON.stringify(kdrama.slice(0, 5), null, 2)}</pre> */}
    </div>
  );
}
