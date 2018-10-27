<template>
<div class="content">
    <el-form :inline="true" ref="addData">
        <el-form-item label="按时间筛选" class="dateSelect">
            <el-date-picker
              v-model="dateVal"
              type="daterange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="small" @click="handleSearch()" class="searchBtn">筛 选</el-button>
        </el-form-item>
        <el-form-item class="addBtn">
            <el-button type="primary" size="small" v-if="user.identity == 'manage'" @click="handleAdd()">添 加</el-button>
        </el-form-item>
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
                <el-button size="mini" type="primary" v-if="user.identity == 'manage'" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" v-if="user.identity == 'manage'" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页效果 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="paginations.currentPage" :page-sizes="paginations.pageSizes" :page-size="paginations.pageSize" :layout="paginations.layout" :total="paginations.total">
    </el-pagination>
    <!-- dialog 弹框 -->
    <DialogTip :dialogTip="dialogTip" :form="form" @update="getProfile"></DialogTip>
</div>
</template>

<script>
import DialogTip from '../components/DialogTip.vue'
export default {
    name: 'fundList',
    data() {
        return {
            tableData: [],
            allTableData: [],
            dialogTip: {
                show: false,
                title: '',
                option: 'edit'
            },
            form: {
                type: '',
                description: '',
                income: '',
                expend: '',
                cash: '',
                remark: ''
            },
            paginations: {
                layout: 'total, sizes, prev, pager, next, jumper',
                total: '',
                currentPage: 1,
                pageSizes: [10, 20, 30, 40],
                pageSize: ''
            },
            dateVal: '',
            filterTableData: []
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    created() {
        this.getProfile()
    },
    methods: {
        getProfile() {
            this.$axios.get('/api/profile')
                .then(res => {
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    // 设置分页数据
                    this.setPaginations();
                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleEdit(index, row) {
            this.dialogTip = {
                    show: true,
                    title: '编辑内容',
                    option: 'edit'
                },
                this.form = {
                    type: row.type,
                    description: row.description,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/profile/delete/${row._id}`)
                    .then(res => {
                        if (res) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getProfile()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        handleAdd() {
            this.dialogTip = {
                    show: true,
                    title: '添加内容',
                    option: 'add'
                },
                this.form = {
                    type: '',
                    description: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                }
        },
        handleSearch() {
            // 筛选
            console.log(this.dateVal);
            if(!this.dateVal) {
                this.$message({
                    type: 'warning',
                    message: '请选择时间区间'
                })
                this.getProfile();
                return;
            }
            this.allTableData = this.filterTableData.filter(item => {
                let date = new Date(item.date);
                let time = date.getTime();
                return time >= this.dateVal[0].getTime() && time <= this.dateVal[1].getTime()
            });
            this.setPaginations()
        },
        setPaginations() {
            // 设置分页属性
            this.paginations.total = this.allTableData.length;
            this.paginations.currentPage = 1;
            this.paginations.pageSize = 2;
            // 设置分页数据
            this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.pageSize
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // 切换size
            this.paginations.currentPage = 1;
            this.paginations.pageSize = val;
            this.tableData = this.allTableData.filter((item, index) => {
                return index < val
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            // 获取当前页
            let index = this.paginations.pageSize * (val - 1);
            // 数据总数
            let nums = this.paginations.pageSize * val;
            // 容器
            let tables = [];
            for(let i = index; i < nums; i ++) {
                if(this.allTableData[i]) {
                    tables.push(this.allTableData[i])
                }
            }
            this.tableData = tables;
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
.dateSelect {
    float: left;
}
.addBtn {
    float: right;
}
.searchBtn {
    margin-left: 10px;
}
</style>
