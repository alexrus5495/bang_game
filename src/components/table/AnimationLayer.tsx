import React from "react";
import type { AnimationComponent } from "../../animations";

const AnimationLayer = React.memo(
  ({ currentAnimation }: { currentAnimation: AnimationComponent | null }) => {
    return (
      <div className="w-full h-full">
        {currentAnimation && (
          <currentAnimation.Component {...currentAnimation.props} />
        )}
      </div>
    );
  },
);

export default AnimationLayer;
