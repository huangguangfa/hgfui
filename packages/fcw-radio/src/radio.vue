<template>
    <div class="fcw-radio">
        <label for="radio1" class="fcw-radio-l"
            :aria-checked="model === label"
            :class="[
                { 'is-checked ': model === label }
            ]">
            <input 
                @focus="focus = true"
                @blur="focus = false"
                @change="handleChange" 
                v-model="model"
                :value="label" 
                tabindex="-1" 
                class="fcw__orig-radio" 
                name="radio" 
                type="radio" 
            />
            <span  class="fcw-radio__inner"  @keydown.stop></span>
            <span class="fcw-radio__label">
                <slot></slot> 
                <template v-if="!$slots.default">{{label}}</template>
            </span>
        </label>
    </div>
</template>

<script>
    import Emitter from '../../../utils/mixins/emitter.js';
    export default{
        name:'fcw-radio',
        mixins: [ Emitter ],
        props: {
            value:{},
            label: {},
            disabled: Boolean,
            name: String,
        },
        data(){
            return{
                focus: false
            }
        },
        computed:{
            model: {
                get() {
                    return this.isGroup ? this._radioGroup.value : this.value;
                },
                set(val) {
                    if (this.isGroup) {
                        this.dispatch('fcw-radio-group', 'handleChange', val);
                    } else {
                        this.$emit('input', val);
                    }
                }
            },
            isGroup() {
                let parent = this.$parent;
                while (parent) {
                if (parent.$options.name !== 'fcw-radio-group') {
                    parent = parent.$parent;
                } else {
                    this._radioGroup = parent;
                    return true;
                }
                }
                return false;
            }
        },
        methods:{
            handleChange() {
                this.$nextTick(() => {
                    this.isGroup === false && this.$emit('change', this.model);
                    this.isGroup === true && this.dispatch('fcw-radio-group', 'handleChange', this.model);
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .fcw-radio-l{display: flex; align-items: center; cursor: pointer; position: relative;}
    .fcw-radio__inner{
        border: 1px solid #dcdfe6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        margin-right: 10px;
    }
    .fcw__orig-radio{position: absolute; opacity: 0;top: 0; left: 0; right: 0; bottom: 0; margin: 0; width: 100%; z-index: 2;}
    .fcw-radio__inner::after{
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -2px;
        margin-top: -2px;
    }
    .is-checked{
        .fcw-radio__inner{
            border-color: #409eff;
            background: #409eff;
        }
        .fcw-radio__label{
            color:#409eff;
        }
    }
    .fcw-radio__label{
        font-size: 14px;
    }
    .fcw-radio{margin-top: 10px;}
</style>