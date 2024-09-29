export interface Domain{
    id:number;
    domainName:string;
    domainDescript:string;
    image?:string;
    nbreSubcribes:number;

    //timpestamps
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
}