<script lang="ts" setup>
const { data: elections } = await useFetch("/api/elections");
</script>

<template>
  <div v-if="elections">
    <h1>Wahlen</h1>
    <ul>
      <li
        v-for="election in elections"
        :key="`${election.year}-${election.slug}`"
      >
        <NuxtLink
          :to="{
            name: 'year-slug',
            params: { year: election.year, slug: election.slug },
          }"
        >
          {{ election.name }} {{ election.year }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style></style>
