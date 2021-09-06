<template>
  <div>
    <el-descriptions :title="title" column="3">
      <template #extra v-if="content.status === 0">
        <el-button type="primary" size="mini" @click="saveTrue">已解决</el-button>
        <el-button type="danger" size="mini" @click="saveFalse">驳回</el-button>
      </template>
      <el-descriptions-item label="问题名称：">{{ content.progblem_name }}</el-descriptions-item>
      <el-descriptions-item label="提交人："
        ><el-tag size="small">{{ content.name }}</el-tag></el-descriptions-item
      >
      <el-descriptions-item label="部门：">{{ content.branch }}</el-descriptions-item>
      <el-descriptions-item label="浏览器：">
        {{ content.browser }}
      </el-descriptions-item>
      <el-descriptions-item label="状态："
        ><el-tag :type="content.status === 0 ? 'warning' : 'success'" size="small">{{
          content.status === 0 ? '未解决' : '已解决'
        }}</el-tag></el-descriptions-item
      >
      <el-descriptions-item label="提交时间：">{{
        $filters.custom(content.time)
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions direction="vertical">
      <el-descriptions-item label="问题描述：" class-name="content">
        <!-- {{content.describe}} -->
        <div class="content" :innerHTML="content.describe"></div>
        <!-- <img src="../assets/demo2.png" alt="" /> -->
        <!-- <el-image
          style="width: 400px"
          src="src/assets/demo2.png"
          :preview-src-list="['src/assets/demo2.png']"
        >
        </el-image> -->
      </el-descriptions-item>
    </el-descriptions>
    <!-- <div class="title">
      {{title}}
    </div>
    <div class="content">
      <div class="item">
        <span>问题名称：</span>
        <span>此操作将永久删除该数据</span>
      </div>
    </div> -->
    <el-dialog
      :title="status === 1 ? '备注说明' : '驳回原因'"
      v-model="dialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <div class="box">
        <span>是否公布?</span>
        <el-switch v-model="isShow" active-color="#13ce66" inactive-color="#ff4949" />
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="textarea1"
      >
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// import { HeroTable } from '@/components/';
import HeroTable from '@/components/HeroTable/index.vue'
import { ElMessageBox } from 'element-plus'
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { getContent, saveStatusTrue, saveStatusFalse } from '@/api/table'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// import Qs from 'qs'

export default defineComponent({
  components: { HeroTable },
  props: {
    title: {
      type: String,
      default: '用户反馈'
    }
  },
  setup() {
    let router = useRoute()
    let TableData = reactive({
      tableData: [{}]
    })
    const state = reactive({
      content: {
        _id: true
      },
      dialogVisible: false,
      textarea1: '',
      status: 0,
      isShow: ''
    })

    const methods = {
      saveTrue: (e: Number) => {
        state.dialogVisible = true
        state.status = 1
        // const data = {
        //   _id: state.content._id
        // }
        // saveRemarks(data).then()
      },
      saveFalse: (e: Number) => {
        // const data = {
        //   _id: state.content._id
        // }
        // saveStatusFalse(data).then((res: any) => {})
        state.dialogVisible = true
        state.status = 2
      },
      handleClose: () => {},
      save: async (e: Number) => {
        const data = {
          _id: state.content._id,
          remarks: state.textarea1
        }
        console.log(state.status)
        switch (state.status) {
          case 1:
            await saveStatusTrue(data).then((res: {}) => {
              state.dialogVisible = false
              ElMessage({
                type: 'success',
                message: '成功'
              })
            })
            break
          case 2:
            await saveStatusFalse(data).then((res: {}) => {
              state.dialogVisible = false
              ElMessage({
                type: 'success',
                message: '成功'
              })
            })
          default:
            // ElMessage({
            //   type: 'warning',
            //   message: '失败'
            // })
            break
        }
        methods.getList()
      },
      getList: () => {
        console.log(router.query)
        const data = {
          id: Number(router.query.id)
        }
        getContent(data).then((res: any) => {
          console.log(res)
          state.content = res.data
        })
      }
    }

    onMounted(() => {
      methods.getList()
    })

    return {
      ...toRefs(state),
      ...toRefs(TableData),
      ...methods
    }
  }
})
</script>

<style lang="scss" scoped>
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
// .el-descriptions{
//   font-size: 16px ;
// }
.title {
  font-size: 16px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin-bottom: 15px;
}
.content {
  img {
    width: 400px;
    display: block;
    margin: 10px 0;
  }
}
.el-image {
  display: block;
  margin: 10px 0;
}
.el-image__error,
.el-image__inner,
.el-image__placeholder {
  border-radius: 4px;
}
.box{
  margin-bottom: 20px;
  span{
    margin-right: 10px;
  }
}
</style>
<style>
.content img {
  border: 1px solid #eee;
}
</style>
