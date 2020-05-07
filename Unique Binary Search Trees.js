/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  // const hash = new Array(n + 1)
  // hash[0] = 1
  const hash = [1, 1, 2, 5]

  const getTrees = (total) => {
    if (hash[total]) {
      return hash[total]
    }
    // 如果现有 hash 中有 total 对应的值，直接取该值并 return
    let result = 0
    let half = total / 2
    for (let i = 1; i <= half; i++) {
      // 左节点的组合数量
      if (hash[i - 1] === undefined) {
        hash[i - 1] = getTrees(i - 1)
      }

      // 右节点的组合数量
      if (hash[total - i] === undefined) {
        hash[total - i] = getTrees(total - i)
      }

      result += hash[i - 1] * hash[total - i]
    }
    result *= 2
    if (total % 2) { // 奇数
      const value = hash[(total - 1) / 2]
      result += value * value
    }
    return result
  }

  return getTrees(n)
};

console.log(numTrees(7))
// console.log(numTrees(process.argv[2]))