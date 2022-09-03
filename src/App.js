import './App.css';
import { db } from "./firebase.config";
import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";


export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    text: "",
  });

  const quotesCollectionRef = collection(db, "quotes");

  useEffect(() => {
    onSnapshot(quotesCollectionRef, (snapshot) => {
      setQuotes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.title) alert("Please fill out all fields")
    addDoc(quotesCollectionRef, form)
    setForm({
      title: "",
      text: ""
    })
  }

  const removeQuote = id => {
    deleteDoc(doc(db, "quotes", id))
  }

  return (
    <div className="app">

      {/* FORM */}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>

        <div>
          <label>Text</label>
          <textarea
            type="text"
            value={form.text}
            onChange={e => setForm({ ...form, text: e.target.value })} />
        </div>

        <div className="buttons">
          <button type="submit">Submit</button>
        </div>
      </form>



      {/* CARDS */}

      <div>
        {quotes.map((quote, index) => (
          <div className="cards" key={quote.id} >
            <p>{quote.title}</p>
            <p dangerouslySetInnerHTML={{ __html: quote.text }}></p>

            <div>
              <button className="remove" onClick={() => removeQuote(quote.id)}>Remove</button>
            </div>

          </div>
        ))
        }

        {/* {JSON.stringify(form)} */}

      </div >
    </div >
  );
}


