import { Project } from "./project";
import { Rresources } from "./rresources";

export class Organigram {
    idOrganigram: number;
    programName: string;
    projectManagerName: string;
    project:Project;
    financialManager: string;
    assignmentManager: string;
    ressources: Rresources[];
    constructor() { this.project = new Project();this.ressources=[] }
}
