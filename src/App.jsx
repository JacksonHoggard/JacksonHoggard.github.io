import Starfield from "react-starfield";
import Terminal from "./Terminal.jsx";

function App() {
    return (
        <main style={{ width: "100vw", height: "100vh", overflow: "hidden", justifyContent: "center", alignItems: "center", display: "flex" }}>
            <div className="stars">
                <Starfield
                    starCount={1000}
                    starColor={[255, 255, 255]}
                    speedFactor={0.05}
                    backgroundColor="black"
                />
            </div>
            <div class="container">
                <div class="menu">
                    <div class="buttons-flex">
                        <div class="button red"></div>
                        <div class="button yellow"></div>
                        <div class="button green"></div>
                    </div>
                    <div class="title">
                        <a target="_blank"><h1>jacksonhoggard.me</h1></a>
                    </div>
                </div>
                <Terminal />
            </div>
        </main>
    );
}

export default App;
