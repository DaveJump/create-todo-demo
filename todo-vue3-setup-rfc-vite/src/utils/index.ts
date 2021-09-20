Array.prototype.shuffle = function () {
  let input = this
  for (let i = input.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let itemAtIndex = input[randomIndex]
    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

export function genUUID() {
  return Math.random()
    .toString(36) // toString(36) 将随机数转成36进制字符
    .substr(2) // 再截掉前两位 '0.'
    .split('')
    .shuffle()
    .join('') // shuffle 可选调用
}
