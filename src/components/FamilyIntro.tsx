import { familyList } from "../constants";
import { TFamily, FamilyNames } from "../types";
import { useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function FamilyIntro() {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<{
    name: FamilyNames;
    role: string;
    color: string;
    image: string;
    colorHex: string;
    colorHexVal: string;
    bio: string;
    textColor: string;
  }>(familyList[0]);
  const [showFamilyMember, setShowFamilyMember] = useState(true);
  const [familyMemberIndex, setFamilyMemberIndex] = useState(0);
  return (
    <div className='min-h-screen flex'>
      <div className='h-full flex-1 grid grid-cols-1 md:grid-cols-2'>
        <div className='h-full min-h-screen bg-main-bg bg-top bg-no-repeat bg-cover order-2 md:order-1 p-6 flex justify-center items-center'>
          <div className='bg-secondaryLight p-6 rounded-3xl grid  grid-cols-2 md:grid-cols-3 gap-6 relative overflow-hidden '>
            <>
              {familyList.map((member: TFamily) => (
                <img
                  key={member.name}
                  src={`${member.image || ""}`}
                  alt={member.name}
                  className={`cursor-pointer h-44 w-44 ${member.colorHex}`}
                  onClick={() => {
                    setSelectedFamilyMember(member);
                    setShowFamilyMember(true);
                    setFamilyMemberIndex(familyList.indexOf(member));
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
                <div className='flex flex-col items-center justify-center gap-4 text-center p-2'>
                  <img
                    key={selectedFamilyMember.name}
                    src={`${selectedFamilyMember.image || ""}`}
                    alt={selectedFamilyMember.name}
                    className={`rounded-full h-42 w-42   ${selectedFamilyMember.colorHex} `}
                    onClick={() => {
                      setSelectedFamilyMember(selectedFamilyMember);
                      setShowFamilyMember(true);
                      setFamilyMemberIndex(
                        familyList.indexOf(selectedFamilyMember)
                      );
                    }}
                  />
                  <div className='flex flex-wrap justify-center gap-2'>
                    <h4 className='text-lg font-outfit font-bold'>
                      {selectedFamilyMember.role}:
                    </h4>
                    <p
                      className={`text-lg font-semibold font-outfit ${selectedFamilyMember.textColor}`}
                    >
                      {selectedFamilyMember.name}
                    </p>
                  </div>

                  <div className='flex items-center justify-between w-full mt-4 gap-4'>
                    <ArrowLeftCircleIcon
                      className={`h-8 w-8 flex-0 cursor-pointer  ${selectedFamilyMember.textColor}`}
                      onClick={() => {
                        setSelectedFamilyMember(
                          familyMemberIndex === 0
                            ? familyList[familyList.length - 1]
                            : familyList[familyMemberIndex - 1]
                        );
                        setFamilyMemberIndex(
                          familyMemberIndex === 0
                            ? familyList.length - 1
                            : familyMemberIndex - 1
                        );
                      }}
                    />
                    <p className='flex-1'>{selectedFamilyMember.bio}</p>
                    <ArrowRightCircleIcon
                      onClick={() => {
                        setSelectedFamilyMember(
                          familyMemberIndex === familyList.length - 1
                            ? familyList[0]
                            : familyList[familyMemberIndex + 1]
                        );
                        setFamilyMemberIndex(
                          familyMemberIndex === familyList.length - 1
                            ? 0
                            : familyMemberIndex + 1
                        );
                      }}
                      className={`h-8 w-8 flex-0 cursor-pointer ${selectedFamilyMember.textColor}`}
                    />
                  </div>
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
        <div className='z-0 h-full bg-secondaryLight text-black flex flex-col justify-center items-start gap-6 p-8 order-1 md:order-2'>
          <h4 className='text-2xl font-outfit'>
            This is the <b>Yeom </b>family living in Sanpo:
          </h4>

          {familyList.map((member) => (
            <div className='flex flex-wrap items-end gap-2' key={member.name}>
              <h5 className='text-xl font-semibold font-outfit'>
                {member.role}:{" "}
              </h5>
              <p className='text-lg md:text-xl relative'>
                <span
                  className={`${member.color} absolute left-2 right-2 top-2 bottom-0 opacity-75 -z-10`}
                ></span>
                <span
                  className='block mix-blend-darken cursor-pointer'
                  onClick={() => {
                    setSelectedFamilyMember(member);
                    setShowFamilyMember(true);
                    setFamilyMemberIndex(familyList.indexOf(member));
                  }}
                >
                  {member.name}
                </span>
              </p>
            </div>
          ))}
          <span className='text-sm font-light mt-6 italic'>
            <b>*</b>Click on a family member's <b>name or photo</b> to learn
            more about them
          </span>
        </div>
      </div>
    </div>
  );
}
