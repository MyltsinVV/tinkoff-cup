import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {getExpensesLS, updateExpensesLS} from "./config";

export type ExpensesType = {
  id: number
  date: string
  category: string
  sum: number
  comment: string
}

export type ExpensesModelType = {
  list: ExpensesType[]
}

export const initialState: ExpensesModelType = {
  list: getExpensesLS(),
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
      state.list.filter((item) => item.id !== payload)
      updateExpensesLS(JSON.stringify(state.list))
    }
  }
})

export const {addExpenses, deleteExpenses} = expensesModel.actions

export const useAllExpenses = () => useSelector(
  createSelector(
    (state: RootState) => state.expenses.list,
    (list) => [...list].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  )
)
