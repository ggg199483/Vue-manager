import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'

import Buttons from '@/views/components/Buttons'

// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'


/* login */
const Login = _import('login/index');
const Register = _import('register/index');
Vue.use(Router);

/**
 * 共有的map
 * @type {*[]}
 */
export const constantRouterMap = [
    {path: '/login', component: Login, hidden: true},
    {path: '/register', component: Register, hidden: true},
    {
        path: '/pages', redirect: '/pages/p404', name: 'Pages',
        component: {
            render(c) {
                return c('router-view')
            }
            // Full,
        },
        children: [{path: '404', name: 'Page404', component: _import('errorPages/Page404')},
            {path: '500', name: 'Page500', component: _import('errorPages/Page404')},
        ]
    }


]

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});




export const adminRouterMap = [

 {
    path: '/',
    redirect: '/admin',
    name: '首页',
    component: Full,
    hidden:false,
    children: [
        {path: '/admin',name: '竞赛信息管理',redirect: '/admin/match',icon:'pie-graph',
            component: {render (c) { return c('router-view') }},
            children: [ {path: 'match',name: '竞赛列表',icon:'stats-bars',component: _import('admin/Match'), hidden:false, },
                //{path: 'MatchPublish',name: '发布竞赛信息',icon:'arrow-graph-up-right',component: _import('admin/MatchPublish'),hidden:false},
            ]
        },
        // {path: '/admin',name: '新闻信息管理',redirect: '/admin/new',icon:'bookmark',
        //     component: {render (c) { return c('router-view') }},
        //     children: [ {path: 'new',name: '新闻列表',icon:'stats-bars',component: _import('admin/New'), hidden:false, },
        //     ]
        // },
     {path: '/NewsInfo',name: '新闻管理',icon:'speedometer',component: _import('admin/NewList')},
     {path: '/dashboard',name: 'Dashboard',icon:'speedometer',component: _import('Dashboard')},
     {path: '/introduction',name: '介绍',icon:'thumbsup',component: _import('Introduction')},
     {path: '/components',name: 'component组件',redirect: '/components/buttons',icon:'bookmark',
        component: {render (c) { return c('router-view') }},
        children: [ {path: 'buttons',name: 'Buttons按钮',icon:'social-youtube',component: _import('components/Buttons'), hidden:false, },
                    {path: 'hoverbuttons',name: '悬停特效按钮',icon:'wand',component: _import('components/HoverButtons')},
                    {path: 'alert',name: 'Alert警告提示',icon:'alert',component: _import('components/Alert')},
                    {path: 'card',name: 'Card卡片',icon:'ios-browsers-outline',component: _import('components/Card')},
                    {path: 'datepicker',name: 'DatePicker',icon:'ios-calendar-outline',component: _import('components/DatePicker')},
                    {path: 'form',name: 'Form表单',icon:'ios-list-outline',component: _import('components/Form')},
                    {path: 'modal',name: 'Modal对话框',icon:'ios-chatbubble-outline',component: _import('components/Modal')},
                    {path: 'select',name: 'Select选择器',icon:'ios-arrow-down',component: _import('components/Select')},
                    {path: 'spin',name: 'Spin加载中',icon:'load-d ',component: _import('components/Spin')},
                    {path: 'steps',name: 'Steps步骤条',icon:'ios-checkmark-outline',component: _import('components/Steps')},
                    {path: 'timeline',name: 'Timeline时间轴',icon:'android-more-vertical',component: _import('components/Timeline')},
                    {path: 'transfer',name: 'Transfer穿梭框',icon:'ios-pause-outline',component: _import('components/Transfer')},
                    {path: 'timepicker',name: 'Timepicker',icon:'ios-clock-outline',component: _import('components/Timepicker')},
                    {path: 'upload',name: 'Upload上传',icon:'ios-cloud-upload-outline',component: _import('components/Upload')},
                  ]
      },
       {path: '/charts',name: 'echart图表',redirect: '/charts/shopchart',icon:'pie-graph',
        component: {render (c) { return c('router-view') }},
        children: [ {path: 'shopchart',name: '商场统计图表',icon:'stats-bars',component: _import('charts/ShopChart'), hidden:false, },
                    {path: 'radarchart',name: '雷达图',icon:'arrow-graph-up-right',component: _import('charts/RadarChart')},
                    {path: 'cakechart',name: '蛋糕销量图表',icon:'ios-analytics',component: _import('charts/CakeChart')}
                  ]
      },
      {path: '/table', name: '表格综合实例',icon:'ios-paper',component: _import('Table'),meta: { role: ['admin'] }},
      {path: '/jsontree', name: 'JSON视图',icon:'merge',component: _import('JsonTree')},
      {path: '/tabledetail/:id',name: 'TableDetail', hidden:true, component: _import('TableDetail')},
      // {path: '/tinymce',name: 'Tinymce编辑器',icon:"android-document",component: _import('Tinymce')},
      {path: '/markdown',name: 'Markdown',icon:"android-list",component: _import('Markdown')},
    {path: '/News', name: '新闻', icon: "android-list", component: _import('user/News'),hidden : true},
    {path: '/NewsInfo', name: '新闻详情', icon: "android-list", component: _import('user/NewsInfo'),hidden : true},
    ]
  },


    {path: '*', redirect: '/pages/404', hidden: true}

];


