import { moodClasses, moodLabel } from "../utils/moods";

function MoodBadge({ mood }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold capitalize shadow-sm ${moodClasses(mood)}`}>
      {moodLabel(mood)}
    </span>
  );
}

export default MoodBadge;
