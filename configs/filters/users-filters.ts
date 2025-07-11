export const usersFilters = [
    {
        name: 'name',
        type: 'text',
        label: 'Nom'
    },
    {
        name: 'email',
        type: 'text',
        label: 'Email'
    },
    {
        name: 'role',
        type: 'select',
        label: 'Rôle',
        options: [
            { value: 'admin', label: 'Administrateur' },
            { value: 'user', label: 'Utilisateur' },
            { value: 'moderator', label: 'Modérateur' }
        ]
    },
    {
        name: 'status',
        type: 'select',
        label: 'Statut',
        options: [
            { value: 'active', label: 'Actif' },
            { value: 'inactive', label: 'Inactif' },
            { value: 'pending', label: 'En attente' }
        ]
    }
] 