import { Search, Filter } from 'lucide-react';

export default function BlogGalleryControls({ searchTerm, setSearchTerm, sortBy, setSortBy, filteredCount }) {
  return (
    <div className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-white/10 mb-12">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search adventures, authors, or destinations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <Filter className="w-4 h-4" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 text-white placeholder-white focus:outline-none rounded-lg px-2 py-1 border border-white/20"
              >
                <option value="newest" className="bg-gray-900 text-white">Newest First</option>
                <option value="oldest" className="bg-gray-900 text-white">Oldest First</option>
              </select>
            </div>

            <div className="text-sm text-gray-400">
              {filteredCount} {filteredCount === 1 ? 'story' : 'stories'} found
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
