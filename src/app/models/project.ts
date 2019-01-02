import { Client } from "./client";

export class Project {
    
        idProject: number;
        name: string;
        dateStart: Date;
        dateEnd: Date;
        picture: string;
        description: string;
        projectType:string;
        client:Client;
    
}
