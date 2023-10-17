// DarkModeToggle.tsx
import React from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../store/darkModeState"; // 상대 경로에 따라 변경해야 할 수 있습니다.

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState); // Recoil 상태 사용

  return (
    <button
      className={
        darkMode ? "bg-blue-500 text-white p-2" : "bg-gray-500 text-white p-2"
      }
      onClick={() => setDarkMode(!darkMode)} // 상태 토글
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
