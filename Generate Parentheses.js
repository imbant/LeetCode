/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n === 0) {
    return []
  }

  const result = []

  // 结果 剩余的左括号 剩余的右括号 pair 中右括号的数量
  const getPair = (pair, left, right) => {
    if (pair.length === n * 2) {
      // 完成一个完整的结果
      result.push(pair)
      return
    }

    if (left <= 0) {
      if (right <= 0) {
        return
      }
      pair += ')'
      getPair(pair, left, right - 1)
      return
    } else if (right <= 0) {
      return
    }

    if (pair.length / 2 >= (n - right)) {
      if (pair.length / 2 > (n - right)) {
        let tempPair = pair
        pair += '('
        getPair(pair, left - 1, right)
        tempPair += ')'
        getPair(tempPair, left, right - 1)
        return
      } else {
        pair += '('
        getPair(pair, left - 1, right)
        return
      }
    }
  }

  getPair('(', n - 1, n)
  return result
};

generateParenthesis(4)