import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";

export const NewTransactionModal = ({ isOpen, onRequestClose, title, id }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [categoria, setCategoria] = useState("");

  function handleNewTransaction(e) {
    e.preventDefault();
    const data = {
      description,
      value,
      categoria,
      type,
    };

    fetch("http://localhost:3000/api/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDescription("");
        setCategoria("");
        setType("");
        setValue(0);
        onRequestClose();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button onClick={onRequestClose} className="react-modal-close">
        <img src={closeIcon} />
      </button>
      <div className="containerModal">
        <h2>{title}</h2>
        <form className="form">
          <input
            className="input"
            placeholder="Titulo"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            className="input"
            placeholder="Valor"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
          />
          <div className="TransactionTypeCotainer">
            <button
              type="button"
              onClick={() => setType("income")}
              className={type === "income" ? "active1" : ""}
            >
              <img src={incomeIcon} alt="income" />
              <span>Entrada</span>
            </button>
            <button
              type="button"
              onClick={() => setType("expenses")}
              className={type === "expenses" ? "active2" : ""}
            >
              <img src={expensesIcon} alt="expenses" />
              <span>Saída</span>
            </button>
          </div>
          <input
            className="input"
            placeholder="Categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          />
          <button type="submit" onClick={handleNewTransaction}>
            Cadastrar
          </button>
        </form>
      </div>
    </Modal>
  );
};
