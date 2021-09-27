import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Table, TableHead, TableCell, TableBody, TableRow, Container, Button} from '@material-ui/core';
import styled from 'styled-components';

function ListDocuments() {


    const [documents, setDocuments] = useState([]);
    
    const getDocuments = async () => {
        const res = await axios.get('https://yapaydigital.pe/starlegal/admin/v1/documentos.php?documentos=0')
        setDocuments(res.data.body)
    }
    useEffect(()=>{
        getDocuments();
    }, [])


    const handleEdit = (id) =>{
        console.log(id)

    }
    const handleDelete = (id) =>{
        console.log(id)
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
                        <StyledTableCell>Fecha</StyledTableCell>
                        <StyledTableCell>Acción</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {React.Children.toArray(documents.map(document => (
                        <TableRow>
                            <TableCell>{document.titulo_doc}</TableCell>
                            <TableCell>{document.fecha_c}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(document.id_doc)}>edit</Button>
                                <Button onClick={() => handleDelete(document.id_doc)}>elim</Button>
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
