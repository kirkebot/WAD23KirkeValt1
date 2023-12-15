import { createRouter, createWebHistory } from 'vue-router'
import Students from "../views/Students.vue";
import Instructor from "../views/Instructor.vue";

const routes = [{
  path: '/',
  name: 'Students',
  component: Students,
},
{
  path: '/Instructor',
  name: 'Instructor',
  component: Instructor,
},
, 
{ //will route to AllPosts view if none of the previous routes apply
  path: "/:catchAll(.*)",
  name: "Students",
  component: Students,
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
