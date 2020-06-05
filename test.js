const req = {
    articleType:string ,// 文章类型，枚举值：normal、video
    title:string, //文章标题
    content:string, //内容
    source:string, //文章来源
    editor:string, //编辑
    coverImages:string, //封面图（这个字段是一个字符串的json，后端不需要关心格式）
}