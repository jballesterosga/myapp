import React,{Component} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "./login/UI";
import Home from "./Home";
//empleados
import Agregar from "./empleados/agregar/UI";
import Modificar from "./empleados/modificar/UI";
import Consultar from "./empleados/consultar/UI";
import Familia from "./empleados/familia/UI";
//
import About from "./About";
import Logout from "./Logout";
class App extends Component
{
    render()
    {
        return(
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/empleados/agregar" element={<Agregar/>}/>
                    <Route path="/empleados/modificar/:pidentificacion" element={<Modificar/>}/>
                    <Route path="/empleados/consultar" element={<Consultar/>}/>
                    <Route path="/empleados/familia/:pidentificacion" element={<Familia/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
export default App;