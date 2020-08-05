import React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import configs from "./config";

export default class extends React.Component{
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div>
				<Switch>
					{
						this.buildRenderData().map(item=>
							<Route key={item.path} path={item.path} exact={true} component={(props)=>{
								const C = item.component || (()=>item.path);
								return <C {...props} title={item.label}/>
							}} />
						)
					}
					<Redirect exact={true} to={configs.defaultRoute}/>
				</Switch>
			</div>
		)
	}
	buildRenderData=()=>{ //最多二级菜单
		return [...configs,...configs.otherConfigs].reduce((init,item)=>{
			if(Array.isArray(item.children)){
				item.children.forEach(item=>{
					init.push(item);
				});
			}else{
				init.push(item);
			}
			return init;
		},[]);
	}
}