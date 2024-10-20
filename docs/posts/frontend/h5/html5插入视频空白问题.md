---
title: html5插入视频空白问题
categories:
  - 前端
  - HTML
tags:
  - HTML
abbrlink: 5e11ed5b
createTime: 2017/12/31 23:50:58
permalink: /article/xiadu0b7/
---

今天想在我的博客文章[一些想法](/article/c9dvdz9t/)中插入一段视频。

本来把视频上传到我的apache服务器中，然后在 Hexo 的 Markdown语法中插入以下语句即可

```
<video src='链接地址' type='video/mp4' controls='controls'  width='100%' height='100%'>
</video>
```

但是在 Chrome 中播放的时候，一直显示空白，但是有声音。琢磨了半天不知道问题出在哪。

后来发现是 html5 嵌入视频的时候，对视频编码是有要求的

> MP4有3种编码，mpg4(xdiv),mpg4(xvid)，avc(h264)

> 转换成H264编码就可以网页正常播放了，好像H264才是公认的MP4标准编码


![emmm](/images/emmm.jpg)


用 PotPlayer 重新录制新的编码视频重新上传，搞定了。
