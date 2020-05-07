/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function (nums) {
  let resultPool = []
  for (let i = 0; i < factorial(nums.length); i++) {

    nextPermutation(nums)

    resultPool.push(cloneDeep(nums))
  }
  return resultPool
};

function factorial(i) {
  let result = 1
  while (i > 0) {
    result *= i
    i--
  }
  return result
}


function cloneDeep(nums) {
  let arr = []
  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i])
  }
  return arr
}

function nextPermutation(nums) {
  if (nums.length < 2) {
    return
  }

  let head = 0;

  // 找最后一个降序点
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] < nums[i + 1]) {
      head = i + 1;
    }
  }
  switch (head) {
    case nums.length - 1: {
      // 最后一位，则与前一位交换
      swap(nums, head, head - 1)
      return

    }
    case 0: {
      // 纯降序
      nums = nums.reverse()
      return
    }
    default: {
      let beforeHead = head - 1;
      let minBiggerIndex = head;
      for (let i = head; i < nums.length; i++) {
        // 找到 beforeHead 后边元素里比自己大的成员中最小的那个
        if (nums[i] > nums[beforeHead] && nums[i] < nums[minBiggerIndex])
          minBiggerIndex = i
      }
      swap(nums, minBiggerIndex, beforeHead)
      sort(nums, head, nums.length)
    }
  }
};

function swap(nums, i, j) {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

function sort(nums, begin, end) {
  for (let i = 0; i < end - begin; i++) {
    for (let j = begin; j < end - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1)
      }
    }
  }
  return nums
}


console.log(permute([1, 2, 3]))
