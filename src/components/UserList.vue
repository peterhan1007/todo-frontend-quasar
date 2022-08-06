<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Users"
      :rows="items"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <user-dialog :data="data" ref="modal" />
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import { GET_USERS_QUERY } from 'src/apollo/graphql';
import { computed, ref } from 'vue';
import UserDialog from './UserDialog.vue';

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'desc',
    align: 'center',
    label: 'Email',
    field: 'email',
    sortable: true,
  },
  ,
  {
    name: 'desc',
    align: 'center',
    label: 'Title',
    field: 'title',
    sortable: true,
  },
  ,
  {
    name: 'desc',
    align: 'center',
    label: 'Description',
    field: 'description',
    sortable: true,
  },
];

export default {
  name: 'UserListPage',
  setup() {
    const $q = useQuasar();
    const { result } = useQuery(GET_USERS_QUERY);
    const isModal = ref(false);
    const modal = ref({ bar2: false });
    const data = ref({});
    const items = computed(() => result.value?.users ?? []);
    const onRowClick = (evt, row) => {
      data.value = row;

      modal.value.bar2 = true;
    };

    const close = () => {
      isModal.value = false;
    };

    return {
      filter: ref(''),
      columns,
      onRowClick,
      items,
      isModal,
      close,
      data,
      modal,
    };
  },
  components: { UserDialog },
};
</script>
