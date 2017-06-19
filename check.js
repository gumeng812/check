/* 数据验证 */
function Check(){};
/**验证非空*/
Check.checkNull = function(str){
	if(str) return "";
	return Check.nullMsg();
}
/**是否是字母或数字*/
Check.isNumberOrLetter = function(str){
	if (!str) return Check.nullMsg();
	for (var i = 0; i < str.length; i++){
		var c = str.charAt(i);
		if (c < '0' || (c > '9' && c < 'A') || (c > 'Z' && c < 'a') || c > 'z')
		return Check.specialErr(c);
	}
	return null;
};
/**是否是字母或数字*/
Check.isNumber = function(str,len){
	if (!str) return Check.nullMsg();
	if (isNaN(str)) return Check.commonErr();
	if(!len) return null;
	if(str.length != len) return Check.mustLengNumber(len);
	return null;
};
/**电话验证*/
Check.isPhone = function(str){
	if (!str) return Check.nullMsg();
	if(str.length!= 11) return Check.mustLength(11);
	if (isNaN(str)) return Check.commonErr();
	if (str.charAt(0) != '1') return Check.notExist(str.charAt(0)+"**********");
	if (str.charAt(1) == '3') return null;
	if (str.charAt(1) == '5') {
		if (str.charAt(2) == '4')
			return Check.notExist("154"+str.charAt(3)+"*******");
		return null;
	}
	if (str.charAt(1) == '8') {
		if (str.charAt(2) == '1' || str.charAt(2) == '2'
				|| str.charAt(2) == '3' || str.charAt(2) == '4')
			return Check.notExist("18"+str.charAt(2)+str.charAt(3)+"*******");
		return null;
	}
	return Check.notExist("1"+str.charAt(1)+str.charAt(2)+"********");
};
/**
 * 是否是合法字符
 * 一般为密码验证，允许部分特殊字符
 */
