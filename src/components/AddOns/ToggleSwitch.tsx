import { useRef, useState, useEffect } from "react";
import Lottie, { LottieRef, LottieRefCurrentProps } from "lottie-react";
import darkModeButton from "../../../assets/lottie/animation_lntqbth9.json";

const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current && lottieRef.current.animationItem) {
      const animation = lottieRef.current;

      // 애니메이션을 처음부터 재생
      animation.goToAndPlay(0);
      animation.setDirection(isDarkMode ? -1 : 1);
    }
  }, [isDarkMode]);

  const handleClick = async () => {
    setIsDarkMode(!isDarkMode);

    if (lottieRef.current && lottieRef.current.animationItem) {
      // 애니메이션을 50%까지 재생

      lottieRef.current.playSegments(
        [0, lottieRef.current.animationItem.totalFrames / 0.5],
        true
      );
    }

    return (
      <div className="cursor-pointer" onClick={handleClick}>
        <Lottie
          lottieRef={lottieRef}
          animationData={darkModeButton}
          loop={false}
          onComplete={() => {
            if (lottieRef.current) {
              const animation = lottieRef.current;
              animation.stop();
            }
          }}
        />
      </div>
    );
  };
};

export default ToggleSwitch;
