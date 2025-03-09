---
title: Java并发必知必会
createTime: 2024/10/23 23:28:04
permalink: /interview/java/java-concurrent/
---

## 线程的三种创建方式？

1. 继承 Thread 类
2. 实现 Runnable 方法（推荐）
3. 实现 Callable 方法

## Runnable 和 Callable 创建线程有什么区别？

第一，Callable 可以用 `call()` 方法获取线程的返回值，而 Runnable 的 `run()` 方法没有返回值。

第二， `call()` 方法可以抛出异常，主线程可以直接捕获子线程异常。但 Runnable 只能通过 `setDefaultUncaughtExceptionHandler()` 的方式来捕获。

第三，运行 Callable 任务可以拿到一个 Future 对象，表示异步计算的结果。它提供了检查计算是否完成的方法，以等待计算的完成，并检索计算的结果。通过 Future 对象可以了解任务执行情况，可取消任务的执行，还可获取执行结果。

## 线程 Thread 类的 join 方法是干什么用的？

让线程串行执行。

## 多线程应该注意哪些问题？如何避免？

三个问题：

1. 安全性问题（竞争条件、可见性）
2. 活跃性问题（死锁）
3. 性能问题（为了解决上述问题而导致的性能下降）

解决安全性问题，可以用 synchronized 关键字， 或者 ReentrantLock 同步锁，Volatile用于解决可见性问题，Threadlocal类等。

解决死锁问题，可以让线程一开始就持有所有需要的资源，但这样会造成资源浪费，变成一个性能问题。第二种方式是，当需要新的资源而不能满足时，必须先释放自己持有的锁。

## Java中线程同步有几种方式？

1. synchronized ，解决竞争条件问题（多个线程同时访问一段内存区域），也可以解决可见性问题。
2. Volatile ，解决可见性问题（线程栈、CPU缓存），但不能保证原子性问题
3. java.util.concurrent包下的Atomic原子类，无锁保证原子性。多线程 i++ 问题 Atomic 已足够。
4. java.util.concurrent.Lock.ReentrantLock，是一个可重入、互斥、实现了Lock接口的锁。
5. ThreadLocal类，线程局部变量。
6. java.util.concurrent包下的其他工具。例如阻塞队列（BlockingQueue），concurrentHashMap，CopyOnWriteArrayList ，栅栏（CyclicBarrier）、闭锁（CountDownLatch）、信号量(Semaphore)

## Java.util.concurrent包（Java并发工具包）

concurrent包包含了一些帮助我们编写并发程序的有用的类以及线程安全的原子类。如下：

- 原子类：AtomicInteger、LongAdder 
- 并发容器类：ConcurrentHashMap、CopyOnWriteArrayList、BlockingQueue（阻塞队列），SynchronousQueue（同步队列）
- 并发工具类：CountDownLatch（闭锁）、Barrier（栅栏）、Semaphore（信号量）、ReentrantLock（可重入锁）

- 学习参考：http://tutorials.jenkov.com/java-util-concurrent/index.html
- 中文：https://blog.csdn.net/axi295309066/article/details/65665090

## ConcurrentHashMap

concurrentHashMap是线程安全的 hashmap 。在 jdk 1.7 采用分段锁保证线程安全和并发性能。但在 jdk 1.8 中改用 CAS + synchronized 控制。ConcurrentHashMap 迭代时不会抛出 `ConcurrentModificationException`，是 fail-safe 的。

### ConcurrentHashMap 的 key 能否为 null ？

不能。因为当我们去 `get(key)` 的时候，如果得到一个 null ，无法判断这个 key 究竟是没有做过映射，还是之前 `put(key)` 时 value 就是为 null。

HashMap 允许 null 是单线程场景下的妥协，依赖开发者自行规避歧义。

### 那为什么 HashMap 的 key 可以为 null？

