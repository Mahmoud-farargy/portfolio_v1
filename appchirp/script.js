//MAHMOUD FARARGY 2020 ALL RIGHTS RESERVED
//APPCHIRP V 1.5

Vue.component("app-start",{
    data: function(){
        return {
                year: 2020,
        }
    },
    template:`
    <div>
                <div class="outerLayer-start">
                        <div class="main-menu d-flex flex-row row">
                                <div @click="calculatorDirection" class="task col-md-3">
                                    <i class="fas fa-calculator"></i>
                                    <h5>Calculator</h5>
                                </div>

                                <div  @click="clockDirection" class="task col-md-3">
                                    <i class="fas fa-clock"></i>
                                    <h5>Clock</h5>
                                </div>

                                <div @click="exchangeDirection"  class="task col-md-3">
                                    <img src="exchange-rate.png" style="width:85px; margin-bottom:5px;">
                                    <h5>Exchange Rate</h5>
                                </div>

                               <div @click="toDoListDirection"  class="task col-md-3">
                                    <i class="fas fa-tasks"></i>
                                    <h5>To-do List</h5>
                                </div>

                                <div @click="lyricsDirection" class="task col-md-3">
                                    <img src="lyrics-search.png" style="width:100px;">
                                    <h5>Lyrics Search</h5>
                                </div>
                                
                                <div  @click="timerDirection" class="task col-md-3">
                                <i class="fas fa-hourglass-half"></i>
                                    <h5>Timer</h5>
                                </div>

                                <div  @click="alarmDirection" class="task col-md-3">
                                        <img src="alarm3.png" style="width:90px;">
                                        <h5>Alarm Clock</h5>
                                </div>

                                <div  @click="scoreboardDirection" class="task col-md-3">
                                        <img src="Scoreboard.png" style="width:110px;">
                                        <h5>Scoreboard</h5>
                                </div>

                                <div  @click="flashlightDirection" class="task col-md-3">
                                        <img src="flashlight.png" style="width:86px;">
                                        <h5>Flashlight</h5>
                                </div>

                                <div  @click="stopwatchDirection" class="task col-md-3">
                                        <i class="fas fa-stopwatch"></i>
                                        <h5>Stopwatch</h5>
                                </div>
                                <div  @click="relaxerDirection" class="task col-md-3">
                                        <img src="Lungs.png" style="width:110px;">
                                        <h5 style="margin-top:-3px;">Breathing Exercise</h5>
                                </div>

                                <div  @click="worldclockDirection" class="task col-md-3">
                                <i class="fas fa-globe"></i>
                                    <h5>World Clock</h5>
                                </div>
                                
                    </div> 
            </div>    
                <audio id="buttonClicked">
                        <source src="mouse-click-sound.mp3" type="audio/mp3">
                        <source src="mouse-click-sound.mp3" type="audio/ogg">
                        <source src="mouse-click-sound.mp3" type="audio/mpeg">
                </audio>
                <footer>
                    <p class="text-white">&copy; {{year}} Created & designed by Mahmoud Farargy</p>
                </footer>
               
                
        </div>
    `,
    methods:{
        calculatorDirection(){ 
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-calculator";
        },
        clockDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "analogue-clock";
        },
        scoreboardDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-scoreboard";
        },
        timerDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-timer";
        },
        alarmDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp="app-alarm";
        },
        flashlightDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-flashlight";
        },
        stopwatchDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-stopwatch";
        },
        toDoListDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-todolist";
        },
        relaxerDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-relaxer";
        },
        worldclockDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-world-clock";
        },
        exchangeDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-exchangeRate";
        },
        lyricsDirection(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-lyrics";
            $(".container").css("padding-left","2px");
            $(".container").css("padding-right","2px");
        }
    },
    created(){
        this.year = new Date().getFullYear();
    }
});


Vue.component('app-calculator',{
    data: function(){
       return {
        calcInput: 0,
        num:0,
        lastOperation:"",
        results: [],
        isHistoryClicked: false
    }
},
template:`<div >
<div class="outerLayer">
<div class="calculator m-auto mt-5">
    <form>
        <div>
            <span style="background-color:rgb(29, 91, 143);"></span>
            <span style="background-color:rgb(72, 50, 197);"></span>
            <span style="background-color:rgb(57, 206, 94); margin-right:20px;"></span>

            <i v-if="results.length>0" @click="isHistoryClicked = !isHistoryClicked" class="fas fa-history open-history">
                <div v-if="isHistoryClicked" class="popup-arrow"></div>
                <ul v-if="isHistoryClicked" class="history-popup"> 
                    <li v-for="(result, index) in results" :key="index">{{result}}</li>
                </ul>
            </i>
        </div>
        <p class="text-muted">{{lastOperation}}</p>
        <input type="text" v-model="calcInput" class="calc-screen form-control" id="disableTyping">
    </form>
    <table>
            <tr>
                <td style="width:100%; background-color:rgb(134, 44, 218)">
                    <input type="button" class=" calc-btns" value="C" @click="clear" style="width:100%;">
                </td>

                <td >
                <input type="button" class=" calc-btns" value="CE">
                </td>

                <td >
                    <button class=" calc-btns" @click="back"><i class="fas fa-long-arrow-alt-left fa-lg"></i></button>
                </td>
                
                <td  style="background-color:rgb(45, 116, 230)">
                    <input type="button" class=" calc-btns" value="√" @click="sqrt">
                </td>
                
                <td>
                    <input type="button" class="calc-btns" value="x²" @click="square">
                </td>
                
            </tr>
            <tr>

                <tr>
                        <td>
                            <input type="button" class="calc-btns " value="7"@click="insert(7)">
                        </td>
        
                        <td>
                            <input type="button" class=" calc-btns" value="8"@click="insert(8)">
                        </td>
        
                        <td>
                            <input type="button" class=" calc-btns" value="9"@click="insert(9)">
                        </td>
        
                        <td  class="colorRightRow">
                            <input type="button" class=" calc-btns" value="/" @click="insert('/')"> 
                        </td>

                        <td>
                                <input type="button" class=" calc-btns " value="sin" @click="sin">
                        </td>
                        
                    </tr>

                    <tr>
                        <td>
                                <input type="button" class="calc-btns " value="4"@click="insert(4)">
                        </td>
            
                        <td>
                            <input type="button" class="calc-btns " value="5"@click="insert(5)">
                        </td>
            
                        <td>
                            <input type="button" class="calc-btns " value="6"@click="insert(6)"> 
                        </td>
            
                        <td  class="colorRightRow">
                            <input type="button" class="calc-btns " value="*"@click="insert('*')"> 
                        </td>

                        <td>
                            <input type="button" class=" calc-btns" value="cos" @click="cos"> 
                        </td>
                        
                    </tr>

                    <tr>
                        <td>
                            <input type="button" class=" calc-btns "  value="1" @click="insert(1)">
                        </td>
                
                        <td>
                            <input type="button" class=" calc-btns " value="2"@click="insert(2)">
                        </td>
        
                        <td>
                            <input type="button" class=" calc-btns " value="3"@click="insert(3)">
                        </td>
                
                        <td  class="colorRightRow">
                            <input type="button" class=" calc-btns "value="-"@click="insert('-')">
                        </td>

                        <td>
                            <input type="button" class=" calc-btns " value="tan"@click="tan"> 
                        </td>

                    </tr>
                    <tr>
                            <td>
                                <input type="button" class="calc-btns" value="0" @click="insert(0)"> 
                            </td>
                    
                            <td>
                                <input type="button" class="calc-btns" value="."@click="insert('.')"> 
                            </td>
                    
                            <td>
                                <input type="button" class="calc-btns" value="+"@click="insert('+')"> 
                            </td>
                    
                            <td class="equalsBtn">
                                <input type="button" class="calc-btns" value="=" @click="run()"> 
                            </td>
                            <td>
                                <input type="button" class="calc-btns" value="log" @click="log">
                            </td> 
                    </tr>                                 
    </table>
    <audio id="clickSound">
        <source src="button-click.mp3" type="audio/mp3">
        <source src="button-click.mp3" type="audio/ogg">
        <source src="button-click.mp3" type="audio/mpeg">
    </audio>
    <audio id="buttonClicked">
        <source src="mouse-click-sound.mp3" type="audio/mp3">
        <source src="mouse-click-sound.mp3" type="audio/ogg">
        <source src="mouse-click-sound.mp3" type="audio/mpeg">
    </audio>
</div>
<footer class="py-5"  style="padding-top:96px;">
<div class="d-block mobile-scale">
        <button class="btn btn-dark btn-lg m-2 mb-4" @click="changeToQuiz">Test your mathematical knowledge</button>
        <button  @click="changeToMain" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
</div>
        <div class="fixed-bottom bottom-section menuBtnShowDesktop" >

                   <span class="divider"></span>
                    <button @click="changeToMain" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
</footer>
</div>

</div>`
,
    methods:{
            disableTextField: function(){
                document.getElementById("disableTyping").disabled= true;
            },
            insert: function(num){
                this.disableTextField();
                this.num = num;
                if(/^[0]/.test(this.calcInput)){
                    if(!/^[-|+|*|/]/.test(num)){ //prevents inserting value if it begins with calculation signs
                        this.calcInput = `${""}${num}`;
                    }
                }else{ //prevents adding two calculation signs in a row
                    if(/[-|+|/|*]/.test(num) && /[-|+|/|*]/.test(this.calcInput.toString().split("").reverse().join()[0])){
                        console.log("prevented");
                    }else{
                        this.calcInput = `${this.calcInput}${num}`;
                    }
                    
                }
                
            },
            run: function(){
                document.getElementById("clickSound").play();
                var exp = this.calcInput;
                if(exp){
                    if(/[-|+|*|/]/.test(exp)){
                        this.lastOperation= `${this.calcInput}`;
                        this.results.unshift(`${this.calcInput} = ${eval(exp)}`);
                    this.calcInput = eval(exp);
                    }
                }
                
            },
            clear: function(){
                this.calcInput= 0;
                this.lastOperation= ""
            },
            back: function(){
                if(this.calcInput.length>0){
                    var exp = this.calcInput 
                    this.calcInput = exp.substring(0, exp.length-1);
                }
            },
            square: function(){
                this.calcInput = this.calcInput * this.calcInput;
            },
            sqrt: function(){
                if(this.calcInput.length>0){
                    this.calcInput = Math.sqrt(this.calcInput);
                }
                
            },
            sin: function(){
                if(this.calcInput.length>0){
                    this.calcInput = Math.sin(this.calcInput);
                }
            },
            cos:function(){
                if(this.calcInput.length>0){
                    this.calcInput = Math.cos(this.calcInput);
                }
            },
            log: function(){
                if(this.calcInput.length>0){
                    this.calcInput = Math.log(this.calcInput);
                }
            },
            tan: function(){
                if(this.calcInput.length>0){
                    this.calcInput = Math.tan(this.calcInput);
                }
            },
            changeToQuiz(){
                mainApp.switchComp = 'app-math-quiz';
            },
            changeToMain(){
                mainApp.clickSoundEffect();
                mainApp.switchComp = 'app-start';
            },
    }
    // ,
    // created(){
    //     this.disableTextField();
    // }
});


Vue.component('app-math-quiz',{
    data: function(){
        return{
            mode:'app-questions'

        }
    },
    template:`
        <div class="main-quiz">
            <h2 class="text-center py-2 text-white">The Super Quiz</h2>
            <hr>
            <div class="row m-auto mb-5">
            <div class="col-md-7 col-sm-12 m-auto ">
                <transition name= "flip" mode="out-in">
                    <component :is="mode" @answered="answered($event)" @confirmed="mode='app-questions'" key=""></component>
                </transition>
                <button class="btn muteBtn" @click="muteQuizSound" style="background-color: rgba(216, 215, 215, 0.2);"><i class=" fas fa-volume-up fa-lg"></i></button>
            </div>
            </div>
        <footer class="quiz-footer">
            
            <button class="btn btn-dark calc-switch-btn mb-3" @click="changeToCalc">Return back to calculator</button>
        </footer> 
        <audio id="correctAnswer2">
            <source src="Right-answer.mp3" type="audio/mp3">
            <source src="Right-answer.mp3" type="audio/mpeg">
            <source src="Right-answer.mp3" type="audio/ogg">
            test
        </audio>
        <audio id="wrongAnswer2">
            <source src="wrong-buzzer.mp3" type="audio/mp3">
            <source src="wrong-buzzer.mp3" type="audio/mpeg">
            <source src="wrong-buzzer.mp3" type="audio/ogg">
            test
        </audio>
</div>


    `,
    methods:{
            answered(isCorrect){
                if(isCorrect){
                    this.mode= "app-answer";
                    this.playCorrectSound();
                }else if(!isCorrect){
                    this.mode = "app-questions";
                    if(mainApp.muteQuiz == false){
                       document.getElementById("wrongAnswer2").play(); 
                    }

                    alert("Wrong answer, try again!");
                }
            },
            changeToCalc(){
                mainApp.switchComp='app-calculator';
            },
            playCorrectSound: function(){
                if(mainApp.muteQuiz == false){
                   document.getElementById("correctAnswer2").play();  
                }
            },
            muteQuizSound(){
                if(mainApp.muteQuiz === false){
                    mainApp.muteQuiz = true;
                   document.querySelector(".muteBtn").innerHTML = "<i class='fas fa-volume-mute fa-lg'></i>"
                }else if(mainApp.muteQuiz === true){
                    mainApp.muteQuiz = false;
                    document.querySelector(".muteBtn").innerHTML = "<i class='fas fa-volume-up fa-lg'></i>"
                }
                
            }
            
    }
});
const MODE_ADDITION = 1;
const MODE_SUBTRACTION = 2;
const MODE_MULTIPLICATION = 3;

