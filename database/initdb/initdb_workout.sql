--DROP TABLE workout_config;

CREATE TABLE workout_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO workout_config (name, value)
VALUES 
('subdomain','workout'),
('workout_title','MH Workout'),
('workout_summary','An easy-to-use, short and effective home workout app to get toned, burn fat or build muscle in just a few minutes a day. All workouts are created based on your personal fitness profile to get you the best results. Just answer a few simple questions about your workout goal, intensity and frequency preferences, and you''ll have a fitness experience tailored just for you.'),
('workout_menu','{"Root":["programs →","workouts →","exercises →"]}'),
('exercises_summary','This list of exercises without equipment can be done daily anytime, anywhere. Even if you travel for work, if you have some space to stretch out, then you can exercise.'),
('workouts_summary','This list of workouts without equipment can be done daily anytime, anywhere. Even if you travel for work, if you have some space to stretch out, then you can workout.'),
('programs_summary',''),
('bucket_url','https://objectstorage.eu-marseille-1.oraclecloud.com/n/axrso0xdipxv/b/bucket/o/workout');

CREATE TABLE workout_exercises (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(250) NOT NULL,
    target VARCHAR(250) NOT NULL DEFAULT '',
    target_muscles VARCHAR(500) NOT NULL DEFAULT '',
    instruction TEXT NOT NULL DEFAULT '',
    hints TEXT NOT NULL DEFAULT ''
);

