import{_ as l,c as t,f as a,a as o,b as r,d as i,e as s,r as d,o as p}from"./app-D22ydJtp.js";const h={};function c(g,e){const n=d("font");return p(),t("div",null,[e[7]||(e[7]=a('<h1 id="_1-存储引擎有哪些" tabindex="-1"><a class="header-anchor" href="#_1-存储引擎有哪些"><span>1. 存储引擎有哪些？</span></a></h1><ol><li>InnoDB</li></ol><p>MySQL默认引擎。支持事务、高并发能力（MVCC）、崩溃修复能力、行锁、聚簇索引。底层B+树实现，页结点就是数据本身。</p><ol start="2"><li>MyISAM</li></ol><p>读取速度快，但不支持事务，崩溃修复能力差，表锁，非聚簇索引（索引和数据分开，.MYD用来存放数据文件，.MYI用来存放索引文件）。底层也是B+树，但页节点是指针。</p><ol start="3"><li>如何选择？</li></ol><p>如果表经常读取，且不需要事务，MyISAM是合适的选择。如果需要事务和崩溃安全修复，必须选 InnoDB。</p><hr><h1 id="_2-mvcc-是什么" tabindex="-1"><a class="header-anchor" href="#_2-mvcc-是什么"><span>2. MVCC 是什么？</span></a></h1><p>多版本并发控制。通过保存数据在某个时间点的快照来实现非锁并发控制。不管事务执行多少时间，每个事务看到的数据都是一致的。在InnoDB中，MVCC的实现是：在每行记录后面保存两个隐藏列。一个保存行的创建时间，一个保存行的过期时间（删除时间）。</p><hr><h1 id="_3-索引是什么" tabindex="-1"><a class="header-anchor" href="#_3-索引是什么"><span>3.索引是什么？</span></a></h1><p>索引是帮助提高查询效率的数据结构。从底层实现的角度，索引包括 BTree索引 和 Hash索引，InnoDB和MyISAM只支持BTree索引，Meemory两种都支持。从功能的角度，索引分为普通索引、唯一索引、组合索引、空间索引、全文索引。从结构组织的角度，索引分为聚簇索引和非聚簇索引。</p><hr><h1 id="_4-什么时候该创建索引" tabindex="-1"><a class="header-anchor" href="#_4-什么时候该创建索引"><span>4. 什么时候该创建索引？</span></a></h1><ol><li><strong>主键</strong>：对于主键，会自动建立一个唯一索引，以保证值唯一</li><li><strong>频繁查询</strong>：对于频繁查询的表或字段，建立索引无疑会提高查询效率</li><li><strong>查询中需要排序的字段</strong>：使用索引去访问排序字段将大大提高排序速度</li><li><strong>查询中需要统计或者分组字段</strong></li></ol><hr><h1 id="_5-什么时候不该使用索引" tabindex="-1"><a class="header-anchor" href="#_5-什么时候不该使用索引"><span>5. 什么时候不该使用索引？</span></a></h1><ol><li>表记录太少</li><li>查询少，增删改多的字段（因为修改字段的同时还要动态维护索引）</li><li>WHERE 条件用不到的字段不需要索引</li><li>过滤性（选择性）不好的字段不适合使用索引，例如0/1，男/女</li></ol><hr><h1 id="_6-什么时候索引会失效" tabindex="-1"><a class="header-anchor" href="#_6-什么时候索引会失效"><span>6. 什么时候索引会失效？</span></a></h1><p>索引可以包含多个列的值，但是列的顺序十分重要，MySQL只能高效地使用索引的最左前缀列。</p><ol><li>WHERE 条件有 不等于号</li><li>WHERE 条件使用了表达式或函数，如<code>SELECT actor_id FROM sakila.actor WHERE actor_id + 1 = 5;</code></li><li>JOIN中，MySQL只有在 <strong>主键和外键的数据类型相同</strong> 时才能使用索引，否则无效</li><li><code>LIKE ‘abc%’</code>，MYSQL将使用索引；但 <code>LIKE ‘%abc’</code>，MySQL将不使用索引。</li><li>使用 OR 一般会使索引失效</li><li>如果列类型是字符串，那一定要在条件中将数据使用引号引用起来，否则不使用索引。</li></ol><p>对于基于BTree的组合索引，<strong>非最左</strong>、<strong>跳过列</strong>、<strong>范围查询</strong> 都会使索引失效。</p><hr><h1 id="_7-什么是事务" tabindex="-1"><a class="header-anchor" href="#_7-什么是事务"><span>7. 什么是事务？</span></a></h1><p>事务就是由一组SQL语句组成的逻辑处理单元，一个事务中的SQL语句组，要么全部执行，要么全部不执行。</p><hr><h1 id="_8-事务有哪些并发问题" tabindex="-1"><a class="header-anchor" href="#_8-事务有哪些并发问题"><span>8. 事务有哪些并发问题？</span></a></h1><ol><li><strong>脏读</strong>：事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据</li><li><strong>不可重复读</strong>：事务 A 多次读取同一数据，事务 B 在事务A多次读取的过程中，对数据作了更新并提交，导致事务A多次读取同一数据时，结果不一致。</li><li><strong>幻读</strong>：事务A在读取某个范围内的记录时，事务B又在该范围内插入新的记录，事务A再次读取该范围的记录时会产生幻行。（两次不一致）</li></ol><p>不可重复读侧重于记录被修改，幻读侧重于新增或删除了记录。解决不可重复读的问题只需锁住满足条件的行，解决幻读需要锁表。</p><hr><h1 id="_9-事务的四大特征是" tabindex="-1"><a class="header-anchor" href="#_9-事务的四大特征是"><span>9. 事务的四大特征是？</span></a></h1><p>A、C、I、D</p>',34)),o("ol",null,[e[4]||(e[4]=o("li",null,[o("strong",null,"原子性（Atomicity）"),r("：一个事务必须被视为不可分割的最小工作单元。一个事务中的所有操作，要么全部成功提交，要么全部失败回滚。不可能只执行其中的一部分操作。")],-1)),e[5]||(e[5]=o("li",null,[o("strong",null,"一致性（Consistent）"),r("：在事务开始和完成时，数据都必须保持一致状态。不会出现查询开始时的数据跟查询到一半的数据不一样的情况。")],-1)),o("li",null,[e[1]||(e[1]=o("strong",null,"隔离性（Isolation）",-1)),e[2]||(e[2]=r("：数据库系统提供一定的隔离机制，保证事务在不受外部并发操作影响的独立环境执行。这意味着 ")),i(n,{color:"red"},{default:s(()=>e[0]||(e[0]=[r("事务处理过程中的中间状态对外部是不可见的，反之亦然。")])),_:1}),e[3]||(e[3]=r("事务隔离分为不同级别，包括读未提交（Read uncommitted）、提交读（read committed）、可重复读（repeatable read）和串行化（Serializable）。"))]),e[6]||(e[6]=o("li",null,[o("strong",null,"持久性（Durability）"),r(": 事务完成之后，它对于数据的修改是永久性的，即使出现系统故障也能够保持。")],-1))]),e[8]||(e[8]=a('<hr><h1 id="_10-事务的隔离级别" tabindex="-1"><a class="header-anchor" href="#_10-事务的隔离级别"><span>10. 事务的隔离级别？</span></a></h1><p>事务的隔离级别规定了哪些修改在事务内和事务间是可见的，哪些是不可见的。较低级别的隔离并发程度高，开销低。</p><ol><li><strong>未提交读(Read uncommitted)</strong>：事务中的修改，即使未提交，对其他事务也都是可见的。事务可以读取未提交的数据，这也称为 <strong>脏读</strong>（Dirty Read）。该级别很少被使用。</li><li><strong>提交读(read committed)</strong>：一个事务从开始到提交之前，所做的任何修改对其他事务都是不可见的，这个级别有时候叫做不可重复读，因为同一事务自己两次执行同样的查询，期间可能有其他事务修改并提交了数据，因此两次查询可能会得到不一样的结果。</li><li><strong>可重复读(repeatable read)</strong>：解决了脏读问题，该级别保证了在同一个事务中多次读同样记录的结果是一致的，理论上无法解决幻读问题。</li><li><strong>可串行化(Serializable)</strong>:它通过强制事务串行执行，避免了前面说的幻读的问题。该级别用得较少。</li></ol><p>MySQL 默认的事务隔离是第 3 级别，可重复读。</p><hr><h1 id="_11-死锁问题怎么解决" tabindex="-1"><a class="header-anchor" href="#_11-死锁问题怎么解决"><span>11. 死锁问题怎么解决？</span></a></h1><ul><li>当查询超时自动放弃锁请求，这种方式不太友好。</li><li>InnoDB 的做法是，将持有最少行级排他锁的事务进行回滚。</li></ul><hr><h1 id="_12-共享锁的排他锁" tabindex="-1"><a class="header-anchor" href="#_12-共享锁的排他锁"><span>12. 共享锁的排他锁</span></a></h1><p>共享锁（shared lock）也叫做读锁，如果一个事务对数据对象A加了共享锁，其他事务只能读而不能写，直至当前事务释放该锁。</p><p>排他锁（exclusive lock）也叫做写锁，如果一个事务对数据对象A加了排他锁，其他事务不能再对A加锁，包括读和写，直至当前事务释放该锁。</p><hr><h1 id="_13-乐观锁和悲观锁" tabindex="-1"><a class="header-anchor" href="#_13-乐观锁和悲观锁"><span>13. 乐观锁和悲观锁</span></a></h1><p>乐观锁假设不会发生并发冲突，只在提交操作时检查是否违反数据完整性。注意，乐观锁 <strong>不能</strong> 解决脏读的问题。所谓脏读，就是一个事务读取了另一个事务未提交的数据。</p><p>悲观锁假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作。</p><hr><h1 id="_14-数据库三大范式" tabindex="-1"><a class="header-anchor" href="#_14-数据库三大范式"><span>14. 数据库三大范式</span></a></h1><ul><li><strong>第一范式</strong>：字段不可再分</li><li><strong>第二范式</strong>：符合1NF，并且表中的每列都和主键相关。即一个表中只能保存一种数据，不可以把多种数据保存在同一张数据库表中。</li><li><strong>第三范式</strong>：符合2NF，并且，消除传递依赖。即每一列数据都和主键直接相关，而不能间接相关。</li></ul><hr><h1 id="_15-什么是事务日志" tabindex="-1"><a class="header-anchor" href="#_15-什么是事务日志"><span>15. 什么是事务日志</span></a></h1><p>事务日志用于提高事务效率。存储引擎修改表数据时，只需修改内存拷贝，然后把修改记录持久在硬盘的事务日志中，而不用每次都把修改的数据本身持久到硬盘中。之后把再内存修改的数据再慢慢刷回磁盘中。</p><hr><h1 id="_16-大表优化" tabindex="-1"><a class="header-anchor" href="#_16-大表优化"><span>16. 大表优化</span></a></h1><ol><li>限制查询范围</li><li>读写分离</li><li>分库分表</li></ol><hr><h1 id="_17-谈谈分库分表" tabindex="-1"><a class="header-anchor" href="#_17-谈谈分库分表"><span>17. 谈谈分库分表？</span></a></h1><p>垂直拆分和水平拆分。</p><p><strong>垂直拆分</strong>是把一个很多列的表拆分成多个表，使列数据变小，优点是在查询时减少读取的Block数，减少I/O次数，同时可以简化表的结构，易于维护。缺点是会引起Join操作，事务变得更加复杂，可以通过在应用层进行Join来解决。</p><p><strong>水平拆分</strong> 是把一个很多行的表拆分到不同的分表和分库中去。常见的做法有<strong>客户端代理</strong>（如Sharding-JDBC）和 <strong>中间件代理</strong>（如MyCAT）。</p><hr><h1 id="_18-分库分表后主键怎么处理" tabindex="-1"><a class="header-anchor" href="#_18-分库分表后主键怎么处理"><span>18. 分库分表后主键怎么处理？</span></a></h1><ol><li><strong>UUID</strong>：不建议，无序，对mysql聚簇索引来说读写效率低</li><li><strong>自增id</strong>：需要独立部署在不同的mysql服务器</li><li><strong>redis</strong>：性能比较好，灵活方便，不依赖于数据库，但引入了新的组件造成系统更加复杂</li><li>Twitter的<a href="https://github.com/twitter-archive/snowflake%E3%80%82" target="_blank" rel="noopener noreferrer">snowflake</a>算法</li><li>美团的<a href="https://tech.meituan.com/2017/04/21/mt-leaf.html" target="_blank" rel="noopener noreferrer">Leaf分布式ID生成系统</a></li></ol><hr><h1 id="_19-binlog-和-redo-log-的区别" tabindex="-1"><a class="header-anchor" href="#_19-binlog-和-redo-log-的区别"><span>19. binlog 和 redo log 的区别？</span></a></h1><ul><li><code>redo log</code> 是物理日志，是 InnoDB 引擎特有的，记录的是“在某个数据页上做了什么修改”这样的操作。使用了 <code>WAL(Write-Ahead Logging)</code> 技术，即先写日志，再写磁盘。所以能支持崩溃修复（crash-safe）。<code>redo log</code> 是循环写的，重复利用空间。之所以要有 redo log，是为了性能考虑，一个事务完成后，只写 redo log 就行了，后续将多个事务的变更刷到磁盘进去。</li><li><code>binlog</code> 是逻辑日志，是 Server 层日志，存储引擎无关，记录的是“给ID=2这一行的c字段加1”这样的写操作。<code>binlog</code>是追加写的，适合归档保存，通常也用来恢复误删的数据，还有主从复制。</li></ul><p>MySQL事务有<code>两阶段提交</code>，即一个 update 语句，需要依次经过 redo log prepare、binlog、 redo log commit 三个步骤，保证两份日志的一致性。</p><hr><h1 id="_20-给表加字段有什么要注意的" tabindex="-1"><a class="header-anchor" href="#_20-给表加字段有什么要注意的"><span>20. 给表加字段有什么要注意的？</span></a></h1><p>注意长事务。表的CRUD操作会默认加一个元数据读写锁（MDL），如果表加字段的时刻该表有长事务语句，加字段这个操作会被阻塞，而后续所有读写操作又都被DDL阻塞。导致整张表不可用。</p><p>解决办法：在alter table语句里面设定等待时间，如果在这个指定的等待时间里面能够拿到MDL写锁最好，拿不到也不要阻塞后面的业务语句，先放弃。之后开发人员或者DBA再通过重试命令重复这个过程。</p><p>但是 MySQL 5.6+ 提供了 Online DDL 功能，可以避免这个问题。</p><h1 id="_21-慢sql如何优化" tabindex="-1"><a class="header-anchor" href="#_21-慢sql如何优化"><span>21. 慢SQL如何优化？</span></a></h1><p>先看执行计划：</p><ol><li>关注 <code>type</code> 列，有 <code>all</code>（全表扫描）、<code>index</code>（全索引扫描）、<code>range</code>（范围查找）说明性能差</li><li>看 <code>possible_keys</code> 和 <code>key</code> 列，看是否使用了索引，没有索引是否能建合适的索引？</li><li>看 <code>rows</code> 列， mysql 扫描了多少行， <code>filterd</code> 列看过滤性</li><li>看 <code>extra</code> 列，是否有 <code>Using temporary</code>(临时表)、<code>Using Where</code>（条件过滤）、<code>Using filesort</code>（文件排序），能否消除？</li></ol><p>通常，大部分的慢SQL都能通过建立合适的索引来优化：</p><ol><li>业务SQL中，Where 条件和 Order by 排序用到的字段，通常可以建索引</li><li>是否用了 OR 等导致索引失效，能否改写SQL，拆分SQL</li><li>是否可以建多字段的组合索引，实现覆盖索引</li></ol>',47))])}const _=l(h,[["render",c],["__file","index.html.vue"]]),b=JSON.parse('{"path":"/interview/db/","title":"数据库SQL了然于心","lang":"zh-CN","frontmatter":{"title":"数据库SQL了然于心","createTime":"2024/10/19 21:13:51","permalink":"/interview/db/","description":"1. 存储引擎有哪些？ InnoDB MySQL默认引擎。支持事务、高并发能力（MVCC）、崩溃修复能力、行锁、聚簇索引。底层B+树实现，页结点就是数据本身。 MyISAM 读取速度快，但不支持事务，崩溃修复能力差，表锁，非聚簇索引（索引和数据分开，.MYD用来存放数据文件，.MYI用来存放索引文件）。底层也是B+树，但页节点是指针。 如何选择？ 如果...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/interview/db/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"数据库SQL了然于心"}],["meta",{"property":"og:description","content":"1. 存储引擎有哪些？ InnoDB MySQL默认引擎。支持事务、高并发能力（MVCC）、崩溃修复能力、行锁、聚簇索引。底层B+树实现，页结点就是数据本身。 MyISAM 读取速度快，但不支持事务，崩溃修复能力差，表锁，非聚簇索引（索引和数据分开，.MYD用来存放数据文件，.MYI用来存放索引文件）。底层也是B+树，但页节点是指针。 如何选择？ 如果..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-23T15:38:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-23T15:38:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据库SQL了然于心\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-23T15:38:18.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":10.08,"words":3024},"git":{"createdTime":1729697898000,"updatedTime":1729697898000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/interview/db/index.md"}');export{_ as comp,b as data};
