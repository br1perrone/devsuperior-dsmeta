import logo from "../../assets/img/logo.svg"

import "./styles.css"

const Header = () => {

  return (
    <header>
      <div className="dsmeta-logo-container">
        <img src={logo} alt="DSMeta by br1perrone" />
        <h1>DSMeta by br1perrone</h1>
        <p>
          Desenvolvido por <a href="https://github.com/br1perrone">@br1perrone</a>
        </p>
      </div>
    </header>
  )
}

export default Header