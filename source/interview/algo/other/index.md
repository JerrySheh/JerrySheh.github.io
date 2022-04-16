---
title: 其他算法题思路
comments: false
---

## 1. 找出1到1000之间的素数

判断一个数是否素数：

一个数 n，分别去除以 [2,(√n)] 的每个数，如果都不能整数（n % i != 0），那这个数就是素数。

```java
private static boolean isPrime(int n){

    if ( n < 0 ) return false;
    if ( n ==1 ) return true;

    for (int i = 2; i <= Math.sqrt(n); i++) {
        if ( n % i == 0) return false;
    }

    return true;
}
```

找出1到1000之间的素数，除了暴力遍历 isPrime() ，有没有什么高效方法？**埃拉托色尼筛选法**。用一个bool数组，存储n个数的状态，初始化都为true，然后从2开始，如果2的状态为true，就开始遍历比n小的所有的2的倍数，将其全部置为false。把2的倍数遍历完后，继续往下找下一个状态为true的数，即3，遍历比n小的所有的3的倍数（按3*3，3*4，3*5这样遍历，注意不需要从3*2开始了）。最后剩下的状态为true的数全为质数。

```java
private static void printPrime(int range){

    // 一个 boolean 数组，一开始全部是 true
    boolean[] status = new boolean[range];
    for (int i = 0; i < range; i++) {
        status[i] = true;
    }

    for (int i = 2; i < range; i++) {
        // 如果 i 为 true ，是素数
        if (status[i]){
            // 那 i 的倍数肯定不是素数，置为 false
            for (int j = i; j * i < range; j++) {
                status[i*j] = false;
            }
        }
    }

    // 剩下为 true 的就都是素数了
    for (int i = 0; i < range; i++) {
        if (status[i]) System.out.println(i);
    }

}
```
