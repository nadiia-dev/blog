import Image from "next/image";

const PostHeader = ({ title, image }: { title: string; image: string }) => {
  return (
    <header className="pb-8 border-b-8 border-primary-100 my-4 flex flex-col-reverse justify-between items-center gap-4 sm:my-8 sm:flex-row sm:items-end">
      <h1 className="text-primary-500 text-8xl m-0 leading-none text-center sm:text-16xl sm:text-left">
        {title}
      </h1>
      <Image
        className="object-cover w-50 h-30"
        src={image}
        alt={title}
        width={200}
        height={150}
      />
    </header>
  );
};

export default PostHeader;
