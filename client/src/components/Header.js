import React from 'react'

function Header() {
  const user = JSON.parse(localStorage.getItem('curId'));

  function logout() {
    localStorage.removeItem('curId')
    window.location.href = '/login'
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="#"><bold>ROOM RENT</bold></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ">
            {user ? (<><div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "black" }}
                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user.name}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                <li><a class="dropdown-item" href="#" onClick={logout}>Log Out</a></li>
              </ul>
            </div></>) : <>

              <li class="nav-item active">
                <a class="nav-link" href="register">Register</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="login">
                  Login
                </a>
              </li>
            </>}
          </ul>
        </div>
      </nav></div>
  )
}

export default Header