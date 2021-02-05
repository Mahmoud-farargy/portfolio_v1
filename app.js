
//BUDGET CONTROLLER
var budgetController= (function (){
        var Expense= function(id, description, value){
            this.id=id;
            this.description= description;
            this.value= value;
            this.percentage = -1;
        };
        Expense.prototype.calcPercentage= function(totalIncome){ //calculates the percentages
            if(totalIncome > 0){
                this.percentage= Math.round((this.value / totalIncome)* 100);
            }else{
                this.percentage= -1;
            }
        };
        Expense.prototype.getPercentage= function(){            //returns the percentages
            return this.percentage;
        };

        var Income= function(id, description, value){
            this.id= id;
            this.description= description;
            this.value= value;
        };
        var calculateTotal= function(type){
            var sum=0;
            data.allItems[type].forEach(function(current){
                sum+=current.value;
                data.totals[type] = sum;
            });
        };
        var data={
        allItems: {
            exp: [],        //Expense list
            inc: []         //Income list
        },
        totals: {
            exp: 0,     // sum of expenses
            inc: 0      //sum of income
        },
        budget:0,
        percentage:-1
    };
    return {
        addItem: function(type, des, val){
            var newItem, ID;
             //Create a new ID
            if (data.allItems[type].length >0){
                ID = data.allItems[type][data.allItems[type].length -1].id +1;
            }else{
                ID=0;
            }
            
            //Create a new item based on whether 'exp' or'inc' type
            if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }else if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            };
            //push it into our data structure
            data.allItems[type].push(newItem);
            //returns the new element
              return newItem;          
        },
        deleteItem: function(type, id){
            var ids, index;
            ids= data.allItems[type].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function(){
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //Calculate the budget: income - expenses
            data.budget= data.totals.inc - data.totals.exp;
            if(data.totals.inc >0){
                data.percentage= Math.round((data.totals.exp / data.totals.inc)* 100);
            }else{
                data.percentage= -1;
            }
            
            //Calculate the percentage of income that we spend
        },
        calculatePercentage: function(){
            data.allItems.exp.forEach(function (cur){       //forEach() loops but DOES not return an array
                cur.calcPercentage(data.totals.inc);
            });
        },
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){ //map() loops and returns an array
                return cur.getPercentage();
            });
                return allPerc;
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testing: function (){
            console.log(data);
        }
    };
})();


//UI CONTROLLER
var UIController=(function(){
   var DOMStrings={        //collected all the inputs here to access them easily from thoughout the document and also for an easy modification if you want to change these CSS classes
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: '.container',
        expensesPercLabel: '.item__percentage',
        monthLabel:'.budget__title--month'
    };
    var nodeListForEach = function(list, callbackFunc){
        for(var i=0; i<list.length; i++){
            callbackFunc(list[i], i)
        }
    };
    var formatNum = function(num, type){ //formatting output numbers to be better understood
        var numSplit, int, dec, type;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int= numSplit[0];
        if(int.length > 3){
            int= int.substr(0, int.length -3)+ "," + int.substr(int.length-3, 3); //if the number exceeds a thousand
        }
        if(int.length> 7){
            int= int.substr(0,int.length -7)+ ","+int.substr(int.length-6,6); //if the number exceeds a million
        }
        dec = numSplit[1];
        return (type === 'exp' ? '-' : '+') + " " + int + "." + dec;
    }
    return{
        getInput: function (){
            return {
                 type: document.querySelector(DOMStrings.inputType).value,  //will be either inc or exp
                 description: document.querySelector(DOMStrings.inputDescription).value,
                 value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function(obj,type){
            var html, newHtml, element;
            //Create HTML string with placeholder text
                element = DOMStrings.incomeContainer;
            if(type === 'inc'){ //the commented html structure of "income__list" has added here without spaces and surrounded by single quotes (since all the quotes inside are double quotes)
                html= '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times-circle"></i></button></div></div></div>'
            }else if( type === 'exp'){ //the commented html structure of "expenses__list" has added here without spaces and surrounded by single quotes
                element = DOMStrings.expensesContainer;
                html= '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times-circle"></i></button></div></div></div>'
            }
            //Replace the placeholder text with some data
            newHtml= html.replace('%id%', obj.id); 
            newHtml= newHtml.replace('%description%', obj.description);
            newHtml= newHtml.replace('%value%', formatNum(obj.value, type));

            //Insert HTML to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },  //deleting the selected item from the UI
        deleteListItem: function(selectedID){
            var el = document.getElementById(selectedID);
            el.parentNode.removeChild(el);
        },
        //clearing the input fields after proccessing them
        clearFields: function(){
            var fields, fieldArr;
            fields= document.querySelectorAll(DOMStrings.inputDescription + ', '+ DOMStrings.inputValue);
            fieldArr = Array.prototype.slice.call(fields);
            fieldArr.forEach(function (current, index, array) {
               current.value=""; 
            });
            //switching the focus from value field to description field
            fieldArr[0].focus();

        },
        displayBudget: function(obj){
            var type = obj.budget> 0 ? type = 'inc' : type= 'exp';
            document.querySelector(DOMStrings.budgetLabel).textContent=formatNum(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).innerHTML= formatNum(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).innerHTML= formatNum(obj.totalExp, 'exp');
            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).innerHTML=(obj.percentage)+"%";
            }else{
                document.querySelector(DOMStrings.percentageLabel).innerHTML= "---";
            }
            
        },
        displayPercentages: function(perc){
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index){
                if(perc[index] >0){
                    current.textContent = perc[index]+"%";
                }else{
                    current.textContent = "---";
                }
            });
        },
        displayMonth: function(){
            var month, months, year;
            months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            month = new Date().getMonth();
            year = new Date().getFullYear();
            document.querySelector(DOMStrings.monthLabel).textContent=(months[month] +" "+year);
        },
        changeStyle: function(){
            var path = document.querySelectorAll(
                DOMStrings.inputType + "," + DOMStrings.inputDescription +","+ DOMStrings.inputValue
            );
                nodeListForEach(path, function(cur){
                    cur.classList.toggle('red-focus');
                });
                document.querySelector(DOMStrings.inputBtn).classList.toggle('red'); //note: 'red-focus' and 'red' are CSS classes
        },
        getDOMStrings: function(){
            return DOMStrings; //Now, the DOMString Object can be accessed publicly.
        }
    }
})();

