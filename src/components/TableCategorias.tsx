import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

interface Props {
  categoria: any[]
  onEdit: (row: any) => void
  onDelete: (id: number) => void
}

const TableCategorias = ({ categoria, onDelete, onEdit }: Props) => {
  return (
    <div>
      <h3>Tabla Categorias</h3>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align='right'>reino</TableCell>
              <TableCell align='right'>filo</TableCell>
              <TableCell align='right'>clase</TableCell>
              <TableCell align='right'>orden</TableCell>
              <TableCell align='right'>familia</TableCell>
              <TableCell align='right'>genero</TableCell>
              <TableCell align='right'>editar</TableCell>
              <TableCell align='right'>eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoria.map((row: any) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='right'>{row.reino}</TableCell>
                <TableCell align='right'>{row.filo}</TableCell>
                <TableCell align='right'>{row.clase}</TableCell>
                <TableCell align='right'>{row.orden}</TableCell>
                <TableCell align='right'>{row.familia}</TableCell>
                <TableCell align='right'>{row.genero}</TableCell>
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
    </div>
  )
}

export default TableCategorias
