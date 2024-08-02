---
title: 给自己的 Linux 备忘
categories: Linux
tags: Linux
abbrlink: ee3d8fa1
date: 2017-09-24 14:28:00
updated: 2017-09-25 15:40:00
---

Linux 学习任重而道远，此文记录了我在 Linux 学习中需要知道或反复查阅使用的命令、表达式等内容，持续更新。


<!-- more -->

# 系统文件

## 常见目录

| 目录          | 作用                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/`           | 根目录，是所有文件和目录的起点。                                                                                                      |
| `/bin`        | 存放基本用户命令的二进制可执行文件，如 `ls`、`cp`、`mv` 等。                                                                            |
| `/boot`       | 存放启动引导程序相关的文件，如内核、初始 RAM 磁盘镜像等。                                                                               |
| `/dev`        | 包含设备文件，用于访问硬件设备，如硬盘、终端、输入设备等。                                                                             |
| `/etc`        | 存放系统配置文件和脚本，如网络配置文件、服务配置文件等。                                                                                  |
| `/home`       | 每个用户的主目录，用于存放用户的个人文件、配置等。                                                                                     |
| `/lib`        | 存放基本系统程序使用的共享库和内核模块。                                                                                               |
| `/media`      | 挂载可移动介质的挂载点，如 CD/DVD、U 盘等。                                                                                            |
| `/mnt`        | 临时挂载文件系统的挂载点，常用于手动挂载磁盘或网络文件系统。                                                                            |
| `/opt`        | 用于安装附加的第三方软件包，通常是可选的应用程序。                                                                                     |
| `/proc`       | 虚拟文件系统，提供内核和进程信息的接口，如系统信息和运行时数据。                                                                        |
| `/root`       | 超级用户（root）的主目录，类似于普通用户的 `/home/username` 目录。                                                                      |
| `/run`        | 用于存放系统运行时产生的临时文件和数据。                                                                                               |
| `/sbin`       | 存放系统管理命令的二进制可执行文件，通常只有 root 用户或具有管理员权限的用户才能执行这些命令。                                           |
| `/srv`        | 存放系统服务提供的数据，如 Web 服务数据。                                                                                              |
| `/sys`        | 虚拟文件系统，提供与硬件设备和内核模块交互的接口。                                                                                      |
| `/tmp`        | 临时文件目录，存放系统和用户创建的临时文件，系统重启时该目录下的文件通常会被清除。                                                       |
| `/usr`        | 存放用户级程序和数据，包括许多二级目录，如 `/usr/bin`（用户二进制文件）、`/usr/lib`（用户共享库）和 `/usr/share`（共享数据）。          |
| `/var`        | 存放可变数据文件，如日志文件、锁文件、邮箱、打印队列等。                                                                                 |

---

# 常用命令

## 常规命令

常规命令	| 说明
---|---
mkdir	myweb| 创建目录
mkdir -p myweb/www/static | 创建多级目录
rmdir	| 删除空目录
pwd	| 显示当前目录
touch a.txt	| 如果 a.txt 不存在，生成一个新的空文档a.txt。如果a.txt存在，那么只更改该文档的时间信息。
echo	| 创建带有内容的文件（见标准输出）
cat	| 查看文件内容（当文件太大无法一页展示时，用more）
more | 多屏查看文件内容 （ space-翻页 回车-下一行 q-退出）
less | 多屏可滚动查看文件内容 （space-翻页 回车-下一行 q-退出 up/down-上下滚动 居然还可以用鼠标666）
whatis ls	| 显示ls命令的作用
man ls	| 显示ls命令的手册（space翻页 j下行 k上行 /关键字搜索 n下一个关键字 shift+n上一个关键字）

## 文件系统命令

文件系统命令	| 说明
---|---
cd	| 切换目录
cp a.txt b.txt	| 拷贝. 在工作目录下，将a.txt复制到文件b.txt
mv a.txt c.txt	| 重命名 a.txt 为 c.txt
mv a.txt /home/jerrysheh	| 将 a.txt 移动到 /home/jerrysheh 目录下
rm	| 删除文件
rm -r	| 删除包括子目录和子文件 （-r 表示 recursive，递归）
rm -f	| 强制删除
apropos -e “list directory contents”	| 精确反查带有”“list directory contents”功能的命令
ll -h| 显示文件夹内文件详细信息
ls	| 显示当前目录下文件
ls -a	| 显示当前目录包括隐藏的文件
curl -o video.mp4 http:www.example.com/video.mp4 | 下载网络文件

## 压缩命令

压缩命令	| 说明
---|---
tar -zcvf xxxx.tar.gz  /home/test | 压缩 -z 有gzip属性的，，-c 压缩 -v 显示过程，-f 档案名（必须）
tar -zxvf xxxx.tar.gz -C /tmp    | 解压， -x 解压 ， 其他参数同上
zip -r mydata.zip mydata | 把 mydata 文件夹压缩 -r 递归（包括子目录）
unzip mydata.zip -d mydatabak | 解压 mydata.zip， -d 解压到指定目录

## 系统相关

系统相关	| 说明
---|---
shutdown now| 关机  
uname -a | 查看内核信息
dpkg -i xxx.deb | 安装已下载的.deb安装包

## 用户相关命令

用户相关(在root下操作)	| 说明
---|---
adduser jerry| 创建 jerry 用户（自动创建/home目录）
useradd jerry| 创建 jerry 用户 （需要手动配置/home目录）
passwd jerry | 给 jerry 用户设置密码
userdel jerry| 删除 jerry 用户

> Tips 1: 如果不知道一个命令是干嘛用的，可以用 `--help` 参数显示帮助，或者用 `man ls` 显示手册。如 `ls --help` 和 `man ls`。按 `q` 离开 man 环境。

> Tips 2: linux命令后面的参数，一般简写时是单横杠，如 `-h` ，全写是双横杠，如 `--help`。

---

# 关于 ls -l 命令

终端输入`ls -l`

返回

```
total 8
drwxrwxr-x 2 jerrysheh jerrysheh 4096 Mar 27 11:59 download
drwxr-xr-x 3 root      root      4096 Apr 30 10:26 www
```

## total

total 是所列出内容的磁盘占用空间总和值（kbytes）。

> 对于“占”的理解：数据在存放过程中占据的block的大小。比如，1个block占用4k，那8.7k数据，要用3个bolck来存储，也就占用12k空间。

## 每一行第一个字符

字符|含义
---|---
d|目录（dirtectory）
-|普通文件
c|字符设备文件(character)
l|链接文件
b|块设备文件(block)
p|命令管道文件，与shell编程有关
s|sock文件，与shell编程有关

块设备文件：

> 块设备文件(block)，一般置于/dev目录下，设备文件是普通文件和程序访问硬件设备的入口，是很特殊的文件。没有文件大小，只有一个主设备号和一个辅设备号。一次传输数据为一整块的被称为块设备，如硬盘、光盘等。最小数据传输单位为一个数据块(通常一个数据块的大小为512字节)

字符设备文件(character):

> 一般置于/dev目录下，一次传输一个字节的设备被称为字符设备，如键盘、字符终端等，传输数据的最小单位为一个字节。


---

# Linux 通配表达式

Linux 通配表达式 与 正则表达式 相类似，但语法有所不同。

命令	| 说明
---|---
×	|任意多个字符
？	|任意一个字符
[xyz]	|字符 x 或 y 或 z
[0-3]	|数字 0 到 3 其中一个
[b-e]	|字符 b 到 e 其中一个
[^mnp]	|不是 m 或 n 或 p 的 一个字符

不要在删除文件到时候多敲了一个空格，会删除当前整个目录下的文件～

```
$rm * .txt
```

---

# 文件权限相关

命令	|说明
---|---
sudo chmod 755 a.txt	|chmod = change mode ，改变 a.txt 的权限为 755
sudo chmod g-w a.txt | 删去 同组 的 写（write）权限
sudo chmod go+r b.txt | 同组 和 其他 用户 增加对 b.txt 的读取（read）权限

说明：
Linux中，每个文件都有 9 位读写执行的权限。分为三组，三位一组。分别对应拥有者用户(user)，拥有组(owner group)中的用户和所有其他用户(other)。 7 = 111（2进制），表示 User 有读/写/执行 的权限， 5 = 101（2进制），表示 Owner group 有 读/执行 的权限，但没有写的权限。见下表。


  十进制数	| 二进制数 | 权限
  ---|---|---
  755| 111 101 101 | user 可读/写/执行， group 和 other 只能读/执行，不能写
  710| 111 001 000 | user 可读/写/执行， group 只能执行， other没有任何权限

功能表

 参数	|说明
 ---|---
 u | 用户（user）
 g | 同组（group）
 o | 其他（other）
 a | 所有 （all） 默认值
 + | 增加权限
 - | 减少权限
 = | 给定唯一权限
 r | 读
 w | 写
 x | 可执行

---

# 快捷操作

命令	| 说明
---|---
ctrl+a	|定位到命令开头
ctrl+e	|定位到命令结尾
ctrl+ ←	|定位到上一个单词

---

# 标准输入，标准输出，标准错误，管道与重新定向

命令	|说明
---|---
ls > a.txt	|不将 ls 命令的结果输出到屏幕上，而是输出到 a.txt 文件里面
ls >> a.txt	|将 ls 命令的结果输出添加到 a.txt 文件的末尾
ls 2>> b.txt | 如果ls命令出错，报错信息输出到 b.txt 的末尾
ls > c.txt 2>&1| 将结果和错误（如果同时有）都输出到 c.txt
cat >>filetest 2>&1 <<END | 建立filetest文件，当输入遇到END时，退出
echo helloworld	|将 helloworld 这段文本输出到标准输出（屏幕）
echo helloworld > b.txt	|将 helloworld 这段文本输出到 b.txt 文件里面

> 由于STDOUT与STDERR都会默认显示在终端上，为了区分二者的信息，就有了编号的0，1，2的定义，用1表示STDOUT，2表示STDERR。  `2>&1`，指标准错误重新定向到标准输出，即将标准输出、标准错误指定为同一输出路径。其中， `&` 表示前面的命令放到后台执行。

## 管道

以将一个命令的输出导向另一个命令的输入，从而让两个(或者更多命令)像流水线一样连续工作，不断地处理文本流。

命令	| 说明
---|---
cat	|显示文件内容
wc	word count |统计文本中的行、词以及字符的总数


命令：
`$cat < a.txt | wc`

执行步骤：

1. 输入（标准输入被重定向为 a.txt ） → cat（处理） → 输出（作为wc命令的输入）
2. 输入（cat命令的输出） → wc（处理） → 输出（标准输出，屏幕）

执行结果：
```
jerrysheh@MI:~$ cat < a.txt | wc
      2       2      22
