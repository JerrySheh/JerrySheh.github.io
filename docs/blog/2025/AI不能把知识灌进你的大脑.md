---
title: AI不能把知识灌进你的大脑
categories:
  - 计算机
tags:
  - 人工智能
createTime: 2025/02/09 23:00:46
permalink: /article/v8obxz21/
---

体验了几天 DeepSeek ，虽然他回答我最多的一个答案是「服务器繁忙，请稍后再试。」，但我还是乐此不疲。

<!-- more -->

## AI终于像个人了

相较于其他AI应用，DeepSeek 给我的感受最不一样的点在于他终于“像个人”了。以往光是如何写提示词都可以专门开一个课程，而跟 DeepSeek 交互就像聊天，不需要特别的模式化的提示词。自然地提问，然后得到一个自然的回答。

感兴趣的可以看看下面这篇文章，介绍了 DeepSeek R1 或 OpenAI o1 这样的基于思维链（Chain of Thought）的推理模型的特点。

[如何更好的为 DeepSeek R1 或 OpenAI o1 这样的推理模型写提示词？](https://baoyu.io/translations/prompt-engineering-for-openais-o1-and-o3-mini-reasoning-models) 

## AI不能把知识灌进你的大脑

我之前写过一篇 [计算机术语速查手册](/article/nnftqvbz/) ，当时开这篇笔记的目的是想在学习的过程中顺手记录，方便以后回过头来查阅和回顾。今天突发奇想让 DeepSeek 帮忙续写一下这个手册，结果他哐哐地几秒钟就给我补了几百条术语名词，着实有被惊讶到。

如果我的目标是编一个比较完整的手册并发行，这很好，我的工作完成了。但如果只是作为日常笔记，我不会把AI生成的几百条内容一下子补充到这篇手册进去。因为这些内容我还没有学习、掌握和吸收，“你不能复习你还没学习过的知识”，况且 DeepSeek 生成的内容也可能出错。我可能会逐步去了解 DeepSeek 告诉我的这些我之前没听过的术语，理解概念并确保它们的正确性后，再逐条补充到手册进去。

所以 AI 很好，但不能倒果为因。AI可以高效向你输出知识，但它毕竟不能帮你把知识灌进你的大脑呀。

## 你敢在生产环境使用AI写的程序吗？

我尝试让 DeepSeek 帮我写一个 Chrome 插件，因为我是一个后端工程师，对 JS 并不熟悉，所以我无从判断它写得对不对，只能用结果验证。最后事实证明，它写的代码完全符合我的预期，这下我彻底被AI打败了。

但是当我回过头来看，我注意到它写的代码我完全看不懂，例如下面的代码片段，我不知道什么是 `MutationObserver`，也不知道调用 `observer.observe` 会发生什么，虽然代码能跑，结果也对，毕竟这只是一个插件软件，所以没太大所谓。

但假如我正在开发一个重要的企业级项目，需要对代码深刻理解，以便后续维护和调整，那这段代码我敢使用吗？后续我敢改吗？我可能会非常谨慎，除非我额外花时间学习 `MutationObserver` 的概念，并明白它真正发生了什么。

```js
  function startMonitoring() {
    // 使用MutationObserver监听DOM变化
    observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          checkError();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    checkError();
  }
```

## 总结

所以我对 AI 的看法是，AI 是高效的辅助，在你对一个领域已经很熟悉的情况下，它可以帮助你高效地完成工作，甚至能启发、拓展你的思维和知识边界。而在你对一个领域完全不懂的情况下，可以请教它，但最好不要一下子就让它用你不知道的知识完成重要的工作，因为你无从理解，谁知道它给你的东西，在哪里，什么时候，留了个坑在等着你踩呢。AI 虽然强大，但 AI 不能把知识灌进你的大脑，该靠自己花时间消化的，还是得靠自己。