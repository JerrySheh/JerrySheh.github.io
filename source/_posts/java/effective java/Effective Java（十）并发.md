---
title: Effective Java（十）并发
categories:
  - Java
  - Effective Java
tags:
  - Java
abbrlink: 15ac17ad
date: 2021-11-07 21:57:01
---

如果你想获得更高的性能，使用并发是不可避免的。但是并发编程要比单线程编程难得多，一方面它很容易出错，另一方面错误很难复现。这一篇主要介绍如何写出正确、简洁、可靠的并发程序。

<!-- more -->

# Item 78 同步访问可共享的互斥数据

有些人认为 `synchronized` 关键字只是用于互斥场景，其实这是片面的，这个关键字还能保证一个线程的修改对另一个线程可见。

比如你想在后台启动一个任务，并且主线程随时停止它：

```java
public class StopThread {
    
    private static boolean stop;

    public static void main(String[] args) throws InterruptedException{
        Thread background = new Thread(() -> {
            int i = 0;
            while(!stop){
                i++;
            }
        });
        backgroud.start();
        TimeUnit.SECONDS.sleep(1);
        stop = true;
    }

}
```

这个程序可能永远都停不下来，因为虚拟机可能会对这段代码做编译器优化，将

```java
while(!stop)
    i++;
```

优化为

```java
if (!stop)
    while (true)
        i++;
```

解决办法有两种，第一种是对 `stop` 变量的的读写封装成方法，并加上 `synchronized` 关键字。通过方法来同步访问。另一种方法则是直接对 `stop` 变量加 `volatile` 关键字，这个关键字保证了一个线程对变量的修改对另一个线程立即可见。

```java
public class StopThread {
    private static volatile boolean stop;
}
```

但是请注意， `volatile` 并不能保证非原子操作的同步性。如 i++ （同时被两个线程访问修改， 仅仅用 `volatile` 是不够的。即 `volatile` 是解决可见性问题的，不是解决非原子操作同步性问题的。

> i++ 不是一个原子操作，它分为三步：第一，从内存取值放入寄存器，第二，执行加一，第三，放回内存。

解决 i++ 的问题，除了可以用 `synchronized` 之外，还可以将 i 封装成 `AtomicInteger` 这种原子类， 确保自增是原子的，就不会出问题。 

--- 

# Item 79 不要过度同步

遍历一个列表时，如果对这个列表做了修改，那么会抛出一个 `ConcurrentModificationException`。那么加入我们对迭代方法加同步块呢？同步块可以防止并发的修改，但是无法防止迭代线程本身回调自己进行修改，因为同步块是可重入的，所以在这个场景下是没有意义的。那么我们在迭代过程启动一个后台线程来修改呢？很遗憾，虽然主线程一直在等待后台线程来修改，主线程已经有锁了，后台线程却因为锁永远修改不到，导致死锁。

这给我们的一个启示是：**应该在同步区域内做尽可能少的工作，不要从同步区域中调用外来方法（这种做法在真实的系统中已经造成了许多死锁）**。

解决这一问题的途径是使用 `CopyOnWriteArrayList`，这是一种写时复制的技术。它通过重新拷贝整个底层数组，在这里实现所有的写操作，写完之后，再将修改完的副本替换成原来的数据，这样就可以保证写操作不会影响读操作了。由于内部数组永远不改动，因此迭代不需要锁定，速度也非常快。**适合少写多读的场景**。

---

# Item 80 executor、task 和 stream 优先于线程

Java 的 `Executors` 框架提供了强大的线程池支持，只需要一行代码，即可以创建合适的任务执行器（单线程任务、多线程任务、固定线程数任务等）。当这些内置的执行器不适用你的场景时，才考虑使用 `ThreadPoolExecutor` 本身来构造你自己的线程池。

```java
// 创建一个单线程任务
ExecutorService exec = Executors.newSingleThreadExecutor();

// 缓存线程池（不适合大负载的服务器，因为当任务过多，线程池没有足够的空闲线程，会无限的增加线程数，有一定风险）
ExecutorService exec = Executors.newCachedThreadPool();

// 固定个数线程池
ExecutorService exec = Executors.newFixedThreadPool();

// 启动/关闭线程池
exec.execute(runnable);
exec.shutdown();
```

在 Java 7 中，`Executor` 框架还支持 fork-join 任务，在 Java 8 中，Parallel streams （Item 48）是在 fork join 池上编写的，我们不费什么力气就能享受到它们的性能优势，前提是它们正好适用于我们手边的任务。

作者忠告：不仅应该尽量不要编写自己的工作队列，而且还应该尽量不直接使用线程。

---

# Item 81 并发工具优于 wait 和 notify


`java.util.concurrent` 包含三类有用的工具，分别是 Executor Framework 、并发集合（ConcurrentCollection）以及同步器（Synchronizer）。

并发集合包含 `ConcurrentHashMap`、`CopyOnWriteArrayList`、`BlockingQueue` 等，同步器包含 `CountDownLatch`、 `Semaphore` 和 `CyclicBarrier` 等。

没有理由在新代码中使用 wait 方法和 notify 方法。如果你不得不维护老旧代码继续使用 wait 和 notify，那么遵守一个原则：始终应该使用 wait 循环模式来调用 wait 方法；永远不要在循环之外调用 wait 方法。一般情况下，应该优先使用 notifyAll 方法，而不是使用 notify 方法。

---

# Item 82 文档应包含线程安全属性

当你编写了一个类，在文档中应该尽可能包含其线程安全属性，常见的安全属性有以下几类：

- **不可变对象**： 这个类的实例看起来是常量，不需要外部同步，如 `String`、`Long` 和 `BigInteger`。
- **无条件线程安全**： 该类的实例是可变的，但是该类具有足够的内部同步，因此无需任何外部同步即可并发地使用该类的实例。如 `AtomicLong` 和 `ConcurrentHashMap`。
- **有条件的线程安全**: 与无条件线程安全类似，只是有些方法需要外部同步才能安全并发使用。如 Collections.synchronized 包装器返回的集合，其迭代器需要外部同步。
- **非线程安全**： 该类的实例是可变的。要并发地使用它们，客户端必须使用外部同步来包围每个方法调用（或调用序列），如大部分通用的集合实现， `ArrayList` 和 `HashMap` 等。
-- **线程对立**： 即使每个方法调用都被外部同步包围，该类对于并发使用也是不安全的。线程对立通常是由于在不同步的情况下修改静态数据而导致的。没有人故意编写线程对立类；此类通常是由于没有考虑并发性而导致。当发现类或方法与线程不相容时，通常将其修复或弃用。

此外，当我们使用显式私有锁时，Lock 字段应该始终声明为 final，以防无意中地改变它。但是，私有锁对象用法只能在无条件的线程安全类上使用。有条件的线程安全类不能使用这种用法。

---

系列目录：

- [Effective Java（一）创建和销毁对象](../post/39fc1edf.html)
- [Effective Java（二）对象通用的方法](../post/f754c291.html)
- [Effective Java（三）类和接口](../post/20ef17da.html)
- [Effective Java（四）泛型](../post/53a4cf82.html)
- [Effective Java（五）枚举和注解](../post/acf36022.html)
- [Effective Java（六）Lambdas and Streams](../post/cc85a16e.html)
- [Effective Java（七）方法](../post/387fb533.html)
- [Effective Java（八）General Programming](../post/7d5810ff.html)
- [Effective Java（九）异常](../post/4e34dae4.html)
- [Effective Java（十）并发](../post/15ac17ad.html)