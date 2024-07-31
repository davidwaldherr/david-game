type PageType = {
    Header: string;
    Body: string;
    Footer: string;
};

export type MenuOptionType = {
    Title: string;
    Description: string;
    Link: string;
    SubOptions?: MenuOptionType[];
};

type OptionType = {
    Title: string;
    Link: string;
};

export type CardType = {
    Title: string;
    Logo: string;
    Category: string;
    Type: string;
    Description: string;
    Options: OptionType[];
    BackgroundStory: string;
    Animation: string;
    ColorScheme: string;
    PixelBorder: string;
};

type StoryScreenType = {
    Description: string;
    Questions: string[];
    SkipOption: string;
};

// ... existing code ...
