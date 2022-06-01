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

    //artist = "하츠네미쿠";
    //title = "";
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
function alsong_to_array(data){
    var lylics = data;
    var cavee = [[1,["","",""]]];
    // 데이터를 파싱하여 어레이로 만듬 [[초,["문자열",...]],...]
    lylics.split(RegExp(/\n/)).forEach(element => {
        var now_time = element.match(/\[\d\d\:\d\d\.\d\d\]/);
        if(now_time!=null){
            var mm2 = Number( now_time[0].substr(1,2) );
            var ss2 = Number( now_time[0].substr(4,2) );
            var dd2 = Number( now_time[0].substr(7,2) );
            var lylics_time33 = (mm2*60) + (ss2) + (dd2/100) ;
            var lylicsss = element.replace(/\[\d\d:\d\d.\d\d\]/,"");
            if(lylics_time33!=0){
                if( lylics_time33 != cavee[cavee.length-1][0] ){
                    cavee = cavee.concat([[lylics_time33,[lylicsss]]]);
                } else if( lylics_time33 == cavee[cavee.length-1][0] ){
                    cavee[cavee.length-1][1] = cavee[cavee.length-1][1].concat([lylicsss]);
                }
            }
        }
    });
    return cavee.concat([[99999999,[""]]]);
}
//********************************//
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
//********************************//
function storage_read(){
    chrome.storage.local.get(config,(items)=>{
        config = items;
        console.log("storage_cheak:",items);
    });
}
function storage_save(config_){
    chrome.storage.local.set(config_,(items)=>{
        storage_read();
        console.log(items);
    });
}
//********************************//
var url_true_data='';
var force_refrash_lylic_data=false;
var force_refrash_lylic_view=false;
var lylic_view_tag_ready_flag=false;
var tab_id=-1;
var inject_hide=false;
var page_loading_state=false;
//********************************//
var now_video_time=0;
var reg = /.*\:\/\/www.youtube.com\/watch\?v\=.*|.*\:\/\/www.nicovideo.jp\/watch\/sm.*/;
//********************************//
function lylic_download_state(state){
    // icon change
    if(state==true){
        chrome.browserAction.setBadgeText({text:"ok"});
        config.force_refrash_lylic_view=true;
    }else if(state==false){
        chrome.browserAction.setBadgeText({text:"no"});
        config.force_refrash_lylic_view=true;
    }else if(state==-1){
        chrome.browserAction.setBadgeText({text:"load"});
        config.force_refrash_lylic_view=true;
    }else if(state==-2){
        chrome.browserAction.setBadgeText({text:"ready"});
        config.force_refrash_lylic_view=true;
    }else if(state==-3){
        chrome.browserAction.setBadgeText({text:"fail"});
        config.force_refrash_lylic_view=true;
    }else if(state==-4){
        chrome.browserAction.setBadgeText({text:"err"});
        config.force_refrash_lylic_view=true;
    }
}
var entityMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',
"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};
function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function(s){return entityMap[s];});}
//************************************************************************************************//
function url_finder(){
    // config.killer                : 인젝션테그 가리기
    // url_true_data                : 지원하는 URL 추출
    // page_loading_state           : 페이지가 로딩 되었는지
    // lylic_view_tag_ready_flag    : 자막을 표시하는데 피료한 기본 태그가 준비 되었는지
    // inject_hide                  : 자막에 표시하는데 필요한 기본 태그를 숨김
    // tab_id                       : 전역 탭 아이디
    // force_refrash_lylic_data     : 서버에서 데이터를 받아오게 시킴
    var inject_hide_prev=-1, url_previous='', url_true_data_temp='';
    setInterval(function(){
        page_loading_state=false, lylic_view_tag_ready_flag=false;
        chrome.tabs.query({'audible':true,'status':"complete"},function(tabs){
            if(tabs.length==0){inject_hide=true;}
            else{
                tab_id=tabs[0].id;page_loading_state=true;
                //console.log("always:",tabs[0],inject_hide,tab_id);
                if(url_previous!=tabs[0].url){
                    url_previous=tabs[0].url;
                    url_true_data_temp=tabs[0].url.split("&")[0];
                    config.lylic_data="", config.force_refrash_lylic_data=true, url_true_data="";
                    lylic_download_state(-2);
                    // 지원하는 URL인지 판독한다.
                    var testing=reg.test( url_true_data_temp );
                    if(testing==true){ url_true_data_temp=tabs[0].url.split("&")[0]; }
                    else if(testing==false){ url_true_data_temp=""; }
                }
                if(config.killer==true){
                    inject_hide=true,url_true_data="";lylic_view_tag_ready_flag=false;
                    chrome.browserAction.setIcon({path:"icon.png"});
                }
                else if(config.killer==false){
                    inject_hide=false,url_true_data=url_true_data_temp;lylic_view_tag_ready_flag=true;
                    chrome.browserAction.setIcon({path:"icon-yellow.png"});
                }
            }
            if((tab_id!=-1)){
                chrome.tabs.executeScript(tab_id,{code:"inject_check()"},results=>{
                    if(results==1){
                        if((inject_hide_prev!=inject_hide)){
                            if((inject_hide==true)){
                                chrome.tabs.executeScript(tab_id,{code:"$('#asdasd').hide()"});
                                inject_hide_prev=inject_hide;//console.log("true",inject_hide);
                            }
                            else if((inject_hide==false)){
                                chrome.tabs.executeScript(tab_id,{code:"$('#asdasd').show()"});
                                inject_hide_prev=inject_hide;//console.log("false",inject_hide);
                            }
                        }
                        lylic_view_tag_ready_flag=true;
                    }else{
                        if((url_true_data!="")){
                            chrome.tabs.executeScript(tab_id,{code:"function inject_check(){return 1}"},()=>{
                                chrome.tabs.executeScript(tab_id,{file:"jquery-3.4.1.min.js"},()=>{
                                    chrome.tabs.executeScript(tab_id,{file:"injection_lylic_1.js"},()=>{
                                        lylic_view_tag_ready_flag=true;//console.log("leaks");
                                    });
                                });
                            });
                        }
                    }
                });
            }
        });
    },500);
}
function lylic_downloader(){
    // config.killer                : 함수 죽이기용
    // url_true_data
    // force_refrash_lylic_data     : 읽어드림
    // config.lylic_data
    //
    //
    setInterval(()=>{
        if((config.force_refrash_lylic_data==true)&&(url_true_data!='')){
            config.force_refrash_lylic_data=false, config.lylic_data="";
            var main_domain="https://lylics390001.duckdns.org/the_lylics/read_yowamushi.php";
            var url0=main_domain.concat('?client_version=1');
            var url0=url0.concat('&action=0');
            var url0=url0.concat('&target_url=');
            var url0=url0.concat(url_true_data);
            $.ajax({
                url:url0, type:"GET", timeout:5000,
                beforeSend:function(){lylic_download_state(-1);},
                complete:function(){},
                error:function(){lylic_download_state(-4);},
                fail:function(){lylic_download_state(-4);},
                success:function(xml){ //console.log(xml);
                    if($(xml).find('state').text()=="true"){
                        config.sync=parseFloat($(xml).find('timing').text());
                        $.ajax({
                            url:"http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx",
                            type:"POST",
                            data:alsong_lylic_recieve_protocol($(xml).find('id').text()),
                            dataType:"xml",
                            timeout:5000,
                            contentType:"application/soap+xml", //type:'DELETE',//async:true,
                            beforeSend:function(){},
                            complete:function(){},
                            error:function(){lylic_download_state(-4);},
                            fail:function(){lylic_download_state(-4);},
                            success:function(data){
                                var $data_state = $(data).find("GetLyricByID2Result").text();
                                if($data_state=="true"){
                                    config.lylic_data = alsong_to_array($(data).find('lyric').text());
                                    lylic_download_state(true);
                                    console.log("자막 다운로드 성공");
                                }else if($data_state=="false"){ 
                                    config.lylic_data="", lylic_download_state(false);
                                    console.log("자막 다운로드 실패");
                                }
                            }
                        });
                    }else{
                        config.lylic_data="", lylic_download_state(false);
                        console.log("데이터베이스에 자료가 없음");
                    }
                }
            });
        }
    },2000);
}
function lylic_view_loader(){
    var change_cheack_=-1;
    setInterval(function(){
        if((tab_id!=-1)&&(url_true_data!="")&&(page_loading_state==true)&&(lylic_view_tag_ready_flag==true)){
            chrome.tabs.executeScript(tab_id,{code:'document.querySelector("video").currentTime'},results=>{
                now_video_time=(results&&results[0]), now_video_time_=now_video_time+config.sync;
                if((config.lylic_data!="")){//console.log("lylic_view_loader_loop")
                    for(var s=0;s<config.lylic_data.length-1;s++){
                        var lylic_start_time=config.lylic_data[s][0];
                        var lylic_end_time=config.lylic_data[s+1][0];
                        if((lylic_start_time<=now_video_time_)&&(now_video_time_<lylic_end_time)){
                            if((change_cheack_!=s)||(config.force_refrash_lylic_view==true)){
                                change_cheack_=s, config.force_refrash_lylic_view=false;
                                var sosu="$('#daskjladasf').empty();";
                                config.lylic_data[s][1].forEach(function(lylic){
                                    sosu=sosu+"$(\"<span>"+escapeHtml(lylic)+"</span>\")";
                                    sosu=sosu+".css(\"color\",\"";
                                    sosu=sosu+config.lylic_color+"\")";
                                    sosu=sosu+".css(\"background-color\",\"";
                                    sosu=sosu+"rgba(0,0,0"+"\,"+config.lylic_background_transparency+")\")";
                                    sosu=sosu+".css(\"font-size\",\"";
                                    sosu=sosu+config.lylic_size+"px\")";
                                    sosu=sosu+".appendTo(\"#daskjladasf\");";
                                    sosu=sosu+"$(\"<br/>\")";
                                    sosu=sosu+".appendTo(\"#daskjladasf\");";
                                });
                                sosu=sosu+"$(\"#asdasd\").css(\"bottom\",\"";
                                sosu=sosu+config.lylic_position+"%\");";
                                chrome.tabs.executeScript(tab_id,{code:sosu});//console.log(sosu);
                            }
                            break;
                        }
                    }
                }else if((config.lylic_data=="")&&(config.force_refrash_lylic_view==true)){
                    config.force_refrash_lylic_view=false;
                    var sosu="$('#daskjladasf').empty();";
                    chrome.tabs.executeScript(tab_id,{code:sosu});
                }
            });
        }
    },150);
}
//************************************************************************************************//
function loop_starter(){
    url_finder();
    lylic_downloader();
    lylic_view_loader();
}
function control_(){
    chrome.runtime.onMessage.addListener(function(sssss,sender,sendResponse){
        if(sssss.qq==true)
        {
            if(sssss.storage_save_flag==true){sssss.storage_save_flag=false,storage_save(sssss);}
            sssss.qq=false, config=sssss, sendResponse(config);//console.log(config);
        }
        if(sssss.listen==true)
        {
            sendResponse(config);
        }

             if(sssss.state=="video_time"){sendResponse({state:now_video_time});}
        else if(sssss.state=="pageLoad"){sendResponse({state:page_loading_state});}
        else if(sssss.request=="url"){sendResponse({state:url_true_data});}
        else if(sssss.command=="pause"){
            chrome.tabs.executeScript(tab_id,{code:'document.querySelector("video").pause()'});
        }
        else if(sssss.command=="start")
        {
            chrome.tabs.executeScript(tab_id,{code:'document.querySelector("video").play()'});
        }
    });
}
//********************************//
storage_read();
control_();
loop_starter();