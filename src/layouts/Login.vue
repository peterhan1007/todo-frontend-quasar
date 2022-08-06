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
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    clearable
                    v-model="name"
                    type="text"
                    label="name"
                  />
                  <q-input
                    square
                    filled
                    clearable
                    v-model="password"
                    type="password"
                    label="password"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="Login"
                  type="submit"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">Not reigistered? Created an Account</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-form>
  </q-layout>
</template>

<script>
import { useMutation } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import { SIGNIN_USER_MUTATION } from 'src/apollo/graphql';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  setup() {
    const $q = useQuasar();
    const Router = useRouter();
    const name = ref(null);
    const password = ref(null);

    const { mutate: loginMutate } = useMutation(SIGNIN_USER_MUTATION);

    function onSubmit() {
      if (!(name.value && password.value)) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'You need to type name or password',
        });
      } else {
        loginMutate({ name: name.value, password: password.value }).then(
          (res) => {
            window.localStorage.setItem('apollo-token', res.data.login);

            $q.notify({
              color: 'blue-10',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted',
            });

            Router.push('/');
          }
        );
      }
    }

    return {
      name,
      password,
      onSubmit,

      onReset() {
        name.value = null;
        password.value = null;
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
