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