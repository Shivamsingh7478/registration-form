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
          <ul className="navbar-links">
            <li>Home</li>
            <li>about us</li>
            <li>help</li>
          </ul>

          <div>Registration Form</div>


          <ul className="navbar-links">
            <li>sign up</li>
            <li>log in</li>
          </ul>
        </div> 
        </nav>
    );
}