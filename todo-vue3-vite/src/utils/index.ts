/**
 * generate a unique id
 * @param length output length
 */
export function genUID (length: number = 13): string {
  if (length === 1) {
    return (~~(Math.random() * 36)).toString(36)
  }
  return (~~(Math.random() * 36)).toString(36) + genUID(length - 1)
}
