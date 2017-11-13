<template>
  <div>

    <b-input-group left="标题" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input v-model="title" id="inlineFormInputGroupUsername2" placeholder="请输入标题..." />
    </b-input-group>
    <div id="editorElem" style="text-align:left"></div>
    <b-btn v-on:click="getContent" style="float: right">提交</b-btn>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data () {
      return {
        editorContent: '',
        title:'',
        note:{
          title:'',
          text:''
        }
      }
    },
    methods: {
      getContent: function () {
        console.log(this.editorContent);
        this.note.title = this.title;
        this.note.text = this.editorContent;
        this.$ajax.post(
          '/note/addNote',
          JSON.stringify(this.note), {
            headers: {
              "Content-Type": "application/json"
            }
          }
        ).then((res) => {
          if(res.data.data==="success"){
            this.$message({
              message: '日记提交成功！',
              type: 'success'
            });
            this.$router.push({ path: '/' })
          }else{
            console.log(res.data.data);
            this.$message({
              message: '日记提交失败！',
              type: 'warning'
          });}
        }).catch(res => {
          console.log(res)
        });
      }
    },
    mounted() {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }
</script>

<style scoped>
</style>
