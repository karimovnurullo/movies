import React, { Component, FormEventHandler } from "react";
import { styles } from "./style";
import { HomeBackProps } from "./utils";

export default class Login extends Component<HomeBackProps> {
  handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("Submit Login");
  };
  render() {
    const inputStyle = "bg-[#151719] border-[1px] border-[#44444598] h-[40px] text-[20px] px-[10px] rounded-[10px] outline-none";
    return (
      <div className={`${styles.center} login w-full h-[100vh] bg-[#0D0D12] font-concord`}>
        <div
          onClick={this.props.home}
          className="home absolute left-[30px] top-[30px] flex gap-[10px] items-center text-[24px] cursor-pointer"
        >
          <i className="fa-regular fa-circle-left"></i>
          <>Home</>
        </div>
        <form onSubmit={this.handleSubmit} className="w-[600px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col gap-[20px]">
          <label htmlFor="email" className="text-[22px]">
            Username
          </label>
          <input type="email" id="email" className={`${inputStyle} mt-[-10px]`} />
          <label htmlFor="password" className="text-[22px]">
            Password
          </label>
          <input type="email" id="password" className={`${inputStyle} mt-[-10px]`} />
          <button className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">Login</button>
        </form>
      </div>
    );
  }
}
