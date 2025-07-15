<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '~/components/ui/badge';
import type { CompanyShow } from '~/types/company';

defineProps<{
    modelValue?: CompanyShow | null
}>()
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Détails</CardTitle>
            <CardDescription>
                {{ modelValue?.description }}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid md:grid-cols-2 gap-4">
                <p><span class="text-muted-foreground text-sm">Site Web : <br></span>
                    <a class="text-primary/90 underline transition-all hover:text-primary"
                        href="{{ modelValue?.website }}" target="_blank">{{ modelValue?.website }}</a>
                </p>
                <div>
                    <p><span class="text-muted-foreground text-sm">Assigné à :</span> </p>
                    <div class="flex items-center gap-2">
                        <div class="h-8 w-8 rounded-full bg-primary/20"></div>
                        <p>{{ modelValue?.assignedTo?.firstName
                        }} {{ modelValue?.assignedTo?.lastName }}</p>
                    </div>
                </div>
                <div>
                    <p><span class="text-muted-foreground text-sm">Spécialités :</span> </p>
                    <div class="flex items-center gap-1 flex-wrap">
                        <Badge class="rounded-full bg-primary/20 text-primary" v-if="modelValue?.Specialities" v-for="spe in modelValue?.Specialities">{{ spe.name }}</Badge>
                    </div>
                </div>
                <p><span class="text-muted-foreground text-sm">Adresse:</span> <br>
                    <span class="font-bold">{{ modelValue?.address }} - {{ modelValue?.address_complement }}</span> <br>
                    {{ modelValue?.zipCode }} - {{ modelValue?.city }} - {{ modelValue?.country }}</p>
            </div>

        </CardContent>
    </Card>
</template>