因为 HashMap 不是为多线程设计的，可以用 `contains(key)` 来判断 key 是否做过映射。而 concurrentHashMap 因为支持并发，在调用 `m.contains(key)` 和 `m.get(key)` 时， m 的值可能被别的线程修改了。

ConcurrentHashMap 禁止 null 是并发场景下的必然选择，通过严格约束保证安全性和代码清晰性。

## CopyOnWriteArrayList

替代了同步的List，采用写时复制技术。当对List内容进行修改时，复制原来的List。迭代的是原List，fail-safe，**适合一写多读的场景**。

## synchronized 原理？

同步代码块基于 monitorenter 和 monitorexit 字节码指令来实现。编译后的代码，monitorenter 指令会被插入到同步代码块的开始位置，而 monitorexit 会被插入到代码块结束处和异常处。

线程执行到 monitorenter 指令时，将会尝试获取对象所对应的 monitor 所有权。

## Atomic原子类原理？

非阻塞并发算法。具体是用了 **CAS，（比较并交换 compare and swap）**。它包含三个数：需要读写的内存位置V、进行比较的值A、拟写入的新值B。当 V 和 A 相等时，才将 V 的值更新为 B。无论是否更新成功，都返回当前内存位置 V 值。

可以这样理解CAS：我认为 V 的值应该为 A，如果是，那么将 V 的值更新为 B，否则不修改并告诉 V 的值实际为多少。

## ReentrantLock 和 Synchronized 的区别

都是可重入锁，但 ReentrantLock 多了三个高级特性：

1. **等待可中断**：如果持有锁的线程长期不释放锁，正在等待的线程可以放弃等待，改为处理别的事情。
2. **可实现公平锁**：公平锁是指按照申请锁的时间顺序依次获得锁，而非随机获得。可以通过带 boolean 值的构造函数要求使用公平锁。
3. **锁可以绑定多个条件**：一个 ReentrantLock对象可以绑定多个 Condition 对象。

## 重入原理？

**重入的一种实现方式是，为每个锁关联一个获取计数值和一个所有者线程**。当计数值为0时，锁没有被任何线程持有。当一个线程获取该锁，JVM将记下锁的持有者，并把计数值+1，这个线程第二次请求该锁，计数值再+1。第二次请求的操作执行完毕后，计数值-1，第一次请求的操作执行完毕后，计数值再-1，便恢复到0，锁被释放。

## 为什么 volatile 能解决重排序问题？

**声明为 volatile 的变量，实际上相当于程序员显式地告诉编译器和处理器不要使用重排序**。汇编指令中多出来的 Lock，实际上也就是一道内存屏障。处理器遇到内存屏障时，就会知道不要对此处乱序执行。事实上，Linux 或 Windows 作为操作系统，**也只是调用 CPU 所实现的内存屏障指令而已**，归根结底这个不是操作系统或者编译器去实现，而是硬件实现了然后供软件调用。

## 什么是CAS ？

CAS（Compare and swap）用于实现非阻塞并发算法。一个线程在修改一个变量时，先将当前值（当前内存地址值）跟预期值进行比较，如果一致，则进行修改，如果不一致，说明这个变量被其他线程改了，就不进行修改。

但是 CAS 也不是完美的，比如经典的ABA问题：一个变量 V 初次读取的时候是 A值，之后被其他线程修改为 B，然后又修改为 A，那 CAS 会认为它从来没有变过。

在 java.util.concurrent.atomic 里面，像 AtomicBoolean 这些原子类就有 compareAndSet 方法。

参考：http://tutorials.jenkov.com/java-concurrency/compare-and-swap.html

## 重量级锁和轻量级锁

每个对象都有一个对象头（Object Header），官方叫做 Mark Word，用于存储对象自身的运行时数据（hashcode、GC age等）和指向方法区对象类型数据的指针。为了节省空间，这个对象头（32bit或64bit）的存储空间是复用的。它有一个标志位，01时表示未锁定，存储hashcode、GC age等，00时表示轻量级锁定，10时表示重量级锁定，11是GC标记，01时是可偏向。不同标志位下这 32bit 存储的东西也都不一样。

