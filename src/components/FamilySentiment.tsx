import BarChart from "./Charts/BarChart";
import { useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FamilySentiment() {
  const [currentEpisode, setCurrentEpisode] = useState<number>(1);
  return (
    <div className='bg-secondaryLight md:min-h-screen text-black p-2 md:px-10  mx-auto w-full'>
      <div className=' flex flex-col md:flex-row justify-between items-start p-4'>
        <div className='md:w-1/2 flex-2'>
          <h3 className='text-2xl md:text-3xl font-bold font-outfit mb-2'>
            How happy & unhappy is the Yeom Family?
          </h3>
          <p>
            Here we look at the breakdown of each character through each episode
            and compare their positive and negative sentiments over time...
          </p>
        </div>
        <div className='my-4 md:my-0 flex flex-row items-end gap-2 '>
          <ArrowLeftCircleIcon
            onClick={() => {
              if (currentEpisode === 1) return;
              setCurrentEpisode(currentEpisode - 1);
            }}
            className={`${
              currentEpisode === 1
                ? "text-gray-400"
                : "text-black cursor-pointer"
            } size-6  `}
          />
          <div>
            <p className='text-sm font-outfit mb-2'>Filter by Episode:</p>
            <Select
              onValueChange={(value) => {
                const episode = Number(value.split(" ")[1]);
                setCurrentEpisode(episode);
              }}
              value={`Episode ${currentEpisode}`}
              defaultValue={`Episode ${currentEpisode}`}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue
                  placeholder='Select Episode'
                  className='font-outfit'
                />
              </SelectTrigger>
              <SelectContent className='max-h-[180px]'>
                {[1, 2, 3, 4].map((episode) => (
                  <SelectItem key={episode} value={`Episode ${episode}`}>
                    Episode {episode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ArrowRightCircleIcon
            onClick={() => {
              if (currentEpisode === 4) return;
              setCurrentEpisode(currentEpisode + 1);
            }}
            className={`${
              currentEpisode === 4
                ? "text-gray-400"
                : " text-black cursor-pointer "
            } size-6 `}
          />
        </div>
      </div>
      <div className='md:min-h-screen container mx-auto'>
        <BarChart currentEpisode={currentEpisode} />
      </div>
    </div>
  );
}
