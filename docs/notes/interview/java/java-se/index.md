---
title: Java必知必会
createTime: 2024/10/23 23:28:04
permalink: /interview/java/
---


## 八种基本数据类型

- boolean
- 1字节：byte
- 2字节：char、short
- 4字节：int、float
- 8字节：long、double

## 自动转换和强制转换

自动转换是系统悄然进行的，从低位转换到高位。例如 int + short ，结果为 int， int + double，结果为 double 。

强制转换需要显式声明，Java可以强制向下转型。比如double转int（会损失精度），子类转父类（丢失部分属性），父类转子类（前提是声明时必须用父类引用指向子类对象，即多态声明）。

## i++ 和 ++i

i++ 是先把 i 压入操作栈，然后用 iinc 直接在局部变量表对 i 加一，再把操作栈顶赋给 a

```
a = i++

0: iload_1
1: iinc 1, 1
4: istore_2
```

++i 是先用 iinc 直接在局部变量表对 i 加一，然后把 i 压入操作栈，再把操作栈顶赋给 a

```
a = ++i

0: iinc 1,1
3: iload_1
4: istore_2
```

一般要对一个数进行修改，要先从局部变量表把数压入操作栈，修改完再赋值回去。但 iinc 这个指令比较特殊，直接在局部变量表里就可以+1操作。

## 拆箱和装箱

什么时候自动装箱?

字面量直接赋值给 Integer，比如 `Integer i = 100`

什么时候自动拆箱？

用 == 比较Integer和int时，比如 `int a = 5; Integer b = 50; a == b`

## 任意数据类型都可转 Object

基本数据类型也可以，会自动装箱

## equals 和 == 的区别

- Object类的 == 和 equals 没区别， equals 实际上判断的就是 ==
- String类的 == 比较的是内存地址，equals比较的是值

String 的 equals 过程？

1. 先比较 == ，如果相同返回 true， 不同继续判断
2. 是否能转型为 String（instanceof操作符），不能直接返回 false
2. 比较长度，不同返回 false，相同继续判断
3. 逐个字符比较

## Integer的缓存

《阿里巴巴Java开发手册》中提到，对于 `Integer var =?` 在 -128 至 127 之间的赋值， Integer 对象是在IntegerCache.cache 产生，会复用已有对象，这个区间内的 Integer 值可以直接使用 == 进行判断，但是这个区间之外的所有数据，都会在堆上产生，并不会复用已有对象，这是一个大坑，因此<font color="red">推荐使用 equals 方法进行判断</font>。

## Java创建对象的过程

简要回答：
1. 在堆中创建对象
2. 在栈中创建引用
3. 引用指向对象

从虚拟机角度回答:
1. 虚拟机遇到new指令，从常量池定位该类的符号引用
2. 如果定位不到，说明对象所属的类还没有被JVM加载，则用classloader进行类的加载、解析、初始化
3. 为对象分配内存
4. 为对象赋零值（不包括对象头）
5. 调用对象的 `<init>` 方法，开始应用层面的初始化

## 类块加载顺序

1. 父类静态块
2. 子类静态块
3. 父类构造块
4. 父类构造方法
5. 子类构造块
6. 子类构造方法

## 面向对象的三个特征

1. 封装
2. 继承
3. 多态

- 多态前提：有继承关系、子类重写父类方法、父类引用指向子类对象
- 多态好处：屏蔽子类间的差异，写出通用的代码（`SQLDao dao = new MySQLDao()`）
- 多态弊端：不能用子类特有的方法，解决办法：`instanceof`操作符，向下转型

## public、protected、private

- public：所有类可访问
- protected：子类、同包
- 无修饰符：同包
- private：私有，内部类可访问

## 局部变量和类变量的初始化

- 局部变量：初始化必须赋值，否则编译不通过
- 类变量：有默认值， int 0，char 空字符'\u0000'，String null

## 成员内部类可以访问外部类的 private 属性，为什么？

成员内部类在编译时会生成单独的 .class 文件

1. Outter.class
2. Outter$Inner.class

编译器默认会为成员内部类添加了一个指向外部类对象的引用，也就是说，内部类对象被构造的时候，自动传入了一个外部类对象的引用，因此可以在成员内部类中随意访问外部类的成员。

