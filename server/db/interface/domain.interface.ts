export interface Domain{
    id:number;
    domainName:string;
    domainDescript:string;
    image?:string;

    readonly createdAt:Date;
    readonly updatedAt:Date;
}