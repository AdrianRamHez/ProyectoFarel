import { Link, Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import {iniciarSesion} from '../../sesion/actions/sesionAction';
import { StateContext } from '../../sesion/store';
import {openMensajePantalla} from '../../sesion/actions/snackbarAction';
import logo from '../../images/logop.png'
//import { Link } from 'react-router-dom';
//import { auth } from 'firebase';

const style={
    paper:{
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar:{
        margin: 5,
        backgroundColor: "red"
    },
    form:{
        width: "100%",
        marginTop: 8
    },
    submit: {
        marginTop: 10,
        marginBottom: 20
    }
}

class Login extends Component {
    static contextType = StateContext;

    state = {
        firebase: null,
        usuario:{
            email: '',
            password: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase){
            return null;
        }
        return{
            firebase : nextProps.firebase
        }
    }

    onChange = e =>{
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario : usuario
        })
    }

    login = async e =>{
        e.preventDefault();
        const [{sesion}, dispatch] = this.context;
        const {firebase, usuario} = this.state;
        const {email, password}= usuario;

        let callback = await iniciarSesion(dispatch, firebase, email, password);
        if(callback.status){
            this.props.history.push("/auth/listacursos");
        }else{
            openMensajePantalla(dispatch, {
                open : true,
                mensaje: callback.mensaje.message
            })
        }
    }

    resetearPassword = () => {
        const {firebase, usuario} = this.state;
        const [{sesion}, dispatch] = this.context;

        firebase.auth.sendPasswordResetEmail(usuario.email)
            .then(success=>{
                openMensajePantalla(dispatch,{
                    open:true,
                    mensaje: "se ha enviado un correo electronico a su cuenta"
                })
            })
            .catch(error=>{
                openMensajePantalla(dispatch, {
                    open : true,
                    mensaje: error.message
                })
            })
    }

    render() {
        return (
            <Container maxWidth="xs">
                
                <div style={style.paper}>

                    <Avatar style={style.avatar}>
                        <LockOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingrese su usuario
                    </Typography>
                    <form style={style.form}>
                        <TextField
                            variant="outlined"
                            label="E=Mail"
                            name="email"
                            fullWidth
                            margin="normal"
                            onChange = {this.onChange}
                            value = {this.state.usuario.email}
                        />
                        <TextField 
                            variant="outlined"
                            label="Password"
                            type="password"
                            name="password"
                            fullWidth
                            margin="normal"
                            onChange= {this.onChange}
                            value = {this.state.usuario.password}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.login}
                        style={style.submit}
                        >
                            Entrar
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={this.resetearPassword}>
                                    {"Olvido su contraseña?"}
                                </Link>    
                            </Grid>
                            <Grid item>
                                <Link href="/auth/registrarUsuario" variant="body2">
                                    {"No tienes cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={style.submit}
                        href="/auth/loginTelefono"
                    >
                        Ingrese con su telefono
                    </Button>
                </div>
            </Container>
        );
    }
}

export default compose(consumerFirebase)(Login);