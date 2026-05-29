function Button({ children, loading, className = "", ...props }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-950/18 ring-1 ring-gray-950/5 transition duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-950/20 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