Vue.component('app-questions',{
    
    data: function(){
        return {
            question: 'Sorry, an error occured',
            timeLeft: "00:30",
            seconds:30,
            mins: 1,
            btnData: [
                {correct: true, answer:0},
                {correct: false, answer:0},
                {correct: false, answer:0},
                {correct: false, answer:0}
            ],
            stopTimer: false,
            quizInterval: ""
        }
        
    },
    template:`
    <div>
        <div class="card my-3 card-answers">
            <div class="card-header text-center bg-light py-2">
                <h4>{{question}}</h4><span class="text-right">{{timeLeft}}</span>
            </div>
            <div class="card-body" >
                <div class="row pt-3 quizCard">
                        <div class="col-md-6 mb-3">
                    <button class="btn btn-primary btn-lg" @click="onAnswer(btnData[0].correct)">{{btnData[0].answer}}</button>
                        </div>
                        <div class="col-md-6 mb-3">
                    <button class="btn btn-primary btn-lg" @click="onAnswer(btnData[1].correct)">{{btnData[1].answer}}</button>
                        </div>
                        <div class="col-md-6 mb-3">
                    <button class="btn btn-primary btn-lg" @click="onAnswer(btnData[2].correct)">{{btnData[2].answer}}</button>
                        </div>
                        <div class="col-md-6 mb-3">
                    <button class="btn btn-primary btn-lg" @click="onAnswer(btnData[3].correct)">{{btnData[3].answer}}</button>
                        </div>
                </div>
                
            </div>
            
        </div>
        <audio id="buzzSound">
            <source src="fail-trumpet-01.mp3" type="audio/mp3">
            <source src="fail-trumpet-01.mp3" type="audio/mpeg">
            <source src="fail-trumpet-01.mp3" type="audio/ogg">
        </audio>
        
    </div>
    `,
    methods:{
        generateQuestion(){
            const firstNumber = this.generateRandomNumber(1,100);
            const secondNumber = this.generateRandomNumber(1,100);
            const operationMode = this.generateRandomNumber(1,3);
            let correctAnswer =0;
            switch(operationMode){ //Generate Questions
                case MODE_ADDITION:
                    correctAnswer = firstNumber + secondNumber;
                    this.question = `What's ${firstNumber} + ${secondNumber}?`
                break;
                case MODE_SUBTRACTION:
                    var largestNum = Math.max(firstNumber, secondNumber);
                    var lowestNum = Math.min(firstNumber,secondNumber);
                    correctAnswer =  largestNum - lowestNum;
                    this.question = `What's ${largestNum} - ${lowestNum}?`
                 break;
                 case MODE_MULTIPLICATION:
                     correctAnswer= firstNumber * secondNumber;
                     this.question =  `What's ${firstNumber} x ${secondNumber}?`
                break;
                default:
                    correctAnswer= 0;
                    this.question = 'Oops, an error occurred';
            }  
            this.btnData[0].answer= this.generateRandomNumber(correctAnswer - 10, correctAnswer +10, correctAnswer);
            this.btnData[0].correct =false;
            this.btnData[1].answer= this.generateRandomNumber(correctAnswer - 10, correctAnswer +10, correctAnswer);
            this.btnData[1].correct =false;
            this.btnData[2].answer= this.generateRandomNumber(correctAnswer - 10, correctAnswer +10, correctAnswer);
            this.btnData[2].correct =false;
            this.btnData[3].answer= this.generateRandomNumber(correctAnswer - 10, correctAnswer +10, correctAnswer);
            this.btnData[3].correct =false;

            const correctButton = this.generateRandomNumber(0,3);
            this.btnData[correctButton].correct=  true;
            this.btnData[correctButton].answer = correctAnswer;
            
            // var seconds = 30;
            // var mins= 2;
            // var timeDifference = this.timeLeft;
            // this.timeLeft = 373;
            
            this.tick();
                // if(this.seconds > 0){
                //     setTimeout(this.tick(), 1000);
                // }
                
            // } 
            // tick(this.timeLeft);
            
            
            
            

        },
        generateRandomNumber(min,max, except){
            const rndNumber = Math.round(Math.random() * (max-min)) + min;
            if(rndNumber == except){
                return this.generateRandomNumber(min, max, except);
            }
            return rndNumber;
        },
        onAnswer(isCorrect){
                this.$emit('answered', isCorrect);
                this.stopTimer = true;
                if(isCorrect){
                    clearInterval(this.quizInterval);
                }
        },
        tick: function(){
            var current_time = this.mins -1;
            this.seconds--;
            this.timeLeft = current_time.toString() + ":" + (this.seconds<10 ? "0" : "") + String(this.seconds);
            
            if(this.seconds > 0){
               this.quizInterval = setTimeout(this.tick, 1000);
            }else{
                this.seconds= 0;
                this.$emit('confirmed');
                this.timeLeft = "Time's up. Think again!";
                clearTimeout(this.quizInterval);
                this.stopTimer =true;
                this.playBuzzSound();
            }
            
        },
        playBuzzSound(){
            if(mainApp.muteQuiz == false){
                document.getElementById("buzzSound").play();
            }
            
        }
    },
    created: function(){
        this.generateQuestion();
    }
});

Vue.component('app-answer',{
        template:`
    <div class="alert alert-success text-center">
    <audio id="correctAnswer2">
            <source src="Right-answer.mp3" type="audio/mp3">
            <source src="Right-answer.mp3" type="audio/mpeg">
            <source src="Right-answer.mp3" type="audio/ogg">
            test
    </audio>
            <h1>That's Correct!</h1>
            <hr>
            <button class="btn btn-primary my-5" @click="onNextQuestion">Next Question</button>
    </div>
        `,
        methods:{
            onNextQuestion: function(){    
                this.$emit('confirmed');
            }
        }
});

Vue.component("analogue-clock",{
    data: function(){
        return {
            isFullScreenClock: false,
            x: ""
        }
    },
    template:  `
    <div>
    
        <div class="analogue-body">
        <button v-if="isFullScreenClock" class="btn text-primary mr-3 mb-3" @click="exitFullScreenClock" style="width:40px; outline:none; font-size:40px; font-weight:bold;">&times;</button>
        <button v-if="!isFullScreenClock" class="btn mt-3 mb-5 text-light" @click="fullScreenClock"><i class="fas fa-expand fa-2x"></i></button>
            <div class="clock">
                <div class="hours">
                    <div class="hrs" id="hrs"></div>
                </div>
                <div class="minutes">
                    <div class="mins" id="mins"></div>
                </div>
                <div class="seconds">
                    <div class="secs" id="secs"></div>
                </div>

            </div>
        <footer class="mb-5"> 
        <div class="d-block mobile-scale">
            <button v-if="!isFullScreenClock" class="btn btn-primary m-2 mb-3" @click="changeToDigital">Switch to Digital Clock</button>
            <button  @click="changeToMain" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
            <div class="fixed-bottom bottom-section menuBtnShowDesktop" >

                    <span class="divider"></span>
                        <button v-if="!isFullScreenClock"  @click="changeToMain" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
            </div>
        </footer>
        <audio id="buttonClicked">
            <source src="mouse-click-sound.mp3" type="audio/mp3">
            <source src="mouse-click-sound.mp3" type="audio/ogg">
            <source src="mouse-click-sound.mp3" type="audio/mpeg">
        </audio>
    </div>
        
    </div>   
    `,
    methods:{
      showTime(){
            if(mainApp.switchComp === "analogue-clock"){
               this.x = setInterval(()=>{
                var hours = document.getElementById("hrs");
                var minutes = document.getElementById("mins");
                var seconds = document.getElementById("secs");
                let degree= 6;
                let hrs = new Date().getHours() * 30;
                let mins = new Date().getMinutes() * degree;
                let secs =  new Date().getSeconds() * degree;
                hours.style.transform = `rotateZ(${hrs + (mins/12)}deg)`;
                minutes.style.transform = `rotateZ(${mins}deg)`;
                seconds.style.transform = `rotateZ(${secs}deg)`;
                },1000);
            }else{
                 clearInterval(this.x);
            } 
            
             
            
        },
        changeToDigital(){
            window.clearInterval(this.x);
            mainApp.switchComp = "digital-clock";
        },
        changeToMain(){
            window.clearInterval(this.x);
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-start";
        },
        fullScreenClock(){
            this.isFullScreenClock= true;
            if (document.querySelector(".analogue-body").requestFullscreen) {
                document.querySelector(".analogue-body").requestFullscreen();
              } else if (document.querySelector(".analogue-body").mozRequestFullScreen) {
                document.querySelector(".analogue-body").mozRequestFullScreen();
              } else if (document.querySelector(".analogue-body").webkitRequestFullscreen) {
                document.querySelector(".analogue-body").webkitRequestFullscreen();
              } else if (document.querySelector(".analogue-body").msRequestFullscreen) { /* IE/Edge */
                document.querySelector(".analogue-body").msRequestFullscreen();
              }
        },
        exitFullScreenClock(){
            this.isFullScreenClock=false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { 
                document.msExitFullscreen();
              }
            
        }
    },
    created(){
            this.showTime();
    }
});

Vue.component("digital-clock",{
        data:function() {
            return{
                hrs: 00,
                mins: 00,
                secs:00,
                period: "AM",hrs: 00,
                mins: 00,
                secs:00,
                period: "AM",
                dateNow: ""
            }
        },
        template:`
        <div style=" display:block">
        <div  id="digClock" class="container">
            <div class="desktop-digital-clock">
                <div class="time-overlay">
                            <div class="time period">
                                <p class="period-text">{{period}}</p>
                                <h2 >{{hrs}}</h2>
                            
                            </div>
                        <div class="format">
                            <h3>Hours</h3>  
                        </div>
                    </div>
                    
                        
                    <div class="time-overlay">
                        <div class="time">
                            <h2>{{mins}} </h2>

                        </div>
                        <div class="format">
                            <h3>Minutes</h3> 
                        </div>
                    </div> 

                    <div class="time-overlay">
                        <div class="time" style="background-color:#ff006a;">
                            <h2 >{{secs}}</h2>

                        </div>
                        <div class="format" style="background-color:#cf0a5c;">
                            <h3>Seconds</h3>
                        </div>
                    </div>    
                    
            </div>
                
                <h2 class="mobile-digital-clock text-white">{{hrs}}: {{mins}}: {{secs}} {{period}}</h2>
                <h3 class="text-light mt-5">{{dateNow }}</h3>
                    
            <footer class=" py-5">
                <button class="btn text-white buttons-top" @click="changeToAnalogue" style="background-color:RGB(195, 68, 122);">Return to Analogue Clock</button>
            </footer>
        </div>
        
    </div>
        `,
        methods:{
            digitalTime(){
                

                
                    var hours= new Date().getHours();
                    var minutes= new Date().getMinutes();
                    var seconds= new Date().getSeconds();

                    if(hours >12){
                        this.hrs = hours -12
                    }else{
                        this.hrs = hours;
                    }
                    if(hours == 0){
                        this.hrs =12;
                    }

                    if(minutes < 9 ){
                        this.mins =  "0" +minutes;
                    }else{
                        this.mins = minutes;
                    }
                    
                
                    if(this.secs < 9){
                        this.secs = "0"+ seconds;
                    }else{
                        this.secs = seconds;
                    }
                    if(hours > 12){
                        this.period= "PM";
                    }else{
                        this.period = "AM";
                    }
                   var  year = new Date().getFullYear();
                   var getMonth = new Date().getMonth();
                   var getDay = new Date().getDay();
                   var date = new Date().getDate();

                   var  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                   var  month = monthArray[getMonth];

                   var weekDaysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                   var day = weekDaysArray[getDay];
                   this.dateNow = day + " - " +month +". " + date + " "+year;
                    
                
            },
            changeToAnalogue(){
                window.clearInterval(this.digitalTime);
                mainApp.switchComp = "analogue-clock";
            }
    },
    created(){
        window.setInterval(this.digitalTime,1000);
    }
});
Vue.component("app-scoreboard",{
    data: function(){
        return{
            plScore: 0,
            players:[],
            count: 0,
            timerInProgress: false,
            timeLeft2: "0h 0m 0s",
            timeSpecified: "",
            timerProgressWidth: 60,
            timerFired: false,
            timerFieldEmpty: false
        }
    },
    template:`
    <div class="row" style="text-transform: uppercase; display:flex; flex-direction:column; margin-top:60px;">
                <div class="scoreboard-width">
                    <div class="card card-scoreboard">
                        <div class="card-header d-flex card-header-scoreboard">
                            <div class="align-left mr-auto">
                                <h6>Players:<span class="text-white"> {{players.length}}</span></h6>
                                <h6>Total Points:<span class="text-white"> {{plScore}}</span></h6>
                            </div>

                            <div class="d-flex flex-column align-items-center my-3">
                                <h1 class="main-title mx-center">SCOREBOARD</h1>
                            <button v-if="players.length>0" class="btn btn-dark reset" @click="resetAll">Rest All</button>
                            </div>

                            <div class="align-right ml-auto">
                                <p>Timer</p>
                                <h5 id="timer">{{timeLeft2}}</h5>
                                <div class="d-flex flex-column" style="height:40px;">
                                    <a data-toggle="modal" data-target="#openTimer" class="btn btn-dark btn-sm mb-2">open</a>
                                    <a class="btn btn-dark btn-sm mb-2" v-if="timerInProgress" @click="stopTimer">Stop timer</a>
                                    <a class="btn btn-danger btn-sm  " v-if="timerFired" @click="stopTimerSound">Ok</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body card-body-scoreboard">
                            <ul>
                                <transition-group name="fade">
                                <li v-for="(player, index) in players" :key="player">
                                    
                                    <h4 class='players-name'>{{player}}</h4>
                                    <player-list @totalScore="fromTheChild" @player-deleted="deletePlayer(index)"></player-list>
                                </li>
                                </transition-group>
                                
                            </ul>
                        </div>
                        <div class="card-footer card-footer-scoreboard">
                            <div class="input-group">
                                <input autofocus v-on:keyup.enter="addPlayer" data-toggle="tooltip" data-placement="bottom" title="Enter 10 characters maximum" id="playersAdded" class="form-control scoreboard-input mr-3" type="text" placeholder="Add player..">
                                <div  class="input-group-append">
                                     <button  @click="addPlayer" class='btn btn-dark btn-md'>Add Player</button>
                                </div> 
                            </div>
                            <p class="text-muted text-center my-1">&copy; 2020 Mahmoud Farargy</p>  
                        </div>
                    </div>
                    
                    <div class="modal fade" id="openTimer">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header py-2">
                                <h2 data-dismiss="modal">&times;</h2>
                                <h4 class="text-center text-primary text-capitalize mt-2">Edit Timer</h4>
                            </div>
                            <div class="modal-body text-center">
                                <div v-if="timerFired" style="width:100%;" class="text-center">
                                    <h2 class="animateTimerEnd">Time's up</h2>
                                </div>
        
                                <h2>{{timeLeft2}}</h2>
        
                                <input v-if="!timerInProgress" @keyup.enter= "startTimer" placeholder="Time by seconds" type="number" v-model="timeSpecified" class="timerStyle mb-2">
                                <div v-if="timerFieldEmpty" class="alert alert-danger text-center m-auto p-1" style="width:80%;">
                                    <p class="text-capitalize">Time must be specified to proceed.</p>
                                </div>
                                
        
                                
                            </div>
                            <div v-if="timerInProgress" class="progress progress-sm  mt-4" style="height:2px;">
                                    <div :style="[timerProgressBar]" class="progress-bar bg-primary">
                                    </div>
                                </div>
                            <div class="modal-footer d-flex justify-content-center">
                                
                                <button class="btn btn-primary btn-sm mr-2" v-if="!timerInProgress" @click="startTimer">Start</button>
                                <button class="btn btn-sm mr-2" v-if="timerInProgress" @click="stopTimer" style="background-color:rgb(216, 215, 215); color:rgb(82, 80, 80)">Stop timer</button>
                                <button class="btn btn-danger btn-sm mr-2" v-if="timerFired" @click="stopTimerSound">Ok</button>
                                <button class="btn btn-secondary ml-auto" data-dismiss="modal">Close</button>
                            </div>
                        
                        
                            <audio id="timerSound">
                                    <source src="Old-clock-ringing-sound-effect.mp3" type="audio/mp3">
                                    <source src="Old-clock-ringing-sound-effect.mp3" type="audio/ogg">
                                    <source src="Old-clock-ringing-sound-effect.mp3" type="audio/mpeg">
                           </audio>
                            </div>
                        </div>   
            </div>
                <footer class="my-5">
                <button  @click="changeToMenu" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
                    <div class="fixed-bottom bottom-section menuBtnShowDesktop" >

                        <span class="divider"></span>
                        <button @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
                    </div>
                </footer>
                <audio id="buttonClicked">
                    <source src="mouse-click-sound.mp3" type="audio/mp3">
                    <source src="mouse-click-sound.mp3" type="audio/ogg">
                    <source src="mouse-click-sound.mp3" type="audio/mpeg">
                </audio>
                <audio id="tickingClock">
                    <source src="Clock-ticking-Turning-1.mp3" type="audio/mp3">
                    <source src="Clock-ticking-Turning-1.mp3" type="audio/ogg">
                    <source src="Clock-ticking-Turning-1.mp3" type="audio/mpeg">
                </audio>
                </div>
                </div>
        </div>   
    `,
    methods:{
        increase: function(){
            this.plScore++;
        },
        decrease: function(){
            if(this.plScore >0){
                this.plScore--;
            }
        },
        resetAll: function(){
            if(confirm("All players will be deleted. Proceed?")){
                this.plScore= 0;
                this.players= [];
            }
        },
        addPlayer: function(){
            var playerList = document.getElementById("playersAdded").value;
            if(playerList !="" && playerList.length<=10){
                this.players.push(playerList);
                document.getElementById("playersAdded").value="";
            }
        },
        deletePlayer(index){
            console.log(index);
            if(confirm("Delete player?")){
                this.players.splice(index,1);
            };
        },
        changeToMenu(){
            mainApp.clickSoundEffect();
            mainApp.switchComp ="app-start";
        },
        testVal(value){
            console.log(value);
        }
        ,
        convertSeconds(s){            
                var sec = s % 60;
                var secInMinutes = (s- sec) /60;
                var min = secInMinutes %60;
                var hr = (secInMinutes - min) /60;
                 if(sec<10){
                    return hr + "h" + " " + min + "m" + " "+ 0+sec + "s";
                 }
                 return hr + "h" + " "+ min + "m" +" "+ sec + "s";
             },
             startTimer(){
                var base = 0;
                var interval;
                var progress;
                if(this.timeSpecified > 0){
                        interval = setInterval(()=>{
                        this.timerInProgress = true;
                        this.timerFired= false;
                        this.timeSpecified--;
                            progress = this.timeSpecified - base;
                        this.timeLeft2 = this.convertSeconds(this.timeSpecified - base);
                        document.getElementById("timerSound").pause();
                        this.timerProgressWidth = (progress / 100) *100;
                    if(this.timeSpecified == 0){
                        clearInterval(interval);
                        this.playTimerSound();
                        document.getElementById("tickingClock").pause();
                        this.timeLeft2 ="0:00";
                        this.timeSpecified= "";
                        this.timerFired = true;
                        this.timerInProgress =false;
                    }
                    if(this.timeSpecified <= 10 && this.timeSpecified >0){
                        mainApp.playTickingClock();
                    }
                    if(this.timeSpecified < 0){
                        clearInterval(interval);
                        this.timeLeft2 ="Timer Stopped";
                        this.timeSpecified ="";
                        this.timerInProgress =false;
                        this.timerFired =false;
                        document.getElementById("tickingClock").pause();
                    }
                    this.timerFieldEmpty = false;
                },1000);
                
             }else{
                    this.timerFieldEmpty = true;
             }
             
            },
            playTimerSound(){
                document.getElementById("timerSound").play();
            },
            stopTimerSound(){
                this.timerFired = false;
                document.getElementById("timerSound").pause();
                document.getElementById("tickingClock").pause();
                
            },
            stopTimer(){
                this.timeSpecified = -5;
                document.getElementById("tickingClock").pause();
                
            },
            fromTheChild(value){
                this.plScore = value;
                console.log(value);
            }
        },
        computed:{
            timerProgressBar: function(){
                return{
                    width: this.timerProgressWidth +'%'
                } 
            }
        
        },
        
});

