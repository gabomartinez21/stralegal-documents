import React from 'react'
import axios from 'axios';
import {Table, TableHead, TableCell, TableBody, TableRow, Container, Button} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {URLSERVER} from '../App';

const StyledTableCell = styled.td`
    background:#e3e3e3;
    color:#000;
    text-align:center;
`

function ListBlog() {

    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();
    const [blogs, setBlog] = React.useState([]);
    
    const getBlog = async () => {
        const res = await axios.get(`${URLSERVER}/admin/v1/blog.php?blog=0`)
        // console.log(res);
        setBlog(res.data.body)
    }
    React.useEffect(()=>{
        getBlog();
    }, [])

    const handleEdit = (id) => {
        history.push(`/editar-blog/${id}`)
    }
    
    const handleDelete = async (id) => {
        const data = new FormData();
        data.append("type","blog-delete");
        data.append("id",id);
            
        
        const newDocs = blogs.filter(description => description.id !== id);
        
        const res = await axios.post(`${URLSERVER}/admin/v1/blog.php`, data);
        
        if(res.data.ok){
            setBlog(newDocs);
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
        history.push(`/crear-blog`)
    }


    return (
        <Container>
            <div>
                <h1>Lista de blogs</h1>
            </div>
            <Button onClick={handleAdd}>Agregar +</Button>
            <Table style={{marginTop:'40px'}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Titulo</StyledTableCell>
                        <StyledTableCell>Acción</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {React.Children.toArray(blogs.map(description => (
                        <TableRow>
                            <TableCell>{description.titulo}</TableCell>
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

export default ListBlog
