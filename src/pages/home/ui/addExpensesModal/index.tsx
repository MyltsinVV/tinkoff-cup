import React, {FC, useState} from 'react'
import {useDispatch} from 'react-redux'
import moment from 'moment/moment'
import {Button, MenuItem, Modal, Select, TextField} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import {addExpenses, ExpenseCategory, ExpenseCategoryList, expenseDateCreateFormat} from 'entities/expenses'
import styles from './styles.module.scss'

type AddExpensesModalType = {
  open: boolean,
  onClose: () => void
}

const init = {
  date: moment(),
  category: ExpenseCategory.other.id,
  sum: '',
  comment: ''
}

export const AddExpensesModal: FC<AddExpensesModalType> = ({open, onClose}) => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState(init)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(addExpenses({
      ...fields,
      id: new Date().getTime(),
      date: fields.date.toString(),
      sum: Number(Number(fields.sum).toFixed(2))
    }))
    // clear fields
    setFields((prevState) => ({...prevState, sum: '', comment: ''}))
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Добавление расхода</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.formItem}>
            <label>Дата<span>*</span></label>
            <DatePicker
              value={fields.date}
              onChange={(newValue) =>
                newValue && setFields((prevState) => ({...prevState, date: newValue}))}
              format={expenseDateCreateFormat}
              className={styles.date}/>
          </div>

          <div className={styles.formItem}>
            <label>Категория<span>*</span></label>
            <Select
              value={fields.category}
              onChange={(event) =>
                setFields((prevState) => ({...prevState, category: event.target.value}))}
              fullWidth
              className={styles.input}
            >
              {ExpenseCategoryList.map((item) =>
                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
            </Select>
          </div>

          <div className={styles.formItem}>
            <label>Сумма<span>*</span></label>
            <TextField
              required
              type='number'
              inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              value={fields.sum}
              onChange={(event) =>
                setFields((prevState) => ({...prevState, sum: event.target.value}))}
              fullWidth
              className={styles.input}
            />
          </div>

          <div className={styles.formItem}>
            <label>Комментарий</label>
            <TextField
              value={fields.comment}
              onChange={(event) =>
                setFields((prevState) => ({...prevState, comment: event.target.value}))}
              fullWidth
              className={styles.input}
            />
          </div>
          <div className={styles.submitButton}>
            <Button variant='contained' type='submit'>Добавить</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}