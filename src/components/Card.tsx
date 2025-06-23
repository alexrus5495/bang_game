import { useCardLocalization } from "../hooks/useCardLocalization";

export default function Card() {
  const testTitle = useCardLocalization("base", "barrel").title;
  const testDescription = useCardLocalization("base", "jail").desc;

  return (
    <div>
      <p className="">Test</p>
      <p>{testTitle}</p>
      <p>{testDescription}</p>
    </div>
  );
}
