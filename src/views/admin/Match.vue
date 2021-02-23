<template>
    <div>

        <h3>👍比赛信息页面👍</h3>
        <div>
            <el-table
                    :data="matchList"
                    border
            >
                <el-table-column
                        prop="startDate"
                        label="开始报名日期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="endDate"
                        label="结束报名日期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="发布日期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="teacherName"
                        label="老师" >
                </el-table-column>
                <el-table-column
                        prop="college"
                        label="学院">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="竞赛类型">
                </el-table-column>
                <el-table-column
                        prop="maxCount"
                        label="人数">
                </el-table-column>
                <el-table-column
                        prop="stuNum"
                        label="报名人数">
                </el-table-column>

                <el-table-column label="操作"  align="center">

                    <template slot-scope="scope">

                        <el-button type="primary"  size="small" @click="checkDetail(scope.row.id)">操作</el-button>
                    </template>
                </el-table-column>

            </el-table>

        </div>

        <!--<div class="animated fadeIn">-->


        <Row>


            <Col :sm="24" :md="8">


            <Table :data="matchList">


            </Table>


            <el-button type="input" @click="dialogFormVisible = true">添加竞赛信息</el-button>

            <el-pagination
                    @size-change="handleSizeChange"
                    layout="prev, pager, next, jumper"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20]"
                    :page-count="5"
                    :total="total">
            </el-pagination>

            </Col>


        </Row>


        <el-dialog title="添加竞赛信息" :visible.sync="dialogFormVisible">
            <Form :model="publishForm" :label-width="80" :rules="ruleInline"  ref="publishForm" >

                <Form-item label="题目" prop="title">
                    <Input v-model="publishForm.title" placeholder="请输入"></Input>
                </Form-item>

                <Form-item label="类型">
                    <Radio-group v-model="publishForm.type">
                        <Radio label="项目">项目</Radio>
                        <Radio label="竞赛">竞赛</Radio>
                    </Radio-group>
                </Form-item>

                <Form-item label="开始日期">
                    <el-date-picker
                            v-model="publishForm.startTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </Form-item>

                <Form-item label="截止日期"  >
                    <el-date-picker
                            prop="endTime"
                            v-model="publishForm.endTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </Form-item>

                <Form-item label="学院"  >
                    <el-select v-model="publishForm.college" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </Form-item>

                <Form-item label="最大人数"  >
                    <Input style="width: 30%;" v-model="publishForm.maxCount" ></Input>
                </Form-item>

            </Form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toPublish('publishForm')">确 定</el-button>
            </div>
        </el-dialog>



        <Row>
            <Col span="15" >

            </Col>

        </Row>


    </div>
</template>

