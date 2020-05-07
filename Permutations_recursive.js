/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function (nums) {
  if (nums.length === 1) {
    return [nums]
  }

  let resultPool = []
  getResult([], nums, resultPool, nums.length)

  return resultPool
}

/**
 * @param {number[]} result
 * @param {number} begin
 * @param {number[]} remain
 * @return {number[]}
 */
function getResult(result, remain, resultPool, total) {
  if (remain.length < 1) {
    if (result.length > 0) {
      resultPool.push(result)
    }
    return
  }
  if (remain.length === 1) {
    result.push(remain[0])
    return
  }
  let tempRemain = []
  let cloneResult = cloneDeep(result)
  let cloneResultTail = cloneResult.length
  for (let i = 0; i < remain.length; i++) {
    tempRemain = remain.slice(0, i).concat(remain.slice(i + 1))
    cloneResult.push(remain[i])
    getResult(cloneResult, tempRemain, resultPool, total)
    if (cloneResult.length === total) {
      resultPool.push(cloneResult)
    }
    cloneResult = cloneResult.slice(0, cloneResultTail)
  }

  return
}

function cloneDeep(nums) {
  return nums.map(i => i)
}

console.log(permute([1]))
// [] 、 [1]