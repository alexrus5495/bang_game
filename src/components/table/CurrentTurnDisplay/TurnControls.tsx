import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import Button from "../../shared/Button";

export default function TurnControls() {
  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <div
      className="w-full flex bg-[var(--BEIGE)]"
      style={{ height: sizeAdaptive(25) }}
    >
      <div className="h-full w-[25%] flex justify-center">
        <img
          src="./phase_play.png"
          alt=""
          className="h-[95%] m-auto"
          draggable={false}
        />
      </div>
      <div className="h-full w-[50%] flex justify-center">
        <Button
          text={locale["done"]}
          style={{
            fontSize: sizeAdaptive(30),
            lineHeight: sizeAdaptive(30),
            letterSpacing: sizeAdaptive(150),
          }}
          handler={() => null}
        />
      </div>
      <div className="h-full w-[25%] flex justify-center">
        <img
          src="./phase_discard.png"
          alt=""
          className="h-[90%] m-auto opacity-35"
          draggable={false}
        />
      </div>
    </div>
  );
}
