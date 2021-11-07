declare interface IMDBSearchApiResult {
    searchType: string;
    expression: string;
    results: {
        id: string;
        resultType: string;
        image: string;
        title: string;
        description: string;
    }[];
    errorMessage: string;
}
declare interface IMDBWikiResult {
    imDbId: string;
    title: string;
    fullTitle: string;
    type: string;
    year: string;
    language: string;
    titleInLanguage: string;
    url: string;
    plotShort: Plot;
    plotFull: Plot;
    errorMessage: string;
}

export interface Plot {
    plainText: string;
    html: string;
}
