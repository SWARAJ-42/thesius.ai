import { Footer } from "@/components/global-comp/Footer";
import { SearchPaperProvider } from "@/context/SearchPapersContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <main className="h-[100vh]">
      <SearchPaperProvider>
        {children}
        <Footer />
      </SearchPaperProvider>
    </main>
  </div>
);

export default Layout;
