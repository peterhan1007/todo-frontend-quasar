<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="bar2"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="network_wifi" />
          <q-icon name="network_cell" />
          <q-icon name="battery_full" />
          <div>9:34</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Update User Information</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              standout="bg-teal text-white"
              v-model="name"
              label="Custom standout"
              :dense="dense"
            />

            <q-input
              standout="bg-teal text-white"
              v-model="email"
              label="Custom standout"
              :dense="dense"
            />

            <q-input
              standout="bg-teal text-white"
              v-model="title"
              label="Custom standout"
              :dense="dense"
            />

            <q-input
              standout="bg-teal text-white"
              v-model="description"
              label="Custom standout"
              :dense="dense"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useMutation } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import { defineComponent, ref, watch } from 'vue';

import { UPDATE_USER_MUTATION } from 'src/apollo/graphql';
export default defineComponent({
  props: {
    isModal: {
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  setup(props) {
    const $q = useQuasar();
    const bar2 = ref(false);
    const rowValue = ref({});
    const name = ref(props.data.name);
    const email = ref(props.data.email);
    const title = ref(props.data.title);
    const description = ref(props.data.description);
    const { mutate: updateMutate } = useMutation(UPDATE_USER_MUTATION);
    const onSubmit = () => {
      bar2.value = false;

      if (name.value && email.value && title.value && description.value) {
        console.error('mutation');
        updateMutate({
          updateUserDto: {
            name: name.value,
            title: title.value,
            description: description.value,
            email: email.value,
            password: 'password',
          },
        }).then((res) => {
          $q.notify({
            color: 'blue-10',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Registered',
          });
        });
      }
    };

    watch(
      () => props.data,
      (newValue) => {
        name.value = newValue.name;
        email.value = newValue.title;
        title.value = newValue.email;
        description.value = newValue.description;
      }
    );
    return { bar2, close, rowValue, onSubmit, name, email, title, description };
  },
});
</script>