## 为什么局部内部类只能访问 final ？

避免外部作用域提前结束。

方法 A 中定义了局部内部类 B，当 方法A 执行完毕，已经结束作用域，如果内部类 B 的方法（可能由另一个线程执行）还没结束，但由于 A 结束作用域，方法 A 的变量 a 会不可访问。为了解决这一问题， Java 采用了 **复制** 的手段，即把方法 A 的变量 a 复制一份到内部类 B 的常量池。

但是复制过后会产生不一致的问题，也就是内部类的方法修改了 a ， 但是外部类的 a 没有改变。

因此，Java 规定，只能访问 final ，以避免上述问题。

## 接口中的方法有哪些修饰符？

- public
- static（必须提供实现）
- default（必须提供实现）
- abstract

default有什么用？ 接口演化

## Java 标准类库常用接口

- `Comparable`，实现了这个接口的类，其对象能够进行比较
- `Comparator`，比较器，用于提供多样的比较方法，自定义多种比较
- `Runnable`，用于执行线程
- `Serializable`，标记接口，用于序列化

## Java 内置的函数式接口

- `Consumer<T>`，接收T，无返回
- `Supplier<T>`，无接收，返回T
- `Predicate<T>`，接收T，返回boolean
- `Function<T,R>`，接收T，返回R

## 接口和抽象类的区别

抽象类是 is-a 关系，接口是 like-a 关系。抽象类一般用作基类，让具体类去实现。接口一般用作某个类具有哪些功能。接口表示一种能力，类表示一类事物抽象。

抽象类可以有成员变量和实现方法，接口只能有常量，static 和 default 方法有实现。

抽象类可以有构造器，接口没有。

## Overload 和 Override 的区别

- Overload是重载，一个类中可以多个名字一样，但参数类型或个数不一样的方法
- Override是重写，子类重写父类的方法

## Object类有哪些方法？

1. clone，用于对象复制
2. toString
3. equals，比较
4. hashcode，哈希
5. wait，让一个线程放弃锁，进入等待状态
6. notify/notifyAll，唤醒线程，让线程进入就绪状态
7. getClass，获取类对象
8. finalize，垃圾回收相关

## 什么时候重写 equals，什么时候重写 hashcode ？

当多个对象之间，只需要某些字段相等而不必是同一个对象我们就认为他相等的时候，需要重写 equals 方法。重写了 equals 方法最好也重写 hashcode 方法，因为 hashcode 方法常用在 HashSet 或 HashMap 计算 key。 equals 的两个对象，却有不同的 hashcode，会被存入 Set 或 Map 中的不同位置，这和 HashSet 的设计初衷相悖。HashMap取的时候也可能因 HashCode 的改变而取不到。

## HashMap如何存储键值对

HashMap底层是使用 Node 对象数组存储的，Node 是一个单项的链表。当这个链表长度超过 8 时，转换成红黑树 TreeNode 。

### put() 过程

1. 确定要存入的桶。先使用 hash() 函数获取该对象的 hash 值，高16位和低16位异或后跟 Node 对象数组大小-1 进行与操作，得到应该存入数组的下标。
2. 链表插入。假如该位置为空，就将value值插入，如果该下标不为空，则要遍历该下标上面的对象，使用equals方法进行判断，如果遇到equals()方法返回真则进行替换，否则将其插入到链表尾部（JDK1.8）

#### 为什么要将hash的高16位和低16位异或？

**让高位也参与计算，减少某些数值的hash冲突**。例如，Float类型的 1f, 2f ,3f ,4f 的 hash值 低16位全部都是0，只有高16位不同。因此采用异或让高位也参与计算。

### get() 过程

1. 根据 key 对象的 hash 值找到 Entry 对象数组的对应下标。
2. 判断Entry的 key 和 给定的 key 是否相同（equals或==），以及 hash 是否也相同，如果不是，访问链表下一个 Entry ，如果是，返回 Entry 的 value，如果遍历完了也没有，返回 null

### hashmap扩容过程

#### 何时扩容

