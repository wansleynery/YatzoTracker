
import { readFileSync } from "fs";
import { format } from "util";
import { ResponseCode } from "../model/responseCode";

// Json codes location
const codeLocation = __dirname + '/codes/%s.json';

// JSON Connection Status codes
export function getJsonCode(code: number): ResponseCode {
    return JSON.parse(
        readFileSync(
            // Format the joker char to file(code) name
            format(codeLocation, code),
            // Read the file on correct text format
            'utf8'
        )
    );
}