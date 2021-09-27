import React, {useState, useEffect} from 'react'
import {
    TextField,
    IconButton,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

function Opcion({setArray, array, index, pos}) {

    const [opcion, setOpcion] = useState({
        variable:'',
        descripcion: ''
    })
    console.log(pos)
    console.log(index)
    useEffect(()=>{
        const newArr = [...array];
        array[index].opciones[pos] = opcion;
        setArray(newArr);

    }, [opcion])

    const handleChangeInputOption = (e) =>{
        const newOpcion = {...opcion}
        newOpcion[e.target.name] = e.target.value;
        setOpcion(newOpcion);
        
    }
    const handleAddFieldsOpt = () => {   
        const newOpcion = [...array];
        newOpcion[index].opciones.push({ variable: '', descripcion: ''});
        setArray(newOpcion)
    }
    
    const handleRemoveFieldsOpt = (index) => {
        const newOpcion = [...array];
        newOpcion[index].opciones.splice(index,1);
        setArray(newOpcion);
    }

    return (
        <div className="opcion">
            <TextField
                name="variable"
                label="Valor"
                variant="filled"
                value={opcion.variable}
                onChange={event => handleChangeInputOption(event)}
            />
            
            <TextField
                name="descripcion"
                label="Opción"
                variant="filled"
                value={opcion.descripcion}
                onChange={event => handleChangeInputOption(event)}
            />
            <IconButton
                onClick={() => handleRemoveFieldsOpt(index)}
            >
                <RemoveIcon />
            </IconButton>
            <IconButton 
                onClick={() => handleAddFieldsOpt()}
            >
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default Opcion
