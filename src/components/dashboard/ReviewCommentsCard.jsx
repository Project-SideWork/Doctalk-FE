import { formatKoreanDate } from "extensions/dashboardUtils";

export default function ReviewCommentsCard({ comments = [] }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <h2 className="font-bold text-[18px]">PR Review Comments</h2>
        <span className="text-sm text-gray-500">{comments.length}개</span>
      </div>

      {comments.length === 0 ? (
        <div className="text-sm text-gray-400">코멘트가 없어요.</div>
      ) : (
        <div className="max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.commentId} className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <img
                  src={c.authorAvatarUrl}
                  alt={c.authorLogin}
                  className="w-6 h-6 rounded-full"
                  loading="lazy"
                />
                <span className="font-semibold">{c.authorLogin}</span>
                <span className="text-xs text-gray-400">
                  {formatKoreanDate(c.createdAt)}
                </span>
              </div>

              <div
                className="mt-2 text-xs text-gray-500 line-clamp-2 break-all"
                title={c.filePath}
              >
                {c.filePath || "(파일 정보 없음)"}
              </div>

              <p
                className="mt-2 text-sm line-clamp-3 whitespace-pre-wrap"
                title={c.body}
              >
                {c.body}
              </p>

              <a
                href={c.commentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
              >
                GitHub에서 보기 →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
