### Install
```sh
    npm i validate-by-health
```

### Validate Usage

```jsx
    ...
    import validate from 'validate-by-health';
    ...
    export class example extends React.Component {
        ...
        handleSubmit = () => {
            const error = validate({
				VPhone: ['11845674324', '请输入正确手机号码', 'strict'], // return 请输入正确手机号码
				VName: 'asd@#', // return 姓名请使用非特殊字符
				VEnglish: ['jk123123', '请使用英文名'], // return 请使用英文名
				VSecurityCode: '1asd21as1' // return 请输入16位防伪码
			});

            if (error) {
                this.showModal(error); // 显示错误
                return;
            }

            this.showLoading();
            
            fetch(Api).then( ...
        }
        ...
        render(){
            return <button onClick={this.handleSubmit}>提交</button>;
        }
    }
    export default example;
```


### validate(data, Boolean) 验证方法     

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证数据，{key: value} key是验证器，value是验证数据和验证规则参数 |  Object | 必填  |
| Boolean  | 控制返回结果，设为true时完成整个data的验证以{key: returns}形式返回， | Boolean  |  默认false |


- 注意：多个数据用到同类型验证器时请使用key_(lable)

```js
    const error = validate({
        'VPhone_Jhon': '13111111111',
        'VPhone_Lucy': '13875745147',
        'VPhone_Lee': '13',
        ...
    }, true);
```
返回结果
```
    return error = {
        VPhone_Jhon: false,
        VPhone_Lucy: false,
        VPhone_Lee: '请输入正确手机号码'
    }
```

### Validate 键值属性（String or Array）       

- VPhone(data, Msg, strict)    
```jsx
	validate({VPhone: [data, Msg, strict]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证电话号码 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |
| strict  | 开启严格模式 | string |  设为'strict'时开启严格验证，不填时只验证已1开头的11位手机号码 |

- VName(data, Msg, Zh)    
```jsx
	validate({VName: [data, Msg, Zh]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证名字 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |
| Zh  | 开启严格模式 | string |  设为'Zh'时开启严格验证，只能填写2以上中文字符 |

- VEmail(data, Msg)   
```jsx
	validate({VEmail: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证email |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |


- VIdCard(data, Msg)   
```jsx
	validate({VIdCard: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证身份证合法性 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |

- VSecurityCode(data, Msg)   
```jsx
	validate({VSecurityCode: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证防伪码 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |

- VBarCode(data, Msg)    
```jsx
	validate({VBarCode: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证条形码 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |

- VVerificationCode(data, Msg, length)    
```jsx
	validate({VVerificationCode: [data, Msg, length]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证名字 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |
| length  | 开启严格模式 | number |  验证码的长度(number)不填时默认验证4位验证码 |

- VRequire(data, Msg, length)  
```jsx
	validate({VRequire: [data, Msg, length]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证最少字符数 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |
| length  | 开启严格模式 | number |  最少要求多少位字符(number)不填时默认1个字符 |

- VLimit(data, Msg, length)   
```jsx
	validate({VLimit: [data, Msg, length]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证最大字符数 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |
| length  | 开启严格模式 | number |  length: 最多输入多少位字符(number)不填时默认20个字符 |

- VNumber(data, Msg)   
```jsx
	validate({VNumber: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证数字 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |

- VChinese(data, Msg)   
```jsx
	validate({VChinese: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证中文 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |

- VEnglish(data, Msg)   
```jsx
	validate({VEnglish: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
data | 验证英文 |  string | 必填  
Msg  |  错误返回信息 | string  |  必填    

- VEqual(dataA, dataB, Msg, turnOver)      

验证是否相等
```jsx
	validate({VEqual: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
dataA | 比较值A |  string | 必填  
dataB | 比较值B |  string | 必填  
Msg  |  错误返回信息 | string  |  非必填     
turnOver | false时验证相等，true时验证不相等 |  Boolean | false  


- VdangerousChar(data, Msg)   
```jsx
	validate({VDangerousChar: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
data | 危险性字符验证，防止脚本或SQL注入 |  string | 必填  
Msg  |  错误返回信息 | string  |  必填    





