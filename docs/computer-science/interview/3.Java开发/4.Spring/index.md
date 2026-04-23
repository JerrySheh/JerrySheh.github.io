---
title: Spring了然于心
createTime: 2018/10/11 21:13:51
permalink: /interview/spring/
---

## 1. MVC 结构流程

1. Web浏览器发送HTTP请求到服务端，被Controller(Servlet)获取并进行处理（例如参数解析、请求转发）
2. Controller 调用核心业务逻辑——Model部分
3. Model进行数据库存取操作，并将操作结果返回
4. Controller 将业务逻辑处理结果交给View（JSP），动态输出HTML内容
5. 动态生成的HTML内容返回到浏览器显示

## 2. 什么是 Ioc ？

Ioc（Inversion of Control）是控制反转，具体做法的依赖注入（DI，Dependency Inject）。即 **某一接口的实现类的选择控制权从调用类中移除，转交由第三方决定**，当需要的时候，由第三方进行注入，而不由调用类 new，这就是反转控制。

Spring 提供了一个反转控制容器，当我们要使用某个对象，只需要从 Spring 容器中获取需要使用的对象，不关心对象的创建过程，把创建对象的控制权反转给了 Spring 框架，而 Spring 容器是通过 DI，在创建对象的过程中将对象依赖属性（简单值，集合，对象）通过配置设值给该对象。

## 3. Ioc是如何实现的?

1. 读取注解或者配置文件，看看 bean 依赖的是哪个Source，拿到类名
2. 使用反射的API，基于类名实例化对应的对象实例
3. 将对象实例通过构造函数或者 setter，注入给 bean

## 4. 什么是 AOP ？

Aspect Oriented Program，面向切面编程。即把功能分为 核心业务功能 和 周边功能。两者分别独立进行开发，然后把切面功能和核心业务功能 “编织” 在一起。

AOP 的好处是允许我们把遍布应用各处的功能分离出来形成可重用的组件。

## 5. 什么是 Spring Boot ？

Spring Boot并不是什么新的框架，而是默认配置了很多框架的使用方式，就像 Maven 整合了所有的 jar 包一样，Spring Boot 整合了大部分框架，比如Mybatis、Hibernate、Spring MVC。

Spring Boot使用 “习惯优于配置” （项目中存在大量的配置，此外还内置一个习惯性的配置）的理念让你的项目快速运行起来。

## 6. 什么是 Spring ？

Spring 是一个开源框架大家族，包含很多子项目，例如 Spring Core、Spring data、Spring Web MVC 以及最新的 Spring Boot 和 Spirng Could。它的核心理念是 依赖注入 和 面向切面。

传统的 Java 项目，类和类之间经常有依赖关系，一般调用类通过 new 关键字构造依赖类的实例。当工程变大，依赖关系会变得十分复杂，使项目难以维护。Spring 提供了依赖注入容器，相当于在 Java 类当中充当一个中间人，管理着类与类之间的依赖关系。

## 7. 什么是 Spring Cloud ？

Spring Cloud是一套分布式服务治理的框架。可以理解成是一个注册中心，提供如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等。

Spring Cloud + Spring Boot 非常适合做微服务架构，Boot的轻量级适合开发单个微服务，多个服务再统一在 Cloud 中注册。

## 8. BeanFactory 和 ApplicationContext 的区别

一般称 BeanFactory 为 IoC 容器，而 ApplicationContext 为应用上下文。

BeanFactory 是解析、管理、实例化所有容器的 Bean 的入口，**面向 Spring 本身**。且是 Spring Framework 最核心的接口，提供了高级的 Ioc 配置机制，使管理不同类型的 Java 对象成为可能。

ApplicationContext **面向框架的开发者**，提供国际化支持、统一的资源文件读取方式、框架事件体系等。

BeanFactory 在启动的时候不会实例化Bean，getBean() 的时候才会实例化。ApplicationContext在解析配置文件时会对配置文件所有对象都初始化（默认情况下）。

## 9. Spring Bean的5种作用域(Scope)

在 applicationContext.xml 中声明 scope:

```xml
<bean
  id="hello" scope="singleton" class="io.jerrysheh.Hello">
</bean>
```

1. **singleton**: 是 Spring Bean 的默认配置，这个 Bean 在 Spring 容器是 单例 的。
2. **prototype**: 和 singleton 相反，为每个 Bean 请求提供一个 Bean 实例
3. **request**：在请求 Bean 范围内会给每个客户端的网络请求创建一个实例，请求结束之后会回收
4. **session**: 在每个 session 中有一个 Bean 的实例，session 结束后回收
5. **global-session**: 所有 Portlet 共享的 Bean

注意，Singleton Bean不是线程安全的，需要自行保证线程安全。

