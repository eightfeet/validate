/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-2017 By-Health Co Ltd. All rights reserved.
 */

 /**
* VPhone(data, Msg, strict)
* 验证手机，data: 手机号码，strict: 当第三个参数设为'strict'时开启严格验证，不填时只验证已1开头的11位手机号码
* VName(data, Msg, Zh)
* 验证姓名，data: 姓名，Zh: 当第三个参数设为'Zh'时开启严格验证，只能填写2以上中文字符
* VEmail(data, Msg)
* 验证邮箱
* VSecurityCode(data, Msg)
* 验证防伪码
* VBarCode(data, Msg)
* 验证条形码
* VVerificationCode(data, Msg, length)
* 验证数字验证码，data: 验证码，length: 验证码的长度(number)不填时默认验证四位验证码。
* VRequire(data, Msg, length)
* 验证必填，data: 需要验证的内容，length: 最少要求多少位字符(number)不填时默认1个字符。
* VLimit(data, Msg, length)
* 验证不超过，data: 需要验证的内容，length: 最多输入多少位字符(number)不填时默认20个字符。
* VNumber(data, Msg)
* 验证数字，data: 需要验证的内容
* VChinese(data, Msg)
* 验证中文，data: 需要验证的内容
* VEnglish(data, Msg)
* 验证英文，data: 需要验证的内容
* VEnglish_(label)
＊ 多个字段用同类型规则验证时需要给Key家label VEnglish_(label)
* validate({
	VChinese_name: name,
	VChinese_address: address,
})
 */

/**
 * validate the phone
 *
 * @export
 * @data {String|Number} request
 * @strict {String}
 */
export const VPhone = function(data, Msg, strict) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	const fixStrict = strict || null;

	if (!Str || Str.length !== 11) {
		return (Msg || '请输入11位手机号码');
	}

	if (!(/^[0-9]*$/.test(Str))) {
		return (Msg || '手机号码格式不正确');
	}

	if (fixStrict !== 'strict' && !(/^1\d{10}$/.test(Str))) {
		return (Msg || '请输入以1开头的11位手机号码');
	}

	if (fixStrict === 'strict' && !(/^1[3|4|5|7|8]\d{9}$/.test(Str))) {
		return (Msg || '请输入正确手机号码');
	}

	return false;
};

/**
 * validate the name
 *
 * @export
 * @data {String} request
 * @Zh {String} = 'Zh' validate the chinese name
 */
export const VName = function(data, Msg, Zh) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}
	Str
        ? Str = Str.toString()
        : null;
	const fixZh = Zh || null;

	if (!Str || Str.length < 1) {
		return (Msg || '请输入您的姓名');
	}

	if (fixZh !== 'Zh' && !(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(Str))) {
		return (Msg || '姓名请使用非特殊字符');
	}

	if (fixZh === 'Zh' && Str.length < 2) {
		return (Msg || '请输您的真实姓名');
	}

	if (fixZh === 'Zh' && !(/^[\u4e00-\u9fa5]+$/.test(Str))) {
		return (Msg || '请输您的真实姓名');
	}

	return false;
};

/**
 * validate the email address
 *
 * @export
 * @data {String} request
 */
export const VEmail = function(data, Msg) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	if (!Str || Str.length < 1) {
		return (Msg || '请输入您的邮箱');
	}

	if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(Str))) {
		return (Msg || '请输正确的邮箱地址');
	}

	return false;
};

/**
 * validate the VIdCard code
 *
 * @export
 * @data {String} request
 */

