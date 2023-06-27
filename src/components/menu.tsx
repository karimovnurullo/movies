import React, { Component } from "react";
import { styles } from "./style";

interface MenuProps {
  text: string;
}

export default class Menu extends Component<MenuProps> {
  render() {
    const { text } = this.props;
    return (
      <div
        className={`menu ${styles.center} w-full h-[50px] bg-[#1f2124] text-[25px] rounded-[10px] font-chillax cursor-pointer`}
      >
        {text}
      </div>
    );
  }
}
