import { m, useAnimation } from "motion/react";
import { getImageComponent } from "../../lib/images";

export default function AnimatedStar() {
  const starControls = useAnimation();

  function handleClickStar() {
    animateSpin(starControls);
  }

  function animateSpin(starControls: ReturnType<typeof useAnimation>) {
    starControls.start({
      rotate: 3640,
      transition: {
        duration: 3,
        repeatType: "loop",
        ease: "easeOut",
      },
    });
    starControls.set({ rotate: 40 });
  }
  return (
    <m.div
      initial={{ rotate: 40 }}
      animate={starControls}
      className={`
          h-[23%] 
          absolute 
          bottom-[5%] 
          right-[3%] 
          cursor-pointer 
          z-1 
          select-none
        `}
      draggable="false"
      onClick={handleClickStar}
    >
      {getImageComponent("sheriff-star")}
    </m.div>
  );
}
