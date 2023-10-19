import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb(props) {
    const {page_title} = props
    return (
        <header className="page-title-bar">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        <Link to="/">
                            <i className="breadcrumb-icon fa fa-angle-left mr-2" />
                            Trang Chủ
                        </Link>
                    </li>
                </ol>
            </nav>
            <div className="d-md-flex align-items-md-start">
                <h1 className="page-title mr-sm-auto">{page_title}</h1>
            </div>
        </header>
    );
}

export default Breadcrumb;