import { Outlet } from "react-router-dom";
import Header from "../../common/header/components/Header";
import FloatingBar from "../../common/floatingBar/components/FloatingBar";
import Footer from "../../common/footer/components/Footer";
import styles from '../layouts/css/userlayout.module.css';

function UserLayout() {
    return (
        <div className={styles.layoutStyle}>
            <Header className={styles.header} />
            <main className={styles.main}>
                <FloatingBar />
                <Outlet />
            </main>
            <Footer className={styles.footer} />
        </div>
    );
}

export default UserLayout;
