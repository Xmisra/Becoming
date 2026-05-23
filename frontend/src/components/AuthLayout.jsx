import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, footerText, footerLink, footerLinkText, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#fbfbfc_0%,_#f7f7fb_48%,_#eef2ff_100%)] px-4 py-8">
      <section className="w-full max-w-md rounded-xl border border-white/70 bg-white/85 p-6 shadow-2xl shadow-gray-200/70 backdrop-blur">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wide text-indigo-500">
            Becoming
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">{subtitle}</p>
        </div>

        {children}

        <p className="mt-6 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to={footerLink}>
            {footerLinkText}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default AuthLayout;
