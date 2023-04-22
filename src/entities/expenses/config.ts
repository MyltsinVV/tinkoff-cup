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