INSERT INTO workout_exercises (id, name, category, target, target_muscles, instruction, hints)
VALUES 
('SidePlankUnderReachRight','Side Plank Under Reach','Strength','Core','Obliques','Start in a side plank position, with your left shoulder over your elbow, your body in a straight line, and reach your right hand toward the ceiling. Twist your torso forward and slowly place your right arm under your body. Repeat and then switch sides.','When doing the side plank rotation, engage your core, tighten your abs and maintain your body in a straight line. Keep your feet stacked, maintain your elbow under your shoulder, and breathe out as you slowly twist your torso and tuck your hand under your body.'),
('GluteBridge','Glute Bridge','Strength','Lower Body','Abs,Glutes,Hamstrings','Lie on your back with your knees bent. Lift your hips off the mat, while keeping your back straight, and pause for 1 second. Return to the starting position and repeat the movement until the set is complete.','When doing the glute bridge, press down through the heels to lift your hips and keep your core and glutes tight. Maintain the upper body relaxed and keep the knees bent at a 45-degree angle. Exhale as you lift your butt off the floor and inhale as you return to the starting position.'),
('JumpingJacks','Jumping Jacks','Cardio','Full Body,Upper Body,Core,Lower Body','Shoulders,Abs,Glutes,Quadriceps,Hamstrings,Calves','Stand straight with your feet together and hands by your sides. Jump up, spread your feet and bring both hands together above your head. Jump again and return to the starting position. Repeat until the set is complete.','Keep the knees slightly bent and land softly on the balls of your feet. Engage your core and glutes and maintain your knees in line with your hips and feet. Keep your arms extended and your elbows loose during the entire exercise and maintain a steady and smooth breathing pattern.'),
('SideCrunchLeft','Side Plank Crunch','Strength','Core','Obliques','Lie on your left side with your knees slightly bent, one leg on top of the other, place your left forearm on the floor and lift your body off the ground. Lift your right arm up and raise your right leg a few inches off the floor. Crunch by bringing your right knee up toward your right elbow. Extend your right leg and right arm and repeat for the duration of the set.','Engage your core, and keep your head, neck and spine aligned. Breathe out as you crunch, and maintain a steady rhythm throughout the entire exercise.'),
('SidePlankLeft','Side Plank','Strength','Core','Obliques','Lie on your left side with your body fully extended. Lift your body off the ground and balance your weight between the forearm and the side of the foot. Keep your body in a straight line and hold for as long as you can. Change sides and repeat.','While doing side planks, position your elbow under your shoulder, keep your core engaged, your abs tight, and breathe slowly. Your body should form a straight line from your head down to your feet.'),
('SidePlankRight','Side Plank','Strength','Core','Obliques','Lie on your right side with your body fully extended. Lift your body off the ground and balance your weight between the forearm and the side of the foot. Keep your body in a straight line and hold for as long as you can. Change sides and repeat.','While doing side planks, position your elbow under your shoulder, keep your core engaged, your abs tight, and breathe slowly. Your body should form a straight line from your head down to your feet.'),
('StraightArmCirclesLeft','Straight Arm Circles','Warmup','Upper Body','Shoulders,Chest,Upper Back','Stand straight with your feet shoulder-width apart. Raise and extend your left arm to the side, without bending the elbow. Slowly rotate your arm forward, making big circles. Complete a set in one direction and then switch, rotating backward.','Stand with your spine nice and tall, inhale as you lift your arm, and exhale as you rotate your arm around. Remember to engage your core muscles and keep your back and arm straight. Keep the rotation slow and controlled.'),
('BulgarianSplitSquatLeft','Bulgarian Split Squat','Strength','Lower Body','Glutes,Quadriceps,Hamstrings,Calves','Place a step or a box behind you and stand up tall. Position your right foot on top of the step, bend your knees and lower the hips until your left thigh is parallel to the floor. Return to the starting position and repeat.','Keep your back straight, your chest open, and face front. Maintain your balance by engaging your core and keep your weight in the front heel. Breathe in as you lunge and don''t let your knee go past your toes.'),
('DownwardDogWithKneeDriveLeft','Downward Dog With Knee Drive','Strength','Full Body,Upper Body,Core,Lower Body','Triceps,Back,Abs,Glutes,Quadriceps,Hamstrings,Calves','Start in downward dog pose with your arms and legs straight and your hips up and back. Bring your left knee close to your left elbow and crunch. Extend your left leg up and to the back. Repeat for the duration of the set and then switch sides.','Keep your spine, head, and neck neutral and aligned, engage your core and glutes, and maintain your wrists and elbows straight. Breathe out as you bend the knee and bring it toward the elbow and inhale as you extend the leg up and back.'),
('Hundred','Hundred','Warmup','Core','Abs','Lie on your back with your knees bent and your legs parallel to the floor, lift your shoulders off the mat and extend your arms and legs. Inhale for a count of 5, then exhale for a count of 5 while simultaneously pumping your arms up and down. Repeat until set is complete.','Engage your core and back muscles and keep your lower back pressed against the floor. Coordinate your breath with the up and down movement of the arms.'),
('BulgarianSplitSquatRight','Bulgarian Split Squat','Strength','Lower Body','Glutes,Quadriceps,Hamstrings,Calves','Place a step or a box behind you and stand up tall. Position your left foot on top of the step, bend your knees and lower the hips until your right thigh is parallel to the floor. Return to the starting position and repeat.','Keep your back straight, your chest open, and face front. Maintain your balance by engaging your core and keep your weight in the front heel. Breathe in as you lunge and don''t let your knee go past your toes.'),
('SidePlankUnderReachLeft','Side Plank Under Reach','Strength','Core','Obliques','Start in a side plank position, with your right shoulder over your elbow, your body in a straight line, and reach your left hand toward the ceiling. Twist your torso forward and slowly place your left arm under your body. Repeat and then switch sides.','When doing the side plank rotation, engage your core, tighten your abs and maintain your body in a straight line. Keep your feet stacked, maintain your elbow under your shoulder, and breathe out as you slowly twist your torso and tuck your hand under your body.'),
('SingleLegTricepDipsLeft','Single Leg Tricep Dips','Strength','Upper Body','Triceps,Shoulders,Upper Back,Glutes,Hamstrings,Quadriceps','Sit on the mat with your knees bent, feet together, and place your hands behind you with your fingers facing forward. Lift your hips off the mat, raise your left leg and start bending your elbows. Lower your body until your glutes are almost touching the mat and then lift the hips back up by extending your arms. Repeat until the set is complete.','When doing single leg tricep dips roll your shoulders back, open the chest, place your hands under your shoulders and maintain the leg that''s on the mat perpendicular to the floor. Inhale as you bend your arms, keep the elbows pointing back, and don''t bend at the hips. Breathe out as you extend your arms and lift yourself back up.'),
('KneePullIn','Knee Pull In','Strength','Core','Abs','Sit down with your hands on the mat, your legs fully extended, and lean back. Bend your legs and bring your knees toward your chest. Hold for a second or two and then fully extend your legs without touching the mat. Repeat.','Keep your back straight and your upper body stable. Breathe out as you bring your knees toward your chest, squeeze your abs in and use your core strength to stabilize your body.'),
('SplitSquatRight','Split Squat','Strength','Lower Body','Glutes,Quadriceps,Hamstrings,Calves','Start in a split leg position, with one leg forward and one leg back. Flex your knees and lower your hips, until the back knee is just above the floor. Stand back up and return to the starting position. Repeat this movement for as many reps as recommended and then switch legs.','Keep your feet hip-width apart, roll your shoulders back and tighten your abs. Breathe in as you lunge, and put your weight in the front heel. Keep the movement smooth and continuous and exhale as you push yourself back up.'),
('SprinterLunges','Jumping Lunges','Cardio','Lower Body','Glutes,Quadriceps,Hamstrings,Calves','Take a large step backward and lower your hips, so that your back knee is just above the floor, and your front thigh is parallel to the floor. Jump into the air and switch leg positions. Jump again and return to the starting position. Repeat the exercise until set is complete.','Keep your core tight, your shoulders down, and push the movement from the heel of the front feet. Exhale as you jump and land softly on the toes of the back leg and on the heel of the front leg.'),
('ButtKicks','Butt Kicks','Cardio','Lower Body','Glutes,Hamstrings,Quadriceps,Calves','Stand tall with your feet shoulder-width apart and face forward. Start kicking your feet up, until the heels touch the glutes, and pump your arms at the same time. Repeat until set is complete.','Keep your shoulders back, your abs tight, to open up your chest, and to land slowly on the balls of your feet. Keep your arms close to your torso and your elbows bent at a 90-degree angle. Breathe out as you kick back and maintain a steady and stable pace. Pump your arms in sync with the opposite leg.'),
('ReverseCrunches','Reverse Crunches','Strength','Core','Abs','Lie on your back with your hands by your sides. Lift your knees until your thighs and calves form a 90-degree angle and your calves are parallel to the floor. Lift your hips and bring your knees, as far as you can, toward the chest. In a controlled movement, return your legs to the starting position and repeat.','Keep your hands and lower back flat on the floor and do all the movements slowly and in a controlled manner. Breathe out as you lift the hips off the mat and breathe in as you slowly return to the starting position.'),
('Crunches','Crunches','Strength','Core','Abs','Lie down on the mat, keep your knees bent and your back and feet flat. Lift your shoulders, squeeze your abdominal muscles and hold for 1 to 2 seconds. Slowly return to the starting position and repeat until set is complete.','When doing crunches keep your head in a neutral position, with your eyes on the ceiling and the chin off your chest. Breathe out as you crunch, maintain your core muscles tight and engaged, and keep the elbows out.'),
('BirdDog','Bird Dog','Strength','Core,Lower Body','Abs,Lower Back,Glutes','Start on your hands and knees with the hands under the shoulders and the knees under the hips. Extend one leg and the opposite arm at the same time. Return to the starting position, and switch sides. Continue alternating sides until set is complete.','Keep your spine in a neutral position, with your head and neck in alignment, and relax your shoulders. Breathe in as you lift your arm and the opposite leg, and maintain your torso stable by engaging your core.'),
('CalfRaises','Calf Raises','Strength','Lower Body','Calves','Stand with your torso upright, your feet hip-width apart, and your toes pointing forward. Raise your heels off the floor and squeeze your calves. Return to the starting position, by slowly lowering your heels, and repeat.','When doing calf raises, brace your core, face forward and keep your toes pointing straight ahead. Raise your heels and breathe out as you squeeze your calves. Breathe in as you lower your heels and slowly return to the starting position.'),
('KneePushUp','Knee Push Up','Strength','Upper Body','Chest,Shoulders,Triceps','Place the knees on the floor, the hands below the shoulders, and cross your feet. Keeping your back straight, start bending the elbows until your chest is almost touching the floor. Pause and push back to the starting position. Repeat until the set is complete.','Keep your head, hips, and torso in line. Maintain your core muscles tight and keep your spine in a neutral position. Inhale as you lower the chest and breathe out as you push back up.'),
('ReverseSnowAngels','Reverse Snow Angels','Strength','Upper Body','Shoulders,Upper Back','Lying face down on the floor, lift your chest and legs up, and extend your arms forward. Keeping your back straight and shoulder blades retracted, stroke your arms backward to the side of your thighs. Pause, then release your shoulders and stroke your arms forward to the starting position.','Keep your lower back engaged throughout the exercise and your stomach muscles firm against the floor. Breathe in when stroking backward, breathe out when stroking forward.'),
('ForwardReachPlank','Forward Reach Plank','Strength','Core','Abs','Assume a high plank position. Reach forward with your right arm so that your arm is parallel with the ground. Return right arm back to the ground. Reach forward with your left arm and return back to ground. Alternate back and forth for the desired time.','Don''t allow your hips to twist as you reach forward. Don''t allow your hips to sag. Your body should form a straight line from your heels to your shoulders.'),
('ReverseFlutter','Reverse Flutter','Cardio','Core,Lower Body','Lower Back,Glutes,Hamstrings','Lie facedown and extend elbows out wide, keeping hands together in front of your face. Rest chin or forehead on hands. Engaging core muscles, lift both legs off the floor to hip height or slightly past hip height, whichever feels comfortable. Lift one leg and then the other in a flutter motion, as though you''re swimming. Repeat until the set is complete.','Engage your core muscles and perform the flutter motion in a controlled manner. While performing the reverse flutter, breathe deeply and as naturally as possible'),
('SingleLegAlternatingLegRaises','Single Leg Alternating Leg Raises','Strength','Core','Abs,Lower Back','Lie on your back on the floor and raise your legs until they are perpendicular to the floor. Keeping your right leg still, lower your left leg until your heel touches the floor. Pause and then return the leg to the starting position. Repeat with the opposite leg.','Keep your leg as straight as possible during the movement. Keep the lower back in contact with the floor throughout the movement. Breathe out as you lower your leg and breathe in as you slowly return to the starting position.'),
('DownwardDogWithKneeDriveRight','Downward Dog With Knee Drive','Strength','Full Body,Upper Body,Core,Lower Body','Triceps,Back,Abs,Glutes,Quadriceps,Hamstrings,Calves','Start in downward dog pose with your arms and legs straight and your hips up and back. Bring your right knee close to your right elbow and crunch. Extend your right leg up and to the back. Repeat for the duration of the set and then switch sides.','Keep your spine, head, and neck neutral and aligned, engage your core and glutes, and maintain your wrists and elbows straight. Breathe out as you bend the knee and bring it toward the elbow and inhale as you extend the leg up and back.'),
('PlankJacks','Plank Jacks','Cardio','Core,Lower Body','Abs,Quadriceps,Calves','Start in a push up position with your feet together. Hop your feet as far as you can and land softly on your toes. Jump again to bring your feet back together and repeat.','Don''t let your hips drop, keep your spine stable and try to maintain a slow and steady breathing pattern. Pull your abs in tight and keep a straight line from your shoulders down to your ankles.'),
('Burpees','Burpees','Cardio','Full Body,Upper Body,Core,Lower Body','Shoulders,Chest,Triceps,Biceps,Back,Abs,Glutes,Hamstrings,Quadriceps,Calves','Stand straight with your feet shoulder-width apart. Squat and place your hands in front of your feet. Jump back until your legs are fully extended and your body is in plank position. Jump forward, and then push through the heels to return to the starting position. Repeat until the set is complete.','Keep your back straight and your core engaged at all times. Maintain a natural and regular breathing pattern throughout the exercise.'),
('SideCrunchRight','Side Plank Crunch','Strength','Core','Abs,Obliques','Lie on your right side with your knees slightly bent, one leg on top of the other, place your right forearm on the floor and lift your body off the ground. Lift your left arm up and raise your left leg a few inches off the floor. Crunch by bringing your left knee up toward your left elbow. Extend your left leg and left arm and repeat for the duration of the set.','Engage your core, and keep your head, neck and spine aligned. Breathe out as you crunch, and maintain a steady rhythm throughout the entire exercise.'),
('TricepDips','Tricep Dips','Strength','Upper Body','Triceps,Shoulders,Upper Back','Place your hands behind you onto a chair, so that your fingers face forward. Extend your legs and start bending your elbows. Lower your body until your arms are at a 90-degree angle. Lift your body back up until your arms are straight. Repeat.','Roll your shoulders back, open the chest, keep your neck nice and tall and place your hands underneath your shoulders. Inhale as you bend your elbows and breathe out as you extend the elbows and lift yourself back up.'),
('SplitSquatLeft','Split Squat','Strength','Lower Body','Glutes,Quadriceps,Hamstrings,Calves','Start in a split leg position, with one leg forward and one leg back. Flex your knees and lower your hips, until the back knee is just above the floor. Stand back up and return to the starting position. Repeat this movement for as many reps as recommended and then switch legs.','Keep your feet hip-width apart, roll your shoulders back and tighten your abs. Breathe in as you lunge, and put your weight in the front heel. Keep the movement smooth and continuous and exhale as you push yourself back up.'),
('FlutterKicks','Flutter Kicks','Cardio','Core,Lower Body','Abs,Glutes,Quadriceps','Lie on your back with your hands by your sides or place them underneath your glutes. Alternate stacking your feet on top of each other. Repeat until set is complete.','Maintain your abs and core engaged at all times and keep your lower back pressed against the floor. Breathe slowly and keep your chin off your chest, your head in a neutral position and your legs straight.'),
('ReversePike','Tabletop Reverse Pike','Strength','Full Body,Upper Body,Core,Lower Body','Shoulders,Triceps,Biceps,Abs,Glutes,Hamstrings,Quadriceps','Sit on the mat with your knees bent, your arms extended back, your fingers facing the body, and your feet hip-width apart. Lift your butt off the mat, coming into a tabletop position. Lower your hips, straighten the legs and lengthen the spine. Raise your hips, lift your torso and return to the tabletop position. Repeat. ','Breathe out as you lower your hips and straighten your legs, keeping your arms straight, your spine long and your hips off the floor. Inhale as you lift your hips and return to the tabletop position.'),
('CrossCrunches','Cross Crunches','Strength','Core','Abs,Obliques','Lie flat on your back with your knees bent. Cross your right leg on top of the left knee, and support your head with both hands. Crunch and bring your left elbow across your body and toward the right knee. Switch sides and repeat until set is complete.','When doing cross crunches make sure that your abs are doing all the work. Keep your spine in a neutral position and support your neck with your hands. Breathe out as you squeeze your abs and keep your legs static as you bring your elbow toward the opposite knee.'),
('DeadBug','Dead Bug','Strength','Core','Abs','Lie on your back with your knees bent and extend your arms toward the ceiling. Lower your right leg and extend your left arm behind your head. Return to the starting position and repeat with the opposite arm and leg. Keep switching sides until the set is complete.','Keep your lower back flat against the floor, and keep your abdominal muscles tight. Breathe out as you lower your leg and extend your arm, and hold them parallel to the floor. Breathe in as you return to the starting position and then switch sides.'),
('Squat','Squat','Strength','Lower Body','Glutes,Quadriceps,Calves','Stand up with your feet shoulder-width apart. Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees. Press your heels into the floor to return to the initial position. Repeat until set is complete.','When doing squats maintain your back in alignment, by keeping your chest up and your hips back. Don''t let the knees extend beyond the toes and put pressure on the heels of the feet. Breathe in as you squat and breathe out as you come up.'),
('Inchworm','Inchworm','Strength,Cardio','Full Body,Upper Body,Core,Lower Body','Shoulders,Chest,Biceps,Forearms,Back,Abs,Lower Back,Glutes,Hamstrings,Quadriceps,Calves','Stand straight with your feet shoulder-width apart. Bend over and touch the floor with the palms of your hands. Walk your hands out, as far as you can while keeping your legs straight, and pause. Walk back up to the starting position and repeat until the set is complete.','Keep your legs straight, don''t let your hips sag, and maintain a neutral spine. Engage your core muscles to stabilize the movement and walk your hands out as far as you can without losing form. Breathe deeply and lift the heels as you walk out, keeping the toes in the same spot.'),
('WallPushUps','Wall Push Ups','Strength','Upper Body','Chest,Triceps','Stand at about two feet from a wall. Extend your arms straight out in front of you, your palms should touch the wall surface at about shoulder-level height and shoulder-width apart. Bend your elbows and lean your body toward the wall till your face almost touches it. Push back to the starting position. Repeat until the set is complete.','On the way back to the starting position, push the wall away until your arms are completely straight. Breathe in while you are lowering yourself and Exhale as you begin to push off the wall.'),
('WindshieldWiper','Windshield Wipers','Strength','Core','Abs,Obliques','Lie on your back with your arms straight out to the sides and lift your legs and bend the knees at a 90-degree angle. Rotate the hips to one side, without letting the legs touch the floor. Lift your legs and return to the starting position. Rotate the hips to the opposite side and repeat until set is complete.','Keep your body in a T shape with your back flat on the mat, your core engaged and your abs tight. Breathe out as you rotate the hips and lower the legs and keep the movement slow and controlled.'),
('UpDownPlank','Up Down Plank','Strength','Core,Upper Body','Abs,Obliques,Shoulders,Triceps,Upper Back','Start in a plank position, with your wrists under your shoulders and your feet hip-width apart. Bend your left arm, place your left elbow on the mat and then bend your right arm and place your right elbow on the mat. Place your left hand on the mat, straighten your left arm and then place your right hand on the mat and straighten your right arm. Switch sides and repeat this up and down movement until the set is complete.','Engage your glutes, tighten your core, and keep your head, neck and spine aligned. Inhale as you bend your arms and place your elbows on the mat, and breathe out as you straighten your arms and place your hands on the mat.'),
('BearCrawl','Bear Crawl','Strength,Cardio','Full Body,Upper Body,Core,Lower Body','Shoulders,Chest,Triceps,Biceps,Back,Abs,Glutes,Hamstrings,Quadriceps,Calves','Get down on your hands and feet with your knees slightly bent and your back flat. Walk your left hand and your right foot forward. Walk your right hand and your left foot forward. Keep walking and alternating sides until the set is complete.','Keep your knees slightly bent, your back flat and your arms straight. Engage your core, lift your hips, and exhale as you reach your hand and the opposite foot forward.'),
('CurtsyLungeToHighKnee','Curtsy Lunge To High Knee','Strength','Lower Body','Glutes,Hamstrings,Quadriceps','Stand tall with your feet hip-width apart. Keeping your weight in your right foot, take a big step back with your left leg, crossing it behind your right leg. Start lowering your body, by bending your knees, until your right thigh is parallel to the floor. Press into front foot to stand, driving right knee up until knee is at hip level, thigh parallel to the floor. Return to the starting position and repeat on the opposite side.','Engage your core, face forward, open your chest and keep your back straight. As you lunge, keep your front knee over your ankle, and keep your toes pointing in the same direction as your knees.'),
('PlankPikes','Plank Pikes','Strength','Core','Abs,Glutes','Start in a low plank position with your body in a straight line, your elbows bent and under your shoulders and your feet hip-width apart. Press down through your shoulders and arms to lift the hips toward the ceiling. Slowly return to the starting position and repeat until the set is complete.','Keep your abs tight, engage your glutes and maintain your back neutral. Breathe out as you press through your shoulders and arms to lift the hips toward the ceiling. Inhale as you lower the hips and return to plank position.'),
('SitUp','Sit Up','Strength','Core','Abs','Lie down on your back, keep your knees bent, and your back and feet flat on the mat. Slowly lift your torso and sit up. Return to the starting position by rolling down one vertebra at a time. Repeat the exercise until set is complete.','Keep your abs engaged, your chest open and your shoulders, neck and back relaxed. Breathe out as you crunch and use only your ab strength to lift your torso up. Inhale as you slowly return to the starting position, rolling your spine one vertebrae at a time.'),
('BicycleCrunches','Bicycle Crunches','Strength','Core','Abs,Obliques','Lie on your back, lift your shoulders off the mat and raise both legs. Bring one knee and the opposing elbow close to each other by crunching to one side, and fully extend the other leg. Return to the starting position and then crunch to the opposite side. Repeat until the set is complete.','Engage your core muscles, open the elbows and keep your neck relaxed. Breathe out as you crunch, keep your shoulder blades off the mat and maintain a steady rhythm throughout the entire exercise.'),
('KneelingLeanBack','Kneeling Lean Back','Strength','Lower Body','Abs,Quadriceps,Glutes','Kneel with knees hip-width apart, arms extended at your sides and palms facing thighs. Lean back as far as possible with your body in a straight line. Come back forward to the starting position and repeat.','Do not arch your back as you lean back but simply move from your knees. Squeeze your glutes, brace your abs and move in a slow and controlled fashion.'),
('HighKnees','High Knees','Cardio','Lower Body','Glutes,Hamstrings,Quadriceps,Calves','Stand straight with your feet shoulder-width apart. Face forward and open your chest. Bring your knees up to waist level and then slowly land on the balls of your feet. Repeat until the set is complete.','Open the chest and keep the knee joints loose. Add support to your back by keeping the core tight and landing slowly on the balls of the feet. Breathe deeply and as naturally as possible, with a smooth and steady rhythm.'),
('ReversePlank','Reverse Plank','Strength','Core,Lower Body','Abs,Obliques,Lower Back,Glutes,Hamstrings','Sit down with your hands slight behind your back and shoulder width apart. Use your hands and push your body upwards until your body is in a straight line. Hold reverse plank position for desired amount of time.','Keep your hands under your shoulders, your arms and legs extended, and maintain your head neutral. Roll your shoulders back, open your chest and breathe deeply and as naturally as possible.'),
('Swimmers','Swimmers','Strength','Full Body,Upper Body,Core,Lower Body','Shoulders,Back,Lower Back,Glutes,Hamstrings','Lie on your belly with your arms and legs fully extended. Raise both arms and legs off the mat and lift your head and chest. Flutter your arms and legs and keep alternating sides for the entire duration of the set.','Keep your arms and legs fully extended, maintain a neutral spine and elongate your body. Breathe slowly, pull your abs in, keep your core muscles tight, and maintain your hips and upper body stable.'),
('ReversePlankWithLegLift','Reverse Plank With Leg Lift','Strength','Core,Lower Body','Abs,Obliques,Lower Back,Glutes,Hamstrings','Sit on the mat with your legs extended and place your hands behind you with the fingers facing your body. Kick your right leg up and, as you lower it back down, lift your hips and squeeze the glutes. Repeat with the opposite leg and keep alternating sides for the entire duration of the set.','Maintain your head neutral, position your hands under your shoulders and keep your arms and legs extended. Roll your shoulders back, open your chest and inhale as you kick your leg up. Breathe out as you lift your hips and squeeze the glutes.'),
('FlamingoSquatLeft','Flamingo Squat','Strength','Lower Body','Abs,Glutes,Quadriceps,Calves','Stand up straight with your feet hip-width apart, wrap your right leg around your left leg. Start bending your left knee and slowly lower your hips back. Push through the left heel to return to the starting position. Switch legs and repeat.','Keep your back straight, chest open, shoulders back and tighten your core. Breathe in as you lower your hips back slowly and keep your balance by lifting both arms to the front. Go only as low as you can without losing form and breathe out as you push through the heel to get back up.'),
('StraightArmCirclesRight','Straight Arm Circles','Warmup','Upper Body','Shoulders,Chest,Upper Back','Stand straight with your feet shoulder-width apart. Raise and extend your right arm to the side, without bending the elbow. Slowly rotate your arm forward, making big circles. Complete a set in one direction and then switch, rotating backward.','Stand with your spine nice and tall, inhale as you lift your arm, and exhale as you rotate your arm around. Remember to engage your core muscles and keep your back and arm straight. Keep the rotation slow and controlled.'),
('GoodMorning','Good Morning','Strength','Lower Body','Lower Back,Glutes,Hamstrings','Stand up tall with your feet shoulder-width apart and place your hands behind the head. Start bending at the hips, push your hips back and bend over to near parallel. Return to the starting position and repeat.','Keep your back tight, shoulder blades pinched together, and your knees slightly bent. Do the movement slowly and breathe out as you lower your torso. Breathe in as you get back up and squeeze the glutes at the end of each repetition.'),
('ShoulderTaps','Shoulder Taps','Strength','Core,Upper Body','Abs,Obliques,Shoulders,Triceps','Start in a plank position, with your wrists under your shoulders and your feet hip-width apart. Touch your left shoulder with your right hand and return to plank position. Touch your right shoulder with your left hand and continue alternating sides until the set is complete.','Tighten your core, engage your glutes, and keep your spine, head and neck aligned. Breathe out as you touch your shoulder with your hand, and maintain your back flat and your hips level with the floor.'),
('FlamingoSquatRight','Flamingo Squat','Strength','Lower Body','Abs,Glutes,Quadriceps,Calves','Stand up straight with your feet hip-width apart, wrap your left leg around your right leg. Start bending your right knee and slowly lower your hips back. Push through the left heel to return to the starting position. Switch legs and repeat.','Keep your back straight, chest open, shoulders back and tighten your core. Breathe in as you lower your hips back slowly and keep your balance by lifting both arms to the front. Go only as low as you can without losing form and breathe out as you push through the heel to get back up.'),
('SingleLegTricepDipsRight','Single Leg Tricep Dips','Strength','Upper Body','Triceps,Shoulders,Upper Back','Sit on the mat with your knees bent, feet together, and place your hands behind you with your fingers facing forward. Lift your hips off the mat, raise your right leg and start bending your elbows. Lower your body until your glutes are almost touching the mat and then lift the hips back up by extending your arms. Repeat until the set is complete.','When doing single leg tricep dips roll your shoulders back, open the chest, place your hands under your shoulders and maintain the leg that''s on the mat perpendicular to the floor. Inhale as you bend your arms, keep the elbows pointing back, and don''t bend at the hips. Breathe out as you extend your arms and lift yourself back up.');

