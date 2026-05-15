import { useGameEventProcessor } from "../../hooks/useGameEventProcessor";

export default function AnimationLayer({
  isAllReady,
}: {
  isAllReady: boolean;
}) {
  const { currentAnimation } = useGameEventProcessor();

  if (!isAllReady) return null;

  return (
    <div className="w-full h-full">
      {currentAnimation && (
        <currentAnimation.Component {...currentAnimation.props} />
      )}
    </div>
  );
}
