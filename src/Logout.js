import Cookies from "js-cookie";

import Login from "./login/UI";
function Logout()
{
    Cookies.remove("usuario");
    Cookies.remove("token");
    return(
        <>
        <Login mensaje="fin"/>
        </>
    );
}
export default Logout;