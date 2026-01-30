import GithubStatsCard from "components/dashboard/GithubStatsCard";
import OrgListSection from "components/dashboard/OrgListSection";
import PrListCard from "components/dashboard/PrListCard";
import RepoEventsCard from "components/dashboard/RepoEventsCard";
import RepoReviewStatsCard from "components/dashboard/RepoReviewStatsCard";
import RequestedPrCard from "components/dashboard/RequestedPrCard";
import ReviewCommentsCard from "components/dashboard/ReviewCommentsCard";

export default function DashboardView({
  stats,
  requestedList,
  events,
  repoStats,
  comments,
  prList,
  orgs,
}) {
  return (
    <div className="pb-6">
      <div className="grid grid-cols-3 gap-4">
        <GithubStatsCard stats={stats} />
        <RequestedPrCard requestedCount={requestedList?.count ?? 0} />
        <RepoReviewStatsCard repoStats={repoStats} />
        <RepoEventsCard events={events} />
        <ReviewCommentsCard comments={comments} />
        <PrListCard prList={prList} />
      </div>
      <OrgListSection orgs={orgs} />
    </div>
  );
}
