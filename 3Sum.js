/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) {
    return []
  }

  let result = []
  let positive = []
  let negative = []
  let zeroNum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      negative.push(nums[i])
    } else {
      if (nums[i] === 0) {
        zeroNum++
      }
      positive.push(nums[i])
    }
  }

  // console.log(0)
  // let positiveHash = createHashArr(positive)
  // console.log(1)
  // let negativeHash = createHashArr(negative)
  // console.log(2)

  // matchHashWithValueV2(result, positiveHash, negative)
  // console.log(3)
  // matchHashWithValueV2(result, negativeHash, positive)
  // console.log(4)


  let positiveHash = createHash(positive)
  let negativeHash = createHash(negative)

  matchHashWithValue(result, positiveHash, negative)
  matchHashWithValue(result, negativeHash, positive)

  // 考虑特殊情况，[0,0,0]
  if (zeroNum >= 3) {
    result.push([0, 0, 0])
  }
  console.log(result)
  return result
};

function createHashArr(nums) {
  let result = [] // : {key: number, value: number[][]}[]
  let sum;
  let item = []
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      sum = nums[i] + nums[j]
      // 默认先排好序
      item = nums[i] < nums[j] ? [nums[i], nums[j]] : [nums[j], nums[i]]
      const contianStatus = isContainV2(result, item, sum) // {has: Boolean, index: number}
      if (contianStatus.index > 0) { // 如果有已存在的 key，则在这个对象的 value 中 push，注意重复
        if (!contianStatus.has) { // 已存在且未重复
          result[contianStatus.index].value.push(item)
        }
      } else { // 不存在的 key，直接 push 到 result
        result.push({ key: sum, value: [item] })
      }
    }
  }
  return result
}

function isContainV2(objArr, arr, key) {
  let targetValue = [[]] // number[][]
  let targetIndex = -1
  for (let i = 0; i < objArr.length; i++) {
    if (objArr[i].key === key) {
      targetValue = objArr[i].value
      targetIndex = i
      break
    }
  }
  for (let i = 0; i < targetValue.length; i++) {
    if (targetValue[i][0] === arr[0]) {
      return {
        has: true,
        index: targetIndex
      }
    }
  }
  return {
    has: false,
    index: targetIndex
  }
}

function createHash(nums) {
  // {[object name]: number}
  let result = {}
  let sum;
  let item = []
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      sum = nums[i] + nums[j]
      // 默认先排好序
      item = nums[i] < nums[j] ? [nums[i], nums[j]] : [nums[j], nums[i]]
      if (result[sum]) {
        // 去除重复的 value，例如 [1,1,5] 应该只有一个 {'6': [1, 5]}，尽管有两个1
        if (!isContain(result[sum], item)) {
          result[sum].push(item)
        }
      } else {
        result[sum] = [item]
      }
    }
  }
  return result
}

function isContain(arrArr, arr) {
  // 针对只有两个元素的数组做的 trick 判断，由于只有两个元素，判断首个就好
  for (let i = 0; i < arrArr.length; i++) {
    if (arrArr[i][0] === arr[0]) {
      return true
    }
  }
  return false
}

// (result: number[][], hash: {key: number, value: number[][]}[], values: number[]) => void
function matchHashWithValueV2(result, hash, values) {
  let uniqueValues = Array.from(new Set(values))
  for (const obj of hash) {
    for (let i = 0; i < uniqueValues.length; i++) {
      if (obj.key + uniqueValues[i] === 0) {
        for (const pair of obj.value) {
          result.push([uniqueValues[i]].concat(pair))
        }
        break;
      }
    }
  }
}

function matchHashWithValue(result, hash, values) {
  let keys = Object.keys(hash)

  for (const key of keys) {
    let keyNumber = parseInt(key, 10)
    // 匹配时对 values 去重
    for (const value of Array.from(new Set(values))) {
      if (-value === keyNumber) {
        for (const valuePair of hash[key]) {
          result.push([value].concat(valuePair))
        }
        break;
      }
    }
  }
}

threeSum([-1, 0, 1, 2, -1, -4])

/*
1 排序、去重
2 分拣正负
3 分别提取 hash——难点
4 根据排列情况，选择 hash 匹配，3sum 里就只有 负负正、负正正两种——考虑 4sum 的情况
5 匹配到的 push 到 result 中


Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

和为0 -> 正数 + 负数 -> 把正数、负数分拣出来
排列情况：
负负正 负正正

关于0：寻找绝对值相同的项，尝试把0归于正数
关于分拣：排序后去重，然后以0分隔正负

用 hash 存两个正数之和的全部情况；
以负负正为例，hash 的 key 为负数中取两个的全部情况，然后对这些情况求和
然后遍历正数组，查找有没有对应的 key 值，取出全部 value 组合，放入 result 中
hash 的结构：
IHash {
  key: number,
  value: number[]
}[]
*/