export default function PrListCard({ prList = [] }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <h2 className="font-bold text-[18px]">PR List</h2>
        <span className="text-sm text-gray-500">{prList.length}개</span>
      </div>

      {prList.length === 0 ? (
        <div className="text-sm text-gray-400">PR이 없어요.</div>
      ) : (
        <div className="max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-2">
          {prList.map((pr) => (
            <a
              key={pr.id}
              href={pr.html_url}
              target="_blank"
              rel="noreferrer"
              className="border rounded-lg p-3 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              <div className="text-sm font-semibold line-clamp-1">
                #{pr.number} {pr.title}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <img
                    src={pr.user?.avatar_url}
                    alt={pr.user?.login}
                    className="w-4 h-4 rounded-full"
                    loading="lazy"
                  />
                  <span>{pr.user?.login}</span>
                  <span>·</span>
                  <span>
                    {new Date(pr.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    pr.state === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-violet-100 text-violet-700"
                  }`}
                >
                  {pr.state === "open" ? "OPEN" : "MERGED"}
                </span>
              </div>

              <div className="mt-1 text-xs text-gray-400">
                {pr.head?.ref ?? "(브랜치 정보 없음)"}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
