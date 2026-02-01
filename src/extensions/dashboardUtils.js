export function formatKoreanDate(e) {
  if (!e) return "";
  const date = new Date(e);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getEventMeta(e) {
  const actor = e?.actor?.login ?? "unknown";
  const repo = e?.repo?.name ?? "";
  const createdAt = e?.created_at ?? "";

  let actionText = "";
  let title = "";
  let url = "";

  if (e?.type === "IssuesEvent") {
    actionText = e?.payload?.action ?? "";
    title = e?.payload?.issue?.title ?? "(제목 없음)";
    url = e?.payload?.issue?.html_url ?? "";
  } else if (e?.type === "PullRequestEvent") {
    const merged = !!e?.payload?.pull_request?.merged;
    actionText = merged ? "merged" : (e?.payload?.action ?? "");
    title = e?.payload?.pull_request?.title ?? "(제목 없음)";
    url = e?.payload?.pull_request?.url ?? "";
  } else if (e?.type === "PullRequestReviewEvent") {
    const state = e?.payload?.review?.state?.toLowerCase();
    actionText = state ? `reviewed (${state})` : "reviewed";
    title = e?.payload?.pull_request?.title ?? "(제목 없음)";
    url = e?.payload?.pull_request?.url ?? "";
  }
  return { actor, repo, createdAt, actionText, title, url };
}

export const truncateTo1Decimal = (value = 0) => {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.floor(num * 10) / 10;
};
