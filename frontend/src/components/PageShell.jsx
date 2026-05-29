import NavBar from "./NavBar";

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_16%_-10%,rgba(79,70,229,0.12),transparent_28rem),radial-gradient(circle_at_86%_4%,rgba(244,114,182,0.10),transparent_26rem),linear-gradient(135deg,#fbfbfd_0%,#f4f5f8_46%,#eceff8_100%)] text-gray-950">
      <NavBar />
      <main className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        {children}
      </main>
    </div>
  );
}

export default PageShell;
