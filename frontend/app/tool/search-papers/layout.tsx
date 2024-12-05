import { SearchPaperProvider } from "@/context/SearchPapersContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <main className="h-[100vh]">
      <SearchPaperProvider>
        {children}
      </SearchPaperProvider>
    </main>
  </div>
);

export default Layout;
