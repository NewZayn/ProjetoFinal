import * as React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        {/* Adicione mais links conforme necessário */}
      </ul>
    </nav>
  );
}

export default Navbar;
