<template>
  <div>
      <h1>Welcome to Longman</h1>
      <el-button type="primary" @click="goToManagers">Manager Info</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: "HomePage",
    setup() {
        const router = useRouter();
        const goToManagers = () => {
            router.push({name: 'WarehouseManagers'});
        };
        return {
            goToManagers
        }
    }
}
</script>

<style scoped>

</style>