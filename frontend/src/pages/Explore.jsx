import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import MoodBadge from "../components/MoodBadge";
import PageShell from "../components/PageShell";
import { getApiError } from "../services/api";
import { getProfilePictureUrl } from "../services/authService";
import { getExploreJourneys } from "../services/journeyService";
import { formatRelativeDate, formatShortDate } from "../utils/date";

function Explore() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExploreJourneys() {
      setError("");
      setLoading(true);

      try {
        const response = await getExploreJourneys();
        setJourneys(response.data.journeys || []);
      } catch (err) {
        setError(getApiError(err, "Could not load the explore feed."));
      } finally {
        setLoading(false);
      }
    }

    fetchExploreJourneys();
  }, []);

  return (
    <PageShell>
      <section className="relative mb-7 overflow-hidden rounded-2xl border border-gray-900/80 bg-[radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.28),transparent_24rem),linear-gradient(135deg,#080b14_0%,#111827_54%,#1e1b4b_100%)] p-6 text-white shadow-2xl shadow-gray-950/18 sm:p-8 lg:p-10">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-200 sm:text-sm">
            Explore stories
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.03] text-white sm:text-5xl lg:text-6xl">
            Growth looks different in every life.
          </h1>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-gray-300 sm:text-lg">
            Read public journeys from people tracking change, clarity, setbacks, and small returns over time.
          </p>
        </div>
      </section>

      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-500 sm:text-sm">
            Community feed
          </p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-gray-950">
            Public journeys
          </h2>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex w-fit items-center rounded-full border border-gray-200/90 bg-white/90 px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-gray-950 hover:shadow-lg"
        >
          Start your own
        </Link>
      </div>

      <Alert message={error} />

      {loading ? (
        <Loading text="Loading public journeys..." />
      ) : journeys.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-indigo-200/80 bg-white/82 p-8 text-center shadow-2xl shadow-gray-200/70 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-500 sm:text-sm">
            Quiet for now
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-gray-950">
            No public journeys have been shared yet.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
            When someone opens a journey to the community, it will appear here with its latest update.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {journeys.map((journey) => (
            <Link
              key={journey._id}
              to={`/journey/${journey._id}`}
              className="group flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-xl shadow-gray-200/70 ring-1 ring-gray-950/[0.02] backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/80"
            >
              <div className="h-1.5 bg-gradient-to-r from-indigo-300 via-violet-300 to-rose-300" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {journey.author?.profilePicture ? (
                      <img
                        alt={journey.author?.username || "Writer"}
                        className="h-11 w-11 shrink-0 rounded-full object-cover shadow-lg shadow-gray-950/15 ring-2 ring-white"
                        src={getProfilePictureUrl(journey.author.profilePicture)}
                      />
                    ) : (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-bold uppercase text-white shadow-lg shadow-gray-950/15 ring-2 ring-white">
                        {(journey.author?.username || "U").slice(0, 1)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-950">
                        {journey.author?.username || "Unknown writer"}
                      </p>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        Began {formatShortDate(journey.createdAt)}
                    </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                    Public
                  </span>
                </div>

                <h3 className="mt-5 text-[22px] font-black leading-tight tracking-tight text-gray-950 transition group-hover:text-indigo-950">
                  {journey.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                  {journey.description}
                </p>

                {journey.latestVersion ? (
                  <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50/90 p-4 shadow-inner shadow-white">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        Updated {formatRelativeDate(journey.latestVersion.createdAt)}
                      </p>
                      <MoodBadge mood={journey.latestVersion.mood} />
                    </div>
                    <p className="line-clamp-2 text-sm leading-6 text-gray-700">
                      {journey.latestVersion.content}
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm leading-6 text-gray-500">
                    This journey has not added a timeline update yet.
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {(journey.tags?.length ? journey.tags : ["untagged"]).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200/80 bg-white px-2.5 py-1 text-xs font-bold text-gray-600 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Read timeline
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-950 text-sm text-white shadow-lg shadow-gray-950/15 transition group-hover:translate-x-1">
                      {">"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}

export default Explore;
