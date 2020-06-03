<template>
    <div class="fcw-input"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false">
        <template v-if="type !== 'textarea'">
            <!-- 前置元素 -->
            <div class="fcw-input-group__prepend">
                <slot name="prepend"></slot>
            </div>
            <input
                class="fcw-input-inner" 
                :class="{
                    'hoverInput':hovering === true && disabled === false,
                    'disabled':disabled === true,
                    'fcw-input-prepend':$slots.prepend,
                    'fcw-input-append':$slots.append
                }"
                :type="showPassword === true?(passwordVisible ? 'text': 'password') : type"
                :disabled="disabled"
                :value="value"
                :placeholder="placeholder"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
            />
            <!-- 操作元素 -->
            <span class="fcw_input__suffix"  v-if="getSuffixVisible()">
                <i class="iconfont gf-cuo1"  @click="clear" v-if="clearable && value.length"></i>
                <i class="iconfont gf-yanjing"  @click="handlePasswordVisible" v-if="showPassword && value.length"></i>
            </span>

            <!-- 后置元素 -->
            <div class="fcw-input-group__append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea
            v-else
            class="fcw-input-inner"
            @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate"
            @compositionend="handleCompositionEnd"
            @input="handleInput"
            ref="textarea"
            :value="value"
            :disabled="disabled"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        >
        </textarea>
    </div>
</template>

<script>
export default {
    name:'fcw-input',
    props:{
        value:[String,Number],
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        disabled:Boolean,
        clearable:Boolean,
        showPassword:Boolean
    },
    
    created(){
        console.log(this.$slots)
    },
    data(){
        return{
            isComposing:false,
            hovering:false,
            passwordVisible:false
        }
    },
    methods:{
        handleInput(event){
            if (this.isComposing) return;
            if (event.target.value === this.nativeInputValue) return;
            this.$emit('input', event.target.value);
        },
        handleCompositionStart(event){
            this.isComposing = true;
        },
        handleCompositionUpdate(event){
            // console.log('update',event)
        },
        handleCompositionEnd(event){
            if (this.isComposing) {
                this.isComposing = false;
                this.handleInput(event);
            }
        },
        //回车或者失去焦点
        handleChange(event){
            this.$emit('change', event.target.value);
        },
        //获得焦点
        handleFocus(event){
            this.$emit('focus', event);
        },
        //失去焦点
        handleBlur(event){
            this.$emit('blur', event);
        },
        //清空
        clear() {
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
        },
        //校验是否有别的功能
        getSuffixVisible(){
            return this.clearable || this.showPassword
        },
        //密码切换
        handlePasswordVisible() {
            this.passwordVisible = !this.passwordVisible;
        },
    }
}
</script>

<style scoped lang="less">
    .fcw-input{
        width: 100%;height: 40px; position: relative;
        .fcw-input-inner{
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: normal;
            outline: none;
            padding: 0 15px; font-size: 12px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            cursor: pointer;
            width: 100%;
        }
        .fcw-input-inner:focus{outline: none; border-color: #409eff; box-shadow: 0 0 0 2px rgba(45,140,240,.2);}
        .hoverInput{border-color:#409eff;}
        .disabled{
            background-color: #f3f3f3;opacity: 1;
            cursor: not-allowed;color: #ccc;
        }
        .disabled:focus{
            border-color: #dcdfe6; box-shadow:none;
        }
        .fcw-input-prepend{padding-left: 30px;}
        .fcw-input-append{padding-right: 30px;}
    }

    .fcw_input__suffix{
        position: absolute; top: 50%; margin-top: -10px; right: 7px; 
        .gf-cuo1{font-size: 20px; color: #606266; cursor: pointer;}
        .gf-yanjing{color: #606266; cursor: pointer; color: #c0c4cc;}
    }
    .fcw-input-group__prepend{ 
        position: absolute; height: 100%; display: flex; align-items: center; justify-content: center; width: 25px; margin-left: 4px; color: #c0c4cc; top: 0;
    }
    .fcw-input-group__append{
        position: absolute; height: 100%; display: flex; align-items: center; justify-content: center; width: 25px; color: #c0c4cc; right: 5px; top: 0px;
    }
    .fcw-input-inner::-webkit-input-placeholder{font-size: 12px; color:#ccc;}    /* 使用webkit内核的浏览器 */
    .fcw-input-inner:-moz-placeholder{font-size: 12px; color:#ccc;}                  /* Firefox版本4-18 */
    .fcw-input-inner::-moz-placeholder{font-size: 12px; color:#ccc;}                  /* Firefox版本19+ */
    .fcw-input-inner:-ms-input-placeholder{font-size: 12px; color:#ccc;}           /* IE浏览器 */
</style>