//GLOBAL APP CONTROLLER
var controller=(function(budgetCtrl,UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();// receives the getDOMStrings method from the UIController function.
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); //An event listener of the button

        document.addEventListener('keypress', function(event){ //Event Listener (keypress)
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);    //Deleting income/expenses lists

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeStyle); //changing colors of the input field outlines 
    };
    
    var updateBudget= function(){
        // 1-Calculate the budget
        budgetCtrl.calculateBudget();        //calling calculateBudget
        // 2-Return the budget
        var budget = budgetCtrl.getBudget(); //calling getBudget
        // 3-Display the budget on the UI
       UICtrl.displayBudget(budget);        //calling displayBudget
    };
    var updatePercentages = function(){
        // 1- Calculate percentages
        budgetCtrl.calculatePercentage();
        // 2- return the pecentages from the budget
        var percentages= budgetCtrl.getPercentages();
        // 3- update the UI with the new percentages 
        UICtrl.displayPercentages(percentages);
    }; 
    var ctrlAddItem= function (){
        var input, newItem;
        // 1- Get the field input data
    input = UICtrl.getInput();
        // 2- Add the item to the budget controller
    if(input.description !=="" && !isNaN(input.value) && input.value >0){ //Not letting the input information work unless the description field is not empty, the value field has a number and it must be more than 0;
        newItem = budgetCtrl.addItem(input.type, input.description, input.value); //calling the addItem function in budgetController and passing their three arguments here
        // 3- Add the item to the UI
        UICtrl.addListItem(newItem, input.type); //calling addListItem
        // 4- clear the input fields
        UICtrl.clearFields();
        // 5- Calculate the budget
            updateBudget();
        // 6- Calculate and update percentages
            updatePercentages();
        }
    };
    var ctrlDeleteItem= function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');        //chunking the string using .split() method
            type = splitID[0];
            ID = parseInt(splitID[1]);       //Converting the string into an integer number
            // 1-Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);    //Calling the deleteItem function and defining its parameters
            // 2-Delete the item from UI
            UICtrl.deleteListItem(itemID); //Calling the deleteListItem function and defining its parameters
            // 3-Update and show the new budget
            updateBudget();
            // 4- Calculate and update percentages
            updatePercentages();
        }
    };
    return {  //public scope
        initializationFunc: function(){
            console.log('Application has started');
            UICtrl.displayBudget({ //formatting UI Labels
                budget:0,
                totalExp:0,
                totalInc:0,
                percentage:-1
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }
    };
  

})(budgetController,UIController);

controller.initializationFunc();

// var convertStrToNum;
//  parseFloat(convertStrToNum= "20.50");
//  console.log(convertStrToNum);

// var percentage = Math.round((50 / 100)* 100);
// console.log(percentage + "%");

// var str="Mr Blue has a blue house and a blue car";
// var res= str.replace(/blue/gi, "red");
// console.log(res);
// var resUpper= str.replace(/blue | house|car/gi, function(x){
//     return x.toUpperCase();
// });
// console.log(resUpper);


//Mahmoud Farargy