懒加载。首次调用 put方法 时，HashMap 会发现 table 为空，然后调用 resize方法 进行初始化（默认为16）。当添加完元素后，如果HashMap发现size（元素总数）大于 threshold（阈值，默认16*0.75），则会调用resize方法进行扩容。

#### 如何扩容

table大小变为原来的两倍，也就是2的n次方变为2的n+1次方。之后对table进行调整：若元素hash值第N+1位为0：不需要进行位置调整，若元素hash值第N+1位为1：调整至原索引的两倍位置。

#### 为什么扩容是2倍，而不是1.5倍或3倍？

因为要保证table的长度为 2^n （即 2，4，8，16，32...）

为什么 table 的长度要为 2^n ？

均匀分布，减少碰撞。计算 hash 的时候，hash值要跟 table长度-1 进行与操作, table长度为 2^n，也就是二进制100000， 而 2^n -1 是二进制 11111， hash值跟 1 与，更不容易碰撞。

## HashMap 的 key 有什么要求？key 可不可以为 null ？

1. 最好不要用可变对象。如果一定要是可变对象，也要保证 hashcode 方法的结果不会变。因为 HashMap 的 get 方法是会去判断 hashcode 值，如果 hash 值变了，有可能就取不到。
2. 使用不可变对象是明智的。

### key 可不可以为 null，为 null 时怎么存储 ？

可以。上源码。在 talbe[0] 链表中查找 key 为 null 的元素，如果找到，则将 value 重新赋值给这个元素的 value，并返回原来的value。

如果上面for循环没找到则将这个元素添加到 talbe[0] 链表的表头。

```java
if (key == null)  
    return putForNullKey(value);  

private V putForNullKey(V value) {  
    for (Entry<K,V> e = table[0]; e != null; e = e.next) {  
        if (e.key == null) {  
            V oldValue = e.value;  
            e.value = value;  
            e.recordAccess(this);  
            return oldValue;  
        }  
    }  
    modCount++;  
    addEntry(0, null, value, 0);  
    return null;  
}
```

## ArrayList 和 LinkedList 的区别 ？

ArrayList 继承于 `java.util.AbstractList<E>`，底层数组实现，遍历快，中间插入慢。因为数组的物理地址上是连续的，所以遍历快，插入的时候后面的元素都要响应地往后挪，带来额外的时间开销。ArrayList的扩容是 1.5 倍。

LinkedList 继承于 `java.util.AbstractSequentialList<E>` 底层链表实现，中间插入快，遍历慢。因为物理上不连续，直接把前一个元素指向插入元素，插入元素指向原来的后一个元素即可，所以插入快。但是获取第 n 个元素，要从1开始逐个访问，所以遍历比较慢。LinkedList不需要扩容。

## fail-fast 和 fail-safe

java.util 包下的集合类都是快速失败（fail—fast）的，不能在多线程下发生并发修改（迭代过程中被修改）。java.util.concurrent包下的容器都是安全失败（fail—safe），可以在多线程下并发使用，并发修改。

用迭代器遍历一个java.util集合对象时，如果遍历过程中对集合对象的内容进行了修改（增加、删除、修改），则会抛出`Concurrent Modification Exception`。java.util.concurrent包下则不会。

## Collection 和 Collections 的区别

Collection是集合类的上级接口，包含了 list、Set、Map 等子接口。Collections是集合工具类，提供了一些常用的集合操作。例如对各种集合的搜索、排序、线程安全化等操作。

## 为什么 String 要设计成 final ？

1. 维护一个常量池，节省堆空间。
2. final类由于不可修改性，多线程并发访问也不会有任何问题
3. 支持hash映射和缓存

## String s = new String("abc") 创建几个对象？

2个。第一在常量池中生成 abc 对象，第二在堆中生成 abc 对象。

## String 的 + 号 如何连接字符串 ？

编译器优化，StringBuilder().append()

## StringBuffer 和 StringBuilder

StringBuilder 比 StringBuffer 快，但涉及线程安全必须用StringBuffer。StringBuffer通过 synchronized 保证线程安全。它们两者与 String 的不同点在于对象能被多次修改，而 String 是 final 的。

## Java中的异常

分为 Error 和 Exception

Error代表严重错误，比如 OutOfMemory 和 StackOverFlow

Exception 分为 checkException 和 uncheckException （也叫runtimeException）

