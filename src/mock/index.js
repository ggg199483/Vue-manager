import Mock from 'mockjs';
import loginAPI from './login';


// 登出 删除
// Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)
// Mock.mock(/\/user\/get-news\.*/, 'get', loginAPI.newsInfo)



export default Mock;
