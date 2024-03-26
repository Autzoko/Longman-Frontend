<template>
  <div>
      <h1>Manager Information</h1>
      <el-button type="primary" @click="showAddManagerDialog">Add Manager</el-button>
      <el-table :data="managers" style="width: 100%">
          <el-table-column prop="manager_id" label="ID"></el-table-column>
          <el-table-column prop="manager_name" label="Name"></el-table-column>
          <el-table-column prop="manager_pwd" label="Password"></el-table-column>
          <el-table-column prop="manager_level" label="Level"></el-table-column>
          <el-table-column prop="manager_email" label="Email"></el-table-column>
          <el-table-column prop="last_login_datetime" label="Last Login"></el-table-column>
      </el-table>

      <el-dialog title="New Manager Information" :visible.sync="addManagerDialogVisible">
          <el-form :model="newManager" label-width="80px">
              <el-form-item label="ID">
                  <el-input v-model="newManager.manager_id" placeholder="Enter ID"></el-input>
              </el-form-item>
              <el-form-item label="Name">
                  <el-input v-model="newManager.manager_name" placeholder="Enter Name"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                  <el-input v-model="newManager.manager_pwd" placeholder="Enter Password"></el-input>
              </el-form-item>
              <el-form-item label="Level">
                  <el-input v-model="newManager.manager_level" placeholder="Set Level"></el-input>
              </el-form-item>
              <el-form-item label="Last Login">
                  <el-input v-model="newManager.last_login_datetime" placeholder="Enter Time"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                  <el-input v-model="newManager.manager_email" placeholder="Enter Email"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="cancelAddManager">Cancel</el-button>
              <el-button type="primary" @click="saveNewManager">Save</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import {useRouter} from "vue-router";

export default {
    name: "WarehouseManagers",
    components: {},
    data() {
        return {
            newManager: {},
            addManagerDialogVisible: false,
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
        },
        showAddManagerDialog() {
            this.newManager = {};
            this.addManagerDialogVisible = true;
        },
        cancelAddManager() {
            this.newManager = {};
            this.addManagerDialogVisible = false;
        },
        async saveNewManager() {
            try {
                await axios.post('api/warehouse-manager/add-manager', this.newManager);
                this.addManagerDialogVisible = false;
                this.fetchManagers();
            } catch (error) {
                console.error('Error adding manager: ', error);
            }
        }
    }
}
</script>

<style scoped>

</style>