Vue.component('player-list',{
    data: function(){
        return {
            plScore:0
        }
        
    },
    template: "<li class='list-item'><i class='far fa-times-circle close text-danger' @click='deletePlayer' ></i><div class='details ml-auto'><button @click='decrease'class='minus'> - </button><h3 class='player-1-score score'>{{plScore}}</h3><button @click='increase' class='plus'> + </button></div></li>",
    methods:{
        increase: function(){
            this.plScore++;
        },
        decrease: function(){
            if(this.plScore >0){
                this.plScore--;
            }
        },
        resetAll: function(event){
            this.$emit("test", this.plScore);
        },
        deletePlayer(index){
            this.$emit("player-deleted", index);
        },
        emitToParent(value){
            // value =this.plScore;
            this.$emit("totalScore", this.plScore);
            
        }
    },
    created(){
        this.emitToParent();
        
    }
});

Vue.component("app-timer",{
    data: function(){
        return{
            timer: "00:00",
            timerInProgress: false,
            timeLeft2: "0h 0m 0s",
            timeSpecified: 0,
            timerProgressWidth: 60,
            timerFired: false,
            timerFieldEmpty: false,
            seconds: 0,
            minutes: 0,
            hours: 0,
            timerInterval: "",
            toggleTimerBtn: true
        }
    },
    template: `
    <div class="pt-5" style="min-height:100%;">
    <div class="card timerBody m-auto mt-5">
        <div class="card-header p-2">
            <h4 class="text-primary text-center">Timer</h4>
        </div>
        <div class="card-body text-center">
            <div v-if="timerFired" style="width:100%;" class="text-center">
                <h2 class="animateTimerEnd">Time's up</h2>
            </div>

            <h2>{{timeLeft2}}</h2>
            <div v-if="!timerInProgress" class="row mainTimer">
                    <div class="form-group col-md-3 d-block">
                        <label for="hours">Hours</label><br/>
                        <input id="hours" max="5" min="0" @keyup.enter= "startTimer" placeholder="00" type="number" v-model="hours" class="timerStyle mb-1 form-control" min=0>
                    </div>

                    <div class="form-group col-md-3 d-block">
                        <label for="minutes">Minutes</label><br/>
                        <input id="minutes" max="60" min="0"  @keyup.enter= "startTimer" placeholder="00" type="number" v-model="minutes" class="timerStyle mb-1 form-control" min=0 max=59>           
                    </div>

                    <div class="form-group col-md-3 d-block">
                        <label for="seconds">Seconds</label><br/>
                        <input id="seconds" max="60" min="0" @keyup.enter= "startTimer" placeholder="Time by seconds" type="number" v-model="seconds" class="timerStyle mb-1 form-control" min=0 max=59>
                    </div>

            </div>
            
            <div v-if="timerFieldEmpty" class="alert alert-danger text-center m-auto p-1 " style="width:80%; margin-top:100px;">
                <p>Time must be specified to proceed</p>
            </div>
            

            
        </div>
        <div v-if="timerInProgress" class="progress progress-sm  mt-4" style="height:2px;">
                <div :style="[timerProgressBar]" class="progress-bar bg-primary">
                </div>
            </div>
        <div class="card-footer d-flex justify-content-center">
            
            <button class="btn btn-primary btn-sm mr-2"  v-if="!timerInProgress" @click="startTimer">Begin</button>
            <!--<button class="btn btn-sm mr-2" v-if="timerInProgress" @click="pauseNContinue" :class="{stopTimer:this.toggleTimerBtn}">Stop timer</button>-->
            <button class="btn btn-sm btn-danger mr-2" @click="reset" :disabled="!timerInProgress">Reset</button>
            <button class="btn btn-danger btn-sm mr-2" v-if="timerFired" @click="stopTimerSound">Ok</button>
        </div>
    </div>
    <audio id="timerSound">
        <source src="Old-clock-ringing-sound-effect.mp3" type="audio/mp3">
        <source src="Old-clock-ringing-sound-effect.mp3" type="audio/ogg">
        <source src="Old-clock-ringing-sound-effect.mp3" type="audio/mpeg">
    </audio>

    <footer class="timerTip" style="flex-direction: column; margin: 70px auto 50px auto;">
    <div class="text-center alert alert-info">
        <p>Tip: If you're using a mobile device, extend the screen timeout period during the use of this timer for better performace.</p>
    </div>
    <button class="btn btn-info my-3 mx-auto" v-if="!timerInProgress" @click="changeToPomodoro">Switch to Pomodoro Timer</button>
    <audio id="buttonClicked">
            <source src="mouse-click-sound.mp3" type="audio/mp3">
            <source src="mouse-click-sound.mp3" type="audio/ogg">
            <source src="mouse-click-sound.mp3" type="audio/mpeg">
    </audio>
    <audio id="buttonClicked2">
            <source src="button-click2.mp3" type="audio/mp3">
            <source src="button-click2.mp3" type="audio/ogg">
            <source src="button-click2.mp3" type="audio/mpeg">
    </audio>
    <audio id="tickingClock">
        <source src="Clock-ticking-Turning-1.mp3" type="audio/mp3">
        <source src="Clock-ticking-Turning-1.mp3" type="audio/ogg">
        <source src="Clock-ticking-Turning-1.mp3" type="audio/mpeg">
    </audio>
    <button  @click="changeToMenu" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
            <div class="fixed-bottom bottom-section menuBtnShowDesktop" >

                <span class="divider"></span>
                <button @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
            </div>
    </footer>
</div>
        ` ,
    computed:{
        timerProgressBar: function(){
            return{
                width: this.timerProgressWidth +'%'
            } 
        }
    },
    methods:{
         convertSeconds(s){            
            var sec = s % 60;
            var secInMinutes = (s- sec) /60;
            var min = secInMinutes %60;
            var hr = (secInMinutes - min) /60;
             if(sec<10){
                return hr + "h" + " " + min + "m" + " "+ 0+sec + "s";
             }
             return hr + "h" + " "+ min + "m" +" "+ sec + "s";
         },
         startTimer(){
                            //converts the hours, minutes and seconds into a total number which you can decrease later using setInterval
            this.timeSpecified = (Number(this.hours) * 60 + Number(this.minutes)) * 60 + Number(this.seconds);
            
            var base = 0;
            var progress;
            if(Number(this.timeSpecified) > 0){
                this.beginTimerSound();
                this.timerInterval = setInterval(()=>{ 
                    this.timerInProgress = true;
                    this.timerFired= false;
                    this.timeSpecified--;
                        progress = this.timeSpecified - base;
                    this.timeLeft2 = this.convertSeconds(this.timeSpecified - base);
                    document.getElementById("timerSound").pause();
                    this.timerProgressWidth = (progress / 100) *100;
                if(this.timeSpecified == 0){
                    clearInterval(this.timerInterval);
                    this.playTimerSound();
                    this.timeLeft2 ="0:00";
                    this.timeSpecified= "";
                    this.timerFired = true;
                    this.timerInProgress =false;
                }
                if(this.timeSpecified <= 10 && this.timeSpecified >0){
                    mainApp.playTickingClock();
                }
                if(this.timeSpecified < 0){
                    clearInterval(this.timerInterval);
                    this.timeLeft2 ="Timer Stopped";
                    this.timeSpecified ="";
                    this.timerInProgress =false;
                    this.timerFired =false;
                    document.getElementById("tickingClock").pause();
                }
                this.timerFieldEmpty = false;
            },1000);
            
         }else{
                this.timerFieldEmpty = true;
         }
         
        },
        reset(){
            clearInterval(this.timerInterval);
            this.timerInProgress= false,
            this.timeLeft2= "0h 0m 0s",
            this.timeSpecified = 0,
            this.timerProgressWidth = 60,
            this.timerFired = false,
            this.timerFieldEmpty = false,
            this.seconds = 0,
            this.minutes = 0,
            this.hours = 0,
            this.timerInterval = ""
        },
        playTimerSound(){
            document.getElementById("timerSound").play();
        },
        stopTimerSound(){
            this.timerFired = false;
            document.getElementById("timerSound").pause();
            document.getElementById("tickingClock").pause();
        },
        // pauseNContinue(){
        //     this.toggleTimerBtn =!this.toggleTimerBtn;
        //     if(this.toggleTimerBtn){
        //         this.startTimer()
        //     }else{
        //         clearInterval(this.timerInterval);
        //     }
            
        //     // this.timeSpecified = -5;
        //     document.getElementById("tickingClock").pause();
            
        // },
        changeToMenu(){
            mainApp.switchComp = "app-start";
            mainApp.clickSoundEffect();
            clearInterval(this.timerInterval);
        },
        changeToPomodoro(){
            mainApp.switchComp = "secondary-app-pomodoro";
            console.log("clicked");
        },
        beginTimerSound(){
            document.getElementById("buttonClicked2").play();
        }
        
    }
    
});

