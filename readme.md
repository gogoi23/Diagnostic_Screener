Notes: The code files that I spent the most time on making were index.js in public/javascripts, index.html in public, db.js in routes and screener.js in routes. 

Demo Video Link: https://youtu.be/b1QbsA2vVyM

Link: http://18.188.14.253:3000
    This link may not work. I have to refresh the server once in a while. If you want to acess the website and it does not work please contact me and I will refresh the server. 

Instrucions: 
    If you want to run it locally follow these instructions 
    
    Step 1: download node.js.

    step 2: download mysql

    step 3: run this script in mysql
        create database diagnostic_screener;
        use diagnostic_screener;

        create table domainmap(
            question_id VARCHAR(50),
            domain VARCHAR(50)
        );
        INSERT INTO domainmap (question_id, domain)VALUES
            ('question_a', 'depression'),
            ('question_b', 'depression'),
            ('question_c', 'mania'),
            ('question_d', 'mania'),
            ('question_e', 'anxiety'),
            ('question_g', 'anxiety'),
            ('question_h', 'substance_use'),
            ('question_f', 'anxiety');
        
        CREATE TABLE answers(
            question_a INT,
            question_b INT,
            question_c INT,
            question_d INT,
            question_e INT,
            question_f INT,
            question_g INT,
            question_h INT
        );

    
    Step 4: open up a terminal and navigate to inside diagnostic screener.

    step 5: Run npm install.

    step 6: run npm start and go to http://localhost:3000  

Description of the problem and solution
    Problem:
        I was asked to build to build a service that would allow a patient 
        to take a special assesment which would ask them about their symptoms. Once 
        the system recieves the patient's answers it would evaluate the patients response and assigns an assesment based on their symptoms. 
    Solution:
        I built an express web app hosted on an Amazon EC2 instance. When the user goes to the website they are prompted to answer the questions which the client side gets from the server side. The user is prompted to answer 8 questions. 
        When the user is done their answer are sent to the server side where they are stored in a mysql database which is hosted in the same Amazon EC2 instance. The server side then processes the assesment based on their symptoms and sends this assement back to the front end and the user can view their assesment as well as how their answers were scored. 

Reasoning behind your technical choices
    I tried to avoid hardcoding as much as possible to make the code more dynamic and easier to update. For example in the client side I did not implement the buttons for the answers on the html page. Instead I made the javascript in the client side iterate through all the questions sent from the back end and created a button in each iteration. This way the programmer can add more answer options dynamically in the form itself. I also used the same concept for the questions as well. 

Describe how you would deploy this as a true production app on the platform of your choice:
    How would ensure the application is highly available and performs well?
        I would have multiple people use the product in different regions to see if the program runs well. 

    How would you secure it?
        I would encrypt any data sent through get and post requests. I would also try to use environment variables as credentials to access to the mysql Database Instead of hardcoded variables. I would also put a lot more security checks around user inputs and sql insert statements to protects against things like sql injection attacks.   

    What would you add to make it easier to troubleshoot problems while it is running live?
        I would add a lot of log statements that print out useful information such as the query string, user input, current scores, etc. 

Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
    I hosted the website on an aws instance. However it is not fully functional. It stops responding after a while and I have to refresh it. If I had more time I would use a more secure method of hosting the website. 

    One of the trade off I picked was choosing functionality and efficiency over asthetics. I would say that this application is easy to use and implements all the required features. However aesthetically it is very bare bones. If I had more time I would spend more time developing the css files. 
    
    I did not monitor the user input or given paramters very closely. If I had more time I would add more error handling to check if the user input is properly formatted to prevent issues like over flow or sql injection attacks. I would also encrypt all data sent in post and get requests to ensure more security. If I had more time I would encrypt all data in the mysql database as well.  
    
    I hardcoded the credentials to acess the database instead of using environment variables. If I had more time I would try to user environment variables to ensure a more secure environment. I would also do more research on Connection Pooling which I have heard leads to a more secure connection. 

Link to other code you're particularly proud of
    https://github.com/gogoi23

Link to your resume or public profile
    https://www.linkedin.com/in/anandgogoi/


        