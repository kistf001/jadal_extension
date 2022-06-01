var default_lylic_server_name="http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx";
var page_loading_state = 0;
var video_current_time = 0;
var timing_margine = 0;
var cave = null;
var alsongID_for_send;
var now_url='';
var config={
    lylic_size:40,
    lylic_position:5,
    lylic_color:"white",
    lylic_background_transparency:0.8,
    lylic_background_color:"black",

    force_refrash_lylic_data:false,
    force_refrash_lylic_view:false,

    storage_save_flag:false,
    killer:false,

    qq:false,
    listen:false,

    lylic_data:"",

    sync:0,
}

var limit=0;
config_request(()=>{limit=0, config_command();});
setInterval(()=>{limit=0;},4000);

var notice="";
function console_window(string){
    $('#qopoe').text(string), setTimeout(()=>{$('#qopoe').text(notice);},5000);
}

function config_request(callback){
    config.listen=true;
    chrome.runtime.sendMessage(config,function(response){
        config=response;
        callback();
    });
}
function config_command(callback){
    config.qq=true;
    chrome.runtime.sendMessage(config,function(response){
        config=response;
        callback();
    });
}

function Request_url(callback){
    chrome.runtime.sendMessage({request:"url"},function(response){
        now_url = response.state;
        //console.log(cave); // 응답 처리
        console.log("Request_url()"); // 응답 처리
        callback();
    });
}
function Request_state_pageload(callback){
    chrome.runtime.sendMessage({state:"pageLoad"},function(response){
        callback(response.state);
    });
}
function Request_state_videoTime(callback){
    chrome.runtime.sendMessage({state:"video_time"},function(response){
        callback(response.state);
    });
}

function command_video_pause(){chrome.runtime.sendMessage({command:"pause"});}
function command_video_start(){chrome.runtime.sendMessage({command:"start"});}

var salfkalf=false;
function lylicMachine(){
    var counter=0, change_cheack=-1;
    setInterval(function(){
        Request_state_videoTime(function(ssssss){video_current_time=ssssss;});
        if((page_loading_state)&&(config.lylic_data!="")){
            var clip_time=video_current_time+config.sync;
            for(var counter = 0; counter<config.lylic_data.length-1; counter++){
                var lylic_start_time = config.lylic_data[counter][0];
                var lylic_end_time = config.lylic_data[counter+1][0];
                if((lylic_start_time<=clip_time)&&(clip_time<lylic_end_time)){
                    if((change_cheack!=counter)||(salfkalf==true)){
                        salfkalf=false, change_cheack = counter;
                        $('#showPart').empty();
                        var lylics_str = config.lylic_data[counter][1];
                        lylics_str.forEach(function(ele){
                            var $div = $("<h2 id='q898'>"+ele+"</h2>");
                            $('#showPart').append($div);
                        });
                    }
                    break;
                }
            }
        }
    },100);
}


