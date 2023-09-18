import React from 'react';

import ArrowTransaction from '../assets/arrow_right.png';
// Importation du fichier JSON qui récupère les informations du compte
import AccountData from "../app/account.json"

function Account() {
    return (
        <>
            {AccountData.map(({ title, amount, description }, index) => (
                <React.Fragment key={index}>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{title}</h3>
                            <p className="account-amount">{amount}</p>
                            <p className="account-amount-description">{description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                <img src={ArrowTransaction} alt="Arrow transaction" />
                            </button>
                        </div>
                    </section>
                </React.Fragment>
            ))}
        </>
    )
}
export default Account;
