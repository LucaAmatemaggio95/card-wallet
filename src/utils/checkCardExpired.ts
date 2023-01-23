import { isPast, parse } from "date-fns";

/**
 * check if the date of the card is in the past or not, hence the card is not valid
 * @param exp expiration date
 * @returns bool if the date is in the past or not
 */
const checkCardExpired = (exp: string) => {
  const parsedExp = parse(exp, "dd/MM/yyyy", new Date());
  return isPast(parsedExp);
};

export default checkCardExpired;
