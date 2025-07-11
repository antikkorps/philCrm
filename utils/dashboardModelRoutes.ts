// utils/dashboardRoutes.ts

import { ROUTES } from "~/configs/routes";
import { CrudActionsEnums } from "~/enums/actions";

type DashboardKey = keyof typeof ROUTES.dashboard;

export function isValidModel(key: string): key is DashboardKey {
  return key in ROUTES.dashboard;
}

export function getDashboardEntry(model: string) {
  return isValidModel(model) ? ROUTES.dashboard[model] : null;
}

export function getDashboardIndex(model: string) {
  const entry = getDashboardEntry(model);
  if (entry && typeof entry === 'object' && CrudActionsEnums.Index in entry) {
    return entry.index as string;
  } else if (typeof entry === 'string') {
    return entry as string;
  }
  return '/';
}

export function getDashboardCreate(model: string) {
  const entry = getDashboardEntry(model);
  if (entry && typeof entry === 'object' && CrudActionsEnums.Create in entry) {
    return entry.create as string;
  }
  return '';
}

export function getDashboardShow(model: string, id?: string): string {
  const entry = getDashboardEntry(model);
  if (entry && typeof entry === 'object' && CrudActionsEnums.Show in entry) {
    const show = entry.show;
    if (typeof show === 'function' && id) {
      return show(id);
    }
    if (typeof show === 'string') {
      return show;
    }
  }
  return '';
}

export function getDashboardEdit(model: string, id?: string): string {
  const entry = getDashboardEntry(model);
  if (entry && typeof entry === 'object' && CrudActionsEnums.Edit in entry) {
    const edit = entry.edit;
    if (typeof edit === 'function' && id) {
      return edit(id);
    }
    if (typeof edit === 'string') {
      return edit;
    }
  }
  return '';
}

export function getDashboardDelete(model: string, id?: string): string {
  const entry = getDashboardEntry(model);
  if (entry && typeof entry === 'object' && CrudActionsEnums.Delete in entry) {
    const deleteFn = entry.delete;
    if (typeof deleteFn === 'function' && id) {
      return deleteFn(id);
    }
    if (typeof deleteFn === 'string') {
      return deleteFn;
    }
  }
  return '';
}