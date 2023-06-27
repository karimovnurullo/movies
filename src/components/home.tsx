import React, { Component } from "react";
import { styles } from "./style";
import Menu from "./menu";

export default class Home extends Component {
  render() {
    return (
      <div className="p-[50px] flex justify-between gap-[30px] bg-[#0D0D12] h-[calc(100vh-80px)]">
        <div className="memus w-1/3 h-full bg-white rounded-[20px] p-[20px] flex flex-col text-center gap-[10px]">
          <Menu text={"Action"} />
        </div>
        <div className="memu w-full h-full bg-white rounded-[20px] p-[20px]">
          asdas
        </div>
      </div>
    );
  }
}
