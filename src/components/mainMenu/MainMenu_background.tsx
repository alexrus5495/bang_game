import AnimatedStar from "./AnimatedStar";

export default function MainMenu_background() {
  return (
    <>
      <img
        src="../../public/blank_1.png"
        className="h-[70%] w-auto absolute bottom-[10%] right-[6%] select-none"
        draggable="false"
        alt=""
      />
      <AnimatedStar />
    </>
  );
}
