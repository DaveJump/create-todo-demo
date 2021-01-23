export type Dictionary<T> = Record<string, T>

export function isObject(value: any): value is object {
  return ['Object', 'Array'].includes(Object.prototype.toString.call(value).slice(8, -1))
}

export function object2QueryString(from: object) {
  return Object.entries(from).reduce((str, [key, value]) => str + key + '=' + value + '&', '').slice(0, -1)
}