export const VIdCard = function (data, Msg) {

	let idcard;

	if (data !== 0) {
		idcard = data;
	} else {
		idcard = '0';
	}

	idcard
        ? idcard = idcard.toString()
        : null;

	const Errors = new Array(
	  "验证通过!",
	  "身份证号码位数不对!",
	  "身份证号码出生日期超出范围或含有非法字符!",
	  "身份证号码校验错误!",
	  "身份证地区非法!"
	);
	const area = {
	  11: "北京",
	  12: "天津",
	  13: "河北",
	  14: "山西",
	  15: "内蒙古",
	  21: "辽宁",
	  22: "吉林",
	  23: "黑龙江",
	  31: "上海",
	  32: "江苏",
	  33: "浙江",
	  34: "安徽",
	  35: "福建",
	  36: "江西",
	  37: "山东",
	  41: "河南",
	  42: "湖北",
	  43: "湖南",
	  44: "广东",
	  45: "广西",
	  46: "海南",
	  50: "重庆",
	  51: "四川",
	  52: "贵州",
	  53: "云南",
	  54: "西藏",
	  61: "陕西",
	  62: "甘肃",
	  63: "青海",
	  64: "宁夏",
	  65: "新疆",
	  71: "台湾",
	  81: "香港",
	  82: "澳门",
	  91: "国外"
	};
	let ereg, Y, JYM;
	let S, M;
	let idcard_array = new Array();
	idcard_array = idcard.split("");
	//地区检验
	if (area[parseInt(idcard.substr(0, 2), 0)] === null) {
		return Msg || Errors[4];
	}
		
	//身份号码位数及格式检验
	switch (idcard.length) {
	  case 15:
			if (
				(parseInt(idcard.substr(6, 2), 0) + 1900) % 4 === 0 ||
				((parseInt(idcard.substr(6, 2), 0) + 1900) % 100 === 0 &&
				(parseInt(idcard.substr(6, 2), 0) + 1900) % 4 === 0)
			) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
			}
			if (ereg.test(idcard)) {
				return false;
			}

			return Msg || Errors[2];

	  case 18:
		//18位身份号码检测
		//出生日期的合法性检查
		//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if (
				parseInt(idcard.substr(6, 4), 0) % 4 === 0 ||
				(parseInt(idcard.substr(6, 4), 0) % 100 === 0 &&
				parseInt(idcard.substr(6, 4), 0) % 4 === 0)
			) {
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
			} else {
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
			}

			if (ereg.test(idcard)) {
				//测试出生日期的合法性
				//计算校验位
				S =
					(parseInt(idcard_array[0], 0) + parseInt(idcard_array[10], 0)) * 7 +
					(parseInt(idcard_array[1], 0) + parseInt(idcard_array[11], 0)) * 9 +
					(parseInt(idcard_array[2], 0) + parseInt(idcard_array[12], 0)) * 10 +
					(parseInt(idcard_array[3], 0) + parseInt(idcard_array[13], 0)) * 5 +
					(parseInt(idcard_array[4], 0) + parseInt(idcard_array[14], 0)) * 8 +
					(parseInt(idcard_array[5], 0) + parseInt(idcard_array[15], 0)) * 4 +
					(parseInt(idcard_array[6], 0) + parseInt(idcard_array[16], 0)) * 2 +
					parseInt(idcard_array[7], 0) * 1 +
					parseInt(idcard_array[8], 0) * 6 +
					parseInt(idcard_array[9], 0) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1); //判断校验位
				if (M === idcard_array[17]) {
					return false;
				}
				//检测ID的校验位
				return Msg || Errors[3];
			}
			return Msg || Errors[2];
	  default:
			return Msg || Errors[1];
	}
}

/**
 * validate the security code
 *
 * @export
 * @data {String} request
 */
export const VSecurityCode = function(data, Msg) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	if (!Str || Str.length !== 16) {
		return (Msg || '请输入16位防伪码');
	}

	if (!(/^[0-9]*$/.test(Str))) {
		return (Msg || '您输入的防伪码格式不正确，请重新输入');
	}

	return false;
};

/**
 * validate the bar code
 *
 * @export
 * @data {String} request
 */
export const VBarCode = function(data, Msg) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	if (!Str || Str.length !== 13) {
		return (Msg || '请输入13位产品条形码');
	}

	if (!(/^[0-9]*$/.test(data))) {
		return (Msg || '您输入的产品条形码格式不正确，请重新输入');
	}

	return false;
};

/**
 * validate the verification code
 *
 * @export
 * @data {String} request
 * @length {Number} default 4
 */
export const VVerificationCode = function(data, Msg, length) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;
	const fixLength = length || 4;

	if (length && isNaN(fixLength)) {
		return Msg || '验证码验证时参数错误';
	}

	if (!Str || Str.length !== fixLength) {
		return (Msg || `请输入${fixLength}位验证码`);
	}

	if (!(/^[0-9]*$/.test(Str))) {
		return (Msg || '您输入的验证码格式不正确，请重新输入');
	}

	return false;
};

/**
 * validate the required data
 *
 * @export
 * @data {String} request
 * @length {Number} request
 */
export const VRequire = function(data, Msg, length) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;
	const fixLength = length || 1;

	if (isNaN(fixLength) || !Str) {
		return Msg || '必填项验证时参数错误';
	}

	if (Str.length < fixLength) {
		return Msg || true;
	}

	return false;
};

/**
 * Limit string length
 *
 * @export
 * @data {String} request
 * @length {Number} request
 */
const VLimit = function(data, Msg, length) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;
	const fixLength = length || 20;

	if (isNaN(fixLength) || !Str) {
		return Msg || '限制字符串长度验证时参数错误';
	}

	if (Str.length > fixLength) {
		return true;
	}

	return false;
};

/**
 * input number
 *
 * @export
 * @data {String} request
 */
const VNumber = function(data, Msg) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	if (!(/^[0-9]*$/.test(Str))) {
		return Msg || true;
	}

	return false;
};

