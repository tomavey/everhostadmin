<template>
  <v-card class="mx-auto text-center">
      <v-card-text v-for="field in fields" :key="field">
        {{field.label}}: {{org[field.key]}}
      </v-card-text>
      <v-card-text>
        Members:
        <ul>
          <li v-for="memberId in org.members" :key="memberId">
            {{memberId}} 
            <v-icon
              small
              class="mr-2"
              @click="showThisUidProperties(memberId)"
            >
              mdi-file-find
            </v-icon>
          </li>
        </ul>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['org','fields'],
  data: function() {
    return {
    }
  },
}
</script>

<style scoped>
  ul li {
    list-style: none;
  }
</style>