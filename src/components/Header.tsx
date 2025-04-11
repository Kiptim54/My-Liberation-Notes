export default function Header() {
  const circleStyle =
    "rounded-full bg-primary h-full w-full text-center flex justify-center items-center p-8 text-balance font-bold font-outfit text-xl aspect-square ";
  return (
    <div className="relative  bg-main-bg bg-cover bg-fixed bg-no-repeat bg-top font-playfair ">
      <div className="bg-gray-900 absolute inset-0 bg-opacity-10"></div>
      <div className="container mx-auto p-4 flex justify-center flex-col items-center text-white min-h-screen ">
        <h1 className="text-6xl font-bold font-outfit text-white mix-blend-screen">
          My Liberation Notes
        </h1>
        <p className="text-2xl mt-4 font-semibold mix-blend-overlay">
          A data story on the emotional growth of the MLN Cast{" "}
        </p>
      </div>
      {/* rules of the club */}
      <div className="min-h-screen container mx-auto p-4 text-white text-center">
        <h1 className="text-2xl md:text-4xl font-bold font-outfit mix-blend-screen text-white mb-12 text-center">
          There are 3 rules in the Liberation club:
        </h1>
        <div className="grid gap-12 p-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center">
          <div className={`${circleStyle}  bg-secondary3`}>
            I will not pretend to be happy
          </div>
          <div className={`${circleStyle} bg-secondaryLight text-secondary3 `}>
            I will not pretend to be unhappy
          </div>
          <div className={`${circleStyle} bg-secondary2`}>I will be honest</div>
        </div>
      </div>
    </div>
  );
}
