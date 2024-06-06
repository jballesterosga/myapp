import {useState,useEffect,useRef} from "react";
import {useParams} from "react-router-dom";

import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserXmark} from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";
import axios from "axios";
import S from "string";

import {Info,Error,Confirmacion} from "../../modales/MdlController";

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
    //modal confirmacion
    const {
        mensajeConfirmacion,
        setMensajeConfirmacion,
        visibleConfirmacion,
        verConfirmacion,
        ocultarConfirmacion
    } = Confirmacion();
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
    const [detalle,setDetalle] = useState("");
    const focusDetalle = useRef(null);
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
        setDetalle("");
        setEditable(true);
        setEsValido(false);
        setDatos([]);
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
            setIdentificacion(res.data.identificacion);
            setNombre(res.data.nombre);
            setCorreo(res.data.correo);
            setEditable(false);
            setEsValido(true);
            cargarFamilia(pidentificacion);
            focusDetalle.current.focus();
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
    //guardar familiar
    const guardar = () =>
    {
        if (!S(detalle).isEmpty())
        {
            const data = {
                "identificacion":identificacion,
                "detalle":detalle
            };
            axios.post(`${WS}/wsmyapp/familia`,
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
                setMensajeInfo("Familiar guardado correctamente");
                verInfo();
                setDetalle("");
                cargarFamilia(identificacion);
            })
            .catch((err) => 
            {
                if (err.response.status !== 401)//no autorizado
                {
                    setMensajeError("Error al guardar familiar: "+err.message);
                    verError();
                }
            });
        }
        else
        {
            setMensajeError("Debe completar detalle de familiar");
            verError();
        }
    };
    //tabla
    const [id,setId] = useState(0);
    const [datos,setDatos] = useState([]);
    const estilos = 
    {
        headCells: 
        {
            style:
            {
                fontWeight:"bold"
            }
        }
    };
    const columnas = [
    {
        name:"DETALLE",
        selector:row => row.detalle,
        sortable:true
    },
    {
        name:"Borrar",
        button:true,
        cell: row => <Button onClick={e => borrar(row.id,row.detalle)}><FontAwesomeIcon icon={faUserXmark} size="sm"/></Button>
    }];
    const paginacion = {
        rowsPerPageText:"Filas por pagina:",
        rangeSeparatorText:"de",
        noRowsPerPage:false,
        selectAllRowsItem:false,
        selectAllRowsItemText:"Todo"
    };
    const cargarFamilia = (pidentificacion) =>
    {
        if (!S(pidentificacion).isEmpty())
        {
            axios.get(`${WS}/wsmyapp/familia/${pidentificacion}`,
            {
                headers:
                {
                    "Authorization":Cookies.get("token")
                }
            })
            .then((res) =>
            {
                setDatos(res.data);
            })
            .catch((err) => 
            {
                if (err.response.status !== 404 && //no encontrado y no autorizado
                    err.response.status !== 401)
                {
                    setMensajeError("Error al obtener familia: "+err.message);
                    verError();
                }
            });
        }
    };
    const borrar = (pid,
                    pdetalle) =>
    {
        setId(pid);
        setMensajeConfirmacion(`¿ Borrar familiar ${pdetalle} ?`);
        verConfirmacion();
    };
    //confirma borrar
    const confirmar = () => 
    {
        ocultarConfirmacion();
        axios.delete(`${WS}/wsmyapp/familia/${id}`,
        {
            headers:
            {
                "Authorization":Cookies.get("token")
            }
        })
        .then((res) =>
        {
            setMensajeInfo("Familiar borrado correctamente");
            verInfo();
            cargarFamilia(identificacion);
        })
        .catch((err) => 
        {
            if (err.response.status === 404)//no encontrato
            {
                setMensajeError("Datos de familiar seleccionado no disponibles");
                verError();
            }
            if (err.response.status !== 404 && //no encontrado y no autorizado
                err.response.status !== 401)
            {
                setMensajeError("Error al borrar familiar "+err.message);
                verError();
            }
        });
    };
    return {
        //------variables
        focusIdentificacion,
        identificacion,
        nombre,
        correo,
        focusDetalle,
        detalle,
        editable,
        esValido,
        columnas,
        datos,
        estilos,
        paginacion,
        //------metodos
        setIdentificacion,
        enter,
        cargarEmpleado,
        setDetalle,
        guardar,
        reset,
        //------modales
        mensajeInfo,
        visibleInfo,
        ocultarInfo,
        mensajeError,
        visibleError,
        ocultarError,
        mensajeConfirmacion,
        visibleConfirmacion,
        confirmar,
        ocultarConfirmacion
    };
};
export default Controller;