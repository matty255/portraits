import useDarkModeStore from "@/store/darkModeStore";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MouseSpotlight = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();
  const { mousePos, setMousePos } = useDarkModeStore();
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateFlashlight = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY, pageX, pageY;
      if (e instanceof TouchEvent) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
        pageX = e.changedTouches[0].pageX;
        pageY = e.changedTouches[0].pageY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
        pageX = e.pageX;
        pageY = e.pageY;
      }
      const newMousePos = { clientX, clientY, pageX, pageY };
      setMousePos(newMousePos);

      if (spotlightRef.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const spotlightWidth = spotlightRef.current.offsetWidth;
        const spotlightHeight = spotlightRef.current.offsetHeight;

        // 화면 가운데를 기준으로 마우스 위치 조정
        const centerX = windowWidth / 2;
        const centerY = windowHeight / 2;
        const offsetX = newMousePos.clientX - centerX;
        const offsetY = newMousePos.clientY - centerY;

        spotlightRef.current.style.left =
          centerX - spotlightWidth / 2 + offsetX + "px";
        spotlightRef.current.style.top =
          centerY - spotlightHeight / 2 + offsetY + "px";
      }
    };

    const updateDarkMode = () => {
      if (isDarkMode) {
        document.addEventListener("mousemove", updateFlashlight);
        document.addEventListener("touchstart", updateFlashlight);
        document.addEventListener("touchmove", updateFlashlight);
        document.addEventListener("touchend", updateFlashlight);
      } else {
        setMousePos(null);
        document.removeEventListener("mousemove", updateFlashlight);
        document.removeEventListener("touchstart", updateFlashlight);
        document.removeEventListener("touchmove", updateFlashlight);
        document.removeEventListener("touchend", updateFlashlight);
      }
    };

    updateDarkMode();

    return () => {
      document.removeEventListener("mousemove", updateFlashlight);
      document.removeEventListener("touchstart", updateFlashlight);
      document.removeEventListener("touchmove", updateFlashlight);
      document.removeEventListener("touchend", updateFlashlight);
    };
  }, [isDarkMode, setMousePos]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("dark");
    if (storedDarkMode) {
      setIsDarkMode(true);
      const storedMousePos = localStorage.getItem("mousePos");
      if (storedMousePos) {
        setMousePos(JSON.parse(storedMousePos));
      }
    }
  }, [setIsDarkMode, setMousePos]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isDarkMode && mousePos) {
        localStorage.setItem("mousePos", JSON.stringify(mousePos));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDarkMode, mousePos]);

  return (
    <>
      {isDarkMode && (
        <div
          ref={spotlightRef}
          style={{
            display: "block",
            position: "fixed",
            boxShadow: "0 0 0 9999px #000",
            width: "250px",
            height: "250px",
            pointerEvents: "none",
            zIndex: 10,
            aspectRatio: "250 / 250",
          }}
          className="rounded-full"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/light/flashlight.png`}
            alt="Mouse spotlight"
            sizes="250px"
            width={250}
            height={250}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            className="animate-spin-slow"
          />
        </div>
      )}
    </>
  );
};

export default MouseSpotlight;
