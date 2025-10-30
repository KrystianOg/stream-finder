export function uniqBy<T extends object>(
    array: Array<T>,
    getKey: (item: T) => string
) {
    const seen = new Set<unknown>()
    return array.filter((el) => {
        const key = getKey(el)
        const duplicate = seen.has(key)
        seen.add(key)
        return !duplicate
    })
}
