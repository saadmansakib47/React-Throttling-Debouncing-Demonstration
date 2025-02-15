import { useState, useEffect } from "react";

function useDebouncedResize(delay) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timer;
    
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, delay);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [delay]);

  return windowSize;
}

export default function App() {
  const { width, height } = useDebouncedResize(500); // 500ms debounce delay

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Window Size</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
