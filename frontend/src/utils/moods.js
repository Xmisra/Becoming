export const moods = ["happy", "sad", "motivated", "burned_out", "confused"];

export function moodLabel(mood) {
  return mood.replace("_", " ");
}

export function moodClasses(mood) {
  const styles = {
    happy: "border-emerald-200/80 bg-emerald-50 text-emerald-800 shadow-emerald-100/80",
    sad: "border-sky-200/80 bg-sky-50 text-sky-800 shadow-sky-100/80",
    motivated: "border-amber-200/80 bg-amber-50 text-amber-900 shadow-amber-100/80",
    burned_out: "border-rose-200/80 bg-rose-50 text-rose-800 shadow-rose-100/80",
    confused: "border-violet-200/80 bg-violet-50 text-violet-800 shadow-violet-100/80",
  };

  return styles[mood] || "border-gray-200 bg-gray-50 text-gray-700 shadow-gray-100";
}
