// A section to be dynamically added upon clicking "Add dashboard" link
//For the sake od debug and maintainability ,t his code is broken down to small parts as much as possible.
var addMainDash = document.getElementsByClassName("dash-add");
// Loop over all subb Dash links and add event Listener
Array.from(addMainDash).forEach(function(addSubDash){
       addSubDash.addEventListener('click',function () {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id',addSubDash.id+"Ele");
        newDiv.className = "newDivs";
        var dashContainer = document.getElementById('dash-container');
        dashContainer.appendChild(newDiv);
        DashChecker(addSubDash.id,newDiv);
         });
});
// check the Api source (google || Facebook || Instagram) and pass the id and the container ID to dash maker.
function DashChecker(dashId,newDiv) {

    switch (dashId[5]){
        case 'g':
            gapiDashMaker(dashId,newDiv);
            break;
        case 'f':
            fbDashMaker(dashId,newDiv);
            break;
        case 'i':
            instaDashMaker(dashId,newDiv);
            break;
        };
};
// Google Dashboard Maker
function gapiDashMaker(dashId,newDiv) {

    switch (dashId){
        case "Dash-g1":
            basicGapiDash(newDiv)
            break;
        case "Dash-g2":
            InterGapiDash(newDiv)
            break;
        case "Dash-g3":
            multipleGapiDash(newDiv)
            break;
    }
         alert('end code')
}
function basicGapiDash(newDiv) {
            alert("strat")
            var authBut = document.createElement('div');
            authBut.setAttribute('id','embed-api-auth-container');
            var viewSel = document.createElement('div');
            viewSel.setAttribute('id','chart-container');
            var timeLin = document.createElement('div');
            timeLin.setAttribute('id','view-selector-container');
            newDiv.appendChild(authBut);
            newDiv.appendChild(viewSel);
            newDiv.appendChild(timeLin);
            gapi.analytics.ready(function() {
            alert("gapi start")
              /**
               * Authorize the user immediately if the user has already granted access.
               * If no access has been created, render an authorize button inside the
               * element with the ID "embed-api-auth-container".
               */
            gapi.analytics.auth.authorize({
            container: 'embed-api-auth-container',
            clientid: '275364150559-bbe54k2s1eet3lse25q5mjs8lg7fl4o5.apps.googleusercontent.com'
            });
              /**
               * Create a new ViewSelector instance to be rendered inside of an
               * element with the id "view-selector-container".
               */
            var viewSelector = new gapi.analytics.ViewSelector({
            container: 'view-selector-container'
            });

            // Render the view selector to the page.
            viewSelector.execute();
              /**
               * Create a new DataChart instance with the given query parameters
               * and Google chart options. It will be rendered inside an element
               * with the id "chart-container".
               */
            var dataChart = new gapi.analytics.googleCharts.DataChart({
            query: {
              metrics: 'ga:sessions',
              dimensions: 'ga:date',
              'start-date': '30daysAgo',
              'end-date': 'yesterday'
            },
            chart: {
              container: 'chart-container',
              type: 'LINE',
              options: {
                width: '100%'
              }
            }
          });
          /**
           * Render the dataChart on the page whenever a new view is selected.
           */
           viewSelector.on('change', function(ids) {
            dataChart.set({query: {ids: ids}}).execute();
            });

        });
}



