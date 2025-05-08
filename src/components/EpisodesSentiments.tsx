import LineChart from "./Charts/LineChart";

export default function EpisodesSentiments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-secondaryLight">
      <LineChart />
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
          Most stories have a tried and tested formula, and kdramas are
          notorious yet loved for this. From the plot setting, to the rising
          incident, the climax and finally the resolution, these narratives hold
          us captives as we wait for our dopamine hit just to start the cycle
          again.
          <br />
          <br />
          Yet in My Liberation Notes, we could say that, for the most part,
          nothing happens. People wake up, commute to work, commute back home,
          eat and talk and repeat the same day over and over again. For some
          viewers, this was unbearably dull, but to others, this was calming and
          a true representation of daily life. The exhaustion of the cycle of
          life. For all its nothingness, it begs the question, "Isn't that sad,
          isn't that us?"
          <br />
          <br />
          With most characters burdened by life, the sentiments of the episodes
          are mostly negative. Once in a while, there is hope, only for it to be
          dashed and blown out by life.
        </p>
      </div>
    </div>
  );
}
