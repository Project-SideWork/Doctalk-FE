// 한국 날짜 변환 함수
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

// 이벤트 구분용 함수
export function getEventMeta(e) {
  const actor = e?.actor?.login ?? "unknown";
  const repo = e?.repo?.name ?? "";
  const createdAt = e?.created_at ?? "";
  const avatar = e?.actor?.avatar_url ?? "";

  let kind = "EVENT"; // ISSUE | PR | REVIEW | COMMENT | EVENT
  let action = ""; // opened | closed | merged | reviewed | commented
  let actionLabel = ""; // OPENED | CLOSED | MERGED | REVIEW | COMMENT
  let badgeVariant = "neutral"; // green | gray | purple | blue | neutral
  let title = "";
  let url = "";
  let number = "";

  if (e?.type === "IssuesEvent") {
    kind = "ISSUE";
    action = e?.payload?.action ?? "";
    title = e?.payload?.issue?.title ?? "(제목 없음)";
    url = e?.payload?.issue?.html_url ?? "";
    number = e?.payload?.issue?.number ?? "";

    if (action === "opened" || action === "reopened") {
      actionLabel = action === "reopened" ? "REOPENED" : "OPEN";
      badgeVariant = "green";
    } else if (action === "closed") {
      actionLabel = "CLOSED";
      badgeVariant = "purple";
    } else {
      actionLabel = (action || "UPDATED").toUpperCase();
      badgeVariant = "neutral";
    }
  } else if (e?.type === "PullRequestEvent") {
    kind = "PR";
    const merged = !!e?.payload?.pull_request?.merged;
    action = merged ? "merged" : (e?.payload?.action ?? "");
    title = e?.payload?.pull_request?.title ?? "(제목 없음)";
    url = e?.payload?.pull_request?.url ?? "";
    number = e?.payload?.pull_request?.number ?? "";

    if (action === "opened" || action === "reopened") {
      actionLabel = action === "reopened" ? "REOPENED" : "OPEN";
      badgeVariant = "green";
    } else if (action === "closed") {
      actionLabel = "CLOSED";
      badgeVariant = "gray";
    } else if (action === "merged") {
      actionLabel = "MERGED";
      badgeVariant = "purple";
    } else {
      actionLabel = (action || "UPDATED").toUpperCase();
      badgeVariant = "neutral";
    }
  } else if (e?.type === "PullRequestReviewEvent") {
    kind = "REVIEW";
    const state = e?.payload?.review?.state?.toLowerCase();
    action = "reviewed";
    title = e?.payload?.pull_request?.title ?? "(제목 없음)";
    url = e?.payload?.pull_request?.url ?? "";
    number = e?.payload?.pull_request?.number ?? "";

    actionLabel = state ? `REVIEW · ${state.toUpperCase()}` : "REVIEW";
    badgeVariant = "blue";
  } else if (e?.type === "PullRequestReviewCommentEvent") {
    kind = "COMMENT";
    action = "commented";
    title = e?.payload?.pull_request?.title ?? "(제목 없음)";
    url = e?.payload?.comment?.html_url ?? "";
    number = e?.payload?.pull_request?.number ?? "";

    actionLabel = "COMMENT";
    badgeVariant = "gray";
  } else {
    // 알 수 없는 이벤트 처리
    kind = e?.type?.replace("Event", "").toUpperCase() ?? "EVENT";
    actionLabel = "EVENT";
    badgeVariant = "neutral";
  }

  return {
    actor,
    repo,
    createdAt,
    avatar,
    kind,
    action,
    actionLabel,
    badgeVariant,
    title,
    url,
    number,
  };
}

// 소수점 첫째자리 반환 함수
export const truncateTo1Decimal = (value = 0) => {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.floor(num * 10) / 10;
};

// 상태 뱃지 구분 함수
export function getBadgeClass(variant) {
  if (variant === "green") return "bg-emerald-100 text-emerald-700";
  if (variant === "gray") return "bg-slate-200 text-slate-700";
  if (variant === "purple") return "bg-violet-100 text-violet-700";
  if (variant === "blue") return "bg-sky-100 text-sky-700";
  return "bg-gray-100 text-gray-700";
}

// 컬러 바 구분 함수
export function getKindClass(kind) {
  if (kind === "PR") return "bg-violet-500";
  if (kind === "ISSUE") return "bg-emerald-500";
  if (kind === "REVIEW") return "bg-sky-500";
  if (kind === "COMMENT") return "bg-gray-500";
  return "bg-gray-400";
}

// 퍼센트 바 렌더링 함수
export function getPercentToColor(percent) {
  if (percent >= 80) return "bg-emerald-500";
  if (percent >= 60) return "bg-lime-500";
  if (percent >= 40) return "bg-yellow-400";
  if (percent >= 20) return "bg-orange-500";
  return "bg-red-500";
}
