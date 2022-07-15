import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TableEspecies from '../components/TableCategorias'
import TableCategorias from '../components/TableCategorias'

const initialState = {
  reino: '',
  filo: '',
  clase: '',
  orden: '',
  familia: '',
  genero: '',
}

const Categoria = () => {
  const [exito, setExito] = useState<String>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [IdEdit, setIdEdit] = useState<number>()
  const [categoria, setCategoria] = useState<any>([])
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
      .then((response) => setCategoria(response.data))
      .catch((error) => console.log(error))
  }, [])
  useEffect(() => {
    listar()
  }, [])

  const listar = () => {
    axios
      .get('http://192.168.1.79:8000/categoria/')
      .then((response) => setCategoria(response.data))
      .catch((error) => console.log(error))
  }

  const onSave = () => {
    axios
      .post('http://192.168.1.79:8000/categoria/', form)
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
      .delete(`http://192.168.1.79:8000/categoria/destroy/${id}`)
      .then((response: any) => {
        setExito('eliminado con exito')
        listar()
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }

  const onUpdate = () => {
    axios
      .put(`http://192.168.1.79:8000/categoria/update/${IdEdit}/`, form)
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
          <h3>form Categorias</h3>
          {exito.length > 0 && <Alert severity='success'>{exito}</Alert>}
          <TextField style={{ marginBottom: 20 }} fullWidth label='reino' id='reino' name='reino' value={form.reino} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='filo' id='filo' name='filo' value={form.filo} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='clase' id='clase' name='clase' value={form.clase} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='orden' id='orden' name='orden' value={form.orden} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='familia' id='familia' name='familia' value={form.familia} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='genero' id='genero' name='genero' value={form.genero} onChange={onChange} />

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
        {/* tabla */}
        <TableCategorias categoria={categoria} onDelete={onDelete} onEdit={onEdit} />
      </Grid>
    </Grid>
  )
}

export default Categoria