CREATE TABLE workout_workouts (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    type VARCHAR(250) NOT NULL,
    name VARCHAR(250) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    target TEXT NOT NULL,
    repeat VARCHAR(10) NOT NULL DEFAULT '1'
);

INSERT INTO workout_workouts (id, type, name, description, target, repeat)
VALUES
('FullBodyWorkout','Full Body Workout','Upper, Lower & Core','This workout exercises your whole body, with all muscle groups being used and stimulated in one single session.','Cardio-Upper Body,Strength-Shoulders,Strength-Glutes,Strength-Abs,Cardio-Lower Body,Strength-Chest,Strength-Hamstrings,Strength-Obliques,Cardio-Core,Strength-Triceps,Strength-Quadriceps,Strength-Lower Back','1'),
('UpperBodyWorkout','Upper Body Workout','Chest, Shoulders & Arms','This workout exercises your upper body, with all muscle groups located in this part being used and stimulated in one single session.','Cardio-Upper Body,Strength-Shoulders,Strength-Chest,Strength-Triceps','3'),
('CoreWorkout','Core Workout','Abs, Obliques & Lower Back','This workout exercises your core, with all muscle groups located in this part being used and stimulated in one single session.','Cardio-Core,Strength-Abs,Strength-Obliques,Strength-Lower Back','3'),
('LowerBodyWorkout','Lower Body Workout','Glutes & Legs','This workout exercises your lower body, with all muscle groups located in this part being used and stimulated in one single session.','Cardio-Lower Body,Strength-Glutes,Strength-Quadriceps,Strength-Hamstrings','3'),
('CardioWorkout','Cardio Workout','HIIT & Cardio','This workout exercises your cardio-vascular system, with your heart and lungs being used and stimulated in one single session.','Cardio-Upper Body,Cardio-Core,Cardio-Lower Body,Cardio-Upper Body,Cardio-Core,Cardio-Lower Body','2');

