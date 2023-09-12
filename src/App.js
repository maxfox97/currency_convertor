import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";
import currencyapi from "@everapi/currencyapi-js";

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({});

  const client = new currencyapi(
    "cur_live_uy2frFOnbpnyWgwq4KbVwr6YOboOoxWFVVrnjsGZ"
  );

  useEffect(() => {
    client
      .historical({
        date: "01-01-2023",
      })
      .then((response) => {
        // setRates(response.data);
        ratesRef.current = response.data;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("error data");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]?.value;
    const result = price * ratesRef.current[toCurrency]?.value;

    setFromPrice(value);
    setToPrice(result);
  };

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency]?.value;
    const result = price * ratesRef.current[fromCurrency]?.value;

    setToPrice(value);
    setFromPrice(result);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
