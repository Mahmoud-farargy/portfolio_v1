new Vue ({
    el: "#app",
    data:{
        gameMainRounds: 3,
        playerRoundsLeft: 3,
        monsterRoundsLeft: 3,
        bonusRound: false,
        dashboard: false,
        mainBtn: true,
        attachDisabledForAttack: false,
        attachDisabledForHeal: false,
        status: false,
        statusList:[""],
        specAttackCount: 2,
        healCount: 3,
        attackImg: false,
        isGameOn: true,
        specAttackImg: false,
        healImg: false,
        winner: false,
        loser: false,
        barYouColor: "green",
        barMonsterColor: "green",
        barYouWidth: 100,
        barMonsterWidth: 100,
    },
    computed:{
        barYou: function(){
            if(this.barYouWidth >80){
                this.barYouColor="green";
            }
            if(this.barYouWidth <=80){
                this.barYouColor="rgb(192, 192, 24)";
            }
            if(this.barYouWidth <=49){
                this.barYouColor="orange";
            }
            if(this.barYouWidth <=20){
                this.barYouColor="red";
                this.txtshadow="none";
            }
            if(this.barYouWidth <= 0){
                if(this.gameMainRounds == 3){
                    alert("The monster won the first round. Get ready for the second round. 👎");
                }
                if(this.gameMainRounds == 2){
                    alert("The monster won this round. Get ready for the next round. 👎");
                }
                if(this.gameMainRounds ==1){
                    alert("The monster won this round. Get ready for the last round. 👎");
                }
                this.resetGame();
                this.mainBtn= false;
                this.dashboard= true;
                this.playerRoundsLeft--;
                this.gameMainRounds--;
                this.gameCheck();
            }
            return{
                backgroundColor: this.barYouColor,
                textShadow: this.txtshadow,
                width: this.barYouWidth +'%'
            }
        },
        barMonster: function(){
            if(this.barMonsterWidth <=80){
                this.barMonsterColor="rgb(192, 192, 24)";
            }
            if(this.barMonsterWidth <=49){
                this.barMonsterColor="orange";
            }
            if(this.barMonsterWidth <=20){
                this.barMonsterColor="red"
            }
            if(this.barMonsterWidth <=0){
                if(this.gameMainRounds == 3){
                    alert("You won the first round. Get ready for the second round. 👍");
                }
                if(this.gameMainRounds == 2){
                    alert("You won this round. Get ready for the next round. 👍");
                }
                if(this.gameMainRounds == 1){
                    alert("You won this round. Get ready for the last round. 👍");
                }
                this.resetGame();
                this.mainBtn= false;
                this.dashboard= true;
                this.monsterRoundsLeft--;
                this.gameMainRounds--;
                this.gameCheck();
            }
            return{
                backgroundColor: this.barMonsterColor,
                width: this.barMonsterWidth +'%',
            }
        }
    },
    methods:{
        attack: function(){
            if(this.barYouWidth >0 && this.isGameOn){
                this.attackImg= true;
                this.specAttackImg= false;
                this.healImg= false;
                this.winner= false;
                var max= 12;
                var min = 5;
                var randomNum = Math.max(Math.floor(Math.random()* max)+1, min);
                
                console.log(randomNum, randomNum);
                this.barYouWidth-=randomNum;
                this.statusList.unshift("Player hits monster for "+ randomNum );
                //this data will be overridden by the following code
                max=10;
                min=3;
                randomNum = Math.max(Math.floor(Math.random()* max)+1, min);
                this.barMonsterWidth-=randomNum;
                this.statusList.unshift("Monster hits Player for "+ randomNum);
                this.status= true;
                this.loser= false;
            }
        },
        specAttack: function(){
            if(this.specAttackCount >=1 && this.isGameOn){
                if(this.barYouWidth > 0 || this.barMonsterWidth >0){
                this.specAttackCount--;
                this.specAttackImg= true;
                this.attackImg=false;
                this.healImg= false;
                this.winner= false;
                var max= 13;
                var min = 5;
                var randomNum = Math.max(Math.floor(Math.random()* max)+1, min);
                
                console.log(randomNum, randomNum);
                this.barYouWidth-=randomNum;
                this.statusList.unshift("Player hits monster for "+ randomNum);

                max= 20;
                min= 10;
                randomNum = Math.max(Math.floor(Math.random()* max)+1, min);
                this.barMonsterWidth-=randomNum;
                this.statusList.unshift("Monster hits player for "+ randomNum);
                this.status= true;
                this.loser= false;
                }
            }
            if(this.specAttackCount <= 0){
                this.attachDisabledForAttack= true;
            }   
        },
        heal: function(){
            if(this.healCount >=1 && this.barYouWidth <=99 && this.isGameOn){
                this.healCount--;
                this.healImg= true;
                this.attackImg= false;
                this.specAttackImg= false;
                if(this.barYouWidth <=90){
                    var max1 = 10
                    var min1 = 8
                    var randomNum2 = Math.max(Math.floor(Math.random()* max1)+1, min1);
                    this.barYouWidth+= randomNum2;
                    this.statusList.unshift("Player heals himself for " + randomNum2);
                    var max=6;
                    var min=3;
                    randomNum = Math.max(Math.floor(Math.random()* max)+1, min);
                    this.barYouWidth-= randomNum;
                    this.statusList.unshift("Monster hits player for "+ randomNum);             
                    }else{
                        this.barYouWidth=100;
                    }
            }
            if(this.healCount <= 0){
                this.attachDisabledForHeal= true;
            }            
        },
        giveUp: function (){
            var con = confirm("Are you sure you want to quit?");
            if(con == true){
            alert("You lost!");
                this.resetGame();
                this.loser= true;
                this.mainBtn= true;
                this.dashboard= false;
                this.gameMainRounds= 3;
                this.playerRoundsLeft= 3;
                this.monsterRoundsLeft= 3;
            }
            
        },
        resetGame: function(){
            this.barMonsterWidth=100;
            this.barYouWidth= 100;
            this.status= false;
            this.barMonsterColor="green";
            this.barYouColor="green";
            this.statusList=[""];
            this.specAttackCount=2;
            this.healCount=3;
            this.attackImg= false;
            this.specAttackImg=false;
            this.bonusRound= false;
            this.healImg= false;
            this.isGameOn=true;
            this.winner=false;
            this.loser=false;
            this.attachDisabledForAttack= false;
            this.attachDisabledForHeal= false;
        },
        gameCheck: function(){
            if(this.gameMainRounds === -1){
                if(this.playerRoundsLeft > this.monsterRoundsLeft){
                    if(confirm("You won the game! Well Done. Would you like to start a new game? ✌️")){
                        this.resetGame();
                        this.loser=false
                        this.winner=true;
                        this.mainBtn= true;
                        this.dashboard= false;
                        this.gameMainRounds= 3;
                        this.playerRoundsLeft= 3;
                        this.monsterRoundsLeft= 3;
                    }else{
                        this.resetGame();
                        this.winner=true;
                        this.status= false;
                        this.mainBtn= true;
                        this.dashboard= false;
                        this.gameMainRounds= 3;
                        this.playerRoundsLeft= 3;
                        this.monsterRoundsLeft= 3;
                    }
                }
                if(this.monsterRoundsLeft > this.playerRoundsLeft){
                        if(confirm("The monster won the game! Good luck next time. Would you like to start a new game?")){
                            this.resetGame();
                            this.mainBtn= true;
                            this.dashboard= false;
                            this.gameMainRounds= 3;
                            this.playerRoundsLeft= 3;
                            this.monsterRoundsLeft= 3;
                            this.loser= true;
                        }else{
                            this.resetGame();
                            this.mainBtn= true;
                            this.dashboard= false;
                            this.gameMainRounds= 3;
                            this.playerRoundsLeft= 3;
                            this.monsterRoundsLeft= 3;
                            this.loser= true;
                    } 
                }else if(this.monsterRoundsLeft === this.playerRoundsLeft && this.gameMainRounds == -1){
                        alert("You and the monster got the same score so it's time for a bonus round. 👌");
                        this.resetGame();
                        this.mainBtn= false;
                        this.dashboard= true;
                        this.bonusRound=true;
                }
            }else if(this.gameMainRounds === -2){
                if(this.playerRoundsLeft > this.monsterRoundsLeft){
                    if(confirm("You won the game! Well Done. Would you like to start a new game? ✌️")){
                        this.resetGame();
                        this.winner=true;
                        this.mainBtn= true;
                        this.dashboard= false;
                        this.gameMainRounds= 3;
                        this.playerRoundsLeft= 3;
                        this.monsterRoundsLeft= 3;
                    }else{
                        this.winner=true;
                        this.status= false;
                        this.mainBtn= true;
                        this.dashboard= false;
                        this.gameMainRounds= 3;
                        this.playerRoundsLeft= 3;
                        this.monsterRoundsLeft= 3;
                    }
                }
                if(this.monsterRoundsLeft > this.playerRoundsLeft){
                        if(confirm("The monster won the game! Good luck next time. Would you like to start a new game?")){
                            this.resetGame();
                            this.mainBtn= true;
                            this.dashboard= false;
                            this.gameMainRounds= 3;
                            this.playerRoundsLeft= 3;
                            this.monsterRoundsLeft= 3;
                            this.loser= true;
                        }else{
                            this.mainBtn= true;
                            this.dashboard= false;
                            this.gameMainRounds= 3;
                            this.playerRoundsLeft= 3;
                            this.monsterRoundsLeft= 3;
                            this.loser= true;
                    } 
                }
            }
            
        }
        
    }

}
)