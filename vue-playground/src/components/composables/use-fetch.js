import { ref, watchEffect, toValue } from "vue";

export async function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  async function fetchData() {
    //since url is a reactive
    const resp = await fetch(toValue(url)).catch((e) => (error.value = e));
    data.value = resp.json();
  }

  //watcher on url
  watchEffect(() => fetchData);

  return { data, error };
}
