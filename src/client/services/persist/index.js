import store from '../../config/store';

export const getStore = () => store;

export const isHydrated = () => new Promise((resolve) => {
  const unsubscribe = store.subscribe(() => {
    if (store.getState().services.persist.isHydrated) {
      unsubscribe();
      resolve(store.getState());
    }
  });
});
