<template>
    <div class="ehcShowObj">
    <v-container  >
        <v-row v-for="(value, index) in value" :key="index" dense>
            <v-col>{{index}}</v-col>
            <v-col>{{value}}</v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
  export default {
    name: 'AllDataPanel',
    props: ['value'],
  }
</script>


<style>



</style>