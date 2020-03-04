# Calorie-Tracker
Exercise and Diet online management assistant to give real-time feedback based on personal body information &amp; vast data library

## Data sources & Technologies
Pandas is used for acquiring the exercise-related data from websites and data
preprocessing and cleaning.

## Architecture
| **Specification** | **Tool** |
|------------------|:----------:|
|Development| Node.js|
|server| express|
|database|AWS EC2, SQL|
|architecture|REST API|
|user interface|Angular.JS, Bootstrap|

## Functionalities
### User registration:
Build each user’s profile including username, physical profile (height, weight, age), fav_food, fav_exercise (type), aim (muscle gain, fat loss, maintain), BMRs.
*BMR calculation:
Basal Metabolic Rate (BMR) is equivalent to the amount of energy (in the form of calories) that your body needs to function if it were to rest for 24 hours. Calculating the user’s BMR based on the following equations:
For men: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) + 5
For women: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) – 161
*BMRs: calculate the daily calories the user needs to consume based on their BMR and aim. For example, if a 23-year-old female chose “fat loss” as aim, then the BMRs for this user should be BMR-250 (cal/day)

### Calories track:
User input food and exercise took of the day
The app calculates the calories of the certain user and record
Summary: user can select to read their records in a week/ month/ season

### Advising:
Recommend up to 5 exercises based on user’s fav_exercise
Recommend up to 5 food based on the user’s goal and the food’s nutrition

### Evaluation:
Real-time evaluation based on user’s tracks and BMRs. For example, if Tom’s BMRs is calculated to be -1500 cal/day, Tom has a calculated calorie of -1300 based on the food and exercise he had already input till the time, the app should recommend an exercise that will help Tom to consume 200 cal.

### Inquiring:
Input food name returns the nutrition that food contains.
Input exercise name, return the calories that exercise can consume in unit time
Input calories return up to 3 food that contains certain input calories
Input nutrition returns up to 3 food that will help to gain that nutrition
Input calories and time return up to 3 exercises that can consume that calorie in the given time

## Performance evaluation
1. We manipulated our schema to ensure all our relations are in 3NF, and
subsequently, there is no redundancy in the tables after redistributing our data.

2. We also performed a query optimization on our complex query: find the real-time
personalized advice feedback. Basically, we need to join EXERCISE_TRACK and MET
on exercise name, join FOOD_TRACK and NUTRITION on food name. With the
complex calculation with then got the difference with a value in the USERS table. In the
beginning, we ended up relatively slow querying at ~200ms (as the two TRACK tables
increased to ~500 rows each) because we initially didn't consider adding indexes. With
indexes on FOOD_TRACK(food_name) and EXERCISE_TRACK(exercise_name), we
made the time reduced to ~30ms.
