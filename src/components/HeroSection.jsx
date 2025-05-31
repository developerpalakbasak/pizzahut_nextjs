import React from "react";
import Image from "next/image";

const HeroSection = () => {
  const pizzaImg =
    "https://res.cloudinary.com/ddfimjibr/image/upload/v1747961831/pizzahut_images/tvt3gwlxmqtrrqk8epvd.png";
  const leafImg =
    "https://res.cloudinary.com/ddfimjibr/image/upload/v1747961819/pizzahut_images/zxkx0dxhrzjit11km9i6.png";
  const pizzaSliceImg =
    "https://res.cloudinary.com/ddfimjibr/image/upload/v1747961830/pizzahut_images/sufj1lb8w5tamux5qohi.png";
  const leafsImg =
    "https://res.cloudinary.com/ddfimjibr/image/upload/v1747961876/pizzahut_images/jstaefabqh3atullyvwm.png";

  return (
    <>
      <div className=" w-[90vw] md:w-[80vw] max-w-6xl mx-auto ">
        <span className="flex items-center gap-2 px-3 py-1 text-sm text-white rounded-2xl bg-primary color-primary w-fit">
          Serving since 1989
        </span>

        <div className="relative flex flex-col sm:grid sm:grid-cols-2 mt-8">
          <div className="relative flex flex-col gap-3">
            <div className="flex flex-col gap-3 m-auto lg:m-0">
              <Image
                className=" hidden sm:block absolute leaf top-6 lg:left-[18rem] "
                src={leafImg}
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <h4 className="text-2xl">
                Get your <span className="text-primary">crispy</span> goodness{" "}
              </h4>
              <h4 className="text-4xl">
                with <span className="text-primary">Pizza</span>Hat.
              </h4>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                Harum laboriosam mollitia illo maxime corrupti sint.
              </p>
            </div>
            <div className="flex justify-center sm:justify-normal gap-3 text-sm button">
              <button className="px-3 py-1 text-white transition duration-300 hover:bg-green-300 hover:text-primary rounded-2xl bg-primary">
                Order Now
              </button>
              <button className="px-3 py-1 transition duration-300 bg-white hover:bg-green-300 rounded-2xl hover:text-primary color-primary">
                All Menu
              </button>
            </div>
            <div className="flex justify-center sm:justify-normal">
              <Image
                src={pizzaSliceImg}
                width={200}
                height={200}
                alt="pizza-image"
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <img
              width={150}
              height={150}
              className="absolute xl:left-[38rem] left-[16rem] -top-[5rem] overflow-hidden"
              src={leafsImg}
              alt=""
            />
            <div className="absolute w-full h-[90%] bg-green-600 pizza-bar">
              <Image
                className="absolute left-5 top-5"
                src={pizzaImg}
                width={300}
                height={300}
                alt="pizza img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
