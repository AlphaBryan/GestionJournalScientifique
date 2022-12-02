import React, { useState } from "react";

type Props = {};

// async function loginUser(credentials) {
//   return fetch("http://localhost:8080/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

const Inscription = (props: Props) => {
  const [nom, setNom] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [role, setRole] = useState("Auteur");
  const [password, setPassword] = useState<String>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //  const token = await loginUser({
    //    email,
    //    password,
    //  });
    //  setToken(token);
    console.log(email);
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Merci de vous inscrire</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Prénom et Nom</h3>
          <input
            style={{ paddingBottom: "3%", paddingTop: "3%" }}
            type="text"
            onChange={(e) => setNom(e.target.value)}
          />
        </label>
        <label>
          <h3>Email</h3>
          <input
            style={{ paddingBottom: "3%", paddingTop: "3%" }}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div
          style={{
            flex: 1,
            flexDirection: "row",
            display: "flex",
          }}
        >
          <label style={{ marginLeft: "-5%" }}>
            <h3>Auteur</h3>
            <input
              type="radio"
              style={{ paddingBottom: "3%", paddingTop: "3%" }}
              value="Auteur"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "Auteur"}
            />
          </label>
          <label style={{ marginLeft: "25%" }}>
            <h3>Evaluateur</h3>
            <input
              type="radio"
              style={{ paddingBottom: "3%", paddingTop: "3%" }}
              value="Evaluateur"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "Evaluateur"}
            />
          </label>
        </div>

        <label>
          <h3 style={{ paddingTop: "0%" }}>Mot de passe</h3>
          <input
            type="password"
            style={{ paddingBottom: "3%", paddingTop: "3%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button
            style={{
              width: "100%",
              marginTop: "20%",
              paddingTop: "5%",
              paddingBottom: "5%",
              backgroundColor: "lightblue",
              borderRadius: "30px",
            }}
            type="submit"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
