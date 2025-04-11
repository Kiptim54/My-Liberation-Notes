import { familyList } from "../constants";
import { TFamily } from "../types";

export default function FamilyIntro() {
  return (
    <div className="min-h-screen flex">
      <div className="h-full flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="h-full min-h-screen bg-main-bg bg-top bg-no-repeat bg-cover order-2 md:order-1 p-6 flex justify-center items-center">
          <div className="bg-secondaryLight p-6 rounded-3xl grid  grid-cols-2 md:grid-cols-3 gap-6 ">
            {familyList.map((member: TFamily) => (
              <img
                key={member.name}
                src={`${member.image || ""}`}
                alt={member.name}
                className={`rounded-full border-[10px] ${member.colorHex}`}
              />
            ))}
          </div>
        </div>
        <div className="z-0 h-full bg-secondaryLight text-black flex flex-col justify-center items-start gap-6 p-8 order-1 md:order-2">
          <h4 className="text-2xl font-outfit">
            This is the <b>Yeom </b>List living in Sanpo:
          </h4>

          {familyList.map((member) => (
            <div className="flex items-end gap-2" key={member.name}>
              <h5 className="text-xl font-semibold font-outfit">
                {member.role}:{" "}
              </h5>
              <p className="text-xl relative">
                <span
                  className={`${member.color} absolute left-2 right-2 top-2 bottom-0 opacity-75 -z-10`}
                ></span>
                <span className="block mix-blend-darken">{member.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
