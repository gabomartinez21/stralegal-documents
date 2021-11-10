import React from 'react';
import axios from 'axios';
import {URLSERVER} from '../App';
import {Container, Box, TextField, Grid, MenuItem, Select,InputLabel, FormControl, Button} from '@material-ui/core';
import { useSnackbar } from 'notistack';

const Categorias_opciones = ['Empresas', 'Particulares']

function CreateDescription() {
const { enqueueSnackbar } = useSnackbar();
    const [descripcion, setDescripcion] = React.useState('');
    const [categoria, setCategoria] = React.useState('');
    const [precio, setPrecio] = React.useState('');
    const [documento, setDocumento] = React.useState(0);
    const [documents, setDocuments] = React.useState([]);

    const getDocuments = async () =>{
        const docs = await axios.get(`${URLSERVER}/admin/v1/documentos.php?documentos=0`);
        setDocuments(docs.data.body);
    }
    React.useEffect(()=> {
        getDocuments();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const body = {
            categoria,
            precio,
            documento,
            descripcion,
            type:'descripcion'
        }
        const res = await axios.post(`${URLSERVER}/admin/v1/documentos.php`, JSON.stringify(body))

        if(res.data.ok){
            enqueueSnackbar('Tu documento se guardo satisfactoriamente', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }
    }

    return (
        <Container>
            <div>
                <h1>Descripcion para documento</h1>
            </div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                
            >
                <Grid container spacing={2}>
                    <Grid item md={12} style={{'marginTop':'40px'}}>
                        <FormControl fullWidth>
                            <TextField 
                                variant="outlined"
                                rows={10}
                                name="texto"
                                value={descripcion}
                                multiline
                                onChange={e => setDescripcion(e.target.value) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl>
                            <TextField 
                                variant="outlined"
                                value={precio}
                                placeholder="Precio del documento"
                                onChange={e => setPrecio(e.target.value) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl>
                            <InputLabel id="select-categoria">Seleccionar Categoria</InputLabel>
                            <Select
                                labelId="select-categoria"
                                id="select-categoria"
                                value={categoria}
                                label="Seleccionar categoria"
                                onChange={e => setCategoria(e.target.value)}
                                style={{minWidth:'160px'}}
                                >
                                {React.Children.toArray(Categorias_opciones.map(cat => (
                                    <MenuItem value={cat}>{cat}</MenuItem>
                                )))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl>
                            <InputLabel id="select-document">Seleccionar documento</InputLabel>
                            <Select
                                labelId="select-document"
                                id="select-document"
                                value={documento}
                                label="Seleccionar documento"
                                onChange={e => setDocumento(e.target.value)}
                                style={{minWidth:'160px'}}
                                >
                                {React.Children.toArray(documents.map(doc => (
                                    <MenuItem value={doc.id_doc}>{doc.titulo_doc}</MenuItem>
                                    )))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button variant="contained" style={{'background':'#1c739c'}} onClick={handleSubmit}>Guardar</Button>
                </Grid>
            </Box>
        </Container>
    )
}

export default CreateDescription
