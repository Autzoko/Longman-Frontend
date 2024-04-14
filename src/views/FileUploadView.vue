<template>
  <div style="background-color: aliceblue; height: 600px">
    <el-upload
      class="upload-window"
      action="api/warehouse-manager/get-table"
      :http-request="uploadFile"
      :limit="fileLimit"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :auto-upload="true"
      :headers="headers"
      drag
      multiple>
      <i class="el-icon--upload"></i>
      <div class="el-upload__text">Please drag excel file or <em>upload</em> here</div>
    </el-upload>
  </div>
  <el-divider/>
</template>

<script>
import axios from "axios";

export default {
  name: "FileUploadView",
  data() {
    return {
      fileList: [],
      fileType: ["xlsx", "xls", "csv"],
      fileSize: 10,
      fileLimit: 10,
      headers: {"Content-Type": "multipart/form-data"},
    };
  },
  methods: {
    beforeUpload(file) {
      if(file.type != "" || file.type != null || file.type != undefined) {
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        const isLt = file.size / 1024 / 1024 < 50;
        if(!isLt) {
          this.$message.error("file cannot larger than 10M");
          return false;
        }
        if(this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error('invalid file format');
          return false;
        }
      }
    },
    handleExceed() {
      this.$message({
        type: 'warning',
        message: "exceed file limit"
      });
      return;
    },

    async uploadFile(item) {
      this.$message('uploading...');
      let FormDatas = new FormData();
      FormDatas.append('file', item.file);
      try {
        const response = await axios({
          method: 'post',
          url: 'api/warehouse-manager/get-table',
          headers: this.headers,
          timeout: 30000,
          data: FormDatas
        });
        if(response.status === 200) {
          this.fileList.push({'uid': item.file.uid, 'fileId': response.data.fileId});
          this.$message.success("upload success");
          this.$router.push('/warehouse-managers');
        }
      } catch (error) {
        this.$message.error("upload error");
      }
    }
  }
}

</script>

<style scoped>
  .upload-window {
    border: 1px dashed #ccc;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }

  .upload-window em {
    color: #409eff;
    cursor: pointer;
  }
</style>