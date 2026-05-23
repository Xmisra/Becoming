import NavBar from "./NavBar";

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#fbfbfc_0%,_#f7f8fb_48%,_#eef2ff_100%)] text-gray-950">
      <NavBar />
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-5 lg:px-6 lg:py-5">{children}</main>
    </div>
  );
}

export default PageShell;
