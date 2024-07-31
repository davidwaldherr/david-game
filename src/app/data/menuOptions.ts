import { MenuOptionType } from "@/types/customTypes";

export const menuOptions: MenuOptionType[] = [
  {
    Title: "Press ENTER",
    Description: "Main menu options",
    Link: "",
    SubOptions: [
      {
        Title: "New Game",
        Description: "Description for Option 1",
        Link: "/option1",
      },
      {
        Title: "Load Game",
        Description: "Description for Option 2",
        Link: "/option2",
      },
      {
        Title: "About",
        Description: "Description for Option 3",
        Link: "/option3",
      },
    ],
  },
];
