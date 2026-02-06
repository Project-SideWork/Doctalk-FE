import { formatKoreanDate, getBadgeClass } from "extensions/dashboardUtils";

export default function RequestedPrCard({ requestedCount = 0, items = [] }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <h2 className="font-bold text-2xl pb-3">Requested PR</h2>

      {/* Pr 카운트 */}
      <div className="flex items-end justify-between">
        <div className="text-lg text-gray-500">How many?</div>
        <div className="text-3xl font-bold">{requestedCount}</div>
      </div>

      {/* 리스트 */}
      <div className="mt-3 flex flex-col gap-2 overflow-auto">
        {items.length === 0 ? (
          <div className="text-sm text-gray-400">요청된 PR이 없어요</div>
        ) : (
          items.map((pr) => (
            <a
              key={pr.id}
              href={pr.html_url}
              target="_blank"
              rel="noreferrer"
              className="border rounded-lg p-3 hover:bg-slate-50 transition flex flex-col gap-2"
            >
              {/* 제목 + 상태 */}
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-sm line-clamp-2">
                  {pr.title}
                </div>
                <span
                  className={`shrink-0 text-xs px-2 py-1 rounded-full ${getBadgeClass(
                    pr.state,
                  )}`}
                >
                  {pr.state}
                </span>
              </div>

              {/* 날짜 */}
              <div className="text-xs text-gray-400">
                {formatKoreanDate(pr.created_at)}
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  );
}
