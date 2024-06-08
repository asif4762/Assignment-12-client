

const AnnouncementCard = ({ item }) => {
    return (
        <div className="max-w-lg mx-auto mt-10 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="px-4 py-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{item?.title}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item?.description}</p>
            </div>
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700">
                <p className="text-sm text-gray-800 dark:text-white">Posted on {item?.date}</p>
            </div>
        </div>
    );
};

export default AnnouncementCard;
