import React from "react";

function Subscribe() {
  return (
    <section className="px-4 md:px-[70px] py-12">
      <div className="relative bg-[var(--color--primary)] md:p-[50px] mx-[70px] rounded-[30px] items-center text-center h-fit overflow-hidden  py-[30px]">
        <h2 className="text-white mb-[70px]">Subscribe to our newsletter</h2>
        <div className="flex justify-center flex-col md:flex-row gap-[20px]">
          <div>
            <label for="name"></label>
            <input
              className="py-[10px] px-[30px] text-white border border-gray-300 rounded-[5px] md:w-auto"
              type="text"
              id="name"
              name="name"
              value="First name"
            />
          </div>
          <div>
            <label for="email"></label>
            <input
              className="py-[10px] px-[30px] text-white border border-gray-300 rounded-[5px] md:w-auto"
              type="text"
              id="email"
              name="email"
              value="Email address"
            />
          </div>
          <button className="px-[30px] py-[10px] text-[var(--color--primary)] bg-white rounded-[5px] w-fit md:w-full mx-auto">
            Subscribe Now
          </button>
        </div>
        <div className="absolute w-[150px] h-[150px] rounded-full border-[5px] border-white top-40 left-220"></div>
      </div>
    </section>
  );
}

export default Subscribe;
