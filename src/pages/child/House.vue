<template>
	<div class="home">
		 <el-table
	      :data="tableData"
	      height="450"
	       stripe
	      style="width: 100%">
	      
	      <el-table-column
	        prop="name"
	        label="楼盘名称"
	        width="100">
	      </el-table-column>
	      <el-table-column
	        prop="SellingAddress"
	        label="销售部地址"
	        width="100">
	      </el-table-column>
	      <el-table-column
	        prop="address"
	        label="楼盘地址"
	        width="100">
	      </el-table-column>
	      <el-table-column
	        prop="ageLimit"
	        label="产权年限"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="contactTel"
	        label="联系方式"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="floorArea"
	        label="占地面积"
	        width="100">
	      </el-table-column>
	       <el-table-column
	        label="操作"
	        width="250">
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
				<el-button
		          size="mini"
		          type="danger"
		         >修改</el-button>
		    </template>
			
	      </el-table-column>
	    </el-table>
	   	<div class="details" @mouseover="" v-if="flag">
	   		<div class="close el-icon-close" @click="flag=false"></div>
	   		<div class="img">
	   			<img v-for="item in details.publicityImg" :src="item"/>
	   		</div>
	   		<div class="info">
	   			<div >
	   				<p><span>楼盘名称：</span>{{details.name}}</p>
			   		<p><span>楼盘地址：</span>{{details.address}}</p>
			   		<p><span>销售部地址：</span>{{details.SellingAddress}}</p>

			   		<p><span>开售时间：</span>{{formattingDate(details.SellingTime)}}</p>
			   		<p><span>联系方式：</span>{{details.contactTel}}</p>
	   			</div>
	   			<div >
	   				<p><span>占地面积：</span>{{details.floorArea}}平方米</p>
			   		<p><span>建筑面积：</span>{{details.coveredArea}}</p>
			   		<p><span>产权年限：</span>{{details.ageLimit}}</p>
			   		
			   		<p><span>楼栋总数：</span>{{details.towerCount}}</p>

			   		<p><span>绿化率：</span>{{details.afforest}}</p>
	   			</div>
	   		</div>
			<p><span>物业费详情：</span>{{details.tenementCost}}</p>
			<h1 style="text-align: center;">新房详情</h1>
	   		<ul class="housedetailsstyle">
	   			<li v-for='item in housedetails'>
	   				<div class="img">
			   			<img v-for="item in item.houseTypeImg" :src="item"/>
			   		</div>
	   				<p><span>总价：</span>{{item.totalPrice}}平方米</p>
			   		<p><span>单价：</span>{{item.unitPrice}}每平方米</p>
			   		<p><span>所在地区：</span>{{item.Area}}</p>
			   		<p><span>类型：</span>{{item.type}}</p>
			   		<p><span>销售状态：</span>{{item.state}}</p>
			   		<p><span>装修状况：</span>{{item.fitment}}</p>
			   		<p><span>面积：</span>{{item.acreage}}</p>
			   		<p><span>户型：</span>{{item.houseType}}</p>
	   			</li>
	   		</ul>
	   		
	   		

	   			
	   		
	   	</div>
		 
		
	</div>
</template>

<script>
	 export default {
    data() {
      return {
        tableData:[],
        details:{},
        flag:false,
      	housedetails:[]
      }
    },
    async created(){
    	let tal=await this.$http.get('/findhouse')
    	console.log(tal.data)
    	this.tableData=tal.data
    	
    	
    },
    methods:{
    	async show(index, row){
    		this.details=row
    		let tal=await this.$http.get('/findhousedetails?belongHousesID='+row._id)
    		this.flag=true
    		this.housedetails=tal.data
    		console.log(this.housedetails)
    		
    	},
    	formattingDate(time){
    		time=new Date(time)
    		let  year= time.getFullYear()
    		let mouth=time.getMonth()+1
    		let day=time.getDate()
    		return year+"/"+mouth+"/"+day
    	},
    	
	     async  handleDelete(index, row) {
    		let adminData=await this.$http.delete('/deletehouse?_id='+row._id)
    			let tal=await this.$http.get('/findhouse')
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

<style scoped="scoped" lang="less">
	.housedetailsstyle{
		display: flex;
		flex-wrap: wrap;
		li{
			width: 50%;
		}
	}
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
		
		height: 80px;
		padding: 10px;
		
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
	.info{
		display: flex;
		div{
			flex: 1;
		}
	}
</style>