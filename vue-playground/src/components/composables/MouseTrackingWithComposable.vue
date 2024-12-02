<template>Mouse position is at {{ x }} {{ y }}</template>

<script setup>
import {useMouseTracking} from "./use-mouse-tracking.js";

const {x,y} = useMouseTracking();
</script>
