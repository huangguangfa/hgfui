<template>
    <div class="fcw-radio-group">
       <component
            :is="_elTag"
            class="el-radio-group"
            role="radiogroup">
            <slot></slot>
        </component>
    </div>
</template>

<script>
    import Emitter from '../../../utils/mixins/emitter.js';
    export default{
        name:'fcw-radio-group',
        props:{
            value:{}
        },
        mixins: [ Emitter ],
        computed: {
            _elTag() {
                return (this.$vnode.data || {}).tag || 'div';
            }
        },
        created(){
            this.$on('handleChange', value => {
                this.$emit('change', value);
                this.$emit('input', value);
            });
        },
        watch: {
            value(value) {
                this.dispatch('fcw-radio', 'radioChang', this.value);
            }
        }
    }
</script>
