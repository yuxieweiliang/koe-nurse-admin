1: 缺少添加医院的接口

2: 获取所有用户的时候，只获得了一条数据
   http://usermgr.api.koenn.cn:81/api/ClientUsers/GetAllUsers

3: 获取科室医护人员列表，但是获取的是一个{}(object)，而不是一个[](array)列表。
   http://usermgr.api.koenn.cn:81/api/Sys_User_DeptInfo/GetByDeptCode/002

4: 用户信息缺少电话号码 , 民族， 籍贯， 爱好， 年龄， 身高， 体重， 出生年月日
   建议在注册时创建用户信息，并注入电话号码， -> 同第 8 条

5: 添加医生时，没有检查UserID是否存在， 随便一个值都可以。
   http://sysdata.api.koenn.cn:81/api/Sys_User_Info/Post

6: 获取指定医院指定类型的报表， 但是没有请求所有类型的 api

7: 获取指定报表ID的所有配置项目 报错
   http://cms.api.koenn.cn:81/api/Sys_Table_Item/GetListByTemplateID/1001/1

8: 用户信息中需要用户电话号码，所以在注册的时候，需要直接创建用户信息表，
   如果是始用手机号码注册，则将电话号码字段填充。

9: 创建模板： 拉取模板的数据中，需要将模板中所有已经添加的字段
  如：（["体温|text","性别|select", "爱好|input"]）
  而非现再只有字段ID。
  
10: 报表信息同上： 需要将报表中用到的表格模板名称列出
    具体是否需要include表格模板内容，再议。