/**
 * input chinese
 *
 * @export
 * @data {String} request
 */
const VChinese = function(data, Msg) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	if (!(/^[\u4e00-\u9fa5]+$/.test(Str))) {
		return Msg || true;
	}

	return false;
};

/**
 * input English
 *
 * @export
 * @data {String} request
 */
const VEnglish = function(data, Msg) {
	let Str;

	if (data !== 0) {
		Str = data;
	} else {
		Str = '0';
	}

	Str
        ? Str = Str.toString()
        : null;

	if (!(/^[a-zA-Z]*$/.test(Str))) {
		return Msg || true;
	}

	return false;
};

/**
 * equal data
 *
 * @export
 * @dataA & @dataB {String} request
 */
const VEqual = function(dataA, dataB, Msg, turnOver) {
  if (!dataA || !dataB) {
    console.error('请传入比较参数');
    return;
  }

  if (turnOver === false) {
    if (dataA !== dataB) {
      return Msg || '数据不相等！';
    }
  } else {
    if (dataA === dataB) {
      return Msg || '数据相等！';
    }
  }

  return false;
}

/* if has dangerous Char */
const VDangerousChar = function(data, Msg) {
	let Str;
	
		if (data !== 0) {
			Str = data;
		} else {
			Str = '0';
		}
	
		Str
					? Str = Str.toString()
					: null;
	
		if (/select |update |delete |truncate |join |union |exec |insert |drop |count|’|"|;|>|<|%/i.test(Str)) {
			return Msg || true;
		}
	
		return false;
}

/**
 * validate
 *
 * @export
 * @arguments {String|Boolean} request
 */
function validate(data, strict) {

	if (!data || !(data instanceof Object)) {
		console.error('validate方法，请传入验证对象类型参数{key: value}');
		return '验证失败，传入参数不正确！';
	}

	if (Array.isArray(data)) {
		console.error('validate方法，请传入验证对象类型参数{key: value}');
		return '验证失败，传入参数不正确！';
	}

	if (strict && typeof strict === 'boolean') {
		const VError = {};
		for (let key in data) {
			if ({}.hasOwnProperty.call(data, key)) {

				if (key.indexOf('_') !== -1) {
					const splitkey = key.split('_')[0];
					if (validate[splitkey]) {
						if (Array.isArray(data[key])) {
							const _Ad = validate[splitkey].apply( validate[splitkey], data[key]);
							if (_Ad) {
								VError[key] = _Ad;
							} else {
								VError[key] = false;
							}
						} else {
							const _Nd = validate[splitkey](data[key]);
							if (_Nd) {
								VError[key] = _Nd;
							} else {
								VError[key] = false;
							}
						}
					}
				}

				if (key.indexOf('_') === -1) {
					if (validate[key]) {
						if (Array.isArray(data[key])) {
							const Ad = validate[key].apply( validate[key], data[key]);
							if (Ad) {
								VError[key] = Ad;
							} else {
								VError[key] = false;
							}
						} else {
							const Nd = validate[key](data[key]);
							if (Nd) {
								VError[key] = Nd;
							} else {
								VError[key] = false;
							}
						}
					}
				}
			}
		}

		return VError;
	}

	for (let key in data) {
		if ({}.hasOwnProperty.call(data, key)) {

			if (key.indexOf('_') !== -1) {
				const splitkey = key.split('_')[0];
				if (validate[splitkey]) {
					if (Array.isArray(data[key])) {
						const _Ad = validate[splitkey].apply( validate[splitkey], data[key]);
						if (_Ad) {
							return _Ad;
						}
					} else {
						const _Nd = validate[splitkey](data[key]);
						if (_Nd) {
							return _Nd;
						}
					}
				}
			}

			if (key.indexOf('_') === -1) {
				if (validate[key]) {
					if (Array.isArray(data[key])) {
						const Ad = validate[key].apply( validate[key], data[key]);
						if (Ad) {
							return Ad;
						}
					} else {
						const Nd = validate[key](data[key]);
						if (Nd) {
							return (Nd);
						}
					}
				}
			}
		}
	}

	return false;
}

validate.VPhone = VPhone;
validate.VName = VName;
validate.VEmail = VEmail;
validate.VSecurityCode = VSecurityCode;
validate.VBarCode = VBarCode;
validate.VVerificationCode = VVerificationCode;
validate.VRequire = VRequire;
validate.VLimit = VLimit;
validate.VNumber = VNumber;
validate.VChinese = VChinese;
validate.VEnglish = VEnglish;
validate.VEqual = VEqual;
validate.VDangerousChar = VDangerousChar;
validate.VIdCard = VIdCard;

export default validate;
