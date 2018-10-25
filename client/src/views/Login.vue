<template>
<div class="login">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <h1 class="title">登录</h1>
        <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
        <el-form-item>
            <p>没有账号 <router-link to="register">点击注册</router-link>
            </p>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name: 'login',
    components: {},
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post("/api/users/login", this.form)
                        .then(result => {
                            console.log(result)
                            const {
                                token,
                                code
                            } = result.data;
                            if (code == 200) {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                })
                                // 存储token
                                localStorage.setItem('token', token);
                                // 解析token
                                const decoded = jwt_decode(token);
                                console.log(decoded)
                                // token存储到vuex中
                                this.$store.dispatch('setIsAuthorization', !this.isEmpty(decoded));
                                this.$store.dispatch('setUser', decoded)
                                this.$router.push('/')
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }
}
</script>

<style scoped>
.login {
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

.el-button {
    width: 100%;
}
</style>
