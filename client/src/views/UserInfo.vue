<template>
<div class="userinfo">
    <el-row>
        <el-col :span="8">
            <img :src="user.avatar" alt="avatar">
        </el-col>
        <el-col :span="16">
            <div class="user-item">
                <i class="el-icon-info"></i>
                <span>{{user.username}}</span>
            </div>
            <div class="user-item">
                <i class="el-icon-setting"></i>
                <span>{{user.identity}}</span>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name: 'userInfo',
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
}
</script>
<style scoped>
.userinfo {
    height: 100%;
}
.el-row {
    padding-top: 200px;
}
.user-item {
    text-align: left;
    padding: 10px 0;
}
.user-item span {
    margin-left: 10px;
}
</style>

