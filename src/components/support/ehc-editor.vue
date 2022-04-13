<template>
  <div>
    <ckeditor
      v-if="editor === 'ckeditor'"  
      v-model="data" 
      :config="editorConfig" 
      @blur="$emit('blur', data)"
      @input="$emit('change', data)">
      >
    </ckeditor>

    <!-- TODO: We can remove wysiwyg when ckeditor proves to work for us -->
  </div>
</template>

<script>

import mixins from '@/mixins'

     export default {
        name: 'app',
        mixins: [mixins],
        props: [ 'value' ],
        data() {
            return {
                data: {},
                editor: 'ckeditor',
                editorConfig: {
                    toolbar: [ 

                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Underline' ] },
                        { name: 'paragraph', groups: [ 'list', 'indent', 'align'], items: [ 'NumberedList', 'BulletedList', 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
                        { name: 'styles', items: [ 'Format' ] },
                        { name: 'links', items: [ 'Link', 'Unlink', 'Source'] },
                    ],
                    removeButtons: 'Subscript,Superscript,LinkType,Protocol',
                    allowedContent: true,
                    linkDefaultProtocol: 'https://',
                    extraPlugins: 'justify,autogrow',
                    autoGrow_maxHeight: 500
                },
            };
        },
        created () {
            this.data = this.value
            if ( !this.userIsAdmin ) {
                this.editorConfig.removeButtons = 'Subscript,Superscript'
            }
        },  
        watch: {
            value() {
                this.data = this.value
            },
            data(val) {
                this.$emit('input', val)
            }
        },
    }
</script>

<style>

    #cke_252_label {
        color: white;
    }

</style>

<!-- Note: the protocol defaults to https://. -->
<!-- Css style hides the protocol labe and box and the first td in the tr -->
<!-- I think that ekeditor might be setting selectors dynamically which would break these style hacks. -->