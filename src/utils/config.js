const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

const root = 'koenn.cn'
const port = 81
const server = {
  // 注册
  register: `http://reg.${root}:${port}`,
  // 登陆
  auth: `http://auth.${root}:${port}`,
  // 用户
  user: `http://usermgr.api.${root}:${port}`,
  // 用户体征信息
  userData: `http://userdata.api.${root}:${port}`,
  // 系统
  system: `http://sysdata.api.${root}:${port}`,
  // 文件
  file: `http://fileserver.api.${root}:${port}`,
  // 模板
  cms: `http://cms.api.${root}:${port}`,
}

const server2 = {
  // 注册
  register: `http://reg.${root}:${port}`,
  // 登陆
  auth: `http://auth.${root}:${port}`,
  // 用户
  user: `http://localhost:3001`,
  // 用户体征信息
  userData: `http://localhost:3002`,
  // 系统
  system: `http://localhost:3003`,
  // 文件
  file: `http://localhost:3004`,
  // 模板
  cms: `http://localhost:3005`,
}

module.exports = {
  server: server2,
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: '/public/logo.svg',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
}
