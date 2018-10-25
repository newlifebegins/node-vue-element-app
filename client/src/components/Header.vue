<template>
<el-row>
    <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" alt="logo" class="logo">
        <span class="title">后台管理系统</span>
    </el-col>
    <el-col :span="6" class="user">
        <dl>
            <dt><img :src="user.avatar" alt="avatar" class="avatar"></dt>
            <dd>
                <p class="name">{{user.username}}</p>
            </dd>
        </dl>
        <el-dropdown trigger="click" class="dropdown" @command="setDialogInfo">
            <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-col>
</el-row>
</template>

<script>
export default {
    name: 'header-nav',
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        setDialogInfo(command) {
            switch (command) {
                case 'info':
                    this.showInfoList();
                    break;
                case 'logout':
                    this.logout();
                    break;
            }
        },
        showInfoList() {
            this.$router.push('/userInfo')
        },
        logout() {
            // clear token
            localStorage.removeItem('token');
            // 设置vuex store
            this.$store.dispatch('clearCurrentState');
            // 跳转
            this.$router.push('/login')
        }
    }
};
</script>

<style scoped>

.logo-container {
    text-align: left;
}

.logo {
    width: 40px;
    vertical-align: middle;
}

.title {
    display: inline-block;
    line-height: 60px;
    color: #fff;
    margin-left: 20px;
}

.user {
    float: right;
    line-height: 60px;
    text-align: right;
}

.user dl {
    line-height: 60px;
    display: inline-block;
}

.user dt {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ccc;
}

.user dd {
    height: 60px;
    line-height: 60px;
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    box-sizing: border-box;
}

.user dt img {
    width: 100%;
    height: 100%;
    display: block;
}

.user dl p {
    color: #fff;
    font-size: 14px;
}

.dropdown {
    display: inline-block;
    margin-left: 5px;
}

.dropdown i {
    color: #fff;
}
</style>
