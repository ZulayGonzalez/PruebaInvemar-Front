import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface dataEspecie {
  id: number
  nombre_comun: string
}

const AvistamientosPorEspecies = () => {
  const [especie, setEspecie] = useState<any>([])
  const [form, setForm] = useState({
    especie: '',
  })
  const [avistamientos, setAvistamientos] = useState<any>([])

  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    axios
      .get('http://192.168.1.79:8000/especies/')
      .then((response) => {
        console.log(response.data)
        setEspecie(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const onSearch = () => {
    axios
      .get(`http://192.168.1.79:8000/findavistamiento/${form.especie}`)
      .then((response) => setAvistamientos(response.data))
      .catch((error) => console.log(error))
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
          <h3>form Avistamientos por especie</h3>
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
          <Button variant='contained' color='primary' onClick={onSearch}>
            Buscar
          </Button>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <h3>Tabla Avistamientos por especie</h3>
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
                  <TableCell align='right'>{row.lugar}</TableCell>
                  <TableCell align='right'>{row.especie}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default AvistamientosPorEspecies
