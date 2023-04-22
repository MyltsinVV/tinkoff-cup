export type ExpenseCategoryItem = {
  id: string
  label: string
}

type ExpenseCategoryKeys = 'food' | 'other' | 'utilities' | 'entertainment'

export const ExpenseCategory: Record<ExpenseCategoryKeys, ExpenseCategoryItem> = {
  other: {
    id: '1',
    label: 'Прочее',
  },
  entertainment: {
    id: '2',
    label: 'Развлечения',
  },
  food: {
    id: '3',
    label: 'Продукты питания',
  },
  utilities: {
    id: '4',
    label: 'Коммунальные услуги',
  },
}

export const ExpenseCategoryList = Object
  .values(ExpenseCategory)
  .sort((a, b) => Number(a.id) - Number(b.id))

export const expenseDateCreateFormat = 'DD-MM-YYYY'

const EXPENSES_LS_KEY = 'expenses'

export const updateExpensesLS = (newList: string) => {
  localStorage.setItem(EXPENSES_LS_KEY, newList)
}

export const getExpensesLS = () => {
  const expensesLS = localStorage.getItem(EXPENSES_LS_KEY)

  return expensesLS ? JSON.parse(expensesLS) : []
}