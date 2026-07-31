import { useState } from "react";
import DevFlowControls from "./DEV_FLOW_CONTROLS";
import DevKiller from "./DEV_KILLER";
import {
  useInteractionPhase,
  usePendingCardIndex,
} from "../stores/hooks/localStateStore.hooks";
import DevUi from "./DEV_UI";
import DevCard from "./DEV_CARDS";
import DevHealth from "./DEV_HEALTH";

type DevTabs =
  | "none"
  | "flow"
  | "animation"
  | "killer"
  | "ui"
  | "card"
  | "health";

export default function DevController() {
  const [showing, setShowing] = useState(false);
  const [currentTab, setCurrentTab] = useState<DevTabs>("animation");
  const toggleShowing = () => setShowing((prev) => !prev);

  const pendingCardIndex = usePendingCardIndex();
  const interactionPhase = useInteractionPhase();

  return (
    <div className="h-auto w-auto absolute z-999 m-5 bottom-5 left-0 flex-row">
      {showing && <Tab currentTab={currentTab} />}

      <div className="flex">
        <div
          className="h-10 w-20 cursor-pointer text-white text-3xl text-center"
          style={{ backgroundColor: showing ? "green" : "red" }}
          onClick={() => toggleShowing()}
        >
          DEV
        </div>

        {showing && (
          <div className="flex">
            <div className="fixed text-3xl text-white top-10 left-1">
              {pendingCardIndex}
            </div>
            <div className="fixed text-3xl text-white top-0 left-1">
              {interactionPhase}
            </div>

            <TabButton
              tab={"flow"}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <TabButton
              tab={"killer"}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <TabButton
              tab={"animation"}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <TabButton
              tab={"ui"}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <TabButton
              tab={"card"}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <TabButton
              tab={"health"}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function Tab({ currentTab }: { currentTab: DevTabs }) {
  switch (currentTab) {
    case "flow":
      return <DevFlowControls />;
    case "animation":
      return null;
    case "killer":
      return <DevKiller />;
    case "ui":
      return <DevUi />;
    case "card":
      return <DevCard />;
    case "health":
      return <DevHealth />;
    default:
      return null;
  }
}

function TabButton({
  tab,
  currentTab,
  setCurrentTab,
}: {
  tab: DevTabs;
  currentTab: DevTabs;
  setCurrentTab: (tab: DevTabs) => void;
}) {
  const toggle = () => {
    if (currentTab === tab) {
      setCurrentTab("none");
    } else setCurrentTab(tab);
  };

  return (
    <div
      className="h-10 w-auto pl-4 pr-4 cursor-pointer text-white text-3xl text-center"
      style={{
        backgroundColor:
          currentTab === tab
            ? "var(--color-amber-500)"
            : "var(--color-gray-700)",
      }}
      onClick={() => toggle()}
    >
      {tab.toUpperCase()}
    </div>
  );
}
