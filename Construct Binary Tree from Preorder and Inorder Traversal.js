/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length < 1) {
    return null
  }
  if (preorder.length === 1) {
    return new TreeNode(preorder[0])
  }

  return build(separateByRoot(preorder, inorder))
};

const build = ({ preorderLeft, preorderRight, inorderLeft, inorderRight, root }) => {
  if (root === null) {
    return null
  }

  const newRoot = new TreeNode(root)
  if (preorderLeft.length <= 1) {
    newRoot.left = preorderLeft[0] ? new TreeNode(preorderLeft[0]) : null
  } else {
    newRoot.left = build(separateByRoot(preorderLeft, inorderLeft))
  }
  if (preorderRight.length <= 1) {
    newRoot.right = preorderRight[0] ? new TreeNode(preorderRight[0]) : null
  } else {
    newRoot.right = build(separateByRoot(preorderRight, inorderRight))
  }

  return newRoot
}

const separateByRoot = (preorder, inorder) => {
  if (preorder.length < 1) {
    return { inorderLeft: [], inorderRight: [], preorderLeft: [], preorderRight: [], root: null }
  }
  const root = preorder[0]
  // 在中序中根据 root 分段
  let inorderLeft = []
  let inorderRight = []
  for (let i = 0; i < preorder.length; i++) {
    if (inorder[i] === root) {
      inorderLeft = inorder.slice(0, i)
      inorderRight = inorder.slice(i + 1)
      break
    }
  }
  let preorderLeft = []
  let preorderRight = []
  // 根据中序分段结果，在前序里找对应的分段
  if (inorderLeft.includes(preorder[1])) {
    preorderLeft = preorder.slice(1, inorderLeft.length + 1)
    preorderRight = preorder.slice(inorderLeft.length + 1)
  } else {
    preorderRight = preorder.slice(1, inorderRight.length + 1)
    preorderLeft = preorder.slice(inorderRight.length + 1)
  }
  return { inorderLeft, inorderRight, preorderLeft, preorderRight, root }
}



class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
  preRender() {
    console.log(this.val)
    if (this.left) {
      this.left.preRender()

    }
    if (this.right) {
      this.right.preRender()
    }
  }
  inRender() {
    if (this.left) {
      this.left.inRender()
    }
    console.log(this.val)
    if (this.right) {
      this.right.inRender()
    }
  }
}


// const preorder = [3, 9, 20, 15]
// const inorder = [9, 3, 15, 20]
const preorder = [1, 2]
const inorder = [1, 2]

const tree = buildTree(preorder, inorder)
tree.preRender()
tree.inRender()


/**
 *
 * preorder = [3,9,20,15,7]
   inorder = [9,3,15,20,7]

    3
   / \
  9  20
    /  \
   15   7

 */