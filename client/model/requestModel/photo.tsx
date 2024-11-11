export interface PhotoCreateRequest {
    url: string;
    title: string;
    description: string;
}

export interface PhotoUpdateRequest {
    _id: string;
    description: string;
    googleId: string;
    googleName: string;
    isDelete: boolean;
    isDisabled: boolean;
}