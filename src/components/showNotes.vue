<template>
<div>
  <el-row class="tac">
  <el-col :span="4" :xs="8">
    <el-input
      placeholder="输入关键字进行搜索"
      v-model="filterText">
    </el-input>
    <b-list-group style="overflow:auto;height: 500px">
      <b-list-group-item v-for="note in searchNotes" href="#" v-on:click="handleNodeClick(note)">
        {{note.title}}<span style="font-size: x-small;color: #CDCDCD;text-align: right">{{note.date}}</span>
      </b-list-group-item>
    </b-list-group>
  </el-col>
  <el-col :span="19" :xs="15" style="margin: 2%;text-align: left">
    <b-button v-if="note.title != null" style="float: right;" v-on:click="deleteNote(note)">删除</b-button>
    <h3>{{note.title}}</h3>
    <h5>{{note.date}}</h5>
    <p style="text-indent: 2em" v-html="note.text"></p>
  </el-col>
  </el-row>
</div>
</template>
<script>
  export default {
    computed:{
      searchNotes:function () {
        var filterText = this.filterText;
        if(filterText){
          return this.notes.filter(function(note){
            /*some--是否存在true,相当于||*/
            return Object.keys(note).some(function(key){
              return String(note[key]).toLowerCase().indexOf(filterText) > -1
            })
          })
        }
        return this.notes;
      }
    },
    data () {
      return {
        notes: [],
        note:{
          title:null
        },
        defaultProps: {
          label:'title',
          children:''
        },
        filterText:'',
        selectDate:'',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    created(){
      this.$ajax.get('/note/getAllNotes').then((res) => {
        this.notes=res.data;
      }).catch(res => {
        console.log(res)
      });
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.id);
        this.note = data;
      },
      deleteNote(){
        //console.log(JSON.stringify(this.note));
        this.$ajax.post(
          '/note/deleteNote',
          JSON.stringify(this.note), {
            headers: {
              "Content-Type": "application/json"
            }
          }
        ).then((res) => {
          if(res.data.message==="success"){
            this.$message({
              message: '日记删除成功！',
              type: 'success'
            });
            this.notes = res.data.data;
            this.note = {title:null};
          }else{
            console.log(res.data.data);
            this.$message({
              message: '日记删除失败！',
              type: 'warning'
            });}
        }).catch(res => {
          console.log(res)
        });
      }
    }
  }
</script>
<style>
</style>
