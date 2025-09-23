import React, { useRef } from "react";
import defaultPic from "../assets/profile.png";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileThunk } from "../../redux/slices/authSlice";

function InfoAccount() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const profilePictureUrl = user?.profilePicture
    ? `${import.meta.env.VITE_BE_HOST}${user.profilePicture}`
    : defaultPic;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePictureFile", file);

    formData.append("firstName", user.firstName || "");
    formData.append("lastName", user.lastName || "");
    formData.append("phone", user.phone || "");
    formData.append("email", user.email || "");

    dispatch(updateProfileThunk(formData));
  };
  return (
    <section className="info-account">
      <div className="bg-white rounded-4xl py-[30px] px-[40px]">
        <div className="border-b border-[var(--color--secundery)]">
          <div className="flex justify-between items-center text-base">
            <div>INFO</div>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0013 16.3332C15.29 16.3332 16.3346 15.2885 16.3346 13.9998C16.3346 12.7112 15.29 11.6665 14.0013 11.6665C12.7126 11.6665 11.668 12.7112 11.668 13.9998C11.668 15.2885 12.7126 16.3332 14.0013 16.3332Z"
                fill="#5F2EEA"
              />
              <path
                d="M22.1654 16.3332C23.454 16.3332 24.4987 15.2885 24.4987 13.9998C24.4987 12.7112 23.454 11.6665 22.1654 11.6665C20.8767 11.6665 19.832 12.7112 19.832 13.9998C19.832 15.2885 20.8767 16.3332 22.1654 16.3332Z"
                fill="#5F2EEA"
              />
              <path
                d="M5.83333 16.3332C7.122 16.3332 8.16667 15.2885 8.16667 13.9998C8.16667 12.7112 7.122 11.6665 5.83333 11.6665C4.54467 11.6665 3.5 12.7112 3.5 13.9998C3.5 15.2885 4.54467 16.3332 5.83333 16.3332Z"
                fill="#5F2EEA"
              />
            </svg>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <div className="relative w-[150px] h-[150px] m-10">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={profilePictureUrl}
                  alt="profile picture"
                />
                {/* Tombol plus kecil */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-[var(--color--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500"
                >
                  +
                </button>
                {/* Hidden input file */}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold text-xl">
                {user.firstName} {user.lastName}
              </p>
              <p className="font-semibold text-sm mb-[30px]">Moviegoers</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-base mt-[30px] mb-[30px]">Loyalty Points</p>

          <div className="relative bg-[var(--color--primary)] text-white text-[18px] font-bold px-[40px] py-[10px] rounded-[20px] leading-[50px] shadow-[0_7px_rgb(183,185,255)] mb-[30px] overflow-hidden">
            <div>
              <p>Moviegoers</p>
              <p>
                320 <span className="text-sm font-normal">points</span>
              </p>
            </div>
            <div>
              <svg
                className="absolute bottom-[60px] right-0 z-[2]"
                width="63"
                height="63"
                viewBox="0 0 63 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_47_9753)">
                  <path
                    d="M37.6937 52.7623C37.3651 52.6757 37.0621 52.5115 36.81 52.2836L27.8103 43.9982L15.8736 46.6737C15.4858 46.7613 15.0811 46.7384 14.7057 46.6076C14.3302 46.4767 13.999 46.2431 13.7497 45.9334C13.5004 45.6237 13.343 45.2502 13.2954 44.8555C13.2477 44.4607 13.3118 44.0606 13.4803 43.7004L18.6293 32.6943L12.3726 22.218C12.1793 21.884 12.0806 21.5037 12.0871 21.1178C12.0936 20.732 12.205 20.3552 12.4095 20.0279C12.6262 19.695 12.9319 19.4295 13.2919 19.2615C13.6518 19.0935 14.0517 19.0298 14.4461 19.0776L26.6023 20.5089L34.5758 11.3596C34.8369 11.0576 35.1777 10.8352 35.5593 10.718C35.9409 10.6008 36.3478 10.5934 36.7334 10.6967C37.119 10.8 37.4677 11.0099 37.7395 11.3022C38.0114 11.5945 38.1954 11.9575 38.2705 12.3496L40.6681 24.2558L51.9114 29.0944C52.2768 29.2502 52.5912 29.5053 52.819 29.8308C53.0468 30.1562 53.1788 30.539 53.2 30.9357C53.2134 31.3213 53.1215 31.7034 52.9342 32.0408C52.7469 32.3782 52.4712 32.6582 52.1368 32.8508L41.4802 38.7952L40.4363 50.9013C40.4065 51.3057 40.2616 51.6932 40.0186 52.0179C39.7757 52.3426 39.4449 52.5911 39.0653 52.7339C38.6238 52.8947 38.1415 52.9048 37.6937 52.7623Z"
                    fill="url(#paint0_linear_47_9753)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_47_9753"
                    x1="36.7642"
                    y1="10.7049"
                    x2="26.3094"
                    y2="49.7227"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFF6DC" />
                    <stop offset="1" stopColor="#FFC107" />
                  </linearGradient>
                  <clipPath id="clip0_47_9753">
                    <rect
                      width="51"
                      height="51"
                      fill="white"
                      transform="translate(13.1992) rotate(15)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="absolute bg-white/20 w-[120px] h-[120px] rounded-full top-[-30px] right-[-50px]"></div>
              <div className="absolute bg-white/20 w-[120px] h-[120px] rounded-full top-[-50px] right-[-35px]"></div>
            </div>
          </div>

          <label className="text-base" htmlFor="points">
            180 points become a master
          </label>
          <br />
          <progress
            className="rounded-2xl w-full h-[25px] rounded-[15px]
         [&::-webkit-progress-bar]:rounded-[15px] 
         [&::-webkit-progress-bar]:bg-gray-200 
         [&::-webkit-progress-value]:[background-color:var(--color--primary)] 
         [&::-webkit-progress-value]:rounded-[15px] 
         [&::-moz-progress-bar]:[background-color:var(--color--primary)] 
         [&::-moz-progress-bar]:rounded-[15px]"
            id="points"
            value="0.5"
          ></progress>
        </div>
      </div>
    </section>
  );
}

export default InfoAccount;
