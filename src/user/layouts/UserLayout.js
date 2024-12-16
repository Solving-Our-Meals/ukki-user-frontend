
import { Outlet } from "react-router-dom";
import Header from "../../common/header/components/Header";
import Footer from "../../common/footer/components/Footer";

function UserLayout(){

    return(
        <>
            <Header/>
                <main>
                    <Outlet />
                </main>
            <Footer/>   
        </>
    );
}

export default UserLayout;
