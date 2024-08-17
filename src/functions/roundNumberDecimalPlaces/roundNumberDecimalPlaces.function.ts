export const roundNumberDecimalPlaces = (
  number: number,
  decimalPlaces: number = 2,
): number => {
  return (
    Math.round(number * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
};
