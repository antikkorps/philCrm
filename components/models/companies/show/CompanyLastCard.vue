<template>
    <Card>
        <CardHeader class="flex items-center justify-between">

            <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2">
                    <div class="bg-primary/20 p-3 rounded-md">
                        <Clipboard class="size-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Activities</CardTitle>
                        <div>
                            <p class="text-sm text-muted-foreground">Gérez toutes vos activités commerciales</p>
                            <Badge class="text-primary bg-primary/20">13 activities</Badge>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <Button variant="ghost">
                        <RefreshCw />
                    </Button>
                    
                    <Button >
                        <Plus />
                        <span>Quick add</span>
                        <ChevronDown />
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent class="w-full">
        </CardContent>
    </Card>

</template>

<script setup lang="ts">
import { ChevronDown, Clipboard, Plus, RefreshCw } from 'lucide-vue-next';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

</script>