<template>
<div class="register">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <h1 class="title">注册</h1>
        <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
            <el-select v-model="form.identity" placeholder="请选择身份">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">注册</el-button>
        </el-form-item>
        <el-form-item>
            <p>已有账号 <router-link to="login">点击登录</router-link></p>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    name: 'register',
    components: {},
    data() {
        const validatePass2 = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                username: '',
                password: '',
                checkPass: '',
                email: '',
                identity: ''
            },
            rules: {
                username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                checkPass: [{
                    required: true,
                    validator: validatePass2,
                    message: '请再次输入密码',                    
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur'
                }, {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change']
                }],
                identity: [{
                    required: true,
                    message: '请选择身份',
                    trigger: 'change'
                }],
            },
            options: [{
                value: 'member',
                label: '游客'
            }, {
                value: 'manage',
                label: '管理员'
            }],
            value: ''
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post("/api/users/register", this.form)
                    .then(result => {
                        console.log(result)
                        this.$message({
                            message: '账号注册成功',
                            type: 'success'
                        })
                        this.$router.push('/login')
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
.register {
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpg) no-repeat center;
    background-size: cover;
}
.title {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    padding: 10px 0;
    letter-spacing: 3px;
    margin-bottom: 20px;
    padding-left: 100px;
}
.demo-ruleForm {
    width: 30%;
    margin: 0 auto;
    position: relative;
    top: 50vh;
    transform: translateY(-50%)
}

.el-select {
    width: 100%;
}

.el-select-dropdown__item {
    text-align: left;
}

.el-button {
    width: 100%;
}
</style>
