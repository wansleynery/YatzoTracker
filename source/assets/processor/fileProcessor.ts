
import { readdirSync, readFile, writeFile } from "fs";
import { isNullOrUndefined } from "util";


export function readFilenames (options: FileOptions): string[] {

    let fileList: string[] = [];

    readdirSync(options.url)
        .forEach((filename: string) => {

            if (!isNullOrUndefined(options.name) && !isNullOrUndefined(options.extension)) {
                if (filename.includes(options.name) && filename.endsWith(options.extension)) {
                    fileList.push(
                        filename.substr(0, filename.length - (options.extension.length + 1)));
                }
            } else if (!isNullOrUndefined(options.name) && isNullOrUndefined(options.extension)) {
                if (filename.includes(options.name!)) {
                    fileList.push(filename);
                }
            } else if (isNullOrUndefined(options.name) && !isNullOrUndefined(options.extension)) {
                if (filename.endsWith(options.extension)) {
                    fileList.push(
                        filename.substr(0, filename.length - (options.extension.length + 1)));
                }
            } else {
                fileList.push(filename);
            }
        });

    return fileList;

}



export function getFileContent (file: FileOptions): Promise<string> {

    return new Promise ((resolve: any, reject: any) => {
        
        readFile(file.url, 'utf8',
            function (errorOnReadFile: NodeJS.ErrnoException | null, resultContent: string) {
                
                if (errorOnReadFile) reject(errorOnReadFile);

                resolve(resultContent);

            });
    });

}



export function setFileContent (file: FileOptions, newContent: string) {

    return new Promise ((resolve: any, reject: any) => {

        if (!file.urlTarget) {
            file.urlTarget = file.url;
        }

        writeFile(file.urlTarget, newContent, (errorOnWriteFile) => {
            if (errorOnWriteFile) reject(errorOnWriteFile);

            resolve(true);
        });

    });
    
}



export interface FileOptions {

    url: string;
    urlTarget?: string;
    name?: string;
    extension?: string;

}