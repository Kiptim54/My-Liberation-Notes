// import Rules from "./Rules";

export default function Header() {
  return (
    <div className='relative  bg-main-bg bg-cover    font-playfair '>
      <div className='bg-gray-900 absolute inset-0 bg-opacity-10'></div>
      <div className='container mx-auto p-4 flex justify-center flex-col items-center text-white min-h-screen '>
        <h1 className='text-6xl font-bold font-outfit text-white mix-blend-screen'>
          My Liberation Notes
        </h1>
        <p className='text-2xl mt-4 font-semibold mix-blend-overlay'>
          A data story on the emotional growth of the MLN Cast{" "}
        </p>
      </div>
      {/* <Rules /> */}
    </div>
  );
}
