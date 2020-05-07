// '1(2(3,4(,5)),6(7,))' 把这个字符串转成二叉树
//       1
//     /   \
//    2     6
//   / \   / \
//  3   4 7
//   \
//    5

class Tree {
  left=null;
  right=null;
  father=null;
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

const stack = [];
const target = '1(2(3,4(,5)),6(7,))';
const root = new Tree(null, null);

for(const i in target) {
  switch (target[i]) {
    case '(':
      stack.push(target[i])
      break;
    case ',':
      stack.push(target[i])
      break;
    case ')':
      break;
    default:
      stack.push(target[i])
      break;
  }
}