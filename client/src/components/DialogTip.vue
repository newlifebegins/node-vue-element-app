<template>
<el-dialog :title="dialogTip.title" :visible.sync="dialogTip.show">
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="收支描述" prop="description" :label-width="formLabelWidth">
            <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="income" :label-width="formLabelWidth">
            <el-input v-model="form.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend" :label-width="formLabelWidth">
            <el-input v-model="form.expend" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现金" prop="cash" :label-width="formLabelWidth">
            <el-input v-model="form.cash" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="remark" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="污染类型" prop="type" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择污染类型">
                <el-option v-for="(formType, index) in format_type_list" :key="index" :label="formType" :value="formType"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTip.show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    name: 'dialogTip',
    props: {
        dialogTip: Object,
        form: Object
    },
    data() {
        return {            
            format_type_list: [
                'AQI',
                'PM2.5',
                'PM10',
                'SO2',
                'NO2',
                'CO'
            ],
            formLabelWidth: '120px',
            rules: {
                description: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                income: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                expend: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                cash: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                remark: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = this.dialogTip.option == 'add' ? 'add' : `edit/${this.form.id}`;
                    let message = this.dialogTip.option == 'add' ? '添加' : '修改';
                    this.$axios.post(`/api/profile/${url}`, this.form)
                    .then(result => {
                        console.log(result)
                        this.$message({
                            message: `数据${message}成功`,
                            type: 'success'
                        })
                        this.dialogTip.show = false;
                        this.$emit('update');
                    })
                    .catch(err => {
                        console.log(err)
                    })                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.el-select {
    width: 100%;
}
</style>
