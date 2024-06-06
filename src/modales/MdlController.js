import {useState} from "react";

export const Info = () =>
{
    const [mensajeInfo,setMensajeInfo] = useState("");
    const [visibleInfo,setVisibleInfo] = useState(false);
    const verInfo = () => setVisibleInfo(true);
    const ocultarInfo = () => setVisibleInfo(false);
    return {
        mensajeInfo,
        setMensajeInfo,
        visibleInfo,
        verInfo,
        ocultarInfo
    };
};
export const Error = () =>
{
    const [mensajeError,setMensajeError] = useState("");
    const [visibleError,setVisibleError] = useState(false);
    const verError = () => setVisibleError(true);
    const ocultarError = () => setVisibleError(false);
    return {
        mensajeError,
        setMensajeError,
        visibleError,
        verError,
        ocultarError
    };
};
export const Confirmacion = () =>
{
    const [mensajeConfirmacion,setMensajeConfirmacion] = useState("");
    const [visibleConfirmacion,setVisibleConfirmacion] = useState(false);
    const verConfirmacion = () => setVisibleConfirmacion(true);
    const ocultarConfirmacion = () => setVisibleConfirmacion(false);
    return {
        mensajeConfirmacion,
        setMensajeConfirmacion,
        visibleConfirmacion,
        verConfirmacion,
        ocultarConfirmacion
    };
};
export const Procesando = () =>
{
    const [visibleProcesando,setVisibleProcesando] = useState(false);
    const verProcesando = () => setVisibleProcesando(true);
    const ocultarProcesando = () => setVisibleProcesando(false);
    return {
        visibleProcesando,
        verProcesando,
        ocultarProcesando
    };
};