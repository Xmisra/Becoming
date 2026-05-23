function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <input
        className="mt-1.5 w-full rounded-xl border border-gray-200/80 bg-white/80 px-3.5 py-2.5 text-sm text-gray-950 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/80"
        {...props}
      />
    </label>
  );
}

export default Input;
