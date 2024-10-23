---
title: 字符串
createTime: 2018/10/19 21:13:51
permalink: /interview/8d6n5uoo/
---

## 1. 三步反转

abcde， 2， 把前两个字符换到后面，输出 cdeab

思路：三步反转。
1. 把字符串分成两部分， ab 和 cde
2. 分别反转，得到 ba 和 edc
3. 整串反转，得到  cdeab

## 2. 给定一个 32 位有符号整数，将整数中的数字进行反转。

> Leetcode 7

如，输入 123，输出 321 。 自然想到要栈来实现 ，但是可以用代数方法模拟栈：一个数 n ，比如 123，要取出其末位，只需要 n % 10， 如 123 % 10 = 3， 然后 123 / 10 = 12, 把数字规模缩小。反过来，入栈的时候，一个数 m 从0开始， 只需要 m * 10 + n % 10 即可。

溢出处理：如果一个数溢出，那反回去运算肯定不会得到先前的数字，可借助这一点来判断是否溢出了。

```java
public int reverse(int n) {

    int result = 0;
    int temp = 0;
    while ( n != 0 ){
        temp = result * 10 + n % 10; // 可能导致溢出
        if ( temp/10 != result ){   // 检查溢出
            return 0;
        }
        result = temp;
        n = n / 10;
    }

    return result;
}
```

另一种思路是，用一个 long 来存储临时的数 temp， 如果 temp > MAX_INT ，那肯定溢出。

---

## 3. 回文数

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

转换成字符串，两个指针，A指针从前往后，B指针从后往前，依次比较。

```java
private static boolean isPalindrome(int x) {

    // 当测试用例有大量负数时，才加这一句
    if (x < 0) return false;

    char[] cs = String.valueOf(x).toCharArray();
    int left = 0;
    int right = cs.length - 1;
    while ( left <= right ) {
        if (cs[left++] != cs[right--]) return false;
    }

    return true;
}
```