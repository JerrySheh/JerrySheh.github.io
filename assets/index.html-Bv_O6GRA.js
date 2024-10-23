import{_ as h,c as d,f as a,a as e,b as s,d as l,e as n,r,o}from"./app-D22ydJtp.js";const c="/images/database/Engine.png",k="/images/SQL/1NF.jpg",g="/images/SQL/2NF.jpg",m="/images/SQL/3NF.jpg",y={};function u(b,i){const t=r("font"),p=r("RouteLink");return o(),d("div",null,[i[13]||(i[13]=a('<h1 id="存储引擎" tabindex="-1"><a class="header-anchor" href="#存储引擎"><span>存储引擎</span></a></h1><p>存储引擎是数据库的底层软件组织。不同的存储引擎提供不同的存储机制、索引技巧、锁定水平等功能，使用不同的存储引擎，可以获得其各自特定的功能。</p><h2 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb"><span>InnoDB</span></a></h2><p>InnoDB 是 MySQL 默认的存储引擎，它是面向在线事务处理(OLTP)的应用，被设计用来处理大量的短期（short-lived）事务。</p><p>特点：</p><ol><li>采用 MVCC（多版本并发控制）来支持高并发</li><li>支持事务，实现了 4 个事务隔离级别，默认级别是可重复读</li><li>通过间隙锁（next-key locking）防止幻读，间隙锁使得 InnoDB 不仅仅锁定查询涉及的行，还会对索引中的间隙进行锁定，防止幻影行的插入</li><li>聚簇索引，主键查询性能高，但二级索引（非主键索引）必须包含主键列，如果主键列很大，其他索引都会很大</li><li>存储格式平台独立</li><li>行锁设计</li><li>支持外键</li><li>支持一致性非锁定读（默认情况下读取操作不会产生锁）</li><li>提供了插入缓冲，二次写，内存自适应哈希索引，预读等高性能和高可用的功能</li><li>支持真正的热备份</li></ol><p>一句话概括：InnoDB的优势在于提供了良好的事务处理、崩溃修复能力和并发控制。缺点是读写效率较差，占用的数据空间相对较大。</p><h2 id="myisam" tabindex="-1"><a class="header-anchor" href="#myisam"><span>MyISAM</span></a></h2><p>MyISAM 存储引擎表由 .MYD 和 .MYI 组成，.MYD用来存放数据文件，.MYI用来存放索引文件，特点：</p><ul><li>不支持事务</li><li>表锁设计，读取共享锁，写入排他锁。但是在读取查询的同时也能插入记录（并发插入）</li><li>支持全文索引</li><li>压缩</li><li>空间函数（GIS）</li><li>它的缓冲池只缓冲索引文件，而不缓冲数据文件</li><li>崩溃后无法安全修复</li></ul><p>一句话概括：MyISAM的优势在于占用空间小，处理速度快。缺点是不支持事务的完整性和并发性。如果表经常读取，且不需要事务，MyISAM是合适的选择。</p><h2 id="memory" tabindex="-1"><a class="header-anchor" href="#memory"><span>MEMORY</span></a></h2><p>将表中的数据存放在内存中，如果数据库重启或发生崩溃，表中的数据库都将消失，它非常适合存储临时数据的临时表．默认采用哈希索引。</p><h2 id="三种存储引擎的比较" tabindex="-1"><a class="header-anchor" href="#三种存储引擎的比较"><span>三种存储引擎的比较</span></a></h2><p><img src="'+c+`" alt="Engine"></p><hr><h1 id="事务" tabindex="-1"><a class="header-anchor" href="#事务"><span>事务</span></a></h1><h2 id="什么是事务" tabindex="-1"><a class="header-anchor" href="#什么是事务"><span>什么是事务？</span></a></h2><p>事务就是由一组SQL语句组成的逻辑处理单元，一个事务中的SQL语句组，要么全部执行，要么全部不执行。</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">START transaction</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">SELECT</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ... </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">FROM</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ...</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">UPDATE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> checking </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">SET</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ...</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">DELETE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> savings </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">FROM</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ...</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">COMMIT</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务的自动提交-autocommit" tabindex="-1"><a class="header-anchor" href="#事务的自动提交-autocommit"><span>事务的自动提交（AUTOCOMMIT）</span></a></h2><p>如果不显式开始一个事务（<code>begin</code> 或 <code>start transaction</code> 语句），则每个查询都被当作一个事务执行提交操作。</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">SHOW VARIABLES </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">LIKE</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">AUTOCOMMIT</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">SET</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> AUTOCOMMIT </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">; </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">//</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> 或 </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">ON</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> 表示启用，</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> 或 </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">OFF</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> 表示禁用</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>在实践中，建议不要将 <code>AUTOCOMMIT</code> 设为 <code>0</code>，那样连接将保持长事务，直到你手动commit。下面的语句用于查询超过60s的事务：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">select</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> information_schema</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">.</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">innodb_trx</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> where</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> TIME_TO_SEC(timediff(</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,trx_started)) </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 60</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="事务的并发问题" tabindex="-1"><a class="header-anchor" href="#事务的并发问题"><span>事务的并发问题</span></a></h2><ol><li><strong>脏读</strong>：事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据</li><li><strong>不可重复读</strong>：事务 A 多次读取同一数据，事务 B 在事务A多次读取的过程中，对数据作了更新并提交，导致事务A多次读取同一数据时，结果不一致。</li><li><strong>幻读</strong>：事务A在读取某个范围内的记录时，事务B又在该范围内插入新的记录，事务A再次读取该范围的记录时会产生幻行。（两次不一致）</li></ol><p>不可重复读侧重于记录被修改，幻读侧重于新增或删除了记录。解决不可重复读的问题只需锁住满足条件的行，解决幻读需要锁表。</p><h2 id="事务的四大特征" tabindex="-1"><a class="header-anchor" href="#事务的四大特征"><span>事务的四大特征</span></a></h2><p>事务的四个基本特征：ACID</p>`,30)),e("ol",null,[i[4]||(i[4]=e("li",null,[e("strong",null,"原子性（Atomicity）"),s("：一个事务必须被视为不可分割的最小工作单元。一个事务中的所有操作，要么全部成功提交，要么全部失败回滚。不可能只执行其中的一部分操作。")],-1)),i[5]||(i[5]=e("li",null,[e("strong",null,"一致性（Consistent）"),s("：在事务开始和完成时，数据都必须保持一致状态，或者说从一个一致性状态转换到另一个一致性状态。不会出现查询开始时的数据跟查询到一半的数据不一样的情况。")],-1)),e("li",null,[i[1]||(i[1]=e("strong",null,"隔离性（Isolation）",-1)),i[2]||(i[2]=s("：数据库系统提供一定的隔离机制，保证事务在不受外部并发操作影响的独立环境执行。这意味着 ")),l(t,{color:"red"},{default:n(()=>i[0]||(i[0]=[s("事务处理过程中的中间状态对外部是不可见的，反之亦然。")])),_:1}),i[3]||(i[3]=s("事务隔离分为不同级别，包括未提交读（Read uncommitted）、提交读（read committed）、可重复读（repeatable read）和串行化（Serializable）。"))]),i[6]||(i[6]=e("li",null,[e("strong",null,"持久性（Durability）"),s(": 事务完成之后，它对于数据的修改是永久性的，即使出现系统故障也能够保持。")],-1))]),i[14]||(i[14]=a('<p><strong>事务的ACID特性可以确保银行不会弄丢你的钱，因此很重要。</strong></p><h2 id="事务的四种隔离级别-isolation-level" tabindex="-1"><a class="header-anchor" href="#事务的四种隔离级别-isolation-level"><span>事务的四种隔离级别（Isolation level）</span></a></h2><p>事务的隔离级别规定了哪些修改在事务内和事务间是可见的，哪些是不可见的。较低级别的隔离并发程度高，开销低。</p><h3 id="未提交读-read-uncommitted" tabindex="-1"><a class="header-anchor" href="#未提交读-read-uncommitted"><span>未提交读(read uncommitted)</span></a></h3><p>事务中的修改，即使未提交，对其他事务也都是可见的。<strong>事务可以读取未提交的数据，这也称为脏读（Dirty Read）</strong>。该级别性能不必其他级别好太多，带来的问题却不少，不建议使用。</p><h3 id="提交读-read-committed" tabindex="-1"><a class="header-anchor" href="#提交读-read-committed"><span>提交读(read committed)</span></a></h3><p>只有提交了，其他事务才能读到。即一个事务从开始到提交之前，所做的任何修改对其他事务都是不可见的。这个级别有时候叫做不可重复读，因为同一事务自己两次执行同样的查询，期间可能有其他事务修改并提交了数据，因此两次查询可能会得到不一样的结果。</p><h3 id="可重复读-repeatable-read" tabindex="-1"><a class="header-anchor" href="#可重复读-repeatable-read"><span>可重复读(repeatable read)</span></a></h3><p>解决了脏读问题，该级别保证了在同一个事务中多次读同样记录的结果是一致的，理论上无法解决幻读问题。(MySQL InnoDB通过 MVCC 解决幻读问题)。</p><p>该级别是 MySQL 的默认隔离级别。</p><h3 id="可串行化-serializable" tabindex="-1"><a class="header-anchor" href="#可串行化-serializable"><span>可串行化(serializable)</span></a></h3><p>它通过强制事务串行执行，避免了前面说的幻读的问题。该级别用得较少。</p>',12)),e("blockquote",null,[e("p",null,[l(p,{to:"/post/9faffbfd.html#%E6%94%B9%E5%8F%98%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB"},{default:n(()=>i[7]||(i[7]=[s("如何改变事务的隔离级别")])),_:1})])]),i[15]||(i[15]=a('<hr><h1 id="锁-并发控制" tabindex="-1"><a class="header-anchor" href="#锁-并发控制"><span>锁（并发控制）</span></a></h1><p>当数据库表同时被多个事务读写时，一个事务正在读取，另一个事务将记录删除了，将会导致不可预期的结果。因此，引入锁的概念来解决并发控制问题。</p><h2 id="锁的分类" tabindex="-1"><a class="header-anchor" href="#锁的分类"><span>锁的分类</span></a></h2><h3 id="共享锁和排他锁" tabindex="-1"><a class="header-anchor" href="#共享锁和排他锁"><span>共享锁和排他锁</span></a></h3><p>共享锁（shared lock）也叫做读锁，如果一个事务对数据对象A加了共享锁，其他事务只能读而不能写，直至当前事务释放该锁。</p><p>排他锁（exclusive lock）也叫做写锁，如果一个事务对数据对象A加了排他锁，其他事务不能再对A加锁，包括读和写，直至当前事务释放该锁。</p><h3 id="乐观锁和悲观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁和悲观锁"><span>乐观锁和悲观锁</span></a></h3><p>悲观锁假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作。而乐观锁假设不会发生并发冲突，只在提交操作时检查是否违反数据完整性。</p>',9)),e("p",null,[i[9]||(i[9]=s("乐观锁 ")),i[10]||(i[10]=e("strong",null,"不能",-1)),i[11]||(i[11]=s(" 解决脏读的问题。")),l(t,{color:"red"},{default:n(()=>i[8]||(i[8]=[s("所谓脏读，就是一个事务读取了另一个事务未提交的数据。")])),_:1}),i[12]||(i[12]=s("例如，事务T1更新了一行记录内容，但并没有提交修改。事务T2读取更新后的行，然后T1执行回滚操作。T2读取的行就无效了。"))]),i[16]||(i[16]=a('<h2 id="锁的粒度" tabindex="-1"><a class="header-anchor" href="#锁的粒度"><span>锁的粒度</span></a></h2><p>加锁也需要消耗资源，数据库的目标是存取数据，而不是花费大量的时间来管理锁。很多商业数据库通常都是在表上加行锁，但 MySQL 不同的存储引擎实现了不同的锁策略和锁粒度,提供了多种选择。</p><p>在 MySQL 中， MySQL有三种级别的锁定：</p><h3 id="表锁-table-lock" tabindex="-1"><a class="header-anchor" href="#表锁-table-lock"><span>表锁（table lock）</span></a></h3><p>实现逻辑简单，带来的系统负面影响最小。获取锁和释放锁的速度很快。由于表级锁一次会将整个表锁定，所以可以很好的避免死锁问题。当然，锁定颗粒度大所带来最大的负面影响就是出现锁定资源争用的概率也会最高，致使并发程度大打折扣。</p><h3 id="页锁-page-lock" tabindex="-1"><a class="header-anchor" href="#页锁-page-lock"><span>页锁（page lock）</span></a></h3><p>锁定颗粒度介于行级锁定与表级锁之间。页级锁定和行级锁定一样，会发生死锁。</p><h3 id="行级锁-row-lock" tabindex="-1"><a class="header-anchor" href="#行级锁-row-lock"><span>行级锁（row lock）</span></a></h3><p>锁定颗粒度很小，发生锁定资源争用的概率也最小。能够给予应用程序尽可能大的并发处理能力而提高一些需要高并发应用系统的整体性能。但由于锁定资源的颗粒度很小，所以每次获取锁和释放锁需要做的事情也更多，带来的消耗自然也就更大了。最容易发送死锁。</p><p>在 MySQL 中，行级锁只在存储引擎层实现，服务器层并不了解存储引擎中的锁是如何实现的。不同的存储引擎有不同的行锁实现。</p><h2 id="死锁问题" tabindex="-1"><a class="header-anchor" href="#死锁问题"><span>死锁问题</span></a></h2><ol><li>解决一：InnoDB 存储引擎一旦检测到死锁的循环依赖，就会立即返回一个错误。具体做法是，将持有最少行级排他锁的事务进行回滚。</li><li>解决二：当查询超时自动放弃锁请求，这种方式不太友好。</li></ol><p>锁的行为是存储引擎相关的，有些死锁是真正的数据冲突，而有些是存储引擎的实现导致的。</p><hr><h1 id="数据库三大范式" tabindex="-1"><a class="header-anchor" href="#数据库三大范式"><span>数据库三大范式</span></a></h1><h2 id="第一范式-1nf" tabindex="-1"><a class="header-anchor" href="#第一范式-1nf"><span>第一范式（1NF）</span></a></h2><p><strong>属性不可分</strong>。当关系模式R的所有属性都不能再分解为更基本的数据单位时，称R是满足第一范式的。</p><p>例如，某些数据库系统中需要用到“地址”这个属性，本来直接将“地址”属性设计成一个数据库表的字段就行。但是如果系统经常会访问“地址”属性中的“城市”部分，那么就有必要要将“地址”这个属性重新拆分为省份、城市、详细地址等多个部分进行存储，这样在对地址中某一部分操作的时候将非常方便。而“省份”、“城市”这些属性就是不可再分的了。</p><p>符合1NF的表</p><p><img src="'+k+'" alt=""></p><h2 id="第二范式-2nf" tabindex="-1"><a class="header-anchor" href="#第二范式-2nf"><span>第二范式（2NF）</span></a></h2><p><strong>符合1NF，并且表中的每列都和主键相关</strong>。也就是说，在一个数据库表中，一个表中只能保存一种数据，不可以把多种数据保存在同一张数据库表中。</p><p>符合2NF的表</p><p><img src="'+g+'" alt=""></p><h2 id="第三范式-3nf" tabindex="-1"><a class="header-anchor" href="#第三范式-3nf"><span>第三范式（3NF）</span></a></h2><p><strong>符合2NF，并且，消除传递依赖</strong>。即每一列数据都和主键直接相关，而不能间接相关。</p><p>符合3NF的表</p><p><img src="'+m+'" alt=""></p><p>参考：</p><ul><li>https://www.cnblogs.com/linjiqin/archive/2012/04/01/2428695.html</li><li>https://www.zhihu.com/question/24696366/answer/29189700</li></ul><h2 id="范式化的优缺点" tabindex="-1"><a class="header-anchor" href="#范式化的优缺点"><span>范式化的优缺点</span></a></h2><ul><li>优点：更新操作快，没有冗余数据（意味着更少的GROUP BY和 DISTINCT），表数据通常较少可以更好地放进内存因此执行操作更快</li><li>缺点：需要关联，同时可能使某些索引失效</li></ul><p>《高性能MySQL》中提到，实际中经常需要混用范式化和反范式化，不要极端地完全去范式化。</p><hr><h1 id="事务日志" tabindex="-1"><a class="header-anchor" href="#事务日志"><span>事务日志</span></a></h1><p>事务日志用于提高事务效率。</p><p>存储引擎修改表数据时，只需修改内存拷贝，然后把修改记录持久在硬盘的事务日志中，而不用每次都把修改的数据本身持久到硬盘中。之后把再内存修改的数据再慢慢刷回磁盘中。</p><hr><h1 id="mysql-binlog-和-redo-log" tabindex="-1"><a class="header-anchor" href="#mysql-binlog-和-redo-log"><span>MySQL binlog 和 redo log</span></a></h1><h2 id="redo-log" tabindex="-1"><a class="header-anchor" href="#redo-log"><span>redo log</span></a></h2><p>物理日志，是 InnoDB 引擎特有的，记录的是“在某个数据页上做了什么修改”这样的操作。</p><p>使用了 <code>WAL(Write-Ahead Logging)</code> 技术，即先写日志，再写磁盘。所以能支持崩溃修复（crash-safe）。</p><p><code>redo log</code> 是循环写的，重复利用空间。且采用追加写操作，是在硬盘中的一小块区域内顺序I/O，而不需要在多个地方随机I/O，所以速度快。</p><h2 id="binlog" tabindex="-1"><a class="header-anchor" href="#binlog"><span>binlog</span></a></h2><p>逻辑日志，是 Server 层日志，存储引擎无关，记录的是“给ID=2这一行的c字段加1”这样的操作。</p><p><code>binlog</code>是追加写的，适合归档保存，通常也用来恢复误删的数据。</p><p>MySQL事务有<code>两阶段提交</code>，即一个 update 语句，需要依次经过 redo log prepare、binlog、 redo log commit 三个步骤，保证两份日志的一致性。</p><hr><h1 id="多版本并发控制-mvcc" tabindex="-1"><a class="header-anchor" href="#多版本并发控制-mvcc"><span>多版本并发控制（MVCC）</span></a></h1><p>MVCC 是行锁的变种，使用 <strong>非阻塞读操作</strong> 在很多情况下避免了加锁，写操作也只锁定必要的行，因而开销更低。</p><p><strong>MVCC 是通过保存数据在某个时间点的快照来实现的</strong>。不管事务执行多少时间，每个事务看到的数据都是一致的。</p><h2 id="innodb-的-mvcc-实现" tabindex="-1"><a class="header-anchor" href="#innodb-的-mvcc-实现"><span>InnoDB 的 MVCC 实现</span></a></h2><p>在每行记录后面保存两个隐藏列。一个保存行的创建时间，一个保存行的过期时间（删除时间）。这里的时间，指的是系统版本号（事务启动时分配的ID），不是真正的时间。每开始一个事务，系统版本号都会递增。</p><ul><li><strong>SELECT</strong>：只查找早于当前版本的数据行，删除时间要么未定义，要么大于当前版本号。</li><li><strong>INSERT</strong>：为插入的行保存当前版本号。</li><li><strong>DELETE</strong>：为删除的行保存当前版本号，作为删除标志。</li><li><strong>UPDATE</strong>：先插入一行新记录作为新版本号，再保存当前版本号到原来的行作为行删除标志。</li></ul><p>MVCC的好处是读操作简单，性能好，不足是需要额外的存储空间和行检查、维护工作。</p><p>MVCC 只在提交读（READ COMMITTED）和可重复读（REPEATABLE READ）两个隔离级别下工作。</p><hr><p>参考：</p><ul><li>《高性能MySQL》</li></ul>',59))])}const E=h(y,[["render",u],["__file","index.html.vue"]]),v=JSON.parse('{"path":"/db/2d9ksj3y/","title":"MySQL的存储引擎、事务、锁","lang":"zh-CN","frontmatter":{"title":"MySQL的存储引擎、事务、锁","categories":["数据库","高性能MySQL"],"tags":["database"],"abbrlink":"4c81d70","createTime":"2018/09/09 19:37:13","permalink":"/db/2d9ksj3y/","description":"存储引擎 存储引擎是数据库的底层软件组织。不同的存储引擎提供不同的存储机制、索引技巧、锁定水平等功能，使用不同的存储引擎，可以获得其各自特定的功能。 InnoDB InnoDB 是 MySQL 默认的存储引擎，它是面向在线事务处理(OLTP)的应用，被设计用来处理大量的短期（short-lived）事务。 特点： 采用 MVCC（多版本并发控制）来支持...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/db/2d9ksj3y/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"MySQL的存储引擎、事务、锁"}],["meta",{"property":"og:description","content":"存储引擎 存储引擎是数据库的底层软件组织。不同的存储引擎提供不同的存储机制、索引技巧、锁定水平等功能，使用不同的存储引擎，可以获得其各自特定的功能。 InnoDB InnoDB 是 MySQL 默认的存储引擎，它是面向在线事务处理(OLTP)的应用，被设计用来处理大量的短期（short-lived）事务。 特点： 采用 MVCC（多版本并发控制）来支持..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jerrysheh.com/images/database/Engine.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"database"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL的存储引擎、事务、锁\\",\\"image\\":[\\"https://jerrysheh.com/images/database/Engine.png\\",\\"https://jerrysheh.com/images/SQL/1NF.jpg\\",\\"https://jerrysheh.com/images/SQL/2NF.jpg\\",\\"https://jerrysheh.com/images/SQL/3NF.jpg\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"InnoDB","slug":"innodb","link":"#innodb","children":[]},{"level":2,"title":"MyISAM","slug":"myisam","link":"#myisam","children":[]},{"level":2,"title":"MEMORY","slug":"memory","link":"#memory","children":[]},{"level":2,"title":"三种存储引擎的比较","slug":"三种存储引擎的比较","link":"#三种存储引擎的比较","children":[]},{"level":2,"title":"什么是事务？","slug":"什么是事务","link":"#什么是事务","children":[]},{"level":2,"title":"事务的自动提交（AUTOCOMMIT）","slug":"事务的自动提交-autocommit","link":"#事务的自动提交-autocommit","children":[]},{"level":2,"title":"事务的并发问题","slug":"事务的并发问题","link":"#事务的并发问题","children":[]},{"level":2,"title":"事务的四大特征","slug":"事务的四大特征","link":"#事务的四大特征","children":[]},{"level":2,"title":"事务的四种隔离级别（Isolation level）","slug":"事务的四种隔离级别-isolation-level","link":"#事务的四种隔离级别-isolation-level","children":[{"level":3,"title":"未提交读(read uncommitted)","slug":"未提交读-read-uncommitted","link":"#未提交读-read-uncommitted","children":[]},{"level":3,"title":"提交读(read committed)","slug":"提交读-read-committed","link":"#提交读-read-committed","children":[]},{"level":3,"title":"可重复读(repeatable read)","slug":"可重复读-repeatable-read","link":"#可重复读-repeatable-read","children":[]},{"level":3,"title":"可串行化(serializable)","slug":"可串行化-serializable","link":"#可串行化-serializable","children":[]}]},{"level":2,"title":"锁的分类","slug":"锁的分类","link":"#锁的分类","children":[{"level":3,"title":"共享锁和排他锁","slug":"共享锁和排他锁","link":"#共享锁和排他锁","children":[]},{"level":3,"title":"乐观锁和悲观锁","slug":"乐观锁和悲观锁","link":"#乐观锁和悲观锁","children":[]}]},{"level":2,"title":"锁的粒度","slug":"锁的粒度","link":"#锁的粒度","children":[{"level":3,"title":"表锁（table lock）","slug":"表锁-table-lock","link":"#表锁-table-lock","children":[]},{"level":3,"title":"页锁（page lock）","slug":"页锁-page-lock","link":"#页锁-page-lock","children":[]},{"level":3,"title":"行级锁（row lock）","slug":"行级锁-row-lock","link":"#行级锁-row-lock","children":[]}]},{"level":2,"title":"死锁问题","slug":"死锁问题","link":"#死锁问题","children":[]},{"level":2,"title":"第一范式（1NF）","slug":"第一范式-1nf","link":"#第一范式-1nf","children":[]},{"level":2,"title":"第二范式（2NF）","slug":"第二范式-2nf","link":"#第二范式-2nf","children":[]},{"level":2,"title":"第三范式（3NF）","slug":"第三范式-3nf","link":"#第三范式-3nf","children":[]},{"level":2,"title":"范式化的优缺点","slug":"范式化的优缺点","link":"#范式化的优缺点","children":[]},{"level":2,"title":"redo log","slug":"redo-log","link":"#redo-log","children":[]},{"level":2,"title":"binlog","slug":"binlog","link":"#binlog","children":[]},{"level":2,"title":"InnoDB 的 MVCC 实现","slug":"innodb-的-mvcc-实现","link":"#innodb-的-mvcc-实现","children":[]}],"readingTime":{"minutes":12.34,"words":3703},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/db/2.MySQL/2.MySQL的存储引擎、事务、锁.md"}');export{E as comp,v as data};
