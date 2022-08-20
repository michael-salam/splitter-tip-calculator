import { useState, useRef } from "react";
import "./TipCalculator.scss";
import logo from "../assets/logo.svg";
import dollarSign from "../assets/icon-dollar.svg";
import personIcon from "../assets/icon-person.svg";

const TipCalculator = () => {
  const customInput = useRef(null);
  const options = useRef(null);
  const resetBtn = useRef(null);

  const [billValue, setBillValue] = useState(0);
  const [tipPercent, setTipPercent] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const tipAmount = Math.round(billValue * (tipPercent / 100));

  const handleSetBillValue = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setBillValue(0);
      resetBtn.current.classList.add("inactive");
      resetBtn.current.classList.remove("active");
    } else {
      setBillValue(parseInt(e.target.value));
      resetBtn.current.classList.add("active");
      resetBtn.current.classList.remove("inactive");
    }
  };

  const handleSetTipPercent = (e) => {
    setTipPercent(e.target.value);
    customInput.current.value = "";
    let optionsArray = options.current.children;
    for (let i = 0; i < optionsArray.length - 1; i++) {
      if (
        optionsArray[i].textContent.slice(0, -1) === e.target.value.toString()
      ) {
        e.target.parentNode.classList.remove("label-inactive");
        e.target.parentNode.classList.add("label-active");
      } else {
        optionsArray[i].classList.remove("label-active");
        optionsArray[i].classList.add("label-inactive");
      }
    }
  };

  const handleChangeCustomForm = (e) => {
    setTipPercent(
      e.target.value === "" || isNaN(e.target.value)
        ? 0
        : parseInt(e.target.value)
    );
    let optionsArray = options.current.children;
    for (let i = 0; i < optionsArray.length - 1; i++) {
      optionsArray[i].classList.remove("label-active");
      optionsArray[i].classList.add("label-inactive");
    }
  };

  const handleResetForm = () => {
    if (billValue === 0) console.log("No values have been entered");
    else {
      setBillValue(0);
      setTipPercent(0);
      setNumberOfPeople(1);
      customInput.current.value = "";
      let optionsArray = options.current.children;
      for (let i = 0; i < optionsArray.length - 1; i++) {
        optionsArray[i].classList.remove("label-active");
        optionsArray[i].classList.add("label-inactive");
      }
    }
  };

  const handleSetFontSize = () => {
    if (billValue >= 0 && billValue < 999) return { fontSize: "2.5rem" };
    else if (billValue > 999 && billValue < 99999) return { fontSize: "2rem" };
    else if (billValue > 99999 && billValue < 9999999)
      return { fontSize: "1.5rem" };
    else if (billValue > 9999999)
      return { fontSize: "1.5rem", overflow: "hidden" };
  };

  const TipAmountCalculator = () => {
    if (numberOfPeople === 0) return "0";
    return (tipAmount / numberOfPeople).toFixed(2);
  };

  const TotalCalculator = () => {
    if (numberOfPeople === 0) return "0";
    return ((tipAmount + billValue) / numberOfPeople).toFixed(2);
  };

  return (
    <div className="wrapper">
      <div className="heading">
        <img src={logo} alt="Logo" />
      </div>

      <div className="container">
        <div className="container-left">
          <div className="input-with-icon">
            <label className="label" htmlFor="bill">
              Bill
            </label>
            <img className="icon" src={dollarSign} alt="Dollar icon" />
            <input
              id="bill"
              className="input-with-outline"
              type="text"
              pattern="[0-9]"
              value={billValue}
              onChange={handleSetBillValue}
            />
          </div>

          <div className="tip-percent">
            <p className="label">Select Tip %</p>
            <div ref={options} className="options">
              <label className="label-inactive" htmlFor="5%">
                5%
                <input
                  id="5%"
                  type="checkbox"
                  value={5}
                  onClick={handleSetTipPercent}
                />
              </label>
              <label className="label-inactive" htmlFor="10%">
                10%
                <input
                  id="10%"
                  type="checkbox"
                  value={10}
                  onClick={handleSetTipPercent}
                />
              </label>
              <label className="label-inactive" htmlFor="15%">
                15%
                <input
                  id="15%"
                  type="checkbox"
                  value={15}
                  onClick={handleSetTipPercent}
                />
              </label>
              <label className="label-inactive" htmlFor="25%">
                25%
                <input
                  id="25%"
                  type="checkbox"
                  value={25}
                  onClick={handleSetTipPercent}
                />
              </label>
              <label className="label-inactive" htmlFor="50%">
                50%
                <input
                  id="50%"
                  type="checkbox"
                  value={50}
                  onClick={handleSetTipPercent}
                />
              </label>
              <input
                ref={customInput}
                className="custom-input input-with-outline"
                type="text"
                pattern="[0-9]"
                placeholder="Custom"
                onChange={handleChangeCustomForm}
                onFocus={(e) => (e.target.value = tipPercent)}
              />
            </div>
          </div>

          <div className="input-with-icon">
            <label className="label" htmlFor="number">
              Number of People
            </label>
            <img className="icon" src={personIcon} alt="Person icon" />
            <input
              id="number"
              className="input-with-outline"
              type="text"
              pattern="[0-9]"
              value={numberOfPeople}
              onChange={(e) =>
                setNumberOfPeople(
                  e.target.value === "" || isNaN(e.target.value)
                    ? 1
                    : parseInt(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div className="container-right">
          <div className="result-container">
            <div className="tip-amount">
              <div className="label">
                <p className="main">Tip Amount</p>
                <p className="sub">/ person</p>
              </div>
              <span className="result-display" style={handleSetFontSize()}>
                $<TipAmountCalculator />
              </span>
            </div>
            <div className="total">
              <div className="label">
                <p className="main">Total</p>
                <p className="sub">/ person</p>
              </div>
              <span className="result-display" style={handleSetFontSize()}>
                $<TotalCalculator />
              </span>
            </div>
          </div>
          <button
            ref={resetBtn}
            className="reset-button inactive"
            onClick={handleResetForm}
          >
            RESET
          </button>
        </div>
      </div>

      <footer className="footer">
        Frontend Mentor challenge by <a href="/#">Michael Salam</a>
      </footer>
    </div>
  );
};

export default TipCalculator;
