<template>
  <v-container>
    {{message}}
    <h2>Steps - a separate for each...</h2>
    <ul>
      <li @click="$router.push({name: 'NewPropertyCodeDialog'})" class="pointer">Select a code for your new property</li>
      <li @click="$router.push({name: 'NewPropertyCreateDialog'})" class="pointer">Create basic info - Property Name, Location, Property code, platform</li>

      <li @click="$router.push({name: 'NewPropertyInfoDialog', params: {contentName: 'description'}})" class="pointer">Property Info Welcome</li>
      <li @click="$router.push({name: 'InstructionsDialog', params: {contentName: 'descriptioninstructions'}})" class="pointer indent">Instructions</li>
      
      <li>Check in/ check out instructions</li>
      <li>Parking info</li>
      <li>How To information</li>
      <li>Amenities</li>
      <li>Images</li>
    </ul>
    <h2>Other pages</h2>
    <ul>
      <li>Nearby from Google or tripadvisor API</li>
      <li>Weather from widget</li>
      <li>Deals - need a separate app</li>
    </ul>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      message: "New Property"
    }
  }
}
</script>

<style>
.indent {
  margin-left: 20px;
  margin-bottom: 20px
}
</style>