import {useState} from "react";

import Cookies from "js-cookie";
import axios from "axios";

import MdlSesion from "./modales/MdlSesion";
function ValidarToken()
{
    const WS = process.env.REACT_APP_SERVER_API;
    axios.get(`${WS}/wsmyapp/validar-token`,
    {
        headers:
        {
            "Authorization":Cookies.get("token")
        }
    })
    .catch((err) => 
    {
        verMensaje();
    });
    //modal
    const [visible,setVisible] = useState(false);
    const verMensaje = () => setVisible(true);
    //render
    return(
        <>
            <MdlSesion visible={visible}/>
        </>
    );
}
export default ValidarToken;