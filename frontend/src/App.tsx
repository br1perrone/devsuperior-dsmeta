import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from "./components/Header"
import SalesCard from "./components/SalesCard"

const App = () => {
  return (
    <>
      <ToastContainer />

      <Header />

      <main>
        <section id="sales">
          <div className="dsmeta-container">
            <SalesCard />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
