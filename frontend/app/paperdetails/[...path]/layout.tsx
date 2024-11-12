const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <main className="h-[100vh]">
      {children}
    </main>
  </div>
);

export default Layout;
