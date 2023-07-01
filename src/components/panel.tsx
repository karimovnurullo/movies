import React, { Component } from "react";
import { styles } from "./style";
import { PanelProps } from "./utils";

export default class Panel extends Component<PanelProps> {
   state = {
      
   }
  updateSelect = (value: string) => {
    this.props.select(value);

  };
  render() {
    const { select } = this.props;
    return (
      <div className={`${styles.center} p-[30px]  flex justify-center gap-[50px] bg-[#0D0D12] h-[100vh]`}>
        <div className="w-[400px] h-[400px] bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col">
          <select
            onChange={(e) => this.updateSelect(e.target.value)}
            className="rounded-[10px] h-[35px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
            <option>Select Add</option>
            <option value="movie">Movie</option>
            <option value="genre">Genre</option>
          </select>
        </div>
        <div className="w-[400px] h-[400px] bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col"></div>
      </div>
    );
  }
}
