import React, { Component } from "react";
import { styles } from "./style";
import { HeaderProps } from "./utils";

export default class Header extends Component<HeaderProps> {
  render() {
    const { onRegister, onLogin } = this.props;
    return (
      <header className={`w-full h-[70px] ${styles.center} justify-between px-[50px] bg-[#0D0D12] border-b-[1px] border-[red]`}>
        <div className="logo text-[36px] font-ego_outline tracking-[3px]">Movies</div>

        <div className="nav flex gap-[30px] text-[22px] text-black font-ego ">
          <div className={`sign-up ${styles.button}`} onClick={onRegister}>
            Sign Up
          </div>
          <div className={`login ${styles.button}`} onClick={onLogin}>
            Login
          </div>
        </div>
      </header>
    );
  }
}
