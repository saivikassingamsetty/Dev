<template>
  <Trandition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h3><slot name="header">Default Header</slot></h3>
        </div>
        <div class="modal-body">
          <slot name="body">Default Body</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            Default Footer
            <button @click="$emit('close')" class="modal-default-button">
              Ok
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Trandition>
</template>

<script setup>
const props = defineProps({ show: Boolean });
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/* The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js. */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
