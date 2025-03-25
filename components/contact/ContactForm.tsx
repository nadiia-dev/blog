import Notification from "@/ui/Notification";
import { useEffect, useState } from "react";

const sendData = async (enteredData: {
  name: string;
  email: string;
  message: string;
}) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(enteredData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [reqStatus, setReqStatus] = useState<string | null>("");
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timeout = setTimeout(() => {
        setReqStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [reqStatus]);

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredData = {
      name: enteredName,
      email: enteredEmail,
      message: enteredMessage,
    };
    setReqStatus("pending");
    try {
      await sendData(enteredData);
      setReqStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (e) {
      setRequestError(e.message);
      setReqStatus("error");
    }
  };

  let notification;

  if (reqStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (reqStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (reqStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className="my-6 mx-auto rounded-lg bg-gray-100 w-[90%] max-w-[50rem] p-4 shadow-md text-lg">
      <h1 className="text-3xl mt-4 mb-0 text-left md:text-4xl md:text-center">
        How can I help you?
      </h1>
      <form onSubmit={handleSubmitMessage}>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[10rem]">
            <label htmlFor="email" className="block font-bold my-2">
              Your Email
            </label>
            <input
              className="w-full p-1 rounded-md border border-gray-400 bg-gray-50 resize-none"
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEnteredEmail(e.target.value)
              }
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
              value={enteredName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEnteredName(e.target.value)
              }
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
            value={enteredMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEnteredMessage(e.target.value)
            }
            required
          ></textarea>
        </div>

        <div className="mt-4 text-right">
          <button className="font-inherit cursor-pointer bg-primary-700 border border-primary-700 py-2 px-4 rounded-md text-primary-50 shadow-md hover:bg-primary-500 hover:border-primary-500">
            Send Message
          </button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
