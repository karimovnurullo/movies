import React, { Component } from "react";
import { styles } from "./style";
import { HeaderProps } from "./utils";

export default class Header extends Component<HeaderProps> {
  handleNavigate = (pathname: string) => {
    const { onRegister, onLogin, user, adminPanel, onNavigate } = this.props;
    window.history.pushState({}, "", pathname);
    onNavigate(pathname);
    onRegister();
    adminPanel();
    onLogin();
    onRegister();
  };

  render() {
    const { user } = this.props;

    return (
      <header className={`w-full h-[70px] ${styles.center} justify-between px-[50px] bg-[#0D0D12] border-b-[1px] border-[red]`}>
        <div className="logo text-[36px] font-ego_outline tracking-[3px]">Movies</div>

        <div className="nav flex gap-[30px] text-[22px] text-black font-ego ">
          {user ? (
            <>
              <div className={`sign-up ${styles.button} bg-red-600 text-white hover:text-black`} onClick={() => this.handleNavigate("/")}>
                Log out
              </div>
              <div className={`sign-up ${styles.button}`} onClick={() => this.handleNavigate("/panel")}>
                Admin Panel
              </div>
              <div className={`text-white font-pally ${styles.center}`}>{user.name}</div>
            </>
          ) : (
            <>
              <div className={`sign-up ${styles.button}`} onClick={() => this.handleNavigate("/register")}>
                Sign Up
              </div>
              <div className={`login ${styles.button}`} onClick={() => this.handleNavigate("/login")}>
                Login
              </div>
            </>
          )}
        </div>
      </header>
    );
  }
}
