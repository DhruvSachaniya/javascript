import { useEffect, useState } from "react";
import axios from "axios";

export function PdfForm() {
  const [values, setvalue] = useState({
    email: "",
    otp: "",
  });

  const [time, settime] = useState(120);
  const [timer, settimer] = useState(false);
  const [resend, setresend] = useState(false);

  function handlechange(e) {
    const { name, value } = e.target;
    setvalue({ ...values, [name]: value });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer) {
        if (time > 0) {
          settime(time - 1);
        } else {
          settimer(false);
          setresend(true);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [time, timer]);

  async function handlesendmail() {
    if (!validateEmail(values.email)) {
      window.alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3333/login", {
        email: values.email,
      });

      if (response.status === 200) {
        window.alert("OTP has been sent to your email!");
        settimer(true);
        settime(120);
        setresend(false);
      } else {
        window.alert("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.log(err);
      window.alert("An error occurred. Please try again later.");
    }
  }

  async function verifyOtp() {
    try {
      const response2 = await axios.post("http://localhost:3333/varify", {
        email: values.email,
        otp: values.otp,
      });

      if (response2.status === 200) {
        window.alert("OTP verified");
        setvalue({ email: "", otp: "" });
        settimer(false);
        setresend(false);
      } else {
        window.alert("Invalid OTP");
      }
    } catch (err) {
      console.log("Error verifying OTP:", err);
      window.alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="Form-container">
        <h1>OTP Form</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handlechange}
        />
        <button onClick={handlesendmail} type="submit" disabled={timer}>
          Generate OTP
        </button>
        {timer && <p>{time}</p>}
        {resend && (
          <button type="submit" onClick={handlesendmail}>
            Resend OTP
          </button>
        )}
        <input
          type="text"
          name="otp"
          placeholder="OTP"
          value={values.otp}
          onChange={handlechange}
        />
        <button type="submit" onClick={verifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}
