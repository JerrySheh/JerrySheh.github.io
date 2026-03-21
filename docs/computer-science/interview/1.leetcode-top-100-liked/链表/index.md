---
title: 链表
createTime: 2026/03/21 17:27:03
permalink: /interview/leetcode/link/
---

解决链表问题，有两个通用技巧：

1. 快慢指针：用于找到链表的中点
2. 虚拟节点（dummy）：用于避免处理空指针的场景

## 快慢指针找中点

使用快慢指针（slow 走一步，fast 走两步）。**当 fast 到达末尾时，slow 正好在链表的中间**。

快慢指针找中点一定要确保 `fast.next.next` 有效 

```java
while (fast.next != null && fast.next.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
```

如果是偶数节点【如 `1 2 3 4 5 6` 】，slow 在 3， fast 在 6，可见如果遇到要拆分两半的场景，**slow是前一半的最后一个节点**

如果是奇数节点【如 `1 2 3 4 5` 】，slow 在 3， fast 在 5 

## 虚拟节点（dummy）
  
遇到需要返回一个新链表的题，可以考虑创建一个虚拟链表，它的 `.next` 就是题目要求返回的头节点  

dummy节点也常用于避免处理空指针的场景，在链表头（双向链表则是头和尾）增加 `dummyHead` 和 `dummyTail`，从而通用化判空问题  

```java
ListNode dummy = new ListNode(0);
ListNode curr = dummy;
// curr 操作…
// 最后返回 dummy.next 
```