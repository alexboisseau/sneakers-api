import React from 'react'

const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {

    // Calcul le nombre de pages à créer selon le nombre d'items récupérés ainsi que le nombre d'élément à afficher par page
    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);   
    }

    return ( 
        <div>
            <ul className="pagination pagination-sm my-5 d-flex justify-content-center">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button
                        className="page-link"
                        onClick={() => onPageChanged(currentPage - 1)}>
                        &laquo;
                    </button>
                </li>
                {pages.map(page => 
                    <li key={page} className={"page-item" + (currentPage === page && " active")}>
                        <button onClick={() => onPageChanged(page)} className="page-link">{page}</button>
                    </li>
                )}
                <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                    <button
                        className="page-link"
                        onClick={() => onPageChanged(currentPage + 1)}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
 
export default Pagination;