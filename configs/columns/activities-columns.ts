import type { Activity } from "~/types/activity";
import type { ColumnDef } from "@tanstack/vue-table";
import { getContrastTextColor } from "~/lib/utils";
import { getPriorityColor, getTaskStatusColor, ActivityPriority, TaskStatus } from "~/enums/activities";
import { h } from "vue";
import { cn } from "~/lib/utils";
import AssignAtOnFly from "~/components/models/companies/show/AssignAtOnFly.vue";
import { str } from "~/lib/str";
import { useI18n } from "vue-i18n";
import CellActions from "~/components/models/table/CellActions.vue";

export const ActivitiesColumns: ColumnDef<Activity>[] = [
    {
        accessorKey: 'title',
        header: 'attributes.title.name',
    },
    {
        accessorKey: 'type',
        header: 'attributes.type.name',
        cell: ({ row }) => {
            const { t } = useI18n()
            const type = row.original.type;
            return str(t('enums.activities.type.' + type)).capitalize().value()
        }
    },
    {
        accessorKey: 'taskStatus',
        header: 'attributes.status.name',
        cell: ({ row }) => {
            const { t } = useI18n()
            const status = row.original.taskStatus;
            if (!status) return;
            const color = getTaskStatusColor(status as TaskStatus);
            const textClass = getContrastTextColor(color);
            return h('span',
                {
                    class: cn(
                        status
                            ? 'inline-block px-2 py-1 rounded-full text-xs tracking-wider font-normal capitalize'
                            : 'hidden',
                        textClass
                    ),
                    style: `background-color: ${color};`,
                },
                { default: () => str(t('enums.activities.taskStatus.' + status)).uppercase().value() }
            );
        }
    },
    {
        accessorKey: 'dueDate',
        header: 'attributes.dueDate.name',
        cell: ({ row }) => {
            const { formatDate } = useDateFormat()
            return formatDate(row.original.dueDate)
        }
    },
    {
        accessorKey: 'progress',
        header: 'attributes.progress.name',
        cell: ({ row }) => {
            const progress = row.original.progress;
            return progress ? `${progress}%` : '';
        }
    },
    {
        accessorKey: 'priority',
        header: 'attributes.priority.name',
        cell: ({ row }) => {
            const { t } = useI18n()
            const priority = row.original.priority;
            const color = getPriorityColor(priority as ActivityPriority);
            const textClass = getContrastTextColor(color);
            return h('span',
                {
                    class: cn(priority ? 'inline-block px-2 py-1 rounded-full text-xs tracking-wider font-normal capitalize' : 'hidden', textClass),
                    style: `background-color: ${color};`,
                }, { default: () => str(t('enums.activities.priority.' + priority)).uppercase().value() });
        }
    },
    {
        accessorKey: 'assignedTo',
        header: 'attributes.assigned_to.name',
        cell: ({ row }) => {
            const data = row.original
            return h(AssignAtOnFly, { modelValue: data })
        }
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return h('div', { class: 'relative' }, h(CellActions, {
                model: 'activities',
                id: row.original.id,
            }))
        },
    },
]