export const studentRouterMap = [

    {
        path: '/',
        redirect: '/student/News',
        name: '首页',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/student', name: '新闻', redirect: '/student/News', icon: 'pie-graph',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'News',
                    name: '竞赛新闻',
                    icon: 'stats-bars',
                    component: _import('user/News'),
                    hidden: false,
                },
                    {
                        path: 'NewsInfo',
                        name: '竞赛新闻详情',
                        icon: 'arrow-graph-up-right',
                        component: _import('user/NewsInfo'),
                        hidden: true
                    },
                ]
            },
            {
                path: '/components', name: 'component组件', redirect: '/components/buttons', icon: 'bookmark',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'buttons',
                    name: 'Buttons按钮',
                    icon: 'social-youtube',
                    component: _import('components/Buttons'),
                    hidden: false,
                },
                    {path: 'hoverbuttons', name: '悬停特效按钮', icon: 'wand', component: _import('components/HoverButtons')},
                    {path: 'alert', name: 'Alert警告提示', icon: 'alert', component: _import('components/Alert')},
                    {path: 'card', name: 'Card卡片', icon: 'ios-browsers-outline', component: _import('components/Card')},
                    {
                        path: 'datepicker',
                        name: 'DatePicker',
                        icon: 'ios-calendar-outline',
                        component: _import('components/DatePicker')
                    },
                    {path: 'form', name: 'Form表单', icon: 'ios-list-outline', component: _import('components/Form')},
                    {
                        path: 'modal',
                        name: 'Modal对话框',
                        icon: 'ios-chatbubble-outline',
                        component: _import('components/Modal')
                    },
                    {
                        path: 'select',
                        name: 'Select选择器',
                        icon: 'ios-arrow-down',
                        component: _import('components/Select')
                    },
                    {path: 'spin', name: 'Spin加载中', icon: 'load-d ', component: _import('components/Spin')},
                    {
                        path: 'steps',
                        name: 'Steps步骤条',
                        icon: 'ios-checkmark-outline',
                        component: _import('components/Steps')
                    },
                    {
                        path: 'timeline',
                        name: 'Timeline时间轴',
                        icon: 'android-more-vertical',
                        component: _import('components/Timeline')
                    },
                    {
                        path: 'transfer',
                        name: 'Transfer穿梭框',
                        icon: 'ios-pause-outline',
                        component: _import('components/Transfer')
                    },
                    {
                        path: 'timepicker',
                        name: 'Timepicker',
                        icon: 'ios-clock-outline',
                        component: _import('components/Timepicker')
                    },
                    {
                        path: 'upload',
                        name: 'Upload上传',
                        icon: 'ios-cloud-upload-outline',
                        component: _import('components/Upload')
                    },
                ]
            },
            {
                path: '/charts', name: 'echart图表', redirect: '/charts/shopchart', icon: 'pie-graph',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'shopchart',
                    name: '商场统计图表',
                    icon: 'stats-bars',
                    component: _import('charts/ShopChart'),
                    hidden: false,
                },
                    {
                        path: 'radarchart',
                        name: '雷达图',
                        icon: 'arrow-graph-up-right',
                        component: _import('charts/RadarChart')
                    },
                    {path: 'cakechart', name: '蛋糕销量图表', icon: 'ios-analytics', component: _import('charts/CakeChart')}
                ]
            },

            {path: '/jsontree', name: 'JSON视图', icon: 'merge', component: _import('JsonTree')},
            {path: '/tabledetail/:id', name: 'TableDetail', hidden: true, component: _import('TableDetail')},
            // {path: '/tinymce',name: 'Tinymce编辑器',icon:"android-document",component: _import('Tinymce')},
            {path: '/markdown', name: 'Markdown', icon: "android-list", component: _import('Markdown')},
            {path: '/News', name: '新闻', icon: "android-list", component: _import('user/News'),hidden : true},
            {path: '/NewsInfo', name: '新闻详情', icon: "android-list", component: _import('user/NewsInfo'),hidden : true},
        ]
    },

    {path: '*', redirect: '/pages/404', hidden: true}

];


