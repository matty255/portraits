import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";
import TSIcon from "../../../public/typescript-svgrepo-com.svg";
import { historyStackState } from "../../../store/historyStackState";
import { useRecoilState } from "recoil";
interface HistoryItem {
  path: string;
  title: string;
}

const HistoryComponent = () => {
  const [historyStack, setHistoryStack] = useState<HistoryItem[]>([]);

  const [isOpen, setIsOpen] = useRecoilState(historyStackState);
  const [initialRender, setInitialRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedHistory = localStorage.getItem("historyStack");
    if (savedHistory) {
      setHistoryStack(JSON.parse(savedHistory));
    }
    setInitialRender(false);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const title = document.title || "Untitled";
      if (title === "Untitled" || !url) return;

      const newHistoryItem: HistoryItem = {
        path: url,
        title: title,
      };

      setHistoryStack((prevState) => {
        const lastItem = prevState[prevState.length - 1];
        if (lastItem && lastItem.path === newHistoryItem.path) {
          return prevState;
        }

        const newState = [...prevState, newHistoryItem].slice(-10);
        localStorage.setItem("historyStack", JSON.stringify(newState));
        return newState;
      });
    };

    handleRouteChange(router.asPath);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="p-4 relative w-full ">
      <motion.div
        initial={initialRender && !isOpen ? { height: 0 } : {}}
        animate={{ height: isOpen ? "15rem" : 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-full z-10 bg-transparent h-60 "
      >
        <div className="p-1 font-bold cursor-pointer mb-2 bg-white dark:bg-slate-600 opacity-80 dark:text-slate-100 w-52">
          <h3
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center text-base "
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.4 }}
              style={{ originX: 0.4, originY: 0.5 }}
            >
              <VscChevronDown className="w-5 h-5 mr-1" />
            </motion.div>
            History Stack
          </h3>
        </div>
        <ul className="list-inside pl-2">
          {historyStack
            .slice()
            .reverse()
            .map((item, index) => (
              <li
                key={index}
                className="text-sm tracking-wide hover:underline leading-5"
              >
                <Link
                  href={item.path || "/"}
                  className="inline-flex items-center gap-x-2"
                >
                  <TSIcon className="w-5 h-5" />
                  {item.title || item.path || "Untitled"}
                </Link>
              </li>
            ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default HistoryComponent;
