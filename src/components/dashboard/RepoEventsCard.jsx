import {
  formatKoreanDate,
  getEventMeta,
  getBadgeClass,
  getKindClass,
} from "extensions/dashboardUtils";

export default function RepoEventsCard({ events = [] }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <h2 className="font-bold text-[18px] pb-3">Repository Events</h2>

      {events.length === 0 ? (
        <div className="text-sm text-gray-400">이벤트가 없어요.</div>
      ) : (
        <div className="max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-3">
          {events.map((event) => {
            const meta = getEventMeta(event);

            return (
              <a
                key={event.id}
                href={meta.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="group border rounded-lg p-3 flex gap-3 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                {/* 왼쪽 타입 구분 바 */}
                <div
                  className={`w-1 rounded-full ${getKindClass(meta.kind)}`}
                />

                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  {/* 상단 라인: 이벤트 타입 + 타입 뱃지 + 시간 */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-semibold text-gray-600">
                        {meta.kind}
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${getBadgeClass(
                          meta.badgeVariant,
                        )}`}
                      >
                        {meta.actionLabel}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {formatKoreanDate(meta.createdAt)}
                    </span>
                  </div>

                  {/* 메인 라인: actor + #번호 */}
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={meta.avatar}
                      alt={meta.actor}
                      className="w-6 h-6 rounded-full shrink-0"
                      loading="lazy"
                    />
                    <span
                      title={meta.actor}
                      className="text-sm font-semibold text-gray-900 shrink-0"
                    >
                      {meta.actor}
                    </span>

                    <span className="text-sm text-gray-400">·</span>

                    <span
                      title={meta.number}
                      className="text-sm font-medium text-gray-900"
                    >
                      #{meta.number}
                    </span>
                  </div>

                  <div className="text-xs font-[400] text-gray-600 truncate">
                    in{" "}
                    <span
                      title={meta.repo}
                      className="font-[400] py-[2px] px-[6px] text-xs rounded-[12px] text-[#0969da] bg-[#ddf4ff]"
                    >
                      {meta.repo}
                    </span>
                  </div>

                  {meta.title && meta.title !== "(제목 없음)" && (
                    <div
                      title={meta.title}
                      className="text-sm text-gray-700 truncate font-medium"
                    >
                      {meta.title}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
