
import { Outlet } from "react-router-dom";
import Header from "../../common/header/components/Header";
import Footer from "../../common/footer/components/Footer";
import FloatingBar from "../../common/floatingbar/components/FloatingBar";

function UserLayout(){

    return(
        <>
            <Header/>
                <main>
                    <FloatingBar/>
                    <Outlet />
                </main>
            <Footer/>   
        </>
    );
}

export default UserLayout;
