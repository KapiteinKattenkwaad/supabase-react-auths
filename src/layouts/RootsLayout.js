import {Outlet, NavLink} from "react-router-dom"

const RootsLayout = () => {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>
                        Like a movie
                    </h1>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                    <NavLink to='profile'>
                        Profile
                    </NavLink>
                    <NavLink to='movies'>
                        Movies
                    </NavLink>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default RootsLayout;
