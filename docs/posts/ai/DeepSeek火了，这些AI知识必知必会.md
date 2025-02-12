---
title: DeepSeek火了，这些AI知识必知必会
categories:
  - 计算机
tags:
  - 人工智能
createTime: 2025/02/12 19:52:01
permalink: /article/a16tm5fc/
---

DeepSeek 火得一沓糊涂，公司周一已经部署了内网的 DeepSeek-R1，电梯里也都听到大家在各种讨论。看来 DeepSeek 已经掀起了一股狂热。但是等等，你们在说的 14B、32B、671B、满血、蒸馏，还有什么硅基流动，Qwen、O1、Ollama 都是些啥意思？我怎么一个字也听不懂，赶紧补补知识。

<!-- more -->

---

### AI 知识串讲

首先 OpenAI 和 DeepSeek 这些都是公司或机构名，[ChatGPT](https://chat.openai.com/) 和 [DeepSeek chat](https://chat.deepseek.com/) 是他们对应的产品，GPT-4、DeepSeek-r1 这些是大模型（LLM）的名称。国内外比较有名的AI公司及其对应产品、模型的清单我已经让 DeepSeek 整理出来了，可以参考文章末尾的表格。

以 DeepSeek 为例，因为 DeepSeek 官网经常服务器繁忙，有些人就想通过第三方API去访问或者尝试本地部署。

对于第三方API，很多人选择[硅基流动（SiliconFlow）](https://siliconflow.cn/zh-cn/)这个平台，在这上面购买了tokens之后就可以使用其API去访问，本质上等于通过API访问平台方帮你搭好的模型。硅基流动可以理解为是模型提供方，类似的平台还有各个AI公司官方，如 OpenAI API、Google Gemini API、DeepSeek API 等。

有一些大模型开源（如DeepSeek-R1），我们可以免费下载到本地部署运行，而另一些不开源（如OpenAI的o1），这种就只能购买他们的服务或API。开源的通常可以到 github 上面找到开源项目，但是下载一般都会放在一个叫 [huggingface](huggingface.co) 的网站，可以说这个网站是 AI 界的 github 了。

对于本地部署，我们下载 DeepSeek-r1 模型时看到的 14B、32B、671B，指的是不同参数版本，参数越高，表示越强大，当然成本也越高。这里的 B 指的是 Billion（10亿），最高配置 671B 也就是 6710 亿参数，也就是我们说的满血版，而其他的是蒸馏版（或者叫阉割版）。当我们想在本地部署大模型时，满血版的跑起来需要超过400GB的显存，一般人可跑不起，而 14B 需要 9GB 显存，4060Ti 16G 的显卡勉强能跑。

而本地部署要如何部署呢？就得借助 [Ollama](ollama.com) 这样的开源工具应用，用来在本地运行和部署大语言模型，Ollama安装简单但交互简陋（命令行）。而 [LM Studio](https://lmstudio.ai/) 是另一个界面友好型的运行本地大模型的应用。

无论是本地部署也好，API也好，我们都可以借助客户端工具去连接模型。ChatBox 和 Cherry-Studio 就是这样的工具，他们提供了友好的界面。

你可能在下载模型时看到 MoE 这样的字眼，这是指模型的架构，全称是Mixture of Experts（混合专家模型）。像 DeepSeek-R1 和 GPT-4 这样的模型就是 MoE 的架构，擅长推理和逻辑。与MoE相对应的概念是稠密（Dense）模型，可以理解为它是一个“通才”模型。

---

（下方内容由 DeepSeek 生成）

### 国外AI公司/研究机构

| **名称**                | **代表性产品**                     | **大模型/技术**                                                                 |
|-------------------------|------------------------------------|--------------------------------------------------------------------------------|
| OpenAI                  | ChatGPT、DALL·E 3、Sora           | GPT-3、GPT-4、GPT-4o、DALL·E系列、CLIP、Whisper、GPT-o1                           |
| Google (Google AI)      | Google Assistant、Gemini、Bard     | PaLM 2、Gemini、BERT、Transformer、LaMDA、Imagen、AlphaGo、AlphaFold          |
| DeepMind (Google旗下)   | AlphaGo、AlphaFold、WaveNet        | Alpha系列（AlphaGo、AlphaFold、AlphaStar）、Gopher、Gemini（联合开发）         |
| Microsoft               | Copilot、Azure AI                  | Turing-NLG、Phi-3、Orca、KOSMOS系列、MAI-1（研发中）                          |
| Meta (FAIR)             | Llama开源社区、Meta AI助手         | Llama系列（Llama 3）、OPT、SAM、Segment Anything、Massively Multilingual Speech |
| Anthropic               | Claude助手                         | Claude系列（Claude 3）                                                        |
| Hugging Face            | Transformers库、AI社区平台          | BLOOM、BART、开源社区支持的多模型（如LLaMA、Stable Diffusion）                 |
| NVIDIA                  | NeMo框架、AI芯片（H100/A100）       | NeMo Megatron、ChipNeMo、视觉模型（如GAN）、CUDA生态                          |
| Stability AI            | Stable Diffusion、Stable Assistant | Stable Diffusion系列（SD 3）、Stable LM                                       |
| MidJourney              | MidJourney图像生成工具             | 专有图像生成模型（未公开名称）                                                 |
| Tesla                   | 自动驾驶FSD、Optimus机器人         | Dojo超算、自动驾驶视觉大模型                                                   |
| IBM                     | Watson Assistant、Watson Studio    | WatsonX、Granite系列、Project CodeNet                                         |

---

### 国内AI公司/研究机构

| **名称**            | **代表性产品**               | **大模型/技术**                                                                 |
|---------------------|------------------------------|--------------------------------------------------------------------------------|
| 百度 (Baidu)        | 文心一言、百度搜索           | ERNIE系列（ERNIE 4.0）、PLATO、文心大模型                                       |
| 科大讯飞 (iFLYTEK)  | 讯飞星火、语音输入法         | 星火大模型（SparkDesk）、认知智能大模型                                         |
| 阿里巴巴 (Alibaba)  | 通义千问、钉钉智能助理       | 通义系列（Qwen、Qwen-VL）、EMO、AnimateDiff-Lightning                          |
| 腾讯 (Tencent)      | 腾讯混元助手、腾讯云AI       | 混元大模型（Hunyuan）、PhotoMaker                                              |
| 华为 (Huawei)       | 盘古大模型、昇腾芯片         | 盘古系列（气象、制药）、云雀大模型                                              |
| 商汤科技 (SenseTime)| 商量大模型、SenseNova平台    | 书生系列（InternLM2）、日日新大模型                                             |
| 智谱AI (Zhipu)      | 智谱清言、GLM智能体          | GLM系列（GLM-4、CogView）                                                      |
| 深度求索 (DeepSeek) | DeepSeek Chat、Moonshot AI   | DeepSeek-R1、DeepSeek-V3                                                       |
| 字节跳动 (ByteDance) | 豆包、云雀平台               | 云雀大模型、Boximator（视频生成）                                               |
| 零一万物 (01.AI)    | 万知助手                     | Yi系列大模型（Yi-34B/9B）                                                       |
| 月之暗面 (Moonshot) | Kimi智能助手                 | Moonshot大模型（千亿参数长文本）                                                |

---

