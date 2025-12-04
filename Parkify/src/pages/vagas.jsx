import React, { useState } from "react";
import "./vagas.css";

export default function Vagas() {
    const [vagas, setVagas] = useState([
        { id: 1, numero: "01", placa: "ABC-1234", ocupada: true },
        { id: 2, numero: "02", placa: "", ocupada: false },
        { id: 3, numero: "03", placa: "JJK-0001", ocupada: true },
        { id: 4, numero: "04", placa: "", ocupada: false },
        { id: 5, numero: "05", placa: "", ocupada: false },
        { id: 6, numero: "06", placa: "EEE-1020", ocupada: true },
        { id: 7, numero: "07", placa: "", ocupada: false },
        { id: 8, numero: "08", placa: "", ocupada: false },
        { id: 9, numero: "09", placa: "XYZ-9988", ocupada: true },
        { id: 10, numero: "10", placa: "", ocupada: false },
        { id: 11, numero: "11", placa: "", ocupada: false },
        { id: 12, numero: "12", placa: "AAA-7B77", ocupada: true },
        { id: 13, numero: "13", placa: "", ocupada: false },
        { id: 14, numero: "14", placa: "", ocupada: false },
        { id: 15, numero: "15", placa: "HJK-2211", ocupada: true },
        { id: 16, numero: "16", placa: "", ocupada: false },
        { id: 17, numero: "17", placa: "", ocupada: false },
        { id: 18, numero: "18", placa: "", ocupada: false },
        { id: 19, numero: "19", placa: "", ocupada: false },
        { id: 20, numero: "20", placa: "KLM-9090", ocupada: true },
    ]);

    const [modal, setModal] = useState(null);
    const [placaInput, setPlacaInput] = useState("");
    const [erro, setErro] = useState("");

    const abrirModal = (vaga) => {
        setModal(vaga);
        setPlacaInput(vaga.placa || "");
        setErro("");
    };

    const fecharModal = () => {
        setModal(null);
        setPlacaInput("");
        setErro("");
    };

    const validarPlaca = (placa) => {
        const modelo1 = /^[A-Z]{3}-\d{4}$/;
        const modelo2 = /^[A-Z]{3}-\d[A-Z]\d{2}$/;

        return modelo1.test(placa) || modelo2.test(placa);
    };

    const salvarEntrada = () => {
        if (!validarPlaca(placaInput)) {
            setErro("Digite uma placa válida (ex: ABC-1234 ou ABC-1A23)");
            return;
        }

        setVagas((prev) =>
            prev.map((v) =>
                v.id === modal.id ? { ...v, placa: placaInput, ocupada: true } : v
            )
        );

        fecharModal();
    };

    const salvarSaida = () => {
        const confirmar = window.confirm(
            "Tem certeza que deseja retirar o veículo desta vaga?"
        );

        if (!confirmar) return;

        setVagas((prev) =>
            prev.map((v) =>
                v.id === modal.id ? { ...v, placa: "", ocupada: false } : v
            )
        );

        fecharModal();
    };

    return (
        <div className="vagas-container">
            <h1 className="titulo">Vagas</h1>

            <div className="lista-vagas">
                {vagas.map((vaga) => (
                    <div
                        key={vaga.id}
                        className={`vaga ${vaga.ocupada ? "ocupada" : "livre"}`}
                        onClick={() => abrirModal(vaga)}
                    >
                        <span className="vaga-num">{vaga.numero}</span>
                        <span className="vaga-placa">
                            {vaga.ocupada ? vaga.placa : "LIVRE"}
                        </span>

                        <div
                            className={`status-icon ${vaga.ocupada ? "ocupado" : "liberado"
                                }`}
                        >
                            {vaga.ocupada ? "-" : "+"}
                        </div>
                    </div>
                ))}
            </div>

            {modal && (
                <div className="modal-container">
                    <div className="modal-card">
                        <h2>Vaga {modal.numero}</h2>

                        {modal.ocupada ? (
                            <>
                                <p><strong>Placa:</strong> {modal.placa}</p>

                                <button className="btn-retirar" onClick={salvarSaida}>
                                    Retirar
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Digite a placa"
                                    value={placaInput}
                                    onChange={(e) => setPlacaInput(e.target.value.toUpperCase())}
                                />

                                {erro && <p style={{ color: "red" }}>{erro}</p>}

                                <button className="btn-add" onClick={salvarEntrada}>
                                    Adicionar
                                </button>
                            </>
                        )}

                        <button className="btn-cancelar" onClick={fecharModal}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
