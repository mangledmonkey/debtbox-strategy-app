export function roundUnits(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}