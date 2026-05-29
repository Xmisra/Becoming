import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfilePictureUrl } from "../services/authService";

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const profilePictureUrl = getProfilePictureUrl(user?.profilePicture);

  return (
    <header className="sticky top-0 z-20 border-b border-white/80 bg-white/78 shadow-sm shadow-gray-950/[0.03] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/explore" className="group inline-flex min-w-0 items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-lg font-black text-white shadow-xl shadow-gray-950/20 ring-1 ring-white/20 transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-gray-950/25">
            B
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-black leading-none text-gray-950 sm:text-2xl">
              Becoming
            </span>
            <span className="mt-1 hidden text-xs font-bold uppercase tracking-wide text-gray-500 sm:block">
              personal growth timeline
            </span>
          </span>
        </NavLink>
        <nav className="flex min-w-0 items-center gap-2 text-sm font-bold text-gray-600">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `rounded-full px-3.5 py-2.5 transition duration-200 hover:-translate-y-0.5 hover:text-gray-950 sm:px-5 ${
                isActive ? "bg-gray-950 text-white shadow-lg shadow-gray-950/15" : "hover:bg-white/85 hover:shadow-sm"
              }`
            }
          >
            Explore
          </NavLink>
          {isAuthenticated ? (
            <>
              {profilePictureUrl ? (
                <img
                  alt={user?.username || "Profile"}
                  className="hidden h-10 w-10 rounded-full object-cover shadow-md shadow-gray-950/10 ring-2 ring-white sm:block"
                  src={profilePictureUrl}
                />
              ) : (
                <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-gray-950 text-sm font-bold uppercase text-white shadow-md shadow-gray-950/10 ring-2 ring-white sm:flex">
                  {(user?.username || "U").slice(0, 1)}
                </span>
              )}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-full border px-3.5 py-2.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-gray-950 hover:shadow-md sm:px-5 ${
                    isActive
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200/80 bg-white/80"
                  }`
                }
              >
                Journeys
              </NavLink>
              <button
                className="rounded-full border border-gray-200/80 bg-white/85 px-3.5 py-2.5 text-gray-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:text-gray-950 hover:shadow-md sm:px-5"
                type="button"
                onClick={logout}
              >
                <span className="sm:hidden">Out</span>
                <span className="hidden sm:inline">
                  {user?.username ? `Logout ${user.username}` : "Logout"}
                </span>
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-full border border-gray-200/80 bg-white/85 px-4 py-2.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-gray-950 hover:shadow-md sm:px-5"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
