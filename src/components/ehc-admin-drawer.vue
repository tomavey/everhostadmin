<template>
      <v-navigation-drawer
        expand-on-hover
        app
      >

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title :to="feedbacks">Feedback</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "Admin Drawer"
    }
  }
}
</script>