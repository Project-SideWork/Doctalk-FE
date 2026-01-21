import React from "react";
import UserIdCard from "../../components/home/UserIdCard";
import Calender from "../../components/calender/Calender";
import Layout from "../../components/home/Layout";

const Mypage = () => {
  return (
    <Layout>
      <div className="w-[1280px] h-full py-12 flex flex-col justify-start items-start gap-5">
        <div className="w-full">
          <UserIdCard />
        </div>
        <Calender />
      </div>
    </Layout>
  );
};

export default Mypage;
