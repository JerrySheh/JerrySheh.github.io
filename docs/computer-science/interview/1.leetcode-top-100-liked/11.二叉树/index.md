---
title: 二叉树
createTime: 2026/03/22 16:12:02
permalink: /interview/leetcode/binary-tree/
---

二叉树和链表一样，都是递归的数据结构，既然是递归的数据结构，那一棵树和其子树，其实没有本质的区别，因此很多问题都可以用递归来解决。

要解决这棵树，就先解决其子树，要解决其子树，就解决子树的子树……直到没有子树了，再处理问题，然后向上返回。

## 二叉树的数组表示

若某节点的索引为 `n` ，则该节点的：
- 左子节点索引为 `2n+1` 
- 右子节点索引为 `2n+2`
- 父节点索引为 `(n-1)/2`


## 二叉树的层序遍历 - 标准写法

广度优先遍历通常借助“队列”来实现

```java
public List<Integer> levelOrder(TreeNode root) {

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    List<Integer> list = new ArrayList<>();
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll(); // 队列出队
        list.add(node.val);           // 保存节点值
        if (node.left != null)
            queue.offer(node.left);   // 左子节点入队
        if (node.right != null)
            queue.offer(node.right);  // 右子节点入队
        }
    return list;
}
```

## 前、中、后序遍历 - 标准写法

```java
/* 前序遍历 */
void preOrder(TreeNode root) {
    if (root == null)  return;
    // 访问优先级：根节点 -> 左子树 -> 右子树
    list.add(root.val);
    preOrder(root.left);
    preOrder(root.right);
}

/* 中序遍历 */
void inOrder(TreeNode root) {
    if (root == null)  return;
    // 访问优先级：左子树 -> 根节点 -> 右子树
    inOrder(root.left);
    list.add(root.val);
    inOrder(root.right);
}

/* 后序遍历 */
void postOrder(TreeNode root) {
    if (root == null)    return;
    // 访问优先级：左子树 -> 右子树 -> 根节点
    postOrder(root.left);
    postOrder(root.right);
    list.add(root.val);
}
```