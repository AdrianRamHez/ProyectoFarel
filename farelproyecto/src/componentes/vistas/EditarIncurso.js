import { Breadcrumbs, Button,
     Container, Grid, Link, Paper, Table, TableBody,
      TableCell, TableRow, TextField,
      Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import HomeIcon from '@material-ui/icons/Home';
import ImageUploader from 'react-images-upload';
import {v4 as uuidv4} from 'uuid';
import {crearKeyword} from '../../sesion/actions/Keyword';

const style = {
    container: {
        paddingTop : "8px"
    },
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5"
    },
    link: {
        padding: "20px",
        backgroundColor: "#f5f5f5"
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: "4px"
    },
    submit: {
        marginTop: 15,
        marginBottom:10
    },
    fotoIncurso:{
        height: "100px"
    }
}

class EditarIncurso extends Component {

    state = {
        incurso:{
            curso: "",
            ciudad:"",
            pais:"",
            precio: "",
            descripcion: "",
            foto: []
        }
    }

    cambiarDato = e => {
        let  incurso = Object.assign({},this.state.incurso);
        incurso[e.target.name] = e.target.value;
        this.setState({incurso});
    }

    subirImagenes = imagenes => {
        const { incurso } = this.state;
        const {id} = this.props.match.params;
//agregar nombre dinamico por cada imagen

        Object.keys(imagenes).forEach(key=>{
            let codigoDinamico = uuidv4()
            let nombreImagen = imagenes[key].name;
            let extension = nombreImagen.split(".").pop();
            imagenes[key].alias = (nombreImagen.split(".")[0] + "_" + codigoDinamico + "." + extension).replace(/\s/g,"_").toLowerCase()
        })

        this.props.firebase.guardarDocumentos(imagenes).then(urlImagenes => {
            incurso.foto = incurso.foto.concat(urlImagenes);

            this.props.firebase.db
            .collection("Incursos")
            .doc(id)
            .set(incurso, {merge: true})
            .then(success =>{
                this.setState({
                    incurso
                })
            })
        })

    }

    eliminarFoto = fotoUrl => async () =>{
        const {incurso} = this.state;
        const {id} = this.props.match.params;
        
        let fotoID = fotoUrl.match(/[\w-]+.(jpg|png|jepg|gif|svg)/);
        fotoID = fotoID[0];

        await this.props.firebase.eliminarDocumento(fotoID);

        let fotoList = this.state.incurso.foto.filter(fotos => {
            return fotos !== fotoUrl;
        })

        incurso.foto = fotoList;

        this.props.firebase.db
            .collection("Incursos")
            .doc(id)
            .set(incurso, {merge: true})
            .then(success => {
                this.setState({
                    incurso
                })
            })
    }

    async componentDidMount(){
        const {id} = this.props.match.params;

        const incursoCollection = this.props.firebase.db.collection("Incursos");
        const incursoDB = await incursoCollection.doc(id).get();

        this.setState({
            incurso : incursoDB.data()
        })
    }

    guardarIncurso = () =>{
        const {incurso} = this.state;
        const {id} = this.props.match.params;

        const textoBusqueda = incurso.curso + " " + incurso.ciudad + " " + incurso.pais;
        const keyWords = crearKeyword(textoBusqueda);

        incurso.keywords = keyWords;
        incurso.propietario = this.props.firebase.auth.currentUser.uid;

        this.props.firebase.db
            .collection("Incursos")
            .doc(id)
            .set(incurso, {merge: true})
            .then(success => {
                this.props.history.push("/auth/listacursos");
            })
    }

    render() {
        let uniqueID = uuidv4();

        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Breadcrumbs arial-label="breadcrumb">
                                    <Link color="inherit" style={style.link} href="/auth/listacursos">
                                        <HomeIcon style={style.homeIcon} />
                                        Home
                                    </Link>
                                    <Typography color="textPrimary">
                                            Editar Curso
                                    </Typography>
                                </Breadcrumbs>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="curso"
                                    label="Nombre del incurso"
                                    fullWidth
                                    onChange={this.cambiarDato}
                                    value={this.state.incurso.curso}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="ciudad"
                                    label="Ciudad"
                                    fullWidth
                                    onChange={this.cambiarDato}
                                    value={this.state.incurso.ciudad}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="pais"
                                    label="Pais"
                                    fullWidth
                                    onChange={this.cambiarDato}
                                    value={this.state.incurso.pais}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="precio"
                                    label="Precio"
                                    fullWidth
                                    onChange={this.cambiarDato}
                                    value={this.state.incurso.precio}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="descripcion"
                                    label="Descripcion"
                                    fullWidth
                                    rowsMax="4"
                                    multiline
                                    onChange={this.cambiarDato}
                                    value={this.state.incurso.descripcion}
                                />
                            </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <ImageUploader
                                key={uniqueID}
                                withIcon={true}
                                buttonText="Seleccione su imagen"
                                onChange={this.subirImagenes}
                                imgExtension={[".jpg",".gif",".png",".jpeg"]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Table>
                                <TableBody>
                                    {
                                        this.state.incurso.foto
                                        ?this.state.incurso.foto.map((fotos, i) =>(
                                            <TableRow key={i}>
                                                <TableCell align="left">
                                                    <img src={fotos} style={style.fotoIncurso}/>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={this.eliminarFoto(fotos)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :""
                                    }
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
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

export default consumerFirebase(EditarIncurso);