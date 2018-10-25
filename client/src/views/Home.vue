<template>
<el-container>    
    <el-header>
        <header-nav></header-nav>
    </el-header>
    <el-container>
        <left-nav></left-nav>
        <el-container>
            <router-view></router-view>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</el-container>
</template>

<script>
// @ is an alias to /src
import HeaderNav from '@/components/Header.vue'
import LeftNav from '@/components/LeftNav.vue'

export default {
    name: 'home',
    components: {
        HeaderNav,
        LeftNav
    }
}
</script>

<style scoped>
.el-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
