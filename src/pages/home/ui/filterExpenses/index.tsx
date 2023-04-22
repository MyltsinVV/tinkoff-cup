import React from 'react'
import {useDispatch} from 'react-redux'
import {MenuItem, Select} from '@mui/material'
import {ExpenseCategoryList, setCategoryFilter, useCategoryFilter} from 'entities/expenses'
import styles from './styles.module.scss'

export const FilterExpenses = () => {
  const dispatch = useDispatch()
  const categoryFilter = useCategoryFilter()

  return (
    <div className={styles.wrapper}>
      <Select
        value={categoryFilter}
        onChange={(event) => dispatch(setCategoryFilter(event.target.value))}
        className={styles.select}
        fullWidth
      >
        <MenuItem value={''}>Все категории</MenuItem>
        {ExpenseCategoryList.map((item) =>
          <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
      </Select>
    </div>
  )
}