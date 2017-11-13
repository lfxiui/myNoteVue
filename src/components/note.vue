<template>
  <div>
    <h1>{{note.title}}</h1>
    <h5>{{note.date}}</h5>
    {{note.text}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        note:{}
      }
    },
    created(){
      this.$ajax.post(
        '/note/getNote',
        JSON.stringify(this.$router.param.id), {
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        this.note = res.data;
      }).catch(res => {
        console.log(res)
      });
    },
    methods: {
    }
  }
</script>
<style>
  .note_title{
    text-align: left;
  }
</style>
