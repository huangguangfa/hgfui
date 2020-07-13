import Vue from 'vue'
import Router from 'vue-router'
import navConfig from '../nav.config.json'
import Home from '../common/Home.vue';
import fcwUI from '../common/fcwUI';
import demo from '../demo.vue'
Vue.use(Router)
let routes = [] //定义路由
Object.keys(navConfig).forEach((item)=>{
  routes = routes.concat(navConfig[item])
})

//生成最终路由 根据type取映射相应的组件或者md
let addRouter= router =>{
  router.forEach((route) => {  
    route.component = r => require.ensure([], () =>
      r(require(`../../docs/${route.name}.md`))
    ) 
  })
}


// let addRouter= router =>{
//   console.log(router)
//   // router.forEach((route) => {   
//   //   if (route.items) {
//   //     addRouter(route.items)
//   //     routes = routes.concat(route.items)
//   //   } else {
//   //     if (route.type === 'index') {
//   //       route.component = r => require.ensure([], () =>
//   //         r(require(`../../packages/${route.name}.vue`)))
//   //       return
//   //     }
//   //     route.component = r => require.ensure([], () =>
//   //       r(require(`../../docs/${route.name}.md`))
//   //     )
//   //   }
//   // })
// }


addRouter(routes)

export default new Router({
  
  routes:[
    {
      path: '/fcw-ui',
      component: fcwUI,
      children:[
        ...routes
      ]
    },
    {
      path: '/',
      component: Home
    },
    {
      path:'/demo',
      component:demo
    }
  ]
  
})