<script>
    import fetch from 'utils/fetch';
    import Cookies from 'js-cookie';

    export default {
        name: 'Match',
        data() {
            var checkTime = (rule, value, callback) => {
                console.log(value);
                if (!value) {
                    console.log(1111)
                    return callback(new Error('结束时间不能为空'));
                }
                if(this.publishForm.startTime <  this.publishForm.endTime){
                    console.log(222)

                    return callback();

                }else{
                    console.log(3333)

                    return callback(new Error('结束时间要比开始时间大'));
                }
            };
            return {
                ruleInline: {
                    title: [
                        { required: true, message: '请填写标题', trigger: 'blur' }
                    ]
                    // ,
                    // endTime: [
                    //     { validator: checkTime, trigger: 'change' }
                    // ]
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                value1:'',
                matchList: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                publishForm: {
                    title: '',
                    type: '项目',
                    startTime:'',
                    endTime: '',
                    maxCount:10,
                    college:2
                },
                options:[
                    {
                        id:1,
                        value:"计算机工程学院"
                    },
                    {
                        id:2,
                        value:"外国语学院"
                    },
                    {
                        id:3,
                        value:"新闻与传播学院"
                    },
                    {
                        id:4,
                        value:"经济与管理学院"
                    },

                    ]
            }
        },
        methods: {
            checkDetail(val){
                alert(Cookies.get("Admin-Token"))

            },
            getMatch() {
                const data = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
                fetch({
                    url: '/admin/get-match',
                    method: 'get',
                    params: data
                }).then(response => {
                    console.log(response.data)
                    if (response.data.code == 200) {
                        this.matchList = response.data.data.list;
                        this.total = response.data.data.total  // 总条目数
                        this.currentPage = response.data.data.pageNum  // 当前页码
                    } else {
                        this.$Message.error(response.data.message);
                    }
                });
            },
            handleSizeChange(val) { //每页大小改变时
                this.pageSize = val;
                this.getMatch()
            },
            handleCurrentChange(val) {  //页码改变时
                console.log("val:" + val)
                console.log(this.currentPage)
                this.currentPage = val;
                this.getMatch()
                console.log(`当前页: ${val}`);
            },
            toPublish(publishForm){
                this.$refs[publishForm].validate((valid) => {
                    if (valid) {
                        console.log("pppppp")
                        this.publishMatch();
                    } else {
                       alert("请填写完表单再提交!");
                        return false;
                    }
                });



            },
            publishMatch(){
                console.log("-------")
                //验证信息
                var title = this.publishForm.title;
                var startTime = this.publishForm.startTime;
                var endTime = this.publishForm.endTime;
                console.log()
                var type = this.publishForm.type;
                var maxCount=this.publishForm.maxCount;
                var college=this.publishForm.college;

                const data = {
                    title,
                    startTime,
                    endTime,
                    type,
                    maxCount,
                    college
                };
                fetch({
                    url: '/admin/publish-match',
                    method: 'post',
                    data

                }).then(response => {
                    console.log(response.data)
                    if (response.data.code == 200) {
                        // alert(response.data.message);
                        this.getMatch();
                        this.dialogFormVisible = false;
                        this.$Message.success(response.data.message);
                        this.publishForm.startTime='';
                        this.publishForm.endTime='';
                        this.publishForm.title='';
                    } else {
                        alert(response.data.message);
                    }
                });
            }
            // compare(val){
            //
            // }

        },
        mounted() {

            this.getMatch();

            const token = this.$store.getters.token;
            console.log(token);
            const roles = this.$store.getters.roles;
            console.log(roles);



        }
    }
</script>


<style type="text/css" scoped>
    .state-overview {
        color: #fff
    }

    .state-overview .ivu-col {
        margin-bottom: 20px
    }

    .state-overview .state-value .value {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 5px
    }

    .state-overview .state-value .title {
        font-size: 14px
    }

    .state-value {
        width: 60%;
        display: inline-block
    }

    .symbol {
        width: 35%;
        display: inline-block
    }

    .state-overview .panel {
        border-radius: 4px;
        padding: 25px 20px
    }

    .panel.purple {
        background: #6a8abe;
        box-shadow: 0 5px 0 #5f7cab
    }

    .panel.red {
        background-color: #fc8675;
        box-shadow: 0 5px 0 #e27869
    }

    .panel.blue {
        background: #5ab6df;
        box-shadow: 0 5px 0 #51a3c8
    }

    .panel.green {
        background: #4acacb;
        box-shadow: 0 5px 0 #42b5b6
    }

    .dash_income_chart {
        float: left
    }

    .ivu-row {
        margin-bottom: 20px !important
    }

    .dash_income {
        border-radius: 4px;
        background-color: #fff;
        height: 80px;
        padding: 15px
    }

    .staff_name {
        font-weight: 900;
        font-size: 16px
    }

    .staff_progress {
        margin-left: 10px;
        width: 90%
    }

    .staff_progress p {
        margin: 0
    }

    .staff_list {
        border-radius: 4px;
        margin-top: 0;
        height: 90px;
        display: flex;
        align-items: center
    }

    .animated {
        background-color: #eff0f4
    }

    li {
        margin-bottom: 11px;
        margin-left: 10px;
        margin-right: 10px
    }

    .num {
        font-weight: 700
    }

    .time {
        font-size: 14px;
        font-weight: 700
    }

    .content {
        padding-left: 5px
    }

    .dashboard_feature {
        text-align: center
    }

    .demo-carousel {
        height: 600px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e
    }

    .demo-carousel img {
        height: 100%;
        width: 100%
    }

    h3, h4, h5 {
        margin: 12px
    }

    h3 {
        margin-bottom: 20px
    }

    p {
        margin: 12px
    }

    .row-margin-top {
        margin-top: 30px
    }

    .state-info {
        position: absolute;
        right: 15px;
        top: 20px;
        margin-bottom: 30px
    }

    .state-info .panel {
        margin-bottom: 20px;
        float: right;
        margin-left: 15px
    }

    .panel {
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05)
    }

    .panel-body {
        padding: 15px
    }

    .state-info .panel .summary {
        float: left;
        margin-right: 20px
    }

    .state-info .panel .summary span {
        color: #49586e;
        font-size: 13px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 10px
    }

    .state-info .panel .summary h3.red-txt {
        color: #fc8675
    }

    .state-info .panel .summary h3.green-txt {
        color: #65cea7
    }

    .state-info .panel .summary h3 {
        font-size: 200%;
        font-weight: 700;
        line-height: 20px;
        margin: 0
    }

    .page-heading h3 {
        color: #49586e;
        font-size: 25px;
        font-size: 11%;
        font-weight: 400;
        margin: 10px 0
    }

    .chart-bar {
        float: right;
        margin-top: 5px
    }

    .chart-bar img {
        display: inline-block;
        width: 68px;
        height: 45px;
        vertical-align: top
    }

    @media screen and (max-width: 767px) {
        .state-info {
            position: static;
            width: 100%;
            margin-top: 15px
        }

        .state-info .panel {
            width: 100%
        }
    }

    .panel.blue-box {
        background: none repeat scroll 0 0 #5ab5de;
        box-shadow: 0 5px 0 #51a3c7;
        color: #fff
    }

    .twt-info h3 {
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 900;
        margin: 10px 0 30px 0;
        text-align: center
    }

    .twt-info p {
        font-size: 18px;
        line-height: 25px;
        font-style: italic;
        margin: 0 0 20px 0;
        text-align: center
    }

    .twt-info p a {
        color: #98fdf4
    }

    .media:first-child {
        margin-top: 0
    }

    .media.usr-info > .pull-left {
        margin-right: 20px;
        margin-top: 10px
    }

    .media > .pull-left {
        margin-right: 10px
    }

    .pull-left {
        float: left
    }

    .pull-left {
        float: left !important
    }

    .custom-trq-footer {
        background: none repeat scroll 0 0 #4eb6b7 !important;
        box-shadow: 0 5px 0 #46a3a4;
        color: #fff;
        border-top: none
    }

    .panel-footer {
        padding: 10px 15px;
        background-color: #f5f5f5;
        border-top: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px
    }

    .usr-info .thumb {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        -webkit-border-radius: 50%
    }

    .usr-info img {
        vertical-align: middle
    }

    .usr-info h4 {
        color: #658585;
        margin-bottom: 0
    }

    .media-heading {
        margin: 0 0 5px
    }

    .usr-info .media-body span {
        color: #ea755c;
        font-size: 12px;
        margin-bottom: 20px;
        display: inline-block
    }

    .usr-info .media-body p {
        color: #b6bcbc
    }

    ul.user-states {
        list-style-type: none;
        padding: 20px 0
    }

    ul.user-states li {
        text-align: center;
        float: left;
        width: 33%;
        font-size: 18px;
        margin: 0
    }
</style>