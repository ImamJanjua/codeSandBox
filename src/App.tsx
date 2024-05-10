import Grid from "@/components/Grid";
import SideBar from "./components/SideBar";

import { ScrollArea } from "./components/ui/scroll-area";

const App = () => {
  return (
    <div className="flex h-full flex-col p-12">
      {/* Header */}
      <header className="mx-6 flex w-2/3 flex-none items-center justify-between border-b border-gray-200  px-4 py-4">
        <div>
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22">January 22, 2022</time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Saturday</p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex isolate">
        <div className="flex overflow-auto flex-auto flex-col ">
          <div className="flex w-full ">
            <div className="w-14 flex-none ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1 ">
              <div
                style={{
                  gridRowEnd: 1,
                  height: `${28}px`,
                  borderBottom: "1px solid #f3f4f6",
                }}
              />

              <Grid />
            </div>
          </div>
        </div>
        <div className="w-1/3 flex-none border-l border-gray-100 px-8 py-8 ">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default App;
