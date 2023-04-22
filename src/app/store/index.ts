import {configureStore} from '@reduxjs/toolkit'
import {expensesModel} from "../../entities/expenses";

export const store = configureStore({
  reducer: {
    expenses: expensesModel.reducer
  }
})
