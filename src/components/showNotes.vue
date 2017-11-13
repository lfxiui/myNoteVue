<template>
<div>
  <el-row class="tac">
  <el-col :span="4" :xs="8">
    <!--<el-button style="width: 100%" size="mini"><i class="el-icon-date"></i>查询日期</el-button>-->
    <el-input
      placeholder="输入关键字进行搜索"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      style="overflow:auto;height: 500px"
      :data="notes"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="handleNodeClick"
      empty-text="没有日志哦...">
    </el-tree>
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
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
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
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1;
      }
    }
  }
</script>
<style>
</style>
