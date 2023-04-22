import React from 'react'
import {useDispatch} from 'react-redux'
import {MenuItem, Select} from '@mui/material'
import {ExpenseCategoryList, expenseDateCreateFormat, setCategoryFilter, useCategoryFilter} from 'entities/expenses'
import styles from './styles.module.scss'
import {DateRangePicker, SingleInputDateRangeField} from '@mui/x-date-pickers-pro'

export const FilterExpenses = () => {
  const dispatch = useDispatch()
  const categoryFilter = useCategoryFilter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <label>Категория</label>
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

      <div className={styles.item}>
        <label>Период</label>
        <DateRangePicker
          className={styles.dateRange}
          slots={{ field: SingleInputDateRangeField }}
          format={expenseDateCreateFormat}
        />
      </div>

    </div>
  )
}