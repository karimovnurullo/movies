import React, { Component } from "react";
import { styles } from "./style";
import { MenuProps } from "../components/utils";

export default class Menu extends Component<MenuProps> {
  render() {
    const { data, handleMenuClick } = this.props;
    return (
      <div
        className={`menu ${styles.center} w-full h-[50px] bg-[#151719] border-[1px] border-[#44444598] text-[22px] rounded-[10px] font-chillax cursor-pointer active:bg-[#4444455a]`}
        onClick={() => handleMenuClick(data._id)}
      >
        {data.name}
      </div>
    );
  }
}
