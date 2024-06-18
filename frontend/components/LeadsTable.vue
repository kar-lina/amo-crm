<template>
  <v-card title="Сделки" flat>
    <template #text>
      <v-text-field v-model="search" label="Поиск" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line />
    </template>
    <v-data-table v-model:expanded="expanded" :headers="headers" :items="leads ?? []" :loading="pending" item-value="name" show-expand>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <div class="flex gap-2">
              <v-icon color="primary" aria-hidden="false"> mdi-account </v-icon>
              {{ item.contact.name }}
              <a v-if="item.contact.email" :href='`mailto:${item.contact.email}`'> <v-icon color="primary" aria-hidden="false"> mdi-email </v-icon> </a>
              <a v-if="item.contact.phone" :href='`tel:${item.contact.phone}`' class="button"> <v-icon color="primary" aria-hidden="false"> mdi-phone </v-icon> </a>
            </div>
            <div></div>
          </td>
        </tr>
      </template>
      <template v-slot:item.status="{ value }">
        <v-chip :color="value.color" >
          {{ value.name }}
        </v-chip>
      </template>
      <template v-slot:item.contact="{ value }">
        <div>
          <v-icon color="primary" aria-hidden="false"> mdi-account </v-icon>
          {{ value.name }}
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
  { key: 'price', title: 'Бюджет' },
  { key: 'status', title: 'Статус' },
  { key: 'contact', title: 'Ответственный' },
  { key: 'created_at', title: 'Дата' },
];

const search = useDebouncedRef('')
const { pending, data: leads,  } = useBaseFetch('/leads', {query: {query: search}});
</script>
