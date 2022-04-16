---
title: 链表题思路
comments: false
---


## 1. 反转链表

用三个变量 prev、curr、next 分别暂存上一个结点、当前结点、下一个结点，然后依次反转

```java
    ListNode prev = null;
    while (head != null){
        ListNode next = head.next; // 先把 next 保存
        head.next = prev; // 掉头，反指
        prev = head;      // 反指完成， prev 往后走
        head = next;      // 然后才是 head 往后走
    }
    return head;
```

递归解法

```java
/**
* 输入一个节点 head，将「以 head 为起点」的链表反转，并返回反转之后的头结点
**/
private static ListNode reverseByRecursion(ListNode head){
    if (head == null || head.next == null){
        return head;
    }
    ListNode last = reverseByRecursion(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}
```

## 2. 从尾到头打印链表

> 《剑指offer》题目6

逆向输出链表，自然会想到用后进先出的栈。先遍历链表，把遍历的值依次写入栈，然后再出栈即可。

事实上，递归本身就是栈结构，这道题可以直接用递归代替栈。


```java
// 递归实现
private static void reversePrint(ListNode node){

    if (node.next != null) {
        reversePrint(node.next);
    }

    System.out.println(node.value);

}
```

## 3. 删除链表的节点

> 《剑指offer》题目18

删除链表节点的两种方法(比如要删除 i 节点)：

- 方法一: 遍历到 i 的前一个节点 h，将 h 指向 i 的下一个节点 j，然后删除 i
- 方法二：把节点 j 的内容复制到 i，将 i.next 指向 j 的下一节点 k，然后删除 j



## 4. 链表中倒数第 k 个节点

>  《剑指offer》题目22

两个指针，如求倒数第 3 个节点，A指针先走3步，然后B指针开始走，当A指针到尾的时候，B指针所指就是倒数第 k 个节点。（注意判空，例如链表只有2个节点）


```
2 → 88 → 60 → 21 → 6 → 13 → 78
↑（B）    ↑（A）

2 → 88 → 60 → 21 → 6 → 13 → 78
                   ↑（B）    ↑（A）
```


## 5. 链表中环的入口节点

如果一个链表中包含环，如何找出环的入口节点？

两个指针，一个一次走一步，另一个一次走两步，如果快的指针追上了慢的指针，那链表就包含环。否则如果走得快的到了末尾（node.next = null）都没追上慢的，就不包括环。

相遇节点就是入口节点。


## 6. 合并两个有序的链表

```
List1: 1 -> 3 -> 5 -> 7

List2：2 -> 4 -> 6 -> 8

合并后：1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
```

1. 先用临时变量把合并后的表头保存下来，以便方法返回
2. 只要 a 和 b 都不为空，就比较 a b 当前结点，将小的值给 mergeHead， 然后往后走

```java
private static ListNode mergeByIteration(ListNode a, ListNode b){
        ListNode mergeHead = new ListNode();

        // mergeHead是会往后走的， temp 保存表头
        ListNode temp = mergeHead;

        while (a != null && b != null){
            if (a.value < b.value){
                mergeHead.next = a;
                a = a.next;
            } else {
                mergeHead.next = b;
                b = b.next;
            }
            mergeHead = mergeHead.next;
        }

        // 如果2个链表其中一个遍历完了，那合并后的链表后续结点直接取另一个链表
        mergeHead.next = a != null ? a : b;

        return temp.next;
    }
```