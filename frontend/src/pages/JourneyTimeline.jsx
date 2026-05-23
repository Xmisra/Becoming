import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MoodBadge from "../components/MoodBadge";
import PageShell from "../components/PageShell";
import Textarea from "../components/Textarea";
import { getApiError } from "../services/api";
import { getProfilePictureUrl } from "../services/authService";
import { addJourneyVersion, getJourneyTimeline } from "../services/journeyService";
import { formatDate, formatRelativeDate, formatShortDate } from "../utils/date";
import { moods } from "../utils/moods";

function JourneyTimeline() {
  const { id } = useParams();
  const [journey, setJourney] = useState(null);
  const [versions, setVersions] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    mood: "motivated",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const backLink = canEdit ? "/dashboard" : "/explore";
  const backLabel = canEdit ? "Back to journeys" : "Back to Explore";

  useEffect(() => {
    fetchTimeline();
  }, [id]);

  async function fetchTimeline() {
    setError("");
    setLoading(true);

    try {
      const response = await getJourneyTimeline(id);
      setJourney(response.data.journey);
      setVersions(response.data.versions || []);
      setCanEdit(Boolean(response.data.canEdit));
    } catch (err) {
      setError(getApiError(err, "Could not load journey timeline."));
      setJourney(null);
      setVersions([]);
      setCanEdit(false);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await addJourneyVersion(id, {
        content: formData.content.trim(),
        mood: formData.mood,
      });
      setVersions((prevVersions) => [...prevVersions, response.data.payload]);
      setFormData({ content: "", mood: "motivated" });
      setSuccess("Version added successfully.");
    } catch (err) {
      setError(getApiError(err, "Could not add version."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageShell>
      <Link className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-3.5 py-2 text-sm font-semibold text-gray-600 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-gray-950 hover:shadow-md" to={backLink}>
        {backLabel}
      </Link>

      {loading ? (
        <div className="mt-4">
          <Loading text="Loading timeline..." />
        </div>
      ) : (
        !journey ? (
          <div className="mt-4 rounded-xl border border-rose-200/80 bg-rose-50/80 p-6 shadow-xl shadow-rose-100/60">
            <Alert message={error || "This journey could not be opened."} />
            <Link
              className="mt-5 inline-flex items-center rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-gray-800"
              to="/explore"
            >
              Go to Explore
            </Link>
          </div>
        ) : (
        <div className={`mt-4 grid gap-4 ${canEdit ? "lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.34fr)]" : ""}`}>
          <section>
            <div className="overflow-hidden rounded-xl border border-white/70 bg-white/85 shadow-2xl shadow-gray-200/70 backdrop-blur">
              <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-4 text-white sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-indigo-200 sm:text-sm">
                  Evolution story
                </p>
                <h1 className="mt-1.5 text-2xl font-bold leading-tight sm:text-3xl lg:text-[34px]">{journey?.title}</h1>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-300">{journey?.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 p-3">
                {journey?.author?.username && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                    {journey.author.profilePicture ? (
                      <img
                        alt={journey.author.username}
                        className="h-5 w-5 rounded-full object-cover"
                        src={getProfilePictureUrl(journey.author.profilePicture)}
                      />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-950 text-[10px] font-bold uppercase text-white">
                        {journey.author.username.slice(0, 1)}
                      </span>
                    )}
                    By {journey.author.username}
                  </span>
                )}
                <span className="rounded-full border border-gray-200/80 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                  {versions.length} {versions.length === 1 ? "version" : "versions"}
                </span>
                {journey?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200/80 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
                {journey?.createdAt && (
                  <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                    Began {formatShortDate(journey.createdAt)}
                  </span>
                )}
                <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm ${
                  journey?.isPublic
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}>
                  {journey?.isPublic ? "Public" : "Private"}
                </span>
              </div>
            </div>

            <div className="mt-4">
              {versions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-indigo-200/80 bg-white/70 p-6 text-center shadow-xl shadow-gray-200/50 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-500 sm:text-sm">Still becoming</p>
                  <h2 className="mt-2 text-xl font-bold text-gray-950">The first version has not been written yet.</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
                    When it arrives, this page will begin to read like a record of change.
                  </p>
                </div>
              ) : (
                <div className="relative space-y-4 pl-5 before:absolute before:left-2 before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-indigo-300 before:via-gray-200 before:to-transparent">
                  {versions.map((version, index) => (
                    <article
                      key={version._id}
                      className="group relative rounded-xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-gray-200/60 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/60"
                    >
                      <span className="absolute -left-[21px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-indigo-500 shadow-lg shadow-indigo-200">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                            Version {index + 1}
                          </span>
                          <MoodBadge mood={version.mood} />
                        </div>
                        <time className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500 shadow-sm">
                          {formatRelativeDate(version.createdAt)}
                        </time>
                      </div>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {formatDate(version.createdAt)}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-gray-700">
                        {version.content}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {canEdit && (
          <aside className="h-fit rounded-xl border border-white/70 bg-white/85 p-4 shadow-2xl shadow-gray-200/70 backdrop-blur lg:sticky lg:top-16">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-500 sm:text-sm">New layer</p>
            <h2 className="mt-1 text-xl font-bold text-gray-950">Add Version</h2>
            <p className="mt-1.5 text-sm leading-6 text-gray-600">
              Save the latest texture of this journey: what shifted, softened, clarified, or broke open.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <Alert message={error} />
              <Alert message={success} type="success" />
              <Textarea
                label="Content"
                name="content"
                rows="7"
                value={formData.content}
                onChange={handleChange}
                placeholder="What does this moment know that the last one did not?"
                required
              />
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Mood</span>
                <select
                  className="mt-1.5 w-full rounded-xl border border-gray-200/80 bg-white/80 px-3.5 py-2.5 text-sm font-medium capitalize text-gray-950 shadow-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/80"
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                >
                  {moods.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </label>
              <Button className="w-full" loading={saving} type="submit">
                Add version
              </Button>
            </form>
          </aside>
          )}
        </div>
        )
      )}
    </PageShell>
  );
}

export default JourneyTimeline;
