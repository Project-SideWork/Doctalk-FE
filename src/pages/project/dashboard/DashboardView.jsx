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
    <div className="pb-6 font-[Livvic]">
      <div className="grid grid-cols-12 gap-4 items-stretch auto-rows-fr">
        {/* 상단 */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-full">
          <RequestedPrCard
            requestedCount={requestedList?.count ?? 0}
            items={requestedList?.items ?? []}
          />
          <GithubStatsCard stats={stats} />
        </div>

        <div className="col-span-12 lg:col-span-8 h-full">
          <RepoReviewStatsCard repoStats={repoStats} />
        </div>

        {/* 중단 */}
        <div className="col-span-12 lg:col-span-4 h-full">
          <RepoEventsCard events={events} />
        </div>

        <div className="col-span-12 lg:col-span-4 h-full">
          <ReviewCommentsCard comments={comments} />
        </div>

        <div className="col-span-12 lg:col-span-4 h-full">
          <PrListCard prList={prList} />
        </div>

        {/* 하단 */}
        <div className="col-span-12">
          <OrgListSection orgs={orgs} />
        </div>
      </div>
    </div>
  );
}
