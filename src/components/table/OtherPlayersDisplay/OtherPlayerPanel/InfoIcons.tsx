import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import Bullets from "../../shared/Bullets";
import DistanceIcon from "./DistanceIcon";
import HandIcon from "../../shared/HandIcon";
import PlayerTypeIcon from "./PlayerTypeIcon";
import RangeIcon from "../../shared/RangeIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import React from "react";

const InfoIcons = React.memo(({ playerId }: { playerId: string }) => {
  return (
    <div
      className="absolute h-full w-[81%] flex"
      style={{
        top: "-50%",
        right: "-5%",
      }}
    >
      <div
        className="h-[80%] w-[60%] flex items-center relative"
        style={{
          bottom: "10%",
          gap: sizeAdaptive(300),
        }}
      >
        <Bullets playerId={playerId} />
      </div>
      <div
        className="w-[70%] h-full flex justify-end"
        style={{
          gap: sizeAdaptive(250),
          fontSize: sizeAdaptive(26),
          lineHeight: sizeAdaptive(26),
        }}
      >
        <AnimationAnchor
          id={{ type: "opponent-hand", playerId: playerId }}
          className="h-full aspect-square absolute"
        />

        <PlayerTypeIcon playerId={playerId} />
        <RangeIcon playerId={playerId} />
        <DistanceIcon playerId={playerId} />
        <HandIcon playerId={playerId} />
      </div>
    </div>
  );
});

export default InfoIcons;