Vue.component("secondary-app-pomodoro",{
    data: function(){
        return{
            timer: "00:00",
            timerStatus: "Session",
            breakNum: 5,
            sessionNum: 25,
            minutes: "25",
            seconds: "00",
            totalSeconds: 25 *60,
            timerInterval: "",
            toggleOrderBtn: false,
            timerLessThan60seconds: false
        }
    },
    template:` 
        <main class="pomodoro">
        <section class="container main-content">
                <h2>Pomodoro Timer</h2>
            <div class="div-row upper-container">
                    <div id="break-label" :class="{'disabled':this.toggleOrderBtn}">
                        <h5>Break Length</h5>
                        <i id="break-decrement" @click="handleNums('breakNum', 'decrement')" class="fas fa-arrow-down fa-lg"></i> <span class="numTimer break-value mx-2">{{this.breakNum}} min</span> <i id="break-increment" @click="handleNums('breakNum', 'increment')" class="fas fa-arrow-up fa-lg"></i>
                    </div>
                    <div id="session-label" :class="{'disabled':this.toggleOrderBtn}">
                        <h5>Session Length</h5>
                        <i id="session-decrement" @click="handleNums('sessionNum', 'decrement')" class="fas fa-arrow-down fa-lg"></i> <span class="numTimer session-value mx-2" >{{this.sessionNum}} min</span> <i id="session-increment" @click="handleNums('sessionNum', 'increment')" class="fas fa-arrow-up fa-lg"></i>
                    </div>
            </div>
               <div class="timer-main-container" :class="{'runningOut timer-main-container': this.timerLessThan60seconds}">
                    <h3 id="timer-status" >{{this.timerStatus}}</h3>
                    <h3 id="timer">{{this.minutes}}:{{this.seconds}}</h3>
                </div>
               <div class="div-row">
                    <button id="play" @click="startStop"><i class="fas fa-play fa-lg"></i></button>
                    <button id="reset" :disabled="!this.toggleOrderBtn" :class="{'disabled':!this.toggleOrderBtn}" @click="reset"><i class="fas fa-undo-alt fa-lg"></i></button>
                </div>
        </section>
        <footer class="quiz-footer">
             <button v-if="!this.toggleOrderBtn" class="btn btn-dark calc-switch-btn my-3 mx-uto" @click="changeToTimer">Return back to regular timer</button>
        </footer>
        <audio id="timerSound">
            <source src="Old-clock-ringing-sound-effect.mp3" type="audio/mp3">
            <source src="Old-clock-ringing-sound-effect.mp3" type="audio/ogg">
            <source src="Old-clock-ringing-sound-effect.mp3" type="audio/mpeg">
        </audio>
            <audio id="buttonClicked">
            <source src="mouse-click-sound.mp3" type="audio/mp3">
            <source src="mouse-click-sound.mp3" type="audio/ogg">
            <source src="mouse-click-sound.mp3" type="audio/mpeg">
        </audio>
        <audio id="buttonClicked2">
            <source src="button-click2.mp3" type="audio/mp3">
            <source src="button-click2.mp3" type="audio/ogg">
            <source src="button-click2.mp3" type="audio/mpeg">
        </audio>
        <audio id="tickingClock">
            <source src="Clock-ticking-Turning-1.mp3" type="audio/mp3">
            <source src="Clock-ticking-Turning-1.mp3" type="audio/ogg">
            <source src="Clock-ticking-Turning-1.mp3" type="audio/mpeg">
        </audio>
    </main>
    `,
    methods:{
        formatTime(time){
            if(time < 10){
            return "0" + time;
            }
            return time.toString();
        },
        handleNums(timerStatus, direction){
            if(!this.toggleOrderBtn){ //when the timer is not running
                if(direction === "increment" && this[timerStatus] <= 59){
                    this[timerStatus] ++;
                }else if(direction === "decrement" ){
                    if(this[timerStatus] > 1){
                        this[timerStatus] --;
                    }
                }
                
                if(timerStatus === "sessionNum"){
                    this.minutes = this.sessionNum < 10 ? "0" + this.sessionNum : this.sessionNum;
                    this.seconds = "00";
                    this.timerStatus = "Session";
                    this.totalSeconds = Number(this.sessionNum) *60 //converts the minutes to total seconds
                }
                if(this.sessionNum * 60 <= 59){  //triggers the run out style
                    this.timerLessThan60seconds = true
                }else{
                    this.timerLessThan60seconds = false
                }
            }
          },
          startStop(){
            //toggles the order
              this.toggleOrderBtn = !this.toggleOrderBtn;
            
            if(this.toggleOrderBtn){
                document.getElementById("buttonClicked2").play();
                this.timerInterval = setInterval(()=>{
                    this.totalSeconds-=1; //decreases every 1 second
                    const min =  Math.floor(this.totalSeconds / 60);
                    const sec = this.totalSeconds % 60;                    
                    this.minutes = this.formatTime(min);
                    this.seconds = this.formatTime(sec);                
                  if(this.totalSeconds <= 59){
                      this.timerLessThan60seconds = true;
                  }else{
                      this.timerLessThan60seconds = false;
                  }
                   if(this.totalSeconds <= 10){
                        mainApp.playTickingClock();
                        // this.timerLessThan60seconds = true;
                    }else{
                        // this.timerLessThan60seconds = false;
                        document.getElementById("tickingClock").pause();
                    }
                  if(this.totalSeconds <= 0){
                      if(this.timerStatus === "Session"){
                           this.playTimerSound(); //rings
                      }
                      document.getElementById("tickingClock").pause();
                      this.timerLessThan60seconds = false;
                      this.totalSeconds = Number(this.breakNum) *60; //put "breakNum" on the timer
                      this.timerStatus = "Break" //changes the status title
                  }
              },1000);
            }else if(this.toggleOrderBtn === false){
              clearInterval(this.timerInterval);
                console.log("stopped");
                this.stopTimerSound();
            }
          },
          reset(){
            clearInterval(this.timerInterval);
                this.timerStatus = "Session";
                this.breakNum = 5;
                this.sessionNum = 25;
                this.minutes = "25";
                this.seconds = "00";
                this.totalSeconds = 25 *60;
                this.timerInterval = "";
                this.toggleOrderBtn = false;
                this.timerLessThan60seconds = false;
                this.stopTimerSound();
          },
          playTimerSound(){
              document.getElementById("timerSound").play();
          },
          stopTimerSound(){
              document.getElementById("timerSound").pause();
              document.getElementById("tickingClock").pause();
          },
          changeToTimer(){
                this.stopTimerSound();
                mainApp.switchComp = "app-timer";
                mainApp.clickSoundEffect();
                clearInterval(this.timerInterval);
          }
        
    }
});

Vue.component("app-alarm",{
        data: function(){
            return{
                timeNow: 00,
                timePeriod: "",
                dateNow: "",
                alarmName: "",
                timeWhenAlarmGoOff: "",
                enableRepeat: "Yes",
                isAlarmInProgress: false,
                alarmInterval: "",
                snoozeTimeout: "",
                toneSelected: "Default",
                isTonePlaying: false,
                isFullScreen: false
            }
        },
    template: `
    <div>

        <div class="alarmOuter">
                <div class="alarmSideButton ml-auto">
                    <button v-if="isFullScreen" class="btn text-success mr-3 mb-3" @click="exitFullScreen" style="width:30px; outline:none; font-size:40px; font-weight:bold;">&times;</button>
                    <button class="alarmZoomBtnsStyle" id="alarmZoomOut"><i class="fas fa-minus fa-sm"></i> </button>
                    <button class="alarmZoomBtnsStyle" id="alarmZoomIn"> <i class="fas fa-plus fa-sm"></i> </button>
                    <button v-if="!isFullScreen" class="btn" @click="fullScreen"><i class="fas fa-expand fa-2x"></i></button>
                    
                </div>
        <div>
           
            <div class="alarmInner">
                

                <h1>{{timeNow}}<small>{{timePeriod}}</small></h1>
                <h4>{{dateNow}}</h4>
                <div v-if="isAlarmInProgress" class="m-auto my-4">
                    <img src="alarm6.png" style="width:40px;">
                </div>
                
                <button v-if="!isAlarmInProgress" data-toggle="modal" data-target="#alarmModal" class="btn text-white my-3" style="background-color:rgb(65, 173, 65)"> Set Alarm</button>
                <button v-if="isAlarmInProgress" data-toggle="modal" data-target="#alarmModal" class="btn text-white my-3" style="background-color:rgb(65, 173, 65)"> Edit Alarm</button>
                <button class="btn btn-secondary my-3" v-if="isAlarmInProgress" @click="cancelAlarm">Cancel</button>
            </div>

            <div class="modal fade" id="alarmModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header text-white bg-primary py-2">
                            <h2 style="font-weight: 300;">Edit Alarm</h2>
                            <h2 data-dismiss="modal" class="ml-auto" style="color:rgb(228, 223, 217);">&times;</h2>
                        </div>

                        <div class="modal-body text-left">
                           <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="time">Set a Time </label>
                                    <br>
                                
                                    <input class="form-control" type="datetime-local" id="timeForAlarm">
                                </div> 

                                <div class="form-group col-md-6">
                                    <label for="repeatSound">Enable Repeat</label>
                                    <select class="form-control" id="repeatSound" v-model="enableRepeat">
                                        <option selected>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                           </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                        <label for="alarmName">Title</label>
                                        <br>
                                        <input v-model="alarmName" class="form-control" type="text" id="alarmName">
                                </div> 
                                <div class="form-group col-md-6">
                                    <label for="tones">Tone</label>
                                    <div class=" d-flex m-1">
                                        <select id="tones" v-model="toneSelected" class="form-control" style="padding-left:1px;">
                                        <option selected>Default</option>
                                        <option>Cuckoo</option>
                                        <option>Alarm Clock 1</option>
                                        <option>Alarm Clock 2</option>
                                        <option>Alarm Clock 3</option>
                                        <option>Alarm Clock 5</option>
                                        <option>Alarm Clock 6</option>
                                        <option>Alarm Clock 7</option>
                                        <option>Alarm Clock 8</option>
                                        </select>
                                        <button id="showToneBtn" v-if="!isTonePlaying" class="btn btn-primary btn-sm m-1" @click="playTone">Play</button>
                                        <button v-if="isTonePlaying" class="btn btn-warning btn-sm m-1" @click="stopTone">Stop</button>
                                    </div>
                                    
                                </div>
                            </div>
                                
                                
                               
                        </div>

                        <div class="modal-footer">
                            <button v-if="!isAlarmInProgress" @click="testAlarm" class="btn btn-light mr-auto" style="border: 1px solid rgb(167, 167, 167); border-radius:1px !important;">Test</button>
                             <button v-if="!isAlarmInProgress" @click="startAlarm" class="btn btn-primary ">Start alarm</button>
                             <button class="btn btn-secondary" v-if="isAlarmInProgress" @click="cancelAlarm">Cancel Alarm</button>
                             
                             <button data-dismiss="modal" class="btn btn-light" style="border: 1px solid rgb(167, 167, 167); border-radius:1px !important;">Cancel</button>
                        </div>
                    </div>
                </div>

                <div id="invalidDate" class="fixed-top alert alert-danger text-center">
                        <h6>Invalid Date. Please make sure all parts in the date field are filled.</h6>
                </div>

            </div>
        </div>

        <div class="modal fade" id="alarmGoOff">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger py-2">
                            <h2 style="color:rgb(232, 241, 237);"> Alarm</h2>
                    </div>
                    
                    <div class="modal-body text-center">
                            <div class="alarmImgContainer">
                                    <img src="alarm1.png" style="width:120px;">
                            </div>
                        
                        <h3 class="mb-2">{{alarmName}}</h3>
                        <h3>{{timeWhenAlarmGoOff}}</h3>
                    </div>
                    <div class="modal-footer ">
                        <button @click="stopAlarmSound" class="btn btn-block btn-danger ml-auto"  data-dismiss="modal">Ok</button>
                        <button @click="snooze" data-dismiss="modal" class="btn btn-secondary">Snooze 5 Minutes</button>
                    </div>
                </div>
            </div>
        </div>

        
        <div id="alarmSet" class="fixed-top alert alert-success text-center rounded">
                <h6 style="white-space=wrap;">The alarm has been set. <br> Do not refresh the page.</h6>
        </div>
           
        <div id="alarmCancelled" class="fixed-top alert alert-secondary text-center rounded">
                <h6 style="white-space=wrap;">The alarm has been cancelled.</h6>
        </div>

        <div id="snoozeAlert" class="fixed-top alert alert-success text-center">
            <h6 style="white-space=wrap;">A snooze of 5 minutes has been set.</h6>
        </div>

       

        <audio id="alarmSound">
                <source src="short-alarm-clock-sound.mp3" type="audio/mp3">
                <source src="short-alarm-clock-sound.mp3" type="audio/ogg">
                <source src="short-alarm-clock-sound.mp3" type="audio/mpeg">
        </audio>
        <audio id="buttonClicked">
            <source src="mouse-click-sound.mp3" type="audio/mp3">
            <source src="mouse-click-sound.mp3" type="audio/ogg">
            <source src="mouse-click-sound.mp3" type="audio/mpeg">
        </audio>

        

    </div>


        <footer>
        <button  v-if="!isAlarmInProgress" @click="changeToMenu" class="btn mt-4 px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
            <div class="fixed-bottom bottom-section menuBtnShowDesktop" >

                <span class="divider"></span>
                <button  v-if="!isAlarmInProgress" @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
             </div>
        </footer>

</div>
    
    `,
    methods:{
        showTime(){
            console.log(this.enableRepeat);
            
            setInterval(()=>{
            var seconds;
            var minutes;
            var hours;
            var year;
            var month;
            var day;
            var date;
            var monthArray;
            var weekDaysArray;
            var getDay;
            var getMonth;
                seconds = new Date().getSeconds();
                minutes = new Date().getMinutes();
                hours = new Date().getHours();
                if(hours > 12){
                    this.timePeriod= " PM";
                    hours = hours -12;
                }else{
                    this.timePeriod = " AM";
                    hours = hours;
                }
              

                if(hours == 0){
                    hours =12;
                }else{
                    hours = hours;
                }

                if(minutes < 10 ){
                    minutes =  "0" +minutes;
                }else{
                    minutes = minutes;
                }
                
            
                if(seconds < 10){
                    seconds = "0"+ seconds;
                }

                
                this.timeNow = hours + ":"+ minutes + ":" + seconds;

                year = new Date().getFullYear();
                getMonth = new Date().getMonth();
                getDay = new Date().getDay();
                date = new Date().getDate();

                monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                month = monthArray[getMonth];

                weekDaysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                day = weekDaysArray[getDay];
                this.dateNow = day + " - " +month +". " + date + " "+year;

            },1000);
        },
        startAlarm: function(){
             
             this.triggerAndChangeTone();
                var ms =document.getElementById("timeForAlarm").valueAsNumber;
                if(isNaN(ms)){
                    this.showMessage("invalidDate");
                }
            if(!isNaN(ms)){
                    this.showMessage("alarmSet");
                    $("#alarmModal").modal("hide");
                    this.alarmInterval =  setInterval(()=>{
                    var alarm = new Date(ms);
                    var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(),alarm.getUTCDate() , alarm.getUTCHours(), alarm.getUTCMinutes(),alarm.getUTCSeconds());
                var differenceInMS = alarmTime.getTime() - (new Date()).getTime()  ; 
                    this.isAlarmInProgress= true;
                    if(differenceInMS <= 0){
                        this.alarmTimeup();
                        clearInterval(this.alarmInterval);
                        differenceInMS = -50;
                    } 
                },1000);

                if(this.enableRepeat == "Yes"){
                        document.getElementById("alarmSound").loop = true;
                }else{
                        document.getElementById("alarmSound").loop = false;
                }
            }
           
        },
        alarmTimeup(){
                document.getElementById("alarmSound").play();
                $("#alarmGoOff").modal({
                        backdrop: 'static',
                        keyboard: false
                });
                    console.log("time's up");
                    $("#alarmGoOff").modal("toggle");
                    $("#alarmModal").modal("hide");

                    
                    var secondsAlarm  = new Date().getSeconds();
                    var minutesAlarm  = new Date().getMinutes();
                    var hoursALarm  = new Date().getHours();
                    var timePeriod;
                    if(hoursALarm > 12){
                        hoursALarm = hoursALarm - 12;
                        timePeriod = "PM";
                    }else{
                        hoursALarm = hoursALarm;
                        timePeriod = "AM";
                    }
                    if(secondsAlarm <10){
                        secondsAlarm = "0"+secondsAlarm;
                    }else{
                        secondsAlarm = secondsAlarm;
                    }
                    if(minutesAlarm <10){
                        minutesAlarm = "0"+minutesAlarm;
                    }else{
                        minutesAlarm = minutesAlarm;
                    }
                    return this.timeWhenAlarmGoOff = hoursALarm + ":" + minutesAlarm + ":" + secondsAlarm +" " + timePeriod;
        },
        showMessage(id){
                document.getElementById(id).style.display="block";
            var messageTimeout = setTimeout(()=>{
                document.getElementById(id).style.display="none";
            },4000);
        },
        snooze(){
            document.getElementById("alarmSound").pause();
            this.snoozeTimeout = setTimeout(this.alarmTimeup,300000);
            this.showMessage("snoozeAlert");
            clearInterval(this.alarmInterval);
            this.isAlarmInProgress= true;
        },
        stopAlarmSound(){
            document.getElementById("alarmSound").pause();
            clearInterval(this.alarmInterval);
            this.isAlarmInProgress = false;
        },
        cancelAlarm(){
            clearInterval(this.alarmInterval);
            clearTimeout(this.snoozeTimeout);
            this.showMessage("alarmCancelled");
            this.isAlarmInProgress =false;
            document.getElementById("alarmSound").pause();
        },
        playTone(){
            $("#alarmSound").attr("src",this.toneSelected+".mp3");
            document.getElementById("alarmSound").play();                  
            
            this.isTonePlaying=true;
        },
        stopTone(){
            document.getElementById("alarmSound").pause();
            this.isTonePlaying =false;
        },
        triggerAndChangeTone(){
            $("#alarmSound").attr("src",this.toneSelected+".mp3");
        },
        changeToMenu(){
            clearInterval(this.alarmInterval);
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-start";
        },
        testAlarm(){
            this.alarmTimeup();
        },
        fullScreen(){
            this.isFullScreen= true;
            $(function(){
                $(".alarmZoomBtnsStyle").css("color","rgb(163, 151, 151)");
            }); 
            if (document.querySelector(".alarmOuter").requestFullscreen) {
                document.querySelector(".alarmOuter").requestFullscreen();
              } else if (document.querySelector(".alarmOuter").mozRequestFullScreen) {
                document.querySelector(".alarmOuter").mozRequestFullScreen();
              } else if (document.querySelector(".alarmOuter").webkitRequestFullscreen) {
                document.querySelector(".alarmOuter").webkitRequestFullscreen();
              } else if (document.querySelector(".alarmOuter").msRequestFullscreen) { 
                document.querySelector(".alarmOuter").msRequestFullscreen();
              }
        },
        exitFullScreen(){
            $(function(){
                $(".alarmZoomBtnsStyle").css("color","black");
            }); 
            this.isFullScreen=false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { 
                document.msExitFullscreen();
              }
            }
        
    },
    created(){
        this.showTime();
       
        $(function(){
            $("#alarmZoomOut").click(function(){
                $(".alarmInner").css("transform","scale(1.0)");
                if($(".alarmInner").css("transform","scale(1.0)")){
                    $("#alarmZoomOut").addClass("disabledBtn");
                    $("#alarmZoomIn").removeClass("disabledBtn");
                }
                   
                
            });
             $("#alarmZoomIn").click(function(){
                $(".alarmInner").css("transform","scale(1.2)");
                if($(".alarmInner").css("transform","scale(1.2)")){
                    $("#alarmZoomIn").addClass("disabledBtn");
                    $("#alarmZoomOut").removeClass("disabledBtn");
                }
                    
            });
        });
       
        
        
    }
});
    
