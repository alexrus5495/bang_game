import { useEffect } from "react";
import "./normalize.css";
import "./App.css";
import Card from "./components/Card";
import { useAppDispatch } from "./hooks/useAppSelector";
import { loadLocalization } from "./store/slices/localeSlice";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLocalization("enEN"));
  }, [dispatch]);

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
