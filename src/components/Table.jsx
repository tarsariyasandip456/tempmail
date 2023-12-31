import { useEffect, useState } from "react";



const Table = ({ mail }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTxt, setModalTxt] = useState("Loading...");
  const [modalTitle, setModalTitle] = useState("");

  const [isBtnLoading, setBtnIsLoading] = useState(false);

  const [mails, setMails] = useState([]);

  const handleMailClick = (id, title) => {
    fetch(`https://tempapi-w3c1.vercel.app/api/message?id=${id}`)
      .then((res) => res.text())
      .then((data) => {
        setModalTxt(data);
      });
    setModalTitle(title);
    setShowModal(true);
  };

  const handleReloadClick = () => {
    setBtnIsLoading(true);
    fetch(`https://tempapi-w3c1.vercel.app/api/messages?email=${mail}`)
      .then((res) => res.json())
      .then((data) => {
        setMails(data);
        setBtnIsLoading(false);
      });
  };

  useEffect(() => {
    fetch(`https://tempapi-w3c1.vercel.app/api/messages?email=${mail}`)
      .then((res) => res.json())
      .then((data) => {
        setMails(data);
      });
  }, []);

  const tableRows = mails?.map((mail) => {
    return (
      <tr key={mail.id}>
        <td>
          <a href="#" onClick={() => handleMailClick(mail.id, mail.subject)}>
            {mail.subject}
          </a>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>
              Received emails
              <button
                className={`button is-link is-outlined is-small ${
                  isBtnLoading ? "is-loading" : ""
                }`}
                style={{ marginLeft: "1rem" }}
                onClick={handleReloadClick}
                disabled={isBtnLoading}
              >
                Reload
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.length > 0 ? (
            tableRows
          ) : (
            <tr>
              <td>No emails received</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setShowModal(false)}
            ></button>
          </header>
          <section className="modal-card-body">
            <iframe
              srcDoc={modalTxt}
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Table;
