import { useState } from "react";
import AdminHeader from "./header";
import AdminSideBar from "./sidebar";

import { Outlet } from "react-router-dom";


function AdminLayout(){

  const [openSidebar, setOpensidebar] =useState(false)

    return(
        <div className="flex min-h-screen w-full">
             {/* admin sidebar */}
             <AdminSideBar open={openSidebar} setOpen={setOpensidebar}/>
             <div className="flex flex-1 flex-col">
                  {/* admin header */}
                  <AdminHeader setOpen={setOpensidebar}/>
                  <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                    <Outlet/>
                  </main>
             </div>
        </div>
    )
}

export default AdminLayout;