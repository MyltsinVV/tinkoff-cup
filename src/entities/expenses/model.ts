import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {getExpensesLS, updateExpensesLS} from './config'

export type ExpensesType = {
  id: number
  date: string
  category: string
  sum: number
  comment: string
}

export type ExpensesModelType = {
  list: ExpensesType[]
  categoryFilter: string
}

export const initialState: ExpensesModelType = {
  list: getExpensesLS(),
  categoryFilter: ''
}

export const expensesModel = createSlice({
  name: 'expensesModel',
  initialState,
  reducers: {
    addExpenses: (state, {payload}: PayloadAction<ExpensesType>) => {
      state.list.push(payload)
      updateExpensesLS(JSON.stringify(state.list))
    },
    deleteExpenses: (state, {payload}: PayloadAction<Number>) => {
      state.list = state.list.filter((item) => item.id !== payload)
      updateExpensesLS(JSON.stringify(state.list))
    },
    setCategoryFilter: (state, {payload}: PayloadAction<string>) => {
      state.categoryFilter = payload
    },
  }
})

export const {addExpenses, deleteExpenses, setCategoryFilter} = expensesModel.actions

export const useSortedExpenses = () => useSelector(
  createSelector(
    (state: RootState) => state.expenses.list,
    (list) => [...list].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  )
)

export const useAllExpenses = () => useSelector(
  createSelector(
    useSortedExpenses,
    (state: RootState) => state.expenses.categoryFilter,
    (list, categoryFilter) => {
      if (!categoryFilter) return list

      return list.filter(({category}) => category === categoryFilter)
    }
  )
)

export const useSumAll = () => {
  createSelector(
    useAllExpenses,
    (list) => {
      console.log(123)
      return list.reduce((prev, curr) => prev + curr.sum, 0)
    }
  )
}

export const useCategoryFilter = () => useSelector(
  createSelector(
    (state: RootState) => state.expenses.categoryFilter,
    (categoryFilter) => categoryFilter
  )
)
