import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShowNotes from '../components/showNotes.vue'
import WriteNote from '../components/writeNote.vue'
import Note from '../components/note.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShowNotes',
      component: ShowNotes
    },{
      path:'/hello',
      name:'hello',
      component:HelloWorld
    },{
      path:'/writeNote',
      name:'writeNote',
      component:WriteNote
    },{
      path:'/note/:id',
      name:'note',
      component:Note
    }
  ]
})
