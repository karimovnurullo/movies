import React, { Component } from "react";
import { styles } from "./style";
import { HeaderProps } from "./utils";

export default class Header extends Component<HeaderProps> {
  render() {
    const { onRegister, onLogin, user, adminPanel } = this.props;
    return (
      <header className={`w-full h-[70px] ${styles.center} justify-between px-[50px] bg-[#0D0D12] border-b-[1px] border-[red]`}>
        <div className="logo text-[36px] font-ego_outline tracking-[3px]">Movies</div>

        <div className="nav flex gap-[30px] text-[22px] text-black font-ego ">
          {user ? (
            <>
              <div className={`sign-up ${styles.button} bg-red-600 text-white hover:text-black`} onClick={onRegister}>
                Log out
              </div>
              <div className={`sign-up ${styles.button}`} onClick={adminPanel}>
                Admin Panel
              </div>
              <div className={`text-white font-pally ${styles.center}`}>{user.name}</div>
            </>
          ) : (
            <>
              <div className={`sign-up ${styles.button}`} onClick={onRegister}>
                Sign Up
              </div>
              <div className={`login ${styles.button}`} onClick={onLogin}>
                Login
              </div>
            </>
          )}
        </div>
      </header>
    );
  }
}
