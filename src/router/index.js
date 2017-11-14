import Vue from 'vue'
import Router from 'vue-router'
import ShowNotes from '../components/showNotes.vue'
import WriteNote from '../components/writeNote.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShowNotes',
      component: ShowNotes
    },{
      path:'/writeNote',
      name:'writeNote',
      component:WriteNote
    }
  ]
})
