import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg fixed-top" style={{borderRadius: "0.2rem", backgroundColor: "#2c2842"}}>
        <div className="container-fluid">
            <a style={{fontWeight: "700"}}className="navbar-brand text-white" href="/">Multiplayer Typing Game</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a style={{fontWeight: "bold"}} className="nav-link active text-white" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled text-white" href="/">About</a>
                    </li>
                </ul>
                <button style={{background: "none", border: "none"}}>
                <svg style={{ height: "2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3" fill="white" />
                </svg>
                </button>

            </div>
        </div>
        </nav>
    </>
  )
}

export default Navbar