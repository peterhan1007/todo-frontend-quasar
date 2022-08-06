import { apolloClient } from '../apollo/apollo-client';
import { createApp, provide, h } from 'vue';
import {
  DefaultApolloClient,
  provideApolloClient,
} from '@vue/apollo-composable';
import { createApolloProvider } from '@vue/apollo-option';

import App from '../../src/App.vue';

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

provideApolloClient(apolloClient);

app.use(apolloProvider).mount('#app');
