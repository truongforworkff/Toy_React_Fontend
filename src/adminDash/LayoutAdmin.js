import Sidebar from "./sidebar";



const LayoutAdmin = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>
        {/* Content Area */}
        <div className="col-md-9 col-lg-10">
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;