/* eslint-disable react/prop-types */

import NavegacionDesktop from "./NavegacionDesktop";

const Header = ({ menuOpen, setMenuOpen }) => {
	return (
		<header className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10 bg-black">
			<div className="flex items-center">
				<img src="/imgs/LOGO ROWER.jpg" alt="Logo" className="h-6 w-auto" />
			</div>

			<div className="hidden lg:block">
				<NavegacionDesktop />
			</div>

			<div className="lg:hidden">
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="text-white focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6 h-6"
					>
						{menuOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						)}
					</svg>
				</button>

				{menuOpen && (
					<div
						className="absolute inset-0 bg-black bg-opacity-75 z-20"
						onClick={() => setMenuOpen(false)}
					>
						<div
							className="absolute top-16 right-0 bg-black w-full py-4 z-30 p-4"
							onClick={(e) => e.stopPropagation()} // Evita cerrar si se hace clic dentro
						>
							<NavegacionDesktop />
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
