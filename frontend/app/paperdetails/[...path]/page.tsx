"use client"

import { ExpandableSidebar } from "@/components/tool-comp/common-comp/expandable-sidebar";
import Playground from "@/components/paperdetails-comp/Playground";
import Layout from "./layout";

const Page = () => {
  return (
    <div className="flex h-[100vh] bg-gray-800 overflow-y-scroll">
        <ExpandableSidebar />
        <Playground />
    </div>
  );
};

Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Page;