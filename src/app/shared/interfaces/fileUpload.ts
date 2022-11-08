export class FileUpload {
    key!: string;
    name!: string;
    file: File;

    constructor(file: File, key: string, name: string) {
        this.key = key;
        this.name = name;
        this.file = file;
    }
}