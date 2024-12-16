import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Info from "../../../user/pages/info/Info";


function Layout(){

    return(
        <>
        <Header/>
        <Info/>
        </>
    )
}

export default Layout;