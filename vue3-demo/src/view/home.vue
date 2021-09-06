<template>
  <div class="container">
    <h5 class="title">问题反馈</h5>
    <el-form ref="textInput" :model="form" label-width="100px">
      <el-form-item label="问题名称" porp="progblem_name">
        <el-input v-model="form.progblem_name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="问题描述" porp="describe">
        <!-- <el-input
          type="textarea"
          :rows="12"
          placeholder="1.出错页面截图&#10;&#10;2.问题描述&#10;&#10;3.问题操作重现步骤"
          v-model="form.describe"
          @focus="getFocus"
        >
        </el-input> -->
        <!-- <div>123</div> -->
        <div ref="editor" id="editor1"></div>
      </el-form-item>
      <div :innerHTML="content.html"></div>
      <el-form-item label="所属系统" porp="system">
        <el-select v-model="form.system" placeholder="请选择系统">
          <el-option label="OA" value="OA"></el-option>
          <el-option label="ERP" value="ERP"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题地址" prop="url">
        <el-input v-model="form.url" placeholder="http://"></el-input>
      </el-form-item>
      <el-form-item label="浏览器" prop="browser">
        <el-input v-model="form.browser" placeholder="如谷歌浏览器、火狐浏览器"></el-input>
      </el-form-item>
      <el-form-item label="问题提出人" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="branch">
        <el-select v-model="form.branch" placeholder="请选择部门">
          <el-option label="信息部" value="信息部"></el-option>
          <el-option label="销售部" value="销售部"></el-option>
          <el-option label="采购部" value="采购部"></el-option>
          <el-option label="财务部" value="财务部"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-button @click="syncHTML">{{ name }}{{ count }}</el-button>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, onMounted } from 'vue'
import Hello from '@/components/HelloWorld.vue'
import WangEditor from 'wangeditor'
import { getList, getContent, login } from '@/api/home'
import Qs from 'qs'
import { ElMessage } from 'element-plus'
import axios from '../api/index'
interface editorObj {
  progblem_name: string
  describe: any
  url: string
  name: string
  branch: string
}
export default defineComponent({
  components: {
    Hello
  },
  data() {
    return {}
  },
  setup(props, context) {
    const forms = reactive({
      form: {
        progblem_name: '',
        describe: '', //问题描述
        url: '',
        browser: '',
        name: '',
        branch: ''
      } as editorObj
    })

    const state = reactive({
      name: '提交'
    } as { name: string })

    const content = reactive({
      html: '',
      text: ''
    } as { html: string; text: string })

    const editor = ref<null | HTMLElement>(null)
    const textInput = ref(null)
    function handlectrlvEvent(e: any) {
      // console.log(e)
      console.log('paste事件')
      let items = e.clipboardData && e.clipboardData.items
      let file = null
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile()
          }
        }
      }
      if (!file) {
        return
      }
      blobToDataURL(file, (base64: string) => {
        console.log(base64)
        instance.cmd.do(
          'insertHTML',
          `<img src="${base64}" target ="_blank" style="max-width:50%;"/>`
        )
      })
      console.log(file)
    }
    function getFocus() {
      console.log('触发')
    }
    const blobToDataURL = (blob: any, cb: any) => {
      let reader = new FileReader()
      reader.onload = function (evt: any) {
        let base64 = evt.target.result
        cb(base64)
      }
      reader.readAsDataURL(blob)
    }
    let instance: any
    onMounted(() => {
      console.log(textInput)

      document.addEventListener('paste', handlectrlvEvent)

      // 富文本框
      // console.log('editor:', editor)
      instance = new WangEditor('#editor1')
      Object.assign(instance.config, {
        onchange() {
          console.log('change')
        }
      })
      const imgUrl =
        'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c6a3d3e0c434fd78733c6aad8f8e1cc~tplv-k3u1fbpfcp-watermark.awebp'
      instance.config.showLinkImg = false
      instance.config.placeholder = `1.出错页面截图 <br /> 2.问题描述 <br /> 3.问题操作重现步骤`
      instance.create()

      // instance.cmd.do(
      //   'insertHTML',
      //   `<img src="${imgUrl}" style="max-width:100%;"/>`
      // )
      // editor1.config = {
      //   height: 200,
      //   pasteTextHandle: function(pasteStr:any) {
      //     // 对粘贴的文本进行处理，然后返回处理后的结果
      //     console.log(pasteStr)
      //     return pasteStr + '巴拉巴拉'
      //   }
      // }
      // editor1.config.height = 200
      // editor1.config.placeholder = `1.出错页面截图 <br /> 2.问题描述 <br /> 3.问题操作重现步骤`
      // editor1.config.pasteTextHandle = function (pasteStr: any) {
      //   console.log(pasteStr)
      //   return pasteStr + '巴拉巴拉'
      //   // 对粘贴的文本进行处理，然后返回处理后的结果
      // }
      // editor1.create()
    })
    const syncHTML = () => {
      content.html = instance.txt.html()
      let data = {
        path: '/login',
        sessionid: '',
        'data[company]': 'Company1',
        'data[userAccount]': 1,
        'data[userPassword]': 'c4ca4238a0b923820dcc509a6f75849b',
        'data[verificationCode]': ''
      }
      login(Qs.stringify(data)).then()
    }

    function onSubmit() {
      forms.form.describe = instance.txt.html()
      const data = forms.form
      getList(Qs.stringify(data)).then((res: any) => {
        ElMessage({
          type: 'success',
          message: '提交成功'
        })
        console.log(res)
      })
    }
    return {
      ...toRefs(state),
      ...toRefs(forms),
      // ...toRefs(content),
      content,
      editor,
      syncHTML,
      getFocus,
      textInput,
      onSubmit
    }
  },
  mounted() {},
  methods: {
    // getValue() {
    //   console.log('click')
    // }
  }

  // setup:() => {
  //   const addCount = () => {
  //     console.log('data')
  //   }
  //   return addCount
  // },
})
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 22px;
}
.container {
  width: 70%;
  margin: 30px auto;
}
.el-select {
  display: block;
}
</style>
<style>
.w-e-text img {
  width: 50%;
}
</style>
