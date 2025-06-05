import "./normalize.css";
import "./App.css";

import Card from "./components/Card";

export default function App() {
  return (
    <>
      <div
        className="
          w-[800px] 
          h-[800px] 
          border 
          border-black 
          border-solid
          absolute
          top-[10%]
          right-[50%]
        "
      >
        <Card />
      </div>
    </>
  );
}
