<template>
    <div class="spinner-container" v-bind:style="{ height: size, width: size }">
        <div class="spinner"></div>
    </div>
</template>

<script>
    export default {
        name: 'projects',
        props: [
            'size'
        ]
    };
</script>

<style lang="scss" scoped>
    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
    
    .spinner-container {
        display: inline-block;
        .spinner {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border-top: 2px solid #07d;
            border-right: 2px solid transparent;
            animation: spinner .5s linear infinite;
        }
    }
</style>