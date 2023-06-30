import React, { Component, FormEventHandler } from "react";
import { styles } from "./style";
import { HomeProps } from "./login";

export default class Register extends Component<HomeProps> {
  handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("Submit Register");
  };
  render() {
    const inputStyle =
      "bg-[#151719] border-[1px] border-[#44444598] h-[40px] text-[20px] px-[10px] rounded-[10px] outline-none";
    return (
      <div
        className={`${styles.center} register w-full h-[100vh] bg-[#0D0D12] font-concord`}
      >
        <div
          onClick={this.props.home}
          className="home absolute left-[30px] top-[30px] flex gap-[10px] items-center text-[24px] cursor-pointer"
        >
          <i className="fa-regular fa-circle-left"></i>
          <>Home</>
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="w-[600px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col gap-[20px]"
        >
          <label htmlFor="email" className="text-[22px]">
            Username
          </label>
          <input type="email" id="email" className={inputStyle} />
          <label htmlFor="password" className="text-[22px]">
            Password
          </label>
          <input type="email" id="password" className={inputStyle} />
          <label htmlFor="username" className="text-[22px]">
            Name
          </label>
          <input type="email" id="username" className={inputStyle} />
          <button className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
            Register
          </button>
        </form>
      </div>
    );
  }
}
