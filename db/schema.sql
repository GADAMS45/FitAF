DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

USE user_db;

CREATE TABLE user_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE fitness_goals (
    goal_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id)
    REFERENCES user_table(id),
    fitness_goal VARCHAR(100) NOT NULL,
    target_weight DECIMAL(5,2),
    target_duration INT
);

CREATE TABLE user_workouts (
    workout_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id)
    REFERENCES user_table(id),
    goal_id INT,
    FOREIGN KEY (goal_id)
    REFERENCES fitness_goals(goal_id),
    workout_name VARCHAR(100) NOT NULL,
    exercise_list TEXT,
    duration INT,
    intensity_level VARCHAR(50),
    date DATE
);

CREATE TABLE user_recipes (
    recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id)
    REFERENCES user_table(id),
    goal_id INT,
    FOREIGN KEY (goal_id)
    REFERENCES fitness_goals(goal_id),
    recipe_name VARCHAR(100) NOT NULL,
    ingredients TEXT,
    nutrition_info TEXT,
    cooking_instructions TEXT
);