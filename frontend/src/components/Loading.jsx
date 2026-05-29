function Loading({ text = "Loading..." }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/82 p-10 text-center text-sm font-semibold text-gray-600 shadow-2xl shadow-gray-200/70 backdrop-blur-xl">
      <span className="mx-auto mb-4 block h-2 w-20 overflow-hidden rounded-full bg-gray-100">
        <span className="block h-full w-10 animate-pulse rounded-full bg-indigo-300" />
      </span>
      <span>{text}</span>
    </div>
  );
}

export default Loading;
