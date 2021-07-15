/**
 * A usable typescript wrapper for the {@ref Number.isInteger} function.
 * 
 * @param number The number/object that should be checked.
 * @returns Whether the provided object is a number. Typescript will know the result for future typechecking.
 */
export const isNumber = (number: number | any): number is number =>
  Number.isInteger(number);
