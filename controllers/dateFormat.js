exports.dataFormat = function(data){    					
        var date = new Date(data);
        var format = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+"  "+ date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        console.log( format )
    return format;
} 

