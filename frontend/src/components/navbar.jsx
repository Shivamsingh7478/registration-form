import './navbar.css'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
         <div className="container-fluid">
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
               
            </button>

         <div className="collapse navbar-collapse" id="navbarNav"> 
          <div className="d-flex w-100 justify-content-between align-items-center">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>

              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help</a>
            </li>
          </ul>

          <div className="text-center text-white fw-bold" style={{flex:1}}>
            <h2>Registration Form</h2>
          </div>


          <ul className="navbar-nav">
          <li className="nav-item">
                <a className="nav-link" href="#">Sign up</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Log in</a>
            </li>
          </ul>
        
        
        </div>
        </div> 
        </div> 
        </nav>
    );
}