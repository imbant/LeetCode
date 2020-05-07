/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let result = [] // number[][]

  if (nums.length < 3) {
    return result
  }

  nums.sort((a, b) => a - b)
  let hashObj = {}
  nums.map((item, index) => {
    if (hashObj[item]) {
      hashObj[item] += 1
    } else {
      hashObj[item] = 1
    }
  })

  let sum = 0
  let existTime = null
  let negativeTarget = 0
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) {
      break
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    for (let j = i + 1; j < nums.length - 1; j++) {
      sum = nums[i] + nums[j]
      if (sum > 0) {
        break
      }
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }
      negativeTarget = -sum
      existTime = hashObj[negativeTarget]
      if (existTime) {
        // 避免重复
        if (negativeTarget > nums[j]) {
          result.push([nums[i], nums[j], negativeTarget])
        }

        // 有重复情况，考虑 [-2, 0, 4] 和 [-2, -2, 4]
        if (negativeTarget === nums[j] && existTime > 1) {
          if (negativeTarget === nums[i]) {
            // 只有 target = 0 时才会出现 target + target = target
            if (hashObj[0] >= 3) {
              result.push([0, 0, 0])
            }
          } else {
            result.push([nums[i], nums[j], negativeTarget])
          }
        }
      }
    }
  }
  return result
}

console.log(threeSum([1, 2, -2, -1]))
