<template>
    <div class="fcw-checkbox">
        <label for="checkboxl" 
            class="fcw-checkbox-label"
            :class="[
                { 'is-checked': isChecked },
                { 'is-disabled': disabled }
            ]">
            <input
                v-if="trueLabel || falseLabel"
                :disabled="disabled"
                @focus="focus = true"
                @blur="focus = false"
                @change="handleChange"
                :true-value="trueLabel"
                :false-value="falseLabel"
                :value="label"
                v-model="model"
                tabindex="-1" 
                class="fcw__orig-checkbox"
                :name="name"
                type="checkbox"
            />
            <input
                v-else
                :disabled="disabled"
                @focus="focus = true"
                @blur="focus = false"
                @change="handleChange"
                v-model="model"
                :value="label"
                tabindex="-1" 
                class="fcw__orig-checkbox"
                :name="name"
                type="checkbox"
            />
            <!-- 模拟勾选的div -->
            <span class="fcw-checkbox__inner " 
                :class="[ 
                    { 'is-checked-inner': isChecked === true && disabled === true },
                    { 'is-checked-indeterminate': indeterminate === true && isChecked === false }
                ]" @keydown.stop>
            </span>
            <span class="fcw-checkbox__label">
                <slot></slot>
                <template v-if="!$slots.default && label">{{ label }}</template>
            </span>
        </label>
    </div>
</template>

<script>
    import Emitter from '../../../utils/mixins/emitter.js';
    export default{
        name:'fcw-checkbox',
        mixins: [ Emitter ],
        props: {
            value:{},
            label: {},
            disabled: Boolean,
            name: String,
            trueLabel: [String, Number],
            falseLabel: [String, Number],
            indeterminate: Boolean,
        },
        data(){
            return{
                focus: false
            }
        },
        computed:{
            model: {
                get() {
                    return this.isGroup ? this._checkboxGroup.value : this.value;
                },
                set(val) {
                    if (this.isGroup) {
                        this.dispatch('fcw-checkbox-group', 'handleChange', [ val ]);
                    } 
                    else {
                        this.$emit('input', val);
                    }
                }
            },
            isGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.name !== 'fcw-checkbox-group') {
                        parent = parent.$parent;
                    } else {
                        this._checkboxGroup = parent;
                        return true;
                    }
                }
                return false;
            },
            isChecked() {
                if ( {}.toString.call(this.model) === '[object Boolean]' ) {
                    return this.model;
                } else if ( Array.isArray(this.model) ) {
                    return this.model.indexOf(this.label) > -1;
                } else if (this.model !== null && this.model !== undefined) {
                    return this.model === this.trueLabel;
                }
            }
        },
        methods:{
            handleChange(ev) {
                let value;
                if (ev.target.checked) {
                    value = this.trueLabel === undefined ? true : this.trueLabel;
                } else {
                    value = this.falseLabel === undefined ? false : this.falseLabel;
                }
                this.$emit('change', value, ev);
                // this.$nextTick( () => {
                //     if (this.isGroup) {
                //         this.dispatch('fcw-checkbox-group', 'handleChange', [ this._checkboxGroup.value ]);
                //     }
                // });
            }
        }
    }
</script>

<style lang="less" scoped>
    .fcw-checkbox-label{
        display: flex; align-items: center; cursor: pointer; position: relative; display: inline-block;
    }
    .fcw-checkbox__inner{
        border: 1px solid #dcdfe6;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        margin-right: 5px;
        border: 1px solid #dcdfe6;
        // z-index: 2;
        &:hover{border-color: #409eff;}
    }
    .fcw__orig-checkbox{ position: absolute; opacity: 0;top: 0; left: 0; right: 0; bottom: 0; width: 100%; margin: 0;z-index: 2; height: 100%;}
    .fcw-checkbox__inner::after{
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        width: 3px;
        transition: transform .15s ease-in .05s;
        transform-origin: center;
        transform: rotate(45deg) scaleY(1);
    }
    .is-checked{
        .fcw-checkbox__inner{
            border-color: #409eff;
            background: #409eff;
        }
        .fcw-checkbox__label{
            color:#409eff;
        }
    }
    .is-checked-indeterminate{
        border-color: #409eff;
        background: #409eff;
    }
    .is-checked-indeterminate::after{
        content: "";
        position: absolute;
        display: block;
        background-color: #fff;
        height: 2px;
        transform: rotate(0deg) scale(.5);
        left: 0;
        right: 0;
        top: 4px;
        width: 10px;
    }
    .is-disabled{
        cursor: not-allowed;
        >input{
            cursor: not-allowed;
        } 
        .fcw-checkbox__inner{
            border: 1px solid #dcdfe6;
            background-color: #f5f7fa;
            &::after{
                background-color: #f2f6fc;
                border-color: #f2f6fc;
            }
            &:hover{border-color: #dcdfe6;}
        }
        .fcw-checkbox__label{
            color:#c0c4cc;
        }
    }
    .is-checked{
        .is-checked-inner{
            &::after{
                background-color: #f2f6fc;
                border-color: #dcdfe6;
            }
        }
    }
    .fcw-checkbox__label{
        font-size: 14px;
        color: #606266;
    }
    .fcw-checkbox{display: flex; align-items: center;}
</style>