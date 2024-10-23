---
title: redis
comments: false
createTime: 2024/10/23 23:28:04
permalink: /interview/redis/
---


# 1. redis为什么这么快？

1. redis 是内存式数据库，内存访问比硬盘访问至少快1000倍。
2. redis 使用了 IO 多路复用（IO multiplexing），读写数据使用单线程。
3. Redis 使用了简单而高效的数据结构。

# 2. redis 和 memcached 的区别？