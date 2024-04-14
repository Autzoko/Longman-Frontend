<template>
  <div class="main-container">
    <div class="header">
      <h1 class="title">Manager Information</h1>
      <div style="display: flex;">
        <el-button type="primary" @click="showAddManagerDialog" style="margin-bottom: 20px">Add Manager</el-button>
        <el-button @click="goToUploadView" style="margin-left: 30px">Upload File</el-button>
      </div>

    </div>
    <div class="table-container">
      <el-table :data="visibleManagers" style="width: 100%" border>
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
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChanges"
                     :current-page="currentPage" :page-sizes="[10, 20, 30, 50]"
                     :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="total">

      </el-pagination>
    </div>

    <add-manager-dialog v-model="addManagerDialogVisible" @added="addSuccess"></add-manager-dialog>
    <edit-manager-dialog v-model="editManagerDialogVisible" :rowData="updateManagerForm" @updated="editSuccess"></edit-manager-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import AddManagerDialog from "@/components/AddManagerDialog.vue";
import EditManagerDialog from "@/components/EditManagerDialog.vue";

export default {
    name: "WarehouseManagers",
    components: {
      AddManagerDialog,
      EditManagerDialog
    },
    data() {
        return {
            managers: [],
            visibleManagers: [],
            addManagerDialogVisible: false,
            editManagerDialogVisible: false,
            updateManagerForm: {},
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    },
    mounted() {
        this.fetchManagers();
    },
    methods: {
        async fetchManagers() {
            try {
                const response = await axios.get('api/warehouse-manager/list')
                this.managers = response.data;
                this.total = this.managers.length;
                this.updateVisibleData();
            } catch (error) {
                console.error('Error fetching manager data: ', error)
            }
        },
        updateVisibleData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = this.currentPage * this.pageSize;
            this.visibleManagers = this.managers.slice(start, end);
        },
        showAddManagerDialog() {
            this.addManagerDialogVisible = true;
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
        async handleSizeChange(val) {
          this.pageSize = val;
          await this.updateVisibleData();
        },
        async handleCurrentChanges(val) {
          this.currentPage = val;
          await this.updateVisibleData();
        },
        async addSuccess() {
          await this.fetchManagers();
          this.addManagerDialogVisible = false;
        },
        async editSuccess() {
          await this.fetchManagers();
          this.editManagerDialogVisible = false;
        },
      goToUploadView() {
          this.$router.push('/upload-file');
      }

    }
}
</script>

<style scoped>
    .title {
        margin-bottom: 20px;
    }

    .main-container {
      background: linear-gradient(to bottom, #ffcccc, #88ccff);
      padding: 20px;
    }
    .header {
      margin-bottom: 20px;
    }
    .title {
      font-size: 30px;
      color: #333;
    }

    .table-container {
      width: 100%;
    }

    .pagination {
      margin-top: 20px;
      text-align: right;
    }
</style>