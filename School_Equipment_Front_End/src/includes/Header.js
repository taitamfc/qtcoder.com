import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserModel from "../models/UserModel";
import { useDispatch, useSelector } from 'react-redux';
import { SET_CART, SET_MENU } from "../redux/action";
function Header(props) {
	const [acc, setAcc] = useState(JSON.parse(localStorage.getItem('user')));
    const dispatch = useDispatch();
	const crShowMenu = useSelector((state) => state.showMenu);

	useEffect(() => {
		UserModel.find(acc.id)
			.then((res) => {
				const data = res.data; // Truy cập dữ liệu từ kết quả
				setAcc(data); // Đặt giá trị của acc bằng dữ liệu
			})
			.catch((error) => {
				console.error(error); // Xử lý lỗi nếu có
			});
	}, []);

	const LogOut = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('jwtToken');
		setAcc(null);
	};

	const showMenu = () => {
		dispatch({
            type: SET_MENU,
            payload: !crShowMenu,
        });
	}
	return (
		<>
			<header className="app-header app-header-dark">
				{/* .top-bar */}
				<div className="top-bar">
					{/* .top-bar-brand */}
					<div className="top-bar-brand">
						{/* toggle aside menu */}
						<button
							onClick={showMenu}
							className="hamburger hamburger-squeeze mr-2"
						>
							<span className="hamburger-box">
								<span className="hamburger-inner" />
							</span>
						</button>
						{/* /toggle aside menu */}
						<Link to={'/'}>
							MƯỢN THIẾT BỊ
						</Link>
					</div>
					<div className="top-bar-list">
						<div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
							<button
								onClick={showMenu}
								className="hamburger hamburger-squeeze"
								type="button">
								<span className="hamburger-box">
									<span className="hamburger-inner" />
								</span>
							</button>
						</div>

						<div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">
							<div className="dropdown d-none d-md-flex">
								<button
									className="btn-account"
									type="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<span className="user-avatar user-avatar-md">
										<img src={acc.url_image} alt="" />
									</span>{" "}
									<span className="account-summary pr-lg-4 d-none d-lg-block">
										<span className="account-name">{acc.name}</span>{" "}
										<span className="account-description">
											{acc.email}
										</span>
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>
			<aside className="app-aside app-aside-expand-md app-aside-light">
				<div className="aside-content">
					<header className="aside-header d-block d-md-none">
						<button
							className="btn-account"
							type="button"
							data-toggle="collapse"
							data-target="#dropdown-aside"
						>
							<span className="user-avatar user-avatar-lg">
								<img src="assets/images/avatars/profile.jpg" alt="" />
							</span>{" "}
							<span className="account-icon">
								<span className="fa fa-caret-down fa-lg" />
							</span>{" "}
							<span className="account-summary">
								<span className="account-name">Beni Arisandi</span>{" "}
								<span className="account-description">Marketing Manager</span>
							</span>
						</button>{" "}
						<div id="dropdown-aside" className="dropdown-aside collapse">
							<div className="pb-3">
								<a className="dropdown-item" href="user-profile.html">
									<span className="dropdown-icon oi oi-person" /> Profile
								</a>{" "}
								<a className="dropdown-item" href="auth-signin-v1.html">
									<span className="dropdown-icon oi oi-account-logout" />{" "}
									Logout
								</a>
								<div className="dropdown-divider" />
								<a className="dropdown-item" href="#">
									Help Center
								</a>{" "}
								<a className="dropdown-item" href="#">
									Ask Forum
								</a>{" "}
								<a className="dropdown-item" href="#">
									Keyboard Shortcuts
								</a>
							</div>
						</div>
					</header>
					<Sidebar />
					<footer className="aside-footer border-top p-2">
						
					</footer>
				</div>
			</aside>
		</>
	);
}

export default Header;
