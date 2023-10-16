import Layout from "@/layout";

export default function Graph() {
  return (
    <Layout home={false}>
      <div>sdfsdffsdsdf</div>
      <div className="relative overflow-hidden w-full h-full rounded-xl">
        <div className="p-6 flex flex-col justify-between md:min-h-[480px] text-center rounded-xl dark:border-gray-700">
          <div></div>

          <div className="mt-8">
            <ul className="flex flex-col text-left space-y-1.5">
              <li className="relative flex gap-x-4 pb-7 overflow-hidden">
                <div className="mt-0.5 relative h-full">
                  <div className="absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px border-r border-dashed border-gray-300 dark:border-gray-600"></div>
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-200"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8462 12.3462C16.8462 15.0226 14.6765 17.1923 12 17.1923C9.32354 17.1923 7.15385 15.0226 7.15385 12.3462M16.8462 12.3462C16.8462 9.6697 14.6765 7.5 12 7.5C9.32354 7.5 7.15385 9.6697 7.15385 12.3462M16.8462 12.3462H22.5M7.15385 12.3462H1.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <p className="py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-gray-200 shadow-sm dark:text-gray-400 dark:bg-slate-900 dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Mike
                  </span>{" "}
                  sent a message yesterday
                </p>
              </li>

              <li className="relative flex gap-x-4 pb-7 overflow-hidden">
                <div className="mt-0.5 relative h-full">
                  <div className="absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px border-r border-dashed border-gray-300 dark:border-gray-600"></div>
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-200"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.73077 8.90727C6.51507 8.90727 7.96154 7.4698 7.96154 5.69658C7.96154 3.92337 6.51507 2.4859 4.73077 2.4859C2.94646 2.4859 1.5 3.92337 1.5 5.69658C1.5 7.4698 2.94646 8.90727 4.73077 8.90727ZM4.73077 8.90727V15.3286M4.73077 15.3286C2.94646 15.3286 1.5 16.7661 1.5 18.5393C1.5 20.3125 2.94646 21.75 4.73077 21.75C6.51507 21.75 7.96154 20.3125 7.96154 18.5393C7.96154 16.7661 6.51507 15.3286 4.73077 15.3286ZM19.2692 15.3286C17.4849 15.3286 16.0385 16.7661 16.0385 18.5393C16.0385 20.3125 17.4849 21.75 19.2692 21.75C21.0535 21.75 22.5 20.3125 22.5 18.5393C22.5 16.7661 21.0535 15.3286 19.2692 15.3286ZM19.2692 15.3286V7.30193C19.2692 6.41532 18.546 5.69658 17.6538 5.69658L15.2308 5.69658M15.2308 8.74103V2.65214C15.2308 2.29459 14.7958 2.11553 14.5414 2.36835L11.4779 5.4128C11.3202 5.56953 11.3202 5.82364 11.4779 5.98037L14.5414 9.02482C14.7958 9.27764 15.2308 9.09858 15.2308 8.74103Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <p className="py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-gray-200 shadow-sm dark:text-gray-400 dark:bg-slate-900 dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    John
                  </span>{" "}
                  commited on{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Calendars
                  </span>{" "}
                  component
                </p>
              </li>

              <li className="relative flex gap-x-4 pb-7 overflow-hidden">
                <div className="mt-0.5 relative h-full">
                  <div className="absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px border-r border-dashed border-gray-300 dark:border-gray-600"></div>
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-200"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.73077 8.90727C6.51507 8.90727 7.96154 7.4698 7.96154 5.69658C7.96154 3.92337 6.51507 2.4859 4.73077 2.4859C2.94646 2.4859 1.5 3.92337 1.5 5.69658C1.5 7.4698 2.94646 8.90727 4.73077 8.90727ZM4.73077 8.90727V15.3286M4.73077 15.3286C2.94646 15.3286 1.5 16.7661 1.5 18.5393C1.5 20.3125 2.94646 21.75 4.73077 21.75C6.51507 21.75 7.96154 20.3125 7.96154 18.5393C7.96154 16.7661 6.51507 15.3286 4.73077 15.3286ZM19.2692 15.3286C17.4849 15.3286 16.0385 16.7661 16.0385 18.5393C16.0385 20.3125 17.4849 21.75 19.2692 21.75C21.0535 21.75 22.5 20.3125 22.5 18.5393C22.5 16.7661 21.0535 15.3286 19.2692 15.3286ZM19.2692 15.3286V7.30193C19.2692 6.41532 18.546 5.69658 17.6538 5.69658L15.2308 5.69658M15.2308 8.74103V2.65214C15.2308 2.29459 14.7958 2.11553 14.5414 2.36835L11.4779 5.4128C11.3202 5.56953 11.3202 5.82364 11.4779 5.98037L14.5414 9.02482C14.7958 9.27764 15.2308 9.09858 15.2308 8.74103Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <p className="py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-gray-200 shadow-sm dark:text-gray-400 dark:bg-slate-900 dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Daniel
                  </span>{" "}
                  added guides for the React framework
                </p>
              </li>

              <li className="relative flex gap-x-4 pb-7 overflow-hidden">
                <div className="mt-0.5 relative h-full">
                  <div className="absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px border-r border-dashed border-gray-300 dark:border-gray-600"></div>
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-200"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8462 12.3462C16.8462 15.0226 14.6765 17.1923 12 17.1923C9.32354 17.1923 7.15385 15.0226 7.15385 12.3462M16.8462 12.3462C16.8462 9.6697 14.6765 7.5 12 7.5C9.32354 7.5 7.15385 9.6697 7.15385 12.3462M16.8462 12.3462H22.5M7.15385 12.3462H1.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <p className="py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-gray-200 shadow-sm dark:text-gray-400 dark:bg-slate-900 dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Mike
                  </span>{" "}
                  committed on Jan 8, 2023
                </p>
              </li>

              <li className="relative flex gap-x-4 pb-7 overflow-hidden">
                <div className="mt-0.5 relative h-full">
                  <div className="absolute top-7 bottom-0 left-2.5 w-px h-96 -ml-px border-r border-dashed border-gray-300 dark:border-gray-600"></div>
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-200"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.07447 8.60449C7.04859 8.60449 8.64894 7.0141 8.64894 5.05224C8.64894 3.09039 7.04859 1.5 5.07447 1.5C3.10034 1.5 1.5 3.09039 1.5 5.05224C1.5 7.0141 3.10034 8.60449 5.07447 8.60449ZM5.07447 8.60449V15.709M5.07447 8.60449C5.90425 11.0939 9.79787 14.5156 15.4009 13.1667M5.07447 15.709C3.10034 15.709 1.5 17.2994 1.5 19.2612C1.5 21.2231 3.10034 22.8135 5.07447 22.8135C7.04859 22.8135 8.64894 21.2231 8.64894 19.2612C8.64894 17.2994 7.04859 15.709 5.07447 15.709ZM22.5 12.5722C22.5 14.5341 20.8997 16.1245 18.9255 16.1245C16.9514 16.1245 15.3511 14.5341 15.3511 12.5722C15.3511 10.6104 16.9514 9.01999 18.9255 9.01999C20.8997 9.01999 22.5 10.6104 22.5 12.5722Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <p className="py-1.5 px-2.5 rounded-full text-xs font-medium text-gray-600 bg-white border border-gray-200 shadow-sm dark:text-gray-400 dark:bg-slate-900 dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Tania
                  </span>{" "}
                  merged v0.2.0 updates on Feb 22, 2023
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute top-1/2 -left-1/2 -z-[1] w-60 h-32 bg-purple-200 blur-[100px] -translate-y-1/2 dark:bg-violet-900/30"></div>
      </div>
    </Layout>
  );
}
