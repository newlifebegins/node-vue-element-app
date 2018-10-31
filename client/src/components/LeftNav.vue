<template>
<el-aside width="auto">
    <el-radio-group v-model="isCollapse" @change="handleToggle">
        <el-radio-button :label="false"><i class="el-icon-sort"></i></el-radio-button>
        <el-radio-button :label="true"><i class="el-icon-sort"></i></el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>

        <el-menu-item index="0">
            <router-link to="/">
                <div class="sub-menu">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </div>
            </router-link>
        </el-menu-item>

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
                        }
                    ]
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
        },
        handleToggle(key) {
            console.log(key)
        }
    }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: calc(100% - 40px);
    background: none !important;
}

.el-aside {
    line-height: normal !important;
    background-color: #001529 !important;
    border-right: none !important;
}

.el-menu {
    border-right: none !important;
}

.el-menu,
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
    background: transparent !important;
}
.el-menu--popup {
    background: #001529 !important;
}
.el-submenu__title i {
    font-size: 16px !important;
}

.el-menu-item i,
.el-submenu__title i {
    color: #fff !important;
}

.el-menu-item,
.el-submenu {
    text-align: left;
    color: #fff;
}
.el-menu-item,.el-submenu__title,.sub-menu {
    color: #fff !important;
}


.el-radio-group {
    width: 100%;
    height: 40px;
    background-color: #002140;
    box-sizing: border-box;
}

.el-radio-button {
    display: block;
}

.el-radio-button * {
    background: none !important;
}

.el-radio-button__inner {
    border: none !important;
}

.el-radio-button__inner i {
    color: #fff;
}

.el-radio-button i {
    transform: rotate(90deg);
    font-size: 18px;
}

.el-radio-button.is-active {
    display: none;
}

.item-link {
    color: #fff;
    text-decoration: none;
}

::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: none;
    border-radius: 5px;
    background: transparent;
}
</style>
