import Header from "./components/Header";
import FamilyIntro from "./components/FamilyIntro";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

function App() {
  return (
    <div className="font-playfair">
      <Header />
      {/* family introduction */}
      <FamilyIntro />
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
            maxime atque esse totam ipsam excepturi quae non deserunt! Quo
            numquam aspernatur fuga aliquam blanditiis debitis possimus ratione
            totam libero sit voluptate in iste non nesciunt rem culpa quia
            perspiciatis iure id nostrum, commodi excepturi expedita.
            Dignissimos nisi porro accusantium esse ea ut quae? Cupiditate iure
            enim ab est, accusantium corporis veritatis aliquam molestiae
            sapiente sint a eius et animi accusamus magni beatae eligendi?
          </p>
        </div>
      </div>
      <div className="bg-secondaryLight text-black p-2 md:px-10  mx-auto w-full">
        <div className=" flex flex-col md:flex-row justify-between items-start p-4">
          <div className="md:w-1/2 flex-2">
            <h3 className="text-2xl md:text-3xl font-bold font-outfit mb-2">
              How happy & unhappy is the Yeom Family?
            </h3>
            <p>
              Here we look at the breakdown of each character through each
              episode and compare their positive and negative sentiments over
              time...
            </p>
          </div>
          <div className="my-4 md:my-0 ">
            <p className="text-sm font-outfit mb-2">Filter by Episode:</p>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select Episode"
                  className="font-outfit"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Episode 1</SelectItem>
                <SelectItem value="dark">Episode 2</SelectItem>
                <SelectItem value="system">Episode 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <BarChart />
      </div>
    </div>
  );
}

export default App;
