import AgreementRequestTable from './AgreementRequestTable';

const AgreementRequests = () => {
    

    return (
        <div className='lg:-ml-60'>
            <div className="lg:w-1/2 mx-auto text-blue-900 mb-10">
                <h1 className="text-center font-bold text-3xl border-y-4 border-green-700 py-10">
                    Agreement Requests
                </h1>
            </div>
            <AgreementRequestTable/>
        </div>
    );
};

export default AgreementRequests;