Vue.component("app-flashlight",{
    data: function(){
        return {
            useTorch: false
        }
    },
    template:`
            <div class="torch-outer">
                <div style="padding-bottom: 18px;">

                <div :class="{torchIsOn: useTorch}" class="torch-inner">

                    <button class="btn" id="on" :class="{active: useTorch}">On</button>
                    <button class="btn" id="off" @click="turnOffTorch" :class="{active: !useTorch}">Off</button>
                </div>

                </div>

                <footer style="flex-direction:column;">
                    <div class="alert alert-info torch-info">
                        <p><span class="text-left">Requirement:</span> The device that you use should contain a camera.<br>
                            <span>Instructions: </span>1- Allow accessing to the camera (No pictures will be captured. This is only for using the flashlight purpose).<br>
                            2- Choose the back camera.<br>
                            <span>Warning:</span> - Using the flashlight for too long may affect your battery's life.<br>
                                - Note that not all browsers support this feature.
                        </p>
                    </div>
                    <button  @click="changeToMenu" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
                    <div class="fixed-bottom bottom-section menuBtnShowDesktop" >
                        <span class="divider"></span>
                        <button  @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
                    </div>
                </footer>
                <audio id="torchClicked">
                        <source src="lamp_click.mp3" type="audio/mp3">
                        <source src="lamp_click.mp3" type="audio/ogg">
                        <source src="lamp_click.mp3" type="audio/mpeg">
                </audio>
                <audio id="buttonClicked">
                        <source src="mouse-click-sound.mp3" type="audio/mp3">
                        <source src="mouse-click-sound.mp3" type="audio/ogg">
                        <source src="mouse-click-sound.mp3" type="audio/mpeg">
                </audio>
            </div>
    `,
    methods:{
        turnOffTorch(){
                this.useTorch = false;
                location.reload();
                document.getElementById("torchClicked").play();
        },
        changeToMenu(){
            mainApp.switchComp = "app-start";
            location.reload();
            mainApp.clickSoundEffect();
        }
    },
    created(){
        //Test browser support
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
if (SUPPORTS_MEDIA_DEVICES) {
  //Get the environment camera (usually the second one)
  navigator.mediaDevices.enumerateDevices().then(devices => {
  
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    if (cameras.length === 0) {
      alert("No camera found on this device.");
      throw 'No camera found on this device.';
      
    }
    const camera = cameras[cameras.length - 1];

    // Create stream and get video track
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: camera.deviceId,
        facingMode: ['user', 'environment'],
        height: {ideal: 1080},
        width: {ideal: 1920}
      }
    }).then(stream => {
      const track = stream.getVideoTracks()[0];

      //Create image capture object and get camera capabilities
      const imageCapture = new ImageCapture(track)
      const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

        //todo: check if camera has a torch

        //let there be light!
        const btn = document.getElementById("on");
        btn.addEventListener('click', function(){
            
            this.useTorch = true;
          track.applyConstraints({
            advanced: [{torch: true}]
          });
          $(function(){
               $(".torch-inner").css("background","linear-gradient(90deg,rgba(201, 193, 85, 0.6),rgba(84, 117, 31, 0.6))");
               $(".torch-inner").css("box-shadow","1px 1px 10px 1.5px rgba(241, 241, 241,0.6)");
          })
            document.getElementById("torchClicked").play();
        });
      });
    });
  });
  
  
}
    }

});


Vue.component("app-stopwatch",{
    data: function(){
        return {
            stopwatchTime: "00:00:00",
            milliseconds: 0,
            seconds: 0,
            minutes: 0,
            hours: 0,
            status: "Stopped",
            displayMilliseconds: ".0",
            millisecondsInterval: "0",
            displaySeconds: "0",
            displayMinutes: "0",
            displayHours: "0",
            stopwatchInterval: null,
            lapIndexGenerator: 0,
            lap: [
                {lapList:[], lapIndexList: []}
            ],
            isStopwatchRunning: false,
            finalLapIndex: 0
        }
    },
    template:`
    <div>
        <div class="stopwatchInner">
            <h2 id="displayStopwatch">{{stopwatchTime}}<small>{{displayMilliseconds}}</small></h2>
            <div class="d-flex">
                <button :class="{stopwatchBtn:isStopwatchRunning}" class="btn btn-success m-2" id="startStopId" @click="startStop">Start</button>
                <button :class="{disabledResetBtn:!isStopwatchRunning}" class="btn btn-dark m-2" @click="resetStopwatch">Reset</button>
                <button v-if="isStopwatchRunning" class="btn m-2" @click="stopwatchLap" style="background-color:#0090dd; border:1px solid #0090dd;">Lap</button>
            </div>
         <hr v-if="lap[0].lapList.length >0">
        <div v-if="lap[0].lapList.length >0" class="laps-container">
           
             <ul>
                <li v-for="(lapItem,lapIndex) in lap[0].lapList"><span v-html="lap[0].lapIndexList[lapIndex]" style="color:rgb(114, 201, 172);"></span> {{lapItem}}</li>
            </ul>
        </div>
           
        </div>
    <footer>
    <button  @click="changeToMenu" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        <div class="fixed-bottom bottom-section menuBtnShowDesktop" >
            <span class="divider"></span>
            <button  @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
    </footer>
        <audio id="buttonClicked">
                <source src="mouse-click-sound.mp3" type="audio/mp3">
                <source src="mouse-click-sound.mp3" type="audio/ogg">
                <source src="mouse-click-sound.mp3" type="audio/mpeg">
        </audio>
    </div>
    `,
    methods:{
            stopwatchFunc(){
                    this.seconds++;
                    if(this.seconds /60 === 1){
                        this.seconds= 0;
                        this.minutes++;
                    }
                    if(this.minutes /60 === 1){
                        this.minutes=0;
                        this.hours++;
                    }

                    if(this.seconds <10){
                        this.displaySeconds = "0"+ this.seconds.toString();
                    }else{
                        this.displaySeconds = this.seconds;
                    }

                    if(this.minutes <10){
                        this.displayMinutes = "0"+ this.minutes.toString();
                    }else{
                        this.displayMinutes = this.minutes;
                    }

                    if(this.hours <10){
                        this.displayHours = "0"+ this.hours.toString();
                    }else{
                        this.displayHours = this.hours;
                    }
                    this.stopwatchTime = this.displayHours + ":" + this.displayMinutes + ":"  + this.displaySeconds; 
                    document.title = this.stopwatchTime;
            },
            startStop(){
                if(this.status === "Stopped"){
                    this.stopwatchInterval = window.setInterval(this.stopwatchFunc,1000);
                    this.millisecondsInterval = window.setInterval(this.countMilliseconds,1);
                    document.getElementById("startStopId").innerHTML="Stop";
                    this.status = "Started";
                    this.isStopwatchRunning = true;
                }else{
                    window.clearInterval(this.stopwatchInterval);
                    window.clearInterval(this.millisecondsInterval);
                    document.getElementById("startStopId").innerHTML = "Start";
                    this.status= "Stopped";
                    this.isStopwatchRunning = false;
                }
            },
            resetStopwatch(){
                this.milliseconds= 0;
                this.seconds = 0;
                this.minutes = 0;
                this.hours = 0;
                window.clearInterval(this.stopwatchInterval);
                window.clearInterval(this.millisecondsInterval);
                this.stopwatchTime = "00:00:00";
                this.displayMilliseconds= ".0";
                document.getElementById("startStopId").innerText= "Start";
                this.status = "Stopped";
                this.isStopwatchRunning= false;
                this.lap[0].lapIndexList = [];
                this.lap[0].lapList=[];
            },
            countMilliseconds(){
                this.milliseconds++;
                    if(this.milliseconds >= 100){
                        this.milliseconds =0;
                    }
                    if(this.milliseconds < 10){
                        this.displayMilliseconds = ".0"+this.milliseconds;
                    }else{
                        this.displayMilliseconds = "."+this.milliseconds;
                    }
            },
            stopwatchLap(){
                this.lap[0].lapList.unshift(this.stopwatchTime);
                this.lapIndexGenerator++;
                if(this.lapIndexGenerator <10){
                    this.lapIndexGenerator = "0"+this.lapIndexGenerator;
                }else{
                    this.lapIndexGenerator = this.lapIndexGenerator;
                }
                this.lap[0].lapIndexList.unshift(this.lapIndexGenerator);
                this.finalLapIndex = this.lap[0].lapIndexList;
            },
            changeToMenu(){
                window.clearInterval(this.stopwatchInterval);
                window.clearInterval(this.millisecondsInterval);
                document.title= mainApp.appTitle;
                mainApp.switchComp="app-start";
                mainApp.clickSoundEffect();
            }
    }

});

