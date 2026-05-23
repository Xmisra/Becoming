function Loading({ text = "Loading..." }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/75 p-8 text-center text-sm font-medium text-gray-600 shadow-xl shadow-gray-200/60 backdrop-blur">
      <span className="mx-auto mb-4 block h-2 w-20 overflow-hidden rounded-full bg-gray-100">
        <span className="block h-full w-10 animate-pulse rounded-full bg-indigo-300" />
      </span>
      <span>{text}</span>
    </div>
  );
}

export default Loading;
