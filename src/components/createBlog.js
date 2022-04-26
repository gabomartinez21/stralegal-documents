import React from 'react';
import axios from 'axios';
import {URLSERVER} from '../config';
import {Container, Box, TextField, Typography,Grid,InputLabel, FormControl, Button} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function CreateBlog() {
    const { enqueueSnackbar } = useSnackbar();
    const [titulo, setTitulo] = React.useState("");
    const [imagen, setImagen] = React.useState({
        name:"",
        file:""
    });
    const [descripcion, setDescripcion] = React.useState("");
    const selectedImage = React.useRef()

    const handleImagen = (e) => {
        setImagen({
            name:URL.createObjectURL(e.target.files[0]),
            file:e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // const body = {
        //     titulo,
        //     imagen,
        //     descripcion,
        //     type:'guardar'
        // }

        const body = new FormData();
        body.append('titulo', titulo);
        body.append('descripcion',descripcion);
        body.append('image', imagen.file)
        body.append('type', "guardar")
        const res = await axios.post(`${URLSERVER}/admin/v1/blog.php`, body)
        
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
                            <Typography>Titulo del blog</Typography>
                            <TextField 
                                variant="outlined"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} style={{'marginTop':'40px'}}>
                        <FormControl fullWidth>
                            <Typography>Descripcion</Typography>
                            <ReactQuill
                                theme="snow"
                                value={descripcion}
                                onChange={setDescripcion}
                                style={{minHeight:"500px", display: "grid",
                                gridTemplateRows: "42px auto"}}
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid item md={6}>
                        {imagen.name !== "" && (
                            <img src={imagen.name} alt="Image preview" style={{maxWidth:"100%"}}/>
                        )}
                        <FormControl>
                            <InputLabel id="select-document">Seleccionar documento</InputLabel>
                            <input 
                                type="file"
                                onChange={handleImagen}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <Button variant="contained" style={{'background':'#1c739c'}} onClick={handleSubmit}>Guardar</Button>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default CreateBlog
