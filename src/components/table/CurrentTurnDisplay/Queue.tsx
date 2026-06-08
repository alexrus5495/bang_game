import { usePublicDataState } from "../../../stores/hooks/usePublicDataState";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import type { Player_PublicData, PublicData } from "../../../types";

export default function Queue() {
  return (
    <div
      className="w-[100%] m-auto relative"
      style={{ height: sizeAdaptive(19) }}
    >
      <Frame />
      <Portraits />
    </div>
  );
}

function Frame() {
  const PADDING = sizeAdaptive(45);
  return (
    <div
      className="absolute border-t border-b w-full h-full flex justify-between overflow-hidden z-1"
      style={{
        paddingLeft: PADDING,
        paddingRight: PADDING,
        borderTopWidth: sizeAdaptive(200),
        borderBottomWidth: sizeAdaptive(200),
      }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="bg-black h-full"
          style={{
            width: sizeAdaptive(160),
          }}
        ></div>
      ))}
    </div>
  );
}

function Portraits() {
  const publicData = usePublicDataState()[0];
  const queue = prepareQueue(publicData);

  if (!queue) return;

  return (
    <div
      className="w-full h-full m-auto flex justify-center overflow-hidden relative"
      style={{
        gap: sizeAdaptive(155),
      }}
    >
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i}>
          <Queue_item player={queue[i]} current={i === 3} />
        </div>
      ))}
    </div>
  );
}

function Queue_item({
  player,
  current,
}: {
  player: Player_PublicData;
  current: boolean;
}) {
  return (
    <div className="h-full aspect-square relative">
      {!current && (
        <div className="h-full w-full bg-black absolute opacity-60"></div>
      )}

      <div className="h-full w-full">
        {getImageComponent(player.char, {
          className: "h-full w-full",
          draggable: false,
        })}
      </div>
    </div>
  );
}

const prepareQueue = (publicData: PublicData | null) => {
  if (!publicData) return;

  const currentPlayerId = publicData.currentPlayer;
  const playersArray = publicData.playersPublicData;

  let queue = [];
  let lastAddedIndex;

  // Fill the queue with the next 7 people to take a turn
  for (let i = 0; i <= 6; i++) {
    for (let p = 0; p < playersArray.length; p++) {
      let currentIndex: number = Number.isInteger(lastAddedIndex)
        ? (lastAddedIndex as number) + 1
        : 0;

      if (currentIndex > playersArray.length - 1) {
        currentIndex = 0;
      }

      const currentPlayer = playersArray[currentIndex];

      if (!currentPlayer.isEliminated) {
        queue.push(currentPlayer);
        lastAddedIndex = currentIndex;
        break;
      }
    }
  }

  //Rotate queue so the current player on the i = 3;
  while (queue[3] !== playersArray[currentPlayerId]) {
    queue = [...queue.slice(1), ...queue.slice(0, 1)];
  }

  return queue;
};
