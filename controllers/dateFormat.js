exports.dataFormat = function(data){    					
        var date = new Date(data);
        var format = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"  "+ date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        console.log( format )
    return format;
} 


      
