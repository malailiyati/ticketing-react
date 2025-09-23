import React from "react";
import { NavLink } from "react-router-dom";

function AccountSetting() {
  return (
    <div className="bg-white rounded-[20px] mb-[50px] md:w-[700px] flex gap-[30px]">
      <NavLink
        to="/ticketing/accountSetting"
        className={({ isActive }) =>
          `text-[18px] no-underline py-[20px] mx-10 ${
            isActive
              ? "text-[var(--color--primary)] font-semibold"
              : "text-[var(--color--secundery)]"
          }`
        }
      >
        Account Settings
      </NavLink>

      <NavLink
        to="/ticketing/orderHistory"
        className={({ isActive }) =>
          `text-[18px] no-underline py-[20px] ${
            isActive
              ? "text-[var(--color--primary)]  font-semibold"
              : "text-[var(--color--secundery)]"
          }`
        }
      >
        Order History
      </NavLink>
    </div>
  );
}

export default AccountSetting;
