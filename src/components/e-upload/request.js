import {API,$http} from "@data/api";
import {qiniuToken,qiniuUploadHost,resourceHost} from "../../config";

export default function ({
   action=qiniuUploadHost,
   data={token:qiniuToken},
   // action=API.resource.upload,
   // data={},
   file=null,
   onError=()=>{},
   onProgress=()=>{},
   onSuccess=()=>{},
 }) {
	const formData = new FormData();
	formData.append("file",file);
	if (data) {
		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		});
	}
	$http({
		url:action,
		method:"post",
		data:formData,
		timeout:1000*60*5,
		onUploadProgress: ({ total, loaded }) => {
			onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
		},
	}).then(([res])=>{
		const url = res.url.indexOf("http://") === 0 ? res.url : resourceHost+res.url;
		return onSuccess({
			...res,
			url
		})
	}).catch(onError);
}