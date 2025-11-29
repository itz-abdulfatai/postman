import { useEffect } from "react";
import HomeSidebar from "../components/global/HomeSidebar";
import { useAppSelector } from "../store/hooks";
import Btn from "../components/global/Btn";
import {
  ArrowSquareUpRightIcon,
  CaretDownIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import EnvironmentSelector from "../components/home/EnvironmentSelector";
import AgentVariableSideBar from "../components/home/AgentVariableSideBar";
import Postmann from "../assets/images/posmannn.png";
import TabChip from "../components/home/TabChip";

function Home() {
  const activeCollectionId = useAppSelector((s) => s.ui.activeCollectionId);
  const activeRequestId = useAppSelector((s) => s.ui.activeRequestId);
  const collections = useAppSelector((s) => s.collections.items);

  const activeCollection =
    collections.find((c) => c.id === activeCollectionId) ?? null;
  const activeRequest =
    activeCollection?.requests.find((r) => r.id === activeRequestId) ?? null;

  useEffect(() => {
    // console.clear();

    console.log("Active Collection ID:", activeCollectionId);
    console.log("Active Request ID:", activeRequestId);
    console.log("Active Collection:", activeCollection);
    console.log("Active Request:", activeRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCollectionId, activeRequestId]);

  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTabId = useAppSelector((state) => state.tabs.activeTabId);

  useEffect(() => {
    // console.clear();
    console.log("Tabs changed:", tabs);
    console.log("Active tab changed:", activeTabId);
    console.log("all tabs:", JSON.stringify(tabs, null, 2));
    console.log("tabs count:", tabs.length);
  }, [tabs, activeTabId]);

  return (
    <div className="flex " style={{ height: "calc(100vh - 50px - 25px)" }}>
      <HomeSidebar />
      {/* main part */}
      <div className="flex-1 bg-primary  flex flex-col items-stretch">
        <nav className=" w-full   p-0  flexbox">
          {/* collections tabs */}
          <div className="flex">
            {tabs.map((tab, index) => (
              <>
                {index > 0 && index < tabs.length && (
                  <span className=" h-4 place-self-center border-r border-accent2"></span>
                )}
                <TabChip tab={tab} activeTabId={activeTabId} />
              </>
            ))}
          </div>
          <div className="flexbox py-2.5  px-2 flex-1 justify-between border-b border-accent2">
            <Btn icon={<PlusIcon />} title="Create new Request" />
            <Btn
              icon={<CaretDownIcon />}
              title="Search Tabs"
              className="px-1"
            />
          </div>
          {/* environment selector */}
          <EnvironmentSelector />
        </nav>
        {/* main content */}
        {!activeCollection && !activeRequest && (
          <main className="flex-1 flexbox flex-col justify-center  w-full">
            <img
              src={Postmann}
              alt="Workspace placeholder illustration"
              className="w-[200px] aspect-square mb-11 select-none pointer-events-none"
              draggable={false}
            />
            <button className="mb-[33px] flexbox p-2 gap-2 bg-accent2 rounded-sm opacity-80 hover:opacity-100">
              <ArrowSquareUpRightIcon weight="fill" className="text-xl" />
              <span className="capitalize text-sm font-medium">
                open workspace overview
              </span>
            </button>
            <div className="flexbox gap-2.5 flex-col">
              <p className=" text-xs">Create a new request:</p>
              <div className="flexbox gap-2">
                <Btn
                  className="rq-btns"
                  icon={<PlusIcon />}
                  title="HTTP Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<ArrowSquareUpRightIcon />}
                  title="GraphQL Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<CaretDownIcon />}
                  title="AI Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<PlusIcon />}
                  title="MCP Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<ArrowSquareUpRightIcon />}
                  title="gRPC Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<CaretDownIcon />}
                  title="WebSocket Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<PlusIcon />}
                  title="Socket.IO Request"
                />
                <Btn
                  className="rq-btns"
                  icon={<ArrowSquareUpRightIcon />}
                  title="MQTT Request"
                />
              </div>
            </div>
          </main>
        )}
      </div>

      {/* agent and variables sidebar */}
      <AgentVariableSideBar />
    </div>
  );
}

export default Home;
