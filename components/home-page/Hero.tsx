import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <div className="w-72 h-72 shadow-md rounded-full overflow-hidden bg-gray-700 mx-auto">
        <Image
          src="/images/site/hero.jpg"
          alt="An image showing Max"
          width={300}
          height={300}
          className="object-cover object-top"
          priority
        />
      </div>
      <p className="text-lg text-gray-200 w-[90%] max-w-2xl mx-auto">
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
};

export default Hero;
