import { ref, onMounted, onUnmounted } from "vue";

export function useMouseTracking() {
  const x = ref(0);
  const y = ref(0);

  const update = (event) => {
    x.value = event.x;
    y.value = event.y;
  };

  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  return { x, y };
}