Vue.component("app-todolist",{
    data: function(){
        return{
            itemInserted: "",
            toDoList: [],
            thingsDoneList: [],
            toDoCheckbox: false,
            showFinishedItems: false
        }
    },
    template: `
        
    <div >

    <div class="toDoInner">
        <div class="input-group my-2">
            <div class="input-group-prepend">
                <button  @click="addNewToDo" class=" input-group-text text-white inputBtn" style="background-color:rgba(14, 13, 13,0.5); border:none; outline:none;"><i class="fas fa-plus plusIcon " ></i></button>
            </div>
            
        <input @keyup.enter="addNewToDo" autofocus type="text" class="form-control toDoInput" v-model="itemInserted" placeholder="Add a to-do..">
            <div class="input-group-prepend">
                <button class=" input-group-text text-white inputBtn" style="background-color:rgba(14, 13, 13,0.5); border:none; outline:none;"><i class="far fa-star plusIcon " ></i></button>
            </div>
        </div>
        <template>
            <li v-for="(toDo,itemIndex) in toDoList">
                <div class="toDoDeck">
                    <input unchecked name="item(itemIndex)" type="checkbox"  @click="sendToDoneList(itemIndex)" class="mr-2 ml-3" style="cursor:pointer;"><i @click="removeToDo(itemIndex)" class="fas fa-trash-alt mr-2" style="color:rgb(100, 30, 30); cursor:pointer;"></i> <span class="theItem">{{toDo}}</span>
                    <i @click="favItem(itemIndex)" class="far fa-star float-right mt-1"></i>
                </div>
               
            </li>
        </template>
        
        <button v-if="thingsDoneList.length>0" @click="showItemsBtn" class="btn styleDoneBtn"><i class="fas fa-chevron-down fa-sm mr-1" ></i> Things done </button>

        <template v-if="showFinishedItems" style="margin-bottom:10px;">
            <li v-for="(doneItem, doneItemIndex) in thingsDoneList">
                <div class="finishedDeck ">
                    <input checked name="item(doneItemIndex)" @click="itemsFinished(doneItemIndex)" type="checkbox" class="mr-2 ml-3 " style="cursor:pointer;"><i @click="removeDoneItems(doneItemIndex)" class="fas fa-trash-alt mr-2" style="color:rgb(100, 30, 30); cursor:pointer;"></i><span class="theItems"><span class="things-done-style">{{doneItem}}</span></span> 
                    <i class="far fa-star float-right mt-1"></i>
                </div>
            </li>
        </template>
    </div>
    <footer>
    
        <div class="fixed-bottom bottom-section " >
            <span class="divider"></span>
            <button  @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
    </footer>
    <audio id="buttonClicked">
        <source src="mouse-click-sound.mp3" type="audio/mp3">
        <source src="mouse-click-sound.mp3" type="audio/ogg">
        <source src="mouse-click-sound.mp3" type="audio/mpeg">
    </audio>

</div>
    `,
    methods:{
        addNewToDo(){
            // console.log(this.toDoCheckbox);
            if(this.itemInserted !=""){
                this.toDoList.push(this.itemInserted);
            }
            this.itemInserted ="";
            this.updateServerData();
        },
        removeToDo(index){
            // if(this.toDoList.length>1 && this.thingsDoneList.length>1){
                if(confirm("Delete item?")){
                this.toDoList.splice(index,1);
                this.updateServerData();
                }
            // }else{
            //     alert("Sorry, keeping this field empty is not allowed.");
            // }
            
        },
        sendToDoneList(index){
                this.thingsDoneList.push(this.toDoList[index]);
                this.toDoList.splice(index,1);
                this.updateServerData();
        },
        favItem(index){
                console.log(index);
        },
        removeDoneItems(index){
            if(confirm("Delete item?")){
                 this.thingsDoneList.splice(index,1);
                 this.updateServerData();
            }
        },
        itemsFinished(index){
            this.toDoList.push(this.thingsDoneList[index]);
            this.thingsDoneList.splice(index,1);
            this.updateServerData();
        },
        showItemsBtn(){
            
            this.showFinishedItems  = !this.showFinishedItems;
            if(this.showFinishedItems){
                $(".fa-chevron-down").css("transform","rotate(180deg)");
            }else{
                $(".fa-chevron-down").css("transform","rotate(0deg)");
            }
            
        },
        changeToMenu(){
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-start";
        },
        updateServerData(){
            const allInfo = {
                toDoList:  this.toDoList,
                thingsDoneList :  this.thingsDoneList
            }
              this.$http.put("https://mahmoudvue.firebaseio.com/todolist.json", allInfo)
              .then(request=>{
                console.log(request);
              }, error=>{
                console.log(error);
              });
        }
        
    },
    created(){
        
        //receive toDoList array from the server and return it to the app array
        // this.$http.get("https://mahmoudvue.firebaseio.com/todoList.json")
        //     .then(response=>{
        //        return response.json();
        //     })
        //     .then(data =>{
        //         const receivedToDoData= [];
        //         receivedToDoData.push(data);
        //         this.toDoList = receivedToDoData[0];
        //          console.log(receivedToDoData);
        //     })

        //receive ThingsDoneList array from the server and return it to the app array
            console.log(this.thingsDoneList, this.toDoList);
            this.$http.get("https://mahmoudvue.firebaseio.com/todolist.json")
                // .then(response=>{
                //       console.log(response);
                // })
                .then(data =>{
                console.log(data);
                        if(data.body){
                            this.toDoList = data.body.toDoList ? data.body.toDoList : [];
                            this.thingsDoneList = data.body.thingsDoneList ? data.body.thingsDoneList : [];
                        }
                
            });
    }
});
            // WORLD CLOCK
Vue.component("app-world-clock",{
    data: function(){
        return{
            worldClockInterval: ""
        }
    },
    template:  `
<div class="world-clock-outer">
    <div class="world-clock-inner">
         <table cellspacing="5px" style="overflow-x:auto; !important">
                 <tr class="hrow">
                 <td>GMT</td><td>Vancouver</td><td>San Francisco</td><td>Seattle</td>
                 </tr>
                 <tr>
                 <td><span id="GMT"></span></td><td><span id="Vancouver"></span></td><td><span id="SanFrancisco"></span></td><td><span id="Seattle"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Los Angeles</td><td>Denver</td><td>Mexico City</td><td>Houston</td>
                 </tr>
                 <tr>
                 <td><span id="LosAngeles"></span></td><td><span id="Denver"></span></td><td><span id="MexicoCity"></span></td><td><span id="Houston"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Minneapolis</td><td>New Orleans</td><td>Chicago</td><td>Montgomery</td>
                 </tr>
                 <tr>
                 <td><span id="Minneapolis"></span></td><td><span id="NewOrleans"></span></td><td><span id="Chicago"></span></td><td><span id="Montgomery"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Indianapolis</td><td>Atlanta</td><td>Detroit</td><td>Miami</td>
                 </tr>
                 <tr>
                 <td><span id="Indianapolis"></span></td><td><span id="Atlanta"></span></td><td><span id="Detroit"></span></td><td><span id="Miami"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Washington DC</td><td>Philadelphia</td><td>New York</td><td>Montreal</td>
                 </tr>
                 <tr>
                 <td><span id="WashingtonDC"></span></td><td><span id="Philadelphia"></span></td><td><span id="NewYork"></span></td><td><span id="Montreal"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Boston</td><td>Buenos Aires</td><td>Sao Paulo</td><td>Rio De Janeiro</td>
                 </tr>
                 <tr>
                 <td><span id="Boston"></span></td><td><span id="BuenosAires"></span></td><td><span id="SaoPaulo"></span></td><td><span id="RioDeJaneiro"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Lisbon</td><td>Dublin</td><td>London</td><td>Madrid</td>
                 </tr>
                 <tr>
                 <td><span id="Lisbon"></span></td><td><span id="Dublin"></span></td><td><span id="London"></span></td><td><span id="Madrid"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Barcelona</td><td>Paris</td><td>Brussels</td><td>Amsterdam</td>
                 </tr>
                 <tr>
                 <td><span id="Barcelona"></span></td><td><span id="Paris"></span></td><td><span id="Brussels"></span></td><td><span id="Amsterdam"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Frankfurt</td><td>Rome</td><td>Berlin</td><td>Prague</td>
                 </tr>
                 <tr>
                 <td><span id="Frankfurt"></span></td><td><span id="Rome"></span></td><td><span id="Berlin"></span></td><td><span id="Prague"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Vienna</td><td>Stockholm</td><td>Athens</td><td>Helsinki</td>
                 </tr>
                 <tr>
                 <td><span id="Vienna"></span></td><td><span id="Stockholm"></span></td><td><span id="Athens"></span></td><td><span id="Helsinki"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Minsk</td><td>Istanbul</td><td>Cairo</td><td>Jerusalem</td>
                 </tr>
                 <tr>
                 <td><span id="Minsk"></span></td><td><span id="Istanbul"></span></td><td><span id="Cairo"></span></td><td><span id="Jerusalem"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Beirut</td><td>Moscow</td><td>Baghdad</td><td>Dubai</td>
                 </tr>
                 <tr>
                 <td><span id="Beirut"></span></td><td><span id="Moscow"></span></td><td><span id="Baghdad"></span></td><td><span id="Dubai"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Bangkok</td><td>Jakarta</td><td>Hong Kong</td><td>Beijing</td>
                 </tr>
                 <tr>
                 <td><span id="Bangkok"></span></td><td><span id="Jakarta"></span></td><td><span id="HongKong"></span></td><td><span id="Beijing"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Shanghai</td><td>Seoul</td><td>Tokyo</td><td>Melbourne</td>
                 </tr>
                 <tr>
                 <td><span id="Shanghai"></span></td><td><span id="Seoul"></span></td><td><span id="Tokyo"></span></td><td><span id="Melbourne"></span></td>
                 </tr>
                 <tr class="hrow">
                 <td>Sydney</td><td>Brisbane</td><td>Vladivostok</td><td>Kamchatka</td>
                 </tr>
                 <tr>
                 <td><span id="Sydney"></span></td><td><span id="Brisbane"></span></td><td><span id="Vladivostok"></span></td><td><span id="Kamchatka"></span></td>
                 </tr>
            </table>
        </div>
    
        <footer>
             <button  @click="changeToMenu" class="btn px-3 my-3 " style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
           
        </footer>
        <audio id="buttonClicked">
            <source src="mouse-click-sound.mp3" type="audio/mp3">
            <source src="mouse-click-sound.mp3" type="audio/ogg">
            <source src="mouse-click-sound.mp3" type="audio/mpeg">
        </audio>
    </div>
    `,
    methods:{
        worldClock(zone, region){
            var dst = 0
            var time = new Date()
            var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
            var gmtTime = new Date(gmtMS)
            var day = gmtTime.getDate()
            var month = gmtTime.getMonth()
            var year = gmtTime.getYear()
            if(year < 1000){
            year += 1900
            }
            var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", 
                            "September", "October", "November", "December")
            var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
            if (year%4 == 0){
            monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
            }
            if(year%100 == 0 && year%400 != 0){
            monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
            }
            
            var hr = gmtTime.getHours() + zone
            var min = gmtTime.getMinutes()
            var sec = gmtTime.getSeconds()
            
            if (hr >= 24){
            hr = hr-24
            day -= -1
            }
            if (hr < 0){
            hr -= -24
            day -= 1
            }
            if (hr < 10){
            hr = " " + hr
            }
            if (min < 10){
            min = "0" + min
            }
            if (sec < 10){
            sec = "0" + sec
            }
            if (day <= 0){
            if (month == 0){
                month = 11
                year -= 1
                }
                else{
                month = month -1
                }
            day = monthDays[month]
            }
            if(day > monthDays[month]){
                day = 1
                if(month == 11){
                month = 0
                year -= -1
                }
                else{
                month -= -1
                }
            }
            if (region == "NAmerica"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(3)
                startDST.setHours(2)
                startDST.setDate(1)
                var dayDST = startDST.getDay()
                if (dayDST != 0){
                    startDST.setDate(8-dayDST)
                    }
                    else{
                    startDST.setDate(1)
                    }
                endDST.setMonth(9)
                endDST.setHours(1)
                endDST.setDate(31)
                dayDST = endDST.getDay()
                endDST.setDate(31-dayDST)
                var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST && currentTime < endDST){
                    dst = 1
                    }
            }
            if (region == "Europe"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(2)
                startDST.setHours(1)
                startDST.setDate(31)
                var dayDST = startDST.getDay()
                startDST.setDate(31-dayDST)
                endDST.setMonth(9)
                endDST.setHours(0)
                endDST.setDate(31)
                dayDST = endDST.getDay()
                endDST.setDate(31-dayDST)
                var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST && currentTime < endDST){
                    dst = 1
                    }
            }
            
            if (region == "SAmerica"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(9)
                startDST.setHours(0)
                startDST.setDate(1)
                var dayDST = startDST.getDay()
                if (dayDST != 0){
                    startDST.setDate(22-dayDST)
                    }
                    else{
                    startDST.setDate(15)
                    }
                endDST.setMonth(1)
                endDST.setHours(11)
                endDST.setDate(1)
                dayDST = endDST.getDay()
                if (dayDST != 0){
                    endDST.setDate(21-dayDST)
                    }
                    else{
                    endDST.setDate(14)
                    }
                var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST || currentTime < endDST){
                    dst = 1
                    }
            }
            // if (region == "Cairo"){
            //     var startDST = new Date()
            //     var endDST = new Date()
            //     startDST.setMonth(3)
            //     startDST.setHours(0)
            //     startDST.setDate(30)
            //     var dayDST = startDST.getDay()
            //     if (dayDST < 5){
            //         startDST.setDate(28-dayDST)
            //         }
            //         else {
            //         startDST.setDate(35-dayDST)
            //         }
            //     endDST.setMonth(8)
            //     endDST.setHours(11)
            //     endDST.setDate(30)
            //     dayDST = endDST.getDay()
            //     if (dayDST < 4){
            //         endDST.setDate(27-dayDST)
            //         }
            //         else{
            //         endDST.setDate(34-dayDST)
            //         }
            //     var currentTime = new Date()
            //     currentTime.setMonth(month)
            //     currentTime.setYear(year)
            //     currentTime.setDate(day)
            //     currentTime.setHours(hr)
            //     if(currentTime >= startDST && currentTime < endDST){
            //         dst = 1
            //         }
            // }
            if (region == "Israel"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(3)
                startDST.setHours(2)
                startDST.setDate(1)
                endDST.setMonth(8)
                endDST.setHours(2)
                endDST.setDate(25)
                dayDST = endDST.getDay()
                if (dayDST != 0){
                endDST.setDate(32-dayDST)
                }
                else{
                endDST.setDate(1)
                endDST.setMonth(9)
                }
                var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST && currentTime < endDST){
                    dst = 1
                    }
            }
            if (region == "Beirut"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(2)
                startDST.setHours(0)
                startDST.setDate(31)
                var dayDST = startDST.getDay()
                startDST.setDate(31-dayDST)
                endDST.setMonth(9)
                endDST.setHours(11)
                endDST.setDate(31)
                dayDST = endDST.getDay()
                endDST.setDate(30-dayDST)
                var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST && currentTime < endDST){
                    dst = 1
                    }
            }
            if (region == "Baghdad"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(3)
                startDST.setHours(3)
                startDST.setDate(1)
                endDST.setMonth(9)
                endDST.setHours(3)
                endDST.setDate(1)
                dayDST = endDST.getDay()
                    var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST && currentTime < endDST){
                    dst = 1
                    }
            }
            if (region == "Australia"){
                var startDST = new Date()
                var endDST = new Date()
                startDST.setMonth(9)
                startDST.setHours(2)
                startDST.setDate(31)
                var dayDST = startDST.getDay()
                startDST.setDate(31-dayDST)
                endDST.setMonth(2)
                endDST.setHours(2)
                endDST.setDate(31)
                dayDST = endDST.getDay()
                endDST.setDate(31-dayDST)
                var currentTime = new Date()
                currentTime.setMonth(month)
                currentTime.setYear(year)
                currentTime.setDate(day)
                currentTime.setHours(hr)
                if(currentTime >= startDST || currentTime < endDST){
                    dst = 1
                    }
            }
            
                
            if (dst == 1){
                hr -= -1
                if (hr >= 24){
                hr = hr-24
                day -= -1
                }
                if (hr < 10){
                hr = " " + hr
                }
                if(day > monthDays[month]){
                day = 1
                if(month == 11){
                month = 0
                year -= -1
                }
                else{
                month -= -1
                }
                }
            return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec + " DST"
            }
            else{
            return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec
            }
        },
        worldClockZone(){
            document.getElementById("GMT").innerHTML =this.worldClock(0, "Greenwich") +" <i class='far fa-clock '></i>"
            document.getElementById("Vancouver").innerHTML =this.worldClock(-8, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("SanFrancisco").innerHTML =this.worldClock(-8, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Seattle").innerHTML =this.worldClock(-8, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("LosAngeles").innerHTML =this.worldClock(-8, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Denver").innerHTML =this.worldClock(-7, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("MexicoCity").innerHTML =this.worldClock(-6, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Houston").innerHTML =this.worldClock(-6, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Minneapolis").innerHTML =this.worldClock(-6, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("NewOrleans").innerHTML =this.worldClock(-6, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Chicago").innerHTML =this.worldClock(-6, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Montgomery").innerHTML =this.worldClock(-6, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Indianapolis").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Atlanta").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Detroit").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Miami").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("WashingtonDC").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Philadelphia").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("NewYork").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Montreal").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Boston").innerHTML =this.worldClock(-5, "NAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("BuenosAires").innerHTML =this.worldClock(-3, "BuenosAires")+" <i class='far fa-clock '></i>"
            document.getElementById("SaoPaulo").innerHTML =this.worldClock(-3, "SAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("RioDeJaneiro").innerHTML =this.worldClock(-3, "SAmerica")+" <i class='far fa-clock '></i>"
            document.getElementById("Lisbon").innerHTML =this.worldClock(0, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Dublin").innerHTML =this.worldClock(0, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("London").innerHTML =this.worldClock(0, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Madrid").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Barcelona").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Paris").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Brussels").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Amsterdam").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Frankfurt").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Rome").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Berlin").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Prague").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Vienna").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Stockholm").innerHTML =this.worldClock(1, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Athens").innerHTML =this.worldClock(2, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Helsinki").innerHTML =this.worldClock(2, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Minsk").innerHTML =this.worldClock(2, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Istanbul").innerHTML =this.worldClock(2, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Cairo").innerHTML =this.worldClock(2, "Cairo")+" <i class='far fa-clock '></i>"
            document.getElementById("Jerusalem").innerHTML =this.worldClock(2, "Israel")+" <i class='far fa-clock '></i>"
            document.getElementById("Beirut").innerHTML =this.worldClock(2, "Beirut")+" <i class='far fa-clock '></i>"
            document.getElementById("Moscow").innerHTML =this.worldClock(3, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Baghdad").innerHTML =this.worldClock(3, "Baghdad")+" <i class='far fa-clock '></i>"
            document.getElementById("Dubai").innerHTML =this.worldClock(4, "Dubai")+" <i class='far fa-clock '></i>"
            document.getElementById("Bangkok").innerHTML =this.worldClock(7, "Bangkok")+" <i class='far fa-clock '></i>"
            document.getElementById("Jakarta").innerHTML =this.worldClock(7, "Jakarta")+" <i class='far fa-clock '></i>"
            document.getElementById("HongKong").innerHTML =this.worldClock(8, "HongKong")+" <i class='far fa-clock '></i>"
            document.getElementById("Beijing").innerHTML =this.worldClock(8, "Beijing")+" <i class='far fa-clock '></i>"
            document.getElementById("Shanghai").innerHTML =this.worldClock(8, "Shanghai")+" <i class='far fa-clock '></i>"
            document.getElementById("Seoul").innerHTML =this.worldClock(9, "Seoul")+" <i class='far fa-clock '></i>"
            document.getElementById("Tokyo").innerHTML =this.worldClock(9, "Tokyo")+" <i class='far fa-clock '></i>"
            document.getElementById("Melbourne").innerHTML =this.worldClock(10, "Australia")+" <i class='far fa-clock '></i>"
            document.getElementById("Sydney").innerHTML =this.worldClock(10, "Australia")+" <i class='far fa-clock '></i>"
            document.getElementById("Brisbane").innerHTML =this.worldClock(10, "Brisbane")+" <i class='far fa-clock '></i>"
            document.getElementById("Vladivostok").innerHTML =this.worldClock(10, "Europe")+" <i class='far fa-clock '></i>"
            document.getElementById("Kamchatka").innerHTML =this.worldClock(12, "Europe")+" <i class='far fa-clock '></i>"
           
        },
        changeToMenu(){
            window.clearInterval(this.worldClockInterval);
            mainApp.clickSoundEffect();
            mainApp.switchComp = "app-start";
        }
    },
    created(){ 
          this.worldClockInterval = setInterval(this.worldClockZone, 1000); 
    }
        
});

