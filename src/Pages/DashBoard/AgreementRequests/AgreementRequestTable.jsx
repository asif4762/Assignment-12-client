import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import useAxiosSecure from '../../../Hooks/useAxiosSeruce';
import { useQuery } from '@tanstack/react-query';
import { GiConfirmed } from 'react-icons/gi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AgreementRequestTable = () => {
    const axiosSecure = useAxiosSecure();
    const [item, setItem] = useState([]);
    const { data, refetch } = useQuery({
        queryKey: ['agreement_requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        },
    });

    useEffect(() => {
        const filteredData = data?.filter(da => da?.role === 'user' && da?.status === "Requested");
        setItem(filteredData);

    }, [data]);

    const handleConfirm = async (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { _id, ...dataWithoutId } = info;
                const chnagedData = {
                    ...dataWithoutId,
                    status: 'Accepted',
                    role: 'member',
                    accept_date: new Date().toLocaleDateString(),
                }
                const res = await axiosSecure.put(`/user/${info?.email}`, chnagedData);
                console.log(res.status === 200);
                if (res.status === 200) {
                    toast.success('Success! Request accepted');
                    refetch();
                }
            }
        });
    }

    const handleDelete = async (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { _id, ...dataWithoutId } = info;
                const chnagedData = {
                    ...dataWithoutId,
                    status: 'Checked',
                    reject_date: new Date().toLocaleDateString(),
                }
                const res = await axiosSecure.put(`/user/${info?.email}`, chnagedData);
                if (res.data.matchedCount > 0) {
                    toast.success('Success! Request Rejected');
                    refetch();
                }
            }
        });
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Floor no</th>
                            <th>Block name</th>
                            <th>Room no</th>
                            <th>Rent</th>
                            <th>Agreement Request Date</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item?.map((info, index) => (
                            <tr key={info._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={info.photoURL} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{info.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{info.email}</div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{info.floor_no}</div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{info.block_name}</div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{info.apartment_no}</div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{info.rent}</div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{info.date = new Date().toLocaleDateString()}</div>
                                </td>
                                <td>
                                    <button className="btn btn-success btn-sm">
                                        <GiConfirmed onClick={() => handleConfirm(info)} className="text-xl" />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-error btn-sm">
                                        <MdCancel onClick={() => handleDelete(info)} className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementRequestTable;
