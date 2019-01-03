# 小游戏爬虫--qq游戏微信小程序、手Q排行榜

## qq游戏 - 微信小程序 
通过Charles抓包分析得到: 所有请求通过post方式获取数据，同时测试发现qq游戏没有验证session, 可以为空。
由于热门榜是根据hot指数排名的，所以只爬取新游榜就可以了。
### 各个页面的url如下：
#### 1.精选页面
- 顶部2个banner位：
- - 简介连接: https://goplatform.minigame.qq.com/mpgather/mgettablestaticinfo?table_name=common_mini_program_jxzyw    
- - 参数: {"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"fcc81d5f812e4d5774024510a3895945","ver":"2.0.0"}
- - 游戏详细信息链接：
https://goplatform.minigame.qq.com/mpgather/mgetginfo
- - 参数：{"appids":["wxeea1fb6d72dfe887","wx801fe783f5f0888b"],"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"fcc81d5f812e4d5774024510a3895945","ver":"2.0.0"}
- 下面的精选游戏
- - 简介链接：
https://goplatform.minigame.qq.com/mpgather/mgetfeatured
- - 参数： {"s":0,"l":10,"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"fcc81d5f812e4d5774024510a3895945","ver":"2.0.0"}
- - 游戏详细信息：https://goplatform.minigame.qq.com/mpgather/mgetginfo
- - 参数：{"appids":["wx593c3c05193d299f","wx29c4321d00a1d04d","wxc274d9b04499d0de","wx20194e7827347870","wx78caa30cd32c16b9","wx34b348b28b933474","wxeea1fb6d72dfe887","wx801fe783f5f0888b","wxa6b392019ef1c2bc","wxd93fb8bddf971d14","wxb7da46ae1bb390de","wxe29d0b523a30b6a0","wxe603ab9a778c4691","wx7c34879f911ca6fc","wx3ff4ef6cb6e496a4","wx3eeb39f548437a34","wx79ade44c39cefc7f","wx3b26d1156ede4ff3","wx8c0b1c048ce88ad2","wx8e9c1a3d3827c189"],"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"fcc81d5f812e4d5774024510a3895945","ver":"2.0.0"}

#### 2. 发现页面
- 顶部3个banner位置
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetbanner
- - 参数：{"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}
- 新游榜3个：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetnewginfo
- - 参数：{"gt":"newRank","s":0,"l":3,"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}
- 热门榜3个：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgethotginfo
- - 参数：{"gt":"hotRank","s":0,"l":3,"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}
- 下面的主题推荐：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetrecommendtopic
- - 参数：
{"id":0,"type":1,"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}

#### 3.更多游戏：热门榜 | 新游榜
- 所有游戏数量：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetallgamenum
- - 参数：{"type":"new_rank","uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}
- - 注意：new_rank为新游榜，hot_rank为热门榜
- 热门榜：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgethotginfo
- - 参数：{"gt":"hotRank","s":0,"l":10,"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}
- - 注意： gt：游戏类型, s: 开始位置, l: 长度
- 新游榜：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetnewginfo
- - 参数：{"gt":"newRank","s":0,"l":10,"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"ae74649c2a79392f6b7fba0b9afe1df3","ver":"2.0.0"}

#### 4.分类页面：
- 4个分类描述：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetgtype
- - 参数：{"uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"da8659e0cb8476558403e84976966e1b","ver":"2.0.0"}
- 单个分类的游戏数量：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetallgamenum
- - 参数：{"type":"category","category_type":"yz","category_rank_type":"time","uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"da8659e0cb8476558403e84976966e1b","ver":"2.0.0"}
- - 注意：category_type:游戏分类， category_rank_type: 排行榜类型
- 单个分类的游戏信息：
- - 链接：https://goplatform.minigame.qq.com/mpgather/mgetginfo
- - 参数：{"gt":"yz","s":0,"l":20,"rt":"time","uid":609941,"openid":"osvfL4o7GhdEaXVDsGgsFEkLZoc4","session":"da8659e0cb8476558403e84976966e1b","ver":"2.0.0"}
- - 注意：gt：游戏类型, rt: 排行榜类型


## readygo - 微信小程序
通过抓包分析, readygo的所有数据都在一个页面：
- 请求方式：get
- 链接：https://api.kuaiyugo.com/api/readygo/v1/programs/eb3ecf1f22014060a2f17e8c477dca99/homepage
- 注意：需要再header里面添加“miniprogram: wxce8556babd23a6b3”

## 方块玩 - 微信小程序
通过抓包分析，方块玩的所有数据也都在一个请求上,并且token也没有验证的
- 请求方式：GET
- 链接：https://gamecenter.phonecoolgame.com/hezi/getHeziGames?appid=wx845a2f34af2f4235&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBpZCI6Ind4ODQ1YTJmMzRhZjJmNDIzNSIsInVkYXRhIjoib0xIN2I0dDloLW4zQVVRbGdRelNCQmVkQjVIVSIsImV4cCI6MTU0NTcyNTg1Nzc4MiwiaWRlbnRpZnkiOiJqc2Rmc2Y0ZmRwb21rZDVzYUFkeiJ9.y7YOaeShRePwHZQGduKJKNsIv-3o3esQ5kMtbeQPTic
- 参数：appid=wx845a2f34af2f4235

## 手Q - 玩一玩小游戏
### 玩一玩小游戏包提取链接
大部分压缩包形式的游戏可以通过如下链接形式，GET的方式获取。
我们可以利用抓包工具找到对应链接，然后在浏览器下载即可。
```
http://hudongziptest-1251316161.file.myqcloud.com/game/10001/3091/2135/4916b31b1b9aab4a0f9b26b1127b9678.zip?randomKey=-831122906
```
