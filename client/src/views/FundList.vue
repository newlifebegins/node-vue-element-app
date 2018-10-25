<template>
<div class="content">
    <el-form :inline="true" ref="addData">
        <el-button type="primary" size="small" @click="handleAdd()" class="addBtn">添加</el-button>
    </el-form>
    <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="创建时间" align="center" width="220px">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center">
            <template slot-scope="scope">
                <span style="">{{ scope.row.type }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="description" label="收支描述" align="center">
            <template slot-scope="scope">
                <span style="">{{ scope.row.description }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="income" label="收入" align="center">
            <template slot-scope="scope">
                <span style="color: #00d053">{{ scope.row.income }}</span>
            </template> 
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center">
            <template slot-scope="scope">
                <span style="color: #f56767">{{ scope.row.expend }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="cash" label="现金" align="center">
            <template slot-scope="scope">
                <span style="color: #4db3ff">{{ scope.row.cash }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center">
            <template slot-scope="scope">
                <span style="">{{ scope.row.remark }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <DialogTip :dialogTip="dialogTip" @update="getProfile"></DialogTip>
</div>
</template>

<script>
import DialogTip from '../components/DialogTip.vue'
export default {
    name: 'fundList',
    data() {
        return {
            tableData: [],
            dialogTip: {
                show: false
            }
        }
    },
    created() {
        this.getProfile()
    },
    methods: {
        getProfile() {
            this.$axios.get('/api/profile')
                .then(res => {
                    this.tableData = res.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleEdit(index, row) {
            console.log('edit')
        },
        handleDelete(index, row) {
            console.log('delete')
        },
        handleAdd() {
            this.dialogTip.show = true
        }
    },
    components: {
        DialogTip
    }
}
</script>

<style scoped>
.content {
    padding: 10px;
}

.addBtn {
    float: right;
}
</style>
