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
      "Day 1": { intro:"🎨 Today you will explore digital art tools… try drawing, editing, or AI image makers to see what each tool can do.", qod:"What did you discover about Digital Art today?", stemsPreview:["🎨 Today I discovered that I can…","👀 I noticed that when I…"], stemsInsert:["🎨 Today I discovered that I can","👀 I noticed that when I"] },
      "Day 2": { intro:"🎯 Today you will plan and set a SMART goal… choose one kind of digital artwork you want to finish by the end of the week.", qod:"What is your SMART goal for your Digital Art project this week?", stemsPreview:["🎯 My SMART goal for Digital Art is…","🧠 I think the key to achieving this SMART goal will be…"], stemsInsert:["🎯 My SMART goal for Digital Art is","🧠 I think the key to achieving this SMART goal will be"] },
      "Day 3": { intro:"🛠️ Today you will create your artwork… focus on colors, shapes, and tools, and save what you want to improve tomorrow.", qod:"What artwork did you create today, and what did you notice?", stemsPreview:["🛠️ Today I created…","👀 I noticed that…"], stemsInsert:["🛠️ Today I created","👀 I noticed that"] },
      "Day 4": { intro:"🧩 Today you will refine your artwork… improve details like color, size, layers, or layout to make it stronger.", qod:"What changes did you make to your artwork today, and why?", stemsPreview:["🧩 I improved my artwork by…","💡 I made these changes because…"], stemsInsert:["🧩 I improved my artwork by","💡 I made these changes because"] },
      "Day 5": { intro:"🧰 Today you will apply a new tool or technique… try something new and notice how it changes your design.", qod:"What tools or techniques did you use today, and what happened?", stemsPreview:["🧰 A tool or technique I used today was…","🔍 After using this tool or technique I noticed that…"], stemsInsert:["🧰 A tool or technique I used today was","🔍 After using this tool or technique I noticed that"] },
      "Day 6": { intro:"✅ Today you will make final adjustments… clean up your work, fix small mistakes, and get it ready to share.", qod:"What final changes did you make today to prepare your artwork for sharing?", stemsPreview:["✅ A final change I made today was…","📌 This change helped my artwork by…"], stemsInsert:["✅ A final change I made today was","📌 This change helped my artwork by"] },
      "Day 7": { intro:"🗣️ Today you will reflect on your SMART goal… think about what helped you succeed and what you would do differently next time.", qod:"Did you meet your SMART goal for your Digital Art project? What helped or held you back?", stemsPreview:["🗣️ I did / did not meet my SMART goal because…","🌟 The key to achieving this SMART goal is…"], stemsInsert:["🗣️ I did / did not meet my SMART goal because","🌟 The key to achieving this SMART goal is"] }
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
      "Day 1": { intro:"📷 Today you will explore photography tools… test angles, lighting, and focus to see what makes a photo strong.", qod:"What did you discover about Photography today?", stemsPreview:["📷 Today I discovered that good photos can…","👀 I noticed that when the light…"], stemsInsert:["📷 Today I discovered that good photos can","👀 I noticed that when the light"] },
      "Day 2": { intro:"🎯 Today you will plan and set a SMART goal… choose one photo idea you want to improve and finish by the end of the week.", qod:"What is your SMART goal for your Photography project this week?", stemsPreview:["🎯 My SMART goal for Photography is…","🧠 I think the key to achieving this SMART goal will be…"], stemsInsert:["🎯 My SMART goal for Photography is","🧠 I think the key to achieving this SMART goal will be"] },
      "Day 3": { intro:"🛠️ Today you will take photos for your goal… focus on one skill like composition, focus, or lighting.", qod:"What photos did you take today, and what did you notice?", stemsPreview:["🛠️ Today I took photos of…","👀 I noticed that…"], stemsInsert:["🛠️ Today I took photos of","👀 I noticed that"] },
      "Day 4": { intro:"🧩 Today you will improve your photos… retake shots or adjust settings to get a clearer, stronger image.", qod:"What changes did you make to improve your photos today, and why?", stemsPreview:["🧩 I improved my photos by…","💡 I made these changes because…"], stemsInsert:["🧩 I improved my photos by","💡 I made these changes because"] },
      "Day 5": { intro:"🧰 Today you will try a new technique… like rule of thirds, portrait vs landscape, or a new lighting idea.", qod:"What new technique did you try today, and what happened?", stemsPreview:["🧰 A new technique I tried today was…","🔍 After trying it I noticed that…"], stemsInsert:["🧰 A new technique I tried today was","🔍 After trying it I noticed that"] },
      "Day 6": { intro:"✅ Today you will make final edits… crop, adjust brightness, and pick your best photo to share.", qod:"What final edits did you make today to prepare your best photo for sharing?", stemsPreview:["✅ A final edit I made today was…","📌 This edit helped my photo by…"], stemsInsert:["✅ A final edit I made today was","📌 This edit helped my photo by"] },
      "Day 7": { intro:"🗣️ Today you will reflect on your SMART goal… decide if you met it and what you would do next time.", qod:"Did you meet your SMART goal for Photography? What helped or held you back?", stemsPreview:["🗣️ I did / did not meet my SMART goal because…","🌟 Next time I will…"], stemsInsert:["🗣️ I did / did not meet my SMART goal because","🌟 Next time I will"] }
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
      "Day 1": { intro:"🎵 Today you will explore music tools… try beats, loops, and simple sounds to learn what digital music can do.", qod:"What did you discover about making music with a computer today?", stemsPreview:["🎵 Today I discovered that digital music tools can…","👀 I noticed that when I change the tempo…"], stemsInsert:["🎵 Today I discovered that digital music tools can","👀 I noticed that when I change the tempo"] },
      "Day 2": { intro:"🎯 Today you will plan and set a SMART goal… choose one short song or beat you want to finish by the end of the week.", qod:"What is your SMART goal for your Music Production project this week?", stemsPreview:["🎯 My SMART goal for Music Production is…","🧠 I think the key to achieving this SMART goal will be…"], stemsInsert:["🎯 My SMART goal for Music Production is","🧠 I think the key to achieving this SMART goal will be"] },
      "Day 3": { intro:"🛠️ Today you will build your track… add beats, loops, or notes and save your progress.", qod:"What did you create today, and what did you notice about your sound?", stemsPreview:["🛠️ Today I created…","👀 I noticed that…"], stemsInsert:["🛠️ Today I created","👀 I noticed that"] },
      "Day 4": { intro:"🧩 Today you will improve your track… adjust rhythm, melody, or layering so it sounds clearer.", qod:"What changes did you make to improve your track today, and why?", stemsPreview:["🧩 I improved my track by…","💡 I made these changes because…"], stemsInsert:["🧩 I improved my track by","💡 I made these changes because"] },
      "Day 5": { intro:"🧰 Today you will try a new technique… like adding a new instrument, recording a sound, or changing the mix.", qod:"What new technique did you try today, and what happened?", stemsPreview:["🧰 A new technique I tried today was…","🔍 After trying it I noticed that…"], stemsInsert:["🧰 A new technique I tried today was","🔍 After trying it I noticed that"] },
      "Day 6": { intro:"✅ Today you will finalize your music… balance volume, clean up timing, and get it ready to share.", qod:"What final changes did you make today to prepare your music for sharing?", stemsPreview:["✅ A final change I made today was…","📌 This change helped my music by…"], stemsInsert:["✅ A final change I made today was","📌 This change helped my music by"] },
      "Day 7": { intro:"🗣️ Today you will reflect on your SMART goal… decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Music Production? What helped or held you back?", stemsPreview:["🗣️ I did / did not meet my SMART goal because…","🌟 Next time I will…"], stemsInsert:["🗣️ I did / did not meet my SMART goal because","🌟 Next time I will"] }
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
      {term:"Domain",def:"A website’s name on the internet"},
      {term:"Browser",def:"An app used to view websites"},
      {term:"Search Engine",def:"A tool that helps you find websites"},
      {term:"Media",def:"Pictures, video, or audio on a site"},
      {term:"Font",def:"The style of letters on a page"},
      {term:"Header",def:"The top part of a page that can show a title"},
      {term:"Footer",def:"The bottom part of a page with extra info or links"}
    ],
    days:{
      "Day 1": { intro:"🌐 Today you will explore websites and design choices… notice what makes a site easy to read and use.", qod:"What did you discover about website design today?", stemsPreview:["🌐 Today I discovered that good websites can…","👀 I noticed that when a site has clear navigation…"], stemsInsert:["🌐 Today I discovered that good websites can","👀 I noticed that when a site has clear navigation"] },
      "Day 2": { intro:"🎯 Today you will plan and set a SMART goal… choose one simple webpage you want to build or improve by the end of the week.", qod:"What is your SMART goal for your Language & Website Design project this week?", stemsPreview:["🎯 My SMART goal for Website Design is…","🧠 I think the key to achieving this SMART goal will be…"], stemsInsert:["🎯 My SMART goal for Website Design is","🧠 I think the key to achieving this SMART goal will be"] },
      "Day 3": { intro:"🛠️ Today you will start building… create your page structure with headings, sections, and links.", qod:"What did you build today, and what did you notice about your layout?", stemsPreview:["🛠️ Today I built…","👀 I noticed that…"], stemsInsert:["🛠️ Today I built","👀 I noticed that"] },
      "Day 4": { intro:"🧩 Today you will improve the design… adjust spacing, fonts, or page organization to make it easier to read.", qod:"What changes did you make to improve your website today, and why?", stemsPreview:["🧩 I improved my website by…","💡 I made these changes because…"], stemsInsert:["🧩 I improved my website by","💡 I made these changes because"] },
      "Day 5": { intro:"🧰 Today you will try a new feature… add images, a menu, or a new page section and test it.", qod:"What new feature did you add today, and what happened when you tested it?", stemsPreview:["🧰 A new feature I added today was…","🔍 After testing it I noticed that…"], stemsInsert:["🧰 A new feature I added today was","🔍 After testing it I noticed that"] },
      "Day 6": { intro:"✅ Today you will finalize your site… fix small issues, check links, and make it ready to share.", qod:"What final fixes did you make today to prepare your website for sharing?", stemsPreview:["✅ A final fix I made today was…","📌 This fix helped my website by…"], stemsInsert:["✅ A final fix I made today was","📌 This fix helped my website by"] },
      "Day 7": { intro:"🗣️ Today you will reflect on your SMART goal… decide if you met it and what you would do differently next time.", qod:"Did you meet your SMART goal for Website Design? What helped or held you back?", stemsPreview:["🗣️ I did / did not meet my SMART goal because…","🌟 Next time I will…"], stemsInsert:["🗣️ I did / did not meet my SMART goal because","🌟 Next time I will"] }
    }
  }

  /* NOTE: Remaining projects will be appended by the build script for brevity in this environment. */
};
