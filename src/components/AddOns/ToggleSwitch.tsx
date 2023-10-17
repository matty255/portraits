import React, { useState, useEffect } from "react";
import { useLottie } from "lottie-react";
import toggleSwitchAnimation from "../../../assets/lottie/animation_lntqbth9.json";
import { useRecoilState } from "recoil";
import { darkModeState } from "@/store/darkModeState";

const ToggleSwitch: React.FC = () => {
  const style = {
    width: 80,
    height: 40,
    minWidth: "54px",
    minHeight: "32px",
  };

  const options = {
    animationData: toggleSwitchAnimation,
    loop: false,
    autoplay: false,
  };

  const { View, animationItem } = useLottie(options, style);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [animationCompleted, setAnimationCompleted] = useState(false); // 애니메이션 완료 상태를 저장하는 상태 변수

  useEffect(() => {
    if (animationItem) {
      animationItem.addEventListener("complete", () => {
        setAnimationCompleted(true); // 애니메이션 완료 시 상태 업데이트
      });
    }

    return () => {
      if (animationItem) {
        animationItem.removeEventListener("complete", () => {});
      }
    };
  }, [animationItem]);

  useEffect(() => {
    if (animationCompleted) {
      if (darkMode) {
        animationItem?.setSpeed(0.5);
        animationItem?.playSegments([120, 300], true);
      } else {
        animationItem?.playSegments([2, 30], true);
      }
      setAnimationCompleted(false); // 애니메이션 완료 후 상태 초기화
    }
  }, [animationCompleted, darkMode, animationItem]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      animationItem?.playSegments([50, 100], true);
    } else {
      animationItem?.playSegments([80, 0], true);
    }
  };

  return (
    <div className="flex ml-2 items-center" onClick={handleToggle}>
      {View}
    </div>
  );
};

export default ToggleSwitch;
