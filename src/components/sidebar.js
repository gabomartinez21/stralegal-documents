import React from 'react'
import { Link } from 'react-router-dom';
import {Description, FormatListBulleted, AddCircle} from '@material-ui/icons';
import {List, ListItem, ListItemIcon} from '@material-ui/core';

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>StarLegal</h2>

            <List className="nav-sidebar" component="nav">
                <ListItem>
                    <ListItemIcon>
                        <FormatListBulleted/> 
                    </ListItemIcon>
                    <Link to="/listar-documentos">Listar Documentos</Link>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Description/>
                    </ListItemIcon>
                    <Link to="/crear-documento"> Crear Documento</Link>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <AddCircle/>
                    </ListItemIcon>
                    <Link to="/crear-variables"> Crear Variables</Link>
                </ListItem>
            </List>
        </aside>
    )
}

export default Sidebar
