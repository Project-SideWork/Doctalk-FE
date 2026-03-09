export default function RepoReviewStatsCard({ repoStats }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <h2 className="font-bold text-[18px] pb-3">PR Review Stats</h2>

      {!repoStats ? (
        <div className="text-sm text-gray-400">통계를 불러오는 중...</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="border rounded-lg p-3">
              <div className="text-xs text-gray-500">Approved</div>
              <div className="text-xl font-bold">
                {repoStats.totalReviewStatsDto?.approved ?? 0}
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs text-gray-500">Changes</div>
              <div className="text-xl font-bold">
                {repoStats.totalReviewStatsDto?.changesRequested ?? 0}
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs text-gray-500">Commented</div>
              <div className="text-xl font-bold">
                {repoStats.totalReviewStatsDto?.commented ?? 0}
              </div>
            </div>
          </div>

          <div className="mt-4 max-h-[260px] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {(repoStats.userReviewStatsDtoList ?? []).map((u) => (
                <div
                  key={u.reviewerName}
                  className="border rounded-lg p-3 flex gap-3 items-center"
                >
                  <img
                    src={u.avatarUrl}
                    alt={u.reviewerName}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">
                      {u.reviewerName}
                    </div>
                    <div className="text-xs text-gray-500 flex flex-col gap-1 mt-1">
                      <span>approved: {u.approved}</span>
                      <span>changes: {u.changesRequested}</span>
                      <span>commented: {u.commented}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
