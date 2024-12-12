import DeviceBlocker from "@/components/global-comp/device-block";
import ProtectedRoute from "@/components/global-comp/protected-route";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DeviceBlocker>
    <div>
      <ProtectedRoute route={true}>
        <main className="h-[100vh]">
          {children}
        </main>
      </ProtectedRoute>
    </div>
  </DeviceBlocker>
);

export default Layout;
