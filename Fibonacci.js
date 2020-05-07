// 初始版本
const Fibonacci1 = (n) => {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}

// 空间优化
const arr = [0, 1]
const Fibonacci2 = (n, arr) => {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  if (arr[n]) {
    return arr[n]
  }
  arr[n] = Fibonacci2(n - 1, arr) + Fibonacci2(n - 2, arr)
  return arr[n]
}

// 迭代代替递归
const Fibonacci3 = (n) => {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }

  let pre1 = 0
  let pre2 = 1
  let result

  for (let i = 2; i <= n; i++) {
    result = pre1 + pre2
    pre1 = pre2
    pre2 = result
  }

  return result
}

const Fibonacci4 = (n, a, b) => {
  if (n === 0) {
    return 0
  }
  return Fibonacci4(n, b, a + b)
}

const n = 1000

console.log(new Date)
console.log(Fibonacci3(n), new Date)
console.log(Fibonacci1(n), new Date)
console.log(Fibonacci2(n, arr), new Date)

// 0 1 1 2 3 5 8 13