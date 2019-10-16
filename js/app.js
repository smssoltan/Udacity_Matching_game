/*
*Name: Sultan Shagal
*Project: 2
*In this project we implement the functionality of a matching game. 
*/
let AllCards = document.querySelectorAll('.card'); //NodeList that holds all elements that contains the class .card
let openCard=[]; //empty array that will holds the opened card's class name.
let matchedCards=[]; //an empty array that later will contains all the matched card's class name.
let Min=0; // using it to display minutes.
let StarRating=3; //using it to display the initial number of stars.  

let Node = document.createElement('span'); //using it to hold the created element.
Node.className="Timer";  // add a class name to the element.
let TextNode = document.createTextNode('Time: 0 min 0 sec'); //initial text of the element.
Node.appendChild(TextNode); //append the text to the element.
document.querySelector('.score-panel').appendChild(Node); //append the element to the parent element score panel
document.querySelector('.score-panel').insertAdjacentElement('beforeBegin', Node); //adjust the position.
let ListOfClasses=[]; //empty array that will later be used to contain the list of names of classes.

document.querySelector('.moves').innerHTML=0;  //set the number of moves to 0 

let counter= 0; // a variable that counts the number of moves that was played.
let TimeUp= false;  //a boolean variable that turn to true when the game reaches an end state.
stars=document.querySelectorAll('li');  // I used it to have access to the stars.

//* on page load

window.addEventListener('load', function(e){
    
    //* from here, I use this loop to save all the classes name in an array.
    for(let i =0; i<AllCards.length;i++){
        let className=AllCards[i].firstElementChild.className;
        ListOfClasses.push(className);

    }

    
    let NewClassesList = shuffle(ListOfClasses); // I creat a new list contains the shuffled classes name

    //* now I use this loop to initialize the shuffled classes name to the cards.
    for(let i =0; i<AllCards.length;i++){
        AllCards[i].firstElementChild.className=NewClassesList[i];
    }

    //Add golden stars on load
    stars[0].style.color='#edcd72';
    stars[1].style.color='#edcd72';
    stars[2].style.color='#edcd72';
   
    //* I use this function to remove the classes names. So that all cards would be flipped down when the page loads.
    AllCards.forEach(function(card){
    
        card.classList.remove('match', 'show', 'open');
        

    })
    
    Timer=0; //set sec to 0
    

    setInterval(function () { 
        // * if the time reaches 60 sec, reset it to 0 sec and increment the value of Min by 1;
        Timer++;
        if(Timer==60)
        {    
            Timer=0;
            Min++;
         
        }
        document.getElementsByTagName('span')[0].textContent=`Time: ${Min} min ${Timer} sec`;
        
        if(TimeUp==true)
        {clearInterval();}
    

    }
    , 1000)
    
});


AllCards.forEach(function(card){
   
    card.addEventListener('click', function(event){

        //* if a card is flipped down, flip it up whenever a click on a card occurs.
        if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
            openCard.push(card);
            card.classList.add('open','show');
            console.log('Open Card: ', openCard[0], openCard[1]);

            let FirstCard=openCard[0].querySelector('i').classList.item(1);
            

            //* whenever 2 cards are selected.
            if (openCard.length==2){

                let secondCard=openCard[1].querySelector('i').classList.item(1);

                if(FirstCard==secondCard)
            {
                //* if matched add class match to it.                
                    setTimeout(function(){openCard.forEach(function(card){
                        card.classList.add('match');
                        matchedCards.push(card);
                        if(matchedCards.length==16){
                            TimeUp=true;
                            let mes= confirm(`Congrats, you finished the game! It took you ${Min} minutes ${Timer} seconds, and ${counter} moves to win the game. Your star rating is: ${StarRating} stars.

Click OK to play again! Or Cancel to leave.`)
                            if(mes==true){

                                Timer=0; Min=0; counter=0; document.getElementsByTagName('span')[1].innerHTML=0;
                                let NewClassesList = shuffle(ListOfClasses); // I creat a new list contains the shuffled classes name
                        
                            //* now I use this loop to initialize the shuffled classes name to the cards.
                            for(let i =0; i<AllCards.length;i++){
                                AllCards[i].firstElementChild.className=NewClassesList[i];
                            }
                                stars[0].style.color='#edcd72';
                                stars[1].style.color='#edcd72';
                                stars[2].style.color='#edcd72';
                           
                            //* I use this function to remove the classes names. So that all cards would be flipped down when the page loads.
                            AllCards.forEach(function(card){
                            
                                card.classList.remove('match', 'show', 'open');
                                
                        
                            })
                            }
                        
                        }
                        });
                    }, 500)  //half sec delay.
            }
            //* if not matched flip them back.
            setTimeout(function(){
                openCard.forEach(function(card){
                    card.classList.remove('open','show');
                    });
                openCard= [];
                }, 1000);  counter+=1; document.getElementsByTagName('span')[1].innerHTML=counter;
                
                if(counter>=12 && counter<16){
                    stars[0].style.color='#edcd72';
                    stars[1].style.color='#edcd72';
                    stars[2].style.color='gray';
                    StarRating=2;
                  
                }
                
                else if(counter>=16){
                    stars[0].style.color='#edcd72';
                    stars[1].style.color='gray';
                    stars[2].style.color='gray';
                    StarRating=1;
                                                       
                }
            
            }
        }

    
    
    });
})
//* Whenever the reset button was clicked, reset the time, number of moves to 0. Also, Flip all the cards down. Lastly, Shuffle the cards.
document.querySelector('.fa-repeat').addEventListener('click',ResetFunction=function(e)
{
    if(e)
    {
        Timer=0; Min=0; counter=0; document.getElementsByTagName('span')[1].innerHTML=0;
        let NewClassesList = shuffle(ListOfClasses); // I creat a new list contains the shuffled classes name

    //* now I use this loop to initialize the shuffled classes name to the cards.
    for(let i =0; i<AllCards.length;i++){
        AllCards[i].firstElementChild.className=NewClassesList[i];
    }
        stars[0].style.color='#edcd72';
        stars[1].style.color='#edcd72';
        stars[2].style.color='#edcd72';
   
    //* I use this function to remove the classes names. So that all cards would be flipped down when the page loads.
    AllCards.forEach(function(card){
    
        card.classList.remove('match', 'show', 'open');
        

    })
    }
}); 


//The shuffle function was given. Nothing was added
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
