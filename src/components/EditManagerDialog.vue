<template>
  <el-dialog title="Edit Manager Information" v-model="visible" width="50%">
    <el-form :model="formData" label-width="100px">
      <el-form-item label="Select Field">
        <el-select v-model="selectedField" placeholder="Select a Field">
          <el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="selectedField !== ''" :label="fields.find(field => field.value === selectedField).label">
        <el-input v-model="formData[selectedField]" placeholder="Enter Value"></el-input>
      </el-form-item>
      <el-form-item v-if="selectedField === 'last_login_datetime'" :label="fields.find(field => field.value === selectedField).label">
        <el-date-picker v-model="formData[selectedField]" type="datetime" placeholder="Select Date and Time" label="Log Info"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="selectedField === 'manager_level'" :label="fields.find(field => field.value === selectedField).label">
        <el-select v-model="formData[selectedField]" placeholder="Select Level">
          <el-option v-for="level in levels" :key="level.value" :label="level.label" :value="level.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">Cancel</el-button>
      <el-button type="primary" @click="updateManager">Update</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: ['rowData'],
  data() {
    return {
      visible: false,
      formData: {},
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
    };
  },
  watch: {
    rowData: {
      handler(newData) {
        this.formData = {...newData};
      },
      immediate: true
    }
  },

  methods: {
    async updateManager() {
      try {
        const response = await axios.put('api/warehouse-manager/update-manager', this.formData);
        this.visible = false;
        this.$emit('updated');
        this.$message.success("Edit Success");
      } catch(error) {
        this.$message.error("Edit Failed");
      }
    },
  }
}
</script>

<style scoped>

</style>