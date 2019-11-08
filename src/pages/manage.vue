<template>
	<div class="manage">
		<el-container style="height: 600px; border: 1px solid #eee">
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		   	 <el-menu
			      default-active="1"
			      class="el-menu-vertical-demo"
			      router>
			      <el-menu-item index="/manage">
			      	  <i class="el-icon-menu"></i>
			          <span slot="title">首页</span>
			      </el-menu-item>
			      <el-submenu index="2">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>数据管理</span>
			        </template>

			        <el-menu-item index="/manage/House">新房房源管理</el-menu-item>
			        <el-menu-item index="/manage/Let">出租房房源管理</el-menu-item>
			        <el-menu-item index="/manage/resoldApartment">二手房房源管理</el-menu-item>
			        <el-menu-item index="/manage/user">用户管理</el-menu-item>
			      </el-submenu>
			      <el-submenu index="3">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>数据添加</span>
			        </template>
			       
			        <el-menu-item index="/manage/addhouse">添加房源</el-menu-item>
			       
			      </el-submenu>
			    </el-menu>
		  </el-aside>
		  <el-container>
		    <el-header style="text-align: right; font-size: 12px;display: flex;justify-content: space-between;">
		    <div class="title">
		    	<h2 style="text-align: center;">后台管理</h2>
		    </div>
		     <el-dropdown>
		      <span class="el-dropdown-link">
		        <i class="el-icon-user-solid" style="font-size: 30px;line-height: 60px;"></i>
		      </span>
		      <el-dropdown-menu slot="dropdown">
		        <el-dropdown-item >退出</el-dropdown-item>
		        <el-dropdown-item >个人信息</el-dropdown-item>
		        
		      </el-dropdown-menu>
		    </el-dropdown>
		      
		    </el-header>
		    
		    <el-main>
		       <router-view/>
		    </el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
  export default {
   	beforeRouteEnter:(to,from,next)=>{
        if(from.path=='/'){
        	next()
        }else{
        	next(false)
        }
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>