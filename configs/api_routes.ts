import { CrudActionsEnums } from "~/enums/actions";

/**
 * Make complete crud routes for a given model
 * @param model - The model to make complete crud routes for
 * @returns The complete crud routes for the given model
 */
function makeCompleteCrudRoutes(baseUrl: string,model: string) {
    return {
        [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
            if (!params) return `${baseUrl}/${model}`;
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, value.toString());
                }
            });
            return `${baseUrl}/${model}?${searchParams.toString()}`;
        },
        [CrudActionsEnums.Create]: `${baseUrl}/${model}`,
        [CrudActionsEnums.Show]: (id: string | number) => `${baseUrl}/${model}/${id}`,
        [CrudActionsEnums.Update]: (id: string | number) => `${baseUrl}/${model}/${id}`,
        [CrudActionsEnums.Delete]: (id: string | number) => `${baseUrl}/${model}/${id}`,
    };
}

const API_BASE = "/api";
const apiModels: Record<string, any> = {};
const COMPLETE_CRUD_MODELS = ['companies', 'contacts', 'statuses'] as const;

COMPLETE_CRUD_MODELS.forEach(model => {
    apiModels[model] = makeCompleteCrudRoutes(API_BASE, model);
});

/** Add custom manually routes for api routes */
apiModels.status = {
    [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
        if (!params) return `${API_BASE}/statuses`;
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        return `${API_BASE}/statuses?${searchParams.toString()}`;
    },
    [CrudActionsEnums.Show]: (id: string | number) => `${API_BASE}/statuses/${id}`,
};
apiModels.tenants = {
    [CrudActionsEnums.Index]: (params?: Record<string, any>) => {
        if (!params) return `${API_BASE}/tenants`;
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        return `${API_BASE}/tenants?${searchParams.toString()}`;
    },
    userByTenant: (tenantId: string | number) => `${API_BASE}/users/tenant/${tenantId}`,
};

apiModels.activities = makeCompleteCrudRoutes(API_BASE, 'activities');
Object.assign(apiModels.activities, {
    myActivities: (params?: Record<string, any>) => {
      if (!params) return `${API_BASE}/activities/my-activities`;
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(','))
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
      return `${API_BASE}/activities/my-activities?${searchParams.toString()}`;
    },
    getActivitiesByCompany: (companyId: string | number, params?: Record<string, any>) => {
        let url = `${API_BASE}/activities/company/${companyId}`;
        if (params && Object.keys(params).length > 0) {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              searchParams.append(key, value.join(','))
            } else if (value !== undefined && value !== null) {
              searchParams.append(key, value.toString())
            }
          });
          url += `?${searchParams.toString()}`;
        }
        return url;
      }
  });

export const API_ROUTES = {
    models: apiModels,
    auth: {
        me: `${API_BASE}/auth/me`
    }
}