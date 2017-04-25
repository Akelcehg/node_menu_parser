class FileManager {

    private file;
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    readFile() {
        return this.file;
    }

}