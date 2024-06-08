import PaymentHistoryTable from "./PaymentHistoryTable";


const PaymentHistroy = () => {
    return (
        <div className="lg:-ml-60">
        <div className=" mx-auto w-1/2 text-blue-900 mb-10">
          <h1 className="text-center font-bold text-3xl border-y-4 border-green-700 py-10">
            Payment History
          </h1>
        </div>
           <PaymentHistoryTable/>
        </div>
    );
};

export default PaymentHistroy;