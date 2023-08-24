export default function getRandomArbitrary(min: number, max: number) {
    let rNum = Math.floor(Math.random() * (max - min) + min);
    if (rNum > 1000) {
        return (rNum / 1000).toFixed(2) + "k";
    }
    return rNum;
}
