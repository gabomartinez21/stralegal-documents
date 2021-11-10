import React from 'react'
import axios from 'axios';
import {Table, TableHead, TableCell, TableBody, TableRow, Container, Button} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {URLSERVER,URLFRONT} from '../App';

const StyledTableCell = styled.td`
    background:#e3e3e3;
    color:#000;
    text-align:center;
`

function ListDescriptions() {

    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();
    const [descriptions, setDescriptions] = React.useState([]);
    
    const getDescriptions = async () => {
        const res = await axios.get(`${URLSERVER}/admin/v1/documentos.php?descripcion=0`)
        // console.log(res);
        setDescriptions(res.data.body)
    }
    React.useEffect(()=>{
        getDescriptions();
    }, [])

    const handleEdit = (id) => {
        history.push(`/editar-descripcion/${id}`)
    }
    
    const handleDelete = async (id) => {
        const data = {
            "type":"descripcion-delete",
            "id":id
        }
        const newDocs = descriptions.filter(description => description.id !== id);
        
        const res = await axios.post(`${URLSERVER}/admin/v1/documentos.php`, JSON.stringify(data));
        
        if(res.data.ok){
            setDescriptions(newDocs);
            enqueueSnackbar('Documento eliminado', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }
    }
    
    const handleAdd = () => {
        history.push(`/crear-descripcion`)
    }


    return (
        <Container>
            <div>
                <h1>Lista de descripciones</h1>
            </div>
            <Button onClick={handleAdd}>Agregar +</Button>
            <Table style={{marginTop:'40px'}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Documento</StyledTableCell>
                        <StyledTableCell>Acción</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {React.Children.toArray(descriptions.map(description => (
                        <TableRow>
                            <TableCell>{description.titulo_doc}</TableCell>
                            <TableCell className="centerTable">
                                <Button className="btn-edit" onClick={() => handleEdit(description.id)}>
                                    <CreateIcon/>
                                </Button>
                                <Button className="btn-delete" onClick={() => handleDelete(description.id)}>
                                    <DeleteOutlineOutlinedIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </Container>
        
    )
}

export default ListDescriptions
