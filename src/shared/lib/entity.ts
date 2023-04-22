export const getValueFromObject = (object: object, id: number | string) =>
  Object.values(object).find((item) => item.id === id)

export const formatNumber = (number: number) => {
  const decimalCount = number.toString().split('.')[1]?.length || 0
  const formatNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  if (decimalCount) {
    return formatNumber + '0'.repeat(2 - decimalCount)
  }

  return formatNumber + '.00'
}
