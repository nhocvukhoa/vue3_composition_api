<template>
  <ckeditor 
    :editor="editor" 
    v-model="editorData" 
    :config="editorConfig"
  ></ckeditor>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { defineComponent, ref, watch } from 'vue';

  export default defineComponent({
    props: {
      text: {
        type: String,
        required: true,
      }
    },
    setup(props) {
      const editorData = ref(props.text);

      // watch(editorData, (newText) => {
      //   emit('update:text', newText);
      // })

      return {
        editor: ClassicEditor,
        editorData,
        editorConfig: {

        }
      }
    }
  })
</script>
