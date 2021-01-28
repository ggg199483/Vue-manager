import { param2Obj } from 'utils';

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    name: 'Super Admin',
    uid: '001'
  },
  teacher: {
    role: ['teacher'],
    token: 'teacher',
    introduction: '我是老师',
    name: 'Normal Teacher',
    uid: '002'


  },
  student: {
    role: ['student'],
    token: 'student',
    introduction: '我是学生',
    name: '学生高天',
    uid: '003'
  }
}

export default {
  loginByEmail: config => {
    // var result = new Map();
    // result.set("code" , 200);
    // result.set("message" , '登陆成功');
    // result.set("data" , userMap['student']);
    var result ={
      code:200,
      message:"登陆成功",
      data:userMap['student'],
      token:'fajlkfjaklj',
    }
    console.log(result);
    return result;
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);

    return userMap['student'];
  },
  newsInfo: config => {


    return JSON.parse("{\"code\":200,\"data\":{\"endRow\":10,\"hasNextPage\":true,\"hasPreviousPage\":false,\"isFirstPage\":true,\"isLastPage\":false,\"list\":[{\"id\":1,\"status\":true,\"title\":\"深圳天气不错呀\"},{\"id\":2,\"status\":true,\"title\":\"哈哈哈\"},{\"id\":3,\"status\":true,\"title\":\"你还发还是返回了看好\"},{\"id\":4,\"status\":true,\"title\":\"发电量咖啡机奥克兰家\"},{\"id\":5,\"status\":true,\"title\":\"深圳天气不错呀5\"},{\"id\":6,\"status\":true,\"title\":\"深圳天气不错呀6\"},{\"id\":7,\"status\":true,\"title\":\"深圳天气不错呀ff\"},{\"id\":8,\"status\":true,\"title\":\"深圳天气不错呀7\"},{\"id\":9,\"status\":true,\"title\":\"深圳天气不错呀8\"},{\"id\":10,\"status\":true,\"title\":\"深圳天气不错呀9\"}],\"navigateFirstPage\":1,\"navigateLastPage\":3,\"navigatePages\":8,\"navigatepageNums\":[1,2,3],\"nextPage\":2,\"pageNum\":1,\"pageSize\":10,\"pages\":3,\"prePage\":0,\"size\":10,\"startRow\":1,\"total\":29},\"message\":\"success\"}");
  },
  logout: () => 'success'
};
