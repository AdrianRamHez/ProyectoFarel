import React, {Component, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import Listacursos from './componentes/vistas/Listacursos';
import AppNavbar from './componentes/layout/AppNavbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import InicioI from './componentes/inicio';
import Somos from './componentes/vistas/Quienesomos'
import { FirebaseContext } from './server';

import { useStateValue } from "./sesion/store";
import { Snackbar } from '@material-ui/core';
import openSnackbarReducer from './sesion/reducers/openSnackbarReducer';
import RutaAutenticada from './componentes/seguridad/RutaAutenticada';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import NuevoIncurso from "./componentes/vistas/NuevoIncurso";
import EditarIncurso from './componentes/vistas/EditarIncurso';
import LoginTelefono from './componentes/seguridad/LoginTelefono';
import ContenidoIncurso from './componentes/vistas/ContenidoIncurso';


function App(props){
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{openSnackbar}, dispatch] = useStateValue();

  useEffect(()=>{
    firebase.estaIniciado().then(val=>{
      setupFirebaseInicial(val);
    })
  })


  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
      anchorOrigin={{vertical:"bottom", horizontal:"center"}}
      open={openSnackbar ? openSnackbar.open : false}
      autoHideDuration={3000}
      ContentProps={{
        "aria-describedby" : "message-id"
      }}
      message={
        <span id="message-id">
          {openSnackbar ? openSnackbar.mensaje : ""}
        </span>
      }
      onClose = {()=>
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: false,
            mensaje: ""
          }
        })
      }
      >

      </Snackbar>
      <Router>
          <MuiThemeProvider theme={theme}>
              <AppNavbar />

              <Route path="/" exact component={InicioI} />
              <Grid container>
                <Switch>
                  
                  <RutaAutenticada exact path="/auth/perfil" autenticadoFirebase={firebase.auth.currentUser} component={PerfilUsuario} />
                  <RutaAutenticada exact path="/auth/listacursos" autenticadoFirebase={firebase.auth.currentUser} component={Listacursos} />
                  <Route path="/auth/registrarUsuario" exact component={RegistrarUsuario} />
                  <RutaAutenticada exact path="/incurso/nuevo" autenticadoFirebase={firebase.auth.currentUser} component={NuevoIncurso} />
                  <RutaAutenticada exact path="/incurso/:id" autenticadoFirebase={firebase.auth.currentUser} component={EditarIncurso} />
                  <RutaAutenticada exact path="/incursos/:id" autenticadoFirebase={firebase.auth.currentUser} component={ContenidoIncurso} />
                  <Route path="/auth/login" exact component={Login} />
                  <Route path="/auth/loginTelefono" exact component={LoginTelefono} />
                  <Route path="/auth/somos" exact component={Somos} />
                </Switch>
              </Grid>
              
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
  )
  :null
  ;
}

export default App;
