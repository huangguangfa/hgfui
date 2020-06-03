<template>
    <div class="fcw-page">
        <button  :disabled="current === 1"> <i class="iconfont gf-zuojiantou"></i></button>
        <ul class="fcw-pager" @click="onPagerClick">
            <!-- 第一页 -->
            <li v-if="current >= 0" :class="{ 'active': current === 1 }"> 1 </li>
            <!-- 左切换 -->
            <li class="iconfont" 
                v-if="showPrevMore"
                :class="quickprevIconClass"
                @mouseenter="onMouseenter('left')" 
                @mouseleave="quickprevIconClass = 'gf-gengduo'">
            </li>

            <li v-for="pager in pagers" :key="pager" :class="{ 'active': current === pager }"> {{ pager }} </li>

            <!-- 右切换 -->
            <li class="iconfont"
                v-if="showNextMore"
                :class="quicknextIconClass"
                @mouseenter="onMouseenter('right')" 
                @mouseleave="quicknextIconClass = 'gf-gengduo'">
            </li>
            <!-- 总页数 -->
            <li
                :class="{ active: current === pageCount}"
                class="number"
                v-if=" pageCount > 1 ">
                {{ pageCount }}
            </li>
        </ul>
        <button><i class="iconfont gf-youjiantou"></i></button>
    </div>
</template>

<script>
export default {
    name:'fcw-page',
    props:{
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize:{
            type: Number,
            default: 10
        },
        total: Number,
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 40, 50, 100];
            }
        },
        disabled:Boolean,
        pagerCount: {
            type: Number,
            validator(value) {
                return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
            },
            default: 7
        },
    },
    data(){
        return{
            pagers:[],
            pageCount:0,
            quicknextIconClass: 'gf-gengduo',
            quickprevIconClass: 'gf-gengduo',
            current:null,
            showPrevMore:false,
            showNextMore:false,
        }
    },
    mounted(){
        //当前分页
        if(this.currentPage){
            this.current = this.currentPage;
        }   
        this.setOption()
    },
    watch:{
        currentPage:function(val,oldVal){
            this.current = val;
            this.setOption()
        }
    },
    methods:{
        onMouseenter(direction) {
            if (this.disabled) return;
            if (direction === 'left') {
                this.quickprevIconClass = 'gf-zuozuo-';
            } else {
                this.quicknextIconClass = 'gf-youyou-';
            }
        },
        setOption(){
            //计算总分页
            if(this.total && this.pageSize){
                this.pageCount = Math.max(1, Math.ceil(this.total / this.pageSize));
            }
            // 默认分页 7
            const pagerCount = this.pagerCount;
            // 默认半页 3
            const halfPagerCount = (pagerCount - 1) / 2;

            const currentPage = Number(this.current);
            const pageCount = Number(this.pageCount);
            // 上一页更多
            let showPrevMore = false;
            // 下一页更多
            let showNextMore = false;
            // 总分页大于默认分页
            if(pageCount > pagerCount) {
                // 当前页大于 4 显示下页更多按钮
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }
                // 当前页小于 4 显示上页更多按钮
                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }
            const array = [];
            // 上页更多
            if (showPrevMore === true && showNextMore === false) {
                const startPage = pageCount - (pagerCount - 2);
                for (let i = startPage; i < pageCount; i++) {
                    array.push(i);
                }
            // 下页更多
            } else if (showPrevMore === false && showNextMore === true) {
                for (let i = 2; i < pagerCount; i++) {
                    array.push(i);
                }
            // 一样更多
            } else if (showPrevMore === true && showNextMore === true) {
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
                    array.push(i);
                }
            // 都没有更多
            } else {
                for (let i = 2; i < pageCount; i++) {
                    array.push(i);
                }
            }
            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;
            this.pagers = array;
        },
        onPagerClick(enevt){
            const target = event.target;
            let newPage = Number(event.target.textContent);
            const pageCount = this.pageCount;
            const currentPage = this.current;
            const pagerCountOffset = this.pagerCount - 2;
            //没有值就是点击操作按钮了
            if(!newPage){
                if(target.className.indexOf('gf-zuozuo-') !== -1){
                    newPage = currentPage - pagerCountOffset;
                }
                if(target.className.indexOf('gf-youyou-') !== -1){
                    newPage = currentPage + pagerCountOffset;
                }
            }
            if(newPage){
                //小于 、重置默认1
                if (newPage < 1) {
                    newPage = 1;
                }
                // 不能超过最大页
                if (newPage > pageCount) {
                    newPage = pageCount;
                }
            }
            //值相同不计算
            if (newPage !== currentPage) {
                this.current = newPage;
                this.$emit('current-change', this.current);
                this.setOption()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.fcw-page{
    width: 100%;display: flex; align-items: center; height: 28px;
    .fcw-pager{
        height: 100%; 
        >li{
            background-color: #f4f4f5;
            color: #606266;
            min-width: 30px;
            line-height: 28px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
            box-sizing: border-box;
            padding: 0 4px;
            font-size: 13px;
            display: inline-block;
            color: #606266;
            min-width: 30px;
            font-weight: 600;
            margin: 0 5px;
            &:hover{color: #409eff;}
        }
        .active{
            background-color: #409eff;
            color: #fff;
            &:hover{color: #fff;}
        }
    }
    >button{
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        min-width: 30px;
        border-radius: 2px;
        border: none;
        outline: none;
        cursor: pointer;
        height: 100%;
        &:disabled{
            cursor: not-allowed;
            opacity: 0.7;
        }
    }
}

</style>