import { truncateTo1Decimal } from "extensions/dashboardUtils";

export default function GithubStatsCard({ stats = [] }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <h2 className="font-bold text-[18px] pb-3">Github Stats</h2>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((item) => {
          const percent = truncateTo1Decimal(item.sharePercent);

          return (
            <div
              key={item.label}
              className="border rounded-lg p-3 min-h-[92px]"
            >
              <div className="font-semibold pb-1">{item.label}</div>
              <div className="text-sm text-gray-600">
                전체: {item.totalCount}
              </div>
              <div className="text-sm text-gray-600">
                내 활동: {item.myCount}
              </div>
              <div className="text-sm">
                진행률: <span className="font-semibold">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