CREATE TABLE workout_programs (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    type VARCHAR(250) NOT NULL,
    name VARCHAR(250) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    total_weeks VARCHAR(10) NOT NULL,
    days_per_week_2 TEXT NOT NULL,
    days_per_week_3 TEXT NOT NULL,
    days_per_week_4 TEXT NOT NULL,
    days_per_week_5 TEXT NOT NULL,
    days_per_week_6 TEXT NOT NULL,
    days_per_week_7 TEXT NOT NULL
);

INSERT INTO workout_programs (id, type, name, description, total_weeks, days_per_week_2, days_per_week_3, days_per_week_4, days_per_week_5, days_per_week_6, days_per_week_7)
VALUES
('GeneralFitnessProgram','General Fitness Program','Tone & Sculpt','A progressive, well-balanced strength training program that improves all the most important metrics, such as strength endurance, muscle growth, and the cardiovascular system.','12','FullBodyWorkout,CardioWorkout','FullBodyWorkout,CardioWorkout,FullBodyWorkout','FullBodyWorkout,CardioWorkout,FullBodyWorkout,CardioWorkout','UpperBodyWorkout,CardioWorkout,LowerBodyWorkout,CardioWorkout,CoreWorkout','FullBodyWorkout,CardioWorkout,UpperBodyWorkout,LowerBodyWorkout,CoreWorkout,CardioWorkout','FullBodyWorkout,CardioWorkout,UpperBodyWorkout,LowerBodyWorkout,CoreWorkout,CardioWorkout,FullBodyWorkout'),
('BuildMuscleProgram','Build Muscle Program','Muscle & Strength','This strength training program helps you increase your muscular strength and build muscle mass as it stimulates the growth of muscle cells.','12','FullBodyWorkout,FullBodyWorkout','FullBodyWorkout,FullBodyWorkout,FullBodyWorkout','UpperBodyWorkout,LowerBodyWorkout,CoreWorkout,FullBodyWorkout','UpperBodyWorkout,LowerBodyWorkout,CoreWorkout,CardioWorkout,FullBodyWorkout','UpperBodyWorkout,LowerBodyWorkout,CoreWorkout,UpperBodyWorkout,LowerBodyWorkout,CoreWorkout','UpperBodyWorkout,LowerBodyWorkout,CoreWorkout,CardioWorkout,UpperBodyWorkout,LowerBodyWorkout,CoreWorkout'),
('FatLossProgram','Fat Loss Program','Burn & Shred','This training program will boost your metabolism while challenging your cardio vascular system. It has been designed to maximize fat loss and minimize muscle loss.','12','CardioWorkout,CardioWorkout','CardioWorkout,FullBodyWorkout,CardioWorkout','CardioWorkout,FullBodyWorkout,CardioWorkout,FullBodyWorkout','CardioWorkout,FullBodyWorkout,CardioWorkout,FullBodyWorkout,CardioWorkout','CardioWorkout,UpperBodyWorkout,CardioWorkout,LowerBodyWorkout,CardioWorkout,CoreWorkout','CardioWorkout,UpperBodyWorkout,CardioWorkout,LowerBodyWorkout,CardioWorkout,CoreWorkout,CardioWorkout');