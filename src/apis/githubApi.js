import { axiosInstanceNoHeader } from "./axiosInstance";

// 프로젝트 내 나의 깃허브 활동 통계 조회
export const checkGithubStat = async (projectId) => {
  try {
    const res = await axiosInstanceNoHeader.get(`/github/stat/${projectId}`);
    console.log("조회", res.data);
    return res.data.result;
  } catch (error) {
    console.error("조회 실패:", error.response?.data || error.message);
    throw error;
  }
};
