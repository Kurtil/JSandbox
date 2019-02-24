<template>
  <div class="secret">
    <h1>This is a secret area.</h1>
    <ul v-if="clouds">
        <li v-for='cloud of clouds' :key="cloud.id">
            {{cloud.name}}
        </li>
    </ul>
    <button @click="getCloudId"></button>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth.js";

export default {
    data() {
        return {
            clouds: Array
        }
    },
  async beforeMount() {
    await fetch("https://api-staging.bimdata.io/cloud", {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken().accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "cloud01" })
    });
  },
  methods: {
    async getCloudId() {
      const res = await fetch("https://api-staging.bimdata.io/cloud", {
        method: "GET",
        headers: {
          authorization: `Bearer ${getToken().accessToken}`,
        }
      });
      this.clouds = await res.json();
    }
  }
};
</script>
