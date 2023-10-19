import React, { Children } from "react";
import Header from "../includes/Header";
import Sidebar from "../includes/Sidebar";
import { useSelector } from "react-redux";

function LayoutMaster({ children }) {
  const crShowMenu = useSelector((state) => state.showMenu);
  return (
    <>
      <div className={ crShowMenu ? 'app' : 'app has-compact-menu' }>
        <Header />
        <main className="app-main">
          <div className="wrapper">
            <div className="page">
              <div className="page-inner">               
                <div className="page-section">
                  <div className="section-block">
                    {children}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default LayoutMaster;
