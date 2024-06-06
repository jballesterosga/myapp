import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

import {Error} from "../modales/MdlController";

const WS = process.env.REACT_APP_SERVER_API;

const Controller = () =>
{
    const nav = useNavigate();
    //modal
    const {
        mensajeError,
        setMensajeError,
        visibleError,
        verError,
        ocultarError
    } = Error();
    //captura de datos
    const [usuario,setUsuario] = useState("");
    const [contrasena,setContrasena] = useState("");
    //validacion de formulario
    const [validado,setValidado] = useState(false);
    const submit = (e) =>
    {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity())
        {
            e.stopPropagation();
        }
        else
        {
            //validar con ws
            const data = {"usuario":usuario,"contrasena":contrasena};
            axios.post(`${WS}/wsmyapp/login`,
            data,
            {
                headers:
                {
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            })
            .then((res) => 
            {
                Cookies.set("usuario",usuario,{sameSite:"strict"});
                Cookies.set("token",res.data.token,{sameSite:"strict"});
                nav("/home");
            })
            .catch((err) => 
            {
                if (err.response.status === 401)//no autorizado
                {
                    setMensajeError("Usuario o contrase\u00f1a incorrectos");
                    verError();
                }
                else
                {
                    setMensajeError("Error al validar usuario: "+err.message);
                    verError();
                }
            });
        }
        setValidado(true);
    };
    return {
        //------variables
        validado,
        usuario,
        contrasena,
        //------metodos
        submit,
        setUsuario,
        setContrasena,
        //------modales
        mensajeError,
        visibleError,
        ocultarError
    };
};
export default Controller;