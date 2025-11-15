import HomeSidebar from "../components/global/HomeSidebar";

function Home() {
  return (
    <div className="flex testb" style={{ height: "calc(100vh - 50px)" }}>
      <HomeSidebar />
      <main className="flex-1">
        <nav className=" w-full bg-primary border border-b-1.5 border-accent2 px-2 py-1"></nav>
      </main>
    </div>
  );
}

export default Home;
