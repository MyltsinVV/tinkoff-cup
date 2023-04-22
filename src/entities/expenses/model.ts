import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {getExpensesLS, updateExpensesLS} from './config'
import moment, {Moment} from "moment/moment";
import {DateRange} from "@mui/x-date-pickers-pro";

export type ExpensesType = {
  id: number
  date: string
  category: string
  sum: number
  comment: string
}

export type ExpensesModelType = {
  list: ExpensesType[]
  categoryFilter: string,
  dateRangeFilter?: [string, string]
}

export const initialState: ExpensesModelType = {
  list: getExpensesLS(),
  categoryFilter: '',
  dateRangeFilter: undefined
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
    setDateRangeFilter: (state, {payload}: PayloadAction<[string, string] | undefined>) => {
      console.log(payload)
      state.dateRangeFilter = payload
    },
  }
})

export const {addExpenses, deleteExpenses, setCategoryFilter, setDateRangeFilter} = expensesModel.actions

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
    (state: RootState) => state.expenses.dateRangeFilter,
    (list, categoryFilter, dateRangeFilter) => {
      let filteredList = list
      if (dateRangeFilter && dateRangeFilter[0] && dateRangeFilter[1]) {
        const [dateStart, dateEnd] = dateRangeFilter
        filteredList = list.filter(({date}) =>
          moment(date).isAfter(dateStart) && moment(date).isBefore(moment(dateEnd).add(1, 'days')))
      }

      if (!categoryFilter) return filteredList

      return filteredList.filter(({category}) => category === categoryFilter)
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