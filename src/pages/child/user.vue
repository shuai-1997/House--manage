<template>
	<div class="home">
		 <el-table
	      :data="tableData"
	      height="350"
	       stripe
	      style="width: 100%">
	      <el-table-column
	        prop="time"
	        label="日期"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="userName"
	        label="姓名"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="tel"
	        label="电话"
	        width="180">
	      </el-table-column>
	    </el-table>
	    <el-pagination
		  background
		  layout='prev, pager, next, jumper, ->, total'
		  :total="total"
		  :page-size="pageSize"
		  @current-change="adminData"
		  
		   >
		 
		</el-pagination>
	</div>
</template>

<script>
	 export default {
    data() {
      return {
        tableData:[],
        pageSize:5,
        total:0,
        currentPage:1
      }
    },
    async created(){
    	let tal=await this.$http.get('/userCount')
    	this.total=tal.data
    	this.getdata(1)
    	
    },
    methods:{
    	formattingDate(time){
    		time=new Date(time)
    		let  year= time.getFullYear()
    		let mouth=time.getMonth()+1
    		let day=time.getDate()
    		return year+"/"+mouth+"/"+day
    	},
    	adminData(current){
    		this.getdata(current)
    	},
    	async getdata(current){
    		
    		let adminData=await this.$http.get('/user?size='+this.pageSize+"&current="+current)
    		this.tableData=adminData.data.map(i=>{
	    		i.time=this.formattingDate(i.time)
	    		return i
    		})
    	}
    }
  }
</script>

<style>
</style>