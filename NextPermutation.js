/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
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

let nums = [1, 1, 5]
for (let i = 0; i < 15; i++) {
  nextPermutation(nums)
  console.log(i, '--------', nums)
}

/*
1 找到降序起点，head 指向该 index，若没找到，取最后一位
2 若有多个，取最后一个
3 若起点为 0，返回最小值
4 由于是降序起点，必能从该点算起找到一个大于该点前边的最小值
5 找到的点放在降序起点前一个点，剩下的点升序排列
7 over

*/