import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import PageShell from "../components/PageShell";
import Textarea from "../components/Textarea";
import { useAuth } from "../context/AuthContext";
import { getApiError } from "../services/api";
import { getProfilePictureUrl, uploadProfilePicture } from "../services/authService";
import { createJourney, getJourneys } from "../services/journeyService";
import { formatRelativeDate, formatShortDate } from "../utils/date";

function Dashboard() {
  const { refreshUser, user } = useAuth();
  const [journeys, setJourneys] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    isPublic: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);
  const [error, setError] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");
  const [profilePictureSuccess, setProfilePictureSuccess] = useState("");
  const [success, setSuccess] = useState("");
  const profilePictureUrl = getProfilePictureUrl(user?.profilePicture);

  useEffect(() => {
    fetchJourneys();
  }, []);

  async function fetchJourneys() {
    setError("");
    setLoading(true);

    try {
      const response = await getJourneys();
      setJourneys(response.data.journeys || []);
    } catch (err) {
      setError(getApiError(err, "Could not load journeys."));
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      // The backend expects tags as an array, while the form keeps them comma-separated.
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isPublic: formData.isPublic,
    };

    try {
      const response = await createJourney(payload);
      setJourneys((prevJourneys) => [response.data.journey, ...prevJourneys]);
      setFormData({ title: "", description: "", tags: "", isPublic: true });
      setSuccess("Journey created successfully.");
    } catch (err) {
      setError(getApiError(err, "Could not create journey."));
    } finally {
      setSaving(false);
    }
  }

  async function handleProfilePictureSubmit(event) {
    event.preventDefault();
    setProfilePictureError("");
    setProfilePictureSuccess("");

    if (!profilePicture) {
      setProfilePictureError("Choose an image first.");
      return;
    }

    setUploadingProfilePicture(true);

    try {
      await uploadProfilePicture(profilePicture);
      await refreshUser();
      setProfilePicture(null);
      event.target.reset();
      setProfilePictureSuccess("Profile picture updated.");
    } catch (err) {
      setProfilePictureError(getApiError(err, "Could not upload profile picture."));
    } finally {
      setUploadingProfilePicture(false);
    }
  }

  return (
    <PageShell>
      <section className="mb-4 overflow-hidden rounded-xl border border-white/70 bg-gray-950 p-4 text-white shadow-2xl shadow-gray-300/70 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-200 sm:text-sm">
            {user?.username ? `${user.username}'s timeline` : "Personal growth timeline"}
          </p>
          <h1 className="mt-1.5 text-2xl font-bold leading-tight sm:text-3xl lg:text-[34px]">
            Every version of you deserves a place to breathe.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">
            Follow the quiet shifts, hard lessons, renewed clarity, and small returns that shape who you are becoming.
          </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-right sm:min-w-56">
            <div className="rounded-xl border border-white/10 bg-white/10 p-2.5">
              <p className="text-xl font-bold">{journeys.length}</p>
              <p className="text-xs font-semibold text-gray-300">Journeys</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-2.5">
              <p className="text-xl font-bold">
                {journeys.filter((journey) => journey.latestVersion).length}
              </p>
              <p className="text-xs font-semibold text-gray-300">Updated</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[minmax(380px,0.32fr)_minmax(0,1fr)]">
        <div className="space-y-4">
        <section className="h-fit rounded-xl border border-white/70 bg-white/85 p-4 shadow-2xl shadow-gray-200/70 backdrop-blur">
          <div className="flex items-center gap-3">
            {profilePictureUrl ? (
              <img
                alt={user?.username || "Profile"}
                className="h-14 w-14 shrink-0 rounded-full object-cover shadow-lg shadow-gray-950/15"
                src={profilePictureUrl}
              />
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-950 text-lg font-bold uppercase text-white shadow-lg shadow-gray-950/15">
                {(user?.username || "U").slice(0, 1)}
              </span>
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">Profile</p>
              <h2 className="mt-0.5 truncate text-xl font-bold text-gray-950">
                {user?.username || "Your account"}
              </h2>
              <p className="mt-1 truncate text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <form className="mt-4 space-y-3" onSubmit={handleProfilePictureSubmit}>
            <Alert message={profilePictureError} />
            <Alert message={profilePictureSuccess} type="success" />
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Profile picture</span>
              <input
                accept="image/*"
                className="mt-1.5 w-full rounded-xl border border-gray-200/80 bg-white/80 px-3.5 py-2.5 text-sm text-gray-700 shadow-sm file:mr-3 file:rounded-full file:border-0 file:bg-gray-950 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100/80"
                onChange={(event) => setProfilePicture(event.target.files?.[0] || null)}
                type="file"
              />
            </label>
            <Button
              className="w-full"
              disabled={!profilePicture}
              loading={uploadingProfilePicture}
              type="submit"
            >
              Upload picture
            </Button>
          </form>
        </section>

        <section className="h-fit rounded-xl border border-white/70 bg-white/85 p-4 shadow-2xl shadow-gray-200/70 backdrop-blur">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">Begin a thread</p>
            <h2 className="mt-1 text-xl font-bold text-gray-950">Create Journey</h2>
            <p className="mt-1.5 text-sm leading-6 text-gray-600">
              Name the change you are tracking and give it enough shape to return to later.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <Alert message={error} />
            <Alert message={success} type="success" />
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Finding creative consistency"
              required
            />
            <Textarea
              label="Description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="What is changing, opening, or becoming clearer?"
              required
            />
            <Input
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="habits, work, healing"
            />
            <label className="flex items-start gap-3 rounded-xl border border-gray-200/80 bg-white/70 p-3 shadow-sm">
              <input
                className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-950 accent-gray-950"
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
              />
              <span>
                <span className="block text-sm font-semibold text-gray-800">
                  Share on Explore
                </span>
                <span className="mt-1 block text-xs leading-5 text-gray-500">
                  Public journeys can be read by the community. You can keep private drafts unchecked.
                </span>
              </span>
            </label>
            <Button className="w-full" loading={saving} type="submit">
              Create journey
            </Button>
          </form>
        </section>
        </div>

        <section>
            <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 sm:text-sm">Archive</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-950">Journeys in motion</h2>
              <p className="mt-1.5 text-sm leading-6 text-gray-600">
                A living map of thoughts, seasons, attempts, and returns.
              </p>
            </div>
          </div>

          {loading ? (
            <Loading text="Loading journeys..." />
          ) : journeys.length === 0 ? (
            <div className="rounded-xl border border-dashed border-indigo-200/80 bg-white/70 p-6 text-center shadow-xl shadow-gray-200/50 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-500 sm:text-sm">A blank beginning</p>
              <h3 className="mt-2 text-xl font-bold text-gray-950">Your first chapter is waiting.</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
                The archive is quiet for now. Soon, this space will hold the moments that changed their meaning over time.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {journeys.map((journey) => (
                <Link
                  key={journey._id}
                  to={`/journey/${journey._id}`}
                  className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-gray-200/60 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/70"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-200 via-violet-200 to-rose-200 opacity-80" />
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Began {formatShortDate(journey.createdAt)}
                  </p>
                  <h3 className="mt-2.5 text-lg font-bold leading-snug text-gray-950 transition group-hover:text-indigo-950">
                    {journey.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {journey.description}
                  </p>
                  {journey.latestVersion && (
                    <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        Updated {formatRelativeDate(journey.latestVersion.createdAt)}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-gray-700">
                        {journey.latestVersion.content}
                      </p>
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm ${
                      journey.isPublic
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}>
                      {journey.isPublic ? "Public" : "Private"}
                    </span>
                    {journey.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200/80 bg-gray-50/80 px-2.5 py-1 text-xs font-semibold text-gray-600 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs font-semibold text-gray-500">View timeline</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-950 text-sm text-white shadow-lg shadow-gray-950/15 transition group-hover:translate-x-1">
                      {">"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

export default Dashboard;