checkException 是我们需要在程序中捕获处理或抛出的异常，比如IO、Network Exception

uncheckException 是可以通过优化程序逻辑来避免的，不应该捕获，常见的有 nullpointerException 和 ClassNotFoundException 和 ArrayIndexOutOfBoundsException

## try里面有 return， finally 还执行吗？

执行。先保存 return 的内容，finally 里执行完之后再 return

但是 finally 里有 return， 会提前返回

## Java中的 IO ？

普通IO：IO面向字节流和字符流
1. InputStream 和 OutputStream 处理字节流（一个字节8位bit）
2. reader 或 writer 处理字符流（Unicode 字符）
3. BufferedWriter 和 BufferedReader 缓存流

NIO：面向的是 channels 和 buffers

### 什么时候用IO什么时候NIO？

如果只有少量的连接，但是每个连接同时发送很多数据，用传统IO。如果有许多连接，但是每个连接都只发送少量数据，选择NIO。（如网络聊天室、P2P网络）


## 写出单例模式

单例模式是指一个类只能有一个对象实例。好的单例模式应该满足两点要求：**延时加载** 和 **线程安全**。

静态内部类写法：
1. 用静态内部类构造实例
2. 构造函数私有

> 静态内部类不会自动初始化，只有调用静态内部类的方法，静态域，或者构造方法的时候才会加载静态内部类。

```java
public class Singleton{

  private static class Holder{
    private static Singleton singleton = new Singleton();
  }

  private Singleton();

  public static Singleton get(){
    return Holder.singleton;
  }

}
```

## 基本数据类型及其包装类有什么区别？

1. Java是一门纯粹的OO语言，但基本数据类型不是对象，为了让他们有对象的特征，Java设计了对应的包装类。包装类是对象，就要有对象的特征，有可调用的方法，而基本类型没有。
2. 包装类可放入如HashMap、HashSet等集合中，基本数据类型不可以。但是存入时会被Java自动装箱。
3. 基本数据类型初始化值为0（char为\u0000）,if 判断时要用 `if(i == 0)`，而包装类要用 `if(i==null)`

## 面向对象和面向过程的区别

面向过程是按计算机的逻辑去顺序执行程序，性能高，但是代码较难维护，不利于复用和扩展。单片机、嵌入式、Linux内核等都采用面向过程开发，因为性能是最重要的。

面向对象把一切当作对象，从人理解世界的角度去看待，由于面向对象有封装、继承、多态等特点，我们可以设计出低耦合的系统，使系统更加灵活、更加易于维护。

## 静态抽象内部类

static 只能用来修饰类的成员，所以顶级类不能用 static 修饰。所以 static class 只能是内部类。

**静态内部类与外部类之间并没有任何关系**，其外部类仅仅起到一个名字空间的作用，和包名起差不多的作用。而 **静态内部类也不持有外部类的引用，也不能引用外部类的private成员**。

一个静态内部类其实是具有顶级类的地位，那么和一般的抽象类其实并没有什么不同。



## HashSet 的底层原理

HashSet 本质上是一个 HashMap ，因为 Map 存储的是键值对，键不允许重复。所以 HashSet 存放的对象实际上是存放到 HashMap 的 Key 进去。然后 Value 部分用一个空对象代替。

```java
private static final Object PRESENT = new Object();
```



## String.intern() 方法的作用

`String.intern()`是一个 native 方法。如果字符串常量池里面已经包含一个等于此 String 对象的字符串，则返回池中的这个字符串String对象，否则，先将该String对象包含的字符串添加进常量池，然后返回此String对象的引用。



## new 对象跟 clone() 的区别

clone()与 new 都能创建对象。但 new 通过构造方法为对象赋初值，而 clone() 不会调用构造方法，只是把原有对象的属性复制给新对象。



## 什么是浅拷贝？什么是深拷贝？

Object.clone() 是浅拷贝。如果一个对象里面包含引用类型，拷贝的只是值的地址，而没有在堆中开辟新的内存空间。**也就是说，引用类型指向原有对象**。

如果我们重写clone()方法，对于引用类型成员变量，重新在堆中开辟新的内存空间。那就是深拷贝。


