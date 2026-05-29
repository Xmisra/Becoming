import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, footerText, footerLink, footerLinkText, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_16%_-10%,rgba(79,70,229,0.12),transparent_28rem),radial-gradient(circle_at_86%_4%,rgba(244,114,182,0.10),transparent_26rem),linear-gradient(135deg,#fbfbfd_0%,#f4f5f8_46%,#eceff8_100%)] px-4 py-8">
      <section className="w-full max-w-md overflow-hidden rounded-2xl border border-white/80 bg-white/92 shadow-2xl shadow-gray-200/70 ring-1 ring-gray-950/[0.02] backdrop-blur-xl">
        <div className="bg-[linear-gradient(135deg,#080b14_0%,#111827_62%,#1e1b4b_100%)] p-6 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-gray-950 shadow-lg shadow-black/20">
              B
            </span>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo-200">
              Becoming
            </p>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-sm font-medium leading-6 text-gray-300">{subtitle}</p>
        </div>

        <div className="p-6">
          {children}

          <p className="mt-6 text-center text-sm text-gray-600">
            {footerText}{" "}
            <Link className="font-bold text-indigo-600 hover:text-indigo-700" to={footerLink}>
              {footerLinkText}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
