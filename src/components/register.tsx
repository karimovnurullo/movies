import React, { Component, FormEventHandler, createRef } from "react";

import { styles } from "./style";
import { RegisterProps, baseURL } from "./utils";
import axios from "axios";

export default class Register extends Component<RegisterProps> {
  usernameRef = createRef<HTMLInputElement>()!;
  passwordRef = createRef<HTMLInputElement>()!;
  nameRef = createRef<HTMLInputElement>()!;
  handleNavigate = (pathname: string) => {
    window.history.pushState({}, "", pathname);
    this.props.onNavigate(pathname);
  };
  handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const username = this.usernameRef.current!.value.trim();
    const password = this.passwordRef.current!.value.trim();
    const name = this.nameRef.current!.value.trim();

    if (username.length !== 0 || password.trim().length !== 0 || name.trim().length !== 0) {
      console.log(username);
      console.log(password);
      console.log(name);

      const { data } = await axios.post(`${baseURL}/users`, {
        name,
        email: username,
        password,
      });
      console.log(data);
      this.setState({ currentUser: data });
    } else {
      console.log("Please fill all");
    }
  };

  render() {
    const inputStyle = "bg-[#151719] border-[1px] border-[#44444598] h-[40px] text-[20px] px-[10px] rounded-[10px] outline-none";
    return (
      <div className={`${styles.center} register w-full h-[100vh] bg-[#0D0D12] font-concord`}>
        <div
          onClick={() => this.handleNavigate("/")}
          className="home absolute left-[30px] top-[30px] flex gap-[10px] items-center text-[24px] cursor-pointer"
        >
          <i className="fa-regular fa-circle-left"></i>
          <>Home</>
        </div>
        <form onSubmit={this.handleSubmit} className="w-[600px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col gap-[20px]">
          <label htmlFor="email" className="text-[22px]">
            Username
          </label>
          <input type="email" id="email" ref={this.usernameRef} className={`${inputStyle} mt-[-10px]`} />
          <label htmlFor="password" className="text-[22px]">
            Password
          </label>
          <input type="password" id="password" ref={this.passwordRef} className={`${inputStyle} mt-[-10px]`} />
          <label htmlFor="username" className="text-[22px]">
            Name
          </label>
          <input type="text" id="username" ref={this.nameRef} className={`${inputStyle} mt-[-10px]`} />
          <button className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">Register</button>
        </form>
      </div>
    );
  }
}
