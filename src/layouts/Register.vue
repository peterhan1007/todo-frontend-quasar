<template>
  <q-layout view="lHh Lpr lFf">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-page
        class="bg-light-green window-height window-width row justify-center items-center"
      >
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">Todo & kika</h5>
          </div>
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 300px; height: 600px"
            >
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">Registration</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl q-pb-lg">
                  <q-input
                    square
                    clearable
                    v-model="name"
                    type="name"
                    label="Name"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="email"
                    type="email"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="title"
                    type="text"
                    label="Title"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="description"
                    type="description"
                    label="Description"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="password"
                    type="password"
                    label="Password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="purple-4"
                  class="full-width text-white"
                  label="Get Started"
                  type="submit"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Return to login</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-form>
  </q-layout>
</template>

<script>
import { DefaultApolloClient, useMutation } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import { apolloClient } from 'src/apollo/apollo-client';
import { CREATE_USER_MUTATION } from 'src/apollo/graphql';
import { getCurrentInstance, provide, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterPage',
  setup() {
    provide(DefaultApolloClient, apolloClient);
    const $q = useQuasar();
    const app = getCurrentInstance();
    const name = ref(null);
    const password = ref(null);
    const email = ref(null);
    const title = ref(null);
    const description = ref(null);
    const Router = useRouter();

    const { mutate: registerMutate } = useMutation(CREATE_USER_MUTATION);

    function onSubmit() {
      if (
        !(
          name.value &&
          password.value &&
          email.value &&
          title.value &&
          description.value
        )
      ) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'You need to type name or password',
        });
      } else {
        registerMutate({
          name: name.value,
          password: password.value,
          email: email.value,
          title: title.value,
          description: description.value,
        }).then((res) => {
          $q.notify({
            color: 'blue-10',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Registered',
          });

          Router.push('/login');
        });
      }
    }

    return {
      name,
      password,
      email,
      title,
      description,
      onSubmit,

      onReset() {
        name.value = null;
        password.value = null;
        email.value = null;
        title.value = null;
        description.value = null;
      },
    };
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
