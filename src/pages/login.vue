<template>
	<div class="login">
		<transition name="dowm1">
			<div class="main" v-if="down">
				<h2>房无忧后台管理系统</h2>
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
				  <el-form-item label="" prop="userName">
				    <el-input type="text" v-model="ruleForm.userName" autocomplete="off" placeholder="用户名"></el-input>
				  </el-form-item>
				  <el-form-item label="" prop="pwd">
				    <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" placeholder="密码"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" style="width: 100%;"  @click="submitForm('ruleForm')">提交</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</transition>
		
	</div>
</template>

<script>
  export default {
    data() {
      var  verifyName= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
          return false
        } 
         callback();
      };
      var verifyPWD = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
     		  callback();
	         
        }
      };
      return {
      	down:false,
        ruleForm: {
          userName: '',
          pwd: '',
         
        },
        rules: {
          userName: [
            { validator: verifyName, trigger: 'blur' }
          ],
          pwd: [
            { validator: verifyPWD, trigger: 'blur' }
          ]
        }
      };
    },
    mounted(){
    	this.down=true;
    },
    methods: {
       submitForm(formName) {
       	console.log(1)
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
          	
          	let res =await this.$http.post('/admin',this.ruleForm)
          	console.log(res.data)
          	if(res.data=='密码错误'){
          		alert("密码错误")
          		return false
          	}
           	if(res.data=='用户不存在'){
          		alert("用户不存在")
          		return false
          	}
            this.$router.push("/manage")
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
	.login{
		width: 100%;
		height: 100%;
		background:#2C3E50;
		display: flex;
		justify-content: center;
		align-items: center;
		.main{
			position: relative;
			width: 350px;
			height: 300px;
			background: #FFFFFF;
			border-radius: 10px;
			 padding: 30px;
			h2{
				color:#FFFFFF;
				position: absolute;
				top: -50px;
				left: 60px;
			}
		}
	}
	.dowm1-enter{
		transform: translateY(-50px);
	}
	.dowm1-enter-active{
		transition: all 1s; 
	}
	.dowm1-leave-active{
		transition: all 1s; 
	}
	.dowm1-leave-to{
		transform: translateY(-50px);
	}
</style>