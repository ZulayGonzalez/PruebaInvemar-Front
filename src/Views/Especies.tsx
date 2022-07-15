import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface dataCategoria {
  id: number
  reino: string
}

const initialState = {
  nombre_comun: '',
  nombre_cientifico: '',
  categoria: '',
}

const Especies = () => {
  const [exito, setExito] = useState<String>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [IdEdit, setIdEdit] = useState<number>()
  const [dataEspecie, setdataEspecie] = useState<any>([])
  const [categoria, setcategoria] = useState<any>([])
  const [form, setForm] = useState(initialState)

  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    axios
      .get('http://192.168.1.79:8000/categoria/')
      .then((response) => setcategoria(response.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    listar()
  }, [])

  const listar = () => {
    axios
      .get('http://192.168.1.79:8000/especies/')
      .then((response) => setdataEspecie(response.data))
      .catch((error) => console.log(error))
  }

  const onSave = () => {
    axios
      .post('http://192.168.1.79:8000/especies/', form)
      .then((response: any) => {
        setExito('Creado con exito')
        listar()
        setForm(initialState)
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }

  const onDelete = (id: number) => {
    axios
      .delete(`http://192.168.1.79:8000/especies/destroy/${id}`)
      .then((response: any) => {
        setExito('eliminado con exito')
        listar()
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }

  const onUpdate = () => {
    axios
      .put(`http://192.168.1.79:8000/especies/update/${IdEdit}/`, form)
      .then((response: any) => {
        setExito('actualizado con exito: ')
        listar()
        setForm(initialState)
        setIsEdit(false)
        setIdEdit(0)
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }

  const onEdit = (item: any) => {
    setIdEdit(item.id)
    setForm(item)
    setIsEdit(true)
    setExito('')
  }
  const onCancel = () => {
    setForm(initialState)
    setIsEdit(false)
    setIdEdit(0)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          component='form'
          sx={{
            width: '100%',
          }}
        >
          <h3>form Especies</h3>
          {exito.length > 0 && <Alert severity='success'>{exito}</Alert>}
          <TextField style={{ marginBottom: 20 }} fullWidth label='nombre comun' id='nombre_comun' name='nombre_comun' value={form.nombre_comun} onChange={onChange} />
          <TextField
            style={{ marginBottom: 20 }}
            fullWidth
            label='nombre cientifico'
            id='nombre_cientifico'
            name='nombre_cientifico'
            value={form.nombre_cientifico}
            onChange={onChange}
          />
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-multiple-name-label'>Categoria</InputLabel>
            <Select id='categoria' name='categoria' value={form.categoria} onChange={onChange}>
              {categoria.map((item: dataCategoria) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.reino}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ pt: 2 }} />

          {isEdit ? (
            <>
              <Button variant='contained' color='secondary' onClick={onUpdate}>
                Editar
              </Button>
              <Button variant='contained' color='inherit' onClick={onCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant='contained' color='primary' onClick={onSave}>
              Crear
            </Button>
          )}
        </Box>
      </Grid>
      <Grid item xs={8}>
        <h3>Tabla Especies</h3>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align='right'>Nombre comun</TableCell>
                <TableCell align='right'>Nombre cientifico</TableCell>
                <TableCell align='right'>Categoria</TableCell>
                <TableCell align='right'>Editar</TableCell>
                <TableCell align='right'>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataEspecie.map((row: any) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='right'>{row.nombre_comun}</TableCell>
                  <TableCell align='right'>{row.nombre_cientifico}</TableCell>
                  <TableCell align='right'>{row.categoria}</TableCell>
                  <TableCell align='right'>
                    <Button variant='contained' color='secondary' onClick={() => onEdit(row)}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    <Button variant='contained' color='error' onClick={() => onDelete(row.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Especies
