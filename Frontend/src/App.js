import logo from "./logo.svg";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";
import React, { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import "./index.css";

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <>
      <Header openModal={handleOpenNewTransactionModalOpen} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModalOpen}
      />
    </>
  );
}

export default App;
