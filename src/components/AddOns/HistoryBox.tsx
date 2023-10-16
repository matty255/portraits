import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface HistoryItem {
  path: string;
  title: string;
}

const HistoryComponent = () => {
  const [historyStack, setHistoryStack] = useState<HistoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedHistory = localStorage.getItem("historyStack");
    if (savedHistory) {
      setHistoryStack(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const newHistoryItem: HistoryItem = {
        path: url,
        title: document.title || "Untitled",
      };

      setHistoryStack((prevState) => {
        // 마지막 아이템의 path와 새로운 아이템의 path를 비교
        const lastItem = prevState[prevState.length - 1];
        if (lastItem && lastItem.path === newHistoryItem.path) {
          //   console.log("이미 있음");
          return prevState; // 상태 변경 없이 현재 상태 반환
        }

        const newState = [...prevState, newHistoryItem].slice(-10);
        localStorage.setItem("historyStack", JSON.stringify(newState));
        return newState;
      });
    };

    // 현재 경로를 처음에 한 번만 추가
    handleRouteChange(router.asPath);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">History Stack</h2>
      <ul className="list-decimal list-inside">
        {historyStack
          .slice()
          .reverse()
          .map((item, index) => (
            <li key={index} className="text-sm">
              <Link href={item.path || "/"}>
                {item.title || item.path || "Untitled"}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
