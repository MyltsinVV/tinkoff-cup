import React, {useState} from 'react'
import {Button} from '@mui/material'
import {AddExpensesModal} from './ui/addExpensesModal'
import {ExpensesTable} from './ui/expensesTable'
import styles from './styles.module.scss'

const HomePage = () => {
  const [isOpenAddExpenses, setIsOpenAddExpenses] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Расходы</h1>
        <Button variant='contained' onClick={() => setIsOpenAddExpenses(true)}>Новый расход</Button>
      </div>

      <ExpensesTable/>

      <AddExpensesModal open={isOpenAddExpenses} onClose={() => setIsOpenAddExpenses(false)}/>
    </div>
  )
}

export default HomePage