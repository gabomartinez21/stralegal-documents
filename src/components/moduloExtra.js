import React from 'react'
import {AddCircle} from '@material-ui/icons';
import {IconButton, Popover, FormControl,MenuItem, Select} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popoverModule: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


function ModuloExtra({
  setArray,
  array,
  setModule,
  module,
  pos
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const agregarModulo = (e) => {
    
    const moduleCopy = [...module];
    const textoCopy = [...array];
    
    //COPIA DESDE EL INDICE HASTA EL FINAL PARA AGREGAR EL NUEVO MODULO
    const finalModuleCopy = moduleCopy.splice(pos+1, moduleCopy.length-1)
    const finalTextoCopy = textoCopy.splice(pos+1, textoCopy.length-1)
    
    moduleCopy.push(e.target.value)
    const newModule = moduleCopy.concat(finalModuleCopy);
    setModule(newModule)
    
    if (e.target.value === 'condicional') {
      textoCopy.push({
        condicion: [
          [{ tituloCond: "" }],
          [{ tituloCond: "" }]
        ]
      })

    }
    if (e.target.value === 'repetir') {
      textoCopy.push({
        repetir: [{
          variables: ''
        }],
      })
    }
    if (e.target.value === 'texto') {
      textoCopy.push({
        texto: '',
        checked: false
      })
    }
    if (e.target.value === 'firma') {
      textoCopy.push({
        firma: ''
      })
    }
    if (e.target.value === 'titulo') {
      textoCopy.push({
        titulo: ''
      })
    }
    const newTexto = textoCopy.concat(finalTextoCopy);

    setArray(newTexto)


  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="extra-modulo">
      <IconButton aria-label="add" color="primary" aria-describedby={id} variant="contained" onClick={handleClick}>
        <AddCircle />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.popoverModule}>
          <p>Agrega un nuevo modulo</p>
          <FormControl className={classes.formControl}>
            <Select 
            id = "simple-select"
            value = ""
            variant = "outlined"
            onChange = { e => agregarModulo(e) } >
              <MenuItem value="" disabled>Agregar modulo</MenuItem>
              <MenuItem value="condicional">Condicional</MenuItem> 
              <MenuItem value="texto">Texto</MenuItem> 
              <MenuItem value="titulo">Titulo Documento</MenuItem> 
              <MenuItem value="repetir">Modulo de repetición</MenuItem> 
              <MenuItem value="firma">Firma</MenuItem> 
            </Select>

          </FormControl>
        </div>
      </Popover>
    </div>
  )
}

export default ModuloExtra