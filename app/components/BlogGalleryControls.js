import { Search, SlidersHorizontal } from "lucide-react";

export default function BlogGalleryControls({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filteredCount,
}) {
  return (
    <div className="sticky top-[72px] z-40 mb-10 border-b border-white/10 bg-black/75 backdrop-blur-xl sm:top-[76px]">
      <div className="container-shell py-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative w-full md:w-[420px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search stories, authors, or places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-gray-900/70 px-3 py-2 text-sm text-gray-300">
              <SlidersHorizontal className="h-4 w-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-field !w-auto !border-none !bg-transparent !px-1 !py-0 text-xs uppercase tracking-[0.08em] text-gray-100 focus:!ring-0"
              >
                <option value="newest" className="bg-gray-900 text-white">
                  Newest
                </option>
                <option value="oldest" className="bg-gray-900 text-white">
                  Oldest
                </option>
              </select>
            </div>

            <div className="text-xs uppercase tracking-[0.1em] text-gray-400">
              {filteredCount} {filteredCount === 1 ? "story" : "stories"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

