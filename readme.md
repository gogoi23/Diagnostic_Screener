Link: Local Host

Instrucions: 
    If you want to run in locally follow these instructions 
    Step 1: download node.js.

    step 2: download mysql

    step 3: run this script in mysql
        
        CREATE TABLE your_table_name (
            question_id VARCHAR(50),
                domain VARCHAR(50),
   
        );
        INSERT INTO your_table_name (question_id, domain)VALUES
            ('question_a', 'depression'),
            ('question_b', 'depression'),
            ('question_c', 'mania'),
            ('question_d', 'mania'),
            ('question_e', 'anxiety'),
            ('question_g', 'anxiety'),
            ('question_h', 'substance_use'),
            ('question_f', 'anxiety');
        
        CREATE TABLE your_table_name (
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

    step 6: run npm start and navigate

        