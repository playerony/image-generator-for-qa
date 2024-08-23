import { roundNumberDecimalPlaces } from "../roundNumberDecimalPlaces/roundNumberDecimalPlaces";

export const calculateAspectRatioScalar = (
  width: number,
  height: number,
): number => {
  return roundNumberDecimalPlaces(width / height);
};
