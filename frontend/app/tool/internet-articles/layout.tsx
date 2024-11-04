const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>
      <main className="h-[100vh] bg-gray-100">
        {children}
      </main>
    </div>
  );
  
  export default Layout;