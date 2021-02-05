
// var formatter = new Intl.NumberFormat('en-US', {
//     style:"currency",
//     currency: 'USD'

// });
// console.log(formatter.format(20000));
// console.log((3000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') );

new Vue({
    el: "#app",
    data:{
        totalSummary: [],
        insertedCountry: "",
        searching: false
    },
    methods:{
        beginSearching(){
            this.searching = true;
            console.log(this.insertedCountry);
        //-----------------------
                // SEARCH FOR COUNTRIES
            let formatInsertedData = this.insertedCountry.trim().toLowerCase();
            if(formatInsertedData !== ""){
                var countrySearch= `https://coronavirus-19-api.herokuapp.com/countries/${formatInsertedData}`;
            }
            
           $.getJSON(countrySearch,{
        }).done( function(data){
            if(data){
                
               console.log(data);
                    const mainData = data;
                
                $(".lastUpdate").append(data.Date);
                    
                $(".totalSummary2").append($("<tr>")).append($("<td>").append(mainData.country).css("font-weight","600"));
                
                var confirmedCases = mainData.cases ? (mainData.cases).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A"; 
                $(".totalSummary2").append($("<td>").append(confirmedCases).css("font-size","21px").css("color","rgb(218, 136, 29)"));
                
                var deathsNumbersFormatted = mainData.deaths ? (mainData.deaths).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A"; 
                $(".totalSummary2").append($("<td scoped>").append(deathsNumbersFormatted).addClass("text-danger").css("font-size","21px"));
                
                var recoveredNumbersFormatted = mainData.recovered ? (mainData.recovered).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A";
                $(".totalSummary2").append($("<td>").append(recoveredNumbersFormatted).addClass("text-success").css("font-size","21px"));
                
                var newConfirmedNumbersFormatted= mainData.todayCases ? (mainData.todayCases).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'): "N/A"; 
                $(".totalSummary2").append($("<td>").append(newConfirmedNumbersFormatted));
            
                var todaysDeath = mainData.todayDeaths ? (mainData.todayDeaths).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A";
                $(".totalSummary2").append($("<td scoped>").append(todaysDeath).addClass("lightRed").css("font-size","21px"));
            
            }else{
                alert("please write a valid country name.");
                this.searching=false;
            }
            
           })
            this.insertedCountry= "";
        },
        searchSubmit(event){
            event.preventDefault();
        }
    },
    created(){
        // console.log(this.totalSummary);
        setTimeout( function(){
            location.reload()
        }, 300000)

        //Main

        //GLOBAL
        $(function(){
            var coronaGlobalAPI = "https://api.thevirustracker.com/free-api?global=stats";
            var desktopGlobal = document.getElementById("desktopGlobal");
            desktopGlobal.innerHTML=`
            <div class="loading"></div>
            `;
            $.getJSON(coronaGlobalAPI,{
                
            }).done(function(mainData){
                desktopGlobal.innerHTML=`
                <section>
                    <div class="show-mobile-only">
                        <ul class="mainSummary2 mt-5 mb-4 list-group">
                        
                        </ul>
                    </div>

                        <table class="table table-bordered my-3 show-desktop">
                        <thead class="thead-dark">
                            <tr>
                                <th>Total Cases</th>
                                <th>Total Deaths</th>
                                <th>Total Recovered</th>
                                <th>Total Death Today</th>
                                <th>Affected Countries</th>
                            </tr>
                        </thead>
                        <tbody class=" mainSummary bg-white tbody1" style="font-size:27px; font-weight:bold; ">
                        
                        </tbody>
                    </table>
                </section>
                `;
                console.log(mainData)
                $(mainData).each(function(index, result){
                    var totalCasesFormatted = (mainData.results[0].total_cases).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalRecoveredFormatted = (mainData.results[0].total_recovered).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalDeathsFormatted = (mainData.results[0].total_deaths).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalDeathsTodayFormatted = (mainData.results[0].total_new_deaths_today).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalAffectedCountriesFormatted = (mainData.results[0].total_affected_countries).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    $(".mainSummary").append($("<tr>").append($("<td>").append(totalCasesFormatted).css("color","rgb(221, 221, 73)")).append($("<td>").append(totalDeathsFormatted).css("color","rgb(124, 39, 39)")).append($("<td>").append(totalRecoveredFormatted).css("color","rgb(52, 158, 52)")
                        ).append($("<td>").append(totalDeathsTodayFormatted).css("color","rgb(197, 62, 21)"))
                        .append($("<td>").append(totalAffectedCountriesFormatted))
                    );
                });
        
                $(mainData).each(function(index, result){
                    var totalCasesFormatted = (mainData.results[0].total_cases).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalRecoveredFormatted = (mainData.results[0].total_recovered).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalDeathsFormatted = (mainData.results[0].total_deaths).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalDeathsTodayFormatted = (mainData.results[0].total_new_deaths_today).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    var totalAffectedCountriesFormatted = (mainData.results[0].total_affected_countries).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    $(".mainSummary2").append($("<li class='list-group-item'>").html("Total Cases <br>").append(totalCasesFormatted).css("color","rgb(245, 176, 29)")).append($("<li class='list-group-item'>").html("Total Deaths <br>").append(totalDeathsFormatted).css("color","rgb(124, 39, 39)")).append($("<li class='list-group-item'>").html("Total Recovered <br>").append(totalRecoveredFormatted).css("color","rgb(52, 158, 52)")
                        ).append($("<li class='list-group-item'>").html("Total Deaths Today <br>").append(totalDeathsTodayFormatted).css("color","rgb(197, 62, 21)"))
                        .append($("<li class='list-group-item'>").html("Total Affected Countries <br>").append(totalAffectedCountriesFormatted))
                    ;
                });
            }).fail(function(){
                alert("Could not find API. Please refresh the page.");
            });
            //-----------------------
            //COUNTRIES
            var coronaCountries= "https://coronavirus-19-api.herokuapp.com/countries";
            var desktopCountriesOutput = document.getElementById("desktopCountries");
            desktopCountriesOutput.innerHTML=`
                <div class="loading"></div>
            `;
           $.getJSON(coronaCountries,{
        }).done( function(data){
            desktopCountriesOutput.innerHTML=`
            <table class="table table-striped table-bordered my-5" >
                <thead class="thead-light">
                    <tr>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                        <th>New Cases</th>
                        <th>Today's Deaths</th>
                    </tr>
                </thead>
                <tbody class="totalSummary bg-white tbody2" style="font-size:19px;">

                </tbody>
                
                
                

            </table>    
            `;
               console.log(data);
               for(let key in data){
                   const mainData = data[key];
                   console.log(data[key]);
               
            $(".lastUpdate").append(data.Date);
                
            $(".totalSummary").append($("<tr>")).append($("<td>").append(mainData.country).css("font-weight","600"));
            
            var confirmedCases = mainData.cases ? (mainData.cases).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A"; 
            $(".totalSummary").append($("<td>").append(confirmedCases).css("font-size","21px").css("color","rgb(218, 136, 29)"));
            
            var deathsNumbersFormatted = mainData.deaths ? (mainData.deaths).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A"; 
            $(".totalSummary").append($("<td scoped>").append(deathsNumbersFormatted).addClass("text-danger").css("font-size","21px"));
            
            var recoveredNumbersFormatted = mainData.recovered ? (mainData.recovered).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A";
            $(".totalSummary").append($("<td>").append(recoveredNumbersFormatted).addClass("text-success").css("font-size","21px"));
            
            var newConfirmedNumbersFormatted= mainData.todayCases ? (mainData.todayCases).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'): "N/A"; 
            $(".totalSummary").append($("<td>").append(newConfirmedNumbersFormatted));
        
            var todaysDeath = mainData.todayDeaths ? (mainData.todayDeaths).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "N/A";
            $(".totalSummary").append($("<td scoped>").append(todaysDeath).addClass("lightRed").css("font-size","21px"));
            }
           }).fail( function(){
                alert("Could not find the API, try again later.");
           });
           
        });
        //-----------------------
        
    }
});