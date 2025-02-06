<script lang="ts" setup>
const route = useRoute();
if (route.name !== "year-slug")
  throw createError({
    statusCode: 500,
    statusMessage: "Unexpected route name!",
  });
const { year, slug } = route.params;
const { data: election } = await useFetch(`/api/elections/${year}/${slug}`);
</script>

<template>
  <div v-if="election">
    <Title>{{ election.title }} {{ year }}</Title>
    <h1>{{ election.title }} {{ year }}</h1>
    <h2>Statements</h2>
    <ul>
      <li v-for="statement in election.statements" :key="statement.id">
        {{ statement.text }}
      </li>
    </ul>
    <h2>Parteien</h2>
    <ul>
      <li v-for="party in election.parties" :key="party.id">
        {{ party.name }} | {{ party.longname }}
      </li>
    </ul>
  </div>
</template>

<style></style>
