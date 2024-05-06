import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <h1>Habitus</h1>
          <Link to="/workspaces/Projeto-telas-Home-e-Sobre/habitus/src/routes/sobre.jsx">Sobre</Link>
        </nav>
      </header>

      <main>
        <section className="home">
          <img src="
https://s2-glamour.glbimg.com/pZRXVRbH8QCZ48NolX7g3OUbo9Y=/0x0:2305x1537/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_ba3db981e6d14e54bb84be31c923b00c/internal_photos/bs/2023/A/6/RzNSd1SM6MR9Ql9lznpw/pexels-jane-doan-1128678.jpg
" alt="Gif animado" className="background-gif" />
          <h2 className="title">Habitus</h2>
          <button className="start-button">Iniciar Hábitos Saudáveis</button>
        </section>
      </main>

      <footer>
        <p>© 2024 Habitus. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}



