
type CurriedFunction<T> = (...args: any) => (T | ((...args: any) => T));


export { CurriedFunction }