### 重量级锁

进入 syncronized 块的线程默认是重量级锁。其他线程进入时，发现锁被占用，会进入阻塞状态（这个过程由操作系统完成）。

### 轻量级锁

当一个线程访问了这个对象的同步块，发现标志位为01（未锁定），就会在当前线程的栈帧中复制一份 Mark Word（复制后的这块区域叫 Lock Record）。然后用 CAS 尝试去将 Mark Word 更新为指向栈帧Lock Record的指针。如果成功，该线程获得该对象的锁。如果失败，虚拟机会检查 Mark Word 是否已经指向当前线程栈帧，如果是，说明该线程已经获得该锁，允许进入同步块（重入），否则说明锁对象已经被其他线程占有了。

如果两个线程争用同一个锁，轻量级锁就不再有效，升级为重量级锁，标志位变成10，Mark Word存储指向重量级锁的指针，后面等待锁的线程要阻塞。

轻量级锁的目的是，在无竞争的条件下，用 CAS 去消除同步带来的互斥量。

## 自旋锁和自适应自旋锁

为什么要有？因为同步是比较重的操作（挂起线程和恢复线程都要转入内核态），给系统的并发性能带来压力。

如果系统有两个CPU，前面请求锁的线程获得锁，后面请求锁的线程不必挂起，不必放弃CPU，只需要让它执行一个忙循环（自旋），看看前面的线程是否很快会释放锁。

自旋的时间非常短，效果好，反之自旋时间很长还得不到锁，会白白消耗处理器资源。因此自旋的次数有限制。默认是10，但是 Java 1.6 后提供了自适应，如果一个线程自旋期间经常成功获得锁，就把自旋时间调长，否则就调短或干脆不自旋，改为传统的挂起（wait）。

## 锁消除

有一些做了同步的代码，但虚拟机即时编译器运行时发现这部分代码不可能存在共享数据竞争，那 Java 就会自动移除这部分的锁，这称为锁消除。例如在一个方法中，堆上的所有数据都不会逃逸出去被其他线程访问到，那就可以把它们当作栈上的数据对待，也就无需同步加锁了。

一个例子就是 JDK 1.5 之前的版本，String 的 + 号会被优化成 Stringbuffer.append()，这个方法是同步的，但如果只有一个线程在操作它，就可以进行锁消除。

## 偏向锁

偏向锁是轻量级锁的进一步，连 CAS 都不做了，无竞争时，直接消除整个同步。当 Mark Word 标志位为01时，代表可偏向。持有偏向锁的线程以后每次进入锁的同步块时，虚拟机不再做任何同步。

当另一个线程尝试获取该锁，偏向模式就结束了，进入了未锁定或轻量级锁状态，如果两个线程在争用该锁，甚至会升级为重量级锁。

## 锁优化

如果程序中大多数锁总是被多个线程同时访问（争用），那偏向模式就是多余的。具体分析后，可通过 -XX:UseBiasedLocking 来进制偏向锁优化，这样反而提升了性能。

## Java 线程池 submit 和 execute 的区别？

- **execute(Runnable x)**：是 Executor 接口的方法，没有返回值。可以执行任务，但无法判断任务是否成功完成。——实现Runnable接口
- **submit(Runnable x)**：是 ExecutorService 接口的方法，返回一个future。可以用这个future来判断任务是否成功完成。——实现Callable接口

如果提交的任务不需要一个结果的话直接用 `execute()`


## 什么是 AQS ？

AbstractQueuedSynchronizer（AQS），抽象队列同步器。一个用来构建锁和同步器的框架，我们可以使用 AQS 简单且高效地构造出应用广泛的同步器。

AQS 是很多同步工具类实现时使用的共同的基类。