<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-x
    >

    <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
          v-bind="attrs"
          v-on="on"
        >
          <v-img :src="require('@/assets/icons/Support-outline@3x.svg')"></v-img> FEEDBACK
        </v-btn>
    </template>

      <v-card class="feedback">
        <v-list>
          <v-list-item>
           
            <v-list-item-content>
              <v-list-item-title>Feedback</v-list-item-title>
              <v-list-item-subtitle>Comments, suggestions, or issues</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card>
          <v-card-text>
             <ehc-form 
            v-model="formData" 
            :meta="meta" 
            :shakeInvalid="shakeInvalid"
            @valid="isValid = $event"
            :dense="true"
            />
          </v-card-text>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>


<script>
  export default {
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true,
        shakeInvalid: false,
        formData: {
                upload:[]
            },
        meta: [
                {type: "text",          label: "name",                      key: "name"},
                {type: "email",         label: "email",                     key: "email"},
                {type: "textArea",      label: "Description of issue",      key: "description"},
                // {type: "fileInput",     label: "upload screenshot(s)",      key: "upload",          multiple:true},        
            ],
        sendEmailTo: ['tom@everhost.io','grant@everhost.io','ed@everhost.io'],
    }),
    methods: {
        submit() {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            let that = this
            this.loading=true
            this.$store.dispatch("submitFeedback", this.formData).then(async() =>{
                that.loading=false;
                that.$store.commit('setShowAlert', true)
                that.$store.commit('setAlertMessage', 'Thank you for your feedback!')
                await delay(500);
                that.menu= false
                let mailObj = {
                    to: this.sendEmailTo,
                    subject: "Feedback from an Everhost user",
                    html: `
                        <p>Description: ${this.formData.description}</p>
                        <p>From: ${this.formData.name} - <a href="mailto:${this.formData.email}">${this.formData.email}</a></p>
                        <p>DO NOT REPLY TO THIS EMAIL!</p>
                        <p>Send a message to <a href="mailto:${this.formData.email}">${this.formData.email}</a></p>
                        `
                }
                this.sendMail(mailObj)
                that.formData= {upload:[]}
            })
        },
        sendMail(mailObj) {
            this.$store.dispatch("sendMail",mailObj)
            .then( console.log("sendMail dispatched", mailObj) )
        }
    }
  }
</script>

<style scoped>  
</style>