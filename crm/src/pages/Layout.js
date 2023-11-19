import { Outlet, Link } from "react-router-dom";

function Header() {
    return (
        <div style={{ width: '100%', float: 'left', textAlign: 'center' }}>
            <h1>TIC2601 Group 6 CRM</h1>
        </div>
    )
}

function NavMenu() {
    return (
        <div style={{ width: '10%', float: 'left' }}>
            <h2 style={{ marginTop: '0px' }}>Main Menu</h2>
            <ul>
                <li><Link to='/Opportunity'>Opportunity</Link></li>
                <li><Link to='/Account'>Account</Link></li>
                <li><Link to='/Order'>Order</Link></li>
            </ul>
        </div>
    )
}

function Content() {
    return (
        <div style={{ width: '90%', float: 'left' }}>
            <Outlet />
        </div>
    )
}

function Footer() {
    return (
        <div style={{ width: '100%', float: 'left', textAlign: 'center' }}>
            <Link to='/Index'>Home</Link>
        </div>
    )
}

export default function Layout() {
    return (
        <>
            <div className="row" style={{ width: '100%' }}>
                <Header />
            </div>
            <div className="row" style={{ width: '100%' }}>
                <NavMenu />
                <Content />
            </div>
            <div className="row" style={{ width: '100%' }}>
                <Footer />
            </div>
        </>
    )
};