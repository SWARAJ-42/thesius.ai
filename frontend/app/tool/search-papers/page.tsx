"use client";
import { ExpandableSidebar } from "@/components/tool-comp/common-comp/expandable-sidebar";
import Playground from "@/components/tool-comp/search-papers-comp/Playground";
import Layout from "./layout";
import { Footer } from "@/components/global-comp/Footer";
import { useSearchPaper } from "@/context/SearchPapersContext";


const Page = () => {
  const {
    searchPaperPage,
    setSearchPaperPage,
    paperRetrievalLoading,
    setPaperRetrievalLoading,
    paperRetrievalQuery,
    setPaperRetrievalQuery,
  } = useSearchPaper(); // Use the hook
  return (
    <div className="h-[100vh] bg-gray-100 overflow-y-scroll">
        <ExpandableSidebar />
        <Playground />
        {searchPaperPage && <Footer/>}
    </div>
  );
};

Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Page;
