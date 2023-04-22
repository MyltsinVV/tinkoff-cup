export const getValueFromObject = (object: object, id: number | string) =>
  Object.values(object).find((item) => item.id === id)