Check.isLegal = function(str,start,end){
	if (!str) return Check.nullMsg();
	if ((start && str.length < start) || (end && str.length > end))
		return Check.lengthErr(end,str.length,start);
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if (c < '!' || c > '}' || "'\"=)(,-><".indexOf(c) > 0){
			return Check.specialErr(c);
		}
	}
	return null;
};
Check.checkBoolean = function(str){
	if(str){
		if(str!='0' && str!='1'){
			return "格式错误（必须是"+Check.getSpecialSpan("0")+"或"+Check.getSpecialSpan("1")+"）";
		}
	}
	return "";
}
Check.getSpecialSpan = function(str){
	return "<span class='err'>"+str+"</span>";
};
Check.getOkSpan = function(str){
	return "<span class='ok'>"+str+"</span>";
};
Check.notExist = function(str){
	return "不存在 "+Check.getSpecialSpan(str)+" 请核对后重新输入";
};
Check.commonErr = function(){
	return Check.getSpecialSpan("格式错误");
};
Check.nullMsg = function(){
	return "不能为"+Check.getSpecialSpan("空");
};
Check.lengthMinErr = function(start,length){
	return "不能小于"+Check.getSpecialSpan(start)+"位，当前输入了"+Check.getSpecialSpan(length)+"位";
};
Check.lengthMaxErr = function(end,length){
	return "不能大于"+Check.getSpecialSpan(end)+"位，当前输入了"+Check.getSpecialSpan(length)+"位";
};
Check.lengthErr = function(end,length,start){
	return "设定为"+(start?Check.getStrong(start)+"到":"")+Check.getStrong(end)+"位，您当前输入了"+Check.getSpecialSpan(length)+"位";
};
Check.getStrong = function(str){
	return "<strong>"+str+"</strong>";
}
Check.mustLength = function(length){
	return "应该是"+Check.getSpecialSpan(length)+"位";
};
Check.mustLengNumber = function(length){
	return "格式错误（要求必须为"+length+"位"+Check.getSpecialSpan("数字")+"）";
};
Check.mustNumber = function(){
	return "格式错误（要求必须为"+Check.getSpecialSpan("数字")+"）";
};
Check.justNumber = function(){
	return "不能为"+Check.getSpecialSpan("纯数字");
};
Check.specialErr = function(c){
	if(c == " "){
		return "不可包含"+Check.getSpecialSpan("空格");
	}
	return "不可包含特殊字符 "+Check.getSpecialSpan(c);
};
/**验证中文用户名*/
Check.checkAccountChiness = function(str,start,end){
	if (!str) return Check.nullMsg();
	//验证长度
	var length = Check.getLengthChiness(str);
	if(!isNaN(str.charAt(0))){
		return "首字母"+Check.justNumber();
	}
	if ((start && length < start) || (end && length > end))
		return Check.lengthErr(end,length,start);
	//允许为数字、字母、下划线或中文
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if (c < '0' || (c > '9' && c < 'A') || (c > 'Z' && c < 'a')
		|| (c > 'z' && c < '一') || c > '龥'){
			return Check.specialErr(c);
		}
	}
	return null;
};
/**获取字符串长度，中文按两个字节计算*/
Check.getLengthChiness = function(str){
	var j=0;
	for(var i=0;i<str.length;i++){
		if(str.charAt(i)>='一'){
			j++;
		}
		j++;
	}
	return j;
};
/**验证用户名*/
Check.checkAccount = function(str,start,end){
	if (!str) return Check.nullMsg();
	//验证长度
	if ((start && str.length < start) || (end && str.length > end))
		return Check.lengthErr(end,str.length,start);
	//允许为数字、字母
	return Check.isNumberOrLetter(str);
};
/**输出验证结果*/
Check.showErrMsg = function(iconObj,errMsg){
	if(errMsg == null){
		iconObj.$icon.removeClass("ico_ok ico_err");
		iconObj.$checkMsg.html("");
		return;
	}
	iconObj.$icon.removeClass(errMsg ? "ico_ok" : "ico_err").addClass(errMsg ? "ico_err" : "ico_ok");
	iconObj.$checkMsg.html(errMsg);
}
/**格式化化时间 'yyyy-mm-dd'*/
Check.initDate=function(count){
	var curDate = new Date();
    curDate.setDate(curDate.getDate()-count);
    var initMonth=(curDate.getMonth()+1)<10?("0"+(curDate.getMonth()+1)):(curDate.getMonth()+1);
    var initDay =curDate.getDate()<10?("0"+curDate.getDate()):curDate.getDate();
    return curDate.getFullYear()+"-"+initMonth+"-"+initDay;
}
/**创建时间*/
Check.formatTimeStr=function(timeStr){
	timeStr[1]=timeStr[1].substring(0,1)=='0'?timeStr[1].substring(1,2):timeStr[1];
	timeStr[2]=timeStr[2].substring(0,1)=='0'?timeStr[2].substring(1,2):timeStr[2];
	return new Date(timeStr[0],timeStr[1]-1,timeStr[2]);
}
/**检验输入时间格式是否符合'yyyy-mm-dd'*/
Check.isFormatTime=function(timeStr){
	var reg=/^(\d{4})(-|\/)(\d{2})\2(\d{2})$/;
	return timeStr.match(reg);
}
/*获取两个日期的时间差*/
Check.getTimeDiffer=function(optStartDate,optEndDate){
	var	curDateStart = Check.formatTimeStr($(optStartDate).val().split('-'));
	var	 curDateEnd= Check.formatTimeStr($(optEndDate).val().split('-'));
	return curDateEnd.getTime()-curDateStart.getTime();
}
/**校验两个日期的时间差值,单纯计算相减*/
Check.timeDiffer=function(optStartDate,optEndDate){
	if(optStartDate==null)
		return $(optEndDate).val().replace(/-/g,'')-Check.initDate(0).replace(/-/g,'');
	return $(optEndDate).val().replace(/-/g,'')-$(optStartDate).val().replace(/-/g,'')
}
/* 校验输入时间是否符合要求 */
Check.isTime=function(optStartDate,optEndDate,differ){
	var startDate = $(optStartDate).val();
	var endDate= $(optEndDate).val();
	var stime = Check.isFormatTime(startDate);  
	var etime = Check.isFormatTime(endDate);  
	if(stime==null || etime==null){
		if(stime!=null)
			$(optEndDate).val(startDate);
		if(etime!=null)
			$(optStartDate).val(endDate);
		if(stime==null && etime==null){
			 $(optStartDate).val(Check.initDate(0));
			 $(optEndDate).val(Check.initDate(0));
		}
	}else{
		if(Check.timeDiffer(optStartDate,optEndDate)<0)
			$(optStartDate).val(endDate);
		if(Check.timeDiffer(null,optEndDate)>0)
			$(optEndDate).val(Check.initDate(0));
		if(Check.getTimeDiffer(optStartDate,optEndDate)>differ*24*60*60*1000)
			return false;
	}
	return true;
}
/**显示加密字符串*/
Check.my_encrpt = function(str,start,end){
	if(!str) return "";
	var pre = "";
	if(start != 0){
		pre = str.substring(0,start);
	}
	var sux = "";
	if(end != -1){
		sux = str.substring(end);
	}else{
		end = str.length; 
	}
	var zx = "";
	for(var i=0;i<end-start;i++){
		zx = zx + "*"
	}
	return pre+zx+sux;
}
