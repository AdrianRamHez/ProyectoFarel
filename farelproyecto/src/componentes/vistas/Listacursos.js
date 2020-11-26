import React, { Component } from 'react';
import { Breadcrumbs, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import logo from '../../logo.svg';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import {obtenerData, obtenerDataAnterior} from "../../sesion/actions/IncursoAction";

const style ={
    cardGrid : {
        paddingTop: 8,
        paddingBottom: 8
    },
    paper: {
        backgroundColor: "#f5f5f5",
        padding: "20px",
        minHeight: 650
    },
    link:{
        display:"flex"
    },
    gridTextfield: {
        marginTop: "20px"
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "colum"
    },
    cardMedia:{
        paddingTop: "1%"
    },
    cardContent:{
        flexGrow: 1
    },
    barraBoton:{
        marginTop: "20px"
    }
}

class Listacursos extends Component {
    state = {
        incursos: [],
        textoBusqueda: "",
        paginas: [],
        paginaSize: 3,
        casaInicial: null,
        paginaActual: 0
    }

    cambiarBusquedaTexto = e => {
        const self = this;

        self.setState({
            [e.target.name] : e.target.value
        })

        if(self.state.typingTimeout){
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(goTime => {
                const firebase = this.props.firebase;
                const {paginaSize} = this.state;

                obtenerDataAnterior(firebase,paginaSize, 0, self.state.textoBusqueda).then(firebaseReturnData =>{
                    const pagina = {
                        inicialValor: firebaseReturnData.inicialValor,
                        finalValor: firebaseReturnData.finalValor
                    }
                    const paginas = [];
                    paginas.push(pagina);

                    this.setState({
                        paginaActual : 0,
                        paginas,
                        incursos: firebaseReturnData.arrayIncursos
                    })
                })
                
                /*let objectQuery = this.props.firebase.db
                .collection("Incursos")
                .orderBy("curso")
                .where("keywords", "array-contains", self.state.textoBusqueda.toLowerCase());

                if(self.state.textoBusqueda.trim()===""){
                    objectQuery = this.props.firebase.db
                    .collection("Incursos")
                    .orderBy("curso")
                }

                objectQuery.get().then(snapshot => {
                    const arrayIncurso = snapshot.docs.map(doc=>{
                        let data = doc.data();
                        let id = doc.id;
                        return {id, ...data};
                    })

                    this.setState({
                        incursos: arrayIncurso
                    })
                })*/

            }, 500)
        })
    }

    anteriorPagina = () => {
        const {paginaActual, paginaSize, textoBusqueda, paginas} = this.state;

        if(paginaActual > 0){
            const firebase = this.props.firebase;
            obtenerDataAnterior(firebase, paginaSize, paginas[paginaActual -1].inicialValor, textoBusqueda).then(firebaseReturnData =>{

                const pagina = {
                    inicialValor: firebaseReturnData.inicialValor,
                    finalValor: firebaseReturnData.finalValor
                }

                paginas.push(pagina);

                this.setState({
                    paginas,
                    paginaActual: paginaActual -1,
                    incursos: firebaseReturnData.arrayIncursos
                })
            })
        }
    }

    siguientePagina = () => {
        const {paginaActual, paginaSize, textoBusqueda, paginas, casaInicial} = this.state;
        const firebase = this.props.firebase;

        obtenerData(firebase, paginaSize, paginas[paginaActual].finalValor, textoBusqueda).then(firebaseReturnData => {
            
            if(firebaseReturnData.arrayIncursos.length > 0){
                const pagina = {
                    inicialValor: firebaseReturnData.inicialValor,
                    finalValor: firebaseReturnData.finalValor
                }

                paginas.push(pagina);
                this.setState({
                    paginas,
                    paginaActual : paginaActual + 1,
                    incursos : firebaseReturnData.arrayIncursos
                })
            }
        })
    }

    async componentDidMount(){
        
        const {paginaSize, textoBusqueda, casaInicial, paginas} = this.state;

        const firebase = this.props.firebase;

        const firebaseReturnData = await obtenerData(firebase, paginaSize, casaInicial, textoBusqueda);

        const pagina = {
            inicialValor : firebaseReturnData.inicialValor,
            finalValor : firebaseReturnData.finalValor
        }

        paginas.push(pagina);

        this.setState({
            incursos : firebaseReturnData.arrayIncursos,
            paginas,
            paginaActual: 0
        })

        /*let objectQuery = this.props.firebase.db.collection("Incursos").orderBy("curso");

        const snapshot = await objectQuery.get();

        const arrayIncurso = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        this.setState({
            incursos: arrayIncurso
        })*/
    }

    eliminarIncurso = id => {
        this.props.firebase.db
        .collection("Incursos")
        .doc(id)
        .delete()
        .then(success => {
            this.eliminarIncursoDeListaEstado(id);
        });
    };

    eliminarIncursoDeListaEstado =id => {
        const incursoListaNueva = this.state.incursos.filter(
            incurso => incurso.id !== id
        );
        this.setState({
            incursos: incursoListaNueva
        });
    };

    editarIncurso = id => {
        this.props.history.push("/incurso/" + id);
    }

    ContenidoIncurso = id => {
        this.props.history.push("/incursos/" + id);
    }

    render() {
        return (
            <Container style={style.cardGrid}>
                <Paper style={style.paper}>
                    <Grid item xs={12} sm={12}>
                        <Breadcrumbs aria-label="breadcrumbs">
                            <Link color="inherit" style={style.link} href="/">
                                <HomeIcon />
                                Home
                            </Link>
                            <Typography color="textPrimary">Mis Cursos</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} sm={6} style={style.gridTextfield}>
                        <TextField
                            fullWidth
                            InputLabelProps = {{
                                shrink: true 
                            }}
                            name="textoBusqueda"
                            variant="outlined"
                            label="Ingrese el curso a buscar"
                            onChange={this.cambiarBusquedaTexto}
                            value={this.state.textoBusqueda}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} style={style.barraBoton}>
                        <Grid container spacing={1} direction="column" alignItems="flex-end">
                            <ButtonGroup size="small" aria-label="Small outlined group">
                                <Button onClick={this.anteriorPagina}>
                                    <ArrowLeft />
                                </Button>
                                <Button onClick={this.siguientePagina}>
                                    <ArrowRight />
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} style={style.gridTextfield}>
                        <Grid container spacing={4}>
                            {this.state.incursos.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card style={style.card}>

                                      <CardContent style={style.cardContent}>
                                                <CardMedia
                                                    style={style.cardMedia}
                                                    variant="outlined"
                                                    component="img"
                                                    image={
                                                        card.foto
                                                        ? card.foto[0]
                                                            ? card.foto[0]
                                                            : logo
                                                        : logo
                                                    }
                                                    title="Mi Incurso"
                                                />

                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.curso + ", " + card.precio}
                                            </Typography>

                                            <CardActions>
                                            <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => this.ContenidoIncurso(card.id)}
                                                >
                                                    Entrar
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => this.editarIncurso(card.id)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => this.eliminarIncurso(card.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </CardActions>

                                        </CardContent>
                    
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default consumerFirebase(Listacursos);