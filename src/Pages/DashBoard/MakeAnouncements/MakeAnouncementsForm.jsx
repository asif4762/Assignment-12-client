import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSeruce";


const MakeAnouncementsForm = () => {

    const axiosSecure = useAxiosSecure();

    const handleAnouncement = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = new Date().toLocaleDateString();
        console.log(title, description, date);

        const anouncementData = {
            title,
            description,
            date
        }

        await axiosSecure.post('/anouncement', anouncementData)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                toast.success('Success! Anouncement created');
            }
        })

        form.reset();
    }

    return (
        <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="lg:flex lg:items-center lg:-mx-6">
          <div className="lg:w-1/2 lg:mx-6">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
              Make Anouncemnets Here
            </h1>

            <div className="mt-6 space-y-8 md:mt-8">
              <p className="text-gray-700 dark:text-gray-400">
                Have something to anounce? Provide a title and description below.
              </p>
            </div>

          </div>

          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl dark:bg-gray-900 rounded-xl lg:max-w-xl">
              <form onSubmit={handleAnouncement}>
                <div className="grid grid-cols-1 gap-6 mt-6">
                  <div className="relative">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter your title"
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter your description"
                      className="block w-full h-40 px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button className="px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default MakeAnouncementsForm;