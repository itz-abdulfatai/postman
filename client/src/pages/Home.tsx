import { useEffect } from "react";
import HomeSidebar from "../components/global/HomeSidebar";
import { useAppSelector } from "../store/hooks";
import Btn from "../components/global/Btn";
import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";
import EnvironmentSelector from "../components/home/EnvironmentSelector";
import AgentVariableSideBar from "../components/home/AgentVariableSideBar";

function Home() {
  const activeCollectionId = useAppSelector((s) => s.ui.activeCollectionId);
  const activeRequestId = useAppSelector((s) => s.ui.activeRequestId);
  const collections = useAppSelector((s) => s.collections.items);

  const activeCollection =
    collections.find((c) => c.id === activeCollectionId) ?? null;
  const activeRequest =
    activeCollection?.requests.find((r) => r.id === activeRequestId) ?? null;

  useEffect(() => {
    console.clear();

    console.log("Active Collection ID:", activeCollectionId);
    console.log("Active Request ID:", activeRequestId);
    console.log("Active Collection:", activeCollection);
    console.log("Active Request:", activeRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCollectionId, activeRequestId]);

  return (
    <div className="flex " style={{ height: "calc(100vh - 50px - 25px)" }}>
      <HomeSidebar />
      <main className="flex-1">
        <nav className=" w-full bg-primary border border-b-1.5 border-accent2 flexbox">
          {/* collections tabs */}
          <div></div>
          <div className="flexbox py-2.5  px-2 flex-1 justify-between">
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
      </main>

      {/* agent and variables sidebar */}
      <AgentVariableSideBar />
    </div>
  );
}

export default Home;
