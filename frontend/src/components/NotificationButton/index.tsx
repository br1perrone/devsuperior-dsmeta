import axios from "axios";
import icon from "../../assets/img/notification-icon.svg"
import { BASE_URL } from "../../utils/request";

import "./styles.css"

type Props = {
    saleId: number;
}

const NotificationButton = ({saleId} :Props) => {
    const handleClick = (id :number) => {
        axios.get(`${BASE_URL}/sales/${id}/notification`)
            .then(res => {
                console.log('SUCESSO')
            })
    }

    return (
        <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
            <img src={icon} alt="Notificar" />
        </div>
    )
}

export default NotificationButton