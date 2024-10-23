import{_ as h}from"./classloader-B29GJQSk.js";import{_ as p,c as r,f as n,a as i,b as a,d as e,e as t,r as d,o as k}from"./app-D22ydJtp.js";const o="/images/Java/dotclass.png",c="/images/Java/JVM.png",g="/images/Java/JVM_component.png",v="/images/Java/load.png",y="/images/Java/how_classloader_load_class.png",u={};function m(B,s){const l=d("font");return k(),r("div",null,[s[8]||(s[8]=n('<h1 id="什么是java虚拟机" tabindex="-1"><a class="header-anchor" href="#什么是java虚拟机"><span>什么是Java虚拟机</span></a></h1><p>Java的理念是“一次编译，到处运行”。我们平时编写的 Java 代码，经过Java编译器编译后会生成一种 .class 文件，称为字节码文件。<strong>Java虚拟机（Java Virtual Machine，JVM）</strong> 就是负责将字节码文件翻译成特定平台下的机器码然后运行的软件，其本身是由C/C++编写。</p><p><img src="'+o+'" alt="dotclass"></p><h2 id="jvm-如何让-java-程序跨平台" tabindex="-1"><a class="header-anchor" href="#jvm-如何让-java-程序跨平台"><span>JVM 如何让 Java 程序跨平台？</span></a></h2><p>JVM 将字节码翻译成机器码然后运行，也就是说，只要在不同平台上安装对应的 JVM，就可以运行字节码文件，运行我们编写的 Java 程序。</p>',5)),i("p",null,[s[1]||(s[1]=a("而这个过程，我们编写的 Java 程序没有任何改变，仅仅是通过 JVM 这一 “中间层” ，就能在不同平台上运行，真正实现了 “一次编译，到处运行” 的目的。 ")),e(l,{color:"red"},{default:t(()=>s[0]||(s[0]=[a(" 需要注意的是，JVM 本身是用 C/C++ 开发的，是编译后的机器码，不能跨平台，不同平台下需要安装不同版本的 JVM。")])),_:1})]),s[9]||(s[9]=n('<p><img src="'+c+'" alt="JVM"></p><h2 id="jvm的-无关性" tabindex="-1"><a class="header-anchor" href="#jvm的-无关性"><span>JVM的“无关性”</span></a></h2><p>JVM 是 <strong>平台无关的</strong>，即不同的操作系统安装的是不同的JVM，但作用一样。JVM 还是 <strong>语言无关的</strong>。Java 源代码通过javac编译器编译成 .class 文件，之后 JVM 执行 .class 文件从而程序开始运行。也就是说，JVM 只认识 .class 文件，而不管何种语言生成了 .class 文件，只要 class 文件符合 JVM 的规范就能运行。因此，除了 Java 之外，像 Scala、Kotlin、Jython 等语言也能够运行在 JVM 上。</p><hr><h1 id="jvm的组成" tabindex="-1"><a class="header-anchor" href="#jvm的组成"><span>JVM的组成</span></a></h1><p>JVM由四个部分组成：</p><ul><li><strong>类加载器</strong>：负责在 JVM 启动时或者类运行时将需要的类加载到 JVM 中</li><li><strong>内存区域</strong>：将内存划分为几个区域，模拟实际机器上的存储、记录和调度</li><li><strong>执行引擎</strong>：执行字节码指令，相当于实际机器上的 CPU</li><li><strong>本地方法调用</strong>：调用 C/C++ 实现的本地方法</li></ul><p><img src="'+g+'" alt="JVM_component"></p><hr><h1 id="类加载器" tabindex="-1"><a class="header-anchor" href="#类加载器"><span>类加载器</span></a></h1><h2 id="类加载器的作用" tabindex="-1"><a class="header-anchor" href="#类加载器的作用"><span>类加载器的作用</span></a></h2><p>编译器生成的许多 .class 字节码文件，其实就是一个个的 Java 类。类加载器负责读取这些字节码，加载进JVM的方法区，并在内存中生成 java.lang.Class 类的一个实例对象作为外界访问这个类的接口。每个这样的实例用来表示一个 Java 类。通过此实例的 newInstance() 方法就可以创建出该类的一个对象。实际的情况可能更加复杂，比如 Java 字节代码可能是通过工具动态生成的，也可能是通过网络下载的。</p><blockquote><p>在 JDK 6 中，java.lang.Class 类的实例对象是放在方法区的，但是在 JDK 7 和 8 中放在堆里面。</p></blockquote><h2 id="类加载器如何加载-class-文件-即把一个类装入jvm" tabindex="-1"><a class="header-anchor" href="#类加载器如何加载-class-文件-即把一个类装入jvm"><span>类加载器如何加载 class 文件？（即把一个类装入JVM）</span></a></h2><p>ClassLoader 把一个类装入JVM的步骤如下：</p><p><img src="'+v+'" alt="classloader"></p><h3 id="加载" tabindex="-1"><a class="header-anchor" href="#加载"><span>加载</span></a></h3><ol><li><strong>获取二进制字节流</strong>：根据一个类的全限定名来获取其定义的二进制字节流（找到对应的 .class 文件）</li><li><strong>转换数据结构</strong>：将二进制字节流所代表的静态存储结构转化为方法区的运行时数据结构。同时进行初步校验（cafebabe、常量池、文件长度、是否有父类等）</li><li><strong>生成Class类对象</strong>：在内存中生成一个代表这个类的 <code>java.lang.Class</code> 对象实例，作为这个类的访问入口</li></ol><p>在加载阶段，开发人员既可以使用系统提供的类加载器来完成加载，也可以自定义自己的类加载器来完成加载。加载阶段完成后，虚拟机外部的二进制字节流就按照虚拟机所需的格式存储在方法区之中，而且在 Java 内存中也创建一个 <code>java.lang.Class</code> 类的对象，这样便可以通过该对象访问方法区中的这些数据。</p><p><img src="'+y+'" alt="load"></p><h4 id="什么时候加载" tabindex="-1"><a class="header-anchor" href="#什么时候加载"><span>什么时候加载？</span></a></h4><p>在Java中，类加载是在程序运行期间完成的。</p><h4 id="从哪里加载" tabindex="-1"><a class="header-anchor" href="#从哪里加载"><span>从哪里加载？</span></a></h4><p>一般二进制字节流都是从已经编译好的本地 .class 文件中读取，但其实还可以从 .jar / .war / JSP动态生成的class类 / 数据库 或 网络 中读取。</p><h4 id="类加载-和-数组加载-过程有什么区别" tabindex="-1"><a class="header-anchor" href="#类加载-和-数组加载-过程有什么区别"><span>类加载 和 数组加载 过程有什么区别？</span></a></h4><p>当我们声明一个数组，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> str</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">10</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这个数组也是有类型的，称为数组类型。在 Java 层面，我们说这个数组的类型是 String[]， 但在 JVM 层面，类型是<code>[Ljava.lang.String</code> (二维数组是 <code>[[Ljava.lang.String</code> ) ，而 java.lang.String 只是数组里面元素的类型。</p><p>当程序在运行过程中遇到 new 关键字创建一个数组时，由 JVM 直接创建数组类，再由类加载器创建数组中的元素类。而普通类的加载由类加载器完成，既可以使用系统提供的引导类加载器，也可以使用用户自定义的类加载器。</p><h3 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h3><p>在这个阶段，JVM需要完成三件事：</p>',31)),i("ol",null,[s[6]||(s[6]=i("li",null,[i("strong",null,"校验"),a("：检查载入的Class文件正确性，包含文件格式验证、元数据验证、字节码验证和符号引用验证。")],-1)),i("li",null,[s[3]||(s[3]=i("strong",null,"准备",-1)),s[4]||(s[4]=a("：给类的 ")),e(l,{color:"red"},{default:t(()=>s[2]||(s[2]=[a("静态变量")])),_:1}),s[5]||(s[5]=a(" 分配内存并设置零值（此时还未赋值）。但被 final 修饰的除外。"))]),s[7]||(s[7]=i("li",null,[i("strong",null,"解析"),a("：将符号引用（Symbolic References）转化成直接引用。（符号引用就是一组符号来描述目标，可以是任何字面量。直接引用就是直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄。）")],-1))]),s[10]||(s[10]=n(`<h4 id="准备阶段静态变量" tabindex="-1"><a class="header-anchor" href="#准备阶段静态变量"><span>准备阶段静态变量</span></a></h4><p>我们在 java 中编写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 在准备阶段， str1 是 null， str2 是 &quot;zxc&quot;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> str1 </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">jerry</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> final</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> str2 </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">zxc</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在准备阶段， str1 会先被赋初值 null，此时还没有被赋予 <code>jerry</code> 这个值。但假如是 final 修饰，在编译阶段就会将初始值存入 constantValue 属性中，在准备阶段就将 constantValue 的值赋给该字段，所以此时str2已经是 <code>zxc</code> 了 ，而不是 null 。</p><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化"><span>初始化</span></a></h3><p>对类的静态变量和静态代码块进行赋值。例如我们在程序中编写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 在初始化阶段，str1 被赋值为 jerry</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> str1 </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">jerry</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>在链接阶段， str1 还是 null， 在初始化阶段，str1 就被赋值为 <code>jerry</code> 了。</p><h4 id="初始化的步骤" tabindex="-1"><a class="header-anchor" href="#初始化的步骤"><span>初始化的步骤</span></a></h4><ol><li>假如这个类还没有被加载和链接，则程序先加载并链接该类</li><li><strong>假如该类的直接父类还没有被初始化，则先初始化其直接父类</strong></li><li>假如类中有静态初始化语句，则系统依次执行这些初始化语句</li></ol><h4 id="什么时候初始化-初始化的条件" tabindex="-1"><a class="header-anchor" href="#什么时候初始化-初始化的条件"><span>什么时候初始化？(初始化的条件)</span></a></h4><ol><li>在运行过程中遇到 <code>new</code>、<code>getstatic</code>、<code>putstatic</code>、<code>invokestatic</code> 这四个字节码指令时，如果类尚未初始化，那就要进行初始化。<code>getstatic</code> 和 <code>putstatic</code> 用于读取、设置一个类的静态成员变量(不包括final修饰的静态变量)，<code>invokestatic</code>用于调用一个类的静态成员函数。</li><li>使用 <code>java.lang.reflect</code> 进行反射调用的时候，如果类没有初始化，那就需要初始化；</li><li>当初始化一个类的时候，若其父类尚未初始化，那就先要让其父类初始化，然后再初始化本类；</li><li>当虚拟机启动时，虚拟机会首先初始化带有main方法的类，即主类；</li></ol><p>直接满足初始化的这4个条件的情况叫做<strong>主动引用</strong>；间接满足上述初始化过程的情况叫做<strong>被动引用</strong>。下文有举例。</p><h2 id="双亲-父类-委派模型" tabindex="-1"><a class="header-anchor" href="#双亲-父类-委派模型"><span>双亲（父类）委派模型</span></a></h2><p>在 JDK 8 和之前的版本中，类加载器可分为三层：</p><ol><li><strong>BootStrap ClassLoader</strong>：启动类加载器，由C++实现，属于JVM一部分，负责加载 <code>&lt;JAVA_HOME&gt;/lib</code> 目录下的类，如 rt.jar、tools.jar</li><li><strong>Extensioon ClassLoader</strong>：扩展类加载器，由Java实现，负责加载 <code>&lt;JAVA_HOME&gt;/lib/ext</code> 目录下的类，如 javax.XXX</li><li><strong>Application ClassLoader</strong>：应用类加载器，由Java实现，负责加载用户类路径（Classpath）下的所有类库。</li></ol><p><img src="`+h+`" alt="classloader"></p><p>虚拟机装载类时，使用了双亲委派机制：</p><ul><li><strong>全盘负责</strong>：当一个 ClassLoader 加载一个类时，除非显式地使用另一个ClassLoader，否则该类所依赖及引用的类也由当前 ClassLoader 负责加载。</li><li><strong>双亲委派</strong>：加载一个类时，先委托父类装载器寻找目标类，找不到时才从自己的类路径找。</li></ul><p>举个栗子，像 java.lang.Object 这些存放在 rt.jar 中的类，无论使用哪个类加载器加载，最终都会委派给最顶端的 RootClassLoader 加载，从而使得不同加载器加载的 Object 类都是同一个。之所以这样设计，是从安全角度考虑的，试想如果有人恶意编写了一个 java.lang.String 类并装载到 JVM 中，我们使用 String 的时候就可能执行了恶意的 String 而不是 Java 提供的 Stirng。有了全盘负责委托机制，java.lang.String 永远是由 RootClassLoader 来加载，避免了上述安全隐患。</p><h3 id="双亲委派过程" tabindex="-1"><a class="header-anchor" href="#双亲委派过程"><span>双亲委派过程</span></a></h3><ol><li>首先检查类是否被加载；</li><li>若未加载，则调用父类加载器的 loadClass 方法；</li><li>若该方法抛出 ClassNotFoundException 异常，则表示父类加载器无法加载，则当前类加载器调用 findClass 加载类；</li><li>若父类加载器可以加载，则直接返回Class对象；</li></ol><h2 id="类加载器如何判断两个-java-类是相同的" tabindex="-1"><a class="header-anchor" href="#类加载器如何判断两个-java-类是相同的"><span>类加载器如何判断两个 Java 类是相同的 ？</span></a></h2><p>Java 虚拟机不仅要看类的全名是否相同，还要看加载此类的类加载器是否一样。只有两者都相同的情况，才认为两个类是相同的。即便是同样的字节代码，被不同的类加载器加载之后所得到的类，也是不同的。</p><h2 id="什么时候需要自定义类加载器" tabindex="-1"><a class="header-anchor" href="#什么时候需要自定义类加载器"><span>什么时候需要自定义类加载器？</span></a></h2><ol><li>需要隔离加载类的时候。在某些框架中，应用和中间件依赖的jar包要隔离开来，用不同的类加载器确保不会互相影响。</li><li>需要修改类的加载方式时</li><li>需要扩展加载源时，例如从网络、数据库等地方加载</li><li>防止源码泄露，用自己的类加载器还原加密的字节码</li></ol><hr><h1 id="主动引用与被动引用" tabindex="-1"><a class="header-anchor" href="#主动引用与被动引用"><span>主动引用与被动引用</span></a></h1><p>直接满足初始化4个条件的情况叫做<strong>主动引用</strong>；间接满足上述初始化过程的情况叫做<strong>被动引用</strong>。</p><h2 id="被动引用的例子" tabindex="-1"><a class="header-anchor" href="#被动引用的例子"><span>被动引用的例子</span></a></h2><h3 id="示例一" tabindex="-1"><a class="header-anchor" href="#示例一"><span>示例一</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Father</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> String</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">jerry</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    static</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">父类被初始化！</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Son</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> extends</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Father</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    static</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">子类被初始化！</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Son</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>父类被初始化！</span></span>
<span class="line"><span>jerry</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，似乎满足初始化条件的第一条：<strong>读取、设置一个类的静态成员变量</strong>。那为什么调用的是子类的name，子类却没有被初始化呢？ 原因是：这个静态成员变量属于父类，子类只是间接调用，因此属于被动引用，JVM只会初始化父类。</p><h3 id="示例二" tabindex="-1"><a class="header-anchor" href="#示例二"><span>示例二</span></a></h3><p>修改 main 方法，new 一个父类数组</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    Father</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> fArr</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> Father</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">10</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">];</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果并没有输出<code>父类被初始化！</code>。在这个例子中，也似乎满足第一条：<strong>遇到 new 指令新建对象</strong>，那为什么父类没有被初始化呢？原因是：现在通过 new 要创建的是一个数组对象，而非父类对象，因此也属于间接引用，不会初始化父类。</p><h3 id="示例三" tabindex="-1"><a class="header-anchor" href="#示例三"><span>示例三</span></a></h3><p>修改 Father 类，用 final 修饰 name</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Father</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> final</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> String</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">jerry</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    static</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">父类被初始化！</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Go</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Father</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>jerry</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这个例子中，只输出了 jerry，却并没有初始化父类。原因是：Father.name 被 <code>final</code> 修饰。被 <code>final</code> 修饰的已经是一个常量，在 Java 代码编译的过程中就会被放入它被引用的class文件的常量池中(这里是Go类的常量池)。所以程序在运行期间如果需要调用这个常量，直接去当前类的常量池中取，而不需要初始化这个类。</p><hr><p>参考：</p><ul><li><a href="https://blog.csdn.net/u010425776/article/details/58145910" target="_blank" rel="noopener noreferrer">深入理解JVM(十)——类加载器</a></li><li><a href="https://www.jianshu.com/p/bfb876565a1e" target="_blank" rel="noopener noreferrer">Java 面试知识点解析(三)——JVM篇</a></li></ul>`,48))])}const J=p(u,[["render",m],["__file","index.html.vue"]]),C=JSON.parse('{"path":"/java/to5zjrk9/","title":"Java虚拟机（一）JVM 基础和类的加载","lang":"zh-CN","frontmatter":{"title":"Java虚拟机（一）JVM 基础和类的加载","comments":true,"categories":["Java","JVM"],"tags":["Java","JVM"],"abbrlink":"3ebede8","createTime":"2018/08/04 12:53:58","permalink":"/java/to5zjrk9/","description":"什么是Java虚拟机 Java的理念是“一次编译，到处运行”。我们平时编写的 Java 代码，经过Java编译器编译后会生成一种 .class 文件，称为字节码文件。Java虚拟机（Java Virtual Machine，JVM） 就是负责将字节码文件翻译成特定平台下的机器码然后运行的软件，其本身是由C/C++编写。 dotclass JVM 如何让...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/java/to5zjrk9/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"Java虚拟机（一）JVM 基础和类的加载"}],["meta",{"property":"og:description","content":"什么是Java虚拟机 Java的理念是“一次编译，到处运行”。我们平时编写的 Java 代码，经过Java编译器编译后会生成一种 .class 文件，称为字节码文件。Java虚拟机（Java Virtual Machine，JVM） 就是负责将字节码文件翻译成特定平台下的机器码然后运行的软件，其本身是由C/C++编写。 dotclass JVM 如何让..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jerrysheh.com/images/Java/dotclass.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java虚拟机（一）JVM 基础和类的加载\\",\\"image\\":[\\"https://jerrysheh.com/images/Java/dotclass.png\\",\\"https://jerrysheh.com/images/Java/JVM.png\\",\\"https://jerrysheh.com/images/Java/JVM_component.png\\",\\"https://jerrysheh.com/images/Java/load.png\\",\\"https://jerrysheh.com/images/Java/how_classloader_load_class.png\\",\\"https://jerrysheh.com/images/Java/classloader.png\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"JVM 如何让 Java 程序跨平台？","slug":"jvm-如何让-java-程序跨平台","link":"#jvm-如何让-java-程序跨平台","children":[]},{"level":2,"title":"JVM的“无关性”","slug":"jvm的-无关性","link":"#jvm的-无关性","children":[]},{"level":2,"title":"类加载器的作用","slug":"类加载器的作用","link":"#类加载器的作用","children":[]},{"level":2,"title":"类加载器如何加载 class 文件？（即把一个类装入JVM）","slug":"类加载器如何加载-class-文件-即把一个类装入jvm","link":"#类加载器如何加载-class-文件-即把一个类装入jvm","children":[{"level":3,"title":"加载","slug":"加载","link":"#加载","children":[]},{"level":3,"title":"链接","slug":"链接","link":"#链接","children":[]},{"level":3,"title":"初始化","slug":"初始化","link":"#初始化","children":[]}]},{"level":2,"title":"双亲（父类）委派模型","slug":"双亲-父类-委派模型","link":"#双亲-父类-委派模型","children":[{"level":3,"title":"双亲委派过程","slug":"双亲委派过程","link":"#双亲委派过程","children":[]}]},{"level":2,"title":"类加载器如何判断两个 Java 类是相同的  ？","slug":"类加载器如何判断两个-java-类是相同的","link":"#类加载器如何判断两个-java-类是相同的","children":[]},{"level":2,"title":"什么时候需要自定义类加载器？","slug":"什么时候需要自定义类加载器","link":"#什么时候需要自定义类加载器","children":[]},{"level":2,"title":"被动引用的例子","slug":"被动引用的例子","link":"#被动引用的例子","children":[{"level":3,"title":"示例一","slug":"示例一","link":"#示例一","children":[]},{"level":3,"title":"示例二","slug":"示例二","link":"#示例二","children":[]},{"level":3,"title":"示例三","slug":"示例三","link":"#示例三","children":[]}]}],"readingTime":{"minutes":10.5,"words":3151},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/java/4.jvm/Java虚拟机（一）JVM 基础和类的加载.md"}');export{J as comp,C as data};
