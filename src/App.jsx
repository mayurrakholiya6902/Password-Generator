import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*~`{}[]';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?abstract,dark')`,
      }}
    >
      <div className="w-full max-w-md mx-auto p-6 bg-gray-700 bg-opacity-80 rounded-xl shadow-lg border border-gray-600">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Password Generator
        </h1>
        <div className="flex rounded-lg overflow-hidden mb-4 border border-gray-600">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-800 text-white rounded-l-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 shrink-0 rounded-r-lg"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <label htmlFor="lengthRange" className="text-white">
                Length: {length}
              </label>
              <input
                type="range"
                id="lengthRange"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer w-full bg-gray-600 rounded-full h-2 appearance-none"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numberAllowed}
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 focus:ring-blue-500"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="text-white">
                Numbers
              </label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="charInput"
                defaultChecked={charAllowed}
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-500 focus:ring-blue-500"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput" className="text-white">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;