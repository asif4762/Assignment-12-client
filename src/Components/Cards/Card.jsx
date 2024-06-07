import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  return (
    <Link className='col-span-1 cursor-pointer group'>
      <div className="card w-96 bg-transparent">
        <figure>
          <img className='object-cover 
                h-[300px] 
                w-full 
                group-hover:scale-110 
                transition
                rounded-lg'
            src={item.apartment_image}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Block : {item.block_name}</h2>
        <div className='flex justify-between'>
        <p className='font-bold text-neutral-500'>Floor no : {item.floor_no}</p>
        <p className='font-bold text-neutral-500'>Apartment no : {item.apartment_no}</p>
        </div>
        <p className=''> <span className='font-bold text-xl'>$ {item.rent}</span> monthly</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
    item: PropTypes.object,
  }

export default Card;