export const teacherRouterMap = [

    {
        path: '/',
        redirect: '/teacher',
        name: '首页',
        component: Full,
        hidden: false,
        children: [
            {path: '/teacher',name: '竞赛信息',redirect: '/teacher/match',icon:'pie-graph',
                component: {render (c) { return c('router-view') }},
                children: [ {path: 'match',name: '竞赛列表',icon:'stats-bars',component: _import('admin/Match'), hidden:false, },
                    //{path: 'MatchPublish',name: '发布竞赛信息',icon:'arrow-graph-up-right',component: _import('admin/MatchPublish'),hidden:false},
                ]
            },
            {
                path: '/components', name: 'component组件', redirect: '/components/buttons', icon: 'bookmark',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'buttons',
                    name: 'Buttons按钮',
                    icon: 'social-youtube',
                    component: _import('components/Buttons'),
                    hidden: false,
                },
                    {path: 'hoverbuttons', name: '悬停特效按钮', icon: 'wand', component: _import('components/HoverButtons')},
                    {path: 'alert', name: 'Alert警告提示', icon: 'alert', component: _import('components/Alert')},
                    {path: 'card', name: 'Card卡片', icon: 'ios-browsers-outline', component: _import('components/Card')},
                    {
                        path: 'datepicker',
                        name: 'DatePicker',
                        icon: 'ios-calendar-outline',
                        component: _import('components/DatePicker')
                    },
                    {path: 'form', name: 'Form表单', icon: 'ios-list-outline', component: _import('components/Form')},
                    {
                        path: 'modal',
                        name: 'Modal对话框',
                        icon: 'ios-chatbubble-outline',
                        component: _import('components/Modal')
                    },
                    {
                        path: 'select',
                        name: 'Select选择器',
                        icon: 'ios-arrow-down',
                        component: _import('components/Select')
                    },
                    {path: 'spin', name: 'Spin加载中', icon: 'load-d ', component: _import('components/Spin')},
                    {
                        path: 'steps',
                        name: 'Steps步骤条',
                        icon: 'ios-checkmark-outline',
                        component: _import('components/Steps')
                    },
                    {
                        path: 'timeline',
                        name: 'Timeline时间轴',
                        icon: 'android-more-vertical',
                        component: _import('components/Timeline')
                    },
                    {
                        path: 'transfer',
                        name: 'Transfer穿梭框',
                        icon: 'ios-pause-outline',
                        component: _import('components/Transfer')
                    },
                    {
                        path: 'timepicker',
                        name: 'Timepicker',
                        icon: 'ios-clock-outline',
                        component: _import('components/Timepicker')
                    },
                    {
                        path: 'upload',
                        name: 'Upload上传',
                        icon: 'ios-cloud-upload-outline',
                        component: _import('components/Upload')
                    },
                ]
            },
            {
                path: '/charts', name: 'echart图表', redirect: '/charts/shopchart', icon: 'pie-graph',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'shopchart',
                    name: '商场统计图表',
                    icon: 'stats-bars',
                    component: _import('charts/ShopChart'),
                    hidden: false,
                },
                    {
                        path: 'radarchart',
                        name: '雷达图',
                        icon: 'arrow-graph-up-right',
                        component: _import('charts/RadarChart')
                    },
                    {path: 'cakechart', name: '蛋糕销量图表', icon: 'ios-analytics', component: _import('charts/CakeChart')}
                ]
            },


            {path: '/jsontree', name: 'JSON视图', icon: 'merge', component: _import('JsonTree')},
            {path: '/tabledetail/:id', name: 'TableDetail', hidden: true, component: _import('TableDetail')},
            // {path: '/tinymce',name: 'Tinymce编辑器',icon:"android-document",component: _import('Tinymce')},
            {path: '/markdown', name: 'Markdown', icon: "android-list", component: _import('Markdown')},
            {path: '/News', name: '新闻', icon: "android-list", component: _import('user/News'),hidden : true},
            {path: '/NewsInfo', name: '新闻详情', icon: "android-list", component: _import('user/NewsInfo'),hidden : true},

        ]
    },

    // {
    //     path: '/NewsInfo',
    //     name: '新闻页面',
    //     component: Full,
    //     hidden:false,
    //     children: [
    //         {path: '/NewsInfo',name: '老师竞赛新闻',icon:'speedometer',component: _import('teacher/NewsInfo')},
    //
    //     ]
    // },


    {path: '*', redirect: '/pages/404', hidden: true}

];
