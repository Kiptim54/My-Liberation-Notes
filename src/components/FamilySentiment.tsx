import BarChart from "./Charts/BarChart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FamilySentiment() {
  return (
    <div className="bg-secondaryLight md:min-h-screen text-black p-2 md:px-10  mx-auto w-full">
      <div className=" flex flex-col md:flex-row justify-between items-start p-4">
        <div className="md:w-1/2 flex-2">
          <h3 className="text-2xl md:text-3xl font-bold font-outfit mb-2">
            How happy & unhappy is the Yeom Family?
          </h3>
          <p>
            Here we look at the breakdown of each character through each episode
            and compare their positive and negative sentiments over time...
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
            <SelectContent className="h-[180px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                (episode) => (
                  <SelectItem key={episode} value={`Episode ${episode}`}>
                    Episode {episode}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <BarChart />
    </div>
  );
}
