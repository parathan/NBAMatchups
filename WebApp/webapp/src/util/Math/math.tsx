/**
 * This function takes a number and multiplies it by 100, and rounds it to the nearest number.
 * @param num the given number to be multiplied
 * @returns number that has been multiplied
 */
export function multby100(num: number) {
    return Math.round(num * 1000) / 10
}

/**
 * This function converts a decimal to a percent
 * @param num the number to be converted
 * @returns a percent value
 */
export function decimalToPercent(num: number): number{
    return Math.trunc(num * 100) / 100;
}