<template>
      <v-dialog v-model="show" v-bind="$attrs">
        <v-card>
            <v-toolbar dense color="appBar" flat >
                <v-toolbar-title class="black2--text">
                    <strong>{{title}}</strong>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn plain icon>
                <img :src="require('@/assets/icons/Close@3x.svg')" v-if="close" @click="show=false">
                </v-btn>
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    bottom
                    color="black2"
                    height="5"
                    striped
            ></v-progress-linear>

            </v-toolbar>
            <v-card-text class="pt-1 pb-1 black2--text">
                <slot></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
                <template v-if="button">
                  <v-spacer/>
                  <v-btn color="button" width="40%" @click="$emit('buttonClick')" dark><strong>{{button}}</strong></v-btn>
                  
                </template>
            </v-card-actions>
        </v-card>
      </v-dialog>
</template>


<script>
export default {
    props: {
        value: Boolean,
        title: String,
        button: String,
        close: Boolean,
        loading: {type: Boolean, default: false}
    },
    name: 'ehc-dialog',
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