function alsong_search_protocol(artist="하츠네미쿠", title=""){
    var x00 ='<?xml version="1.0" encoding="UTF-8"?>';
    var x01 ='<SOAP-ENV:Envelope ';
    var x02 ='xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" ';
    var x03 ='xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" ';
    var x04 ='xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
    var x05 ='xmlns:xsd="http://www.w3.org/2001/XMLSchema" ';
    var x06 ='xmlns:ns2="ALSongWebServer/Service1Soap" ';
    var x07 ='xmlns:ns1="ALSongWebServer" ';
    var x08 ='xmlns:ns3="ALSongWebServer/Service1Soap12">';
    var x09 ='<SOAP-ENV:Body><ns1:GetResembleLyricList2>';
    var x10 ='<ns1:encData>7c2d15b8f51ac2f3b2a37d7a445c3';
    var x11 ='158455defb8a58d621eb77a3ff8ae4921318e4';
    var x12 ='9cefe24e515f79892a4c29c9a3e204358698c1';
    var x13 ='cfe79c151c04f9561e945096ccd1d1c0a8d8f2';
    var x14 ='65a2f3fa7995939b21d8f663b246bbc433c758';
    var x15 ='9da7e68047524b80e16f9671b6ea0faaf9d6cd';
    var x16 ='e1b7dbcf1b89aa8a1d67a8bbc566664342e12';
    var x17 ='</ns1:encData>';
    var x21 ='</ns1:GetResembleLyricList2></SOAP-ENV:Body>';
    var x22 ='</SOAP-ENV:Envelope>';
    var dddddd = x00+x01+x02+x03+x04+x05+x06+x07+x08+x09;
    var dddddd = dddddd+x10+x11+x12+x13+x14+x15+x16+x17;

    var pageNo = "1";
    var x19 ='<ns1:artist>'+artist+'</ns1:artist>';
    var x18 ='<ns1:title>'+title+'</ns1:title>';
    var x20 ='<ns1:pageNo>'+pageNo+'</ns1:pageNo>';
    var dddddd = dddddd+x18+x19+x20+x21+x22;

    return dddddd;
}
function alsong_lylic_recieve_protocol(number){
    var s00 = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope ';
    var s01 = 'xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" ';
    var s02 = 'xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" ';
    var s03 = 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
    var s04 = 'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ';
    var s05 = 'xmlns:ns1="ALSongWebServer" ';
    var s06 = 'xmlns:ns3="ALSongWebServer/Service1Soap12">';
    var s07 = '<SOAP-ENV:Body>';
    var s08 = '<ns1:GetLyricByID2>';
    var s09 = '<ns1:encData>7c2d15b8f51ac2f3b2a37d7a445c3158455defb';
    var s10 = '8a58d621eb77a3ff8ae4921318e49cefe24e515f79892a4c29c';
    var s11 = '9a3e204358698c1cfe79c151c04f9561e945096ccd1d1c0a8d';
    var s12 = '8f265a2f3fa7995939b21d8f663b246bbc433c7589da7e68047524b80e';
    var s13 = '16f9671b6ea0faaf9d6cde1b7dbcf1b89aa8a1d67a8bbc566664342e12';
    var s14 = '</ns1:encData><ns1:lyricID>';
    var s15 = number;
    var s16 = '</ns1:lyricID></ns1:GetLyricByID2>';
    var s17 = '</SOAP-ENV:Body></SOAP-ENV:Envelope>';
    
    var dddddd = s00+s01+s02+s03+s04+s05+s06+s07+s08+s09+s10;
    var dddddd = dddddd+s11+s12+s13+s14+s15+s16+s17;

    return dddddd;
}
function alsong_search_list($_artist,$_title){
    $.ajax({
        url : "http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx",
        type: "POST",
        data : alsong_search_protocol($_artist,$_title),
        dataType : "xml",
        timeout: 10000,
        contentType:"application/soap+xml",
        //type : 'DELETE',async: true,
        beforeSend:function(){},
        complete:function(){},
        success : function(data){
            $('#sagiri').empty();
            $lylic_lists = $(data).find("ST_SEARCHLYRIC_LIST");
            $lylic_lists.each(function(index,vegename){
                var $title = $(vegename).find("title").text();
                var $artist = $(vegename).find("artist").text();
                var $album = $(vegename).find("album").text();
                var $lyricID = $(vegename).find("lyricID").text();
                var $div0 = $("<option value='"+$lyricID+"'>"+$title+"==="+$album+"==="+$artist+"</option>");
                $('#sagiri').append($div0);
            });
        },
        error : function(request,status,error){},
        fail : function(){}
    });
}
function lylic_to_array(data){
    var lylics = data;
    var cave = [[1,["가사가 준비되었습니다."]]];
    // 데이터를 파싱하여 어레이로 만듬 [초,["문자열",...]],...
    lylics.split(RegExp(/\n/)).forEach(element => {
        var now_time = element.match(/\[\d\d\:\d\d\.\d\d\]/);
        if(now_time!=null){
            var mm2 = Number( now_time[0].substr(1,2) );
            var ss2 = Number( now_time[0].substr(4,2) );
            var dd2 = Number( now_time[0].substr(7,2) );
            var lylics_time33 = (mm2*60) + (ss2) + (dd2/100) ;
            var lylicsss = element.replace(/\[\d\d:\d\d.\d\d\]/,"");
            if(lylics_time33!=0){
                if( lylics_time33 != cave[cave.length-1][0] ){
                    cave = cave.concat([[lylics_time33,[lylicsss]]]);
                } else if( lylics_time33 == cave[cave.length-1][0] ){
                    cave[cave.length-1][1] = cave[cave.length-1][1].concat([lylicsss]);
                }
            }
        }
    });
    cave = cave.concat([[999999999,[""]]]);
    return cave;
}
function alsong_data_taker($value){
    console.log("alsong_data_taker()");
    // 알송 데이터 로더
    if(limit<4){
        limit+=1;
        $.ajax({
            url : default_lylic_server_name,
            type: "POST",
            data : alsong_lylic_recieve_protocol($value),
            dataType : "xml",
            timeout: 10000,
            contentType:"application/soap+xml",
            //type : 'DELETE',async: true,
            beforeSend:function(){},
            complete:function(){},
            error:function(){},
            fail:function(){},
            success:function(data){
                var $data_state = $(data).find("GetLyricByID2Result").text();
                if($data_state=="true"){
                    var $lylic_lists = $(data).find('lyric').text();
                    alsongID_for_send = $(data).find('lyricID').text();
                    config.lylic_data = lylic_to_array($lylic_lists);
                }
            }
        });
    }
    else{console_window("5초동안 3번을 초과하여 요청할 수는 없습니다.");}
}


//$('.lylic_show').click(()=>{
//    $('#lylicq').empty();
//    $('body').css('height','200px');
//    $('html').height($('#menu').height());
//})


$('.start').click(()=>{command_video_start(),console_window("비디오를 재생합니다.");});
$('.pause').click(()=>{command_video_pause(),console_window("비디오를 멈췄습니다.");});


