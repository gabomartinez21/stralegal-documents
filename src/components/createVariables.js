import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        },
        button: {
            margin: theme.spacing(1),
    }
}))


function CreateVariables() {
    const classes = useStyles();
    const [inputFields, setInputFields] = useState([
        { variable: '', descripcion: ''},
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFlields", inputFields);

    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { variable: '', descripcion: '' }])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    return (
        <Container>
            <h1>Crear Variables</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { inputFields.map((inputField, index) => (
                    <div key={index}>
                        <TextField
                            name="variable[]"
                            label="Variable"
                            variant="filled"
                            value={inputField.variable}
                            onChange={event => handleChangeInput(index, event )}
                        />
                        <TextField
                            name="descripcion[]"
                            label="Descripcion"
                            variant="filled"
                            value={inputField.descripcion}
                            onChange={event => handleChangeInput(index, event )}
                        />
                        <IconButton
                            onClick={() => handleRemoveFields(index)}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <IconButton 
                            onClick={() => handleAddFields()}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                )) }
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    endIcon={<Icon>send</Icon>}
                    onClick={handleSubmit}
                    >Enviar</Button>
            </form>
        </Container>
    )
}

export default CreateVariables
