// import React from "react";
import Themes from "./Charts/Themes";

export default function TopKdramaThemes() {
  return (
    <div className='min-h-screen p-6 flex flex-col gap-6 bg-background'>
      <h1 className='text-4xl font-outfit text-siblings-sister font-bold text-center  uppercase'>
        Most common title in the top 100 kdramas
      </h1>
      <Themes />
    </div>
  );
}
