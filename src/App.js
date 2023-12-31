import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Table from "./components/Table";

function App() {
  const [email, setEmail] = useState("Loading...");

  useEffect(() => {

    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email") || "");
    } else {
      fetch("https://tempapi-w3c1.vercel.app/api/new")
        .then((res) => res.json())
        .then((data) => {
          setEmail(data.email);
          localStorage.setItem("email", data.email);
        });
    }

  }, []);

  return (
    <>
      <NavBar mail={email} />
      <div className={"flex h-full w-full "}>
        {email !== "Loading..." ? <Table mail={email} /> : <p>Making a new email for you...</p>}
      </div>
    </>
  );
}

export default App;
