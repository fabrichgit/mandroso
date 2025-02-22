export interface Category {
    id: string;
    name: string;
    description?: string;
    parentId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}