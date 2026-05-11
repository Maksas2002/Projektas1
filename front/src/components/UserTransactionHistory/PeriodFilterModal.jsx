function PeriodFilterModal({
  isOpen,
  onClose,
  periodFilter,
  onChange,
  onApply,
  onClear,
  total,
  error,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-lg border border-[#1b346c] bg-[#1b2448] p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Filter by period</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-lg leading-none text-slate-300 hover:bg-[#0b1430] hover:text-white"
            aria-label="Close period filter"
          >
            x
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs text-slate-300">Transaction type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange("type", "expense")}
                className={`rounded-md border px-3 py-2 text-xs ${
                  periodFilter.type === "expense"
                    ? "border-rose-400 bg-rose-500/20 text-rose-100"
                    : "border-[#283046] bg-[#0b1430] text-slate-300"
                }`}
              >
                Expenses
              </button>
              <button
                type="button"
                onClick={() => onChange("type", "income")}
                className={`rounded-md border px-3 py-2 text-xs ${
                  periodFilter.type === "income"
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                    : "border-[#283046] bg-[#0b1430] text-slate-300"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="period-start-date" className="mb-2 block text-xs text-slate-300">
                Start date
              </label>
              <input
                id="period-start-date"
                type="date"
                value={periodFilter.startDate}
                onChange={(event) => onChange("startDate", event.target.value)}
                className="w-full rounded-md border border-[#283046] bg-[#0b1430] p-2 text-xs text-white"
              />
            </div>
            <div>
              <label htmlFor="period-end-date" className="mb-2 block text-xs text-slate-300">
                End date
              </label>
              <input
                id="period-end-date"
                type="date"
                value={periodFilter.endDate}
                onChange={(event) => onChange("endDate", event.target.value)}
                className="w-full rounded-md border border-[#283046] bg-[#0b1430] p-2 text-xs text-white"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="rounded-md bg-[#0b1430] p-3">
            <p className="text-xs text-slate-400">Selected period total</p>
            <p className="mt-1 text-lg font-semibold text-white">EUR {Number(total || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-[#283046] px-4 py-2 text-xs text-slate-200 hover:bg-[#0b1430]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onApply}
            className="rounded-md bg-sky-600 px-4 py-2 text-xs text-white hover:bg-sky-500"
          >
            Apply filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeriodFilterModal;
