// A section to be dynamically added upon clicking "Add dashboard" link
//For the sake od debug and maintainability ,t his code is broken down to small parts as much as possible.
(function init(){
var addMainDash = document.getElementsByClassName("dash-add");
Array.from(addMainDash).forEach(function(addSubDash){
       addSubDash.addEventListener('click',function (event) {
            event.preventDefault();
            var newDiv = document.createElement('div');
            newDiv.setAttribute('id',addSubDash.id+"Ele");
            newDiv.className = "newDivs col-sm-4";
            var dashContainer = document.getElementById('dash-container');
            //check if the dashboard alres=ady exist
            var childNodeArray = dashContainer.childNodes;
            if (childNodeArray.length>1){
                var existNode= []
                childNodeArray.forEach(function(child){
                    if(child.id ===newDiv.id){
                    existNode.push(child.id) ;
                    }
                })
                // alert(existNode)
                if (existNode.length>0){
                    // alert("This Dashboard Already Exist!")
                }else if(existNode.length===0){
                    dashContainer.appendChild(newDiv);
                    var closeButt =document.createElement('span');
                    // adding the close Button using Jquery
                    closeButt.className="close-but";
                    closeButt.addEventListener('click',function(e){
                        e.preventDefault();
                        var ParentId = this.parentElement.getAttribute('id')
                         $("#"+ParentId).remove();
                                        },false)
                    newDiv.appendChild(closeButt)
                    DashChecker(addSubDash.id,newDiv);
                }

            }else{
                dashContainer.appendChild(newDiv);
                var closeButt =document.createElement('span');
                // adding the close Button using Jquery
                closeButt.className="close-but";
                closeButt.addEventListener('click',function(e){
                     e.preventDefault();
                     var ParentId = this.parentElement.getAttribute('id')
                     $("#"+ParentId).remove();
                                        },false)
                newDiv.appendChild(closeButt)
                DashChecker(addSubDash.id,newDiv);

            }

         });
});})()
// check the Api source (google || Facebook || Instagram) and pass the id and the container ID to dash maker.
function DashChecker(dashId,newDiv) {
    switch (dashId[5]){
        case 'g':
            gapiDashSelect(dashId,newDiv);
            break;
        case 'f':
            fbDashSelect(dashId,newDiv);
            break;
        case 'i':
            instaDashSelect(dashId,newDiv);
            break;
        };
};
// Google Dashboard Maker
function gapiDashSelect(dashId,newDiv) {

    switch (dashId){
        case "Dash-g1":
            gapiDashMaker('sessions',newDiv)
            break;
        case "Dash-g2":
            gapiDashMaker('countries',newDiv)
            break;
        case "Dash-g3":
            gapiDashMaker('hits',newDiv)
            break;
    }
         // alert('end code')
}
function gapiAuthorize(newDiv){
    var authBut = document.createElement('div');
    var authorize_Id = 'embed-api-auth-container-'+newDiv.id;
    authBut.setAttribute('id',authorize_Id);
    authBut.className="changeDisplay";
    newDiv.appendChild(authBut);
    gapi.analytics.auth.authorize({
            container: authorize_Id,
            clientid: '275364150559-bbe54k2s1eet3lse25q5mjs8lg7fl4o5.apps.googleusercontent.com'
            });

}
function gapiDashMaker(dashType,newDiv) {
            // alert(newDiv.id+"hfdfdgf")
            gapiAuthorize(newDiv);
            // alert("endgapi")

            var viewChart = document.createElement('div');
            viewChart.className = "dashStyleChart";
            var chart_Id = 'chart-container-'+newDiv.id;
            viewChart.setAttribute('id',chart_Id);
            var selecView = document.createElement('div');
            selecView.className = "dashStyleSelect"
            var view_SelecId='view-selector-container-'+newDiv.id
            selecView.setAttribute('id', view_SelecId);
            newDiv.appendChild(viewChart);
            newDiv.appendChild(selecView);
            gapi.analytics.ready(function() {
            // alert("gapi start")
              /**
               * Create a new ViewSelector instance to be rendered inside of an
               * element with the id "view-selector-container".
               */
            var viewSelector = new gapi.analytics.ViewSelector({

            container: view_SelecId
            });
            //close button

            // Render the view selector to the page.
            viewSelector.execute();
              /**
               * Create a new DataChart instance with the given query parameters
               * and Google chart options. It will be rendered inside an element
               * with the id "chart-container".
               */
            if(dashType === 'sessions'){
                // alert('sessions')
                var dataChart = new gapi.analytics.googleCharts.DataChart({
                query: {
              metrics: 'ga:sessions',
              dimensions: 'ga:date',
              'start-date': '30daysAgo',
              'end-date': 'yesterday'
            },
            chart: {
              container: chart_Id,
              type: 'LINE',
              options: {
                width: '100%'
              }
            }
          });
            }else if(dashType === 'countries'){
                // alert('countries')
               var dataChart = new gapi.analytics.googleCharts.DataChart({
                query: {
                  metrics: 'ga:sessions',
                  dimensions: 'ga:country',
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'max-results': 6,
                  sort: '-ga:sessions'
                },
                chart: {
                  container:chart_Id,
                  type: 'PIE',
                  options: {
                    width: '100%',
                    pieHole: 4/9
                  }
                }
              });


            }
          /**
           * Render the dataChart on the page whenever a new view is selected.
           */
           viewSelector.on('change', function(ids) {
            dataChart.set({query: {ids: ids}}).execute();
            });

        });
            gapi.analytics.auth.on('success', function(response) {
            //hide the auth-button
            document.querySelector(".changeDisplay").style.display='none';

             // timeline.execute();

             });

}



