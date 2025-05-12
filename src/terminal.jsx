import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const hasInitialized = useRef(false);

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const appendHistory = (item) => {
        setHistory(prev => [...prev, item]);
    };

    const addPrompt = () => {
        appendHistory({ type: 'prompt', content: "# user in ~/jack-hoggard" });
    };

    const createText = async (text) => {
        appendHistory({ type: 'text', content: text });
    };

    const createCode = async (code, text) => {
        appendHistory({ type: 'code', code, text });
    };

    const trueValue = (value) => {
        appendHistory({ type: 'success', content: `> ${value}` });
    };

    const falseValue = (value) => {
        appendHistory({ type: 'error', content: `> ${value}` });
    };

    const handleCommand = async (value) => {
        if (value === "help") {
            trueValue(value);
            await createCode("help", "View all commands.");
            await createCode("about", "About me.");
            await createCode("projects", "List all my projects.");
            await createCode("resume", "View my resume.");
            await createCode("contact -a", "Get in touch with me!");
        } else if (value === "projects") {
            trueValue(value);
            await createText("<b>For all my projects, check out my github:</b> <a href='https://github.com/jacksonhoggard' target='_blank'>github.com/jacksonhoggard</a>");
            await createCode("<b>RayDream:</b>", "A powerful ray tracer implemented in Java. RayDream creates realistic images by simulating the behavior of light rays as they interact with objects in a scene. <a href='https://github.com/JacksonHoggard/raydream' target='_blank'>Check it out</a>");
            await createCode("<b>Voodoo2D:</b>", "A lightweight engine to easily build complex cross-platform 2D games in Java. <a href='https://github.com/JacksonHoggard/voodoo2d' target='_blank'>Check it out</a>");
            await createCode("<b>Ascii Renderer:</b>", "An interactive 3D renderer that converts Three.js scenes into ASCII art in real time. It supports CPU and GPU rendering modes, model import, and terrain generation. <a href='https://jacksonhoggard.me/ascii-renderer' target='_blank'>Check it out</a><a href='https://github.com/JacksonHoggard/ascii-renderer' target='_blank'> &lt;Source Code/&gt;</a>");
            await createCode("<b>DreamBoard:</b>", "Plan your next perfect room by selecting any color palette of your choice. This website will then scout the ideal furniture choices for your dream room along with the perfect side pieces to go along! <a href='https://www.youtube.com/watch?v=EOh4-mc4naI' target='_blank'>Demo</a><a href='https://github.com/acm-projects/DreamBoard' target='_blank'> &lt;Source Code/&gt;</a>");
            await createCode("<b>Sish:</b>", "A simple shell for Linux environments written in C. <a href='https://github.com/JacksonHoggard/sish' target='_blank'>Check it out</a>");
        } else if (value === "about") {
            trueValue(value);
            await createText("Hi, I'm Jack, a Senior Computer Science major at the University of Texas at Dallas with a passion for creativity and innovation in technology.");
            await createText("I specialize in computer graphics and have hands-on experience designing graphical interfaces, developing raytracing projects, and performing advanced GPU computations.");
            await createText("Beyond academics, I've explored my love for game design, having worked in the industry for over a year and honing my skills in creating immersive, interactive experiences.");
            await createText("When I'm not coding, you'll likely find me playing music and writing folk, blues, and experimental rock.");
        } else if (value === "resume") {
            trueValue(value);
            await createText("<a href='https://raw.githubusercontent.com/jacksonhoggard/JacksonHoggard.github.io/main/resume.pdf' target='_blank'>Click here to view my resume!</a>");
        } else if (value === "contact -a") {
            trueValue(value);
            await createText("<a href='https://github.com/jacksonhoggard' target='_blank'>github.com/jacksonhoggard</a>");
            await createText("<a href='https://www.linkedin.com/in/jackhoggard/' target='_blank'>linkedin.com/in/jackhoggard/</a>");
            await createText("<a href='mailto:jhoggard0129@gmail.com' target='_blank'>jhoggard0129@gmail.com</a>");
        } else if (value === "contact") {
            trueValue(value);
            await createText("Did you mean: contact -a?");
        } else if (value === "clear") {
            setHistory([]);
        } else if (value === "kanye") {
            trueValue(value);
            await createText("<a href='https://jacksonhoggard.me/kanye.js/' target='_blank'>kanye</a>");
        } else if (value === "secret") {
            trueValue(value);
            await createText("<a href='https://jacksonhoggard.me/realportfolio/' target='_blank'>the real portfolio</a>");
        } else {
            falseValue(value);
            await createText(`command not found: ${value}`);
        }
    };

    const handleKeyPress = async (e) => {
        if (e.key === "Enter") {
            await delay(150);
            const command = inputValue;
            await handleCommand(command);
            setInputValue("");
            await delay(150);
            addPrompt();
        }
    };

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;
        const openTerminal = async () => {
            await createText("Welcome!");
            await delay(700);
            await createText("Try these commands:");
            await createCode("help", "View all commands.");
            await createCode("about", "About me.");
            await createCode("projects", "View my projects.");
            await createCode("resume", "View my resume.");
            await delay(500);
            addPrompt();
        };
        openTerminal();
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div id="app" ref={containerRef} onClick={() => inputRef.current && inputRef.current.focus()}>
            {history.map((item, index) => {
                if (item.type === "prompt") {
                    return (
                        <p key={index} className="path">
                            # user <span> in</span> <span> ~/jack-hoggard</span>
                        </p>
                    );
                } else if (item.type === "text") {
                    return (
                        <p key={index} dangerouslySetInnerHTML={{ __html: item.content }}></p>
                    );
                } else if (item.type === "code") {
                    return (
                        <p key={index} className="code">
                            <span dangerouslySetInnerHTML={{ __html: item.code }}></span>
                            <br />
                            <span className="text" dangerouslySetInnerHTML={{ __html: item.text }}></span>
                        </p>
                    );
                } else if (item.type === "success") {
                    return (
                        <section key={index} className="type2">
                            <i className="fas fa-angle-right icone"></i>
                            <h2 className="sucess">{item.content}</h2>
                        </section>
                    );
                } else if (item.type === "error") {
                    return (
                        <section key={index} className="type2">
                            <i className="icone error"></i>
                            <h2 className="error">{item.content}</h2>
                        </section>
                    );
                }
                return null;
            })}
            <div className="type">
                <i className="icone">{">"}</i>
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    );
};

export default Terminal;