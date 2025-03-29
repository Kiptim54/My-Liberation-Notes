type TFamily = {
  name: string;
  role: string;
  color: string;
  image: string;
  colorHex: string;
};
function App() {
  const circleStyle =
    "rounded-full bg-primary h-full w-full text-center flex justify-center items-center p-8 text-balance font-bold font-outfit text-xl aspect-square ";

  const family: TFamily[] = [
    {
      name: "Yeom Je-ho",
      role: "Father",
      color: "bg-siblings-father",
      image: "src/assets/cast/My_Liberation_Notes-Cheon_Ho_Jin.jpg",
      colorHex: "border-[#BF894C]",
    },
    {
      name: "Kwak Hye-suk",
      role: "Mother",
      color: "bg-siblings-mother",
      image: "src/assets/cast/My_Liberation_Notes-Lee_Kyung_Sung.jpg",
      colorHex: "border-[#DA4167]",
    },
    {
      name: "Yeom Ki-jeong",
      role: "First Born Daughter",
      color: "bg-siblings-sister",
      image: "src/assets/cast/My_Liberation_Notes-Lee_El01.jpg",
      colorHex: "border-[#871526]",
    },
    {
      name: "Yeom Chang-hee",
      role: "Second Born Son",
      color: "bg-siblings-brother",
      image: "src/assets/cast/My_Liberation_Notes-Lee_Min_Ki1.jpg",
      colorHex: "border-[#6DB1BF]",
    },
    {
      name: "Yeom Mi-jeong",
      role: "Last Born",
      color: "bg-siblings-lastborn",
      image: "src/assets/cast/My_Liberation_Notes-Kim_Ji_Won.jpg",
      colorHex: "border-[#AB6D34]",
    },
    {
      name: "Mr. Gu",
      role: "Worker",
      color: "bg-siblings-gu",
      image: "src/assets/cast/My_Liberation_Notes-Son_Suk_Ku.jpg",
      colorHex: "border-[#3D5A6C]",
    },
  ];
  return (
    <>
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
            <div
              className={`${circleStyle} bg-secondaryLight text-secondary3 `}
            >
              I will not pretend to be unhappy
            </div>
            <div className={`${circleStyle} bg-secondary2`}>
              I will be honest
            </div>
          </div>
        </div>
      </div>

      {/* family introduction */}
      <div className="min-h-screen flex">
        <div className="h-full flex-1 grid grid-cols-1 md:grid-cols-2">
          <div className="h-full min-h-screen bg-main-bg bg-top bg-no-repeat bg-fit order-2 md:order-1 p-6 flex justify-center items-center">
            <div className="bg-secondaryLight p-6 rounded-3xl grid  grid-cols-2 md:grid-cols-3 gap-6 ">
              {family.map((member: TFamily) => (
                <img
                  key={member.name}
                  src={`${member.image || ""}`}
                  alt={member.name}
                  className={`h-40 w-40 rounded-full border-[10px] ${member.colorHex}`}
                />
              ))}
            </div>
          </div>
          <div className="z-0 h-full bg-secondaryLight text-black flex flex-col justify-center items-start gap-6 p-8 order-1 md:order-2">
            <h4 className="text-2xl font-outfit">
              This is the <b>Yeom </b>family living in Sanpo:
            </h4>

            {family.map((member) => (
              <div className="flex items-end gap-2">
                <h5 className="text-xl font-semibold font-outfit">
                  {member.role}:{" "}
                </h5>
                <p className="text-xl relative">
                  <div
                    className={`${member.color} absolute left-2 right-2 top-2 bottom-0 opacity-75 -z-10`}
                  ></div>
                  <p className="block mix-blend-darken">{member.name}</p>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
