import "./App.css";
import Display from "./components/Display";
import Btn from "./components/Btn";
import { useState } from "react";
import "./style/btn.css";
import { create, all } from "mathjs";
import { useEffect } from "react";

function App() {
  const [displayTxt, setDisplayTxt] = useState("0");

  const config = {};
  const math = create(all, config);

  useEffect(() => {
    const keydownEventHandler = (e) => {
      let keysIds = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        0: "zero",
        "+": "add",
        "-": "subtract",
        "*": "multiply",
        "/": "divide",
        ".": "decimal",
        Enter: "equals",
        Escape: "clear",
        Backspace: "clear",
      };
      if (isValidKey(e.key)) {
        document.getElementById(keysIds[e.key]).click();
      }
    };
    document.addEventListener("keydown", keydownEventHandler);
    return () => {
      document.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  function isValidKey(key) {
    const validKeys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Enter",
      "+",
      "-",
      "*",
      "/",
      ".",
      "Escape",
      "Backspace",
    ];
    for (let i = 0; i < validKeys.length; i++) {
      const e = validKeys[i];
      if (e == key) {
        return true;
      }
    }
    return false;
  }

  function writeOnDisplay(e) {
    if (displayTxt == "Err") {
      setDisplayTxt("0");
      return;
    }

    if (e == "." && !dotAllowed(displayTxt)) return;
    if (isOperator(e) && lastCharIsAOperator(displayTxt)) {
      return;
    }
    if (displayTxt == "0" && e != "." && e != "*" && e != "/") {
      setDisplayTxt(e);
    } else setDisplayTxt((displayTxt) => displayTxt + e);
  }

  function isZeroDivide(cad) {
    let arrCad = cad.split("").reverse();
    if (arrCad[0] == "0")
      for (let i = 1; i < arrCad.length; i++) {
        const e = arrCad[i];
        if (e == "/") return true;
        if (e != "0") return false;
      }
    return false;
  }

  function dotAllowed(cad) {
    let arr = cad.split("").reverse();

    if (isNaN(arr[0])) {
      return false;
    }
    console.log(arr);
    for (let i = 1; i < arr.length; i++) {
      const e = arr[i];
      if (e == ".") return false;
      if (isNaN(e)) return true;
    }
    return true;
  }

  function isOperator(val) {
    let operator = ["-", "+", "*", "/"];
    for (let i = 0; i < operator.length; i++) {
      const e = operator[i];
      if (e == val) return true;
    }
  }

  function lastCharIsAOperator(cad) {
    let lastChar = cad.charAt(cad.length - 1);
    return isOperator(lastChar);
  }

  function solve() {
    if (lastCharIsAOperator(displayTxt)) return;
    if (isZeroDivide(displayTxt)) {
      setDisplayTxt("Err");
      return;
    }
    setDisplayTxt((displayTxt) => {
      let res;
      try {
        res = math
          .format(math.evaluate(displayTxt), { precision: 14 })
          .toString();
      } catch (msj) {
        res = "Err";
      }
      return res;
    });
  }

  function clearDisplay() {
    setDisplayTxt("0");
  }

  return (
    <div id="calculator">
      <Display id="display" value={displayTxt} />
      <div id="btns">
        <Btn onClick={clearDisplay} value="AC" id="clear" />
        <Btn onClick={writeOnDisplay} value="/" id="divide" />
        <Btn onClick={writeOnDisplay} value="*" id="multiply" />
        <Btn onClick={writeOnDisplay} value="7" id="seven" />
        <Btn onClick={writeOnDisplay} value="8" id="eight" />
        <Btn onClick={writeOnDisplay} value="9" id="nine" />
        <Btn onClick={writeOnDisplay} value="-" id="subtract" />
        <Btn onClick={writeOnDisplay} value="4" id="four" />
        <Btn onClick={writeOnDisplay} value="5" id="five" />
        <Btn onClick={writeOnDisplay} value="6" id="six" />
        <Btn onClick={writeOnDisplay} value="+" id="add" />
        <Btn onClick={writeOnDisplay} value="1" id="one" />
        <Btn onClick={writeOnDisplay} value="2" id="two" />
        <Btn onClick={writeOnDisplay} value="3" id="three" />
        <Btn onClick={solve} value="=" id="equals" />
        <Btn onClick={writeOnDisplay} value="0" id="zero" />
        <Btn onClick={writeOnDisplay} value="." id="decimal" />
      </div>
    </div>
  );
}

export default App;
