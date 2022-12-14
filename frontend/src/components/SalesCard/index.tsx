import { useEffect, useState } from "react"
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import pt_BR from 'date-fns/locale/pt-BR'
import "react-datepicker/dist/react-datepicker.css"

import NotificationButton from "../NotificationButton"

import "./styles.css"
import axios from "axios"
import { BASE_URL } from "../../utils/request"
import { Sale } from "../../models/sale"
import { toast } from "react-toastify"

const SalesCard = () => {
  registerLocale('pt-BR', pt_BR)
  setDefaultLocale('pt-BR')

  const min = new Date(new Date().setDate(new Date().getDate() - 365))
  const max = new Date()

  const [loading, setLoading] = useState(true)
  const [minDate, setMinDate] = useState(min)
  const [maxDate, setMaxDate] = useState(max)
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    const dmin = minDate.toISOString().slice(0, 10)
    const dmax = maxDate.toISOString().slice(0, 10)

    setLoading(true)
    axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
      .then(res => {
        setSales(res.data.content)
      })
      .catch(err => {
        toast.warn("Falha ao carregar lista.")
        console.warn(err)
      })
    setLoading(false)
  }, [minDate, maxDate])

  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        {loading
          ? <p>Carregando</p>
          : // tabela de vendas
          <table className="dsmeta-sales-table">
            <thead>
              <tr>
                <th className="show992">ID</th>
                <th className="show576">Data</th>
                <th>Vendedor</th>
                <th className="show992">Visitas</th>
                <th className="show992">Vendas</th>
                <th>Total</th>
                <th>Notificar</th>
              </tr>
            </thead>
            <tbody>
              {sales && sales.map((sale, key) => (
                <tr key={key}>
                  <td className="show992">#{sale.id}</td>
                  <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                  <td>{sale.sellerName}</td>
                  <td className="show992">{sale.visited}</td>
                  <td className="show992">{sale.deals}</td>
                  <td>R$ {sale.amount.toFixed(2)}</td>
                  <td>
                    <div className="dsmeta-red-btn-container">
                      <NotificationButton saleId={sale.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        }
      </div>

    </div>
  )
}

export default SalesCard