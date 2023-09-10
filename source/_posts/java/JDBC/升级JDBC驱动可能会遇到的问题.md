---
title: 升级JDBC驱动可能会遇到的问题
categories:
  - Java
  - JDBC
abbrlink: 6b53f88a
date: 2023-08-09 20:41:42
---

最近因为项目使用的 MySQL 数据库升级，Java 应用所使用的 MySQL Connector/J 驱动程序也需要同步升级，然而升级后却遇到了一些问题...

<!-- more -->

## 升级版本号

> 5.1.44 --> 8.0.32

[5.1.44](https://dev.mysql.com/blog-archive/mysql-connectorj-5-1-44/) 是2017年8月30日发布的，而 [8.0.32](https://dev.mysql.com/doc/relnotes/connector-j/8.0/en/news-8-0-32.html) 发布于2023年1月17日，前后横跨了6年，可能会出现不兼容，所以生产环境升级需要非常谨慎。

> 注意，本文讨论的是 Java 程序使用的，用于连接 MySQL 服务器的驱动程序（客户端），即 MySQL Connector/J 的版本号，并非 MySQL 数据库的版本号。

---

## 问题1. 建立连接警告日志

```
Loading class `com.mysql.jdbc.Driver'. 
This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'.
The driver is automatically registered via the SPI and manual loading 
of the driver class is generally unnecessary.
```

意思就是新版本的驱动改了名字，只需要修改加载驱动的配置即可，如

```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

---

## 问题2. 默认时间类型由 Timestamp 变更为 LocalDatetime 


通常我们使用 Mybatis ，如数据库的字段是 datetime，应用程序使用 Map 接收

```java
Map<String, Object> resultMap = dao.getSomething(param);
Date d = (Date) resultMap.get("time");
```

此时会抛出一个异常

```
java.time.LocalDateTime cannot be cast to java.util.Date
```

原因是旧版本驱动使用 java.sql.TimeStamp（extends Date）进行构造，最后转化为Date类型，而新版本驱动直接使用了 java8 的 LocalDateTime。

解决办法是应用程序使用 LocalDateTime 来接收：

```java
LocalDateTime d = (LocalDateTime) resultMap.get("time");
```

或者在 Mybatis 的 xml 中配置 resultMap ，将指定字段映射为 Date 类型

```xml
<resultMap id="getByIdResultMap" type="User">
	<result property="time" column="time" javaType='java.util.Date'></result>
</resultMap>

<select id="getById" resultMap='getByIdResultMap'>
        SELECT
            t.time,
        FROM t
        WHERE ..
</select>
```

此外，多提一句，如果使用的是 oracle 数据库，并使用 ojdbc6 的驱动，那么无法将 LocalDateTime 落地到数据库的 date 类型，请升级 ojdbc 驱动或者把 LocalDateTime 在应用中转成 java.util.Date 。

---

## 问题3. 时间相差13小时

驱动从 5.1.x 升级到 8.0.x 后，如果不指定时区，可能会出现落库的时间比实际时间相差 13 个小时的情况。

这是因为不指定时区，数据库默认时区是 CST ，驱动会从数据库服务端取到该时区， 而 JDK 却误以为 CST 是美国芝加哥的时区 UTC-5，但国内的时间是 UTC+8，换算成US的时间就是，当前时间 - 8 - 5，即时间少 13 小时。

> CST 可以表示好多种时间，例如中国标准时间、美国中部时间、古巴标准时间、澳大利亚中部时间

MySQL Connector/J 在 [8.0.23](https://dev.mysql.com/doc/relnotes/connector-j/8.0/en/news-8-0-23.html) 版本中修复了这个问题，所以我们直接用高于 8.0.22 版本的驱动即可避免。

---

## 总结

可能还有一些问题我没遇到或未记录，例如 `useSSL` 的差异等。**但总而言之，在做比较大的升级前，多查阅官方更新日志，多提前搜索相关问题，生产环境上线前多多测试，甚至问问 chatgpt 还有什么需要注意的，可能都能帮助我们避免踩到坑**。问题总是会存在的，但态度和策略，以及思考如何将可能的影响降低到最小，能尽可能帮助我们把潜在的风险最小化。