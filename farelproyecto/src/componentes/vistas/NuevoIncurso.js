import {Table, Breadcrumbs, Button, Container,
     Grid, Link, Paper, TextField, Typography,
      TableCell, TableBody, TableRow } from '@material-ui/core';
import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import {consumerFirebase} from '../../server';
import {openMensajePantalla} from '../../sesion/actions/snackbarAction';
import ImageUploader from 'react-images-upload';
import {v4 as uuidv4} from 'uuid';
import { crearKeyword } from '../../sesion/actions/Keyword';

const style = {
    container:{
        paddingTop: "8px"
    },
    paper:{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5"
    },
    link:{
        display: "flex"
    },
    homeIcon:{
        width: 20,
        height: 20,
        marginRight: "4px"
    },
    submit:{
        marginTop: 15,
        marginBottom: 10
    },
    foto:{
        height: "100px"
    }
};

class NuevoIncurso extends Component {

    state= {
        incurso:{
            curso: '',
            ciudad: '',
            pais: '',
            precio: '',
            descripcion: '',
            fotos: []
        },
        archivos: []
    };

    entraDatoEnEstado = e => {
        let incurso_=Object.assign({}, this.state.incurso);
        incurso_[e.target.name] = e.target.value;
        this.setState({
            incurso: incurso_
        });
    };

    subirFotos = documentos => {
        Object.keys(documentos).forEach(function(key){
            documentos[key].urlTemp = URL.createObjectURL(documentos[key]);
        })

        this.setState({
            archivos : this.state.archivos.concat(documentos)
        })
    }

    guardarIncurso = () => {
        const { archivos, incurso } = this.state;
        //crear alias a imajenes para ser almacenado en la base de datos

        Object.keys(archivos).forEach(function(key){
            let valorDinamico = Math.floor(new Date().getTime()/1000);
            let nombre=archivos[key].name;
            let extension = nombre.split(".").pop();
            archivos[key].alias = (nombre.split(".")[0] + "_" + valorDinamico + "." + extension).replace(/\s/g,"_").toLowerCase();
        })

        const textoBusqueda = incurso.curso + '' + incurso.ciudad + '' + incurso.pais;
        let keywords = crearKeyword(textoBusqueda);

        this.props.firebase.guardarDocumentos(archivos).then(arregloUrls => {
            incurso.foto = arregloUrls;
            incurso.keywords = keywords;
            incurso.propietario = this.props.firebase.auth.currentUser.uid;

            this.props.firebase.db
                .collection("Incursos")
                .add(incurso)
                .then(success=>{
                    this.props.history.push("/auth/listacursos");
                })
                .catch(error=>{
                    openMensajePantalla({
                        open: true,
                        mensaje: error
                    });
                });
        });
                    
    };

    eliminarFoto = nombreFoto => () =>{
        this.setState({
            archivos: this.state.archivos.filter(archivo => {
                return archivo.name !== nombreFoto
            })
        })
    }

    render() {
        let imagenkey = uuidv4();

        return (
            <Container style={style.container}>
                <Paper style={style.paper}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon style={style.homeIcon}/>
                                    Home
                                </Link>
                                <Typography color="textPrimary">Nuevo Curso</Typography>
                            </Breadcrumbs>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="curso"
                                label="Nombre del curso"
                                fullWidth
                                onChange={this.entraDatoEnEstado}
                                value={this.state.incurso.curso}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="ciudad"
                                label="Ciudad"
                                fullWidth
                                onChange={this.entraDatoEnEstado}
                                value={this.state.incurso.ciudad}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="pais"
                                label="Pais"
                                fullWidth
                                onChange={this.entraDatoEnEstado}
                                value={this.state.incurso.pais}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="precio"
                                label="Precio"
                                fullWidth
                                onChange={this.entraDatoEnEstado}
                                value={this.state.incurso.precio}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="descripcion"
                                label="Descripcion de Incurso"
                                fullWidth
                                multiline
                                onChange={this.entraDatoEnEstado}
                                value={this.state.incurso.descripcion}
                            />
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <ImageUploader
                                key = {imagenkey}
                                withIcon = {true}
                                buttonText = "Seleccione Imagenes"
                                onChange={this.subirFotos}
                                imgExtension={[".jpg",".png",".gif",".jpeg"]}
                                maxFileSize={5242880} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Table>
                                <TableBody>
                                    {this.state.archivos.map((archivo, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="left">
                                                <img src={archivo.urlTemp} style={style.foto} />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                 variant="contained"
                                                 color="secondary"
                                                  size="small"
                                                   onClick={this.eliminarFoto(archivo.name)}
                                                   >
                                                      Eliminar
                                                  </Button>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                style={style.submit}
                                onClick={this.guardarIncurso}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        );
    }
}

export default consumerFirebase(NuevoIncurso);