## 10. Spring 的5种自动装配模式

1. **no**：Spring 框架的默认设置，开发者要在 Bean 中明确定义依赖
2. **byName**：在配置文件中查找相同名字的 Bean 进行装配
3. **byType**：在配置文件中查找相同类型的 Bean 进行装配
4. **constructor**：寻找有相同构造参数的 Bean 进行装配
5. **autodetect**：先尝试以 constructor 的方法进行装配，失败后 byType 进行装配

## 11. SpringMVC处理请求的流程

1. 用户发送请求，被DispatcherServlet拦截，DispatcherServlet收到请求之后自己不处理，而是交给其他的Handler进行处理
2. DispatcherServlet初始化HandlerMapping，HandlerMapping会把请求映射成一个HandlerExecutionChain对象，这个对象包括一个Handler和多个Interceptor，然后把这个Handler适配成HandlerAdapter
3. DispatcherServlet传过来的请求会和HandlerAdapter进行适配，先要进行一些数据转换，然后调用HandlerAdapter的handle()，返回一个ModelAndView对象
4. mv.render()，通过ViewResolver进行渲染，把刚才HandlerAdapter返回的Model渲染到View上
5. 最后进行请求的转发

## 12. 什么是微服务？

微服务是一个松耦合的分布式服务。微服务允许将一个大型的应用分解成许多独立的组件，每个组件单独部署。

### 微服务有什么好处？

- **职责明确**：细粒度组件，组件职责领域明确，并且可以完全独立部署
- **组件复用**：一个微服务组件可以跨多个应用程序复用
- **通信规范**：组件之间通过 HTTP 、JSON 进行轻量级通信
- **底层透明**：一个服务的底层用什么技术实现并没有什么影响，不同的开发小组可以用不同的技术栈

## 13. 什么是REST

REST（Representational State Transfer）省略了主语 Resource，翻译成中文是：资源表述性状态转移。简单地说，就是用 URI 来定位资源，用 http 方法（GET、POST、DELETE、PUT等动词）来表示行为，用 http 状态码来表示结果。

## 14. AOP底层怎么实现？两种代理有什么区别？

AOP底层实现是动态代理。

### 什么是动态代理

动态代理，即利用 Java 的反射技术(Java Reflection)，在运行时创建一个新类（也称“动态代理类”）及其实例，来代替原有类和实例。

动态代理用来解决三类问题：

1. 一个接口的实现类在编译时无法知道，需要在运行时才能知道的问题；
2. 实现某些设计模式，如适配器(Adapter)或修饰器(Decorator)
3. 实现面向切面编程：如 AOP in Spring

### AOP底层的两种代理和区别？

- **JDK动态代理**：利用拦截器(实现InvocationHanlder)和反射机制，生成一个实现代理接口的匿名类，在调用具体方法前调用 InvokeHandler 来处理。
- **Cglib动态代理**：运行时动态生成被代理类的子类， overwrite 父类方法调用（因此不能代理声明为final类型的类和方法）。将代理对象类的class文件加载进来，通过修改其字节码生成子类来处理。

JDK动态代理代理的是接口，Cglib代理的是类。

## 15. SpringBoot 如何知道要加装的 Spring 配置在哪里？

SpringBoot 主要通过核心注解 `@SpringBootApplication` 来实现自发现，这是一个复合注解，其内部包含了三个注解：

- `@ComponentScan`：扫描你自己写的配置类、Controller、Service、Repository 等组件
- `@EnableAutoConfiguration`：扫描第三方依赖代码，如 Mybatis、Redis
- `@SpringBootConfiguration`：表示当前项目是一个大的配置类，Spring Boot 底层的会去寻找 application.properties 或 application.yml 文件

## 16. Spring 容器创建对象的时机

默认情况下，当我们启动 Spring applicationContext 时：

```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
```

applicationContext 会去寻找 applicationContext.xml 配置文件，里面有许多 `<bean>` 的定义，遇到 `<bean>` 时就创建对象。

当我们给 bean 加上 `lazy-init="true"` 属性

```xml
<bean
  id="hello" lazy-init="true" class="io.jerrysheh.Hello">
</bean>
```

则在应用中，遇到 getBean 时才创建。

```java
Hello h = (Hello) context.getBean("hello");
```

## 17. AutoWired 自动装配如果有多个符合的bean

在 Service 层自动注入一个 Dao，通常：
```java
@Service
public class PersonService{

  @AutoWired
  private PersonDao personDao;

}
```

如果 PersonDao 有多个实现如何解决？

第一种方法，改名字，改为实现类的名字。

```java
    @AutoWired
    private PersonDao personMysqlDaoImpl;

    @AutoWired
    private PersonDao personOracleDaoImpl;
```

