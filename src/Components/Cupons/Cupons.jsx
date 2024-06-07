import CouponCard from "./CouponCard";

const Coupons = () => {
    const coupons = [
        {
            title: "Summer Off",
            description: "Get 20% off on your next Booking",
            code: "SUMMER20",
            expiryDate: "June 30, 2025"
        },
        {
            title: "Welcome Discount",
            description: "Flat $10 off for new members",
            code: "WELCOME10",
            expiryDate: "July 31, 2025"
        },
        {
            title: "Student Offer",
            description: "Enjoy free shipping on orders over $50",
            code: "STUDENT50",
            expiryDate: "August 31, 2025"
        }
    ];

    return (
        <section className="bg-transparent py-10 mt-10 rounded-lg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-6 text-center border-y-4 py-10 w-1/3 mx-auto border-green-700 text-blue-900">Exclusive Coupons</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {coupons.map((coupon, index) => (
                        <CouponCard key={index} coupon={coupon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Coupons;
