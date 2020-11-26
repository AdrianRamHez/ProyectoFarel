import React, { Component } from 'react';
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import '../../css/styles.css'

import logo from '../../images/logop.png'
import adrian from '../../images/img/integrantes/adrian.jpeg'
import carlos from '../../images/img/integrantes/carlos.jpeg'
import fernanda from '../../images/img/integrantes/fernanda.jpeg'
import ramon from '../../images/img/integrantes/ramon.jpeg'
import uno from '../../images/img/portfolio/fullsize/1.jpeg'
import dos from '../../images/img/portfolio/fullsize/2.jpeg'
import tres from '../../images/img/portfolio/fullsize/3.jpeg'
import cuatro from '../../images/img/portfolio/fullsize/4.jpeg'
import cinco from '../../images/img/portfolio/fullsize/5.jpeg'
import seis from '../../images/img/portfolio/fullsize/6.jpeg'
import unou from '../../images/img/portfolio/thumbnails/1.jpeg'
import dosd from '../../images/img/portfolio/thumbnails/2.jpeg'
import trest from '../../images/img/portfolio/thumbnails/3.jpeg'
import cuatroc from '../../images/img/portfolio/thumbnails/4.jpeg'
import cincoc from '../../images/img/portfolio/thumbnails/5.jpeg'
import seiss from '../../images/img/portfolio/thumbnails/6.jpeg'
import phone from '../../images/img/phone.png'
import email from '../../images/img/email.png'

class Quienesomos extends Component {
    render() {
        return (
            <div>
                <header className="header">
                        <div className="contenedor">
                            <img src={logo} className="logo" />
                            <span className="icon-menu" id="btn-menu"></span>
                            <nav className="nav" id="nav">
                                <ul className="menu">
                                <Button color="inherit">
                                    <Link to='/'> Inicio </Link></Button>
                                    <Button color="inherit"><Link to='/auth/Somos'> Quienes somos? </Link></Button>
                                    <Button color="inherit"><Link to='/auth/login'> Login </Link></Button>
                                    <Button color="inherit"><Link to='/auth/registrarUsuario'> Registrarse </Link></Button>
                                </ul>
                            </nav>
                        </div>
                    </header>

                <body id="page-top">
                
                <header className="masthead">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center justify-content-center text-center">
                            <div className="col-lg-10 align-self-end">
                                <h1 className="text-uppercase text-white font-weight-bold">Quienes somos?</h1>
                                <hr className="divider my-4" />
                            </div>
                            <div className="col-lg-8 align-self-baseline">
                                <p className="text-white-75 font-weight-light mb-5">Esta empresa permite elevar la calidad del proceso educativo y ayuda incorporar a los usuarios con la tecnología como herramienta de aprendizaje desarrollando habilidades como participación interactiva</p>
                                <a className="btn btn-success btn-xl js-scroll-trigger" href="#about">Ver mas</a>
                            </div>
                        </div>
                    </div>
                </header>
        
                <section className="page-section bg-success" id="about">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="text-white mt-0">Objetivo</h2>
                                <hr className="divider light my-4" />
                                <p className="text-white-50 mb-4">Desarrollar una plataforma virtual que permita difundir y generar una retroalimentación al igual que facilitar y difundir el acceso de diferentes cursos.
                                    Fomentando la participación y organización de los alumnos.
                                    </p>
                                
                            </div>
                        </div>
                    </div>
                </section>
        
                <section className="page-section">
                    <div>
                        <h3 className="text-center mt-0">Equipo de desarrollo</h3>
                        <hr className="divider my-4" />
                        <div className="row">
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <img className="info-img" src={adrian} alt="" />
                                    <h5 className="h4 mb-2">Adrian Ramirez Hernandez 20171027</h5>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <img className="info-img" src={ramon} alt="" />
                                    <h3 className="h4 mb-2">Ramón San Juan Tolentino 20150864</h3>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <img className="info-img" src={fernanda} alt="" />
                                    <h3 className="h4 mb-2">Fernanda Hernandez Hernandez 20171061</h3>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <img className="info-img" src={carlos} alt="" />
                                    <h3 className="h4 mb-2">Carlos Eduardo Hernandez Castillo 20171328</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        
                <div id="portfolio">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box"
                                    ><img className="img-fluid" src={uno} alt="" />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Equipo 7</div>
                                        
                                    </div></a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box"
                                    ><img className="img-fluid" src={dos} alt="" />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Equipo 7</div>
                                        
                                    </div></a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box"
                                    ><img className="img-fluid" src={tres} alt="" />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Equipo 7</div>
                                        
                                    </div></a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box"
                                    ><img className="img-fluid" src={cuatro} alt="" />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Equipo 7</div>
                                        
                                    </div></a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box"
                                    ><img className="img-fluid" src={cinco} alt="" />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Equipo 7</div>
                                        
                                    </div></a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box"
                                    ><img className="img-fluid" src={seis} alt="" />
                                    <div className="portfolio-box-caption p-3">
                                        <div className="project-category text-white-50">Equipo 7</div>
                                        
                                    </div></a>
                            </div>
                        </div>
                    </div>
                </div>
        
                    <section className="page-section bg-dark text-white">
                        <div className="container text-center">
                            <h2 className="mb-4">10° "A"     Equipo 7</h2>
                        </div>
                    </section>
                    
                    <section className="page-section" id="contact">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center">
                                    <h2 className="mt-0">Contactanos!</h2>
                                    <hr className="divider my-4" />
                                    <p className="text-muted mb-5">
                                        ¿necesitas contactarnos? ¡Llámanos o envíanos un correo electrónico y nos pondremos en contacto contigo lo antes posible!</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                                    <img src={phone}/>
                                    <div>+1 (234) 567-8910</div>
                                </div>
                                <div className="col-lg-4 mr-auto text-center">
                                <img src={email}/>
                                    <a className="d-block" href="">farel@farel.com</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <footer className="bg-light py-5">
                        <div className="container"><div class="small text-center text-muted">Copyright © 2020 - farel</div></div>
                    </footer>      
                    
                </body>
            </div>
        );
    }
}

export default Quienesomos;