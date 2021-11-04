function factorial(userInt) {
    let p= userInt
    if (userInt === 0)
        return '1'

    if (!userInt)
        return ''

    var i, nextNumber, carret,

        result = userInt.toString().split('').reverse().map(Number)

    while (--userInt) {
        i = carret = 0
        self.postMessage({ type: 'UPDATE_Progress', payload: {[p]: (p-userInt)*100/p} });

        while ((nextNumber = result[i++]) !== undefined || carret) {
            carret = (nextNumber || 0) * userInt + carret
            result[i - 1] = carret % 10
            carret = parseInt(carret / 10)
        }
    }

    return result.reverse().join('')
}
self.addEventListener('message', ({ data }) => {
    let { type, payload } = data;
    if (type === 'UPDATE') {
        let result = factorial(payload)
        self.postMessage({ type: 'UPDATE_SUCCESS', payload: result });
    }
});

