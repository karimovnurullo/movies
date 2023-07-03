import React, { Component } from "react";
import { styles } from "./style";
import { MovieProps } from "../components/utils";

export default class Movie extends Component<MovieProps> {
  render() {
    const { data } = this.props;
    return (
      <div
        className={`movie w-full bg-[#151719] border-[1px] border-[#44444598] h-[50px] rounded-[10px] ${styles.center} justify-between px-[20px] text-[22px] mt-[10px]`}
      >
        <div className="w-full">{data.title}</div>
        <div className="w-[300px]">{data.genre.name}</div>
        <div className="w-[130px]">{data.numberInStock}</div>
        <div className="w-[130px]">{data.dailyRentalRate}</div>
      </div>
    );
  }
}
