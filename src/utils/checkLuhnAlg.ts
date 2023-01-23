/**
 *  check if the card number is a valid number based on Luhn Algorithm
 * @param num card number as string
 * @returns bool if the number is a valid card number
 */
const luhnCheck = (num: string) => {
  const arr = (num + "")
    .split("")
    .reverse()
    .map(x => parseInt(x));
  const lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

export default luhnCheck;
