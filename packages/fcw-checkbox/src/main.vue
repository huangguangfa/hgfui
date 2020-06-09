<template>
    <div class="fcw-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    import Emitter from '../../../utils/mixins/emitter.js';
    export default{
        name:'fcw-checkbox-group',
        props:{
            value:{}
        },
        mixins: [ Emitter ],
        created(){
            this.$on('handleChange', value => {
                this.$emit('change', value);
                this.$emit('input', value);
            });
        }
    }
</script>
