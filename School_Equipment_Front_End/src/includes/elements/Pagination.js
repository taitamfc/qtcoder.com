import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import arrow icons

function Pagination(props) {
    const {pageData,setPage} = props;
    let pageNumbers = [];
    for(let i = 1; i <= pageData.last_page;i++){
        pageNumbers.push(i);
    }
    if(pageData.total == 0){
        return <></>
    }

    return (
        <div className="pagination justify-content-end">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-start">
                    <li className={`page-item ${pageData.current_page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={()=>setPage(pageData.current_page - 1)}>
                            <FontAwesomeIcon icon={faChevronLeft} /> {/* Previous arrow icon */}
                        </button>
                    </li>
                    {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber} className={`page-item ${pageNumber === pageData.current_page ? 'active' : ''}`}>
                            <button className="page-link" onClick={()=>setPage(pageNumber)}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${pageData.current_page === pageData.total ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={()=>setPage(pageData.current_page + 1)}>
                            <FontAwesomeIcon icon={faChevronRight} /> {/* Next arrow icon */}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;