import { useState } from "react";
import "./login.css";
import imageDown from '../assets/images/FooterImage.svg';
import { Link, useNavigate } from "react-router-dom"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiMessageType, setApiMessageType] = useState(""); 

  const navigate = useNavigate(); 

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "O email é obrigatório.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = "Formato de email inválido.";

    if (!password.trim()) newErrors.password = "A senha é obrigatória.";
    else if (password.length < 6)
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setApiMessage("");

    try {
      const response = await fetch("https://suaapi.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erro na API");

      setApiMessage("Login realizado com sucesso!");
      setApiMessageType("success");

      navigate("/vagas");

    } catch (err) {
      setApiMessage(err.message);
      setApiMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="mainTitle">
        <h1>Parkify</h1>
        <h2>Estacionamento 24h</h2>

        <Link to="/cadastro" className="register-link">
          Não possui cadastro? Cadastre-se
        </Link>
      </div>

      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <label>E-mail:</label>
          <div className="field-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
         
          </div>

          <label>Senha:</label>
          <div className="field-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
          </div>

<Link to="/vagas">
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}


          <button type="submit" disabled={loading} >
            <Link to="/vagas">
              {loading ? "Entrando..." : "Entrar"}
            </Link>

          </button>
          </Link>
        </form>

        <img src={imageDown} alt="" />

      </div>
    </div>
  );
}
