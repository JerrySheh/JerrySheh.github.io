---
title: Java 8 之后都更新了些什么
categories:
  - Java
  - Java SE
tags:
  - Java
createTime: 2023/10/29 19:03:21
abbrlink: 131b8819
permalink: /java/2w61xdug/
---

## 前言

我最开始学 Java 是在 2017 年，那时候距离 Java 8 正式发布（2014年）已经过去3年了，因此我是直接从 Java 8 开始学习的。然而时至今日（2023年），我在网上仍然可以看到不少文章在介绍 “Java 新特性 - Stream、Lambda表达式”，拜托，那些都是快10年前的东西了，但还是有好多人固执地认为这些就是 Java 的最新特性。

这几年在公司里也见到不少项目仍然使用 Java 6，到了不得不升的时刻，也只敢升到 Java 8，而不敢进一步往上升了。很多程序员依然遵循着「你发任你发，我用Java 8」的原则。看来大家对 Java 8 真是爱之入骨。

那么，假如你是一个新项目的负责人，在新项目里你可以使用全新的技术栈而不用担心历史包袱，你敢不敢尝试新技术呢？要做出选择，这不得先了解一下 Java 8 之后，Java 主要都更新了些什么。

<!-- more -->

---

## Java 各新版本发布日期

Java 在 10 之后，调整为每半年发布一次更新的节奏，LTS为长期支持版本。

| 版本 | 发布日期 |	最大支持日期 |
| --- | --- | --- | 
| Java 8  (LTS) | 2014.3 | 2030.9 | 
| Java 9        | 2017.9 | - |
| Java 10       | 2018.3 | - |
| Java 11 (LTS) | 2018.9 | 2032.1 |
| Java 12       | 2019.3 | - |
| Java 13       | 2019.9 | - |
| Java 14       | 2020.3 | - |
| Java 15       | 2020.9 | - |
| Java 16       | 2021.3 | - |
| Java 17 (LTS) | 2021.9 | 2026.9 |
| Java 18       | 2022.3 | - |
| Java 19       | 2022.9 | - |
| Java 20       | 2023.3 | - |
| Java 21 (LTS) | 2023.9 | 2031.9 |
| Java 22       | 2024.3 | - |
| Java 23       | 2024.9 | - |
| Java 24       | 2025.3 | - |
| Java 25 (LTS) | 2025.9 | - |

参阅：https://www.oracle.com/in/java/technologies/java-se-support-roadmap.html

---

## 模块化（Java Platform Module System）

> 在 Java 9 中引入

模块主要解决依赖的问题。在以前，我们编写一个Java程序，所有代码最终会被打成一个 Jar 包。而现在，通过声明 `module-info.java` ，可以指定某个模块暴露出去的包和需要依赖的模块，更好地管理我们的代码。

以前，只要是 Public 的类，我们就可以使用（即使在外部包中）。现在，必须在模块中显式声明导出的类，我们才可以使用。

例如，java.xml 的 module-info.java 中声明了若干导出：

```java
module java.xml {
    exports java.xml;
    exports javax.xml.catalog;
    exports javax.xml.datatype;
    ...
}
```

从 Java 9 开始，原有的 Java 标准库已经由一个单一巨大的 rt.jar 分拆成了几十个模块，这些模块以 .jmod 扩展名标识，可以在`$JAVA_HOME/jmods`目录下找到它们。

---

## var关键字

> 在 Java 10 开始支持

允许在局部变量声明中使用var关键字，编译器会根据初始化表达式的类型推断变量的类型。

```java
// a 自动推导为 String 类型
var a = "hello";

// b 自动推导为 ArrayList 类型
var b = new ArrayList<>();
```

---

## Switch 表达式

> 在 Java 12 和 Java 13 预览，Java 14 正式发布

支持 Switch 表达式

```java
private static String get(int n) {
    String result = switch (n) {
        case 1, 2 -> "hello";
        case 3 -> "world";
        case 4, 5, 6 -> "again";
        default -> "unknown";
    };
    return result;
}
```

同时，Switch 语句若有返回值使用 yield，没有返回值使用 break

return 会直接跳出当前循环或者方法，而 yield 只会跳出当前 Switch块

```java
private static String get(int n) {
    return switch (n) {
        case 1, 2:
            yield "hello";
        case 3:
            yield "world";
        case 4, 5, 6:
            yield "again";
        default:
            yield "unknown";
    };
}
```

到了 Java 21 ，新增了 Switch 的模式匹配

```java
static String formatterPatternSwitch(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> obj.toString();
    };
}
```

---

## 文本块

> 在 Java 13 和 Java 14 预览，Java 15 正式发布

支持多行文本，代码中编写 html、json、sql 等文本更方便了

```java
 String sql = """
                select *
                from product
                where id = 1
              """;
```

---

## Records 

> 在 Java 14 预览，Java 15 正式发布

Records 主要用于定义数据类，只是存储、保存数据用，无自定义行为。效果类似 Lombok 的 @Data 注解或 Kotlin 中的 data class。

定位为 record 的类，会自动生成构造方法、成员属性值的方法、hashCode() 、euqals()、toString() 方法

