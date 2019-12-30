
  
  

       
       //Table Rendering
        var imgUrlpartial = 'img/blockchainproviders/';

        var categoryList = null;

        var jsonContent = null;

        var tableOnlyWithHeader = null;

        
        $(document).ready(function () {
        
            //Load the JSON file with information related with the Enterprise Blockchain Platforms
            $.getJSON('data/EnterpriseBlockchainPlatforms.json', function (Json) {
                
                jsonContent = Json;
        
                //Create a list of all categories available
                var categoryList = Json.reduce(function (a, d) {
                    if (a.indexOf(d.category.name) === -1) {
                      a.push(d.category.name);
                    }
                    return a;
                 }, []);


                $.each(categoryList, function (key, value){
                     $('.modal-body').append("<div><input type='checkbox' checked='false' id='checkCategory' value='"+ value + "' style='margin:5px;'>" + value + "</checkbox></div>");
                });                 

                jsonPrepareContent(Json, "");

            });
        });


        //Format/define the HTML to the Json content according with the first load or filter(s) selected
        function jsonPrepareContent(Json, filter){
            
            var trHTML = '';

            if (filter != ""){

                var category = "";

                Json = Json.filter(
                    data => { 

                        if (category != data.category.name){

                            category = filter.find(function (element){
                                return element == data.category.name;
    
                            });

                        }
                        
                        if (category != undefined){
                            return data;
                        }
                    
                    }
                    
                );

            }

            $.each(Json, function (key, value) {
                trHTML += '<tr><td style="background-color: #F0F0F0; vertical-align: middle; word-wrap: break-word"><b>' + value.category.name + '</b></td>';
                trHTML += '<td style="background-color: #F0F0F0; vertical-align: middle; word-wrap: break-word"><b>' + value.service.name + ' <a href="' + value.service.ref + '" class="glyphicon glyphicon-link hidden-print" target="_blank"></a></b></td>';
                trHTML += dataProcessor(value.corda, 'corda');
                trHTML += dataProcessor(value.fabric, 'fabric');
                trHTML += dataProcessor(value.multichain, 'multichain');
                trHTML += dataProcessor(value.quorum, 'quorum');
            });
        
            if (filter != ""){
                $('tbody').remove("tr").empty();
            }

            var $table = $('#comparetable');

            $table.append(trHTML);
            $('body').css("display","block");
            
            if (filter != ""){
                $table.trigger('reflow');
            }
            else {
                $table.floatThead();
            }
            
            
            RemoveEmptyAHref();

        }

        function selectAllCategories(){
            
            var selectStatus = $('#checkCategorySelectAll') ;
            var status;

            $("[id='checkCategory']").prop('checked', selectStatus.prop('checked'));
        
        }

        function filter(){

            var obj = $("[id='checkCategory']");

            var filter = [];
            var index = 0;

            $.each(obj, function(key, value){
                if (value.checked == true){
                    filter[index] = value.value ;
                    index++;
                }
            });

            if (filter.length == 0){
                window.event.stopImmediatePropagation();
                alert("Please, select at least one item in the list");

                return false;
            }

            jsonPrepareContent(jsonContent, filter);

        }



        function RemoveEmptyAHref() {
            $("a").each(function () {
                var href = $(this).attr("href");
                if (href == 'https://#' || href == '' || href == 'http://#' || href == '#') { // or anything else you want to remove...
                    $(this).remove();
                }
            });
        }


        function dataProcessor(input, type) {
            var trHTML = '';
            
            var tdIn = '<td>';            
            var tdOut = '</td>';
            var lineContent = '';


            for (var i in input) {

                var divContainerIn = '<div class="clearfix">';            
                
                var divImgContainerIn = '<div class="img-container hidden-sm hidden-xs">';
                var img = '<img src="' + imgURL(input[i].icon,type) + '" style="width:100%" />';
                var divImgContainerOut = '</div>';
                var divTextContainerIn = '<div class="text-container">';
                var divTextContent = input[i].name;
                var hrefLink = ' <a href="' + input[i].ref + '"class="glyphicon glyphicon-link srvc-hyperlink hidden-print"  target="_blank"></a>'
                var divTextContainerOut = '</div>';
                
                var divContainerOut = '</div>';
    
                lineContent +=  divContainerIn + 
                                    divImgContainerIn + 
                                        img + 
                                    divImgContainerOut + 
                                    divTextContainerIn + 
                                        divTextContent +  
                                        hrefLink + 
                                    divTextContainerOut + 
                                divContainerOut;


            }

            trHTML = tdIn + lineContent + tdOut;
            
            return trHTML;
        }


        function imgURL(imageIcon,type) {

                if (imageIcon.trim() == '')
                    return 'img/blockchainproviders/none2.png';

                return imgUrlpartial + type + '/' + imageIcon;
        }

        function imgError(image) {
            image.onerror = "";
            image.src = "img/icons/addRedX2.png";
            return true;
        }


        // Scrolls to the selected menu item on the page
        $(function () {
            $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });

        //#to-top button appears after scrolling
        var fixed = false;
        $(document).scroll(function () {
            if ($(this).scrollTop() > 250) {
                if (!fixed) {
                    fixed = true;
                    // $('#to-top').css({position:'fixed', display:'block'});
                    $('#to-top').show("slow", function () {
                        $('#to-top').css({
                            position: 'fixed',
                            display: 'block'
                        });
                    });
                }
            } else {
                if (fixed) {
                    fixed = false;
                    $('#to-top').hide("slow", function () {
                        $('#to-top').css({
                            display: 'none'
                        });
                    });
                }
            }
        });