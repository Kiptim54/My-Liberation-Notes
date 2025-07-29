// import React from "reacßt";
import { motion, stagger } from "framer-motion";

export default function Rules() {
  const variants = {
    hidden: { opacity: 0, y: 20 }, // initial state
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        // duration: 0.9,
        delayChildren: stagger(0.5),
      },
    }, // animate into place
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const circleStyle =
    "rounded-full bg-primary h-full w-full text-center flex justify-center items-center p-8 text-balance font-bold font-outfit text-xl aspect-square shadow-lg ";
  return (
    // make bg color slightly transparent
    <div className=' font-playfair min-h-screen flex bg-secondaryLight bg-opacity-70'>
      <div className='container m-auto p-4 text-white text-center flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl md:text-4xl font-bold  font-playfair  text-secondary2  mb-12 text-center'>
          There are 3 rules in the Liberation club:
        </h1>
        <motion.div
          className='flex-1 grid gap-12 p-6 grid-cols-1 md:grid-cols-3 justify-items-center'
          initial='hidden'
          whileInView='visible'
          transition={{ duration: 0.8 }}
          variants={variants}
          viewport={{ once: true }}
        >
          <motion.div
            className={`${circleStyle} bg-secondary3  `}
            variants={item}
          >
            I will not pretend to be happy
          </motion.div>
          <motion.div
            className={`${circleStyle}  bg-secondaryLight  text-secondary3 bg-blend-darken`}
            variants={item}
          >
            I will not pretend to be unhappy
          </motion.div>
          <motion.div
            className={`${circleStyle} bg-secondary2`}
            variants={item}
          >
            I will be honest
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
