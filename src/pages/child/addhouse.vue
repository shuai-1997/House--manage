<template>
	<div class="addgoods">
		
		<div class="main" v-show="flag">
			<div class="title">
				<h2>添加楼盘</h2>
			</div>
			<el-upload
			  :action="$URL"
			  list-type="picture-card"
			  :on-preview="handlePictureCardPreview"
			  :on-success="uploadImg"
			  :on-remove="handleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>
			<p class="hint">为你的楼盘添加宣传图</p>
			
			<!--<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>-->
			<el-input v-model="res.name" class='style'  placeholder="请输入小区名称"></el-input>
			<el-select v-model="sheng"  @change='citychange' class='style' placeholder="请选择省份">
			    <el-option
			    	class='style'
			      v-for="item in shenglist"
			      :key="item.value"
			      :label="item.value"
			      :value="item.pid">
			    </el-option>
			</el-select>
			<el-select
				class='style'
			    v-model="house.Area"
			    collapse-tags
			    style="margin-left: 20px;"
			    no-data-text='请先选择省份'
			    placeholder="请选择城市">
			    <el-option
			    	class='style'
			      v-for="item in shilist"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
				</el-option>
			</el-select>
			<el-input class='style' v-model="res.address"  placeholder="请输入楼盘地址"></el-input>
			<el-input class='style' v-model="res.SellingAddress"  placeholder="请输入销售部地址"></el-input>
			<el-input class='style' v-model="res.ageLimit"  placeholder="请输入产权年限"></el-input>
			
			<el-input
				class='style' 
				type='date'
			    placeholder="请选择开售时间"
			    suffix-icon="el-icon-date"
			    v-model="res.SellingTime">
			</el-input>
			<el-input class='style'  v-model="res.contactTel"  placeholder="请输入联系方式"></el-input>
			<el-input class='style'  v-model="res.floorArea"  placeholder="请输入占地面积"></el-input>
			<el-input class='style'  v-model="res.coveredArea"  placeholder="请输入建筑面积"></el-input>
			<el-input class='style'  v-model="res.towerCount"  placeholder="请输入楼栋总数"></el-input>
			<el-input class='style'  v-model="res.tenementCost"  placeholder="请输入物业费详情"></el-input>
			<el-input class='style'  v-model="res.afforest"  placeholder="请输入绿化率"></el-input>
			<!--<el-select
			    v-model="res.state"
			    collapse-tags
			    placeholder="请选择销售状态">
			    <el-option
			      v-for="(item,index) in state"
			      :key="index"
			      :label="item"
			      :value="item">
				</el-option>
			</el-select>-->
			<div class="submit">
			  <el-button type="primary" @click="none()">下一步，添加户型</el-button>
			</div>
			
		</div>
		<div class="details" v-show="!flag">
				<div class="title">
					<h2>添加房子信息</h2>
				</div>
				<el-upload
					  :action="$URL"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					   :on-success="uploadImg2"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<p class="hint">为你的房子添加户型图</p>
					<el-select
						class='style'
					    v-model="house.state"
					    collapse-tags
					    placeholder="请选择销售状态">
					    <el-option
					      v-for="(item,index) in state"
					      :key="index"
					      :label="item"
					      :value="item">
						</el-option>
					</el-select>
					<el-select
						class='style'
					    v-model="house.type"
					    collapse-tags
					    placeholder="请选择类别">
					    <el-option
					      v-for="(item,index) in type"
					      :key="index"
					      :label="item"
					      :value="item">
						</el-option>
					</el-select>
					<el-select
						class='style'
					    v-model="house.fitment"
					    collapse-tags
					    placeholder="请选择装修状态">
					    <el-option
					      v-for="(item,index) in fitment"
					      :key="index"
					      :label="item"
					      :value="item">
						</el-option>
					</el-select><br />
					<div class="style">
						<span class="Price ">请输入面积:</span><el-input-number v-model="house.acreage" @change="handleChange" :min="1" :max="10" ></el-input-number>
					</div>
					<div  class="style">
						<span class="Price ">请输入售价:</span><el-input-number v-model="house.totalPrice" @change="handleChange" :min="1" :max="10" ></el-input-number>
						
					</div>
					<div>
						<span class="Price style">请输入每平方的售价:</span><el-input-number v-model="house.unitPrice" @change="handleChange" :min="1" :max="10" ></el-input-number>
						
					</div>
					<div>
						<span class="Price style">
						户型：
						</span>
						<el-select
						class='typestyle'
					    v-model="house.bedroomNum"
					    collapse-tags
					   	>
						    <el-option
						      v-for="(item,index) in houseType.shi"
						      :key="index"
						      :label="item"
						      :value="item">
							</el-option>
						</el-select>
						室
						<el-select
						class='typestyle'
					    v-model="ting"
					    collapse-tags
					   	>
						    <el-option
						      v-for="(item,index) in houseType.ting"
						      :key="index"
						      :label="item"
						      :value="item">
							</el-option>
						</el-select>
						厅
						<el-select
						class='typestyle'
					    v-model="wei"
					    collapse-tags>
					  
						    <el-option
						      v-for="(item,index) in houseType.wei"
						      :key="index"
						      :label="item"
						      :value="item">
							</el-option>
						</el-select>
						卫
					</div>
					<div class="submit">
					  <el-button type="primary" @click="submit()">确认添加</el-button>
					</div>
					
			</div>
	</div>	
	
