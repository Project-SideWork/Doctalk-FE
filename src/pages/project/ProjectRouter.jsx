// ProjectRouter.jsx
import { useParams } from "react-router-dom";
import WorkBoard from "./workboard/WorkBoard";
import Settings from "./setting/Settings";
import DocumentMainPage from "./document/DocumentMainPage";
import Dashboard from "./dashboard/Dashboard";

const ProjectRouter = () => {
  const { section } = useParams();

  if (section === "workboard") return <WorkBoard />;
  if (section === "settings") return <Settings />;
  if (section === "document") return <DocumentMainPage />;
  if (section === "dashboard") return <Dashboard />;

  return <div>잘못된 주소입니다</div>;
};

export default ProjectRouter;
