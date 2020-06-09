const parseParams = function(str=""){
	const rv = {};
	if(str.substring(1) === ""){return rv}
	str.substring(1).split("&").forEach(item=>{
		const [key,value] = item.split("=");
		rv[key] = decodeURIComponent(value);
	});
	return rv;
};

export {
	parseParams
}