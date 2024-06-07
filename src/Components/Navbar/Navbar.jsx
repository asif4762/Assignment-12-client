
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  console.log(user);
    return (
        <div>
      <div className="navbar max-w-7xl bg-black bg-opacity-40 fixed z-10 h-[90px] text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="mr-4">
                <NavLink to="/" className='text-black font-bold'>Home</NavLink>
              </li>
              <li>
                <NavLink to="/apartment" className='text-black font-bold'>Apartment</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/">
            <button className="flex items-center justify-center">
              <img
                className="w-[80px] rounded-full"
                src="https://api.logo.com/api/v2/images?logo=logo_12043915-fe7e-4d51-bcaf-46696dc86028&u=1717606049&width=500&height=400&fit=contain&margins=100&format=webp&quality=60"
                alt=""
              />
              <button className="btn btn-ghost text-xl text-white">
                Rent<span className="text-lime-300">Ease</span>
              </button>
            </button>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="mr-4">
              <NavLink to="/" className='font-bold'>Home</NavLink>
            </li>
            <li>
              <NavLink to="/apartment" className='font-bold'>Apartment</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end opacity-100">
          {
            user ? <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL}
                />
              </div>
            </div>
            <div className="menu flexmenu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <h1 className="text-center w-full text-black font-bold">{user.displayName
}</h1>
              <button className="mt-3 btn btn-sm w-full">Dashboard</button>
              <button onClick={() => logOut()} className="btn btn-sm w-full">Logout</button>
            </div>
          </div> : <Link to='/login'>
            <button className='btn'>Login</button>
          </Link>
          }
        </div>
      </div>
    </div>
    );
};

export default Navbar;