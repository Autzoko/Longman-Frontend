<template>
  <div>
      <el-menu style="width: 200px"
               default-active="2"
               class="el-menu-vertical-demo"
               >
          <el-menu-item index="1">
              <el-icon><icon-menu/></el-icon>
              <span>Navigate 1</span>
          </el-menu-item>
          <el-menu-item index="2">
              <el-icon><icon-menu/></el-icon>
              <span>Navigate 2</span>
          </el-menu-item>
          <el-menu-item index="3">
              <el-icon><icon-menu/></el-icon>
              <span>Navigate 3</span>
          </el-menu-item>
          <el-menu-item index="4">
              <el-icon><icon-menu/></el-icon>
              <span>Navigate 4</span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
    name: "Aside"
}
</script>

<style scoped>

</style>