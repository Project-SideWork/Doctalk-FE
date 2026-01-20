import Project from "../pages/project/Project";
import VideoRoom from "../pages/video/VideoRoom";
import RootLayout from "../layout/root-layout";
import DoctalkMain from "../pages/home/DoctalkMain";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Mypage from "../pages/auth/Mypage";
import PasswordReset from "../pages/auth/PasswordReset";
import ProjectRouter from "../pages/project/ProjectRouter";
import VideoConference from "../components/VideoConference";
import DocumentCreatePage from "../pages/project/document/DocumentCreatePage";

const Router = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DoctalkMain /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "mypage", element: <Mypage /> },
      { path: "password-reset", element: <PasswordReset /> },
      { path: "video-call", element: <VideoConference /> },

      {
        path: "project/:section/:projectId/*",
        element: <Project />,
        children: [
          {
            path: "*",
            element: <ProjectRouter />,
          },
        ],
      },

      { path: "video", element: <VideoRoom /> },
      // 문서 생성
      {
        path: "/document/new/:projectId",
        element: <DocumentCreatePage />,
      },

      // 문서 상세
      {
        path: "/document/:documentId",
        element: <DocumentCreatePage />,
      },
    ],
  },
];

export default Router;