</template>

<script>
	export default {
		data(){
			return{
				shenglist:[],
				ting:'',
				wei:'',
				houseType:{
					shi:[1,2,3,4,5,6],
					ting:[1,2,3],
					wei:[1,2,3]
				},
				fitment:["毛坯",'非毛坯'],
				flag:true,
				dialogImageUrl: '',
       			dialogVisible: false,
				state:['待售','在售','售完'],
				type:['写字楼','商铺','住宅','别墅'],
				options: [],
       			sheng:[],
				res:{
					name:'', //楼盘名
			    	
				    address:'',//楼盘地址
				    SellingAddress:'', //销售部地址
				    ageLimit:'',//产权年限
					
					SellingTime:'', //开售时间
					publicityImg:[],//宣传图
					contactTel:'',//联系方式
				    floorArea:'',//占地面积
				    coveredArea:'',//建筑面积
				    towerCount:'',//楼栋总数
				    tenementCost:'',//物业费详情
				    afforest:''//绿化率
				},
				house:{
					totalPrice:0,// 总价格
					unitPrice:0 , //单价  
					Area:'', //区域
					belongHousesID:'',//所属楼盘ID
				  	type:'', //类型：写字楼，商铺 住宅
				  	state:'',  //销售状态
				  	fitment:'',  //装修状况
					belongHouses:'',//所属楼盘
					acreage:'', //面积
					houseType:'', //户型
					houseTypeImg:[],//户型图
					bedroomNum:'', //卧室数量
				},
				shilist:[]
			}
		},
		async created(){
			
		 let data=await	this.$http.get('/city?pid=1')

			let sheng=[]
				data.data.forEach((item)=>{

					this.shenglist.push({value:item.cityname,pid:item.id})
					
					})
				
		},
		methods:{
			async citychange(value){
				this.shilist=[]
				 let data=await	this.$http.get('/city?pid='+value)
				 data.data.forEach((item)=>{

					this.shilist.push({value:item.cityname,pid:item.id})
					
					})
			},
			
			handleChange(value) {
		        console.log(value);
		      },
		       handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		      },
		      async none(){
		      	this.flag=false
		      	let data= await this.$http.post('/addhouse',this.res)
		     	this.house.belongHousesID=data.data
		      },
		      uploadImg(response, file, fileList){
		      	this.res.publicityImg.push(this.$URL+'/'+response)
		      },
		      uploadImg2(response, file, fileList){
		      	this.house.houseTypeImg.push(this.$URL+'/'+response)
		      },
		      async submit(){
		      	this.house.houseType=this.house.belongHouses+'室'+this.ting+'厅'+this.wei+'卫'
		      		let data= await this.$http.post('/addhousedetails',this.house)
		     		console.log(data.data)
		     		
			        this.$confirm('添加成功, 是否继续添加?', '提示', {
			          confirmButtonText: '继续添加',
			          cancelButtonText: '不了，返回首页',
			          type: 'warning'
			        }).then(() => {
			        	this.house.type=''
			        	this.house.state=''
			        	this.house.fitment=''
			        	this.house.belongHouses=''
			        	this.house.acreage=''
			        	this.house.houseType=''
			        	this.house.bedroomNum=''
			        	this.house.houseTypeImg=[]
			        	this.ting=''
			        	this.wei=''
			        }).catch(() => {
			        	this.$router.push('/manage')
			        });
			      }
		}
   }
</script>

<style lang="less" scoped="scoped">
	.title{
		
		h2{
			text-align: center;
		}
	}
	.Price{
		padding: 0 10px;
	}
	.style{
		margin: 10px;
	}
	.submit{
		text-align: center;
	}
	.details{
		
	}
	.hint{
		text-align: center;
	}
	.typestyle{
		margin: 10px 0;
		width: 100px;
	}
	
</style>