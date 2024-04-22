const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));


app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
    getInputValue();
   
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  input.focus();
})


async function open_terminal(){
  createText("Welcome!");
  await delay(700);
  createText("Try these commands:");
 
  createCode("help", "View all commands.");
  createCode("about", "About me.");
  createCode("projects", "View my projects.");
  createCode("resume", "View my resume.");

  await delay(500);
  new_line();
}


function new_line(){
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  p.setAttribute("class", "path")
  p.textContent = "# user";
  span1.textContent = " in";
  span2.textContent = " ~/jack-hoggard";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "icone");
  span3.textContent = ">";
  i.appendChild(span3);
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput(){
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue(){
  
  const value = document.querySelector("input").value;
  if(value === "help"){
    trueValue(value);
    
    createCode("help", "View all commands.");
    createCode("about", "About me.");
    createCode("projects", "List all my projects.");
    createCode("resume", "View my resume.");
    createCode("contact -a", "Get in touch with me!");
    createCode("clear", "Clear the terminal.");
    
  }
  else if(value === "projects"){
    trueValue(value);
    createText("<b>For all my projects, check out my github:</b> <a href='https://github.com/jacksonhoggard' target='_blank'>github.com/jacksonhoggard</a>");
    createCode("<b>RayDream:</b>", "A simple yet powerful ray tracer implemented in Java. RayDream creates realistic images by simulating the behavior of light rays as they interact with objects in a scene. <a href='https://github.com/JacksonHoggard/raydream' target='_blank'>Check it out</a>");
    createCode("<b>Voodoo2D:</b>", "A lightweight engine to easily build complex cross-platform 2D games in Java. <a href='https://github.com/JacksonHoggard/voodoo2d' target='_blank'>Check it out</a>");
    createCode("<b>DreamBoard:</b>", "Plan your next perfect room by selecting any color palette of your choice. This website will then scout the ideal furniture choices for your dream room along with the perfect side pieces to go along! <a href='https://www.youtube.com/watch?v=EOh4-mc4naI' target='_blank'>Demo</a><a href='https://github.com/acm-projects/DreamBoard' target='_blank'> &lt;Source Code/&gt;</a>");
    createCode("<b>Sish:</b>", "A simple shell for Linux environments written in C. <a href='https://github.com/JacksonHoggard/sish' target='_blank'>Check it out</a>");
    createCode("<b>SishFuzz:</b>", "Fuzzers for the Sish simple shell program. <a href='https://github.com/JacksonHoggard/sishfuzz' target='_blank'>Check it out</a>");
  }
  else if(value === "about"){
    trueValue(value);
    createText("Hey there! My name is Jackson Hoggard and I am a Senior pursuing a Bachelors of Science in Computer Science at the University of Texas at Dallas.");
    createText("I have experience in backend software development and the agile software development method through my time spent working at a video game studio.");
    createText("At UTD, I am involved in the Association for Computing Machinery, having participated in ACM Projects and HackUTD."); 
    createText("I excel at teamwork, technical communication, leadership, critical thinking, and problem solving. I have a passion for computer programming and I aim for excellence in everything I do.");
  }
  else if(value === "resume"){
    trueValue(value);
    createText("<a href='https://raw.githubusercontent.com/jacksonhoggard/JacksonHoggard.github.io/main/resume.pdf' target='_blank'>Click here to view my resume!</a>")
  }
  else if(value === "contact -a") {
    trueValue(value);
    createText("<a href='https://github.com/jacksonhoggard' target='_blank'>github.com/jacksonhoggard</a>")
    createText("<a href='https://www.linkedin.com/in/jackhoggard/' target='_blank'>linkedin.com/in/jackhoggard/</a>")
    createText("<a href='mailto:jhoggard0129@gmail.com' target='_blank'>jhoggard0129@gmail.com</a>")
  }
  else if(value === "contact"){
    trueValue(value);
    createText("Did you mean: contact -a?")
  }
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else if(value === "kanye"){
    trueValue(value);
    createText("<a href='https://jacksonhoggard.me/kanye.js/' target='_blank'>kanye</a>");
  }
  else if(value === "secret"){
    trueValue(value);
    createText("<a href='https://jacksonhoggard.me/realportfolio/' target='_blank'>the real portfolio</a>");
  }
  else{
    falseValue(value);
    createText(`command not found: ${value}`)
  }
}

function trueValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess")
  mensagem.textContent = "> " + `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = "> " + `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  
  p.innerHTML =
  text
  ;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =
 `${code}<br/><span class='text'>${text}</span>`;
  app.appendChild(p);
}

open_terminal();
