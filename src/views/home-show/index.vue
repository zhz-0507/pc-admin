<template>
  <div class="home-wrapper">
    <el-container>
      <el-header>
        <NavBar
          @onhandleSelect="onhandleSelect" 
          :imgURL="imgURL"
          :isShowAdmin="isShowAdmin"
          :INDEXVAL="INDEXVAL"
          ref="refNavs"
        >
        </NavBar>
      </el-header>

      <!-- 首页 -->
      <el-main v-if="showVal === 1">
        <div class="bg">

        </div>
        <div class="page_content-index">
          <div class="conten-index-title">减压大本营</div>
          <div class="content-index-wrap">
             <div class="page_content">
              <div class="teacher_s" >
                <div class="block" v-for="(newInfo,index) in dabenyingList" :key="index"> 
                  <div class="title">{{newInfo.title}}</div>
                  <div>
                    <el-avatar shape="square" :size="200" :src="newInfo.image"></el-avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <div class="page_content-index">
          <div class="conten-index-title">问卷调查</div>
          <div class="content-index-wrap">
             <div class="page_content">
              <div class="teacher_s">
                <div class="block" v-for="(item,index) in questionList" :key="index"> 
                  <div class="title">{{item.title}}</div>
                  <div>
                    <el-avatar shape="square" :size="200" :src="item.image"></el-avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   

        <div class="page_content-index">
          <div class="conten-index-title">心理老师</div>
          <div class="content-index-wrap">
             <div class="page_content">
              <div class="teacher_s">
                <div class="block" v-for="(teacher,index) in teacherList" :key="index"> 
                  <div class="title">{{teacher.nickName}}</div>
                  <div>
                    <el-avatar shape="square" :size="200" :src="teacher.path"></el-avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <div class="page_content-index">
          <div class="conten-index-title">心闻推荐</div>
          <div class="content-index-wrap">
             <div class="page_content">
              <div class="teacher_s"> 
                <div class="block" v-for="(newInfo,index) in newInfoList" :key="index"> 
                  <div class="title">{{newInfo.title}}</div>
                  <div>
                    <el-avatar shape="square" :size="200" :src="newInfo.image"></el-avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <div class="page_content-index">
          <div class="conten-index-title">心理辅导</div>
          <div class="content-index-wrap">
             <div class="page_content">
              <div class="teacher_s" >
                <div class="block" v-for="(item,index) in fudaoList" :key="index"> 
                  <div class="title">{{item.title}}</div>
                  <div>
                    <el-avatar shape="square" :size="200" :src="item.image"></el-avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>                   
      </el-main>

      <!-- 问卷调查 -->
      <el-main v-if="showVal === 2">
        <div class="page_content">

          <div class="teacher_s"  v-show="!isShowFormE">
            <div class="block" v-for="(item,index) in questionList" :key="index"> 
              <div class="title">{{item.title}}</div>
              <div @click="goToQuestion(item)">
                <el-avatar shape="square" :size="200" :src="item.image"></el-avatar>
              </div>
            </div>
          </div>

          <div v-show="!isShowFormE">
            <el-pagination
             @current-change="handleCurrentChangeE"
             @size-change="handleSizeChangeE" 
              background
              layout="total, prev, pager, next"
              :current-page="pageNumE"
              :page-sizes="[1,2,5,10]"
              :total="totalCountE"
              :page-size="pageSizeE"
              >
            </el-pagination>
          </div>
      
          <div class="question_index" v-show="isShowFormE">
            <template >
              <div class='teache_index_s'>
                <div v-for="(item,index) in queslist" :key="index">
                  <div class="sss_title">第{{index+1}}题:{{item.title}}</div>
                  <div class="s_from_q">
                    <div class="form-radio-signle">
                       <el-radio  @change="handleQuestion" v-model="item.result" label="A">A</el-radio><span>{{item.a}}</span>
                    </div>
                    <div class="form-radio-signle">
                       <el-radio  @change="handleQuestion" v-model="item.result" label="B">B</el-radio><span>{{item.b}}</span>
                    </div>
                    <div class="form-radio-signle">
                       <el-radio  @change="handleQuestion" v-model="item.result" label="C">C</el-radio><span>{{item.c}}</span>
                    </div>
                    
                  </div>
                </div>

                <div class="sss_btn">
                  <el-button type="primary" @click="handlesubmitTest">提交</el-button>
                </div>

              </div>
            </template>
          </div>

        </div>      
      </el-main>

      <!-- 心理老师 -->
      <el-main v-if="showVal === 3">
        <div class="page_content">

          <div class="teacher_s"  v-show="!isShowForm">
            <div class="block" v-for="(teacher,index) in teacherList" :key="index"> 
              <div class="title">{{teacher.nickName}}</div>
              <div @click="goToConsult(teacher)">
                <el-avatar shape="square" :size="200" :src="teacher.path"></el-avatar>
              </div>
            </div>
          </div>

          <div v-show="!isShowForm">
            <el-pagination
             @current-change="handleCurrentChange"
             @size-change="handleSizeChange" 
              background
              layout="total, prev, pager, next"
              :current-page="pageNum"
              :page-sizes="[1,2,5,10]"
              :total="totalCount"
              :page-size="pageSize"
              >
            </el-pagination>
          </div>
      
          <div class="teache_index" v-show="isShowForm">
            <template >
              <div class='teache_index_s'>
                <div class="s_title">心理咨询填写</div>
                <div class="s_from">
                  <div class="l_form_l">
                    姓名&nbsp;&nbsp;<el-input v-model="teacherEdit.sname" placeholder="请输入姓名"></el-input>
                  </div>
                  <div class="l_form_l">
                    性别&nbsp;&nbsp;<el-radio v-model="teacherEdit.sex" label="1">男</el-radio>
                        <el-radio v-model="teacherEdit.sex" label="2">女</el-radio>
                  </div>
                  <div class="l_form_l">
                    学号&nbsp;&nbsp;<el-input v-model="teacherEdit.sno" placeholder="请输入学号"></el-input>
                  </div>
                  <div class="l_form_l">
                    手机号&nbsp;&nbsp;<el-input v-model="teacherEdit.phone" placeholder="请输入手机号"></el-input>
                  </div>
                  <div class="l_form_l">
                    我要咨询&nbsp;&nbsp;<el-input type="textarea"  v-model="teacherEdit.message" placeholder="请输入我要咨询"></el-input>
                  </div>
                </div>

                <div class="s_btn">
                  <el-button type="primary" @click="handleTeacherTalk">提交</el-button>
                </div>

              </div>
            </template>
          </div>

        </div>      
      </el-main>

      <!-- 大本营 -->
      <el-main v-if="showVal === 4">
        <div class="page_content">
          <div class="teacher_s"  v-show="!isShowFormD">
            <div class="block" v-for="(newInfo,index) in dabenyingList" :key="index"> 
              <div class="title">{{newInfo.title}}</div>
              <div @click="gotoDabenying(newInfo)">
                <el-avatar shape="square" :size="200" :src="newInfo.image"></el-avatar>
              </div>
            </div>
          </div>
        </div>

        <div v-show="!isShowFormD" class="new-class">
          <el-pagination
            @current-change="handleCurrentChangeD"
            @size-change="handleSizeChangeD" 
            background
            layout="total, prev, pager, next"
            :current-page="pageNumD"
            :page-sizes="[1,2,5,10]"
            :total="totalCountD"
            :page-size="pageSizeD"
            >
          </el-pagination>        
        </div>

        <div v-show="isShowFormD">
          <el-descriptions title="减压信息" direction="vertical" :column="4" border>
          <el-descriptions-item label="标题">{{this.dabenyingData.title}}</el-descriptions-item>
            <el-descriptions-item label="简介">{{this.dabenyingData.detail}}</el-descriptions-item>
            <el-descriptions-item label="音乐" >
              <el-avatar :size="30" :src="this.dabenyingData.path">
                <audio :src="this.dabenyingData.path">当前浏览器不支持audio标签</audio>
                <audio
                ref="audio"
                preload="auto"
                src="http://www.liangshuai.vip/wifi/M00/00/01/rBUACmCc13aAKQsrACvro5SYPCw849.mp3"
               
                style="display: none"
                ></audio>
              </el-avatar>
            </el-descriptions-item>
            <el-descriptions-item label="图片" >
              <el-avatar :size="30" :src="this.dabenyingData.image"></el-avatar>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">{{this.dabenyingData.createTime}}</el-descriptions-item>
            <el-descriptions-item label="教师姓名">{{this.dabenyingData.sname}}</el-descriptions-item>
          </el-descriptions>    

          
          <div class="ss_btn">
            <el-button type="primary" @click="goBack">返回</el-button>
          </div>
        </div>
      </el-main>

      <!-- 心闻推送 -->
      <el-main v-if="showVal === 5">
        <div class="page_content">
          <div class="teacher_s"  v-show="!isShowFormB">
            <div class="block" v-for="(newInfo,index) in newInfoList" :key="index"> 
              <div class="title">{{newInfo.title}}</div>
              <div @click="goToNews(newInfo)">
                <el-avatar shape="square" :size="200" :src="newInfo.image"></el-avatar>
              </div>
            </div>
          </div>
        </div>

        <div v-show="!isShowFormB" class="new-class">
          <el-pagination
            @current-change="handleCurrentChangeB"
            @size-change="handleSizeChangeB" 
            background
            layout="total, prev, pager, next"
            :current-page="pageNumB"
            :page-sizes="[1,2,5,10]"
            :total="totalCountB"
            :page-size="pageSizeB"
            >
          </el-pagination>        
        </div>

        <div v-show="isShowFormB">
          <el-descriptions title="心闻推荐" direction="vertical" :column="4" border>
          <el-descriptions-item label="标题">{{this.newsdata.title}}</el-descriptions-item>
            <el-descriptions-item label="教师姓名">{{this.newsdata.sname}}</el-descriptions-item>
            <el-descriptions-item label="图片" :span="2">
              <el-avatar :size="30" :src="this.newsdata.image"></el-avatar>
            </el-descriptions-item>
            <el-descriptions-item label="内容">
              <el-tag size="small">{{this.newsdata.content}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">{{this.newsdata.createTime}}</el-descriptions-item>
          </el-descriptions>    

          <div class="ss_btn">
            <el-button type="primary" @click="goBack">返回</el-button>
          </div>
        </div>
      </el-main>

      <!-- 心理辅导 -->
      <el-main v-if="showVal === 6">
        <div class="page_content">
          <div class="teacher_s"  v-show="!isShowFormC">
            <div class="block" v-for="(item,index) in fudaoList" :key="index"> 
              <div class="title">{{item.title}}</div>
              <div @click="goTofudao(item)">
                <el-avatar shape="square" :size="200" :src="item.image"></el-avatar>
              </div>
            </div>
          </div>
        </div>

        <div v-show="!isShowFormC" class="new-class">
          <el-pagination
            @current-change="handleCurrentChangeC"
            @size-change="handleSizeChangeC" 
            background
            layout="total, prev, pager, next"
            :current-page="pageNumC"
            :page-sizes="[1,2,5,10]"
            :total="totalCountC"
            :page-size="pageSizeC"
            >
          </el-pagination>        
        </div>

        <div v-show="isShowFormC">
          <el-descriptions title="心理辅导" direction="vertical" :column="4" border>
          <el-descriptions-item label="标题">{{this.fufaodata.title}}</el-descriptions-item>
            <el-descriptions-item label="类型">{{this.fufaodata.type}}</el-descriptions-item>
            <el-descriptions-item label="图片" :span="2">
              <el-avatar :size="30" :src="this.fufaodata.image"></el-avatar>
            </el-descriptions-item>
            <el-descriptions-item label="内容">
              <el-tag size="small">{{this.fufaodata.content}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="教师姓名">{{this.fufaodata.sname}}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{this.fufaodata.createTime}}</el-descriptions-item>
          </el-descriptions>    

          <div class="ss_btn">
            <el-button type="primary" @click="goBack">返回</el-button>
          </div>
        </div>


          
      </el-main>

      <!-- 个人中心 -->
      <el-main v-if="showVal === 8">
        <div class="person-index" v-show="isShowFormF">
          <div class="header_img">
            <img src="" alt="">
          </div>
          <div class="content_txt">
            <div class="content_r">
              <p class="one">个人信息</p>
              <p>学生姓名&nbsp;&nbsp;<span>{{this.personInfo.sname}}</span></p>
              <p>学号&nbsp;&nbsp;<span>{{this.personInfo.sno}}</span></p>
              <p>性别&nbsp;&nbsp;<span>{{this.personInfo.sex}}</span></p>
              <p>年级&nbsp;&nbsp;<span>{{this.personInfo.grade}}</span></p>
              <p>学科&nbsp;&nbsp;<span>{{this.personInfo.subject}}</span></p>
              <p>邮箱&nbsp;&nbsp;<span>{{this.personInfo.mail}}</span></p>
              <p>住址&nbsp;&nbsp;<span>{{this.personInfo.address}}</span></p>
            </div>
            <div class="content_l">
              <p>信息修改</p>
              <div class="l_form">
                <div class="l_form_l">
                  姓名&nbsp;&nbsp;<el-input v-model="personInfoEdit.sname" placeholder="请输入姓名"></el-input>
                </div>
                <div class="l_form_l">
                  学号&nbsp;&nbsp;<el-input v-model="personInfoEdit.sno" placeholder="请输入学号"></el-input>
                </div>
                <div class="l_form_l">
                  性别&nbsp;&nbsp;<el-radio v-model="personInfoEdit.sex" label="1">男</el-radio>
                      <el-radio v-model="personInfoEdit.sex" label="2">女</el-radio>
                </div>
                <div class="l_form_l">
                  年级&nbsp;&nbsp;<el-input v-model="personInfoEdit.grade" placeholder="请输入年级"></el-input>
                </div>
                <div class="l_form_l">
                  学科&nbsp;&nbsp;<el-input v-model="personInfoEdit.subject" placeholder="请输入学科"></el-input>
                </div>
                <div class="l_form_l">
                  邮箱&nbsp;&nbsp;<el-input v-model="personInfoEdit.mail" placeholder="请输入邮箱"></el-input>
                </div>
                <div class="l_form_l">
                  住址 <el-input type="textarea"  v-model="personInfoEdit.address" placeholder="请输入住址"></el-input>
                </div>
                
              </div>

              <div class="l_btn">
                <el-button type="primary" @click="handleUpdate">确定修改</el-button>
              </div>
             
            </div>
          </div>
          
        </div>
      </el-main>

      <el-footer>
        <div>Copyright©2022 毕业设计 版权所有梁帅   联系电话：13931338404</div>
      </el-footer>

       <el-dialog
          :title=testRes.title
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="handleClose">
          <span>{{testRes.result}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleClosetxt">确 定</el-button>
          </span>
        </el-dialog>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
@import "./index.less";
</style>
<script>

// COMPONENTS
import NavBar from '@/components/nav-bar/nav.vue'

// APIS
import { 
        getUserImg, 
        getUserInfo,
        updateUserInfo,
        getTeacherInfo,
        putTeacherInfo,
        adminbigBenList,
        admintuijianList,
        adminfudaoList,
        fudaoInfo,
        xinwentuijianInfo,
        dabenyingInfo,
        QuestionList,
        questionInfo,
        questionpost
} from '../../services/home'


export default {
  name: 'Home',
  components: {
    NavBar
  },
  data() {
    return{
      imgURL:'',
      msg: '',
      isShowAdmin:false,
      showVal:1,
      personInfo:{   //个人信息
        sname:'',
        sno:'',
        sex:'',
        grade:'',
        subject:'',
        mail:'',
        address:'',
      },

      personInfoEdit:{ //个人信息修改
        sname:'',
        sno:"",
        sex:'1',
        grade:'',
        subject:'',
        mail:'',
        address:'',
      }, 

      teacherEdit:{  //心理老师咨询填写
        sname:'',
        sex:"1",
        sno:'',
        tid:'',
        phone:'',
        message:'',
      },

      // 心理老师分页
      teacherList:[], 
      pageNum:1,  // 当前的页数
      pageSize:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:0, 
      
      // 心闻推荐分页
      newInfoList:[], 
      pageNumB:1,  // 当前的页数
      pageSizeB:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountB:0, 

      // 心理辅导分页
      fudaoList:[], 
      pageNumC:1,  // 当前的页数
      pageSizeC:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountC:0, 

      // 大本营分页
      dabenyingList:[], 
      pageNumD:1,  // 当前的页数
      pageSizeD:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountD:0,

      // 问卷分页
      questionList:[], 
      pageNumE:1,  // 当前的页数
      pageSizeE:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountE:0,
      
      isShowForm:false,
      isShowFormB:false,
      isShowFormC:false,
      isShowFormD:false,
      isShowFormF:true,
      isShowFormE:false,
      
      newsId:"",
      fudaoId:"",

      fits: ['fill',],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

      newsdata:{
        title:'',
        sname:'',
        image:'',
        createTime:'',
        content:'',
      },

      fufaodata:{
        title:'',
        type:'',
        image:'',
        content:'',
        createTime:'',
        sname:'',
      },

      dabenyingData:{
        title:'',
        detail:'',
        image:'',
        music:'',
        path:'',
        createTime:'',
        sname:'',
      },

      //问卷调查
      queslist:[], //渲染的数据
      checkedList:[],

      testid:'',
      testRes:{},


      dialogVisible:false,
      
      INDEXVAL:'1',
    }
  },
  created() {
    var pageUrl = window.location.href;
    const res = this.getUrlData(pageUrl)
    if(res.val === "1" || res.val === "2") {
      this.isShowAdmin = true;
    }else {
      this.isShowAdmin = false;
    }

    this.initData();

    // let timer = setTimeout(() => {
    //   location.reload();
    // },500)

    // clearTimeout(timer)

  },

  methods:{
    handleClose(done) {
     this.$confirm('确认关闭？')
      .then(_ => {
        this.isShowFormE = false;
        this.dialogVisible = false;
        })
        .catch(_ => {});
    },

    async initData() {

      const resImg = await getUserImg();
      console.log(resImg)
      if( resImg && resImg.resultCode === 200) {
        this.imgURL = resImg.data;
        console.log(this.imgURL )
      }

      this.requestdabenyingList();
      this.requestQuestion();
      this.requestTeacher();
      this.requestNewInfo();
      this.requestfudaoInfo()




    },

    // onHandleShow(val) {
    //   console.log('------',val)
    //   if(val == 4) {
    //     this.showVal = 4;
    //   }
    //   if(val == 2) {
    //     this.showVal = 2;
    //   }
    //   if(val == 3) {
    //     this.showVal = 3;
    //   }
    //   if(val == 5) {
    //     this.showVal = 5;
    //   }
    //   if(val == 6 ){
    //     this.showVal = 6;
    //   }
    // },  

    onhandleSelect(val) {
      console.log('父组件index',val)
      if(val === "1") {   //首页
        this.showVal = 1;
      }
      if(val === "2") {   //问卷
        this.showVal = 2;
        this.requestQuestion()
      }
      if(val === "3") {   //心理老师
        this.showVal = 3;
        this.requestTeacher()
      }
      if(val === "4") {  //减压大本营
        this.showVal = 4;
        this.requestdabenyingList();
      }
      if(val === "5") {   //新闻资讯
        this.showVal = 5;
        this.requestNewInfo();
      }
      if(val === "6") {  //心理辅导
        this.showVal = 6;
        this.requestfudaoInfo()
      }
      if(val === "7") {   //后台管理
        this.showVal = 7;
        this.$router.push(`/adminUser`);
      }
      if(val === '8') {   //个人中心
        console.log('个人中心')
        this.showVal = 8;
        this.requestPersonInfo();
        
      }
    },

    // 心理老师
    async requestTeacher() {
      const res = await getTeacherInfo(this.pageNum,this.pageSize)
      if(res && res.resultCode == 200) {     
        let result = res.data;
        this.teacherList = result.psychologyTeacherResponses;
        this.totalCount = result.total;
      }   
    },

    // 大本营
    async requestdabenyingList() {
      const res = await adminbigBenList(this.pageNumD,this.pageSizeD)
      if(res && res.resultCode == 200) {     
        let result = res.data;
        console.log('大本营',result)
        this.dabenyingList = result.lists;
        this.totalCountD = result.total;
      }   
    },


    // 心闻推荐
    async requestNewInfo() {
      const res = await admintuijianList(this.pageNumB,this.pageSizeB);
      if(res && res.resultCode == 200) {     
        let result = res.data;
        this.newInfoList = result.lists;
        this.totalCountB = result.total;
      }  
    },

    // 心理辅导
    async requestfudaoInfo() {
      const res = await adminfudaoList(this.pageNumC,this.pageSizeC);
      if(res && res.resultCode == 200) {     
        let result = res.data;
        this.fudaoList = result.psychologySpecials;
        console.log(this.fudaoList)
        this.totalCountC = result.total;
      }  
    },

    // 问卷调查
    async requestQuestion() {
      const res = await QuestionList(this.pageNumE,this.pageSizeE);
      if(res && res.resultCode == 200) {     
        let result = res.data;
        this.questionList = result.psychologyQuestionResponses;
        this.totalCountE = result.total;
      }  
    },

    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.pageNum = val;
      this.requestTeacher();
    },

    // 监听pagesize改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestTeacher()
    },

    // 监听页码值改变的事件
    handleCurrentChangeB(val) {
      this.pageNumB = val;
      this.requestNewInfo();
    },

    // 监听pagesize改变
    handleSizeChangeB(val) {
      this.pageSizeB = val;
      this.requestNewInfo()
    },

    // 监听页码值改变的事件
    handleCurrentChangeC(val) {
      this.pageNumC = val;
      this.requestfudaoInfo();
    },

    // 监听pagesize改变
    handleSizeChangeC(val) {
      this.pageSizeC = val;
      this.requestfudaoInfo()
    },

    // 监听页码值改变的事件
    handleCurrentChangeD(val) {
      this.pageNumD = val;
      this.requestdabenyingList();
    },

    // 监听pagesize改变
    handleSizeChangeD(val) {
      this.pageSizeD = val;
      this.requestdabenyingList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeE(val) {
      this.pageNumE = val;
      this.requestQuestion();
    },

    // 监听pagesize改变
    handleSizeChangeE(val) {
      this.pageSizeE = val;
      this.requestQuestion()
    },


    gotoDabenying(newInfo) {
      console.log(newInfo)
      this.isShowFormD = true;
      this.getdabenying(newInfo.id);
    },

    // 去咨询
    goToConsult(teacher) {
      this.isShowForm = true;
      this.teacherEdit.tid = teacher.tid;
    },

    // 去推荐
    goToNews(newInfo) {
      this.isShowFormB = true;
      this.newsId = newInfo.id;
      this.gettuijian();
    },

    // 去辅导
    goTofudao(item){
      this.isShowFormC = true;
      this.fudaoId = item.id;
      this.getfudao();
    },

    // 去问卷调查
    goToQuestion(item) {
      console.log('去问卷调查',item)
      this.isShowFormE = true;
      this.getQuestion(item.id)
      this.testid = item.id;
    },

    goBack() {
      console.log('--')
      this.isShowFormB = false;
      this.isShowFormC = false;
      this.isShowFormD = false;
    },

    async gettuijian() {
      const res = await xinwentuijianInfo(this.newsId);
      let result = res.data;
      this.newsdata = {
        title:result.title,
        sname:result.sname,
        image:result.image,
        createTime:result.createTime,
        content:result.content,
      }
    },

    async getfudao() {
      const res = await fudaoInfo(this.fudaoId);
      let result = res.data;
      this.fufaodata = {
        title:result.title,
        type:result.type,
        image:result.image,
        createTime:result.createTime,
        content:result.content,
        sname:result.sname,
      }
    },

    async getdabenying(did) {
      const res = await dabenyingInfo(did);
      let result = res.data;
      this.dabenyingData = {
        title:result.title,
        type:result.type,
        image:result.image,
        createTime:result.createTime,
        content:result.content,
        sname:result.sname,
      }
      console.log('---',this.dabenyingData)
    },

    async getQuestion(id) {
      const res = await questionInfo(id)
      let result = res.data;
      let list = [];
      for(let item of result) {
        list.push({
          title:item.title,
          a:item.a,
          b:item.b,
          c:item.c,
          result:"A",
             
        })
      }
      this.queslist = list;
      console.log('获取到的问卷',this.queslist)
    },


    // 个人信息展示
    async requestPersonInfo() {
      const res = await getUserInfo();
      if(res && res.data) {
        let result = res.data;
        console.log("res,",result)
        this.personInfo.sname = result.sname;
        this.personInfo.sno = result.sno;
        this.personInfo.sex = result.sex;
        this.personInfo.grade = result.grade;
        this.personInfo.subject = result.subject;
        this.personInfo.mail = result.mail;
        this.personInfo.address = result.address;
      }
      console.log('个人信息展示',this.personInfo)
    },

    // 心理咨询提交
    async handleTeacherTalk() {
      const checkRes =  this._checkAllTeacher();
      let formData =  this._getParamsByTeahcer();

      if(checkRes) {
        const res = await putTeacherInfo(formData);
        if(res && res.resultCode === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          
          //重置数据
          this.teacherEdit.sname = '';
          this.teacherEdit.sno = '';
          this.teacherEdit.sex = '1';
          this.teacherEdit.grade = '';
          this.teacherEdit.tid = '';
          this.teacherEdit.phone = '';
          this.teacherEdit.message = '';

          // 展示老师数据
          this.isShowForm = false;
        }
        

      }

    },

    // 个人中心信息修改
    async handleUpdate() {
      const checkRes =  this._checkAllPerson();
      let formData =  this._getParamsByUpdate();

      if(checkRes) {
        const res = await updateUserInfo(formData);
        if(res && res.resultCode === 200) {
          this.$message({
            message: '修改信息成功',
            type: 'success'
          });
          // 重新请求一下数据
          this.requestPersonInfo();
          //重置数据
          this.personInfoEdit.sname = '';
          this.personInfoEdit.sno = '';
          this.personInfoEdit.sex = '1';
          this.personInfoEdit.grade = '';
          this.personInfoEdit.subject = '';
          this.personInfoEdit.mail = '';
          this.personInfoEdit.address = '';
        }
      }
      
    },

    // 走一遍校验看是否为空
     _checkAllTeacher() {
      if(!this.teacherEdit.sname) {
        this.$message({
          message: '输入姓名不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.teacherEdit.sno) {
        this.$message({
          message: '输入学号不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.teacherEdit.phone) {
        this.$message({
          message: '输入手机号不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.teacherEdit.message) {
        this.$message({
          message: '咨询问题内容不能为空',
          type: 'warning'
        });
        return false;
      }else {
        return true;
      }
     },

    // 走一遍校验看是否为空
     _checkAllPerson() {
      if(!this.personInfoEdit.sname) {
        this.$message({
          message: '输入姓名不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.personInfoEdit.sno) {
        this.$message({
          message: '输入学号不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.personInfoEdit.grade) {
        this.$message({
          message: '输入年级不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.personInfoEdit.subject) {
        this.$message({
          message: '输入学科不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.personInfoEdit.mail) {
        this.$message({
          message: '输入邮箱不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.personInfoEdit.address) {
        this.$message({
          message: '输入地址不能为空',
          type: 'warning'
        });
        return false;
      }else {
        return true;
      }
     },

    // 心理咨询参数
    _getParamsByTeahcer() {
      let formData = {};
        formData = {
          sname: this.teacherEdit.sname,
          sno: Number(this.teacherEdit.sno),
          sex: this.teacherEdit.sex,
          tid: Number(this.teacherEdit.tid),
          phone: this.teacherEdit.phone,
          message: this.teacherEdit.message,
        }
       return formData;
    },


    // 个人信息修改参数
     _getParamsByUpdate() {
       let formData = {};
        formData = {
          sname: this.personInfoEdit.sname,
          sno: Number(this.personInfoEdit.sno),
          sex: this.personInfoEdit.sex,
          grade: this.personInfoEdit.grade,
          subject: this.personInfoEdit.subject,
          mail: this.personInfoEdit.mail,
          address: this.personInfoEdit.address,
        }
       return formData;
     },


    // 问卷调查相关
    handleQuestion(val) {
      console.log('选了哪个',val);
    },

    // 问卷提交
    async handlesubmitTest() {
      console.log('去提交',this.queslist);
      let list = [];
      for(let item of this.queslist) {
        list.push({
          title:item.title,
          a:item.a,
          b:item.b,
          c:item.c,
          result:item.result,
          qid:this.testid
        })
      }
      const res = await questionpost(list);
      this.testRes = res.data
      console.log(res,'res')
      if(res && res.resultCode == 200) {
        this.dialogVisible = true;
        console.log("testRes",this.testRes);
      }
      
    },

    handleClosetxt() {
      this.dialogVisible = false;
      this.isShowFormE = false;
    },

    // jumpToOne() {
    //   this.INDEXVAL = '4';
    //   this.$refs.refNavs.$setData(this.INDEXVAL);
    // },

    // jumpToTwo() {
    //   this.INDEXVAL = '2';
    //   this.$refs.refNavs.$setData(this.INDEXVAL);
    // },

    // jumpToThree() {
    //   this.INDEXVAL = '3';
    //   this.$refs.refNavs.$setData(this.INDEXVAL);
    // },
    // jumpToFour() {
    //   this.INDEXVAL = '5';
    //   this.$refs.refNavs.$setData(this.INDEXVAL);
    // },
    // jumpToFive() {
    //   this.INDEXVAL = '6';
    //   this.$refs.refNavs.$setData(this.INDEXVAL);
    // },

    getUrlData(url,OneKey,Delete_key=[]){
      if(!url)url = window.location.search;
      var url_l = url.split('?')[1];
      var url_ll = url_l.split('&'),obj ={};
      url_ll.forEach((item,idx)=>{
        var key = item.split('=')[0];
        var val = item.split('=')[1];
        if(Delete_key.indexOf(key)==-1) obj[key] = val;
      })
      if(OneKey&&url_l.indexOf(OneKey))return obj[OneKey];
      return obj;
    },

  }


  
}

</script>

