import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface dataLugar {
  id: number
  nombreLugar: string
}
interface dataEspecie {
  id: number
  nombre_comun: string
}

const initialState = {
  latitud: '',
  longitud: '',
  autor: '',
  notas: '',
  lugar: '',
  especie: '',
}

const Avistamientos = () => {
  const [exito, setExito] = useState<String>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [IdEdit, setIdEdit] = useState<number>()
  const [avistamientos, setAvistamientos] = useState<any>([])
  const [lugar, setLugar] = useState<any>([])
  const [especie, setEspecie] = useState<any>([])
  const [form, setForm] = useState(initialState)

  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    axios
      .get('http://192.168.1.79:8000/lugares/')
      .then((response) => setLugar(response.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .get('http://192.168.1.79:8000/especies/')
      .then((response) => setEspecie(response.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    listar()
  }, [])

  const listar = () => {
    axios
      .get('http://192.168.1.79:8000/avistamientos/')
      .then((response) => setAvistamientos(response.data))
      .catch((error) => console.log(error))
  }

  const onSave = () => {
    console.log(form)
    axios
      .post('http://192.168.1.79:8000/avistamientos/', form)
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
      .delete(`http://192.168.1.79:8000/avistamientos/destroy/${id}`)
      .then((response: any) => {
        setExito('eliminado con exito')
        listar()
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }

  const onUpdate = () => {
    axios
      .put(`http://192.168.1.79:8000/avistamientos/update/${IdEdit}/`, form)
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
    console.log(item)
    setIdEdit(item.id)

    // const edit: any = {
    //   latitud: item.latitud,
    //   longitud: item.longitud,
    //   autor: item.autor,
    //   notas: item.notas,
    //   lugar: item.lugar.id,
    //   especie: item.especie.id,
    // }

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
          <h3>form Avistamientos</h3>
          {exito.length > 0 && <Alert severity='success'>{exito}</Alert>}
          <TextField style={{ marginBottom: 20 }} fullWidth label='latitud' id='latitud' name='latitud' value={form.latitud} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='dlongitud' id='longitud' name='longitud' value={form.longitud} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='autor' id='autor' name='autor' value={form.autor} onChange={onChange} />
          <TextField style={{ marginBottom: 20 }} fullWidth label='notas' id='notas' name='notas' value={form.notas} onChange={onChange} />
          <FormControl sx={{ width: '100%', marginBottom: 2 }}>
            <InputLabel id='demo-multiple-name-label'>lugar</InputLabel>
            <Select id='lugar' name='lugar' value={form.lugar} onChange={onChange}>
              {lugar.map((item: dataLugar) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nombreLugar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-multiple-name-label'>especie</InputLabel>
            <Select id='especie' name='especie' value={form.especie} onChange={onChange}>
              {especie.map((item: dataEspecie) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nombre_comun}
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
        <h3>Tabla Avistamientos</h3>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align='right'>latitud</TableCell>
                <TableCell align='right'>longitud</TableCell>
                <TableCell align='right'>autor</TableCell>
                <TableCell align='right'>notas</TableCell>
                <TableCell align='right'>lugar</TableCell>
                <TableCell align='right'>especie</TableCell>
                <TableCell align='right'>editar</TableCell>
                <TableCell align='right'>eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {avistamientos.map((row: any) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='right'>{row.latitud}</TableCell>
                  <TableCell align='right'>{row.longitud}</TableCell>
                  <TableCell align='right'>{row.autor}</TableCell>
                  <TableCell align='right'>{row.notas}</TableCell>
                  <TableCell align='right'>{lugar.find((item: any) => item.id === row.lugar).nombreLugar}</TableCell>
                  <TableCell align='right'>{especie.find((item: any) => item.id === row.especie).nombre_comun}</TableCell>
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

export default Avistamientos
