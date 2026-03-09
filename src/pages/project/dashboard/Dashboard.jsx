import React from "react";
import { useOutletContext } from "react-router-dom";
import DashboardView from "./DashboardView";
import useDashboardData from "hooks/useDashboardData";

export default function Dashboard() {
  const { projectId } = useOutletContext();
  const data = useDashboardData(projectId);

  return <DashboardView {...data} />;
}
