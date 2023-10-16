import Layout from "@/layout";
import { VscGitMerge } from "react-icons/vsc";
import Date from "@/common/Date";
interface TimelineItemProps {
  text: string;
  iconType: string;
  date: string;
}

interface TimelineProps {
  items: { text: string; date: string; iconType: string }[];
}
export default function Graph() {
  const items = [
    { date: "2022-02-02", text: "더플랑주식회사 입사", iconType: "test" },
    { date: "2022-02-02", text: "수성대학교 졸업", iconType: "test" },
    {
      date: "2022-02-02",
      text: "청담정보통신고등학교 졸업",
      iconType: "test",
    },
    { date: "2022-02-02", text: "test", iconType: "test" },
  ];
  const TimelineItem: React.FC<TimelineItemProps> = ({
    text,
    date,
    iconType,
  }) => {
    return (
      <li className="relative flex gap-x-4 pb-7 overflow-hidden items-center">
        <div className="mt-0.5 relative h-full ">
          <div className="absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px border-r border-dashed border-gray-300 dark:border-gray-600"></div>
          <div className="flex items-center  gap-x-4">
            <VscGitMerge className="ml-0.5" /> <Date dateString={date} />
          </div>
        </div>
        <p className="mt-0.5 py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-gray-200 shadow-sm dark:text-gray-400 dark:bg-slate-900 dark:border-gray-700">
          {text}
        </p>
      </li>
    );
  };
  return (
    <Layout home={false}>
      return (
      <div className="relative overflow-hidden w-full h-full rounded-xl">
        <div className="p-6 flex flex-col justify-between md:min-h-[480px] text-center rounded-xl dark:border-gray-700">
          <div></div>
          <div className="mt-8">
            <ul className="flex flex-col text-left space-y-1.5">
              {items.map((item, index) => (
                <TimelineItem
                  key={index}
                  date={item.date}
                  text={item.text}
                  iconType={item.iconType}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute top-1/2 -left-1/2 -z-[1] w-60 h-32 bg-purple-200 blur-[100px] -translate-y-1/2 dark:bg-violet-900/30"></div>
      </div>
    </Layout>
  );
}