```java
public record Person(String name, int age) {
    public static String address;

    public String getName() {
        return name;
    }
}
```

---

## Record Patterns

> Java 21 正式发布

有这么一个 Record 类

```java
record Person(String name, int age) {}
```

可以通过下面的方法解构

```java
private static void getNameAndAge(Object obj) {

    if (obj instanceof Person(String name, int age )) {
        System.out.println(name);
        System.out.println(age);
    }

}
```


---

## instanceof 模式匹配

> 在 Java 14 预览，Java 15 正式发布

以前：

```java
if (person instanceof Student) {
    Student student = (Student) person;
    student.say();
}
```

现在

```java
if (person instanceof Student student) {
    student.say();
}
```

后面可拼 `&&` 联合判断：

```java
if (person instanceof Student student && "jerry".equals(student.getName())) {
    student.say();
}
```

---

## 密封的类和接口

> 在 Java 15 预览，Java 16 正式发布

作用是限制类的层次结构

```java
// 添加 sealed 修饰符，只有这三个类可以继承
public sealed class Person permits Teacher, Worker, Student{ }

// 子类继续被 sealed 修饰
public sealed class Student permits HighSchoolStudent, MiddleSchoolStudent{ }

// 子类也可以被修饰为 non-sealed，此时谁都可以继承 Worker
non-sealed class Worker extends Person { }
```

---

## 虚拟线程（Virtual Threads）

> 在 Java 19 预览， Java 21 正式发布

Java 最开始设计的线程模型是，一个 Java 平台线程（Platform Thread）对应一个操作系统线程（OS Thread），在高并发程序中，这样的设计使得线程变得很昂贵，创建和回收的开销很大，于是人们设计了线程池，将线程重复利用。但是在高吞吐量下遇到IO操作时（如发起 Http 请求、JDBC 查询 等..），阻塞等待浪费了很多线程资源和时间。

于是 Java 提出了虚拟线程的概念，一个 Java 平台线程可以对应成千上万个虚拟线程 ，当遇到IO阻塞时，虚拟线程可以及时地切走，与之对应的 Java 平台线程和操作系统线程可以及时地执行其他代码。在其他编程语言中有类似的概念，称为协程，或应用级线程。

值得注意的是，虚拟线程只适用于高吞吐的IO密集型程序，不适用于CPU密集型程序，且虚拟线程不会提高单个线程的执行性能。

使用 `Executors` 创建虚拟线程：

```java
    try (ExecutorService myExecutor =  Executors.newVirtualThreadPerTaskExecutor()) {
        Future<?> future =  myExecutor.submit(() -> System.out.println("Running thread"));
        future.get();
        System.out.println("Task completed");
    } catch (InterruptedException | ExecutionException e) {
        
    }   
```

使用 `Thread.Builder` 创建虚拟线程：

```java
    Runnable task = () -> { System.out.println("Running thread") };

    try {
        Thread.Builder builder = Thread.ofVirtual().name("MyThread");
        Thread t = builder.start(task);
        System.out.println("Thread t name: " + t.getName());
        t.join();
    } catch (InterruptedException e) {

    }
```

---

## 垃圾回收期

Java 10 开始统一了垃圾回收接口，之后陆续新增更好的垃圾回收器

- **G1**：减少 Full GC
- **ZGC**：可伸缩低延迟，号称停顿时间不超过10ms
- **Epsilon**： 低开销垃圾回收器
- **Shenandoah**： openJDK的 ZGC ，适用于高吞吐和大内存场景，不适合高实时性场景
- **Generational ZGC**：增强的ZGC，年轻和年老的对象分别存放在不同的世代中，使得年轻的对象可以更加频繁的被回收（Java 21）

---


## 其他改进

- 新增JShell，一个交互式的Java编程环境，可以在命令行中直接执行Java代码片段（Java 9）
- 允许在接口中使用私有方法，用于被接口默认方法调用（Java 9）
- 新增 `java.util.concurrent.Flow` 反应式流（Java 9）
- 集合新增构造不可变集合的 `.of()` 工厂方法（Java 9）
- 线程局部管控，停止单个线程变成可能（Java 10）
- 重写 Java 内置的 HTTP 客户端，支持 HTTP/2，语法更现代化（Java 11）
- 支持 TLS 1.3 协议（Java 11）
- Socket API 重构（Java 13）
- 改进 NullPointerExceptions 提示信息，能够准确打印出具体哪个变量导致的空指针（Java 14）
- 支持隐藏类（Hidden Classes），为框架（frameworks）设计，不能直接被其他类的字节码使用，只能在运行时生成类并通过反射间接使用它们（Java 15）
- 增强伪随机数生成器 RandomGenerator（Java 17）
- 顺序集合(Sequenced Collections)（Java 21）

---

## 参考链接

- [♥Java8+特性知识体系详解♥](https://pdai.tech/md/java/java8up/java-8-up-overview.html)
- [Virtual Threads](https://docs.oracle.com/en/java/javase/20/core/virtual-threads.html#GUID-2DDA5807-5BD5-4ABC-B62A-A1230F0566E0)
- [Java 21 新特性和改进](https://zhuanlan.zhihu.com/p/632911790)