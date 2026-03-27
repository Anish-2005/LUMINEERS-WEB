import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = memo(function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-900/70 text-slate-300 transition hover:bg-slate-800/70 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }
        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`h-10 w-10 rounded-lg border text-sm font-medium transition-all ${
              currentPage === pageNum
                ? "border-blue-400/50 bg-blue-500/20 text-blue-100"
                : "border-slate-700/70 bg-slate-900/70 text-slate-300 hover:bg-slate-800/70"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-900/70 text-slate-300 transition hover:bg-slate-800/70 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
