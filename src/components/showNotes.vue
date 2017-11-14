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
    <h3>{{note.title}}</h3><h5>{{note.date}}</h5>
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
        note:{},
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
      }
    }
  }
</script>
<style>
</style>
