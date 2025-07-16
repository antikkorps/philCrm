<template>
    <Card>
        <CardHeader class="">
            <div class="flex rounded-lg items-center justify-between bg-primary/5 py-5 px-4">
                <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                        <div class="bg-primary/20 p-3 rounded-md">
                            <Clipboard class="size-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle>{{ str($t('company.activities.title', 2)).capitalize().value() }}</CardTitle>
                            <div>
                                <p class="text-sm text-muted-foreground">{{
                                    str($t('company.activities.manageAll')).capitalize().value() }}</p>
                                <Badge class="text-primary bg-primary/20">
                                    {{ str($t('company.activities.count_activities', {
                                        count: 13
                                    })).capitalize().value()}}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button variant="ghost">
                            <RefreshCw />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button>
                                    <Plus />
                                    <span>{{ str($t('global.action.quickAdd')).capitalize().value() }}</span>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <NoteIcon class="mr-2" /> Note
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <TaskIcon class="mr-2" /> Tâche
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between border  py-2 rounded-lg px-4 mt-4">
                <p class="text-sm text-muted-foreground">Filtrer par type</p>
                <Button variant="ghost">
                    <Funnel />
                </Button>
            </div>
        </CardHeader>
        <CardContent class="w-full">
            <div class="flex items-center gap-4">
                <div class="flex items-center border rounded-lg  p-3 w-[150px] justify-between">
                    <div class="">
                        <p class="text-sm text-muted-foreground font-bold">Call</p>
                        <p class="text-md">1</p>
                    </div>
                    <div class="bg-yellow-500 text-white rounded-full p-3">
                        <PhoneCall class="size-5" />
                    </div>
                </div>

                <div class="flex items-center  border rounded-lg w-[150px] p-3 justify-between">
                    <div class="">
                        <p class="text-sm text-muted-foreground font-bold">Meeting</p>
                        <p class="text-md">1</p>
                    </div>
                    <div class="bg-orange-500 text-white rounded-full p-3">
                        <UsersRound class="size-5" />
                    </div>
                </div>

                <div class="flex items-center  border rounded-lg w-[150px] p-3 justify-between">
                    <div class="">
                        <p class="text-sm text-muted-foreground font-bold">Email</p>
                        <p class="text-md">1</p>
                    </div>
                    <div class="bg-black text-white rounded-full p-3">
                        <Mail class="size-5" />
                    </div>
                </div>
                <div class="flex items-center  border rounded-lg w-[150px] p-3 justify-between">
                    <div class="">
                        <p class="text-sm text-muted-foreground font-bold">Task</p>
                        <p class="text-md">1</p>
                    </div>
                    <div class="bg-blue-500 text-white rounded-full p-3">
                        <ListCheck class="size-5" />
                    </div>
                </div>
                <div class="flex items-center  border rounded-lg w-[150px] p-3 justify-between">
                    <div class="">
                        <p class="text-sm text-muted-foreground font-bold">Note</p>
                        <p class="text-md">1</p>
                    </div>
                    <div class="bg-cyan-500 text-white rounded-full p-3">
                        <FileText class="size-5" />
                    </div>
                </div>
            </div>


            <Tabs default-value="account1" class="w-full ">
                <div class="flex items-center justify-between bg-muted w-full">
                    <TabsList class="grid grid-cols-4">
                        <TabsTrigger value="account1" class="px-6">
                            Toutes
                        </TabsTrigger>
                        <TabsTrigger value="password" class="px-6">
                            En attente
                        </TabsTrigger>
                        <TabsTrigger value="password" class="px-6">
                            Terminées
                        </TabsTrigger>
                        <TabsTrigger value="password" class="px-6">
                            En retard
                        </TabsTrigger>
                    </TabsList>
                    <div>
                        ok
                    </div>
                </div>

                <TabsContent value="account1">
                    ici
                </TabsContent>
                <TabsContent value="password">
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>

</template>

<script setup lang="ts">
import { ChevronDown, Clipboard, FileText, Funnel, ListCheck, Mail, PhoneCall, Plus, RefreshCw, UsersRound } from 'lucide-vue-next';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { str } from '~/lib/str';

</script>