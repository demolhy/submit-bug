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
        <el-input
          type="textarea"
          :rows="12"
          placeholder="1.出错页面截图&#10;&#10;2.问题描述&#10;&#10;3.问题操作重现步骤"
          v-model="form.describe"
          @focus="getFocus"
        >
        </el-input>
        <!-- <div>123</div> -->
        <!-- <div ref="editor" id="editor1"></div> -->
      </el-form-item>
      <el-form-item label="所属系统" porp="system">
        <el-select v-model="form.system" placeholder="请选择系统">
          <el-option label="OA" value="oa"></el-option>
          <el-option label="ERP" value="erp"></el-option>
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
          <el-option label="信息部" value="0"></el-option>
          <el-option label="销售部" value="1"></el-option>
          <el-option label="采购部" value="2"></el-option>
          <el-option label="财务部" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-button @click="getValue">{{ name }}{{ count }}</el-button> -->
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, onMounted } from 'vue'
// import Hello from '@/components/HelloWorld.vue'
import E from 'wangeditor'
// import { getList } from '@/api/home'
import Qs from 'qs'
import { ElMessage } from 'element-plus'
interface editorObj {
  progblem_name: string
  describe: any
  url: string
  name: string
  branch: string
}
export default defineComponent({
  components: {
    // Hello
  },
  data() {
    return {}
  },
  setup(props, context) {
    console.log(props, context)
    const count = ref<number>(10)
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
    })
    const computedCount = computed({
      get: () => {
        count.value
      },
      set: (data) => {
        console.log('data:', data)
      }
    })
    const editor = ref<null | HTMLElement>(null)
    const textInput = ref(null)
    function handlectrlvEvent(e:any) {
      // console.log(e)
      console.log('paste事件')
      let items = e.clipboardData && e.clipboardData.items
      let file = null
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile()
            console.log(textInput)
          }
        }
      }
      if (!file) {
        return
      }
      console.log(file)
    }
    function getFocus() {

      console.log('触发')
    }

    onMounted(() => {
      console.log(textInput)

      document.addEventListener('paste', handlectrlvEvent)
      // let formData = new URLSearchParams()
      // formData.append('name', 'lin')
      // formData.append('age', '18')

      // 富文本框
      // console.log('editor:', editor)
      // const editor1 = new E('#editor1')
      // // editor1.config = {
      // //   height: 200,
      // //   pasteTextHandle: function(pasteStr:any) {
      // //     // 对粘贴的文本进行处理，然后返回处理后的结果
      // //     console.log(pasteStr)
      // //     return pasteStr + '巴拉巴拉'
      // //   }
      // // }
      // editor1.config.height = 200
      // editor1.config.placeholder = `1.出错页面截图 <br /> 2.问题描述 <br /> 3.问题操作重现步骤`
      // editor1.config.pasteTextHandle = function (pasteStr: any) {
      //   console.log(pasteStr)
      //   return pasteStr + '巴拉巴拉'
      //   // 对粘贴的文本进行处理，然后返回处理后的结果
      // }
      // editor1.create()
    })
    count.value = 40
    function getValue() {
      count.value++
    }
    function onSubmit() {
      const data = forms.form
      // getList(Qs.stringify(data)).then((res: any) => {
      //   ElMessage({
      //     type: 'success',
      //     message: '提交成功'
      //   })
      //   console.log(res)
      // })
      // console.log(forms.form)
      console.log('submit!')
    }
    return {
      ...toRefs(state),
      ...toRefs(forms),
      // forms,
      count,
      computedCount,
      editor,
      getValue,
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
