/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  return quickSort(nums)
};

let quickSort = (arr) => {
  if(arr.length <= 0) {
    return []
  }

  if(arr.length == 1) {
    return arr
  }
  
  if(arr.length == 2) {
    if(arr[0] > arr [1]) {
      return [arr[1], arr[0]]
    }
    return arr
  }

  const middleNum = parseInt(arr.length / 2)

  const flag = arr[middleNum]

  let left = arr.slice(0, middleNum)
  let right = arr.slice(middleNum + 1);

  // left right 为引用
  ({left, right} = exchange(left, right, flag))
  const result = quickSort(left).concat([flag].concat(quickSort(right)))

  return result
}

function exchange(left, right, flag) {
  const [leftPop, rightPop] = [[], []]
  for(let i = 0 ; i < left.length ; ) {
    if(left[i] > flag) {
      leftPop.push(left.splice(i, 1)[0])
      continue
    }
    i++
  }
  for(let i = 0 ; i < right.length ; ) {
    if(right[i] < flag) {
      rightPop.push(right.splice(i, 1)[0])
      continue
    }
    i++
  }
  left = left.concat(rightPop)
  right = right.concat(leftPop)
  return { left, right }
}

console.log('sort result:', quickSort([9, 7, 5, 4, 2, 8 ,8]))

// 1 [9, 7, 5, 4, 8]
// 2 [4, 5, 9, 7, 8]
// 3 [4, 5, 7, 9, 8]
// 4 [4, 5, 7, 8, 9]
