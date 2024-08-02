type PageType = {
    Header: string;
    Body: string;
    Footer: string;
};

export type MenuOptionType = {
    Title: string;
    Description: string;
    Link: string;
};

type OptionType = {
    Title: string;
    Link: string;
};

export type CardType = {
    Title: string;
    Link: string;
    BackgroundImage: string;
    BackgroundColor: string;

    BorderWidth: 30;
    BorderButtonWidth: 15;
    BorderImageSource: string;
    BorderImageSlice: string;
    BorderImageRepeat: string;

};

type StoryScreenType = {
    Description: string;
    Questions: string[];
    SkipOption: string;
};

// ... existing code ...
