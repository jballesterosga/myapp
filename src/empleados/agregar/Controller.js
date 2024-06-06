import {useState} from "react";

import Cookies from "js-cookie";
import axios from "axios";

import {Info,Error} from "../../modales/MdlController";

const WS = process.env.REACT_APP_SERVER_API;

const Controller = () =>
{
    //modal info
    const {
        mensajeInfo,
        setMensajeInfo,
        visibleInfo,
        verInfo,
        ocultarInfo
    } = Info();
    //modal error
    const {
        mensajeError,
        setMensajeError,
        visibleError,
        verError,
        ocultarError
    } = Error();
    //formulario
    const [identificacion,setIdentificacion] = useState("");
    const [nombre,setNombre] = useState("");
    const [correo,setCorreo] = useState("");
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
            validar();
        }
        setValidado(true);
    };
    const reset = () =>
    {
        setIdentificacion("");
        setNombre("");
        setCorreo("");
    };
    //validar y guardar empleado
    const validar = () =>
    {
        axios.get(`${WS}/wsmyapp/empleados/identificacion/${identificacion}`,
        {
            headers:
            {
                "Authorization":Cookies.get("token")
            }
        })
        .then((res) =>//200 -> empleado ya existe
        {
            setMensajeError("No se puede guardar empleado porque ya existe");
            verError();
        })
        .catch((err) => 
        {
            if (err.response.status === 404)//no existe guardar
            {
                guardar();
            }
            else
            {
                setMensajeError("Error al validar empleado: "+err.message);
                verError();
            }
        });
    };
    const guardar = () =>
    {
        const data = {
            "identificacion":identificacion,
            "nombre":nombre,
            "correo":correo
         };
        axios.post(`${WS}/wsmyapp/empleados`,
        data,
        {
            headers:
            {
                "Authorization":Cookies.get("token"),
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then((res) => 
        {
            setMensajeInfo("Empleado guardado correctamente");
            verInfo();
            setValidado(false);
            reset();
        })
        .catch((err) => 
        {
            if (err.response.status !== 401)//no autorizado
            {
                mensajeError("Error al guardar empleado: "+err.message);
                verError();
            }
        });
    };
    return {
        //------variables
        validado,
        identificacion,
        nombre,
        correo,
        //------metodos
        submit,
        reset,
        setIdentificacion,
        setNombre,
        setCorreo,
        //------modales
        mensajeInfo,
        visibleInfo,
        ocultarInfo,
        mensajeError,
        visibleError,
        ocultarError
    };
};
export default Controller;