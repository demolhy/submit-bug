<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <!-- <el-form-item label="姓名">
				<el-input v-model="form.user" placeholder="姓名"></el-input>
			</el-form-item> -->
      <el-form-item label="系统" size="mini">
        <el-select v-model="form.system" placeholder="选择系统" @change="getSystem">
          <el-option label="全部" value=""></el-option>
          <el-option label="ERP" value="ERP"></el-option>
          <el-option label="OA" value="OA"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" size="mini">
        <el-select v-model="isDay" placeholder="选择时间" @change="getTimes">
          <el-option label="全部" value="0"></el-option>
          <el-option label="今天" value="1"></el-option>
          <el-option label="昨天" value="2"></el-option>
          <el-option label="更早" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <HeroTable
        :allowSelect="true"
        :data="tableData"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @select="handleSelect"
        @pagingChange="handlePagingChange"
      >
        <template v-slot:status="scope">
          <el-tag
            :type="
              scope.data.status === 0 ? 'warning' : scope.data.status === 1 ? 'success' : 'danger'
            "
            size="small"
          >
            {{ scope.data.status === 0 ? '未解决' : scope.data.status === 1 ? '已解决' : '驳回' }}
          </el-tag>
        </template>

        <template v-slot:action="scope">
          <el-button type="primary" size="mini" @click="onSubmit(scope.data._id)">查看</el-button>
          <!-- <span class="btn" @click="handleCLick('edit', scope.data)">编辑</span >
					<el-divider direction="vertical"></el-divider>
					<span class="btn red" @click="handleCLick('del', scope.data)">删除</span> -->
        </template>
        <template v-slot:timer="scope">
          {{ $filters.custom(scope.data.time) }}
        </template>
      </HeroTable>
    </div>
    <el-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// import { HeroTable } from '@/components/'
import HeroTable from '@/components/HeroTable/index.vue'
import { ElMessageBox } from 'element-plus'
import { defineComponent, reactive, ref, toRefs, getCurrentInstance, onMounted } from 'vue'
import { getList } from '@/api/table'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { HeroTable },
  setup() {
    const { ctx } = getCurrentInstance() as any
    const router = useRouter()

    let TableData = reactive({
      tableData: [{}],
      isDay: ''
    })
    const columns = [
      { prop: 'progblem_name', label: '问题', align: 'center' },
      { prop: 'system', label: '系统', width: '100', align: 'center' },
      { prop: 'name', label: '提交人', width: '150', align: 'center' },
      { prop: 'branch', label: '部门', width: '150', align: 'center' },
      { prop: 'time', label: '提交时间', width: '250', slot: { body: 'timer' }, align: 'center' },
      { prop: 'status', label: '状态', width: '150', slot: { body: 'status' }, align: 'center' },
      { prop: 'remarks', label: '备注', width: '250', align: 'center' },
      // { prop: 'handle', label: '操作', slot: { body: 'action' } }
      { prop: '', label: '操作', width: 110, slot: { body: 'action' }, align: 'center' }
    ]
    const state = reactive({
      form: {
        system: '',
        start: '',
        end: '',
        limit: 10,
        page: 1
      } as {
        limit: number
        page: number
        system?: string
        start?: number | string
        end?: number | string
      },
      dialogVisible: false,
      pagination: {
        page: 1,
        total: 0
      }
    })

    const methods = {
      handleSelect: (val: any) => {
        console.log(val)
      },
      handlePagingChange: (option: any) => {
        console.log(option)
        state.form.page = option.val
        methods.getList()
      },
      onSubmit: (e: Number) => {
        console.log(e)
        interface ID_TYPE {
          path: string
          query: any
        }
        router.push({
          path: '/table-detail',
          query: {
            id: e
          }
        } as ID_TYPE)
        // ElMessageBox.alert('', '', {
        // 	title: '提示',
        // 	message: 'This is a essageBox',
        // 	type: 'warning',
        // 	confirmButtonText: '确定',
        // 	cancelButtonText: '取消',
        // 	showCancelButton: true
        // })
      },
      handleCLick: (type: string, scope: any) => {
        console.log(type)
        if (type === 'edit') {
          state.dialogVisible = true
        } else {
          ctx
            .$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              ctx.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(() => {
              ctx.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        }
      },
      handleClose: () => {
        state.dialogVisible = false
      },
      getSystem: (e: any) => {
        // console.log(e)
        // let data = {
        //   system: e
        // }
        methods.getList(state.form)
      },
      getList: (e = {}) => {
        loading.value = true
        getList(state.form).then((res: any) => {
          console.log(res.data)
          loading.value = false
          TableData.tableData = res.data
          state.pagination = {
            page: res.page,
            total: res.total
          }
        })
      },
      getTimes: (e: string) => {
        console.log(TableData.isDay)
        switch (TableData.isDay) {
          case '0':
            state.form.start = 1609430400000
            state.form.end = new Date().getTime()
            break
          case '1':
            state.form.start = methods.getDays()
            state.form.end = new Date().getTime()
            break
          case '2':
            state.form.start = methods.getDays(1)
            state.form.end = methods.getDays()
            break
          case '3':
            state.form.start = 1609430400000
            state.form.end = methods.getDays(1)
            break
          default:
            break
        }
        methods.getList(state.form)
        console.log(methods.getDays())
      },
      getDays: (num: number = 0) => {
        const start = new Date(new Date().toLocaleDateString())
        start.setTime(start.getTime() - 3600 * 1000 * 24 * num)
        return start.getTime()
      }
    }
    let loading = ref<boolean>(true)
    // onMounted(() => {
    // getList().then((res: any) => {
    //   console.log(res.data)
    //   loading.value = false
    //   TableData.tableData = res.data
    // })
    // })
    methods.getList()

    return {
      ...toRefs(state),
      ...toRefs(TableData),
      columns,
      ...methods,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
</style>
<style>
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0;
  text-align: center;
}
</style>
