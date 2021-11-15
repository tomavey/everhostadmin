<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >

    <v-app-bar
      dark
      color="pink"
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>Welcome to Everhost!</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-container>
      <v-row dense>

        <v-col cols="12" v-for="(item,index) in items" :key=index>
          <v-card
            :color=item.color
            dark
            :to=item.routeName
             class="center-text"
          >
            <v-card-title class="text-h5">
              <p class="center-text" v-html="item.title">
              </p>
            </v-card-title>

            <v-card-subtitle class="center-text" v-html="item.subtitle"></v-card-subtitle>

            <v-card-actions>
              <v-btn
                :to=item.routeName 
                text
              >
                {{item.action}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          color: '#1F7087',
          routeName: 'NewPropertyCreateDialog',
          title: 'Create new property',
          subtitle: 'Enter all the information your guests will need in an web app for your property.',
          action: "Start Now"
        },
        {
          color: '#952175',
          routeName: 'PropertiesGallery',
          title: 'List all of your properties.',
          subtitle: 'List, edit or delete all of your properties.',
          action: "See the list"
        },
      ],
    }),
  }
</script>

<style scoped>
  .center-text {
    width:100%;
    text-align: center;
}
</style>