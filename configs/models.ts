import { CrudActionsEnums } from '~/enums/actions';

export default {
  users: {
    // [CrudActionsEnums.Create]: () => import('@/components/models/users/UserForm.vue'),
    // [CrudActionsEnums.Edit]: () => import('@/components/models/users/UserForm.vue'),
    // [CrudActionsEnums.Show]: () => import('@/components/models/users/UserForm.vue'),
  },
  companies: {
    [CrudActionsEnums.Create]: () => import('@/components/models/companies/CompanyForm.vue'),
    [CrudActionsEnums.Edit]: () => import('@/components/models/companies/CompanyForm.vue'),
    [CrudActionsEnums.Show]: () => import('@/components/models/companies/CompanyForm.vue'),
  }
} 