Vue.component("app-relaxer",{
    data: function(){
        return{
            totalTime: 19000,
            breatheTime : (11000 /5) *2,
            holdTime: 6500,
            relaxerText: "Get Ready!",
            isRelaxerNavClicked: false,
            relaxerInterval: ""
        }
    },
    template:  `
    <div class="relaxer-outer" :class="{showNav: isRelaxerNavClicked}">

            <h1 style="font-weight:300;" class="mt-4 text-white">Relaxer</h1>
            <hr>
            <button class="btn d-flex justify-item-left" @click="isRelaxerNavClicked = !isRelaxerNavClicked"  ><i class="text-white fas fa-exclamation-circle fa-lg"></i></button>
            <div class="relaxer-main-container" id="relaxerContainer">
                <div class="relaxer-circle"></div>
            
                    <h4 id="relaxerText"class="text-white">Get Ready!</h4>
            
                <div class="pointer-container">
                    <span class="rotating-pointer"></span>
                </div>
            
                <div class="gradient-circle"></div>
            </div>
        <div class="relaxer-info">
            <article class="text-white" style="white-space:pre-line;">
            You will get the most benefit if you do it regularly, as part of your daily routine.

        You can do it standing up, sitting in a chair that supports your back, or lying on a bed or yoga mat on the floor.
        Make yourself as comfortable as you can. If you can, loosen any clothes that restrict your breathing.
        If you're lying down, place your arms a little bit away from your sides, with the palms up. Let your legs be straight, or bend your knees so your feet are flat on the floor.
        If you're sitting, place your arms on the chair arms.
        If you're sitting or standing, place both feet flat on the ground. Whatever position you're in, place your feet roughly hip-width apart.

        Let your breath flow as deep down into your belly as is comfortable, without forcing it.
        Try breathing in through your nose and out through your mouth.
        Breathe in gently and regularly. Some people find it helpful to count steadily from 1 to 5. You may not be able to reach 5 at first.
        Then, let it flow out gently, counting from 1 to 5 again, if you find this helpful.
        Keep doing this for 3 to 5 minutes.
            </article class="text-white">
        </div>
    <footer>
    
        <div class="fixed-bottom bottom-section">
            <span class="divider"></span>
            <button  @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
    </footer>

    <audio id="buttonClicked">
        <source src="mouse-click-sound.mp3" type="audio/mp3">
        <source src="mouse-click-sound.mp3" type="audio/ogg">
        <source src="mouse-click-sound.mp3" type="audio/mpeg">
    </audio>

</div>
    `,
    methods:{
        breathAnimation(){
            const container = document.getElementById("relaxerContainer");
            const text = document.getElementById ("relaxerText");
                text.innerHTML = `
                <h4>Breathe In!<h4>
                <h6>Fill your lungs with air.</h6>
                `;
                container.className = "relaxer-main-container grow";
            
                setTimeout(()=>{
                    text.innerHTML = "Hold";
            
                    setTimeout(()=>{
                        text.innerHTML =   `
                        <h4>Breathe Out!<h4>
                        <h6>Take it back slowly.</h6>
                        `;
                        container.className = "relaxer-main-container shrink";
                    },this.holdTime);
                }, this.breatheTime);      
            
        },
        changeToMenu(){
            window.clearInterval(this.relaxerInterval);
            mainApp.switchComp="app-start";
            mainApp.clickSoundEffect();
        }
    },
    created(){    //(breathAnimation function ,   time)
        this.relaxerInterval = setInterval(this.breathAnimation, this.totalTime);
    }
});

Vue.component("app-exchangeRate",{
    data: function(){
        return{
            currencyOne: "USD",
            currencyTwo: "EGP",
            exchangeRate: "unavailable",
            amountOne: 1,
            amountTwo:"",
            updateDate: ""
        }
    },
    template:
    `
<div>
<div class="exchange-outer">
<img  src="money.png" class="app-img">
<h2 class="exchange-title">Exchange Rate Calculator</h2>
<p style="margin:10px 0; font-size:16px; font-weight:200px;">Choose the currency and the amounts to get the exchange rate</p>
<div class="exchange-container">
<!-- first currency -->
    <p id="updateDate">{{updateDate}}</p>
<div class="currency">
<select class="currency-one" @change="calculateCurrency" id="currency-one" v-model="currencyOne">
  <option value="AED">AED</option>
  <option value="ARS">ARS</option>
  <option value="AUD">AUD</option>
  <option value="BGN">BGN</option>
  <option value="BRL">BRL</option>
  <option value="BSD">BSD</option>
  <option value="CAD">CAD</option>
  <option value="CHF">CHF</option>
  <option value="CLP">CLP</option>
  <option value="CNY">CNY</option>
  <option value="COP">COP</option>
  <option value="CZK">CZK</option>
  <option value="DKK">DKK</option>
  <option value="DOP">DOP</option>
  <option value="EGP">EGP</option>
  <option value="EUR">EUR</option>
  <option value="FJD">FJD</option>
  <option value="GBP">GBP</option>
  <option value="GTQ">GTQ</option>
  <option value="HKD">HKD</option>
  <option value="HRK">HRK</option>
  <option value="HUF">HUF</option>
  <option value="IDR">IDR</option>
  <option value="ILS">ILS</option>
  <option value="INR">INR</option>
  <option value="ISK">ISK</option>
  <option value="JPY">JPY</option>
  <option value="KRW">KRW</option>
  <option value="KZT">KZT</option>
  <option value="MXN">MXN</option>
  <option value="MYR">MYR</option>
  <option value="NOK">NOK</option>
  <option value="NZD">NZD</option>
  <option value="PAB">PAB</option>
  <option value="PEN">PEN</option>
  <option value="PHP">PHP</option>
  <option value="PKR">PKR</option>
  <option value="PLN">PLN</option>
  <option value="PYG">PYG</option>
  <option value="RON">RON</option>
  <option value="RUB">RUB</option>
  <option value="SAR">SAR</option>
  <option value="SEK">SEK</option>
  <option value="SGD">SGD</option>
  <option value="THB">THB</option>
  <option value="TRY">TRY</option>
  <option value="TWD">TWD</option>
  <option value="UAH">UAH</option>
  <option value="USD" selected>USD</option>
  <option value="UYU">UYU</option>
  <option value="VND">VND</option>
  <option value="ZAR">ZAR</option>
</select>

    <input type="number" class="amount-one" @input="calculateCurrency" v-model="amountOne" id="amount-one" placeholder="0" value="1" min="1">
</div>
    <!-- Swap button and rate text -->
<div class="swap-rate-container">
    <button class="btn curr-btn " @click="swap" style="margin:20px 0;"><i class="fas fa-exchange-alt fa-lg" style="margin-right:4px;"></i>Swap</button>
    <div class="rate">{{exchangeRate}}</div>
</div>

    <!-- currency two -->
<div class="currency">
    <select class="currency-two" @change="calculateCurrency" id="currency-two" v-model="currencyTwo">
      <option value="AED">AED</option>
      <option value="ARS">ARS</option>
      <option value="AUD">AUD</option>
      <option value="BGN">BGN</option>
      <option value="BRL">BRL</option>
      <option value="BSD">BSD</option>
      <option value="CAD">CAD</option>
      <option value="CHF">CHF</option>
      <option value="CLP">CLP</option>
      <option value="CNY">CNY</option>
      <option value="COP">COP</option>
      <option value="CZK">CZK</option>
      <option value="DKK">DKK</option>
      <option value="DOP">DOP</option>
      <option value="EGP" selected>EGP</option>
      <option value="EUR">EUR</option>
      <option value="FJD">FJD</option>
      <option value="GBP">GBP</option>
      <option value="GTQ">GTQ</option>
      <option value="HKD">HKD</option>
      <option value="HRK">HRK</option>
      <option value="HUF">HUF</option>
      <option value="IDR">IDR</option>
      <option value="ILS">ILS</option>
      <option value="INR">INR</option>
      <option value="ISK">ISK</option>
      <option value="JPY">JPY</option>
      <option value="KRW">KRW</option>
      <option value="KZT">KZT</option>
      <option value="MXN">MXN</option>
      <option value="MYR">MYR</option>
      <option value="NOK">NOK</option>
      <option value="NZD">NZD</option>
      <option value="PAB">PAB</option>
      <option value="PEN">PEN</option>
      <option value="PHP">PHP</option>
      <option value="PKR">PKR</option>
      <option value="PLN">PLN</option>
      <option value="PYG">PYG</option>
      <option value="RON">RON</option>
      <option value="RUB">RUB</option>
      <option value="SAR">SAR</option>
      <option value="SEK">SEK</option>
      <option value="SGD">SGD</option>
      <option value="THB">THB</option>
      <option value="TRY">TRY</option>
      <option value="TWD">TWD</option>
      <option value="UAH">UAH</option>
      <option value="USD">USD</option>
      <option value="UYU">UYU</option>
      <option value="VND">VND</option>
      <option value="ZAR">ZAR</option>
    </select>

        <input type="number" class="amount-two" @input="calculateCurrency" v-model="amountTwo" id="amount-two" placeholder="0" min="0">
</div>
    <p style="color:#9b9a9a; text-align:center; font-size:15px; margin-top:30px;">&copy; 2020 Mahmoud Farargy</p>
</div>


    <audio id="buttonClicked">
        <source src="mouse-click-sound.mp3" type="audio/mp3">
        <source src="mouse-click-sound.mp3" type="audio/ogg">
        <source src="mouse-click-sound.mp3" type="audio/mpeg">
    </audio>
</div>
<footer>
<div class="d-block mobile-scale"style="padding-top:20px !important;">
    <button  @click="changeToMenu" class="btn px-3 menuBtnShowMobile" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
</div>
        <div class="fixed-bottom bottom-section menuBtnShowDesktop">
            <span class="divider"></span>
            <button  @click="changeToMenu" class="btn px-3" style="padding:10px 0; "><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
    </footer>
</div>
    `
    ,
    methods:{
        calculateCurrency(){
            fetch(`https://api.exchangerate-api.com/v4/latest/${this.currencyOne}`)
                .then(response => response.json())
                .then(data => {
                   const rate = data.rates[this.currencyTwo];
                   
                   data.date ? this.updateDate = `As of ${data.date}`: "";
                   this.exchangeRate= `1 ${this.currencyOne} = ${rate} ${this.currencyTwo}`;
                   this.amountTwo= (this.amountOne * rate).toFixed(2);
                })
                .catch(function(){
                    alert("Cannot connect to API. Please try again later.");
                });                     
        },
        calculate(){
            this.calculateCurrency();
     
        },
        swap(){
            const temp = this.currencyOne;
            this.currencyOne =  this.currencyTwo;
            this.currencyTwo = temp;
            this.calculateCurrency();
        },
        changeToMenu(){
            mainApp.switchComp = "app-start";
            mainApp.clickSoundEffect()
        }
    },
    created(){
        this.calculateCurrency();
        // console.log(this.currencyEl_one.value, this.amount_one.value,this.currencyEl_two.value, this.amount_two.value);
    }
    
});

