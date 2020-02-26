import moment from "moment";

const getDefaultSearchData = function(list=[],isTransform){
	const values = list.reduce((init,item)=>{
		const {key} = item;
		init[key] = getDefaultValue(item);
		return init;
	},{});
	return isTransform?transformValues(values,list):values;
};

const getDefaultValue = function(target){
	const {type,defaultValue,options} = target;
	switch (type) {
		case "checkbox":{
			if(Array.isArray(defaultValue)){
				return defaultValue;
			}else if(defaultValue === undefined){
				return options.map(item=>item.value)
			}else if(typeof(defaultValue) === "string"){
				return defaultValue.split(",");
			}else{
				return [];
			}
		}
		case "input":{
			return typeof(defaultValue) === "string"?defaultValue:"";
		}
		case "radio":{
			return defaultValue || "";
		}
		case "date":{
			if(defaultValue instanceof moment){
				return defaultValue;
			}else if(typeof(defaultValue) === "string"){
				return moment(defaultValue,"YYYY-MM-DD");
			}else{
				return null;
			}
		}
		case "time":{
			if(defaultValue instanceof moment){
				return defaultValue;
			}else if(typeof(defaultValue) === "string"){
				return moment(defaultValue,"HH:mm:ss");
			}else{
				return null;
			}
		}
		case "dateTime":{
			if(defaultValue instanceof moment){
				return defaultValue;
			}else if(typeof(defaultValue) === "string"){
				return moment(defaultValue,"YYYY-MM-DD HH:mm:ss");
			}else{
				return null;
			}
		}
		default:
			return defaultValue || "";
	}
};

const transformValues = function(target,dataSource){
	const t = function(value,type){
		switch (type) {
			case "checkbox":
				return value.join(",");
			case "date":
				return value?value.format("YYYY-MM-DD"):null;
			case "time":
				return value?value.format("HH:mm:ss"):null;
			case "dateTime":
				return value?value.format("YYYY-MM-DD HH:mm:ss"):null;
			default:
				return value;
		}
	};
	return Object.entries(target).reduce((init,item)=>{
		const [key,value] = item;
		const {type} = dataSource.find(item=>item.key === key);
		init[key] = t(value,type);
		return init;
	},{});
};

export {
	getDefaultSearchData,
	getDefaultValue,
	transformValues
}