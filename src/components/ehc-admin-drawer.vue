<template>
      <v-navigation-drawer
        expand-on-hover
        permanent
        app
      >
        <v-list
          nav
          dense
        >
          <v-list-item link @click="$router.push('/users')">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/feedbacks')">
            <v-list-item-icon>
              <v-icon>mdi-message-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Feedback</v-list-item-title>
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