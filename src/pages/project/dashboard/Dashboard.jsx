import { checkGithubStat } from "apis/githubApi";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { projectId } = useOutletContext();
  const [stats, setStats] = useState([]);
  useEffect(() => {
    if (!projectId) return;
    console.log(projectId);
    (async () => {
      const result = await checkGithubStat(projectId);
      setStats(result);
    })();
  }, [projectId]);

  return (
    <div className="p-6">
      <h2 className="font-bold text-[20px] pb-2">Github 활동통계</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4">
        {stats.map((e) => (
          <div key={e.label} className="border">
            <div className="font-semibold py-1">{e.label}</div>
            <div className="flex flex-col gap-1">
              <div className="text-sm">전체: {e.totalCount}</div>
              <div className="text-sm">내 활동: {e.myCount}</div>
              <div className="text-sm">진행률: {e.sharePercent}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
