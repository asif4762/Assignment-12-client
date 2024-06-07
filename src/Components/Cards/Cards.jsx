import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useApartments from "../../Hooks/useApartments";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Card from "./Card";

const Cards = () => {
    const axiosCommon = useAxiosCommon();
    const [itemsPerPage, setItemsPerPage] = useState(6); 
    const [currentPage, setCurrentPage] = useState(0);

    const handleItemsPerPage = (e) => {
        console.log(parseInt(e.target.value))
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const { data: countData = { count: 0 } } = useQuery({
        queryKey: ['apartment-count'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/apartment-count');
            return data;
        }
    });

    const totalPage = Math.ceil(countData.count / itemsPerPage);
    const pages = [...Array(totalPage).keys()];

    const [data] = useApartments();
    console.log(pages.length);
    return (
        <>
            <div className="lg:grid grid-cols-3 gap-6 mx-auto flex overflow-x-auto">
                {
                    data?.map(item => <Card key={item._id} item={item}></Card>)
                }
            </div>
            <div className="hidden lg:flex w-full items-center justify-center gap-6">
            <p>Current Page : {currentPage}</p>
            <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} className="btn">Prev</button>
                {
                    pages?.map(page => (
                        <button 
                            className={currentPage === page ? 'bg-green-700 outline-white btn' : 'btn'} 
                            key={page} 
                            onClick={() => setCurrentPage(page)}
                        >
                            {page + 1}
                        </button>
                    ))
                }
                <button disabled={currentPage + 1 === pages.length} onClick={() => setCurrentPage(currentPage + 1)} className="btn">Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </>
    );
};

export default Cards;