$('.lylic_match').off().click(()=>{
    $('body').css('height','200px');
    $('#lylicq').empty();
    $('#lylicq').load('interface_match.html',function(){

        $('#take_list').hide();
        $('#query_to_server_button').hide();
        $('#slow_sync').hide();
        $('#qreytr').hide();
        $('#fast_sync').hide();

        $('#artist').val("");
        $('#title' ).val("");

        // 실제 버튼 동작
        $('#find_button').click(()=>{
            var $artist   = $('#artist').val();
            var $title    = $('#title' ).val();
            alsong_search_list($artist,$title);
            $('#take_list').show();
        });
        $('#sagiri').dblclick(()=>{
            $('#query_to_server_button').show();
            //$('#slow_sync').show();
            //$('#qreytr').show();
            //$('#fast_sync').show();
            var $selected_option=$("#sagiri option:selected").val();
            alsong_data_taker($selected_option);
            console_window("불러왔습니다.");
            //$('#slow_sync').click(()=>{config.sync=(config.sync-0.1).toPrecision(2);$('#qreytr').text(config.sync);});
            //$('#fast_sync').click(()=>{config.sync=(config.sync+0.1).toPrecision(2);$('#qreytr').text(config.sync);});
        });
        $('#query_to_server_button').click(()=>{
            limit += 1;
            if(limit<3){
                Request_url(()=>{
                    var url__=now_url;
                    console.log(url__);
                    var dataa='<set><url>';
                    dataa=dataa+url__;
                    dataa=dataa+'</url><id>';
                    dataa=dataa+alsongID_for_send;
                    dataa=dataa+'</id><timing>';
                    dataa=dataa+config.sync;
                    dataa=dataa+'</timing></set>';
                    $.ajax({
                        url:"https://lylics390001.duckdns.org/the_lylics/read_yowamushi.php?action=1&client_version=1",
                        type:"POST",
                        data:{data:dataa},
                        timeout:10000,
                        beforeSend:()=>{
                            console_window("등록중...기다려주세요.");
                        },
                        complete:()=>{},
                        error : function(request,status,error){
                            console.log("통신중에 에러가 발생함");
                            console_window("재시도해 주세요.");
                        },
                        success : function(data){
                            config_request(()=>{
                                config.force_refrash_lylic_data=true;
                                config_command(()=>{
                                    console.log("success");
                                    console_window("성공했습니다.");
                                });
                            });
                        }
                    });
                });
            }
            else{console_window("5초동안 3번을 초과하여 요청할 수는 없습니다.");}
        });
    });
});
$('.refrash').click(()=>{// In ContentScript.js
    limit += 1;
    if(limit<3){
        config_request(()=>{
            config.force_refrash_lylic_data=true;
            config_command(()=>{console_window("요청하였습니다.");});
        });
    }
    else{console_window("5초동안 3번을 초과하여 요청할 수는 없습니다.");}
});
$('.setup').off().click(()=>{
    $('body').css('height','200px'), $('#lylicq').empty();
    $('#lylicq').load('interface_setup.html',()=>{
        $("#setup_lylic_tempra").val(config.lylic_background_transparency).prop("selected", true);
        $("#setup_lylic_position").val(config.lylic_position).prop("selected", true);
        $("#setup_lylic_size").val(config.lylic_size).prop("selected", true);
        //$("#select_id").val("1").prop("selected", true);
        $('#setup_button_save').click(()=>{
            config_request(()=>{
                config.lylic_size=$("#setup_lylic_size option:selected").val();
                config.lylic_position=$("#setup_lylic_position option:selected").val();
                config.lylic_background_transparency=$("#setup_lylic_tempra option:selected").val();
                config.force_refrash_lylic_view=true;
                config.storage_save_flag=true;
                console.log(config);
                config_command();
                console_window("저장되었습니다.");
            });
        });
    });
});


$('.onoff').click(()=>{
    config_request(()=>{
        if(config.killer==true){config.killer=false;}
        else if(config.killer==false){config.killer=true;}
        config_command(()=>{
            console.log(config);
            if(config.killer==true){
                $('.onoff').css('background-color','gray'), console_window("가사창을 종료했습니다.");
            }
            else if(config.killer==false){
                $('.onoff').css('background-color','green'), console_window("다시 시작합니다.");
            }
        });
    });
});
$('#main_').load('interface_show.html',()=>{
});

$('#site').click(()=>{chrome.tabs.create({url:"https://twitter.com/WJjyCErVSj8Jlbr"});});
$('#site').hover(()=>{console_window("공식 트위터");});

setInterval(()=>{
    Request_state_pageload(function(state){
             if(state==true ){page_loading_state=1;}
        else if(state==false){page_loading_state=0;}
    });
},1000);
config_request(()=>{
         if(config.killer==true){$('.onoff').css('background-color','gray');}
    else if(config.killer==false){$('.onoff').css('background-color','green');}
    change_cheack=-1,salfkalf=true;
    //console.log(config);
});
lylicMachine();
