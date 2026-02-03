import { useEffect, useState } from "react";
import {
  checkGithubStat,
  checkProjectEvent,
  checkRepoStats,
  checkRequestedList,
  fetchMyOrgList,
  fetchRepoPrList,
  fetchReviewComments,
} from "apis/githubApi";

export default function useDashboardData(projectId) {
  const [stats, setStats] = useState([]);
  const [requestedList, setRequestedList] = useState(null);
  const [events, setEvents] = useState([]);
  const [repoStats, setRepoStats] = useState(null);
  const [comments, setComments] = useState([]);
  const [prList, setPrList] = useState([]);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    if (!projectId) return;

    (async () => {
      const [statRes, requestedRes, eventRes, repoStatRes, commentRes, prRes] =
        await Promise.all([
          checkGithubStat(projectId),
          checkRequestedList(projectId),
          checkProjectEvent(projectId),
          checkRepoStats({ org: "Project-SideWork", repo: "BE", prCount: 10 }),
          fetchReviewComments({ org: "Project-SideWork", repo: "BE" }),
          fetchRepoPrList({ org: "Project-SideWork", repo: "BE" }).catch(
            () => [],
          ),
        ]);

      setStats(statRes ?? []);
      setRequestedList(requestedRes ?? null);
      setEvents(eventRes?.items ?? []);
      setRepoStats(repoStatRes ?? null);
      setComments(commentRes ?? []);
      setPrList(prRes ?? []);
    })();
  }, [projectId]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchMyOrgList();
        setOrgs(result);
      } catch (e) {
        setOrgs([]);
      }
    })();
  }, []);

  return { stats, requestedList, events, repoStats, comments, prList, orgs };
}
