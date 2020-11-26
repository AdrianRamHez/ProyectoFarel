import React, { Component } from 'react';
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import '../css/estilos.css'
import '../css/styleSus.css'
import '../css/styles.css'
//ing
import logo from '../images/logop.png'
import fondo from '../images/fondo.jpg'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import programacion from '../images/programacion.jpg'
import idiomas from '../images/idiomas.png'
import ciencia from '../images/ciencia.jpg'
import marketing from '../images/marketing.jpg'
import electronica from '../images/electronica.jpg'
import mate from '../images/matematicas.jpg'
import face from '../images/face.png'
import twitter from '../images/twitter.jpg'
import instagram from '../images/instagram.png'
//import AppNavbar from '../componentes/layout/AppNavbar';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class inicio extends Component {
    render() {
        return (
            <div>
               <body>
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

                <div className="banner">
                <img src={fondo} />
                <div className="contenedor">
                    
                    <h1 className="banner-titulo"> LA MEJOR EDUCACION A TU ALCANCE </h1>
                    <p className="banner-txt"> Adquiere nuevas habilidades y conocimientos, aprendiendo o enseñando </p>

                </div>
                </div>
                <main className="main">
                    <section className="info">
                        <div className="contenedor">
                            <article className="info-columna">
                                <img src={img1} className="info-img"/>
                                <h2 className="info-titulo">Aprende a tu propio ritmo</h2>
                                <p className="info-txt">Nuestros cursos son completamente online. ¡Tómalos a cualquier hora y en cualquier lugar!</p>
                            </article>

                            <article className="info-columna">
                                <img src={img2} className="info-img" />
                                <h2 className="info-titulo">Crea tu propio curso online</h2>
                                <p className="info-txt">Sube videos, audios, documentos y evaluaciones</p>
                            </article>

                            <article className="info-columna">
                                <img src={img3} className="info-img" />
                                <h2 className="info-titulo">Recibe tu certificado</h2>
                                <p className="info-txt">Una vez que completes tu curso, recibirás un certificado de parte del profesor.</p>
                            </article>
                        </div>
                    </section>
                    <section className="cursos">
                        <div className="contenedor">
                            <h2 className="cursos-titulo">Nuestros cursos</h2>
                            <h5 className="cursos-txt">Estos son algunas de las categorias de los cursos que se ofrecen dentro de esta plataforma educativa llamada Farel</h5>
                            <div id="portfolio">
                                <div className="container-fluid p-0">
                                    <div className="row no-gutters">
                                        <div className="col-lg-4 col-sm-6">
                                            <a className="portfolio-box">
                                                <img className="img-fluid" src={programacion} alt="" />
                                                <div className="portfolio-box-caption">
                                                    <div className="project-category text-white-50">Desarrollo</div>
                                                    
                                                </div></a>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <a className="portfolio-box" 
                                                ><img className="img-fluid" src={idiomas} alt="" />
                                                <div className="portfolio-box-caption">
                                                    <div className="project-category text-white-50">Idiomas</div>
                                                    
                                                </div></a>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <a className="portfolio-box" 
                                                ><img className="img-fluid" src={ciencia} alt="" />
                                                <div className="portfolio-box-caption">
                                                    <div className="project-category text-white-50">ciencia</div>
                                                    
                                                </div></a>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <a className="portfolio-box" 
                                                ><img className="img-fluid" src={marketing} alt="" />
                                                <div className="portfolio-box-caption">
                                                    <div className="project-category text-white-50">marketing</div>
                                                    
                                                </div></a>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <a className="portfolio-box" 
                                                ><img className="img-fluid" src={electronica} alt="" />
                                                <div className="portfolio-box-caption">
                                                    <div className="project-category text-white-50">electronica</div>
                                                    
                                                </div></a>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <a className="portfolio-box" 
                                                ><img className="img-fluid" src={mate} alt="" />
                                                <div className="portfolio-box-caption p-3">
                                                    <div className="project-category text-white-50">matematicas</div>
                                                    
                                                </div></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="page-section bg-dark text-white">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center justify-content-center text-center">
                            <div className="col-lg-10 align-self-end">
                                <h1 className="text-uppercase text-white font-weight-bold">Quienes somos?</h1>
                                <hr className="divider my-4" />
                            </div>
                            <div className="col-lg-8 align-self-baseline">
                                <p className="text-white-75 font-weight-light mb-5">Esta empresa permite elevar la calidad del proceso educativo y ayuda incorporar a los usuarios con la tecnología como herramienta de aprendizaje desarrollando habilidades como participación interactiva</p>
                                <a className="btn btn-success btn-xl js-scroll-trigger"><Link to='/auth/somos'>Ver mas</Link></a>
                            </div>
                        </div>
                    </div>
                    </section>
                </main>

                <footer className="footer">
                    
                    <div className="social">
                        <img src={face}/>
                        <img src={twitter}/>
                        <img src={instagram}/>
                    </div>
                    <p className="copy">&copy; todos los derechos reservados a FAREL | 2020</p>
                </footer>
               </body>
            </div>
        );
    }
}

export default inicio;