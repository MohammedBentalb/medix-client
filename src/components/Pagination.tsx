// src/components/Pagination.tsx

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage, lastPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-3 justify-center pt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Previous
      </button>

      <span className="text-sm text-stone-500">
        Page {currentPage} of {lastPage}
      </span>

      <button
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
}
