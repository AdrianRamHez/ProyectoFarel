import React from 'react';
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from 'react-router-dom';


export const MenuIzquierda = ({classes}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/incurso/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Curso" />
            </ListItem>
            <ListItem component={Link} button to="/auth/listacursos">
                <i className="material-icons">business</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Cursos" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">mail_outline</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Mensajes" />
            </ListItem>
        </List>
    </div>
)