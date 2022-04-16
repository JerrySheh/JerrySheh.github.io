---
title: 排序算法题思路
comments: false
date: 2022-04-16 22:36:50
---

## 1. 选择排序、冒泡排序、插入排序的区别

### 选择

选择排序是先遍历数组，找到最小的元素，放到前面。第二趟从第二个元素开始，找到次小元素，放到前面。每次都选出当前躺最小的元素，放到前面。

```java
public static void selectSort(int[] arr){
    int size = arr.length;
    for (int i = 0; i < size; i++) {
        int min = i;
        // 第二个for循环找出最小元素
        for (int j = i; j < size; j++) {
            if (arr[j] < arr[min]) min = j;
        }
        Swap.swap(arr, min, i);
    }
}
```

### 冒泡

冒泡排序是比较两两相邻的两个元素，如果前一个元素比后一个元素大，就交换。不断地往后换下去。

```java
public static void bubbleSort(int[] arr){
    int size = arr.length;
    for (int i = 0; i < size; i++) {
        // 第一躺结束后，最右元素一定是最大的，因此第二趟最右元素不参与，即 size - i - 1
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j+1]) Swap.swap(arr, j, j+1);
        }
    }
}
```

### 插入

插入排序是将待排序的元素插入到前面已经有序的元素里面。它是将待排序元素不断从后往前换到前面的,如果待排序元素比前一个元素小，就换到前面去。

```java
private static void sort(int[] arr){
    for (int i = 1; i < arr.length; i++) {
        for (int j = i; j > 0 && arr[j] < arr[j-1]; j--) {
            Swap.swap(arr, j, j-1);
        }
    }
}
```

三者的时间复杂度都是 O(n^2)，空间复杂度为 1

---

## 2. 归并排序和快速排序的区别

### 归并

归并排序的思想是，找到中间点，将数组分成两个子数组，排序左半边，再排序右半边，再将两边合并起来。

```java
public static void mergeSort(int[] arr, int low, int high){
    if (high <= low ) return;

    // 找到中间点
    int mid = (low + high) / 2;

    // 排序左半边
    mergeSort(arr, low, mid);

    // 排序右半边
    mergeSort(arr, mid+1, high);

    // 左右两边归并
    merge(arr, low, mid, high);
}
```

### 快速

快速排序的思想是，选一个参考元素，比参考元素小的放左边，比参考元素大的放右边。然后左边排序，右边排序。

```java
public static void quickSort(int[] arr, int low, int high){
    if (high <= low) return;

    // partition返回的是参考元素的下标
    int refer = partition(arr, low, high);

    // 将切分的左半部分快排
    quickSort(arr, low, refer - 1);

    // 将切分的右半部分快排
    quickSort(arr, refer + 1, high);
}
```

快速排序和归并排序的时间复杂度都是 O(NlogN)，但是快速排序在最糟糕的情况下可能会是 O(n^2)。

---

## 3.快速排序的 partition 方法


1. 选取第一个元素为参考元素
2. 从左向右，每个元素都跟参考元素做比较，直到找到比参考元素大的
3. 从右向左，每个元素都跟参考元素做比较，直到找到比参考元素小的
4. 把第 2 步比较大的数 和 第 3 步 比较小的数 交换
5. 不断重复直到扫描完（left > right）
6. 把参考元素放在正确的位置（swap low right）
7. 返回参考元素（return right）

```java
public static int partition(int[] arr, int low, int high) {
    // 1.选取第一个元素为参考元素
    int refer = arr[low];

    int left = low;
    int right = high + 1 ; // 这里要加一

    // 重复 2.3.4
    while (true){

        // 2.从左边向右，每一个元素都跟参考元素做比较，直到找到比参考元素大的
        while ( arr[++left] < refer ){
            // 如果到达最右了，不再向右
            if (left == high) break;
        }

        // 3.从右边向左，每一个元素都跟参考元素做比较，直到找到比参考元素小的
        while ( arr[--right] > refer ){
            // 如果到达最左了，不再向左
            if (right == low) break;
        }

        // 5. 检查是否扫描完
        if (left >= right) break;

        // 4. 交换刚刚两个元素
        Swap.swap(arr, left, right);

    }

    // 6. 将参考元素`arr[low]`放到中间位置
    Swap.swap(arr, low, right);

    // 返回的是下标
    return right;
}
```

---

## 4.归并排序的 merge 方法

1. 先将原数组全部复制到辅助数组 tempArr[] 中，然后依次判断（from low to high）
2. 左半边是否用尽，如果用尽，取右半边的元素，否则2
3. 右半边是否用尽，如果用尽，取左半边的元素，否则3
4. 右<左？取右，否则取左（取比较小的）

```java
public static void merge(int[] arr, int low, int mid, int high){
    int left = low;
    int right = mid + 1;

    // 将数组复制到一个新的临时数组中
    int[] tempArr = new int[high+1];
    for (int i = low; i <= high; i++) {
        tempArr[i] = arr[i];
    }

    for (int i = low; i <= high; i++) {
        // 左半边是否用尽，如果用尽，取右半边的元素
        if ( left > mid ) arr[i] = tempArr[right++];

        // 右半边是否用尽，如果用尽，取左半边的元素
        else if ( right > high ) arr[i] = tempArr[left++];

        // 右半边的当前元素是否小于左半边的当前元素，如果是，取右半边的元素
        else if ( tempArr[right] < tempArr[left]) arr[i] = tempArr[right++];

        // 否则取左半边的元素
        else arr[i] = tempArr[left++];
    }

}
```

---

## 5. [排序] [位运算]文件排序

> 《编程珠玑》开篇题目

有一个电话簿文件，里面记录的都是7位数的电话号码（如 3485712），没有重复数字，请排序并输出。

用一个容量为10000000的 boolean 数组，依次读取input.txt，并把对应的下标置为 true 。 例如读取到 1258021 ，就把 boolean[1258021] 置为 true 。然后遍历boolean数组，遇到 true 的把下标写入 output.txt

```java
private static void readAndSort() throws IOException {
    // 初始化 boolean 数组
    boolean[] set = new boolean[10000000];
    for (int i = 0; i < set.length; i++) {
        set[i] = false;
    }

    // 遍历输入文件
    BufferedReader br = new BufferedReader(new FileReader("input.txt"));
    String s;
    while ( (s = br.readLine()) != null){
        int index = Integer.parseInt(s);
        set[index] = true;

    // 输出
    BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"));
    for (int i = 0; i < set.length; i++) {
        if (set[i]){
            bw.write(Integer.valueOf(i).toString());
            bw.write("\r\n");
            bw.flush();
        }
    }

}
```