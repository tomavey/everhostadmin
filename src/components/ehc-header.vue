<template>
  <div class="ehc-header">
    <span class="text mt-1 mb-1">
      {{ text }}
    </span>
   

    <span class="actions mt-auto" >
      <template v-for="(action, index) in actions">
        <ehc-btn v-if="action.actionType == 'v-btn'" 
                :key="index" 
                v-bind="action" 
                @click="$emit(action.clickEmit,true)" 
                class="mr-2 mb-2">
            <template v-slot:left>
              <v-icon left v-if="'prependIcon' in action">
                  {{action.prependIcon}}
              </v-icon>
              <img v-if="'prependIconURL' in action" :src="action.prependIconURL" class="mr-2" />
            </template>
            {{action.label}}
        </ehc-btn>

        <v-btn-toggle 
          v-else-if="action.actionType == 'v-btn-toggle'" 
          class="mr-2 mb-2" 
          v-bind="action"
          v-model="action.default"
          @change="$emit(action.changeEmit, $event)">
            <template v-for="(button, bindex) in action.buttons">
              <ehc-btn v-bind="button" :key='bindex'>
                <template v-slot:left>
                  <v-icon left v-if="'prependIcon' in button">
                      {{button.prependIcon}}
                  </v-icon>
                  <img v-if="'prependIconURL' in button" :src="button.prependIconURL" class="mr-2" />
                </template>
                {{button.label}}
              
              </ehc-btn>
            </template>
        </v-btn-toggle>




      </template>
    </span>


  </div>
</template>

<script>
export default {
  props: ["text", "actions"],
  data() {
    return {};
  },
  methods: {
    getIconURL(url) {
      return require(url)
    }
  }
};
</script>

<style>
.ehc-header {
  padding-top: 15px;
  width: 100%;
  display: block;
  overflow: hidden
}

.ehc-header .text {
  font-family: "Sailec";
  font-style: normal;
  color: #1d3557;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  float: left;
}

.ehc-header .actions {
  width: fit-content;
  float: right;
  margin-left: auto;
  margin-right: 0;
}

.ehc-header .actions .v-btn-toggle {
  border-radius: 8px;
}
</style>
