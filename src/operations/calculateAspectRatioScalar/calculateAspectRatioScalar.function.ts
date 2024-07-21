import { roundNumberDecimalPlaces } from '../roundNumberDecimalPlaces/roundNumberDecimalPlaces.function'

export const calculateAspectRatioScalar = (width: number, height: number): number => {
  return roundNumberDecimalPlaces(width / height);
}
