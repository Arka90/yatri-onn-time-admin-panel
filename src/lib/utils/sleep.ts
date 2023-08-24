/**
 *
 * @param interval number in seconds
 * @returns
 */
export default function sleep(interval: number) {
    return new Promise((resolve) => setTimeout(resolve, interval * 1000));
}
