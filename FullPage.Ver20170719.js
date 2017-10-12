/**
 * Created by Administrator on 2017/7/4.
 */
function GenerateFullpage(){
    GenerateHead(); //Wrapper.js
    GenerateBlocks(); //WinLayOut.js
    GenerateFoot(); //Foot.js
    
    var $First=true;
    $(function(){
        $('#fullpage').fullpage({
            paddingTop:80,//与上边距离
            paddingBottom:90,
            // scrollOverflow:true,//超出是否显示滚动条
            loopHorizontal:true,//是否水平无限(轮播)
            // loopBottom:true,//是否最底部滚到最顶部
            // loopTop:true,//是否最顶部滚到最底部
            // navigation:true,//是否项目导航
            slidesNavPosition:'bottom',
            slidesNavigation:true,//是否显示水平项目导航
            resize:true,//是否根据大小缩放字
            afterLoad:function(anchorLink,index){
                switch (index)
                {
                    case 1://section1 win10区域块进入
                        $("#fullpage").css("top",parseInt($("#fullpage").css("top"))+($("#fullpage").position().top*-1)); //坐标修正
                        $("#section1 #layout #LayoutBody .Win10Block").show().delay(500).animate({opacity:1},500);
                        $("#section1 #BGMedia #BGOverlay").show().delay(500).animate({opacity:1},500);
                        break;
                    case 2:
                        if($First)
                        {
                            $("#fullpage .section#section2 .fp-slidesNav.bottom").css("bottom",parseInt($("#fullpage .section#section2 .fp-slidesNav.bottom").css("bottom"))+parseInt($("#Foot").css("height")));
                            $("#fullpage .section#section2 .fp-slidesNav ul li a span").css("background","#fff");
                            $First=false;
                        }
                        break;
                }
            },
            onLeave:function(index,nextIndex,direction){
                $("#fullpage").css("top",0);
                if(index==1 && direction=="down")//向下进入第二屏
                {
                    $("#section1 #layout #LayoutBody .Win10Block").animate({opacity:0},500).hide();
                    $("#section1 #BGMedia #BGOverlay").animate({opacity:0},500).hide();
                }
                if(index==2 && direction=="up")
                {
                    setTimeout(function(){$("#fullpage #section1 .fp-tableCell #BGMedia #BGVideo")[0].play()},150); //播放视频
                }
            }
        });
    });
    





    var $regLoginForm = document.createElement("div")
    $loginDialog = document.createElement("div"),//登陆弹窗
    $regDialog = document.createElement("div");//注册弹窗

    $loginDialog.id = "memLoginDialog" ;
    $loginDialog.className ="dialog";
    $loginDialog.innerHTML = "<component v-bind:is='loginForm'></component>";

    $regDialog.id = "memRegDialog";
    $regDialog.className = "dialog";
    $regDialog.innerHTML = "<component v-bind:is='regForm'></component>";

    $regLoginForm.id = "regLoginForm"
    $regLoginForm.appendChild($loginDialog);
    $regLoginForm.appendChild($regDialog);
    $("body").append($regLoginForm);

    var loginIHtml = {
        
        template:`
            <i-form :model="formLogin" :label-width="50" >
                <form-Item label="用户名">               
                    <i-input type="text" v-model="formLogin.UserName"  placeholder="Username">
                    </i-input>
                </form-Item>
                <form-Item label = "密码" >
                    <i-input type="text" v-model="formLogin.PassWord" placeholder="password">
                    </i-input>
                </form-Item>
                <form-Item>
                    <i-button class="HCloseBtn dialogButton">取消</i-button> 
                    <i-button class="dialogButton" @click="loginPost('formLogin')" > 登录 </i-button>
                    <i-button class="HCloseBtn dialogButton" disabled="disabled">第三方登录</i-button> 
                </form-Item>
            </i-form>`, 
        data(){
            return {
                formLogin:{
                    UserName:"",
                    PassWord:"",

                }
            }
        },
        
        methods:{
            //登陆请求
            loginPost (formLogin){
                var userName = formLogin.UserName;
                var passWord = $.md5(formLogin.PassWord);
                $.ajax({
                    url: "http://www.bocomwincent.com/php.php",
                    type:"post",
                    data:{
                        "type"          :"Login",
                        "UserName"      :userName,
                        "PassWord"      :passWord
                    },
                    success:function(r){
                        if(r==1){
                            alert("mmp");
                            
                        }
                        else{
                            alert("登陆失败");
                        }
                        $("#memLogin").hDialog('close',{box: '#memLoginDialog'});
                    },
                    
                });
                     
            },
            // loginSubmit:function(){
                
            //     this.loginPost();
            // }
        }
        


    }   //登陆表单

    var regIHtml = {
        
        template:`
            <i-form :model="formReg" :label-width="60" >
                <form-Item label="手机号">               
                    <i-input type="text" v-model="formReg.Phone"  placeholder="Phone Num">
                    </i-input>
                </form-Item>
                <form-Item label = "验证码" >
                        <i-input type="text" v-model="formReg.Validate" style="width:140px;" >
                        </i-input>
                        <i-label id="validate" >获取验证码</i-label>
                </form-Item>
                <form-Item label = "密码" >
                    <i-input type="text" v-model="formReg.PassWord" placeholder="password">
                    </iinput>
                </form-Item>
                <form-Item label = "确认密码" >
                    <i-input type="text" v-model="formReg.PassWordCheck" placeholder="password Check">
                    </iinput>
                </form-Item>
                <form-Item>
                    <i-button class="HCloseBtn dialogButton">取消</i-button> 
                    <i-button class="dialogButton" id="regBtn" > 注册 </i-button>
                </form-Item>
            </i-form>`, 
        data:function(){
            return{
                formReg:{
                    Phone:"",
                    Validate:"",
                    PassWord:"",
                    PassWordCheck:"",

                }
            }
        },
        

    }

    var loginRegDiaLog = new Vue({
        el:"#regLoginForm",
        data:{
            loginForm:loginIHtml,
            regForm:regIHtml
        },


    })

//调用弹窗
    $("#memLogin").hDialog({box: '#memLoginDialog',height:160});
    $("#memReg").hDialog({box: '#memRegDialog',height:275,width:305}); 

    
}


