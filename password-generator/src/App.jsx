import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordGen = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%&";

    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGen();
  }, [passwordGen]);

  const copyPass = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 shadow-xl">
        <h1 className="text-white text-center text-xl mb-5">
          Password Generator
        </h1>

        {/* Password + Copy */}
        <div className="flex rounded-lg overflow-hidden bg-white h-12 mb-5">
          {/* Scrollable password */}
          <div className="flex-1 min-w-0 flex items-center overflow-x-auto whitespace-nowrap pl-4 pr-6">
            <span
              className={`px-2 py-1 rounded transition-all duration-300 select-all
                ${copied ? "bg-blue-500 text-white" : "text-black"}
              `}
            >
              {password}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-300" />

          {/* Copy button */}
          <button
            onClick={copyPass}
            className={`shrink-0 w-24 flex items-center justify-center font-medium transition-colors
              ${copied ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}
            `}
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 text-sm text-white flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((p) => !p)}
            />
            <label>Number</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((p) => !p)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
