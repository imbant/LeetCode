/**
 * 手写代码，考点拆分为4个小项，限制15行代码，10分钟内
 * a) 创建长度为 5 的空数组 arr
 * b) 生成（2-32）的随机整数 rand
 * c) 把随机数 rand 插入 arr 内，如果数组 arr 内已存在与 rand 相同的数字，重新生成随机数 rand 并插入 arr。
 *    【需要用递归实现，不能用 for/while 循环】
 * d) 最终输出一个长度为 5 且内容不重复的数组 arr
 */

const arr = new Array(5)
const getRandom = () => parseInt(30 * Math.random() + 2)
const rand = getRandom()
const getUnique = (index, rand) => {
  if (index > 4) return
  if (arr.includes(rand)) getUnique(index, getRandom())
  else arr[index] = rand
  getUnique(index + 1, getRandom())
}
getUnique(0, rand)
console.log(arr)