import React, {useState} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import styles from './styles.module.scss'
import {ExpenseCategory, expenseDateCreateFormat, ExpensesType, useAllExpenses, useSumAll} from 'entities/expenses'
import {ReactSVG} from 'react-svg'
import moment from 'moment/moment'
import {DeleteModal} from '../deleteModel'
import {TableContainer} from 'shared/ui/tableContainer'
import deleteIcon from './icon/delete.svg'
import {formatNumber, getValueFromObject} from 'shared/lib'


export  const ExpensesTable = () => {
  const [openDeleteModel, setOpenDeleteModel] = useState<ExpensesType | null>(null)
  const expensesList = useAllExpenses()
  const sumAll = expensesList.reduce((prev, curr) => prev + curr.sum, 0).toFixed(2)

  return (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Категория</TableCell>
              <TableCell align='right'>Сумма</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Дата&nbsp;создания</TableCell>
              <TableCell>Удаление</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesList.map((expenses) => (
              <TableRow
                key={expenses.id}
                className={styles.tableRow}
              >
                <TableCell>{getValueFromObject(ExpenseCategory, expenses.category).label}</TableCell>
                <TableCell align='right'>{formatNumber(expenses.sum)}</TableCell>
                <TableCell>{expenses.comment}</TableCell>
                <TableCell>{moment(expenses.date).format(expenseDateCreateFormat)}</TableCell>
                <TableCell padding='none' align='center'>
                  <div>
                    <ReactSVG onClick={() => setOpenDeleteModel(expenses)} src={deleteIcon} className={styles.deleteIcon} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.sumAll}>
        Общая сумма: <span>{formatNumber(Number(sumAll))}</span>
      </div>

      <DeleteModal expenses={openDeleteModel} onClose={() => setOpenDeleteModel(null)}/>
    </>

  )
}