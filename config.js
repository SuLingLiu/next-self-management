//配置环境变量
const NODE_ENV = process.env.NODE_ENV;
let domain = '';
let MONGODB_URI = 'mongodb://127.0.0.1:27017/selfManagement';
if (NODE_ENV == 'production') {
  domain = "10.2.140.94";
} else if (NODE_ENV == 'test') {
  domain = "127.0.0.1";
} else {
  domain = "localhost";
}
module.exports = {
  domain: domain,
  domainUrl: 'http://'+domain,
  MONGODB_URI: MONGODB_URI
}