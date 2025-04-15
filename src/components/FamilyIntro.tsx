import { familyList } from "../constants";
import { TFamily, FamilyNames } from "../types";
import { useState } from "react";
export default function FamilyIntro() {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<{
    name: FamilyNames;
    role: string;
    color: string;
    image: string;
    colorHex: string;
    bio: string;
    textColor: string;
  }>(familyList[0]);
  const [showFamilyMember, setShowFamilyMember] = useState(false);
  return (
    <div className="min-h-screen flex">
      <div className="h-full flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="h-full min-h-screen bg-main-bg bg-top bg-no-repeat bg-cover order-2 md:order-1 p-6 flex justify-center items-center">
          <div className="bg-secondaryLight p-6 rounded-3xl grid  grid-cols-2 md:grid-cols-3 gap-6 relative overflow-hidden ">
            <>
              {familyList.map((member: TFamily) => (
                <img
                  key={member.name}
                  src={`${member.image || ""}`}
                  alt={member.name}
                  className={`rounded-full border-[10px] cursor-pointer ${member.colorHex}`}
                  onClick={() => {
                    setSelectedFamilyMember(member);
                    setShowFamilyMember(true);
                  }}
                />
              ))}

              <div
                className={`absolute ${
                  showFamilyMember
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-[100%]"
                } transition-transform duration-500 ease-in-out inset-0 overflow-y-scroll md:overflow-hidden bg-secondaryLight text-black p-6 rounded-3xl`}
              >
                <div className="flex flex-col items-center justify-center gap-4 text-center p-2">
                  <img
                    key={selectedFamilyMember.name}
                    src={`${selectedFamilyMember.image || ""}`}
                    alt={selectedFamilyMember.name}
                    className={`rounded-full h-32 w-32 border-[6px]  ${selectedFamilyMember.colorHex} `}
                    onClick={() => {
                      setSelectedFamilyMember(selectedFamilyMember);
                      setShowFamilyMember(true);
                    }}
                  />
                  <div className="flex flex-wrap justify-center gap-2">
                    <h4 className="text-lg font-outfit font-bold">
                      {selectedFamilyMember.role}:
                    </h4>
                    <p
                      className={`text-lg font-semibold font-outfit ${selectedFamilyMember.textColor}`}
                    >
                      {selectedFamilyMember.name}
                    </p>
                  </div>
                  <p>{selectedFamilyMember.bio}</p>
                </div>

                <button
                  className={`absolute top-4 right-6 text-xl font-bold ${selectedFamilyMember.textColor}`}
                  onClick={() => {
                    setShowFamilyMember(false);
                  }}
                >
                  &#10006;
                </button>
              </div>
            </>
          </div>
        </div>
        <div className="z-0 h-full bg-secondaryLight text-black flex flex-col justify-center items-start gap-6 p-8 order-1 md:order-2">
          <h4 className="text-2xl font-outfit">
            This is the <b>Yeom </b>family living in Sanpo:
          </h4>

          {familyList.map((member) => (
            <div className="flex flex-wrap items-end gap-2" key={member.name}>
              <h5 className="md:text-xl font-semibold font-outfit">
                {member.role}:{" "}
              </h5>
              <p className="md:text-xl relative">
                <span
                  className={`${member.color} absolute left-2 right-2 top-2 bottom-0 opacity-75 -z-10`}
                ></span>
                <span
                  className="block mix-blend-darken cursor-pointer"
                  onClick={() => {
                    setSelectedFamilyMember(member);
                    setShowFamilyMember(true);
                  }}
                >
                  {member.name}
                </span>
              </p>
            </div>
          ))}
          <span className="text-sm font-light mt-6 italic">
            <b>*</b>Click on a family member's <b>name or photo</b> to learn
            more about them
          </span>
        </div>
      </div>
    </div>
  );
}
