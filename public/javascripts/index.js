// this get request recieves the diagnostic screender from the second 
// endpoint in made in part 2. 
$.get('/screener',function(data,status){
    //questions from diagnostic screener
    let questions = data.content.sections[0].questions;
    //answers from diagnostic screender 
    let answersOptions = data.content.sections[0].answers;

    // TODO: Check if the questions and answers exist and are in a valid format. 
    
    //keeps track of which question the user is on
    let questionIndex = 0;

    // This will be sent to the endpoint in made in part one
    // The user's answers will be stored here.
    // Each questionanswer element will be an object that has an id and value property 
    let questionAnswers = [];
    
    // This sets the title on the html page to match the diagnostic screener. 
    document.getElementById('title').innerHTML = data.content.sections[0].title;
    // This sets the display_name on the html page to match the diagnostic screener.
    document.getElementById('display_name').innerHTML = data.content['display_name'];

    // TODO: check if the title and display name are valid

    // This for runs through all the answer choices and creates a button for each one.
    for(let i = 0; i<answersOptions.length; i++){ 
        var answer = document.createElement("button");
        answer.textContent = answersOptions[i].title;
        answerContainer.appendChild(answer);
        
        // This assigns a function for the button.
        answer.onclick = function() {
            answerOnClick( answersOptions[i].value);
        };

        answerContainer.appendChild(document.createElement("br"));
        answerContainer.appendChild(document.createElement("br"));
    }
    
    // This sets the first question title 
    document.getElementById("question_title").innerHTML = (questionIndex+1) + ") " + questions[questionIndex].title;

    // This code is for the buttons 
    function answerOnClick(answerValue) {
        // this checks if the user is has all ready asnwered all the questions. 
        if(questionIndex < questions.length){ 
            // this creates a question answer object and stores it in the 
            // the questionAnswers array. 
            let questionAnswer = {
                "value" : answerValue,
                "question_id" : questions[questionIndex].question_id

            };
            questionAnswers.push(questionAnswer);
            
            // This updates the progress bar.
            questionIndex++;
            document.getElementById('progress_bar').value = questionIndex;

        }
        
        //this updates the question if there are still questions left. 
        if(questionIndex < questions.length){   
            document.getElementById("question_title").innerHTML = (questionIndex+1) + ") " + questions[questionIndex].title;
        }
        // this is for when after the user is done with their questions 
        else{
            
            // This logs the users responses in the format that part 1 asks for.
            console.log("User has finished the survey.");
            console.log(questionAnswers);
            
            // This sends the user answers to the endpoint created in part one.
            $.post('/screener',{ submission : JSON.stringify(questionAnswers) },function(data,status){
                // this displays the users diagnosis on the web browser. 
                document.getElementById("diagnosis").hidden = false;
                document.getElementById("diagnosis").innerHTML = "You have the following conditions: " + data ;
            });
            
            // This hides the question and answer buttons
            document.getElementById("answerContainer").hidden = true;
            
            // This notifies the user that they are done and it 
            // also shows the answers in the format that part 1 asks for
            document.getElementById('title').innerHTML = "Assessment Complete";
            document.getElementById('display_name').innerHTML = "Your answers are" 
            document.getElementById("score_card").hidden = false;
            document.getElementById("score_card").innerHTML = JSON.stringify(questionAnswers);
            
        }
    }  
});  