```

命令：
`$head -n 3 /etc/passwd | sort`

将 passwd 文件到前3行输出并排序

可以使用 `xargs` 参数，让管道接受命令行参数

```
echo /etc/nano | xargs -i cp {} /tmp/dir
```

将echo的输出作为参数，填入 cp 中的{}

---

# 使用 grep、cut、awk 过滤信息

## 1. 查看 ls 命令的 -l 参数用途

```bash
ls --help | grep " -l"
```

## 2. 查看 mkdir 命令的 -p 参数用途

```bash
mkdir --help | grep " -p"
```

## 3. 搜索 /usr/include 目录下，含有 int printf 的文件内容，输出到 /tmp/out.txt 上

```bash
grep -inr "int printf" /usr/include >> /tmp/out.txt
```

grep参数
- -i  忽略大小写
- -n  打印行号
- -r  包含子目录

## 4. 搜索 /usr/include 目录下，含有 int printf 的文件内容，用 cut 剪切每个搜索结果以冒号分隔的第一片


```bash
grep -inr "int printf" /usr/include | cut -d : -f 1
```

cut 参数：
- -d 分割
- -f 第几片

## 5. 搜索 acc 日志，过滤出 `/product/queryList` 接口响应大于 0.5 秒的请求


```
cat access_log.acc | awk -F" " '$3>0.5{print $0}' | grep "/product/queryList"
```

awk 参数：
- `-F" "`：以空格为分隔符
- `$3>0.5`：分隔后的第三列（响应时间所在的列）数值大于 0.5 
- `{print $0}`：打印整行

---

# vim

## vim命令相关

命令	|说明
---|---
:q	|退出
:q!	|强制退出
:wq	|保存并退出
:set number	|显示行号
:set nonumber	|隐藏行号
/apache	|在文档中查找apache, n 下一个，shift+n 上一个


## vim操作相关

命令	|说明
---|---
h	|左移
j	|下一行
k	|上一行
l	|右移
a |补充文本（修改完记得Esc退出编辑模式）
i |插入文本（修改完记得Esc退出编辑模式）
x |删除光标所指字符
ra|替换光标所指字符为a
u |撤销
U |撤销整行
0 （zero）|光标移动到行首
ce| 删除光标所指到单词末尾，并进入编辑模式
ctrl+F|下一页
ctrl+B|上一页
ctrl+E|下滚一行
ctrl+Y|上滚一行


命令	|说明
---|---
dw |从光标处删除至一个单字/单词的末尾
d2w |从光标处删除至两个单字/单词的末尾
d$ | 从光标处删除这一行光标后面的内容
2w|光标往前两个单词（单词词首）
2e|光标往前两个单词（单词词尾）
dd | 删除行
2dd |删除两行
ddp|删除光标所在行，光标移动到其他位置，粘贴
yyp	|复制光标所在行，光标移动到其他位置，粘贴
