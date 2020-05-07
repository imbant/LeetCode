/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const height = board.length
  if (height < 1) {
    return false
  }
  const width = board[0].length

  const deriction = [[-1, 0], [1, 0], [0, -1], [0, 1]] // 代表坐标的四个方向
  const go = (wordIndex, i, j) => {
    if (board[i][j] !== word[wordIndex]) {
      return false
    }
    if (wordIndex >= word.length - 1) {
      return true
    }
    for (let m = 0; m < deriction.length; m++) {
      const newI = i + deriction[m][0]
      const newJ = j + deriction[m][1]
      if (newI >= height || newI < 0 || newJ >= width || newJ < 0) { // 数组越界
        continue
      }
      if (board[newI][newJ] === '') { // 这个方向被访问过
        continue
      }

      const tempVal = board[i][j]
      board[i][j] = '' // visited
      const result = go(wordIndex + 1, newI, newJ)
      if (result) {
        return true
      } else {
        board[i][j] = tempVal // reset
      }
    }
    return false
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (go(0, i, j)) {
        return true
      }
    }
  }
  return false
};




const board = [
['A']  // ['A', 'B', 'C', 'E'],
  // ['S', 'F', 'C', 'S'],
  // ['A', 'D', 'E', 'E']
]

console.log(exist(board, 'A'))
