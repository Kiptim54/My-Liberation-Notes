// import React from "reacßt";
import { motion, stagger, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SVGBUS = () => (
  <svg
    width='180'
    height='88'
    viewBox='0 0 226 88'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='svgBUS'>
      <path
        id='bus'
        d='M16.6572 0H195.58C204.771 0 212.907 5.86341 215.827 14.5917L224.896 41.7074C225.628 43.901 226 46.1846 226 48.4966V70.1475C226 74.1593 222.741 77.4201 218.735 77.4201H198.921C197.727 83.4301 192.424 87.9768 186.075 87.9768C179.729 87.9768 174.428 83.4353 173.229 77.4279L87.1333 77.4356C85.9416 83.4507 80.6384 88 74.2872 88C67.9361 88 62.6328 83.4507 61.4412 77.4356H57.3835C56.1816 83.4379 50.8834 87.9743 44.54 87.9743C38.1991 87.9743 32.9036 83.443 31.6965 77.4459H7.26539C3.25902 77.4459 0 74.1824 0 70.1706V16.6799C0 7.48356 7.4734 0 16.6572 0Z'
        fill='#AB6D34'
      />

      {/* Front wheel (group with dot + dashed stroke) */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        // style={{ transformOrigin: "186.08px 74.85px" }}
      >
        <circle
          cx='186'
          cy='75'
          r='8'
          fill='#AB6D34'
          stroke='white'
          strokeWidth='2'
          strokeDasharray='4 4'
        />
        {/* Valve cap/dot */}
        <circle cx='186' cy='67' r='2' fill='#AB6D34' />
      </motion.g>

      {/* Middle wheel */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        // style={{ transformOrigin: "74px 75px" }}
      >
        <circle
          cx='74'
          cy='75'
          r='8'
          fill='#AB6D34'
          stroke='white'
          strokeWidth='2'
          strokeDasharray='4 4'
        />
        <circle cx='74' cy='67' r='2' fill='#AB6D34' />
      </motion.g>

      {/* Back wheel */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        // style={{ transformOrigin: "44px 75px" }}
      >
        <circle
          cx='44'
          cy='75'
          r='8'
          fill='#AB6D34'
          stroke='white'
          strokeWidth='2'
          strokeDasharray='4 4'
        />
        <circle cx='44' cy='67' r='2' fill='#AB6D34' />
      </motion.g>
      <path
        id='bus_2'
        d='M5.13647 70.1733C5.13647 71.3485 6.09184 72.3052 7.2655 72.3052H31.6915C32.8805 66.2875 38.1838 61.7331 44.5401 61.7331C50.8912 61.7331 56.1919 66.2823 57.3861 72.2949H61.4439C62.6458 66.2926 67.9465 61.7562 74.2873 61.7562C80.6282 61.7562 85.9289 66.2926 87.1308 72.2949L173.229 72.2872C174.426 66.2772 179.727 61.7331 186.075 61.7331C192.421 61.7331 197.719 66.272 198.921 72.2769H218.735C219.908 72.2769 220.864 71.3202 220.864 70.1476V48.4967C220.864 46.7402 220.581 45.0069 220.024 43.3405L210.956 16.2273C208.739 9.60014 202.56 5.146 195.58 5.146H16.6573C10.3037 5.146 5.13647 10.3202 5.13647 16.6825V70.1733Z'
        fill='#EADFCF'
      />
      <path
        id='bus_3'
        d='M19.0046 11.7551H193.895C199.044 11.7551 203.603 15.0417 205.239 19.9304L210.832 36.6694C211.189 37.7393 211.01 38.9197 210.352 39.8352C209.695 40.7507 208.631 41.2933 207.507 41.2933H19.0046C14.9982 41.2933 11.7417 38.0299 11.7417 34.0181V19.0304C11.7417 15.0186 14.9982 11.7551 19.0046 11.7551Z'
        fill='#AB6D34'
      />
      <path
        id='bus_4'
        d='M140.998 16.8984H113.819V36.15H140.998V16.8984Z'
        fill='white'
      />
      <path
        id='bus_5'
        d='M146.135 36.15H172.669L166.236 16.8984H146.132L146.135 36.15Z'
        fill='white'
      />
      <path
        id='bus_6'
        d='M108.683 16.8984H81.5039V36.15H108.683V16.8984Z'
        fill='white'
      />
      <path
        id='bus_7'
        d='M76.3699 16.8984H49.1909V36.15H76.3699V16.8984Z'
        fill='white'
      />
      <path
        id='bus_8'
        d='M200.367 21.5635C199.435 18.7732 196.833 16.8984 193.895 16.8984H171.652L178.085 36.15H205.241L200.367 21.5635Z'
        fill='white'
      />
      <path
        id='bus_9'
        d='M16.8782 34.0205C16.8782 35.1958 17.8336 36.1525 19.0047 36.1525H44.0547V16.9009H19.0047C17.831 16.9009 16.8782 17.8576 16.8782 19.0328V34.0205Z'
        fill='white'
      />
    </g>
  </svg>
);

export default function Rules() {
  const containerRef = useRef(null);

  // Track scroll progress of this entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center", "end start"], // 0 when enters, 1 when exits
  });

  // Map scroll progress 0 → 1 to bus X position
  const busX = useTransform(scrollYProgress, [0, 1], ["-18px", "100vw"]);

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
    <div
      className=' font-playfair min-h-screen flex bg-rules-bg bg-no-repeat bg-cover bg-white bg-opacity-20 relative overflow-x-hidden  bg-blend-multiply'
      ref={containerRef}
    >
      <div className=' relative container m-auto p-4 text-white text-center flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl md:text-4xl font-semibold  font-playfair  text-secondary3  mb-12 text-center'>
          There are 3 rules in the <br />
          My Liberation club:
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
        {/* stick at the top until we are done scrolling */}
      </div>
      <motion.div
        className='hidden md:block absolute bottom-0 left-0 flex-1'
        style={{ x: busX }}
        animate={{ y: [0, -2, 0] }} // small bounce up & down
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SVGBUS />
      </motion.div>
    </div>
  );
}
