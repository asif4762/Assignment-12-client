import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import AgreementModal from "../Modal/AgreementModal";
import useAxiosSecure from "../../Hooks/useAxiosSeruce";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandler = async () => {
    console.log('Agreement Clicked');
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const currentUser = {
        name: user?.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
        status: 'Requested',
        floor_no: item.floor_no,
        block_name: item.block_name,
        apartment_no: item.apartment_no,
        apartment_image: item.apartment_image,
        rent: item.rent,
        agreement_status: 'pending',
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      console.log(data);

      if (data.matchedCount > 0) {
        toast.error('You can only request for one agreement');
        
      } else {
        toast.success('Success! Request sent to Admin');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to send request');
    } finally {
      closeModal();
    }
  };

  return (
    <div className="col-span-1">
      <div className="card w-96 bg-transparent">
        <figure>
          <img
            className="object-cover h-[300px] w-full group-hover:scale-110 transition rounded-lg"
            src={item.apartment_image}
            alt="Apartment"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Block: {item.block_name}</h2>
          <div className="flex justify-between">
            <p className="font-bold text-neutral-500">
              Floor no: {item.floor_no}
            </p>
            <p className="font-bold text-neutral-500">
              Apartment no: {item.apartment_no}
            </p>
          </div>
          <p>
            <span className="font-bold text-xl">$ {item.rent}</span> monthly
          </p>
        </div>
      </div>
      <button onClick={() => setIsModalOpen(true)} className="btn w-full bg-green-100">
        Agreement
      </button>
      {isModalOpen && (
        <AgreementModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
        />
      )}
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    apartment_image: PropTypes.string,
    block_name: PropTypes.string,
    floor_no: PropTypes.number,
    apartment_no: PropTypes.number,
    rent: PropTypes.number,
  }),
};

export default Card;
