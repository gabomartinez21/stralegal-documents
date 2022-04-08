import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Table, TableHead, TableCell, TableBody, TableRow, Container, Button} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {URLSERVER} from '../App';

function ListDocuments() {
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();
    const [documents, setDocuments] = useState([]);
    
    const getDocuments = async () => {
        
        const res = await axios.get(`${URLSERVER}/admin/v1/documentos.php?documentos=0`)
        setDocuments(res.data.body)
    }
    useEffect(()=>{
        getDocuments();
    }, [])


    const handleEdit = (id) =>{
        history.push(`/editar-documento/${id}`)

    }
    const handleDelete = async (id, idVariables) =>{
        
        const data = {
            "type":"eliminar",
            "id":id,
            "idVar":idVariables,
        }
        const newDocs = documents.filter(documento => documento.id_doc !== id);
        
        const res = await axios.post(`${URLSERVER}/admin/v1/documentos.php`, JSON.stringify(data));
        console.log(res)
        if(res.data.ok){
            setDocuments(newDocs);
            enqueueSnackbar('Documento eliminado', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }
    }

    const redirectVariable = (idVar, idDoc) => {
        if(idVar > 0){
            history.push(`/editar-variable/${idVar}/${idDoc}`);

        }
    }

    return (

        <Container>
            <div>
                <h1>Lista de documentos</h1>
            </div>

            <Table style={{marginTop:'40px'}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell>Variable</StyledTableCell>
                        <StyledTableCell>Fecha</StyledTableCell>
                        <StyledTableCell>Acción</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {React.Children.toArray(documents.map(document => (
                        <TableRow>
                            <TableCell>{document.titulo_doc}</TableCell>
                            <TableCell className="textCenter">
                                <Button
                                    onClick={() => redirectVariable(document.id_variables, document.id_doc)}
                                >Ver variables</Button>
                            </TableCell>
                            <TableCell className="textCenter">
                                <span>{document.fecha_c}</span>
                            </TableCell>
                            <TableCell className="centerTable">
                                <Button className="btn-edit" onClick={() => handleEdit(document.id_doc,)}>
                                    <CreateIcon/>
                                </Button>
                                <Button className="btn-delete" onClick={() => handleDelete(document.id_doc, document.id_variables)}>
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
const StyledTableCell = styled.td`
    background:#e3e3e3;
    color:#000;
    text-align:center;
`
export default ListDocuments
