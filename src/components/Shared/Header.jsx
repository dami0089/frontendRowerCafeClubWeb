import NavegacionDesktop from "./NavegacionDesktop";

const Header = () => {
	return (
		<header className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10 bg-black">
			<div className="flex items-center">
				<div className=" flex items-center justify-center rounded-xl">
					<img src="/imgs/rower-logo-clarito.png" alt="Logo" />
				</div>
			</div>
			<NavegacionDesktop />
		</header>
	);
};

export default Header;