第二种方法，配合 `@Qualifier` 注解

```java
    @AutoWired
    @Qualifier("personMysqlDaoImpl")
    private PersonDao personDao;
```

## 18. @Transational 什么时候注解会失效？

1. 数据库引擎本身不支持事务（如MySQL MyISAM）
2. 类没有被 Spring 管理
3. private 方法
4. 自己调自己
5. 数据源没有配事务管理器
6. 标记了 `Propagation.NOT_SUPPORTED`
7. try-catch
8. 异常被转换（try-catch后又 throw 一个 非runtimeException ）

### 为什么 private 方法会失效？

`@Transational` 本质是动态代理，通过反射在方法前后织入开启事务、结束事务的代码， private 方法无法被反射获取。

### 为什么自己调自己会失效？

自己调自己，调的不是代理类，而是原类。解决办法：`((A)AopContext.currentProxy).b()`

原类

```java
public class A {
    a() {
        b();
    }

    @Transactional
    b() {
        insert();
    }
}
```

代理后的类

```java
public class Proxy$A {
     A a = new A();
     
     a() {
         a.a();
     }
     
     b() {
       try{
        startTransaction();
        a.b();
       } catch (RuntimeException e){
         rollBack();
       } finally {
        endTransaction();
       }
        
     }
     
}
```

## 19. Spring循环依赖怎么解决？

循环依赖是两个或多个Bean互相持有对方的引用，形成了一个闭环。Bean A 中注入了 Bean B，同时 Bean B 中又注入了 Bean A。

Spring 创建一个 Bean，要经过实例化和初始化两个步骤，秘诀就在于利用半成品对象。Spring 使用三级缓存解决循环依赖问题。

- **一级缓存 (singletonObjects)**： 存放最终完整的“成品 Bean”。日常我们从 Spring 容器获取的都是这里的对象。
- **二级缓存 (earlySingletonObjects)**： 存放“半成品 Bean”。这些 Bean 已经实例化，但还没完成属性注入。它的主要作用是保证如果存在代理对象（AOP），所有引用的地方都能拿到同一个早期的代理对象。
- **三级缓存 (singletonFactories)**： 存放“Bean 工厂对象”（ObjectFactory）。它提供了一个钩子，用于在发生循环依赖时，按需生成早期的 Bean 引用（可能是原对象，也可能是 AOP 代理对象）。

Spring 三级缓存是兜底，开发实践中，循环依赖通常被视为代码设计不良，职责划分不清，建议重构，引入第三个类。Spring Boot 2.6 开始，默认禁用了循环依赖的支持。如果无法立即重构，可以在其中一个注入点加上 @Lazy 注解来暂时避免。

## 20. 为什么要用三级缓存解决循环依赖？二级行不行？

不行。根本原因是为了处理 AOP（面向切面编程）。在 Spring AOP 中，AOP 代理对象的生成必须在初始化后，但循环依赖，B 注入 A 时，如果只有二级缓存，B拿到的是A的原始对象，而不是代理对象。

## 21. 循环依赖发生时的 Bean 加载过程

1. **实例化 A**： Spring 调用 A 的构造方法，创建出 A 的实例。此时 A 还是个“半成品”（只有壳子，没有属性）。
2. **A 放入三级缓存**： Spring 将一个可以获取 A 早期引用的工厂方法（ObjectFactory）放入 三级缓存（singletonFactories） 中。
3. **A 注入属性 B**： Spring 发现 A 需要注入 B，于是去缓存里找 B。找不到，开始创建 B。
4. **实例化 B**： Spring 调用 B 的构造方法，创建出 B 的实例。
5. **B 放入三级缓存**： 同样，将 B 的 ObjectFactory 放入三级缓存。
6. **B 注入属性 A**： B 发现需要注入 A，开始查缓存：
 - 查一级缓存：没有（A 还没完全建好）。
 - 查二级缓存：没有。
 - 查三级缓存：找到了 A 的 ObjectFactory。
7. **执行三级缓存，提拔到二级**： B 调用 A 的 ObjectFactory，获取到了 A 的早期引用（如果 A 需要 AOP 增强，此时就会生成代理对象）。然后 Spring 将 A 的引用放入二级缓存，并从三级缓存中删除。
8. **B 初始化完成**： B 成功拿到了 A 的引用（虽然 A 还是半成品，但内存地址已经确定），B 继续完成剩余的属性注入和初始化动作。完成后，B 被放入一级缓存。
9. **A 初始化完成**： 流程回到 A 的属性注入，A 此时能从一级缓存中拿到完整的 B，完成属性注入。随后 A 也完成初始化，被放入一级缓存。
