export default function EmptyState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
        <div className="text-5xl">🌌</div>
      </div>
      <h3 className="text-2xl font-bold mb-3">The Adventure Awaits</h3>
      <p className="text-gray-400 max-w-md">
        No stories have been shared yet. Be the first explorer to document your journey!
      </p>
    </div>
  );
}
