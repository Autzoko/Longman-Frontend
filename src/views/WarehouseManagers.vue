<template>
  <div>
      <h1>Manager Information</h1>
      <el-table :data="managers" style="width: 100%">
          <el-table-column prop="manager_id" label="ID"></el-table-column>
          <el-table-column prop="manager_name" label="Name"></el-table-column>
          <el-table-column prop="manager_pwd" label="Password"></el-table-column>
          <el-table-column prop="manager_level" label="Level"></el-table-column>
          <el-table-column prop="manager_email" label="Email"></el-table-column>
          <el-table-column prop="last_login_datetime" label="Last Login"></el-table-column>
      </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "WarehouseManagers",
    components: {},
    data() {
        return {
            managers: []
        }
    },
    mounted() {
        this.fetchManagers();
    },
    methods: {
        async fetchManagers() {
            try {
                const response = await axios.get('api/warehouse-manager/list')
                this.managers = response.data
            } catch (error) {
                console.error('Error fetching manager data: ', error)
            }
        }
    }
}
</script>

<style scoped>

</style>