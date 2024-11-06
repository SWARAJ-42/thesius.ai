import { ExpandableSidebar } from "@/components/tool-comp/common-comp/expandable-sidebar";
import Playground from "@/components/tool-comp/internet-articles-comp/Playground";
import Layout from "./layout";

const Page = () => {
  return (
    <div className="flex bg-gray-800">
        <ExpandableSidebar />
        <Playground />
    </div>
  );
};

Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Page;
