<template>
  <div style="margin: 20px">
      <h1 class="title">Manager Information</h1>
      <el-button type="primary" @click="showAddManagerDialog" style="margin-bottom: 20px">Add Manager</el-button>
      <el-table :data="managers" style="width: 100%" border>
          <el-table-column prop="manager_id" label="ID"></el-table-column>
          <el-table-column prop="manager_name" label="Name"></el-table-column>
          <el-table-column prop="manager_pwd" label="Password"></el-table-column>
          <el-table-column prop="manager_level" label="Level"></el-table-column>
          <el-table-column prop="manager_email" label="Email"></el-table-column>
          <el-table-column prop="last_login_datetime" label="Last Login"></el-table-column>
          <el-table-column label="Actions">
              <template #default="{row}">
                  <el-button type="text" @click="openEditDialog(row)">Edit</el-button>
                  <el-button type="text" @click="deleteManager(row)">Delete</el-button>
              </template>
          </el-table-column>
      </el-table>

      <el-dialog title="New Manager Information" v-model="addManagerDialogVisible" width="50%">
          <el-form :model="newManager" label-width="80px">
              <el-form-item label="ID" required>
                  <el-input v-model="newManager.manager_id" placeholder="Enter ID" style="margin-left: 30px"></el-input>
              </el-form-item>
              <el-form-item label="Name" required>
                  <el-input v-model="newManager.manager_name" placeholder="Enter Name" style="margin-left: 30px"></el-input>
              </el-form-item>
              <el-form-item label="Password" required>
                  <el-input v-model="newManager.manager_pwd" placeholder="Enter Password" style="margin-left: 30px"></el-input>
              </el-form-item>
              <el-form-item label="Level" required>
                  <el-select v-model="newManager.manager_level" placeholder="Select Level" style="margin-left: 30px">
                      <el-option v-for="level in levels" :key="level.value" :label="level.label" :value="level.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="Log Info" required label-width="80px">
                  <el-date-picker
                      v-model="newManager.last_login_datetime"
                      type="datetime"
                      placeholder="Select Date and Time"
                      :default-value="new Date()"
                      style="margin-left: 30px"></el-date-picker>
              </el-form-item>
              <el-form-item label="Email">
                  <el-input v-model="newManager.manager_email" placeholder="Enter Email" style="margin-left: 30px"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="cancelAddManager">Cancel</el-button>
              <el-button type="primary" @click="saveNewManager">Save</el-button>
          </div>
      </el-dialog>

      <el-dialog title="Edit Manager Information" v-model="editManagerDialogVisible" width="50%">
          <el-form :model="updateManagerForm" label-width="100px">
              <el-form-item label="Select Field">
                  <el-select v-model="selectedField" placeholder="Select a Field">
                      <el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item v-if="selectedField !== ''" :label="fields.find(field => field.value === selectedField).label">
                  <el-input v-model="updateManagerForm[selectedField]" placeholder="Enter Value"></el-input>
              </el-form-item>
              <el-form-item v-if="selectedField === 'last_login_datetime'" :label="fields.find(field => field.value === selectedField).label">
                  <el-date-picker v-model="updateManagerForm[selectedField]" type="datetime" placeholder="Select Date and Time" label="Log Info"></el-date-picker>
              </el-form-item>
              <el-form-item v-if="selectedField === 'manager_level'" :label="fields.find(field => field.value === selectedField).label">
                  <el-select v-model="updateManagerForm[selectedField]" placeholder="Select Level">
                      <el-option v-for="level in levels" :key="level.value" :label="level.label" :value="level.value"></el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="editManagerDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="updateManager">Update</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "WarehouseManagers",
    components: {},
    data() {
        return {
            managers: [],
            newManager: {},
            addManagerDialogVisible: false,
            editManagerDialogVisible: false,
            updateManagerForm: {},
            selectedField: '',
            fields: [
                {label: 'Name', value: 'manager_name'},
                {label: 'Password', value: 'manager_pwd'},
                {label: 'Level', value: 'manager_level'},
                {label: 'Log Info', value: 'last_login_datetime'},
                {label: 'Email', value: 'manager_email'}
            ],
            levels: [
                {label: 'Main', value: 'main'},
                {label: 'Vice', value: 'vice'},
                {label: 'Common', value: 'common'}
            ]
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
            this.addManagerDialogVisible = true;
        },
        cancelAddManager() {
            this.addManagerDialogVisible = false;
            this.newManager = {};
        },
        async saveNewManager() {
            try {
                await axios.post('api/warehouse-manager/add-manager', this.newManager);
                this.addManagerDialogVisible = false;
                await this.fetchManagers();
                this.$message.success("Success");
            } catch(error) {
                console.log("Error adding manager: ", error);
                this.$message.error("Add Failed");
            }
        },
        editManager(row) {
            console.log('edit');
        },
        async deleteManager(row) {
            try {
                await axios.delete('api/warehouse-manager/delete-manager', {
                    params: {
                        managerID: row.manager_id
                    }
                });
                await this.fetchManagers();
                this.$message.success('Delete Success');
            } catch(error) {
                console.error('Error deleting manager: ', error);
                this.$message.error('Delete Failed');
            }
        },
        openEditDialog(row) {
            this.updateManagerForm = {...row};
            this.selectedField = '';
            this.editManagerDialogVisible = true;
        },
        async updateManager() {
            try {
                const response = await axios.put('api/warehouse-manager/update-manager', this.updateManagerForm);
                this.editManagerDialogVisible = false;
                await this.fetchManagers();
                this.$message.success("Edit Success");
            } catch(error) {
                this.$message.error("Edit Failed");
            }
        }
    }
}
</script>

<style scoped>
    .title {
        margin-bottom: 20px;
    }
</style>