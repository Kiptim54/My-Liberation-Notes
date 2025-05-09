import LineChart from "./Charts/LineChart";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

export default function EpisodesSentiments() {
  const [showTextGuide, setShowTextGuide] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-secondaryLight">
      <div className="flex flex-col justify-center p-6 gap-4">
        <LineChart showTextGuide={showTextGuide} />
        <div className="items-top flex space-x-2 px-6">
          <Checkbox
            id="terms1"
            checked={showTextGuide}
            onCheckedChange={(checked) => {
              setShowTextGuide(checked === true);
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Line/Text Guides
            </label>
            <p className="text-sm text-muted-foreground">
              This will highlight interesting episode and things that happened
            </p>
          </div>
        </div>
      </div>
      <div className="bg-secondaryLight flex flex-col  text-black justify-center p-6 gap-4">
        <p className=" text-xl font-extrabold ">
          Episode{" "}
          <span className="relative">
            {" "}
            <span className="relative z-10 font-semibold ">
              Sentiments
            </span>{" "}
            <span className="bg-secondary2 inset-0 absolute -z-0 w-[80%] opacity-60 mx-auto"></span>{" "}
          </span>{" "}
          vs{" "}
          <span className="relative">
            {" "}
            <span className="relative z-10 font-semibold ">Ratings</span>
            <span className="bg-secondary3 inset-0 absolute -z-0 w-[80%] opacity-80 mx-auto"></span>
          </span>
          :
        </p>
        <p className="font-outfit text-normal">
          Most stories follow a tried and tested formula: plot setup, rising
          action, climax, and resolution. K-dramas, in particular, are beloved
          for this emotional rhythm — a rollercoaster that delivers catharsis
          just in time for the next ride. <br /> <br />
          But My Liberation Notes dares to break that mold. In this story, for
          the most part, nothing “happens.” Characters wake up, commute to work,
          return home, eat, talk, and repeat — a quiet loop of daily existence.
          For some viewers, this was frustratingly mundane; for others, it was
          meditative, even healing. The show doesn’t ask for our attention with
          plot twists — it holds up a mirror instead. And through that mirror,
          it seems to ask, "Isn't that sad? Isn't that us?" <br />
          <br /> It’s no surprise then that the sentiment scores across episodes
          skew mostly negative — weighted by the characters’ burdens,
          disillusionment, and emotional fatigue. Moments of hope do appear,
          like flickers in the dark, but they're often fleeting. <br />
          <br /> Still, the viewer ratings tell a different story. Despite the
          consistently low sentiment, ratings steadily rise —{" "}
          <b>starting at 2.9 and ending at 6.7.</b> <br />
          <br />
          The only positively scored episode, Episode 12, aligns with one of the
          highest-rated points in the series. But even the emotionally heavier
          later episodes (Episodes 13–16) outperform the earlier ones in
          ratings. This suggests that viewers were not deterred by sadness —
          they were drawn to its authenticity.
        </p>
      </div>
    </div>
  );
}
