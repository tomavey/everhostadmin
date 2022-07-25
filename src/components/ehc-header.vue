<template>
    <div class="ehc-header">
        <span class="text">
            {{text}}
        </span>


    </div>

</template>


<script>

export default {
    props: ['text'],
    data() {
        return {

        }
    }


}
</script>


<style>
    .ehc-header {
        padding-top: 15px;
    }

    .ehc-header .text {
        font-family: 'Sailec';
        font-style: normal;
        color: #1d3557;
        font-weight: 500;
        font-size: 20px;
        line-height: 120%;
    }
</style>