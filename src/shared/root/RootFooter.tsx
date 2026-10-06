export default function RootFooter() {
  return (
    <div className="flex w-full justify-center">
      <span className="text-xs text-muted my-3">
        © {new Date().getFullYear()} Existera UI - Supported By Existera
      </span>
    </div>
  );
}
