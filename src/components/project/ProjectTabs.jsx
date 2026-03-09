import { NavLink, useParams } from "react-router-dom";
import {
  DocumentIcon,
  SettingsIcon,
  WorkBoardIcon,
  DashboardIcon,
} from "assets/icons";

const ProjectTabs = () => {
  const { projectId } = useParams();

  const tabList = [
    {
      to: `/project/workboard/${projectId}`,
      label: "작업 보드",
      icon: <WorkBoardIcon />,
    },
    {
      to: `/project/document/${projectId}`,
      label: "문서",
      icon: <DocumentIcon />,
    },
    {
      to: `/project/settings/${projectId}`,
      label: "설정",
      icon: <SettingsIcon />,
    },
    {
      to: `/project/dashboard/${projectId}`,
      label: "대시보드",
      icon: <DashboardIcon />,
    },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap items-start md:items-center gap-3 md:gap-6 font-[Palanquin]">
      {tabList.map(({ to, label, icon }) => (
        <NavLink
          key={label}
          to={to}
          end
          className={({ isActive }) =>
            `flex items-center gap-1.5 py-2 text-sm sm:text-base md:text-[20px] font-semibold cursor-pointer text-black no-underline 
            ${isActive ? "opacity-100 border-b-2 md:border-b-4 border-black" : "opacity-30"}`
          }
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default ProjectTabs;
