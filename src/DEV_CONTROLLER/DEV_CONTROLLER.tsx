import { useState } from "react";
import DevFlowControls from "./DEV_FLOW_CONTROLS";
import DevKiller from "./DEV_KILLER";

type DevTabs = "none" | "flow" | "animation" | "killer";

export default function DevController() {
  const [showing, setShowing] = useState(false);
  const [currentTab, setCurrentTab] = useState<DevTabs>("animation");
  const toggleShowing = () => setShowing((prev) => !prev);

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
          <div className="flex ">
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
          </div>
        )}
      </div>
    </div>
  );
}

function Tab({ currentTab }: { currentTab: DevTabs }) {
  switch (currentTab) {
    case "flow":
      return <DevFlowControls />;
    case "animation":
      return null;
    case "killer":
      return <DevKiller />;
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
