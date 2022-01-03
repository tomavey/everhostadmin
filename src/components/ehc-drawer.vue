<!-- 
    example:
        <ehc-drawer 
            v-model="showFeedback" 
            right 
            title="Feedback" 
            subtitle="please let us know of any issues or feedback">
            <ehc-form></ehc-form>
            <template v-slot:actions>
                <v-btn width="100%">this button is at the bottom</v-btn>
            </template>
        </ehc-drawer>
 -->


<template>

      <v-navigation-drawer v-model="show" v-bind="$attrs" absolute class="black2--text" width="350">
        <v-container>
            <div>
                <h1>{{title}}</h1>
                <span v-if="subtitle !== null">{{subtitle}}</span>
            </div>
            <v-divider></v-divider>
        <slot></slot>
        </v-container>
        <template v-slot:append>
            <!-- I wanted either to work -->
            <v-container fluid>
                <slot name="actions"></slot>
                <slot name="append"></slot>
            </v-container>
        </template>
      </v-navigation-drawer>
</template>


<script>
export default {
    props: {
        value: Boolean,
        title: String,
        subtitle: {
            type: String,
            default: null
        }
    },
    name: 'ehc-drawer',
    data: () => ({
        show: false
    }),
    watch: {
        value(val) {
            if (val != this.show) {
                this.show= val
            }
        },
        show(val) {
            if (val != this.value) {
                this.$emit('input', val)
            }
        }
    }
}

</script>