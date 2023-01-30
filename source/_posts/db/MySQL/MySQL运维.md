---
title: MySQL运维
categories: 
- 数据库
- 高性能MySQL
tags: database
abbrlink: 9faffbfd
date: 2018-03-22 21:00:00
---

# MySQL 的大小写敏感

MySQL 使用文件系统的目录和文件来保存数据库和表的定义，因此大小写敏感与平台相关。在 Windows 下大小写不敏感，而类Unix系统则是敏感的。

---


# Ubuntu 18.04 安装 Mysql 5.7

注：如果要安装 Mysql 8.0 ，可以参考 [官方文档](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)

<!-- more -->

## 卸载和安装

干净卸载后安装

```
sudo apt-get --purge remove mysql-server mysql-common mysql-client
sudo apt-get install mysql-server
```

设置 root 密码

```
mysqladmin -u root password your-new-password
sudo /etc/init.d/mysql restart
```

或者，直接运行安全脚本配置

```
sudo mysql_secure_installation
```

## 安装完毕后发现没有登录权限

```
ERROR 1045: Access denied for user: 'root@localhost' (Using
password: YES)
```

首先无密码登录

```
sudo mysql -u root
```


然后查看当前用户，删除后重新创建 ROOT 账户，并授权

```sql
mysql> SELECT User,Host FROM mysql.user;

mysql> DROP USER 'root'@'localhost';

mysql> CREATE USER 'root'@'%' IDENTIFIED BY '123456';

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

mysql> FLUSH PRIVILEGES;
```

## 允许远程访问

```sql
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

mysql> FLUSH PRIVILEGES;
```

打开 /etc/mysql/mysql.conf.d/mysqld.cnf 文件

```
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

把 bind-address 改为 0.0.0.0

```
#bind-address = 127.0.0.1
bind-address = 0.0.0.0
```

---

# 修改ROOT密码

## 方法1： 用SET PASSWORD命令

```
MySQL -u root
mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('newpass');
```

## 方法2：用mysqladmin

```
mysqladmin -u root password "newpass"
```

如果root已经设置过密码，采用如下方法

```
mysqladmin -u root password oldpass "newpass"
```

---

# 如何导入数据库文件

假设我们已经有了一个数据库脚本， projectDB.sql，如何导入到MySQL？

方法一：直接通过 mysql 命令运行

```
mysql -u root -p123456 --port 3306 < /home/jerrysheh/projectDB.sql
```

方法二：登录 mysql 后使用 source 命令

```
mysql>create database <database-name>;
mysql>use <database-name>;
mysql>source /home/jerrysheh/projectDB.sql;
```

## 解决导入慢的问题

当数据库非常大（>100M）时，导入时间可能要花费几小时，优化方式如下：

假设要讲A数据库的数据导入到B数据库

1、首先确定目标库(B)的参数值，登录数据库B，执行以下命令

```
mysql>show variables like 'max_allowed_packet';
mysql>show variables like 'net_buffer_length';
```

2、根据参数值，在A数据库中使用 mysqldump 命令，如：

```
C:\Program Files\MySQL\MySQL Server 8.0\bin>mysqldump.exe -uroot -p mall  -e --max_allowed_packet=67108864 --net_buffer_length=16384 > mall.sql
```

各个参数的意思：

- **-e**： 使用包括几个VALUES列表的多行INSERT语法;
- **--max_allowed_packet=XXX**：客户端/服务器之间通信的缓存区的最大大小;
- **--net_buffer_length=XXX**：TCP/IP和套接字通信缓冲区大小,创建长度达net_buffer_length的行。

注意：max_allowed_packet和net_buffer_length不能比目标数据库的设定数值大，否则可能出错。

3、登录数据库B，执行 source 命令导入

---

# 修改默认字符集

```SQL
ALTER DATABASE db_name CHARACTER SET utf8mb4;
ALTER TABLE db_name DEFAULT CHARACTER SET utf8mb4;
ALTER TABLE db_name CONVERT TO CHARACTER SET utf8mb4;
```

---

# 改变事务的隔离级别

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

### 如何修改 MySQL 隔离级别

1. 查看当前会话隔离级别

```sql
select @@tx_isolation;
```

2. 查看系统当前隔离级别

```sql
select @@global.tx_isolation;
```

3. 设置当前会话隔离级别

```sql
set session transaction isolatin level repeatable read;
```

4. 设置系统当前隔离级别

```sql
set global transaction isolation level repeatable read;
```

---

# MySQL 线程状态

使用 `SHOW FULL PROCESSLIST;` 命令查看当前正在运行的线程，常见的状态如下：

状态 | 释义
---|---
Checking table | 正在检查数据表(这是自动的)
Closing tables | 正在将表中修改的数据刷新到磁盘中，同时正在关闭已经用完的表。这是一个很快的操作，如果不是这样的话，就应该确认磁盘空间是否已经满了或者磁盘是否正处于重负中。
Connect Out | 复制从服务器正在连接主服务器
Copying to tmp table on disk | 由于临时结果集大于 tmp_table_size，正在将临时表从内存存储转为磁盘存储以此节 省内存
Creating tmp table |正在创建临时表以存放部分查询结果
deleting from main table | 服务器正在执行多表删除中的第一部分，即删除主表，并保存要用于删除关联表的相关列和偏移量
deleting from reference tables | 服务器正在执行多表删除中的第二部分，正在删除其他表的记录
Flushing tables | 正在执行 FLUSH TABLES，等待其他线程关闭数据表
Killed | 发送了一个kill请求给某线程，那么这个线程将会检查kill标志位，同时会放弃下一个kill请求。MySQL会在每次的主循环中检查kill标志位，不过有些情况下该线程可能会过一小段才能死掉。如果该线程程被其他线程锁住了，那么kill请求会在锁释放时马上生效
Locked | 被其他查询锁住了
<font color="red"> Sending data </font> | 正在处理 SELECT 查询的记录，同时正在把结果发送给客户端。由于在此状态期间发生的操作往往会执行大量磁盘访问（读取），因此它通常是给定查询生命周期内运行时间最长的状态
Sorting for group | 正在为 GROUP BY 做排序
Sorting for order | 正在为 ORDER BY 做排序
Opening tables | 正尝试打开一个表。这个过程应该会很快，除非受到其他因素的干扰。例如，在执 ALTER TABLE 或 LOCK TABLE 语句行完以前，数据表无法被其他线程打开
Removing duplicates | 正在执行一个 SELECT DISTINCT 方式的查询，但是MySQL无法在前一个阶段优化掉那些重复的记录。因此，MySQL需要再次去掉重复的记录，然后再把结果发送给客户端。
Reopen table | 获得了对一个表的锁，但是必须在表结构修改之后才能获得这个锁。已经释放锁，关闭数据表，正尝试重新打开数据表
Repair by sorting | 修复指令正在排序以创建索引
Repair with keycache | 修复指令正在利用索引缓存一个一个地创建新索引。它会比 Repair by sorting 慢些
Searching rows for update | 正在讲符合条件的记录找出来以备更新。它必须在 UPDATE 要修改相关的记录之前就完成了
Sleeping | 正在等待客户端发送新请求
System lock | 正在等待取得一个外部的系统锁。如果当前没有运行多个mysqld服务器同时请求同一个表，那么可以通过增加 --skip-external-locking参数来禁止外部系统锁

更多细节可参考[官方文档](https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html)

---

参考：

- [MySQL SQL慢查询优化经历与处理方案](https://www.51cto.com/article/540613.html)