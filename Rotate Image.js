/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const width = matrix.length

  if (width === 0) {
    return
  }

  const circle = parseInt(width / 2) + width % 2 // 除以2，向上取整

  let temp1, temp2, temp3
  for (let i = 0; i < circle; i++) {
    for (let j = i; j < width - i - 1; j++) {
      temp1 = matrix[i][j]
      temp2 = matrix[j][width - i - 1]
      temp3 = matrix[width - j - 1][i]
      matrix[i][j] = temp3 // 左 -> 上
      matrix[j][width - i - 1] = temp1 // 上 -> 右
      matrix[width - j - 1][i] = matrix[width - i - 1][width - j - 1] // 下 -> 左
      matrix[width - i - 1][width - j - 1] = temp2// 右 -> 下
    }
  }
};

const test = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15]
]

const test2 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]

rotate(test)
rotate(test2)

test.map(i => console.log(i))
test2.map(i => console.log(i))