import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    // Verifica se o usuário está logado (se o token estiver presente)
    const isLoggedIn = localStorage.getItem('token');

    // Usar o hook useNavigate para redirecionar o usuário após o logout
    const navigate = useNavigate();

    // Estado para controlar se o menu está aberto ou fechado
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Função para fazer logout
    const logout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        navigate('/login'); // Redireciona para a página de login
        setIsMenuOpen(false); // Fecha o menu após o logout
    };

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                    Encurtador de URLs
                </Link>

                {/* Botão de hambúrguer para dispositivos móveis */}
                <a
                    role="button"
                    className={`navbar-burger ${isMenuOpen ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={toggleMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            {/* Menu principal */}
            <div className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}>
                <div className="navbar-start">
                    {isLoggedIn && (
                        <Link to="/account" className="navbar-item" onClick={toggleMenu}>
                            Minha Conta
                        </Link>
                    )}
                </div>

                <div className="navbar-end">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="navbar-item" onClick={toggleMenu}>
                                Login
                            </Link>
                            <Link to="/register" className="navbar-item" onClick={toggleMenu}>
                                Registrar
                            </Link>
                        </>
                    ) : (
                        <a className="navbar-item" onClick={logout}>
                            Sair
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;