/**
 * @param {number[][]} grid
 * @return {number}
 * 
  Input:
  [
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]
  Output: 7
  Explanation: Because the path 1→3→1→1→1 minimizes the sum.
 */
var minPathSum = function (grid) {
  const resultArr = []
  const height = grid.length
  if (height === 0) {
    return 0
  }
  const width = grid[0].length
  const getLength = (i, j, length, result) => {
    result += grid[i][j]
    if (length === height + width - 1) {
      resultArr.push(result)
      return
    }
    if (i < height - 1) {
      getLength(i + 1, j, length + 1, result)
    }
    if (j < width - 1) {
      getLength(i, j + 1, length + 1, result)
    }
  }


  getLength(0, 0, 1, 0)

  let min = resultArr[0]
  for (let i = 1; i < resultArr.length; i++) {
    if (resultArr[i] < min) {
      min = resultArr[i]
    }
  }

  return min
};

const input = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]

const input3 = [
  [1, 2, 5],
  [3, 2, 1]
]

const input2 = [
  [1, 3],
  [2, 2],
  [5, 1]
]

console.log(minPathSum(input2))