export default function LoadingSpinner() {
  return (
    <div className="surface flex min-h-[45vh] items-center justify-center">
      <div className="relative">
        <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/20 border-t-blue-400" />
        <div className="animate-reverse absolute inset-2 animate-spin rounded-full border-[3px] border-white/20 border-b-pink-400" />
      </div>
    </div>
  );
}
