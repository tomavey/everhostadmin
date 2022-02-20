<template>
  <v-container>
    <v-card width="400">
      <v-card-text>
        <v-text-field v-model="propertyId" placeholder="Property Id"/>
        <v-text-field v-model="userName" placeholder="User Name (email)"/>
        <v-text-field v-model="password" placeholder="Password"/>
        <v-text-field v-model="from" placeholder="From"/>
        <v-text-field v-model="name" placeholder="To"/>
        <v-btn @click="getInfo()">Get property info</v-btn>  
      </v-card-text>
    </v-card>
    <v-divider/>

    <v-card>
      <v-card-title>SMS</v-card-title>
      <v-card-actions>
        <v-btn @click="copySMS">Copy SMS Content</v-btn>
      </v-card-actions>
      <v-card-text v-html="smsHTML">
      </v-card-text>

    </v-card>
    <v-divider/>
    <v-card>
      <v-card-title>Email to {{email}}</v-card-title>
      <v-card-actions>
        <v-btn @click="copyEmail">Copy Email Content</v-btn>
      </v-card-actions>
      <v-card-text v-html="emailHTML">



      </v-card-text>
    </v-card>
    {{emailHTML}}<br/>
    {{user}}
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      message: "Email To Send",
      propertyId: null,
      name: null,
      publicLink: "<PUBLIC LINK>",
      userName:  null,
      password: null,
      from: null,
      email: null
    }
  },
  computed: {
    property: function(){
      return this.$store.getters.property
    },
    user: function(){
      return this.$store.getters.user
    },
    emailHTML: function() {
      return `<p>Subject:  Vacation Rental Digital Property Guide - Everhost Beta</p>

      <p>${this.name}</p>

      <p>Thank you again for your patience! Here is your digital property guide.  Now all you need to do is to access the admin area and fill in some more details that are unique to your property and location.</p>

      <p>Admin Area:   https://manage.everhost.io<br/>  
          u: ${this.userName}<br/>
          p: ${this.password}<br/>
       </p>   

        <p>* Our digital guides are best viewed on mobile.  When updating your digital guide, we recommend desktop / laptop.</p>

        <p>Your Everhost digital property guide is super easy to edit and manage.  If you know how to use Microsoft Word, you'll have little to no issues.  Just in case, we have included some training videos here:
        https://www.youtube.com/watch?v=KK0GMKyl0zM&list=PLYpLQUDA_fMb9zo-hIXgqCVBROsJVrWtq</p>

        <p>And when you are ready to share this guide with guests, we have included a PDF document with messaging templates you can customize and use.
        https://www.dropbox.com/s/nskt86my2kq0oez/EH%20Messaging%20Template.pdf?dl=0</p>

        <p>Need some inspiration?  Here is a digital guide for one of our properties in Gatlinburg, TN.
        https://everhost.io/9998963 </p>

        <p>During the beta test phase I will be your personal support person, in case you have any questions or issues. Please do not hesitate to contact me.</p>


        <p>Cheers!<br/>
        Tom</p>`
    },
    smsHTML: function() {
      return ` <p>Hi ${this.name},</p>

      <p>Your digital property guide has been created and ready for you to fill in the details.  Please check the email address you provided for more info. and access.  Until then, here is a link to preview your digital guide. </p>

      <p>${this.publicLink}</p>`
    }
  },
  methods: {
    async getInfo(){
      await this.$store.dispatch('getProperty', this.propertyId)
      await this.$store.dispatch('getUser', this.property.uid)
        this.email = this.user.email
        this.userName = this.user.email
        this.name = this.property.contactInfo.hostName
        this.publicLink = `http://everhost.io/${this.property.propertyId}`
    },
    copyEmail(){
      navigator.clipboard.writeText(this.emailHTML)
      alert("copied")
    },
    copySMS(){
      navigator.clipboard.writeText(this.smsHTML)
      alert("copied")
    }

  },
  created(){
    this.getInfo()
  }
}
</script>