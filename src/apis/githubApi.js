import { axiosInstanceNoHeader } from "./axiosInstance";

// 프로젝트 내 나의 깃허브 활동 통계 조회
export const checkGithubStat = async (projectId) => {
  try {
    const res = await axiosInstanceNoHeader.get(`/github/stat/${projectId}`);
    return res.data.result;
  } catch (error) {
    console.error("조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 나에게 리뷰를 요청한 PR 목록 조회
export const checkRequestedList = async (projectId) => {
  try {
    const res = await axiosInstanceNoHeader.get(
      `/github/prs/requested/${projectId}`,
    );
    return res.data.result;
  } catch (error) {
    console.error("조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 프로젝트 레포지토리의 이슈 목록 조회
export const checkProjectIssues = async (projectId) => {
  try {
    const res = await axiosInstanceNoHeader.get(`/github/issues/${projectId}`);
    return res.data.result;
  } catch (error) {
    console.error("조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 프로젝트내 이슈 + PR 관련 이벤트 조회
export const checkProjectEvent = async (projectId) => {
  try {
    const res = await axiosInstanceNoHeader.get(`/github/event/${projectId}`);
    console.log("test: ", res.data.result);
    return res.data.result;
  } catch (error) {
    console.error("조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 조직 내 신규 레포 생성
export const createNewRepo = async (projectId) => {
  try {
    const res = await axiosInstanceNoHeader.post(`/github/event/`);
    return res.data.result;
  } catch (error) {
    console.error("생성 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 레포 PR 리뷰 통계
export const checkRepoStats = async ({ org, repo, prCount = 10 }) => {
  try {
    const res = await axiosInstanceNoHeader.get("/github/repo/stats", {
      params: { org, repo, prCount },
    });
    return res.data.result;
  } catch (error) {
    console.error("조회 실패:", error.message);
    throw error;
  }
};

// 리뷰 코멘트 목록 조회
export const fetchReviewComments = async ({ org, repo }) => {
  try {
    const res = await axiosInstanceNoHeader.get(
      "/github/repo/reviews/comments",
      {
        params: { org, repo },
      },
    );
    return res.data.result;
  } catch (error) {
    console.error("리뷰 코멘트 조회 실패:", error.message);
    throw error;
  }
};

// 레포의 PR 목록 조회
export const fetchRepoPrList = async ({ org, repo }) => {
  try {
    const res = await axiosInstanceNoHeader.get("/github/prs", {
      params: { org, repo },
    });
    return res.data.result;
  } catch (error) {
    console.error("PR 목록 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};
