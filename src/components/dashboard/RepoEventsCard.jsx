import { formatKoreanDate, getEventMeta } from "extensions/dashboardUtils";

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
                className="border rounded-lg p-3 flex flex-col gap-1 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                <div className="text-sm flex justify-between">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={meta.avatar}
                        alt={meta.avatar}
                        className="w-6 h-6 rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-semibold">{meta.actor}</span>{" "}
                  </div>
                  {/* <span className="text-gray-500">{meta.actionText}</span> */}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      meta.actionText === "opened"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {meta.actionText === "opened" ? "OPEN" : "CLOSED"}
                  </span>
                </div>

                <div className="text-sm font-semibold break-words">
                  {meta.title}
                </div>

                <div className="text-xs text-gray-400">
                  in <span className="font-semibold">{meta.repo}</span>
                </div>

                <div className="text-xs text-gray-400">
                  {formatKoreanDate(meta.createdAt)}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
