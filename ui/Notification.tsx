import clsx from "clsx";

function Notification({
  title,
  status,
  message,
}: {
  title: string;
  status: string;
  message?: string | null;
}) {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 w-full h-20 flex justify-between items-center px-8 shadow-md text-gray-100 bg-gray-800",
        "md:w-[40rem] md:left-1/2 md:-translate-x-1/2 md:rounded-t-lg",
        {
          "bg-green-500 text-gray-800": status === "success",
          "bg-red-500": status === "error",
        }
      )}
    >
      <h2 className="text-lg m-0">{title}</h2>
      <p className="m-0">{message}</p>
    </div>
  );
}

export default Notification;
