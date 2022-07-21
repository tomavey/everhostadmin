<template>
<!-- TODO: workout issues with displaying these, turn this into a table make corners rounded -->
  <div class="ehc-Show-Obj">
    <v-container class="ma-0 pa-0">
      <template v-for="(item, index) in meta">
        <v-row :key="index" dense class="">
          <v-col><span>{{item.label}}</span></v-col>
          <v-col>{{value[item.key]}}</v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'AllDataPanel',
    props: ['value', 'meta'],
  }
</script>


<style>


.ehc-Show-Obj .row:nth-child(odd) {
  background-color: #f3f5f7;
}

.ehc-Show-Obj .col:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.ehc-Show-Obj .col:last-child {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

</style>