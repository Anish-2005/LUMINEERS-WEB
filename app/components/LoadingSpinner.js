export default function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  );
}
