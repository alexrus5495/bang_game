import { m, useAnimation } from "motion/react";
import { useEffect } from "react";

export default function Logo() {
  const { shadowControls, logoControls, handleClickLogo } =
    useInteractiveLogo();

  return (
    <>
      <m.img
        initial={{ scale: 5, opacity: 0 }}
        animate={shadowControls}
        src="./title_shadow.png"
        className="h-[23%] w-auto absolute z-1 top-[2%] left-[29.8%] select-none"
        draggable="false"
        alt=""
        style={{
          originX: 0.2,
          originY: 0.2,
          cursor: "pointer",
        }}
      />
      <m.img
        initial={{ scale: 3, opacity: 0 }}
        animate={logoControls}
        onClick={handleClickLogo}
        src="./title-text.png"
        className="h-[22%] w-auto absolute z-2 top-[2%] left-[30%] select-none"
        draggable="false"
        alt=""
        style={{
          originX: 0.2,
          originY: 0.2,
          cursor: "pointer",
        }}
      />
    </>
  );
}

function useInteractiveLogo() {
  const logoControls = useAnimation();
  const shadowControls = useAnimation();

  useEffect(() => {
    const controller = new AbortController();

    animateStartUp(logoControls, shadowControls, controller.signal);

    return () => controller.abort();
  }, [logoControls, shadowControls]);

  function handleClickLogo() {
    const controller = new AbortController();

    stopAnimation(logoControls, shadowControls);
    animateSwing(logoControls, shadowControls);
    setTimeout(() => {
      animateStartUp(logoControls, shadowControls, controller.signal);
    }, 4000);
  }

  return { logoControls, shadowControls, handleClickLogo };
}

function animateStartUp(
  logoControls: ReturnType<typeof useAnimation>,
  shadowControls: ReturnType<typeof useAnimation>,
  signal?: AbortSignal,
) {
  if (signal?.aborted) return;

  logoControls.start({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.3 },
  });

  shadowControls.start({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.3 },
  });

  const timeout = setTimeout(() => {
    if (signal?.aborted) return;

    logoControls.start({
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });

    shadowControls.start({
      y: [0, -10, 0],
      scale: [1, 1.15, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, 800);

  signal?.addEventListener("abort", () => {
    clearTimeout(timeout);
    logoControls.stop();
    shadowControls.stop();
  });
}

function stopAnimation(
  logoControls: ReturnType<typeof useAnimation>,
  shadowControls: ReturnType<typeof useAnimation>,
) {
  logoControls.stop();
  shadowControls.stop();
}

function animateSwing(
  logoControls: ReturnType<typeof useAnimation>,
  shadowControls: ReturnType<typeof useAnimation>,
  signal?: AbortSignal,
) {
  if (signal?.aborted) return;

  logoControls.start({
    rotate: [0, 110, 30, 90, 50, 90],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeatType: "mirror",
    },
  });

  shadowControls.start({
    rotate: [0, 110, 30, 90, 50, 90],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeatType: "mirror",
    },
  });

  const falltimeout = setTimeout(() => {
    if (signal?.aborted) return;

    logoControls.start({
      translateY: "200vh",
      transition: {
        duration: 1,
      },
    });

    shadowControls.start({
      translateY: "200vh",
      transition: {
        duration: 1,
      },
    });
  }, 2000);

  const resetTimeout = setTimeout(() => {
    if (signal?.aborted) return;

    logoControls.set({
      rotate: 0,
      translateY: 0,
    });

    shadowControls.set({
      rotate: 0,
      translateY: 0,
    });
  }, 4000);

  signal?.addEventListener("abort", () => {
    clearTimeout(falltimeout);
    clearTimeout(resetTimeout);
    logoControls.stop();
    shadowControls.stop();
  });

  logoControls.set({ rotate: 0, translateY: 0 });
  shadowControls.set({ rotate: 0, translateY: 0 });
}
