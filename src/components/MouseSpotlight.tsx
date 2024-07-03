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
        document.body.classList.add("cursor-custom-cursor"); // 커스텀 커서 클래스를 추가합니다.
        document.addEventListener("mousemove", updateFlashlight);
        document.addEventListener("touchstart", updateFlashlight);
        document.addEventListener("touchmove", updateFlashlight);
        document.addEventListener("touchend", updateFlashlight);
      } else {
        setMousePos(null);
        document.body.classList.remove("cursor-custom-cursor"); // 커스텀 커서 클래스를 제거합니다.
        document.removeEventListener("mousemove", updateFlashlight);
        document.removeEventListener("touchstart", updateFlashlight);
        document.removeEventListener("touchmove", updateFlashlight);
        document.removeEventListener("touchend", updateFlashlight);
      }
    };

    updateDarkMode();

    return () => {
      document.body.classList.remove("cursor-custom-cursor"); // 컴포넌트 언마운트 시 커스텀 커서 클래스를 제거합니다.
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
        <>
          <div className="fixed top-0 left-0 w-full h-auto z-[9999]">
            {/* <Image
              src="/assets/light/flashlight-background.png"
              alt="Flashlight Background"
              layout="responsive"
              width={1920}
              height={1080}
              className="w-full h-auto"
            /> */}
          </div>
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
              className=""
            />
          </div>
        </>
      )}
    </>
  );
};

export default MouseSpotlight;
