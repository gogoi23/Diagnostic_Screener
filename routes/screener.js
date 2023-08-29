/*
* This is the api I built. It has two endpoints. One endpoint sends the diagnostic screener from part 2.
* The other endpoint was built for part one. It takes in a patient's answers and sends a diagnosis. 
*/

var express = require('express');
var router = express.Router();
const sql = require('./db.js');

//this is the diagnostic screener. I named it questionnaire but it still contains all the information
//that part two specified. 
let questionnaire= {
  "id": "abcd-123",
  "name": "BPDS",
  "disorder": "Cross-Cutting",
  "content": {
    "sections": [
      {
        "type": "standard",
        "title": "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
        "answers": [
          {
            "title": "Not at all",
            "value": 0
          },
          {
            "title": "Rare, less than a day or two",
            "value": 1
          },
          {
            "title": "Several days",
            "value": 2
          },
          {
            "title": "More than half the days",
            "value": 3
          },
          {
            "title": "Nearly every day",
            "value": 4
          }
        ],
        "questions": [
          {
            "question_id" : "question_a",
            "title": "Little interest or pleasure in doing things?"
          },
          {
            "question_id": "question_b",
            "title": "Feeling down, depressed, or hopeless?"
          },
          {
            "question_id": "question_c",
            "title": "Sleeping less than usual, but still have a lot of energy?"
          },
          {
            "question_id": "question_d",
            "title": "Starting lots more projects than usual or doing more risky things than usual?"
          },
          {
            "question_id": "question_e",
            "title": "Feeling nervous, anxious, frightened, worried, or on edge?"
          },
          {
            "question_id": "question_f",
            "title": "Feeling panic or being frightened?"
          },
          {
            "question_id": "question_g",
            "title": "Avoiding situations that make you feel anxious?"
          },
          {
            "question_id": "question_h",
            "title": "Drinking at least 4 drinks of any kind of alcohol in a single day?"
          }
        ]
      }
    ],
    "display_name": "BDS"
  },
  "full_name": "Blueprint Diagnostic Screener"
}

//This is the endpoint that I was instructed to build in part 2. 
//It sends the questionare above as a json object.
router.get('/', function(req, res, next) {
  res.json(questionnaire);
});

// This is the endpoint that I was instructed to build in part 1. It takes in an array of question objects.
// These question objects each have a value and question_id. The code goes through the array and determines
// the patients conditions. It then returns an array of those conditions. 
router.post('/', async function(req, res, next) {
  //This is the return value. After the question array is processed it puts all the conditions in this array.
  diagnosis = []; 
  //This is the question array that the code pulls from the req body.
  let questions = JSON.parse(req.body.submission); 

  //TODO: check if the submission parameter exists and is a valid format

  // This object is used to keep track of the patients conditions. 
  let diagnosisScore = {
    depression : 0,
    mania	: 0,
    anxiety	: 0,
    substance_use : 0
  };

  // This try and catch block will preform a query to retrieve the domain mapping. 
  try {
    // This code stores the domain mapping in results
    // Since this is an asynchronous function I have used the promise syntax so the code
    // waits for it to retrieve the data from the database before proceeding. 
    const results = await new Promise(function(resolve, reject) {
        sql.dbquery("select * from domainmap", function(error, results) {
        if (error) {
          reject(error);
        } 
        else {
          resolve(results);
        }
        });
    });

    // this iterates through all the questions given in the parameter.
    for(let i =0; i<questions.length;i++){ 
     /* results array to search for an object that matches a specific condition. The condition being checked 
      * is whether the question_id property of the current result object is equal to the question_id property 
      * of the i-th question object from the questions array. Once a matching result object is found, 
      * its domain property is extracted and stored in the domain variable
      */
      let domain = results.find(result => result.question_id == questions[i].question_id).domain;
      
      // TODO: check if the question_Id exists 

      // add the questions score the respective current domain map. 
      diagnosisScore[domain] = diagnosisScore[domain] + questions[i].value;
    }
      
  } 
  catch (error) {
      //todo: Handle the error
  }
  
  // This logs the scores in the terminal.
  console.log("\nscores");
  for (let key in diagnosisScore) {
    console.log(key + ", " + diagnosisScore[key]);
  }

  // These if statements add conditions to the diagnosis array if their scores match
  if(diagnosisScore["depression"] >= 2 || diagnosisScore["anxiety"] >= 2){
    diagnosis.push("PHQ-9");
  }
    
  if(diagnosisScore["mania"] >= 2){
    diagnosis.push("ASRM");
  }
    
  if(diagnosisScore["substance_use"]){
    diagnosis.push("ASSIST");
  }
    
  // This try and catch block will preform a query to insert the answers into the 
  // database. 
  // Since this is an asynchronous function I have used the promise syntax so the code
  // waits for it to insert the data from the database before proceeding. 
  try {
    // TODO: Check the parameters before inserting them.
    // TODO: Do not hard code the query string. 
    let insertQuery = "insert into answers values ("+questions[0].value+","+questions[1].value+","+questions[2].value+","+questions[3].value+","+questions[4].value+","+questions[5].value+","+questions[6].value+","+questions[7].value+")";
    await new Promise(function(resolve, reject) {
      sql.dbquery(insertQuery, function(error, results) {
      if (error) {
        reject(error);
      } 
      else {
        resolve(results);
      }
      });
    });
    
  } 
  catch (error) { 
    // TODO: Handle the error 
  }
  
  // This logs the diagnosis 
  console.log("\n diagnosis");
  console.log(diagnosis);
  
  // This checks the diagnosis. If there are no symptoms then it returns a string 
  // that says none.
  // Otherwise it returns the diagnosis. 
  if(diagnosis.length == 0){
    res.send("none");
  }
  else{
    res.send(diagnosis);
  }

});

module.exports = router;