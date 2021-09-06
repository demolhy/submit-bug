<template>
  <div class="bg">
    <div class="box">
      <div class="lf">
        <div class="qr-code">
          <div class="login-title">
            欢迎进入<br />
            后台管理平台
          </div>
        </div>
      </div>
      <div class="rg">
        <div class="rg-title">账号密码登录</div>
        <el-form ref="ruleForm" :model="form">
          <el-form-item
            prop="name"
            :rules="{ required: true, message: '请输入账号', trigger: 'change' }"
          >
            <el-input placeholder="请输入账号" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item
            prop="pass"
            :rules="{ required: true, message: '请输入密码', trigger: 'change' }"
          >
            <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="width100" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/login'
interface formType {
  name: String
  password: String
}
export default defineComponent({
  setup(props, content) {
    const router = useRouter()
    const forms = reactive({
      form: {
        name: 'lin',
        password: '123abc'
      } as formType,
      ruleForm: ref<any>(null)
    })

    function onSubmit() {
      // let data = {
      //   username: 'lin',
      //   password: '123abc'
      // }
      login(forms.form).then((res: any) => {
        if (res.code === 200) {
          window.localStorage.setItem('token', res.token)
          router.push({
            path: '/table'
          })
        }
        ElMessage({
          type: res.code === 200 ? 'success' : 'warning',
          message: res.message
        })
      })

      // router.push({
      //   path: '/'
      // })
    }

    onMounted(() => {
      window.localStorage.removeItem('token')
    })

    return {
      ...toRefs(forms),
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.bg {
  background: url('../../assets/demo2.png');
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  .box {
    width: 920px;
    height: 500px;
    top: 50%;
    left: 50%;
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    overflow: hidden;
    box-shadow: 0 0 15px rgb(0 138 233 / 15%);
    display: flex;
    .lf {
      width: 40%;
      // height: 600px;
      border-radius: 10px 0 0 10px;
      background: url(../../assets/login-site-bg.png) no-repeat;
      position: relative;
      padding-left: 60px;
      box-sizing: border-box;
      // text-align: center;
      // padding: 0 60px;
      .login-title {
        font-size: 28px;
        color: #fff;
        letter-spacing: 9px;
        margin: 150px 0 80px 0;
      }
    }
    .rg {
      width: 60%;
      // height: 600px;
      padding: 50px 60px;
      background-color: #fff;
      position: relative;
      float: left;
      border-radius: 0 10px 10px 0;
      .rg-title {
        margin-top: 40px;
        font-size: 22px;
        color: #40a9ff;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-bottom: 30px;
        position: relative;
        padding-left: 10px;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 150px;
          height: 2px;
          background: #40a9ff;
        }
      }
    }
  }
}
</style>
