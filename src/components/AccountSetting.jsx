import React from "react";
import { Link } from "react-router";

function AccountSetting() {
  return (
    <div className="bg-white rounded-[20px] mb-[50px] md:w-[700px] flex gap-[30px]">
      <Link
        className="text-[18px] no-underline text-[var(--color--secundery)] py-[20px] mx-10"
        to=""
      >
        Account Settings
      </Link>
      <Link
        className="text-[18px] no-underline text-[var(--color--secundery)] py-[20px]"
        to=""
      >
        Order History
      </Link>
    </div>
  );
}

export default AccountSetting;
