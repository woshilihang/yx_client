# 主旨

JD发布
实习租房
帮修简历
许愿offer

树洞心愿

首页
小公社
我的

上拉加载更多
下拉刷新优化效果

加载中

appSecret  200d1a12f177fe4fa7bf464e5788f26b

appId wxf69986470ca8008d
appSecret 2c73ade6c6b5cf07caeee90ec2004411

多模式产生
四种模式
正常模式
插入模式
i 进入当前光标位置
shift + i当前行的第一个
a 进入到当前光标下一位
A 进入到当前光标所在行的最后一位
o 进入当前光标所在行的下一行，新建下一行初始位置
O 上一行

命令模式
yy 复制当前行
p 粘贴到当前行
3yy 复制3行
y + ($ || shift + 4) 复制当前光标所在位置到该行最后一段
dd 剪切光标所在行
d& 剪切光标-后面所在行内容

u 撤销 
ctrl + r 重做

x 单个删除命令
r 单个替换命令

:set nu 显示行
11 + shift + g移动到11行

shift + 4 移动到当前行最前面
shift + 6 移动到结尾
可视化模式


ls /home/root
tail -10  /etc/passwd

id root 判断用户是否存在

用户管理常用命令
useradd 新建用户
userdel 删除用户
passwd 修改用户密码
usermod 修改用户属性
chage 修改用户属性 - 更新用户密码过期时间

useradd w
usermod -d /home/w1 w

groupadd 新建用户组
groupdel 删除用户组


 Connection reset by pee

/sbin/ifconfig

一次性计划任务 at
atq 查看未执行的一次性任务
at 18.20
echo hello > /tmp/hello.txt
ctrl + D结束输入
需要执行的命令最好在PATH中


周期性计划任务 cron
配置方式 crontab -e
查看现有的计划任务
crontab -l
配置格式
分钟 小时 日期 月份 星期 执行的命令
注意命令的路径问题，命令的输出问题

每个用户计划周期性任务文件
ls /var/spool/cron/ 下每个文件夹代表每个用户的周期性计划文件

计划任务加锁
如果计算机不能按照预期时间运行
anacontab 延时计划任务
flock 锁文件

```bash
vim /etc/cron.d/ 
vim /etc/cron.d/0hourly
vim /etc/anacontab

```


wx.checkSession来检测当前用户登录态是否有效,做对应的逻辑处理

componentDidMount声明筑起内，那么我们要做的就是在页面接口请求之前判断是否已经拿到token，
如果有token则进行正常的接口请求，否则就通过上面的登录获取token，不然就就会导致接口为携带令牌而发生错误


如何阻塞componentDidMount而保证每次接口请求之前都已经拿到了token呢，

react 的super关键字 到底做了啥

1、调用wx.login生成code
2、获取openId和session_key
https://api.weixin.qq.com/sns/jscode2session

appid
secret
js_code
grant_type: 'authorization_code'

服务端调用

3、生成3rd_session 自己维护用户的登录态信息

4、checkSession
解析用户登录态信息，拼多多形式，用户手动去更新

第一次进来 
-> 进入到中间页面 (弹窗，获取用户的信息授权) 
-> 同意授权, 进入到首页
-> 点击到个人详情页，能够有个人用户身份信息


暂未解决的问题
由于小程序编译的原因，小程序上面不能劫持render, 所以在授权登录的时候想弹出自定义弹窗引导用户授权的话，需要通过redux来控制是否显示弹框以及在页面组件引入自定义弹窗的组件

Taro在小程序当中，redux的数据随着路由的跳转是否也会跟着刷新

吸顶效果
优化上拉刷新、下拉加载

3.3日开发任务

完成底部弹窗组件，用于城市选择，
完成搜索职位前后端处理
完成沸点模块的展示页以及详情页，评论模块开发

后端
处理城市搜索，关键字搜索
设计评沸点数据库字段设计

留言功能

部署相关
服务器环境搭建
调整一套后端代码自动上传部署到服务器的脚本


TODO: 待优化
Taro小程序当中路由跳转导致的堆栈问题，是直接压入栈中还是替换


对沸点详情进行留言

pins_id
uid


token自带的用户的openid

reply
  uid: openid,
  reply_content,
  reply_uid: uid, // 对某个用户的评论
  reply_pins_id: // 对谋篇文章评论的id

查询某条文章的所有评论
  拿到pins_id 去查询reply_pins_id


对文章留言还是对文章下面的评论留言

    comment_id: 'aaa',
    isMsgComment: true,
    comment_to_id: abc, // 如果是文章评论，则为文章id，否则为评论的id
    comment_uid: '123', // 评论人的用户id
    comment: '王家卫的电影风格',
    uid: 'ccc', // 评论人的id

comments: [
  {
    comment_id: 'aaa',
    isMsgComment: true,
    comment_to_id: abc, // 如果是文章评论，则为文章id，否则为评论的id
    comment_uid: '123', // 评论人的用户id
    comment: '王家卫的电影风格',
    uid: 'ccc', // 评论人的id
    comment_reply: [
      {
        isMsgComment: false,
        comment_to_id
        comment__id: abc,
        comment_uid: '123', // 评论人的用户id
        comment: '我也这么觉得'
      }
    ]
  }
]

京东集团-组织部  人才培养岗日常实习生招聘
岗位职责:
1. 集团核心人才培养项目组织安排及运营实施
2. 人才数据整理分析及专业报告制作
3. 协助部门日常工作
4. 实习过程中可以解除京东集团各类核心人才培养项目，从组织筹备到落地执行全流程。资深HR带，可深入了解HR相关人才发展模块的公祖

任职要求:
1. 本科及以上学历，管理学，经济学，心理学等专业(202届,2022届毕业优先);
2. 优秀的沟通表达能力、计划组织能力、协调能力、学习能力、多任务处理能力;
3. 熟悉使用办公软件，如EXCEL/PPT/WORD等软件;
4. 吃苦耐劳、信心谨慎、积极主动、抗压性好、灵活度高;
5. 每周5天全职工作，至少可连续工作3个月;

你将获得:
1. 超级好吃的食堂，并且提供每日餐补;
2. 免费零食饮料供应;免费健身房设备齐全;
3. 全程通勤班车，晚上加班可打车;

工作地址:
北京市亦庄经济技术开发区京东集团总部
简历投递: zhangkaishuo@jd.com
邮件标题及简历名称请以“姓名+目前所在地+期望入职时间+可实习时长”命名
期待你的加入！



待解决的问题

textarea 字数限制


/pins/prize 

{
	"pins_id": "5e9d0b2ffea8a8443d79e529"
}

{
    "code": 200,
    "message": "取消点赞",
    "data": {
        "hasPrize": false,
        "hasPrizeTxt": "取消点赞"
    }
}