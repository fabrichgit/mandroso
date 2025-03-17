export interface Category {
    _id?: string;
    name: string;
    description?: string;
    parentId?: string | null;
    defaultPrice?: number;
    createdAt: Date;
    updatedAt: Date;
}