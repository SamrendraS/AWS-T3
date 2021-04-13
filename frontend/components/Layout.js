import Navbar from "./Nav";
import Meta from "./Meta";
import Sidebar from "./SidebarFinal";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="hidden sm:flex">
        <Meta />
        <Sidebar />
      </div>
      <div></div>
      <div className="col-start-1 sm:col-start-4 lg:col-start-3 col-end-13">
        {/* <Navbar />
        <br /> */}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
