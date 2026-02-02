import {
  getPercentToColor,
  truncateTo1Decimal,
} from "extensions/dashboardUtils";

export default function GithubStatsCard({ stats = [] }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <h2 className="font-bold text-[18px] pb-3">Github Stats</h2>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((item) => {
          const percent = truncateTo1Decimal(item.sharePercent);
          const barColor = getPercentToColor(percent);

          return (
            <div
              key={item.label}
              className="border rounded-lg p-3 min-h-[92px] flex flex-col gap-1"
            >
              <div className="font-semibold">{item.label}</div>
              <div className="text-[13px] text-gray-600">
                Total Activity: {item.totalCount}
              </div>
              <div className="text-[13px] text-gray-600">
                My Activity: {item.myCount}
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${barColor}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="text-[15px]">
                  진행률: <span className="font-semibold">{percent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
