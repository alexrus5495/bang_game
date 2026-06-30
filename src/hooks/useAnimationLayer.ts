import { useAnimationStore } from "../stores/animationStore";

export function useAnimationLayer() {
  const currentAnimation = useAnimationStore((state) => state.currentAnimation);
  const playAnimation = useAnimationStore((state) => state.playAnimation);

  return { currentAnimation, playAnimation };
}
