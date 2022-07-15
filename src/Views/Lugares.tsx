import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

const initialState = {
  pais: '',
  departamento: '',
  ciudad: '',
  nombreLugar: '',
}

const Lugares = () => {
  const [form, setForm] = useState(initialState)
  const [lugares, setLugares] = useState<any>([])
  const [exito, setExito] = useState<String>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [IdEdit, setIdEdit] = useState<number>()

  //manejo formulario
  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  //inicio
  useEffect(() => {
    listar()
  }, [])

  const listar = () => {
    axios
      .get('http://192.168.1.79:8000/lugares/')
      .then((response) => setLugares(response.data))
      .catch((error) => console.log(error))
  }

  const onSave = () => {
    axios
      .post('http://192.168.1.79:8000/lugares/', form)
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
      .delete(`http://192.168.1.79:8000/lugares/destroy/${id}`)
      .then((response: any) => {
        setExito('eliminado con exito')
        listar()
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }

  const onUpdate = () => {
    axios
      .put(`http://192.168.1.79:8000/lugares/update/${IdEdit}/`, form)
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
          <h3>form Lugares</h3>
          {exito.length > 0 && <Alert severity='success'>{exito}</Alert>}
          <TextField style={{ marginBottom: 20 }} fullWidth label='pais' id='pais' name='pais' value={form.pais} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='departamento' id='departamento' name='departamento' value={form.departamento} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='ciudad' id='ciudad' name='ciudad' value={form.ciudad} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='nombre del Lugar' id='nombreLugar' name='nombreLugar' value={form.nombreLugar} onChange={onChange} />

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
      {/* tabla */}
      <Grid item xs={8}>
        <h3>Tabla Lugares</h3>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align='right'>pais</TableCell>
                <TableCell align='right'>departamento</TableCell>
                <TableCell align='right'>ciudad</TableCell>
                <TableCell align='right'>nombre del lugar</TableCell>
                <TableCell align='right'>editar</TableCell>
                <TableCell align='right'>eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lugares.map((row: any) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='right'>{row.pais}</TableCell>
                  <TableCell align='right'>{row.departamento}</TableCell>
                  <TableCell align='right'>{row.ciudad}</TableCell>
                  <TableCell align='right'>{row.nombreLugar}</TableCell>
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

export default Lugares
