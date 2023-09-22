import React, { useState } from 'react';

import ArrowTransaction from '../assets/arrow_right.png';
import CrossTransaction from '../assets/cross.png';
// Importation du fichier JSON qui récupère les informations du compte
import AccountData from "../app/account.json"
import Transactions from './Transactions';

function Account() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleTransactions = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
            {AccountData.map(({ title, amount, description }, index) => (
                <React.Fragment key={index}>
                    <button className="account" onClick={() => toggleTransactions(index)}>
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{title}</h3>
                            <p className="account-amount">{amount}</p>
                            <p className="account-amount-description">{description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <span className="transaction-button">
                                <img src={activeIndex === index ? CrossTransaction : ArrowTransaction} alt="Toggle transactions" className={activeIndex === index ? 'cross-transaction' : ''} />
                            </span>
                        </div>
                    </button>
                    {activeIndex === index && <Transactions />}
                </React.Fragment>
            ))}
        </>
    );
}

export default Account;