<template>
      <v-dialog v-model="show" v-bind="$attrs">
        <v-card>
            <v-toolbar dense color="primary" flat dark>
                <v-toolbar-title >
                    <strong>
                    {{title}}
                    </strong>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-1 pb-1">
                <slot></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
      </v-dialog>
</template>


<script>
export default {
    props: {
        value: Boolean,
        title: String
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