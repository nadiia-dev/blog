const ContactForm = () => {
  return (
    <section className="my-6 mx-auto rounded-lg bg-gray-100 w-[90%] max-w-[50rem] p-4 shadow-md text-lg">
      <h1 className="text-3xl mt-4 mb-0 text-left md:text-4xl md:text-center">
        How can I help you?
      </h1>
      <form>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[10rem]">
            <label htmlFor="email" className="block font-bold my-2">
              Your Email
            </label>
            <input
              className="w-full p-1 rounded-md border border-gray-400 bg-gray-50 resize-none"
              type="email"
              id="email"
              required
            />
          </div>
          <div className="flex-1 min-w-[10rem]">
            <label htmlFor="name" className="block font-bold my-2">
              Your Name
            </label>
            <input
              className="w-full p-1 rounded-md border border-gray-400 bg-gray-50 resize-none"
              type="text"
              id="name"
              required
            />
          </div>
        </div>
        <div className="flex-1 min-w-[10rem]">
          <label htmlFor="message" className="block font-bold my-2">
            Your Message
          </label>
          <textarea
            className="w-full p-1 rounded-md border border-gray-400 bg-gray-50 resize-none"
            id="message"
            rows={5}
            required
          ></textarea>
        </div>

        <div className="mt-4 text-right">
          <button className="font-inherit cursor-pointer bg-primary-700 border border-primary-700 py-2 px-4 rounded-md text-primary-50 shadow-md hover:bg-primary-500 hover:border-primary-500">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
