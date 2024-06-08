

const CouponCard = ({ coupon }) => {
    return (
        <div className="bg-green-50 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">{coupon.title}</h3>
            <p className="text-gray-700 mb-4">{coupon.description}</p>
            <div className="bg-blue-100 text-blue-900 py-1 px-3 rounded-full font-semibold">
                {coupon.code}
            </div>
            <p className="text-sm text-gray-500 mt-2">Discount %{coupon.discount}</p>
        </div>
    );
};

export default CouponCard;
