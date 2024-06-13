<template>
  <v-card title="Leads" flat>
    <template #text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line />
    </template>
    <v-data-table v-model:expanded="expanded" :headers="headers" :items="leads ?? []" item-value="name" show-expand>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">More info about {{ item.name }}</td>
        </tr>
      </template>
      <template v-slot:item.status="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:item.responsible="{ value }">
        <div>
          <v-icon color='primary' aria-hidden="false"> mdi-account </v-icon>
          {{ value }}
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">

const expanded = ref([]);
const headers = [
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Название',
  },
  { key: 'budget', title: 'Бюджет' },
  { key: 'status', title: 'Статус' },
  { key: 'responsible', title: 'Ответственный' },
  // { key: 'contact', title: 'Дата' },
];
const search = ref<string>('');
// const leads: Array<Lead> = 
// const { pending, data: leads } = await useBaseFetch('/leads')
const { pending, data: leads } = await useFetch('/leads', {baseURL: 'http://localhost:3001'})
console.log('leads', leads);

// const leads: Array<Lead> = [
//   {
//     name: 'First lead',
//     budget: 1000,
//     status: LeadStatus.PROCESSING,
//     responsible: 'Ivanov',
//     date: new Date(),
//     contact: {
//       fullName: 'Test',
//       tel: '55555',
//       email: 'eeeeeee',
//     },
//   },
//   {
//     name: 'First lead',
//     budget: 1000,
//     status: LeadStatus.CLOSED_FINISHED,
//     responsible: 'Ivanov',
//     date: new Date(),
//     contact: {
//       fullName: 'Test',
//       tel: '55555',
//       email: 'eeeeeee',
//     },
//   },
//   {
//     name: 'First lead',
//     budget: 1000,
//     status: LeadStatus.PEREGOVORY,
//     responsible: 'Ivanov',
//     date: new Date(),
//     contact: {
//       fullName: 'Test',
//       tel: '55555',
//       email: 'eeeeeee',
//     },
//   },
//   {
//     name: 'First lead',
//     budget: 1000,
//     status: LeadStatus.PROCESSING,
//     responsible: 'Ivanov',
//     date: new Date(),
//     contact: {
//       fullName: 'Test',
//       tel: '55555',
//       email: 'eeeeeee',
//     },
//   },
// ];
const getColor = (status: LeadStatus): string => {
  if (status === LeadStatus.CLOSED_FINISHED) return 'teal-lighten-3';
  else if (status === LeadStatus.CLOSED_NOT_FINISHED) return 'grey-lighten-2';
  else if (status === LeadStatus.PEREGOVORY) return 'amber-lighten-3';
  else return 'light-blue-lighten-3';
};
</script>
