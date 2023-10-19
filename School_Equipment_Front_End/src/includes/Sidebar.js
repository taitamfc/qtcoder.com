import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Sidebar(props) {
	const [acc, setAcc] = useState(JSON.parse(localStorage.getItem('user')));
	const crShowMenu = useSelector((state) => state.showMenu);
	const LogOut = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('jwtToken');
		setAcc(null);
		Swal.fire({
			icon: "success",
			title: "Đăng xuất thành công!",
			showConfirmButton: false,
			timer: 1500,
		});
	};
	return (
		<>
			<div className="aside-menu overflow-hidden">
				<nav id="stacked-menu" className={
					crShowMenu ? 'stacked-menu stacked-menu-has-collapsible' : 'stacked-menu stacked-menu-has-compact stacked-menu-has-hoverable'
				}>
					<ul className="menu">
						<li className="menu-header">Thiết Bị</li>

						<li className="menu-item">
							<Link to={'/'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Danh Sách Thiết Bị</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/borrows'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Phiếu Mượn</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/cart'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Giỏ Mượn</span>
							</Link>
						</li>

						<li className="menu-header">Tài Khoản</li>

						<li className="menu-item">
							<Link to={'/users/profile'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Tài Khoản</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/users/update-profile'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Cập Nhật Tài Khoản</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/login'} onClick={LogOut} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Thoát</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}

export default Sidebar;
