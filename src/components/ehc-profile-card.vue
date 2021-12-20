<template>
    <v-card>
        <v-list-item-content class="justify-center">
        <div class="mx-auto text-center px-3">
            <v-icon color="accent" large>
                mdi-account-circle
            </v-icon>
            <h3>{{ user.displayName }}</h3>
            <p class="text-caption mt-1">
            {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn
            depressed
            rounded
            text
            @click="logout()"
            >
            Log Out
            </v-btn>
        </div>
        </v-list-item-content>
    </v-card>
</template>


<script>
import auth from "@/mixins/auth.vue"
export default {
  props: [],
  mixins: [auth],
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>