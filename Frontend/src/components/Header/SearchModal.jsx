import "./../Header/style.css";
import React, { useContext, useState } from "react";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";
import { TransactionsContext } from "../../TransactionContext";
import Modal from "react-modal";


export const SearchModal = ({user, isSearchOpen, handleIsSearchOpen}) =>{
    
    const [searchDescription, setSearchDescription] = useState("");
    const [searchValue, setSearchValue] = useState(0);
    const [searchType, setSearchType] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const {changeTransactions} = useContext(TransactionsContext);

    function aa(){
        setEndDate(new Date())
    }
    function handleSearch(e) {
        e.preventDefault();

        //if startDate provided and endDate isn't
        if(startDate && !endDate){
           //for some reason the sets for the states aren't working here
           //reason: aparrently, setState isn't syncronous
           //so by the time it sets the state, the fetch is already processed
        }

        const data = {
          searchDescription,
          searchValue,
          searchCategory,
          searchType,
          startDate,
          endDate
        };
    
        console.log(data);
        fetch(`http://localhost:3000/api/transactions/complexSearch/${user}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setSearchDescription("");
            setSearchCategory("");
            setSearchType("");
            setSearchValue(0);
            setStartDate("")
            setEndDate("")
            handleIsSearchOpen(false);
            
            console.log(data);
            //function that change the table transaction
            //it changes the transactionContext that the table consumes
            changeTransactions(data)
          })
          .catch((err) => console.log(err));
      }


    return(
        <>
            <Modal
                isOpen={isSearchOpen}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <button onClick={handleIsSearchOpen} className="react-modal-close">
                    <img src={closeIcon} />
                </button>
                <div className="containerModal">
                    <h2>Search</h2>
                    <form className="form">
                        <input
                            className="input"
                            placeholder="Titulo"
                            value={searchDescription}
                            onChange={(event) => setSearchDescription(event.target.value)}
                        />
                        <input
                            className="input"
                            placeholder="Valor"
                            value={searchValue}
                            onChange={(event) => setSearchValue(Number(event.target.value))}
                        />
                        <div className="TransactionTypeCotainer">
                            <button
                                type="button"
                                onClick={() => setSearchType("income")}
                                className={searchType === "income" ? "active1" : ""}
                            >
                                <img src={incomeIcon} alt="income" />
                                <span>Entrada</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSearchType("expenses")}
                                className={searchType === "expenses" ? "active2" : ""}
                            >
                                <img src={expensesIcon} alt="expenses" />
                                <span>Saída</span>
                            </button>
                        </div>
                        <input
                            className="input"
                            placeholder="Categoria"
                            value={searchCategory}
                            onChange={(event) => setSearchCategory(event.target.value)}
                        />

                        <span className="date_span">Data de Início</span>
                        <input
                            type="date"
                            className="input"
                            placeholder="Valor"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                        />

                        <span className="date_span">Data Final</span>
                        <input
                            type="date"
                            className="input"
                            placeholder="Valor"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                        />
                        <button type="submit" onClick={handleSearch}>
                            Pesquisar
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    )
}