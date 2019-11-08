<template>
	<div class="home">
		 <el-table
	      :data="tableData"
	      height="450"
	       stripe
	      style="width: 100%">
	      <el-table-column
	        prop="Area"
	        label="区域"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="名称"
	        width="150">
	      </el-table-column>
	      <el-table-column
	        prop="acreage"
	        label="面积"
	        width="60">
	      </el-table-column>
	      <el-table-column
	        prop="price"
	        label="总价"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="tel"
	        label="联系方式"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="address"
	        label="地址"
	        width="200">
	      </el-table-column>
	       <el-table-column
	        label="操作"
	        width="180">
	        <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)"
		         >删除</el-button>
		         <el-button
		          size="mini"
		          type="danger"
		          @click='show(scope.$index, scope.row)'
		         >详细信息</el-button>

		    </template>
			
	      </el-table-column>
	    </el-table>
	   	<div class="details" @mouseover="" v-if="flag">
	   		<div class="close el-icon-close" @click="flag=false"></div>
	   		<div class="img">
	   			<img v-for="item in details.imgArr" :src="item"/>
	   		</div>
	   		<p><span>名称：</span>{{details.name}}</p>
	   		<p><span>户型：</span>{{details.houseType}}</p>

	   		<p><span>楼层：</span>{{details.floor}}</p>
	   		<p><span>楼龄：</span>{{details.age}}</p>
	   		<p><span>装修状态：</span>{{details.fitment}}</p>
	   		<p><span>首付：</span>{{details.downPayment}}万</p>

	   		<p><span>面积：</span>{{details.houseArea}}元/月</p>
	   		<p><span>朝向：</span>{{details.direction}}</p>
	   		<p><span>价格：</span>{{details.price}}万</p>
	   		<p><span>称呼：</span>{{details.appellation}}</p>
	   		<p><span>联系方式：</span>{{details.tel}}</p>
	   		<p><span>描述：</span>{{details.introduce}}</p>
	   		<p><span>详细地址：</span>{{details.address}}</p>
	   		<p><span>区域：</span>{{details.Area}}</p>

	   			
	   		
	   	</div>
		 
		
	</div>
</template>

<script>
	 export default {
    data() {
      return {
        tableData:[],
        details:{},
        flag:false
       
      }
    },
    async created(){
    	let tal=await this.$http.get('/findSoldApartment')
    	console.log(tal.data)
    	this.tableData=tal.data
    	
    	
    },
    methods:{
    	show(index, row){
    		this.details=row
    		this.flag=true
    		console.log(index)
    		console.log(row)
    	},
    	formattingDate(time){
    		time=new Date(time)
    		let  year= time.getFullYear()
    		let mouth=time.getMonth()+1
    		let day=time.getDate()
    		return year+"/"+mouth+"/"+day
    	},
    	
	     async  handleDelete(index, row) {
    		let adminData=await this.$http.delete('/deleteSoldApartment?_id='+row._id)
    			let tal=await this.$http.get('/findSoldApartment')
		    	console.log(tal.data)
		    	this.tableData=tal.data
		    	
	      	if(adminData.data){
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

<style scoped="scoped">
	.facility{
		padding: 10px;
	}
	.details{
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 80%;
		height: 80%;
		background: #fff;
		border: 1px solid #ccc;
		box-shadow: #ddd 3px 3px;
		border-radius: 20px;
		padding: 10px;
		overflow: scroll;
	}
	.details .img{
		
		height:80px;
		margin:  0 auto;
		
	}
	.details .img img{
		height: 100%;
		width: auto;
		margin: 10px;
	}
	.close{
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>