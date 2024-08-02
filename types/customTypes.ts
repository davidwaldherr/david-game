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
    BorderImageSource: string;
    BorderImageSlice: string;
    BorderImageRepeat: string;

    BorderImageButton: string;
    BorderImageButtonSlice: string;
    BorderImageButtonRepeat: string;

    BorderTopColor: string;
    BorderBottomColor: string;
    BorderTopWidth: 3;
    BorderBottomWidth: 3;
};

type StoryScreenType = {
    Description: string;
    Questions: string[];
    SkipOption: string;
};

// ... existing code ...
