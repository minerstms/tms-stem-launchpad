/* ============================================================
    Curriculum (LOCKED)
============================================================ */
const CURRICULUM = {
  "Digital Art": {
    display: "Digital Art",
    overview: "Learn how digital tools can help you create images, designs, and creative ideas in a new way.",
    vocab: [
      { term:"Digital Art", def:"Art made using a computer or digital device" },
      { term:"Canva", def:"An easy design tool for posters, graphics, and slides" },
      { term:"Adobe Photoshop", def:"A program used to edit images and create digital artwork" },
      { term:"Layer", def:"A separate level in art editing that can be changed without affecting everything" },
      { term:"Brush Tool", def:"A tool used to draw or paint on a digital canvas" },
      { term:"Eraser Tool", def:"A tool that removes parts of your digital drawing" },
      { term:"Resize", def:"To change the size of an image or design" },
      { term:"Crop", def:"To cut out extra parts of an image" },
      { term:"Resolution", def:"How clear an image looks, based on pixels" },
      { term:"Pixel", def:"A tiny dot that makes up a digital image" },
      { term:"GIF", def:"A short moving image that repeats" },
      { term:"AI Prompt", def:"Words you type to tell an AI what to create" },
      { term:"Export", def:"To save your work in a final file type like PNG or JPG" },
      { term:"Template", def:"A starting design you can edit" },
      { term:"Composition", def:"How parts of an image are arranged to look good" }
    ],
    days: {
      "Day 1": { intro:" Today you will explore digital art tools try drawing, editing, or AI image makers to see what each tool can do.", qod:"What did you discover about Digital Art today?", stemsPreview:[" Today I discovered that I can"," I noticed that when I"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one kind of digital artwork you want to finish by the end of the week.", qod:"What is your SMART goal for your Digital Art project this week?", stemsPreview:[" My SMART goal for Digital Art is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will create your artwork focus on colors, shapes, and tools, and save what you want to improve tomorrow.", qod:"What artwork did you create today, and what did you notice?", stemsPreview:[" Today I created"," I noticed that"]},
      "Day 4": { intro:" Today you will refine your artwork improve details like color, size, layers, or layout to make it stronger.", qod:"What changes did you make to your artwork today, and why?", stemsPreview:[" I improved my artwork by"," I made these changes because"]},
      "Day 5": { intro:" Today you will apply a new tool or technique try something new and notice how it changes your design.", qod:"What tools or techniques did you use today, and what happened?", stemsPreview:[" A tool or technique I used today was"," After using this tool or technique I noticed that"]},
      "Day 6": { intro:" Today you will make final adjustments clean up your work, fix small mistakes, and get it ready to share.", qod:"What final changes did you make today to prepare your artwork for sharing?", stemsPreview:[" A final change I made today was"," This change helped my artwork by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal think about what helped you succeed and what you would do differently next time.", qod:"Did you meet your SMART goal for your Digital Art project? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," The key to achieving this SMART goal is"]}
    }
  },

  "Photography": {
    display:"Photography",
    overview:"Learn how cameras capture light to create clear, creative photos.",
    vocab:[
      {term:"Aperture",def:"How wide the camera lens opens to let in light"},
      {term:"Shutter Speed",def:"How long the camera lets light in when taking a picture"},
      {term:"ISO",def:"A setting that makes a photo brighter or darker"},
      {term:"Focus",def:"Making the subject look sharp and clear"},
      {term:"Exposure",def:"How bright or dark a photo looks overall"},
      {term:"Composition",def:"How the parts of a photo are arranged"},
      {term:"Rule of Thirds",def:"A way to place your subject off-center to look better"},
      {term:"Lens",def:"The glass part of the camera that helps form the image"},
      {term:"Zoom",def:"Making the subject look closer without moving"},
      {term:"Portrait",def:"A photo of a person"},
      {term:"Landscape",def:"A photo of a scene like mountains, sky, or buildings"},
      {term:"Lighting",def:"The light that helps your photo look clear"},
      {term:"Filter",def:"An effect that changes the look of a photo"},
      {term:"Edit",def:"To improve a photo by changing color, brightness, or size"},
      {term:"Resolution",def:"How clear a photo is, based on detail"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore photography tools test angles, lighting, and focus to see what makes a photo strong.", qod:"What did you discover about Photography today?", stemsPreview:[" Today I discovered that good photos can"," I noticed that when the light"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one photo idea you want to improve and finish by the end of the week.", qod:"What is your SMART goal for your Photography project this week?", stemsPreview:[" My SMART goal for Photography is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will take photos for your goal focus on one skill like composition, focus, or lighting.", qod:"What photos did you take today, and what did you notice?", stemsPreview:[" Today I took photos of"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your photos retake shots or adjust settings to get a clearer, stronger image.", qod:"What changes did you make to improve your photos today, and why?", stemsPreview:[" I improved my photos by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique like rule of thirds, portrait vs landscape, or a new lighting idea.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will make final edits crop, adjust brightness, and pick your best photo to share.", qod:"What final edits did you make today to prepare your best photo for sharing?", stemsPreview:[" A final edit I made today was"," This edit helped my photo by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do next time.", qod:"Did you meet your SMART goal for Photography? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Music Production": {
    display:"Music Production",
    overview:"Learn how to create music using digital tools, loops, and simple recording.",
    vocab:[
      {term:"Rhythm",def:"A pattern of beats in music"},
      {term:"Beat",def:"The steady pulse you can tap your foot to"},
      {term:"Tempo",def:"How fast or slow the music goes"},
      {term:"Melody",def:"The main tune you can hum"},
      {term:"Harmony",def:"Extra notes that sound good with the melody"},
      {term:"Loop",def:"A sound that repeats in a pattern"},
      {term:"Track",def:"One layer of sound in a song"},
      {term:"Mix",def:"Balancing all sounds so they work together"},
      {term:"Volume",def:"How loud or quiet a sound is"},
      {term:"Pitch",def:"How high or low a sound is"},
      {term:"Instrument",def:"A tool or sound used to make music"},
      {term:"Microphone",def:"A device that records sound"},
      {term:"MIDI",def:"Digital notes that tell instruments what to play"},
      {term:"Sample",def:"A recorded sound you can reuse"},
      {term:"Export",def:"To save your finished song as a file"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore music tools try beats, loops, and simple sounds to learn what digital music can do.", qod:"What did you discover about making music with a computer today?", stemsPreview:[" Today I discovered that digital music tools can"," I noticed that when I change the tempo"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one short song or beat you want to finish by the end of the week.", qod:"What is your SMART goal for your Music Production project this week?", stemsPreview:[" My SMART goal for Music Production is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will build your track add beats, loops, or notes and save your progress.", qod:"What did you create today, and what did you notice about your sound?", stemsPreview:[" Today I created"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your track adjust rhythm, melody, or layering so it sounds clearer.", qod:"What changes did you make to improve your track today, and why?", stemsPreview:[" I improved my track by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique like adding a new instrument, recording a sound, or changing the mix.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize your music balance volume, clean up timing, and get it ready to share.", qod:"What final changes did you make today to prepare your music for sharing?", stemsPreview:[" A final change I made today was"," This change helped my music by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Music Production? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Language & Website Design": {
    display:"Language & Website Design",
    overview:"Learn how websites are built using code and clear layout choices.",
    vocab:[
      {term:"HTML",def:"Code that builds the structure of a webpage"},
      {term:"CSS",def:"Code that controls colors, fonts, and layout"},
      {term:"Hyperlink",def:"Text or an image you can click to open a page"},
      {term:"Navigation",def:"Menus or links that help you move around a website"},
      {term:"Layout",def:"How content is organized on a page"},
      {term:"Homepage",def:"The main page of a website"},
      {term:"Accessibility",def:"Making a site easier for everyone to use"},
      {term:"Responsive",def:"A site that adjusts to phones, tablets, and computers"},
      {term:"Domain",def:"A websites name on the internet"},
      {term:"Browser",def:"An app used to view websites"},
      {term:"Search Engine",def:"A tool that helps you find websites"},
      {term:"Media",def:"Pictures, video, or audio on a site"},
      {term:"Font",def:"The style of letters on a page"},
      {term:"Header",def:"The top part of a page that can show a title"},
      {term:"Footer",def:"The bottom part of a page with extra info or links"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore websites and design choices notice what makes a site easy to read and use.", qod:"What did you discover about website design today?", stemsPreview:[" Today I discovered that good websites can"," I noticed that when a site has clear navigation"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one simple webpage you want to build or improve by the end of the week.", qod:"What is your SMART goal for your Language & Website Design project this week?", stemsPreview:[" My SMART goal for Website Design is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will start building create your page structure with headings, sections, and links.", qod:"What did you build today, and what did you notice about your layout?", stemsPreview:[" Today I built"," I noticed that"]},
      "Day 4": { intro:" Today you will improve the design adjust spacing, fonts, or page organization to make it easier to read.", qod:"What changes did you make to improve your website today, and why?", stemsPreview:[" I improved my website by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new feature add images, a menu, or a new page section and test it.", qod:"What new feature did you add today, and what happened when you tested it?", stemsPreview:[" A new feature I added today was"," After testing it I noticed that"]},
      "Day 6": { intro:" Today you will finalize your site fix small issues, check links, and make it ready to share.", qod:"What final fixes did you make today to prepare your website for sharing?", stemsPreview:[" A final fix I made today was"," This fix helped my website by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Website Design? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Video Production": {
    display:"Video Production",
    overview:"Learn how to plan, record, and edit videos that tell a clear story.",
    vocab:[
      {term:"Storyboard",def:"A plan that shows what will happen in each scene"},
      {term:"Script",def:"The words and actions planned for a video"},
      {term:"Frame",def:"One picture in a video"},
      {term:"Clip",def:"A short piece of video"},
      {term:"Timeline",def:"The editing area where clips are arranged"},
      {term:"Edit",def:"To cut and improve video clips"},
      {term:"Transition",def:"A change from one clip to the next"},
      {term:"Caption",def:"Text on the screen that shows spoken words"},
      {term:"Audio",def:"Sound in a video"},
      {term:"Voiceover",def:"A recorded voice that plays over the video"},
      {term:"Lighting",def:"Light that helps the camera see clearly"},
      {term:"Angle",def:"The direction the camera is pointed"},
      {term:"B-Roll",def:"Extra video that supports the main video"},
      {term:"Export",def:"To save the finished video as a file"},
      {term:"Resolution",def:"How clear the video looks"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore video tools test recording, framing, and simple editing to see what makes video clear.", qod:"What did you discover about Video Production today?", stemsPreview:[" Today I discovered that videos can"," I noticed that when the camera angle"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one short video you want to finish by the end of the week.", qod:"What is your SMART goal for your Video Production project this week?", stemsPreview:[" My SMART goal for Video Production is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will start creating record clips or build a storyboard and begin your timeline.", qod:"What did you create today, and what did you notice about your clips?", stemsPreview:[" Today I recorded or built"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your video trim clips, reorder scenes, or make the message clearer.", qod:"What changes did you make to improve your video today, and why?", stemsPreview:[" I improved my video by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique add captions, transitions, music, or better audio.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize your video clean up audio, check captions, and export a share-ready version.", qod:"What final changes did you make today to prepare your video for sharing?", stemsPreview:[" A final change I made today was"," This change helped my video by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Video Production? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Coding & Programming": {
    display:"Coding & Programming",
    overview:"Learn how to give computers instructions using code and logic.",
    vocab:[
      {term:"Algorithm",def:"A set of steps to solve a problem"},
      {term:"Sequence",def:"Steps in the correct order"},
      {term:"Loop",def:"Code that repeats"},
      {term:"Variable",def:"A place to store information in code"},
      {term:"Function",def:"A block of code that does a job"},
      {term:"Debug",def:"To find and fix mistakes in code"},
      {term:"Syntax",def:"Rules for how code must be written"},
      {term:"Conditional",def:"An if/then choice in code"},
      {term:"Input",def:"Information you give a program"},
      {term:"Output",def:"What a program shows or does"},
      {term:"Program",def:"A set of instructions for a computer"},
      {term:"Event",def:"An action like a click that triggers code"},
      {term:"Bug",def:"A mistake that causes problems"},
      {term:"Command",def:"An instruction you give the computer"},
      {term:"Logic",def:"Thinking using rules and reasons"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore coding tools try simple commands and see how instructions change what the computer does.", qod:"What did you discover about Coding & Programming today?", stemsPreview:[" Today I discovered that code can"," I noticed that when I change one line"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one small program you want to build or improve by the end of the week.", qod:"What is your SMART goal for your Coding & Programming project this week?", stemsPreview:[" My SMART goal for Coding is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will build create steps, use variables, or start a loop to make your program work.", qod:"What did you build today, and what did you notice when you tested it?", stemsPreview:[" Today I built"," I noticed that"]},
      "Day 4": { intro:" Today you will debug and improve find bugs and make your program clearer or more reliable.", qod:"What problem did you fix today, and how did you fix it?", stemsPreview:[" I fixed a problem by"," I figured it out by"]},
      "Day 5": { intro:" Today you will try a new feature add an if/then choice, a function, or a new input to your program.", qod:"What new feature did you add today, and what happened?", stemsPreview:[" A new feature I added was"," After adding it I noticed that"]},
      "Day 6": { intro:" Today you will finalize clean up your code, add labels or comments, and make it ready to share.", qod:"What final improvements did you make today to prepare your code for sharing?", stemsPreview:[" A final improvement I made was"," This improvement helped my program by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Coding & Programming? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Circuitry & Electronics": {
    display:"Circuitry & Electronics",
    overview:"Learn how electricity flows through circuits to power devices.",
    vocab:[
      {term:"Circuit",def:"A path that electricity can travel through"},
      {term:"Conductor",def:"A material that lets electricity flow"},
      {term:"Insulator",def:"A material that blocks electricity"},
      {term:"Battery",def:"A power source that provides electricity"},
      {term:"Voltage",def:"The push that moves electricity"},
      {term:"Current",def:"The flow of electricity"},
      {term:"Switch",def:"A part that turns a circuit on or off"},
      {term:"LED",def:"A small light that uses little power"},
      {term:"Resistor",def:"A part that slows down electricity"},
      {term:"Breadboard",def:"A board used to build circuits without solder"},
      {term:"Series",def:"A circuit with one path for electricity"},
      {term:"Parallel",def:"A circuit with more than one path"},
      {term:"Polarity",def:"The positive and negative sides of power"},
      {term:"Short Circuit",def:"A dangerous path that can cause too much current"},
      {term:"Sensor",def:"A part that detects something like light or motion"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore circuits test how power flows and how switches and parts change what happens.", qod:"What did you discover about Circuitry & Electronics today?", stemsPreview:[" Today I discovered that circuits need"," I noticed that when I connect"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one circuit project you want to complete by the end of the week.", qod:"What is your SMART goal for your Circuitry & Electronics project this week?", stemsPreview:[" My SMART goal for Electronics is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will build create a working circuit and test each part carefully.", qod:"What circuit did you build today, and what did you notice when you tested it?", stemsPreview:[" Today I built a circuit that"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your circuit fix problems, make connections cleaner, or add a new part.", qod:"What changes did you make to improve your circuit today, and why?", stemsPreview:[" I improved my circuit by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique add a sensor, add more LEDs, or change from series to parallel.", qod:"What new technique or part did you try today, and what happened?", stemsPreview:[" A new part I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize make your circuit reliable and ready to show with clear labels or steps.", qod:"What final improvements did you make today to prepare your circuit for sharing?", stemsPreview:[" A final improvement I made was"," This helped my circuit by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Circuitry & Electronics? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Robotics": {
    display:"Robotics",
    overview:"Learn how robots sense, move, and follow instructions to do tasks.",
    vocab:[
      {term:"Robot",def:"A machine that can do tasks using programming"},
      {term:"Sensor",def:"A part that helps a robot detect its world"},
      {term:"Actuator",def:"A part that makes the robot move"},
      {term:"Motor",def:"A device that creates motion"},
      {term:"Servo",def:"A motor that turns to specific positions"},
      {term:"Autonomous",def:"Working on its own without a person controlling it"},
      {term:"Remote Control",def:"Controlling a robot from a distance"},
      {term:"Chassis",def:"The main body frame of the robot"},
      {term:"Gear",def:"A wheel with teeth that helps move parts"},
      {term:"Torque",def:"Turning strength"},
      {term:"Obstacle",def:"Something in the robots way"},
      {term:"Calibration",def:"Adjusting settings so the robot works correctly"},
      {term:"Prototype",def:"A first model used for testing"},
      {term:"Iteration",def:"Trying, improving, and trying again"},
      {term:"Code",def:"Instructions that tell the robot what to do"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore robotics see how robots move and how sensors can help them react.", qod:"What did you discover about Robotics today?", stemsPreview:[" Today I discovered that robots can"," I noticed that when a sensor"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one robot task you want to complete by the end of the week.", qod:"What is your SMART goal for your Robotics project this week?", stemsPreview:[" My SMART goal for Robotics is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will build or program start your robots movement or code and test it.", qod:"What did you build or program today, and what did you notice when you tested it?", stemsPreview:[" Today I built or programmed"," I noticed that"]},
      "Day 4": { intro:" Today you will improve fix problems and make your robot more accurate or reliable.", qod:"What changes did you make today to improve your robot, and why?", stemsPreview:[" I improved my robot by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique add a sensor behavior, new movement, or better control.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize make your robot ready to demonstrate with clear steps or a short test run.", qod:"What final improvements did you make today to prepare your robot for sharing?", stemsPreview:[" A final improvement I made was"," This helped my robot by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Robotics? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Flight, Rockets, & Projectiles": {
    display:"Flight, Rockets, & Projectiles",
    overview:"Learn how forces like lift and thrust affect flying objects.",
    vocab:[
      {term:"Lift",def:"An upward force that helps an object rise"},
      {term:"Thrust",def:"A forward force that pushes an object ahead"},
      {term:"Drag",def:"Air resistance that slows an object down"},
      {term:"Weight",def:"The force pulling an object downward"},
      {term:"Aerodynamics",def:"How air moves around objects"},
      {term:"Trajectory",def:"The path an object travels"},
      {term:"Angle",def:"The direction something is launched"},
      {term:"Launch",def:"To send something into the air"},
      {term:"Payload",def:"The item carried by a rocket or aircraft"},
      {term:"Fins",def:"Parts that help keep a rocket stable"},
      {term:"Nozzle",def:"The opening where exhaust shoots out"},
      {term:"Propulsion",def:"The system that makes an object move forward"},
      {term:"Gravity",def:"The force that pulls objects toward Earth"},
      {term:"Stability",def:"How well something stays balanced in flight"},
      {term:"Altitude",def:"How high something is above the ground"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore flight and launches test how shape, weight, and force change what happens.", qod:"What did you discover about Flight, Rockets, & Projectiles today?", stemsPreview:[" Today I discovered that flight depends on"," I noticed that when I change the angle"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one design you want to improve and test by the end of the week.", qod:"What is your SMART goal for your Flight, Rockets, & Projectiles project this week?", stemsPreview:[" My SMART goal for Flight and Rockets is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will build and test make a design and record what happens when you launch it.", qod:"What did you build and test today, and what did you notice?", stemsPreview:[" Today I built and tested"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your design change one thing and test again to get better results.", qod:"What change did you make today, and why did it help?", stemsPreview:[" I improved my design by"," This helped because"]},
      "Day 5": { intro:" Today you will try a new technique adjust fins, weight balance, or launch angle to see new results.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize choose your best design and prepare it for a clear demonstration.", qod:"What final improvements did you make today to prepare your design for sharing?", stemsPreview:[" A final improvement I made was"," This helped my design by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Flight, Rockets, & Projectiles? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "3D Printing & Design": {
    display:"3D Printing & Design",
    overview:"Learn how to design objects and print them layer by layer.",
    vocab:[
      {term:"Filament",def:"Plastic string used by many 3D printers"},
      {term:"Slicer",def:"Software that prepares a model for printing"},
      {term:"Layer Height",def:"How thick each printed layer is"},
      {term:"Infill",def:"The inside pattern that makes prints strong"},
      {term:"Supports",def:"Extra pieces that hold up overhangs while printing"},
      {term:"Bed Leveling",def:"Making sure the printer bed is flat"},
      {term:"Model",def:"A 3D design you want to print"},
      {term:"STL",def:"A common 3D model file type"},
      {term:"Nozzle",def:"The tip where melted plastic comes out"},
      {term:"Extrusion",def:"Plastic being pushed out to form the print"},
      {term:"Adhesion",def:"How well the print sticks to the bed"},
      {term:"Prototype",def:"A first version made for testing"},
      {term:"Scale",def:"Changing the size of a model"},
      {term:"Tolerance",def:"Small space needed so parts can fit together"},
      {term:"Print Time",def:"How long the printer needs to finish"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore 3D printing look at models and learn how designs turn into printed objects.", qod:"What did you discover about 3D Printing & Design today?", stemsPreview:[" Today I discovered that 3D printing can"," I noticed that when a model has supports"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one object you want to design and print by the end of the week.", qod:"What is your SMART goal for your 3D Printing & Design project this week?", stemsPreview:[" My SMART goal for 3D printing is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will design or start printing build a model or begin a print and record what happens.", qod:"What did you design or print today, and what did you notice?", stemsPreview:[" Today I designed or printed"," I noticed that"]},
      "Day 4": { intro:" Today you will improve adjust your model, scale, or print settings to get better results.", qod:"What changes did you make today to improve your print or model, and why?", stemsPreview:[" I improved my model or print by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique change infill, supports, or layer height and compare results.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new setting I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize fix small issues and prepare your best print to share.", qod:"What final improvements did you make today to prepare your 3D print for sharing?", stemsPreview:[" A final improvement I made was"," This helped my print by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for 3D Printing & Design? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Construction & Engineering": {
    display:"Construction & Engineering",
    overview:"Learn how structures are planned, built, and tested for strength.",
    vocab:[
      {term:"Blueprint",def:"A detailed plan for building something"},
      {term:"Measurement",def:"Finding length, width, or height using tools"},
      {term:"Load",def:"The weight a structure must hold"},
      {term:"Beam",def:"A long support piece that holds weight"},
      {term:"Column",def:"A vertical support that holds weight"},
      {term:"Truss",def:"A strong triangle-shaped support design"},
      {term:"Foundation",def:"The base that supports a structure"},
      {term:"Safety",def:"Rules that keep builders and users protected"},
      {term:"Prototype",def:"A first model built to test an idea"},
      {term:"Material",def:"What something is made from"},
      {term:"Strength",def:"How much force something can handle"},
      {term:"Stability",def:"How well something stays balanced"},
      {term:"Engineer",def:"A person who designs and tests solutions"},
      {term:"Design Process",def:"Plan, build, test, and improve"},
      {term:"Test",def:"To try something and see how well it works"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore structures see what makes a build strong and how engineers test ideas.", qod:"What did you discover about Construction & Engineering today?", stemsPreview:[" Today I discovered that strong structures need"," I noticed that when a design uses triangles"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one build or model you want to complete by the end of the week.", qod:"What is your SMART goal for your Construction & Engineering project this week?", stemsPreview:[" My SMART goal for Construction is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will build create a prototype and test how strong or stable it is.", qod:"What did you build today, and what did you notice when you tested it?", stemsPreview:[" Today I built"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your design change one feature and test again for better results.", qod:"What change did you make today, and why did it help your structure?", stemsPreview:[" I improved my structure by"," This helped because"]},
      "Day 5": { intro:" Today you will try a new technique use a new material or a different support shape and compare.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize make your build reliable and ready to demonstrate with clear steps.", qod:"What final improvements did you make today to prepare your build for sharing?", stemsPreview:[" A final improvement I made was"," This helped my build by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Construction & Engineering? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Laser Engraving": {
    display: "Laser Engraving",
    overview: "Learn how a laser machine can etch designs onto materials like wood or acrylic using safe settings and careful planning.",
    vocab: [
      { term:"Engrave", def:"To carve or etch a design into a surface" },
      { term:"Vector", def:"A design made of lines and shapes that can scale without getting blurry" },
      { term:"Raster", def:"A design made of dots/pixels like a photo" },
      { term:"Power", def:"How strong the laser beam is" },
      { term:"Speed", def:"How fast the laser head moves while engraving" },
      { term:"Focus", def:"Making the laser beam sharp for a clean cut or engraving" },
      { term:"Kerf", def:"The tiny amount of material removed by the laser" },
      { term:"Pass", def:"One time the laser goes over the design" },
      { term:"Test Grid", def:"A small set of boxes used to find the best power/speed settings" },
      { term:"Masking Tape", def:"Tape used to protect the surface and reduce burn marks" },
      { term:"Smoke Stain", def:"Dark marks caused by smoke during engraving" },
      { term:"Ventilation", def:"Airflow that removes smoke and keeps the area safer" },
      { term:"Material", def:"What you engrave on, like wood, acrylic, or leather" },
      { term:"Acrylic", def:"A plastic sheet that can be engraved or cut" },
      { term:"Plywood", def:"Thin layers of wood glued together" }
    ],
    days: {
      "Day 1": { intro:" Today you will explore laser engraving learn what it does and how designs turn into engravings.", qod:"What did you discover about Laser Engraving today?", stemsPreview:[" Today I discovered that laser engraving can"," I noticed that when I"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one laser project you want to complete by the end of the week.", qod:"What is your SMART goal for your Laser Engraving project this week?", stemsPreview:[" My SMART goal for Laser Engraving is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will create test settings and start engraving your design safely.", qod:"What did you make today, and what did you notice about your settings?", stemsPreview:[" Today I created"," I noticed that"]},
      "Day 4": { intro:" Today you will refine improve your design or settings for cleaner results.", qod:"What changes did you make today, and why?", stemsPreview:[" I improved my work by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique like masking, different materials, or a better focus method.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finish strong clean up edges, reduce burn marks, and prepare to share.", qod:"What final changes did you make to get your project ready to share?", stemsPreview:[" A final change I made was"," This helped my project by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what youd do next time.", qod:"Did you meet your SMART goal? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Resource Development": {
    display:"Resource Development",
    overview:"Learn how a city works by running LinCity-NG balance money, jobs, power, homes, and the environment to help people thrive.",
    vocab:[
      {term:"LinCity-NG",def:"A city-building simulation game where you manage a city"},
      {term:"Budget",def:"A plan for how to spend and save money"},
      {term:"Tax",def:"Money collected to pay for city services"},
      {term:"Housing",def:"Places for people to live"},
      {term:"Jobs",def:"Work opportunities that help people earn money"},
      {term:"Power",def:"Electricity that runs homes and buildings"},
      {term:"Water",def:"A city resource needed for people and buildings"},
      {term:"Pollution",def:"Dirty air or land that can harm health"},
      {term:"Recycling",def:"Turning used items into new materials"},
      {term:"Traffic",def:"How people and goods move around the city"},
      {term:"Infrastructure",def:"Roads, pipes, power lines, and systems a city needs"},
      {term:"Services",def:"Things a city provides, like schools and health care"},
      {term:"Sustainability",def:"Helping the city grow without ruining resources"},
      {term:"Efficiency",def:"Getting good results with less waste"},
      {term:"Resource",def:"Something people need, like energy, water, or land"},
      {term:"Trade",def:"Buying and selling goods to help the city"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore LinCity-NG learn what city systems do and what happens when you change one thing.", qod:"What did you discover about running a city in LinCity-NG today?", stemsPreview:[" Today I discovered that a city needs"," I noticed that when I change taxes or power"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one city goal to improve by the end of the week, like jobs, pollution, or money.", qod:"What is your SMART goal for your LinCity-NG city this week?", stemsPreview:[" My SMART goal for my LinCity-NG city is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will take action in your city build something and watch the data to see what changes.", qod:"What did you build or change today, and what did you notice in your city stats?", stemsPreview:[" Today I built or changed"," I noticed that"]},
      "Day 4": { intro:" Today you will improve your plan fix a problem like pollution, traffic, power, or money and test your solution.", qod:"What problem did you focus on today, and how did your solution help?", stemsPreview:[" I improved my city by"," This helped because"]},
      "Day 5": { intro:" Today you will try a new strategy change one big decision (like taxes, energy, or recycling) and compare results.", qod:"What new strategy did you try today, and what happened in your city?", stemsPreview:[" A new strategy I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will stabilize your city make final adjustments so your city runs smoothly and is ready to show.", qod:"What final changes did you make today to prepare your city for sharing?", stemsPreview:[" A final change I made was"," This helped my city by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal in LinCity-NG? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "Cricut Design": {
    display:"Cricut Design",
    overview:"Learn how to create and cut designs using a Cricut machine.",
    vocab:[
      {term:"Vector",def:"A design made of lines and shapes that stays clear"},
      {term:"Cut",def:"To slice a material using the machine"},
      {term:"Mat",def:"A sticky board that holds material while cutting"},
      {term:"Vinyl",def:"Thin material used for stickers and decals"},
      {term:"Transfer Tape",def:"Tape used to move vinyl onto a new surface"},
      {term:"Weeding",def:"Removing extra vinyl you dont want"},
      {term:"Design Space",def:"Cricuts program for making and cutting designs"},
      {term:"Layer",def:"One part of a design stacked with others"},
      {term:"Mirror",def:"Flipping the design before cutting iron-on"},
      {term:"Stencil",def:"A cut-out shape used to paint a design"},
      {term:"Iron-on",def:"Vinyl that sticks with heat"},
      {term:"Alignment",def:"Lining up pieces so they match correctly"},
      {term:"SVG",def:"A common vector design file type"},
      {term:"Tool",def:"A part used for cutting or writing"},
      {term:"Calibration",def:"Adjusting the machine so it cuts correctly"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore Cricut tools learn how designs become cut projects and practice safe steps.", qod:"What did you discover about Cricut Design today?", stemsPreview:[" Today I discovered that Cricut can"," I noticed that when I use layers"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one Cricut project you want to finish by the end of the week.", qod:"What is your SMART goal for your Cricut Design project this week?", stemsPreview:[" My SMART goal for Cricut is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will create build your design in Design Space and start cutting or testing.", qod:"What did you create today, and what did you notice about your cut or design?", stemsPreview:[" Today I created"," I noticed that"]},
      "Day 4": { intro:" Today you will improve adjust sizing, layers, or alignment to make your project cleaner.", qod:"What changes did you make today to improve your Cricut project, and why?", stemsPreview:[" I improved my Cricut project by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique like iron-on, transfer tape, or a new material.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize clean up details like weeding and alignment and prepare to share.", qod:"What final improvements did you make today to prepare your Cricut project for sharing?", stemsPreview:[" A final improvement I made was"," This helped my project by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Cricut Design? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  },

  "CNC Milling": {
    display:"CNC Milling",
    overview:"Learn how a CNC machine cuts designs into materials using programmed paths.",
    vocab:[
      {term:"CNC",def:"A machine controlled by a computer"},
      {term:"Bit",def:"The cutting tool used by the CNC"},
      {term:"Spindle",def:"The part that spins the bit"},
      {term:"Feed Rate",def:"How fast the machine moves while cutting"},
      {term:"Speed",def:"How fast the bit spins"},
      {term:"Toolpath",def:"The route the machine follows to cut"},
      {term:"Clamp",def:"A tool that holds material in place"},
      {term:"Safety",def:"Rules that prevent injuries and damage"},
      {term:"Material",def:"What you cut, like wood or plastic"},
      {term:"Cut Depth",def:"How deep the bit cuts into material"},
      {term:"Pass",def:"One cutting trip over an area"},
      {term:"Zero Point",def:"The starting reference point for the machine"},
      {term:"CAD",def:"Software used to design the shape"},
      {term:"CAM",def:"Software that makes toolpaths for the machine"},
      {term:"Precision",def:"Cutting very accurately and carefully"}
    ],
    days:{
      "Day 1": { intro:" Today you will explore CNC milling learn how toolpaths cut shapes and why safety rules matter.", qod:"What did you discover about CNC Milling today?", stemsPreview:[" Today I discovered that CNC milling can"," I noticed that when the feed rate"]},
      "Day 2": { intro:" Today you will plan and set a SMART goal choose one CNC project you want to complete by the end of the week.", qod:"What is your SMART goal for your CNC Milling project this week?", stemsPreview:[" My SMART goal for CNC milling is"," I think the key to achieving this SMART goal will be"]},
      "Day 3": { intro:" Today you will create design a shape and start a toolpath test or a safe cut.", qod:"What did you create today, and what did you notice about your toolpath or cut?", stemsPreview:[" Today I created"," I noticed that"]},
      "Day 4": { intro:" Today you will improve adjust depth, speed, or design details for better results.", qod:"What changes did you make today to improve your CNC work, and why?", stemsPreview:[" I improved my CNC work by"," I made these changes because"]},
      "Day 5": { intro:" Today you will try a new technique like a new bit, a different material, or a new toolpath style.", qod:"What new technique did you try today, and what happened?", stemsPreview:[" A new technique I tried today was"," After trying it I noticed that"]},
      "Day 6": { intro:" Today you will finalize clean up your work and prepare your best cut to share.", qod:"What final improvements did you make today to prepare your CNC project for sharing?", stemsPreview:[" A final improvement I made was"," This helped my project by"]},
      "Day 7": { intro:" Today you will reflect on your SMART goal decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for CNC Milling? What helped or held you back?", stemsPreview:[" I did / did not meet my SMART goal because"," Next time I will"]}
    }
  }
};

