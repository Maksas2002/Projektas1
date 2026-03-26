import { Link } from "react-router";

function Footer() {
    return(
        <>
        <div className="text-white flex justify-around my-5 border-t pt-10 px-10">
            <div className="max-w-64">
                <h3 className="text-2xl">BudgetNest</h3>
                <p className="text-gray-400">Take control of your money. Track, save & grow — all in one place.</p>
            </div>
            <div>
                <h4 className="text-xl">Quick Links</h4>
                <div className="text-gray-400 flex flex-col">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <Link className="hover:text-white">How It Works</Link>
                    <Link className="hover:text-white">Features</Link>
                    <Link className="hover:text-white">About</Link>
                </div>
            </div>
            <div>
                <h4 className="text-xl">Support</h4>
                <div className="text-gray-400 flex flex-col">
                    <Link className="hover:text-white">Contact Us</Link>
                    <Link className="hover:text-white">FAQ</Link>
                    <Link className="hover:text-white">Privacy Policy</Link>
                    <Link className="hover:text-white">Terms of Service</Link>
                </div>
            </div>
            <div>
                <h4 className="text-xl">Follow Us</h4>

            </div>
        </div>

        <p className="text-gray-400 text-center p-10 m-10 border-t">© 2024 BudgetNest. All rights reserved.</p>
        </>
    )
}

export default Footer;