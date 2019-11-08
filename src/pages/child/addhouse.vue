<template>
	<div class="addgoods">
		<div class="title">
			<h2>添加商品</h2>
		</div>
		<div class="main">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="商品名称" prop="goodsname">
			    <el-input v-model="ruleForm.goodsname"></el-input>
			  </el-form-item>
			  <el-form-item label="商品价格" >
			   	<el-input-number :min=1 v-model="ruleForm.price" :precision="2" :step="0.1" ></el-input-number>
			  </el-form-item>
			  <el-form-item label="商品颜色" required>
			    <el-radio-group v-model="ruleForm.color" size="small">
			      <el-radio-button label="红色"></el-radio-button>
			      <el-radio-button label="黑色"></el-radio-button>
			      <el-radio-button label="白色"></el-radio-button>
			      <el-radio-button label="灰色"></el-radio-button>
			    </el-radio-group>
			  </el-form-item>
			   <el-form-item label="商品库存" >
			   	<el-input-number :min=1 v-model="ruleForm.inventory"   ></el-input-number>
			  </el-form-item>
			  <el-form-item label="商品详情" prop="details">
			    <el-input type="textarea"  v-model="ruleForm.details"></el-input>
			  </el-form-item>
			   <el-form-item label="商品图片" >
		   			<el-upload
					  class="avatar-uploader"
					  :action="$URL"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
	
</template>

<script>
	export default {
    data() {
      return {
      	imageUrl: '',
        ruleForm: {
          color: '红色',
          price:12,
          goodsname: '',
          inventory:1, //库存
          details: '',
          pic:""
        },
        rules: {
          goodsname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          details: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
          	if(this.ruleForm.pic){
          		let data= await this.$http.post("/goods",this.ruleForm)
           		if(data.data=="添加成功"){
	            	this.$message({
			          message: '恭喜你，商品添加成功',
			          type: 'success'
			        });
//			        this.$router.push("/manage/goods")
	            }else{
	            	this.$message({
			          message: '抱歉，商品添加失败',
			          type: 'error'
			        });
	            }
          	}else{
          		this.$message({
			          message: '请上传图片',
			          type: 'warning'
			    });
          	}
            
          } else {
           
            return false;
          }
        });
      },
      resetForm(formName) {
      	
        this.$refs[formName].resetFields();
        
        this.pic=""
      },
      handleAvatarSuccess(res, file) {
      	this.ruleForm.pic=this.$URL+"/"+res
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = /\.(jpg|jpeg|gif|png)$/i.test(file.name);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
.addgoods{
	.title{
		h2{
			text-align: center;
			line-height: 40px;
		}
	}
	.main{
		width: 700px;
		margin: 0 auto;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
		
	}
	
}
.avatar-uploader{
	width: 120px;
    height:120px;
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>