function Alert({ message, type = "error" }) {
  if (!message) return null;

  const classes =
    type === "success"
      ? "border-emerald-200/80 bg-emerald-50/80 text-emerald-800"
      : "border-rose-200/80 bg-rose-50/80 text-rose-800";

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm shadow-sm backdrop-blur ${classes}`}>
      {message}
    </div>
  );
}

export default Alert;