Vue.component("app-lyrics",{
    data: function(){
        return{
            searchInput: "",
            lyricsApiUrl:  'https://api.lyrics.ovh'
        }
    },
    template: 
    `
    <div>
        <section class="lyrics-outer-container">
            <header class="lyrics-inner-container">
                <h2 class="lyrics-upper-title">Lyrics Search</h2>
                <form class="lyrics-search" id="lyricsForm" @submit="searchOnSubmit">
                    <input autofocus class="lyrics-input" v-model="searchInput" type="text" placeholder="Enter artist or song name...">
                    <button class="lyrics-btn" id="searchLyricsBtn" ><i class="fas fa-search fa-md mr-2"></i>Search</button>
                </form>
                
            </header>
            <div class="sectionDisplay">
                <div id="search-artist" style="margin-top:50px; float:left !important;">
                    
                </div>

                <div id="search-result" @click="resultBtns" class="search-result" style="margin-top:24px;">
                    <p style="text-align:center; font-size:17px;">Results will be displayed here</p>
                </div>
            </div>
                <div id="moreLyrics" @click="loadMoreLyrics" style="margin:30px auto; display:flex; justify-content:center;"></div>

                <a href="#search-result" class="arrow-up" id="arrowUp"> <i class="fas fa-chevron-circle-up fa-2x " id="moveUp"></i></a>
        </section>
        <audio id="buttonClicked">
        <source src="mouse-click-sound.mp3" type="audio/mp3">
        <source src="mouse-click-sound.mp3" type="audio/ogg">
        <source src="mouse-click-sound.mp3" type="audio/mpeg">
    </audio>

    <footer>
        <div class="d-block mobile-scale"style="padding-top:20px !important;">
            <button  @click="changeToMenu" class="btn px-3" style="padding:10px 0; background-color: rgba(216, 215, 215, 0.2);"><i class="fas fa-home text-white" style="font-size:29px;"></i></button>
        </div>
        
    </footer>

    </div>
    `,
    methods:{
        searchOnSubmit(e){
            e.preventDefault();     //to not refresh the page

            const searchTerm = this.searchInput.trim();       //trim used here to delete unwanted spaces

            if(!searchTerm){        //if the inserted term is not available
                alert("Please type in a search term.");
            }else{                  //if the inserted term is available
                this.searchSongs(searchTerm);
                document.getElementById("search-artist").innerHTML= "";
            }
        },
        async searchSongs(term){
            
            const result = document.getElementById("search-result");
            result.innerHTML = `
            <div id="loading">
                <div class="loading-div">
                    <div class="loading-div">
                        <div class="loading-div">
                            <div class="loading-div">
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            const response = await fetch(`${this.lyricsApiUrl}/suggest/${term}`).catch(error=>{ //catch any error
                result.innerHTML= `
                    <div class="alert alert-danger text-center" style="width:90%; margin: 0 auto;"> 
                        <h6>${error}.<h6>
                        <p>This error may occurred due to: <br>
                        1- An internet connection issue. If this is the case, try checking network cables or reconnecting to Wi-Fi.<br>
                        2- API is not responding. This might be temporarily or permanently.</p>
                        *Note: The app will automatically reload once you are back online.
                    </div>
                `
                document.getElementById("search-artist").innerHTML= "";
                if(!navigator.onLine){
                        var interval = setInterval(()=>{
                        if(navigator.onLine){ //if the user is offline
        
                             location.reload();
                            clearInterval(interval);        //then refresh page when getting back online
                            alert("You are now back online.");
                        }
                    }, 3000);
                }
                });  //fetch data from api
                const data = await response.json();             //convert these data into json format
                console.log(data);
                this.showData(data);    //passing data into showData function
        },
        showData(data){
            const moreLyrics = document.getElementById("moreLyrics");
            document.getElementById("search-result").innerHTML =
            ` <ul class="songs">
            ${data.data.map(song =>
              
                `<li>
                    <span><strong class="text-primary">${song.artist.name}</strong> - ${song.title}</span>
                    <button class="lyricsBtns" data-artist="${song.artist.name}"
                    data-songtitle="${song.title}" data-album="${song.album.title}" data-songDeezer="${song.link}"
                    data-artistDeezer="${song.artist.link}">Get lyrics</button>
                </li>`
               
                   ).join("")}
               </ul>
           `;  
           if(data.prev || data.next){
            moreLyrics.innerHTML =`
            ${data.prev 
              ? `<button class="lyricsBtns" data-prev="${data.prev}"><i class="fas fa-angle-double-left">
              </i> Prev</button>`
              : ""
           } 
           ${data.next 
               ? `<button class="lyricsBtns" data-next="${data.next}">Next <i class="fas fa-angle-double-right">
               </i></button>`
               : ""
           }
            `;
           }else{
               moreLyrics.innerHTML =  "";
           }
           
        
    },
    loadMoreLyrics(e){
        const clickedBtn2 = e.target;
        
        if(clickedBtn2.tagName === "BUTTON"){
            const next = clickedBtn2.getAttribute("data-next");
            const prev = clickedBtn2.getAttribute("data-prev");
            if(next){
                this.getMoreLyrics(next);
            }else if(prev){
                this.getMoreLyrics(prev);
            }
        }
    },
     async getMoreLyrics(url){
         
            const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
            const data = await res.json();
       
            this.showData(data);
    },
     async getLyrics(artist, songTitle, album, songDeezer, artistDeezer){
        const result = document.getElementById("search-result");
        const moreLyrics = document.getElementById("moreLyrics");
        const artistDOM = document.getElementById("search-artist");
        result.innerHTML = `
                    <div id="loading">
                        <div class="loading-div">
                            <div class="loading-div">
                                <div class="loading-div">
                                    <div class="loading-div">
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        moreLyrics.innerHTML ="";
        const resp = await fetch(`${this.lyricsApiUrl}/v1/${artist}/${songTitle}`);
        const data = await resp.json();
        // console.log(data);
        if(data.error){        //if there is any error
            result.innerHTML =` 
            <div class="alert alert-danger text-center p-1 mt-5" style="width:90%; margin: 0 auto;">
                <h6>${data.error}</h6> 
            </div>
             `   //then show this error
        }else{      //else, show the lyrics
            const lyrics = data.lyrics;
            
            result.innerHTML = `
            <div style="padding:14px;" id="results">
                
                   <h3><strong>${artist}</strong> - ${songTitle}</h3>
                    <h5>Album/Single Song Title: "${album}"</h5>
                    <div class="deezer"><span><a href="${songDeezer}" target="_blank">Check song on Deezer</a> <i class="fas fa-external-link-alt fa-sm" style="color:rgb(27, 27, 27); margin-right:8px;"></i></span>  <span><a href="${artistDeezer}" target="_blank">${artist} on Deezer</a> <i class="fas fa-external-link-alt fa-sm" style="color:rgb(27, 27, 27);"></i></span></div>
                    
                    <br>
                   <article class="lyrics-style mt-2" >${lyrics}</article>
                  
           </div>
            `;

            $.ajax({
                type: "GET",
                url: `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=c97bb1d27fa8605e3980c6ad761e0648&artist=${artist}&album=${album}&format=json`,
                dataType: "jsonp",
                contentType: 'application/json',
                success: function(data) {  
                    console.log(data); 
                    var albumInfo = data.album;
                    
                    if(albumInfo === undefined){
                        artistDOM.innerHTML = "";
        
                    }else{
                        if(albumInfo.listeners){
                        var  listenersNumFormatted = parseFloat(albumInfo.listeners).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        }
                        if(albumInfo.playcount){
                            var playCountFormatted = parseFloat(albumInfo.playcount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        }
                    }
                    
                    
                    if(!data.error){ // avoids dealing with data if there is any error
                        artistDOM.innerHTML = `
                    <div id="accordion">
                        <div class="card" style="box-shadow: 0 3px 15px 0 rgba(0,0,0,0.1);">   
                            <div class="card-header py-2" >
                                <h5 style="font-weight:600;" class="albumHeader" >Album Information</h5>
                            </div>
                            
                            <img src="${albumInfo.image[4]["#text"] ? albumInfo.image[4]["#text"] : 'defaultImg-min.png'}" class="card-img-top img-responsive img-fluid" id="cardImg" alt="${artist} picture">
                            <a data-toggle="collapse" v-on:click="isShowBtnClicked"  data-parent="#accordion" href="#showCard"  class="btn btn-block text-white; py-1 showMore-LessBtn" style="background-color:#6B5B95 !important; color:#fff !important; border-top-left-radius:0px !important; border-top-right-radius:0px !important; outline= none !important;"><i class="fas fa-arrow-down fa-lg mr-2 rotate-icon"></i><span class="btnText">Show More..</span></a>
                            <div class="card-body text-left collapse" id="showCard" style="background-color:rgba(28, 74, 92,0.1);">
                                <article >
                                <p class="text-left text-dark m-0" style="font-size:17px;">${albumInfo.wiki ? "<span style='font-size:15px; font-weight:bold;'>Release date:</span> " +albumInfo.wiki.published : "" }</p>
                                <p class="text-left text-dark m-0" style="font-size:17px;" style="white-space:pre-line;">${albumInfo.listeners ? "<span style='font-size:15px; font-weight:bold;'>Listeners on Last.fm:</span> " + listenersNumFormatted : "" }</p>
                                <p class="text-left text-dark m-0" style="font-size:17px;" style="white-space:pre-line;">${albumInfo.playcount ? "<span style='font-size:15px; font-weight:bold;'> play Count: </span>" + playCountFormatted: "" }</p>
                                
                                <div class="mt-2">
                                ${albumInfo.tags.tag.map(item=>
                                    
                                    `
                                    <li>
                                        <a href="${item.url}" target="_blank">${item.name ? "#"+item.name : ""}</a>
                                    <li>
                                    `
                                    
                                    ).join("")
                                }
                                </div>


                                <div class="socials">
                                    <a class="links" href="${albumInfo.url}" target="_blank"><i class="fab fa-lastfm" style="color:#d51007;" title="Last.fm"></i></a>
                                </div>
                                <article>
                            </div>
                        </div>

                    </div>
                    `


                    }
                },
                error: function(){
                    artistDOM.innerHTML = "";
                }
                
            });

        }
             moreLyrics.innerHTML = "";
        },
        resultBtns(e){
            var clickedBtn = e.target;
            if(clickedBtn.tagName === "BUTTON"){
                const artist = clickedBtn.getAttribute('data-artist');
                
                const songTitle = clickedBtn.getAttribute('data-songtitle');
                const album = clickedBtn.getAttribute('data-album');
                const play = clickedBtn.getAttribute('data-playSample');
                const songDeezer = clickedBtn.getAttribute('data-songDeezer');
                const artistDeezer = clickedBtn.getAttribute('data-artistDeezer');
                console.log(artist, songTitle,album, songDeezer, artistDeezer);
                this.getLyrics(artist, songTitle,album, songDeezer, artistDeezer);
            }
        },
        changeToMenu(){
            mainApp.switchComp = "app-start";
            mainApp.clickSoundEffect()
            $(document).ready(function(){
                 $(".container").css("padding-left","15px");
                 $(".container").css("padding-right","15px");
            })
           
        },
        isShowBtnClicked(){
            console.log("works");
            var icon = document.querySelector(".rotate-icon");
            var btnText = document.querySelector(".btnText");
       
           if(btnText.innerHTML== "Show More.."){
               icon.style.transform="rotateZ(180deg)";
               btnText.innerHTML= "Show Less";
               
           }else{
               icon.style.transform="rotateZ(0deg)";
               btnText.innerHTML= "Show More..";
           }
        }
    },
    created(){
        $(document).ready(function(){
            $(window).scroll(function(){
                var scroll = $(window).scrollTop();
                if(scroll >=230){
                    $(".lyrics-search").addClass("fixedSearchbar");
                    $(".lyrics-search input").addClass("fixedSearchbarInput");
                    $(".lyrics-search button").addClass("fixedSearchbarButton");
                }else{
                    $(".lyrics-search").removeClass("fixedSearchbar");
                    $(".lyrics-search input").removeClass("fixedSearchbarInput");
                    $(".lyrics-search button").removeClass("fixedSearchbarButton");
                }
                });
        
        
                $(window).scroll(function(){
                    var scroll = $(window).scrollTop();
                    if(scroll >=1500){
                        $(".arrow-up").css("display","block");
                    }else{
                        $(".arrow-up").css("display","none");
                    }
                });
        
        
                $("#arrowUp").on("click",function(event){
                    if(this.hash != ""){
                        event.preventDefault(); //prevent the default action
        
                        const hash = this.hash;
                        
                        $("html, body").animate({ //custom settings
                                    scrollTop: $(hash).offset().top
                                    
                        },1100, function(){
                            window.location.hash = hash;
                        });   
                    }
                        
                });
            });
    }
});

var mainApp = new Vue({
    el: "#app",
    data: function(){
        return{
            switchComp:'app-start',
            timeLeft: 0,   
            appTitle: "Appchirp",
            muteQuiz: false,  //End of main App data
        }
    },
    methods:{
        clickSoundEffect(){
            document.getElementById("buttonClicked").play();
        },
        playTickingClock(){
            document.getElementById("tickingClock").play();
        }
    },
    created(){
        $('.modal').bind('shown.bs.modal', function () {
            $(".modal").css("overflow-y", "scroll");
          });
          $('.modal').bind('hide.bs.modal', function () {
            $(".modal").css("overflow-y", "auto");
          });
    }

});