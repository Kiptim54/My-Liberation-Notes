import LineChart from "./Charts/LineChart";

export default function EpisodesSentiments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-secondaryLight">
      <LineChart />
      <div className="bg-secondaryLight flex flex-col  text-black justify-center p-6 gap-4">
        <p className="font-outfit text-xl  font-bold">
          This is the sentiment progression through the episodes
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui labore
          facere enim culpa non quae dignissimos! Unde reprehenderit inventore
          impedit, natus, odit error eveniet debitis eligendi maiores sequi
          ducimus nulla perferendis ipsa vel laudantium similique reiciendis
          maxime atque esse totam ipsam excepturi quae non deserunt! Quo numquam
          aspernatur fuga aliquam blanditiis debitis possimus ratione totam
          libero sit voluptate in iste non nesciunt rem culpa quia perspiciatis
          iure id nostrum, commodi excepturi expedita. Dignissimos nisi porro
          accusantium esse ea ut quae? Cupiditate iure enim ab est, accusantium
          corporis veritatis aliquam molestiae sapiente sint a eius et animi
          accusamus magni beatae eligendi?
        </p>
      </div>
    </div>
  );
}
