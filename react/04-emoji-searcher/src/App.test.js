import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import emojiList from "./emojiList.json";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Emoji Search Test", () => {
  let header, emoji, input, filterList;
  beforeEach(() => {
    render(<App />);
  });

  test("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  test("Renders the header", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const headerText = screen.getByText(/Emoji Search/i);
    expect(headerText).toBeInTheDocument();
  });

  test("Renders the emoji list", () => {
    const { container } = render(<App />);

    const emojiResults = container.querySelector(".component-emoji-results");
    expect(emojiResults).toBeInTheDocument();

    const emojiRows = emojiResults.querySelectorAll(
      ".component-emoji-result-row"
    );
    expect(emojiRows.length).toBe(20);
  });

  test("Emoji list filter and re-render", () => {
    input = screen.getByRole("textbox");
    const filter = "smile cat";
    
    filterList = emojiList.filter(
      (it) =>
        it.keywords.toLowerCase().match(filter) ||
        it.title.toLowerCase().match(filter)
    );
    fireEvent.change(input, { target: { value: filter } });
    expect(screen.getAllByText(/cat/i)).toHaveLength(2);
  });

  test("Proof that after click emoji,copy", async () => {
    const click = screen.getByText("Joy");
    expect(
      click.parentElement.getAttribute("data-clipboard-text").length
    ).toBeGreaterThan(0);
    console.log(click.parentElement.getAttribute("data-clipboard-text"));
    expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch(
      "😂"
    );
  });
});