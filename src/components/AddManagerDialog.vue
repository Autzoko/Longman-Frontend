<template>
  <el-dialog title="New Manager Information" v-model="visible" width="50%">
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
</template>

<style scoped>

</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newManager: {},
      visible: false,
      levels: [
        {label: 'Main', value: 'main'},
        {label: 'Vice', value: 'vice'},
        {label: 'Common', value: 'common'}
      ]
    };
  },
  methods: {
    cancelAddManager() {
      this.visible = false;
      this.newManager = {};
    },
    async saveNewManager() {
      try {
        await axios.post('api/warehouse-manager/add-manager', this.newManager);
        this.visible = false;
        this.$emit('added');
        this.$message.success("Success");
      } catch(error) {
        console.log("Error adding manager: ", error);
        this.$message.error("Add Failed");
      }
    },
  }
}
</script>