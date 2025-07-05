export default {
  users: {
    list: () => import('@/components/models/users/UserList.vue'),
    create: () => import('@/components/models/users/UserCreateForm.vue'),
    edit: () => import('@/components/models/users/UserEditForm.vue'),
  },
} 