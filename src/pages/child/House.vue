<template>
	<div class="home">
		 <el-table
	      :data="tableData"
	      height="450"
	       stripe
	      style="width: 100%">
	      <el-table-column
	        prop="time"
	        label="日期"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="goodsname"
	        label="商品名"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="color"
	        label="颜色"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="price"
	        label="价格"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="inventory"
	        label="库存"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        
	        label="库存"
	        width="80">
	        <template slot-scope="scope">
		      <img  :src="scope.row.pic" alt="" style="width: 50px;height: 50px">
		 
		    </template>

	      </el-table-column>
	       <el-table-column
	        label="操作"
	        width="180">
	        <template slot-scope="scope">
				<el-button
	        	  size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		    </template>

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
    	let tal=await this.$http.get('/goodsCount')
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
    		this.currentPage=current
    		this.getdata(current)
    	},
    	async getdata(current){
    		let adminData=await this.$http.get('/goods?size='+this.pageSize+"&current="+current)
    		this.tableData=adminData.data.map(i=>{
	    		i.time=this.formattingDate(i.time)
	    		return i
    		})
    	},
    	 handleEdit(index, row) {
        	console.log(index, row);
	      },
	     async  handleDelete(index, row) {
    		let adminData=await this.$http.delete('/goods?_id='+row._id)
    		
	      	if(adminData.data){
	      		let tal=await this.$http.get('/goodsCount')
    			this.total=tal.data
    			this.getdata(this.currentPage)
    			console.log(this.tableData)
	      		if(this.tableData.length==1){
	      			console.log(1111)
	      			this.currentPage-=1;
	      			this.getdata(this.currentPage)
	      		}
	      		this.$message({
		          showClose: true,
		          message:adminData.data,
		          type: 'success'
		        });
	      	}else{
	      		this.$message({
		          showClose: true,
		          message:adminData.data,
		          type: 'error'
		        });
	      	}
	        
	      }
    }
  }
</script>

<style>
</style>