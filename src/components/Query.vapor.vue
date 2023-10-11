<script setup lang="ts">
import { ref } from 'vue';

const query = ref('SELECT * from courses')
const execute = async () => {
  let res = await fetch('/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query.value })
  })
  let body = await res.json()
  console.log(body)
}
</script>

<template>
<textarea v-model="query" type="text" class="rounded border-2 border-solid border-blue-400 my-4 px-2 py-2 text-4xl"></textarea> <br />
<button class="px-4 py-2 bg-blue-400 active:-translate-y-1 rounded text-2xl" @click="execute">Execute</button>
</template>

<style lang="stylus"></style>