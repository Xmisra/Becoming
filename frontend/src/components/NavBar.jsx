import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfilePictureUrl } from "../services/authService";

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const profilePictureUrl = getProfilePictureUrl(user?.profilePicture);

  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-5 lg:px-6">
        <NavLink to="/explore" className="group inline-flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-bold text-white shadow-lg shadow-gray-950/20">
            B
          </span>
          <span>
            <span className="block text-base font-bold text-gray-950">Becoming</span>
            <span className="hidden text-xs font-medium text-gray-500 sm:block">
              personal growth timeline
            </span>
          </span>
        </NavLink>
        <nav className="flex min-w-0 items-center gap-2 text-sm font-semibold text-gray-600">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 transition hover:text-gray-950 sm:px-4 ${
                isActive ? "bg-gray-950 text-white shadow-lg shadow-gray-950/15" : "hover:bg-white/70"
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
                  className="hidden h-9 w-9 rounded-full object-cover shadow-md shadow-gray-950/10 sm:block"
                  src={profilePictureUrl}
                />
              ) : (
                <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-sm font-bold uppercase text-white shadow-md shadow-gray-950/10 sm:flex">
                  {(user?.username || "U").slice(0, 1)}
                </span>
              )}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-full border px-3 py-2 shadow-sm transition hover:border-indigo-200 hover:text-gray-950 hover:shadow-md sm:px-4 ${
                    isActive
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200/80 bg-white/80"
                  }`
                }
              >
                Journeys
              </NavLink>
              <button
                className="rounded-full border border-gray-200/80 bg-white/80 px-3 py-2 text-gray-600 shadow-sm transition hover:border-rose-200 hover:text-gray-950 hover:shadow-md"
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
              className="rounded-full border border-gray-200/80 bg-white/80 px-3 py-2 shadow-sm transition hover:border-indigo-200 hover:text-gray-950 hover:shadow-md sm:px-4"
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
