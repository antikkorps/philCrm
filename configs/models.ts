export default {
  users: {
    create: () => import('@/components/models/users/UserCreateForm.vue'),
    edit: () => import('@/components/models/users/UserEditForm.vue'),
  },
  companies: {
    create: () => import('@/components/models/companies/CompanyCreateForm.vue'),
    // edit: () => import('@/components/models/companies/CompanyEditForm.vue'),
  }
} 