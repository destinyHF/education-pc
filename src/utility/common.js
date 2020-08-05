export function parseParams(str=""){
	const rv = {};
	if(str.substring(1) === ""){return rv}
	str.substring(1).split("&").forEach(item=>{
		const [key,value] = item.split("=");
		rv[key] = decodeURIComponent(value);
	});
	return rv;
}

export function parseObject(obj={}){
	return Object.entries(obj).map(([key,value])=>{
		return `${key}=${value}`;
	}).join("&")
}