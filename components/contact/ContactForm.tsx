import Notification from "@/ui/Notification";
import { useEffect, useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [reqStatus, setReqStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timeout = setTimeout(() => {
        setReqStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [reqStatus]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const enteredData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };
    setReqStatus("pending");
    setValidationError({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const formattedErrors = Object.entries(data.errors).reduce(
            (acc, [field, error]: [string, any]) => {
              acc[field] = error._errors?.[0] || "Invalid field";
              return acc;
            },
            {} as Record<string, string>
          );
          setValidationError(formattedErrors);
        } else {
          setValidationError({ general: data.message });
        }
        setReqStatus("error");
      } else {
        setReqStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        form.reset();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Something went wrong:", e);
        setReqStatus("error");
        setValidationError({
          general: "Something went wrong. Please try again.",
        });
      }
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
              name="email"
              id="email"
              defaultValue={formData.email}
              onChange={handleChange}
              required
            />
            {validationError.email && (
              <p className="text-red-500 text-sm">{validationError.email}</p>
            )}
          </div>
          <div className="flex-1 min-w-[10rem]">
            <label htmlFor="name" className="block font-bold my-2">
              Your Name
            </label>
            <input
              className="w-full p-1 rounded-md border border-gray-400 bg-gray-50 resize-none"
              type="text"
              name="name"
              id="name"
              defaultValue={formData.name}
              onChange={handleChange}
              required
            />
            {validationError.name && (
              <p className="text-red-500 text-sm">{validationError.name}</p>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-[10rem]">
          <label htmlFor="message" className="block font-bold my-2">
            Your Message
          </label>
          <textarea
            className="w-full p-1 rounded-md border border-gray-400 bg-gray-50 resize-none"
            id="message"
            name="message"
            rows={5}
            defaultValue={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          {validationError.message && (
            <p className="text-red-500 text-sm">{validationError.message}</p>
          )}
        </div>

        <div className="mt-4 text-right">
          <button
            disabled={reqStatus === "error" || reqStatus === "pending"}
            className="font-inherit cursor-pointer bg-primary-700 border border-primary-700 py-2 px-4 rounded-md text-primary-50 shadow-md hover:bg-primary-500 hover:border-primary-500"
          >
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
