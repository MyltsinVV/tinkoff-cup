import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Button, Modal} from '@mui/material'
import styles from './styles.module.scss'
import {deleteExpenses, ExpensesType} from 'entities/expenses'

type DeleteModalType = {
  expenses: ExpensesType | null
  onClose: () => void
}


export const DeleteModal: FC<DeleteModalType> = ({expenses, onClose}) => {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    expenses && dispatch(deleteExpenses(expenses.id))
    onClose()
  }

  return (
    <Modal
      open={!!expenses}
      onClose={onClose}
    >
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Вы уверены, что хотите удалить данный расход?
        </div>
        <div className={styles.buttons}>
          <Button variant='text' onClick={() => onClose()}>
            Отмена
          </Button>
          <Button variant='contained' onClick={deleteHandler}>
            Подтвердить
          </Button>
        </div>
      </div>
    </Modal>
  )
}