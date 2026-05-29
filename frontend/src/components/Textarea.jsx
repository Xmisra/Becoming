function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <textarea
        className="mt-1.5 w-full resize-none rounded-xl border border-gray-200/90 bg-white/90 px-4 py-3 text-sm font-medium leading-6 text-gray-950 shadow-sm outline-none transition placeholder:font-normal placeholder:text-gray-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/80"
        {...props}
      />
    </label>
  );
}

export default Textarea;
