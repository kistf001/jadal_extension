if($('#daskjladasf').length){
    $("#asdasd").css("position","fixed");
    $("#asdasd").css("bottom","5%");
    $("#daskjladasf").css("text-align","center");
    $("#asdasd").css("left","10%");
    $("#asdasd").css("right","10%");
    $("#asdasd").css("z-index","10000000");
    $("#asdasd").css("pointer-events","none");
}else{
    $("<div id='asdasd'><div id='daskjladasf'></div></div>").appendTo('body');
    $("#asdasd").css("position","fixed");
    $("#asdasd").css("bottom","5%");
    $("#daskjladasf").css("text-align","center");
    $("#asdasd").css("left","10%");
    $("#asdasd").css("right","10%");
    $("#asdasd").css("z-index","10000000");
    $("#asdasd").css("pointer-events","none");
}