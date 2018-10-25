<template>
<el-aside width="auto">
    <el-radio-group v-model="isCollapse">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <router-link to="/">
            <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
        </router-link>
        <template v-for="item in items">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="(citem, cindex) in item.children" :index="citem.path" :key="citem.path">
                    <router-link :to="citem.path" :index="cindex" class="item-link">
                        <span>{{citem.name}}</span>
                    </router-link>
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</el-aside>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            items: [{
                    icon: 'el-icon-printer',
                    name: '导航一',
                    path: 'fund',
                    children: [{
                        name: '资金流水',
                        path: 'fundlist'
                    }]
                },
                {
                    icon: 'el-icon-goods',
                    name: '导航二',
                    path: 'info',
                    children: [{
                        name: '信息管理',
                        path: 'userInfo'
                    }]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
}

.el-aside {
    line-height: normal !important;
}
.item-link {
    color: #303133;
    text-decoration: none;
}
</style>
