import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import styles from './styles.module.scss'
import {useDispatch} from 'react-redux'
import {expenseDateCreateFormat, useAllExpenses} from 'entities/expenses'
import {ReactSVG} from 'react-svg'
import deleteIcon from './icon/delete.svg'
import moment from 'moment/moment'
import {TableContainer} from 'shared/ui/tableContainer'


export  const ExpensesTable = () => {
  const dispatch = useDispatch()
  const list = useAllExpenses()

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Категория</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell>Комментарий</TableCell>
            <TableCell>Дата&nbsp;создания</TableCell>
            <TableCell>Удаление</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow
              key={item.id}
              className={styles.tableRow}
            >
              <TableCell>{item.category}</TableCell>
              <TableCell align='right'>{item.sum}</TableCell>
              <TableCell>{item.comment}</TableCell>
              <TableCell>{moment(item.date).format(expenseDateCreateFormat)}</TableCell>
              <TableCell padding='none' align='center'>
                <div>
                  <ReactSVG src={deleteIcon} className={styles.deleteIcon} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}