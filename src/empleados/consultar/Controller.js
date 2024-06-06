import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit,faUserXmark,faHouseUser} from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";
import axios from "axios";
import S from "string";

import {Info,Error,Confirmacion,Procesando} from "../../modales/MdlController";

const WS = process.env.REACT_APP_SERVER_API;

const Controller = () =>
{
    const navigate = useNavigate();
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
    //modal procesando
    const {
        visibleProcesando,
        verProcesando,
        ocultarProcesando
    } = Procesando();
    //tabla
    const [datos,setDatos] = useState([]);
    const [nombre,setNombre] = useState([]);
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
        name:"IDENTIFICACION",
        selector:row => row.identificacion,
        sortable:true
    },
    {
        name:"NOMBRE",
        selector:row => row.nombre,
        sortable:true
    },
    {
        name:"CORREO",
        selector:row => row.correo,
        sortable:true
    },
    {
        name:"Modificar",
        button:true,
        cell: row => <Button onClick={e => modificar(row.identificacion)}><FontAwesomeIcon icon={faEdit} size="sm"/></Button>
    },
    {
        name:"Familia",
        button:true,
        cell: row => <Button onClick={e => familia(row.identificacion)}><FontAwesomeIcon icon={faHouseUser} size="sm"/></Button>
    },
    {
        name:"Borrar",
        button:true,
        cell: row => <Button onClick={e => borrar(row.id,row.identificacion)}><FontAwesomeIcon icon={faUserXmark} size="sm"/></Button>
    }];
    const paginacion = {
        rowsPerPageText:"Filas por pagina:",
        rangeSeparatorText:"de",
        noRowsPerPage:false,
        selectAllRowsItem:false,
        selectAllRowsItemText:"Todo"
    };
    const buscar1 = () =>
    {
        buscar2("buscar");
    };
    const buscar2 = (e) =>
    {
        if (e.key === "Enter" ||
            e === "buscar")
        {
            if (!S(nombre).isEmpty())
            {
                axios.get(`${WS}/wsmyapp/empleados/nombre/${nombre}`,
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
                    if (err.response.status !== 401)
                    {
                        setMensajeError("Error al obtener empleados: "+err.message);
                        verError();
                    }
                });
            }
            else
            {
                setMensajeError("Complete empleado para buscar");
                verError();
            }
        }
    };
    const exportar = async() =>
    {
        verProcesando();
        axios.get(`${WS}/wsmyapp/empleados-reporte`,
        {
            headers:
            {
                "Authorization":Cookies.get("token")
            },
            responseType:"blob"
        })
        .then((res) =>
        {
            const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download","reporte.xlsx");
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => 
        {
            setMensajeError("Error al exportar reporte "+err.message);
            verError();
        })
        .finally(() =>
        {
            ocultarProcesando();
        });
    };
    const modificar = (e) =>
    {
        navigate(`/empleados/modificar/${e}`);
    };
    const familia = (e) =>
    {
        navigate(`/empleados/familia/${e}`);
    };
    const [id,setId] = useState(0);
    const borrar = (pid,
                    pidentificacion) =>
    {
        setId(pid);
        setMensajeConfirmacion(`¿ Borrar empleado ${pidentificacion} ?`);
        verConfirmacion();
    };
    const confirmar = () => 
    {
        ocultarConfirmacion();
        //borrado
        axios.delete(`${WS}/wsmyapp/empleados/${id}`,
        {
            headers:
            {
                "Authorization":Cookies.get("token")
            }
        })
        .then((res) =>
        {
            setMensajeInfo("Empleado borrado correctamente");
            verInfo();
            buscar1();
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
                setMensajeError("Error al borrar empleado "+err.message);
                verError();
            }
        });
    };
    return {
        //------variables
        columnas,
        datos,
        estilos,
        paginacion,
        //------metodos
        buscar1,
        buscar2,
        exportar,
        setNombre,
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
        ocultarConfirmacion,
        visibleProcesando
    };
};
export default Controller;