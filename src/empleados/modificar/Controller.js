import {useState,useEffect,useRef} from "react";
import {useParams} from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
import S from "string";

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
    //parametros
    let {pidentificacion} = useParams();
    useEffect(() =>
    {
        if (pidentificacion !== "0")
        {
            cargarEmpleado(pidentificacion);
        }
        else
        {
            reset();
        }
    },[pidentificacion]);
    //captura de datos
    const focusIdentificacion = useRef(null);
    const [identificacion,setIdentificacion] = useState("");
    const [nombre,setNombre] = useState("");
    const [correo,setCorreo] = useState("");
    const [editable,setEditable] = useState(true);
    const [esValido,setEsValido] = useState(false);
    //enter
    const enter = (e) =>
    {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13)
        {
            cargarEmpleado(identificacion);
        }
    };
    //limpiar datos
    const reset = () =>
    {
        setIdentificacion("");
        setNombre("");
        setCorreo("");
        setEditable(true);
        setEsValido(false);
        focusIdentificacion.current.focus();
    };
    //cargar datos del empleado
    const cargarEmpleado = (pidentificacion) =>
    {
        axios.get(`${WS}/wsmyapp/empleados/identificacion/${pidentificacion}`,
        {
            headers:
            {
                "Authorization":Cookies.get("token")
            }
        })
        .then((res) =>
        {
            setId(parseInt(res.data.id));
            setIdentificacion(res.data.identificacion);
            setNombre(res.data.nombre);
            setCorreo(res.data.correo);
            setEditable(false);
            setEsValido(true);
        })
        .catch((err) => 
        {
            if (err.response.status === 404)//no encontrato
            {
                setMensajeError("Datos de empleado seleccionado no disponibles");
                verError();
            }
            if (err.response.status !== 404 && //no encontrado y no autorizado
                err.response.status !== 401)
            {
                setMensajeError("Error al obtener datos del empleado "+err.message);
                verError();
            }
        });
    };
    //modificar
    const [id,setId] = useState("");
    const modificar = () =>
    {
        if (!S(nombre).isEmpty() &&
            !S(correo).isEmpty())
        {
            const data = {
                "id":id,
                "identificacion":identificacion,
                "nombre":nombre,
                "correo":correo
            };
            axios.put(`${WS}/wsmyapp/empleados/${id}`,
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
                setMensajeInfo("Empleado actualizado correctamente");
                verInfo();
                reset();
            })
            .catch((err) => 
            {
                if (err.response.status !== 401)//no autorizado
                {
                    setMensajeError("Error al actualizar empleado: "+err.message);
                    verError();
                }
            });
        }
        else
        {
            setMensajeError("Debe completar nombre y correo");
            verError();
        }
    };
    return {
        //------variables
        focusIdentificacion,
        identificacion,
        nombre,
        correo,
        editable,
        esValido,
        //------metodos
        setIdentificacion,
        cargarEmpleado,
        enter,
        setNombre,
        setCorreo,
        modificar,
        reset,
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