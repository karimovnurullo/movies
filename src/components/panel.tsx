import React, { Component, createRef } from "react";
import { styles } from "./style";
import axios from "axios";
import { baseURL } from "./utils";
// import { PanelProps } from "./utils";

export default class Panel extends Component {
  state = {
    menuSelect: null,
    actionSelect: null,
    genres: [],
  };
  titleRef = createRef<HTMLInputElement>()!;
  rateRef = createRef<HTMLInputElement>()!;
  stockRef = createRef<HTMLInputElement>()!;

  getGenres = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/genres`);
      this.setState({ genres: data });
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };
  componentDidMount(): void {
    this.getGenres();
  }

  menuSelect = (value: string) => {
    this.setState({ menuSelect: value });
    console.log(value, "Selected");
  };
  actionSelect = (value: string) => {
    this.setState({ select: value });
    console.log(value, "Selected");
  };

  render() {
    const inputStyle = "bg-[#151719] border-[1px] border-[#44444598] h-[40px] text-[18px] px-[10px] rounded-[10px] outline-none";
    const { menuSelect, actionSelect, genres } = this.state;

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (menuSelect === "movie") {
        const title = this.titleRef.current?.value;
        const stock = this.stockRef.current?.value;
        const rate = this.rateRef.current?.value;

        this.titleRef.current?.classList.remove("error");
        this.stockRef.current?.classList.remove("error");
        this.rateRef.current?.classList.remove("error");

        if (title && stock && rate) {
          console.log("Movie Form Submitted");
          console.log("Title:", title);
          console.log("Stock:", stock);
          console.log("Rate:", rate);
        } else {
          if (!title) {
            this.titleRef.current?.classList.add("error");
          }
          if (!stock) {
            this.stockRef.current?.classList.add("error");
          }
          if (!rate) {
            this.rateRef.current?.classList.add("error");
          }
          console.log("Please fill in all the fields.");
        }
      } else if (menuSelect === "genre") {
        const title = this.titleRef.current?.value;
        this.titleRef.current?.classList.remove("error");
        if (title) {
          console.log("Genre Form Submitted");
          console.log("Title:", title);
        } else {
          this.titleRef.current?.classList.add("error");
          console.log("Please enter a title.");
        }
      }
    };
    const renderSelect = () => {
      if (menuSelect === "movie") {
        return (
          <select
            onChange={(e) => this.actionSelect(e.target.value)}
            className="rounded-[10px] mt-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
            <option>Select Action</option>
            <option value="add">Add {menuSelect}</option>
            <option value="edit">Edit {menuSelect}</option>
            <option value="delete">Delete {menuSelect}</option>
          </select>
        );
      }
    };

    const renderInputs = () => {
      if (actionSelect === "add") {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <select
              onChange={(e) => this.actionSelect(e.target.value)}
              className="rounded-[10px] mt-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Select Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={name} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="text-[22px]">
              Stock
            </label>
            <input type="number" id="stock" ref={this.stockRef} className={`${inputStyle} mt-[-10px]`} />
            <label htmlFor="rate" className="text-[22px]">
              Rate
            </label>
            <input type="number" id="rate" ref={this.rateRef} className={`${inputStyle} mt-[-10px]`} />
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Add Movie
            </button>
          </>
        );
      } else if (actionSelect === "edit") {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <select
              onChange={(e) => this.actionSelect(e.target.value)}
              className="rounded-[10px] mt-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Select Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={name} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="text-[22px]">
              Stock
            </label>
            <input type="number" id="stock" ref={this.stockRef} className={`${inputStyle} mt-[-10px]`} />
            <label htmlFor="rate" className="text-[22px]">
              Rate
            </label>
            <input type="number" id="rate" ref={this.rateRef} className={`${inputStyle} mt-[-10px]`} />
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Add Movie
            </button>
          </>
        );
      } else if (menuSelect === "genre") {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Add Genre
            </button>
          </>
        );
      }
    };

    return (
      <div className={`${styles.center} p-[30px]  flex justify-center gap-[50px] bg-[#0D0D12] h-[100vh]`}>
        <div className="w-[400px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col">
          <select
            onChange={(e) => this.menuSelect(e.target.value)}
            className="rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
            <option>Select Add</option>
            <option value="movie">Movie</option>
            <option value="genre">Genre</option>
          </select>
          <form className="flex flex-col gap-[20px] mt-[10px]" onSubmit={handleSubmit}>
            {renderSelect()}
            {renderInputs()}
          </form>
        </div>
        {/* <div className="w-[400px] h-[400px] bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col"></div> */}
      </div>
    );
  }
}
