import Header from "./src/components/Header/Header.jsx"
import Footer from "./src/components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function Layout(){

    return(
        <>
            <Header />
            <Outlet/>
            <Footer />
        </>
    )

}

export default Layout