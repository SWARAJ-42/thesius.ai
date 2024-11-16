// interfaces.ts

export interface Author {
    authorId: string;
    name: string;
    url: string;
}

export interface AuthorCitRef {
    authorId: string;
    name: string;
}

export interface Citation {
    arxivId: string | null;
    authors: AuthorCitRef[];
    doi: string | null;
    intent: string[];
    isInfluential: boolean;
    paperId: string;
    title: string;
    url: string;
    venue: string | null;
    year: number;
}

export interface Reference {
    arxivId: string | null;
    authors: AuthorCitRef[];
    doi: string | null;
    intent: string[];
    isInfluential: boolean;
    paperId: string;
    title: string;
    url: string;
    venue: string | null;
    year: number;
}

export interface PaperResponse {
    abstract: string;
    arxivId: string | null;
    authors: Author[];
    citationVelocity: number;
    citations: Citation[];
    corpusId: number;
    doi: string;
    fieldsOfStudy: string[];
    influentialCitationCount: number;
    isOpenAccess: boolean;
    is_open_access: boolean;
    is_publisher_licensed: boolean;
    isPublisherLicensed: boolean;
    numCitedBy: number;
    numCiting: number;
    paperId: string;
    references: Reference[];
    s2FieldsOfStudy: { category: string; source: string }[];
    title: string;
    topics: string[];
    url: string;
    venue: string;
    year: number;
}

export interface RelatedPapersLink {
    title: string,
    description: string,
    url: string
}

export interface AllRelatedPapersLinks {
    results: RelatedPapersLink[]
}