import BrandLogo from "./BrandLogo";

export default function EmptyState() {
  return (
    <div className="surface flex min-h-[45vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-gray-300">
        <BrandLogo withWordmark={false} markClassName="h-11 w-11" />
      </div>
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white">No stories published yet</h3>
      <p className="max-w-md text-sm leading-relaxed text-gray-400">
        The Chronicle is currently empty. Publish the first journey and set the tone for the community.
      </p>
    </div>
  );
}

