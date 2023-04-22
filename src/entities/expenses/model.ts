import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {Moment} from 'moment/moment'

export type ExpensesType = {
  date: string
  category: string
  sum: number
  comment: string
}

export type ExpensesModelType = {
  list: ExpensesType[]
}

export const initialState: ExpensesModelType = {
  list: [],
}

export const expensesModel = createSlice({
  name: 'expensesModel',
  initialState,
  reducers: {
    addExpenses: (state, {payload}: PayloadAction<ExpensesType>) => {
      state.list.push(payload)
    },
  },
})

export const {addExpenses} = expensesModel.actions

export const useAllExpenses = () => useSelector(
  createSelector(
    (state: RootState) => state.expenses.list,
    (list) => list
  )
)
