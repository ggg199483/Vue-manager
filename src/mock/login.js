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
    const { email } = JSON.parse(config.body);
      return userMap[email.split('@')[0]];
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('a');
    }
  },
  logout: () => 'success'
};
