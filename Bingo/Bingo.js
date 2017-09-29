window.onload=main;
var cardNum = new Array(76); //卡片数字池 0-75
function main(){
	if(document.getElementById){//测试浏览器是否支持js
		document.getElementById("reload").onclick = createNewCard;//点击按钮重置卡片
		newCard();				//setsquare方法前置 循环td单元id
	}
	else{
		alert("你的浏览器不支持JavaScrpit");
	}	 
}

/*
*setsquare方法前置 循环td单元id
*/
function newCard(){
	for(i=0;i<24;i++){
		setSquare(i);
	}
}

/*
*向卡片填充数字
*	B 01-15
*	I 16-30
*	N 31-45
*	G 46-60
*	O 61-75
*/
function setSquare(tdId){
	var inputTdId = "square" + tdId;
	
	var tableCol = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4);
	var tableColBasis = tableCol[tdId]*15;										//每列数字基数
	
	var getTdNum;		//td数字
	do{
		getTdNum = tableColBasis+getRanNum()+1;
	}
	while(cardNum[getTdNum]);
	cardNum[getTdNum] = true; //改变数组单元状态避免重复输出
	/*
	*向html squareID对象输出
	*输出固定长度的字符
	*/
	document.getElementById(inputTdId).innerHTML = (Array(2).join('0')+getTdNum).slice(-2);
	document.getElementById(inputTdId).className = "";
	document.getElementById(inputTdId).onmousedown = tdBackground;
	
}

/*向 getTdNum 返回1-15的随机数*/
function getRanNum(){				
	return Math.floor(Math.random()*15);
}

/*
* 点击按钮重置卡片
* 	数字池清空
* 	调用card
*/
function createNewCard(){
	for(i=1;i<cardNum.length;i++){
		cardNum[i] = false;
	}
	newCard();
	return false;
	
}

/*
* 在鼠标按下时改变td背景颜色
*/
function tdBackground(evt){
	if(evt){
	var thisSquare = evt.target;
	}
	else{
		var thisSquare = window.event.srcElement;
	}
	if(thisSquare.className == "")
		thisSquare.className = "pickedBG";
	else
		thisSquare.className = "";
}






